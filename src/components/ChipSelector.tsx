import { useGameStore } from '../store/gameStore'
import { CHIP_DENOMINATIONS } from '../game/constants'

export default function ChipSelector() {
  const selectedChip = useGameStore((s) => s.selectedChip)
  const setSelectedChip = useGameStore((s) => s.setSelectedChip)
  const balance = useGameStore((s) => s.balance)

  return (
    <div className="flex items-center justify-center gap-2 px-2 py-2">
      {CHIP_DENOMINATIONS.map((chip) => {
        const isSelected = selectedChip === chip.value
        const canAfford = balance >= chip.value
        return (
          <button
            key={chip.value}
            onClick={() => setSelectedChip(chip.value)}
            disabled={!canAfford}
            className={`
              w-12 h-12 rounded-full border-[3px] border-dashed flex items-center justify-center
              text-[11px] font-bold shadow-lg transition-all
              ${isSelected ? 'ring-2 ring-accent-gold ring-offset-1 ring-offset-bg-primary scale-110' : ''}
              ${canAfford ? 'active:scale-95' : 'opacity-40 cursor-not-allowed'}
            `}
            style={{
              backgroundColor: chip.color,
              borderColor: chip.borderColor,
              color: chip.textColor,
            }}
          >
            {chip.label}
          </button>
        )
      })}
    </div>
  )
}
