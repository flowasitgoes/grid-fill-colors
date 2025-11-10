import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-landing-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="landing" [class.landing--leaving]="isLeaving">
      <img src="assets/pink-drip.svg" alt="彩色滴落背景" class="landing__drip" />
      <audio
        #bgm
        class="landing__bgm"
        src="assets/audio/colordance-intro-14s.mp3"
        preload="auto"
        playsinline
      ></audio>

      <div class="landing__content">
        <div class="landing__logo-wrapper">
          <img src="assets/logo-color-dance.png" alt="ColorDance Logo" class="landing__logo" />
        </div>

        <div class="landing__title">
          <span class="landing__eyebrow">歡迎來到</span>
          <h1>ColorDance</h1>
          <p class="landing__subtitle">跟著顏色節奏，一起拼出最亮眼的圖案！</p>
        </div>

        <div class="landing__cta">
          <button type="button" class="btn btn--primary" (click)="handleStartClick()">
            開始遊戲
          </button>
        </div>
      </div>

      <div class="landing__footer">
        <span class="footer__label">版本</span>
        <span class="footer__value">v0.1.0</span>
      </div>

      <div class="loading-overlay" *ngIf="isLoadingSequence">
        <div class="loading-overlay__content">
          <div class="bubble-swarm">
            <svg viewBox="0 0 360 220">
              <defs>
                <radialGradient id="swarmBubble" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stop-color="#fffbe0" />
                  <stop offset="45%" stop-color="#ffe066" />
                  <stop offset="90%" stop-color="#ffc93c" />
                  <stop offset="100%" stop-color="#f4b400" />
                </radialGradient>
                <radialGradient id="swarmGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(255, 235, 120, 0.8)" />
                  <stop offset="70%" stop-color="rgba(255, 220, 80, 0.2)" />
                  <stop offset="100%" stop-color="rgba(255, 210, 72, 0)" />
                </radialGradient>
              </defs>

              <g class="bubble-swarm__glow">
                <circle cx="60" cy="120" r="38" fill="url(#swarmGlow)" />
                <circle cx="180" cy="156" r="46" fill="url(#swarmGlow)" />
                <circle cx="300" cy="118" r="34" fill="url(#swarmGlow)" />
              </g>

              <g class="bubble-swarm__set bubble-swarm__set--left">
                <circle class="bubble-swarm__bubble" cx="52" cy="132" r="22" fill="url(#swarmBubble)" />
                <circle class="bubble-swarm__bubble bubble-swarm__bubble--tiny" cx="36" cy="96" r="9" fill="url(#swarmBubble)" />
                <circle class="bubble-swarm__bubble bubble-swarm__bubble--tiny" cx="84" cy="110" r="7" fill="url(#swarmBubble)" />
                <path class="bubble-swarm__trail" d="M34 126 C 26 118, 20 108, 22 96" />
              </g>

              <g class="bubble-swarm__set bubble-swarm__set--center">
                <circle class="bubble-swarm__bubble bubble-swarm__bubble--main" cx="180" cy="144" r="32" fill="url(#swarmBubble)" />
                <circle class="bubble-swarm__bubble bubble-swarm__bubble--tiny" cx="148" cy="156" r="10" fill="url(#swarmBubble)" />
                <circle class="bubble-swarm__bubble bubble-swarm__bubble--tiny" cx="214" cy="168" r="14" fill="url(#swarmBubble)" />
                <path class="bubble-swarm__trail" d="M180 144 C 180 128, 178 110, 170 96" />
              </g>

              <g class="bubble-swarm__set bubble-swarm__set--right">
                <circle class="bubble-swarm__bubble" cx="300" cy="122" r="24" fill="url(#swarmBubble)" />
                <circle class="bubble-swarm__bubble bubble-swarm__bubble--tiny" cx="324" cy="150" r="9" fill="url(#swarmBubble)" />
                <circle class="bubble-swarm__bubble bubble-swarm__bubble--tiny" cx="286" cy="88" r="8" fill="url(#swarmBubble)" />
                <path class="bubble-swarm__trail" d="M300 122 C 312 112, 320 94, 318 76" />
              </g>

              <g class="bubble-swarm__sparkles">
                <circle cx="106" cy="146" r="5" />
                <circle cx="248" cy="130" r="4" />
                <circle cx="206" cy="108" r="5" />
                <circle cx="138" cy="102" r="4" />
              </g>
            </svg>
          </div>
          <p class="loading-overlay__label">調色中...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .landing {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;
      min-height: 100vh;
      padding: 48px 24px 32px;
      background: radial-gradient(circle at 20% -10%, rgba(255, 246, 220, 0.8) 0%, rgba(255, 231, 213, 0.6) 28%, transparent 52%),
                  radial-gradient(circle at 90% 30%, rgba(218, 239, 255, 0.9) 0%, rgba(218, 239, 255, 0.45) 40%, transparent 70%),
                  linear-gradient(160deg, #7bdff2 0%, #b2f7ef 35%, #fff3b0 70%, #ff9aa2 100%);
      overflow: hidden;
      color: #1f2a44;
      animation: landing-fade-in 0.8s ease;
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .landing--leaving {
      opacity: 0;
      transform: translateY(-16px);
      pointer-events: none;
    }

    .landing__drip {
      position: absolute;
      top: -40px;
      right: 56%;
      width: min(68vw, 520px);
      transform: rotate(-12deg);
      opacity: 0.9;
      z-index: 5;
      animation: drip-float 6s ease-in-out infinite alternate;
      pointer-events: none;
    }

    .landing__content {
      max-width: 640px;
      width: 100%;
      text-align: center;
      padding: 24px;
      border-radius: 36px;
      backdrop-filter: blur(18px);
      background: rgba(255, 255, 255, 0.72);
      box-shadow: 0 30px 60px rgba(31, 42, 68, 0.16);
      position: relative;
      z-index: 1;
    }

    .landing__logo-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }

    .landing__logo {
      width: min(280px, 65vw);
      height: auto;
      filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.18));
      animation: logo-pop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .landing__title h1 {
      font-family: 'Baloo 2', 'Segoe UI', sans-serif;
      font-size: clamp(40px, 7vw, 64px);
      margin: 0;
      letter-spacing: 1px;
      background: linear-gradient(120deg, #1f2a44 0%, #234d84 50%, #712b75 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .landing__eyebrow {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.86);
      box-shadow: 0 4px 12px rgba(31, 42, 68, 0.15);
      font-size: 0.9rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #47597e;
      margin-bottom: 14px;
    }

    .landing__subtitle {
      margin: 18px auto 0;
      max-width: 420px;
      font-size: 1.1rem;
      line-height: 1.6;
      color: #3b475f;
    }

    .landing__cta {
      display: flex;
      justify-content: center;
      gap: 18px;
      margin-top: 32px;
      flex-wrap: wrap;
    }

    .btn {
      border: none;
      border-radius: 999px;
      padding: 14px 32px;
      font-size: 1.05rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
      font-family: 'Baloo 2', 'Segoe UI', sans-serif;
      letter-spacing: 0.5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn:focus-visible {
      outline: 3px solid rgba(49, 92, 255, 0.35);
      outline-offset: 3px;
    }

    .btn--primary {
      background: linear-gradient(120deg, #ff9aa2 0%, #ffd97d 100%);
      color: #1f2a44;
      box-shadow: 0 12px 24px rgba(255, 154, 162, 0.35);
    }

    .btn--primary:hover {
      transform: translateY(-3px) scale(1.01);
      box-shadow: 0 18px 32px rgba(255, 154, 162, 0.45);
    }

    .landing__footer {
      position: absolute;
      bottom: 24px;
      right: 32px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.65);
      box-shadow: 0 8px 18px rgba(31, 42, 68, 0.14);
      font-weight: 600;
      font-family: 'Baloo 2', 'Segoe UI', sans-serif;
    }

    .footer__label {
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 0.75rem;
      color: #546999;
    }

    .footer__value {
      font-size: 1rem;
      color: #2f3a54;
    }

    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(22, 32, 54, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 20;
      animation: backdrop-fade 0.25s ease;
    }

    .loading-overlay__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }

    .bubble-swarm {
      width: min(360px, 72vw);
      animation: swarm-float 3s ease-in-out infinite;
    }

    .bubble-swarm__glow circle {
      animation: glow-pulse 3.2s ease-in-out infinite alternate;
    }

    .bubble-swarm__set {
      animation: swarm-bob 2.6s ease-in-out infinite;
      transform-origin: center;
    }

    .bubble-swarm__set--left {
      animation-delay: 0.1s;
    }

    .bubble-swarm__set--center {
      animation-delay: 0.3s;
    }

    .bubble-swarm__set--right {
      animation-delay: 0.5s;
    }

    .bubble-swarm__bubble {
      filter: drop-shadow(0 12px 20px rgba(244, 180, 0, 0.32));
      animation: bubble-pop 1.8s ease-in-out infinite;
    }

    .bubble-swarm__bubble--main {
      animation: bubble-pop-main 2.4s ease-in-out infinite;
    }

    .bubble-swarm__bubble--tiny {
      animation: bubble-pop-tiny 1.6s ease-in-out infinite;
    }

    .bubble-swarm__trail {
      stroke: rgba(255, 214, 86, 0.45);
      stroke-width: 4;
      stroke-linecap: round;
      fill: none;
      stroke-dasharray: 6 12;
      animation: trail-dash 1.6s linear infinite;
    }

    .bubble-swarm__sparkles circle {
      fill: rgba(255, 255, 255, 0.85);
      animation: sparkle-twinkle 1.4s ease-in-out infinite;
    }

    .loading-overlay__label {
      font-size: 1.3rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #fce1c2;
      text-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
    }

    @keyframes landing-fade-in {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes drip-float {
      from {
        transform: rotate(-14deg) translateY(0);
      }
      to {
        transform: rotate(-10deg) translateY(10px);
      }
    }

    @keyframes logo-pop {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      60% {
        transform: scale(1.05);
        opacity: 1;
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes swarm-float {
      0% {
        transform: translateY(4px);
      }
      50% {
        transform: translateY(-6px);
      }
      100% {
        transform: translateY(4px);
      }
    }

    @keyframes swarm-bob {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-12px) rotate(-2deg);
      }
    }

    @keyframes glow-pulse {
      0% {
        opacity: 0.28;
        transform: scale(0.92);
      }
      100% {
        opacity: 0.5;
        transform: scale(1.08);
      }
    }

    @keyframes bubble-pop {
      0% {
        transform: scale(0.9);
      }
      40% {
        transform: scale(1.04);
      }
      100% {
        transform: scale(0.92);
      }
    }

    @keyframes bubble-pop-main {
      0% {
        transform: scale(0.9);
      }
      45% {
        transform: scale(1.08);
      }
      100% {
        transform: scale(0.92);
      }
    }

    @keyframes bubble-pop-tiny {
      0% {
        transform: scale(0.85);
      }
      35% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(0.82);
      }
    }

    @keyframes trail-dash {
      to {
        stroke-dashoffset: -60;
      }
    }

    @keyframes sparkle-twinkle {
      0%, 100% {
        opacity: 0.2;
        transform: scale(0.7);
      }
      45% {
        opacity: 1;
        transform: scale(1.1);
      }
      70% {
        opacity: 0.4;
        transform: scale(0.85);
      }
    }

    @media (max-width: 768px) {
      .landing {
        padding: 32px 20px 24px;
      }

      .landing__content {
        padding: 24px 20px;
        border-radius: 28px;
      }

      .landing__footer {
        display: none;
      }

      .loading-overlay__label {
        font-size: 1.1rem;
        letter-spacing: 2px;
      }
    }

    @media (max-width: 480px) {
      .landing__title h1 {
        font-size: clamp(36px, 12vw, 46px);
      }

      .landing__subtitle {
        font-size: 1rem;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class LandingScreenComponent implements AfterViewInit, OnDestroy {
  @Input() isLeaving = false;
  @Output() startGame = new EventEmitter<void>();
  @ViewChild('bgm') bgmRef?: ElementRef<HTMLAudioElement>;

  private resumePlaybackHandler?: () => void;
  private fadeIntervalId: number | null = null;
  private loadingTimeoutId: number | null = null;
  private readonly baseVolume = 0.65;

  isLoadingSequence = false;

  ngAfterViewInit(): void {
    const audio = this.bgmRef?.nativeElement;
    if (!audio) {
      return;
    }

    audio.volume = this.baseVolume;
    audio.loop = true;
    this.tryPlayAudio(audio);
  }

  ngOnDestroy(): void {
    if (this.resumePlaybackHandler) {
      document.removeEventListener('pointerdown', this.resumePlaybackHandler);
      this.resumePlaybackHandler = undefined;
    }

    if (this.fadeIntervalId !== null) {
      window.clearInterval(this.fadeIntervalId);
      this.fadeIntervalId = null;
    }

    if (this.loadingTimeoutId !== null) {
      window.clearTimeout(this.loadingTimeoutId);
      this.loadingTimeoutId = null;
    }
  }

  handleStartClick(): void {
    if (this.isLeaving || this.isLoadingSequence) {
      return;
    }

    this.isLoadingSequence = true;
    this.startLoadingAudio();

    this.loadingTimeoutId = window.setTimeout(() => {
      this.loadingTimeoutId = null;
      this.completeStartSequence();
    }, 12000);
  }

  private tryPlayAudio(audio: HTMLAudioElement): void {
    audio
      .play()
      .catch(() => {
        if (this.resumePlaybackHandler) {
          document.removeEventListener('pointerdown', this.resumePlaybackHandler);
        }

        this.resumePlaybackHandler = () => {
          audio.play().finally(() => {
            document.removeEventListener('pointerdown', this.resumePlaybackHandler!);
            this.resumePlaybackHandler = undefined;
          });
        };

        document.addEventListener('pointerdown', this.resumePlaybackHandler, { once: true });
      });
  }

  private fadeOutAudio(onComplete?: () => void): void {
    const audio = this.bgmRef?.nativeElement;
    if (!audio) {
      return;
    }

    if (this.fadeIntervalId !== null) {
      return;
    }

    this.fadeIntervalId = window.setInterval(() => {
      if (audio.volume <= 0.05) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = this.baseVolume;
        audio.loop = true;

        window.clearInterval(this.fadeIntervalId!);
        this.fadeIntervalId = null;
        if (onComplete) {
          onComplete();
        }
        return;
      }

      audio.volume = Math.max(0, audio.volume - 0.05);
    }, 60);
  }

  private startLoadingAudio(): void {
    const audio = this.bgmRef?.nativeElement;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;
    audio.volume = this.baseVolume;
    this.tryPlayAudio(audio);
  }

  private completeStartSequence(): void {
    this.fadeOutAudio(() => {
      this.isLoadingSequence = false;
      this.startGame.emit();
    });
  }
}


