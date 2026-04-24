import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: '首页', Icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
    </svg>
  )},
  { path: '/daily', label: '每日运势', Icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.061 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
    </svg>
  )},
  { path: '/spread', label: '牌阵占卜', Icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  )},
  { path: '/personality', label: '性格测试', Icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
    </svg>
  )},
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-mystic-bg/70 backdrop-blur-lg border-b border-mystic-border/40">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-mystic-gold text-lg font-bold tracking-wider flex items-center gap-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9 4.5c-.683 0-1.274.48-1.424 1.14l-.462 1.962a7.48 7.48 0 01-3.012 4.315l-1.662 1.12a1.5 1.5 0 000 2.49l1.662 1.12a7.48 7.48 0 013.012 4.315l.462 1.962a1.5 1.5 0 002.848 0l.462-1.962a7.48 7.48 0 013.012-4.315l1.662-1.12a1.5 1.5 0 000-2.49l-1.662-1.12a7.48 7.48 0 01-3.012-4.315l-.462-1.962A1.5 1.5 0 009 4.5z" clipRule="evenodd" />
          </svg>
          <span className="font-display">塔罗占卜</span>
        </Link>

        <div className="hidden sm:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
                location.pathname === item.path
                  ? 'text-mystic-gold bg-mystic-gold/10'
                  : 'text-mystic-text-muted hover:text-mystic-gold hover:bg-mystic-gold/5'
              }`}
            >
              <item.Icon />
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden text-mystic-gold text-xl leading-none cursor-pointer p-1"
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
        <div className="sm:hidden border-t border-mystic-border/40 bg-mystic-bg/95 backdrop-blur-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-6 py-3.5 text-sm transition-colors duration-200 cursor-pointer ${
                location.pathname === item.path
                  ? 'text-mystic-gold bg-mystic-gold/10'
                  : 'text-mystic-text-muted hover:text-mystic-gold hover:bg-mystic-gold/5'
              }`}
            >
              <item.Icon />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
