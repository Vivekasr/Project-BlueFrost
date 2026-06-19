/* BlueFrost hunt builder (creator) components + state */

import React from 'react';
import { Compass } from './art';
import { CatGlyph } from './feed';
import { HIcon, MapTile, VideoFrame } from './hunt';

/* ---------- types ---------- */
export interface BuilderClue {
  id: string;
  type: 'text' | 'image' | 'map' | 'video';
  label: string;
  prompt: string;
  answers: string[];
  hint: string;
  _open: boolean;
  // image
  plate?: string;
  imageUrl?: string;
  // map
  place?: string;
  coords?: string;
  // video
  videoUrl?: string;
  poster?: string;
  reveal?: string;
}

export interface BuilderHunt {
  title: string;
  cat: 0 | 1 | 2 | 3;
  diff: 1 | 2 | 3 | 4 | 5;
  prize: string;
  blurb: string;
}

export interface BuilderState {
  hunt: BuilderHunt;
  clues: BuilderClue[];
  patchHunt: (p: Partial<BuilderHunt>) => void;
  patch: (id: string, p: Partial<BuilderClue>) => void;
  setType: (id: string, t: BuilderClue['type']) => void;
  toggleOpen: (id: string) => void;
  addAnswer: (id: string, v: string) => void;
  removeAnswer: (id: string, i: number) => void;
  move: (id: string, dir: number) => void;
  remove: (id: string) => void;
  duplicate: (id: string) => void;
  add: () => void;
}

/* ---------- initial data ---------- */
const initialHunt: BuilderHunt = {
  title: 'The Drowned Cathedral',
  cat: 0,
  diff: 4,
  prize: 'The Tidewatcher’s Seal',
  blurb: 'Five tides ago the old cathedral slipped beneath the harbour. Follow what it left above the waterline.',
};

const initialClues: BuilderClue[] = [
  { id: 'c1', type: 'text', label: 'The Opening Riddle', prompt: 'Where the bells once drowned, one light still keeps its watch above the tide. Begin where that light still turns.', answers: ['lighthouse', 'the old lighthouse'], hint: 'It turns through the night and warns ships off the rocks. One word.', _open: true },
  { id: 'c2', type: 'image', label: 'The North Door', prompt: 'Climb to the lighthouse gallery and face the drowned nave. Above the carved north door, count the lanterns set into the arch.', answers: ['7', 'seven'], hint: 'Count only the lanterns inside the stone arch — not the two on the posts.', plate: 'Plate I · The North Door', _open: true },
  { id: 'c3', type: 'map', label: 'The Crossing', prompt: 'From the door, walk the shore until two old roads meet the water. Name the quay that holds the crossing.', answers: ['saltmere', 'saltmere quay'], hint: 'It shares its name with a salt-marsh town to the east.', place: 'Saltmere Quay, Port Meridian', coords: '51.42°N · 2.58°W', _open: false },
  { id: 'c4', type: 'video', label: 'The Low Tide', prompt: 'Wait at the quay for the ebb. As the water draws back it uncovers a line of marker stones. Read the word they spell.', answers: [], hint: 'Five stones, five letters.', poster: 'Reel III · The Ebbing Tide', reveal: 'FROST', _open: false },
];

/* ---------- useBuilder hook ---------- */
export function useBuilder(): BuilderState {
  const [hunt, setHunt] = React.useState<BuilderHunt>(initialHunt);
  const [clues, setClues] = React.useState<BuilderClue[]>(initialClues);

  const map = (id: string, fn: (c: BuilderClue) => BuilderClue) =>
    setClues((cs) => cs.map((c) => (c.id === id ? fn(c) : c)));

  return {
    hunt, clues,
    patchHunt: (p) => setHunt((h) => ({ ...h, ...p })),
    patch: (id, p) => map(id, (c) => ({ ...c, ...p })),
    setType: (id, t) => map(id, (c) => ({ ...c, type: t })),
    toggleOpen: (id) => map(id, (c) => ({ ...c, _open: !c._open })),
    addAnswer: (id, v) => map(id, (c) => ({ ...c, answers: [...c.answers, v] })),
    removeAnswer: (id, i) => map(id, (c) => ({ ...c, answers: c.answers.filter((_, j) => j !== i) })),
    move: (id, dir) => setClues((cs) => {
      const i = cs.findIndex((c) => c.id === id);
      const j = i + dir;
      if (j < 0 || j >= cs.length) return cs;
      const a = [...cs];
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    }),
    remove: (id) => setClues((cs) => cs.length > 1 ? cs.filter((c) => c.id !== id) : cs),
    duplicate: (id) => setClues((cs) => {
      const i = cs.findIndex((c) => c.id === id);
      const c = cs[i];
      const copy: BuilderClue = { ...c, id: 'c' + Date.now(), label: (c.label || 'Clue') + ' (copy)', _open: true };
      const a = [...cs];
      a.splice(i + 1, 0, copy);
      return a;
    }),
    add: () => setClues((cs) => [...cs, { id: 'c' + Date.now(), type: 'text', label: '', prompt: '', answers: [], hint: '', _open: true }]),
  };
}

