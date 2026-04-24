import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: '首页', icon: '✦' },
  { path: '/daily', label: '每日运势', icon: '☀️' },
  { path: '/spread', label: '牌阵占卜', icon: '🔮' },
  { path: '/personality', label: '性格测试', icon: '🌙' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-mystic-bg/70 backdrop-blur-lg border-b border-mystic-border/50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-mystic-gold text-xl font-bold tracking-wider flex items-center gap-2">
          <span className="text-2xl">✦</span>
          <span className="font-display">塔罗占卜</span>
        </Link>

        <div className="hidden sm:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                location.pathname === item.path
                  ? 'text-mystic-gold bg-mystic-gold/10'
                  : 'text-mystic-text-muted hover:text-mystic-gold hover:bg-mystic-gold/5'
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden text-mystic-gold text-2xl leading-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isOpen && (
        <div className="sm:hidden border-t border-mystic-border/50 bg-mystic-bg/95 backdrop-blur-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3.5 text-sm transition-colors ${
                location.pathname === item.path
                  ? 'text-mystic-gold bg-mystic-gold/10'
                  : 'text-mystic-text-muted hover:text-mystic-gold hover:bg-mystic-gold/5'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
