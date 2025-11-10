import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSummary } from '../../models/game-summary.model';

interface StatItem {
  label: string;
  value: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-completion-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="completion-overlay" *ngIf="visible && summary">
      <div class="completion-overlay__backdrop"></div>

      <div
        class="completion-overlay__card"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="dialogAriaLabel"
      >
        <div class="completion-overlay__header" [class.success]="isVictory" [class.failure]="!isVictory">
          <div class="completion-overlay__glow"></div>
          <div class="completion-overlay__badge">
            <span *ngIf="isVictory">🎉</span>
            <span *ngIf="!isVictory">💡</span>
          </div>
          <h2>{{ isVictory ? '完成啦！' : '再試一次吧' }}</h2>
          <p>
            {{ isVictory ? '你的節奏完美呈現這幅圖案！' : '有幾格還沒對上，看看統計調整策略。' }}
          </p>
        </div>

        <div class="completion-overlay__body">
          <section class="completion-overlay__stats">
            <h3>完成統計</h3>
            <dl class="stats-grid">
              <div
                class="stats-grid__item"
                *ngFor="let item of statItems"
                [class.stats-grid__item--highlight]="item.highlight"
              >
                <dt class="stats-grid__label">{{ item.label }}</dt>
                <dd class="stats-grid__value">{{ item.value }}</dd>
              </div>
            </dl>
          </section>

          <section class="completion-overlay__preview">
            <div class="preview-card">
              <header>
                <span class="preview-card__title">完成樣貌</span>
                <span class="preview-card__timestamp">{{ summary?.completedAt | date: 'shortTime' }}</span>
              </header>
              <div class="preview-card__grid">
                <div *ngFor="let row of summary?.finalGrid" class="preview-card__row">
                  <div
                    *ngFor="let color of row"
                    class="preview-card__cell"
                    [style.background-color]="color || 'transparent'"
                  >
                  </div>
                </div>
              </div>
              <footer>
                <button type="button" class="btn btn--ghost" disabled aria-disabled="true">
                  即將支援分享
                </button>
              </footer>
            </div>
          </section>
        </div>

