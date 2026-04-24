import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TarotCard({ card, isReversed = false, onClick, delay = 0, size = 'md', autoFlip = false, flipDelay = 0.8 }) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (autoFlip && !isFlipped) {
      const timer = setTimeout(() => setIsFlipped(true), (delay + flipDelay) * 1000)
      return () => clearTimeout(timer)
    }
  }, [autoFlip, delay, flipDelay, isFlipped])

  const sizeClasses = {
    sm: 'w-16 h-28 sm:w-20 sm:h-32',
    md: 'w-24 h-40 sm:w-28 sm:h-44',
    lg: 'w-32 h-52 sm:w-40 sm:h-60',
  }

  const handleClick = () => {
    if (!isFlipped) setIsFlipped(true)
    onClick?.()
  }

  const cardBack = (
    <div
      className={`${sizeClasses[size]} rounded-xl border border-cyber-purple/40 bg-cyber-card/80 flex items-center justify-center cursor-pointer hover:border-cyber-accent/50 hover:shadow-[0_0_12px_rgba(167,139,250,0.15)] transition-all duration-300 backdrop-blur-sm`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)`,
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-cyber-accent/50 text-lg sm:text-2xl">✦</span>
        <div className="w-6 sm:w-8 h-px bg-cyber-purple/30" />
        <span className="text-cyber-accent/30 text-[8px] sm:text-[10px] tracking-widest">TAROT</span>
      </div>
    </div>
  )

  const cardFront = (
    <div
      className={`${sizeClasses[size]} rounded-xl border border-cyber-accent/40 bg-cyber-card/90 p-2 sm:p-3 flex flex-col items-center justify-center text-center shadow-[0_0_10px_rgba(167,139,250,0.1)] backdrop-blur-sm`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(167,139,250,0.06) 0%, transparent 60%)`,
        transform: isReversed ? 'rotate(180deg)' : 'none',
      }}
    >
      <span className="text-cyber-accent text-base sm:text-xl mb-0.5">✦</span>
      <p className="text-cyber-accent text-xs sm:text-sm font-bold font-display leading-tight">{card.name}</p>
      <p className="text-cyber-text-muted text-[8px] sm:text-[10px] mt-0.5 leading-tight">{card.nameEn}</p>
      <div className="w-4 sm:w-6 h-px bg-cyber-accent/25 my-1" />
      <p className="text-cyber-text-muted text-[7px] sm:text-[9px] leading-tight px-1">
        {card.isReversed ? card.reversed : card.upright}
      </p>
      {isReversed && (
        <span className="text-cyber-rose text-[8px] sm:text-[10px] mt-1 font-bold">逆位</span>
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={handleClick}
      className="select-none"
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.48, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      >
        <div style={{ backfaceVisibility: 'hidden', position: isFlipped ? 'absolute' : 'relative' }}>
          {cardBack}
        </div>
        <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: isFlipped ? 'relative' : 'absolute' }}>
          {cardFront}
        </div>
      </motion.div>
    </motion.div>
  )
}
