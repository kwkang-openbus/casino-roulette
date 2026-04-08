import { useGameStore } from '../store/gameStore'
import { getNumberColor } from '../game/constants'

export default function HistoryBar() {
  const history = useGameStore((s) => s.history)

  if (history.length === 0) return null

  const recent = history.slice(0, 20)

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
      <span className="text-text-muted text-[10px] mr-1 shrink-0">이력</span>
      {recent.map((result, i) => {
        const color = getNumberColor(result.winningNumber)
        const bgClass = color === 'red' ? 'bg-roulette-red' : color === 'black' ? 'bg-roulette-black' : 'bg-roulette-green'
        return (
          <div
            key={result.timestamp}
            className={`${bgClass} shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${i === 0 ? 'ring-2 ring-accent-gold scale-110' : ''}`}
          >
            {result.winningNumber}
          </div>
        )
      })}
    </div>
  )
}
