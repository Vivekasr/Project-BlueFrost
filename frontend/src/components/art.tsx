/* BlueFrost — flat-vector emblems + cartographic motifs.
   Palette: navy #2F4156 lines, fills sand/sage/rose/sky. */

const C = {
  navy: '#2F4156',
  sand: '#F5EFEB',
  sage: '#5E6C5B',
  rose: '#AC8087',
  sky: '#CBD9E6',
  cream: '#FEFCF6',
};

interface SvgProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

function Emblem({ size = 120, children, vb = '0 0 100 100', style, className }: SvgProps & { children: React.ReactNode; vb?: string }) {
  return (
    <svg
      width={size} height={size} viewBox={vb} fill="none"
      stroke={C.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      style={style} className={className}
    >
      {children}
    </svg>
  );
}

/* 1 — Archaeologist · pith helmet over crossed trowel & brush */
export function ArtHelmet({ size = 120, ...p }: SvgProps) {
  return (
    <Emblem size={size} {...p}>
      <g transform="rotate(38 50 74)">
        <rect x="47" y="58" width="6" height="30" rx="3" fill={C.sky} />
        <path d="M44 88 h12 l-3 7 h-6 Z" fill={C.sky} />
      </g>
      <g transform="rotate(-38 50 74)">
        <rect x="47.5" y="60" width="5" height="26" rx="2.5" fill={C.rose} />
        <path d="M45 86 q5 9 10 0 Z" fill={C.rose} />
        <line x1="46" y1="89" x2="46" y2="94" stroke={C.rose} strokeWidth="1.6" />
        <line x1="50" y1="90" x2="50" y2="95" stroke={C.rose} strokeWidth="1.6" />
        <line x1="54" y1="89" x2="54" y2="94" stroke={C.rose} strokeWidth="1.6" />
      </g>
      <path d="M24 56 Q24 26 50 26 Q76 26 76 56 Z" fill={C.sand} />
      <path d="M26 50 Q50 58 74 50 L74 56 Q50 64 26 56 Z" fill={C.sage} stroke="none" />
      <path d="M26 50 Q50 58 74 50" />
      <path d="M26 56 Q50 64 74 56" />
      <ellipse cx="50" cy="57" rx="37" ry="9" fill={C.sand} />
      <path d="M24 56 Q24 26 50 26 Q76 26 76 56" />
      <circle cx="50" cy="24" r="2.6" fill={C.navy} stroke="none" />
      <line x1="40" y1="40" x2="40" y2="46" strokeWidth="1.8" />
      <line x1="60" y1="40" x2="60" y2="46" strokeWidth="1.8" />
    </Emblem>
  );
}

/* 2 — Ciphers · curled parchment with glyphs + key */
export function ArtCipher({ size = 120, ...p }: SvgProps) {
  return (
    <Emblem size={size} {...p}>
      <rect x="32" y="20" width="36" height="60" rx="7" fill={C.sand} />
      <line x1="32" y1="29" x2="68" y2="29" strokeWidth="1.6" />
      <line x1="32" y1="71" x2="68" y2="71" strokeWidth="1.6" />
      <line x1="39" y1="38" x2="49" y2="38" strokeWidth="1.8" stroke={C.navy} />
      <circle cx="58" cy="38" r="3" stroke={C.rose} strokeWidth="1.8" />
      <path d="M39 47 l4 -4 4 4" stroke={C.sage} strokeWidth="1.8" />
      <line x1="53" y1="47" x2="61" y2="47" strokeWidth="1.8" />
      <path d="M40 57 l5 5 m0 -5 l-5 5" stroke={C.rose} strokeWidth="1.8" />
      <line x1="54" y1="60" x2="61" y2="60" strokeWidth="1.8" stroke={C.sage} />
      <g transform="rotate(28 60 70)">
        <circle cx="46" cy="70" r="5.5" fill={C.sky} />
        <circle cx="46" cy="70" r="1.8" fill={C.navy} stroke="none" />
        <line x1="51" y1="70" x2="68" y2="70" strokeWidth="2.6" />
        <line x1="63" y1="70" x2="63" y2="75" strokeWidth="2.2" />
        <line x1="67" y1="70" x2="67" y2="75" strokeWidth="2.2" />
      </g>
    </Emblem>
  );
}

/* 3 — Pirates · Jolly Roger skull & crossbones */
export function ArtSkull({ size = 120, ...p }: SvgProps) {
  return (
    <Emblem size={size} {...p}>
      {([45, -45] as const).map((r, i) => (
        <g key={i} transform={`rotate(${r} 50 52)`}>
          <rect x="20" y="48" width="60" height="7" rx="3.5" fill={C.sand} />
          <circle cx="22" cy="51.5" r="6" fill={C.sand} />
          <circle cx="78" cy="51.5" r="6" fill={C.sand} />
        </g>
      ))}
      <path d="M32 40 a18 17 0 0 1 36 0 v9 a6 6 0 0 1 -4 6 q-1 7 -7 7 h-14 q-6 0 -7 -7 a6 6 0 0 1 -4 -6 Z" fill={C.sand} />
      <circle cx="42" cy="41" r="5.2" fill={C.navy} stroke="none" />
      <circle cx="58" cy="41" r="5.2" fill={C.navy} stroke="none" />
      <path d="M50 47 l-3.5 6 h7 Z" fill={C.navy} stroke="none" />
      <line x1="46" y1="61" x2="46" y2="66" strokeWidth="1.8" />
      <line x1="50" y1="62" x2="50" y2="67" strokeWidth="1.8" />
      <line x1="54" y1="61" x2="54" y2="66" strokeWidth="1.8" />
    </Emblem>
  );
}

/* 4 — Treasure hunter · open chest with gem + coins */
export function ArtChest({ size = 120, ...p }: SvgProps) {
  return (
    <Emblem size={size} {...p}>
      <path d="M50 16 l8 8 -8 9 -8 -9 Z" fill={C.sky} />
      <line x1="42" y1="24" x2="58" y2="24" strokeWidth="1.4" />
      <path d="M26 50 q0 -18 24 -18 q24 0 24 18 Z" fill={C.rose} />
      <path d="M26 50 q0 -18 24 -18 q24 0 24 18" />
      <path d="M26 50 h48 v22 a3 3 0 0 1 -3 3 h-42 a3 3 0 0 1 -3 -3 Z" fill={C.sand} />
      <line x1="26" y1="50" x2="74" y2="50" strokeWidth="2.4" />
      <line x1="38" y1="33" x2="38" y2="75" strokeWidth="2" />
      <line x1="62" y1="33" x2="62" y2="75" strokeWidth="2" />
      <rect x="44" y="48" width="12" height="13" rx="2.5" fill={C.sage} />
      <circle cx="50" cy="53" r="1.8" fill={C.cream} stroke="none" />
      <line x1="50" y1="54" x2="50" y2="58" stroke={C.cream} strokeWidth="1.6" />
      <circle cx="34" cy="80" r="5" fill={C.rose} />
      <circle cx="46" cy="82" r="5" fill={C.sage} />
      <circle cx="58" cy="80" r="5" fill={C.rose} />
    </Emblem>
  );
}

export const BF_EMBLEMS = [
  { key: 'archaeologist', label: 'Archaeologist', Art: ArtHelmet },
  { key: 'cipher',        label: 'Cipher',        Art: ArtCipher },
  { key: 'pirate',        label: 'Pirate',        Art: ArtSkull  },
  { key: 'treasure',      label: 'Treasure',      Art: ArtChest  },
] as const;

/* Compass rose */
export function Compass({ size = 120, stroke = C.navy, faded = false, style, className }: SvgProps & { stroke?: string; faded?: boolean }) {
  const op = faded ? 0.5 : 1;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity: op, ...style }} className={className}>
      <circle cx="50" cy="50" r="46" stroke={stroke} strokeWidth="1.4" />
      <circle cx="50" cy="50" r="38" stroke={stroke} strokeWidth="1" strokeDasharray="2 4" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15) * Math.PI / 180, r1 = 46, r2 = i % 6 === 0 ? 38 : 42;
        return (
          <line key={i}
            x1={50 + r1 * Math.cos(a)} y1={50 + r1 * Math.sin(a)}
            x2={50 + r2 * Math.cos(a)} y2={50 + r2 * Math.sin(a)}
            stroke={stroke} strokeWidth="1.1"
          />
        );
      })}
      <path d="M50 8 L56 50 L50 50 Z" fill="#AC8087" />
      <path d="M50 8 L44 50 L50 50 Z" fill={stroke} fillOpacity=".85" />
      <path d="M50 92 L56 50 L50 50 Z" fill={stroke} fillOpacity=".5" />
      <path d="M50 92 L44 50 L50 50 Z" fill={stroke} fillOpacity=".7" />
      <path d="M8 50 L50 56 L50 50 Z" fill={stroke} fillOpacity=".6" />
      <path d="M8 50 L50 44 L50 50 Z" fill={stroke} fillOpacity=".4" />
      <path d="M92 50 L50 56 L50 50 Z" fill={stroke} fillOpacity=".4" />
      <path d="M92 50 L50 44 L50 50 Z" fill={stroke} fillOpacity=".6" />
      {[45, 135, 225, 315].map((d) => (
        <line key={d} x1="50" y1="50"
          x2={50 + 30 * Math.cos(d * Math.PI / 180)}
          y2={50 + 30 * Math.sin(d * Math.PI / 180)}
          stroke={stroke} strokeWidth="1"
        />
      ))}
      <circle cx="50" cy="50" r="4" fill={stroke} />
      {(['N', 'E', 'S', 'W'] as const).map((t, i) => {
        const a = (i * 90 - 90) * Math.PI / 180;
        return (
          <text key={t}
            x={50 + 31 * Math.cos(a)} y={50 + 31 * Math.sin(a) + 3.4}
            fontFamily="DM Serif Display, Georgia, serif" fontSize="9"
            fill={stroke} textAnchor="middle"
          >{t}</text>
        );
      })}
    </svg>
  );
}

/* Faint contour-line motif for backgrounds */
export function Contours({ width = 400, height = 400, color = C.navy, opacity = 0.07, style }: {
  width?: number; height?: number; color?: string; opacity?: number; style?: React.CSSProperties;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice"
      stroke={color} strokeWidth="1.4" style={{ opacity, ...style }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M-20 ${120 + i * 50} C 80 ${80 + i * 50}, 150 ${170 + i * 50}, 230 ${120 + i * 50} S 380 ${70 + i * 50}, 430 ${130 + i * 50}`} />
      ))}
      <path d="M150 250 q40 -50 90 -10 q40 40 10 90 q-40 40 -90 10 q-40 -40 -10 -90 Z" />
      <path d="M165 250 q30 -34 70 -6 q30 30 6 70 q-30 30 -70 6 q-30 -30 -6 -70 Z" />
    </svg>
  );
}
