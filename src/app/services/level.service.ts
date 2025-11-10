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
  private levels: Level[] = LEVELS;

  /**
   * 获取所有关卡
   */
  getAllLevels(): Level[] {
    return this.levels;
  }

  /**
   * 根据 ID 获取关卡
   */
  getLevelById(id: number): Level | undefined {
    return this.levels.find(level => level.id === id);
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

