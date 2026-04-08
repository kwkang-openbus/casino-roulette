# 기술 스택 명세서

## 빌드 & 런타임

| 항목 | 기술 | 버전 |
|------|------|------|
| 빌드 도구 | Vite | 6.x |
| 프레임워크 | React | 19.x |
| 언어 | TypeScript | 5.x |
| 스타일링 | Tailwind CSS | 4.x (`@tailwindcss/vite` 플러그인) |
| 상태관리 | Zustand | 5.x (`persist` 미들웨어) |
| 효과음 | Howler.js | 2.x |
| PWA | vite-plugin-pwa | 0.21+ |
| 린트 | ESLint | (Vite 템플릿 기본) |

## 패키지 설치 명령

```bash
# 프로덕션 의존성
npm install zustand howler

# 개발 의존성
npm install -D tailwindcss @tailwindcss/vite vite-plugin-pwa @types/howler
```

## Vite 설정 (`vite.config.ts`)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '카지노 룰렛',
        short_name: '룰렛',
        description: '유럽식 카지노 룰렛 게임',
        theme_color: '#0A0A0A',
        background_color: '#0A0A0A',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3}'],
      },
    }),
  ],
})
```

## Tailwind CSS v4 설정

별도 `tailwind.config.js` 불필요. CSS 파일에서 직접 설정:

```css
@import "tailwindcss";

@theme {
  /* 디자인 토큰은 DESIGN_SYSTEM.md 참조 */
}
```

## 휠 렌더링

- **HTML5 Canvas 2D API** (외부 라이브러리 없음)
- `requestAnimationFrame` 기반 60fps 애니메이션 루프
- `devicePixelRatio` 고DPI 대응
- 난수 생성: `crypto.getRandomValues()` (Math.random 미사용)

## 상태 관리 구조

```
Zustand Store
├── balance (number) ─── persist → localStorage
├── history (SpinResult[]) ─── persist → localStorage
├── gamePhase ('betting' | 'spinning' | 'result')
├── currentBets (Map<string, PlacedBet>)
├── selectedChip (number)
├── winningNumber (number | null)
├── betTimer (number) ─── 15초 카운트다운
└── actions: placeBet, undo, clearAll, spin, collectWinnings
```

## PWA 요구사항

- `display: standalone` (주소창 제거)
- 오프라인 완전 동작 (모든 에셋 precache)
- iOS: `apple-mobile-web-app-capable`, `black-translucent`
- Android: manifest 기반 자동 설치 프롬프트
- 서비스 워커: Workbox precaching

## 브라우저 지원

- Chrome 90+ (Android/Desktop)
- Safari 15+ (iOS)
- Firefox 90+ (Desktop)
- Samsung Internet 15+
