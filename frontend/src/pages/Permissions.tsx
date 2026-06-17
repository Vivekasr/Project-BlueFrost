import { useNavigate } from 'react-router-dom';
import { StatusBar, BackBtn, Btn, Steps, MapMini } from '../components/ui';
import { Icon } from '../components/ui';

export function Permissions() {
  const nav = useNavigate();

  function handleEnable() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => nav('/success'),
        () => nav('/success'),
      );
    } else {
      nav('/success');
    }
  }

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BackBtn onClick={() => nav(-1)} />
            <Steps n={4} active={3} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 22 }}>
            <MapMini w={326} h={210} />
          </div>
          <div style={{ marginTop: 26 }}>
            <span className="bf-kicker">
              <Icon name="pin" size={14} stroke="var(--rose)" />
              Location access
            </span>
            <h1 className="bf-h1" style={{ marginTop: 12 }}>Find relics<br />near you.</h1>
            <p className="bf-sub" style={{ marginTop: 12 }}>
              BlueFrost uses your location to drop pins, reveal nearby quests, and chart your routes — only while you're hunting.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto', paddingTop: 22 }}>
            <Btn kind="primary" icon="pin" onClick={handleEnable}>Enable location</Btn>
            <button className="bf-btn bf-btn-text" onClick={() => nav('/success')}>Maybe later</button>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-web">
        <div className="bf-web-brand" style={{ flex: '0 0 52%', background: '#EEF3F7', padding: 0, justifyContent: 'center', alignItems: 'center' }}>
          <MapMini w={520} h={420} r={20} />
        </div>
        <div className="bf-web-form bf-grid">
          <div className="inner">
            <span className="bf-kicker">
              <Icon name="pin" size={14} stroke="var(--rose)" />
              Location access · Step 4 of 4
            </span>
            <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 32 }}>Find relics near you</h2>
            <p className="bf-sub" style={{ marginTop: 12, fontSize: 15.5 }}>
              BlueFrost uses your location to drop pins, reveal nearby quests, and chart your routes — only while you're actively hunting.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
              <Btn kind="primary" icon="pin" onClick={handleEnable}>Enable location</Btn>
              <button className="bf-btn bf-btn-text" onClick={() => nav('/success')}>Maybe later</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
