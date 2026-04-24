import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    path: '/daily',
    title: '每日运势',
    description: '抽取一张牌，获取今日指引与启示',
    gradient: 'from-amber-900/20 via-mystic-card to-mystic-card',
    borderColor: 'hover:border-amber-500/40',
    iconBg: 'bg-amber-500/10',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-amber-400">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.591 1.59z" />
      </svg>
    ),
  },
  {
    path: '/spread',
    title: '牌阵占卜',
    description: '1/3/5张牌阵，深度解读命运密码',
    gradient: 'from-purple-900/20 via-mystic-card to-mystic-card',
    borderColor: 'hover:border-purple-500/40',
    iconBg: 'bg-purple-500/10',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-purple-400">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    path: '/personality',
    title: '性格测试',
    description: '探索你的塔罗人格原型与元素属性',
    gradient: 'from-blue-900/20 via-mystic-card to-mystic-card',
    borderColor: 'hover:border-blue-500/40',
    iconBg: 'bg-blue-500/10',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-blue-400">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
      </svg>
    ),
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-20">
      <motion.div
        className="text-center mb-14 sm:mb-24"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="inline-block mb-5 sm:mb-8"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 sm:w-20 sm:h-20 text-mystic-gold">
            <path fillRule="evenodd" d="M9 4.5c-.683 0-1.274.48-1.424 1.14l-.462 1.962a7.48 7.48 0 01-3.012 4.315l-1.662 1.12a1.5 1.5 0 000 2.49l1.662 1.12a7.48 7.48 0 013.012 4.315l.462 1.962a1.5 1.5 0 002.848 0l.462-1.962a7.48 7.48 0 013.012-4.315l1.662-1.12a1.5 1.5 0 000-2.49l-1.662-1.12a7.48 7.48 0 01-3.012-4.315l-.462-1.962A1.5 1.5 0 009 4.5zM18 1.5a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75V5.25a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75V2.25A.75.75 0 0118 1.5zM18 12a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75A.75.75 0 0118 12zM21 7.5a.75.75 0 01.75.75v.75h.75a.75.75 0 010 1.5h-.75v.75a.75.75 0 01-1.5 0v-.75h-.75a.75.75 0 010-1.5h.75v-.75A.75.75 0 0121 7.5z" clipRule="evenodd" />
          </svg>
        </motion.div>

        <h1 className="text-3xl sm:text-5xl font-bold font-display text-mystic-gold mb-4 sm:mb-6 tracking-wide">
          探索命运的奥秘
        </h1>

        <p className="text-mystic-text-muted text-sm sm:text-lg max-w-md mx-auto leading-relaxed">
          塔罗牌是连接宇宙智慧的桥梁，你将获得来自神秘领域的指引，开始探索吧👇🏻
        </p>

        <div className="mt-6 flex justify-center gap-2">
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
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {FEATURES.map((feature) => (
          <motion.div key={feature.path} variants={item}>
            <Link
              to={feature.path}
              className={`group block p-6 sm:p-8 rounded-2xl border border-mystic-border/50 bg-gradient-to-b ${feature.gradient} ${feature.borderColor} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mystic-purple/10 cursor-pointer`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h2 className="text-mystic-gold text-lg sm:text-xl font-bold font-display mb-2">
                {feature.title}
              </h2>
              <p className="text-mystic-text-muted text-sm leading-relaxed">
                {feature.description}
              </p>

            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-14 sm:mt-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-mystic-border/40 bg-mystic-surface/50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-mystic-gold/60">
            <path fillRule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.659a4.503 4.503 0 012.761 1.677 4.5 4.5 0 016.478 0A4.503 4.503 0 0116 2.834v-.659a.75.75 0 00-.629-.74A33.887 33.887 0 0010 1zM4.75 5A2.75 2.75 0 002 7.75v.5a.75.75 0 00.75.75h.278l1.478 8.578A2.75 2.75 0 007.24 20h5.52a2.75 2.75 0 002.734-2.422L16.972 9h.278a.75.75 0 00.75-.75v-.5A2.75 2.75 0 0015.25 5h-10.5z" clipRule="evenodd" />
          </svg>
          <span className="text-mystic-text-muted text-xs sm:text-sm">78 张塔罗牌 · 3 种占卜方式 · 无限可能</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-mystic-gold/60">
            <path fillRule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.659a4.503 4.503 0 012.761 1.677 4.5 4.5 0 016.478 0A4.503 4.503 0 0116 2.834v-.659a.75.75 0 00-.629-.74A33.887 33.887 0 0010 1zM4.75 5A2.75 2.75 0 002 7.75v.5a.75.75 0 00.75.75h.278l1.478 8.578A2.75 2.75 0 007.24 20h5.52a2.75 2.75 0 002.734-2.422L16.972 9h.278a.75.75 0 00.75-.75v-.5A2.75 2.75 0 0015.25 5h-10.5z" clipRule="evenodd" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}
