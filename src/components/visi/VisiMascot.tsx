// VISI 마스코트 — 카카오 프렌즈 스타일 (크림/아이보리 + 보라 사각 안경)
// 모든 색값은 CSS 변수가 아닌 하드코딩(SVG는 CSS 변수 미지원)

import React from 'react'

export type VisiPose =
  | 'default'    // 기본 서있기
  | 'thumbsUp'   // 엄지척
  | 'wave'       // 손 흔들기
  | 'thinking'   // 생각중 (턱 괴기)
  | 'typing'     // 키보드 타이핑
  | 'pointing'   // 오른쪽 가리키기
  | 'magnify'    // 돋보기 들기
  | 'happy'      // 달 모양 눈 (행복)
  | 'cheering'   // 양팔 들기 (화이팅)
  | 'writing'    // 연필 들고 쓰기

interface VisiMascotProps {
  pose?: VisiPose
  size?: number        // px 단위 (SVG width)
  className?: string
  bubble?: string      // 말풍선 텍스트
  bubbleDir?: 'left' | 'right' // 말풍선 꼬리 방향
}

// ── 공통 색상 ──
const C = {
  face:    '#FFF5E8',  // 크림 (얼굴/몸)
  outline: '#1E1240',  // 다크 네이비 (아웃라인)
  glass:   '#8B5CF6',  // 브랜드 퍼플 (안경)
  blush:   '#F9A8D4',  // 핑크 볼터치
  eye:     '#1E1240',  // 눈
  ant:     '#8B5CF6',  // 안테나
  antStem: '#C4B5FD',  // 안테나 줄기
}

// ── 안경 (공통) ──
function Glasses() {
  return (
    <>
      <rect x="55" y="65" width="42" height="30" rx="9" fill="none" stroke={C.glass} strokeWidth="5.5" />
      <rect x="103" y="65" width="42" height="30" rx="9" fill="none" stroke={C.glass} strokeWidth="5.5" />
      <line x1="97" y1="80" x2="103" y2="80" stroke={C.glass} strokeWidth="5" />
      <line x1="24" y1="68" x2="55" y2="74" stroke={C.glass} strokeWidth="4" strokeLinecap="round" />
      <line x1="145" y1="74" x2="176" y2="68" stroke={C.glass} strokeWidth="4" strokeLinecap="round" />
    </>
  )
}

// ── 눈 — 기본 (타원) ──
function EyesNormal() {
  return (
    <>
      <ellipse cx="76" cy="80" rx="10" ry="11" fill={C.eye} />
      <circle cx="82" cy="73" r="4" fill="white" />
      <ellipse cx="124" cy="80" rx="10" ry="11" fill={C.eye} />
      <circle cx="130" cy="73" r="4" fill="white" />
    </>
  )
}

// ── 눈 — 달 모양 (행복) ──
function EyesHappy() {
  return (
    <>
      <path d="M66 84 Q76 70 86 84" fill="none" stroke={C.eye} strokeWidth="7" strokeLinecap="round" />
      <path d="M114 84 Q124 70 134 84" fill="none" stroke={C.eye} strokeWidth="7" strokeLinecap="round" />
    </>
  )
}

// ── 눈 — 가는 눈 (집중) ──
function EyesFocus() {
  return (
    <>
      <ellipse cx="76" cy="80" rx="10" ry="6" fill={C.eye} />
      <ellipse cx="124" cy="80" rx="10" ry="6" fill={C.eye} />
    </>
  )
}

// ── 볼터치 ──
function Blush() {
  return (
    <>
      <circle cx="46" cy="106" r="16" fill={C.blush} opacity={0.45} />
      <circle cx="154" cy="106" r="16" fill={C.blush} opacity={0.45} />
    </>
  )
}

// ── 미소 ──
function Smile({ big = false }: { big?: boolean }) {
  const d = big ? 'M78 110 Q100 130 122 110' : 'M82 108 Q100 123 118 108'
  return <path d={d} fill="none" stroke={C.outline} strokeWidth="3.5" strokeLinecap="round" />
}

// ── 안테나 ──
function Antenna() {
  return (
    <>
      <rect x="97.5" y="16" width="5" height="20" rx="2.5" fill={C.antStem} />
      <circle cx="100" cy="10" r="10" fill={C.ant} opacity={0.25} />
      <circle cx="100" cy="10" r="9" fill={C.ant} />
      <circle cx="97" cy="7" r="3" fill="white" />
    </>
  )
}

// ── 머리 ──
function Head({ eyes = <EyesNormal />, smile = <Smile /> }: { eyes?: React.ReactNode; smile?: React.ReactNode }) {
  return (
    <>
      {/* 그림자 */}
      <circle cx="103" cy="87" r="69" fill={C.outline} opacity={0.12} />
      {/* 얼굴 */}
      <circle cx="100" cy="82" r="68" fill={C.face} stroke={C.outline} strokeWidth="2.5" />
      <Blush />
      {eyes}
      <Glasses />
      {smile}
    </>
  )
}

// ── 몸통 ──
function Body() {
  return (
    <rect x="72" y="142" width="56" height="52" rx="20"
      fill={C.face} stroke={C.outline} strokeWidth="2" />
  )
}

