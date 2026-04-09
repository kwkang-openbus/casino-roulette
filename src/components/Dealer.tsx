import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'

type DealerState = 'betting' | 'spinning' | 'win' | 'lose'

const MESSAGES: Record<DealerState, string[]> = {
  betting: ['베팅해 주세요~', '행운을 빌어요!', '어디에 거실래요?'],
  spinning: ['No more bets!', '돌아갑니다~', '두근두근...'],
  win: ['축하해요! 🎉', '대박이에요!', '역시 센스!'],
  lose: ['다음엔 꼭요!', '아쉽네요~', '포기하지 마세요!'],
}

const DEALER_CSS = `
@keyframes dealer-breathe {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.012) translateY(-2px); }
}
@keyframes dealer-sway {
  0%, 100% { transform: rotate(-2deg) scale(1.05); }
  50% { transform: rotate(2deg) scale(1.05); }
}
@keyframes dealer-celebrate {
  0%, 100% { transform: scale(1) translateY(0); }
  25% { transform: scale(1.04) translateY(-6px) rotate(1deg); }
  75% { transform: scale(1.04) translateY(-6px) rotate(-1deg); }
}
@keyframes dealer-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px) rotate(-1deg); }
  75% { transform: translateX(3px) rotate(1deg); }
}
@keyframes bubble-pop {
  0% { opacity: 0; transform: scale(0.6) translateX(-8px); }
  60% { transform: scale(1.05) translateX(1px); }
  100% { opacity: 1; transform: scale(1) translateX(0); }
}
@keyframes win-glow {
  0%, 100% { box-shadow: 0 0 12px 2px rgba(255,200,50,0.5); }
  50% { box-shadow: 0 0 24px 6px rgba(255,200,50,0.8); }
}
.dealer-bubble {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6px;
  background: linear-gradient(135deg, rgba(255,220,240,0.96), rgba(255,255,255,0.96));
  color: #1a1a1a;
  font-size: 11px;
  font-weight: 600;
  border-radius: 14px;
  padding: 5px 11px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.35);
  animation: bubble-pop 0.35s ease-out;
  white-space: nowrap;
  border: 1px solid rgba(255,160,190,0.35);
  pointer-events: none;
}
.dealer-bubble::after {
  content: '';
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  width: 0; height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid rgba(255,220,240,0.96);
}
`

export default function Dealer() {
  const gamePhase = useGameStore((s) => s.gamePhase)
  const lastWin = useGameStore((s) => s.lastWin)
  const [msgIdx, setMsgIdx] = useState(0)

  const state: DealerState =
    gamePhase === 'spinning'
      ? 'spinning'
      : gamePhase === 'result'
        ? lastWin > 0 ? 'win' : 'lose'
        : 'betting'

  useEffect(() => {
    setMsgIdx(Math.floor(Math.random() * MESSAGES[state].length))
  }, [state])

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'bottom center',
    transition: 'filter 0.5s ease',
    ...(state === 'spinning' && {
      filter: 'brightness(1.05) saturate(1.1)',
      animation: 'dealer-sway 2s ease-in-out infinite',
    }),
    ...(state === 'win' && {
      filter: 'brightness(1.15) saturate(1.2)',
      animation: 'dealer-celebrate 0.6s ease-in-out infinite',
    }),
    ...(state === 'lose' && {
      filter: 'brightness(0.9) saturate(0.85)',
      animation: 'dealer-shake 2.5s ease-in-out infinite',
    }),
    ...(state === 'betting' && {
      filter: 'brightness(1) saturate(1)',
      animation: 'dealer-breathe 3s ease-in-out infinite',
    }),
  }

  const containerStyle: React.CSSProperties = {
    width: 85,
    height: 105,
    flexShrink: 0,
    filter: state === 'win'
      ? 'drop-shadow(0 0 8px rgba(255,200,50,0.9))'
      : state === 'lose'
        ? 'drop-shadow(0 2px 6px rgba(100,100,150,0.5))'
        : 'drop-shadow(0 2px 8px rgba(255,150,180,0.4))',
    animation: state === 'win' ? 'win-glow 1s ease-in-out infinite' : undefined,
  }

  return (
    <div className="shrink-0 flex flex-col items-center">
      <style>{DEALER_CSS}</style>
      {/* 말풍선 + 딜러 이미지를 relative 컨테이너로 묶음 */}
      <div style={{ ...containerStyle, position: 'relative' }}>
        <div className="dealer-bubble" key={`${state}-${msgIdx}`}>
          {MESSAGES[state][msgIdx]}
        </div>
        <img
          src={`${import.meta.env.BASE_URL}dealer-nobg.png`}
          alt="dealer"
          style={imgStyle}
          draggable={false}
        />
      </div>
    </div>
  )
}
