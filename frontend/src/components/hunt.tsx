/* BlueFrost hunt play / solve components + sample data */

import React from 'react';
import { Compass } from './art';
import { CrestAvatar } from './profile';
import { DiffPips, StarFilled, CatGlyph, FIcon } from './feed';

/* ---------- types ---------- */
export interface HuntClue {
  id: string;
  type: 'text' | 'image' | 'map' | 'video';
  label: string;
  prompt: string;
  note: string;
  placeholder: string;
  answers: string[];
  hint: string;
  solvedLabel: string;
  lanterns?: number;
  plate?: string;
  reveal?: string;
  poster?: string;
}

export interface HuntData {
  id: string;
  title: string;
  author: string;
  crest: 0 | 1 | 2 | 3;
  cat: 0 | 1 | 2 | 3;
  diff: 1 | 2 | 3 | 4 | 5;
  players: string;
  rating: string;
  reviews: number;
  blurb: string;
  prize: string;
}

export interface GameState {
  clues: HuntClue[];
  solvedCount: number;
  activeIndex: number;
  attempts: Record<string, number>;
  hints: Record<string, boolean>;
  justSolved: string | null;
  submit: (clueId: string, value: string) => boolean;
  useHint: (clueId: string) => void;
  restart: () => void;
  done: boolean;
}

/* ---------- sample data ---------- */
export const HUNT_DATA: HuntData = {
  id: 'h1',
  title: 'The Drowned Cathedral',
  author: 'Asa Frost',
  crest: 0,
  cat: 0,
  diff: 4,
  players: '840',
  rating: '4.9',
  reviews: 212,
  blurb: 'Five tides ago the old cathedral slipped beneath the harbour. Follow what it left above the waterline.',
  prize: 'The Tidewatcher’s Seal',
};

export const CLUES_DATA: HuntClue[] = [
  {
    id: 'c1',
    type: 'text',
    label: 'The Opening Riddle',
    prompt: 'Where the bells once drowned, one light still keeps its watch above the tide. Begin where that light still turns.',
    note: 'Answer with the structure the verse points to.',
    placeholder: 'Name the structure…',
    answers: ['lighthouse', 'the old lighthouse', 'meridian lighthouse', 'light house'],
    hint: 'It turns through the night and warns ships off the rocks. One word.',
    solvedLabel: 'The Lighthouse',
  },
  {
    id: 'c2',
    type: 'image',
    label: 'The North Door',
    prompt: 'Climb to the lighthouse gallery and face the drowned nave. Above the carved north door, count the lanterns set into the arch.',
    note: 'Enter the number of lanterns.',
    placeholder: 'Enter a number…',
    answers: ['7', 'seven'],
    lanterns: 7,
    plate: 'Plate I · The North Door',
    hint: 'Count only the lanterns resting inside the stone arch — not the two on the posts.',
    solvedLabel: '7 lanterns',
  },
  {
    id: 'c3',
    type: 'map',
    label: 'The Crossing',
    prompt: 'From the door, walk the shore until two old roads meet the water. Name the quay that holds the crossing.',
    note: 'Name the quay marked on the chart.',
    placeholder: 'Name the quay…',
    answers: ['saltmere', 'saltmere quay', 'the saltmere quay'],
    hint: 'It shares its name with a salt-marsh town to the east. The label sits beside the pin.',
    solvedLabel: 'Saltmere Quay',
  },
  {
    id: 'c4',
    type: 'video',
    label: 'The Low Tide',
    prompt: 'Wait at the quay for the ebb. As the water draws back it uncovers a line of marker stones. Read the word they spell.',
    note: 'Enter the word in the stones.',
    placeholder: 'Enter the word…',
    answers: ['frost', 'the frost'],
    reveal: 'FROST',
    poster: 'Reel III · The Ebbing Tide',
    hint: 'Five stones, five letters. It is also the name of the cartographer who charted this trail.',
    solvedLabel: 'FROST',
  },
];

/* ---------- HIcon — hunt-specific SVG icons ---------- */
export type HIconName =
  | 'play' | 'pause' | 'lock' | 'unlock' | 'bulb' | 'map' | 'image' | 'video'
  | 'check' | 'arrow' | 'back' | 'refresh' | 'flag' | 'share' | 'text' | 'pin' | 'x'
  | 'chevron' | 'arrowup' | 'arrowdown' | 'copy' | 'trash' | 'plus';

