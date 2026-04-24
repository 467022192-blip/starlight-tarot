# 塔罗牌测试网页 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个综合型塔罗牌测试网页，支持每日运势、经典牌阵占卜（1/3/5张）和性格测试，适配PC和移动端。

**Architecture:** 纯前端 SPA，React + Vite + Tailwind CSS。采用页面路由结构，核心数据（78张塔罗牌信息、牌阵定义、解读文本）以 JSON 静态数据内嵌。组件按功能域划分：卡牌展示、牌阵布局、解读结果、性格测试。预留 AI 解读接口。

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, React Router 6, Framer Motion（轻量动效）

---

## File Structure

```
src/
├── main.jsx                          # 应用入口
├── App.jsx                           # 根组件 + 路由配置
├── index.css                         # 全局样式 + Tailwind 指令
├── data/
│   ├── majorArcana.js                # 22张大阿卡纳牌数据
│   ├── minorArcana.js                # 56张小阿卡纳牌数据
│   ├── spreads.js                    # 牌阵定义（1/3/5张）
│   └── personalityQuestions.js       # 性格测试题目数据
├── components/
│   ├── layout/
│   │   ├── Header.jsx                # 顶部导航栏
│   │   ├── Footer.jsx                # 底部信息栏
│   │   └── StarBackground.jsx        # 星空背景组件
│   ├── card/
│   │   ├── TarotCard.jsx             # 单张塔罗牌组件（正/逆位）
│   │   └── CardFlip.jsx              # 卡牌翻转动画封装
│   ├── spread/
│   │   ├── SpreadSelector.jsx        # 牌阵选择器
│   │   └── SpreadLayout.jsx          # 牌阵布局渲染
│   ├── reading/
│   │   ├── ReadingCard.jsx           # 解读中的单牌展示
│   │   └── ReadingResult.jsx         # 完整解读结果面板
│   └── personality/
│       ├── QuestionCard.jsx          # 性格测试题目卡片
│       └── ResultProfile.jsx         # 性格结果画像
├── pages/
│   ├── HomePage.jsx                  # 首页（功能入口）
│   ├── DailyPage.jsx                 # 每日运势
│   ├── SpreadPage.jsx                # 牌阵占卜（选牌+解读）
│   ├── PersonalityPage.jsx           # 性格测试
│   └── ResultPage.jsx                # 结果详情页
├── hooks/
│   ├── useTarotDraw.js               # 抽牌逻辑 hook
│   └── usePersonalityTest.js         # 性格测试状态 hook
├── utils/
│   ├── shuffle.js                    # 洗牌算法
│   └── interpretation.js             # 解读文本生成（预设+AI扩展接口）
└── constants/
    └── theme.js                      # 主题色/设计 token
```

---

### Task 1: 项目脚手架搭建

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: 初始化 Vite + React 项目**

Run:
```bash
cd /Users/bytedance/Documents/trae_projects/塔罗牌
npm create vite@latest . -- --template react
```

- [ ] **Step 2: 安装核心依赖**

Run:
```bash
npm install react-router-dom framer-motion
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: 配置 Tailwind CSS**

修改 `vite.config.js`，添加 Tailwind 插件：

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

修改 `src/index.css`：

```css
@import "tailwindcss";
```

- [ ] **Step 4: 配置 Tailwind 自定义主题**

修改 `src/index.css`，添加自定义主题变量：

```css
@import "tailwindcss";

@theme {
  --color-mystic-bg: #0a0a1a;
  --color-mystic-surface: #12122a;
  --color-mystic-card: #1a1a3e;
  --color-mystic-gold: #d4af37;
  --color-mystic-gold-light: #f0d060;
  --color-mystic-purple: #6b4c9a;
  --color-mystic-text: #e8e0f0;
  --color-mystic-text-muted: #8a7fa8;
  --color-mystic-border: #2a2a5a;
}
```

- [ ] **Step 5: 配置 React Router 基础结构**

修改 `src/App.jsx`：

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-mystic-bg text-mystic-text">
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center h-screen text-mystic-gold text-2xl">塔罗牌占卜</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 6: 验证开发服务器启动**

Run:
```bash
npm run dev
```

Expected: 浏览器打开后显示深色背景 + 金色"塔罗牌占卜"文字

- [ ] **Step 7: 提交**

```bash
git init
git add .
git commit -m "feat: scaffold project with Vite + React + Tailwind"
```

---

### Task 2: 主题常量与星空背景组件

**Files:**
- Create: `src/constants/theme.js`, `src/components/layout/StarBackground.jsx`, `src/components/layout/Header.jsx`, `src/components/layout/Footer.jsx`

- [ ] **Step 1: 创建主题常量**

Create `src/constants/theme.js`：

```js
export const THEME = {
  bg: 'bg-mystic-bg',
  surface: 'bg-mystic-surface',
  card: 'bg-mystic-card',
  gold: 'text-mystic-gold',
  goldBg: 'bg-mystic-gold',
  purple: 'text-mystic-purple',
  text: 'text-mystic-text',
  textMuted: 'text-mystic-text-muted',
  border: 'border-mystic-border',
}

export const CARD_DIMENSIONS = {
  width: 120,
  height: 200,
}

export const ANIMATION = {
  flipDuration: 0.6,
  fadeInDuration: 0.4,
  staggerDelay: 0.15,
}
```

- [ ] **Step 2: 创建星空背景组件**

Create `src/components/layout/StarBackground.jsx`：

```jsx
import { useMemo } from 'react'

export default function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 3 + 2,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 3: 创建 Header 组件**

Create `src/components/layout/Header.jsx`：

