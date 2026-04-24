import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TarotCard from '../components/card/TarotCard'
import useTarotDraw from '../hooks/useTarotDraw'
import { generateReading } from '../utils/interpretation'
import SPREADS from '../data/spreads'

export default function DailyPage() {
  const { drawnCards, isDrawing, draw, reset } = useTarotDraw()
  const [hasDrawn, setHasDrawn] = useState(false)

  const handleDraw = () => {
    draw(1)
    setHasDrawn(true)
  }

  const handleReset = () => {
    reset()
    setHasDrawn(false)
  }

  const card = drawnCards[0]

  const reading = useMemo(() => {
    if (!card) return null
    const readings = generateReading([card], SPREADS[0])
    return readings[0]
  }, [card])

  if (hasDrawn && !card) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold font-display text-cyber-text text-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        每日运势
      </motion.h1>
      <motion.p
        className="text-cyber-text-muted text-sm text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        每天一张牌，获取来自宇宙的指引
      </motion.p>

      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!hasDrawn ? (
            <motion.div
              key="draw"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-8">
                <motion.div
                  className="inline-block"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-32 h-52 sm:w-40 sm:h-60 rounded-xl border border-cyber-purple/30 bg-cyber-card/50 flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)`,
                    }}
                  >
                    <span className="text-cyber-accent/30 text-4xl sm:text-5xl">✦</span>
                  </div>
                </motion.div>
              </div>
              <p className="text-cyber-text-muted mb-6 text-sm">静心凝神，抽取今日指引之牌</p>
              <button
                onClick={handleDraw}
                disabled={isDrawing}
                className="px-8 py-3 bg-cyber-accent-warm/10 border border-cyber-accent-warm/40 text-cyber-accent-warm rounded-xl hover:bg-cyber-accent-warm/20 hover:border-cyber-accent-warm/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300 text-base disabled:opacity-50 cursor-pointer"
              >
                抽取今日牌
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="flex flex-col items-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <TarotCard card={card} isReversed={card.isReversed} size="lg" delay={0.2} autoFlip flipDelay={0.6} />

              {reading && (
                <motion.div
                  className="mt-8 p-5 sm:p-6 rounded-2xl glass-card w-full max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="text-center mb-4">
                    <h2 className="text-cyber-accent text-xl font-bold font-display">{card.name}</h2>
                    <p className="text-cyber-text-muted text-sm">{card.nameEn}</p>
                    {card.isReversed ? (
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-cyber-rose/10 text-cyber-rose text-xs rounded-full border border-cyber-rose/25">
                        逆位
                      </span>
                    ) : (
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-cyber-accent/10 text-cyber-accent text-xs rounded-full border border-cyber-accent/20">
                        正位
                      </span>
                    )}
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-cyber-bg/50 border border-cyber-border/30">
                      <span className="text-cyber-accent text-xs font-bold block mb-1">关键词</span>
                      <p className="text-cyber-text">{reading.meaning}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyber-bg/50 border border-cyber-border/30">
                      <span className="text-cyber-accent text-xs font-bold block mb-1">深度解读</span>
                      <p className="text-cyber-text leading-relaxed">{reading.deepReading}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyber-accent-warm/5 border border-cyber-accent-warm/15">
                      <span className="text-cyber-accent-warm text-xs font-bold block mb-1">今日建议</span>
                      <p className="text-cyber-text leading-relaxed">{reading.advice}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 border border-cyber-border text-cyber-text-muted rounded-xl hover:border-cyber-accent/40 hover:text-cyber-accent transition-all duration-300 text-sm cursor-pointer"
              >
                重新抽取
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
