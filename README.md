# PlateGallery

A community gallery of American vanity license plates. Built for **Bounty #1: PlateGallery** — a BU Spark! Innovation Hours bounty.

Users sign in with Google, upload photos of vanity plates they've spotted, tag them by state, and vote on others' submissions. Uploads run through an automated moderation pipeline (image + text checks, duplicate detection) before going live — no manual review queue.

## Architecture

| Layer | Stack | Hosted on |
|---|---|---|
| Frontend | React 19 + Vite + TypeScript, TanStack Query, React Router, Tailwind CSS, Framer Motion | Cloudflare Pages (via Wrangler) |
| Backend | Python 3.12, FastAPI, async SQLAlchemy, Alembic | (see `backend/Dockerfile`) |
| Database | Postgres (Supabase-managed in prod) | Supabase |
| Auth | Supabase Auth (Google OAuth) | Supabase |
| Storage | Supabase Storage (signed upload URLs) | Supabase |

Design language is editorial / gallery-like — serif display type, muted earthy palette (bone, cream, charcoal, oxblood), restrained motion. See `FRONTEND_PLAN.md` for the full design spec.

## Repo layout

```
/backend            FastAPI app — API, moderation, DB
  /app
    /api/v1         endpoint routers (plates, votes, uploads, ...)
    /core           config, security, errors, logging
    /db             SQLAlchemy models + Alembic migrations
    /schemas        Pydantic request/response models
    /services       storage, moderation pipeline, feed builder, rate limiting
/frontend           Vite + React app
  /src
    /components     shared UI (Nav, Plate, VoteControl, ...)
    /pages          route components
    /hooks          auth + data hooks
    /lib            api client, supabase client, types, design tokens
/plate gallery      design mockup / canvas (reference, not shipped)
BACKEND_PLAN.md     full backend design doc
FRONTEND_PLAN.md    full frontend design doc
```

## Running locally

### Backend
```bash
cd backend
cp .env.example .env          # fill in Supabase + DB URLs
make dev                      # or: uvicorn app.main:app --reload --port 8000
```
Migrations: `alembic upgrade head`.

### Frontend
```bash
cd frontend
cp .env.example .env.local    # fill in VITE_API_BASE_URL, Supabase keys
npm install
npm run dev
```

## API surface

All endpoints prefixed `/api/v1`. Error envelope: `{ error: { code, message, details? } }`. See `BACKEND_PLAN.md` Appendix A for the full list.

## How to participate (bounty submission)

1. Read the [project brief](https://docs.google.com/document/d/1gi3kzYFKG_e_6IFV3GCC1VCTyqcLZ-eEkGE8kDcfoAY/edit?usp=sharing) and [participant guide](https://docs.google.com/document/d/1gaKahLkqOo8qxo78omG2NSAmWRFBEsyKfCcLItngBhk/edit?usp=sharing).
2. Fork this repo, create a branch `your-team-name/main`, build in your fork.
3. Submit by opening a PR titled `[Team Name] — PlateGallery Submission`.

Questions: Innovation Hours on Wednesdays 4–6pm at BU Spark!, or email buspark@bu.edu / kzingade@bu.edu.
