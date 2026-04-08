import { TOTAL_NUMBERS } from './constants'

export function getRandomNumber(): number {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] % TOTAL_NUMBERS
}
