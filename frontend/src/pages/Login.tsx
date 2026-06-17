import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, BackBtn, InputField, Btn, Social, Icon, BrandPanel } from '../components/ui';
import { useAuthStore } from '../store/auth';

export function Login() {
  const nav = useNavigate();
  const { email, password, setEmail, setPassword } = useAuthStore();
  const [rememberMe, setRememberMe] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    nav('/verify');
  }

  const FormContent = () => (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputField label="Email" icon="mail" placeholder="you@example.com" type="email" value={email} onChange={setEmail} />
      <InputField label="Password" icon="lock" placeholder="••••••••" type="password" value={password} onChange={setPassword} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}
          onClick={() => setRememberMe(p => !p)}
        >
          <span className={'bf-check' + (rememberMe ? ' on' : '')}>
            {rememberMe && <Icon name="check" size={13} />}
          </span>
          Stay logged in
        </span>
        <a className="bf-link" href="#" style={{ fontSize: 13.5 }} onClick={e => { e.preventDefault(); nav('/forgot'); }}>Forgot?</a>
      </div>
      <button type="submit" className="bf-btn bf-btn-primary">Log in</button>
      <div className="bf-or">or</div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Social provider="Google" compact onClick={() => nav('/verify')} />
        <Social provider="Apple" compact onClick={() => nav('/verify')} />
      </div>
    </form>
  );

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0 }}>
          <BackBtn onClick={() => nav(-1)} />
          <div style={{ marginTop: 22 }}>
            <span className="bf-kicker">Welcome back</span>
            <h1 className="bf-h1" style={{ marginTop: 12 }}>Chart your way<br />back in.</h1>
          </div>
          <div style={{ marginTop: 28 }}>
            <FormContent />
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 18, textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
            New to the hunt? <a className="bf-link" href="#" onClick={e => { e.preventDefault(); nav('/signup'); }}>Create account</a>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-web">
        <BrandPanel
          kicker="Welcome back"
          title={<>Your map<br />remembers you.</>}
          sub="Pick up the trail exactly where you left it."
        />
        <div className="bf-web-form bf-grid">
          <div className="inner">
            <span className="bf-kicker">Log in</span>
            <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 30 }}>Welcome back, explorer</h2>
            <div style={{ marginTop: 24 }}>
              <FormContent />
            </div>
            <div style={{ marginTop: 22, textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
              New to the hunt? <a className="bf-link" href="#" onClick={e => { e.preventDefault(); nav('/signup'); }}>Create account</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
