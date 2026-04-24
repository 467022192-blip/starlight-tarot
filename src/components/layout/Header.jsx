import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { THEMES } from '../../data/spreads'

const NAV_ITEMS = [
  { path: '/', label: '首页', Icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
    </svg>
  )},
  ...THEMES.map((theme) => ({
    path: theme.route,
    label: theme.name,
    themeId: theme.id,
  })),
]

const isActive = (pathname, itemPath) => {
  if (itemPath === '/') return pathname === '/'
  return pathname === itemPath || pathname.startsWith(itemPath + '/')
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-cyber-accent text-lg font-bold tracking-wider flex items-center gap-2 cursor-pointer glow-accent flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9 4.5c-.683 0-1.274.48-1.424 1.14l-.462 1.962a7.48 7.48 0 01-3.012 4.315l-1.662 1.12a1.5 1.5 0 000 2.49l1.662 1.12a7.48 7.48 0 013.012 4.315l.462 1.962a1.5 1.5 0 002.848 0l.462-1.962a7.48 7.48 0 013.012-4.315l1.662-1.12a1.5 1.5 0 000-2.49l-1.662-1.12a7.48 7.48 0 01-3.012-4.315l-.462-1.962A1.5 1.5 0 009 4.5z" clipRule="evenodd" />
          </svg>
          <span className="font-display">星光塔罗</span>
        </Link>

        <div className="hidden lg:flex gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive(location.pathname, item.path)
                  ? 'text-cyber-accent bg-cyber-accent/10'
                  : 'text-cyber-text-muted hover:text-cyber-accent hover:bg-cyber-accent/5'
              }`}
            >
              {item.Icon && <item.Icon />}
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="lg:hidden text-cyber-accent text-xl leading-none cursor-pointer p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? '关闭菜单' : '打开菜单'}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="lg:hidden glass-strong">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3 text-sm transition-all duration-200 cursor-pointer ${
                isActive(location.pathname, item.path)
                  ? 'text-cyber-accent bg-cyber-accent/10'
                  : 'text-cyber-text-muted hover:text-cyber-accent hover:bg-cyber-accent/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
