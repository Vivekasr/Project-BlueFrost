/* BlueFrost profile-specific components and sample data */

import React from 'react';
import { BF_EMBLEMS, Compass } from './art';

/* ---------- types ---------- */
export interface PuzzleEntry {
  name: string;
  step: number;
  total: number;
  status: 'completed' | 'in_progress';
  cat: 0 | 1 | 2 | 3;
}

export interface UserProfile {
  name: string;
  handle: string;
  crest: number;
  title: string;
  rank: string;
  joined: string;
  place: string;
  blurb: string;
  puzzles: PuzzleEntry[];
  trail: { name: string; step: number; total: number; hint: string };
  journal: Array<{ t: string; meta: string; i: number; kind: 'rose' | 'sage' | 'navy' }>;
  guild: { name: string; members: number; standing: string };
}

/* ---------- sample data ---------- */
export const SELF_DATA: UserProfile = {
  name: 'Rowan Vale',
  handle: 'rowan_vale',
  crest: 2,
  title: 'Cipher-breaker',
  rank: 'Cartographer',
  joined: 'Joined Mar 2024',
  place: 'Port Meridian',
  blurb: "Patient with a riddle, ruthless with a map. Currently three clues from the Tidewater hoard.",
  puzzles: [
    { name: 'The Tidewater Riddle',   step: 5, total: 8, status: 'in_progress', cat: 0 },
    { name: 'The Lighthouse Cipher',  step: 6, total: 6, status: 'completed',   cat: 1 },
    { name: 'Meridian Vault',         step: 4, total: 4, status: 'completed',   cat: 3 },
  ],
  trail: { name: 'The Tidewater Riddle', step: 5, total: 8, hint: 'Clue V · "Where the gull\'s shadow drowns at noon."' },
  journal: [
    { t: 'Cracked the Lighthouse Cipher', meta: 'Cipher · 2h ago', i: 1, kind: 'rose' },
    { t: 'Solved Clue IV — The Tidewater Riddle', meta: 'Trail · Yesterday', i: 2, kind: 'sage' },
    { t: 'Recovered the Brass Astrolabe', meta: 'Relic · 3d ago', i: 3, kind: 'navy' },
    { t: 'Unlocked the Meridian Vault', meta: 'Trail · 4d ago', i: 0, kind: 'navy' },
  ],
  guild: { name: 'The Meridian Society', members: 24, standing: '4th this season' },
};

export const PUBLIC_DATA: UserProfile = {
  name: 'Wren Holloway',
  handle: 'wrenholloway',
  crest: 1,
  title: 'Master of Ciphers',
  rank: 'Pathfinder',
  joined: 'Joined Jul 2023',
  place: 'Saltmere',
  blurb: "Has never met a riddle she couldn't unspool. Keeper of the longest solve-streak in the Society.",
  puzzles: [
    { name: 'The Saltmere Verses',    step: 9, total: 9, status: 'completed',   cat: 1 },
    { name: 'The Vellum Rotation',    step: 5, total: 5, status: 'completed',   cat: 1 },
    { name: 'The Meridian Vault',     step: 2, total: 8, status: 'in_progress', cat: 3 },
  ],
  trail: { name: 'The Saltmere Verses', step: 7, total: 9, hint: 'Clue VII · sealed until you both reach it.' },
  journal: [
    { t: 'Completed The Saltmere Verses', meta: 'Trail · 5h ago', i: 2, kind: 'sage' },
    { t: 'Decoded the Vellum Rotation', meta: 'Cipher · Yesterday', i: 1, kind: 'rose' },
    { t: 'Recovered the Tide-Glass Compass', meta: 'Relic · 2d ago', i: 3, kind: 'navy' },
    { t: 'Topped the Society ladder', meta: 'Guild · 4d ago', i: 0, kind: 'sage' },
  ],
  guild: { name: 'The Meridian Society', members: 24, standing: '1st this season' },
};

/* ---------- PIcon — profile-specific line icons ---------- */
export type PIconName =
  | 'settings' | 'share' | 'message' | 'plus' | 'pencil' | 'chevron'
  | 'flag' | 'calendar' | 'lock' | 'bell' | 'scroll' | 'spark' | 'flame'
  | 'dots' | 'back';

const PICON_PATHS: Record<PIconName, React.ReactNode> = {
  settings: <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /><rect x="13" y="5" width="4" height="4" rx="1.2" fill="currentColor" stroke="none" /><rect x="7" y="10" width="4" height="4" rx="1.2" fill="currentColor" stroke="none" /><rect x="14" y="15" width="4" height="4" rx="1.2" fill="currentColor" stroke="none" /></>,
  share: <><path d="M12 3v12" /><path d="M8 7l4-4 4 4" /><path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" /></>,
  message: <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  pencil: <><path d="M14 4l6 6L9 21H3v-6L14 4z" /><path d="M12 6l6 6" /></>,
  chevron: <path d="M9 5l7 7-7 7" />,
  flag: <><path d="M6 21V4" /><path d="M6 5h11l-2.5 3.5L17 12H6" /></>,
  calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>,
  lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  bell: <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  scroll: <><path d="M7 4h10v13a3 3 0 0 1-3 3H6a3 3 0 0 0 3-3V4z" /><path d="M17 4a2 2 0 0 1 2 2v1h-2" /><line x1="10" y1="9" x2="14" y2="9" /><line x1="10" y1="13" x2="14" y2="13" /></>,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />,
  flame: <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 .5 1.5 2 2 2 0z" />,
  dots: <><circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="18" cy="12" r="1.4" fill="currentColor" stroke="none" /></>,
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
};

