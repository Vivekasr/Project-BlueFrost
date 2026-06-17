/* BlueFrost Hunt play / solve page — /hunt
   Mobile: full-screen scrollable clue trail.
   Desktop: left rail (summary + ledger) + right scrollable trail. */

import React from 'react';
import { StatusBar, Wordmark } from '../components/ui';
import { SELF_DATA } from '../components/profile';
import {
  HUNT_DATA, CLUES_DATA, useHunt,
  HIcon, ClueCard, Completion, HuntProgress, TrailFoot,
  DiffPips, StarFilled, CatGlyph, FIcon, CrestAvatar,
} from '../components/hunt';

/* ===== shared top-nav (desktop) ===== */
function HuntTopNav() {
  const items = ['Map', 'Trails', 'Journal', 'Guild', 'Profile'] as const;
  return (
    <div style={{ flex: '0 0 auto', height: 62, borderBottom: '1px solid rgba(47,65,86,.16)', display: 'flex', alignItems: 'center', padding: '0 28px', background: 'var(--cream)', position: 'relative', zIndex: 3 }}>
      <Wordmark size={21} />
      <div style={{ display: 'flex', gap: 24, marginLeft: 34 }}>
        {items.map((t) => (
          <span key={t} style={{ position: 'relative', fontSize: 13, fontWeight: t === 'Trails' ? 700 : 600, color: t === 'Trails' ? 'var(--navy)' : 'var(--muted)' }}>
            {t}
            {t === 'Trails' && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -21, height: 2.5, background: 'var(--rose)', borderRadius: 2 }} />}
          </span>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 13 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, border: '1.5px solid rgba(47,65,86,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
          <HIcon name="share" size={17} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <CrestAvatar emblemIndex={SELF_DATA.crest} size={34} seal={false} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{SELF_DATA.name.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  );
}

/* ===== desktop left rail ledger row ===== */
function LedgerRow({ clue, index, state, onJump }: {
  clue: typeof CLUES_DATA[0]; index: number;
  state: 'solved' | 'current' | 'locked';
  onJump: (i: number) => void;
}) {
  const dot = state === 'solved' ? 'var(--sage)' : state === 'current' ? 'var(--rose)' : 'rgba(47,65,86,.28)';
  return (
    <button onClick={() => onJump(index)} style={{ display: 'flex', alignItems: 'center', gap: 11, width: '100%', textAlign: 'left', background: state === 'current' ? 'var(--cream)' : 'transparent', border: '1px solid ' + (state === 'current' ? 'rgba(47,65,86,.28)' : 'transparent'), borderRadius: 11, padding: '9px 11px', cursor: 'pointer' }}>
      <span style={{ width: 26, height: 26, borderRadius: '50%', flex: '0 0 auto', background: state === 'solved' ? 'var(--sage)' : state === 'current' ? 'var(--cream)' : 'var(--sand)', border: '1.5px solid ' + (state === 'current' ? 'var(--rose)' : state === 'solved' ? 'var(--sage)' : 'rgba(47,65,86,.28)'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: state === 'solved' ? '#fff' : state === 'current' ? 'var(--navy)' : 'var(--muted)' }}>
        {state === 'solved'
          ? <HIcon name="check" size={14} sw={2.6} />
          : state === 'locked'
          ? <HIcon name="lock" size={12} />
          : <span style={{ fontFamily: 'var(--serif)', fontSize: 13 }}>{index + 1}</span>}
      </span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: state === 'locked' ? 'var(--muted)' : 'var(--navy)', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {state === 'locked' ? 'Sealed clue' : clue.label}
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '.6px', fontWeight: 600 }}>
          {state === 'solved' ? 'Solved' : state === 'current' ? 'In progress' : 'Locked'}
        </div>
      </div>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, flex: '0 0 auto', display: 'block' }} />
    </button>
  );
}

