import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-mystic-bg text-mystic-text">
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center h-screen text-mystic-gold text-2xl">✦ 塔罗牌占卜 ✦</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
