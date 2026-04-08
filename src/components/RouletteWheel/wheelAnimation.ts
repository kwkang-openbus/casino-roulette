import { WHEEL_ORDER } from '../../game/constants'
import { drawWheel, drawBall } from './wheelRenderer'

const SEGMENT_ANGLE = (2 * Math.PI) / 37
const SPIN_DURATION = 8000  // 8초
const MIN_ROTATIONS = 8     // 최소 8바퀴
const BALL_OPPOSITE_SPINS = 10  // 볼의 반대방향 추가 회전 수

// 감속 이징
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export interface SpinController {
  start: (winningNumber: number, onComplete: () => void) => void
  stop: () => void
  drawIdle: () => void
}

export function createSpinController(
  canvas: HTMLCanvasElement,
  getSize: () => number,
): SpinController {
  let animationId: number | null = null
  let currentRotation = 0

  function getCtx() {
    return canvas.getContext('2d')!
  }

  function render(rotation: number, ballAngle?: number, ballRadius?: number) {
    const ctx = getCtx()
    const size = getSize()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawWheel(ctx, size, rotation)

    if (ballAngle !== undefined && ballRadius !== undefined) {
      drawBall(ctx, size, ballAngle, ballRadius)
    }
  }

  function drawIdle() {
    render(currentRotation)
  }

  function start(winningNumber: number, onComplete: () => void) {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
    }

    const numberIndex = WHEEL_ORDER.indexOf(winningNumber)
    const targetSegmentAngle = numberIndex * SEGMENT_ANGLE
    const fullRotations = MIN_ROTATIONS * 2 * Math.PI
    const startRotation = currentRotation

    // 포인터(-π/2, 12시 방향)에 당첨번호가 정렬되도록 계산
    const pointerAngle = -Math.PI / 2
    const alignOffset = ((pointerAngle - targetSegmentAngle - startRotation) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)
    const targetRotation = startRotation + fullRotations + alignOffset

    const size = getSize()
    const outerBallRadius = size / 2 * 0.88
    const innerBallRadius = size / 2 * 0.62

    let startTime: number | null = null

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / SPIN_DURATION, 1)
      const easedProgress = easeOutExpo(progress)

      // 휠 회전 (감속)
      currentRotation = startRotation + (targetRotation - startRotation) * easedProgress

      // 볼 타임라인: 부드러운 2차 곡선으로 progress보다 살짝 앞서감
      // p=0일 때 0, p=1일 때 1, 중간에서 약 10-20% 앞서감
      // 미분이 연속적이라 속도 점프가 없음
      const ballT = 1.2 * progress - 0.2 * progress * progress

      // 볼 감속: 초기에 빠르게 감소하여 반대방향 효과
      const ballDecay = 1 - easeOutExpo(ballT)

      // 당첨 포켓의 월드 좌표 각도
      const pocketWorldAngle = currentRotation + targetSegmentAngle

      // 볼 각도 = 포켓 + 감쇠 오프셋
      // progress ~0.0: 반대방향으로 빠르게 회전
      // progress ~0.35: 볼이 거의 정지하는 순간 (현실의 룰렛과 동일)
      // progress ~0.4+: 휠과 같은 방향으로 느리게, 포켓으로 수렴
      const ballAngle = pocketWorldAngle + ballDecay * BALL_OPPOSITE_SPINS * 2 * Math.PI

      // 볼 반지름 (단계: 외곽 → 낙하 → 안착)
      let ballRadius: number

      if (progress < 0.55) {
        // Phase 1: 외곽 트랙에서 구름
        ballRadius = outerBallRadius
        ballRadius += Math.sin(progress * Math.PI * 18) * size * 0.004

      } else if (progress < 0.80) {
        // Phase 2: 안쪽으로 낙하 + 디플렉터 바운스
        const dropT = (progress - 0.55) / 0.25
        const easeDropT = 1 - Math.pow(1 - dropT, 2)
        ballRadius = outerBallRadius - (outerBallRadius - innerBallRadius) * easeDropT
        const bounceDecay = Math.pow(1 - dropT, 1.5)
        ballRadius += Math.sin(dropT * Math.PI * 5) * size * 0.015 * bounceDecay

      } else {
        // Phase 3: 포켓 안착 (볼이 이미 포켓 근처에서 자연스럽게 수렴)
        ballRadius = innerBallRadius
      }

      render(currentRotation, ballAngle, ballRadius)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        animationId = null
        onComplete()
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  function stop() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  return { start, stop, drawIdle }
}
