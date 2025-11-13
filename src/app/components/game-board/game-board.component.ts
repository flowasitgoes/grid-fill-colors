import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridCellComponent } from '../grid-cell/grid-cell.component';
import { GameService } from '../../services/game.service';
import { Level } from '../../models/level.model';
import { FeedbackService } from '../../services/feedback.service';
import { SfxEvent } from '../../models/sfx-event';
import { CompletionOverlayComponent } from '../completion-overlay/completion-overlay.component';
import { GameSummary } from '../../models/game-summary.model';
import { LevelService } from '../../services/level.service';
import { Subscription } from 'rxjs';

/**
 * 遊戲面板元件
 * 顯示參考圖案與可填色的遊戲網格
 */
@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, GridCellComponent, CompletionOverlayComponent],
  template: `
    <div class="game-board-container" *ngIf="currentLevel">
      <div class="stage-lights">
        <span class="beam beam-left"></span>
        <span class="beam beam-right"></span>
        <span class="beam beam-center"></span>
        <span class="beam beam-sweep"></span>
        <span class="ambient ambient-top"></span>
        <span class="ambient ambient-bottom"></span>
      </div>

      <div class="level-info">
        <h2>{{ currentLevel.name }}</h2>
        <div class="level-colors">
          <span>選擇畫筆顏色：</span>
          <div class="color-samples">
            <span 
              *ngFor="let color of currentLevel.colors" 
              class="color-sample"
              [class.selected]="selectedColor === color"
              [style.background-color]="getColorValue(color)"
              [title]="color"
              (click)="selectColor(color)">
            </span>
            <span 
              class="color-sample eraser"
              [class.selected]="selectedColor === ''"
              title="橡皮擦"
              (click)="selectColor('')">
              ✕
            </span>
          </div>
        </div>

        <section
          class="story-spotlight"
          *ngIf="currentLevel.story"
          [ngClass]="getStoryThemeClass(currentLevel)"
        >
          <div class="story-arc">
            <span class="story-icon">{{ getStorySigil(currentLevel) }}</span>
            {{ currentLevel.story?.arc }}
          </div>
          <div class="story-location">
            <span>場景：</span>{{ currentLevel.story.location }}
          </div>
          <p class="story-briefing">{{ currentLevel.story.briefing }}</p>
          <div class="story-artifact" *ngIf="currentLevel.story.artifact">
            <span>道具：</span>{{ currentLevel.story.artifact }}
          </div>
          <div class="story-objective">
            🎯 任務：{{ currentLevel.story.objective }}
          </div>
          <div class="story-mood" *ngIf="currentLevel.story.mood">
            <span>氛圍：</span>{{ currentLevel.story.mood }}
          </div>
        </section>
      </div>

      <!-- 倒计时遮罩 -->
      <div class="countdown-overlay" *ngIf="countdown > 0">
        <div class="countdown-content">
          <!-- 参考答案显示在倒计时上方 -->
          <div class="reference-section" *ngIf="showReference">
            <h3>參考圖案</h3>
            <div class="reference-grid">
              <div *ngFor="let row of currentLevel.solution; let r = index" class="reference-row">
                <div 
                  *ngFor="let color of row; let c = index" 
                  class="reference-cell"
                  [style.background-color]="getColorValue(color)">
                </div>
              </div>
            </div>
          </div>
          <div class="countdown-number">{{ countdown }}</div>
          <div class="countdown-text">準備開始</div>
        </div>
      </div>

      <div class="game-area">

        <!-- 游戏网格 -->
        <div
          class="game-section"
          [class.check-pulse-success]="checkPulseState === 'success'"
          [class.check-pulse-failure]="checkPulseState === 'failure'"
          [class.check-pulse-incomplete]="checkPulseState === 'incomplete'">
          <h3>你的答案</h3>
          <div class="game-grid">
            <div *ngFor="let row of [0,1,2,3,4]" class="grid-row">
              <app-grid-cell
                *ngFor="let col of [0,1,2,3,4]"
                [row]="row"
                [col]="col"
                [color]="getCellColor(row, col)"
                (cellClick)="onCellClick($event)"
                (cellRightClick)="onCellRightClick($event)">
              </app-grid-cell>
            </div>
          </div>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="game-controls">
        <button
          *ngIf="postVictoryControlsVisible"
          type="button"
          class="btn-hold btn-hold--primary victory-inline"
          (click)="showSummaryNow()"
        >
          立即查看成績
        </button>
        <button class="btn btn-primary" (click)="onCheckAnswer()">檢查答案</button>
        <button class="btn btn-secondary" (click)="onReset()">重置</button>
        <button class="btn btn-hint" (click)="onGetHint()">提示</button>
        <button
          *ngIf="postVictoryControlsVisible"
          type="button"
          class="btn btn--secondary victory-inline-next"
          (click)="handleCompletionNext()"
          [disabled]="!canGoNextLevel"
          [attr.aria-disabled]="!canGoNextLevel"
        >
          前往下一關
        </button>
      </div>

        </div>

    <div
      class="victory-hold"
      *ngIf="showVictoryHold && !showSummaryOverlay"
      aria-live="polite"
    >
      <div class="victory-hold__card">
        <div class="victory-hold__content">
          <h3>🎉 恭喜完成挑戰！</h3>
          <p>先在舞台上享受成果，準備好再點擊查看成績。</p>
      </div>

        <div class="victory-hold__actions">
          <button
            type="button"
            class="btn-hold btn-hold--primary"
            (click)="showSummaryNow()"
          >
            立即查看成績
          </button>
          <button
            type="button"
            class="btn-hold btn-hold--close"
            (click)="showVictoryHold = false"
          >
            謝謝先不用
          </button>
    </div>
      </div>
    </div>

    <app-completion-overlay
      [visible]="showSummaryOverlay"
      [summary]="gameSummary"
      [isVictory]="gameWon"
      [canGoNext]="canGoNextLevel"
      (retry)="handleCompletionRetry()"
      (next)="handleCompletionNext()"
      (exit)="handleCompletionExit()"
    ></app-completion-overlay>
  `,
  styles: [`
    .game-board-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      position: relative;
      overflow: hidden;
      background: rgba(13, 18, 47, 0.6);
      border-radius: 24px;
      padding: 48px 60px 54px;
      box-shadow: 0 28px 72px rgba(0,0,0,0.4);
      backdrop-filter: blur(6px);
    }

    .level-info {
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .level-info h2 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 1.5rem;
    }

    .level-colors {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 14px;
      color: #555;
      position: relative;
      z-index: 2;
    }

    .color-samples {
      display: flex;
      gap: 8px;
    }

    .color-sample {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border);
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.24s ease, box-shadow 0.24s ease;
      font-size: 24px;
      font-weight: bold;
      color: #666;
      position: relative;
      overflow: hidden;
      background-image: linear-gradient(145deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05));
      box-shadow: inset 0 0 18px rgba(255,255,255,0.18);
    }

    .color-sample:hover {
      transform: translateY(-2px) scale(1.1);
      box-shadow: 0 6px 14px rgba(0,0,0,0.2);
    }

    .color-sample.selected {
      border: 4px solid #2c3e50;
      box-shadow: 0 0 18px rgba(102, 126, 234, 0.45);
      transform: scale(1.08);
      animation: colorGlow 600ms ease;
      background-image: linear-gradient(145deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2));
    }

    .color-sample::after {
      content: '';
      position: absolute;
      inset: -40%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 60%);
      opacity: 0;
      transform: scale(0.4);
      transition: opacity 0.35s ease, transform 0.35s ease;
      pointer-events: none;
    }

    .color-sample:hover::after,
    .color-sample.selected::after {
      opacity: 0.9;
      transform: scale(1);
    }

    .color-sample.eraser {
      background-color: white;
      border: 3px dashed var(--color-border);
    }

    .story-spotlight {
      margin: 22px auto 0;
      max-width: 540px;
      padding: 18px 20px;
      border-radius: 20px;
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(226, 240, 255, 0.9));
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.15);
      text-align: left;
      color: #1e2a44;
    }

    .story-spotlight .story-arc {
      font-size: 0.9rem;
      letter-spacing: 2px;
      color: #5c6ac4;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .story-spotlight .story-icon {
      font-size: 1.4rem;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25));
    }

    .story-spotlight .story-location {
      font-weight: 600;
      margin: 6px 0;
    }

    .story-spotlight .story-briefing {
      margin: 0 0 8px;
      color: #445;
      line-height: 1.5;
    }

    .story-spotlight .story-artifact {
      font-size: 0.92rem;
      color: #2c3e50;
      margin-bottom: 6px;
    }

    .story-spotlight .story-objective {
      font-weight: 600;
      color: #d35400;
      margin-bottom: 4px;
    }

    .story-spotlight .story-mood {
      font-size: 0.85rem;
      color: #5d6d7e;
    }

    .story-spotlight.theme-dawn {
      background: linear-gradient(140deg, rgba(255, 243, 220, 0.95), rgba(232, 219, 255, 0.92));
      box-shadow: 0 20px 40px rgba(255, 194, 132, 0.2);
    }

    .story-spotlight.theme-rail {
      background: linear-gradient(140deg, rgba(216, 255, 248, 0.95), rgba(208, 236, 255, 0.94));
      box-shadow: 0 20px 40px rgba(111, 255, 228, 0.2);
    }

    .story-spotlight.theme-tower {
      background: linear-gradient(140deg, rgba(234, 225, 255, 0.95), rgba(210, 224, 255, 0.94));
      box-shadow: 0 20px 40px rgba(158, 138, 255, 0.22);
    }

    .game-area {
      display: flex;
      gap: 20px;
      align-items: flex-start;
      justify-content: center;
      position: relative;
      z-index: 2;
      padding: 30px;
      border-radius: 20px;
      background: rgba(12, 15, 38, 0.55);
      overflow: hidden;
      box-shadow: inset 0 0 25px rgba(82, 96, 255, 0.2);
    }

    .game-area::before {
      content: '';
      position: absolute;
      inset: -60px -120px;
      background:
        radial-gradient(circle at 20% 20%, rgba(108, 92, 231, 0.45), transparent 55%),
        radial-gradient(circle at 80% 20%, rgba(52, 152, 219, 0.4), transparent 55%),
        radial-gradient(circle at 50% 90%, rgba(255, 82, 196, 0.3), transparent 60%);
      animation: ambientDrift 16s ease-in-out infinite alternate;
      pointer-events: none;
      filter: blur(30px);
      transform: rotate(2deg);
    }

    .reference-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      position: relative;
      z-index: 1001;
      transition: opacity 0.3s ease;
    }

    .reference-section h3 {
      color: #ffffff;
      font-size: 0.9rem;
      margin: 0;
      text-shadow: 0 0 8px rgba(255,255,255,0.35);
      position: relative;
      z-index: 3;
    }

    .countdown-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      animation: countdownFadeIn 0.3s ease;
      pointer-events: none;
    }

    .countdown-content {
      text-align: center;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    .countdown-content .reference-section {
      z-index: 1002;
      margin-bottom: 20px;
    }

    .countdown-content .reference-section h3 {
      color: #ffffff;
      font-size: 1.1rem;
      margin-bottom: 15px;
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    }

    .countdown-content .reference-grid {
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.4),
                  0 0 60px rgba(102, 126, 234, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.5);
    }

    .countdown-number {
      font-size: 8rem;
      font-weight: bold;
      line-height: 1;
      text-shadow: 0 0 40px rgba(255, 255, 255, 0.8),
                   0 0 80px rgba(102, 126, 234, 0.6);
      animation: countdownPulse 0.8s ease-out;
      background: linear-gradient(135deg, #ffffff 0%, #93dfff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .countdown-text {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: 2px;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }

    @keyframes countdownFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes countdownPulse {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .reference-grid {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 8px;
      border: 2px solid #ddd;
      box-shadow: 0 0 20px rgba(255,255,255,0.3);
      position: relative;
      z-index: 1001;
    }

    .reference-row {
      display: flex;
      gap: 1px;
    }

    .reference-cell {
      width: 25px;
      height: 25px;
      border: 1px solid var(--color-border);
    }

    .game-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      position: relative;
      transition: box-shadow 0.35s ease, transform 0.35s ease;
      z-index: 2;
      border: 2px solid rgba(102, 126, 234, 0.35);
      background-image: linear-gradient(160deg, rgba(255,255,255,0.92), rgba(230,240,255,0.85));
    }

    .game-section h3 {
      color: #2c3e50;
      font-size: 1.2rem;
      margin: 0;
    }

    .game-grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: transform 0.25s ease;
      position: relative;
    }

    .grid-row {
      display: flex;
      gap: 2px;
    }

    .game-controls {
      display: flex;
      gap: 15px;
      position: relative;
      z-index: 2;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-secondary {
      background: #95a5a6;
      color: white;
    }

    .btn-hint {
      background: #f39c12;
      color: white;
    }

    .btn--secondary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 10px 24px rgba(102, 126, 234, 0.25);
    }

    .btn--secondary[disabled],
    .btn--secondary[aria-disabled='true'] {
      opacity: 0.5;
      cursor: not-allowed;
      box-shadow: none;
    }

    .game-controls .btn-hold {
      border-radius: 999px;
      padding: 10px 20px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      background: linear-gradient(135deg, #ff9aa2 0%, #ffd97d 100%);
      color: #2b1950;
      box-shadow: 0 10px 24px rgba(255, 154, 162, 0.28);
    }

    .game-controls .btn-hold:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(255, 154, 162, 0.38);
    }

    .victory-hold {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 950;
      pointer-events: none;
    }

    .victory-hold__card {
      pointer-events: auto;
      background: rgba(12, 20, 48, 0.88);
      border-radius: 20px;
      padding: 24px 28px;
      color: #f3f6ff;
      box-shadow: 0 24px 60px rgba(4, 8, 28, 0.6);
      border: 1px solid rgba(138, 169, 255, 0.25);
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: min(420px, 90vw);
      text-align: center;
      animation: holdFade 0.3s ease;
    }

    .victory-hold__content h3 {
      margin: 0;
      font-size: 1.6rem;
      letter-spacing: 1px;
    }

    .victory-hold__content p {
      margin: 0;
      font-size: 1.05rem;
      color: rgba(220, 232, 255, 0.85);
    }

    .victory-hold__actions {
      display: flex;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn-hold {
      border: none;
      border-radius: 999px;
      padding: 10px 20px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .btn-hold--primary {
      background: linear-gradient(135deg, #ff9aa2 0%, #ffd97d 100%);
      color: #2b1950;
      box-shadow: 0 10px 24px rgba(255, 154, 162, 0.32);
    }

    .btn-hold--primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(255, 154, 162, 0.42);
    }

    .btn-hold--close {
      background: transparent;
      color: rgba(235, 244, 255, 0.8);
      border: 1px solid rgba(235, 244, 255, 0.35);
      padding-inline: 16px;
    }

    .btn-hold--close:hover {
      transform: translateY(-1px);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.6);
    }

    @keyframes holdFade {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .game-section.check-pulse-success {
      animation: pulseSuccess 650ms ease;
    }

    .game-section.check-pulse-failure {
      animation: pulseFailure 650ms ease;
    }

    .game-section.check-pulse-incomplete {
      animation: pulseIncomplete 650ms ease;
    }

    @keyframes colorGlow {
      0% {
        box-shadow: 0 0 0 rgba(102, 126, 234, 0);
      }
      40% {
        box-shadow: 0 0 25px rgba(102, 126, 234, 0.5);
      }
      100% {
        box-shadow: 0 0 18px rgba(102, 126, 234, 0.45);
      }
    }

    @keyframes pulseSuccess {
      0% {
        box-shadow: 0 0 0 rgba(46, 204, 113, 0.0);
        transform: translateY(0);
      }
      45% {
        box-shadow: 0 0 24px rgba(46, 204, 113, 0.55);
        transform: translateY(-3px) scale(1.01);
      }
      100% {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(0);
      }
    }

    @keyframes pulseFailure {
      0% {
        box-shadow: 0 0 0 rgba(231, 76, 60, 0.0);
      }
      40% {
        box-shadow: 0 0 26px rgba(231, 76, 60, 0.55);
      }
      100% {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    }

    @keyframes pulseIncomplete {
      0% {
        box-shadow: 0 0 0 rgba(243, 156, 18, 0.0);
      }
      45% {
        box-shadow: 0 0 26px rgba(243, 156, 18, 0.5);
      }
      100% {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    }

    .stage-lights {
      position: absolute;
      inset: -160px -120px;
      pointer-events: none;
      z-index: 1;
    }

    .stage-lights .beam {
      position: absolute;
      top: 0;
      width: 220px;
      height: 140%;
      background: radial-gradient(circle at top, rgba(255,255,255,0.6), rgba(255,255,255,0.08), transparent 70%);
      mix-blend-mode: screen;
      opacity: 0.8;
      filter: blur(8px);
      transform-origin: top center;
      animation: beamPulse 4s ease-in-out infinite;
    }

    .beam-left {
      left: 0;
      transform: rotate(-18deg) translateX(-10%);
      background: radial-gradient(circle at top, rgba(231, 76, 60, 0.65), rgba(231, 76, 60, 0.08), transparent 75%);
    }

    .beam-right {
      right: 0;
      transform: rotate(18deg) translateX(10%);
      background: radial-gradient(circle at top, rgba(52, 152, 219, 0.68), rgba(52, 152, 219, 0.1), transparent 75%);
      animation-delay: 1.2s;
    }

    .beam-center {
      left: 50%;
      transform: translateX(-50%);
      width: 280px;
      background: radial-gradient(circle at top, rgba(155, 89, 182, 0.6), rgba(155, 89, 182, 0.08), transparent 75%);
      animation-delay: 0.5s;
    }

    .beam-sweep {
      left: 50%;
      width: 180px;
      transform: translateX(-50%) rotate(-6deg);
      background: radial-gradient(circle at top, rgba(255, 214, 102, 0.7), rgba(255, 214, 102, 0.05), transparent 75%);
      animation: beamSweep 9s linear infinite;
      opacity: 0.6;
    }

    .stage-lights .ambient {
      position: absolute;
      left: 50%;
      width: 160%;
      height: 160px;
      transform: translateX(-50%);
      background: radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 70%);
      filter: blur(40px);
      opacity: 0.8;
      mix-blend-mode: screen;
    }

    .ambient-top {
      top: -60px;
      animation: ambientPulse 6s ease-in-out infinite;
    }

    .ambient-bottom {
      bottom: -60px;
      animation: ambientPulse 7s ease-in-out infinite alternate;
    }

    @keyframes beamPulse {
      0%, 100% {
        opacity: 0.55;
      }
      50% {
        opacity: 0.95;
      }
    }

    @keyframes beamSweep {
      0% {
        transform: translateX(-50%) rotate(-12deg);
        opacity: 0.25;
      }
      40% {
        transform: translateX(-40%) rotate(8deg);
        opacity: 0.7;
      }
      70% {
        transform: translateX(-58%) rotate(-18deg);
        opacity: 0.5;
      }
      100% {
        transform: translateX(-50%) rotate(-12deg);
        opacity: 0.25;
      }
    }

    @keyframes ambientPulse {
      0%, 100% {
        opacity: 0.35;
        transform: translateX(-50%) scale(1);
      }
      50% {
        opacity: 0.75;
        transform: translateX(-50%) scale(1.15);
      }
    }

    @keyframes ambientDrift {
      0% {
        transform: rotate(2deg) scale(1);
      }
      100% {
        transform: rotate(-3deg) scale(1.05);
      }
    }

    @media (max-width: 768px) {
      .game-area {
        flex-direction: column;
        gap: 20px;
      }

      .reference-cell {
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class GameBoardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() level: Level | null = null;
  @Output() retryLevel = new EventEmitter<void>();
  @Output() nextLevel = new EventEmitter<void>();
  @Output() exitToMenu = new EventEmitter<void>();
  
  currentLevel: Level | null = null;
  gameCompleted: boolean = false;
  gameWon: boolean = false;
  selectedColor: string = '';  // 當前選中的畫筆顏色
  checkPulseState: 'success' | 'failure' | 'incomplete' | null = null;
  gameSummary: GameSummary | null = null;
  canGoNextLevel = false;
  showSummaryOverlay = false;
  showVictoryHold = false;
  countdown: number = 0;  // 倒计时数字
  showReference: boolean = false;  // 是否显示参考答案
  private checkPulseTimeout: ReturnType<typeof setTimeout> | null = null;
  private countdownInterval: ReturnType<typeof setInterval> | null = null;
  private referenceHideTimeout: ReturnType<typeof setTimeout> | null = null;
  private victoryTriggeredByCheckButton = false;
  private subscriptions = new Subscription();

  constructor(
    private gameService: GameService,
    private feedbackService: FeedbackService,
    private levelService: LevelService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.gameService.gameCompleted$.subscribe(completed => {
        this.gameCompleted = completed;
      })
    );

    this.subscriptions.add(
      this.gameService.gameWon$.subscribe(won => {
        const previousState = this.gameWon;
        this.gameWon = won;
        if (won && !previousState) {
          if (!this.victoryTriggeredByCheckButton) {
            this.feedbackService.playCheckAnswer(true);
            this.feedbackService.playEvent(SfxEvent.GameFinishFireworks);
          }
          this.victoryTriggeredByCheckButton = false;
        } else if (!won) {
          this.victoryTriggeredByCheckButton = false;
        }
      })
    );

    this.subscriptions.add(
      this.gameService.gameSummary$.subscribe(summary => {
        this.gameSummary = summary;
        if (!summary) {
          this.showVictoryHold = false;
          this.showSummaryOverlay = false;
          return;
        }

        if (summary.correct) {
          this.showVictoryHold = true;
          this.showSummaryOverlay = false;
        } else {
          this.openSummaryOverlay();
        }
      })
    );

    if (this.level && !this.currentLevel) {
      this.initializeLevel(this.level);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('level' in changes) {
      const current: Level | null = changes['level'].currentValue;
      if (current && (!this.currentLevel || this.currentLevel.id !== current.id)) {
        this.initializeLevel(current);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.checkPulseTimeout) {
      clearTimeout(this.checkPulseTimeout);
      this.checkPulseTimeout = null;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    if (this.referenceHideTimeout) {
      clearTimeout(this.referenceHideTimeout);
      this.referenceHideTimeout = null;
    }
    this.subscriptions.unsubscribe();
    this.feedbackService.stopLoop(SfxEvent.EnvLevelAtmos);
    this.feedbackService.stopLoop(SfxEvent.EnvCountdownBg);
  }

  /**
   * 選擇畫筆顏色
   */
  selectColor(color: string): void {
    this.selectedColor = color;
    this.feedbackService.playColorSwitch(color || 'empty');
    this.feedbackService.playEvent(SfxEvent.UiClick);
  }

  /**
   * 取得單元格顏色
   */
  getCellColor(row: number, col: number): string {
    return this.gameService.getCellColor(row, col);
  }

  /**
   * 處理單元格點擊：用選中的畫筆顏色填充
   */
  onCellClick(event: {row: number, col: number}): void {
    this.gameService.fillCellWithColor(event.row, event.col, this.selectedColor);
    if (this.selectedColor) {
      this.feedbackService.playColorFill(this.selectedColor);
    } else {
      this.feedbackService.playCellErase();
    }
  }

  /**
   * 處理單元格右鍵點擊（清空）
   */
  onCellRightClick(event: {row: number, col: number}): void {
    this.gameService.clearCell(event.row, event.col);
    this.feedbackService.playCellErase();
  }

  /**
   * 檢查答案
   */
  onCheckAnswer(): void {
    this.feedbackService.playEvent(SfxEvent.UiClick);
    const result = this.gameService.checkAnswer();

    if (!result.completed) {
      this.triggerCheckPulse('incomplete');
      this.feedbackService.playEvent(SfxEvent.GameCheckIncomplete);
      alert('請先填滿所有格子！');
      return;
    }

    this.triggerCheckPulse(result.correct ? 'success' : 'failure');
    if (result.correct) {
      this.victoryTriggeredByCheckButton = true;
      this.feedbackService.playCheckAnswer(true);
      this.feedbackService.playEvent(SfxEvent.GameFinishFireworks);
    } else {
      this.feedbackService.playCheckAnswer(false);
    }
  }

  /**
   * 重置游戏
   */
  onReset(): void {
    this.feedbackService.playEvent(SfxEvent.UiClick);
    if (confirm('確定要重置遊戲嗎？')) {
      if (this.currentLevel) {
        this.initializeLevel(this.currentLevel);
      } else {
      this.gameService.resetGame();
      this.gameCompleted = false;
      this.gameWon = false;
      this.triggerCheckPulse(null);
      }
      this.feedbackService.playEvent(SfxEvent.UiPopupClose);
    }
  }

  /**
   * 获取提示
   */
  onGetHint(): void {
    this.feedbackService.playEvent(SfxEvent.UiClick);
    const hint = this.gameService.getHint();
    if (hint) {
      // 提示已自動填充，無需額外操作
      this.feedbackService.playEvent(SfxEvent.GameHintSuccess);
    } else {
      alert('恭喜！所有格子都正確了！');
    }
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

  handleCompletionRetry(): void {
    if (!this.currentLevel) {
      return;
    }

    this.showSummaryOverlay = false;
    this.showVictoryHold = false;
    console.log('[GameBoard] Retry current level', {
      levelId: this.currentLevel.id,
      levelName: this.currentLevel.name
    });
    this.initializeLevel(this.currentLevel);
    this.retryLevel.emit();
  }

  handleCompletionNext(): void {
    if (!this.gameSummary || !this.gameWon || !this.canGoNextLevel) {
      console.log('[GameBoard] Next level click ignored', {
        hasSummary: !!this.gameSummary,
        gameWon: this.gameWon,
        canGoNextLevel: this.canGoNextLevel
      });
      return;
    }
    this.showSummaryOverlay = false;
    this.showVictoryHold = false;
    console.log('[GameBoard] Proceed to next level', {
      currentLevelId: this.currentLevel?.id,
      nextLevelAvailable: this.canGoNextLevel
    });
    this.nextLevel.emit();
  }

  handleCompletionExit(): void {
    this.showSummaryOverlay = false;
    this.showVictoryHold = false;
    console.log('[GameBoard] Exit to menu requested');
    this.exitToMenu.emit();
  }

  showSummaryNow(): void {
    console.log('[GameBoard] Forcing summary overlay open', {
      hasSummary: !!this.gameSummary,
      showVictoryHold: this.showVictoryHold
    });
    this.openSummaryOverlay();
  }

  get postVictoryControlsVisible(): boolean {
    return this.gameWon && !!this.gameSummary && !this.showSummaryOverlay && !this.showVictoryHold;
  }

  private initializeLevel(level: Level): void {
    // 清理之前的定时器
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    if (this.referenceHideTimeout) {
      clearTimeout(this.referenceHideTimeout);
      this.referenceHideTimeout = null;
    }
    
    // 停止倒计时背景音乐（如果正在播放）
    this.feedbackService.stopLoop(SfxEvent.EnvCountdownBg);

    this.currentLevel = level;
    this.gameService.initGame(level);
    this.gameCompleted = false;
    this.gameWon = false;
    this.gameSummary = null;
    this.showSummaryOverlay = false;
    this.showVictoryHold = false;
    this.checkPulseState = null;
    this.victoryTriggeredByCheckButton = false;
    this.canGoNextLevel = this.levelService.hasNextLevel(level.id);
    this.showReference = false;
    
    if (level.colors && level.colors.length > 0) {
      this.selectedColor = level.colors[0];
    } else {
      this.selectedColor = '';
    }
    this.triggerCheckPulse(null);

    // 启动倒计时
    this.startCountdown();
  }

  /**
   * 启动倒计时并显示参考答案
   */
  private startCountdown(): void {
    this.countdown = 6;  // 从6开始
    this.showReference = true;
    
    // 播放倒计时背景音乐
    this.feedbackService.playLoop(SfxEvent.EnvCountdownBg);
    
    // 第1秒（6→5）不播放 countdown 音效，只显示数字变化

    this.countdownInterval = setInterval(() => {
      this.countdown--;
      
      if (this.countdown > 1) {
        // 从第2秒开始（5, 4, 3, 2）播放倒计时音效
        // 音调随数字变化逐渐下降，模仿原文件的音阶变化
        const remaining = this.countdown;
        // 5, 4, 3, 2 对应音调：1.15, 1.11, 1.07, 1.03
        const pitch = 1.15 - (5 - remaining) * 0.04;
        this.feedbackService.playEvent(SfxEvent.UiCountdown, { playbackRate: pitch });
      } else if (this.countdown === 1) {
        // 数字1，播放最后一个倒计时音效
        this.feedbackService.playEvent(SfxEvent.UiCountdown, { playbackRate: 0.99 });
      } else {
        // 倒计时结束（countdown === 0），播放开始音效
        if (this.countdownInterval) {
          clearInterval(this.countdownInterval);
          this.countdownInterval = null;
        }
        
        // 停止倒计时背景音乐
        this.feedbackService.stopLoop(SfxEvent.EnvCountdownBg);
        
        // 播放开始音效（使用更高的音调表示开始）
        this.feedbackService.playEvent(SfxEvent.UiCountdown, { playbackRate: 1.3 });
        this.showReference = false;
        this.feedbackService.playLoop(SfxEvent.EnvLevelAtmos);
      }
    }, 1000);
  }

  private triggerCheckPulse(state: 'success' | 'failure' | 'incomplete' | null): void {
    if (this.checkPulseTimeout) {
      clearTimeout(this.checkPulseTimeout);
      this.checkPulseTimeout = null;
    }

    this.checkPulseState = null;

    if (!state) {
      return;
    }

    const frameHandler = () => {
      this.checkPulseState = state;
      this.checkPulseTimeout = setTimeout(() => {
        this.checkPulseState = null;
        this.checkPulseTimeout = null;
      }, 650);
    };

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.requestAnimationFrame(frameHandler);
    } else {
      frameHandler();
    }
  }

  private openSummaryOverlay(): void {
    if (!this.gameSummary) {
      console.log('[GameBoard] openSummaryOverlay aborted: missing summary');
      return;
    }
    this.showVictoryHold = false;
    if (!this.showSummaryOverlay) {
      this.showSummaryOverlay = true;
      this.feedbackService.stopLoop(SfxEvent.EnvLevelAtmos);
      console.log('[GameBoard] Summary overlay opened', {
        levelId: this.gameSummary.levelId,
        correct: this.gameSummary.correct,
        durationMs: this.gameSummary.durationMs
      });
    }
  }

  getStoryThemeClass(level?: Level | null): string {
    const theme = level?.story?.theme ?? 'dawn';
    return `theme-${theme}`;
  }

  getStorySigil(level?: Level | null): string {
    const theme = level?.story?.theme;
    return level?.story?.sigil || this.getThemeIcon(theme);
  }

  private getThemeIcon(theme?: string): string {
    switch (theme) {
      case 'rail':
        return '🚝';
      case 'tower':
        return '🛰️';
      default:
        return '🌅';
    }
  }
}
