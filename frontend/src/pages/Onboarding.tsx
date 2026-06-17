import { useNavigate } from 'react-router-dom';
import { BF_EMBLEMS } from '../components/art';
import { StatusBar, BackBtn, Btn, Steps, Icon, Wordmark } from '../components/ui';
import { useAuthStore } from '../store/auth';

const INTERESTS = [
  ['Caves', 'on'], ['Shipwrecks', 'on rose'], ['Ruins', ''],
  ['Geocaching', 'on sage'], ['Urbex', ''], ['Lore', 'on'],
  ['Summits', ''], ['Coastal', ''], ['Caches', ''],
] as const;

export function Onboarding() {
  const nav = useNavigate();
  const { username, setUsername, avatarIndex, setAvatarIndex, interests, toggleInterest } = useAuthStore();

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BackBtn onClick={() => nav(-1)} />
            <Steps n={4} active={2} />
          </div>
          <div style={{ marginTop: 20 }}>
            <span className="bf-kicker">Step 3 of 4 · Your dossier</span>
            <h1 className="bf-h1" style={{ marginTop: 10 }}>Pick your pursuits.</h1>
          </div>
          {/* avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
            {BF_EMBLEMS.map((e, i) => (
              <div key={e.key}
                onClick={() => setAvatarIndex(i)}
                style={{
                  width: 54, height: 54, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i === avatarIndex ? 'var(--navy)' : 'var(--sand)',
                  border: i === avatarIndex ? '2px solid var(--navy)' : '1.5px solid rgba(47,65,86,.12)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <e.Art size={40} />
              </div>
            ))}
            <span style={{ fontSize: 12, color: 'var(--muted)', maxWidth: 70, lineHeight: 1.3 }}>Choose your crest</span>
          </div>
          {/* username */}
          <div style={{ marginTop: 18 }}>
            <span className="bf-flabel">Username</span>
            <div className="bf-input focus" style={{ marginTop: 7 }}>
              <span style={{ color: 'var(--rose)', fontWeight: 700 }}>@</span>
              <input
                value={username}
                onChange={e => setUsername(e.target.value.replace(/\s/g, '_').toLowerCase())}
                placeholder="your_handle"
                style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}
              />
              {username.length >= 3 && (
                <span style={{ marginLeft: 'auto', color: 'var(--sage)', display: 'flex' }}>
                  <Icon name="check" size={16} stroke="var(--sage)" />
                </span>
              )}
            </div>
          </div>
          {/* interests */}
          <div style={{ marginTop: 18 }}>
            <span className="bf-flabel">What are you hunting for?</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 10 }}>
              {INTERESTS.map(([t]) => (
                <span
                  key={t}
                  className={'bf-chip' + (interests.includes(t) ? ' on' : '')}
                  onClick={() => toggleInterest(t)}
                >{t}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 18 }}>
            <Btn kind="primary" arrow onClick={() => nav('/permissions')}>Continue</Btn>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-screen bf-grid" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 34, left: 56 }}><Wordmark size={24} /></div>
        <div style={{ position: 'absolute', top: 40, right: 56, width: 220 }}><Steps n={4} active={2} /></div>
        <div style={{
          width: 620, background: '#fff', border: '1.5px solid rgba(47,65,86,.12)',
          borderRadius: 22, padding: '40px 48px', boxShadow: '0 24px 60px rgba(47,65,86,.10)',
        }}>
          <span className="bf-kicker">Step 3 of 4 · Your dossier</span>
          <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 32 }}>Set up your explorer profile</h2>
          <div style={{ display: 'flex', gap: 40, marginTop: 26 }}>
            <div style={{ flex: '0 0 auto' }}>
              <span className="bf-flabel">Crest</span>
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                {BF_EMBLEMS.map((e, i) => (
                  <div key={e.key}
                    onClick={() => setAvatarIndex(i)}
                    style={{
                      width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: i === avatarIndex ? 'var(--navy)' : 'var(--sand)',
                      border: i === avatarIndex ? '2px solid var(--navy)' : '1.5px solid rgba(47,65,86,.12)',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    <e.Art size={44} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <span className="bf-flabel">Username</span>
              <div className="bf-input focus" style={{ marginTop: 12 }}>
                <span style={{ color: 'var(--rose)', fontWeight: 700 }}>@</span>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value.replace(/\s/g, '_').toLowerCase())}
                  placeholder="your_handle"
                  style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}
                />
                {username.length >= 3 && (
                  <span style={{ marginLeft: 'auto', color: 'var(--sage)', display: 'flex' }}>
                    <Icon name="check" size={16} stroke="var(--sage)" />
                  </span>
                )}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 26 }}>
            <span className="bf-flabel">What are you hunting for?</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
              {INTERESTS.map(([t]) => (
                <span
                  key={t}
                  className={'bf-chip' + (interests.includes(t) ? ' on' : '')}
                  onClick={() => toggleInterest(t)}
                >{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button className="bf-btn bf-btn-ghost" style={{ flex: '0 0 130px' }} onClick={() => nav(-1)}>Back</button>
            <Btn kind="primary" arrow onClick={() => nav('/permissions')}>Continue</Btn>
          </div>
        </div>
      </div>
    </>
  );
}
