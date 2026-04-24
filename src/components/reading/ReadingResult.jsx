import ReadingCard from './ReadingCard'
import { generateSummary } from '../../utils/interpretation'

export default function ReadingResult({ readings }) {
  const summary = generateSummary(readings)

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-cyber-purple/5 border border-cyber-purple/15 glow-border-accent">
        <p className="text-cyber-purple-light text-sm font-bold font-display mb-1">✦ 总体概述</p>
        <p className="text-cyber-text text-sm leading-relaxed">{summary}</p>
      </div>
      {readings.map((reading, index) => (
        <ReadingCard key={reading.card.id} reading={reading} index={index} />
      ))}
    </div>
  )
}
