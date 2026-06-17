import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contours } from '../components/art';
import { LoadingMedallion, Wordmark } from '../components/ui';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/welcome'), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bf-grid" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="bf-mapframe" />
      <Contours width={600} height={400} style={{ position: 'absolute', top: -20, left: 0, opacity: .06 }} />
      <Contours width={600} height={400} style={{ position: 'absolute', bottom: -30, left: 0, opacity: .06, transform: 'rotate(180deg)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, position: 'relative', zIndex: 2 }}>
        <Wordmark size={30} />
        <div style={{ height: 46 }} />
        <LoadingMedallion size={216} />
        <div style={{ height: 52 }} />
        <div style={{ width: 180, height: 4, borderRadius: 2, background: 'rgba(47,65,86,.12)', overflow: 'hidden', position: 'relative' }}>
          <div className="bf-progress-bar" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 0, background: 'var(--navy)', borderRadius: 2 }} />
        </div>
        <div className="bf-fine" style={{ marginTop: 12, letterSpacing: '.4px', whiteSpace: 'nowrap' }}>Unfurling your atlas…</div>
      </div>
    </div>
  );
}
