import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TarotCard({ card, isReversed = false, onClick, delay = 0, size = 'md' }) {
  const [isFlipped, setIsFlipped] = useState(false)

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
      className={`${sizeClasses[size]} rounded-xl border-2 border-mystic-gold/30 bg-mystic-card flex items-center justify-center cursor-pointer hover:border-mystic-gold/60 hover:shadow-lg hover:shadow-mystic-gold/10 transition-all duration-300`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)`,
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-mystic-gold/60 text-lg sm:text-2xl">✦</span>
        <div className="w-6 sm:w-8 h-px bg-mystic-gold/30" />
        <span className="text-mystic-gold/40 text-[8px] sm:text-[10px] tracking-widest">TAROT</span>
      </div>
    </div>
  )

  const cardFront = (
    <div
      className={`${sizeClasses[size]} rounded-xl border-2 border-mystic-gold bg-mystic-card p-2 sm:p-3 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg shadow-mystic-gold/10`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 60%)`,
        transform: isReversed ? 'rotate(180deg)' : 'none',
      }}
    >
      <span className="text-mystic-gold text-base sm:text-xl mb-0.5">✦</span>
      <p className="text-mystic-gold text-xs sm:text-sm font-bold font-display leading-tight">{card.name}</p>
      <p className="text-mystic-text-muted text-[8px] sm:text-[10px] mt-0.5 leading-tight">{card.nameEn}</p>
      <div className="w-4 sm:w-6 h-px bg-mystic-gold/30 my-1" />
      <p className="text-mystic-text-muted text-[7px] sm:text-[9px] leading-tight px-1">
        {card.isReversed ? card.reversed : card.upright}
      </p>
      {isReversed && (
        <span className="text-mystic-purple text-[8px] sm:text-[10px] mt-1 font-bold">逆位</span>
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
      {isFlipped ? cardFront : cardBack}
    </motion.div>
  )
}
