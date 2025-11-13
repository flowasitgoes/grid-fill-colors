import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelService } from '../../services/level.service';
import { Level } from '../../models/level.model';
import { FeedbackService } from '../../services/feedback.service';
import { SfxEvent } from '../../models/sfx-event';

/**
 * 關卡選擇器元件
 * 顯示所有可用關卡供玩家選擇
 */
@Component({
  selector: 'app-level-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="level-selector cosmic-stage">
      <audio
        #levelSelectBgm
        class="level-selector__bgm"
        src="assets/audio/synth-intro-for-youtube-2-312372.mp3"
        preload="auto"
        playsinline
      ></audio>

      <div class="cosmic-backdrop">
        <div class="nebula layer nebula-1"></div>
        <div class="nebula layer nebula-2"></div>
        <div class="planet planet-left"></div>
        <div class="planet planet-right"></div>
        <div class="light-beam beam-left"></div>
        <div class="light-beam beam-right"></div>
        <div class="stardust stardust-front"></div>
        <div class="stardust stardust-back"></div>
      </div>

      <div class="stage-content">
        <header class="stage-header">
          <h2>星際音色會 · 關卡選擇</h2>
          <p class="stage-subtitle">
            霓虹節奏穿梭星雲，挑戰由你點亮。
          </p>
        </header>

        <div class="level-grid">
          <div 
            *ngFor="let level of levels" 
            class="level-card"
            [class.easy]="level.difficulty === 'easy'"
            [class.medium]="level.difficulty === 'medium'"
            [class.hard]="level.difficulty === 'hard'"
            [ngClass]="getThemeClass(level)"
            (mouseenter)="onLevelHover()"
            (click)="onLevelSelect(level)">
            <div class="level-card-inner">
              <div class="level-header">
                <span class="level-number">{{ level.id }}</span>
                <div class="level-title">
                  <div class="level-name">{{ extractLevelName(level.name) }}</div>
                  <div class="level-difficulty" *ngIf="level.difficulty">
                    {{ getDifficultyText(level.difficulty) }}
                  </div>
                </div>
              </div>

              <div class="story-banner" *ngIf="level.story">
                <span class="banner-icon">{{ level.story.sigil || getThemeFallbackIcon(level.story.theme) }}</span>
                <div class="banner-text">
                  <span class="banner-arc">{{ level.story.arc }}</span>
                  <span class="banner-location">{{ level.story.location }}</span>
                </div>
              </div>

              <div class="level-preview">
                <div class="preview-grid">
                  <div 
                    *ngFor="let row of level.solution" 
                    class="preview-row">
                    <div 
                      *ngFor="let color of row"
                      class="preview-cell"
                      [style.background-color]="getColorValue(color)">
                    </div>
                  </div>
                </div>
              </div>

              <div class="level-palette">
                <span 
                  *ngFor="let color of level.colors" 
                  class="palette-dot"
                  [style.background-color]="getColorValue(color)">
                </span>
              </div>

              <div class="level-story" *ngIf="level.story">
                <span class="story-arc">{{ level.story.arc }}</span>
                <div class="story-location">{{ level.story.location }}</div>
                <p class="story-briefing">{{ level.story.briefing }}</p>
                <div class="story-objective">🎯 {{ level.story.objective }}</div>
                <div class="story-mood" *ngIf="level.story.mood">
                  <span>氛圍：</span>{{ level.story.mood }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .level-selector__bgm {
      display: none;
    }

    .cosmic-stage {
      position: relative;
      overflow: hidden;
      padding: clamp(32px, 6vw, 64px) clamp(20px, 5vw, 80px);
      border-radius: 32px;
      background: radial-gradient(circle at 20% -10%, rgba(90, 210, 255, 0.12), transparent 45%),
                  radial-gradient(circle at 80% 0%, rgba(142, 87, 255, 0.16), transparent 40%),
                  linear-gradient(135deg, #070c1f 0%, #0f1f37 60%, #1b1a3a 100%);
      box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.45), 0 30px 80px rgba(0, 0, 0, 0.6);
      color: #f0f5ff;
      min-height: 100vh;
      text-align: center;
    }

    .cosmic-backdrop {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      filter: saturate(120%);
    }

    .layer {
      position: absolute;
      border-radius: 50%;
      mix-blend-mode: screen;
      opacity: 0.6;
    }

    .nebula-1 {
      width: 120%;
      height: 120%;
      background: radial-gradient(circle at 40% 40%, rgba(110, 205, 255, 0.16), transparent 65%),
                  radial-gradient(circle at 60% 60%, rgba(112, 81, 255, 0.25), transparent 60%);
      animation: drift 18s ease-in-out infinite alternate;
    }

    .nebula-2 {
      width: 110%;
      height: 110%;
      background: radial-gradient(circle at 70% 30%, rgba(255, 192, 112, 0.18), transparent 55%),
                  radial-gradient(circle at 30% 70%, rgba(74, 242, 182, 0.12), transparent 60%);
      animation: drift 24s ease-in-out infinite alternate-reverse;
    }

    .planet {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(58, 194, 168, 0.35), rgba(12, 24, 48, 0.95));
      box-shadow: 0 0 45px rgba(74, 242, 182, 0.25), inset -18px -18px 40px rgba(3, 8, 20, 0.8);
      transform: translateZ(0);
    }

    .planet-left {
      width: clamp(180px, 26vw, 320px);
      height: clamp(180px, 26vw, 320px);
      left: -8%;
      bottom: -10%;
      animation: float 12s ease-in-out infinite;
    }

    .planet-right {
      width: clamp(130px, 20vw, 240px);
      height: clamp(130px, 20vw, 240px);
      right: -6%;
      top: 18%;
      background: linear-gradient(135deg, rgba(255, 162, 70, 0.45), rgba(25, 12, 48, 0.9));
      animation: float 16s ease-in-out infinite reverse;
    }

    .light-beam {
      position: absolute;
      width: 28vw;
      max-width: 380px;
      height: 120%;
      top: -10%;
      background: linear-gradient(180deg, rgba(124, 96, 255, 0.24), transparent 80%);
      filter: blur(1px);
    }

    .beam-left {
      left: 14%;
      transform: rotate(-12deg);
      animation: pulse 6s ease-in-out infinite;
    }

    .beam-right {
      right: 14%;
      transform: rotate(11deg);
      animation: pulse 7s ease-in-out infinite reverse;
    }

    .stardust {
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.9) 50%, transparent 52%),
        radial-gradient(1px 1px at 40% 70%, rgba(166, 233, 255, 0.8) 50%, transparent 53%),
        radial-gradient(1.5px 1.5px at 70% 40%, rgba(255, 174, 102, 0.75) 50%, transparent 52%);
      animation: twinkle 8s linear infinite;
      opacity: 0.25;
    }

    .stardust-front {
      animation-duration: 12s;
      opacity: 0.35;
    }

    .stage-content {
      position: relative;
      z-index: 2;
      max-width: 980px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: clamp(32px, 4vw, 48px);
    }

    .stage-header {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
      text-shadow: 0 0 20px rgba(122, 109, 255, 0.6);
    }

    .stage-header h2 {
      font-size: clamp(2.4rem, 4vw, 3.2rem);
      letter-spacing: 2px;
    }

    .stage-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: rgba(220, 236, 255, 0.78);
      max-width: 560px;
    }

    .level-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: clamp(20px, 3.2vw, 32px);
    }

    .level-card {
      position: relative;
      cursor: pointer;
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
      border-radius: 26px;
      background: linear-gradient(160deg, rgba(18, 36, 70, 0.82), rgba(26, 21, 64, 0.92));
      border: 2px solid rgba(122, 109, 255, 0.12);
      box-shadow: 0 18px 42px rgba(4, 10, 28, 0.8), inset 0 0 28px rgba(92, 77, 255, 0.12);
      overflow: hidden;
    }

    .level-card.theme-dawn {
      border-color: rgba(255, 210, 130, 0.45);
      background: linear-gradient(160deg, rgba(44, 22, 52, 0.9), rgba(20, 30, 66, 0.85));
      box-shadow: 0 20px 44px rgba(255, 182, 99, 0.22), inset 0 0 30px rgba(255, 200, 150, 0.18);
    }

    .level-card.theme-rail {
      border-color: rgba(126, 255, 214, 0.35);
      background: linear-gradient(160deg, rgba(10, 32, 40, 0.9), rgba(9, 20, 34, 0.95));
      box-shadow: 0 20px 44px rgba(71, 196, 255, 0.18), inset 0 0 30px rgba(105, 255, 224, 0.16);
    }

    .level-card.theme-tower {
      border-color: rgba(151, 120, 255, 0.4);
      background: linear-gradient(160deg, rgba(18, 12, 34, 0.92), rgba(12, 10, 28, 0.95));
      box-shadow: 0 20px 44px rgba(130, 92, 255, 0.22), inset 0 0 30px rgba(96, 64, 196, 0.2);
    }

    .level-card::before {
      content: '';
      position: absolute;
      inset: -40%;
      background: conic-gradient(
        from 120deg,
        rgba(123, 77, 255, 0.08),
        rgba(0, 0, 0, 0),
        rgba(74, 242, 182, 0.12),
        rgba(0, 0, 0, 0)
      );
      transform: rotate(0deg);
      transition: transform 0.6s ease;
      pointer-events: none;
    }

    .story-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      border-radius: 18px;
      padding: 10px 14px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .theme-dawn .story-banner {
      background: rgba(255, 208, 143, 0.1);
      border-color: rgba(255, 208, 143, 0.4);
    }

    .theme-rail .story-banner {
      background: rgba(111, 255, 228, 0.08);
      border-color: rgba(111, 255, 228, 0.35);
    }

    .theme-tower .story-banner {
      background: rgba(166, 148, 255, 0.1);
      border-color: rgba(166, 148, 255, 0.35);
    }

    .banner-icon {
      font-size: 1.5rem;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));
    }

    .banner-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.2;
    }

    .banner-arc {
      font-size: 0.85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.8);
    }

    .banner-location {
      font-size: 0.95rem;
      color: #f8f9ff;
    }

    .level-card:hover {
      transform: translateY(-14px);
      box-shadow: 0 28px 65px rgba(12, 22, 54, 0.9), 0 0 40px rgba(122, 109, 255, 0.35);
      border-color: rgba(142, 107, 255, 0.35);
    }

    .level-card:hover::before {
      transform: rotate(32deg);
    }

    .level-card.easy {
      border-color: rgba(101, 252, 194, 0.28);
      box-shadow: 0 18px 42px rgba(4, 10, 28, 0.8), inset 0 0 32px rgba(101, 252, 194, 0.18);
    }

    .level-card.medium {
      border-color: rgba(255, 197, 109, 0.32);
      box-shadow: 0 18px 42px rgba(4, 10, 28, 0.8), inset 0 0 32px rgba(255, 197, 109, 0.16);
    }

    .level-card.hard {
      border-color: rgba(255, 102, 129, 0.32);
      box-shadow: 0 18px 42px rgba(4, 10, 28, 0.8), inset 0 0 32px rgba(255, 102, 129, 0.18);
    }

    .level-card-inner {
      position: relative;
      z-index: 2;
      border-radius: 26px;
      padding: clamp(22px, 3vw, 28px);
      display: flex;
      flex-direction: column;
      gap: 22px;
      height: 100%;
      background: linear-gradient(140deg, rgba(10, 18, 38, 0.65), rgba(13, 16, 33, 0.8));
    }

    .level-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 18px;
    }

    .level-number {
      font-size: clamp(2.6rem, 5vw, 3.4rem);
      font-weight: 700;
      color: #ffd86b;
      text-shadow: 0 0 18px rgba(255, 216, 107, 0.6);
      line-height: 1;
    }

    .level-title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      flex: 1;
    }

    .level-name {
      font-size: clamp(1.2rem, 2.4vw, 1.4rem);
      font-weight: 700;
      letter-spacing: 1.5px;
    }

    .level-difficulty {
      font-size: 0.95rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: rgba(226, 235, 255, 0.65);
    }

    .level-preview {
      display: flex;
      justify-content: center;
    }

    .preview-grid {
      padding: 12px;
      border-radius: 18px;
      background: linear-gradient(135deg, rgba(40, 61, 105, 0.7), rgba(26, 36, 66, 0.85));
      border: 1px solid rgba(142, 109, 255, 0.25);
      box-shadow: inset 0 6px 16px rgba(3, 8, 22, 0.75), 0 0 25px rgba(123, 77, 255, 0.25);
    }

    .preview-row {
      display: flex;
      gap: 4px;
    }

    .preview-cell {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 1px solid rgba(12, 24, 48, 0.65);
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.08);
    }

    .level-palette {
      display: flex;
      justify-content: center;
      gap: 16px;
    }

    .palette-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 3px solid rgba(240, 250, 255, 0.4);
      box-shadow: 0 0 12px rgba(240, 250, 255, 0.45);
    }

    .level-story {
      margin-top: 4px;
      padding: 16px;
      border-radius: 18px;
      background: linear-gradient(145deg, rgba(17, 27, 52, 0.8), rgba(35, 19, 60, 0.72));
      border: 1px solid rgba(255, 255, 255, 0.08);
      text-align: left;
      box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.35);
    }

    .theme-dawn .level-story {
      background: linear-gradient(145deg, rgba(68, 42, 62, 0.85), rgba(36, 27, 64, 0.75));
      border-color: rgba(255, 214, 153, 0.4);
    }

    .theme-rail .level-story {
      background: linear-gradient(145deg, rgba(20, 40, 54, 0.85), rgba(14, 32, 44, 0.8));
      border-color: rgba(111, 255, 228, 0.35);
    }

    .theme-tower .level-story {
      background: linear-gradient(145deg, rgba(32, 22, 60, 0.85), rgba(18, 16, 44, 0.85));
      border-color: rgba(168, 146, 255, 0.35);
    }

    .story-arc {
      font-size: 0.85rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(111, 219, 255, 0.85);
    }

    .story-location {
      font-size: 1rem;
      font-weight: 600;
      margin: 6px 0;
      color: #f5f7ff;
    }

    .story-briefing {
      font-size: 0.92rem;
      line-height: 1.5;
      color: rgba(226, 233, 255, 0.78);
      margin-bottom: 6px;
    }

    .story-objective {
      font-size: 0.95rem;
      font-weight: 600;
      color: #ffd86b;
      margin-bottom: 4px;
    }

    .story-mood {
      font-size: 0.85rem;
      color: rgba(196, 207, 255, 0.85);
    }

    @keyframes drift {
      0% { transform: translate(-2%, -1%) scale(1); }
      100% { transform: translate(2%, 3%) scale(1.1); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-18px); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.45; }
      50% { opacity: 0.75; }
    }

    @keyframes twinkle {
      0% { opacity: 0.18; transform: translate3d(0, 0, 0); }
      50% { opacity: 0.42; transform: translate3d(-1%, 1%, 0); }
      100% { opacity: 0.18; transform: translate3d(0, 0, 0); }
    }

    @media (max-width: 768px) {
      .cosmic-stage {
        padding: 40px 20px 60px;
        border-radius: 18px;
      }

      .planet-left, .planet-right {
        opacity: 0.45;
      }

      .light-beam {
        opacity: 0.35;
      }
    }

    @media (max-width: 540px) {
      .level-grid {
        grid-template-columns: 1fr;
      }

      .level-card {
        border-radius: 22px;
      }

      .level-card-inner {
        gap: 18px;
      }
    }
  `]
})
export class LevelSelectorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() levelSelected = new EventEmitter<Level>();
  @ViewChild('levelSelectBgm') levelSelectBgm?: ElementRef<HTMLAudioElement>;
  
  levels: Level[] = [];
  private resumePlaybackHandler?: () => void;
  private readonly baseVolume = 0.5;

  constructor(
    private levelService: LevelService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.levels = this.levelService.getAllLevels();
  }

  ngAfterViewInit(): void {
    const audio = this.levelSelectBgm?.nativeElement;
    if (!audio) {
      return;
    }

    audio.volume = this.baseVolume;
    audio.loop = true;
    this.tryPlayAudio(audio);
  }

  ngOnDestroy(): void {
    this.stopBackgroundAudio();
  }

  /**
   * 處理關卡選擇
   */
  onLevelHover(): void {
    this.feedbackService.playEvent(SfxEvent.UiHover);
  }

  onLevelSelect(level: Level): void {
    this.feedbackService.playEvent(SfxEvent.UiChooseAndClick);
    this.stopBackgroundAudio();
    this.levelSelected.emit(level);
  }

  extractLevelName(name: string): string {
    const parts = name.split(' - ');
    return parts.length > 1 ? parts[1] : name;
  }

  /**
   * 取得難度文字
   */
  getDifficultyText(difficulty: string): string {
    const difficultyMap: { [key: string]: string } = {
      'easy': '簡單',
      'medium': '中等',
      'hard': '困難'
    };
    return difficultyMap[difficulty] || difficulty;
  }

  /**
   * 根據顏色名稱返回實際的顏色值
   */
  getColorValue(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'red': 'var(--color-red)',
      'blue': 'var(--color-blue)',
      'white': 'var(--color-white)'
    };

    return colorMap[colorName] || colorName;
  }

  getThemeClass(level: Level): string {
    const theme = level.story?.theme ?? 'dawn';
    return `theme-${theme}`;
  }

  getThemeFallbackIcon(theme?: string): string {
    switch (theme) {
      case 'rail':
        return '🚝';
      case 'tower':
        return '🛰️';
      default:
        return '🌅';
    }
  }

  private tryPlayAudio(audio: HTMLAudioElement): void {
    audio
      .play()
      .catch(() => {
        this.attachResumePlaybackHandler(audio);
      });
  }

  private attachResumePlaybackHandler(audio: HTMLAudioElement): void {
    this.detachResumePlaybackHandler();

    this.resumePlaybackHandler = () => {
      audio.play().finally(() => {
        this.detachResumePlaybackHandler();
      });
    };

    document.addEventListener('pointerdown', this.resumePlaybackHandler, { once: true });
  }

  private detachResumePlaybackHandler(): void {
    if (!this.resumePlaybackHandler) {
      return;
    }

    document.removeEventListener('pointerdown', this.resumePlaybackHandler);
    this.resumePlaybackHandler = undefined;
  }

  private stopBackgroundAudio(): void {
    const audio = this.levelSelectBgm?.nativeElement;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    this.detachResumePlaybackHandler();
  }
}
