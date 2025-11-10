import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelSelectorComponent } from './components/level-selector/level-selector.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { Level } from './models/level.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LevelSelectorComponent, GameBoardComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🎨 网格填色游戏</h1>
        <p class="subtitle">参考图案，复制填色</p>
      </header>

      <!-- 关卡选择界面 -->
      <div class="content" *ngIf="!selectedLevel">
        <app-level-selector (levelSelected)="onLevelSelected($event)"></app-level-selector>
      </div>

      <!-- 游戏面板 -->
      <div class="content" *ngIf="selectedLevel">
        <app-game-board [level]="selectedLevel"></app-game-board>
        
        <div class="back-button-container">
          <button class="btn-back" (click)="backToLevelSelect()">
            ← 返回关卡选择
          </button>
        </div>
      </div>

      <!-- 游戏说明 -->
      <div class="instructions" *ngIf="!selectedLevel">
        <h3>游戏规则</h3>
        <ul>
          <li>🎨 参考左侧的图案，在右侧网格中填色复制</li>
          <li>🖌️ 先点击上方的颜色块选择画笔颜色</li>
          <li>🖱️ 然后点击网格方块进行填色</li>
          <li>✕ 点击橡皮擦可以清除颜色</li>
          <li>✅ 填满所有方块后点击"检查答案"查看结果</li>
          <li>💡 遇到困难可以使用"提示"功能自动填充一格</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      min-height: 500px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .app-header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #ecf0f1;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 2.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #7f8c8d;
      font-size: 1.1rem;
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
      background: #f8f9fa;
      padding: 25px;
      border-radius: 15px;
      margin-top: 30px;
      text-align: left;
    }

    .instructions h3 {
      color: #2c3e50;
      margin-bottom: 15px;
      font-size: 1.3rem;
    }

    .instructions ul {
      list-style: none;
      padding: 0;
    }

    .instructions li {
      margin-bottom: 10px;
      color: #555;
      font-size: 1rem;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 20px;
        border-radius: 10px;
      }

      h1 {
        font-size: 1.8rem;
      }
    }
  `]
})
export class AppComponent {
  title = '网格填色游戏';
  selectedLevel: Level | null = null;

  /**
   * 处理关卡选择
   */
  onLevelSelected(level: Level): void {
    this.selectedLevel = level;
  }

  /**
   * 返回关卡选择界面
   */
  backToLevelSelect(): void {
    this.selectedLevel = null;
  }
}