export function PIcon({ name, size = 18, stroke = 'currentColor', sw = 1.8 }: {
  name: PIconName; size?: number; stroke?: string; sw?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {PICON_PATHS[name]}
    </svg>
  );
}

/* ---------- CrestAvatar ---------- */
export function CrestAvatar({ emblemIndex, size = 96, seal = true, dark = false }: {
  emblemIndex: number; size?: number; seal?: boolean; dark?: boolean;
}) {
  const E = BF_EMBLEMS[emblemIndex];
  const frame = dark ? 'rgba(254,252,246,.45)' : 'rgba(47,65,86,.30)';
  const frame2 = dark ? 'rgba(254,252,246,.18)' : 'rgba(47,65,86,.12)';
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: dark ? 'rgba(254,252,246,.08)' : 'var(--sand)',
        border: '1.5px solid ' + frame,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 5, borderRadius: '50%', border: '1px solid ' + frame2 }} />
        <E.Art size={size * 0.62} />
      </div>
      {seal && (
        <div style={{
          position: 'absolute', right: -3, bottom: -3,
          width: size * 0.34, height: size * 0.34, borderRadius: '50%',
          background: 'var(--rose)', border: '2px solid var(--cream)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 8px rgba(172,128,135,.45)',
        }}>
          <Compass size={size * 0.24} stroke="#fff" />
        </div>
      )}
    </div>
  );
}

/* ---------- TitleLine ---------- */
export function TitleLine({ title, rank, dark = false }: { title: string; rank: string; dark?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
      <span className="bf-kicker solo" style={{ color: dark ? 'var(--sky)' : 'var(--rose)' }}>{title}</span>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: dark ? 'rgba(254,252,246,.4)' : 'var(--line-2)' }} />
      <span style={{
        fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700,
        letterSpacing: '1.8px', textTransform: 'uppercase' as const,
        color: dark ? 'rgba(254,252,246,.6)' : 'var(--sage)',
      }}>{rank}</span>
    </div>
  );
}

/* ---------- PuzzleList ---------- */
export function PuzzleList({ puzzles }: { puzzles: PuzzleEntry[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {puzzles.map((p, idx) => {
        const E = BF_EMBLEMS[p.cat];
        const done = p.status === 'completed';
        return (
          <div key={idx} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0',
            borderTop: idx === 0 ? 'none' : '1px solid var(--faint)',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <E.Art size={24} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{p.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.3px', color: done ? 'var(--sage)' : 'var(--rose)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
                  {done ? 'Complete' : `Clue ${p.step} of ${p.total}`}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                {Array.from({ length: p.total }).map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 2,
                    background: i < p.step ? (done ? 'var(--sage)' : 'var(--navy)') : 'var(--line)',
                  }} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- TrailProgress — sequential clue stepper ---------- */
export function TrailProgress({ trail, locked = false }: {
  trail: UserProfile['trail']; locked?: boolean;
}) {
  return (
    <div style={{
      border: '1.5px solid var(--line)', borderRadius: 16, background: '#fff',
      padding: '16px 18px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -22, top: -22, opacity: .06 }}><Compass size={108} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
        <span className="bf-kicker solo" style={{ color: 'var(--sage)' }}>On the trail</span>
        <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: 'var(--rose)', whiteSpace: 'nowrap' }}>
          Clue {trail.step} of {trail.total}
        </span>
      </div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--navy)', marginTop: 8 }}>{trail.name}</div>
      <div style={{ display: 'flex', gap: 5, marginTop: 12 }}>
        {Array.from({ length: trail.total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 3,
            background: i < trail.step ? 'var(--navy)' : i === trail.step ? 'var(--rose)' : 'var(--line)',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, color: locked ? 'var(--muted)' : 'var(--navy-soft)', fontSize: 12.5 }}>
        <span style={{ color: locked ? 'var(--muted)' : 'var(--rose)', display: 'flex' }}>
          <PIcon name={locked ? 'lock' : 'scroll'} size={15} />
        </span>
        <span style={{ fontStyle: 'italic', fontFamily: 'var(--serif)', fontSize: 14 }}>{trail.hint}</span>
      </div>
    </div>
  );
}

/* ---------- JournalList — activity log ---------- */
export function JournalList({ items, dense = false }: {
  items: UserProfile['journal']; dense?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((it, idx) => {
        const E = BF_EMBLEMS[it.i];
        const dotColor = it.kind === 'rose' ? 'var(--rose)' : it.kind === 'sage' ? 'var(--sage)' : 'var(--navy)';
        return (
          <div key={idx} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: dense ? '9px 0' : '11px 0',
            borderTop: idx === 0 ? 'none' : '1px solid var(--faint)',
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <E.Art size={24} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{it.meta}</div>
            </div>
            <span style={{ width: 7, height: 7, borderRadius: '50%', flex: '0 0 auto', background: dotColor }} />
          </div>
        );
      })}
    </div>
  );
}

/* ---------- GuildStrip ---------- */
export function GuildStrip({ guild, mutual = false }: {
  guild: UserProfile['guild']; mutual?: boolean;
}) {
  return (
    <div style={{ border: '1.5px solid var(--line)', borderRadius: 14, background: 'var(--sand)', padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 13 }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--navy)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
        <PIcon name="flag" size={20} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 15.5, color: 'var(--navy)', lineHeight: 1 }}>{guild.name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3 }}>
          {mutual ? 'Guild you share' : guild.members + ' members'} ·{' '}
          <span style={{ color: 'var(--rose)', fontWeight: 600 }}>{guild.standing}</span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {([2, 1, 3, 0] as const).map((e, i) => {
          const EA = BF_EMBLEMS[e].Art;
          return (
            <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff', border: '1.5px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i ? -8 : 0 }}>
              <EA size={18} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
