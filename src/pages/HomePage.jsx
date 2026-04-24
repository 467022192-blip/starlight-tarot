import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    path: '/daily',
    title: '每日运势',
    icon: '☀️',
    description: '抽取一张牌，获取今日指引与启示',
    gradient: 'from-amber-900/20 via-mystic-card to-mystic-card',
    borderColor: 'hover:border-amber-500/40',
    iconBg: 'bg-amber-500/10',
  },
  {
    path: '/spread',
    title: '牌阵占卜',
    icon: '🔮',
    description: '1/3/5张牌阵，深度解读命运密码',
    gradient: 'from-purple-900/20 via-mystic-card to-mystic-card',
    borderColor: 'hover:border-purple-500/40',
    iconBg: 'bg-purple-500/10',
  },
  {
    path: '/personality',
    title: '性格测试',
    icon: '🌙',
    description: '探索你的塔罗人格原型与元素属性',
    gradient: 'from-blue-900/20 via-mystic-card to-mystic-card',
    borderColor: 'hover:border-blue-500/40',
    iconBg: 'bg-blue-500/10',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-16">
      <motion.div
        className="text-center mb-12 sm:mb-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block mb-4 sm:mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-5xl sm:text-7xl">🔮</span>
        </motion.div>

        <h1 className="text-3xl sm:text-5xl font-bold font-display mb-4 sm:mb-6">
          <span className="text-mystic-gold">探索命运的奥秘</span>
        </h1>

        <p className="text-mystic-text-muted text-sm sm:text-lg max-w-lg mx-auto leading-relaxed">
          塔罗牌是连接宇宙智慧的桥梁，每张牌都承载着古老的启示。
          <br className="hidden sm:block" />
          在这里，你将获得来自神秘领域的指引。
        </p>

        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-mystic-gold/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {FEATURES.map((feature) => (
          <motion.div key={feature.path} variants={item}>
            <Link
              to={feature.path}
              className={`group block p-6 sm:p-8 rounded-2xl border border-mystic-border/60 bg-gradient-to-b ${feature.gradient} ${feature.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-mystic-purple/10`}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl sm:text-3xl">{feature.icon}</span>
              </div>
              <h2 className="text-mystic-gold text-lg sm:text-xl font-bold font-display mb-2">
                {feature.title}
              </h2>
              <p className="text-mystic-text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-mystic-gold/60 text-xs group-hover:text-mystic-gold transition-colors">
                <span>开始探索</span>
                <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 sm:mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-mystic-border/40 bg-mystic-surface/50">
          <span className="text-mystic-gold text-sm">✦</span>
          <span className="text-mystic-text-muted text-xs sm:text-sm">78 张塔罗牌 · 3 种占卜方式 · 无限可能</span>
          <span className="text-mystic-gold text-sm">✦</span>
        </div>
      </motion.div>
    </div>
  )
}
