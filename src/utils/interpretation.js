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
      advice: card.advice,
      isReversed,
    }
  })
}

export function generateSummary(readings) {
  const keywords = readings.map((r) => r.meaning.split('、')[0])
  return `本次占卜的核心主题围绕${keywords.join('、')}展开。`
}

export async function generateAIReading() {
  throw new Error('AI 解读功能尚未接入，请使用预设解读。')
}
