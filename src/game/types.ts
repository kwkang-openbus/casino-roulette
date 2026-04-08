export type BetType =
  | 'straight' | 'split' | 'street' | 'corner' | 'sixLine'
  | 'dozen' | 'column'
  | 'red' | 'black' | 'odd' | 'even' | 'low' | 'high'

export type GamePhase = 'betting' | 'spinning' | 'result'

export interface PlacedBet {
  id: string
  type: BetType
  numbers: number[]
  amount: number
}

export interface BetAction {
  betId: string
  amount: number
  chipValue: number
}

export interface SpinResult {
  winningNumber: number
  winningColor: 'red' | 'black' | 'green'
  timestamp: number
  totalBet: number
  totalWin: number
}

export interface PayoutResult {
  bet: PlacedBet
  won: boolean
  payout: number
}
