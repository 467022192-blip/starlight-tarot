import { motion } from 'framer-motion'

export default function ReadingCard({ reading, index }) {
  return (
    <motion.div
      className="p-4 sm:p-5 rounded-xl glass-card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyber-accent/10 flex items-center justify-center border border-cyber-accent/15">
          <span className="text-cyber-accent text-xs font-bold font-display">{reading.position}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="text-cyber-accent font-bold font-display">{reading.card.name}</h4>
            <span className="text-cyber-text-muted text-xs">{reading.card.nameEn}</span>
            {reading.isReversed ? (
              <span className="px-2 py-0.5 bg-cyber-rose/10 text-cyber-rose text-xs rounded-full border border-cyber-rose/25">
                逆位
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-cyber-accent/8 text-cyber-accent text-xs rounded-full border border-cyber-accent/15">
                正位
              </span>
            )}
          </div>
          <p className="text-cyber-text-muted text-xs mb-3">{reading.positionDesc}</p>
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-cyber-bg/40 border border-cyber-border/20">
              <span className="text-cyber-accent/80 text-xs font-bold block mb-1">关键词</span>
              <p className="text-cyber-text">{reading.meaning}</p>
            </div>
            <div className="p-3 rounded-lg bg-cyber-bg/40 border border-cyber-border/20">
              <span className="text-cyber-accent/80 text-xs font-bold block mb-1">深度解读</span>
              <p className="text-cyber-text leading-relaxed">{reading.deepReading || reading.description}</p>
            </div>
            <div className="p-3 rounded-lg bg-cyber-accent-warm/5 border border-cyber-accent-warm/12">
              <span className="text-cyber-accent-warm/80 text-xs font-bold block mb-1">塔罗建议</span>
              <p className="text-cyber-text leading-relaxed">{reading.advice}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
