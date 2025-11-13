import { Injectable } from '@angular/core';
import { SfxEvent } from '../models/sfx-event';
import { SFX_CONFIG, SfxConfigEntry } from '../data/sfx-config';

/**
 * 回饋服務：集中管理音效播放
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private audioContext?: AudioContext;
  private masterGain?: GainNode;
  private groupGains: Map<string, GainNode> = new Map();
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private bufferPromises: Map<string, Promise<AudioBuffer | null>> = new Map();

  private activeLoops: Map<SfxEvent, { source: AudioBufferSourceNode; gain: GainNode }> =
    new Map();

  private resumeListenersAttached = false;

  private colorSpectra: Record<string, { base: number; harmonic: number[] }> = {
    red: { base: 340, harmonic: [510, 680, 1020] },
    blue: { base: 240, harmonic: [360, 480, 720] },
    white: { base: 520, harmonic: [650, 780, 1040] },
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
   * 播放指定事件對應的音效
   */
  playEvent(event: SfxEvent, options?: { playbackRate?: number; volume?: number }): void {
    const config = SFX_CONFIG[event];
    if (!config) {
      return;
    }

    const context = this.getContext();
    if (!context) {
      return;
    }

    if (context.state === 'suspended') {
      context.resume().catch(() => undefined);
    }

    const filePath = this.pickFile(config);
    this.loadBuffer(filePath).then(buffer => {
      if (!buffer) {
        return;
      }

      const source = context.createBufferSource();
      source.buffer = buffer;

      const playbackRate = this.resolvePlaybackRate(config, options);
      source.playbackRate.value = playbackRate;

      const { gain, master } = this.getGainNodes(context, config);
      const individualGain = context.createGain();
      individualGain.gain.value = options?.volume ?? config.volume ?? 1;

      source.connect(individualGain);
      individualGain.connect(gain);
      gain.connect(master);
      master.connect(context.destination);

      source.start(0);
    }).catch(() => undefined);
  }

  /**
   * 啟動持續播放的環境音效
   */
  playLoop(event: SfxEvent): void {
    const config = SFX_CONFIG[event];
    if (!config) {
      return;
    }

    const context = this.getContext();
    if (!context) {
      return;
    }

    if (this.activeLoops.has(event)) {
      return;
    }

    if (context.state === 'suspended') {
      context.resume().catch(() => undefined);
    }

    const filePath = this.pickFile(config);
    this.loadBuffer(filePath).then(buffer => {
      if (!buffer || this.activeLoops.has(event)) {
        return;
      }

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.playbackRate.value = this.resolvePlaybackRate(config);

      const { gain, master } = this.getGainNodes(context, config);
      const loopGain = context.createGain();
      loopGain.gain.value = config.volume ?? 1;

      source.connect(loopGain);
      loopGain.connect(gain);
      gain.connect(master);
      master.connect(context.destination);

      source.onended = () => {
        const current = this.activeLoops.get(event);
        if (!current || current.source !== source) {
          return;
        }

        try {
          source.disconnect();
        } catch {
          // 忽略斷線失敗
        }
        try {
          loopGain.disconnect();
        } catch {
          // 忽略斷線失敗
        }

        this.activeLoops.delete(event);

        if (this.audioContext && this.audioContext.state === 'running') {
          this.playLoop(event);
        }
      };

      source.start(0);
      this.activeLoops.set(event, { source, gain: loopGain });
    }).catch(() => undefined);
  }

  /**
   * 停止持續播放的環境音效
   */
  stopLoop(event: SfxEvent): void {
    const loop = this.activeLoops.get(event);
    if (!loop) {
      return;
    }

    try {
      loop.source.stop();
      loop.source.disconnect();
    } catch {
      // 忽略停止失敗
    }

    loop.gain.disconnect();
    this.activeLoops.delete(event);
  }

  /**
   * 播放橡皮擦音效
   */
  playCellErase(): void {
    this.playEvent(SfxEvent.GameEraser);
  }

  /**
   * 播放顏色切換音效
   */
  playColorSwitch(color: string): void {
    const palette = this.colorSpectra[color] ?? this.colorSpectra['empty'];
    this.playSparkle(palette.base * 1.2, 0.32, 0.25);
  }

  /**
   * 播放檢查答案音效
   */
  playCheckAnswer(success: boolean): void {
    if (success) {
      this.playEvent(SfxEvent.GameCheckSuccessLayers);
      this.playEvent(SfxEvent.GameCheckSuccessCrowd);
    } else {
      this.playEvent(SfxEvent.GameCheckFailure);
    }
  }

  /**
   * 播放填色升級音效（依顏色調整音高）
   */
  playColorFill(color: string): void {
    this.playEvent(SfxEvent.GameFillBasic);
  }

  private getContext(): AudioContext | undefined {
    if (this.audioContext) {
      return this.audioContext;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    // iOS 16.2 兼容性：使用 webkitAudioContext 作为 fallback
    const anyWindow = window as typeof window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext || anyWindow.webkitAudioContext;

    if (!Ctor) {
      return undefined;
    }

    try {
      // iOS 上 AudioContext 可能需要特定的配置
      const options: AudioContextOptions = {};
      // 对于 iOS，使用较小的 sampleRate 可以提高性能
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        options.sampleRate = 44100;
      }
      
      this.audioContext = new Ctor(options);
      this.setupContextRecovery(this.audioContext);
      return this.audioContext;
    } catch (error) {
      // 如果创建失败，返回 undefined，避免阻塞应用
      console.warn('AudioContext creation failed:', error);
      return undefined;
    }
  }

  private getMasterGain(context: AudioContext): GainNode {
    if (!this.masterGain) {
      this.masterGain = context.createGain();
      this.masterGain.gain.value = 0.9;
    }
    return this.masterGain;
  }

  private getGroupGain(context: AudioContext, group: string): GainNode {
    const existing = this.groupGains.get(group);
    if (existing) {
      return existing;
    }

    const gain = context.createGain();
    const defaultValue = group === 'ui' ? 0.8 : group === 'env' ? 0.5 : 1;
    gain.gain.value = defaultValue;
    this.groupGains.set(group, gain);
    return gain;
  }

  private getGainNodes(context: AudioContext, config: SfxConfigEntry): {
    gain: GainNode;
    master: GainNode;
  } {
    const master = this.getMasterGain(context);
    const groupGain = this.getGroupGain(context, config.group);
    return { gain: groupGain, master };
  }

  private resolvePlaybackRate(config: SfxConfigEntry, options?: { playbackRate?: number }): number {
    if (options?.playbackRate) {
      return options.playbackRate;
    }

    if (!config.playbackRate) {
      return 1;
    }

    const { min, max } = config.playbackRate;
    if (min === max) {
      return min;
    }

    return min + Math.random() * (max - min);
  }

  private pickFile(config: SfxConfigEntry): string {
    if (config.files.length === 1) {
      return config.files[0];
    }

    const index = Math.floor(Math.random() * config.files.length);
    return config.files[index];
  }

  private loadBuffer(path: string): Promise<AudioBuffer | null> {
    if (this.bufferCache.has(path)) {
      return Promise.resolve(this.bufferCache.get(path)!);
    }

    const existingPromise = this.bufferPromises.get(path);
    if (existingPromise) {
      return existingPromise;
    }

    const context = this.getContext();
    if (!context) {
      return Promise.resolve(null);
    }

    // iOS 16.2 兼容性：添加超时和错误处理，避免阻塞
    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => {
      abortController.abort();
    }, 10000); // 10秒超时
    
    const promise = fetch(path, { 
      // iOS 上添加缓存控制
      cache: 'default',
      // 添加超时处理
      signal: abortController.signal
    } as RequestInit)
      .then(response => {
        window.clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error(`Failed to load audio: ${response.statusText}`);
        }
        return response.arrayBuffer();
      })
      .then(arrayBuffer => {
        // iOS 上 decodeAudioData 可能需要更多时间，添加错误处理
        return context.decodeAudioData(arrayBuffer.slice(0));
      })
      .then(buffer => {
        this.bufferCache.set(path, buffer);
        this.bufferPromises.delete(path);
        return buffer;
      })
      .catch((error) => {
        // 清理超时
        window.clearTimeout(timeoutId);
        // 静默处理错误，避免阻塞应用
        console.warn(`Failed to load audio buffer: ${path}`, error);
        this.bufferPromises.delete(path);
        return null;
      });

    this.bufferPromises.set(path, promise);
    return promise;
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

  private playSparkle(frequency: number, duration: number, shimmer: number): void {
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
    oscillator.frequency.exponentialRampToValueAtTime(frequency * (1 + shimmer), context.currentTime + duration);

    const now = context.currentTime;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.04);
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
      const peak = Math.max(0.18, 0.3 - index * 0.05);

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
    const frameCount = context.sampleRate * 0.6;
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
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      source.connect(gain);
      gain.connect(context.destination);
      source.start(now);
    }).catch(() => undefined);
  }

  private setupContextRecovery(context: AudioContext): void {
    if (this.resumeListenersAttached || typeof document === 'undefined') {
      return;
    }

    const resumeContext = () => {
      if (context.state !== 'running') {
        context.resume().catch(() => undefined);
      }
    };

    const resumeAndRevive = () => {
      resumeContext();
    };

    const visibilityHandler = () => {
      if (document.visibilityState === 'visible') {
        resumeAndRevive();
      }
    };

    const events: Array<{ name: keyof DocumentEventMap; options?: AddEventListenerOptions }> = [
      { name: 'pointerdown', options: { passive: true } },
      { name: 'touchstart', options: { passive: true } },
      { name: 'keydown' }
    ];

    events.forEach(({ name, options }) => {
      document.addEventListener(name, resumeAndRevive, options);
    });
    document.addEventListener('visibilitychange', visibilityHandler);

    context.onstatechange = () => {
      if (context.state === 'running') {
        // 確保中斷後的環境音能正常恢復
        const pendingLoops = [...this.activeLoops.entries()];
        pendingLoops.forEach(([event, loop]) => {
          if (!loop.source.buffer) {
            this.activeLoops.delete(event);
            this.playLoop(event);
          }
        });
      }
    };

    this.resumeListenersAttached = true;
  }
}


