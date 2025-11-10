import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridCellComponent } from '../grid-cell/grid-cell.component';
import { GameService } from '../../services/game.service';
import { Level } from '../../models/level.model';

/**
 * 遊戲面板元件
 * 顯示參考圖案與可填色的遊戲網格
 */
@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, GridCellComponent],
  template: `
    <div class="game-board-container" *ngIf="currentLevel">
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
        <div class="game-section">
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

      <!-- 游戏结果提示 -->
      <div class="game-result" *ngIf="gameCompleted">
        <div class="result-message" [class.success]="gameWon" [class.failure]="!gameWon">
          <h3 *ngIf="gameWon">🎉 恭喜！答案正確！</h3>
          <h3 *ngIf="!gameWon">❌ 答案有誤，請再試試</h3>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-board-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    .level-info {
      text-align: center;
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
      transition: all 0.2s ease;
      font-size: 24px;
      font-weight: bold;
      color: #666;
    }

    .color-sample:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .color-sample.selected {
      border: 4px solid #2c3e50;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5);
      transform: scale(1.1);
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
    }

    .reference-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .reference-section h3 {
      color: #2c3e50;
      font-size: 0.9rem;
      margin: 0;
    }

    .reference-grid {
      background: #f8f9fa;
      padding: 10px;
      border-radius: 8px;
      border: 2px solid #ddd;
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
    }

    .grid-row {
      display: flex;
      gap: 2px;
    }

    .game-controls {
      display: flex;
      gap: 15px;
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

    .game-result {
      margin-top: 20px;
    }

    .result-message {
      padding: 20px 40px;
      border-radius: 10px;
      animation: slideIn 0.5s ease;
    }

    .result-message.success {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      color: white;
    }

    .result-message.failure {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
    }

    .result-message h3 {
      margin: 0;
      font-size: 1.5rem;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
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
export class GameBoardComponent implements OnInit {
  @Input() level: Level | null = null;
  
  currentLevel: Level | null = null;
  gameCompleted: boolean = false;
  gameWon: boolean = false;
  selectedColor: string = '';  // 當前選中的畫筆顏色

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    if (this.level) {
      this.currentLevel = this.level;
      this.gameService.initGame(this.level);
      
      // 默认选择第一个颜色
      if (this.level.colors && this.level.colors.length > 0) {
        this.selectedColor = this.level.colors[0];
      }
      
      // 订阅游戏状态
      this.gameService.gameCompleted$.subscribe(completed => {
        this.gameCompleted = completed;
      });

      this.gameService.gameWon$.subscribe(won => {
        this.gameWon = won;
      });
    }
  }

  /**
   * 選擇畫筆顏色
   */
  selectColor(color: string): void {
    this.selectedColor = color;
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
  }

  /**
   * 處理單元格右鍵點擊（清空）
   */
  onCellRightClick(event: {row: number, col: number}): void {
    this.gameService.clearCell(event.row, event.col);
  }

  /**
   * 檢查答案
   */
  onCheckAnswer(): void {
    const result = this.gameService.checkAnswer();
    
    if (!result.completed) {
      alert('請先填滿所有格子！');
    }
  }

  /**
   * 重置游戏
   */
  onReset(): void {
    if (confirm('確定要重置遊戲嗎？')) {
      this.gameService.resetGame();
      this.gameCompleted = false;
      this.gameWon = false;
    }
  }

  /**
   * 获取提示
   */
  onGetHint(): void {
    const hint = this.gameService.getHint();
    if (hint) {
      // 提示已自動填充，無需額外操作
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
}

