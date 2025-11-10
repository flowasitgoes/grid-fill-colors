import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Level } from '../models/level.model';
import { Cell } from '../models/cell.model';

/**
 * 游戏服务
 * 负责管理游戏状态、玩家填色操作和验证逻辑
 */
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private currentLevel: Level | null = null;
  private gameGrid: string[][] = []; // 玩家当前填色状态
  private gameCompleted = new BehaviorSubject<boolean>(false);
  private gameWon = new BehaviorSubject<boolean>(false);

  // 可观察的游戏状态
  public gameCompleted$ = this.gameCompleted.asObservable();
  public gameWon$ = this.gameWon.asObservable();

  /**
   * 初始化游戏（加载关卡）
   */
  initGame(level: Level): void {
    this.currentLevel = level;
    this.gameCompleted.next(false);
    this.gameWon.next(false);
    
    // 初始化空白网格
    this.gameGrid = Array(5).fill(null).map(() => Array(5).fill(''));
  }

  /**
   * 获取当前关卡
   */
  getCurrentLevel(): Level | null {
    return this.currentLevel;
  }

  /**
   * 获取当前游戏网格
   */
  getGameGrid(): string[][] {
    return this.gameGrid;
  }

  /**
   * 获取某个单元格的颜色
   */
  getCellColor(row: number, col: number): string {
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
      return this.gameGrid[row][col];
    }
    return '';
  }

  /**
   * 填充单元格颜色
   * 循环切换颜色：空白 → 颜色1 → 颜色2 → ... → 空白
   */
  fillCell(row: number, col: number): void {
    if (!this.currentLevel) {
      return;
    }

    const currentColor = this.gameGrid[row][col];
    const colors = this.currentLevel.colors;
    
    if (!currentColor || currentColor === '') {
      // 当前为空，填充第一个颜色
      this.gameGrid[row][col] = colors[0];
    } else {
      // 找到当前颜色的索引
      const currentIndex = colors.indexOf(currentColor);
      
      if (currentIndex >= 0 && currentIndex < colors.length - 1) {
        // 切换到下一个颜色
        this.gameGrid[row][col] = colors[currentIndex + 1];
      } else {
        // 回到空白
        this.gameGrid[row][col] = '';
      }
    }

    // 每次填色後更新完成狀態
    this.updateCompletionState();
  }

  /**
   * 用指定颜色填充单元格（画笔模式）
   */
  fillCellWithColor(row: number, col: number, color: string): void {
    if (!this.currentLevel) {
      return;
    }

    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
      this.gameGrid[row][col] = color;
      // 每次填色後更新完成狀態
      this.updateCompletionState();
    }
  }

  /**
   * 清空单元格
   */
  clearCell(row: number, col: number): void {
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
      this.gameGrid[row][col] = '';
      this.updateCompletionState();
    }
  }

  /**
   * 重置游戏
   */
  resetGame(): void {
    this.gameGrid = Array(5).fill(null).map(() => Array(5).fill(''));
    this.gameCompleted.next(false);
    this.gameWon.next(false);
  }

  /**
   * 验证当前网格是否与解答匹配
   */
  validateGrid(): boolean {
    if (!this.currentLevel) {
      return false;
    }

    const solution = this.currentLevel.solution;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.gameGrid[row][col] !== solution[row][col]) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * 检查游戏是否完成
   * 如果所有格子都填满且正确，则游戏完成
   */
  private updateCompletionState(): void {
    // 檢查是否所有格子都已填滿
    const allFilled = this.gameGrid.every(row =>
      row.every(cell => cell !== '')
    );

    if (!allFilled) {
      if (this.gameCompleted.value) {
        this.gameCompleted.next(false);
      }
      if (this.gameWon.value) {
        this.gameWon.next(false);
      }
      return;
    }

    const isCorrect = this.validateGrid();
    this.gameCompleted.next(true);
    this.gameWon.next(isCorrect);
  }

  /**
   * 手动检查答案（供玩家使用的"检查"按钮）
   */
  checkAnswer(): { completed: boolean; correct: boolean } {
    const allFilled = this.gameGrid.every(row => 
      row.every(cell => cell !== '')
    );

    if (!allFilled) {
      return { completed: false, correct: false };
    }

    const isCorrect = this.validateGrid();
    this.gameCompleted.next(true);
    this.gameWon.next(isCorrect);

    return { completed: true, correct: isCorrect };
  }

  /**
   * 获取提示（显示一个正确的格子）
   */
  getHint(): { row: number; col: number } | null {
    if (!this.currentLevel) {
      return null;
    }

    const solution = this.currentLevel.solution;
    const wrongCells: { row: number; col: number }[] = [];

    // 找出所有错误或未填充的格子
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.gameGrid[row][col] !== solution[row][col]) {
          wrongCells.push({ row, col });
        }
      }
    }

    if (wrongCells.length === 0) {
      return null;
    }

    // 随机选择一个错误的格子并填充正确颜色
    const randomCell = wrongCells[Math.floor(Math.random() * wrongCells.length)];
    this.gameGrid[randomCell.row][randomCell.col] = solution[randomCell.row][randomCell.col];

    return randomCell;
  }
}

