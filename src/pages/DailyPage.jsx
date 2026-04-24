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
        className="text-2xl sm:text-3xl font-bold font-display text-mystic-gold text-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        每日运势
      </motion.h1>
      <motion.p
        className="text-mystic-text-muted text-sm text-center mb-8"
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
                  <div className="w-32 h-52 sm:w-40 sm:h-60 rounded-xl border-2 border-mystic-gold/20 bg-mystic-card/50 flex items-center justify-center"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)`,
                    }}
                  >
                    <span className="text-mystic-gold/30 text-4xl sm:text-5xl">✦</span>
                  </div>
                </motion.div>
              </div>
              <p className="text-mystic-text-muted mb-6 text-sm">静心凝神，抽取今日指引之牌</p>
              <button
                onClick={handleDraw}
                disabled={isDrawing}
                className="px-8 py-3 bg-mystic-gold/15 border border-mystic-gold/50 text-mystic-gold rounded-xl hover:bg-mystic-gold/25 hover:border-mystic-gold transition-all duration-300 text-base disabled:opacity-50 shadow-lg shadow-mystic-gold/5 cursor-pointer"
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
                  className="mt-8 p-5 sm:p-6 rounded-2xl bg-mystic-surface/80 border border-mystic-border/60 w-full max-w-md backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="text-center mb-4">
                    <h2 className="text-mystic-gold text-xl font-bold font-display">{card.name}</h2>
                    <p className="text-mystic-text-muted text-sm">{card.nameEn}</p>
                    {card.isReversed ? (
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-mystic-purple/20 text-mystic-purple text-xs rounded-full border border-mystic-purple/30">
                        逆位
                      </span>
                    ) : (
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-mystic-gold/10 text-mystic-gold text-xs rounded-full border border-mystic-gold/20">
                        正位
                      </span>
                    )}
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 rounded-lg bg-mystic-bg/50">
                      <span className="text-mystic-gold text-xs font-bold block mb-1">关键词</span>
                      <p className="text-mystic-text">{reading.meaning}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-mystic-bg/50">
                      <span className="text-mystic-gold text-xs font-bold block mb-1">深度解读</span>
                      <p className="text-mystic-text leading-relaxed">{reading.deepReading}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-mystic-gold/5 border border-mystic-gold/10">
                      <span className="text-mystic-gold text-xs font-bold block mb-1">今日建议</span>
                      <p className="text-mystic-text leading-relaxed">{reading.advice}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 border border-mystic-border/60 text-mystic-text-muted rounded-xl hover:border-mystic-gold/40 hover:text-mystic-gold transition-all duration-300 text-sm cursor-pointer"
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
