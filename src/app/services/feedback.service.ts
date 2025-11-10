import { Injectable } from '@angular/core';

/**
 * 回饋服務：集中管理音效播放
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private audioContext?: AudioContext;
  private colorSpectra: Record<string, { base: number; harmonic: number[] }> = {
    red: { base: 320, harmonic: [480, 720, 960] },
    blue: { base: 260, harmonic: [390, 520, 780] },
    white: { base: 540, harmonic: [720, 860, 1080] },
    empty: { base: 180, harmonic: [240, 320, 400] }
  };
  private crowdNoiseBuffer?: AudioBuffer;

  /**
   * 播放格子點擊音效
   */
  playCellClick(): void {
    this.playPop(220, 0.08);
  }

  /**
   * 播放橡皮擦音效
   */
  playCellErase(): void {
    this.playPop(160, 0.12, -0.25);
  }

  /**
   * 播放顏色切換音效
   */
  playColorSwitch(color: string): void {
    const palette = this.colorSpectra[color] ?? this.colorSpectra['red'];
    this.playSparkle(palette.base, 0.28);
  }

  /**
   * 播放檢查答案音效
   */
  playCheckAnswer(success: boolean): void {
    if (success) {
      this.playChord([600, 720, 880], 0.35);
    } else {
      this.playPop(140, 0.2, 0.4);
    }
  }

  /**
   * 播放填色升級音效（依顏色調整音高）
   */
  playColorFill(color: string): void {
    const palette = this.colorSpectra[color] ?? this.colorSpectra['red'];
    const frequencies = [palette.base, ...palette.harmonic];
    this.playArpeggio(frequencies, 0.45);
    this.playCrowdWave(0.4);
  }

  private getContext(): AudioContext | undefined {
    if (this.audioContext) {
      return this.audioContext;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    const anyWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext || anyWindow.webkitAudioContext;

    if (!Ctor) {
      return undefined;
    }

    this.audioContext = new Ctor();
    return this.audioContext;
  }

  private playPop(frequency: number, duration: number, detune: number = 0.0): void {
    const context = this.getContext();
    if (!context) {
      return;
    }

    if (context.state === 'suspended') {
      context.resume().catch(() => undefined);
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;
    if (detune !== 0) {
      oscillator.detune.value = detune * 1200;
    }

    const now = context.currentTime;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  }

  private playSparkle(frequency: number, duration: number): void {
    const context = this.getContext();
    if (!context) {
      return;
    }

    if (context.state === 'suspended') {
      context.resume().catch(() => undefined);
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 2, context.currentTime + duration);

    const now = context.currentTime;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  }

  private playArpeggio(frequencies: number[], totalDuration: number): void {
    const context = this.getContext();
    if (!context || frequencies.length === 0) {
      return;
    }

    if (context.state === 'suspended') {
      context.resume().catch(() => undefined);
    }

    const now = context.currentTime;
    const step = totalDuration / (frequencies.length + 1);
    const masterGain = context.createGain();
    masterGain.gain.value = 0.0;
    masterGain.connect(context.destination);

    frequencies.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === frequencies.length - 1 ? 'sawtooth' : 'triangle';
      oscillator.frequency.value = frequency;

      const gain = context.createGain();
      const startTime = now + index * step;
      const peak = Math.max(0.18, 0.28 - index * 0.04);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(peak, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + step + 0.2);

      oscillator.connect(gain);
      gain.connect(masterGain);

      oscillator.start(startTime);
      oscillator.stop(startTime + step + 0.25);
    });

    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.5, now + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + totalDuration + 0.4);
  }

  private async ensureCrowdBuffer(): Promise<AudioBuffer | null> {
    const context = this.getContext();
    if (!context) {
      return null;
    }

    if (this.crowdNoiseBuffer) {
      return this.crowdNoiseBuffer;
    }

    const channels = 1;
    const frameCount = context.sampleRate * 0.4;
    const buffer = context.createBuffer(channels, frameCount, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / frameCount) * 0.6;
    }
    this.crowdNoiseBuffer = buffer;
    return buffer;
  }

  private playCrowdWave(intensity: number): void {
    const context = this.getContext();
    if (!context) {
      return;
    }

    this.ensureCrowdBuffer().then(buffer => {
      if (!buffer) {
        return;
      }

      const source = context.createBufferSource();
      const gain = context.createGain();
      source.buffer = buffer;

      const now = context.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18 * intensity, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      source.connect(gain);
      gain.connect(context.destination);
      source.start(now);
    }).catch(() => undefined);
  }

  private playChord(frequencies: number[], duration: number): void {
    const context = this.getContext();
    if (!context) {
      return;
    }

    if (context.state === 'suspended') {
      context.resume().catch(() => undefined);
    }

    const now = context.currentTime;
    const gain = context.createGain();
    gain.gain.value = 0.0;
    gain.connect(context.destination);

    frequencies.forEach((freq, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;

      const oscillatorGain = context.createGain();
      oscillatorGain.gain.setValueAtTime(0, now);
      oscillatorGain.gain.linearRampToValueAtTime(0.25 / frequencies.length, now + 0.02 + index * 0.01);
      oscillatorGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(oscillatorGain);
      oscillatorGain.connect(gain);

      oscillator.start(now);
      oscillator.stop(now + duration + 0.05);
    });

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.1);
  }
}


