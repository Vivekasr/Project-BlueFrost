import { useNavigate } from 'react-router-dom';
import { BF_EMBLEMS, Contours } from '../components/art';
import { StatusBar, Btn, Icon, Wordmark } from '../components/ui';
import { useAuthStore } from '../store/auth';

export function Success() {
  const nav = useNavigate();
  const { username } = useAuthStore();
  const TreasureArt = BF_EMBLEMS[3].Art;

  const Content = ({ web = false }) => (
    <>
      <div className="bf-seal" style={web ? { width: 110, height: 110 } : {}}>
        <Icon name="check" size={web ? 48 : 42} stroke="#fff" sw={2.4} />
      </div>
      <span className="bf-kicker solo" style={{ justifyContent: 'center', marginTop: 26 }}>Welcome aboard</span>
      <h1 className="bf-h1" style={{ marginTop: 12, fontSize: web ? 48 : 38 }}>
        You're all set,{username ? ` ${username}` : ' Captain'}.
      </h1>
      <p className="bf-sub" style={{ marginTop: 12, maxWidth: 280 }}>
        Your explorer profile is ready and your first quest is waiting on the map.
      </p>
      {/* first quest teaser */}
      <div style={{
        width: web ? 420 : '100%', marginTop: 26,
        border: '1.5px solid rgba(47,65,86,.14)', borderRadius: 16,
        background: '#fff', padding: web ? 18 : 16,
        display: 'flex', alignItems: 'center', gap: web ? 16 : 14, textAlign: 'left',
      }}>
        <div style={{
          width: web ? 54 : 48, height: web ? 54 : 48, borderRadius: 12,
          background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
        }}>
          <TreasureArt size={web ? 40 : 36} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: web ? 18 : 16, color: 'var(--navy)' }}>The Harbor Cipher</div>
          <div className="bf-fine">First quest · 0.4 mi away</div>
        </div>
        <span style={{ marginLeft: 'auto', color: 'var(--rose)' }}>
          <Icon name="arrow" size={web ? 22 : 20} stroke="var(--rose)" />
        </span>
      </div>
      <div style={{ width: '100%', marginTop: 22 }}>
        <Btn kind="primary" arrow onClick={() => alert('Map coming soon! 🗺️')}>Start exploring</Btn>
      </div>
    </>
  );

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <div className="bf-mapframe" />
        <Contours width={390} height={280} style={{ position: 'absolute', top: 10, left: 0, opacity: .06 }} />
        <StatusBar />
        <div className="bf-body center" style={{ alignItems: 'center', textAlign: 'center' }}>
          <Content />
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-screen bf-grid" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="bf-mapframe" style={{ inset: 22 }} />
        <Contours width={1100} height={360} style={{ position: 'absolute', top: 0, left: 0, opacity: .05 }} />
        <div style={{ position: 'absolute', top: 34, left: 56 }}><Wordmark size={24} /></div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 460, textAlign: 'center' }}>
          <Content web />
        </div>
      </div>
    </>
  );
}
