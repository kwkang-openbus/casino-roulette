import { useEffect, useState, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { BET_TIMER_SECONDS } from '../game/constants'

interface BetTimerProps {
  onTimeUp: () => void
}

export default function BetTimer({ onTimeUp }: BetTimerProps) {
  const gamePhase = useGameStore((s) => s.gamePhase)
  const [timeLeft, setTimeLeft] = useState(BET_TIMER_SECONDS)
  const intervalRef = useRef<number | null>(null)
  const onTimeUpRef = useRef(onTimeUp)
  onTimeUpRef.current = onTimeUp

  useEffect(() => {
    if (gamePhase !== 'betting') {
      setTimeLeft(BET_TIMER_SECONDS)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    setTimeLeft(BET_TIMER_SECONDS)
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          intervalRef.current = null
          // setTimeout으로 다음 틱에서 실행 (상태 업데이트 충돌 방지)
          setTimeout(() => onTimeUpRef.current(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [gamePhase])

  if (gamePhase !== 'betting') return null

  const progress = timeLeft / BET_TIMER_SECONDS
  const isWarning = timeLeft <= 5

  return (
    <div className="px-3 py-1">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-bg-surface rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 linear ${isWarning ? 'bg-danger' : 'bg-accent-gold'}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className={`text-xs font-bold min-w-[28px] text-right ${isWarning ? 'text-danger animate-pulse' : 'text-accent-gold'}`}>
          {timeLeft}초
        </span>
      </div>
    </div>
  )
}
