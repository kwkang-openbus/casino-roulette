import { useGameStore } from '../store/gameStore'
import { formatMoneyFull } from '../utils/format'

export default function BalanceDisplay() {
  const balance = useGameStore((s) => s.balance)
  const lastWin = useGameStore((s) => s.lastWin)
  const gamePhase = useGameStore((s) => s.gamePhase)
  const resetBalance = useGameStore((s) => s.resetBalance)

  return (
    <div className="flex items-center justify-between px-4">
      <div>
        <div className="text-text-secondary text-xs">잔액</div>
        <div className="text-accent-gold font-bold text-lg leading-tight">
          {formatMoneyFull(balance)}
        </div>
      </div>

      {gamePhase === 'result' && lastWin > 0 && (
        <div className="text-success font-bold text-sm animate-pulse">
          +{formatMoneyFull(lastWin)}
        </div>
      )}

      {balance === 0 && gamePhase === 'betting' && (
        <button
          onClick={resetBalance}
          className="px-3 py-1.5 rounded-lg bg-danger text-white text-xs font-semibold active:scale-95 transition-all"
        >
          충전
        </button>
      )}
    </div>
  )
}
