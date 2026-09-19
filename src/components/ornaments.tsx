/** 请柬装饰：自绘 SVG，不引用外部图库。 */

export function Bamboo({ stroke = '#3d0a10', className }: { stroke?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 8 v584" strokeWidth="3.2" opacity="0.55" />
        <path d="M30 70 h0 M22 70 q8 -2 16 0" strokeWidth="1.6" opacity="0.5" />
        <path d="M30 160 q8 -2 16 0 M22 160 q8 -2 16 0" strokeWidth="1.6" opacity="0.5" />
        <path d="M30 270 q8 -2 16 0" strokeWidth="1.6" opacity="0.5" />
        <path d="M30 390 q8 -2 16 0" strokeWidth="1.6" opacity="0.5" />
        <path d="M30 510 q8 -2 16 0" strokeWidth="1.6" opacity="0.5" />
        <path d="M30 95 q28 -38 36 -8" strokeWidth="1.5" opacity="0.4" />
        <path d="M30 95 q-26 -32 -32 -4" strokeWidth="1.5" opacity="0.4" />
        <path d="M30 220 q30 -40 38 -6" strokeWidth="1.5" opacity="0.38" />
        <path d="M30 220 q-28 -34 -34 -4" strokeWidth="1.5" opacity="0.38" />
        <path d="M30 350 q26 -36 34 -8" strokeWidth="1.5" opacity="0.36" />
        <path d="M30 470 q28 -38 36 -6" strokeWidth="1.5" opacity="0.36" />
        <path d="M58 40 v540" strokeWidth="2.2" opacity="0.32" />
        <path d="M58 130 q18 -28 22 -4" strokeWidth="1.2" opacity="0.3" />
        <path d="M58 280 q-16 -24 -20 -2" strokeWidth="1.2" opacity="0.3" />
        <path d="M58 420 q18 -26 20 -4" strokeWidth="1.2" opacity="0.28" />
      </g>
    </svg>
  )
}

export function Clouds({ fill = '#d4af37', className }: { fill?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 36" aria-hidden="true">
      <path
        fill={fill}
        d="M12 24c6-14 22-18 32-8 8-12 28-12 34 0 8-10 26-10 32 2 6-8 20-8 26 0 8 0 16 6 16 14H8c0-8 4-10 4-8z"
      />
    </svg>
  )
}

export function Flourish({ stroke = '#b8963e', className }: { stroke?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 20" aria-hidden="true">
      <path
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        d="M4 10 C28 10, 36 4, 52 10 S76 16, 80 10 S108 4, 128 10 S152 10, 156 10"
      />
      <circle cx="80" cy="10" r="2.2" fill={stroke} />
    </svg>
  )
}

export function WaxSeal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#c4a24a" />
      <circle cx="32" cy="32" r="23" fill="#a88432" />
      <circle cx="32" cy="32" r="20" fill="#d4b56a" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="22"
        fontFamily="SimSun, STSong, serif"
        fill="#6b1018"
        fontWeight="700"
      >
        囍
      </text>
    </svg>
  )
}

export function Bouquet({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 280 220" aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M140 210 C136 160, 128 130, 118 96" stroke="#7a8a5a" strokeWidth="3" />
        <path d="M140 210 C144 158, 152 128, 164 94" stroke="#7a8a5a" strokeWidth="3" />
        <path d="M140 210 C140 150, 140 120, 140 88" stroke="#6d7d50" strokeWidth="2.4" />
        <ellipse cx="108" cy="78" rx="28" ry="42" fill="#f3eee4" stroke="#d7cfc0" transform="rotate(-18 108 78)" />
        <ellipse cx="140" cy="70" rx="30" ry="46" fill="#f7f3ea" stroke="#d7cfc0" />
        <ellipse cx="174" cy="80" rx="26" ry="40" fill="#efe8dc" stroke="#d7cfc0" transform="rotate(16 174 80)" />
        <ellipse cx="126" cy="96" rx="18" ry="26" fill="#e6ddd0" opacity="0.9" />
        <circle cx="140" cy="92" r="7" fill="#cfc3a8" />
        <path d="M96 120 C80 108, 74 88, 86 74" stroke="#8a9a68" strokeWidth="2" />
        <path d="M186 122 C204 108, 208 88, 194 76" stroke="#8a9a68" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function CornerCloud({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        d="M8 48 V16 Q8 8 16 8 H48 M14 48 V20 Q14 14 20 14 H48"
      />
    </svg>
  )
}
