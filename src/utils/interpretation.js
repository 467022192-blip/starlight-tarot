const POSITION_INSIGHTS = {
  '指引': '这张牌为你揭示了当下的核心指引',
  '过去': '过去的经历如河流般塑造了此刻的你',
  '现在': '此刻你正站在命运的十字路口',
  '未来': '未来的走向取决于你此刻的选择',
  '现状': '这是你当前处境的真实映射',
  '挑战': '你正面对的考验，也是成长的契机',
  '建议': '来自塔罗的智慧，为你指明方向',
  '趋势': '事态正在沿着这条轨迹发展',
  '结果': '如果顺应当前能量，这可能的结果',
  '爱情指引': '这是你感情世界此刻最需要聆听的声音',
  '你的内心': '你心底最真实的情感渴望',
  '对方的心': '对方内心深处的想法与感受',
  '关系走向': '这段关系正在朝着的方向',
  '感情现状': '你们之间此刻真实的情感状态',
  '情感障碍': '横亘在你们之间的那道隐形的墙',
  '你的需求': '你灵魂深处对爱的真正渴望',
  '对方需求': '对方未曾说出口的期待',
  '爱情未来': '如果顺应当前心流，感情将走向何方',
  '事业指引': '这是你职业道路上此刻最关键的启示',
  '职业过往': '那些塑造了你职业观的经历',
  '当前处境': '你在职场中此刻的真实位置',
  '发展方向': '你的职业之舟正在驶向的方向',
  '事业现状': '你当前职业状态的全貌',
  '职场挑战': '横在你前进道路上的考验',
  '潜在机遇': '你可能尚未察觉的转机',
  '行动建议': '塔罗牌为你指明的行动方向',
  '事业前景': '你的职业蓝图可能呈现的模样',
  '成长指引': '这是你内在成长此刻最需要的讯息',
  '成长起点': '塑造你内在力量的根源',
  '当下状态': '你此刻灵魂的真实状态',
  '蜕变方向': '你内在正在朝向的转变',
  '内在现状': '你内心世界的此刻风景',
  '成长障碍': '那个反复出现的内在模式',
  '隐藏天赋': '你尚未觉察的内在宝藏',
  '成长建议': '来自塔罗的成长智慧',
  '蜕变结果': '如果你勇敢蜕变，可能迎来的自己',
}

const ELEMENT_THEMES = {
  '权杖': { element: '火', theme: '行动与激情', advice: '勇敢迈出步伐，用热情点燃前路' },
  '圣杯': { element: '水', theme: '情感与直觉', advice: '倾听内心的声音，让情感引导你' },
  '宝剑': { element: '风', theme: '思维与真相', advice: '用清晰的头脑审视局势，做出理性判断' },
  '星币': { element: '土', theme: '物质与现实', advice: '脚踏实地，在现实层面稳步推进' },
}

const ELEMENT_NARRATIVE = {
  single: {
    '火': '你的牌面燃烧着行动的火焰，此刻需要的是果断与勇气',
    '水': '你的牌面流淌着情感的暗流，此刻需要的是倾听与感受',
    '风': '你的牌面闪烁着思维的光芒，此刻需要的是清明与洞察',
    '土': '你的牌面沉淀着现实的力量，此刻需要的是踏实与耐心',
  },
  dominant: {
    '火': '火元素占据主导，说明行动力与热情是你当前最突出的能量——你正被一股强烈的驱动力推着向前',
    '水': '水元素占据主导，说明情感与直觉是你当前最活跃的能量——你的内心世界正在经历深刻的涌动',
    '风': '风元素占据主导，说明思维与沟通是你当前最活跃的能量——你的头脑正在高速运转，寻求答案',
    '土': '土元素占据主导，说明物质与现实是你当前最活跃的能量——你正脚踏实地地面对生活中的实际课题',
  },
  pair: {
    '火水': '火与水的交织意味着行动与情感之间的张力——你既渴望勇敢前行，又在内心深处有着柔软的牵挂',
    '火风': '火与风的组合意味着行动与思维的共振——你的想法正在转化为行动，灵感与执行力兼备',
    '火土': '火与土的碰撞意味着激情与现实的交锋——你需要在理想与实际之间找到平衡点',
    '水风': '水与风的交融意味着情感与思维的对话——你正在用理性审视自己的感受，或用直觉理解复杂局势',
    '水土': '水与土的融合意味着情感与现实的交织——你需要在内心渴望与外部条件之间寻求和解',
    '风土': '风与土的并存意味着思维与现实的碰撞——你的想法需要落地，你的计划需要被执行',
  },
  diverse: '多种元素的分布说明你正处于一个多维交织的时期——生活的不同层面同时在向你发出讯号，需要你全面地审视与回应',
  allSame: '牌面元素高度集中，这意味着当前局势有着非常明确的主题和方向——能量正在聚焦',
}

