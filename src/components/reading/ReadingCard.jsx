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
            <span className="text-mystic-text-muted text-xs">{reading.card.nameEn}</span>
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
          <p className="text-mystic-text-muted text-xs mb-3">{reading.positionDesc}</p>
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-mystic-bg/40">
              <span className="text-mystic-gold/80 text-xs font-bold block mb-1">关键词</span>
              <p className="text-mystic-text">{reading.meaning}</p>
            </div>
            <div className="p-3 rounded-lg bg-mystic-bg/40">
              <span className="text-mystic-gold/80 text-xs font-bold block mb-1">深度解读</span>
              <p className="text-mystic-text leading-relaxed">{reading.deepReading || reading.description}</p>
            </div>
            <div className="p-3 rounded-lg bg-mystic-gold/5 border border-mystic-gold/10">
              <span className="text-mystic-gold/80 text-xs font-bold block mb-1">塔罗建议</span>
              <p className="text-mystic-text leading-relaxed">{reading.advice}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
