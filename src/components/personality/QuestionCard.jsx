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
        <span className="text-cyber-text-muted text-sm">
          {questionIndex + 1} / {totalQuestions}
        </span>
        <div className="w-full h-1.5 bg-cyber-border/40 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-purple/50 to-cyber-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <h2 className="text-cyber-text text-lg sm:text-xl font-bold font-display text-center mb-6">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full p-4 rounded-xl border border-cyber-border bg-cyber-surface/40 text-left text-cyber-text hover:border-cyber-accent/30 hover:bg-cyber-accent/5 transition-all duration-200 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <span className="text-cyber-accent/60 mr-2 text-sm">{String.fromCharCode(65 + index)}.</span>
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
