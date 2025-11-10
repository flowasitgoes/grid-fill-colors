import { Injectable } from '@angular/core';
import { Level } from '../models/level.model';
import { Hint } from '../models/hint.model';
import { LEVELS } from '../data/levels';

/**
 * 关卡服务
 * 负责提供和管理游戏关卡数据
 */
@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private levels: Level[];

  private readonly forbiddenColors = new Set([
    '',
    '#ecf0f1',
    'var(--color-empty)',
    'white',
    '#ffffff'
  ]);

  private readonly fallbackPalette = [
    '#f5cd79',
    '#55efc4',
    '#00cec9',
    '#fab1a0',
    '#a29bfe',
    '#ffeaa7',
    '#ff7675',
    '#81ecec',
    '#fd79a8',
    '#74b9ff',
    '#6c5ce7',
    '#20bf6b'
  ];

  constructor() {
    this.levels = LEVELS.map(level => this.sanitizeLevel(level));
  }

  /**
   * 获取所有关卡
   */
  getAllLevels(): Level[] {
    return this.levels;
  }

  private sanitizeLevel(level: Level): Level {
    const normalize = (color: string) => color.trim().toLowerCase();
    const colorMap = new Map<string, string>();
    const usedColors = new Set<string>();

    const colors = level.colors.map(originalColor => {
      const key = normalize(originalColor);

      if (!colorMap.has(key)) {
        if (this.forbiddenColors.has(key)) {
          const replacement = this.pickReplacementColor(usedColors);
          colorMap.set(key, replacement);
          usedColors.add(normalize(replacement));
        } else {
          colorMap.set(key, originalColor);
          usedColors.add(normalize(originalColor));
        }
      }

      return colorMap.get(key)!;
    });

    const remapColor = (color: string): string => {
      const key = normalize(color);
      return colorMap.get(key) ?? color;
    };

    const solution = level.solution.map(row => row.map(remapColor));
    const rowHints = level.rowHints.map(row => row.map(hint => ({ ...hint, color: remapColor(hint.color) })));
    const columnHints = level.columnHints.map(col => col.map(hint => ({ ...hint, color: remapColor(hint.color) })));

    return {
      ...level,
      colors,
      solution,
      rowHints,
      columnHints
    };
  }

  private pickReplacementColor(usedColors: Set<string>): string {
    for (const candidate of this.fallbackPalette) {
      const key = candidate.trim().toLowerCase();
      if (!this.forbiddenColors.has(key) && !usedColors.has(key)) {
        return candidate;
      }
    }
    // 最後備援：給一個固定的安全色
    return '#7f8c8d';
  }

  /**
   * 根据 ID 获取关卡
   */
  getLevelById(id: number): Level | undefined {
    return this.levels.find(level => level.id === id);
  }

  /**
   * 取得下一關
   */
  getNextLevel(currentId: number): Level | null {
    const index = this.levels.findIndex(level => level.id === currentId);
    if (index >= 0 && index < this.levels.length - 1) {
      return this.levels[index + 1];
    }
    return null;
  }

  /**
   * 判斷是否還有下一關
   */
  hasNextLevel(currentId: number): boolean {
    return this.getNextLevel(currentId) !== null;
  }

  /**
   * 根据解答矩阵自动生成行提示
   * 扫描每一行，识别连续相同颜色的方块
   */
  generateRowHints(solution: string[][]): Hint[][] {
    const hints: Hint[][] = [];
    
    for (const row of solution) {
      const rowHints: Hint[] = [];
      let currentColor = '';
      let currentCount = 0;

      for (const color of row) {
        if (color === currentColor) {
          currentCount++;
        } else {
          if (currentColor && currentCount > 0) {
            rowHints.push({ color: currentColor, count: currentCount });
          }
          currentColor = color;
          currentCount = 1;
        }
      }

      // 添加最后一组
      if (currentColor && currentCount > 0) {
        rowHints.push({ color: currentColor, count: currentCount });
      }

      hints.push(rowHints);
    }

    return hints;
  }

  /**
   * 根据解答矩阵自动生成列提示
   * 扫描每一列，识别连续相同颜色的方块
   */
  generateColumnHints(solution: string[][]): Hint[][] {
    const hints: Hint[][] = [];
    const size = solution.length;

    for (let col = 0; col < size; col++) {
      const colHints: Hint[] = [];
      let currentColor = '';
      let currentCount = 0;

      for (let row = 0; row < size; row++) {
        const color = solution[row][col];
        
        if (color === currentColor) {
          currentCount++;
        } else {
          if (currentColor && currentCount > 0) {
            colHints.push({ color: currentColor, count: currentCount });
          }
          currentColor = color;
          currentCount = 1;
        }
      }

      // 添加最后一组
      if (currentColor && currentCount > 0) {
        colHints.push({ color: currentColor, count: currentCount });
      }

      hints.push(colHints);
    }

    return hints;
  }

  /**
   * 验证关卡数据的完整性
   */
  validateLevel(level: Level): boolean {
    // 检查基本字段
    if (!level.id || !level.name || !level.solution) {
      return false;
    }

    // 检查解答矩阵大小
    if (level.solution.length !== 5) {
      return false;
    }

    for (const row of level.solution) {
      if (row.length !== 5) {
        return false;
      }
    }

    // 检查提示是否匹配解答
    const generatedRowHints = this.generateRowHints(level.solution);
    const generatedColHints = this.generateColumnHints(level.solution);

    // 简单比较（可以改进为深度比较）
    return level.rowHints.length === 5 && level.columnHints.length === 5;
  }
}

