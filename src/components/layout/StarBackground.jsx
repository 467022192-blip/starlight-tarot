import { useMemo } from 'react'

export default function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }))
  }, [])

  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${10 + Math.random() * 40}%`,
      left: `${Math.random() * 60}%`,
      duration: 6 + Math.random() * 8,
      delay: i * 4 + Math.random() * 3,
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-mystic-bg via-[#0d0d2b] to-mystic-bg" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(107,76,154,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(107,76,154,0.2) 0%, transparent 50%)`,
        }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-mystic-gold to-transparent"
          style={{
            top: s.top,
            left: s.left,
            width: '80px',
            animation: `shootingStar ${s.duration}s ease-in ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.15; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          5% { opacity: 1; }
          15% { transform: translateX(200px) translateY(80px); opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
