import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SpreadSelector from '../components/spread/SpreadSelector'
import SpreadLayout from '../components/spread/SpreadLayout'
import ReadingResult from '../components/reading/ReadingResult'
import useTarotDraw from '../hooks/useTarotDraw'
import { generateReading } from '../utils/interpretation'
import { THEMES } from '../data/spreads'

const STEPS = { SELECT: 0, DRAW: 1, RESULT: 2 }

const THEME_ICONS = {
  love: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-cyber-rose">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  ),
  career: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-400">
      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.362-7.814-1.039A2.905 2.905 0 012.25 11.96V8.706c0-1.434 1.022-2.7 2.476-2.917A48.686 48.686 0 017.5 5.455V5.25z" clipRule="evenodd" />
    </svg>
  ),
  growth: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-cyan-400">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
  ),
}

const THEME_COLORS = {
  love: { border: 'hover:border-cyber-rose/40', iconBg: 'bg-cyber-rose/10', accent: 'text-cyber-rose' },
  career: { border: 'hover:border-emerald-400/40', iconBg: 'bg-emerald-500/10', accent: 'text-emerald-400' },
  growth: { border: 'hover:border-cyan-400/40', iconBg: 'bg-cyan-500/10', accent: 'text-cyan-400' },
}

export default function ThemePage() {
  const { themeId } = useParams()
  const theme = THEMES.find((t) => t.id === themeId)
  const [step, setStep] = useState(STEPS.SELECT)
  const [selectedSpread, setSelectedSpread] = useState(null)
  const { drawnCards, isDrawing, draw, reset } = useTarotDraw()
  const [readings, setReadings] = useState([])

  if (!theme || !theme.spreads) return null

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

  const colors = THEME_COLORS[themeId] || THEME_COLORS.love
  const icon = THEME_ICONS[themeId]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={`w-14 h-14 mx-auto mb-3 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold font-display mb-2 ${colors.accent}`}>{theme.name}</h1>
        <p className="text-cyber-text-muted text-sm">{theme.description}</p>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mb-8">
        {[STEPS.SELECT, STEPS.DRAW, STEPS.RESULT].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
              step >= s ? 'border-cyber-accent/50 bg-cyber-accent/10 text-cyber-accent' : 'border-cyber-border text-cyber-text-muted/50'
            }`}>
              {s + 1}
            </div>
            {s < STEPS.RESULT && (
              <div className={`w-8 sm:w-16 h-px transition-colors duration-300 ${
                step > s ? 'bg-cyber-accent/30' : 'bg-cyber-border/30'
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === STEPS.SELECT && (
          <motion.div key="select" exit={{ opacity: 0 }} className="space-y-6">
            <SpreadSelector selected={selectedSpread} onSelect={setSelectedSpread} spreads={theme.spreads} />
            {selectedSpread && (
              <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <button
                  onClick={() => setStep(STEPS.DRAW)}
                  className="px-8 py-3 bg-cyber-accent-warm/10 border border-cyber-accent-warm/40 text-cyber-accent-warm rounded-xl hover:bg-cyber-accent-warm/20 hover:border-cyber-accent-warm/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300 cursor-pointer"
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
              <motion.div className="inline-flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {Array.from({ length: selectedSpread.cardCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-20 h-32 sm:w-24 sm:h-40 rounded-xl border border-cyber-purple/30 bg-cyber-card/50 flex items-center justify-center backdrop-blur-sm"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-cyber-accent/25 text-xl">✦</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <p className="text-cyber-text-muted text-sm">静心凝神，点击下方按钮抽取塔罗牌</p>
            <button
              onClick={handleDraw}
              disabled={isDrawing}
              className="px-8 py-3 bg-cyber-accent-warm/10 border border-cyber-accent-warm/40 text-cyber-accent-warm rounded-xl hover:bg-cyber-accent-warm/20 hover:border-cyber-accent-warm/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all duration-300 text-base disabled:opacity-50 cursor-pointer"
            >
              抽牌
            </button>
          </motion.div>
        )}

        {step === STEPS.RESULT && (
          <motion.div key="result" exit={{ opacity: 0 }} className="space-y-8">
            <SpreadLayout cards={drawnCards} spread={selectedSpread} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 + 0.8 + (selectedSpread.cardCount - 1) * 0.15 + 0.3, duration: 0.4 }}
            >
              <ReadingResult readings={readings} />
            </motion.div>
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 border border-cyber-border text-cyber-text-muted rounded-xl hover:border-cyber-accent/40 hover:text-cyber-accent transition-all duration-300 text-sm cursor-pointer"
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
