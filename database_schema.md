# BlueFrost — Database Schema

Derived from all implemented screens: auth flow, profile, feed (The Dispatch), hunt play, and hunt builder.

**Schema changes from latest UI update (2026-06-19):**
- `user_stats` table removed — Relics / Ciphers / Trails / Streak stats no longer displayed on profile.
- `relics` and `user_relics` tables removed — relic collection removed from profile.
- `hunts.region` field removed — region not collected in builder or shown on play screen.
- `journal_events` simplified — `relic_id` field and `relic_found` / `cipher_cracked` event kinds removed.
- Profile now shows the **Puzzles section**: recent hunts from `user_hunt_progress JOIN hunts`.

---

## `users`
Core identity — created at signup, populated through onboarding.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `email` | string | unique, from signup |
| `password_hash` | string | backend only, never sent to client |
| `display_name` | string | "Full name" from signup form |
| `username` | string | unique, from onboarding |
| `avatar_index` | 0–3 | crest emblem picked in onboarding |
| `bio` | string? | italic blurb on profile |
| `location` | string? | e.g. "Port Meridian" — set later |
| `interests` | string[] | chips picked in onboarding |
| `email_verified` | bool | set after OTP passes |
| `created_at` | timestamp | |

---

## `user_ranks`
Rank and earned title shown under the username. Can be a view or denormalized columns on `users`.

| Field | Type | Notes |
|---|---|---|
| `user_id` | uuid | FK → users |
| `rank` | enum | `explorer → pathfinder → cartographer → navigator → archivist` |
| `title` | string | earned title, e.g. "Cipher-breaker" |
| `xp` | int | total experience driving rank-up |

---

---

## `hunts` (= "trails" / "quests")
A published or draft hunt — the thing shown on the feed, played on `/hunt`, and authored on `/create`.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `title` | string | e.g. "The Drowned Cathedral" |
| `blurb` | string? | flavour copy shown on play screen and feed rows |
| `category` | enum | `ruins \| cipher \| pirate \| treasure` (maps to emblem index 0–3) |
| `difficulty` | 1–5 | |
| `prize` | string? | reward name shown in completion screen, e.g. "The Tidewatcher's Seal" |
| `cover_image_url` | string? | used on feed cards (blank until author uploads) |
| `author_id` | uuid? | FK → users; null = official hunt |
| `status` | enum | `draft \| published \| archived` |
| `badge` | enum? | `featured \| trending \| new \| null` — editorial label, set by admins |
| `player_count` | int | denormalized count of users who have started the hunt |
| `rating_avg` | float? | denormalized average star rating (1.0–5.0) |
| `rating_count` | int | review count |
| `created_at` | timestamp | |
| `published_at` | timestamp? | |

---

## `clues`
Each step within a hunt. **Only the current step is sent to the solver — future clues are never exposed.**

The builder author sees all clues (including answers) when editing their own unpublished hunt.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `hunt_id` | uuid | FK → hunts |
| `step` | int | 1-based, determines order |
| `type` | enum | `text \| image \| map \| video` |
| `label` | string? | short step name shown in ledger and solved state, e.g. "The North Door" |
| `prompt` | string | the clue text / riddle shown to the solver |
| `solved_label` | string? | answer confirmation shown in collapsed solved state, e.g. "7 lanterns" |
| `hint` | string? | offered after 2+ wrong attempts — shown as "Cartographer's hint" |
| `media_url` | string? | image or video URL (type = image or video) |
| `media_caption` | string? | plate label (image) or reel caption (video) |
| `reveal_word` | string? | word spelled by marker stones; used by video tide animation |
| `place_name` | string? | named location label on map chart (type = map) |
| `place_lat` | float? | pin latitude (type = map) |
| `place_lng` | float? | pin longitude (type = map) |
| `place_coords_display` | string? | human-readable coords shown in builder, e.g. "51.42°N · 2.58°W" |

---

## `clue_answers`
Accepted answer phrasings per clue. The backend normalizes (lowercase, strip punctuation, strip leading "the/a/an") and checks against all rows for this clue. Multiple rows = multiple fair phrasings.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `clue_id` | uuid | FK → clues |
| `answer_hash` | string | **never sent to client** — backend validates incoming answers against this |
| `display_text` | string | original text; visible to the hunt author only (builder chip UI) |

---

## `user_hunt_progress`
Tracks where each user is in each hunt and their performance stats.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → users |
| `hunt_id` | uuid | FK → hunts |
| `current_step` | int | next clue to solve — shown as "Clue 5 of 8" in play header |
| `status` | enum | `in_progress \| completed \| abandoned` |
| `hints_used` | int | count of hints revealed — shown in completion seal screen |
| `started_at` | timestamp | |
| `completed_at` | timestamp? | |

---

## `user_clue_attempts`
Per-clue wrong attempt count, used to gate the "Reveal a hint" affordance (shown after 2+ wrong tries).

| Field | Type | Notes |
|---|---|---|
| `user_id` | uuid | composite PK with clue_id |
| `clue_id` | uuid | composite PK |
| `wrong_count` | int | incremented on each wrong submission |
| `hint_revealed` | bool | whether the hint has been shown |

---

## `hunt_reviews`
Star ratings and optional quote left after completing a hunt. Shown in the Dispatch feed and on hunt rows.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → users |
| `hunt_id` | uuid | FK → hunts |
| `rating` | float | 1.0–5.0 |
| `quote` | string? | short excerpt shown as an italic blockquote in the Dispatch |
| `created_at` | timestamp | |

