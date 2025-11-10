import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevelService } from '../../services/level.service';
import { Level } from '../../models/level.model';

/**
 * 關卡選擇器元件
 * 顯示所有可用關卡供玩家選擇
 */
@Component({
  selector: 'app-level-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="level-selector">
      <h2>選擇關卡</h2>
      <div class="level-grid">
        <div 
          *ngFor="let level of levels" 
          class="level-card"
          [class.easy]="level.difficulty === 'easy'"
          [class.medium]="level.difficulty === 'medium'"
          [class.hard]="level.difficulty === 'hard'"
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
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .level-selector {
      text-align: center;
      padding: 20px;
    }

    .level-selector h2 {
      color: #2c3e50;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .level-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .level-card {
      background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85));
      border-radius: 22px;
      box-shadow: 0 15px 30px rgba(0,0,0,0.12);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 4px solid transparent;
    }

    .level-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 45px rgba(0,0,0,0.2);
    }

    .level-card.easy {
      border-color: #2ecc71;
    }

    .level-card.medium {
      border-color: #f39c12;
    }

    .level-card.hard {
      border-color: #e74c3c;
    }

    .level-card-inner {
      background: #ffffff;
      border-radius: 18px;
      padding: 28px 26px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 100%;
    }

    .level-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .level-number {
      font-size: 3.2rem;
      font-weight: 700;
      color: #667eea;
    }

    .level-title {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      flex: 1;
    }

    .level-name {
      font-size: 1.2rem;
      color: #22304d;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .level-difficulty {
      font-size: 0.95rem;
      color: #8e9aac;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .level-preview {
      display: flex;
      justify-content: center;
    }

    .preview-grid {
      padding: 12px;
      background: #f5f7fb;
      border-radius: 14px;
      border: 1px solid #dce3f1;
      box-shadow: inset 0 4px 10px rgba(0,0,0,0.08);
    }

    .preview-row {
      display: flex;
      gap: 2px;
    }

    .preview-cell {
      width: 24px;
      height: 24px;
      border: 1px solid #34495e;
      border-radius: 4px;
    }

    .level-palette {
      display: flex;
      justify-content: center;
      gap: 14px;
    }

    .palette-dot {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid #34495e;
      box-shadow: 0 6px 12px rgba(0,0,0,0.18);
    }
  `]
})
export class LevelSelectorComponent implements OnInit {
  @Output() levelSelected = new EventEmitter<Level>();
  
  levels: Level[] = [];

  constructor(private levelService: LevelService) {}

  ngOnInit(): void {
    this.levels = this.levelService.getAllLevels();
  }

  /**
   * 處理關卡選擇
   */
  onLevelSelect(level: Level): void {
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
}

