export type GameEfficiencyGrade = 'A' | 'B' | 'C';

export interface GameSummary {
  levelId: number;
  levelName: string;
  completed: boolean;
  correct: boolean;
  durationMs: number;
  completedAt: string;
  fillActions: number;
  eraseActions: number;
  totalActions: number;
  hintCount: number;
  bestStreak: number;
  efficiencyGrade: GameEfficiencyGrade;
  finalGrid: string[][];
}

