# BlueFrost — Local Dev & Manual Testing Guide

## Prerequisites

| Tool | Min version | Install |
|------|-------------|---------|
| Node.js | 22 | https://nodejs.org |
| npm | 10 | bundled with Node |
| Python | 3.12 | https://python.org |
| Docker + Compose | latest | https://docker.com |

---

## 1. First-time setup

```bash
# 1. Install frontend dependencies
cd frontend && npm install && cd ..

# 2. Copy env template (fill in secrets before running backend)
cp .env.example .env
```

---

## 2. Running the frontend (daily dev)

```bash
npm run dev          # from repo root  — starts Vite at http://localhost:5173
# or
cd frontend && npm run dev
```

The frontend runs standalone — no backend required yet. All data is hardcoded sample data.

---

## 3. Running the full stack (Docker)

Requires `.env` to be populated. Starts frontend + FastAPI backend + PostgreSQL + Redis + Nginx.

```bash
npm run docker:up    # docker compose -f infra/docker/docker-compose.yml up

# Services:
#   http://localhost:5173  → Vite frontend
#   http://localhost:8000  → FastAPI backend (once implemented)
#   http://localhost:80    → Nginx (routes /api/* and /ws/* to backend)
#   localhost:5432         → PostgreSQL
#   localhost:6379         → Redis

npm run docker:down  # stop and remove containers
```

---

## 4. Frontend pages — manual walkthrough

### Auth flow

| Step | URL | What to do |
|------|-----|------------|
| 1 | `/splash` | Animated compass medallion cycles Archaeologist → Cipher → Pirate → Treasure. Auto-redirects after 3 s. |
| 2 | `/welcome` | **Create account** → sign-up path. **I already have an account** → login. |
| 3 | `/signup` | Choose email sign-up or social. |
| 4 | `/signup/email` | Name + email + password. Terms checkbox gates the button. Password strength bar updates live. |
| 5 | `/verify` | 6-digit cipher boxes (auto-advance + paste support). Resend countdown timer. |
| 6 | `/onboarding` | Pick crest avatar. Type username (checkmark after 3 chars). Toggle interest chips. |
| 7 | `/permissions` | **Enable location** (real browser prompt) or **Maybe later**. |
| 8 | `/success` | Wax seal + username + sample quest card. |

**Login path:** `/login` → `/verify` (or `/forgot` → `/verify`)

---

### Profile (`/profile`, `/profile?view=public`)

**Mobile (Field Dossier):** Navy grid banner, `CrestAvatar` overlapping the banner edge, stat ledger (Relics · Ciphers · Trails), trail progress stepper, 3-entry journal.

**Desktop (Atlas Card):** Full-width navy hero banner with crest + name + actions inline. 4 passport-stamp stat tiles. Two-column body (journal left, trail + guild right).

**Self view:** Edit profile button present.
**Public view:** Follow + Message buttons; no relic collection.

---

### Feed (`/feed`)

**Mobile tabs:**
| Tab | Content |
|-----|---------|
| Following | The Dispatch — CreatePrompt, created posts (HuntCard), activity rows (solved/reviewed/joined) |
| Discover | Explorer's Bulletin — search bar, filter tabs, category chips, compact HuntListRows |
| Reviews | Placeholder |

**Desktop:** FeedTopNav (Journal active) · left feed · sticky right rail (Trending + Cartographers to follow).

---

### Hunt play (`/hunt`)

Demo hunt: **"The Drowned Cathedral"** — answers in order: **lighthouse · 7 · saltmere · frost**

| Clue | Type | Mechanic |
|------|------|---------|
| 1 | Text/Riddle | Serif italic verse + answer input |
| 2 | Image | Engraved arch SVG — count 7 arch lanterns (2 post decoys) |
| 3 | Map | Harbour chart with dropped pin at Saltmere Quay |
| 4 | Video | Tide reel — play to reveal "FROST" in marker stones |

**States:** Wrong answer → shake + attempt count · 2+ wrong → "Reveal a hint" · Solved → sage collapse · Locked → blurred dashed · Complete → navy wax-seal screen.

**Desktop:** Left rail (332 px) with hunt summary + clue ledger (click to jump). Right scrollable trail. Progress persists in `localStorage` (`bf-hunt-progress-v1`).

---

### Hunt Builder (`/create`)

**Desktop:** BuilderTopNav (Create active) · main editor column (660 px max) · right rail (340 px).

| Right rail section | Content |
|--------------------|---------|
| Cover | `ImageSlot` — drag-drop or click to browse |
| Trail settings | Category chips, difficulty diamonds, region, prize |
| Outline | Clickable jump-to clue list |
| Before you publish | 4-condition checklist gates the Publish button |

**Clue editors:** Collapsed → type pill + title + answer count + status dot. Expanded → type switcher (Riddle/Image/Map/Video), title, prompt, media editor, answer chips (Enter to add, × to remove), optional hint. Reorder ↑↓, Duplicate, Delete per card.

**Publish gates:** title set · region set · ≥ 3 clues · every clue has ≥ 1 answer.

**Mobile:** Single column — editor then settings stacked below.

---

## 5. Responsive testing

Breakpoint: **768 px**

- Below 768 px → mobile layout (single column, status bar)
- 768 px+ → desktop layout (varies per page)

```
DevTools → Cmd+Shift+M → set width to 390 px   (iPhone)
DevTools → Network → Slow 3G                    (splash animation pacing)
```

---

## 6. PWA testing

SW is disabled in dev. To test offline / install:

```bash
cd frontend && npm run build && npm run preview   # http://localhost:4173
```

- DevTools → Application → Service Workers → tick **Offline** → reload.
- **iPhone:** Share → Add to Home Screen → launches in standalone mode.
- **Android:** three-dot menu → Add to Home Screen.

---

## 7. Frontend type-check & build

```bash
cd frontend
npx tsc --noEmit --skipLibCheck   # type-check only (fast)
npm run build                      # full tsc + Vite build → dist/
```

---

## 8. All routes at a glance

| Route | Screen |
|-------|--------|
| `/` | Redirect → `/splash` |
| `/splash` | Loading / compass medallion |
| `/welcome` | Entry — sign up or log in |
| `/signup` | Sign-up method picker |
| `/signup/email` | Sign-up form |
| `/verify` | OTP verification |
| `/login` | Login |
| `/forgot` | Forgot password |
| `/onboarding` | Avatar + username + interests |
| `/permissions` | Location permissions |
| `/success` | Success confirmation |
| `/profile` | Profile — self view |
| `/profile?view=public` | Profile — public view |
| `/feed` | The Dispatch (social feed) |
| `/hunt` | Hunt play screen |
| `/create` | Hunt Builder (creator tool) |

---

## 9. Backend (not yet implemented)

When backend development begins:

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload     # http://localhost:8000
```

Stack: **FastAPI** · PostgreSQL (asyncpg + SQLAlchemy) · Redis (sorted sets + pub/sub) · JWT + OAuth2 (Google / Apple) · WebSocket (live leaderboard) · web-push · Nginx · S3 / Cloudflare R2.

See `backend/requirements.txt` for pinned dependencies and `.env.example` for all required environment variables.
