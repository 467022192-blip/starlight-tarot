import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { THEMES } from '../data/spreads'

const THEME_ICONS = {
  daily: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-amber-400">
      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.591 1.59z" />
    </svg>
  ),
  decision: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-purple-400">
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  ),
  personality: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-blue-400">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
    </svg>
  ),
  love: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-rose-400">
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
  daily: { gradient: 'from-amber-900/20 via-mystic-card to-mystic-card', border: 'hover:border-amber-500/40', iconBg: 'bg-amber-500/10' },
  decision: { gradient: 'from-purple-900/20 via-mystic-card to-mystic-card', border: 'hover:border-purple-500/40', iconBg: 'bg-purple-500/10' },
  personality: { gradient: 'from-blue-900/20 via-mystic-card to-mystic-card', border: 'hover:border-blue-500/40', iconBg: 'bg-blue-500/10' },
  love: { gradient: 'from-rose-900/20 via-mystic-card to-mystic-card', border: 'hover:border-rose-500/40', iconBg: 'bg-rose-500/10' },
  career: { gradient: 'from-emerald-900/20 via-mystic-card to-mystic-card', border: 'hover:border-emerald-500/40', iconBg: 'bg-emerald-500/10' },
  growth: { gradient: 'from-cyan-900/20 via-mystic-card to-mystic-card', border: 'hover:border-cyan-500/40', iconBg: 'bg-cyan-500/10' },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.4 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-20">
      <motion.div
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="inline-block mb-5 sm:mb-8"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 sm:w-18 sm:h-18 text-mystic-gold">
            <path fillRule="evenodd" d="M9 4.5c-.683 0-1.274.48-1.424 1.14l-.462 1.962a7.48 7.48 0 01-3.012 4.315l-1.662 1.12a1.5 1.5 0 000 2.49l1.662 1.12a7.48 7.48 0 013.012 4.315l.462 1.962a1.5 1.5 0 002.848 0l.462-1.962a7.48 7.48 0 013.012-4.315l1.662-1.12a1.5 1.5 0 000-2.49l-1.662-1.12a7.48 7.48 0 01-3.012-4.315l-.462-1.962A1.5 1.5 0 009 4.5z" clipRule="evenodd" />
          </svg>
        </motion.div>

        <h1 className="text-3xl sm:text-5xl font-bold font-display text-mystic-gold mb-4 sm:mb-6 tracking-wide">
          探索命运的奥秘
        </h1>

        <p className="text-mystic-text-muted text-sm sm:text-lg max-w-md mx-auto leading-relaxed">
          塔罗牌是连接宇宙智慧的桥梁，你将获得来自神秘领域的指引，开始探索吧👇🏻
        </p>

        <div className="mt-5 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-mystic-gold/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {THEMES.map((theme) => {
          const colors = THEME_COLORS[theme.id] || THEME_COLORS.daily
          const icon = THEME_ICONS[theme.id]
          return (
            <motion.div key={theme.id} variants={item}>
              <Link
                to={theme.route}
                className={`group block p-4 sm:p-6 rounded-2xl border border-mystic-border/50 bg-gradient-to-b ${colors.gradient} ${colors.border} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mystic-purple/10 cursor-pointer h-full`}
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
                  {icon}
                </div>
                <h2 className="text-mystic-gold text-base sm:text-lg font-bold font-display mb-1">
                  {theme.name}
                </h2>
                <p className="text-mystic-text-muted text-xs sm:text-sm leading-relaxed">
                  {theme.description}
                </p>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        className="mt-10 sm:mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-mystic-border/40 bg-mystic-surface/50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-mystic-gold/60">
            <path fillRule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.659a4.503 4.503 0 012.761 1.677 4.5 4.5 0 016.478 0A4.503 4.503 0 0116 2.834v-.659a.75.75 0 00-.629-.74A33.887 33.887 0 0010 1z" clipRule="evenodd" />
          </svg>
          <span className="text-mystic-text-muted text-xs sm:text-sm">78 张塔罗牌 · 6 种占卜方式 · 无限可能</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-mystic-gold/60">
            <path fillRule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.659a4.503 4.503 0 012.761 1.677 4.5 4.5 0 016.478 0A4.503 4.503 0 0116 2.834v-.659a.75.75 0 00-.629-.74A33.887 33.887 0 0010 1z" clipRule="evenodd" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
