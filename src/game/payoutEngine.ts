import type { PlacedBet, PayoutResult } from './types'
import { PAYOUT_RATIOS } from './betTypes'

export function calculatePayouts(bets: PlacedBet[], winningNumber: number): PayoutResult[] {
  return bets.map(bet => {
    const won = bet.numbers.includes(winningNumber)
    const ratio = PAYOUT_RATIOS[bet.type]
    return {
      bet,
      won,
      payout: won ? bet.amount * (ratio + 1) : 0,
    }
  })
}

export function calculateTotalWin(results: PayoutResult[]): number {
  return results.reduce((sum, r) => sum + r.payout, 0)
}

export function calculateTotalBet(bets: PlacedBet[]): number {
  return bets.reduce((sum, b) => sum + b.amount, 0)
}
