import { Level } from '../models/level.model';

/**
 * 預設關卡資料
 * 包含 3 個不同難度的關卡
 */
export const LEVELS: Level[] = [
  {
    id: 1,
    name: '關卡 1 - 十字圖案',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'easy',
    solution: [
      ['red', 'red', 'blue', 'red', 'red'],
      ['red', 'red', 'blue', 'red', 'red'],
      ['blue', 'blue', 'blue', 'blue', 'blue'],
      ['red', 'red', 'blue', 'red', 'red'],
      ['red', 'red', 'blue', 'red', 'red']
    ],
    rowHints: [
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'blue', count: 5 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }]
    ],
    columnHints: [
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'blue', count: 5 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }]
    ]
  },
  {
    id: 2,
    name: '關卡 2 - 豎條紋',
    size: 5,
    colors: ['blue', 'white'],
    difficulty: 'easy',
    solution: [
      ['blue', 'white', 'blue', 'white', 'blue'],
      ['blue', 'white', 'blue', 'white', 'blue'],
      ['blue', 'white', 'blue', 'white', 'blue'],
      ['blue', 'white', 'blue', 'white', 'blue'],
      ['blue', 'white', 'blue', 'white', 'blue']
    ],
    rowHints: [
      [{ color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }, { color: 'white', count: 1 }, { color: 'blue', count: 1 }]
    ],
    columnHints: [
      [{ color: 'blue', count: 5 }],
      [{ color: 'white', count: 5 }],
      [{ color: 'blue', count: 5 }],
      [{ color: 'white', count: 5 }],
      [{ color: 'blue', count: 5 }]
    ]
  },
  {
    id: 3,
    name: '關卡 3 - 笑臉圖案',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'medium',
    solution: [
      ['blue', 'red', 'blue', 'red', 'blue'],
      ['blue', 'red', 'blue', 'red', 'blue'],
      ['blue', 'blue', 'blue', 'blue', 'blue'],
      ['red', 'blue', 'blue', 'blue', 'red'],
      ['blue', 'red', 'red', 'red', 'blue']
    ],
    rowHints: [
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 5 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }]
    ],
    columnHints: [
      [{ color: 'blue', count: 3 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 2 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 4 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 2 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 3 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }]
    ]
  },
  {
    id: 4,
    name: '關卡 4 - 對角線',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'easy',
    solution: [
      ['red', 'blue', 'blue', 'blue', 'blue'],
      ['blue', 'red', 'blue', 'blue', 'blue'],
      ['blue', 'blue', 'red', 'blue', 'blue'],
      ['blue', 'blue', 'blue', 'red', 'blue'],
      ['blue', 'blue', 'blue', 'blue', 'red']
    ],
    rowHints: [
      [{ color: 'red', count: 1 }, { color: 'blue', count: 4 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 3 }],
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }],
      [{ color: 'blue', count: 3 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 4 }, { color: 'red', count: 1 }]
    ],
    columnHints: [
      [{ color: 'red', count: 1 }, { color: 'blue', count: 4 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 3 }],
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }],
      [{ color: 'blue', count: 3 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 4 }, { color: 'red', count: 1 }]
    ]
  },
  {
    id: 5,
    name: '關卡 5 - 棋盤格',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'medium',
    solution: [
      ['red', 'blue', 'red', 'blue', 'red'],
      ['blue', 'red', 'blue', 'red', 'blue'],
      ['red', 'blue', 'red', 'blue', 'red'],
      ['blue', 'red', 'blue', 'red', 'blue'],
      ['red', 'blue', 'red', 'blue', 'red']
    ],
    rowHints: [
      [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }]
    ],
    columnHints: [
      [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }]
    ]
  },
  {
    id: 6,
    name: '關卡 6 - 心形',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'medium',
    solution: [
      ['blue', 'red', 'blue', 'red', 'blue'],
      ['red', 'red', 'red', 'red', 'red'],
      ['red', 'red', 'red', 'red', 'red'],
      ['blue', 'red', 'red', 'red', 'blue'],
      ['blue', 'blue', 'red', 'blue', 'blue']
    ],
    rowHints: [
      [{ color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 5 }],
      [{ color: 'red', count: 5 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }]
    ],
    columnHints: [
      [{ color: 'blue', count: 1 }, { color: 'red', count: 2 }, { color: 'blue', count: 2 }],
      [{ color: 'red', count: 4 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 4 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 2 }, { color: 'blue', count: 2 }]
    ]
  },
  {
    id: 7,
    name: '關卡 7 - 箭頭',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'medium',
    solution: [
      ['blue', 'blue', 'red', 'blue', 'blue'],
      ['blue', 'red', 'red', 'red', 'blue'],
      ['red', 'red', 'red', 'red', 'red'],
      ['blue', 'red', 'red', 'red', 'blue'],
      ['blue', 'blue', 'red', 'blue', 'blue']
    ],
    rowHints: [
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 5 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }]
    ],
    columnHints: [
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 5 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }]
    ]
  },
  {
    id: 8,
    name: '關卡 8 - 邊框',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'easy',
    solution: [
      ['red', 'red', 'red', 'red', 'red'],
      ['red', 'blue', 'blue', 'blue', 'red'],
      ['red', 'blue', 'blue', 'blue', 'red'],
      ['red', 'blue', 'blue', 'blue', 'red'],
      ['red', 'red', 'red', 'red', 'red']
    ],
    rowHints: [
      [{ color: 'red', count: 5 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 5 }]
    ],
    columnHints: [
      [{ color: 'red', count: 5 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 5 }]
    ]
  },
  {
    id: 9,
    name: '關卡 9 - 角落',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'medium',
    solution: [
      ['red', 'red', 'blue', 'red', 'red'],
      ['red', 'blue', 'blue', 'blue', 'red'],
      ['blue', 'blue', 'blue', 'blue', 'blue'],
      ['red', 'blue', 'blue', 'blue', 'red'],
      ['red', 'red', 'blue', 'red', 'red']
    ],
    rowHints: [
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 5 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }]
    ],
    columnHints: [
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 5 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 3 }, { color: 'red', count: 1 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }]
    ]
  },
  {
    id: 10,
    name: '關卡 10 - 鑽石',
    size: 5,
    colors: ['red', 'blue'],
    difficulty: 'hard',
    solution: [
      ['blue', 'blue', 'red', 'blue', 'blue'],
      ['blue', 'red', 'red', 'red', 'blue'],
      ['red', 'red', 'blue', 'red', 'red'],
      ['blue', 'red', 'red', 'red', 'blue'],
      ['blue', 'blue', 'red', 'blue', 'blue']
    ],
    rowHints: [
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 2 }, { color: 'blue', count: 1 }, { color: 'red', count: 2 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }]
    ],
    columnHints: [
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }, { color: 'blue', count: 1 }, { color: 'red', count: 1 }],
      [{ color: 'blue', count: 1 }, { color: 'red', count: 3 }, { color: 'blue', count: 1 }],
      [{ color: 'blue', count: 2 }, { color: 'red', count: 1 }, { color: 'blue', count: 2 }]
    ]
  }
];