/* ---------- ImageSlot — drag-drop image picker ---------- */
export function ImageSlot({ id, placeholder = 'Drop an image or click to browse', height = 148, radius = 12 }: {
  id: string; placeholder?: string; height?: number; radius?: number;
}) {
  const [url, setUrl] = React.useState<string | null>(null);
  const [over, setOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const depth = React.useRef(0);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onDragEnter = (e: React.DragEvent) => { e.preventDefault(); depth.current++; setOver(true); };
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); };
  const onDragLeave = () => { if (--depth.current <= 0) { depth.current = 0; setOver(false); } };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); depth.current = 0; setOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragEnter={onDragEnter} onDragOver={onDragOver}
      onDragLeave={onDragLeave} onDrop={onDrop}
      onClick={() => !url && inputRef.current?.click()}
      style={{ position: 'relative', height, borderRadius: radius, overflow: 'hidden', background: 'var(--sand)', border: '1.5px dashed ' + (over ? 'var(--rose)' : 'rgba(47,65,86,.28)'), boxShadow: over ? '0 0 0 3px rgba(172,128,135,.14)' : 'none', cursor: url ? 'default' : 'pointer', transition: 'border-color .15s, box-shadow .15s' }}
      className="bf-grid-fine"
    >
      {url ? (
        <>
          <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'transparent', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10, opacity: 0, transition: 'opacity .15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
          >
            <button onClick={(e) => { e.stopPropagation(); setUrl(null); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, background: 'rgba(47,65,86,.75)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: 'var(--sans)' }}>
              <HIcon name="x" size={12} sw={2.2} />Remove
            </button>
            <button onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, background: 'rgba(47,65,86,.75)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: 'var(--sans)', marginLeft: 6 }}>
              <HIcon name="image" size={12} />Replace
            </button>
          </div>
        </>
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, textAlign: 'center' }}>
          <span style={{ opacity: over ? 0.7 : 0.4, display: 'flex', color: 'var(--navy)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </span>
          <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--muted)', maxWidth: '90%', lineHeight: 1.4 }}>{placeholder}</span>
          <span style={{ fontSize: 11, color: 'rgba(47,65,86,.4)' }}>or <u style={{ textUnderlineOffset: 2, textDecorationColor: 'rgba(47,65,86,.3)', cursor: 'pointer' }}>browse files</u></span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/avif" hidden
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
    </div>
  );
}

/* ---------- form primitives ---------- */
export function BLabel({ children, optional = false, hint }: {
  children: React.ReactNode; optional?: boolean; hint?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
      <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'rgba(47,65,86,.7)', whiteSpace: 'nowrap' }}>{children}</span>
      {optional && <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--muted)', textTransform: 'none', letterSpacing: 0 }}>optional</span>}
      {hint && <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--muted)' }}>{hint}</span>}
    </div>
  );
}

export function BInput({ value, onChange, placeholder, icon }: {
  value: string; onChange: (v: string) => void; placeholder?: string; icon?: Parameters<typeof HIcon>[0]['name'];
}) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 10, height: 46, padding: '0 14px', borderRadius: 'var(--r-md)', background: '#fff', border: '1.5px solid ' + (focus ? 'var(--navy)' : 'rgba(47,65,86,.16)'), boxShadow: focus ? '0 0 0 3px rgba(47,65,86,.10)' : 'none', transition: 'border-color .15s, box-shadow .15s' }}>
      {icon && <span style={{ color: 'var(--sage)', display: 'flex', flex: '0 0 auto' }}><HIcon name={icon} size={16} /></span>}
      <input value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        placeholder={placeholder} spellCheck={false} autoComplete="off"
        style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--sans)', fontSize: 14.5, color: 'var(--ink)' }} />
    </div>
  );
}

