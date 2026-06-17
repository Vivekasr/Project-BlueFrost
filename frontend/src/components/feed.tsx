/* BlueFrost feed components + sample data */

import React from 'react';
import { Compass, BF_EMBLEMS } from './art';
import { CrestAvatar } from './profile';

/* ---------- types ---------- */
export interface Hunt {
  id: string;
  title: string;
  author: string;
  crest: 0 | 1 | 2 | 3;
  cat: 0 | 1 | 2 | 3;
  diff: 1 | 2 | 3 | 4 | 5;
  clues: number;
  players: string;
  rating: string;
  reviews: number;
  badge: 'featured' | 'trending' | 'new' | null;
  region: string;
  posted: string;
}

export interface DispatchItem {
  type: 'created' | 'solved' | 'review' | 'joined';
  user: string;
  crest: 0 | 1 | 2 | 3;
  hunt?: Hunt;
  target?: string;
  time: string;
  note?: string;
  rating?: string;
  quote?: string;
}

export const CAT = ['Ruins', 'Cipher', 'Pirate', 'Treasure'] as const;
export const CHIPS = ['All trails', 'Ruins', 'Ciphers', 'Pirates', 'Treasure'];
const DIFF_LABEL: Record<number, string> = { 1: 'Novice', 2: 'Novice', 3: 'Adept', 4: 'Master', 5: 'Master' };

/* ---------- sample data ---------- */
export const HUNTS: Hunt[] = [
  { id: 'h1', title: 'The Drowned Cathedral', author: 'Asa Frost',     crest: 0, cat: 0, diff: 4, clues: 12, players: '840',  rating: '4.9', reviews: 212, badge: 'featured', region: 'Port Meridian',  posted: '6h ago' },
  { id: 'h2', title: 'Cipher of the Gull',    author: 'Wren Holloway', crest: 1, cat: 1, diff: 3, clues: 6,  players: '2.1k', rating: '4.7', reviews: 488, badge: 'trending', region: 'Saltmere',      posted: 'Yesterday' },
  { id: 'h3', title: 'Blackwater Bounty',     author: 'Cregan Pike',   crest: 2, cat: 2, diff: 2, clues: 5,  players: '430',  rating: '4.5', reviews: 96,  badge: 'new',      region: 'Blackwater Key', posted: '2d ago' },
  { id: 'h4', title: 'The Meridian Hoard',    author: 'Silas Crane',   crest: 3, cat: 3, diff: 5, clues: 14, players: '1.6k', rating: '4.9', reviews: 530, badge: 'featured', region: 'The Tidewater',  posted: '3d ago' },
  { id: 'h5', title: 'Lantern of Saltmere',   author: 'Mira Quill',    crest: 1, cat: 1, diff: 3, clues: 7,  players: '690',  rating: '4.6', reviews: 140, badge: 'new',      region: 'Saltmere',       posted: '4d ago' },
  { id: 'h6', title: 'Ruins of Port Aubade',  author: 'Asa Frost',     crest: 0, cat: 0, diff: 3, clues: 9,  players: '1.0k', rating: '4.8', reviews: 301, badge: null,       region: 'Port Aubade',    posted: '5d ago' },
];

export const DISPATCH: DispatchItem[] = [
  { type: 'created', user: 'Asa Frost',     crest: 0, hunt: HUNTS[0], time: '6h ago' },
  { type: 'solved',  user: 'Wren Holloway', crest: 1, target: 'Cipher of the Gull',  time: '9h ago',    note: 'in 2 days, 4 clues without a hint.' },
  { type: 'review',  user: 'Mira Quill',    crest: 1, target: 'The Meridian Hoard',  time: 'Yesterday', rating: '4.9', quote: 'A devious final cipher. The map work alone is worth the trail.' },
  { type: 'created', user: 'Cregan Pike',   crest: 2, hunt: HUNTS[2], time: '2d ago' },
  { type: 'joined',  user: 'Silas Crane',   crest: 3, target: 'Lantern of Saltmere', time: '3d ago',    note: 'and 27 other explorers are on the trail.' },
];

/* ---------- FIcon — feed SVG icons ---------- */
export type FIconName =
  | 'search' | 'sliders' | 'star' | 'users' | 'bookmark' | 'fire' | 'sparkle'
  | 'clock' | 'pin' | 'heart' | 'flag' | 'check' | 'chevron' | 'arrow' | 'plus' | 'compass';

