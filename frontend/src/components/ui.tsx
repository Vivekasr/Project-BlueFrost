/* BlueFrost UI primitives */

import React, { useState } from 'react';
import { BF_EMBLEMS, Compass, Contours } from './art';

/* ---------- Icon ---------- */
export function Icon({ name, size = 18, stroke = 'currentColor', sw = 1.8 }: {
  name: string; size?: number; stroke?: string; sw?: number;
}) {
  const paths: Record<string, React.ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    eye:  <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    'eye-off': <><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>,
    pin:  <><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    back:  <path d="M19 12H5M11 18l-6-6 6-6" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

/* ---------- Mobile StatusBar ---------- */
export function StatusBar({ dark = false }) {
  const col = dark ? '#FEFCF6' : '#2F4156';
  return (
    <div className="bf-status" style={{ color: col }}>
      <span>9:41</span>
      <span className="bf-status-icons">
        <svg width="17" height="11" viewBox="0 0 17 11" fill={col}>
          <rect x="0" y="7" width="3" height="4" rx=".5"/>
          <rect x="4.5" y="5" width="3" height="6" rx=".5"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx=".5"/>
          <rect x="13.5" y="0" width="3" height="11" rx=".5"/>
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke={col} strokeWidth="1.1">
          <path d="M1 6c4-5 10-5 14 0M3.5 8.2c2.6-3 6.4-3 9 0" strokeLinecap="round"/>
          <circle cx="8" cy="10" r=".9" fill={col} stroke="none"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="1" y="1" width="20" height="10" rx="2.5" stroke={col} strokeOpacity=".5"/>
          <rect x="2.5" y="2.5" width="15" height="7" rx="1.2" fill={col}/>
          <rect x="22.5" y="4" width="1.6" height="4" rx=".8" fill={col} fillOpacity=".5"/>
        </svg>
      </span>
    </div>
  );
}

/* ---------- Wordmark ---------- */
export function Wordmark({ size = 26, dark = false }) {
  return (
    <span className="bf-wordmark" style={{ fontSize: size, color: dark ? '#FEFCF6' : undefined }}>
      <Compass size={size * 1.05} stroke={dark ? '#FEFCF6' : '#2F4156'} />
      <span>
        <span style={dark ? { color: '#FEFCF6' } : undefined}>Blue</span>
        <span className="frost">Frost</span>
      </span>
    </span>
  );
}

/* ---------- Field (static display) ---------- */
export function Field({ label, icon, value, placeholder, focus = false, type, dark = false }: {
  label?: string; icon?: string; value?: string; placeholder?: string;
  focus?: boolean; type?: string; dark?: boolean;
}) {
  return (
    <div className="bf-field">
      {label && <span className="bf-flabel" style={dark ? { color: 'rgba(254,252,246,.7)' } : undefined}>{label}</span>}
      <div className={'bf-input' + (focus ? ' focus' : '')}>
        {icon && <span className="ico"><Icon name={icon} size={18} /></span>}
        {value ? <span>{value}</span> : <span className="ph">{placeholder}</span>}
        {type === 'password' && <span className="bf-eye"><Icon name="eye" size={18} /></span>}
      </div>
    </div>
  );
}

/* ---------- InputField (interactive) ---------- */
export function InputField({ label, icon, placeholder, type = 'text', value, onChange, autoFocus, dark = false }: {
  label?: string; icon?: string; placeholder?: string; type?: string;
  value: string; onChange: (v: string) => void; autoFocus?: boolean; dark?: boolean;
}) {
  const [showPw, setShowPw] = useState(false);
  const realType = type === 'password' ? (showPw ? 'text' : 'password') : type;

  return (
    <div className="bf-field">
      {label && <span className="bf-flabel" style={dark ? { color: 'rgba(254,252,246,.7)' } : undefined}>{label}</span>}
      <div className="bf-input-icon-wrap">
        {icon && (
          <span className="input-icon">
            <Icon name={icon} size={18} stroke="var(--sage)" />
          </span>
        )}
        <input
          className="bf-input-real"
          style={icon ? undefined : { paddingLeft: 16 }}
          type={realType}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoFocus={autoFocus}
        />
        {type === 'password' && (
          <button type="button" className="input-icon-right" onClick={() => setShowPw(p => !p)} tabIndex={-1}>
            <Icon name={showPw ? 'eye-off' : 'eye'} size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Btn ---------- */
export function Btn({ kind = 'primary', children, icon, arrow, onClick, type = 'button' }: {
  kind?: 'primary' | 'ghost' | 'rose' | 'text';
  children: React.ReactNode; icon?: string; arrow?: boolean;
  onClick?: () => void; type?: 'button' | 'submit';
}) {
  return (
    <button type={type} className={`bf-btn bf-btn-${kind}`} onClick={onClick}>
      {icon && <Icon name={icon} size={18} stroke="currentColor" />}
      {children}
      {arrow && <Icon name="arrow" size={18} stroke="currentColor" />}
    </button>
  );
}

/* ---------- Social buttons ---------- */
const GoogleG = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#2F4156" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.2c0 5-3.6 8.3-9 8.3a8.5 8.5 0 1 1 5.8-14.7" />
    <path d="M12.5 11.8H21" />
  </svg>
);
const AppleG = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="#2F4156">
    <path d="M16 3c.1 1.2-.4 2.3-1.1 3.1-.8.9-2 1.5-3 1.4-.1-1.2.4-2.4 1.1-3.1C13.8 3.5 15 3 16 3zm3.3 14.6c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.1-4 3.1-1.5 0-1.9-1-3.9-1-2 0-2.5 1-3.9 1-1.7 0-3-1.6-4-3C-.8 17 .3 11.4 3.3 9.8c1-.6 2.1-.9 3-.9 1.5 0 2.4 1 3.9 1 1.4 0 2.2-1 3.9-1 .9 0 2.6.3 3.8 1.6-3.3 1.9-2.8 6.7 1.4 8.1z" />
  </svg>
);

export function Social({ provider, compact = false, onClick }: {
  provider: 'Google' | 'Apple' | 'Email'; compact?: boolean; onClick?: () => void;
}) {
  return (
    <button type="button" className="bf-social" onClick={onClick}>
      {provider === 'Google' ? <GoogleG /> : provider === 'Apple' ? <AppleG /> : <Icon name="mail" size={18} stroke="#2F4156" />}
      {compact ? provider : 'Continue with ' + provider}
    </button>
  );
}

/* ---------- Progress steps ---------- */
export function Steps({ n = 4, active = 0 }) {
  return (
    <div className="bf-steps">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} className={i <= active ? 'on' : ''} />
      ))}
    </div>
  );
}

