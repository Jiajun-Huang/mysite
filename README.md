# mysite

A personal website and content platform built with **Django + DRF** on the backend and **Next.js** on the frontend, with an additional **React + Vite admin panel** for content management.

The project supports blog publishing, markdown rendering (including math), comments, GitHub OAuth login, and a music page backed by Jellyfin.

## Project Structure

```text
mysite/
├─ backend/   # Django REST API (blogs, comments, users, music)
├─ frontend/  # Next.js public site
├─ admin/     # React + Vite admin dashboard
├─ build.py   # helper script for local start and remote deployment
└─ deploy_unraid.sh
```

## Tech Stack

- **Backend**: Django 5, Django REST Framework, dj-rest-auth, allauth, drf-spectacular
- **Frontend**: Next.js 15, React 19, HeroUI, Tailwind CSS
- **Admin**: React 18, Vite, Ant Design
- **Storage / Infra**: MySQL, MinIO (media), optional Docker deployment script for Unraid

## Core Features

- Blog APIs with tags/categories and rich filtering/sorting
- Markdown post rendering with TOC, KaTeX, and code highlighting
- Comment system (per-post and global comments)
- JWT-based auth + GitHub OAuth integration
- User avatar endpoint (GitHub avatar or MinIO-stored avatar)
- Music playback endpoints (song list, stream, cover, lyrics)
- OpenAPI schema + Swagger UI

## Backend API Overview

Base path: `/api/`

- Blogs: `/blog/`, `/blog/uri/{uri}`, `/blog/file/{id}`, `/blog/image/{uri}`
- Tags / Categories: `/tag/`, `/category/`
- Comments: `/comment/`, `/comment/get-comments`, `/comment/get-comment`
- Users/Auth: `/user/`, `/auth/*`, `/auth/github/*`
- Music: `/songlist/`, `/audio/{id}`, `/cover/{id}`, `/lrc/{id}`

API docs:

- Schema: `/api/schema/`
- Swagger UI: `/swagger/`

## Prerequisites

- Python 3.11+
- Node.js 18+ (Node 20+ recommended)
- MySQL instance
- MinIO instance (for blog/media storage)

## Environment Variables

The backend reads configuration from environment variables (with defaults in `backend/mysite/settings.py`).

Common variables:

- `DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DATABASE_URL` (format: `mysql://user:password@host:3306/dbname`)
- `MINIO_STORAGE_URL` (format: `http://host:9000/bucket`)
- `MINIO_STORAGE_ACCESS_KEY`
- `MINIO_STORAGE_SECRET_KEY`
- `BACKEND_ADDR` (used by Next.js rewrites)
- `NEXT_PUBLIC_BACKEND_ADDR`

## Local Development

### 1) Start backend (Django)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend default: `http://127.0.0.1:8000`

### 2) Start frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend default: `http://127.0.0.1:3000`

### 3) Start admin dashboard (Vite)

```bash
cd admin
npm install
npm run dev
```

Admin default: `http://localhost:8080`

> Note: `frontend/next.config.mjs` rewrites `/api/*` to `BACKEND_ADDR`, and `admin/vite.config.ts` proxies `/api` to the configured backend target.

## Helper Commands

From repo root:

```bash
python build.py start backend
python build.py start frontend
```

Root `Makefile` also contains quick `backend` and `frontend` targets for Unix-like environments.

## Docker / Unraid Deployment

This repository includes a deployment workflow for Unraid:

- `build.py build [frontend|backend|all]` builds images and triggers deployment
- `deploy_unraid.sh` stops old containers and runs new `Django-app` and `Nextjs-app` containers

You can override deployment settings with:

- `REMOTE_DOCKER_HOST`
- `REMOTE_APP_DIR`

## Notes

- There are two frontend projects in this repo:
  - `frontend/`: public website (Next.js)
  - `admin/`: internal content management UI (React + Vite)
- Current root README is focused on getting both running together with the Django API.