export function BTextarea({ value, onChange, placeholder, rows = 3, serif = false }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; serif?: boolean;
}) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      placeholder={placeholder} rows={rows} spellCheck={false}
      style={{ width: '100%', resize: 'vertical', padding: '12px 14px', borderRadius: 'var(--r-md)', background: '#fff', border: '1.5px solid ' + (focus ? 'var(--navy)' : 'rgba(47,65,86,.16)'), boxShadow: focus ? '0 0 0 3px rgba(47,65,86,.10)' : 'none', outline: 'none', fontFamily: serif ? 'var(--serif)' : 'var(--sans)', fontStyle: serif ? 'italic' : 'normal', fontSize: serif ? 17 : 14.5, lineHeight: 1.5, color: serif ? 'var(--navy)' : 'var(--ink)', transition: 'border-color .15s, box-shadow .15s', boxSizing: 'border-box' }} />
  );
}

export function BHelp({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 7, marginTop: 8, fontSize: 12, color: 'var(--muted)', lineHeight: 1.45 }}>
      <span style={{ color: 'var(--sage)', display: 'flex', flex: '0 0 auto', marginTop: 1 }}><HIcon name="bulb" size={13} stroke="var(--sage)" /></span>
      <span>{children}</span>
    </div>
  );
}

/* ---------- TypeTabs — clue type switcher ---------- */
const B_TYPES = [
  { key: 'text'  as const, label: 'Riddle', icon: 'text'  as const },
  { key: 'image' as const, label: 'Image',  icon: 'image' as const },
  { key: 'map'   as const, label: 'Map',    icon: 'map'   as const },
  { key: 'video' as const, label: 'Video',  icon: 'video' as const },
];

