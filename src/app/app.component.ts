import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSelectorComponent } from './components/level-selector/level-selector.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { Level } from './models/level.model';
import { LandingScreenComponent } from './components/landing-screen/landing-screen.component';
import { LevelService } from './services/level.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LandingScreenComponent, LevelSelectorComponent, GameBoardComponent],
  template: `
    <ng-container *ngIf="showLanding; else gameShell">
      <app-landing-screen
        [isLeaving]="isLandingLeaving"
        (startGame)="handleStartGame()"
      ></app-landing-screen>
    </ng-container>

    <ng-template #gameShell>
      <div class="app-container">
        <header class="app-header">
          <h1>🎨 網格填色遊戲</h1>
          <p class="subtitle">參考圖案，複製填色</p>
        </header>

        <!-- 關卡選擇介面 -->
        <div class="content" *ngIf="!selectedLevel">
          <app-level-selector (levelSelected)="onLevelSelected($event)"></app-level-selector>
        </div>

        <!-- 遊戲面板 -->
        <div class="content" *ngIf="selectedLevel">
          <app-game-board
            [level]="selectedLevel"
            (retryLevel)="handleRetryLevel()"
            (nextLevel)="handleNextLevel()"
            (exitToMenu)="backToLevelSelect()"
          ></app-game-board>
          
          <div class="back-button-container">
            <button class="btn-back" (click)="backToLevelSelect()">
              ← 返回關卡選擇
            </button>
          </div>
        </div>

        <!-- 遊戲說明 -->
        <div class="instructions" *ngIf="!selectedLevel">
          <h3>遊戲規則</h3>
          <ul>
            <li>🎨 參考左側的圖案，在右側網格中填色複製</li>
            <li>🖌️ 先點擊上方的顏色塊選擇畫筆顏色</li>
            <li>🖱️ 然後點擊網格方塊進行填色</li>
            <li>✕ 點擊橡皮擦可以清除顏色</li>
            <li>✅ 填滿所有方塊後點擊「檢查答案」查看結果</li>
            <li>💡 遇到困難可以使用「提示」功能自動填充一格</li>
          </ul>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .app-container {
      background: linear-gradient(160deg, rgba(30, 80, 180, 0.88) 0%, rgba(34, 164, 215, 0.92) 55%, rgba(110, 228, 255, 0.9) 100%);
      border-radius: 26px;
      padding: 44px;
      box-shadow: 0 30px 80px rgba(0, 22, 60, 0.45);
      min-height: 500px;
      max-width: 1000px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
    }

    .app-container::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 20% 15%, rgba(255, 255, 255, 0.18), transparent 55%),
        radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.14), transparent 60%),
        radial-gradient(circle at 50% 85%, rgba(255, 201, 132, 0.22), transparent 65%);
      mix-blend-mode: screen;
      pointer-events: none;
    }

    .app-header {
      position: relative;
      text-align: center;
      margin-bottom: 44px;
      padding-bottom: 24px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.25);
      color: rgba(248, 242, 255, 1);
      text-shadow: 0 0 22px rgba(18, 40, 110, 0.5);
    }

    h1 {
      margin-bottom: 12px;
      font-size: 2.6rem;
      background: linear-gradient(135deg, #ffffff 0%, #f7ecb5 40%, #93dfff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: rgba(233, 244, 255, 0.88);
      font-size: 1.1rem;
      letter-spacing: 1px;
    }

    .content {
      margin-bottom: 30px;
    }

    .back-button-container {
      text-align: center;
      margin-top: 30px;
    }

    .btn-back {
      padding: 12px 24px;
      background: #95a5a6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .btn-back:hover {
      background: #7f8c8d;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .instructions {
      background: linear-gradient(145deg, rgba(8, 40, 88, 0.65), rgba(20, 88, 150, 0.55));
      padding: 28px;
      border-radius: 18px;
      margin-top: 32px;
      text-align: left;
      color: rgba(230, 244, 255, 0.9);
      box-shadow: inset 0 0 30px rgba(0, 26, 68, 0.35);
      backdrop-filter: blur(6px);
    }

    .instructions h3 {
      color: #ffefb0;
      margin-bottom: 16px;
      font-size: 1.3rem;
      letter-spacing: 1px;
    }

    .instructions ul {
      list-style: none;
      padding: 0;
    }

    .instructions li {
      margin-bottom: 12px;
      color: rgba(217, 237, 255, 0.92);
      font-size: 1rem;
      line-height: 1.7;
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 28px;
        border-radius: 18px;
      }

      h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class AppComponent {
  title = '網格填色遊戲';
  selectedLevel: Level | null = null;
  showLanding = true;
  isLandingLeaving = false;

  constructor(private levelService: LevelService) {}

  /**
   * 處理關卡選擇
   */
  onLevelSelected(level: Level): void {
    this.selectedLevel = level;
  }

  /**
   * 入口頁開始遊戲
   */
  handleStartGame(): void {
    if (this.isLandingLeaving) {
      return;
    }

    this.isLandingLeaving = true;

    setTimeout(() => {
      this.showLanding = false;
      this.isLandingLeaving = false;
    }, 600);
  }

  /**
   * 返回關卡選擇介面
   */
  backToLevelSelect(): void {
    this.selectedLevel = null;
  }

  handleRetryLevel(): void {
    // 保留鉤子，未來可加入統計或提示
  }

  handleNextLevel(): void {
    if (!this.selectedLevel) {
      return;
    }

    const nextLevel = this.levelService.getNextLevel(this.selectedLevel.id);
    if (nextLevel) {
      this.selectedLevel = nextLevel;
    } else {
      alert('已完成所有關卡，返回選單！');
      this.backToLevelSelect();
    }
  }
}