/* ===== mobile header icon button ===== */
function MHeadBtn({ name, accent = false }: { name: Parameters<typeof HIcon>[0]['name']; accent?: boolean }) {
  return (
    <div style={{ width: 38, height: 38, borderRadius: 11, border: '1.5px solid rgba(47,65,86,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent ? 'var(--rose)' : 'var(--navy)', flex: '0 0 auto' }}>
      <HIcon name={name} size={17} />
    </div>
  );
}

/* ===== Hunt page ===== */
export function Hunt() {
  const hunt = HUNT_DATA;
  const clues = CLUES_DATA;
  const game = useHunt(clues);

  /* scroll helpers */
  const mobileScrollRef = React.useRef<HTMLDivElement>(null);
  const desktopScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToActive = (containerRef: React.RefObject<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const target = el.querySelector<HTMLElement>(`[data-clue-index="${game.activeIndex}"]`) || el.querySelector<HTMLElement>('[data-complete]');
      if (target) {
        const top = el.scrollTop + (target.getBoundingClientRect().top - el.getBoundingClientRect().top) - 14;
        el.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }));
  };

  React.useEffect(() => {
    scrollToActive(mobileScrollRef);
    scrollToActive(desktopScrollRef);
  }, [game.solvedCount]);

  const scrollToClue = (i: number) => {
    const el = desktopScrollRef.current;
    if (!el) return;
    const target = el.querySelector<HTMLElement>(`[data-clue-index="${i}"]`);
    if (target) {
      const top = el.scrollTop + (target.getBoundingClientRect().top - el.getBoundingClientRect().top) - 16;
      el.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  /* ── MOBILE ── */
  const mobile = (
    <div className="md:hidden min-h-screen bf-screen" style={{ background: 'var(--cream)' }}>
      <StatusBar />

      {/* header */}
      <div style={{ flex: '0 0 auto', padding: '4px 20px 14px', borderBottom: '1px solid rgba(47,65,86,.16)', background: 'var(--cream)', position: 'relative', zIndex: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MHeadBtn name="back" />
          <span style={{ flex: 1 }} />
          <MHeadBtn name="bulb" accent />
          <MHeadBtn name="share" />
        </div>
        <div style={{ display: 'flex', gap: 13, marginTop: 13 }}>
          <div style={{ width: 52, height: 52, borderRadius: 13, background: 'var(--sand)', border: '1px solid rgba(47,65,86,.16)', position: 'relative', overflow: 'hidden', flex: '0 0 auto' }} className="bf-grid-fine">
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CatGlyph i={hunt.cat} size={30} />
            </div>
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--navy)', lineHeight: 1.05 }}>{hunt.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 6, fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CrestAvatar emblemIndex={hunt.crest} size={20} seal={false} />
                by <b style={{ color: 'var(--navy)' }}>{hunt.author}</b>
              </span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(47,65,86,.28)', display: 'block' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <FIcon name="pin" size={12} stroke="var(--sage)" />{hunt.region}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 13 }}>
          <DiffPips level={hunt.diff} />
          <span style={{ marginLeft: 'auto', width: 150 }}>
            <HuntProgress solved={game.solvedCount} total={clues.length} />
          </span>
        </div>
      </div>

      {/* scrolling trail */}
      <div ref={mobileScrollRef} className="bf-grid" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '18px 18px 28px' }}>
        {clues.map((clue, i) => {
          const state = i < game.solvedCount ? 'solved' : i === game.solvedCount ? 'current' : 'locked';
          return (
            <ClueCard key={clue.id} clue={clue} index={i} total={clues.length} state={state} game={game} compact first={i === 0} />
          );
        })}
        <div data-complete>
          {game.done
            ? <Completion hunt={hunt} total={clues.length} game={game} compact onRestart={game.restart} />
            : <TrailFoot remaining={clues.length - game.solvedCount} />}
        </div>
      </div>
    </div>
  );

  /* ── DESKTOP ── */
  const desktop = (
    <div className="hidden md:flex h-screen bf-screen" style={{ background: 'var(--cream)', overflow: 'hidden' }}>
      <HuntTopNav />
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>

        {/* left rail */}
        <div className="bf-grid-fine" style={{ flex: '0 0 332px', borderRight: '1px solid rgba(47,65,86,.16)', display: 'flex', flexDirection: 'column', padding: '24px 24px 20px', overflowY: 'auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '1.6px', textTransform: 'uppercase', color: 'var(--rose)' }}>
            <HIcon name="back" size={15} stroke="var(--rose)" />Trails
          </div>

          {/* hunt summary card */}
          <div style={{ marginTop: 16, border: '1.5px solid rgba(47,65,86,.16)', borderRadius: 16, background: '#fff', overflow: 'hidden' }}>
            <div style={{ padding: 7, paddingBottom: 0 }}>
              <div className="bf-grid-fine" style={{ position: 'relative', height: 96, borderRadius: 11, background: 'var(--sand)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 6, border: '1px solid rgba(47,65,86,.10)', borderRadius: 8 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CatGlyph i={hunt.cat} size={46} />
                </div>
              </div>
            </div>
            <div style={{ padding: '13px 15px 15px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 21, color: 'var(--navy)', lineHeight: 1.08 }}>{hunt.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 12, color: 'var(--muted)' }}>
                <CrestAvatar emblemIndex={hunt.crest} size={22} seal={false} />
                by <b style={{ color: 'var(--navy)' }}>{hunt.author}</b>
              </div>
              <div style={{ height: 1, background: 'rgba(47,65,86,.10)', margin: '12px 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <DiffPips level={hunt.diff} />
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <StarFilled size={13} />
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--navy)' }}>{hunt.rating}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>({hunt.reviews})</span>
                </span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 11, fontSize: 12, color: 'rgba(47,65,86,.7)' }}>
                <FIcon name="pin" size={13} stroke="var(--sage)" />{hunt.region}
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(47,65,86,.28)', display: 'block', margin: '0 2px' }} />
                <FIcon name="users" size={13} stroke="var(--sage)" />
                <b style={{ color: 'var(--navy)' }}>{hunt.players}</b> solving
              </div>
            </div>
          </div>

          {/* progress */}
          <div style={{ marginTop: 18 }}>
            <HuntProgress solved={game.solvedCount} total={clues.length} />
          </div>

          {/* clue ledger */}
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="bf-kicker solo" style={{ color: 'var(--sage)', marginBottom: 8 }}>The trail</span>
            {clues.map((clue, i) => {
              const state = i < game.solvedCount ? 'solved' : i === game.solvedCount ? 'current' : 'locked';
              return <LedgerRow key={clue.id} clue={clue} index={i} state={state} onJump={scrollToClue} />;
            })}
            {game.done && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 11px' }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flex: '0 0 auto' }}>
                  <HIcon name="flag" size={14} />
                </span>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--navy)' }}>Treasure claimed</div>
              </div>
            )}
          </div>
        </div>

        {/* right trail */}
        <div ref={desktopScrollRef} className="bf-grid" style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '26px 0' }}>
          <div style={{ maxWidth: 660, margin: '0 auto', padding: '0 28px' }}>
            <div style={{ marginBottom: 18 }}>
              <span className="bf-kicker solo" style={{ color: 'var(--rose)' }}>Now solving</span>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--navy)', lineHeight: 1.05, marginTop: 7 }}>
                {game.done ? 'You reached the end of the trail' : `Clue ${game.solvedCount + 1} of ${clues.length}`}
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 6, maxWidth: 520, lineHeight: 1.5 }}>{hunt.blurb}</div>
            </div>
            {clues.map((clue, i) => {
              const state = i < game.solvedCount ? 'solved' : i === game.solvedCount ? 'current' : 'locked';
              return <ClueCard key={clue.id} clue={clue} index={i} total={clues.length} state={state} game={game} first={i === 0} />;
            })}
            <div data-complete>
              {game.done && <Completion hunt={hunt} total={clues.length} game={game} onRestart={game.restart} />}
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return <>{mobile}{desktop}</>;
}
