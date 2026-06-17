import { useState } from 'react';
import { StatusBar, Wordmark } from '../components/ui';
import { CrestAvatar, SELF_DATA } from '../components/profile';
import {
  HUNTS, DISPATCH, CAT,
  FIcon, StarFilled, CatGlyph, BlankCover, HuntBadge, DiffPips, Author, MetaStrip,
  HuntCard, HuntRow, HuntListRow, FeedTabs, CatChips, ActivityRow, CreatePrompt,
} from '../components/feed';

/* ── mobile icon button ── */
function MIconBtn({ name, accent = false }: { name: Parameters<typeof FIcon>[0]['name']; accent?: boolean }) {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 12, border: '1.5px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent ? 'var(--rose)' : 'var(--navy)', flex: '0 0 auto' }}>
      <FIcon name={name} size={18} />
    </div>
  );
}

/* ── mobile section label ── */
function MSecLabel({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 11 }}>
      <span className="bf-kicker solo" style={{ color: 'var(--sage)' }}>{children}</span>
      {action && (
        <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, color: 'var(--rose)', display: 'flex', alignItems: 'center', gap: 3 }}>
          {action}<FIcon name="chevron" size={13} stroke="var(--rose)" />
        </span>
      )}
    </div>
  );
}

/* ── desktop section label ── */
function WSecLabel({ children, action }: { children: React.ReactNode; action?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
      <span className="bf-kicker solo" style={{ color: 'var(--sage)' }}>{children}</span>
      {action && (
        <span style={{ marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, color: 'var(--rose)', display: 'flex', alignItems: 'center', gap: 3 }}>
          {action}<FIcon name="chevron" size={13} stroke="var(--rose)" />
        </span>
      )}
    </div>
  );
}

/* ── mobile created post ── */
function PostActions() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 11, paddingTop: 11, borderTop: '1px solid var(--faint)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--rose)' }}>
        <FIcon name="bookmark" size={16} stroke="var(--rose)" />Save
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 600, color: 'var(--navy-soft)' }}>
        <FIcon name="users" size={16} stroke="var(--sage)" />340 solving
      </span>
      <button className="bf-btn bf-btn-primary" style={{ marginLeft: 'auto', width: 'auto', height: 38, padding: '0 16px', fontSize: 12.5 }}>
        Solve<FIcon name="arrow" size={15} stroke="currentColor" />
      </button>
    </div>
  );
}

function MobileCreatedPost({ item }: { item: (typeof DISPATCH)[number] }) {
  if (!item.hunt) return null;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <CrestAvatar emblemIndex={item.crest} size={34} seal={false} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, color: 'var(--navy-soft)', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
            <b style={{ color: 'var(--navy)' }}>{item.user}</b> charted a new hunt
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{item.time}</div>
        </div>
      </div>
      <HuntCard hunt={item.hunt} coverH={120} />
      <PostActions />
    </div>
  );
}

/* ── desktop inline hunt card (compact horizontal, for Dispatch posts) ── */
function HuntInline({ hunt }: { hunt: (typeof HUNTS)[number] }) {
  return (
    <div style={{ border: '1.5px solid var(--line)', borderRadius: 16, background: '#fff', overflow: 'hidden', display: 'flex', padding: 7, gap: 2 }}>
      <div style={{ flex: '0 0 168px' }}>
        <BlankCover height={132} radius={12} cat={hunt.cat} corner={false} />
      </div>
      <div style={{ flex: 1, minWidth: 0, padding: '10px 16px 8px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--navy)' }}>
            <CatGlyph i={hunt.cat} size={18} />{CAT[hunt.cat]}
          </span>
          <span style={{ marginLeft: 'auto' }}><HuntBadge kind={hunt.badge} /></span>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 21, color: 'var(--navy)', lineHeight: 1.06, marginTop: 8 }}>{hunt.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 'auto', paddingTop: 12 }}>
          <DiffPips level={hunt.diff} />
          <MetaStrip hunt={hunt} items={['clues', 'players']} />
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <StarFilled /><span style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--navy)' }}>{hunt.rating}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── desktop created post (The Dispatch) ── */
function DispatchCreated({ item }: { item: (typeof DISPATCH)[number] }) {
  if (!item.hunt) return null;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 11 }}>
        <CrestAvatar emblemIndex={item.crest} size={38} seal={false} />
        <div style={{ fontSize: 13.5, color: 'var(--navy-soft)' }}>
          <b style={{ color: 'var(--navy)' }}>{item.user}</b> charted a new hunt
          {' · '}<span style={{ color: 'var(--muted)' }}>{item.time}</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, color: 'var(--rose)' }}>
            <FIcon name="bookmark" size={15} stroke="var(--rose)" />Save
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 600, color: 'var(--navy-soft)' }}>
            <FIcon name="arrow" size={15} stroke="var(--sage)" />Share
          </span>
        </div>
      </div>
      <HuntInline hunt={item.hunt} />
    </div>
  );
}

