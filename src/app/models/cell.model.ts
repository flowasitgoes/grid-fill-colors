/**
 * 单元格模型
 * 表示网格中的一个方块
 */
export interface Cell {
  row: number;        // 行索引（0-4）
  col: number;        // 列索引（0-4）
  color: string;      // 当前颜色（空字符串表示未填充）
  isCorrect?: boolean; // 是否正确（用于验证时显示）
}