export function TypeTabs({ type, onChange }: { type: BuilderClue['type']; onChange: (t: BuilderClue['type']) => void }) {
  return (
    <div style={{ display: 'inline-flex', background: 'var(--sand)', border: '1px solid rgba(47,65,86,.16)', borderRadius: 11, padding: 4, gap: 3 }}>
      {B_TYPES.map((t) => {
        const on = t.key === type;
        return (
          <button key={t.key} onClick={() => onChange(t.key)}
            style={{ border: 'none', cursor: 'pointer', background: on ? '#fff' : 'transparent', boxShadow: on ? '0 2px 6px rgba(47,65,86,.14)' : 'none', borderRadius: 8, padding: '7px 13px', display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, color: on ? 'var(--navy)' : 'var(--muted)' }}>
            <span style={{ color: on ? 'var(--sage)' : 'var(--muted)', display: 'flex' }}><HIcon name={t.icon} size={14} /></span>{t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- AnswerChips ---------- */
export function AnswerChips({ answers, onAdd, onRemove }: {
  answers: string[]; onAdd: (v: string) => void; onRemove: (i: number) => void;
}) {
  const [val, setVal] = React.useState('');
  const add = () => { const v = val.trim(); if (v) { onAdd(v); setVal(''); } };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', padding: 7, borderRadius: 'var(--r-md)', background: '#fff', border: '1.5px solid rgba(47,65,86,.16)' }}>
      {answers.map((a, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 32, padding: '0 6px 0 12px', borderRadius: 999, background: 'var(--sand)', border: '1px solid rgba(47,65,86,.16)', fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>
          {a}
          <button onClick={() => onRemove(i)} style={{ width: 20, height: 20, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(47,65,86,.08)', color: 'rgba(47,65,86,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HIcon name="x" size={11} sw={2.2} />
          </button>
        </span>
      ))}
      <input value={val} onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
        placeholder={answers.length ? 'Add another…' : 'Type an accepted answer, press Enter'}
        spellCheck={false}
        style={{ flex: 1, minWidth: 140, height: 32, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--sans)', fontSize: 13.5, color: 'var(--ink)' }} />
    </div>
  );
}

/* ---------- BuilderMedal ---------- */
export function BuilderMedal({ n, complete }: { n: number; complete: boolean }) {
  return (
    <div style={{ width: 36, height: 36, borderRadius: '50%', flex: '0 0 auto', background: complete ? 'var(--sage)' : 'var(--cream)', border: '2px solid ' + (complete ? 'var(--sage)' : 'rgba(47,65,86,.28)'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: complete ? '#fff' : 'var(--navy)' }}>
      {complete ? <HIcon name="check" size={18} sw={2.6} /> : <span style={{ fontFamily: 'var(--serif)', fontSize: 17 }}>{n}</span>}
    </div>
  );
}

/* ---------- IconBtn ---------- */
export function IconBtn({ name, onClick, danger = false, title }: {
  name: Parameters<typeof HIcon>[0]['name']; onClick: () => void; danger?: boolean; title?: string;
}) {
  return (
    <button onClick={onClick} title={title}
      style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid rgba(47,65,86,.28)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: danger ? 'var(--rose)' : 'rgba(47,65,86,.7)', flex: '0 0 auto' }}>
      <HIcon name={name} size={15} />
    </button>
  );
}

/* ---------- media editors ---------- */
function BuilderImageEditor({ clue, onChange }: { clue: BuilderClue; onChange: (p: Partial<BuilderClue>) => void }) {
  return (
    <div>
      <ImageSlot id={'clue-img-' + clue.id} placeholder="Drag the puzzle photo here, or click to browse" height={190} radius={13} />
      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <BInput value={clue.plate || ''} onChange={(v) => onChange({ plate: v })} placeholder="Caption / plate label (e.g. Plate I · The North Door)" icon="image" />
      </div>
      <BHelp>Solvers study this image to find the answer. Add a caption to set the scene.</BHelp>
    </div>
  );
}

function BuilderMapEditor({ clue, onChange }: { clue: BuilderClue; onChange: (p: Partial<BuilderClue>) => void }) {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, zIndex: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 40, padding: '0 13px', borderRadius: 10, background: 'rgba(254,252,246,.95)', border: '1px solid rgba(47,65,86,.16)', boxShadow: '0 6px 16px rgba(47,65,86,.14)' }}>
            <span style={{ color: 'var(--sage)', display: 'flex' }}><HIcon name="pin" size={16} /></span>
            <input value={clue.place || ''} onChange={(e) => onChange({ place: e.target.value })}
              placeholder="Search a place or address…" spellCheck={false}
              style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.4px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{clue.coords || '51.42°N · 2.58°W'}</span>
          </div>
        </div>
        <MapTile clue={{ id: 'preview', type: 'map', label: clue.place || 'Selected location', prompt: '', note: '', placeholder: '', answers: [], hint: '', solvedLabel: '' }} compact />
        <div style={{ position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 999, background: 'var(--navy)', color: 'var(--cream)', fontSize: 11.5, fontWeight: 700, boxShadow: '0 6px 16px rgba(47,65,86,.3)', whiteSpace: 'nowrap' }}>
          <HIcon name="pin" size={13} stroke="var(--cream)" />Drag the pin to set the exact spot
        </div>
      </div>
      <BHelp>The solver gets this map and must identify or travel to the marked place.</BHelp>
    </div>
  );
}

function BuilderVideoEditor({ clue, onChange }: { clue: BuilderClue; onChange: (p: Partial<BuilderClue>) => void }) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <BInput value={clue.videoUrl || ''} onChange={(v) => onChange({ videoUrl: v })} placeholder="Paste a video link (YouTube, Vimeo, .mp4)…" icon="video" />
        <button className="bf-btn bf-btn-ghost" style={{ width: 'auto', height: 46, padding: '0 16px', fontSize: 13, flex: '0 0 auto' }}>
          <HIcon name="arrow" size={15} />Upload
        </button>
      </div>
      <VideoFrame clue={{ id: 'preview', type: 'video', label: '', prompt: '', note: '', placeholder: '', answers: [], hint: '', solvedLabel: '', reveal: clue.reveal || 'FROST', poster: clue.poster || 'Untitled reel' }} compact />
      <div style={{ marginTop: 10 }}>
        <BInput value={clue.poster || ''} onChange={(v) => onChange({ poster: v })} placeholder="Reel caption (e.g. Reel III · The Ebbing Tide)" icon="video" />
      </div>
      <BHelp>Trim the clip so the reveal lands near the end — solvers watch, then answer.</BHelp>
    </div>
  );
}

function BuilderTextEditor() {
  return <BHelp>Riddle clues need no media — the verse above <i>is</i> the puzzle. Keep it solvable from the words alone.</BHelp>;
}

export function BuilderClueMedia({ clue, onChange }: { clue: BuilderClue; onChange: (p: Partial<BuilderClue>) => void }) {
  if (clue.type === 'image') return <BuilderImageEditor clue={clue} onChange={onChange} />;
  if (clue.type === 'map')   return <BuilderMapEditor clue={clue} onChange={onChange} />;
  if (clue.type === 'video') return <BuilderVideoEditor clue={clue} onChange={onChange} />;
  return <BuilderTextEditor />;
}

/* ---------- ClueEditor ---------- */
export function ClueEditor({ clue, index, total, api, first, last }: {
  clue: BuilderClue; index: number; total: number; api: BuilderState; first: boolean; last: boolean;
}) {
  const n = index + 1;
  const complete = Boolean(clue.prompt.trim() && clue.answers.length > 0);
  const typeEntry = B_TYPES.find((t) => t.key === clue.type) || B_TYPES[0];

  const Spine = (
    <div style={{ flex: '0 0 52px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {!first && <span style={{ position: 'absolute', top: 0, height: 22, width: 2, background: 'rgba(47,65,86,.28)' }} />}
      {!last && <span style={{ position: 'absolute', top: 22, bottom: -2, width: 2, background: 'rgba(47,65,86,.28)' }} />}
      <div style={{ position: 'relative', zIndex: 2, marginTop: 2 }}><BuilderMedal n={n} complete={complete} /></div>
    </div>
  );

  if (!clue._open) {
    return (
      <div data-clue-edit={clue.id} style={{ display: 'flex', gap: 14, paddingBottom: 14 }}>
        {Spine}
        <button onClick={() => api.toggleOpen(clue.id)}
          style={{ flex: 1, minWidth: 0, textAlign: 'left', cursor: 'pointer', border: '1.5px solid rgba(47,65,86,.16)', borderRadius: 14, background: '#fff', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 13 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 26, padding: '0 11px', borderRadius: 999, background: 'var(--sand)', border: '1px solid rgba(47,65,86,.16)', fontSize: 10.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(47,65,86,.7)', flex: '0 0 auto' }}>
            <span style={{ color: 'var(--sage)', display: 'flex' }}><HIcon name={typeEntry.icon} size={13} /></span>{typeEntry.label}
          </span>
          <span style={{ minWidth: 0, flex: 1 }}>
            <span style={{ display: 'block', fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--navy)', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{clue.label || clue.prompt || 'Untitled clue'}</span>
            <span style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{clue.answers.length} accepted {clue.answers.length === 1 ? 'answer' : 'answers'}{clue.hint ? ' · hint set' : ''}</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: complete ? 'var(--sage)' : 'var(--rose)', flex: '0 0 auto', whiteSpace: 'nowrap' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: complete ? 'var(--sage)' : 'var(--rose)', display: 'block' }} />{complete ? 'Ready' : 'Needs work'}
          </span>
          <span style={{ color: 'rgba(47,65,86,.28)', display: 'flex', flex: '0 0 auto' }}><HIcon name="chevron" size={16} /></span>
        </button>
      </div>
    );
  }

  return (
    <div data-clue-edit={clue.id} style={{ display: 'flex', gap: 14, paddingBottom: 16 }}>
      {Spine}
      <div style={{ flex: 1, minWidth: 0, border: '1.5px solid var(--navy)', borderRadius: 18, background: '#fff', boxShadow: '0 18px 44px -26px rgba(47,65,86,.5)', overflow: 'hidden' }}>
        {/* card header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid rgba(47,65,86,.10)', background: 'var(--cream)', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--rose)', whiteSpace: 'nowrap' }}>Clue {n} of {total}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, whiteSpace: 'nowrap', color: complete ? 'var(--sage)' : 'var(--muted)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: complete ? 'var(--sage)' : 'rgba(47,65,86,.28)', display: 'block' }} />{complete ? 'Ready to publish' : 'Draft'}
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 7 }}>
            <IconBtn name="arrowup" onClick={() => api.move(clue.id, -1)} title="Move up" />
            <IconBtn name="arrowdown" onClick={() => api.move(clue.id, 1)} title="Move down" />
            <IconBtn name="copy" onClick={() => api.duplicate(clue.id)} title="Duplicate" />
            <IconBtn name="trash" onClick={() => api.remove(clue.id)} danger title="Delete" />
            <button onClick={() => api.toggleOpen(clue.id)} title="Collapse"
              style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid rgba(47,65,86,.28)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(47,65,86,.7)', transform: 'rotate(90deg)' }}>
              <HIcon name="chevron" size={15} />
            </button>
          </div>
        </div>

        <div style={{ padding: '18px 20px 20px' }}>
          {/* type */}
          <div style={{ marginBottom: 18 }}>
            <BLabel>Clue type</BLabel>
            <TypeTabs type={clue.type} onChange={(t) => api.setType(clue.id, t)} />
          </div>

          {/* title */}
          <div style={{ marginBottom: 18 }}>
            <BLabel>Clue title</BLabel>
            <BInput value={clue.label} onChange={(v) => api.patch(clue.id, { label: v })} placeholder="A short name for this step (e.g. The North Door)" icon="flag" />
          </div>

          {/* prompt */}
          <div style={{ marginBottom: 18 }}>
            <BLabel hint={clue.type === 'text' ? 'this verse is the puzzle' : 'what the solver must do'}>{clue.type === 'text' ? 'Riddle' : 'Prompt'}</BLabel>
            <BTextarea value={clue.prompt} onChange={(v) => api.patch(clue.id, { prompt: v })}
              placeholder={clue.type === 'text' ? 'Write the riddle the solver must decode…' : 'Tell the solver what to look for…'}
              rows={clue.type === 'text' ? 3 : 2} serif={clue.type === 'text'} />
          </div>

          {/* media */}
          <div style={{ marginBottom: 18 }}>
            {clue.type !== 'text' && <BLabel hint={typeEntry.label}>Media</BLabel>}
            <BuilderClueMedia clue={clue} onChange={(p) => api.patch(clue.id, p)} />
          </div>

          {/* answers */}
          <div style={{ marginBottom: 18 }}>
            <BLabel hint="solvers match any one">Accepted answers</BLabel>
            <AnswerChips answers={clue.answers} onAdd={(v) => api.addAnswer(clue.id, v)} onRemove={(i) => api.removeAnswer(clue.id, i)} />
            <BHelp>Matching ignores case, spacing, punctuation and a leading "the". List every fair phrasing.</BHelp>
          </div>

          {/* hint */}
          <div>
            <BLabel optional>Hint</BLabel>
            <BInput value={clue.hint} onChange={(v) => api.patch(clue.id, { hint: v })} placeholder="Offered after a couple of wrong tries…" icon="bulb" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- right rail blocks ---------- */
export const B_CATS = ['Ruins', 'Ciphers', 'Pirates', 'Treasure'] as const;

export function RailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1.5px solid rgba(47,65,86,.16)', borderRadius: 16, background: '#fff', padding: '15px 16px' }}>
      <div style={{ marginBottom: 13 }}>
        <span className="bf-kicker solo" style={{ color: 'var(--sage)' }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

export function BuilderDiff({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const LABEL: Record<number, string> = { 1: 'Novice', 2: 'Novice', 3: 'Adept', 4: 'Master', 5: 'Master' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'inline-flex', gap: 5 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => onChange(i)} title={'Level ' + i}
            style={{ width: 16, height: 16, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ width: 11, height: 11, transform: 'rotate(45deg)', background: i <= value ? 'var(--navy)' : 'transparent', border: '1.4px solid ' + (i <= value ? 'var(--navy)' : 'rgba(47,65,86,.28)'), display: 'block' }} />
          </button>
        ))}
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)' }}>{LABEL[value]}</span>
    </div>
  );
}

export function CheckRow({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0' }}>
      <span style={{ width: 20, height: 20, borderRadius: '50%', flex: '0 0 auto', background: ok ? 'var(--sage)' : 'transparent', border: '1.5px solid ' + (ok ? 'var(--sage)' : 'rgba(47,65,86,.28)'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        {ok ? <HIcon name="check" size={12} sw={2.6} /> : <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(47,65,86,.28)', display: 'block' }} />}
      </span>
      <span style={{ fontSize: 13, color: ok ? 'rgba(47,65,86,.7)' : 'var(--muted)' }}>{children}</span>
    </div>
  );
}

export { B_TYPES, CatGlyph };
