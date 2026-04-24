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
}

const ELEMENT_THEMES = {
  '权杖': { element: '火', theme: '行动与激情', advice: '勇敢迈出步伐，用热情点燃前路' },
  '圣杯': { element: '水', theme: '情感与直觉', advice: '倾听内心的声音，让情感引导你' },
  '宝剑': { element: '风', theme: '思维与真相', advice: '用清晰的头脑审视局势，做出理性判断' },
  '星币': { element: '土', theme: '物质与现实', advice: '脚踏实地，在现实层面稳步推进' },
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
    const direction = r.isReversed ? '内在的转化与反思' : '外在的展开与行动'
    return `本次占卜抽取了「${r.card.name}」，核心能量指向${direction}。${r.card.name}带来的讯息是：${r.meaning}。${r.card.advice}请静心感受这张牌传递给你的能量。`
  }

  const cardNames = readings.map((r) => `${r.card.name}（${r.position}）`)
  const keywords = readings.map((r) => r.meaning.split('、')[0])

  const hasReversed = readings.some((r) => r.isReversed)
  const reversedNote = hasReversed
    ? `值得注意的是，${readings.filter((r) => r.isReversed).map((r) => `「${r.card.name}」以逆位出现`).join('，')}，暗示着某些能量正在经历内在的转化或挑战。`
    : ''

  const elements = readings.map((r) => {
    const suit = r.card.suit
    return ELEMENT_THEMES[suit]?.element
  }).filter(Boolean)
  const uniqueElements = [...new Set(elements)]
  const elementNote = uniqueElements.length > 0
    ? `本次占卜的元素分布以${uniqueElements.join('、')}为主，`
    : ''

  return `本次占卜的牌面为${cardNames.join('、')}，核心主题围绕${keywords.join('与')}展开。${elementNote}揭示了当前局势的多维面向。${reversedNote}综合来看，塔罗牌提醒你：${readings[readings.length - 1]?.advice || '保持觉知，顺应内心的指引'}。`
}

export async function generateAIReading() {
  throw new Error('AI 解读功能尚未接入，请使用预设解读。')
}
