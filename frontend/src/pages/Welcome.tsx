import { useNavigate } from 'react-router-dom';
import { BF_EMBLEMS, Compass } from '../components/art';
import { Wordmark, Btn, BrandPanel } from '../components/ui';

export function Welcome() {
  const nav = useNavigate();

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 20px 24px' }}>
          {/* hero card */}
          <div className="bf-navy-grid" style={{
            flex: 1, borderRadius: 26, position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px 28px 26px',
          }}>
            <div style={{ position: 'absolute', right: -50, top: -40, opacity: .22 }}>
              <Compass size={260} stroke="#FEFCF6" />
            </div>
            <Wordmark size={24} dark />
            <div>
              <div className="bf-kicker solo" style={{ color: 'var(--sky)' }}>Field guide to the unknown</div>
              <h1 className="bf-h1" style={{ color: 'var(--cream)', fontSize: 40, marginTop: 14 }}>Hunt the world's hidden relics.</h1>
              <p className="bf-sub" style={{ color: 'rgba(254,252,246,.78)', marginTop: 14, fontSize: 15 }}>
                Decode ciphers, follow the map, and unearth what others walked right past.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                {BF_EMBLEMS.map((e) => (
                  <div key={e.key} style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: 'rgba(254,252,246,.1)', border: '1px solid rgba(254,252,246,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <e.Art size={36} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
            <Btn kind="primary" arrow onClick={() => nav('/signup')}>Create account</Btn>
            <Btn kind="ghost" onClick={() => nav('/login')}>I already have an account</Btn>
            <button className="bf-btn bf-btn-text" onClick={() => nav('/success')}>Explore as guest</button>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-web">
        <BrandPanel
          title={<>Hunt the world's<br />hidden relics.</>}
          sub="Decode ciphers, follow the map, and unearth what others walked right past."
        />
        <div className="bf-web-form bf-grid">
          <div className="inner">
            <span className="bf-kicker">Get started</span>
            <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 30 }}>Choose your path</h2>
            <p className="bf-sub" style={{ marginTop: 10 }}>Create an explorer profile, or pick up where you left off.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 26 }}>
              <Btn kind="primary" arrow onClick={() => nav('/signup')}>Create account</Btn>
              <Btn kind="ghost" onClick={() => nav('/login')}>I already have an account</Btn>
              <div className="bf-or" style={{ margin: '4px 0' }}>or</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="bf-social" style={{ flex: 1 }} onClick={() => nav('/verify')}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#2F4156" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12.2c0 5-3.6 8.3-9 8.3a8.5 8.5 0 1 1 5.8-14.7" /><path d="M12.5 11.8H21" />
                  </svg>
                  Google
                </button>
                <button className="bf-social" style={{ flex: 1 }} onClick={() => nav('/verify')}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="#2F4156">
                    <path d="M16 3c.1 1.2-.4 2.3-1.1 3.1-.8.9-2 1.5-3 1.4-.1-1.2.4-2.4 1.1-3.1C13.8 3.5 15 3 16 3zm3.3 14.6c-.5 1.2-.8 1.7-1.5 2.7-1 1.4-2.3 3.1-4 3.1-1.5 0-1.9-1-3.9-1-2 0-2.5 1-3.9 1-1.7 0-3-1.6-4-3C-.8 17 .3 11.4 3.3 9.8c1-.6 2.1-.9 3-.9 1.5 0 2.4 1 3.9 1 1.4 0 2.2-1 3.9-1 .9 0 2.6.3 3.8 1.6-3.3 1.9-2.8 6.7 1.4 8.1z" />
                  </svg>
                  Apple
                </button>
              </div>
              <button className="bf-btn bf-btn-text" style={{ marginTop: 4 }} onClick={() => nav('/success')}>Explore as guest</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
