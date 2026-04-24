import { useState } from 'react'

function generateStars() {
  return Array.from({ length: 150 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    color: Math.random() > 0.7 ? 'accent' : Math.random() > 0.5 ? 'purple' : 'white',
  }))
}

function generateShootingStars() {
  return Array.from({ length: 3 }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 40}%`,
    left: `${Math.random() * 60}%`,
    duration: 6 + Math.random() * 8,
    delay: i * 4 + Math.random() * 3,
  }))
}

export default function StarBackground() {
  const [stars] = useState(generateStars)
  const [shootingStars] = useState(generateShootingStars)

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-bg-deep via-cyber-bg to-cyber-bg-deep" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.35) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,255,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(255,0,255,0.12) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 60% 40%, rgba(244,63,94,0.2) 0%, transparent 40%)`,
        }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            backgroundColor: star.color === 'accent' ? '#A78BFA' : star.color === 'purple' ? '#C4B5FD' : '#ffffff',
            boxShadow: star.color !== 'white' ? `0 0 ${star.size * 3}px ${star.color === 'accent' ? 'rgba(167,139,250,0.5)' : 'rgba(196,181,253,0.4)'}` : 'none',
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}
      {shootingStars.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="absolute h-px"
          style={{
            top: s.top,
            left: s.left,
            width: '120px',
            background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.8), rgba(196,181,253,0.4), transparent)',
            boxShadow: '0 0 6px rgba(167,139,250,0.4)',
            animation: `shootingStar ${s.duration}s ease-in ${s.delay}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 scanlines opacity-50"
      />
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
