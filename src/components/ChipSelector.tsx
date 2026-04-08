import { useGameStore } from '../store/gameStore'
import { CHIP_DENOMINATIONS } from '../game/constants'

function CasinoChip({
  color,
  borderColor,
  textColor,
  label,
  isSelected,
  canAfford,
  onClick,
}: {
  color: string
  borderColor: string
  textColor: string
  label: string
  isSelected: boolean
  canAfford: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={!canAfford}
      className={`
        relative shrink-0 transition-all
        ${isSelected ? 'scale-110 z-10' : ''}
        ${canAfford ? 'active:scale-95' : 'opacity-40 cursor-not-allowed'}
      `}
    >
      {/* 외곽 링 + 엣지 스팟 (격자무늬) */}
      <div
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: `repeating-conic-gradient(
            ${borderColor} 0deg 8deg,
            ${color} 8deg 15deg
          )`,
          border: `2.5px solid ${borderColor}`,
          boxShadow: isSelected
            ? `0 0 0 2.5px #0A0A0A, 0 0 0 5px #F3C620, 0 4px 12px rgba(0,0,0,0.5)`
            : `0 2px 6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.15)`,
        }}
      >
        {/* 내부 원 (메인 색상 + 텍스트) */}
        <div
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center text-[11px] font-bold"
          style={{
            backgroundColor: color,
            border: `2px solid ${borderColor}`,
            color: textColor,
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.2)',
          }}
        >
          {label}
        </div>
      </div>
    </button>
  )
}

export default function ChipSelector() {
  const selectedChip = useGameStore((s) => s.selectedChip)
  const setSelectedChip = useGameStore((s) => s.setSelectedChip)
  const balance = useGameStore((s) => s.balance)

  return (
    <div className="flex items-center justify-center gap-2 px-2 py-2">
      {CHIP_DENOMINATIONS.map((chip) => (
        <CasinoChip
          key={chip.value}
          color={chip.color}
          borderColor={chip.borderColor}
          textColor={chip.textColor}
          label={chip.label}
          isSelected={selectedChip === chip.value}
          canAfford={balance >= chip.value}
          onClick={() => setSelectedChip(chip.value)}
        />
      ))}
    </div>
  )
}
