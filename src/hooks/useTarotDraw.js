import { useState, useCallback } from 'react'
import majorArcana from '../data/majorArcana'
import minorArcana from '../data/minorArcana'
import { drawCards } from '../utils/shuffle'

const FULL_DECK = [...majorArcana, ...minorArcana]

export default function useTarotDraw() {
  const [drawnCards, setDrawnCards] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)

  const draw = useCallback((count) => {
    setIsDrawing(true)
    setDrawnCards([])
    const cards = drawCards(FULL_DECK, count)
    setTimeout(() => {
      setDrawnCards(cards)
      setIsDrawing(false)
    }, 300)
    return cards
  }, [])

  const reset = useCallback(() => {
    setDrawnCards([])
    setIsDrawing(false)
  }, [])

  return { drawnCards, isDrawing, draw, reset }
}
