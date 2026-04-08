import { useRef, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { createSpinController, type SpinController } from './wheelAnimation'

export default function RouletteWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controllerRef = useRef<SpinController | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const gamePhase = useGameStore((s) => s.gamePhase)
  const winningNumber = useGameStore((s) => s.winningNumber)
  const completeResult = useGameStore((s) => s.completeResult)

  // Canvas 초기화 + 리사이즈
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = container!.getBoundingClientRect()
      const dim = Math.min(rect.width, rect.height)
      canvas!.style.width = `${dim}px`
      canvas!.style.height = `${dim}px`
      canvas!.width = dim * dpr
      canvas!.height = dim * dpr
      const ctx = canvas!.getContext('2d')!
      ctx.scale(dpr, dpr)

      if (!controllerRef.current) {
        controllerRef.current = createSpinController(canvas!, () => dim)
      }
      controllerRef.current.drawIdle()
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // 스핀 트리거
  useEffect(() => {
    if (gamePhase === 'spinning' && winningNumber !== null && controllerRef.current) {
      controllerRef.current.start(winningNumber, () => {
        completeResult()
      })
    }
  }, [gamePhase, winningNumber, completeResult])

  // 클린업
  useEffect(() => {
    return () => controllerRef.current?.stop()
  }, [])

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full" style={{ maxHeight: '55vh' }}>
      <canvas
        ref={canvasRef}
        className="block"
      />
    </div>
  )
}
