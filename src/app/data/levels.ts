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
    story: {
      arc: '篇章一：告示牆的晨光',
      location: '破曉大道 · 迷霧懸浮海報',
      artifact: '星際志願者召集令',
      briefing: '晨霧吞蝕招募海報的十字徽記，志願者集合點不再發光。',
      objective: '用皇家紫與穗金重畫中央十字燈標，讓訊號再次穿透霧層。',
      mood: 'City-pop × 電子晨霧',
      theme: 'dawn',
      sigil: '🌅'
    },
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
    story: {
      arc: '篇章一：告示牆的晨光',
      location: '霓虹巷口 · 互動路邊看板',
      artifact: '雙頻城市節奏條紋',
      briefing: '里民自製的音樂會海報失去色帶，導覽動畫停擺。',
      objective: '交錯鋪回粉霧與琥珀色條紋，讓街坊再次跟著節拍舞動。',
      mood: 'Lo-fi hiphop × 巷弄回聲',
      theme: 'dawn',
      sigil: '🌅'
    },
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
    story: {
      arc: '篇章一：告示牆的晨光',
      location: '中央車站 · 迎賓笑臉面罩',
      artifact: '晨安巡禮笑臉圖騰',
      briefing: '迎賓志工的笑臉面罩被清空顏色，旅客誤以為服務台關閉。',
      objective: '補上霜白底與朱紅笑臉，讓旅人一抵達就被微笑迎接。',
      mood: 'Brass funk × 早晨人潮',
      theme: 'dawn',
      sigil: '🌅'
    },
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
    story: {
      arc: '篇章二：浮空電車線',
      location: '空軌 4 號月台 · 車身導光條',
      artifact: '對角穿梭列車標線',
      briefing: '浮空電車的導光條閃爍失色，列車無法得到出發許可。',
      objective: '沿對角線刷回紫與綠的信號，為旅客打開下一段路線。',
      mood: 'Synthwave × 輕盈節奏',
      theme: 'rail',
      sigil: '🚝'
    },
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
    story: {
      arc: '篇章二：浮空電車線',
      location: '漂浮市場 · 棋盤式空橋',
      artifact: '導流地磚節奏網',
      briefing: '空橋的指引地磚失色，導致運貨風箏車互相錯車。',
      objective: '重排綠與藍的棋盤節奏，恢復雙向流動秩序。',
      mood: 'Afrobeat × 風鈴環境音',
      theme: 'rail',
      sigil: '🚝'
    },
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
    story: {
      arc: '篇章二：浮空電車線',
      location: '空軌花園 · 心跳信標',
      artifact: '共鳴守護心燈',
      briefing: '列車駕駛靠心燈脈動同步呼吸，如今燈心被灰塵蓋掉色彩。',
      objective: '用亮粉紅與墨灰拼出心形，讓駕駛重新穩住節奏。',
      mood: 'Dream pop × 心跳脈衝',
      theme: 'rail',
      sigil: '🚝'
    },
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
    story: {
      arc: '篇章三：星港訊號塔',
      location: '星港中庭 · 轉乘箭羽塔',
      artifact: '動線指引箭羽',
      briefing: '箭羽燈牌失去橘焰核心，旅客無法找到對的轉乘門。',
      objective: '刷回藍色雲帶與橘色箭頭，讓人潮順著箭羽前進。',
      mood: 'House beat × 機場廣播碎片',
      theme: 'tower',
      sigil: '🛰️'
    },
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
    story: {
      arc: '篇章三：星港訊號塔',
      location: '入境層 · 星光展示櫃',
      artifact: '巡禮收藏匣外框',
      briefing: '旅客完成任務後的徽章需要亮框才能被掃描認證。',
      objective: '以赤陶邊框護住紫色內核，讓收藏匣恢復能量鎖。',
      mood: 'Ambient pads × 宇宙低鳴',
      theme: 'tower',
      sigil: '🛰️'
    },
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
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔頂氣候儀 · 角落風瓣',
      artifact: '風暴預測角標',
      briefing: '角標褪色後無法顯示風向，氣候儀因此停擺。',
      objective: '用珊瑚角與海藍底拼回四角防線，啟動預警系統。',
      mood: 'Drum & bass × 雨夜雷聲',
      theme: 'tower',
      sigil: '🛰️'
    },
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
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔心 · 鑽石共振核心',
      artifact: '雙色脈衝鑽石',
      briefing: '最終的共振核心如果缺色，整座塔的光束就無法升空。',
      objective: '精準修補藍綠外框與桃色菱形，點燃最後的升空儀式。',
      mood: 'Orchestral bass × 倒數脈衝',
      theme: 'tower',
      sigil: '🛰️'
    },
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
  },
  {
    id: 11,
    name: '關卡 11 - 斑馬橫道',
    size: 5,
    colors: ['#f5f6fa', '#2d3436'],
    difficulty: 'easy',
    story: {
      arc: '篇章二：浮空電車線',
      location: '站前廣場 · 晨霧斑馬線',
      artifact: '光感斑馬導引',
      briefing: '入站人潮被霧氣遮擋，斑馬線的亮條無法指引通勤族過街。',
      objective: '交替刷回亮白與石墨色條紋，喚醒站前的安全節奏。',
      mood: 'Upbeat synth × 通勤腳步',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#f5f6fa', '#f5f6fa', '#f5f6fa', '#f5f6fa', '#f5f6fa'],
      ['#2d3436', '#2d3436', '#2d3436', '#2d3436', '#2d3436'],
      ['#f5f6fa', '#f5f6fa', '#f5f6fa', '#f5f6fa', '#f5f6fa'],
      ['#2d3436', '#2d3436', '#2d3436', '#2d3436', '#2d3436'],
      ['#f5f6fa', '#f5f6fa', '#f5f6fa', '#f5f6fa', '#f5f6fa']
    ]
  },
  {
    id: 12,
    name: '關卡 12 - 雙軌門柱',
    size: 5,
    colors: ['#00cec9', '#1e272e'],
    difficulty: 'easy',
    story: {
      arc: '篇章二：浮空電車線',
      location: '月台入口 · 感應門柱',
      artifact: '雙軌磁流門',
      briefing: '門柱失去色彩後無法偵測票證，乘客被迫排成長龍。',
      objective: '以青磁色重新點亮兩側門柱，讓流線順暢移動。',
      mood: 'Downtempo vapor × 站內回聲',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#1e272e', '#00cec9', '#00cec9', '#00cec9', '#1e272e'],
      ['#1e272e', '#00cec9', '#1e272e', '#00cec9', '#1e272e'],
      ['#00cec9', '#00cec9', '#1e272e', '#00cec9', '#00cec9'],
      ['#1e272e', '#00cec9', '#1e272e', '#00cec9', '#1e272e'],
      ['#1e272e', '#00cec9', '#00cec9', '#00cec9', '#1e272e']
    ]
  },
  {
    id: 13,
    name: '關卡 13 - 月台燈帶',
    size: 5,
    colors: ['#ffeaa7', '#2f3640', '#00a8ff'],
    difficulty: 'medium',
    story: {
      arc: '篇章二：浮空電車線',
      location: 'B2 月台 · 雙層燈帶',
      artifact: '節奏式月台燈',
      briefing: '分層燈帶失衡後，列車停靠區域陷入陰暗。',
      objective: '補上琥珀主燈與藍色指示點，讓旅客安心等車。',
      mood: 'Chill hop × 地下回音',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#2f3640', '#ffeaa7', '#ffeaa7', '#ffeaa7', '#2f3640'],
      ['#2f3640', '#ffeaa7', '#00a8ff', '#ffeaa7', '#2f3640'],
      ['#2f3640', '#2f3640', '#2f3640', '#2f3640', '#2f3640'],
      ['#2f3640', '#ffeaa7', '#00a8ff', '#ffeaa7', '#2f3640'],
      ['#2f3640', '#ffeaa7', '#ffeaa7', '#ffeaa7', '#2f3640']
    ]
  },
  {
    id: 14,
    name: '關卡 14 - 車窗矩陣',
    size: 5,
    colors: ['#74b9ff', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章二：浮空電車線',
      location: '懸浮列車 · 全景車窗',
      artifact: '全息窗格',
      briefing: '列車窗格失亮後，旅客無法看到外頭的星港景緻。',
      objective: '重畫外框與窗格，讓景色重新投射。',
      mood: 'Future bass × 風聲',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#2d3436', '#2d3436', '#2d3436', '#2d3436', '#2d3436'],
      ['#2d3436', '#74b9ff', '#74b9ff', '#74b9ff', '#2d3436'],
      ['#2d3436', '#74b9ff', '#2d3436', '#74b9ff', '#2d3436'],
      ['#2d3436', '#74b9ff', '#74b9ff', '#74b9ff', '#2d3436'],
      ['#2d3436', '#2d3436', '#2d3436', '#2d3436', '#2d3436']
    ]
  },
  {
    id: 15,
    name: '關卡 15 - 集電弓箭頭',
    size: 5,
    colors: ['#d63031', '#2f3640'],
    difficulty: 'medium',
    story: {
      arc: '篇章二：浮空電車線',
      location: '維修庫 · 集電弓',
      artifact: '上升電弓箭頭',
      briefing: '電弓的箭頭塗層脫落，無法對準上方導電軌。',
      objective: '以熾紅箭頭標示出準確角度，恢復供電。',
      mood: 'Industrial beats × 工地節奏',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#2f3640', '#2f3640', '#d63031', '#2f3640', '#2f3640'],
      ['#2f3640', '#d63031', '#d63031', '#d63031', '#2f3640'],
      ['#d63031', '#d63031', '#d63031', '#d63031', '#d63031'],
      ['#2f3640', '#2f3640', '#d63031', '#2f3640', '#2f3640'],
      ['#2f3640', '#2f3640', '#d63031', '#2f3640', '#2f3640']
    ]
  },
  {
    id: 16,
    name: '關卡 16 - 訊號塔燈',
    size: 5,
    colors: ['#ff3838', '#ffaf40', '#32ff7e', '#2f3542'],
    difficulty: 'medium',
    story: {
      arc: '篇章二：浮空電車線',
      location: '側線號誌塔',
      artifact: '多段式燈柱',
      briefing: '紅黃綠燈柱的色階混亂，排程系統無法判讀優先級。',
      objective: '依序重排紅、黃、綠燈段，讓列車依序啟動。',
      mood: 'Electro pulse × 訊號滴答',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#2f3542', '#2f3542', '#ff3838', '#2f3542', '#2f3542'],
      ['#2f3542', '#2f3542', '#ff3838', '#2f3542', '#2f3542'],
      ['#2f3542', '#2f3542', '#ffaf40', '#2f3542', '#2f3542'],
      ['#2f3542', '#2f3542', '#ffaf40', '#2f3542', '#2f3542'],
      ['#2f3542', '#2f3542', '#32ff7e', '#2f3542', '#2f3542']
    ]
  },
  {
    id: 17,
    name: '關卡 17 - 雨棚菱格',
    size: 5,
    colors: ['#00cec9', '#9b59b6', '#2c3e50'],
    difficulty: 'medium',
    story: {
      arc: '篇章二：浮空電車線',
      location: '側站雨棚',
      artifact: '菱格玻璃穹頂',
      briefing: '雨棚玻璃熄滅後，夜晚雨滴無法投射出安全折射線。',
      objective: '用紫與青重新織出菱格，恢復夢幻走道。',
      mood: 'Ambient chill × 雨聲',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#2c3e50', '#00cec9', '#9b59b6', '#00cec9', '#2c3e50'],
      ['#00cec9', '#9b59b6', '#9b59b6', '#9b59b6', '#00cec9'],
      ['#9b59b6', '#9b59b6', '#00cec9', '#9b59b6', '#9b59b6'],
      ['#00cec9', '#9b59b6', '#9b59b6', '#9b59b6', '#00cec9'],
      ['#2c3e50', '#00cec9', '#9b59b6', '#00cec9', '#2c3e50']
    ]
  },
  {
    id: 18,
    name: '關卡 18 - 軌道交叉',
    size: 5,
    colors: ['#e67e22', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章二：浮空電車線',
      location: '轉轍場',
      artifact: '交叉動線示意',
      briefing: '轉轍場的交叉燈條熄滅，無法提示列車切換路線。',
      objective: '重繪橙色 X 導引，分流往來列車。',
      mood: 'Percussive techno × 工區節奏',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#e67e22', '#2d3436', '#2d3436', '#2d3436', '#e67e22'],
      ['#2d3436', '#e67e22', '#2d3436', '#e67e22', '#2d3436'],
      ['#2d3436', '#2d3436', '#e67e22', '#2d3436', '#2d3436'],
      ['#2d3436', '#e67e22', '#2d3436', '#e67e22', '#2d3436'],
      ['#e67e22', '#2d3436', '#2d3436', '#2d3436', '#e67e22']
    ]
  },
  {
    id: 19,
    name: '關卡 19 - 導引波浪',
    size: 5,
    colors: ['#74b9ff', '#273c75'],
    difficulty: 'easy',
    story: {
      arc: '篇章二：浮空電車線',
      location: '下沉走廊 · 動態燈帶',
      artifact: '波浪導引',
      briefing: '象徵人潮流動的波浪燈條熄滅後，轉乘走廊顯得迷惘。',
      objective: '交錯鋪回藍與深藍波段，重啟導引節奏。',
      mood: 'House groove × 腳步聲',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#74b9ff', '#273c75', '#74b9ff', '#273c75', '#74b9ff'],
      ['#273c75', '#74b9ff', '#273c75', '#74b9ff', '#273c75'],
      ['#74b9ff', '#273c75', '#74b9ff', '#273c75', '#74b9ff'],
      ['#273c75', '#74b9ff', '#273c75', '#74b9ff', '#273c75'],
      ['#74b9ff', '#273c75', '#74b9ff', '#273c75', '#74b9ff']
    ]
  },
  {
    id: 20,
    name: '關卡 20 - 終點鐘面',
    size: 5,
    colors: ['#fbc531', '#192a56'],
    difficulty: 'medium',
    story: {
      arc: '篇章二：浮空電車線',
      location: '終點站 · 倒數鐘',
      artifact: '浮空鐘面',
      briefing: '終點鐘的金色刻度失焦，旅客錯過最後一班列車。',
      objective: '組回圓環與刻度，讓倒數聲再次迴盪。',
      mood: 'Orchestral clock × 空間混響',
      theme: 'rail',
      sigil: '🚝'
    },
    solution: [
      ['#192a56', '#fbc531', '#fbc531', '#fbc531', '#192a56'],
      ['#fbc531', '#fbc531', '#192a56', '#fbc531', '#fbc531'],
      ['#fbc531', '#192a56', '#192a56', '#192a56', '#fbc531'],
      ['#fbc531', '#fbc531', '#192a56', '#fbc531', '#fbc531'],
      ['#192a56', '#fbc531', '#fbc531', '#fbc531', '#192a56']
    ]
  },
  {
    id: 21,
    name: '關卡 21 - 光束井字',
    size: 5,
    colors: ['#00cec9', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔身中央 · 光束井',
      artifact: '豎向十字光束',
      briefing: '十字光束失衡後，空中航線看不到塔身坐標。',
      objective: '刷回亮青井字，重新對齊航線。',
      mood: 'Synth choir × 空域風',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#2d3436', '#2d3436', '#00cec9', '#2d3436', '#2d3436'],
      ['#2d3436', '#2d3436', '#00cec9', '#2d3436', '#2d3436'],
      ['#00cec9', '#00cec9', '#00cec9', '#00cec9', '#00cec9'],
      ['#2d3436', '#2d3436', '#00cec9', '#2d3436', '#2d3436'],
      ['#2d3436', '#2d3436', '#00cec9', '#2d3436', '#2d3436']
    ]
  },
  {
    id: 22,
    name: '關卡 22 - 雙塔邊界',
    size: 5,
    colors: ['#8e44ad', '#1e272e'],
    difficulty: 'medium',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔翼平台 · 防風板',
      artifact: '雙塔邊界光條',
      briefing: '塔翼邊界暗沉後，巡檢無法分辨安全範圍。',
      objective: '以紫色柱線勾勒邊界，標示維修路徑。',
      mood: 'Darkwave × 高空落差',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#1e272e', '#8e44ad', '#1e272e', '#8e44ad', '#1e272e'],
      ['#1e272e', '#8e44ad', '#8e44ad', '#8e44ad', '#1e272e'],
      ['#1e272e', '#8e44ad', '#1e272e', '#8e44ad', '#1e272e'],
      ['#1e272e', '#8e44ad', '#8e44ad', '#8e44ad', '#1e272e'],
      ['#1e272e', '#8e44ad', '#1e272e', '#8e44ad', '#1e272e']
    ]
  },
  {
    id: 23,
    name: '關卡 23 - 天際步廊',
    size: 5,
    colors: ['#f5cd79', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '懸空步廊',
      artifact: '晨曦步道',
      briefing: '空中步廊燈條斷裂，導覽路線無法串接。',
      objective: '修補黃金步道與交錯罩棚，引導遊客俯瞰全城。',
      mood: 'Nu disco × 高空律動',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#f5cd79', '#f5cd79', '#f5cd79', '#f5cd79', '#f5cd79'],
      ['#f5cd79', '#2d3436', '#2d3436', '#2d3436', '#f5cd79'],
      ['#f5cd79', '#2d3436', '#f5cd79', '#2d3436', '#f5cd79'],
      ['#f5cd79', '#2d3436', '#2d3436', '#2d3436', '#f5cd79'],
      ['#f5cd79', '#f5cd79', '#f5cd79', '#f5cd79', '#f5cd79']
    ]
  },
  {
    id: 24,
    name: '關卡 24 - 觀景平台',
    size: 5,
    colors: ['#ff9ff3', '#2f3640'],
    difficulty: 'easy',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔腰 · 觀景環',
      artifact: '懸浮觀景圈',
      briefing: '粉色玻璃平台失色後，夜景倒影無法成像。',
      objective: '以粉色框體與開口重新鋪陳，讓旅人看見星海。',
      mood: 'Dreamwave × 城市亮光',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#ff9ff3', '#ff9ff3', '#ff9ff3', '#ff9ff3', '#ff9ff3'],
      ['#ff9ff3', '#2f3640', '#2f3640', '#2f3640', '#ff9ff3'],
      ['#ff9ff3', '#2f3640', '#ff9ff3', '#2f3640', '#ff9ff3'],
      ['#ff9ff3', '#2f3640', '#2f3640', '#2f3640', '#ff9ff3'],
      ['#ff9ff3', '#ff9ff3', '#ff9ff3', '#ff9ff3', '#ff9ff3']
    ]
  },
  {
    id: 25,
    name: '關卡 25 - 風向標',
    size: 5,
    colors: ['#feca57', '#1e272e'],
    difficulty: 'medium',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔頂風室',
      artifact: '風向指示箭',
      briefing: '風向標失準後，塔頂無法為飛艇提供安全航道。',
      objective: '用金黃色箭頭重新校準風室，安撫所有飛艇。', 
      mood: 'Epic brass × 高空風鳴',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#1e272e', '#1e272e', '#feca57', '#1e272e', '#1e272e'],
      ['#1e272e', '#feca57', '#feca57', '#feca57', '#1e272e'],
      ['#feca57', '#feca57', '#feca57', '#feca57', '#feca57'],
      ['#1e272e', '#1e272e', '#feca57', '#1e272e', '#1e272e'],
      ['#1e272e', '#1e272e', '#feca57', '#1e272e', '#1e272e']
    ]
  },
  {
    id: 26,
    name: '關卡 26 - 導航棋盤',
    size: 5,
    colors: ['#48dbfb', '#341f97'],
    difficulty: 'easy',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '控制層 · 光網地板',
      artifact: '導航棋盤',
      briefing: '導覽棋盤呈現錯亂，技師無法追蹤各層升降梯。',
      objective: '恢復交錯的藍紫格線，讓導航恢復節奏。',
      mood: 'Electro swing × 控制台嗶聲',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#48dbfb', '#341f97', '#48dbfb', '#341f97', '#48dbfb'],
      ['#341f97', '#48dbfb', '#341f97', '#48dbfb', '#341f97'],
      ['#48dbfb', '#341f97', '#48dbfb', '#341f97', '#48dbfb'],
      ['#341f97', '#48dbfb', '#341f97', '#48dbfb', '#341f97'],
      ['#48dbfb', '#341f97', '#48dbfb', '#341f97', '#48dbfb']
    ]
  },
  {
    id: 27,
    name: '關卡 27 - 升空引擎',
    size: 5,
    colors: ['#ff6b6b', '#0c2461'],
    difficulty: 'medium',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔底環 · 推進引擎',
      artifact: '圓環點火陣列',
      briefing: '引擎外環熄滅後，塔身無法升起穩定的信標光束。',
      objective: '補足紅色圓環與內核，喚醒推進節奏。',
      mood: 'Hybrid drum × 推進轟鳴',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#0c2461', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#0c2461'],
      ['#ff6b6b', '#0c2461', '#ff6b6b', '#0c2461', '#ff6b6b'],
      ['#ff6b6b', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#ff6b6b'],
      ['#ff6b6b', '#0c2461', '#ff6b6b', '#0c2461', '#ff6b6b'],
      ['#0c2461', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#0c2461']
    ]
  },
  {
    id: 28,
    name: '關卡 28 - 控制核心',
    size: 5,
    colors: ['#1dd1a1', '#222f3e'],
    difficulty: 'easy',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '塔心控制室',
      artifact: '翠綠核心矩陣',
      briefing: '核心矩陣黯淡，無法同步各層的能量輸出。',
      objective: '補上中央綠色方陣，讓系統重新對拍。',
      mood: 'Minimal electronica × 核心脈動',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#222f3e', '#222f3e', '#222f3e', '#222f3e', '#222f3e'],
      ['#222f3e', '#1dd1a1', '#1dd1a1', '#1dd1a1', '#222f3e'],
      ['#222f3e', '#1dd1a1', '#1dd1a1', '#1dd1a1', '#222f3e'],
      ['#222f3e', '#1dd1a1', '#1dd1a1', '#1dd1a1', '#222f3e'],
      ['#222f3e', '#222f3e', '#222f3e', '#222f3e', '#222f3e']
    ]
  },
  {
    id: 29,
    name: '關卡 29 - 雷達航道',
    size: 5,
    colors: ['#00a8ff', '#182c61'],
    difficulty: 'medium',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '導引層 · 雷達臂',
      artifact: '斜向航道',
      briefing: '雷達臂的斜線暗去，無法繪出準確航跡。',
      objective: '讓蔚藍斜線再度貫穿塔身，提供明確方向。',
      mood: 'Glitch pulse × 雷達掃描',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#00a8ff', '#182c61', '#182c61', '#182c61', '#182c61'],
      ['#182c61', '#00a8ff', '#182c61', '#182c61', '#182c61'],
      ['#182c61', '#182c61', '#00a8ff', '#182c61', '#182c61'],
      ['#182c61', '#182c61', '#182c61', '#00a8ff', '#182c61'],
      ['#182c61', '#182c61', '#182c61', '#182c61', '#00a8ff']
    ]
  },
  {
    id: 30,
    name: '關卡 30 - 塔頂光束',
    size: 5,
    colors: ['#ffeaa7', '#0c2461'],
    difficulty: 'medium',
    story: {
      arc: '篇章三：星港訊號塔',
      location: '尖頂 · 光束聚焦器',
      artifact: '倒 V 光束',
      briefing: '塔頂光束散焦，無法往天際集中成束。',
      objective: '拼出對稱的倒 V 光束，將能量送上雲端。',
      mood: 'Ambient strings × 高空風聲',
      theme: 'tower',
      sigil: '🛰️'
    },
    solution: [
      ['#ffeaa7', '#0c2461', '#0c2461', '#0c2461', '#ffeaa7'],
      ['#0c2461', '#ffeaa7', '#0c2461', '#ffeaa7', '#0c2461'],
      ['#0c2461', '#0c2461', '#ffeaa7', '#0c2461', '#0c2461'],
      ['#0c2461', '#ffeaa7', '#0c2461', '#ffeaa7', '#0c2461'],
      ['#ffeaa7', '#0c2461', '#0c2461', '#0c2461', '#ffeaa7']
    ]
  },
  {
    id: 31,
    name: '關卡 31 - 浮標列',
    size: 5,
    colors: ['#74b9ff', '#f0932b'],
    difficulty: 'easy',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '內港航道 · 漂浮浮標',
      artifact: '中央浮標列',
      briefing: '浮標列熄滅後，小艇進出港口沒有緩衝線。',
      objective: '在海藍中豎立琥珀色浮標列，維持航道秩序。',
      mood: 'Tropical house × 海風聲',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#74b9ff', '#74b9ff', '#f0932b', '#74b9ff', '#74b9ff'],
      ['#74b9ff', '#74b9ff', '#f0932b', '#74b9ff', '#74b9ff'],
      ['#74b9ff', '#74b9ff', '#f0932b', '#74b9ff', '#74b9ff'],
      ['#74b9ff', '#74b9ff', '#f0932b', '#74b9ff', '#74b9ff'],
      ['#74b9ff', '#74b9ff', '#f0932b', '#74b9ff', '#74b9ff']
    ]
  },
  {
    id: 32,
    name: '關卡 32 - 堤岸口',
    size: 5,
    colors: ['#0abde3', '#ff9f43'],
    difficulty: 'easy',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '南堤 · U 型碼頭',
      artifact: '琥珀堤岸框',
      briefing: '堤岸燈帶消失後，貨船難以靠岸。',
      objective: '重建琥珀 U 型口，守護入港航線。',
      mood: 'Balearic beat × 浪潮',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#ff9f43', '#ff9f43', '#ff9f43', '#ff9f43', '#ff9f43'],
      ['#ff9f43', '#0abde3', '#0abde3', '#0abde3', '#ff9f43'],
      ['#ff9f43', '#0abde3', '#0abde3', '#0abde3', '#ff9f43'],
      ['#ff9f43', '#0abde3', '#0abde3', '#0abde3', '#ff9f43'],
      ['#ff9f43', '#ff9f43', '#ff9f43', '#ff9f43', '#ff9f43']
    ]
  },
  {
    id: 33,
    name: '關卡 33 - 貨櫃疊',
    size: 5,
    colors: ['#ff7675', '#4b7bec', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '自由倉 · 貨櫃塔',
      artifact: '彩色貨櫃指示',
      briefing: '貨櫃塗層褪色，無人車讀不到識別碼。',
      objective: '用紅藍條疊出節奏，重新排列倉儲節拍。',
      mood: 'Lo-fi beats × 起重機聲',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#ff7675', '#4b7bec', '#ff7675', '#4b7bec', '#ff7675'],
      ['#4b7bec', '#ff7675', '#4b7bec', '#ff7675', '#4b7bec'],
      ['#2d3436', '#2d3436', '#2d3436', '#2d3436', '#2d3436'],
      ['#4b7bec', '#ff7675', '#4b7bec', '#ff7675', '#4b7bec'],
      ['#ff7675', '#4b7bec', '#ff7675', '#4b7bec', '#ff7675']
    ]
  },
  {
    id: 34,
    name: '關卡 34 - 魚骨棧道',
    size: 5,
    colors: ['#1e90ff', '#f5cd79'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '西岸 · 魚骨棧道',
      artifact: '魚骨照明',
      briefing: '棧道魚骨燈滅了，夜釣人找不到回程路。',
      objective: '鋪回藍金交錯的魚骨紋，照亮潮間帶。',
      mood: 'Downtempo × 潮汐節奏',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#f5cd79', '#1e90ff', '#f5cd79', '#1e90ff', '#f5cd79'],
      ['#1e90ff', '#f5cd79', '#1e90ff', '#f5cd79', '#1e90ff'],
      ['#f5cd79', '#1e90ff', '#f5cd79', '#1e90ff', '#f5cd79'],
      ['#1e90ff', '#f5cd79', '#1e90ff', '#f5cd79', '#1e90ff'],
      ['#f5cd79', '#1e90ff', '#f5cd79', '#1e90ff', '#f5cd79']
    ]
  },
  {
    id: 35,
    name: '關卡 35 - 港燈塔',
    size: 5,
    colors: ['#2980b9', '#ffffff', '#e74c3c'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '外港 · 霓虹燈塔',
      artifact: '雙色燈塔',
      briefing: '燈塔冠頂與燈室失色，遠航船隊失去定位。',
      objective: '補上紅冠與白塔身，守住港灣亮光。',
      mood: 'Post-rock × 浪擊聲',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#2980b9', '#e74c3c', '#e74c3c', '#e74c3c', '#2980b9'],
      ['#2980b9', '#ffffff', '#ffffff', '#ffffff', '#2980b9'],
      ['#2980b9', '#ffffff', '#ffffff', '#ffffff', '#2980b9'],
      ['#2980b9', '#ffffff', '#ffffff', '#ffffff', '#2980b9'],
      ['#2980b9', '#2980b9', '#ffffff', '#2980b9', '#2980b9']
    ]
  },
  {
    id: 36,
    name: '關卡 36 - 海交十字',
    size: 5,
    colors: ['#2d98da', '#fbc531'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '中流浮橋',
      artifact: '海交十字',
      briefing: '浮橋十字標失亮，渡輪會偏離交會點。',
      objective: '刷回金色十字，標示潮汐節點。',
      mood: 'Dream pop × 水波共鳴',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#2d98da', '#2d98da', '#fbc531', '#2d98da', '#2d98da'],
      ['#2d98da', '#fbc531', '#fbc531', '#fbc531', '#2d98da'],
      ['#fbc531', '#fbc531', '#fbc531', '#fbc531', '#fbc531'],
      ['#2d98da', '#fbc531', '#fbc531', '#fbc531', '#2d98da'],
      ['#2d98da', '#2d98da', '#fbc531', '#2d98da', '#2d98da']
    ]
  },
  {
    id: 37,
    name: '關卡 37 - 吊車臂',
    size: 5,
    colors: ['#f79f1f', '#2d3e50', '#ffc312'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '北岸 · 橫移吊車',
      artifact: '金色吊車臂',
      briefing: '吊車輪廓變暗，夜班司機無法鎖定旋臂位置。',
      objective: '描回黃橙臂架與吊燈，守護夜間裝卸。',
      mood: 'Industrial downtempo × 金屬敲擊',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#f79f1f', '#f79f1f', '#f79f1f', '#f79f1f', '#f79f1f'],
      ['#f79f1f', '#2d3e50', '#2d3e50', '#2d3e50', '#2d3e50'],
      ['#f79f1f', '#2d3e50', '#ffc312', '#2d3e50', '#2d3e50'],
      ['#f79f1f', '#2d3e50', '#2d3e50', '#2d3e50', '#2d3e50'],
      ['#f79f1f', '#2d3e50', '#2d3e50', '#2d3e50', '#2d3e50']
    ]
  },
  {
    id: 38,
    name: '關卡 38 - 港灣波浪',
    size: 5,
    colors: ['#54a0ff', '#1b2845', '#feca57'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '觀潮灣 · 霓虹波浪牆',
      artifact: '朝陽波浪',
      briefing: '波浪牆的日升圖層熄滅，港灣晨曦黯淡。',
      objective: '復刻金色日輪與藍色浪線，迎接新潮汐。',
      mood: 'Sunrise chill × 潮聲',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#54a0ff', '#54a0ff', '#feca57', '#54a0ff', '#54a0ff'],
      ['#1b2845', '#54a0ff', '#1b2845', '#54a0ff', '#1b2845'],
      ['#54a0ff', '#1b2845', '#54a0ff', '#1b2845', '#54a0ff'],
      ['#1b2845', '#54a0ff', '#1b2845', '#54a0ff', '#1b2845'],
      ['#54a0ff', '#1b2845', '#54a0ff', '#1b2845', '#54a0ff']
    ]
  },
  {
    id: 39,
    name: '關卡 39 - 夜色折射',
    size: 5,
    colors: ['#ff9f43', '#576574', '#c8d6e5'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '東碼頭 · 折射窗',
      artifact: '琥珀折射窗',
      briefing: '碼頭的折射窗變得灰暗，遊客看不到夜景倒影。',
      objective: '用橘框與霧藍玻璃拼出暖色橫幅，映照潮面。',
      mood: 'Chill R&B × 玻璃共鳴',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#ff9f43', '#576574', '#576574', '#576574', '#ff9f43'],
      ['#576574', '#c8d6e5', '#c8d6e5', '#c8d6e5', '#576574'],
      ['#576574', '#c8d6e5', '#576574', '#c8d6e5', '#576574'],
      ['#576574', '#c8d6e5', '#c8d6e5', '#c8d6e5', '#576574'],
      ['#ff9f43', '#576574', '#576574', '#576574', '#ff9f43']
    ]
  },
  {
    id: 40,
    name: '關卡 40 - 碼頭視窗',
    size: 5,
    colors: ['#1dd1a1', '#10ac84', '#222f3e'],
    difficulty: 'medium',
    story: {
      arc: '篇章四：港灣霓虹環',
      location: '舊碼頭倉庫',
      artifact: '綠色觀潮窗',
      briefing: '倉庫視窗暗去，內部無法監控潮汐水位。',
      objective: '拼成綠色幾何視窗，讓值班員透視水位。',
      mood: 'Organic electronica × 木質回音',
      theme: 'harbor',
      sigil: '⚓️'
    },
    solution: [
      ['#222f3e', '#222f3e', '#222f3e', '#222f3e', '#222f3e'],
      ['#222f3e', '#10ac84', '#1dd1a1', '#10ac84', '#222f3e'],
      ['#222f3e', '#1dd1a1', '#10ac84', '#1dd1a1', '#222f3e'],
      ['#222f3e', '#10ac84', '#1dd1a1', '#10ac84', '#222f3e'],
      ['#222f3e', '#222f3e', '#222f3e', '#222f3e', '#222f3e']
    ]
  },
  {
    id: 41,
    name: '關卡 41 - 屋頂花園',
    size: 5,
    colors: ['#1abc9c', '#16a085', '#0b2d3b'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '雲頂商場 · 屋頂花園',
      artifact: '綠帶天井',
      briefing: '節慶草坪褪色，空中市集少了綠意舞台。',
      objective: '用雙層綠框圍出花園，迎接花車進場。',
      mood: 'City pop × 風鈴',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#0b2d3b', '#1abc9c', '#1abc9c', '#1abc9c', '#0b2d3b'],
      ['#1abc9c', '#16a085', '#16a085', '#16a085', '#1abc9c'],
      ['#1abc9c', '#16a085', '#1abc9c', '#16a085', '#1abc9c'],
      ['#1abc9c', '#16a085', '#16a085', '#16a085', '#1abc9c'],
      ['#0b2d3b', '#1abc9c', '#1abc9c', '#1abc9c', '#0b2d3b']
    ]
  },
  {
    id: 42,
    name: '關卡 42 - 燈籠斜串',
    size: 5,
    colors: ['#ff6b6b', '#ffd32a', '#1e272e'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '空橋 · 懸掛燈籠',
      artifact: '斜串燈籠',
      briefing: '燈籠串熄滅後，空橋失去節慶軌跡。',
      objective: '沿斜線掛回紅黃燈籠，指引遊客穿梭。',
      mood: 'Future funk × 喧鬧人聲',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#ff6b6b', '#1e272e', '#1e272e', '#1e272e', '#1e272e'],
      ['#1e272e', '#ffd32a', '#1e272e', '#1e272e', '#1e272e'],
      ['#1e272e', '#1e272e', '#ff6b6b', '#1e272e', '#1e272e'],
      ['#1e272e', '#1e272e', '#1e272e', '#ffd32a', '#1e272e'],
      ['#1e272e', '#1e272e', '#1e272e', '#1e272e', '#ff6b6b']
    ]
  },
  {
    id: 43,
    name: '關卡 43 - 煙火圓心',
    size: 5,
    colors: ['#ff9ff3', '#ffffff', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '花園中央 · 煙火平台',
      artifact: '煙火圓心矩陣',
      briefing: '煙火圓環熄滅後，夜空表演少了定位。',
      objective: '以粉色圓環和白色火花填回矩陣，準備倒數。',
      mood: 'Orchestral pop × 群眾歡呼',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#2d3436', '#ff9ff3', '#ff9ff3', '#ff9ff3', '#2d3436'],
      ['#ff9ff3', '#ffffff', '#ffffff', '#ffffff', '#ff9ff3'],
      ['#ff9ff3', '#ffffff', '#ff9ff3', '#ffffff', '#ff9ff3'],
      ['#ff9ff3', '#ffffff', '#ffffff', '#ffffff', '#ff9ff3'],
      ['#2d3436', '#ff9ff3', '#ff9ff3', '#ff9ff3', '#2d3436']
    ]
  },
  {
    id: 44,
    name: '關卡 44 - 舞台拱門',
    size: 5,
    colors: ['#ff6b6b', '#feca57', '#1e272e'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '主舞台 · 拱門燈帶',
      artifact: '金色拱門',
      briefing: '拱門外框熄滅，表演者無法看見舞台界線。',
      objective: '疊回紅色外框和金色拱門，讓舞台閃耀登場。',
      mood: 'Electro pop × 掌聲',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#ff6b6b', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#ff6b6b'],
      ['#ff6b6b', '#feca57', '#feca57', '#feca57', '#ff6b6b'],
      ['#ff6b6b', '#feca57', '#1e272e', '#feca57', '#ff6b6b'],
      ['#ff6b6b', '#feca57', '#feca57', '#feca57', '#ff6b6b'],
      ['#ff6b6b', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#ff6b6b']
    ]
  },
  {
    id: 45,
    name: '關卡 45 - 無人機航道',
    size: 5,
    colors: ['#48dbfb', '#2e86de', '#1b1464'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '夜空表演 · 無人機隊',
      artifact: '藍色航道',
      briefing: '無人機燈條亂序，圖騰無法成形。',
      objective: '交錯鋪回雙色航道，維持隊形流動。',
      mood: 'Future bass × 空拍聲',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#48dbfb', '#1b1464', '#48dbfb', '#1b1464', '#48dbfb'],
      ['#1b1464', '#2e86de', '#1b1464', '#2e86de', '#1b1464'],
      ['#48dbfb', '#1b1464', '#48dbfb', '#1b1464', '#48dbfb'],
      ['#1b1464', '#2e86de', '#1b1464', '#2e86de', '#1b1464'],
      ['#48dbfb', '#1b1464', '#48dbfb', '#1b1464', '#48dbfb']
    ]
  },
  {
    id: 46,
    name: '關卡 46 - 市集雨棚',
    size: 5,
    colors: ['#ff3838', '#ff9f1a'],
    difficulty: 'easy',
    story: {
      arc: '篇章五：天空花園節',
      location: '空中市集 · 彩條雨棚',
      artifact: '紅橙條紋',
      briefing: '雨棚條紋褪色，攤販攤位不再醒目。',
      objective: '交錯鋪上紅橙條紋，讓市集重新熱鬧。',
      mood: 'Latin pop × 攤販叫賣',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#ff3838', '#ff3838', '#ff3838', '#ff3838', '#ff3838'],
      ['#ff9f1a', '#ff9f1a', '#ff9f1a', '#ff9f1a', '#ff9f1a'],
      ['#ff3838', '#ff3838', '#ff3838', '#ff3838', '#ff3838'],
      ['#ff9f1a', '#ff9f1a', '#ff9f1a', '#ff9f1a', '#ff9f1a'],
      ['#ff3838', '#ff3838', '#ff3838', '#ff3838', '#ff3838']
    ]
  },
  {
    id: 47,
    name: '關卡 47 - 中央噴泉',
    size: 5,
    colors: ['#74b9ff', '#a29bfe', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '中央水景',
      artifact: '霧化噴泉',
      briefing: '噴泉光束黯淡，水霧無法映出城市霓虹。',
      objective: '畫出藍紫噴泉層次，重啟清涼水舞。',
      mood: 'Ambient house × 水滴聲',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#2d3436', '#74b9ff', '#74b9ff', '#74b9ff', '#2d3436'],
      ['#74b9ff', '#a29bfe', '#a29bfe', '#a29bfe', '#74b9ff'],
      ['#74b9ff', '#a29bfe', '#74b9ff', '#a29bfe', '#74b9ff'],
      ['#74b9ff', '#a29bfe', '#a29bfe', '#a29bfe', '#74b9ff'],
      ['#2d3436', '#74b9ff', '#74b9ff', '#74b9ff', '#2d3436']
    ]
  },
  {
    id: 48,
    name: '關卡 48 - 光井格線',
    size: 5,
    colors: ['#c8d6e5', '#576574', '#f39c12'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '塔樓 · 天光井',
      artifact: '琉璃格線',
      briefing: '天光井格線暗去，光束無法灑落舞池。',
      objective: '排回灰白格線與金色亮點，讓光雨落下。',
      mood: 'Ambient techno × 玻璃回聲',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#576574', '#c8d6e5', '#576574', '#c8d6e5', '#576574'],
      ['#c8d6e5', '#f39c12', '#c8d6e5', '#f39c12', '#c8d6e5'],
      ['#576574', '#c8d6e5', '#576574', '#c8d6e5', '#576574'],
      ['#c8d6e5', '#f39c12', '#c8d6e5', '#f39c12', '#c8d6e5'],
      ['#576574', '#c8d6e5', '#576574', '#c8d6e5', '#576574']
    ]
  },
  {
    id: 49,
    name: '關卡 49 - 巡遊箭列',
    size: 5,
    colors: ['#e84393', '#f5cd79', '#2d3436'],
    difficulty: 'medium',
    story: {
      arc: '篇章五：天空花園節',
      location: '巡遊道 · 地面箭列',
      artifact: '巡遊動線箭頭',
      briefing: '矢量箭頭褪色，花車無法對準進場方向。',
      objective: '用桃粉箭頭與金色核心標示巡遊節奏。',
      mood: 'Brass funk × 鼓隊節拍',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#2d3436', '#2d3436', '#e84393', '#2d3436', '#2d3436'],
      ['#2d3436', '#e84393', '#e84393', '#e84393', '#2d3436'],
      ['#e84393', '#e84393', '#f5cd79', '#e84393', '#e84393'],
      ['#2d3436', '#e84393', '#e84393', '#e84393', '#2d3436'],
      ['#2d3436', '#2d3436', '#e84393', '#2d3436', '#2d3436']
    ]
  },
  {
    id: 50,
    name: '關卡 50 - 終章鑽花',
    size: 5,
    colors: ['#ff6b6b', '#fff3b0', '#2f3542'],
    difficulty: 'hard',
    story: {
      arc: '篇章五：天空花園節',
      location: '終章塔頂 · 鑽花陣',
      artifact: '鑽石煙火圖騰',
      briefing: '終章鑽花變得黯淡，倒數儀式缺乏收束。',
      objective: '以金色鑽框與紅色核心綻放最終光束。',
      mood: 'Cinematic crescendo × 倒數歡呼',
      theme: 'festival',
      sigil: '🎆'
    },
    solution: [
      ['#2f3542', '#2f3542', '#fff3b0', '#2f3542', '#2f3542'],
      ['#2f3542', '#fff3b0', '#ff6b6b', '#fff3b0', '#2f3542'],
      ['#fff3b0', '#ff6b6b', '#ff6b6b', '#ff6b6b', '#fff3b0'],
      ['#2f3542', '#fff3b0', '#ff6b6b', '#fff3b0', '#2f3542'],
      ['#2f3542', '#2f3542', '#fff3b0', '#2f3542', '#2f3542']
    ]
  }
];