const FICON_PATHS: Record<FIconName, React.ReactNode> = {
  search:   <><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></>,
  sliders:  <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /><circle cx="9" cy="8" r="2.4" fill="#fff" /><circle cx="15" cy="16" r="2.4" fill="#fff" /></>,
  star:     <path d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.7 6.7 19.5l1.1-5.9L3.4 9.5l6-.8L12 3.2z" />,
  users:    <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" /><path d="M17 13.4A5.5 5.5 0 0 1 20.5 18.5" /></>,
  bookmark: <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z" />,
  fire:     <path d="M12 3c1.4 3 4.5 4.2 4.5 8.5a4.5 4.5 0 0 1-9 0c0-2 .9-3.2 1.8-4.2.6 1.8 2.2 2.2 2.2.2 0-1.6-.5-3-1.5-4.5z" />,
  sparkle:  <><path d="M12 3l1.7 4.8L18.5 9.5 13.7 11.2 12 16l-1.7-4.8L5.5 9.5l4.8-1.7L12 3z" /><path d="M18 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" /></>,
  clock:    <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
  pin:      <><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  heart:    <path d="M12 20s-7-4.5-7-9.5A3.7 3.7 0 0 1 12 7a3.7 3.7 0 0 1 7 3.5C19 15.5 12 20 12 20z" />,
  flag:     <><path d="M6 21V4" /><path d="M6 5h11l-2.5 3.5L17 12H6" /></>,
  check:    <path d="M20 6L9 17l-5-5" />,
  chevron:  <path d="M9 5l7 7-7 7" />,
  arrow:    <path d="M5 12h14M13 6l6 6-6 6" />,
  plus:     <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  compass:  <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" fill="currentColor" stroke="none" /></>,
};

export function FIcon({ name, size = 18, stroke = 'currentColor', sw = 1.8 }: {
  name: FIconName; size?: number; stroke?: string; sw?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {FICON_PATHS[name]}
    </svg>
  );
}

