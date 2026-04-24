import ReadingCard from './ReadingCard'
import { generateSummary } from '../../utils/interpretation'

export default function ReadingResult({ readings }) {
  const summary = generateSummary(readings)

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-mystic-gold/5 border border-mystic-gold/20">
        <p className="text-mystic-gold text-sm font-bold font-display mb-1">✦ 总体概述</p>
        <p className="text-mystic-text text-sm leading-relaxed">{summary}</p>
      </div>
      {readings.map((reading, index) => (
        <ReadingCard key={reading.card.id} reading={reading} index={index} />
      ))}
    </div>
  )
}
