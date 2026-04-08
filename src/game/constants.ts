// 유럽식 룰렛 휠 시계방향 배치 순서
export const WHEEL_ORDER: readonly number[] = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
]

export const TOTAL_NUMBERS = 37

export const RED_NUMBERS: ReadonlySet<number> = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
])

export const BLACK_NUMBERS: ReadonlySet<number> = new Set([
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
])

export type NumberColor = 'red' | 'black' | 'green'

export function getNumberColor(n: number): NumberColor {
  if (n === 0) return 'green'
  if (RED_NUMBERS.has(n)) return 'red'
  return 'black'
}

// 테이블 그리드: 위에서 아래로 3행, 왼쪽에서 오른쪽 12열
// row 0 (상단) = 3,6,9,...,36 / row 1 (중간) = 2,5,8,...,35 / row 2 (하단) = 1,4,7,...,34
export const TABLE_GRID: readonly (readonly number[])[] = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
]

// 칩 단위
export const CHIP_DENOMINATIONS = [
  { value: 1000, label: '1천', color: '#FFFFFF', textColor: '#333333', borderColor: '#999999' },
  { value: 5000, label: '5천', color: '#E0080B', textColor: '#FFFFFF', borderColor: '#B00008' },
  { value: 10000, label: '1만', color: '#3B82F6', textColor: '#FFFFFF', borderColor: '#2563EB' },
  { value: 50000, label: '5만', color: '#22C55E', textColor: '#FFFFFF', borderColor: '#16A34A' },
  { value: 100000, label: '10만', color: '#F59E0B', textColor: '#FFFFFF', borderColor: '#D97706' },
  { value: 500000, label: '50만', color: '#8B5CF6', textColor: '#FFFFFF', borderColor: '#7C3AED' },
] as const

export const INITIAL_BALANCE = 1_000_000
export const BET_TIMER_SECONDS = 30
export const RESULT_DISPLAY_SECONDS = 3

// 휠 세그먼트 색상 (Canvas 렌더링용)
export const WHEEL_COLORS: Record<NumberColor, string> = {
  red: '#E0080B',
  black: '#1A1A1A',
  green: '#016D29',
}
