import { AnimatePresence, motion } from 'framer-motion'
import QuestionCard from '../components/personality/QuestionCard'
import ResultProfile from '../components/personality/ResultProfile'
import usePersonalityTest from '../hooks/usePersonalityTest'
import PERSONALITY_QUESTIONS from '../data/personalityQuestions'

export default function PersonalityPage() {
  const { currentQuestion, totalQuestions, isComplete, result, answerQuestion, reset } = usePersonalityTest()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold font-display text-mystic-gold text-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        性格测试
      </motion.h1>
      <motion.p
        className="text-mystic-text-muted text-sm text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        探索你的塔罗人格原型与元素属性
      </motion.p>

      {!isComplete ? (
        <AnimatePresence mode="wait">
          <QuestionCard
            question={PERSONALITY_QUESTIONS[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={totalQuestions}
            onAnswer={answerQuestion}
          />
        </AnimatePresence>
      ) : (
        <div className="space-y-6">
          <ResultProfile result={result} />
          <div className="text-center">
            <button
              onClick={reset}
              className="px-6 py-2.5 border border-mystic-border/60 text-mystic-text-muted rounded-xl hover:border-mystic-gold/40 hover:text-mystic-gold transition-all duration-300 text-sm"
            >
              重新测试
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
