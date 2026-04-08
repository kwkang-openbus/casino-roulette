import { useGameStore } from '../../store/gameStore'
import { TABLE_GRID, getNumberColor, CHIP_DENOMINATIONS } from '../../game/constants'
import { getOutsideBetDefs } from '../../game/betTypes'

const outsideBets = getOutsideBetDefs()

function getChipDisplay(amount: number) {
  for (let i = CHIP_DENOMINATIONS.length - 1; i >= 0; i--) {
    if (amount >= CHIP_DENOMINATIONS[i].value) {
      const display = amount >= 10000
        ? `${Math.floor(amount / 10000)}만`
        : `${Math.floor(amount / 1000)}천`
      return { color: CHIP_DENOMINATIONS[i].color, textColor: CHIP_DENOMINATIONS[i].textColor, display }
    }
  }
  return { color: CHIP_DENOMINATIONS[0].color, textColor: CHIP_DENOMINATIONS[0].textColor, display: `${amount}` }
}

function ChipBadge({ amount }: { amount: number }) {
  const chip = getChipDisplay(amount)
  return (
    <span
      className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] rounded-full text-[9px] font-bold flex items-center justify-center shadow-lg z-10 border-2 border-bg-primary px-0.5"
      style={{ backgroundColor: chip.color, color: chip.textColor }}
    >
      {chip.display}
    </span>
  )
}

function NumberCell({ num }: { num: number }) {
  const placeBet = useGameStore((s) => s.placeBet)
  const currentBets = useGameStore((s) => s.currentBets)
  const gamePhase = useGameStore((s) => s.gamePhase)

  const color = getNumberColor(num)
  const betId = `straight-${num}`
  const bet = currentBets[betId]

  const bgColor = color === 'red' ? 'bg-roulette-red' : color === 'black' ? 'bg-roulette-black' : 'bg-roulette-green'

  return (
    <button
      onClick={() => gamePhase === 'betting' && placeBet(betId, 'straight', [num])}
      disabled={gamePhase !== 'betting'}
      className={`${bgColor} relative flex items-center justify-center border border-felt-dark text-white font-bold text-sm min-h-[44px] transition-all active:brightness-125 hover:brightness-110 disabled:opacity-60`}
    >
      {num}
      {bet && <ChipBadge amount={bet.amount} />}
    </button>
  )
}

function ZeroCell() {
  const placeBet = useGameStore((s) => s.placeBet)
  const currentBets = useGameStore((s) => s.currentBets)
  const gamePhase = useGameStore((s) => s.gamePhase)
  const bet = currentBets['straight-0']

  return (
    <button
      onClick={() => gamePhase === 'betting' && placeBet('straight-0', 'straight', [0])}
      disabled={gamePhase !== 'betting'}
      className="bg-roulette-green border border-felt-dark text-white font-bold text-lg flex items-center justify-center min-h-[132px] transition-all active:brightness-125 hover:brightness-110 disabled:opacity-60 relative"
      style={{ gridRow: '1 / 4', gridColumn: '1' }}
    >
      0
      {bet && <ChipBadge amount={bet.amount} />}
    </button>
  )
}

function OutsideBetButton({ id, type, numbers, label, className }: {
  id: string
  type: string
  numbers: number[]
  label: string
  className?: string
}) {
  const placeBet = useGameStore((s) => s.placeBet)
  const currentBets = useGameStore((s) => s.currentBets)
  const gamePhase = useGameStore((s) => s.gamePhase)
  const bet = currentBets[id]

  return (
    <button
      onClick={() => gamePhase === 'betting' && placeBet(id, type as any, numbers)}
      disabled={gamePhase !== 'betting'}
      className={`relative flex items-center justify-center border border-felt-dark text-white font-semibold text-xs min-h-[40px] transition-all active:brightness-125 hover:brightness-110 disabled:opacity-60 ${className ?? 'bg-felt-primary'}`}
    >
      {id === 'red' && <span className="w-3 h-3 rounded-full bg-roulette-red mr-1 inline-block" />}
      {id === 'black' && <span className="w-3 h-3 rounded-full bg-roulette-black mr-1 inline-block border border-white/30" />}
      {label}
      {bet && <ChipBadge amount={bet.amount} />}
    </button>
  )
}

export default function BettingTable() {
  return (
    <div className="w-full overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="min-w-[580px] px-2 pt-1">
        {/* 숫자 그리드: 0 + 3x12 */}
        <div className="grid gap-[1px]" style={{ gridTemplateColumns: '2fr repeat(12, 1fr)', gridTemplateRows: 'repeat(3, 1fr)' }}>
          <ZeroCell />
          {TABLE_GRID[0].map((num) => <NumberCell key={num} num={num} />)}
          {TABLE_GRID[1].map((num) => <NumberCell key={num} num={num} />)}
          {TABLE_GRID[2].map((num) => <NumberCell key={num} num={num} />)}
        </div>

        {/* 더즌 베팅 */}
        <div className="grid gap-[1px] mt-[1px]" style={{ gridTemplateColumns: '2fr repeat(3, 4fr)' }}>
          <div />
          {[outsideBets[6], outsideBets[7], outsideBets[8]].map((bet) => (
            <OutsideBetButton key={bet.id} {...bet} className="bg-felt-primary" />
          ))}
        </div>

        {/* 아웃사이드 베팅 (하단) */}
        <div className="grid grid-cols-6 gap-[1px] mt-[1px]">
          {[outsideBets[4], outsideBets[2], outsideBets[0], outsideBets[1], outsideBets[3], outsideBets[5]].map((bet) => (
            <OutsideBetButton key={bet.id} {...bet} />
          ))}
        </div>

        {/* 컬럼 베팅 */}
        <div className="grid grid-cols-3 gap-[1px] mt-[1px]">
          {[outsideBets[9], outsideBets[10], outsideBets[11]].map((bet) => (
            <OutsideBetButton key={bet.id} {...bet} />
          ))}
        </div>
      </div>
    </div>
  )
}
