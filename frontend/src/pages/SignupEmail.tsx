import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, BackBtn, InputField, PasswordStrength, Btn, Steps, Icon, BrandPanel } from '../components/ui';
import { useAuthStore } from '../store/auth';

export function SignupEmail() {
  const nav = useNavigate();
  const { email, password, name, setEmail, setPassword, setName } = useAuthStore();
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    nav('/verify');
  }

  const FormContent = () => (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputField label="Full name" icon="user" placeholder="Your name" value={name} onChange={setName} autoFocus />
      <InputField label="Email" icon="mail" placeholder="you@example.com" type="email" value={email} onChange={setEmail} />
      <div className="bf-field">
        <InputField label="Password" icon="lock" placeholder="Choose a strong password" type="password" value={password} onChange={setPassword} />
        <PasswordStrength password={password} />
      </div>
      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--muted)', lineHeight: 1.45, cursor: 'pointer' }}>
        <span className={'bf-check' + (agreed ? ' on' : '')} style={{ marginTop: 1 }} onClick={() => setAgreed(p => !p)}>
          {agreed && <Icon name="check" size={13} />}
        </span>
        <span>
          I agree to the <a className="bf-link" href="#">Terms</a> and{' '}
          <a className="bf-link" href="#">Privacy Policy</a>.
        </span>
      </label>
      <button type="submit" className="bf-btn bf-btn-primary" disabled={!agreed} style={{ opacity: agreed ? 1 : 0.5 }}>
        Create account <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
    </form>
  );

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BackBtn onClick={() => nav(-1)} />
            <Steps n={4} active={0} />
          </div>
          <div style={{ marginTop: 22 }}>
            <span className="bf-kicker">Step 1 of 4 · Credentials</span>
            <h1 className="bf-h1" style={{ marginTop: 12 }}>Make your mark.</h1>
          </div>
          <div style={{ marginTop: 26 }}>
            <FormContent />
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-web">
        <BrandPanel
          kicker="Join the expedition"
          title={<>Begin your<br />first quest.</>}
          sub="Create your explorer profile in under a minute."
        />
        <div className="bf-web-form bf-grid">
          <div className="inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="bf-kicker">Step 1 of 4</span>
              <Steps n={4} active={0} />
            </div>
            <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 30 }}>Make your mark</h2>
            <div style={{ marginTop: 22 }}>
              <FormContent />
            </div>
            <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
              Already aboard? <a className="bf-link" href="#" onClick={e => { e.preventDefault(); nav('/login'); }}>Log in</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
