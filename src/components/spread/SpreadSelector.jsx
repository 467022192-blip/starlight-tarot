import { motion } from 'framer-motion'
import SPREADS from '../../data/spreads'

export default function SpreadSelector({ selected, onSelect, spreads }) {
  const displaySpreads = spreads || SPREADS

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {displaySpreads.map((spread, index) => (
        <motion.button
          key={spread.id}
          onClick={() => onSelect(spread)}
          className={`p-5 sm:p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
            selected?.id === spread.id
              ? 'border-cyber-accent/40 bg-cyber-accent/8 shadow-[0_0_12px_rgba(167,139,250,0.08)]'
              : 'border-cyber-border bg-cyber-surface/40 hover:border-cyber-accent/25 hover:bg-cyber-surface/60 backdrop-blur-sm'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${selected?.id === spread.id ? 'text-cyber-accent' : 'text-cyber-purple-light'}`}>
              <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
            <h3 className={`text-base font-bold font-display ${selected?.id === spread.id ? 'text-cyber-accent' : 'text-cyber-text'}`}>
              {spread.name}
            </h3>
          </div>
          <p className="text-cyber-text-muted text-sm mb-2">{spread.description}</p>
          <div className="flex gap-1">
            {Array.from({ length: spread.cardCount }).map((_, i) => (
              <div key={i} className={`w-5 h-7 rounded border ${selected?.id === spread.id ? 'border-cyber-accent/40 bg-cyber-accent/8' : 'border-cyber-border/40 bg-cyber-card/50'}`} />
            ))}
          </div>
        </motion.button>
      ))}
    </div>
  )
}
