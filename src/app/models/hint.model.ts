/**
 * 提示数据模型
 * 表示一个提示单元（颜色 + 连续方块数量）
 */
export interface Hint {
  color: string;  // 颜色值（如 'red', 'blue', 'white'）
  count: number;  // 连续方块的数量
}

