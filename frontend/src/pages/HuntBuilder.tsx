/* BlueFrost Hunt Builder — /create
   Desktop: two-column (main editor + right rail).
   Mobile: single scrollable column. */

import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBar, Wordmark } from '../components/ui';
import { CrestAvatar, SELF_DATA } from '../components/profile';
import {
  useBuilder, ClueEditor, RailCard, BuilderDiff, CheckRow,
  BLabel, BInput, BTextarea, BHelp, ImageSlot,
} from '../components/builder';
import { HIcon } from '../components/hunt';

/* ===== top nav ===== */
function BuilderTopNav() {
  const items = ['Map', 'Trails', 'Journal', 'Guild'] as const;
  return (
    <div style={{ flex: '0 0 auto', height: 62, borderBottom: '1px solid rgba(47,65,86,.16)', display: 'flex', alignItems: 'center', padding: '0 26px', background: 'var(--cream)', position: 'relative', zIndex: 3 }}>
      <Wordmark size={21} />
      <div style={{ display: 'flex', gap: 24, marginLeft: 32 }}>
        {items.map((t) => (
          <span key={t} style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{t}</span>
        ))}
        <span style={{ position: 'relative', fontSize: 13, fontWeight: 700, color: 'var(--navy)' }}>
          Create
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: -21, height: 2.5, background: 'var(--rose)', borderRadius: 2 }} />
        </span>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 11 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600, color: 'var(--sage)', whiteSpace: 'nowrap' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)', display: 'block' }} />All changes saved
        </span>
        <Link to="/hunt" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 38, padding: '0 14px', borderRadius: 10, border: '1.5px solid rgba(47,65,86,.28)', background: '#fff', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, color: 'var(--navy)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          <HIcon name="play" size={14} stroke="none" />Preview
        </Link>
        <CrestAvatar emblemIndex={SELF_DATA.crest} size={34} seal={false} />
      </div>
    </div>
  );
}