const REVERSED_NARRATIVE = {
  single: '逆位的出现并非凶兆，而是提醒你：这张牌的能量正在向内转化，外在的表现可能与正位时不同，但内在的成长同样深刻',
  few: '逆位牌的出现暗示着某些能量正在经历内在的转化——它们并非消失，而是在更深层面酝酿和重组',
  many: '多张逆位牌提示你，当前有相当多的能量处于内在化的状态——外在的平静之下，内心正在经历深层的调整与反思',
}

const MAJOR_ARCANA_PRESENCE = {
  all: '全部为大阿尔卡那牌，这意味着你正处于人生中一个重要的转折点——宇宙正在以强烈的方式向你传递讯息',
  most: '大阿尔卡那牌占多数，说明当前的事态具有深远的意义——这不仅仅是一个日常的波动，而是关乎人生方向的重要时期',
  some: '大阿尔卡那牌的出现，为本次占卜注入了命运的力量——某些超越日常的深层力量正在发挥作用',
}

function getPositionInsight(positionName) {
  return POSITION_INSIGHTS[positionName] || '这张牌揭示了重要的信息'
}

function getCardDepthReading(card, isReversed, positionName) {
  const parts = []

  const suit = card.suit
  const elementInfo = ELEMENT_THEMES[suit]

  if (elementInfo) {
    parts.push(`这张牌属于${elementInfo.element}元素（${suit}系列），象征着${elementInfo.theme}的力量。`)
  }

  if (isReversed) {
    parts.push(`逆位的${card.name}暗示着能量受阻或内在化。正位时的${card.upright.split('、')[0]}特质可能被压抑，或者以不健康的方式表达。`)
    parts.push(`这并非凶兆，而是提醒你：${card.reversed.split('、').slice(0, 2).join('与')}的倾向需要被觉察和转化。`)
  } else {
    parts.push(`正位的${card.name}展现出纯粹而充沛的能量。${card.upright}的特质正在你的生命中活跃。`)
  }

  if (positionName) {
    const insight = getPositionInsight(positionName)
    parts.push(`在「${positionName}」的位置上，${insight}。${card.advice}`)
  }

  return parts.join('')
}

function analyzeElements(readings) {
  const elements = []
  const majorCount = readings.filter(r => !r.card.suit).length
  readings.forEach(r => {
    if (r.card.suit) {
      const el = ELEMENT_THEMES[r.card.suit]?.element
      if (el) elements.push(el)
    }
  })
  const unique = [...new Set(elements)]
  const counts = {}
  elements.forEach(e => { counts[e] = (counts[e] || 0) + 1 })
  const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return { elements, unique, counts, dominant, majorCount, totalWithSuit: elements.length }
}

function analyzeReversed(readings) {
  const reversed = readings.filter(r => r.isReversed)
  const upright = readings.filter(r => !r.isReversed)
  return {
    reversedCount: reversed.length,
    uprightCount: upright.length,
    reversedCards: reversed,
    uprightCards: upright,
    ratio: reversed.length / readings.length,
  }
}