const HICON_PATHS: Record<HIconName, React.ReactNode> = {
  play:     <path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none" />,
  pause:    <><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" /></>,
  lock:     <><rect x="5" y="10.5" width="14" height="9.5" rx="2.2" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" /></>,
  unlock:   <><rect x="5" y="10.5" width="14" height="9.5" rx="2.2" /><path d="M8 10.5V7.5a4 4 0 0 1 7.7-1.5" /><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" /></>,
  bulb:     <><path d="M9 17h6" /><path d="M10 20h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.2 1 2h6c0-.8.3-1.4 1-2A6 6 0 0 0 12 3z" /></>,
  map:      <><path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z" /><path d="M9 4v13M15 6.5v13" /></>,
  image:    <><rect x="3.5" y="5" width="17" height="14" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M5 17l4.5-4 3 2.5L16 12l3.5 4" /></>,
  video:    <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></>,
  check:    <path d="M20 6L9 17l-5-5" />,
  arrow:    <path d="M5 12h14M13 6l6 6-6 6" />,
  back:     <path d="M19 12H5M11 18l-6-6 6-6" />,
  refresh:  <><path d="M20 11a8 8 0 1 0-.5 4" /><path d="M20 5v6h-6" /></>,
  flag:     <><path d="M6 21V4" /><path d="M6 5h11l-2.5 3.5L17 12H6" /></>,
  share:    <><circle cx="6" cy="12" r="2.4" /><circle cx="17" cy="6" r="2.4" /><circle cx="17" cy="18" r="2.4" /><path d="M8.2 11l6.6-3.8M8.2 13l6.6 3.8" /></>,
  text:     <><path d="M5 6h14M5 6V5M19 6V5" /><path d="M12 6v13M9.5 19h5" /></>,
  pin:      <><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  x:        <path d="M6 6l12 12M18 6L6 18" />,
  chevron:  <path d="M9 5l7 7-7 7" />,
  arrowup:  <path d="M12 19V5M5 12l7-7 7 7" />,
  arrowdown:<path d="M12 5v14M5 12l7 7 7-7" />,
  copy:     <><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
  trash:    <><path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></>,
  plus:     <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
};

export function HIcon({ name, size = 18, stroke = 'currentColor', sw = 1.8 }: {
  name: HIconName; size?: number; stroke?: string; sw?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {HICON_PATHS[name]}
    </svg>
  );
}

/* ---------- answer matching ---------- */
export function normalize(s: string): string {
  return String(s || '').toLowerCase().trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/^(the|a|an)\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function checkAnswer(clue: HuntClue, value: string): boolean {
  const v = normalize(value);
  if (!v) return false;
  return clue.answers.some((a) => normalize(a) === v);
}

const TYPE_META: Record<HuntClue['type'], { label: string; icon: HIconName }> = {
  text:  { label: 'Riddle', icon: 'text' },
  image: { label: 'Image',  icon: 'image' },
  map:   { label: 'Map',    icon: 'map' },
  video: { label: 'Video',  icon: 'video' },
};

/* ---------- game state machine ---------- */
const STORE_KEY = 'bf-hunt-progress-v1';

export function useHunt(clues: HuntClue[]): GameState {
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { return {}; } };
  const init = load();

  const [solvedCount, setSolvedCount] = React.useState<number>(init.solvedCount || 0);
  const [attempts, setAttempts] = React.useState<Record<string, number>>(init.attempts || {});
  const [hints, setHints] = React.useState<Record<string, boolean>>(init.hints || {});
  const [justSolved, setJustSolved] = React.useState<string | null>(null);

  React.useEffect(() => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ solvedCount, attempts, hints })); } catch {}
  }, [solvedCount, attempts, hints]);

  const submit = (clueId: string, value: string): boolean => {
    const clue = clues.find((c) => c.id === clueId);
    if (!clue) return false;
    if (checkAnswer(clue, value)) {
      setJustSolved(clueId);
      setSolvedCount((c) => Math.max(c, clues.indexOf(clue) + 1));
      return true;
    }
    setAttempts((a) => ({ ...a, [clueId]: (a[clueId] || 0) + 1 }));
    return false;
  };

  const useHintFn = (clueId: string) => setHints((h) => ({ ...h, [clueId]: true }));

  const restart = () => {
    setSolvedCount(0); setAttempts({}); setHints({}); setJustSolved(null);
    try { localStorage.removeItem(STORE_KEY); } catch {}
  };

  return { clues, solvedCount, activeIndex: solvedCount, attempts, hints, justSolved, submit, useHint: useHintFn, restart, done: solvedCount >= clues.length };
}

/* ---------- HuntMedal — spine medallion ---------- */
export function HuntMedal({ state, n, size = 38 }: { state: 'solved' | 'current' | 'locked'; n: number; size?: number }) {
  if (state === 'solved') {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--sage)', border: '2px solid var(--cream)', boxShadow: '0 3px 9px rgba(94,108,91,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <HIcon name="check" size={size * 0.5} sw={2.6} />
      </div>
    );
  }
  if (state === 'current') {
    return (
      <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--cream)', border: '2.5px solid var(--rose)', boxShadow: '0 4px 12px rgba(172,128,135,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: size * 0.46, color: 'var(--navy)', lineHeight: 1 }}>{n}</span>
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--sand)', border: '1.5px solid rgba(47,65,86,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
      <HIcon name="lock" size={size * 0.44} sw={1.8} />
    </div>
  );
}

