# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

```
/
├── frontend/        ← React + Vite app  (active development)
├── backend/         ← FastAPI + Python  (not started yet)
├── infra/
│   └── docker/      ← Docker Compose, Dockerfiles, Nginx config
├── .github/
│   └── workflows/   ← CI (frontend type-check + build; backend lint + mypy)
├── .env.example     ← copy to .env, fill secrets
├── database_schema.md
└── startup_process.md
```

## Commands

### From the repo root (convenience scripts)
```bash
npm run dev              # start frontend dev server at http://localhost:5173
npm run build            # production build → frontend/dist/
npm run docker:up        # start full stack (frontend + backend + postgres + redis + nginx)
npm run docker:down      # stop all containers
```

### From frontend/
```bash
npm run dev              # Vite dev server at http://localhost:5173
npm run build            # tsc type-check + Vite production build → dist/
npm run preview          # serve the production build at http://localhost:4173
npx tsc --noEmit --skipLibCheck   # type-check only
```

### From backend/ (once backend dev begins)
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload     # dev server at http://localhost:8000
ruff check app                    # linter
mypy app                          # type-check
```

There is no test suite configured yet.

---

## Tech stack

### Frontend (`frontend/`)
React 18 + Vite + TypeScript + Tailwind CSS + React Router v6 + Zustand + **vite-plugin-pwa** (Workbox).
Planned integrations: Leaflet.js (maps), React Query (server state), jsQR (QR decoding).

### Backend (`backend/`) — not yet implemented
FastAPI (Python 3.12) · asyncpg + SQLAlchemy (PostgreSQL) · Redis pub/sub + sorted sets ·
JWT + OAuth2 (Google / Apple) · WebSocket (live leaderboard) · web-push (notifications) ·
boto3 (S3 / Cloudflare R2 media) · Nginx (API gateway, rate limiting).

### Data
| Store | Purpose |
|-------|---------|
| PostgreSQL | users, hunts, clues, scores, journal |
| Redis | leaderboard sorted sets, session cache, pub/sub event queue |
| S3 / R2 | clue images, cover art, video reels |

---

## Frontend architecture

### PWA / mobile app (`vite.config.ts`)
`vite-plugin-pwa` generates a service worker and `manifest.webmanifest` at build time (not in dev).

**Manifest:** `display: standalone`, `orientation: portrait`, `theme_color: #2F4156`, `background_color: #FEFCF6`. Icon source is `public/icon.svg`.

**Workbox caching strategy:**
| Cache | Handler | TTL |
|-------|---------|-----|
| App shell (JS/CSS/HTML/SVG) | Precache | Versioned |
| Google Fonts stylesheets | StaleWhileRevalidate | 1 year |
| Google Fonts webfont files | CacheFirst | 1 year |
| `api.bluefrost.co/*` | NetworkFirst (10 s timeout) | 5 min |

**Testing the PWA:** SW is disabled in dev. Run `npm run build && npm run preview`, then DevTools → Application → Service Workers → go offline.

### CSS layering — critical rule
`src/index.css` places the BlueFrost design system **between** `@tailwind components` and `@tailwind utilities`. Tailwind utility classes must override design-system classes. Never move design system CSS after `@tailwind utilities`.

### Design system (`src/index.css`)
All `bf-*` CSS classes live here. Key ones: `.bf-grid` / `.bf-navy-grid` (map-grid backgrounds), `.bf-screen` (full-height flex-column page shell), `.bf-web` / `.bf-web-brand` / `.bf-web-form` (desktop split-panel layout), `.bf-body`, `.bf-btn-*`, `.bf-input`, `.bf-chip`, `.bf-otp`, `.bf-seal`. Loading medallion animation uses pure CSS keyframes (`bfSpin`, `bfSpinRev`, `bfCycle`).

### Component layer (`src/components/`)
- **`art.tsx`** — SVG illustrations: `ArtHelmet`, `ArtCipher`, `ArtSkull`, `ArtChest`, `Compass`, `Contours`, `BF_EMBLEMS` array.
- **`ui.tsx`** — UI primitives: `StatusBar`, `Wordmark`, `Field`, `InputField`, `Btn`, `Social`, `Steps`, `BackBtn`, `LoadingMedallion`, `MapMini`, `PasswordStrength`, `BrandPanel`.
- **`profile.tsx`** — profile components: `CrestAvatar`, `TitleLine`, `StatLedger`, `StatStamps`, `TrailProgress`, `JournalList`, `GuildStrip`, `PIcon`. Sample data: `SELF_DATA`, `PUBLIC_DATA`.
- **`feed.tsx`** — feed components: `FIcon` (16 icons), `StarFilled`, `CatGlyph`, `BlankCover`, `HuntBadge`, `DiffPips`, `Author`, `MetaStrip`, `HuntCard`, `HuntRow`, `HuntListRow`, `FeedTabs`, `CatChips`, `ActivityRow`, `CreatePrompt`. Sample data: `HUNTS`, `DISPATCH`.
- **`hunt.tsx`** — hunt play components: `HIcon` (23 icons incl. arrowup/down/copy/trash/chevron/plus), `useHunt` (localStorage state machine), `HuntMedal`, `TypeChip`, `ClueCard`, `AnswerField`, `ImagePlate`, `MapTile`, `VideoFrame`, `Completion`, `HuntProgress`, `TrailFoot`. Sample data: `HUNT_DATA`, `CLUES_DATA` ("The Drowned Cathedral", answers: lighthouse · 7 · saltmere · frost).
- **`builder.tsx`** — hunt builder components: `useBuilder` (CRUD state machine), `ImageSlot` (drag-drop uploader), `BLabel`/`BInput`/`BTextarea`/`BHelp`, `TypeTabs`, `AnswerChips`, `BuilderMedal`, `IconBtn`, `ClueEditor`, `BuilderClueMedia` + type editors, `RailCard`, `BuilderDiff`, `CheckRow`.

### State (`src/store/auth.ts`)
Single Zustand store: `email`, `password`, `name`, `username`, `avatarIndex`, `interests[]`. Shared across the multi-step auth flow.

### Responsive layout pattern
Every page renders two sibling divs:
```tsx
<>
  <div className="md:hidden min-h-screen bf-screen bf-grid"> … </div>  {/* mobile */}
  <div className="hidden md:flex h-screen bf-web"> … </div>             {/* desktop */}
</>
```
768 px breakpoint. Auth pages use `BrandPanel` (navy 44% left) + `bf-web-form` (cream right). Post-auth pages use full-width `bf-screen bf-grid` + a top nav bar.

### Route map
**Auth:** `/` → `/splash` → `/welcome` → `/signup` → `/signup/email` → `/verify` → `/onboarding` → `/permissions` → `/success`. Login: `/welcome` → `/login` → `/verify`. Forgot: `/login` → `/forgot` → `/verify`.

**Post-auth:** `/profile` · `/profile?view=public` · `/feed` · `/hunt` · `/create`

### Design tokens
```
--cream #FEFCF6  --sand #F5EFEB  --sage #5E6C5B
--rose  #AC8087  --sky  #CBD9E6  --navy #2F4156
```
Fonts: `DM Serif Display` (headings) · `Archivo` (body). Loaded via Google Fonts in `index.html`.
