import TarotCard from '../card/TarotCard'

export default function SpreadLayout({ cards, spread }) {
  const layoutClass = {
    'single': 'flex justify-center',
    'three-card': 'flex justify-center gap-3 sm:gap-6 flex-wrap',
    'five-card': 'grid grid-cols-3 sm:flex sm:flex-row justify-items-center sm:justify-center gap-3 sm:gap-4 max-w-lg mx-auto',
  }

  return (
    <div className={layoutClass[spread.id] || 'flex justify-center gap-4'}>
      {cards.map((card, index) => (
        <div key={card.id} className="flex flex-col items-center">
          <span className="text-mystic-gold text-xs mb-2 font-display">{spread.positions[index]?.name}</span>
          <TarotCard card={card} isReversed={card.isReversed} size="md" delay={index * 0.15} />
        </div>
      ))}
    </div>
  )
}
