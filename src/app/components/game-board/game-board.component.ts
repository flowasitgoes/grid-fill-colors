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
      </div>

      <div class="game-area">
        <!-- 参考答案 -->
        <div class="reference-section">
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
        <button class="btn btn-primary" (click)="onCheckAnswer()">檢查答案</button>
        <button class="btn btn-secondary" (click)="onReset()">重置</button>
        <button class="btn btn-hint" (click)="onGetHint()">提示</button>
      </div>

    </div>

    <app-completion-overlay
      [visible]="gameSummary !== null"
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
      z-index: 3;
    }

    .reference-section h3 {
      color: #ffffff;
      font-size: 0.9rem;
      margin: 0;
      text-shadow: 0 0 8px rgba(255,255,255,0.35);
      position: relative;
      z-index: 3;
    }

    .reference-grid {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 8px;
      border: 2px solid #ddd;
      box-shadow: 0 0 20px rgba(255,255,255,0.1);
      position: relative;
      z-index: 3;
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
  private checkPulseTimeout: ReturnType<typeof setTimeout> | null = null;
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
        const hadSummary = this.gameSummary !== null;
        const hasSummary = summary !== null;
        this.gameSummary = summary;
        if (!hadSummary && hasSummary) {
          this.feedbackService.stopLoop(SfxEvent.EnvLevelAtmos);
        } else if (hadSummary && !hasSummary && this.currentLevel) {
          this.feedbackService.playLoop(SfxEvent.EnvLevelAtmos);
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
    this.subscriptions.unsubscribe();
    this.feedbackService.stopLoop(SfxEvent.EnvLevelAtmos);
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

    this.initializeLevel(this.currentLevel);
    this.retryLevel.emit();
  }

  handleCompletionNext(): void {
    if (!this.gameSummary || !this.gameWon) {
      return;
    }
    this.nextLevel.emit();
  }

  handleCompletionExit(): void {
    this.exitToMenu.emit();
  }

  private initializeLevel(level: Level): void {
    this.currentLevel = level;
    this.gameService.initGame(level);
    this.feedbackService.playLoop(SfxEvent.EnvLevelAtmos);
    this.gameCompleted = false;
    this.gameWon = false;
    this.gameSummary = null;
    this.checkPulseState = null;
    this.victoryTriggeredByCheckButton = false;
    this.canGoNextLevel = this.levelService.hasNextLevel(level.id);
    if (level.colors && level.colors.length > 0) {
      this.selectedColor = level.colors[0];
    } else {
      this.selectedColor = '';
    }
    this.triggerCheckPulse(null);
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
}