export function HuntBuilder() {
  const b = useBuilder();
  const leftRef = React.useRef<HTMLDivElement>(null);
  const total = b.clues.length;

  const answersOk = b.clues.every((c) => c.answers.length > 0);
  const titleOk = b.hunt.title.trim().length > 0;
  const enoughClues = b.clues.length >= 3;
  const ready = answersOk && titleOk && enoughClues;
  const remaining = [titleOk, enoughClues, answersOk].filter((x) => !x).length;

  const jumpTo = (id: string) => {
    const clue = b.clues.find((x) => x.id === id);
    if (clue && !clue._open) b.toggleOpen(id);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = leftRef.current;
      if (!el) return;
      const t = el.querySelector<HTMLElement>(`[data-clue-edit="${id}"]`);
      if (t) el.scrollTo({ top: Math.max(0, el.scrollTop + (t.getBoundingClientRect().top - el.getBoundingClientRect().top) - 18), behavior: 'smooth' });
    }));
  };

  const addAndScroll = () => {
    b.add();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const el = leftRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }));
  };

  /* ── shared main editor column content ── */
  const editorContent = (compact = false) => (
    <div style={{ maxWidth: 660, margin: '0 auto', padding: compact ? '0 20px' : '0 30px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 18 }}>
        <div>
          <span className="bf-kicker solo" style={{ color: 'var(--rose)' }}>Trail builder</span>
          <div style={{ fontFamily: 'var(--serif)', fontSize: compact ? 26 : 30, color: 'var(--navy)', lineHeight: 1.04, marginTop: 7 }}>Chart your hunt</div>
          <div style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 6, maxWidth: 460, lineHeight: 1.5 }}>Lay your clues in order. Each one unlocks only when a solver answers the one before it.</div>
        </div>
      </div>

      {/* hunt title + intro */}
      <div style={{ border: '1.5px solid rgba(47,65,86,.16)', borderRadius: 16, background: '#fff', padding: '16px 18px', marginBottom: 26 }}>
        <BLabel>Hunt title</BLabel>
        <input value={b.hunt.title} onChange={(e) => b.patchHunt({ title: e.target.value })}
          placeholder="Name your trail…" spellCheck={false}
          style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--serif)', fontSize: 27, color: 'var(--navy)', lineHeight: 1.1 }} />
        <div style={{ height: 1, background: 'rgba(47,65,86,.10)', margin: '14px 0' }} />
        <BLabel optional>Intro</BLabel>
        <BTextarea value={b.hunt.blurb} onChange={(v) => b.patchHunt({ blurb: v })}
          placeholder="Set the scene for your explorers…" rows={2} />
      </div>

      {/* clues header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span className="bf-kicker solo" style={{ color: 'var(--sage)' }}>The clues</span>
        <span style={{ marginLeft: 9, fontSize: 12.5, fontWeight: 700, color: 'var(--muted)' }}>{total}</span>
        <button onClick={addAndScroll} className="bf-btn bf-btn-rose" style={{ marginLeft: 'auto', width: 'auto', height: 40, padding: '0 16px', fontSize: 13 }}>
          <HIcon name="plus" size={15} sw={2.2} />Add clue
        </button>
      </div>

      {/* clue editors */}
      {b.clues.map((clue, i) => (
        <ClueEditor key={clue.id} clue={clue} index={i} total={total} api={b} first={i === 0} last={i === total - 1} />
      ))}

      {/* add clue footer */}
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ flex: '0 0 52px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px dashed rgba(47,65,86,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(47,65,86,.28)' }}>
            <HIcon name="plus" size={16} sw={2} />
          </div>
        </div>
        <button onClick={addAndScroll}
          style={{ flex: 1, cursor: 'pointer', border: '1.5px dashed rgba(47,65,86,.28)', borderRadius: 14, background: 'rgba(245,239,235,.4)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--navy)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HIcon name="plus" size={14} sw={2.4} />
          </span>
          Add another clue
        </button>
      </div>
    </div>
  );

  /* ── shared right rail content ── */
  const railContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RailCard title="Cover">
        <ImageSlot id="hunt-cover" placeholder="Drop a cover image (3:2 looks best)" height={148} radius={12} />
        <BHelp>Shown on the trail card in the feed.</BHelp>
      </RailCard>

      <RailCard title="Trail settings">
        <div style={{ marginBottom: 16 }}>
          <BLabel>Difficulty</BLabel>
          <BuilderDiff value={b.hunt.diff} onChange={(v) => b.patchHunt({ diff: v as 1 | 2 | 3 | 4 | 5 })} />
        </div>
        <div>
          <BLabel>Prize / reward</BLabel>
          <BInput value={b.hunt.prize} onChange={(v) => b.patchHunt({ prize: v })} placeholder="What waits at the end?" icon="flag" />
        </div>
      </RailCard>

      <RailCard title="Outline">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {b.clues.map((c, i) => {
            const ok = Boolean(c.prompt.trim() && c.answers.length > 0);
            const typeEntry = [
              { key: 'text', icon: 'text' as const }, { key: 'image', icon: 'image' as const },
              { key: 'map', icon: 'map' as const }, { key: 'video', icon: 'video' as const },
            ].find((t) => t.key === c.type) || { key: 'text', icon: 'text' as const };
            return (
              <button key={c.id} onClick={() => jumpTo(c.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 9, padding: '8px 6px' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', flex: '0 0 auto', background: ok ? 'var(--sage)' : 'var(--sand)', border: '1.5px solid ' + (ok ? 'var(--sage)' : 'rgba(47,65,86,.28)'), color: ok ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 12 }}>
                  {ok ? <HIcon name="check" size={12} sw={2.6} /> : i + 1}
                </span>
                <span style={{ color: 'var(--sage)', display: 'flex', flex: '0 0 auto' }}><HIcon name={typeEntry.icon} size={14} /></span>
                <span style={{ minWidth: 0, flex: 1, fontSize: 13, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.label || c.prompt || 'Untitled clue'}</span>
              </button>
            );
          })}
        </div>
      </RailCard>

      <RailCard title="Before you publish">
        <CheckRow ok={titleOk}>Hunt has a title</CheckRow>
        <CheckRow ok={enoughClues}>At least 3 clues ({b.clues.length})</CheckRow>
        <CheckRow ok={answersOk}>Every clue has an answer</CheckRow>
        <button disabled={!ready} className={'bf-btn ' + (ready ? 'bf-btn-primary' : '')}
          style={{ marginTop: 14, height: 50, ...(ready ? {} : { background: 'var(--sand)', color: 'var(--muted)', border: '1.5px solid rgba(47,65,86,.16)', cursor: 'not-allowed', boxShadow: 'none' }) }}>
          <HIcon name="flag" size={17} />{ready ? 'Publish trail' : `${remaining} thing${remaining === 1 ? '' : 's'} left`}
        </button>
      </RailCard>
    </div>
  );

  /* ── MOBILE ── */
  const mobile = (
    <div className="md:hidden min-h-screen bf-screen" style={{ background: 'var(--cream)' }}>
      <StatusBar />
      {/* simple mobile header */}
      <div style={{ flex: '0 0 auto', padding: '8px 20px 12px', borderBottom: '1px solid rgba(47,65,86,.16)', background: 'var(--cream)', display: 'flex', alignItems: 'center', gap: 12, zIndex: 3, position: 'relative' }}>
        <Wordmark size={19} />
        <span style={{ flex: 1 }} />
        <Link to="/hunt" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 13px', borderRadius: 10, border: '1.5px solid rgba(47,65,86,.28)', background: '#fff', fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, color: 'var(--navy)', textDecoration: 'none' }}>
          <HIcon name="play" size={13} stroke="none" />Preview
        </Link>
        <CrestAvatar emblemIndex={SELF_DATA.crest} size={32} seal={false} />
      </div>
      {/* scrollable body */}
      <div className="bf-grid" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 0 40px' }}>
        {editorContent(true)}
        {/* mobile settings sections */}
        <div style={{ maxWidth: 660, margin: '24px auto 0', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {railContent}
        </div>
      </div>
    </div>
  );

  /* ── DESKTOP ── */
  const desktop = (
    <div className="hidden md:flex h-screen bf-screen" style={{ background: 'var(--cream)', overflow: 'hidden' }}>
      <BuilderTopNav />
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>

        {/* main editor column */}
        <div ref={leftRef} className="bf-grid" style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '26px 0 60px' }}>
          {editorContent()}
        </div>

        {/* right rail */}
        <div className="bf-grid-fine" style={{ flex: '0 0 340px', borderLeft: '1px solid rgba(47,65,86,.16)', overflowY: 'auto', padding: '24px 22px 40px' }}>
          {railContent}
        </div>
      </div>
    </div>
  );

  return <>{mobile}{desktop}</>;
}