---

## `hunt_saves`
Bookmarked hunts (the bookmark icon on feed cards).

| Field | Type | Notes |
|---|---|---|
| `user_id` | uuid | composite PK |
| `hunt_id` | uuid | composite PK |
| `saved_at` | timestamp | |

---

## `dispatch_events`
Social activity items shown in The Dispatch feed (`/feed`, Following tab). One row per visible event.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → users — who did the action |
| `type` | enum | `created \| solved \| reviewed \| joined` |
| `hunt_id` | uuid? | FK → hunts — the hunt being acted on |
| `review_id` | uuid? | FK → hunt_reviews — for type = reviewed |
| `note` | string? | freeform context, e.g. "in 2 days, 4 clues without a hint." |
| `created_at` | timestamp | |

---

---

## `journal_events`
The activity feed on the profile ("Solved Clue IV — The Tidewater Riddle · Yesterday").

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `user_id` | uuid | FK → users |
| `kind` | enum | `clue_solved \| trail_completed \| guild_action` |
| `hunt_id` | uuid? | FK → hunts |
| `clue_step` | int? | which step triggered this event |
| `created_at` | timestamp | used for "2h ago" display |

---

## `guilds`

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `name` | string | e.g. "The Meridian Society" |
| `description` | string? | |
| `founder_id` | uuid | FK → users |
| `member_count` | int | denormalized for display |
| `season_standing` | string? | e.g. "4th this season" — updated per season |
| `created_at` | timestamp | |

---

## `guild_members`

| Field | Type | Notes |
|---|---|---|
| `guild_id` | uuid | composite PK |
| `user_id` | uuid | composite PK |
| `role` | enum | `member \| officer \| leader` |
| `joined_at` | timestamp | |

---

## `user_follows`

| Field | Type | Notes |
|---|---|---|
| `follower_id` | uuid | composite PK |
| `following_id` | uuid | composite PK |
| `created_at` | timestamp | |

---

## Auth infrastructure (backend-only, never exposed to client)

| Table | Key fields |
|---|---|
| `otp_codes` | `user_id`, `code_hash`, `expires_at`, `used` |
| `sessions` | `id` (token), `user_id`, `created_at`, `expires_at` |

---

## How each screen is assembled

### Profile page (`/profile`)
```
users                                            → name, handle, avatar_index, bio, location
user_ranks                                       → title, rank
user_hunt_progress JOIN hunts                    → Puzzles section: up to 3 most recent hunts
  SELECT h.title, h.category, uhp.current_step,
         uhp.status, COUNT(clues.id) as total
  FROM user_hunt_progress uhp
  JOIN hunts h ON h.id = uhp.hunt_id
  LEFT JOIN clues ON clues.hunt_id = h.id
  WHERE uhp.user_id = ?
  GROUP BY uhp.id, h.id
  ORDER BY uhp.started_at DESC LIMIT 3
user_hunt_progress JOIN hunts + clues            → active trail card (name, step, total, hint)
journal_events ORDER BY created_at DESC          → 3–4 most recent activity rows
guild_members JOIN guilds                        → guild name, members, standing
```

### Feed / Dispatch (`/feed`)
```
dispatch_events
  JOIN users            → user display name + avatar_index
  JOIN hunts            → hunt title, category, difficulty, rating_avg, player_count, badge
  JOIN hunt_reviews     → rating + quote (for type = reviewed)
  ORDER BY created_at DESC, filtered by following graph (user_follows)

hunt_saves (user_id = self)                → which hunts are bookmarked (fill bookmark icon)
```

### Hunt play screen (`/hunt/:huntId`)
```
hunts                                      → title, blurb, category, difficulty, prize, author_id
clues WHERE hunt_id = ? ORDER BY step      → serve ONE clue at a time (current step only)
  JOIN clue_answers WHERE clue_id = ?      → for server-side answer validation (never sent to client)
user_hunt_progress WHERE user_id + hunt_id → current_step, hints_used, status
user_clue_attempts WHERE user_id + clue_id → wrong_count, hint_revealed (for current step)
```

### Hunt builder (`/create`, `/create/:huntId`)
```
hunts (author_id = self)                   → all fields including draft status
clues WHERE hunt_id = ? ORDER BY step      → all clues (author sees everything)
clue_answers WHERE clue_id = ?             → display_text visible to author for chip editing
```

---

## Emblem category → index mapping

| Index | Category | Emblem | Feed `CAT` label |
|---|---|---|---|
| 0 | `ruins` | Pith helmet (Archaeologist) | Ruins |
| 1 | `cipher` | Cipher scroll | Cipher |
| 2 | `pirate` | Jolly Roger | Pirate |
| 3 | `treasure` | Treasure chest | Treasure |

---

## Answer validation flow

1. Solver submits raw text from the answer input.
2. Client **does not** check the answer — it only sends to the API.
3. API normalizes: lowercase → trim → strip punctuation → strip leading `the/a/an` → collapse whitespace.
4. API fetches all `clue_answers.answer_hash` for the current clue and checks the normalized hash against each.
5. On match: advance `user_hunt_progress.current_step`, emit `journal_event` (kind = `clue_solved` or `trail_completed` if final clue).
6. On no match: increment `user_clue_attempts.wrong_count`. Return `correct: false` + current `wrong_count`.
7. Client shows "Reveal a hint" affordance once `wrong_count >= 2` and `hint_revealed = false`.
