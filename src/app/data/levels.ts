import { Level } from '../models/level.model';

/**
 * 预设关卡数据
 * 包含3个不同难度的关卡
 */
export const LEVELS: Level[] = [
  {
    id: 1,
    name: '关卡 1 - 十字图案',
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
    name: '关卡 2 - 竖条纹',
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
    name: '关卡 3 - 笑脸图案',
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
    name: '关卡 4 - 对角线',
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
    name: '关卡 5 - 棋盘格',
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
    name: '关卡 6 - 心形',
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
    name: '关卡 7 - 箭头',
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
    name: '关卡 8 - 边框',
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
    name: '关卡 9 - 角落',
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
    name: '关卡 10 - 钻石',
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