function buildElementNarrative(analysis) {
  if (analysis.totalWithSuit === 0) return ''
  const { unique, dominant } = analysis

  if (unique.length === 1) {
    return ELEMENT_NARRATIVE.allSame + ELEMENT_NARRATIVE.dominant[unique[0]]
  }
  if (unique.length === 2 && dominant.length === 2) {
    const pair = unique.sort().join('')
    return ELEMENT_NARRATIVE.pair[pair] || ELEMENT_NARRATIVE.diverse
  }
  if (unique.length >= 3) {
    return ELEMENT_NARRATIVE.diverse
  }
  if (dominant.length > 0 && dominant[0][1] > 1) {
    return ELEMENT_NARRATIVE.dominant[dominant[0][0]]
  }
  return ''
}

function buildReversedNarrative(reversedAnalysis) {
  const { reversedCount, ratio } = reversedAnalysis
  if (reversedCount === 0) return ''
  if (ratio <= 0.3) return REVERSED_NARRATIVE.few
  if (ratio >= 0.6) return REVERSED_NARRATIVE.many
  return REVERSED_NARRATIVE.few
}

function buildMajorArcanaNarrative(analysis, total) {
  if (analysis.majorCount === 0) return ''
  const ratio = analysis.majorCount / total
  if (ratio === 1) return MAJOR_ARCANA_PRESENCE.all
  if (ratio >= 0.5) return MAJOR_ARCANA_PRESENCE.most
  return MAJOR_ARCANA_PRESENCE.some
}

function synthesizeAdvice(readings) {
  const advices = readings.map(r => r.advice).filter(Boolean)
  if (advices.length === 0) return '保持觉知，顺应内心的指引'
  if (advices.length === 1) return advices[0]

  const coreAdvice = advices[advices.length - 1]
  const supportingAdvice = advices.slice(0, -1).map(a => a.replace(/[。，]+$/, '')).join('，')

  if (readings.length <= 3) {
    return `${supportingAdvice}——而最关键的提醒是：${coreAdvice}`
  }
  return `综合牌面的指引：${supportingAdvice}。最终，塔罗牌想对你说的核心是——${coreAdvice}`
}

function buildFlowNarrative(readings) {
  if (readings.length < 2) return ''

  const first = readings[0]
  const last = readings[readings.length - 1]
  const firstKeyword = first.meaning.split('、')[0]
  const lastKeyword = last.meaning.split('、')[0]

  const isProgressive = !first.isReversed && !last.isReversed
  const isTransforming = first.isReversed !== last.isReversed
  const isIntrospective = first.isReversed && last.isReversed

  if (readings.length === 2) {
    if (isProgressive) {
      return `从「${first.card.name}」的${firstKeyword}到「${last.card.name}」的${lastKeyword}，能量在流动中逐渐明朗——你正在一条清晰的道路上前行`
    }
    if (isTransforming) {
      return `从「${first.card.name}」到「${last.card.name}」，能量的性质发生了转变——这说明你正在经历一个重要的内在转折`
    }
    return `从「${first.card.name}」到「${last.card.name}」，两股内向化的能量相互映照——外在的沉寂之下，内在的蜕变正在悄然发生`
  }

  const middle = readings[Math.floor(readings.length / 2)]
  const middleKeyword = middle.meaning.split('、')[0]

  if (isProgressive && !middle.isReversed) {
    return `从「${first.card.name}」的${firstKeyword}，经由「${middle.card.name}」的${middleKeyword}，到「${last.card.name}」的${lastKeyword}——能量在流转中不断升华，这是一段充满力量的旅程`
  }
  if (isIntrospective) {
    return `从「${first.card.name}」到「${last.card.name}」，牌面呈现出深层的内向反思——这不是停滞，而是蜕变前的必要沉淀，「${middle.card.name}」的${middleKeyword}正是这个转化过程中的关键节点`
  }
  return `从「${first.card.name}」的${firstKeyword}，到「${middle.card.name}」的${middleKeyword}，再到「${last.card.name}」的${lastKeyword}——能量的流转揭示了一条从${first.isReversed ? '内在探索' : '外在展开'}到${last.isReversed ? '深层转化' : '清晰方向'}的路径`
}

