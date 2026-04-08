import { WHEEL_ORDER, getNumberColor, WHEEL_COLORS } from '../../game/constants'

const SEGMENT_COUNT = 37
const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENT_COUNT

export function drawWheel(
  ctx: CanvasRenderingContext2D,
  size: number,
  rotation: number,
) {
  const center = size / 2
  const outerRadius = center * 0.92
  const innerRadius = center * 0.55
  const numberRadius = center * 0.74

  ctx.save()
  ctx.translate(center, center)
  ctx.rotate(rotation)

  // 세그먼트 그리기
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const startAngle = i * SEGMENT_ANGLE - SEGMENT_ANGLE / 2
    const endAngle = startAngle + SEGMENT_ANGLE
    const num = WHEEL_ORDER[i]
    const color = getNumberColor(num)

    // 세그먼트 채우기
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, outerRadius, startAngle, endAngle)
    ctx.closePath()
    ctx.fillStyle = WHEEL_COLORS[color]
    ctx.fill()

    // 세그먼트 경계선
    ctx.strokeStyle = '#C8AA6E'
    ctx.lineWidth = 0.5
    ctx.stroke()

    // 숫자 텍스트
    const textAngle = startAngle + SEGMENT_ANGLE / 2
    ctx.save()
    ctx.rotate(textAngle)
    ctx.translate(numberRadius, 0)
    ctx.rotate(Math.PI / 2)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = `bold ${Math.round(size * 0.032)}px Inter, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(String(num), 0, 0)
    ctx.restore()
  }

  // 내부 원 (중심 허브)
  const hubGradient = ctx.createRadialGradient(0, 0, innerRadius * 0.3, 0, 0, innerRadius)
  hubGradient.addColorStop(0, '#5A4A2A')
  hubGradient.addColorStop(0.5, '#3A2A1A')
  hubGradient.addColorStop(1, '#1A0A00')
  ctx.beginPath()
  ctx.arc(0, 0, innerRadius, 0, Math.PI * 2)
  ctx.fillStyle = hubGradient
  ctx.fill()
  ctx.strokeStyle = '#C8AA6E'
  ctx.lineWidth = 2
  ctx.stroke()

  // 외곽 링
  ctx.beginPath()
  ctx.arc(0, 0, outerRadius, 0, Math.PI * 2)
  ctx.strokeStyle = '#C8AA6E'
  ctx.lineWidth = 3
  ctx.stroke()

  ctx.restore()

  // 포인터 (고정, 회전하지 않음)
  drawPointer(ctx, center, outerRadius)
}

function drawPointer(ctx: CanvasRenderingContext2D, center: number, outerRadius: number) {
  const pointerSize = center * 0.08
  ctx.save()
  ctx.translate(center, center - outerRadius + pointerSize * 0.3)
  ctx.beginPath()
  ctx.moveTo(0, pointerSize)
  ctx.lineTo(-pointerSize * 0.6, -pointerSize * 0.3)
  ctx.lineTo(pointerSize * 0.6, -pointerSize * 0.3)
  ctx.closePath()
  ctx.fillStyle = '#F3C620'
  ctx.fill()
  ctx.strokeStyle = '#C8AA6E'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.restore()
}

export function drawBall(
  ctx: CanvasRenderingContext2D,
  size: number,
  angle: number,
  radius: number,
) {
  const center = size / 2
  const ballRadius = size * 0.018
  const x = center + Math.cos(angle) * radius
  const y = center + Math.sin(angle) * radius

  ctx.save()

  // 볼 그림자 (먼저)
  ctx.beginPath()
  ctx.arc(x + 1.5, y + 1.5, ballRadius * 1.1, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.fill()

  // 볼 본체
  const gradient = ctx.createRadialGradient(
    x - ballRadius * 0.3, y - ballRadius * 0.3, ballRadius * 0.1,
    x, y, ballRadius,
  )
  gradient.addColorStop(0, '#FFFFFF')
  gradient.addColorStop(0.4, '#F0F0F0')
  gradient.addColorStop(1, '#B0B0B0')

  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.restore()
}
