import { useSearchParams } from 'react-router-dom';
import { Compass, Contours } from '../components/art';
import { Icon, StatusBar, Wordmark } from '../components/ui';
import {
  SELF_DATA, PUBLIC_DATA,
  PIcon, CrestAvatar, TitleLine, PuzzleList,
  TrailProgress, JournalList, GuildStrip,
} from '../components/profile';

/* ---------- shared sub-components ---------- */

function IconBtn({ name, onDark = false }: { name: Parameters<typeof PIcon>[0]['name']; onDark?: boolean }) {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 12,
      border: '1.5px solid ' + (onDark ? 'rgba(254,252,246,.28)' : 'var(--line-2)'),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: onDark ? '#FEFCF6' : 'var(--navy)', flex: '0 0 auto',
    }}>
      <PIcon name={name} size={18} />
    </div>
  );
}

function SecLabel({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 11 }}>
      <span className="bf-kicker solo" style={{ color: 'var(--sage)' }}>{children}</span>
      {action && <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, color: 'var(--rose)' }}>{action}</span>}
    </div>
  );
}

function WebSecLabel({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
      <span className="bf-kicker solo" style={{ color: 'var(--sage)' }}>{children}</span>
      {action && (
        <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, color: 'var(--rose)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {action}<PIcon name="chevron" size={13} stroke="var(--rose)" />
        </span>
      )}
    </div>
  );
}

/* ── Mobile action row ── */
function MobileActions({ isPublic }: { isPublic: boolean }) {
  if (isPublic) {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="bf-btn bf-btn-primary" style={{ flex: 1 }}>
          <PIcon name="plus" size={17} stroke="currentColor" />Follow
        </button>
        <button className="bf-btn bf-btn-ghost" style={{ flex: 1 }}>
          <PIcon name="message" size={17} stroke="currentColor" />Message
        </button>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button className="bf-btn bf-btn-primary" style={{ flex: 1 }}>
        <PIcon name="pencil" size={16} stroke="currentColor" />Edit profile
      </button>
      <button className="bf-btn bf-btn-ghost" style={{ flex: '0 0 54px', padding: 0 }}>
        <PIcon name="share" size={18} stroke="currentColor" />
      </button>
    </div>
  );
}

