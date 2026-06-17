import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, BackBtn, Btn, BrandPanel } from '../components/ui';
import { useAuthStore } from '../store/auth';

const OTP_LEN = 6;

export function OTP() {
  const nav = useNavigate();
  const { email } = useAuthStore();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LEN).fill(''));
  const [countdown, setCountdown] = useState(24);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
    const t = setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  function handleChange(i: number, val: string) {
    const ch = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    if (ch && i < OTP_LEN - 1) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      const next = [...digits];
      next[i - 1] = '';
      setDigits(next);
      refs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LEN);
    const next = Array(OTP_LEN).fill('');
    text.split('').forEach((c, i) => { next[i] = c; });
    setDigits(next);
    refs.current[Math.min(text.length, OTP_LEN - 1)]?.focus();
  }

  function handleVerify() {
    nav('/onboarding');
  }

  const maskedEmail = email
    ? email[0] + '•••@' + email.split('@')[1]
    : 'r•••@bluefrost.co';

  const OTPBoxes = () => (
    <div style={{ display: 'flex', gap: 9, justifyContent: 'space-between' }}>
      {digits.map((d, i) => (
        <div key={i} className={'bf-otp' + (i === digits.findIndex(x => !x) ? ' on' : (d ? ' on' : ''))}>
          {d}
          <input
            ref={el => { refs.current[i] = el; }}
            type="text" inputMode="numeric" maxLength={1}
            value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            onPaste={handlePaste}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'text' }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ── Mobile ── */}
      <div className="md:hidden min-h-screen bf-screen bf-grid">
        <StatusBar />
        <div className="bf-body" style={{ gap: 0 }}>
          <BackBtn onClick={() => nav(-1)} />
          <div style={{ marginTop: 24 }}>
            <span className="bf-kicker">Verify it's you</span>
            <h1 className="bf-h1" style={{ marginTop: 12 }}>Check your<br />spyglass.</h1>
            <p className="bf-sub" style={{ marginTop: 12 }}>
              We sent a 6-digit cipher to <b style={{ color: 'var(--navy)' }}>{maskedEmail}</b>
            </p>
          </div>
          <div style={{ marginTop: 30 }}><OTPBoxes /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
            <Btn kind="primary" onClick={handleVerify}>Verify & continue</Btn>
            <div style={{ textAlign: 'center', fontSize: 13.5, color: 'var(--muted)' }}>
              Didn't get it?{' '}
              {countdown > 0
                ? <>Resend in <b style={{ color: 'var(--navy)' }}>0:{String(countdown).padStart(2, '0')}</b></>
                : <a className="bf-link" href="#" onClick={e => { e.preventDefault(); setCountdown(24); }}>Resend now</a>
              }
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex h-screen bf-web">
        <BrandPanel
          kicker="Verify it's you"
          title={<>Check your<br />spyglass.</>}
          sub="One quick cipher confirms this expedition is really yours."
        />
        <div className="bf-web-form bf-grid">
          <div className="inner">
            <span className="bf-kicker">Email verification</span>
            <h2 className="bf-h2" style={{ marginTop: 12, fontSize: 30 }}>Enter your 6-digit cipher</h2>
            <p className="bf-sub" style={{ marginTop: 10 }}>
              Sent to <b style={{ color: 'var(--navy)' }}>{maskedEmail}</b>
            </p>
            <div style={{ marginTop: 24 }}><OTPBoxes /></div>
            <div style={{ marginTop: 24 }}><Btn kind="primary" onClick={handleVerify}>Verify & continue</Btn></div>
            <div style={{ marginTop: 16, fontSize: 13.5, color: 'var(--muted)' }}>
              Didn't get it?{' '}
              {countdown > 0
                ? <>Resend in <b style={{ color: 'var(--navy)' }}>0:{String(countdown).padStart(2, '0')}</b></>
                : <a className="bf-link" href="#" onClick={e => { e.preventDefault(); setCountdown(24); }}>Resend now</a>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
