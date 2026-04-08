import type { BetType } from './types'
import { RED_NUMBERS, BLACK_NUMBERS, TABLE_GRID } from './constants'

export const PAYOUT_RATIOS: Record<BetType, number> = {
  straight: 35,
  split: 17,
  street: 11,
  corner: 8,
  sixLine: 5,
  dozen: 2,
  column: 2,
  red: 1,
  black: 1,
  odd: 1,
  even: 1,
  low: 1,
  high: 1,
}

// 아웃사이드 베팅 숫자 세트
export const OUTSIDE_BETS = {
  red: [...RED_NUMBERS],
  black: [...BLACK_NUMBERS],
  odd: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
  even: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
  low: Array.from({ length: 18 }, (_, i) => i + 1),
  high: Array.from({ length: 18 }, (_, i) => i + 19),
  dozen1: Array.from({ length: 12 }, (_, i) => i + 1),
  dozen2: Array.from({ length: 12 }, (_, i) => i + 13),
  dozen3: Array.from({ length: 12 }, (_, i) => i + 25),
  column1: TABLE_GRID[2].slice(), // 1,4,7,...,34
  column2: TABLE_GRID[1].slice(), // 2,5,8,...,35
  column3: TABLE_GRID[0].slice(), // 3,6,9,...,36
} as const

export interface BetSpotDef {
  id: string
  type: BetType
  numbers: number[]
  label: string
}

// 스트레이트 베팅 (0~36)
export function generateStraightBets(): BetSpotDef[] {
  return Array.from({ length: 37 }, (_, n) => ({
    id: `straight-${n}`,
    type: 'straight' as BetType,
    numbers: [n],
    label: `${n}`,
  }))
}

// 스플릿 베팅: 인접한 2개 숫자
export function generateSplitBets(): BetSpotDef[] {
  const splits: BetSpotDef[] = []

  // 수평 스플릿 (같은 열, 인접 행)
  for (let col = 0; col < 12; col++) {
    for (let row = 0; row < 2; row++) {
      const a = TABLE_GRID[row][col]
      const b = TABLE_GRID[row + 1][col]
      const nums = [Math.min(a, b), Math.max(a, b)]
      splits.push({
        id: `split-${nums[0]}-${nums[1]}`,
        type: 'split',
        numbers: nums,
        label: `${nums[0]}/${nums[1]}`,
      })
    }
  }

  // 수직 스플릿 (같은 행, 인접 열)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 11; col++) {
      const a = TABLE_GRID[row][col]
      const b = TABLE_GRID[row][col + 1]
      const nums = [Math.min(a, b), Math.max(a, b)]
      splits.push({
        id: `split-${nums[0]}-${nums[1]}`,
        type: 'split',
        numbers: nums,
        label: `${nums[0]}/${nums[1]}`,
      })
    }
  }

  // 0과 인접 숫자 스플릿
  splits.push(
    { id: 'split-0-1', type: 'split', numbers: [0, 1], label: '0/1' },
    { id: 'split-0-2', type: 'split', numbers: [0, 2], label: '0/2' },
    { id: 'split-0-3', type: 'split', numbers: [0, 3], label: '0/3' },
  )

  return splits
}

// 스트리트 베팅: 가로줄 3개 숫자
export function generateStreetBets(): BetSpotDef[] {
  const streets: BetSpotDef[] = []
  for (let col = 0; col < 12; col++) {
    const nums = [TABLE_GRID[2][col], TABLE_GRID[1][col], TABLE_GRID[0][col]].sort((a, b) => a - b)
    streets.push({
      id: `street-${nums[0]}`,
      type: 'street',
      numbers: nums,
      label: `${nums[0]}-${nums[2]}`,
    })
  }
  // 0,1,2 스트리트
  streets.push({
    id: 'street-0-1-2',
    type: 'street',
    numbers: [0, 1, 2],
    label: '0/1/2',
  })
  // 0,2,3 스트리트
  streets.push({
    id: 'street-0-2-3',
    type: 'street',
    numbers: [0, 2, 3],
    label: '0/2/3',
  })
  return streets
}

// 코너 베팅: 4개 숫자가 만나는 꼭짓점
export function generateCornerBets(): BetSpotDef[] {
  const corners: BetSpotDef[] = []
  for (let col = 0; col < 11; col++) {
    for (let row = 0; row < 2; row++) {
      const nums = [
        TABLE_GRID[row][col],
        TABLE_GRID[row][col + 1],
        TABLE_GRID[row + 1][col],
        TABLE_GRID[row + 1][col + 1],
      ].sort((a, b) => a - b)
      corners.push({
        id: `corner-${nums[0]}-${nums[3]}`,
        type: 'corner',
        numbers: nums,
        label: `${nums[0]}/${nums[3]}`,
      })
    }
  }
  return corners
}

// 식스라인 베팅: 연속 2줄 6개 숫자
export function generateSixLineBets(): BetSpotDef[] {
  const sixLines: BetSpotDef[] = []
  for (let col = 0; col < 11; col++) {
    const nums = [
      TABLE_GRID[0][col], TABLE_GRID[1][col], TABLE_GRID[2][col],
      TABLE_GRID[0][col + 1], TABLE_GRID[1][col + 1], TABLE_GRID[2][col + 1],
    ].sort((a, b) => a - b)
    sixLines.push({
      id: `sixline-${nums[0]}-${nums[5]}`,
      type: 'sixLine',
      numbers: nums,
      label: `${nums[0]}-${nums[5]}`,
    })
  }
  return sixLines
}

// 아웃사이드 베팅 정의
export function getOutsideBetDefs(): BetSpotDef[] {
  return [
    { id: 'red', type: 'red', numbers: [...OUTSIDE_BETS.red], label: '빨강' },
    { id: 'black', type: 'black', numbers: [...OUTSIDE_BETS.black], label: '검정' },
    { id: 'odd', type: 'odd', numbers: [...OUTSIDE_BETS.odd], label: '홀수' },
    { id: 'even', type: 'even', numbers: [...OUTSIDE_BETS.even], label: '짝수' },
    { id: 'low', type: 'low', numbers: OUTSIDE_BETS.low, label: '1-18' },
    { id: 'high', type: 'high', numbers: OUTSIDE_BETS.high, label: '19-36' },
    { id: 'dozen1', type: 'dozen', numbers: OUTSIDE_BETS.dozen1, label: '1st 12' },
    { id: 'dozen2', type: 'dozen', numbers: OUTSIDE_BETS.dozen2, label: '2nd 12' },
    { id: 'dozen3', type: 'dozen', numbers: OUTSIDE_BETS.dozen3, label: '3rd 12' },
    { id: 'column1', type: 'column', numbers: OUTSIDE_BETS.column1, label: '2:1' },
    { id: 'column2', type: 'column', numbers: OUTSIDE_BETS.column2, label: '2:1' },
    { id: 'column3', type: 'column', numbers: OUTSIDE_BETS.column3, label: '2:1' },
  ]
}
