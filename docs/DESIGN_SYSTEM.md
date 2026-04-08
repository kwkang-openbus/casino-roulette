# 디자인 시스템

## 1. 컬러 팔레트

### 기본 배경/UI 색상
| 용도 | 이름 | HEX | 설명 |
|------|------|-----|------|
| 배경 (메인) | `bg-primary` | `#0A0A0A` | 거의 순수 검정, 카지노 분위기 |
| 배경 (카드/패널) | `bg-card` | `#141428` | 진한 남색-검정 |
| 배경 (입력/서브) | `bg-surface` | `#1E1E3A` | 약간 밝은 남색 |
| 테두리 | `border-default` | `#2A2A4A` | 미묘한 경계선 |

### 게임 테이블 색상
| 용도 | 이름 | HEX | 설명 |
|------|------|-----|------|
| 펠트 (기본) | `felt-primary` | `#016D29` | 아라비안 그린, 테이블 메인 |
| 펠트 (어두운) | `felt-dark` | `#01431E` | 테이블 테두리/구분선 |
| 펠트 (밝은) | `felt-light` | `#028A34` | 호버/하이라이트 |

### 룰렛 번호 색상
| 용도 | 이름 | HEX | 설명 |
|------|------|-----|------|
| 빨강 번호 | `roulette-red` | `#E0080B` | 표준 카지노 레드 |
| 검정 번호 | `roulette-black` | `#1A1A1A` | 순수 검정 대신 약간 밝게 |
| 초록 (0) | `roulette-green` | `#016D29` | 0번 전용 |

### 액센트/UI 색상
| 용도 | 이름 | HEX | 설명 |
|------|------|-----|------|
| 골드 (강조) | `accent-gold` | `#F3C620` | 당첨, 중요 정보 |
| 퍼플 (주요 액센트) | `accent-purple` | `#7B7CCA` | 버튼, 활성 상태 |
| 핑크 (보조 액센트) | `accent-pink` | `#F4849C` | 알림, 배지 |
| 성공 (초록) | `success` | `#22C55E` | 수익, 당첨 표시 |
| 위험 (빨강) | `danger` | `#EF4444` | 손실, 경고 |

### 텍스트 색상
| 용도 | 이름 | HEX | 설명 |
|------|------|-----|------|
| 기본 텍스트 | `text-primary` | `#F5F5F5` | 밝은 회백색 |
| 보조 텍스트 | `text-secondary` | `#A0A0B8` | 설명, 라벨 |
| 비활성 텍스트 | `text-muted` | `#606080` | 비활성 상태 |

---

## 2. 타이포그래피

