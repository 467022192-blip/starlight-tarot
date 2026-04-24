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
