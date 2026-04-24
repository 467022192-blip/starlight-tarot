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

export const THEMES = [
  {
    id: 'daily',
    name: '每日运势',
    description: '每天一张牌，获取来自宇宙的指引',
    icon: 'daily',
    color: 'amber',
    route: '/daily',
  },
  {
    id: 'love',
    name: '爱情运势',
    description: '解读感情走向，寻觅心灵契合',
    icon: 'love',
    color: 'rose',
    route: '/theme/love',
    spreads: [
      {
        id: 'love-single',
        name: '爱情指引',
        description: '一张牌，揭示你感情中的核心讯息',
        cardCount: 1,
        positions: [
          { index: 0, name: '爱情指引', description: '感情中的核心启示' },
        ],
      },
      {
        id: 'love-three',
        name: '爱情三角',
        description: '你-对方-关系，看清爱情的全貌',
        cardCount: 3,
        positions: [
          { index: 0, name: '你的内心', description: '你对这段感情的真实感受' },
          { index: 1, name: '对方的心', description: '对方的态度与想法' },
          { index: 2, name: '关系走向', description: '这段感情的发展趋势' },
        ],
      },
      {
        id: 'love-five',
        name: '爱情深度',
        description: '全面解析爱情的各个维度',
        cardCount: 5,
        positions: [
          { index: 0, name: '感情现状', description: '当前感情的真实状态' },
          { index: 1, name: '情感障碍', description: '阻碍感情发展的因素' },
          { index: 2, name: '你的需求', description: '你内心真正渴望的' },
          { index: 3, name: '对方需求', description: '对方内心真正渴望的' },
          { index: 4, name: '爱情未来', description: '感情最终可能的走向' },
        ],
      },
    ],
  },
  {
    id: 'growth',
    name: '个人成长',
    description: '探索内在力量，开启蜕变之旅',
    icon: 'growth',
    color: 'cyan',
    route: '/theme/growth',
    spreads: [
      {
        id: 'growth-single',
        name: '成长指引',
        description: '一张牌，揭示你成长中的核心讯息',
        cardCount: 1,
        positions: [
          { index: 0, name: '成长指引', description: '个人成长中的核心启示' },
        ],
      },
      {
        id: 'growth-three',
        name: '成长轨迹',
        description: '起点-当下-方向，看清成长之路',
        cardCount: 3,
        positions: [
          { index: 0, name: '成长起点', description: '塑造你内在的根源力量' },
          { index: 1, name: '当下状态', description: '你目前的内在状态' },
          { index: 2, name: '蜕变方向', description: '成长未来的可能走向' },
        ],
      },
      {
        id: 'growth-five',
        name: '成长全景',
        description: '全面解析成长的各个维度',
        cardCount: 5,
        positions: [
          { index: 0, name: '内在现状', description: '你当前的内在状态' },
          { index: 1, name: '成长障碍', description: '阻碍你成长的内在模式' },
          { index: 2, name: '隐藏天赋', description: '你尚未发掘的内在力量' },
          { index: 3, name: '成长建议', description: '塔罗牌给出的成长指引' },
          { index: 4, name: '蜕变结果', description: '成长最终可能的蜕变' },
        ],
      },
    ],
  },
  {
    id: 'decision',
    name: '决策指引',
    description: '1/3/5张牌阵，深度解读命运密码',
    icon: 'decision',
    color: 'purple',
    route: '/spread',
  },
  {
    id: 'career',
    name: '事业发展',
    description: '洞察职场方向，把握事业机遇',
    icon: 'career',
    color: 'emerald',
    route: '/theme/career',
    spreads: [
      {
        id: 'career-single',
        name: '事业指引',
        description: '一张牌，揭示你事业中的核心讯息',
        cardCount: 1,
        positions: [
          { index: 0, name: '事业指引', description: '职业发展中的核心启示' },
        ],
      },
      {
        id: 'career-three',
        name: '事业脉络',
        description: '过去-现在-未来，看清职业发展线',
        cardCount: 3,
        positions: [
          { index: 0, name: '职业过往', description: '塑造你职业道路的过去经历' },
          { index: 1, name: '当前处境', description: '你在职场中的现状' },
          { index: 2, name: '发展方向', description: '事业未来的可能走向' },
        ],
      },
      {
        id: 'career-five',
        name: '事业全景',
        description: '全面解析事业的各个维度',
        cardCount: 5,
        positions: [
          { index: 0, name: '事业现状', description: '当前职业的真实状态' },
          { index: 1, name: '职场挑战', description: '阻碍你前进的因素' },
          { index: 2, name: '潜在机遇', description: '你可能忽略的机会' },
          { index: 3, name: '行动建议', description: '塔罗牌给出的职业建议' },
          { index: 4, name: '事业前景', description: '事业最终可能的走向' },
        ],
      },
    ],
  },
  {
    id: 'personality',
    name: '性格测试',
    description: '探索你的塔罗人格原型与元素属性',
    icon: 'personality',
    color: 'blue',
    route: '/personality',
  },
]

export default SPREADS