/* ── right rail: follow row ── */
function FollowRow({ name, crest, label }: { name: string; crest: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '7px 0' }}>
      <CrestAvatar emblemIndex={crest} size={34} seal={false} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--navy)', lineHeight: 1 }}>{name}</div>
        <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3 }}>{label}</div>
      </div>
      <button className="bf-btn bf-btn-ghost" style={{ width: 'auto', height: 34, padding: '0 15px', fontSize: 12.5 }}>
        <FIcon name="plus" size={14} stroke="currentColor" sw={2.4} />Follow
      </button>
    </div>
  );
}

/* ── desktop top nav (Journal active) ── */
function FeedTopNav() {
  const items = ['Map', 'Trails', 'Journal', 'Guild', 'Profile'];
  const active = 'Journal';
  return (
    <div style={{ flex: '0 0 auto', height: 64, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', padding: '0 30px', background: 'var(--cream)', position: 'relative', zIndex: 3 }}>
      <Wordmark size={22} />
      <div style={{ display: 'flex', gap: 26, marginLeft: 38 }}>
        {items.map((t) => (
          <span key={t} style={{ position: 'relative', fontSize: 13.5, letterSpacing: '.2px', fontWeight: t === active ? 700 : 600, color: t === active ? 'var(--navy)' : 'var(--muted)' }}>
            {t}
            {t === active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -22, height: 2.5, background: 'var(--rose)', borderRadius: 2 }} />}
          </span>
        ))}
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, border: '1.5px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
          <FIcon name="compass" size={18} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <CrestAvatar emblemIndex={SELF_DATA.crest} size={36} seal={false} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{SELF_DATA.name.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   Feed page — Mobile: The Dispatch · Desktop: The Dispatch + right rail
   Mobile tabs: Following (social) · Discover (hunt catalog) · Reviews
   ====================================================================== */
export function Feed() {
  const [mobileTab, setMobileTab] = useState(0);

  return (
    <>
      {/* ── Mobile: The Dispatch ── */}
      <div className="md:hidden min-h-screen bf-screen" style={{ background: 'var(--cream)' }}>
        <StatusBar />
        <div className="bf-body" style={{ gap: 14, padding: '6px 20px 22px' }}>

          {/* header */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div>
              <span className="bf-kicker solo" style={{ color: 'var(--rose)' }}>
                {mobileTab === 1 ? "Explorer's bulletin" : 'From your guild'}
              </span>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 27, color: 'var(--navy)', lineHeight: 1, marginTop: 6, whiteSpace: 'nowrap' }}>
                {mobileTab === 1 ? 'Fresh trails' : 'The Dispatch'}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 9 }}>
              <MIconBtn name="search" />
              {mobileTab === 1 && <MIconBtn name="sliders" />}
            </div>
          </div>

          {/* primary tabs */}
          <FeedTabs items={['Following', 'Discover', 'Reviews']} active={mobileTab} onSelect={setMobileTab} />

          {/* ── Following tab: social Dispatch ── */}
          {mobileTab === 0 && (
            <>
              <CreatePrompt compact />
              <MobileCreatedPost item={DISPATCH[0]} />
              <div style={{ borderTop: '1px solid var(--faint)' }}>
                <ActivityRow item={DISPATCH[1]} />
              </div>
              <div style={{ borderTop: '1px solid var(--faint)' }}>
                <ActivityRow item={DISPATCH[2]} />
              </div>
              <div style={{ borderTop: '1px solid var(--faint)' }}>
                <MobileCreatedPost item={DISPATCH[3]} />
              </div>
              <div style={{ borderTop: '1px solid var(--faint)' }}>
                <ActivityRow item={DISPATCH[4]} />
              </div>
            </>
          )}

          {/* ── Discover tab: Explorer's Bulletin ── */}
          {mobileTab === 1 && (
            <>
              {/* search */}
              <div className="bf-input" style={{ height: 48, flexShrink: 0 }}>
                <span className="ico"><FIcon name="search" size={18} /></span>
                <span className="ph" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Search hunts, makers, regions…</span>
              </div>

              {/* filter tabs */}
              <FeedTabs items={['New', 'Trending', 'Nearby', 'Following']} active={1} />

              {/* category chips */}
              <CatChips active={0} />

              {/* hunt rows */}
              <div style={{ flexShrink: 0 }}>
                <MSecLabel action="See all">Latest trails</MSecLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <HuntListRow hunt={HUNTS[3]} compact />
                  <HuntListRow hunt={HUNTS[1]} compact />
                  <HuntListRow hunt={HUNTS[5]} compact />
                  <HuntListRow hunt={HUNTS[2]} compact />
                </div>
              </div>
            </>
          )}

          {/* ── Reviews tab: placeholder ── */}
          {mobileTab === 2 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingBottom: 40 }}>
              <FIcon name="star" size={40} stroke="var(--line-2)" sw={1.2} />
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--navy)', textAlign: 'center' }}>Reviews coming soon</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)', textAlign: 'center', maxWidth: 220, lineHeight: 1.5 }}>Explorer ratings and write-ups will appear here.</div>
            </div>
          )}

        </div>
      </div>

      {/* ── Desktop: The Dispatch + right rail ── */}
      <div className="hidden md:flex h-screen bf-screen bf-grid" style={{ overflow: 'hidden' }}>
        <FeedTopNav />
        <div style={{ flex: 1, minHeight: 0, display: 'flex', gap: 24, padding: '22px 30px', overflowY: 'auto' }}>

          {/* main feed */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            {/* header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: 16 }}>
              <div>
                <span className="bf-kicker solo" style={{ color: 'var(--rose)' }}>From your guild</span>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 30, color: 'var(--navy)', lineHeight: 1, marginTop: 7, whiteSpace: 'nowrap' }}>The Dispatch</div>
              </div>
              <div style={{ marginLeft: 'auto', marginBottom: 4 }}>
                <FeedTabs items={['Following', 'Discover', 'Reviews']} active={0} />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}><CreatePrompt /></div>

            <DispatchCreated item={DISPATCH[0]} />

            <div style={{ marginTop: 6, borderTop: '1px solid var(--faint)' }}>
              <ActivityRow item={DISPATCH[1]} />
            </div>
            <div style={{ borderTop: '1px solid var(--faint)' }}>
              <ActivityRow item={DISPATCH[2]} />
            </div>
            <div style={{ marginTop: 6, borderTop: '1px solid var(--faint)', paddingTop: 6 }}>
              <DispatchCreated item={DISPATCH[3]} />
            </div>
            <div style={{ borderTop: '1px solid var(--faint)' }}>
              <ActivityRow item={DISPATCH[4]} />
            </div>
          </div>

          {/* right rail */}
          <div style={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 0, alignSelf: 'flex-start' }}>
            {/* trending */}
            <div style={{ border: '1.5px solid var(--line)', borderRadius: 16, background: '#fff', padding: '13px 16px' }}>
              <WSecLabel action="See all">Trending this week</WSecLabel>
              <div>
                {[HUNTS[1], HUNTS[3], HUNTS[5]].map((h, i) => (
                  <div key={h.id} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--faint)' }}>
                    <HuntRow hunt={h} rank={i + 1} />
                  </div>
                ))}
              </div>
            </div>

            {/* cartographers to follow */}
            <div style={{ border: '1.5px solid var(--line)', borderRadius: 16, background: 'var(--sand)', padding: '13px 16px' }}>
              <WSecLabel>Cartographers to follow</WSecLabel>
              <div>
                {[
                  { n: 'Wren Holloway', c: 1, l: 'Master of Ciphers · 21 trails' },
                  { n: 'Asa Frost',     c: 0, l: 'Pathfinder · 14 trails' },
                  { n: 'Silas Crane',   c: 3, l: 'Vault-keeper · 9 trails' },
                ].map((m, i) => (
                  <div key={m.n} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
                    <FollowRow name={m.n} crest={m.c as 0 | 1 | 2 | 3} label={m.l} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