function buildPositionSynthesis(readings) {
  const parts = []
  readings.forEach((r, i) => {
    const keyword = r.meaning.split('、')[0]
    const direction = r.isReversed ? '内在的' : '外在的'
    if (i === 0) {
      parts.push(`「${r.position}」位置的「${r.card.name}」带来了${direction}${keyword}能量`)
    } else {
      parts.push(`「${r.position}」位置的「${r.card.name}」则以${direction}${keyword}的能量${i === readings.length - 1 ? '为整副牌面画上了句点' : '进一步丰富了画面的层次'}`)
    }
  })
  return parts.join('，')
}

export function generateReading(cards, spread) {
  return cards.map((card, index) => {
    const position = spread.positions[index]
    const isReversed = card.isReversed
    return {
      position: position.name,
      positionDesc: position.description,
      card,
      meaning: isReversed ? card.reversed : card.upright,
      description: card.description,
      deepReading: getCardDepthReading(card, isReversed, position.name),
      advice: card.advice,
      isReversed,
    }
  })
}

export function generateSummary(readings) {
  if (readings.length === 1) {
    const r = readings[0]
    const elementInfo = r.card.suit ? ELEMENT_THEMES[r.card.suit] : null
    const direction = r.isReversed ? '内在的转化与反思' : '外在的展开与行动'
    const elementNote = elementInfo
      ? `，${elementInfo.element}元素的${elementInfo.theme}能量正在你的生命中涌动`
      : ''

    let narrative = `本次占卜抽取了「${r.card.name}」，核心能量指向${direction}${elementNote}。`
    if (r.isReversed) {
      narrative += `${r.card.name}以逆位出现，意味着它的能量正在向内转化——${r.meaning.split('、').slice(0, 2).join('、')}的倾向值得你深入觉察。`
    } else {
      narrative += `正位的${r.card.name}展现出清晰而充沛的能量——${r.meaning}的特质正在你的生命中活跃。`
    }
    narrative += `在「${r.position}」的位置上，${getPositionInsight(r.position)}。${r.advice}请静心感受这张牌传递给你的能量。`
    return narrative
  }

  if (readings.length === 2) {
    const elementAnalysis = analyzeElements(readings)
    const reversedAnalysis = analyzeReversed(readings)
    const flowNarrative = buildFlowNarrative(readings)
    const elementNarrative = buildElementNarrative(elementAnalysis)
    const reversedNarrative = buildReversedNarrative(reversedAnalysis)
    const majorNarrative = buildMajorArcanaNarrative(elementAnalysis, readings.length)
    const advice = synthesizeAdvice(readings)

    let narrative = `本次占卜的牌面由「${readings.map(r => r.card.name).join('」与「')}」组成。`
    narrative += flowNarrative + '。'
    if (majorNarrative) narrative += majorNarrative + '。'
    if (elementNarrative) narrative += elementNarrative + '。'
    if (reversedNarrative) narrative += reversedNarrative + '。'
    narrative += `综合来看，塔罗牌给你的提醒是：${advice}。`
    return narrative
  }

  const elementAnalysis = analyzeElements(readings)
  const reversedAnalysis = analyzeReversed(readings)
  const flowNarrative = buildFlowNarrative(readings)
  const elementNarrative = buildElementNarrative(elementAnalysis)
  const reversedNarrative = buildReversedNarrative(reversedAnalysis)
  const majorNarrative = buildMajorArcanaNarrative(elementAnalysis, readings.length)
  const advice = synthesizeAdvice(readings)

  const cardIntro = readings.length === 3
    ? `本次占卜的牌面由「${readings.map(r => r.card.name).join('」、「')}」三张牌构成`
    : `本次占卜的牌面由「${readings.map(r => r.card.name).join('」、「')}」五张牌构成`

  let narrative = cardIntro + '。'

  narrative += flowNarrative + '。'

  if (majorNarrative) narrative += majorNarrative + '。'

  if (elementNarrative) narrative += elementNarrative + '。'

  if (reversedNarrative) narrative += reversedNarrative + '。'

  const positionSynthesis = buildPositionSynthesis(readings)
  narrative += positionSynthesis + '。'

  narrative += `综合整副牌面的讯息，塔罗牌给你的核心提醒是：${advice}。`

  return narrative
}

export async function generateAIReading() {
  throw new Error('AI 解读功能尚未接入，请使用预设解读。')
}
