import { motion } from 'framer-motion'
import majorArcana from '../../data/majorArcana'

const ELEMENT_ICONS = {
  fire: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-orange-400">
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
    </svg>
  ),
  water: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-cyber-accent">
      <path fillRule="evenodd" d="M12 2.25c0 0-6.75 8.25-6.75 12a6.75 6.75 0 0013.5 0C18.75 10.5 12 2.25 12 2.25z" clipRule="evenodd" />
    </svg>
  ),
  air: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-cyber-purple-light">
      <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  earth: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-400">
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.963 1.963 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634z" />
    </svg>
  ),
}

const TRAIT_LABELS = {
  fire: { label: '火', color: 'bg-orange-400' },
  water: { label: '水', color: 'bg-cyber-accent' },
  air: { label: '风', color: 'bg-cyber-purple-light' },
  earth: { label: '土', color: 'bg-emerald-400' },
}

export default function ResultProfile({ result }) {
  const { type, traits, dominant } = result
  const suggestedCard = majorArcana[type.cardSuggestion]
  const maxTrait = Math.max(...Object.values(traits))

  return (
    <motion.div
      className="max-w-lg mx-auto space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center p-6 sm:p-8 rounded-2xl glass-card">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyber-accent/10 flex items-center justify-center border border-cyber-accent/15">
          {ELEMENT_ICONS[dominant]}
        </div>
        <h2 className="text-cyber-accent text-2xl font-bold font-display mb-1">{type.name}</h2>
        <p className="text-cyber-text-muted text-sm mb-4">元素：{type.element} · 对应花色：{type.suit}</p>
        <p className="text-cyber-text leading-relaxed">{type.description}</p>
      </div>

      <div className="p-5 rounded-2xl glass-card">
        <h3 className="text-cyber-accent font-bold font-display mb-4 text-sm">元素分布</h3>
        <div className="space-y-3">
          {Object.entries(traits).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-14 flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${TRAIT_LABELS[key].color}`} />
                <span className="text-sm text-cyber-text">{TRAIT_LABELS[key].label}</span>
              </div>
              <div className="flex-1 h-2.5 bg-cyber-bg/60 rounded-full overflow-hidden border border-cyber-border/20">
                <motion.div
                  className={`h-full rounded-full ${key === dominant ? 'bg-cyber-accent' : 'bg-cyber-purple/40'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / maxTrait) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                />
              </div>
              <span className="text-cyber-text-muted text-xs w-8 text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl glass-card">
          <h3 className="text-cyber-accent font-bold font-display mb-2 text-sm">优势</h3>
          <p className="text-cyber-text text-sm leading-relaxed">{type.strengths}</p>
        </div>
        <div className="p-4 rounded-xl glass-card">
          <h3 className="text-cyber-rose font-bold font-display mb-2 text-sm">挑战</h3>
          <p className="text-cyber-text text-sm leading-relaxed">{type.challenges}</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-cyber-purple/5 border border-cyber-purple/15 text-center glow-border-accent">
        <p className="text-cyber-text-muted text-xs mb-1">你的守护牌</p>
        <h3 className="text-cyber-accent text-lg font-bold font-display">{suggestedCard.name}</h3>
        <p className="text-cyber-text-muted text-xs mb-2">{suggestedCard.nameEn}</p>
        <p className="text-cyber-text text-sm">{suggestedCard.upright}</p>
      </div>
    </motion.div>
  )
}
