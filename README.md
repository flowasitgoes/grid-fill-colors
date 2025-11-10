# 🎨 多色 Nonogram 填色游戏

一个基于 Angular 的多色 Nonogram（数织）填色游戏，玩家根据网格边缘的数字和颜色提示，推导并填充正确的颜色图案。

## 游戏特色

- 🎮 **经典 Nonogram 玩法**：根据行列提示推理出正确的图案
- 🌈 **多色支持**：不只是黑白，支持多种颜色组合
- 📱 **响应式设计**：适配各种屏幕尺寸
- ✨ **精美界面**：现代化的 UI 设计和流畅动画
- 🎯 **3个预设关卡**：从简单到中等难度

## 技术栈

- **Angular 17+** - 使用 standalone components
- **TypeScript** - 类型安全的开发体验
- **RxJS** - 响应式状态管理
- **CSS3** - 现代化样式和动画

## 安装和运行

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm start
```

然后在浏览器中打开 `http://localhost:8888`

### 构建生产版本

```bash
npm run build
```

构建产物会输出到 `dist/` 目录

## 游戏规则

1. **观察提示**：网格边缘显示了每行/每列的颜色和连续方块数量
   - 例如：`[红2, 白1, 红2]` 表示该行有 2 个连续红色、1 个白色、2 个连续红色

2. **填充方块**：
   - 左键点击方块可以循环切换颜色（空白 → 颜色1 → 颜色2 → 空白）
   - 右键点击可以清空方块

3. **完成游戏**：
   - 填满所有方块后点击"检查答案"
   - 如果正确会显示成功消息
   - 如果错误可以继续修改或使用提示功能

4. **辅助功能**：
   - **提示按钮**：自动填充一个正确的格子
   - **重置按钮**：清空所有填色重新开始

## 项目结构

```
grid-fill-colors/
├── src/
│   ├── app/
│   │   ├── components/          # UI 组件
│   │   │   ├── game-board/      # 游戏主面板
│   │   │   ├── grid-cell/       # 单个方块
│   │   │   ├── hint-row/        # 行提示
│   │   │   ├── hint-column/     # 列提示
│   │   │   └── level-selector/  # 关卡选择器
│   │   ├── models/              # 数据模型
│   │   │   ├── level.model.ts
│   │   │   ├── cell.model.ts
│   │   │   └── hint.model.ts
│   │   ├── services/            # 业务逻辑服务
│   │   │   ├── game.service.ts  # 游戏状态管理
│   │   │   └── level.service.ts # 关卡数据管理
│   │   ├── data/
│   │   │   └── levels.ts        # 预设关卡数据
│   │   └── app.component.ts     # 根组件
│   ├── styles.css               # 全局样式
│   └── index.html
├── package.json
├── angular.json
└── README.md
```

## 关卡设计

### 关卡 1 - 十字图案（简单）
- 颜色：红色、白色
- 图案：中心十字形

### 关卡 2 - 竖条纹（简单）
- 颜色：蓝色、白色
- 图案：垂直条纹

### 关卡 3 - 笑脸图案（中等）
- 颜色：红色、白色
- 图案：简单笑脸

## 核心功能实现

### 游戏状态管理（GameService）
- 管理玩家当前填色状态
- 验证答案正确性
- 提供提示功能
- 使用 RxJS Observable 实现响应式状态更新

### 关卡数据管理（LevelService）
- 提供预设关卡数据
- 自动生成行列提示
- 验证关卡数据完整性

### UI 组件
- **GridCell**：可交互的单元格，支持颜色循环切换
- **HintRow/Column**：显示带颜色的数字提示
- **GameBoard**：整合网格和提示的主游戏面板
- **LevelSelector**：美观的关卡选择界面

## 扩展想法

想要添加更多功能？这里有一些建议：

- [ ] 添加更多关卡
- [ ] 实现计时功能和最佳记录
- [ ] 添加音效和背景音乐
- [ ] 支持自定义关卡编辑器
- [ ] 实现撤销/重做功能
- [ ] 添加不同尺寸的网格（7x7, 10x10）
- [ ] 集成后端保存玩家进度
- [ ] 添加多人对战模式

## 开发说明

### 添加新关卡

在 `src/app/data/levels.ts` 中按照以下格式添加：

```typescript
{
  id: 4,
  name: '关卡 4 - 你的图案',
  size: 5,
  colors: ['red', 'blue'],
  difficulty: 'medium',
  solution: [
    // 5x5 颜色矩阵
  ],
  rowHints: [...],
  columnHints: [...]
}
```

### 自定义颜色

在 `src/styles.css` 中修改 CSS 变量：

```css
:root {
  --color-red: #e74c3c;
  --color-blue: #3498db;
  /* 添加更多颜色 */
}
```

## 许可证

MIT License

## 作者

Created with ❤️ using Angular

---

享受游戏！如有问题或建议，欢迎提出 issue。

# grid-fill-colors