/* ---------- Back button ---------- */
export function BackBtn({ dark = false, onClick }: { dark?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: 40, height: 40, borderRadius: 12,
        border: '1.5px solid ' + (dark ? 'rgba(254,252,246,.3)' : 'rgba(47,65,86,.16)'),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: dark ? '#FEFCF6' : '#2F4156',
        background: 'transparent', cursor: 'pointer',
      }}
    >
      <Icon name="back" size={18} />
    </button>
  );
}

/* ---------- Animated Loading Medallion ---------- */
export function LoadingMedallion({ size = 220, dark = false }) {
  const ink = dark ? '#FEFCF6' : '#2F4156';
  const inner = size * 0.52;
  const delay = (i: number) => `${-i * 0.5}s`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* rotating bezel */}
        <div className="bf-ld-ring">
          <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="47" stroke={ink} strokeWidth="0.8" strokeOpacity=".35" />
            <circle cx="50" cy="50" r="40" stroke={ink} strokeWidth="0.8" strokeDasharray="1.5 4" strokeOpacity=".5" />
            {Array.from({ length: 48 }).map((_, i) => {
              const a = i * 7.5 * Math.PI / 180;
              const big = i % 4 === 0;
              const r2 = big ? 40 : 43.5;
              return (
                <line key={i}
                  x1={50 + 47 * Math.cos(a)} y1={50 + 47 * Math.sin(a)}
                  x2={50 + r2 * Math.cos(a)} y2={50 + r2 * Math.sin(a)}
                  stroke={ink} strokeWidth={big ? 1.1 : 0.7} strokeOpacity={big ? '.7' : '.4'}
                />
              );
            })}
            {(['N', 'E', 'S', 'W'] as const).map((t, i) => {
              const a = (i * 90 - 90) * Math.PI / 180;
              return (
                <text key={t}
                  x={50 + 33 * Math.cos(a)} y={50 + 33 * Math.sin(a) + 3}
                  fontFamily="DM Serif Display, serif" fontSize="7"
                  fill={ink} fillOpacity=".75" textAnchor="middle"
                >{t}</text>
              );
            })}
            <path d="M50 6 L52.4 50 L50 50 Z" fill="#AC8087" />
            <path d="M50 6 L47.6 50 L50 50 Z" fill={ink} fillOpacity=".7" />
          </svg>
        </div>
        {/* inner disc */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: inner + 26, height: inner + 26,
          transform: 'translate(-50%,-50%)', borderRadius: '50%',
          background: dark ? 'rgba(254,252,246,.06)' : 'rgba(245,239,235,.9)',
          boxShadow: dark ? 'inset 0 0 0 1px rgba(254,252,246,.12)' : 'inset 0 0 0 1px rgba(47,65,86,.08)',
        }} />
        {/* spinning + cross-fading emblems */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: inner, height: inner, transform: 'translate(-50%,-50%)',
        }}>
          <div className="bf-ld-wrap" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {BF_EMBLEMS.map((e, i) => (
              <div key={e.key}
                className={'bf-ld-cell' + (i === 0 ? ' first' : '')}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animationDelay: delay(i),
                }}
              >
                <e.Art size={inner} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* label */}
      <div style={{ textAlign: 'center' }}>
        <div className="bf-kicker solo" style={{ color: dark ? 'rgba(254,252,246,.65)' : '#AC8087', justifyContent: 'center' }}>
          Charting your course
        </div>
        <div style={{ position: 'relative', height: 26, marginTop: 6 }}>
          {BF_EMBLEMS.map((e, i) => (
            <div key={e.key}
              className={'bf-ld-label' + (i === 0 ? ' first' : '')}
              style={{
                position: 'absolute', inset: 0,
                fontFamily: 'var(--serif)', fontSize: 19, color: ink,
                letterSpacing: '.3px', animationDelay: delay(i),
              }}
            >{e.label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Mini Map ---------- */
export function MapMini({ w = 320, h = 200, r = 16 }: { w?: number; h?: number; r?: number }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r, overflow: 'hidden',
      position: 'relative', background: '#EEF3F7', border: '1.5px solid rgba(47,65,86,.16)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(47,65,86,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(47,65,86,.06) 1px,transparent 1px)',
        backgroundSize: '22px 22px',
      }} />
      <svg width={w} height={h} viewBox="0 0 320 200" fill="none" style={{ position: 'absolute', inset: 0 }}>
        <path d="M-10 120 Q60 80 110 110 T230 95 Q290 80 340 110 L340 210 L-10 210 Z" fill="#CBD9E6" fillOpacity=".7" />
        <path d="M40 40 Q90 20 140 45 Q180 65 150 95 Q110 120 70 95 Q30 70 40 40 Z" fill="#F5EFEB" stroke="#5E6C5B" strokeOpacity=".4" strokeDasharray="3 4" />
        <path d="M70 150 C 120 120, 130 80, 180 70 S 250 60, 270 40" stroke="#AC8087" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
      </svg>
      {([[72, 150, '#5E6C5B'], [180, 72, '#AC8087'], [268, 42, '#2F4156']] as const).map(([x, y, c], i) => (
        <div key={i} style={{ position: 'absolute', left: x - 11, top: y - 26 }}>
          <svg width="22" height="28" viewBox="0 0 22 28" fill={c}>
            <path d="M11 27C11 27 20 16 20 9A9 9 0 0 0 2 9c0 7 9 18 9 18z" />
            <circle cx="11" cy="9" r="3.4" fill="#fff" />
          </svg>
        </div>
      ))}
      <div style={{ position: 'absolute', right: 12, bottom: 10, opacity: .8 }}>
        <Compass size={40} />
      </div>
    </div>
  );
}

/* ---------- Password strength ---------- */
function getPwStrength(pw: string): 0 | 1 | 2 | 3 | 4 {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score as 0 | 1 | 2 | 3 | 4;
}
const PW_LABELS = ['', 'Weak', 'Fair', 'Strong', 'Strong'];
const PW_COLORS = ['', 'active-1', 'active-2', 'active-3', 'active-4'];

export function PasswordStrength({ password }: { password: string }) {
  const strength = getPwStrength(password);
  if (!password) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
      <div className="pw-bar">
        {[1, 2, 3, 4].map(n => (
          <span key={n} className={n <= strength ? PW_COLORS[strength] : ''} />
        ))}
      </div>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: strength >= 3 ? 'var(--sage)' : strength >= 2 ? '#E8B84B' : 'var(--rose)', whiteSpace: 'nowrap' }}>
        {PW_LABELS[strength]}
      </span>
    </div>
  );
}

