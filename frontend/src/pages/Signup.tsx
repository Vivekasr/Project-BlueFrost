import { useNavigate } from 'react-router-dom';
import { StatusBar, BackBtn, Social, Btn, BrandPanel } from '../components/ui';

export function Signup() {
  const nav = useNavigate();

  const Options = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Social provider="Google" onClick={() => nav('/verify')} />
      <Social provider="Apple" onClick={() => nav('/verify')} />
      <div className="bf-or" style={{ margin: '6px 0' }}>or</div>
      <Btn kind="primary" icon="mail" onClick={() => nav('/signup/email')}>Sign up with email</Btn>
    </div>
  );

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0 }}>
          <BackBtn onClick={() => nav(-1)} />
          <div style={{ marginTop: 22 }}>
            <span className="bf-kicker">Join the expedition</span>
            <h1 className="bf-h1" style={{ marginTop: 12 }}>Begin your<br />first quest.</h1>
            <p className="bf-sub" style={{ marginTop: 12 }}>Create your explorer profile in under a minute.</p>
          </div>
          <div style={{ marginTop: 30 }}>
            <Options />
          </div>
          <p className="bf-fine" style={{ marginTop: 20, textAlign: 'center', padding: '0 6px' }}>
            By continuing you agree to BlueFrost's{' '}
            <a className="bf-link" href="#">Terms</a> &{' '}
            <a className="bf-link" href="#">Privacy Policy</a>.
          </p>
          <div style={{ marginTop: 'auto', paddingTop: 18, textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
            Already aboard? <a className="bf-link" href="#" onClick={e => { e.preventDefault(); nav('/login'); }}>Log in</a>
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
            <span className="bf-kicker">Create account</span>
            <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 30 }}>Start your expedition</h2>
            <p className="bf-sub" style={{ marginTop: 10 }}>Sign up in under a minute.</p>
            <div style={{ marginTop: 24 }}>
              <Options />
            </div>
            <p className="bf-fine" style={{ marginTop: 20, textAlign: 'center' }}>
              By continuing you agree to BlueFrost's{' '}
              <a className="bf-link" href="#">Terms</a> &{' '}
              <a className="bf-link" href="#">Privacy Policy</a>.
            </p>
            <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
              Already aboard? <a className="bf-link" href="#" onClick={e => { e.preventDefault(); nav('/login'); }}>Log in</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
