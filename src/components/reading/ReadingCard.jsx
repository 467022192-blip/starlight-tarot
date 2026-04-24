import { motion } from 'framer-motion'

export default function ReadingCard({ reading, index }) {
  return (
    <motion.div
      className="p-4 sm:p-5 rounded-xl bg-mystic-surface/70 border border-mystic-border/50 backdrop-blur-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-mystic-gold/10 flex items-center justify-center border border-mystic-gold/20">
          <span className="text-mystic-gold text-xs font-bold font-display">{reading.position}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="text-mystic-gold font-bold font-display">{reading.card.name}</h4>
            {reading.isReversed ? (
              <span className="px-2 py-0.5 bg-mystic-purple/20 text-mystic-purple text-xs rounded-full border border-mystic-purple/30">
                逆位
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-mystic-gold/10 text-mystic-gold text-xs rounded-full border border-mystic-gold/20">
                正位
              </span>
            )}
          </div>
          <p className="text-mystic-text-muted text-xs mb-2">{reading.positionDesc}</p>
          <div className="space-y-1.5 text-sm">
            <p className="text-mystic-text">
              <span className="text-mystic-gold/80 text-xs font-bold">关键词：</span>{reading.meaning}
            </p>
            <p className="text-mystic-text">
              <span className="text-mystic-gold/80 text-xs font-bold">解读：</span>{reading.description}
            </p>
            <p className="text-mystic-text">
              <span className="text-mystic-gold/80 text-xs font-bold">建议：</span>{reading.advice}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