/* ---------- Brand panel (web desktop) ---------- */
export function BrandPanel({ kicker = 'Field guide to the unknown', title, sub }: {
  kicker?: string; title: React.ReactNode; sub: string;
}) {
  return (
    <div className="bf-web-brand bf-navy-grid">
      <div style={{ position: 'absolute', right: -90, top: -70, opacity: .2 }}>
        <Compass size={360} stroke="#FEFCF6" />
      </div>
      <Contours width={500} height={300} color="#FEFCF6" opacity={0.08} style={{ position: 'absolute', bottom: 0, left: 0 }} />
      <Wordmark size={26} dark />
      <div style={{ position: 'relative' }}>
        <div className="bf-kicker solo" style={{ color: 'var(--sky)' }}>{kicker}</div>
        <h1 className="bf-h1" style={{ color: 'var(--cream)', fontSize: 46, marginTop: 16 }}>{title}</h1>
        <p className="bf-sub" style={{ color: 'rgba(254,252,246,.78)', marginTop: 16, fontSize: 16, maxWidth: 360 }}>{sub}</p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {BF_EMBLEMS.map((e) => (
          <div key={e.key} style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(254,252,246,.1)', border: '1px solid rgba(254,252,246,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <e.Art size={38} />
          </div>
        ))}
      </div>
    </div>
  );
}

