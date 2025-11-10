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
    colors: ['#8e44ad', '#f1c40f'],
    difficulty: 'easy',
    solution: [
      ['#8e44ad', '#8e44ad', '#f1c40f', '#8e44ad', '#8e44ad'],
      ['#8e44ad', '#8e44ad', '#f1c40f', '#8e44ad', '#8e44ad'],
      ['#f1c40f', '#f1c40f', '#f1c40f', '#f1c40f', '#f1c40f'],
      ['#8e44ad', '#8e44ad', '#f1c40f', '#8e44ad', '#8e44ad'],
      ['#8e44ad', '#8e44ad', '#f1c40f', '#8e44ad', '#8e44ad']
    ],
    rowHints: [
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }],
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }],
      [{ color: '#f1c40f', count: 5 }],
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }],
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }]
    ],
    columnHints: [
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }],
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }],
      [{ color: '#f1c40f', count: 5 }],
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }],
      [{ color: '#8e44ad', count: 2 }, { color: '#f1c40f', count: 1 }, { color: '#8e44ad', count: 2 }]
    ]
  },
  {
    id: 2,
    name: '關卡 2 - 豎條紋',
    size: 5,
    colors: ['#ff9ff3', '#fbc531'],
    difficulty: 'easy',
    solution: [
      ['#ff9ff3', '#fbc531', '#ff9ff3', '#fbc531', '#ff9ff3'],
      ['#ff9ff3', '#fbc531', '#ff9ff3', '#fbc531', '#ff9ff3'],
      ['#ff9ff3', '#fbc531', '#ff9ff3', '#fbc531', '#ff9ff3'],
      ['#ff9ff3', '#fbc531', '#ff9ff3', '#fbc531', '#ff9ff3'],
      ['#ff9ff3', '#fbc531', '#ff9ff3', '#fbc531', '#ff9ff3']
    ],
    rowHints: [
      [{ color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }],
      [{ color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }],
      [{ color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }],
      [{ color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }],
      [{ color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }, { color: '#fbc531', count: 1 }, { color: '#ff9ff3', count: 1 }]
    ],
    columnHints: [
      [{ color: '#ff9ff3', count: 5 }],
      [{ color: '#fbc531', count: 5 }],
      [{ color: '#ff9ff3', count: 5 }],
      [{ color: '#fbc531', count: 5 }],
      [{ color: '#ff9ff3', count: 5 }]
    ]
  },
  {
    id: 3,
    name: '關卡 3 - 笑臉圖案',
    size: 5,
    colors: ['#e74c3c', '#ecf0f1'],
    difficulty: 'medium',
    solution: [
      ['#ecf0f1', '#e74c3c', '#ecf0f1', '#e74c3c', '#ecf0f1'],
      ['#ecf0f1', '#e74c3c', '#ecf0f1', '#e74c3c', '#ecf0f1'],
      ['#ecf0f1', '#ecf0f1', '#ecf0f1', '#ecf0f1', '#ecf0f1'],
      ['#e74c3c', '#ecf0f1', '#ecf0f1', '#ecf0f1', '#e74c3c'],
      ['#ecf0f1', '#e74c3c', '#e74c3c', '#e74c3c', '#ecf0f1']
    ],
    rowHints: [
      [{ color: '#ecf0f1', count: 1 }, { color: '#e74c3c', count: 1 }, { color: '#ecf0f1', count: 1 }, { color: '#e74c3c', count: 1 }, { color: '#ecf0f1', count: 1 }],
      [{ color: '#ecf0f1', count: 1 }, { color: '#e74c3c', count: 1 }, { color: '#ecf0f1', count: 1 }, { color: '#e74c3c', count: 1 }, { color: '#ecf0f1', count: 1 }],
      [{ color: '#ecf0f1', count: 5 }],
      [{ color: '#e74c3c', count: 1 }, { color: '#ecf0f1', count: 3 }, { color: '#e74c3c', count: 1 }],
      [{ color: '#ecf0f1', count: 1 }, { color: '#e74c3c', count: 3 }, { color: '#ecf0f1', count: 1 }]
    ],
    columnHints: [
      [{ color: '#ecf0f1', count: 3 }, { color: '#e74c3c', count: 1 }, { color: '#ecf0f1', count: 1 }],
      [{ color: '#e74c3c', count: 2 }, { color: '#ecf0f1', count: 2 }, { color: '#e74c3c', count: 1 }],
      [{ color: '#ecf0f1', count: 4 }, { color: '#e74c3c', count: 1 }],
      [{ color: '#e74c3c', count: 2 }, { color: '#ecf0f1', count: 2 }, { color: '#e74c3c', count: 1 }],
      [{ color: '#ecf0f1', count: 3 }, { color: '#e74c3c', count: 1 }, { color: '#ecf0f1', count: 1 }]
    ]
  },
  {
    id: 4,
    name: '關卡 4 - 對角線',
    size: 5,
    colors: ['#9b59b6', '#1abc9c'],
    difficulty: 'easy',
    solution: [
      ['#9b59b6', '#1abc9c', '#1abc9c', '#1abc9c', '#1abc9c'],
      ['#1abc9c', '#9b59b6', '#1abc9c', '#1abc9c', '#1abc9c'],
      ['#1abc9c', '#1abc9c', '#9b59b6', '#1abc9c', '#1abc9c'],
      ['#1abc9c', '#1abc9c', '#1abc9c', '#9b59b6', '#1abc9c'],
      ['#1abc9c', '#1abc9c', '#1abc9c', '#1abc9c', '#9b59b6']
    ],
    rowHints: [
      [{ color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 4 }],
      [{ color: '#1abc9c', count: 1 }, { color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 3 }],
      [{ color: '#1abc9c', count: 2 }, { color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 2 }],
      [{ color: '#1abc9c', count: 3 }, { color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 1 }],
      [{ color: '#1abc9c', count: 4 }, { color: '#9b59b6', count: 1 }]
    ],
    columnHints: [
      [{ color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 4 }],
      [{ color: '#1abc9c', count: 1 }, { color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 3 }],
      [{ color: '#1abc9c', count: 2 }, { color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 2 }],
      [{ color: '#1abc9c', count: 3 }, { color: '#9b59b6', count: 1 }, { color: '#1abc9c', count: 1 }],
      [{ color: '#1abc9c', count: 4 }, { color: '#9b59b6', count: 1 }]
    ]
  },
  {
    id: 5,
    name: '關卡 5 - 棋盤格',
    size: 5,
    colors: ['#16a085', '#2980b9'],
    difficulty: 'medium',
    solution: [
      ['#16a085', '#2980b9', '#16a085', '#2980b9', '#16a085'],
      ['#2980b9', '#16a085', '#2980b9', '#16a085', '#2980b9'],
      ['#16a085', '#2980b9', '#16a085', '#2980b9', '#16a085'],
      ['#2980b9', '#16a085', '#2980b9', '#16a085', '#2980b9'],
      ['#16a085', '#2980b9', '#16a085', '#2980b9', '#16a085']
    ],
    rowHints: [
      [{ color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }],
      [{ color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }],
      [{ color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }],
      [{ color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }],
      [{ color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }]
    ],
    columnHints: [
      [{ color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }],
      [{ color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }],
      [{ color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }],
      [{ color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }],
      [{ color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }, { color: '#2980b9', count: 1 }, { color: '#16a085', count: 1 }]
    ]
  },
  {
    id: 6,
    name: '關卡 6 - 心形',
    size: 5,
    colors: ['#e84393', '#2d3436'],
    difficulty: 'medium',
    solution: [
      ['#2d3436', '#e84393', '#2d3436', '#e84393', '#2d3436'],
      ['#e84393', '#e84393', '#e84393', '#e84393', '#e84393'],
      ['#e84393', '#e84393', '#e84393', '#e84393', '#e84393'],
      ['#2d3436', '#e84393', '#e84393', '#e84393', '#2d3436'],
      ['#2d3436', '#2d3436', '#e84393', '#2d3436', '#2d3436']
    ],
    rowHints: [
      [{ color: '#2d3436', count: 1 }, { color: '#e84393', count: 1 }, { color: '#2d3436', count: 1 }, { color: '#e84393', count: 1 }, { color: '#2d3436', count: 1 }],
      [{ color: '#e84393', count: 5 }],
      [{ color: '#e84393', count: 5 }],
      [{ color: '#2d3436', count: 1 }, { color: '#e84393', count: 3 }, { color: '#2d3436', count: 1 }],
      [{ color: '#2d3436', count: 2 }, { color: '#e84393', count: 1 }, { color: '#2d3436', count: 2 }]
    ],
    columnHints: [
      [{ color: '#2d3436', count: 1 }, { color: '#e84393', count: 2 }, { color: '#2d3436', count: 2 }],
      [{ color: '#e84393', count: 4 }, { color: '#2d3436', count: 1 }],
      [{ color: '#2d3436', count: 1 }, { color: '#e84393', count: 3 }, { color: '#2d3436', count: 1 }],
      [{ color: '#e84393', count: 4 }, { color: '#2d3436', count: 1 }],
      [{ color: '#2d3436', count: 1 }, { color: '#e84393', count: 2 }, { color: '#2d3436', count: 2 }]
    ]
  },
  {
    id: 7,
    name: '關卡 7 - 箭頭',
    size: 5,
    colors: ['#d35400', '#74b9ff'],
    difficulty: 'medium',
    solution: [
      ['#74b9ff', '#74b9ff', '#d35400', '#74b9ff', '#74b9ff'],
      ['#74b9ff', '#d35400', '#d35400', '#d35400', '#74b9ff'],
      ['#d35400', '#d35400', '#d35400', '#d35400', '#d35400'],
      ['#74b9ff', '#d35400', '#d35400', '#d35400', '#74b9ff'],
      ['#74b9ff', '#74b9ff', '#d35400', '#74b9ff', '#74b9ff']
    ],
    rowHints: [
      [{ color: '#74b9ff', count: 2 }, { color: '#d35400', count: 1 }, { color: '#74b9ff', count: 2 }],
      [{ color: '#74b9ff', count: 1 }, { color: '#d35400', count: 3 }, { color: '#74b9ff', count: 1 }],
      [{ color: '#d35400', count: 5 }],
      [{ color: '#74b9ff', count: 1 }, { color: '#d35400', count: 3 }, { color: '#74b9ff', count: 1 }],
      [{ color: '#74b9ff', count: 2 }, { color: '#d35400', count: 1 }, { color: '#74b9ff', count: 2 }]
    ],
    columnHints: [
      [{ color: '#74b9ff', count: 2 }, { color: '#d35400', count: 1 }, { color: '#74b9ff', count: 2 }],
      [{ color: '#74b9ff', count: 1 }, { color: '#d35400', count: 3 }, { color: '#74b9ff', count: 1 }],
      [{ color: '#d35400', count: 5 }],
      [{ color: '#74b9ff', count: 1 }, { color: '#d35400', count: 3 }, { color: '#74b9ff', count: 1 }],
      [{ color: '#74b9ff', count: 2 }, { color: '#d35400', count: 1 }, { color: '#74b9ff', count: 2 }]
    ]
  },
  {
    id: 8,
    name: '關卡 8 - 邊框',
    size: 5,
    colors: ['#e17055', '#6c5ce7'],
    difficulty: 'easy',
    solution: [
      ['#e17055', '#e17055', '#e17055', '#e17055', '#e17055'],
      ['#e17055', '#6c5ce7', '#6c5ce7', '#6c5ce7', '#e17055'],
      ['#e17055', '#6c5ce7', '#6c5ce7', '#6c5ce7', '#e17055'],
      ['#e17055', '#6c5ce7', '#6c5ce7', '#6c5ce7', '#e17055'],
      ['#e17055', '#e17055', '#e17055', '#e17055', '#e17055']
    ],
    rowHints: [
      [{ color: '#e17055', count: 5 }],
      [{ color: '#e17055', count: 1 }, { color: '#6c5ce7', count: 3 }, { color: '#e17055', count: 1 }],
      [{ color: '#e17055', count: 1 }, { color: '#6c5ce7', count: 3 }, { color: '#e17055', count: 1 }],
      [{ color: '#e17055', count: 1 }, { color: '#6c5ce7', count: 3 }, { color: '#e17055', count: 1 }],
      [{ color: '#e17055', count: 5 }]
    ],
    columnHints: [
      [{ color: '#e17055', count: 5 }],
      [{ color: '#e17055', count: 1 }, { color: '#6c5ce7', count: 3 }, { color: '#e17055', count: 1 }],
      [{ color: '#e17055', count: 1 }, { color: '#6c5ce7', count: 3 }, { color: '#e17055', count: 1 }],
      [{ color: '#e17055', count: 1 }, { color: '#6c5ce7', count: 3 }, { color: '#e17055', count: 1 }],
      [{ color: '#e17055', count: 5 }]
    ]
  },
  {
    id: 9,
    name: '關卡 9 - 角落',
    size: 5,
    colors: ['#ff7675', '#0984e3'],
    difficulty: 'medium',
    solution: [
      ['#ff7675', '#ff7675', '#0984e3', '#ff7675', '#ff7675'],
      ['#ff7675', '#0984e3', '#0984e3', '#0984e3', '#ff7675'],
      ['#0984e3', '#0984e3', '#0984e3', '#0984e3', '#0984e3'],
      ['#ff7675', '#0984e3', '#0984e3', '#0984e3', '#ff7675'],
      ['#ff7675', '#ff7675', '#0984e3', '#ff7675', '#ff7675']
    ],
    rowHints: [
      [{ color: '#ff7675', count: 2 }, { color: '#0984e3', count: 1 }, { color: '#ff7675', count: 2 }],
      [{ color: '#ff7675', count: 1 }, { color: '#0984e3', count: 3 }, { color: '#ff7675', count: 1 }],
      [{ color: '#0984e3', count: 5 }],
      [{ color: '#ff7675', count: 1 }, { color: '#0984e3', count: 3 }, { color: '#ff7675', count: 1 }],
      [{ color: '#ff7675', count: 2 }, { color: '#0984e3', count: 1 }, { color: '#ff7675', count: 2 }]
    ],
    columnHints: [
      [{ color: '#ff7675', count: 2 }, { color: '#0984e3', count: 1 }, { color: '#ff7675', count: 2 }],
      [{ color: '#ff7675', count: 1 }, { color: '#0984e3', count: 3 }, { color: '#ff7675', count: 1 }],
      [{ color: '#0984e3', count: 5 }],
      [{ color: '#ff7675', count: 1 }, { color: '#0984e3', count: 3 }, { color: '#ff7675', count: 1 }],
      [{ color: '#ff7675', count: 2 }, { color: '#0984e3', count: 1 }, { color: '#ff7675', count: 2 }]
    ]
  },
  {
    id: 10,
    name: '關卡 10 - 鑽石',
    size: 5,
    colors: ['#ff6b6b', '#00cec9'],
    difficulty: 'hard',
    solution: [
      ['#00cec9', '#00cec9', '#ff6b6b', '#00cec9', '#00cec9'],
      ['#00cec9', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#00cec9'],
      ['#ff6b6b', '#ff6b6b', '#00cec9', '#ff6b6b', '#ff6b6b'],
      ['#00cec9', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#00cec9'],
      ['#00cec9', '#00cec9', '#ff6b6b', '#00cec9', '#00cec9']
    ],
    rowHints: [
      [{ color: '#00cec9', count: 2 }, { color: '#ff6b6b', count: 1 }, { color: '#00cec9', count: 2 }],
      [{ color: '#00cec9', count: 1 }, { color: '#ff6b6b', count: 3 }, { color: '#00cec9', count: 1 }],
      [{ color: '#ff6b6b', count: 2 }, { color: '#00cec9', count: 1 }, { color: '#ff6b6b', count: 2 }],
      [{ color: '#00cec9', count: 1 }, { color: '#ff6b6b', count: 3 }, { color: '#00cec9', count: 1 }],
      [{ color: '#00cec9', count: 2 }, { color: '#ff6b6b', count: 1 }, { color: '#00cec9', count: 2 }]
    ],
    columnHints: [
      [{ color: '#00cec9', count: 2 }, { color: '#ff6b6b', count: 1 }, { color: '#00cec9', count: 2 }],
      [{ color: '#00cec9', count: 1 }, { color: '#ff6b6b', count: 3 }, { color: '#00cec9', count: 1 }],
      [{ color: '#ff6b6b', count: 1 }, { color: '#00cec9', count: 1 }, { color: '#ff6b6b', count: 1 }, { color: '#00cec9', count: 1 }, { color: '#ff6b6b', count: 1 }],
      [{ color: '#00cec9', count: 1 }, { color: '#ff6b6b', count: 3 }, { color: '#00cec9', count: 1 }],
      [{ color: '#00cec9', count: 2 }, { color: '#ff6b6b', count: 1 }, { color: '#00cec9', count: 2 }]
    ]
  }
];

