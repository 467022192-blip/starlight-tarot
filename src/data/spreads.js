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