// ── 팔 유틸 ──
function Arm({ x, y, w = 32, h = 16, rx = 8, rot }: {
  x: number; y: number; w?: number; h?: number; rx?: number; rot?: string
}) {
  return (
    <rect x={x} y={y} width={w} height={h} rx={rx}
      fill={C.face} stroke={C.outline} strokeWidth="2"
      transform={rot} />
  )
}

function Hand({ cx, cy, r = 12 }: { cx: number; cy: number; r?: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={C.face} stroke={C.outline} strokeWidth="2" />
}

// ── 그라운드 쉐도우 ──
function GroundShadow({ r = 55 }: { r?: number }) {
  return <ellipse cx="100" cy="272" rx={r} ry="9" fill={C.ant} opacity={0.25} />
}

// ────────────────────────────────────────────────
// 포즈별 SVG 렌더
// ────────────────────────────────────────────────

function PoseDefault() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      {/* 다리 */}
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      {/* 몸 */}
      <Body />
      {/* 팔 */}
      <Arm x={20} y={152} rot="rotate(-5 20 152)" />
      <Hand cx={18} cy={161} />
      <Arm x={148} y={152} rot="rotate(5 148 152)" />
      <Hand cx={182} cy={161} />
      {/* 머리 */}
      <Head />
    </>
  )
}

function PoseThumbsUp() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Body />
      {/* 왼팔 — 엄지척 */}
      <Arm x={14} y={145} rot="rotate(-25 14 145)" />
      <Hand cx={10} cy={134} />
      <rect x="6" y="116" width="9" height="20" rx="4.5" fill={C.face} stroke={C.outline} strokeWidth="2" />
      {/* 오른팔 — 엄지척 */}
      <Arm x={154} y={145} rot="rotate(25 154 145)" />
      <Hand cx={190} cy={134} />
      <rect x="185" y="116" width="9" height="20" rx="4.5" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Head smile={<Smile big />} />
    </>
  )
}

function PoseWave() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Body />
      {/* 왼팔 — 일반 */}
      <Arm x={20} y={152} />
      <Hand cx={18} cy={161} />
      {/* 오른팔 — 위로 들어 손 흔들기 */}
      <Arm x={148} y={126} rot="rotate(-35 148 126)" />
      <Hand cx={178} cy={110} />
      {/* 손가락 힌트 */}
      <line x1="172" y1="98" x2="174" y2="110" stroke={C.outline} strokeWidth="4" strokeLinecap="round" />
      <line x1="179" y1="97" x2="180" y2="109" stroke={C.outline} strokeWidth="4" strokeLinecap="round" />
      <line x1="186" y1="100" x2="186" y2="110" stroke={C.outline} strokeWidth="4" strokeLinecap="round" />
      <Head eyes={<EyesHappy />} smile={<Smile big />} />
    </>
  )
}

function PoseThinking() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Body />
      {/* 왼팔 — 턱 괴기 */}
      <Arm x={20} y={148} rot="rotate(-10 20 148)" />
      <Hand cx={20} cy={140} />
      {/* 오른팔 */}
      <Arm x={148} y={152} />
      <Hand cx={182} cy={161} />
      {/* 생각 말풍선 점들 */}
      <circle cx="152" cy="58" r="4" fill={C.ant} opacity={0.7} />
      <circle cx="163" cy="46" r="6" fill={C.ant} opacity={0.5} />
      <circle cx="176" cy="36" r="8" fill={C.ant} opacity={0.35} />
      <Head />
    </>
  )
}

function PoseTyping() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      {/* 키보드 */}
      <rect x="18" y="178" width="164" height="48" rx="10"
        fill="#1a1a2e" stroke={C.glass} strokeWidth="1.5" strokeOpacity={0.4} />
      {[28,48,68,88,108,128,148,160].map((kx, i) => (
        <rect key={i} x={kx} y="186" width="12" height="9" rx="3" fill={C.glass} opacity={0.35} />
      ))}
      <rect x="50" y="200" width="100" height="9" rx="4" fill={C.glass} opacity={0.2} />
      <Body />
      {/* 양손 키보드 위 */}
      <Arm x={18} y={158} />
      <Hand cx={17} cy={167} />
      <Arm x={150} y={158} />
      <Hand cx={183} cy={167} />
      <Head eyes={<EyesFocus />} />
    </>
  )
}

function PosePointing() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Body />
      <Arm x={20} y={152} />
      <Hand cx={18} cy={161} />
      {/* 오른팔 — 뻗어서 가리키기 */}
      <Arm x={148} y={148} w={38} rot="rotate(-10 148 148)" />
      <Hand cx={188} cy={150} />
      {/* 집게 손가락 */}
      <line x1="196" y1="140" x2="190" y2="150" stroke={C.outline} strokeWidth="5" strokeLinecap="round" />
      <Head />
    </>
  )
}