/* ---------- TypeChip ---------- */
export function TypeChip({ type, dark = false }: { type: HuntClue['type']; dark?: boolean }) {
  const m = TYPE_META[type];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 11px', borderRadius: 999, background: dark ? 'rgba(254,252,246,.12)' : 'var(--sand)', border: '1px solid rgba(47,65,86,.16)', fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: dark ? 'var(--cream)' : 'rgba(47,65,86,.7)' }}>
      <span style={{ color: 'var(--sage)', display: 'flex' }}><HIcon name={m.icon} size={13} /></span>{m.label}
    </span>
  );
}

/* ---------- AnswerField ---------- */
export function AnswerField({ clue, game, compact = false }: { clue: HuntClue; game: GameState; compact?: boolean }) {
  const [value, setValue] = React.useState('');
  const [wrong, setWrong] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const attempts = game.attempts[clue.id] || 0;
  const hintShown = game.hints[clue.id];

  const submit = () => {
    if (!value.trim()) return;
    const ok = game.submit(clue.id, value);
    if (!ok) {
      setWrong(true);
      if (wrapRef.current?.animate) {
        wrapRef.current.animate(
          [
            { transform: 'translateX(0)' }, { transform: 'translateX(-7px)' },
            { transform: 'translateX(6px)' }, { transform: 'translateX(-4px)' },
            { transform: 'translateX(3px)' }, { transform: 'translateX(0)' },
          ],
          { duration: 440, easing: 'ease-in-out' }
        );
      }
    }
  };

  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') submit(); };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); if (wrong) setWrong(false); };

  return (
    <div style={{ marginTop: compact ? 13 : 16 }}>
      <div ref={wrapRef} style={{ display: 'flex', gap: 9 }}>
        <div style={{ flex: 1, minWidth: 0, height: compact ? 50 : 54, borderRadius: 'var(--r-md)', border: '1.5px solid ' + (wrong ? 'var(--rose)' : 'rgba(47,65,86,.16)'), background: '#fff', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, boxShadow: wrong ? '0 0 0 3px rgba(172,128,135,.16)' : 'none', transition: 'border-color .15s, box-shadow .15s' }}>
          <span style={{ color: wrong ? 'var(--rose)' : 'var(--sage)', display: 'flex', flex: '0 0 auto' }}>
            <HIcon name="flag" size={17} />
          </span>
          <input
            value={value} onChange={onChange} onKeyDown={onKey}
            placeholder={clue.placeholder} spellCheck={false} autoComplete="off"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--sans)', fontSize: compact ? 15 : 15.5, color: 'var(--ink)' }}
          />
        </div>
        <button onClick={submit} className="bf-btn bf-btn-primary" style={{ width: 'auto', height: compact ? 50 : 54, padding: compact ? '0 16px' : '0 22px', flex: '0 0 auto', fontSize: compact ? 13.5 : 14.5 }}>
          Submit<HIcon name="arrow" size={17} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 11, minHeight: 22, flexWrap: 'wrap' }}>
        {wrong ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 600, color: 'var(--rose)' }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', border: '1.6px solid var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HIcon name="x" size={11} sw={2.4} />
            </span>
            Not the mark — try another reading.
            <span style={{ color: 'var(--muted)', fontWeight: 600 }}>· {attempts} {attempts === 1 ? 'attempt' : 'attempts'}</span>
          </span>
        ) : (
          <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{clue.note}</span>
        )}
        {attempts >= 2 && !hintShown && (
          <button onClick={() => game.useHint(clue.id)} style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, color: 'var(--rose)' }}>
            <HIcon name="bulb" size={15} stroke="var(--rose)" />Reveal a hint
          </button>
        )}
      </div>

      {hintShown && (
        <div style={{ marginTop: 4, display: 'flex', gap: 10, padding: compact ? '11px 13px' : '13px 15px', borderRadius: 12, background: 'var(--sand)', border: '1px solid rgba(47,65,86,.16)' }}>
          <span style={{ color: 'var(--rose)', display: 'flex', flex: '0 0 auto', marginTop: 1 }}>
            <HIcon name="bulb" size={17} stroke="var(--rose)" />
          </span>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 3 }}>Cartographer's hint</div>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: compact ? 13.5 : 14.5, color: 'rgba(47,65,86,.7)', lineHeight: 1.45 }}>{clue.hint}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- ImagePlate — engraved arch ---------- */
