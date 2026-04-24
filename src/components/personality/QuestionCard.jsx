import { motion } from 'framer-motion'

export default function QuestionCard({ question, questionIndex, totalQuestions, onAnswer }) {
  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      key={question.id}
    >
      <div className="mb-6 text-center">
        <span className="text-mystic-text-muted text-sm">
          {questionIndex + 1} / {totalQuestions}
        </span>
        <div className="w-full h-1.5 bg-mystic-border/40 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-mystic-gold/60 to-mystic-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <h2 className="text-mystic-gold text-lg sm:text-xl font-bold font-display text-center mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full p-4 rounded-xl border border-mystic-border/50 bg-mystic-surface/60 text-left text-mystic-text hover:border-mystic-gold/40 hover:bg-mystic-gold/5 transition-all duration-200 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <span className="text-mystic-gold/60 mr-2 text-sm">{String.fromCharCode(65 + index)}.</span>
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