function PoseMagnify() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Body />
      <Arm x={20} y={152} />
      <Hand cx={18} cy={161} />
      {/* 오른팔 — 돋보기 들기 */}
      <Arm x={148} y={148} rot="rotate(-5 148 148)" />
      {/* 돋보기 */}
      <circle cx="176" cy="118" r="24" fill="none" stroke={C.glass} strokeWidth="4.5" />
      <circle cx="176" cy="118" r="16" fill={C.glass} opacity={0.06} />
      <line x1="194" y1="136" x2="207" y2="150" stroke={C.glass} strokeWidth="6" strokeLinecap="round" />
      {/* 유리 빛반사 */}
      <ellipse cx="168" cy="110" rx="7" ry="4" fill="white" opacity={0.2} transform="rotate(-20 168 110)" />
      <Head eyes={<EyesFocus />} />
    </>
  )
}

function PoseHappy() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Body />
      <Arm x={20} y={152} rot="rotate(-10 20 152)" />
      <Hand cx={18} cy={161} />
      <Arm x={148} y={152} rot="rotate(10 148 152)" />
      <Hand cx={182} cy={161} />
      {/* 하트 */}
      <path d="M100 130 C100 130 84 118 84 108 C84 100 92 96 100 104 C108 96 116 100 116 108 C116 118 100 130 100 130Z"
        fill={C.glass} opacity={0.8} />
      <Head eyes={<EyesHappy />} smile={<Smile big />} />
    </>
  )
}

function PoseCheering() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <Body />
      {/* 양팔 위로 */}
      <Arm x={12} y={138} rot="rotate(-30 12 138)" />
      <Hand cx={8} cy={126} />
      <line x1="2" y1="114" x2="4" y2="126" stroke={C.outline} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="9" y1="113" x2="10" y2="125" stroke={C.outline} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="16" y1="115" x2="16" y2="125" stroke={C.outline} strokeWidth="4.5" strokeLinecap="round" />
      <Arm x={156} y={136} rot="rotate(30 156 136)" />
      <Hand cx={192} cy={124} />
      <line x1="186" y1="112" x2="188" y2="124" stroke={C.outline} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="193" y1="111" x2="194" y2="123" stroke={C.outline} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="200" y1="113" x2="200" y2="123" stroke={C.outline} strokeWidth="4.5" strokeLinecap="round" />
      <Head eyes={<EyesHappy />} smile={<Smile big />} />
    </>
  )
}

function PoseWriting() {
  return (
    <>
      <GroundShadow />
      <Antenna />
      <rect x="78" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="104" y="190" width="18" height="36" rx="9" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="72" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      <rect x="100" y="216" width="28" height="14" rx="7" fill={C.face} stroke={C.outline} strokeWidth="2" />
      {/* 문서 왼손 */}
      <Arm x={14} y={138} rot="rotate(-8 14 138)" />
      <rect x="4" y="110" width="46" height="62" rx="6"
        fill="#1a1a2e" stroke={C.glass} strokeWidth="1.5" strokeOpacity={0.4} />
      <rect x="10" y="118" width="34" height="3" rx="1.5" fill={C.glass} opacity={0.7} />
      <rect x="10" y="125" width="26" height="2" rx="1" fill={C.glass} opacity={0.35} />
      <rect x="10" y="131" width="30" height="2" rx="1" fill={C.glass} opacity={0.35} />
      <rect x="10" y="137" width="20" height="2" rx="1" fill={C.glass} opacity={0.35} />
      <rect x="10" y="143" width="28" height="2" rx="1" fill={C.glass} opacity={0.35} />
      {/* 연필 오른손 */}
      <Arm x={154} y={145} rot="rotate(18 154 145)" />
      <Hand cx={185} cy={154} />
      <rect x="188" y="130" width="7" height="26" rx="3.5"
        fill="#C4B5FD" stroke={C.outline} strokeWidth="1.5"
        transform="rotate(20 188 130)" />
      <Body />
      <Head />
    </>
  )
}

const POSE_MAP: Record<VisiPose, React.ReactNode> = {
  default:   <PoseDefault />,
  thumbsUp:  <PoseThumbsUp />,
  wave:      <PoseWave />,
  thinking:  <PoseThinking />,
  typing:    <PoseTyping />,
  pointing:  <PosePointing />,
  magnify:   <PoseMagnify />,
  happy:     <PoseHappy />,
  cheering:  <PoseCheering />,
  writing:   <PoseWriting />,
}

export function VisiMascot({
  pose = 'default',
  size = 120,
  className = '',
  bubble,
  bubbleDir = 'right',
}: VisiMascotProps) {
  const height = Math.round(size * (280 / 200))

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {bubble && (
        <div
          className="absolute z-10 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap"
          style={{
            top: 0,
            ...(bubbleDir === 'right'
              ? { right: '100%', marginRight: 8 }
              : { left: '100%', marginLeft: 8 }),
          }}
        >
          {bubble}
          <span
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              ...(bubbleDir === 'right'
                ? { right: -6, borderLeft: '6px solid white', borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }
                : { left: -6, borderRight: '6px solid white', borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }),
            }}
          />
        </div>
      )}
      <svg
        width={size}
        height={height}
        viewBox="0 0 200 280"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {POSE_MAP[pose]}
      </svg>
    </div>
  )
}