        <div class="completion-overlay__actions">
          <button type="button" class="btn btn--primary" (click)="handleRetry()">重玩本關</button>
          <button
            type="button"
            class="btn btn--secondary"
            (click)="handleNext()"
            [disabled]="!canGoNext || !isVictory"
          [class.btn--disabled]="!canGoNext || !isVictory"
          [attr.aria-disabled]="!canGoNext || !isVictory"
          >
            {{ nextButtonLabel }}
          </button>
          <button type="button" class="btn btn--link" (click)="handleExit()">返回選單</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .completion-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
      backdrop-filter: blur(4px);
    }

    .completion-overlay__backdrop {
      position: absolute;
      inset: 0;
      background: linear-gradient(160deg, rgba(8, 16, 48, 0.86), rgba(12, 24, 68, 0.8));
      opacity: 0.92;
    }

    .completion-overlay__card {
      position: relative;
      width: min(940px, 90vw);
      background: rgba(18, 24, 56, 0.92);
      border-radius: 28px;
      box-shadow: 0 32px 60px rgba(4, 10, 32, 0.6);
      padding: 36px;
      color: #f5f8ff;
      display: flex;
      flex-direction: column;
      gap: 28px;
      z-index: 1;
      overflow: hidden;
    }

    .completion-overlay__card::after {
      content: '';
      position: absolute;
      inset: -40%;
      background: radial-gradient(circle at top, rgba(122, 109, 255, 0.25), transparent 65%);
      pointer-events: none;
    }

    .completion-overlay__header {
      position: relative;
      padding: 28px;
      border-radius: 22px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 12px;
      text-align: center;
      background: linear-gradient(135deg, rgba(97, 143, 255, 0.22), rgba(97, 77, 255, 0.1));
      border: 1px solid rgba(162, 189, 255, 0.25);
    }

    .completion-overlay__header.success {
      background: linear-gradient(135deg, rgba(72, 187, 120, 0.28), rgba(98, 222, 192, 0.16));
      border-color: rgba(173, 246, 222, 0.32);
    }

    .completion-overlay__header.failure {
      background: linear-gradient(135deg, rgba(231, 111, 133, 0.22), rgba(255, 225, 137, 0.12));
      border-color: rgba(255, 171, 171, 0.32);
    }

    .completion-overlay__glow {
      position: absolute;
      inset: -20%;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.25), transparent 70%);
      opacity: 0.5;
      pointer-events: none;
    }

    .completion-overlay__badge {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.16);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      margin: 0 auto;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    }

    .completion-overlay__header h2 {
      font-size: clamp(1.8rem, 3vw, 2.2rem);
      margin: 0;
      letter-spacing: 1px;
    }

    .completion-overlay__header p {
      margin: 0;
      color: rgba(236, 244, 255, 0.78);
      font-size: 1rem;
    }

    .completion-overlay__body {
      display: grid;
      grid-template-columns: minmax(260px, 1.4fr) minmax(240px, 1fr);
      gap: 24px;
    }

    .completion-overlay__stats {
      background: rgba(20, 28, 66, 0.72);
      border-radius: 22px;
      padding: 24px;
      box-shadow: inset 0 0 26px rgba(52, 82, 255, 0.1);
      border: 1px solid rgba(118, 148, 255, 0.18);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .completion-overlay__stats h3 {
      margin: 0;
      font-size: 1.1rem;
      letter-spacing: 1px;
      color: rgba(207, 220, 255, 0.92);
    }

    .stats-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      margin: 0;
    }

    .stats-grid__item {
      background: rgba(12, 20, 50, 0.72);
      border-radius: 18px;
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      border: 1px solid rgba(86, 112, 210, 0.25);
      box-shadow: 0 10px 24px rgba(2, 12, 36, 0.3);
    }

    .stats-grid__item--highlight {
      background: linear-gradient(135deg, rgba(255, 215, 120, 0.28), rgba(255, 162, 92, 0.18));
      border-color: rgba(255, 215, 120, 0.4);
      color: #281a00;
    }

    .stats-grid__item dt,
    .stats-grid__item dd {
      margin: 0;
    }

    .stats-grid__label {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: rgba(206, 218, 255, 0.7);
    }

    .stats-grid__item--highlight .stats-grid__label {
      color: rgba(66, 48, 12, 0.75);
    }

    .stats-grid__value {
      font-size: 1.4rem;
      font-weight: 700;
      color: rgba(245, 248, 255, 0.96);
    }

    .stats-grid__item--highlight .stats-grid__value {
      color: #543200;
    }

    .completion-overlay__preview {
      display: flex;
      align-items: stretch;
    }

    .preview-card {
      background: linear-gradient(160deg, rgba(32, 40, 88, 0.85), rgba(24, 18, 76, 0.78));
      border-radius: 22px;
      padding: 20px;
      border: 1px solid rgba(132, 158, 255, 0.22);
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
    }

    .preview-card header,
    .preview-card footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .preview-card__title {
      font-weight: 600;
      letter-spacing: 1px;
      color: rgba(220, 230, 255, 0.92);
    }

    .preview-card__timestamp {
      font-size: 0.85rem;
      color: rgba(199, 210, 255, 0.6);
    }

    .preview-card__grid {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
    }

    .preview-card__row {
      display: flex;
      gap: 4px;
    }

    .preview-card__cell {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid rgba(14, 18, 40, 0.5);
      box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.16);
    }

    .completion-overlay__actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    .btn {
      border: none;
      border-radius: 999px;
      padding: 12px 28px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease;
      letter-spacing: 0.5px;
    }

    .btn:focus-visible {
      outline: 3px solid rgba(116, 174, 255, 0.4);
      outline-offset: 3px;
    }

    .btn--primary {
      background: linear-gradient(135deg, #ff9aa2 0%, #ffd97d 100%);
      color: #2b1950;
      box-shadow: 0 12px 24px rgba(255, 154, 162, 0.35);
    }

    .btn--primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 28px rgba(255, 154, 162, 0.45);
    }

    .btn--secondary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      box-shadow: 0 10px 22px rgba(118, 75, 162, 0.35);
    }

    .btn--secondary:hover:not(.btn--disabled) {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(118, 75, 162, 0.45);
    }

    .btn--disabled {
      cursor: not-allowed;
      opacity: 0.5;
      box-shadow: none;
    }

    .btn--secondary.btn--disabled {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.35), rgba(118, 75, 162, 0.35));
    }

    .btn--link {
      background: transparent;
      color: rgba(214, 225, 255, 0.85);
      padding: 12px 18px;
      box-shadow: none;
    }

    .btn--link:hover {
      color: #ffffff;
      transform: translateY(-1px);
    }

    .btn--ghost {
      border-radius: 999px;
      padding: 10px 18px;
      font-weight: 600;
      border: 1px dashed rgba(198, 210, 255, 0.4);
      background: transparent;
      color: rgba(198, 210, 255, 0.7);
      cursor: not-allowed;
    }

    @media (max-width: 960px) {
      .completion-overlay__body {
        grid-template-columns: 1fr;
      }

      .completion-overlay__card {
        padding: 28px;
        max-height: 90vh;
        overflow-y: auto;
      }
    }

    @media (max-width: 540px) {
      .completion-overlay__card {
        padding: 24px 18px;
      }

      .completion-overlay__actions {
        flex-direction: column;
        align-items: stretch;
      }

      .btn {
        width: 100%;
      }
    }
  `]
})
export class CompletionOverlayComponent {
  @Input() summary: GameSummary | null = null;
  @Input() visible = false;
  @Input() isVictory = false;
  @Input() canGoNext = false;

  @Output() retry = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();

  get statItems(): StatItem[] {
    if (!this.summary) {
      return [];
    }

    const totalActions = this.summary.totalActions;
    const gradeLabel = this.getGradeLabel(this.summary.efficiencyGrade);

    return [
      {
        label: '完成耗時',
        value: this.formatDuration(this.summary.durationMs),
      },
      {
        label: '提示次數',
        value: `${this.summary.hintCount}`,
      },
      {
        label: '填色步數',
        value: `${this.summary.fillActions} 次`,
      },
      {
        label: '擦除次數',
        value: `${this.summary.eraseActions} 次`,
      },
      {
        label: '總操作數',
        value: `${totalActions} 次`,
      },
      {
        label: '最佳連續正確',
        value: this.summary.bestStreak > 0 ? `${this.summary.bestStreak} 格` : '-',
      },
      {
        label: '效率評等',
        value: gradeLabel,
        highlight: true
      }
    ];
  }

  get nextButtonLabel(): string {
    if (!this.isVictory) {
      return '完成關卡後解鎖';
    }
    return this.canGoNext ? '挑戰下一關' : '已是最後一關';
  }

  get dialogAriaLabel(): string {
    return this.isVictory ? '關卡完成資訊對話框' : '尚未完成提示對話框';
  }

  handleRetry(): void {
    this.retry.emit();
  }

  handleNext(): void {
    if (!this.canGoNext || !this.isVictory) {
      return;
    }
    this.next.emit();
  }

  handleExit(): void {
    this.exit.emit();
  }

  private formatDuration(durationMs: number): string {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const fractional = Math.floor((durationMs % 1000) / 100);
    if (minutes > 0) {
      return `${minutes} 分 ${seconds.toString().padStart(2, '0')} 秒`;
    }
    return `${seconds}.${fractional}s`;
  }

  private getGradeLabel(grade: GameSummary['efficiencyGrade']): string {
    const gradeMap: Record<GameSummary['efficiencyGrade'], string> = {
      A: 'A · 專業調色師',
      B: 'B · 優秀節奏感',
      C: 'C · 再磨練一下'
    };
    return gradeMap[grade] ?? grade;
  }
}