/* ── Desktop top nav ── */
function TopNav() {
  const items = ['Map', 'Trails', 'Journal', 'Guild', 'Profile'];
  return (
    <div style={{
      flex: '0 0 auto', height: 64, borderBottom: '1px solid var(--line)',
      display: 'flex', alignItems: 'center', padding: '0 30px',
      background: 'var(--cream)', position: 'relative', zIndex: 3,
    }}>
      <Wordmark size={22} />
      <div style={{ display: 'flex', gap: 26, marginLeft: 38 }}>
        {items.map((t) => (
          <span key={t} style={{
            position: 'relative', fontSize: 13.5, letterSpacing: '.2px',
            fontWeight: t === 'Profile' ? 700 : 600,
            color: t === 'Profile' ? 'var(--navy)' : 'var(--muted)',
          }}>
            {t}
            {t === 'Profile' && (
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: -22, height: 2.5, background: 'var(--rose)', borderRadius: 2 }} />
            )}
          </span>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, border: '1.5px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
          <PIcon name="bell" size={18} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <CrestAvatar emblemIndex={SELF_DATA.crest} size={36} seal={false} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{SELF_DATA.name.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop action row ── */
function WebActions({ isPublic }: { isPublic: boolean }) {
  if (isPublic) {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="bf-btn bf-btn-primary" style={{ flex: 1, height: 50 }}>
          <PIcon name="plus" size={17} stroke="currentColor" />Follow
        </button>
        <button className="bf-btn bf-btn-ghost" style={{ flex: 1, height: 50 }}>
          <PIcon name="message" size={17} stroke="currentColor" />Message
        </button>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button className="bf-btn bf-btn-primary" style={{ flex: 1, height: 50 }}>
        <PIcon name="pencil" size={16} stroke="currentColor" />Edit profile
      </button>
      <button className="bf-btn bf-btn-ghost" style={{ flex: '0 0 50px', height: 50, padding: 0 }}>
        <PIcon name="share" size={18} stroke="currentColor" />
      </button>
    </div>
  );
}

/* ======================================================================
   Profile page — Mobile: Field Dossier · Desktop: Atlas Card
   ?view=public to render the public explorer state
   ====================================================================== */
export function Profile() {
  const [params] = useSearchParams();
  const isPublic = params.get('view') === 'public';
  const u = isPublic ? PUBLIC_DATA : SELF_DATA;

  return (
    <>
      {/* ── Mobile: Field Dossier ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0, padding: '6px 22px 22px' }}>

          {/* app bar */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconBtn name="back" />
            <span style={{ marginLeft: 14, fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--navy)' }}>
              {isPublic ? 'Explorer' : 'My dossier'}
            </span>
            <span style={{ marginLeft: 'auto' }}>
              <IconBtn name={isPublic ? 'dots' : 'settings'} />
            </span>
          </div>

          {/* navy banner */}
          <div className="bf-navy-grid" style={{ position: 'relative', height: 96, flex: '0 0 auto', borderRadius: 20, marginTop: 16, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -28, top: -34, opacity: .22 }}>
              <Compass size={150} stroke="#FEFCF6" />
            </div>
            <Contours width={390} height={120} color="#FEFCF6" opacity={0.1} style={{ position: 'absolute', bottom: -10, left: 0 }} />
            <span className="bf-kicker solo" style={{ position: 'absolute', top: 16, right: 18, color: 'var(--sky)' }}>
              Field dossier
            </span>
          </div>

          {/* crest + name pulled over banner */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: -40, paddingLeft: 4, position: 'relative' }}>
            <div style={{ background: 'var(--cream)', borderRadius: '50%', padding: 4 }}>
              <CrestAvatar emblemIndex={u.crest} size={80} />
            </div>
            <div style={{ paddingBottom: 6, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 25, color: 'var(--navy)', lineHeight: 1 }}>{u.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 5 }}>@{u.handle}</div>
            </div>
          </div>

          <div style={{ marginTop: 11 }}><TitleLine title={u.title} rank={u.rank} /></div>
          <p style={{ margin: '8px 0 0', fontSize: 13.5, lineHeight: 1.5, color: 'var(--navy-soft)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
            {u.blurb}
          </p>

          <div style={{ marginTop: 13 }}><MobileActions isPublic={isPublic} /></div>

          {/* puzzle section */}
          <div style={{ marginTop: 16 }}>
            <SecLabel>Puzzles</SecLabel>
            <PuzzleList puzzles={u.puzzles} />
          </div>

          {/* current trail */}
          <div style={{ marginTop: 13 }}>
            <TrailProgress trail={u.trail} locked={isPublic} />
          </div>

          {/* field journal */}
          <div style={{ marginTop: 13 }}>
            <SecLabel action="Full log">{isPublic ? 'Recent finds' : 'Field journal'}</SecLabel>
            <JournalList items={u.journal.slice(0, 3)} dense />
          </div>
        </div>
      </div>

      {/* ── Desktop: Atlas Card ── */}
      <div className="hidden md:flex h-screen bf-screen bf-grid" style={{ overflow: 'hidden' }}>
        <TopNav />
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: '22px 30px', gap: 18, overflowY: 'auto' }}>

          {/* hero banner */}
          <div className="bf-navy-grid" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 22, flex: '0 0 auto' }}>
            <div style={{ position: 'absolute', right: -40, top: -56, opacity: .2 }}>
              <Compass size={220} stroke="#FEFCF6" />
            </div>
            <Contours width={700} height={200} color="#FEFCF6" opacity={0.08} style={{ position: 'absolute', bottom: -30, left: 0 }} />
            <div style={{ background: 'var(--navy)', borderRadius: '50%', padding: 4, position: 'relative' }}>
              <CrestAvatar emblemIndex={u.crest} size={96} dark />
            </div>
            <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--cream)', lineHeight: 1 }}>{u.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 9 }}>
                <span style={{ fontSize: 13, color: 'rgba(254,252,246,.7)' }}>@{u.handle}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(254,252,246,.4)' }} />
                <TitleLine title={u.title} rank={u.rank} dark />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 12, color: 'rgba(254,252,246,.66)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <PIcon name="calendar" size={13} stroke="var(--sky)" />{u.joined}
                </span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(254,252,246,.4)' }} />
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon name="pin" size={13} stroke="var(--sky)" />{u.place}
                </span>
              </div>
            </div>
            <div style={{ position: 'relative', width: 250, flex: '0 0 auto' }}>
              <WebActions isPublic={isPublic} />
            </div>
          </div>

          {/* puzzle section */}
          <div>
            <WebSecLabel>Puzzles</WebSecLabel>
            <div style={{ border: '1.5px solid var(--line)', borderRadius: 14, background: '#fff', padding: '4px 20px' }}>
              <PuzzleList puzzles={u.puzzles} />
            </div>
          </div>

          {/* body: field journal | trail + guild */}
          <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 20, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <WebSecLabel action="Full log">{isPublic ? 'Recent finds' : 'Field journal'}</WebSecLabel>
              <div style={{ border: '1.5px solid var(--line)', borderRadius: 14, background: '#fff', padding: '4px 20px' }}>
                <JournalList items={u.journal} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
              <TrailProgress trail={u.trail} locked={isPublic} />
              <GuildStrip guild={u.guild} mutual={isPublic} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
