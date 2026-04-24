import { motion } from 'framer-motion'
import majorArcana from '../../data/majorArcana'

export default function ResultProfile({ result }) {
  const { type, traits, dominant } = result
  const suggestedCard = majorArcana[type.cardSuggestion]

  const traitLabels = {
    fire: { label: '🔥 火', color: 'bg-orange-500' },
    water: { label: '💧 水', color: 'bg-blue-500' },
    air: { label: '💨 风', color: 'bg-cyan-400' },
    earth: { label: '🌍 土', color: 'bg-green-600' },
  }

  const maxTrait = Math.max(...Object.values(traits))

  return (
    <motion.div
      className="max-w-lg mx-auto space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center p-6 sm:p-8 rounded-2xl bg-mystic-surface/80 border border-mystic-gold/30 backdrop-blur-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mystic-gold/10 flex items-center justify-center border border-mystic-gold/20">
          <span className="text-2xl">
            {dominant === 'fire' ? '🔥' : dominant === 'water' ? '💧' : dominant === 'air' ? '💨' : '🌍'}
          </span>
        </div>
        <h2 className="text-mystic-gold text-2xl font-bold font-display mb-1">{type.name}</h2>
        <p className="text-mystic-text-muted text-sm mb-4">元素：{type.element} · 对应花色：{type.suit}</p>
        <p className="text-mystic-text leading-relaxed">{type.description}</p>
      </div>

      <div className="p-5 rounded-2xl bg-mystic-surface/70 border border-mystic-border/50 backdrop-blur-sm">
        <h3 className="text-mystic-gold font-bold font-display mb-4 text-sm">元素分布</h3>
        <div className="space-y-3">
          {Object.entries(traits).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-sm w-14 flex-shrink-0">{traitLabels[key].label}</span>
              <div className="flex-1 h-3 bg-mystic-bg/60 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${key === dominant ? 'bg-mystic-gold' : 'bg-mystic-purple/50'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / maxTrait) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </div>
              <span className="text-mystic-text-muted text-xs w-8 text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-mystic-surface/70 border border-mystic-border/50">
          <h3 className="text-mystic-gold font-bold font-display mb-2 text-sm">✦ 优势</h3>
          <p className="text-mystic-text text-sm leading-relaxed">{type.strengths}</p>
        </div>
        <div className="p-4 rounded-xl bg-mystic-surface/70 border border-mystic-border/50">
          <h3 className="text-mystic-gold font-bold font-display mb-2 text-sm">✦ 挑战</h3>
          <p className="text-mystic-text text-sm leading-relaxed">{type.challenges}</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-mystic-gold/5 border border-mystic-gold/20 text-center">
        <p className="text-mystic-text-muted text-xs mb-1">你的守护牌</p>
        <h3 className="text-mystic-gold text-lg font-bold font-display">{suggestedCard.name}</h3>
        <p className="text-mystic-text-muted text-xs mb-2">{suggestedCard.nameEn}</p>
        <p className="text-mystic-text text-sm">{suggestedCard.upright}</p>
      </div>
    </motion.div>
  )
}
