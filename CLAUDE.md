# Claude notes for plate-gallery

Guidance for Claude working in this repo. Keep it short; update when something changes.

## What this project is

PlateGallery — a user-generated gallery of American vanity license plates. Google sign-in, upload with automated moderation, state-scoped feeds, voting, leaderboards, and an interactive US map.

Submission for BU Spark! Innovation Hours Bounty #1.

## Stack at a glance

- **Backend:** FastAPI (Python 3.12), async SQLAlchemy, Alembic, Postgres. Lives in `backend/`.
- **Frontend:** React 19 + Vite + TypeScript, TanStack Query, React Router v7, Tailwind CSS v4, Framer Motion. Lives in `frontend/`.
- **Supabase** for Auth (Google OAuth), Storage (the `plates` bucket), and the managed Postgres in prod.
- **Hosting:** frontend on Cloudflare Pages (via Wrangler — see `frontend/wrangler.jsonc`). Backend Docker image in `backend/Dockerfile`.

## Ground rules

- The canonical design docs are `BACKEND_PLAN.md` and `FRONTEND_PLAN.md`. Points marked **🔌 CONTRACT** must stay in lockstep between frontend and backend — if you change one, change the other.
- Error envelope on every API response: `{ error: { code, message, details? } }`. Don't invent new shapes.
- All API routes are under `/api/v1`.
- Vote and comment counters (`upvotes`, `downvotes`, `score`, `comment_count` on `plates`) are maintained by **DB triggers**, not application code. Don't add app-level increment logic — it'll double-count. This was already fixed once (see commits `db77af1`, `f0d2645`).
- No manual review queue. Moderation is synchronous — uploads end as `approved` or `rejected` before the endpoint returns.
- Frontend talks to FastAPI for everything except Supabase Auth (directly) and Storage uploads to signed URLs (directly). Never call PostgREST or use the service-role key from the frontend.

## Environment / platform

- Primary shell is bash on Windows (Git Bash). Use Unix syntax — forward slashes in paths, `/dev/null` not `NUL`.
- The `plate gallery/` directory (with a space) is design mockup / reference material, not shipped code. Leave it alone unless asked.
- Git will show CRLF/LF line-ending warnings on Windows — harmless, ignore.

## Where to look

- **Plate feed / sort logic:** `backend/app/services/feed.py`, endpoint in `backend/app/api/v1/plates.py`.
- **Moderation pipeline:** `backend/app/services/moderation/`.
- **Upload flow:** `backend/app/api/v1/uploads.py` (sign + ocr-hint) and `plates.py` (commit).
- **Auth + API client on frontend:** `frontend/src/hooks/AuthProvider.tsx`, `frontend/src/lib/api.ts`, `frontend/src/lib/supabase.ts`.
- **Route components:** `frontend/src/pages/`.
- **Design tokens:** `frontend/src/lib/design.ts` and Tailwind config.

## Dev commands

Backend:
```bash
cd backend && make dev              # uvicorn with reload on :8000
alembic upgrade head                 # run migrations
```

Frontend:
```bash
cd frontend && npm run dev           # vite dev server
npm run build                        # tsc -b && vite build
npm run lint
```

## Conventions

- Prefer editing existing files over creating new ones.
- Don't add comments explaining *what* code does — names should carry that. Only comment the non-obvious *why*.
- Keep changes scoped to what's asked. No drive-by refactors, no speculative abstractions.
- Don't commit unless the user asks.
