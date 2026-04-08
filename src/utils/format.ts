export function formatMoney(amount: number): string {
  if (amount >= 100_000_000) {
    return `${(amount / 100_000_000).toFixed(1)}억`
  }
  if (amount >= 10_000) {
    const man = Math.floor(amount / 10_000)
    return `${man.toLocaleString()}만`
  }
  return amount.toLocaleString() + '원'
}

export function formatMoneyFull(amount: number): string {
  return amount.toLocaleString() + '원'
}
