import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpreadSelector from '../components/spread/SpreadSelector'
import SpreadLayout from '../components/spread/SpreadLayout'
import ReadingResult from '../components/reading/ReadingResult'
import useTarotDraw from '../hooks/useTarotDraw'
import { generateReading } from '../utils/interpretation'

const STEPS = { SELECT: 0, DRAW: 1, RESULT: 2 }

export default function SpreadPage() {
  const [step, setStep] = useState(STEPS.SELECT)
  const [selectedSpread, setSelectedSpread] = useState(null)
  const { drawnCards, isDrawing, draw, reset } = useTarotDraw()
  const [readings, setReadings] = useState([])

  const handleSelectSpread = (spread) => {
    setSelectedSpread(spread)
  }

  const handleDraw = () => {
    const cards = draw(selectedSpread.cardCount)
    setReadings(generateReading(cards, selectedSpread))
    setStep(STEPS.RESULT)
  }

  const handleReset = () => {
    reset()
    setSelectedSpread(null)
    setReadings([])
    setStep(STEPS.SELECT)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold font-display text-mystic-gold text-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        牌阵占卜
      </motion.h1>
      <motion.p
        className="text-mystic-text-muted text-sm text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        选择牌阵，开启你的占卜之旅
      </motion.p>

      <div className="flex items-center justify-center gap-2 mb-8">
        {[STEPS.SELECT, STEPS.DRAW, STEPS.RESULT].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
              step >= s ? 'border-mystic-gold/60 bg-mystic-gold/15 text-mystic-gold' : 'border-mystic-border/40 text-mystic-text-muted/50'
            }`}>
              {s + 1}
            </div>
            {s < STEPS.RESULT && (
              <div className={`w-8 sm:w-16 h-px transition-colors duration-300 ${
                step > s ? 'bg-mystic-gold/40' : 'bg-mystic-border/30'
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === STEPS.SELECT && (
          <motion.div key="select" exit={{ opacity: 0 }} className="space-y-6">
            <SpreadSelector selected={selectedSpread} onSelect={handleSelectSpread} />
            {selectedSpread && (
              <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <button
                  onClick={() => setStep(STEPS.DRAW)}
                  className="px-8 py-3 bg-mystic-gold/15 border border-mystic-gold/50 text-mystic-gold rounded-xl hover:bg-mystic-gold/25 hover:border-mystic-gold transition-all duration-300 shadow-lg shadow-mystic-gold/5"
                >
                  开始占卜 →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === STEPS.DRAW && (
          <motion.div key="draw" exit={{ opacity: 0 }} className="text-center space-y-8">
            <div className="py-8">
              <motion.div
                className="inline-flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Array.from({ length: selectedSpread.cardCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-20 h-32 sm:w-24 sm:h-40 rounded-xl border-2 border-mystic-gold/20 bg-mystic-card/50 flex items-center justify-center"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-mystic-gold/30 text-xl">✦</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <p className="text-mystic-text-muted text-sm">静心凝神，点击下方按钮抽取塔罗牌</p>
            <button
              onClick={handleDraw}
              disabled={isDrawing}
              className="px-8 py-3 bg-mystic-gold/15 border border-mystic-gold/50 text-mystic-gold rounded-xl hover:bg-mystic-gold/25 hover:border-mystic-gold transition-all duration-300 text-base disabled:opacity-50 shadow-lg shadow-mystic-gold/5"
            >
              抽牌
            </button>
          </motion.div>
        )}

        {step === STEPS.RESULT && (
          <motion.div key="result" exit={{ opacity: 0 }} className="space-y-8">
            <SpreadLayout cards={drawnCards} spread={selectedSpread} />
            <ReadingResult readings={readings} />
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 border border-mystic-border/60 text-mystic-text-muted rounded-xl hover:border-mystic-gold/40 hover:text-mystic-gold transition-all duration-300 text-sm"
              >
                重新占卜
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
