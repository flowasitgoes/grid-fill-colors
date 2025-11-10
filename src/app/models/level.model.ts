import { Hint } from './hint.model';

/**
 * 关卡数据模型
 * 定义一个完整的 Nonogram 关卡
 */
export interface Level {
  id: number;                 // 关卡编号
  name: string;               // 关卡名称
  size: 5;                    // 网格大小（固定5x5）
  colors: string[];           // 可用颜色列表（不包括空白）
  solution: string[][];       // 5x5 解答矩阵
  rowHints: Hint[][];         // 每行的提示数组
  columnHints: Hint[][];      // 每列的提示数组
  difficulty?: 'easy' | 'medium' | 'hard'; // 难度（可选）
}

