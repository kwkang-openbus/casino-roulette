import { useState, useMemo } from 'react'
import { useGameStore } from '../store/gameStore'
import { getNumberColor } from '../game/constants'

function NumberBadge({ num, count }: { num: number; count?: number }) {
  const color = getNumberColor(num)
  const bgClass = color === 'red' ? 'bg-roulette-red' : color === 'black' ? 'bg-roulette-black' : 'bg-roulette-green'
  return (
    <span className={`${bgClass} inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-white text-[11px] font-bold`}>
      {num}
      {count !== undefined && <span className="text-[9px] font-normal opacity-80">x{count}</span>}
    </span>
  )
}

export default function StatisticsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const history = useGameStore((s) => s.history)

  const stats = useMemo(() => {
    const recent50 = history.slice(0, 50)

    // 빈도 카운트
    const freq: Record<number, number> = {}
    for (const r of recent50) {
      freq[r.winningNumber] = (freq[r.winningNumber] || 0) + 1
    }

    // 고빈도 (2회 이상, 빈도 내림차순)
    const hotNumbers = Object.entries(freq)
      .map(([num, count]) => ({ num: Number(num), count }))
      .filter((e) => e.count >= 2)
      .sort((a, b) => b.count - a.count || a.num - b.num)

    // 미출현 (0~36 중 최근 50개에 한 번도 안 나온 숫자)
    const coldNumbers: number[] = []
    for (let i = 0; i <= 36; i++) {
      if (!freq[i]) coldNumbers.push(i)
    }

    return { recent50, hotNumbers, coldNumbers }
  }, [history])

  if (history.length === 0) return null

  return (
    <div className="shrink-0">
      {/* 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-1 py-1 text-text-secondary text-[11px] hover:text-text-primary transition-colors"
      >
        <span>통계</span>
        <span className="text-text-muted">({Math.min(history.length, 50)}회)</span>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>&#9660;</span>
      </button>

      {/* 통계 패널 */}
      {isOpen && (
        <div className="px-3 pb-2 animate-fade-in space-y-2">
          {/* 최근 50개 이력 */}
          <div>
            <div className="text-text-muted text-[10px] mb-1">최근 {stats.recent50.length}회 결과</div>
            <div className="flex flex-wrap gap-[3px]">
              {stats.recent50.map((r, i) => {
                const color = getNumberColor(r.winningNumber)
                const bgClass = color === 'red' ? 'bg-roulette-red' : color === 'black' ? 'bg-roulette-black' : 'bg-roulette-green'
                return (
                  <div
                    key={`${r.timestamp}-${i}`}
                    className={`${bgClass} w-5 h-5 rounded-sm flex items-center justify-center text-white text-[9px] font-bold ${i === 0 ? 'ring-1 ring-accent-gold' : ''}`}
                  >
                    {r.winningNumber}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 고빈도 숫자 */}
          {stats.hotNumbers.length > 0 && (
            <div>
              <div className="text-text-muted text-[10px] mb-1">
                높은 빈도
              </div>
              <div className="flex flex-wrap gap-1">
                {stats.hotNumbers.map((e) => (
                  <NumberBadge key={e.num} num={e.num} count={e.count} />
                ))}
              </div>
            </div>
          )}

          {/* 미출현 숫자 */}
          {stats.coldNumbers.length > 0 && (
            <div>
              <div className="text-text-muted text-[10px] mb-1">
                미출현 ({stats.coldNumbers.length}개)
              </div>
              <div className="flex flex-wrap gap-1">
                {stats.coldNumbers.map((num) => (
                  <NumberBadge key={num} num={num} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
