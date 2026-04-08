import { useGameStore } from '../store/gameStore'
import { getNumberColor } from '../game/constants'
import { formatMoneyFull } from '../utils/format'

export default function ResultDisplay() {
  const gamePhase = useGameStore((s) => s.gamePhase)
  const winningNumber = useGameStore((s) => s.winningNumber)
  const lastWin = useGameStore((s) => s.lastWin)
  const history = useGameStore((s) => s.history)

  if (gamePhase !== 'result' || winningNumber === null) return null

  const color = getNumberColor(winningNumber)
  const latestResult = history[0]
  const totalBet = latestResult?.totalBet ?? 0
  const netResult = lastWin - totalBet

  const bgColor = color === 'red' ? 'bg-roulette-red' : color === 'black' ? 'bg-roulette-black' : 'bg-roulette-green'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className={`${bgColor} w-24 h-24 rounded-full flex items-center justify-center border-4 border-accent-gold shadow-2xl animate-bounce-in`}>
          <span className="text-white font-bold text-4xl">{winningNumber}</span>
        </div>

        {totalBet > 0 && (
          <div className="text-center">
            {lastWin > 0 ? (
              <>
                <div className="text-success text-2xl font-bold">
                  +{formatMoneyFull(lastWin)}
                </div>
                <div className="text-text-secondary text-sm mt-1">
                  순이익: {netResult >= 0 ? '+' : ''}{formatMoneyFull(netResult)}
                </div>
              </>
            ) : (
              <div className="text-danger text-xl font-bold">
                -{formatMoneyFull(totalBet)}
              </div>
            )}
          </div>
        )}

        {totalBet === 0 && (
          <div className="text-text-secondary text-sm">베팅 없음</div>
        )}
      </div>
    </div>
  )
}
