import { Hint } from './hint.model';

/**
 * 故事描述：為每個關卡提供「故事任務」資訊
 */
export interface LevelStory {
  arc: string;        // 故事章節/篇章名稱
  location: string;   // 發生地點或場景描述
  artifact: string;   // 要修復/重現的物件或符號
  briefing: string;   // 故事背景簡述
  objective: string;  // 玩家在本關卡的任務
  mood?: string;      // 氛圍或配樂提示
  theme?: 'dawn' | 'rail' | 'tower' | 'harbor' | 'festival'; // 對應篇章視覺主題
  sigil?: string;     // 篇章圖示
}

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
  rowHints?: Hint[][];         // 每行的提示数组
  columnHints?: Hint[][];      // 每列的提示数组
  difficulty?: 'easy' | 'medium' | 'hard'; // 难度（可选）
  story?: LevelStory;         // 故事背景
}
