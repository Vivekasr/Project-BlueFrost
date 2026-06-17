import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtCipher } from '../components/art';
import { StatusBar, BackBtn, InputField, Btn, BrandPanel } from '../components/ui';
import { useAuthStore } from '../store/auth';

export function ForgotPassword() {
  const nav = useNavigate();
  const { email, setEmail } = useAuthStore();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => nav('/verify'), 1500);
  }

  const FormContent = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '28px 0 6px' }}>
        <div style={{
          width: 104, height: 104, borderRadius: '50%',
          background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1.5px solid rgba(47,65,86,.1)',
        }}>
          <ArtCipher size={78} />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <span className="bf-kicker solo" style={{ justifyContent: 'center' }}>Recover access</span>
        <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 28 }}>Lost your<br />bearings?</h2>
        <p className="bf-sub" style={{ marginTop: 12, maxWidth: 280, marginInline: 'auto' }}>
          Enter your email and we'll send a recovery cipher to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 26 }}>
        <InputField label="Email" icon="mail" placeholder="you@example.com" type="email" value={email} onChange={setEmail} autoFocus />
        <button type="submit" className="bf-btn bf-btn-primary" disabled={sent} style={{ opacity: sent ? 0.7 : 1 }}>
          {sent ? 'Recovery link sent!' : 'Send reset link'}
        </button>
      </form>
    </>
  );

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0 }}>
          <BackBtn onClick={() => nav(-1)} />
          <FormContent />
          <div style={{ marginTop: 'auto', paddingTop: 18, textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
            Remembered it? <a className="bf-link" href="#" onClick={e => { e.preventDefault(); nav('/login'); }}>Back to login</a>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-web">
        <BrandPanel
          kicker="Lost your way?"
          title={<>We'll help<br />you find it.</>}
          sub="Enter your email and we'll send a recovery cipher to reset your password."
        />
        <div className="bf-web-form bf-grid">
          <div className="inner">
            <FormContent />
            <div style={{ marginTop: 22, textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
              Remembered it? <a className="bf-link" href="#" onClick={e => { e.preventDefault(); nav('/login'); }}>Back to login</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
