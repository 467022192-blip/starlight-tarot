import { useState, useCallback } from 'react'
import PERSONALITY_QUESTIONS, { PERSONALITY_TYPES } from '../data/personalityQuestions'

export default function usePersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [result, setResult] = useState(null)

  const answerQuestion = useCallback((option) => {
    const newAnswers = [...answers, option]
    setAnswers(newAnswers)

    if (currentQuestion + 1 >= PERSONALITY_QUESTIONS.length) {
      const traits = { fire: 0, water: 0, air: 0, earth: 0 }
      newAnswers.forEach((ans) => {
        Object.entries(ans.traits).forEach(([key, value]) => {
          if (traits[key] !== undefined) traits[key] += value
        })
      })
      const dominant = Object.entries(traits).reduce((a, b) => (b[1] > a[1] ? b : a))[0]
      setResult({
        type: PERSONALITY_TYPES[dominant],
        traits,
        dominant,
      })
      setIsComplete(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }, [currentQuestion, answers])

  const reset = useCallback(() => {
    setCurrentQuestion(0)
    setAnswers([])
    setIsComplete(false)
    setResult(null)
  }, [])

  return {
    currentQuestion,
    totalQuestions: PERSONALITY_QUESTIONS.length,
    answers,
    isComplete,
    result,
    answerQuestion,
    reset,
  }
}
