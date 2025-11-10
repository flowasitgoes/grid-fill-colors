import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-landing-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="landing" [class.landing--leaving]="isLeaving">
      <img src="assets/pink-drip.svg" alt="彩色滴落背景" class="landing__drip" />

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
export class LandingScreenComponent {
  @Input() isLeaving = false;
  @Output() startGame = new EventEmitter<void>();

  handleStartClick(): void {
    this.startGame.emit();
  }
}


