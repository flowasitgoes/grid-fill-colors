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
      [class.pressed]="isPressed"
      [class.empty]="!color"
      [class.filled]="!!color"
      [style.background-color]="getCellBackgroundColor()"
      [style.--cell-glow-color]="getCellGlowColor()"
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
      transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease;
      box-sizing: border-box;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      filter: drop-shadow(0 0 0 rgba(0,0,0,0));
    }

    .cell:hover {
      transform: translateY(-2px) scale(1.03);
      z-index: 1;
    }

    .cell::after {
      content: '';
      position: absolute;
      inset: -30%;
      background: radial-gradient(circle at center, var(--cell-glow-color, rgba(255,255,255,0.35)) 0%, transparent 60%);
      opacity: 0;
      transform: scale(0.6);
      transition: transform 0.35s ease, opacity 0.35s ease;
      pointer-events: none;
    }

    .cell.empty {
      background-color: var(--color-empty);
    }

    .cell:hover::after {
      opacity: 0.85;
      transform: scale(1);
    }

    .cell:active {
      transform: scale(0.95);
    }

    .cell.pressed {
      animation: cellPop 220ms ease;
    }

    .cell.filled {
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
      filter: drop-shadow(0 4px 14px rgba(0,0,0,0.18));
    }

    @keyframes cellPop {
      0% {
        transform: scale(0.92);
        box-shadow: 0 0 0 rgba(0,0,0,0);
      }
      60% {
        transform: scale(1.05);
        box-shadow: 0 6px 18px rgba(0,0,0,0.25);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 3px 10px rgba(0,0,0,0.18);
      }
    }
  `]
})
export class GridCellComponent {
  @Input() row: number = 0;
  @Input() col: number = 0;
  @Input() color: string = '';
  
  @Output() cellClick = new EventEmitter<{row: number, col: number}>();
  @Output() cellRightClick = new EventEmitter<{row: number, col: number}>();
  isPressed = false;

  /**
   * 处理左键点击
   */
  onCellClick(): void {
    this.triggerPressAnimation();
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

  getCellGlowColor(): string {
    const baseColor = this.getCellBackgroundColor();
    if (baseColor === 'var(--color-empty)') {
      return 'rgba(255,255,255,0.35)';
    }
    return baseColor;
  }

  private triggerPressAnimation(): void {
    this.isPressed = false;

    const frameHandler = () => {
      this.isPressed = true;
      setTimeout(() => {
        this.isPressed = false;
      }, 220);
    };

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.requestAnimationFrame(frameHandler);
    } else {
      frameHandler();
    }
  }
}

