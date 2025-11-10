import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 网格单元格组件
 * 显示一个可点击的方块，支持颜色切换
 */
@Component({
  selector: 'app-grid-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="cell" 
      [style.background-color]="getCellBackgroundColor()"
      [class.empty]="!color"
      (click)="onCellClick()"
      (contextmenu)="onRightClick($event)">
    </div>
  `,
  styles: [`
    .cell {
      width: 50px;
      height: 50px;
      border: 2px solid var(--color-border);
      cursor: pointer;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .cell:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 10;
    }

    .cell.empty {
      background-color: var(--color-empty);
    }

    .cell:active {
      transform: scale(0.95);
    }
  `]
})
export class GridCellComponent {
  @Input() row: number = 0;
  @Input() col: number = 0;
  @Input() color: string = '';
  
  @Output() cellClick = new EventEmitter<{row: number, col: number}>();
  @Output() cellRightClick = new EventEmitter<{row: number, col: number}>();

  /**
   * 处理左键点击
   */
  onCellClick(): void {
    this.cellClick.emit({ row: this.row, col: this.col });
  }

  /**
   * 处理右键点击（可用于标记）
   */
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.cellRightClick.emit({ row: this.row, col: this.col });
  }

  /**
   * 根据颜色名称返回实际的颜色值
   */
  getCellBackgroundColor(): string {
    if (!this.color) {
      return 'var(--color-empty)';
    }

    // 颜色映射
    const colorMap: { [key: string]: string } = {
      'red': 'var(--color-red)',
      'blue': 'var(--color-blue)',
      'white': 'var(--color-white)',
      'empty': 'var(--color-empty)'
    };

    return colorMap[this.color] || this.color;
  }
}

