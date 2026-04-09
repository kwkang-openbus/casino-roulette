import { useCallback, useEffect, useRef } from 'react'
import { useGameStore } from './store/gameStore'
import { RESULT_DISPLAY_SECONDS } from './game/constants'
import RouletteWheel from './components/RouletteWheel/RouletteWheel'
import BettingTable from './components/BettingTable/BettingTable'
import ChipSelector from './components/ChipSelector'
import GameControls from './components/GameControls'
import BalanceDisplay from './components/BalanceDisplay'
import ResultDisplay from './components/ResultDisplay'
import HistoryBar from './components/HistoryBar'
import StatisticsPanel from './components/StatisticsPanel'
import BetTimer from './components/BetTimer'
import Dealer from './components/Dealer'

export default function App() {
  const gamePhase = useGameStore((s) => s.gamePhase)
  const startSpin = useGameStore((s) => s.startSpin)
  const setGamePhase = useGameStore((s) => s.setGamePhase)
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const toggleSound = useGameStore((s) => s.toggleSound)

  const resultTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (gamePhase === 'result') {
      resultTimerRef.current = window.setTimeout(() => {
        setGamePhase('betting')
      }, RESULT_DISPLAY_SECONDS * 1000)
    }
    return () => {
      if (resultTimerRef.current) {
        clearTimeout(resultTimerRef.current)
        resultTimerRef.current = null
      }
    }
  }, [gamePhase, setGamePhase])

  const handleSpin = useCallback(() => {
    if (useGameStore.getState().gamePhase !== 'betting') return
    startSpin()
  }, [startSpin])

  const handleTimerUp = useCallback(() => {
    if (useGameStore.getState().gamePhase !== 'betting') return
    startSpin()
  }, [startSpin])

  return (
    <div className="h-full flex flex-col bg-bg-primary overflow-hidden">
      {/* 헤더: 타이틀 + 잔액 + 사운드 */}
      <header className="flex items-center justify-between px-3 py-1.5 shrink-0">
        <div>
          <h1 className="font-display text-accent-gold font-bold text-base tracking-tight leading-none">
            ROULETTE
          </h1>
        </div>
        <BalanceDisplay />
        <button
          onClick={toggleSound}
          className="text-text-secondary hover:text-text-primary text-lg w-8 h-8 flex items-center justify-center"
          aria-label={soundEnabled ? '사운드 끄기' : '사운드 켜기'}
        >
          {soundEnabled ? '\u{1F50A}' : '\u{1F507}'}
        </button>
      </header>

      {/* 베팅 타이머 */}
      <BetTimer onTimeUp={handleTimerUp} />

      {/* 룰렛 휠 + 딜러 */}
      <div className="shrink-0 relative flex items-center justify-center" style={{ maxHeight: '42vh' }}>
        <RouletteWheel />
        <div className="absolute right-0 bottom-0">
          <Dealer />
        </div>
      </div>

      {/* 히스토리 바 */}
      <HistoryBar />

      {/* 통계 패널 (접었다 폈다) */}
      <StatisticsPanel />

      {/* 베팅 테이블 (스크롤 가능 영역) */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
        <BettingTable />
      </div>

      {/* 하단 고정: 칩 선택 + 컨트롤 */}
      <div className="shrink-0 border-t border-border-default bg-bg-primary pb-[env(safe-area-inset-bottom)]">
        <ChipSelector />
        <GameControls onSpin={handleSpin} />
      </div>

      {/* 결과 오버레이 */}
      <ResultDisplay />
    </div>
  )
}