export function ImagePlate({ clue, compact = false }: { clue: HuntClue; compact?: boolean }) {
  const h = compact ? 168 : 232;
  const n = clue.lanterns || 7;
  const cx = 200, cy = 150, R = 116;
  const lant: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = Math.PI * (1 - t);
    lant.push({ x: cx + R * Math.cos(a), y: cy - R * Math.sin(a) });
  }
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(47,65,86,.16)', background: 'var(--cream)' }}>
      <div style={{ position: 'relative', height: h, background: 'var(--sand)' }} className="bf-grid-fine">
        <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(47,65,86,.16)' }} />
        <div style={{ position: 'absolute', inset: 11, border: '1px solid rgba(47,65,86,.10)' }} />
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" width="100%" height="100%"
          fill="none" stroke="#2F4156" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: 'absolute', inset: 0, display: 'block' }}>
          <line x1="40" y1="244" x2="360" y2="244" strokeOpacity=".5" />
          <path d="M84 244 V150 a116 116 0 0 1 232 0 V244" stroke="#2F4156" strokeWidth="3" fill="rgba(94,108,91,.07)" />
          <path d="M104 244 V150 a96 96 0 0 1 192 0 V244" strokeOpacity=".5" strokeWidth="1.5" />
          <line x1="200" y1="150" x2="200" y2="244" strokeOpacity=".5" />
          {[128, 160, 240, 272].map((x) => <line key={x} x1={x} y1="170" x2={x} y2="238" strokeOpacity=".28" strokeWidth="1.3" />)}
          <path d="M192 36 h16 l4 12 h-24 Z" fill="#AC8087" stroke="#2F4156" strokeWidth="1.5" />
          {lant.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y})`}>
              <line x1="0" y1="-13" x2="0" y2="-8" strokeWidth="1.4" />
              <path d="M-7 -8 h14 l-1.5 13 a5.5 5.5 0 0 1 -11 0 Z" fill="rgba(172,128,135,.92)" stroke="#2F4156" strokeWidth="1.4" />
              <circle cx="0" cy="-1" r="2.4" fill="#FEFCF6" stroke="none" />
            </g>
          ))}
          {([{ x: 84, y: 196 }, { x: 316, y: 196 }] as Array<{ x: number; y: number }>).map((p, i) => (
            <g key={'d' + i} transform={`translate(${p.x} ${p.y})`} opacity=".82">
              <path d="M-6 -7 h12 l-1.3 11 a4.8 4.8 0 0 1 -9.4 0 Z" fill="rgba(203,217,230,.85)" stroke="#2F4156" strokeWidth="1.3" />
            </g>
          ))}
        </svg>
        {(['nw', 'ne', 'sw', 'se'] as const).map((pos) => {
          const s: React.CSSProperties = { position: 'absolute', width: 18, height: 18 };
          if (pos.includes('n')) s.top = 14; else s.bottom = 14;
          if (pos.includes('w')) { s.left = 14; s.borderLeft = '2px solid rgba(47,65,86,.28)'; } else { s.right = 14; s.borderRight = '2px solid rgba(47,65,86,.28)'; }
          if (pos.includes('n')) s.borderTop = '2px solid rgba(47,65,86,.28)'; else s.borderBottom = '2px solid rgba(47,65,86,.28)';
          return <div key={pos} style={s} />;
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderTop: '1px solid rgba(47,65,86,.16)', background: 'var(--cream)' }}>
        <span style={{ color: 'var(--sage)', display: 'flex' }}><HIcon name="image" size={14} /></span>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 12.5, color: 'rgba(47,65,86,.7)' }}>{clue.plate}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>Pinch to zoom</span>
      </div>
    </div>
  );
}

/* ---------- MapTile — harbour chart ---------- */
export function MapTile({ clue, compact = false }: { clue: HuntClue; compact?: boolean }) {
  const h = compact ? 198 : 268;
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(47,65,86,.16)', position: 'relative' }}>
      <div style={{ position: 'relative', height: h, background: '#EAEDE4' }}>
        <svg viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display: 'block' }}>
          <rect x="0" y="0" width="400" height="270" fill="#EAEDE4" />
          <path d="M400 120 C 330 140, 300 200, 250 270 L 400 270 Z" fill="#CBD9E6" />
          <path d="M400 120 C 330 140, 300 200, 250 270" fill="none" stroke="#9DB4C9" strokeWidth="2" />
          <path d="M0 240 C 50 232, 70 250, 80 270 L 0 270 Z" fill="#CBD9E6" />
          <rect x="36" y="40" width="92" height="64" rx="4" fill="#CBD2BE" />
          <path d="M44 96 q14 -34 38 -34 q24 0 38 34" fill="none" stroke="#A7B295" strokeWidth="1.5" />
          {([[150, 36, 70, 48], [232, 36, 64, 48], [150, 100, 70, 52], [36, 120, 84, 56], [150, 164, 60, 48]] as number[][]).map(([x, y, w, hh], i) => (
            <rect key={i} x={x} y={y} width={w} height={hh} rx="3" fill="#E1E2D6" stroke="#D3D4C6" strokeWidth="1" />
          ))}
          {([{ y: 92, w: 13 }, { y: 158, w: 17 }]).map((r, i) => (
            <g key={'h' + i}>
              <line x1="0" y1={r.y} x2="400" y2={r.y} stroke="#C9CBBE" strokeWidth={r.w + 4} />
              <line x1="0" y1={r.y} x2="400" y2={r.y} stroke="#FBFBF7" strokeWidth={r.w} />
            </g>
          ))}
          {([{ d: 'M138 0 L138 270', w: 12 }, { d: 'M300 0 C 300 120, 250 180, 210 270', w: 16 }]).map((r, i) => (
            <g key={'v' + i}>
              <path d={r.d} fill="none" stroke="#C9CBBE" strokeWidth={r.w + 4} />
              <path d={r.d} fill="none" stroke="#FBFBF7" strokeWidth={r.w} />
            </g>
          ))}
          <line x1="0" y1="158" x2="400" y2="158" stroke="#E4C9A6" strokeWidth="1.6" strokeDasharray="7 7" />
          <path d="M138 158 L210 158 L228 214" fill="none" stroke="#AC8087" strokeWidth="2.4" strokeDasharray="2 6" strokeLinecap="round" />
          <text x="150" y="88" fontFamily="Archivo, sans-serif" fontSize="9" fontWeight="600" fill="#8A8C7E" letterSpacing=".5">HARBOUR ROW</text>
          <text x="14" y="154" fontFamily="Archivo, sans-serif" fontSize="9" fontWeight="600" fill="#8A8C7E" letterSpacing=".5">MERIDIAN ST</text>
          <text x="96" y="20" fontFamily="Archivo, sans-serif" fontSize="9" fontWeight="600" fill="#8A8C7E" letterSpacing=".5" transform="rotate(90 142 24)">OLD KILN LN</text>
          <text x="300" y="210" fontFamily="DM Serif Display, serif" fontSize="13" fontStyle="italic" fill="#5E7C93">Saltmere Quay</text>
          <text x="40" y="262" fontFamily="DM Serif Display, serif" fontSize="11" fontStyle="italic" fill="#5E7C93">Aubade Wharf</text>
          <text x="52" y="76" fontFamily="Archivo, sans-serif" fontSize="8.5" fontWeight="600" fill="#7E8A6C" letterSpacing=".5">KILN PARK</text>
        </svg>
        <div style={{ position: 'absolute', left: '57%', top: '79%', transform: 'translate(-50%,-100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: 'var(--navy)', boxShadow: '0 6px 14px rgba(47,65,86,.4)', border: '2px solid var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ transform: 'rotate(45deg)', width: 9, height: 9, borderRadius: '50%', background: 'var(--rose)', display: 'block' }} />
          </div>
        </div>
        <div style={{ position: 'absolute', left: 12, bottom: 10, display: 'flex', alignItems: 'center', gap: 7, padding: '4px 9px', borderRadius: 8, background: 'rgba(254,252,246,.88)', border: '1px solid rgba(47,65,86,.16)' }}>
          <span style={{ width: 26, height: 3, background: 'var(--navy)', display: 'block' }} />
          <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(47,65,86,.7)', letterSpacing: '.4px' }}>200 m</span>
        </div>
        <div style={{ position: 'absolute', right: 11, top: 11, width: 30, height: 30, borderRadius: '50%', background: 'rgba(254,252,246,.9)', border: '1px solid rgba(47,65,86,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Compass size={22} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderTop: '1px solid rgba(47,65,86,.16)', background: 'var(--cream)' }}>
        <span style={{ color: 'var(--sage)', display: 'flex' }}><HIcon name="map" size={14} /></span>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 12.5, color: 'rgba(47,65,86,.7)' }}>Harbour chart · {clue.label}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>Drag to pan</span>
      </div>
    </div>
  );
}

/* ---------- VideoFrame — tide video ---------- */
export function VideoFrame({ clue, compact = false }: { clue: HuntClue; compact?: boolean }) {
  const h = compact ? 178 : 244;
  const DUR = 6500;
  const [playing, setPlaying] = React.useState(false);
  const [p, setP] = React.useState(0);
  const raf = React.useRef(0);
  const t0 = React.useRef(0);

  React.useEffect(() => {
    if (!playing) return;
    t0.current = performance.now() - p * DUR;
    const tick = (now: number) => {
      const np = Math.min(1, (now - t0.current) / DUR);
      setP(np);
      if (np >= 1) { setPlaying(false); return; }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  const toggle = () => {
    if (p >= 1) { setP(0); setPlaying(true); return; }
    setPlaying((v) => !v);
  };

  const word = clue.reveal || 'FROST';
  const letters = word.split('');
  const waterY = 150 - 96 * Math.min(1, Math.max(0, (p - 0.15) / 0.6));
  const reveal = Math.min(1, Math.max(0, (p - 0.45) / 0.35));
  const mm = (ms: number) => { const s = Math.floor(ms / 1000); return '0:' + String(s).padStart(2, '0'); };

  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(47,65,86,.16)' }}>
      <div style={{ position: 'relative', height: h, background: 'var(--navy)', overflow: 'hidden' }}>
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }}>
          <rect x="0" y="0" width="400" height="200" fill="#3a4a5e" />
          <rect x="0" y="0" width="400" height="78" fill="#46566b" />
          <g opacity=".55" stroke="#9fb0c2" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M348 78 L344 36 h12 l-4 42 Z" fill="rgba(203,217,230,.18)" />
            <circle cx="350" cy="32" r="4" fill="rgba(172,128,135,.5)" stroke="none" />
          </g>
          <rect x="0" y="120" width="400" height="80" fill="#5b6472" />
          {letters.map((ch, i) => {
            const x = 60 + i * (280 / Math.max(1, letters.length - 1));
            return (
              <g key={i}>
                <ellipse cx={x} cy="150" rx="22" ry="15" fill="#717a86" stroke="#838c98" strokeWidth="1.5" />
                <text x={x} y="156" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="20"
                  fill="#FEFCF6" opacity={reveal}>{ch}</text>
              </g>
            );
          })}
          <rect x="0" y={waterY} width="400" height={200 - waterY} fill="rgba(120,160,190,.72)" />
          <path d={`M0 ${waterY} q40 -7 80 0 t80 0 t80 0 t80 0 t80 0 V200 H0 Z`} fill="rgba(150,185,210,.55)" />
          <path d={`M0 ${waterY} q40 -7 80 0 t80 0 t80 0 t80 0 t80 0`} fill="none" stroke="rgba(254,252,246,.5)" strokeWidth="1.5" />
        </svg>
        <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}
          style={{ position: 'absolute', inset: 0, margin: 'auto', width: compact ? 56 : 66, height: compact ? 56 : 66, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(254,252,246,.94)', boxShadow: '0 8px 24px rgba(0,0,0,.32)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: playing ? 0 : 1, transition: 'opacity .25s', pointerEvents: playing ? 'none' : 'auto' }}>
          <span style={{ color: 'var(--navy)', display: 'flex', marginLeft: playing ? 0 : 3 }}>
            <HIcon name={playing ? 'pause' : 'play'} size={compact ? 24 : 28} stroke="none" />
          </span>
        </button>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'rgba(47,65,86,.55)', border: '1px solid rgba(254,252,246,.25)', color: 'var(--cream)', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose)', display: 'block' }} />
          {p < 0.75 ? 'Tide ebbing' : 'Low water'}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '10px 12px', background: 'linear-gradient(transparent, rgba(31,42,56,.85))', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span onClick={toggle} style={{ color: 'var(--cream)', display: 'flex', cursor: 'pointer' }}>
            <HIcon name={playing ? 'pause' : 'play'} size={16} stroke="none" />
          </span>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(254,252,246,.28)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: (p * 100) + '%', background: 'var(--rose)', borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: (p * 100) + '%', top: '50%', transform: 'translate(-50%,-50%)', width: 10, height: 10, borderRadius: '50%', background: 'var(--cream)' }} />
          </div>
          <span style={{ color: 'var(--cream)', fontSize: 11, fontVariantNumeric: 'tabular-nums', minWidth: 30 }}>{mm(p * DUR)}</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderTop: '1px solid rgba(47,65,86,.16)', background: 'var(--cream)' }}>
        <span style={{ color: 'var(--sage)', display: 'flex' }}><HIcon name="video" size={14} /></span>
        <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 12.5, color: 'rgba(47,65,86,.7)' }}>{clue.poster}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>Watch to the ebb</span>
      </div>
    </div>
  );
}

/* ---------- ClueMedia dispatcher ---------- */
function ClueMedia({ clue, compact }: { clue: HuntClue; compact: boolean }) {
  if (clue.type === 'image') return <ImagePlate clue={clue} compact={compact} />;
  if (clue.type === 'map')   return <MapTile clue={clue} compact={compact} />;
  if (clue.type === 'video') return <VideoFrame clue={clue} compact={compact} />;
  return null;
}

/* ---------- ClueCard — one clue in its current state ---------- */
export function ClueCard({ clue, index, total, state, game, compact = false, first = false }: {
  clue: HuntClue; index: number; total: number;
  state: 'solved' | 'current' | 'locked';
  game: GameState; compact?: boolean; first?: boolean;
}) {
  const n = index + 1;
  const spineW = compact ? 46 : 54;
  const medal = compact ? 34 : 38;

  const lineCol = state === 'solved' ? 'var(--sage)' : 'rgba(47,65,86,.28)';
  const lineOpacity = state === 'solved' ? 1 : 0.5;

  const Spine = (
    <div style={{ flex: `0 0 ${spineW}px`, position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {!first && <span style={{ position: 'absolute', top: 0, height: medal / 2 + 4, width: 2, background: index <= game.solvedCount ? 'var(--sage)' : 'rgba(47,65,86,.28)', opacity: index <= game.solvedCount ? 1 : 0.5 }} />}
      <span style={{ position: 'absolute', top: medal / 2 + 4, bottom: -2, width: 2, background: lineCol, opacity: lineOpacity }} />
      <div style={{ position: 'relative', zIndex: 2, marginTop: 2 }}>
        <HuntMedal state={state} n={n} size={medal} />
      </div>
    </div>
  );

  let body: React.ReactNode;

  if (state === 'locked') {
    body = (
      <div style={{ flex: 1, minWidth: 0, opacity: .78, border: '1.5px dashed rgba(47,65,86,.28)', borderRadius: 16, background: 'rgba(245,239,235,.5)', padding: compact ? '13px 16px' : '15px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--muted)' }}>Clue {n}</span>
          <span style={{ marginLeft: 'auto', color: 'rgba(47,65,86,.28)', display: 'flex' }}><HIcon name="lock" size={compact ? 18 : 20} /></span>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: compact ? 16.5 : 19, color: 'var(--navy)', filter: 'blur(5px)', userSelect: 'none', opacity: .5, marginTop: 5, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden' }}>{clue.label}</div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6 }}>Locked — solve clue {n - 1} to break the seal.</div>
      </div>
    );
  } else if (state === 'solved') {
    body = (
      <div style={{ flex: 1, minWidth: 0, border: '1.5px solid rgba(94,108,91,.3)', borderRadius: 16, background: 'rgba(94,108,91,.07)', padding: compact ? '13px 15px' : '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--sage)', whiteSpace: 'nowrap' }}>Clue {n} · Solved</span>
          <span style={{ marginLeft: 'auto' }}><TypeChip type={clue.type} /></span>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: compact ? 16.5 : 19, color: 'var(--navy)', lineHeight: 1.12, marginTop: 5 }}>{clue.label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>Your answer</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 24, padding: '0 11px', borderRadius: 999, background: 'var(--cream)', border: '1px solid rgba(94,108,91,.4)', fontFamily: 'var(--serif)', fontSize: 13.5, color: 'var(--navy)' }}>
            <span style={{ color: 'var(--sage)', display: 'flex' }}><HIcon name="check" size={13} sw={2.4} /></span>{clue.solvedLabel}
          </span>
        </div>
      </div>
    );
  } else {
    /* current */
    body = (
      <div style={{ flex: 1, minWidth: 0, border: '1.5px solid var(--navy)', borderRadius: 18, background: '#fff', boxShadow: '0 18px 40px -22px rgba(47,65,86,.5)', overflow: 'hidden' }}>
        <div style={{ padding: compact ? '16px 16px 18px' : '20px 22px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--rose)', whiteSpace: 'nowrap' }}>
              <span style={{ width: 20, height: 1, background: 'var(--rose)', opacity: .6, display: 'block' }} />Clue {n} of {total}
            </span>
            <span style={{ marginLeft: 'auto' }}><TypeChip type={clue.type} /></span>
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: compact ? 20 : 25, color: 'var(--navy)', lineHeight: 1.16, marginBottom: clue.type === 'text' ? 0 : 15 }}>{clue.label}</div>
          {clue.type !== 'text' && <ClueMedia clue={clue} compact={compact} />}
          <div style={{ marginTop: clue.type === 'text' ? 12 : 15, fontFamily: clue.type === 'text' ? 'var(--serif)' : 'var(--sans)', fontStyle: clue.type === 'text' ? 'italic' : 'normal', fontSize: clue.type === 'text' ? (compact ? 17 : 19) : (compact ? 14.5 : 15.5), color: clue.type === 'text' ? 'var(--navy)' : 'rgba(47,65,86,.7)', lineHeight: clue.type === 'text' ? 1.5 : 1.55, ...(clue.type === 'text' ? { borderLeft: '2px solid var(--rose)', paddingLeft: 14 } : {}) }}>
            {clue.prompt}
          </div>
          <AnswerField clue={clue} game={game} compact={compact} />
        </div>
      </div>
    );
  }

  return (
    <div data-clue-index={index} style={{ display: 'flex', gap: compact ? 10 : 14, alignItems: 'stretch' }}>
      {Spine}
      <div style={{ flex: 1, minWidth: 0, paddingBottom: compact ? 16 : 20 }}>{body}</div>
    </div>
  );
}

/* ---------- Completion — wax-seal treasure found ---------- */
export function Completion({ hunt, total, game, compact = false, onRestart }: {
  hunt: HuntData; total: number; game: GameState; compact?: boolean; onRestart: () => void;
}) {
  return (
    <div style={{ display: 'flex', gap: compact ? 10 : 14, alignItems: 'stretch' }}>
      <div style={{ flex: `0 0 ${compact ? 46 : 54}px`, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <span style={{ position: 'absolute', top: 0, height: 22, width: 2, background: 'var(--sage)', display: 'block' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="bf-navy-grid" style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', color: 'var(--cream)', padding: compact ? '30px 22px 26px' : '40px 36px 32px', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 12, border: '1px solid rgba(203,217,230,.28)', borderRadius: 14, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div className="bf-seal" style={{ width: compact ? 88 : 104, height: compact ? 88 : 104, margin: '0 auto' }}>
              <Compass size={compact ? 44 : 52} stroke="#fff" />
            </div>
            <div className="bf-kicker solo" style={{ color: 'var(--sky)', justifyContent: 'center', marginTop: 20 }}>Trail complete</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: compact ? 28 : 36, color: 'var(--cream)', lineHeight: 1.05, marginTop: 8 }}>The treasure is yours</div>
            <div style={{ fontSize: compact ? 13.5 : 14.5, color: 'rgba(254,252,246,.78)', marginTop: 12, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55 }}>
              You followed <i style={{ fontFamily: 'var(--serif)' }}>{hunt.title}</i> to its end and uncovered <b style={{ color: 'var(--cream)' }}>{hunt.prize}</b>.
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, marginTop: 18, padding: '11px 20px', borderRadius: 12, background: 'rgba(254,252,246,.08)', border: '1px solid rgba(203,217,230,.22)' }}>
              <CompletionStat label="Clues" value={total} />
              <span style={{ width: 1, height: 26, background: 'rgba(203,217,230,.25)', display: 'block' }} />
              <CompletionStat label="Hints used" value={Object.keys(game.hints).length} />
              <span style={{ width: 1, height: 26, background: 'rgba(203,217,230,.25)', display: 'block' }} />
              <CompletionStat label="Rank earned" value="Tidewatcher" serif />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
              <button className="bf-btn bf-btn-rose" style={{ width: 'auto', padding: '0 22px', height: 50 }}>
                <HIcon name="flag" size={17} />Claim your seal
              </button>
              <button onClick={onRestart} className="bf-btn" style={{ width: 'auto', padding: '0 20px', height: 50, background: 'transparent', color: 'var(--cream)', border: '1.5px solid rgba(203,217,230,.4)' }}>
                <HIcon name="refresh" size={17} />Replay trail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompletionStat({ label, value, serif = false }: { label: string; value: string | number; serif?: boolean }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: serif ? 17 : 22, color: 'var(--cream)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(203,217,230,.7)', marginTop: 5 }}>{label}</div>
    </div>
  );
}

/* ---------- HuntProgress — progress bar ---------- */
export function HuntProgress({ solved, total, dark = false }: { solved: number; total: number; dark?: boolean }) {
  const pct = Math.round((solved / total) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 7, borderRadius: 4, background: dark ? 'rgba(254,252,246,.18)' : 'rgba(47,65,86,.10)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct + '%', background: solved === total ? 'var(--sage)' : 'var(--rose)', borderRadius: 4, transition: 'width .5s cubic-bezier(.2,.8,.2,1)' }} />
      </div>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, letterSpacing: '.4px', color: dark ? 'var(--cream)' : 'var(--navy)', whiteSpace: 'nowrap' }}>
        {solved}/{total} solved
      </span>
    </div>
  );
}

/* ---------- TrailFoot — end-of-trail placeholder ---------- */
export function TrailFoot({ remaining }: { remaining: number }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <div style={{ flex: '0 0 46px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px dashed rgba(47,65,86,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(47,65,86,.28)' }}>
          <Compass size={20} stroke="currentColor" />
        </div>
      </div>
      <div style={{ flex: 1, fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
        {remaining} {remaining === 1 ? 'clue' : 'clues'} still sealed ahead…
      </div>
    </div>
  );
}

/* re-export for Hunt.tsx convenience */
export { DiffPips, StarFilled, CatGlyph, FIcon };
export { CrestAvatar };
