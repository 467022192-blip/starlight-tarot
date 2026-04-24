import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import StarBackground from './components/layout/StarBackground'
import HomePage from './pages/HomePage'
import DailyPage from './pages/DailyPage'
import SpreadPage from './pages/SpreadPage'
import PersonalityPage from './pages/PersonalityPage'

function App() {
  return (
    <BrowserRouter>
      <StarBackground />
      <div className="relative z-10 min-h-screen flex flex-col bg-mystic-bg text-mystic-text">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/daily" element={<DailyPage />} />
            <Route path="/spread" element={<SpreadPage />} />
            <Route path="/personality" element={<PersonalityPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
