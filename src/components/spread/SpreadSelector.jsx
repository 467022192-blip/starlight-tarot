import { motion } from 'framer-motion'
import SPREADS from '../../data/spreads'

export default function SpreadSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SPREADS.map((spread, index) => (
        <motion.button
          key={spread.id}
          onClick={() => onSelect(spread)}
          className={`p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 ${
            selected?.id === spread.id
              ? 'border-mystic-gold/60 bg-mystic-gold/10 shadow-lg shadow-mystic-gold/5'
              : 'border-mystic-border/60 bg-mystic-surface/60 hover:border-mystic-gold/30 hover:bg-mystic-surface'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-mystic-gold text-lg">
              {spread.cardCount === 1 ? '☀️' : spread.cardCount === 3 ? '🔮' : '⭐'}
            </span>
            <h3 className={`text-base font-bold font-display ${selected?.id === spread.id ? 'text-mystic-gold' : 'text-mystic-text'}`}>
              {spread.name}
            </h3>
          </div>
          <p className="text-mystic-text-muted text-sm mb-2">{spread.description}</p>
          <div className="flex gap-1">
            {Array.from({ length: spread.cardCount }).map((_, i) => (
              <div key={i} className={`w-5 h-7 rounded border ${selected?.id === spread.id ? 'border-mystic-gold/50 bg-mystic-gold/10' : 'border-mystic-border/40 bg-mystic-card/50'}`} />
            ))}
          </div>
        </motion.button>
      ))}
    </div>
  )
}
