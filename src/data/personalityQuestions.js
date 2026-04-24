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
