# Vercel Deployment Guide

This project is a **monorepo** — the deployable React app lives in `/frontend`, with a FastAPI service in `/backend` that is **NOT** deployed to Vercel (it's only for local Emergent dev).

## Two deployment options — pick ONE

### Option A (recommended) — Use the root `vercel.json`

Keep Vercel's Root Directory as `./` and let `vercel.json` at the repo root drive everything.

| Vercel Setting       | Value                       |
|----------------------|-----------------------------|
| Framework Preset     | **Other** (or leave blank)  |
| Root Directory       | `./` (do NOT set to frontend) |
| Build Command        | leave blank (uses vercel.json) |
| Output Directory     | leave blank (uses vercel.json) |
| Install Command      | leave blank (uses vercel.json) |
| Node Version         | 20.x (from `.nvmrc`)        |

### Option B — Set Root Directory to `frontend`

If you'd rather point Vercel directly at the React app folder, set Root Directory to `frontend`. The `frontend/vercel.json` will be used instead.

| Vercel Setting       | Value                       |
|----------------------|-----------------------------|
| Framework Preset     | **Create React App**        |
| Root Directory       | `frontend`                  |
| Build Command        | leave blank                 |
| Output Directory     | leave blank (= `build`)     |
| Install Command      | leave blank                 |
| Node Version         | 20.x (from `frontend/.nvmrc`) |

## Environment variables

The portfolio site does **NOT** require any environment variables in production. It is a fully static React build (no API calls).

The `frontend/.env` file used in local dev contains `REACT_APP_BACKEND_URL` — this is only used by the unrelated FastAPI backend boilerplate and is not referenced anywhere in the portfolio code. You can safely leave Vercel Environment Variables empty.

## What was fixed for Vercel

1. Removed empty `yarn.lock` at repo root that was misleading Vercel into running install at the wrong level.
2. Added `CI=false` to the build command so CRA warnings don't fail the build.
3. Added `NODE_OPTIONS=--max-old-space-size=4096` for React 19 / CRA 5 memory headroom.
4. Pinned Node 20 via `.nvmrc` (CRA 5 + React 19 have known issues on Node 22 default).
5. Added `.npmrc` with `legacy-peer-deps=true` so the build works with `npm install` too (React 19 has peer-dep warnings).
6. Added `.vercelignore` so the `/backend`, `/tests`, etc. folders are skipped by Vercel.
7. Added rewrites that preserve the static iframe folders (`/skyforge`, `/jag`, `/bluehaven`) and route everything else to `index.html` for SPA routing.

## Verifying locally before deploy

```bash
cd frontend
yarn install
CI=false yarn build
# build output appears in frontend/build/
```

If the local build succeeds, Vercel will too.
