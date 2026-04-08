import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GamePhase, PlacedBet, BetAction, SpinResult } from '../game/types'
import { INITIAL_BALANCE, CHIP_DENOMINATIONS } from '../game/constants'
import { getNumberColor } from '../game/constants'
import { getRandomNumber } from '../game/rng'
import { calculatePayouts, calculateTotalWin, calculateTotalBet } from '../game/payoutEngine'

interface GameState {
  // 영속 데이터
  balance: number
  history: SpinResult[]
  soundEnabled: boolean

  // 세션 데이터
  gamePhase: GamePhase
  currentBets: Record<string, PlacedBet>
  selectedChip: number
  winningNumber: number | null
  lastWin: number
  betActionHistory: BetAction[]
  previousBets: Record<string, PlacedBet>

  // 액션
  placeBet: (id: string, type: PlacedBet['type'], numbers: number[]) => void
  undo: () => void
  clearAllBets: () => void
  startSpin: () => number
  completeResult: () => void
  setSelectedChip: (value: number) => void
  repeatBets: () => void
  resetBalance: () => void
  toggleSound: () => void
  setGamePhase: (phase: GamePhase) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      balance: INITIAL_BALANCE,
      history: [],
      soundEnabled: false,

      gamePhase: 'betting',
      currentBets: {},
      selectedChip: CHIP_DENOMINATIONS[0].value,
      winningNumber: null,
      lastWin: 0,
      betActionHistory: [],
      previousBets: {},

      placeBet: (id, type, numbers) => {
        const state = get()
        if (state.gamePhase !== 'betting') return
        const chipValue = state.selectedChip
        if (state.balance < chipValue) return

        const existing = state.currentBets[id]
        const updatedBet: PlacedBet = existing
          ? { ...existing, amount: existing.amount + chipValue }
          : { id, type, numbers, amount: chipValue }

        set({
          currentBets: { ...state.currentBets, [id]: updatedBet },
          balance: state.balance - chipValue,
          betActionHistory: [...state.betActionHistory, { betId: id, amount: chipValue, chipValue }],
        })
      },

      undo: () => {
        const state = get()
        if (state.gamePhase !== 'betting' || state.betActionHistory.length === 0) return

        const lastAction = state.betActionHistory[state.betActionHistory.length - 1]
        const bet = state.currentBets[lastAction.betId]
        if (!bet) return

        const newBets = { ...state.currentBets }
        if (bet.amount <= lastAction.amount) {
          delete newBets[lastAction.betId]
        } else {
          newBets[lastAction.betId] = { ...bet, amount: bet.amount - lastAction.amount }
        }

        set({
          currentBets: newBets,
          balance: state.balance + lastAction.amount,
          betActionHistory: state.betActionHistory.slice(0, -1),
        })
      },

      clearAllBets: () => {
        const state = get()
        if (state.gamePhase !== 'betting') return
        const totalBet = calculateTotalBet(Object.values(state.currentBets))
        set({
          currentBets: {},
          balance: state.balance + totalBet,
          betActionHistory: [],
        })
      },

      startSpin: () => {
        const winningNumber = getRandomNumber()
        const state = get()
        set({
          gamePhase: 'spinning',
          winningNumber,
          previousBets: { ...state.currentBets },
        })
        return winningNumber
      },

      completeResult: () => {
        const state = get()
        if (state.winningNumber === null) return

        const bets = Object.values(state.currentBets)
        const results = calculatePayouts(bets, state.winningNumber)
        const totalWin = calculateTotalWin(results)
        const totalBet = calculateTotalBet(bets)

        const result: SpinResult = {
          winningNumber: state.winningNumber,
          winningColor: getNumberColor(state.winningNumber),
          timestamp: Date.now(),
          totalBet,
          totalWin,
        }

        set({
          gamePhase: 'result',
          balance: state.balance + totalWin,
          lastWin: totalWin,
          history: [result, ...state.history].slice(0, 100),
          currentBets: {},
          betActionHistory: [],
        })
      },

      setSelectedChip: (value) => set({ selectedChip: value }),

      repeatBets: () => {
        const state = get()
        if (state.gamePhase !== 'betting') return
        const prevBets = state.previousBets
        const totalNeeded = calculateTotalBet(Object.values(prevBets))
        if (totalNeeded === 0 || state.balance < totalNeeded) return

        set({
          currentBets: { ...prevBets },
          balance: state.balance - totalNeeded,
          betActionHistory: [],
        })
      },

      resetBalance: () => set({ balance: INITIAL_BALANCE, history: [] }),

      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

      setGamePhase: (phase) => set({ gamePhase: phase }),
    }),
    {
      name: 'casino-roulette-storage',
      partialize: (state) => ({
        balance: state.balance,
        history: state.history,
        soundEnabled: state.soundEnabled,
      }),
    },
  ),
)
