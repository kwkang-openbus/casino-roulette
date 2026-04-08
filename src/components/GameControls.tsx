import { useGameStore } from '../store/gameStore'

interface GameControlsProps {
  onSpin: () => void
}

export default function GameControls({ onSpin }: GameControlsProps) {
  const gamePhase = useGameStore((s) => s.gamePhase)
  const currentBets = useGameStore((s) => s.currentBets)
  const undo = useGameStore((s) => s.undo)
  const clearAllBets = useGameStore((s) => s.clearAllBets)
  const repeatBets = useGameStore((s) => s.repeatBets)
  const previousBets = useGameStore((s) => s.previousBets)

  const hasBets = Object.keys(currentBets).length > 0
  const hasPreviousBets = Object.keys(previousBets).length > 0
  const isBetting = gamePhase === 'betting'

  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <button
        onClick={undo}
        disabled={!isBetting || !hasBets}
        className="flex-1 h-11 rounded-xl bg-bg-surface text-text-primary font-semibold text-sm border border-border-default disabled:opacity-40 active:scale-[0.97] transition-all"
      >
        &#x21A9; 취소
      </button>

      <button
        onClick={clearAllBets}
        disabled={!isBetting || !hasBets}
        className="flex-1 h-11 rounded-xl bg-bg-surface text-text-primary font-semibold text-sm border border-border-default disabled:opacity-40 active:scale-[0.97] transition-all"
      >
        &#x2715; 전체취소
      </button>

      {hasPreviousBets && !hasBets && isBetting && (
        <button
          onClick={repeatBets}
          className="flex-1 h-11 rounded-xl bg-accent-purple text-white font-semibold text-sm disabled:opacity-40 active:scale-[0.97] transition-all"
        >
          &#x21BB; 재배팅
        </button>
      )}

      <button
        onClick={onSpin}
        disabled={!isBetting}
        className="flex-[2] h-11 rounded-xl bg-accent-gold text-bg-primary font-bold text-base disabled:opacity-40 active:scale-[0.97] transition-all"
      >
        {gamePhase === 'spinning' ? '회전 중...' : gamePhase === 'result' ? '결과 확인' : '스핀'}
      </button>
    </div>
  )
}