export function StarFilled({ size = 13, color = 'var(--rose)' }: { size?: number; color?: string }) {
  return (
    <span style={{ color, display: 'inline-flex' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.7 6.7 19.5l1.1-5.9L3.4 9.5l6-.8L12 3.2z" />
      </svg>
    </span>
  );
}

/* category emblem glyph — exported so Feed.tsx can use it for inline cards */
export function CatGlyph({ i, size = 22 }: { i: number; size?: number }) {
  const E = BF_EMBLEMS[i];
  return <span style={{ display: 'inline-flex' }}><E.Art size={size} /></span>;
}

/* ---------- BlankCover — hunt cover placeholder ---------- */
export function BlankCover({ height = 132, radius = 14, badge, cat, corner = true, catIconOnly = false, badgeSm = false }: {
  height?: number; radius?: number; badge?: Hunt['badge']; cat?: number;
  corner?: boolean; catIconOnly?: boolean; badgeSm?: boolean;
}) {
  return (
    <div className="bf-grid-fine" style={{ position: 'relative', height, borderRadius: radius, overflow: 'hidden', background: 'var(--sand)', flex: '0 0 auto' }}>
      <div style={{ position: 'absolute', inset: 7, border: '1px solid var(--line)', borderRadius: Math.max(radius - 5, 3), pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 10, border: '1px solid var(--faint)', borderRadius: Math.max(radius - 7, 2), pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: .12, display: 'flex' }}>
        <Compass size={Math.min(height * 0.62, 96)} />
      </div>
      {badge && (
        <div style={{ position: 'absolute', top: badgeSm ? 9 : 12, left: badgeSm ? 9 : 12 }}>
          <HuntBadge kind={badge} sm={badgeSm} />
        </div>
      )}
      {corner && cat != null && (catIconOnly ? (
        <div style={{ position: 'absolute', top: 9, right: 9, width: 32, height: 32, borderRadius: '50%', background: 'var(--cream)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CatGlyph i={cat} size={20} />
        </div>
      ) : (
        <div style={{ position: 'absolute', top: 10, right: 10, height: 30, display: 'inline-flex', alignItems: 'center', gap: 7, padding: '0 11px 0 8px', borderRadius: 999, background: 'var(--cream)', border: '1px solid var(--line)' }}>
          <CatGlyph i={cat} size={18} />
          <span style={{ fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--navy)' }}>{CAT[cat]}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- HuntBadge ---------- */
export function HuntBadge({ kind, sm = false }: { kind: Hunt['badge']; sm?: boolean }) {
  if (!kind) return null;
  const map: Record<NonNullable<Hunt['badge']>, { label: string; bg: string; fg: string; icon: FIconName; border: string }> = {
    featured: { label: 'Featured', bg: 'var(--rose)',  fg: '#fff',         icon: 'sparkle', border: 'transparent' },
    trending: { label: 'Trending', bg: 'var(--navy)',  fg: 'var(--cream)', icon: 'fire',    border: 'transparent' },
    new:      { label: 'New',      bg: 'var(--cream)', fg: 'var(--sage)',  icon: 'compass', border: 'var(--sage)' },
  };
  const b = map[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: sm ? 4 : 5,
      height: sm ? 22 : 26, padding: sm ? '0 8px' : '0 11px', borderRadius: 999,
      background: b.bg, color: b.fg, border: '1.5px solid ' + b.border,
      fontFamily: 'var(--sans)', fontSize: sm ? 9.5 : 10.5, fontWeight: 700,
      letterSpacing: sm ? '.8px' : '1.2px', textTransform: 'uppercase',
      boxShadow: kind === 'new' ? 'none' : '0 3px 9px rgba(47,65,86,.18)',
    }}>
      <FIcon name={b.icon} size={sm ? 11 : 13} stroke={b.fg} sw={2} />{b.label}
    </span>
  );
}

/* ---------- DiffPips ---------- */
export function DiffPips({ level, label = true }: { level: number; label?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ display: 'inline-flex', gap: 3.5 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{
            width: 7, height: 7, transform: 'rotate(45deg)',
            background: i <= level ? 'var(--navy)' : 'transparent',
            border: '1.2px solid ' + (i <= level ? 'var(--navy)' : 'var(--line-2)'),
          }} />
        ))}
      </span>
      {label && (
        <span style={{ fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {DIFF_LABEL[level]}
        </span>
      )}
    </span>
  );
}

/* ---------- Author line ---------- */
export function Author({ name, crest, size = 26, dark = false }: { name: string; crest: number; size?: number; dark?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
      <CrestAvatar emblemIndex={crest} size={size} seal={false} dark={dark} />
      <span style={{ fontSize: 12.5, color: dark ? 'rgba(254,252,246,.8)' : 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        by <b style={{ color: dark ? 'var(--cream)' : 'var(--navy)', fontWeight: 700 }}>{name}</b>
      </span>
    </span>
  );
}

/* ---------- MetaStrip ---------- */
export function MetaStrip({ hunt, items = ['clues', 'players'] }: { hunt: Hunt; items?: Array<'clues' | 'players' | 'region'> }) {
  const cell = (icon: FIconName, content: React.ReactNode, key: string) => (
    <span key={key} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--navy-soft)', whiteSpace: 'nowrap' }}>
      <span style={{ color: 'var(--sage)', display: 'flex' }}><FIcon name={icon} size={13} /></span>{content}
    </span>
  );
  const parts: Record<string, React.ReactNode> = {
    clues:   cell('compass', <span><b style={{ color: 'var(--navy)' }}>{hunt.clues}</b> clues</span>,              'c'),
    players: cell('users',   <span><b style={{ color: 'var(--navy)' }}>{hunt.players}</b> solving</span>,          'p'),
    region:  cell('pin',     hunt.region,                                                                           'r'),
  };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      {items.map((k, i) => (
        <React.Fragment key={k}>
          {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line-2)' }} />}
          {parts[k]}
        </React.Fragment>
      ))}
    </span>
  );
}

/* ---------- HuntCard — vertical tile (used in mobile created posts) ---------- */
export function HuntCard({ hunt, coverH = 132, compact = false }: { hunt: Hunt; coverH?: number; compact?: boolean }) {
  return (
    <div style={{ border: '1.5px solid var(--line)', borderRadius: 18, background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 7, paddingBottom: 0 }}>
        <BlankCover height={coverH} radius={13} badge={hunt.badge} cat={hunt.cat} catIconOnly={compact} />
      </div>
      <div style={{ padding: '12px 15px 14px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 18.5, color: 'var(--navy)', lineHeight: 1.12 }}>{hunt.title}</div>
        <Author name={hunt.author} crest={hunt.crest} />
        <div style={{ height: 1, background: 'var(--faint)', margin: '1px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <DiffPips level={hunt.diff} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <StarFilled /><span style={{ fontFamily: 'var(--serif)', fontSize: 14.5, color: 'var(--navy)' }}>{hunt.rating}</span>
          </span>
        </div>
        <MetaStrip hunt={hunt} items={['clues', 'players']} />
      </div>
    </div>
  );
}

/* ---------- HuntRow — compact rank row (trending sidebar) ---------- */
export function HuntRow({ hunt, rank }: { hunt: Hunt; rank?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
      {rank != null && (
        <span style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--line-2)', width: 20, textAlign: 'center', flex: '0 0 auto' }}>{rank}</span>
      )}
      <div style={{ width: 46, height: 46, flex: '0 0 auto' }}>
        <div className="bf-grid-fine" style={{ width: '100%', height: '100%', borderRadius: 11, background: 'var(--sand)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 4, border: '1px solid var(--faint)', borderRadius: 7 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: .5 }}>
            <CatGlyph i={hunt.cat} size={24} />
          </div>
        </div>
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 15.5, color: 'var(--navy)', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{hunt.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 5, fontSize: 11.5, color: 'var(--muted)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><StarFilled size={11} />{hunt.rating}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line-2)' }} />
          <span><b style={{ color: 'var(--navy-soft)' }}>{hunt.players}</b> solving</span>
        </div>
      </div>
      <span style={{ color: 'var(--line-2)', display: 'flex', flex: '0 0 auto' }}>
        <FIcon name="chevron" size={16} />
      </span>
    </div>
  );
}

/* ---------- HuntListRow — horizontal Dispatch-style row ---------- */
export function HuntListRow({ hunt, compact = false }: { hunt: Hunt; compact?: boolean }) {
  if (compact) {
    return (
      <div style={{ display: 'flex', gap: 11, border: '1.5px solid var(--line)', borderRadius: 16, background: '#fff', padding: 8, flexShrink: 0 }}>
        <div style={{ flex: '0 0 108px' }}>
          <BlankCover height={108} radius={11} badge={hunt.badge} cat={hunt.cat} corner={false} badgeSm />
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: '3px 6px 3px 0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 16.5, color: 'var(--navy)', lineHeight: 1.1 }}>{hunt.title}</div>
          <div style={{ marginTop: 5 }}><Author name={hunt.author} crest={hunt.crest} size={21} /></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto', paddingTop: 7 }}>
            <DiffPips level={hunt.diff} label={false} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <StarFilled size={12} /><span style={{ fontFamily: 'var(--serif)', fontSize: 13.5, color: 'var(--navy)' }}>{hunt.rating}</span>
            </span>
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
              <b style={{ color: 'var(--navy)' }}>{hunt.clues}</b> clues · <b style={{ color: 'var(--navy)' }}>{hunt.players}</b>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 6, border: '1.5px solid var(--line)', borderRadius: 18, background: '#fff', padding: 8, flexShrink: 0 }}>
      <div style={{ flex: '0 0 238px' }}>
        <BlankCover height={142} radius={13} badge={hunt.badge} cat={hunt.cat} />
      </div>
      <div style={{ flex: 1, minWidth: 0, padding: '12px 18px 12px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 23, color: 'var(--navy)', lineHeight: 1.05 }}>{hunt.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 9 }}>
              <Author name={hunt.author} crest={hunt.crest} size={26} />
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line-2)' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--navy-soft)' }}>
                <FIcon name="pin" size={13} stroke="var(--sage)" />{hunt.region}
              </span>
            </div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, flex: '0 0 auto' }}>
            <StarFilled size={14} />
            <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--navy)' }}>{hunt.rating}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>({hunt.reviews})</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 'auto', paddingTop: 14 }}>
          <DiffPips level={hunt.diff} />
          <MetaStrip hunt={hunt} items={['clues', 'players']} />
          <button className="bf-btn bf-btn-primary" style={{ marginLeft: 'auto', width: 'auto', height: 42, padding: '0 18px', fontSize: 13.5 }}>
            Start trail<FIcon name="arrow" size={16} stroke="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- FeedTabs ---------- */
export function FeedTabs({ items, active = 0, onSelect }: {
  items: string[]; active?: number; onSelect?: (i: number) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 22, borderBottom: '1px solid var(--line)', overflowX: 'auto', flexShrink: 0 }}>
      {items.map((t, i) => (
        <div key={t} onClick={() => onSelect?.(i)}
          style={{ position: 'relative', padding: '0 0 12px', fontSize: 13.5, fontWeight: i === active ? 700 : 600, letterSpacing: '.2px', whiteSpace: 'nowrap', cursor: onSelect ? 'pointer' : 'default', color: i === active ? 'var(--navy)' : 'var(--muted)' }}>
          {t}
          {i === active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2.5, background: 'var(--rose)', borderRadius: 2 }} />}
        </div>
      ))}
    </div>
  );
}

/* ---------- CatChips ---------- */
export function CatChips({ active = 0 }: { active?: number }) {
  return (
    <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', flexShrink: 0 }}>
      {CHIPS.map((c, i) => (
        <span key={c} className={'bf-chip' + (i === active ? ' on' : '')} style={{ padding: '8px 14px', fontSize: 12.5, whiteSpace: 'nowrap' }}>
          {i > 0 && <CatGlyph i={i - 1} size={17} />}{c}
        </span>
      ))}
    </div>
  );
}

/* ---------- ActivityRow — social event (solved / reviewed / joined) ---------- */
export function ActivityRow({ item }: { item: DispatchItem }) {
  const verbMap: Partial<Record<DispatchItem['type'], string>> = {
    solved: 'solved', review: 'reviewed', joined: 'joined the trail',
  };
  const dotMap: Partial<Record<DispatchItem['type'], string>> = {
    solved: 'var(--sage)', review: 'var(--rose)', joined: 'var(--navy)',
  };
  return (
    <div style={{ display: 'flex', gap: 12, padding: '13px 0' }}>
      <div style={{ flex: '0 0 auto' }}>
        <CrestAvatar emblemIndex={item.crest} size={38} seal={false} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 13, color: 'var(--navy-soft)', lineHeight: 1.4 }}>
          <b style={{ color: 'var(--navy)' }}>{item.user}</b>{' '}
          {verbMap[item.type]}{' '}
          <b style={{ color: 'var(--navy)', fontFamily: 'var(--serif)', fontWeight: 400, fontStyle: 'italic' }}>{item.target}</b>
          {item.type === 'review' && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 6, verticalAlign: 'middle' }}>
              <StarFilled size={12} /><span style={{ fontWeight: 700, color: 'var(--navy)' }}>{item.rating}</span>
            </span>
          )}
        </div>
        {item.quote && (
          <div style={{ marginTop: 6, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13.5, color: 'var(--navy-soft)', borderLeft: '2px solid var(--rose)', paddingLeft: 10, lineHeight: 1.45 }}>
            "{item.quote}"
          </div>
        )}
        {item.note && <div style={{ marginTop: 4, fontSize: 12, color: 'var(--muted)' }}>{item.note}</div>}
        <div style={{ marginTop: 6, fontSize: 11, color: 'var(--muted)', letterSpacing: '.2px' }}>{item.time}</div>
      </div>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotMap[item.type] ?? 'var(--navy)', flex: '0 0 auto', marginTop: 6 }} />
    </div>
  );
}

/* ---------- CreatePrompt — compose / new hunt ---------- */
export function CreatePrompt({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid var(--line)', borderRadius: 16, background: '#fff', padding: compact ? '11px 13px' : '13px 15px' }}>
      <CrestAvatar emblemIndex={2} size={36} seal={false} />
      <span style={{ flex: 1, fontSize: 13.5, color: 'var(--muted)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
        Chart a new trail…
      </span>
      <button className="bf-btn bf-btn-rose" style={{ width: 'auto', height: 40, padding: '0 16px', fontSize: 13 }}>
        <FIcon name="plus" size={16} stroke="currentColor" sw={2.2} />New hunt
      </button>
    </div>
  );
}