### 폰트 패밀리
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Montserrat', 'Inter', sans-serif;
```

- **Inter**: 모든 UI 텍스트 (버튼, 라벨, 잔액, 숫자)
- **Montserrat**: 헤더, 브랜딩, 큰 타이틀에만 사용
- 두 폰트 모두 Google Fonts에서 무료 사용 가능

### 폰트 크기 (rem 기준, 기본 16px)
| 이름 | 크기 | 용도 |
|------|------|------|
| `text-display` | 2rem (32px) | 앱 타이틀, 당첨 번호 |
| `text-h1` | 1.5rem (24px) | 잔액 표시, 결과 헤딩 |
| `text-h2` | 1.25rem (20px) | 섹션 타이틀 |
| `text-body` | 0.875rem (14px) | 기본 UI 텍스트 |
| `text-sm` | 0.8125rem (13px) | 라벨, 배당률 표시 |
| `text-xs` | 0.75rem (12px) | 칩 위 금액, 캡션 |
| `text-xxs` | 0.6875rem (11px) | 테이블 위 숫자 (모바일) |

### 폰트 굵기
| 이름 | 값 | 용도 |
|------|-----|------|
| Regular | 400 | 본문 텍스트 |
| Medium | 500 | 라벨, 칩 금액 |
| Semibold | 600 | 버튼, 잔액 |
| Bold | 700 | 헤딩, 당첨 번호 |
| Extrabold | 800 | 디스플레이 타이틀 |

---

## 3. 간격 시스템 (8px 그리드)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `space-1` | 4px | 인접 요소 간 미세 간격 |
| `space-2` | 8px | 관련 요소 사이 |
| `space-3` | 12px | 칩/버튼 사이 간격 |
| `space-4` | 16px | 섹션 내부 패딩 |
| `space-5` | 20px | 카드 패딩 |
| `space-6` | 24px | 섹션 간 간격 |
| `space-8` | 32px | 주요 영역 간 간격 |

---

## 4. 레이아웃 (모바일 퍼스트)

### 반응형 브레이크포인트
| 이름 | 너비 | 레이아웃 |
|------|------|---------|
| Mobile S | 320px-374px | 세로 1열, 콤팩트 |
| Mobile | 375px-479px | 세로 1열, 기본 |
| Tablet | 480px-1023px | 2열 (휠 좌측, 테이블 우측) |
| Desktop | 1024px+ | 2열 + 여유 사이드바 |

### 모바일 세로 레이아웃 (기본)
```
┌─────────────────────────────┐
│  헤더 (48px)                │  로고 + 잔액 + 사운드 토글
├─────────────────────────────┤
│  베팅 타이머 프로그레스 바    │  15초 카운트다운
├─────────────────────────────┤
│                             │
│  룰렛 휠 (뷰포트 80%)       │  Canvas, 정사각형
│                             │
├─────────────────────────────┤
│  히스토리 바 (32px)          │  최근 20개 결과 (색상 원형)
├─────────────────────────────┤
│                             │
│  베팅 테이블 (스크롤 가능)    │  가로 스크롤, 최소 580px
│                             │
├─────────────────────────────┤
│  칩 선택기 (56px)            │  6개 칩, 하단 고정
├─────────────────────────────┤
│  액션 버튼 (56px)            │  취소 | 전체취소 | 스핀
│  safe-area 패딩              │
└─────────────────────────────┘
```

### 터치 타겟
| 요소 | 최소 크기 | 권장 크기 |
|------|----------|----------|
| 숫자 셀 (테이블) | 36x36px | 44x44px |
| 칩 버튼 | 44x44px | 48x48px |
| 액션 버튼 | 44px 높이 | 48-56px 높이 |
| 아웃사이드 베팅 영역 | 44x36px | 60x44px |

### Canvas 휠 크기
| 화면 | 지름 |
|------|------|
| Mobile (375px) | 280px |
| Mobile (414px) | 320px |
| Tablet | 400px |
| Desktop | 500px |

---

## 5. 컴포넌트 스타일 규칙

### 버튼
- 기본 높이: 48px
- border-radius: 12px
- 메인 버튼(스핀): `accent-gold` 배경, 검정 텍스트, bold
- 보조 버튼(취소): `bg-surface` 배경, 흰 텍스트
- 비활성: opacity 50%, pointer-events none
- 터치 시: scale(0.97) + opacity 변화 (50ms)

### 칩
- 크기: 44x44px (원형)
- border: 3px dashed (칩 가장자리 패턴)
- 내부: 금액 텍스트 (text-xs, bold, 중앙 정렬)
- 선택 상태: ring-2 ring-accent-gold + scale(1.1)
- 그림자: `0 2px 8px rgba(0,0,0,0.4)`

### 베팅 테이블 숫자 셀
- 배경: `roulette-red` 또는 `roulette-black` 또는 `roulette-green`
- 텍스트: 흰색, bold, 중앙 정렬
- 호버/터치: 밝기 120% + 얇은 골드 테두리
- 칩 배치됨: 셀 우측 상단에 미니 칩 아이콘 표시
- border: 1px solid `felt-dark`

### 결과 오버레이
- 배경: rgba(0,0,0,0.85) 풀스크린
- 중앙: 당첨 번호 (text-display, 색상에 맞는 배경 원)
- 아래: 수익/손실 금액 (`success` 또는 `danger` 색상)
- 애니메이션: scale(0→1) + fade-in (300ms ease-out)
- 3초 후 자동 닫힘

### 히스토리 바
- 가로 스크롤, flex-row, gap-1
- 각 결과: 24x24px 원형, 색상(빨/검/초) 배경, 흰 번호
- 최신 결과: scale(1.2) + ring 효과

---

## 6. 애니메이션 기준

| 애니메이션 | 지속시간 | 이징 | 트리거 |
|-----------|---------|------|--------|
| 칩 배치 | 200ms | ease-out | 테이블 탭 |
| 칩 제거 | 150ms | ease-in | 취소 버튼 |
| 휠 스핀 | 4000-5000ms | easeOutQuart | 스핀 시작 |
| 볼 바운스 | 마지막 1500ms | 커스텀 | 스핀 감속 구간 |
| 결과 팝업 | 300ms | ease-out | 스핀 종료 |
| 결과 사라짐 | 200ms | ease-in | 3초 후 |
| 버튼 터치 | 50ms | linear | 탭 |
| 잔액 변동 | 500ms | ease-out | 배당 적용 |
| 타이머 바 | 15000ms | linear | 베팅 단계 진입 |

---

## 7. 효과음

| 이벤트 | 파일 | 설명 |
|--------|------|------|
| 칩 배치 | `chip-place.mp3` | 짧은 클릭/탁 소리 |
| 휠 회전 | `spin.mp3` | 회전 루프 (fade out) |
| 볼 낙하 | `ball-drop.mp3` | 탁탁 바운스 소리 |
| 당첨 | `win.mp3` | 짧은 팡파르 |
| 타이머 경고 | `tick.mp3` | 마지막 5초 틱 소리 |

- 기본: 음소거 (사용자가 켜야 활성화)
- 헤더에 사운드 ON/OFF 토글 아이콘
- 볼륨: 0.3-0.5 (과하지 않게)

---

## 8. Tailwind v4 테마 설정 (`index.css`)

```css
@import "tailwindcss";

@theme {
  /* 배경 */
  --color-bg-primary: #0A0A0A;
  --color-bg-card: #141428;
  --color-bg-surface: #1E1E3A;
  --color-border-default: #2A2A4A;

  /* 게임 테이블 */
  --color-felt-primary: #016D29;
  --color-felt-dark: #01431E;
  --color-felt-light: #028A34;

  /* 룰렛 번호 */
  --color-roulette-red: #E0080B;
  --color-roulette-black: #1A1A1A;
  --color-roulette-green: #016D29;

  /* 액센트 */
  --color-accent-gold: #F3C620;
  --color-accent-purple: #7B7CCA;
  --color-accent-pink: #F4849C;
  --color-success: #22C55E;
  --color-danger: #EF4444;

  /* 텍스트 */
  --color-text-primary: #F5F5F5;
  --color-text-secondary: #A0A0B8;
  --color-text-muted: #606080;

  /* 폰트 */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'Montserrat', 'Inter', sans-serif;
}
```

이 테마 토큰을 기준으로 Tailwind 유틸리티 클래스 사용:
- `bg-bg-primary`, `text-text-primary`, `border-border-default`
- `bg-felt-primary`, `bg-roulette-red`
- `text-accent-gold`, `bg-accent-purple`
- `font-sans`, `font-display`