```jsx
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/daily', label: '每日运势' },
  { path: '/spread', label: '牌阵占卜' },
  { path: '/personality', label: '性格测试' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-mystic-bg/80 backdrop-blur-md border-b border-mystic-border">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-mystic-gold text-xl font-bold tracking-wider">
          ✦ 塔罗占卜
        </Link>
        <div className="flex gap-1 sm:gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-mystic-text-muted hover:text-mystic-gold transition-colors text-sm sm:text-base px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: 创建 Footer 组件**

Create `src/components/layout/Footer.jsx`：

```jsx
export default function Footer() {
  return (
    <footer className="border-t border-mystic-border py-6 text-center text-mystic-text-muted text-sm">
      <p>✦ 塔罗占卜 · 仅供娱乐参考 ✦</p>
    </footer>
  )
}
```

- [ ] **Step 5: 集成布局组件到 App**

修改 `src/App.jsx`：

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StarBackground from './components/layout/StarBackground'

function App() {
  return (
    <BrowserRouter>
      <StarBackground />
      <div className="relative z-10 min-h-screen flex flex-col bg-mystic-bg text-mystic-text">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<div className="flex items-center justify-center h-[60vh] text-mystic-gold text-2xl">塔罗牌占卜</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 6: 验证布局效果**

Run: `npm run dev`
Expected: 深色背景 + 星空闪烁 + 顶部导航 + 底部信息栏

- [ ] **Step 7: 提交**

```bash
git add .
git commit -m "feat: add theme, star background, header and footer"
```

---

### Task 3: 塔罗牌数据层

**Files:**
- Create: `src/data/majorArcana.js`, `src/data/minorArcana.js`, `src/data/spreads.js`, `src/data/personalityQuestions.js`, `src/utils/shuffle.js`

- [ ] **Step 1: 创建大阿卡纳牌数据（22张）**

Create `src/data/majorArcana.js`：

```js
const MAJOR_ARCANA = [
  { id: 0, name: '愚者', nameEn: 'The Fool', upright: '新的开始、自由、冒险、天真', reversed: '鲁莽、冒失、不计后果', description: '愚者代表着一段全新旅程的开始，充满无限可能。', advice: '勇敢迈出第一步，但也要保持警觉。' },
  { id: 1, name: '魔术师', nameEn: 'The Magician', upright: '创造力、技能、意志力、自信', reversed: '操控、欺骗、才能浪费', description: '魔术师象征着你拥有实现目标的一切资源。', advice: '相信自己的能力，将想法付诸行动。' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', upright: '直觉、潜意识、神秘、智慧', reversed: '忽视直觉、表面化、秘密', description: '女祭司提醒你倾听内心的声音。', advice: '静下心来，相信你的直觉指引。' },
  { id: 3, name: '女皇', nameEn: 'The Empress', upright: '丰盛、母性、自然、创造', reversed: '依赖、过度保护、匮乏感', description: '女皇象征着生命的丰盈与创造力。', advice: '享受生活中的美好，培养你的创造力。' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', upright: '权威、结构、稳定、领导力', reversed: '专制、僵化、控制欲', description: '皇帝代表着秩序与权威的力量。', advice: '建立清晰的规则和结构，承担责任。' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', upright: '传统、信仰、指导、教育', reversed: '打破常规、反叛、新思路', description: '教皇象征着精神指引和传统智慧。', advice: '寻求导师的指引，或成为他人的引路人。' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', upright: '爱情、选择、和谐、价值观', reversed: '失衡、冲突、错误选择', description: '恋人牌代表着重要的选择与深层连接。', advice: '跟随内心做出选择，珍惜真挚的情感。' },
  { id: 7, name: '战车', nameEn: 'The Chariot', upright: '胜利、意志、决心、控制', reversed: '失控、攻击性、方向迷失', description: '战车象征着凭借坚定意志取得胜利。', advice: '保持专注和决心，你终将抵达目标。' },
  { id: 8, name: '力量', nameEn: 'Strength', upright: '勇气、耐心、内在力量、慈悲', reversed: '自我怀疑、脆弱、缺乏信心', description: '力量牌代表着温柔而坚定的内在力量。', advice: '用耐心和慈悲面对挑战，内在力量比你想象的更强大。' },
  { id: 9, name: '隐者', nameEn: 'The Hermit', upright: '内省、独处、智慧、探索', reversed: '孤立、逃避、固执己见', description: '隐者象征着通过独处和反思获得智慧。', advice: '给自己独处的时间，深入思考人生方向。' },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', upright: '转变、机遇、命运、循环', reversed: '厄运、抗拒改变、失控', description: '命运之轮提醒你，变化是永恒的法则。', advice: '接受变化，抓住机遇，一切都在流转之中。' },
  { id: 11, name: '正义', nameEn: 'Justice', upright: '公正、真相、因果、平衡', reversed: '不公、偏见、逃避责任', description: '正义牌象征着因果法则和公正的力量。', advice: '诚实面对自己和他人，公正地做出决定。' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', upright: '牺牲、等待、新视角、放下', reversed: '拖延、抗拒牺牲、无意义等待', description: '倒吊人代表着通过换个角度看问题获得领悟。', advice: '试着换一个角度看待困境，有时等待也是一种智慧。' },
  { id: 13, name: '死神', nameEn: 'Death', upright: '结束、转变、重生、放下', reversed: '抗拒改变、恐惧、停滞', description: '死神牌并非字面意义的死亡，而是象征深刻的转变。', advice: '勇敢地告别过去，为新的开始腾出空间。' },
  { id: 14, name: '节制', nameEn: 'Temperance', upright: '平衡、中庸、耐心、调和', reversed: '失衡、过度、缺乏耐心', description: '节制牌象征着在极端之间找到平衡。', advice: '保持中庸之道，凡事适度，耐心等待。' },
  { id: 15, name: '恶魔', nameEn: 'The Devil', upright: '束缚、欲望、诱惑、执念', reversed: '解脱、打破束缚、觉醒', description: '恶魔牌提醒你审视那些束缚你的执念。', advice: '认清是什么在束缚你，你有能力打破它。' },
  { id: 16, name: '塔', nameEn: 'The Tower', upright: '突变、崩塌、觉醒、真相', reversed: '逃避灾难、恐惧改变、延迟', description: '塔牌象征着突如其来的剧变，但也是觉醒的契机。', advice: '在崩塌中寻找真相，废墟之上将重建更坚固的堡垒。' },
  { id: 17, name: '星星', nameEn: 'The Star', upright: '希望、灵感、宁静、治愈', reversed: '失望、失去信心、断连', description: '星星牌带来希望与治愈的光芒。', advice: '保持希望，即使在最黑暗的时刻，星光依然指引着你。' },
  { id: 18, name: '月亮', nameEn: 'The Moon', upright: '幻象、恐惧、潜意识、直觉', reversed: '真相浮现、释放恐惧、清明', description: '月亮牌提醒你注意表象之下的真相。', advice: '不要被表象迷惑，倾听潜意识的声音。' },
  { id: 19, name: '太阳', nameEn: 'The Sun', upright: '快乐、成功、活力、光明', reversed: '暂时的挫折、过度乐观', description: '太阳牌是最积极的牌之一，象征着光明与成功。', advice: '享受当下的快乐和成功，让阳光照亮你的道路。' },
  { id: 20, name: '审判', nameEn: 'Judgement', upright: '觉醒、重生、反思、召唤', reversed: '自我怀疑、拒绝反思、逃避', description: '审判牌象征着深刻的自我反思和重生。', advice: '审视过去的经历，接受召唤，迎接新的自己。' },
  { id: 21, name: '世界', nameEn: 'The World', upright: '完成、圆满、成就、整合', reversed: '未完成、缺乏闭合、延迟', description: '世界牌象征着一个周期的圆满完成。', advice: '庆祝你的成就，一个完整的循环即将画上句号。' },
]

export default MAJOR_ARCANA
```

- [ ] **Step 2: 创建小阿卡纳牌数据（56张）**

Create `src/data/minorArcana.js`：

```js
const SUITS = ['权杖', '圣杯', '宝剑', '星币']
const SUIT_EN = ['Wands', 'Cups', 'Swords', 'Pentacles']
const SUIT_MEANINGS = {
  '权杖': { domain: '行动与创造', upright: '热情、行动力、创造力', reversed: '急躁、拖延、缺乏方向' },
  '圣杯': { domain: '情感与关系', upright: '情感丰富、直觉、和谐', reversed: '情感失衡、逃避、不满足' },
  '宝剑': { domain: '思维与挑战', upright: '清晰、理性、决断', reversed: '混乱、犹豫、冲突' },
  '星币': { domain: '物质与实际', upright: '稳定、丰收、务实', reversed: '不安定、损失、不切实际' },
}

const NUMBER_MEANINGS = {
  1: { upright: '新的开始、机遇', reversed: '错失机会、起步困难' },
  2: { upright: '平衡、选择、合作', reversed: '犹豫不决、失衡' },
  3: { upright: '成长、创造、合作成果', reversed: '缺乏合作、延迟成长' },
  4: { upright: '稳定、巩固、保护', reversed: '僵化、过度保守' },
  5: { upright: '挑战、冲突、变化', reversed: '走出困境、和解' },
  6: { upright: '和谐、给予、回忆', reversed: '执念过去、不平等' },
  7: { upright: '反思、评估、内在探索', reversed: '迷茫、自我怀疑' },
  8: { upright: '力量、行动、变化', reversed: '停滞、无力感' },
  9: { upright: '充实、接近目标、收获', reversed: '焦虑、功亏一篑' },
  10: { upright: '完成、圆满、过渡', reversed: '负担、不愿放手' },
}

const COURT_MEANINGS = {
  '侍从': { upright: '学习、探索、消息', reversed: '不成熟、拖延消息' },
  '骑士': { upright: '行动、追求、进展', reversed: '鲁莽、方向错误' },
  '王后': { upright: '滋养、内在力量、成熟', reversed: '过度依赖、情绪化' },
  '国王': { upright: '掌控、领导、权威', reversed: '专制、滥用权力' },
}

const MINOR_ARCANA = []

SUITS.forEach((suit, suitIndex) => {
  for (let num = 1; num <= 10; num++) {
    MINOR_ARCANA.push({
      id: 22 + suitIndex * 14 + num - 1,
      name: `${suit}${num}`,
      nameEn: `${num} of ${SUIT_EN[suitIndex]}`,
      suit,
      number: num,
      domain: SUIT_MEANINGS[suit].domain,
      upright: `${SUIT_MEANINGS[suit].upright}；${NUMBER_MEANINGS[num].upright}`,
      reversed: `${SUIT_MEANINGS[suit].reversed}；${NUMBER_MEANINGS[num].reversed}`,
      description: `${suit}${num}代表着${SUIT_MEANINGS[suit].domain}领域中${NUMBER_MEANINGS[num].upright}的能量。`,
      advice: `关注${SUIT_MEANINGS[suit].domain}方面，把握${NUMBER_MEANINGS[num].upright}的契机。`,
    })
  }

  const courts = ['侍从', '骑士', '王后', '国王']
  courts.forEach((court, courtIndex) => {
    MINOR_ARCANA.push({
      id: 22 + suitIndex * 14 + 10 + courtIndex,
      name: `${suit}${court}`,
      nameEn: `${court === '侍从' ? 'Page' : court === '骑士' ? 'Knight' : court === '王后' ? 'Queen' : 'King'} of ${SUIT_EN[suitIndex]}`,
      suit,
      court,
      domain: SUIT_MEANINGS[suit].domain,
      upright: `${SUIT_MEANINGS[suit].upright}；${COURT_MEANINGS[court].upright}`,
      reversed: `${SUIT_MEANINGS[suit].reversed}；${COURT_MEANINGS[court].reversed}`,
      description: `${suit}${court}代表着${SUIT_MEANINGS[suit].domain}领域中${COURT_MEANINGS[court].upright}的特质。`,
      advice: `发挥${COURT_MEANINGS[court].upright}的特质，在${SUIT_MEANINGS[suit].domain}中找到平衡。`,
    })
  })
})

export default MINOR_ARCANA
```

- [ ] **Step 3: 创建牌阵定义数据**

Create `src/data/spreads.js`：

```js
const SPREADS = [
  {
    id: 'single',
    name: '单牌占卜',
    description: '抽取一张牌，获取简洁明确的指引。',
    cardCount: 1,
    positions: [
      { index: 0, name: '指引', description: '当前的指引与启示' },
    ],
  },
  {
    id: 'three-card',
    name: '三牌阵',
    description: '过去-现在-未来，看清时间线上的脉络。',
    cardCount: 3,
    positions: [
      { index: 0, name: '过去', description: '影响当前局势的过去因素' },
      { index: 1, name: '现在', description: '当前的状况与挑战' },
      { index: 2, name: '未来', description: '可能的发展方向' },
    ],
  },
  {
    id: 'five-card',
    name: '五牌阵',
    description: '更全面的解读，涵盖多个维度的深度分析。',
    cardCount: 5,
    positions: [
      { index: 0, name: '现状', description: '当前的处境' },
      { index: 1, name: '挑战', description: '面临的障碍或挑战' },
      { index: 2, name: '建议', description: '塔罗牌给出的建议' },
      { index: 3, name: '趋势', description: '事态的发展趋势' },
      { index: 4, name: '结果', description: '最终可能的结果' },
    ],
  },
]

export default SPREADS
```

- [ ] **Step 4: 创建性格测试题目数据**

Create `src/data/personalityQuestions.js`：

```js
const PERSONALITY_QUESTIONS = [
  {
    id: 1,
    question: '面对一个重要的决定，你通常会？',
    options: [
      { text: '凭直觉果断行动', traits: { fire: 3, wands: 2 } },
      { text: '仔细分析利弊再决定', traits: { air: 3, swords: 2 } },
      { text: '倾听内心感受', traits: { water: 3, cups: 2 } },
      { text: '从实际角度出发', traits: { earth: 3, pentacles: 2 } },
    ],
  },
  {
    id: 2,
    question: '在社交场合中，你更倾向于？',
    options: [
      { text: '成为焦点，带动气氛', traits: { fire: 2, wands: 3 } },
      { text: '与一两人深入交谈', traits: { water: 2, cups: 3 } },
      { text: '观察和分析周围的人', traits: { air: 2, swords: 3 } },
      { text: '享受美食和舒适环境', traits: { earth: 2, pentacles: 3 } },
    ],
  },
  {
    id: 3,
    question: '当你遇到困难时，第一反应是？',
    options: [
      { text: '迎难而上，用行动解决', traits: { fire: 3, wands: 2 } },
      { text: '冷静思考，寻找策略', traits: { air: 3, swords: 2 } },
      { text: '感受情绪，寻求支持', traits: { water: 3, cups: 2 } },
      { text: '稳扎稳打，逐步化解', traits: { earth: 3, pentacles: 2 } },
    ],
  },
  {
    id: 4,
    question: '你最看重生活中的什么？',
    options: [
      { text: '激情与冒险', traits: { fire: 3, wands: 3 } },
      { text: '知识与真理', traits: { air: 3, swords: 3 } },
      { text: '爱与连接', traits: { water: 3, cups: 3 } },
      { text: '安全与稳定', traits: { earth: 3, pentacles: 3 } },
    ],
  },
  {
    id: 5,
    question: '你的理想周末是？',
    options: [
      { text: '户外探险或尝试新事物', traits: { fire: 2, wands: 2 } },
      { text: '阅读、学习或讨论', traits: { air: 2, swords: 2 } },
      { text: '与亲密的人共度时光', traits: { water: 2, cups: 2 } },
      { text: '在家享受宁静与舒适', traits: { earth: 2, pentacles: 2 } },
    ],
  },
  {
    id: 6,
    question: '面对批评，你通常会？',
    options: [
      { text: '立即反驳，捍卫自己', traits: { fire: 3, wands: 1 } },
      { text: '理性分析批评是否合理', traits: { air: 3, swords: 1 } },
      { text: '感到受伤，但会反思', traits: { water: 3, cups: 1 } },
      { text: '默默接受，用行动证明', traits: { earth: 3, pentacles: 1 } },
    ],
  },
  {
    id: 7,
    question: '你更欣赏哪种领导风格？',
    options: [
      { text: '有远见、敢于冒险的领袖', traits: { fire: 2, wands: 3 } },
      { text: '公正、理性的决策者', traits: { air: 2, swords: 3 } },
      { text: '富有同理心的引导者', traits: { water: 2, cups: 3 } },
      { text: '务实、可靠的管理者', traits: { earth: 2, pentacles: 3 } },
    ],
  },
  {
    id: 8,
    question: '在团队合作中，你通常扮演？',
    options: [
      { text: '发起者，推动项目前进', traits: { fire: 2, wands: 2 } },
      { text: '策划者，制定方案策略', traits: { air: 2, swords: 2 } },
      { text: '协调者，维护团队和谐', traits: { water: 2, cups: 2 } },
      { text: '执行者，确保任务落地', traits: { earth: 2, pentacles: 2 } },
    ],
  },
]

export const PERSONALITY_TYPES = {
  fire: {
    name: '权杖型人格',
    element: '火',
    suit: '权杖',
    description: '你充满热情与行动力，是天生的开拓者。你勇于冒险，敢于追求梦想，具有强大的感染力和领导力。',
    strengths: '热情洋溢、行动果断、富有创造力',
    challenges: '容易急躁、缺乏耐心、有时过于冲动',
    cardSuggestion: 7,
  },
  water: {
    name: '圣杯型人格',
    element: '水',
    suit: '圣杯',
    description: '你情感丰富且直觉敏锐，是天生的感受者。你重视情感连接，善于理解他人，内心世界深邃而丰富。',
    strengths: '富有同理心、直觉敏锐、情感深厚',
    challenges: '容易情绪化、过于敏感、有时逃避现实',
    cardSuggestion: 17,
  },
  air: {
    name: '宝剑型人格',
    element: '风',
    suit: '宝剑',
    description: '你思维敏捷且追求真理，是天生的思考者。你善于分析和沟通，重视公正与理性，具有敏锐的洞察力。',
    strengths: '思维清晰、善于分析、追求公正',
    challenges: '容易过度思考、有时过于批判、难以表达情感',
    cardSuggestion: 11,
  },
  earth: {
    name: '星币型人格',
    element: '土',
    suit: '星币',
    description: '你务实稳重且注重实际，是天生的建设者。你重视安全与稳定，善于规划和执行，具有强大的耐心和毅力。',
    strengths: '务实可靠、耐心坚韧、善于规划',
    challenges: '容易保守、抗拒变化、有时过于物质化',
    cardSuggestion: 9,
  },
}

export default PERSONALITY_QUESTIONS
```

- [ ] **Step 5: 创建洗牌工具函数**

Create `src/utils/shuffle.js`：

```js
export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function drawCards(deck, count) {
  const shuffled = shuffle(deck)
  return shuffled.slice(0, count).map((card) => ({
    ...card,
    isReversed: Math.random() < 0.35,
  }))
}
```

- [ ] **Step 6: 提交**

```bash
git add .
git commit -m "feat: add tarot card data, spreads, personality questions and shuffle utility"
```

---

### Task 4: 卡牌核心组件

**Files:**
- Create: `src/components/card/TarotCard.jsx`, `src/components/card/CardFlip.jsx`, `src/hooks/useTarotDraw.js`, `src/utils/interpretation.js`

- [ ] **Step 1: 创建抽牌逻辑 Hook**

Create `src/hooks/useTarotDraw.js`：

```jsx
import { useState, useCallback } from 'react'
import majorArcana from '../data/majorArcana'
import minorArcana from '../data/minorArcana'
import { drawCards } from '../utils/shuffle'

const FULL_DECK = [...majorArcana, ...minorArcana]

export default function useTarotDraw() {
  const [drawnCards, setDrawnCards] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)

  const draw = useCallback((count) => {
    setIsDrawing(true)
    setDrawnCards([])
    const cards = drawCards(FULL_DECK, count)
    setTimeout(() => {
      setDrawnCards(cards)
      setIsDrawing(false)
    }, 300)
    return cards
  }, [])

  const reset = useCallback(() => {
    setDrawnCards([])
    setIsDrawing(false)
  }, [])

  return { drawnCards, isDrawing, draw, reset }
}
```

- [ ] **Step 2: 创建解读文本生成工具**

Create `src/utils/interpretation.js`：

```js
export function generateReading(cards, spread) {
  return cards.map((card, index) => {
    const position = spread.positions[index]
    const isReversed = card.isReversed
    return {
      position: position.name,
      positionDesc: position.description,
      card: card,
      meaning: isReversed ? card.reversed : card.upright,
      description: card.description,
      advice: card.advice,
      isReversed,
    }
  })
}

export function generateSummary(readings) {
  const keywords = readings.map((r) => r.meaning.split('、')[0])
  return `本次占卜的核心主题围绕${keywords.join('、')}展开。`
}

export async function generateAIReading(cards, question) {
  throw new Error('AI 解读功能尚未接入，请使用预设解读。')
}
```

- [ ] **Step 3: 创建卡牌翻转动画组件**

Create `src/components/card/CardFlip.jsx`：

```jsx
import { motion } from 'framer-motion'

export default function CardFlip({ isFlipped, children, delay = 0 }) {
  return (
    <motion.div
      className="perspective-[800px]"
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, delay }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div style={{ backfaceVisibility: 'hidden' }}>{children}</div>
    </motion.div>
  )
}
```

- [ ] **Step 4: 创建塔罗牌组件**

Create `src/components/card/TarotCard.jsx`：

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import CardFlip from './CardFlip'

export default function TarotCard({ card, isReversed = false, onClick, delay = 0, size = 'md' }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const sizeClasses = {
    sm: 'w-16 h-28 sm:w-20 sm:h-32',
    md: 'w-24 h-40 sm:w-28 sm:h-44',
    lg: 'w-32 h-52 sm:w-40 sm:h-60',
  }

  const handleClick = () => {
    if (!isFlipped) setIsFlipped(true)
    onClick?.()
  }

  const cardBack = (
    <div
      className={`${sizeClasses[size]} rounded-lg border-2 border-mystic-gold/40 bg-mystic-card flex items-center justify-center cursor-pointer hover:border-mystic-gold transition-colors`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)`,
      }}
    >
      <span className="text-mystic-gold text-2xl sm:text-3xl">✦</span>
    </div>
  )

  const cardFront = (
    <div
      className={`${sizeClasses[size]} rounded-lg border-2 border-mystic-gold bg-mystic-card p-2 sm:p-3 flex flex-col items-center justify-center text-center cursor-pointer`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)`,
        transform: isReversed ? 'rotate(180deg)' : 'none',
      }}
    >
      <span className="text-mystic-gold text-lg sm:text-xl mb-1">✦</span>
      <p className="text-mystic-gold text-xs sm:text-sm font-bold leading-tight">{card.name}</p>
      <p className="text-mystic-text-muted text-[10px] sm:text-xs mt-1">{card.nameEn}</p>
      {isReversed && (
        <span className="text-mystic-purple text-[10px] mt-1">逆位</span>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={handleClick}
    >
      <CardFlip isFlipped={isFlipped} delay={0}>
        {isFlipped ? cardFront : cardBack}
      </CardFlip>
    </motion.div>
  )
}
```

- [ ] **Step 5: 提交**

```bash
git add .
git commit -m "feat: add TarotCard, CardFlip components, useTarotDraw hook and interpretation utility"
```

---

### Task 5: 首页

**Files:**
- Create: `src/pages/HomePage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: 创建首页**

Create `src/pages/HomePage.jsx`：

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    path: '/daily',
    title: '每日运势',
    icon: '☀️',
    description: '抽取一张牌，获取今日指引',
    color: 'from-yellow-900/30 to-mystic-card',
  },
  {
    path: '/spread',
    title: '牌阵占卜',
    icon: '🔮',
    description: '1/3/5张牌阵，深度解读',
    color: 'from-purple-900/30 to-mystic-card',
  },
  {
    path: '/personality',
    title: '性格测试',
    icon: '🌙',
    description: '探索你的塔罗人格原型',
    color: 'from-blue-900/30 to-mystic-card',
  },
]

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-mystic-gold mb-4">
          ✦ 塔罗占卜 ✦
        </h1>
        <p className="text-mystic-text-muted text-base sm:text-lg max-w-md mx-auto">
          凝视星空，聆听内心的声音，让塔罗牌为你指引方向
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <Link
              to={feature.path}
              className={`block p-6 sm:p-8 rounded-xl border border-mystic-border bg-gradient-to-b ${feature.color} hover:border-mystic-gold/50 transition-all duration-300 hover:-translate-y-1`}
            >
              <span className="text-3xl sm:text-4xl block mb-3">{feature.icon}</span>
              <h2 className="text-mystic-gold text-lg sm:text-xl font-bold mb-2">{feature.title}</h2>
              <p className="text-mystic-text-muted text-sm">{feature.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 更新 App.jsx 路由**

修改 `src/App.jsx`，添加 HomePage 路由：

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StarBackground from './components/layout/StarBackground'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <StarBackground />
      <div className="relative z-10 min-h-screen flex flex-col bg-mystic-bg text-mystic-text">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 3: 验证首页效果**

Run: `npm run dev`
Expected: 首页显示三个功能入口卡片，星空背景，响应式布局

- [ ] **Step 4: 提交**

```bash
git add .
git commit -m "feat: add HomePage with three feature entry cards"
```

---

### Task 6: 每日运势页

**Files:**
- Create: `src/pages/DailyPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: 创建每日运势页**

Create `src/pages/DailyPage.jsx`：

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TarotCard from '../components/card/TarotCard'
import useTarotDraw from '../hooks/useTarotDraw'
import majorArcana from '../data/majorArcana'
import { drawCards } from '../utils/shuffle'

export default function DailyPage() {
  const { drawnCards, isDrawing, draw, reset } = useTarotDraw()
  const [hasDrawn, setHasDrawn] = useState(false)

  const handleDraw = () => {
    draw(1)
    setHasDrawn(true)
  }

  const card = drawnCards[0]

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-mystic-gold text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ☀️ 每日运势
      </motion.h1>

      <div className="flex flex-col items-center">
        {!hasDrawn ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-mystic-text-muted mb-8">静心凝神，抽取今日指引之牌</p>
            <button
              onClick={handleDraw}
              disabled={isDrawing}
              className="px-8 py-3 bg-mystic-gold/20 border border-mystic-gold text-mystic-gold rounded-lg hover:bg-mystic-gold/30 transition-colors text-lg disabled:opacity-50"
            >
              抽取今日牌
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <TarotCard card={card} isReversed={card.isReversed} size="lg" delay={0.2} />

              <motion.div
                className="mt-8 p-6 rounded-xl bg-mystic-surface border border-mystic-border w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center mb-4">
                  <h2 className="text-mystic-gold text-xl font-bold">{card.name}</h2>
                  <p className="text-mystic-text-muted text-sm">{card.nameEn}</p>
                  {card.isReversed && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-mystic-purple/30 text-mystic-purple text-xs rounded">
                      逆位
                    </span>
                  )}
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-mystic-gold">关键词：</span>
                    <span className="text-mystic-text">{card.isReversed ? card.reversed : card.upright}</span>
                  </div>
                  <div>
                    <span className="text-mystic-gold">解读：</span>
                    <span className="text-mystic-text">{card.description}</span>
                  </div>
                  <div>
                    <span className="text-mystic-gold">建议：</span>
                    <span className="text-mystic-text">{card.advice}</span>
                  </div>
                </div>
              </motion.div>

              <button
                onClick={() => { reset(); setHasDrawn(false) }}
                className="mt-6 px-6 py-2 border border-mystic-border text-mystic-text-muted rounded-lg hover:border-mystic-gold/50 hover:text-mystic-gold transition-colors"
              >
                重新抽取
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 添加路由到 App.jsx**

在 `src/App.jsx` 的 Routes 中添加：
```jsx
import DailyPage from './pages/DailyPage'
// ...
<Route path="/daily" element={<DailyPage />} />
```

- [ ] **Step 3: 验证每日运势页**

Run: `npm run dev`
Expected: 点击按钮抽牌，卡牌翻转后显示解读

- [ ] **Step 4: 提交**

```bash
git add .
git commit -m "feat: add DailyPage with card draw and reading"
```

---

### Task 7: 牌阵占卜页

**Files:**
- Create: `src/components/spread/SpreadSelector.jsx`, `src/components/spread/SpreadLayout.jsx`, `src/components/reading/ReadingCard.jsx`, `src/components/reading/ReadingResult.jsx`, `src/pages/SpreadPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: 创建牌阵选择器**

Create `src/components/spread/SpreadSelector.jsx`：

```jsx
import { motion } from 'framer-motion'
import SPREADS from '../../data/spreads'

export default function SpreadSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SPREADS.map((spread, index) => (
        <motion.button
          key={spread.id}
          onClick={() => onSelect(spread)}
          className={`p-4 sm:p-6 rounded-xl border text-left transition-all duration-300 ${
            selected?.id === spread.id
              ? 'border-mystic-gold bg-mystic-gold/10'
              : 'border-mystic-border bg-mystic-surface hover:border-mystic-gold/40'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className={`text-lg font-bold mb-1 ${selected?.id === spread.id ? 'text-mystic-gold' : 'text-mystic-text'}`}>
            {spread.name}
          </h3>
          <p className="text-mystic-text-muted text-sm">{spread.description}</p>
          <p className="text-mystic-gold text-xs mt-2">{spread.cardCount} 张牌</p>
        </motion.button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: 创建牌阵布局组件**

Create `src/components/spread/SpreadLayout.jsx`：

```jsx
import TarotCard from '../card/TarotCard'

export default function SpreadLayout({ cards, spread }) {
  const layoutClass = {
    'single': 'flex justify-center',
    'three-card': 'flex justify-center gap-3 sm:gap-6',
    'five-card': 'flex flex-wrap justify-center gap-3 sm:gap-4 max-w-lg mx-auto',
  }

  return (
    <div className={layoutClass[spread.id] || 'flex justify-center gap-4'}>
      {cards.map((card, index) => (
        <div key={card.id} className="flex flex-col items-center">
          <span className="text-mystic-gold text-xs mb-2">{spread.positions[index]?.name}</span>
          <TarotCard card={card} isReversed={card.isReversed} size="md" delay={index * 0.15} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: 创建解读单牌组件**

Create `src/components/reading/ReadingCard.jsx`：

```jsx
import { motion } from 'framer-motion'

export default function ReadingCard({ reading, index }) {
  return (
    <motion.div
      className="p-4 rounded-lg bg-mystic-surface border border-mystic-border"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-mystic-gold/10 flex items-center justify-center">
          <span className="text-mystic-gold text-sm font-bold">{reading.position}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-mystic-gold font-bold">{reading.card.name}</h4>
            {reading.isReversed && (
              <span className="px-1.5 py-0.5 bg-mystic-purple/30 text-mystic-purple text-xs rounded">
                逆位
              </span>
            )}
          </div>
          <p className="text-mystic-text-muted text-xs mb-2">{reading.positionDesc}</p>
          <p className="text-mystic-text text-sm">
            <span className="text-mystic-gold">关键词：</span>{reading.meaning}
          </p>
          <p className="text-mystic-text text-sm mt-1">
            <span className="text-mystic-gold">解读：</span>{reading.description}
          </p>
          <p className="text-mystic-text text-sm mt-1">
            <span className="text-mystic-gold">建议：</span>{reading.advice}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: 创建完整解读结果面板**

Create `src/components/reading/ReadingResult.jsx`：

```jsx
import { motion } from 'framer-motion'
import ReadingCard from './ReadingCard'
import { generateSummary } from '../../utils/interpretation'

export default function ReadingResult({ readings }) {
  const summary = generateSummary(readings)

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="p-4 rounded-lg bg-mystic-gold/5 border border-mystic-gold/20">
        <p className="text-mystic-gold text-sm font-bold mb-1">✦ 总体概述</p>
        <p className="text-mystic-text text-sm">{summary}</p>
      </div>
      {readings.map((reading, index) => (
        <ReadingCard key={reading.card.id} reading={reading} index={index} />
      ))}
    </motion.div>
  )
}
```

- [ ] **Step 5: 创建牌阵占卜页**

Create `src/pages/SpreadPage.jsx`：

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpreadSelector from '../components/spread/SpreadSelector'
import SpreadLayout from '../components/spread/SpreadLayout'
import ReadingResult from '../components/reading/ReadingResult'
import useTarotDraw from '../hooks/useTarotDraw'
import { generateReading } from '../utils/interpretation'
import SPREADS from '../data/spreads'

const STEPS = { SELECT: 0, DRAW: 1, RESULT: 2 }

export default function SpreadPage() {
  const [step, setStep] = useState(STEPS.SELECT)
  const [selectedSpread, setSelectedSpread] = useState(null)
  const { drawnCards, isDrawing, draw, reset } = useTarotDraw()
  const [readings, setReadings] = useState([])

  const handleSelectSpread = (spread) => {
    setSelectedSpread(spread)
  }

  const handleDraw = () => {
    const cards = draw(selectedSpread.cardCount)
    setReadings(generateReading(cards, selectedSpread))
    setStep(STEPS.RESULT)
  }

  const handleReset = () => {
    reset()
    setSelectedSpread(null)
    setReadings([])
    setStep(STEPS.SELECT)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-mystic-gold text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🔮 牌阵占卜
      </motion.h1>

      <AnimatePresence mode="wait">
        {step === STEPS.SELECT && (
          <motion.div key="select" exit={{ opacity: 0 }} className="space-y-6">
            <p className="text-mystic-text-muted text-center">选择一个牌阵开始占卜</p>
            <SpreadSelector selected={selectedSpread} onSelect={handleSelectSpread} />
            {selectedSpread && (
              <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button
                  onClick={() => setStep(STEPS.DRAW)}
                  className="px-8 py-3 bg-mystic-gold/20 border border-mystic-gold text-mystic-gold rounded-lg hover:bg-mystic-gold/30 transition-colors"
                >
                  开始占卜
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === STEPS.DRAW && (
          <motion.div key="draw" exit={{ opacity: 0 }} className="text-center space-y-8">
            <p className="text-mystic-text-muted">静心凝神，点击下方按钮抽取塔罗牌</p>
            <button
              onClick={handleDraw}
              disabled={isDrawing}
              className="px-8 py-3 bg-mystic-gold/20 border border-mystic-gold text-mystic-gold rounded-lg hover:bg-mystic-gold/30 transition-colors text-lg disabled:opacity-50"
            >
              抽牌
            </button>
          </motion.div>
        )}

        {step === STEPS.RESULT && (
          <motion.div key="result" exit={{ opacity: 0 }} className="space-y-8">
            <SpreadLayout cards={drawnCards} spread={selectedSpread} />
            <ReadingResult readings={readings} />
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-6 py-2 border border-mystic-border text-mystic-text-muted rounded-lg hover:border-mystic-gold/50 hover:text-mystic-gold transition-colors"
              >
                重新占卜
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 6: 添加路由到 App.jsx**

在 `src/App.jsx` 的 Routes 中添加：
```jsx
import SpreadPage from './pages/SpreadPage'
// ...
<Route path="/spread" element={<SpreadPage />} />
```

- [ ] **Step 7: 验证牌阵占卜页**

Run: `npm run dev`
Expected: 选择牌阵 → 抽牌 → 查看解读结果，三步流程完整

- [ ] **Step 8: 提交**

```bash
git add .
git commit -m "feat: add SpreadPage with spread selection, card draw and reading result"
```

---

### Task 8: 性格测试页

**Files:**
- Create: `src/hooks/usePersonalityTest.js`, `src/components/personality/QuestionCard.jsx`, `src/components/personality/ResultProfile.jsx`, `src/pages/PersonalityPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: 创建性格测试状态 Hook**

Create `src/hooks/usePersonalityTest.js`：

```jsx
import { useState, useCallback } from 'react'
import PERSONALITY_QUESTIONS, { PERSONALITY_TYPES } from '../data/personalityQuestions'

export default function usePersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [result, setResult] = useState(null)

  const answerQuestion = useCallback((option) => {
    const newAnswers = [...answers, option]
    setAnswers(newAnswers)

    if (currentQuestion + 1 >= PERSONALITY_QUESTIONS.length) {
      const traits = { fire: 0, water: 0, air: 0, earth: 0 }
      newAnswers.forEach((ans) => {
        Object.entries(ans.traits).forEach(([key, value]) => {
          if (traits[key] !== undefined) traits[key] += value
        })
      })
      const dominant = Object.entries(traits).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
      setResult({
        type: PERSONALITY_TYPES[dominant],
        traits,
        dominant,
      })
      setIsComplete(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }, [currentQuestion, answers])

  const reset = useCallback(() => {
    setCurrentQuestion(0)
    setAnswers([])
    setIsComplete(false)
    setResult(null)
  }, [])

  return {
    currentQuestion,
    totalQuestions: PERSONALITY_QUESTIONS.length,
    answers,
    isComplete,
    result,
    answerQuestion,
    reset,
  }
}
```

- [ ] **Step 2: 创建题目卡片组件**

Create `src/components/personality/QuestionCard.jsx`：

```jsx
import { motion } from 'framer-motion'

export default function QuestionCard({ question, questionIndex, totalQuestions, onAnswer }) {
  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      key={question.id}
    >
      <div className="mb-4 text-center">
        <span className="text-mystic-text-muted text-sm">
          {questionIndex + 1} / {totalQuestions}
        </span>
        <div className="w-full h-1 bg-mystic-border rounded mt-2">
          <div
            className="h-full bg-mystic-gold rounded transition-all duration-300"
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-mystic-gold text-lg sm:text-xl font-bold text-center mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full p-4 rounded-lg border border-mystic-border bg-mystic-surface text-left text-mystic-text hover:border-mystic-gold/50 hover:bg-mystic-gold/5 transition-all duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 3: 创建性格结果画像组件**

Create `src/components/personality/ResultProfile.jsx`：

```jsx
import { motion } from 'framer-motion'
import majorArcana from '../../data/majorArcana'

export default function ResultProfile({ result }) {
  const { type, traits, dominant } = result
  const suggestedCard = majorArcana[type.cardSuggestion]

  const traitLabels = {
    fire: '🔥 火',
    water: '💧 水',
    air: '💨 风',
    earth: '🌍 土',
  }

  const maxTrait = Math.max(...Object.values(traits))

  return (
    <motion.div
      className="max-w-lg mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center p-6 rounded-xl bg-mystic-surface border border-mystic-gold/30">
        <h2 className="text-mystic-gold text-2xl font-bold mb-2">{type.name}</h2>
        <p className="text-mystic-text-muted text-sm mb-4">元素：{type.element} · 对应花色：{type.suit}</p>
        <p className="text-mystic-text">{type.description}</p>
      </div>

      <div className="p-4 rounded-xl bg-mystic-surface border border-mystic-border">
        <h3 className="text-mystic-gold font-bold mb-3">元素分布</h3>
        <div className="space-y-2">
          {Object.entries(traits).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-sm w-12">{traitLabels[key]}</span>
              <div className="flex-1 h-3 bg-mystic-bg rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${key === dominant ? 'bg-mystic-gold' : 'bg-mystic-purple/60'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / maxTrait) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </div>
              <span className="text-mystic-text-muted text-xs w-8">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-mystic-surface border border-mystic-border">
          <h3 className="text-mystic-gold font-bold mb-2 text-sm">✦ 优势</h3>
          <p className="text-mystic-text text-sm">{type.strengths}</p>
        </div>
        <div className="p-4 rounded-xl bg-mystic-surface border border-mystic-border">
          <h3 className="text-mystic-gold font-bold mb-2 text-sm">✦ 挑战</h3>
          <p className="text-mystic-text text-sm">{type.challenges}</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-mystic-gold/5 border border-mystic-gold/20 text-center">
        <p className="text-mystic-text-muted text-sm mb-1">你的守护牌</p>
        <h3 className="text-mystic-gold text-lg font-bold">{suggestedCard.name}</h3>
        <p className="text-mystic-text-muted text-xs">{suggestedCard.nameEn}</p>
        <p className="text-mystic-text text-sm mt-2">{suggestedCard.upright}</p>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: 创建性格测试页**

Create `src/pages/PersonalityPage.jsx`：

```jsx
import { AnimatePresence, motion } from 'framer-motion'
import QuestionCard from '../components/personality/QuestionCard'
import ResultProfile from '../components/personality/ResultProfile'
import usePersonalityTest from '../hooks/usePersonalityTest'
import PERSONALITY_QUESTIONS from '../data/personalityQuestions'

export default function PersonalityPage() {
  const { currentQuestion, totalQuestions, isComplete, result, answerQuestion, reset } = usePersonalityTest()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-mystic-gold text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🌙 性格测试
      </motion.h1>

      {!isComplete ? (
        <AnimatePresence mode="wait">
          <QuestionCard
            question={PERSONALITY_QUESTIONS[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={totalQuestions}
            onAnswer={answerQuestion}
          />
        </AnimatePresence>
      ) : (
        <div className="space-y-6">
          <ResultProfile result={result} />
          <div className="text-center">
            <button
              onClick={reset}
              className="px-6 py-2 border border-mystic-border text-mystic-text-muted rounded-lg hover:border-mystic-gold/50 hover:text-mystic-gold transition-colors"
            >
              重新测试
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 5: 添加路由到 App.jsx**

在 `src/App.jsx` 的 Routes 中添加：
```jsx
import PersonalityPage from './pages/PersonalityPage'
// ...
<Route path="/personality" element={<PersonalityPage />} />
```

- [ ] **Step 6: 验证性格测试页**

Run: `npm run dev`
Expected: 8道题目逐题作答，完成后显示性格画像和元素分布

- [ ] **Step 7: 提交**

```bash
git add .
git commit -m "feat: add PersonalityPage with question flow and result profile"
```

---

### Task 9: 移动端适配优化

**Files:**
- Modify: `src/components/layout/Header.jsx`, `src/components/card/TarotCard.jsx`, `src/components/spread/SpreadLayout.jsx`

- [ ] **Step 1: 优化 Header 移动端导航**

修改 `src/components/layout/Header.jsx`，添加移动端汉堡菜单：

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: '首页' },
  { path: '/daily', label: '每日运势' },
  { path: '/spread', label: '牌阵占卜' },
  { path: '/personality', label: '性格测试' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-mystic-bg/80 backdrop-blur-md border-b border-mystic-border">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-mystic-gold text-xl font-bold tracking-wider">
          ✦ 塔罗占卜
        </Link>

        <div className="hidden sm:flex gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-mystic-text-muted hover:text-mystic-gold transition-colors text-base px-2 py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden text-mystic-gold text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isOpen && (
        <div className="sm:hidden border-t border-mystic-border bg-mystic-bg/95">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-mystic-text-muted hover:text-mystic-gold hover:bg-mystic-gold/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: 优化 SpreadLayout 五牌阵移动端布局**

修改 `src/components/spread/SpreadLayout.jsx`：

```jsx
import TarotCard from '../card/TarotCard'

export default function SpreadLayout({ cards, spread }) {
  const layoutClass = {
    'single': 'flex justify-center',
    'three-card': 'flex justify-center gap-3 sm:gap-6 flex-wrap',
    'five-card': 'grid grid-cols-3 sm:flex sm:flex-row justify-items-center sm:justify-center gap-3 sm:gap-4 max-w-lg mx-auto',
  }

  return (
    <div className={layoutClass[spread.id] || 'flex justify-center gap-4'}>
      {cards.map((card, index) => (
        <div key={card.id} className="flex flex-col items-center">
          <span className="text-mystic-gold text-xs mb-2">{spread.positions[index]?.name}</span>
          <TarotCard card={card} isReversed={card.isReversed} size="md" delay={index * 0.15} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: 验证移动端适配**

Run: `npm run dev`
Expected: 在浏览器开发者工具中切换移动端视口，导航栏折叠为汉堡菜单，牌阵布局自适应

- [ ] **Step 4: 提交**

```bash
git add .
git commit -m "feat: optimize mobile responsive layout with hamburger menu and adaptive spread"
```

---

### Task 10: 最终集成与构建验证

**Files:**
- Modify: `src/App.jsx`（最终完整版）

- [ ] **Step 1: 确认 App.jsx 完整路由配置**

确认 `src/App.jsx` 包含所有路由：

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StarBackground from './components/layout/StarBackground'
import HomePage from './pages/HomePage'
import DailyPage from './pages/DailyPage'
import SpreadPage from './pages/SpreadPage'
import PersonalityPage from './pages/PersonalityPage'

function App() {
  return (
    <BrowserRouter>
      <StarBackground />
      <div className="relative z-10 min-h-screen flex flex-col bg-mystic-bg text-mystic-text">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/daily" element={<DailyPage />} />
            <Route path="/spread" element={<SpreadPage />} />
            <Route path="/personality" element={<PersonalityPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 2: 运行构建验证**

Run:
```bash
npm run build
```

Expected: 构建成功，无错误

- [ ] **Step 3: 本地预览构建产物**

Run:
```bash
npm run preview
```

Expected: 预览站点正常运行，所有页面可访问

- [ ] **Step 4: 最终提交**

```bash
git add .
git commit -m "feat: complete tarot reading web app with all features"
```
