# NOET 2027 Deployment Guide

This repository is prepared for the following production architecture:

- **Frontend:** React + Vite on Vercel
- **Backend:** Django + Django REST Framework on Render
- **Database:** Supabase PostgreSQL
- **Uploaded abstracts:** Supabase Storage
- **Source control:** GitHub
- **Admin:** Django Admin (`/admin/`)

No production secret is stored in this repository.

## 1. Vercel

Create a Vercel project from the GitHub repository and set the **Root Directory** to:

```text
frontend
```

Vercel will run `npm run build` and publish `dist/`.

After the Django API is deployed, add this environment variable in Vercel:

```text
VITE_API_URL=https://YOUR-DJANGO-BACKEND.onrender.com
```

For a custom API domain, use that HTTPS URL instead.

## 2. Supabase PostgreSQL

Create a Supabase project and copy the PostgreSQL connection string from **Connect**.

For a persistent hosted Django backend on IPv4-only infrastructure, Supabase documents the **Shared Pooler, session mode** as the appropriate alternative to the direct IPv6 connection.

Set the resulting connection string as:

```text
DATABASE_URL=postgresql://...
```

Do not commit the connection string.

## 3. Supabase Storage

Create an R2 bucket for abstract submissions. Create an R2 API token/access key with access only to this bucket if possible.

Set these Render environment variables:

```text
SUPABASE_STORAGE_ACCESS_KEY_ID=...
SUPABASE_STORAGE_SECRET_ACCESS_KEY=...
SUPABASE_STORAGE_BUCKET=noet-2027-abstracts
SUPABASE_STORAGE_ENDPOINT_URL=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

The Django `FileField` will use R2 automatically when all four values are present. Uploaded files receive signed URLs rather than being exposed as a public bucket by default.

## 4. Render Django backend

The repository includes `render.yaml`.

Create a Render Blueprint from the repository. The backend service uses:

```text
Root Directory: backend
Build: pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate --noinput
Start: gunicorn n0et_backend.wsgi:application --bind 0.0.0.0:$PORT
Health: /health/
```

During the initial Blueprint setup, provide values for the variables marked `sync: false`.

After the Render service has its final URL, set:

```text
CORS_ALLOWED_ORIGINS=https://YOUR-VERCEL-DOMAIN.vercel.app
CSRF_TRUSTED_ORIGINS=https://YOUR-VERCEL-DOMAIN.vercel.app
```

For multiple frontend domains, separate origins with commas.

## 5. Django admin

After the first successful deployment, create an admin account in the Render Shell:

```bash
python manage.py createsuperuser
```

Then use:

```text
https://YOUR-DJANGO-BACKEND.onrender.com/admin/
```

The public API intentionally allows **creation only** for registrations and abstracts. It does not expose public GET/PUT/PATCH/DELETE access to registration records.

## 6. Existing SQLite data

The original repository contained a local `db.sqlite3` and uploaded files under `backend/media/abstracts/`. They are intentionally excluded from the deployment package so personal/test data is not committed to GitHub.

If the records are real and must be preserved, migrate them separately into Supabase before going live.

## 7. Local development

Frontend:

```bash
cd frontend
npm ci
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
# activate the environment
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The frontend defaults to `http://localhost:8000` through `frontend/.env.example`.

## Production data flow

```text
Visitor
  -> Vercel React site
  -> HTTPS Django API on Render
  -> Supabase PostgreSQL

Abstract file
  -> Django
  -> Supabase Storage

Organizer
  -> Django Admin
  -> Supabase PostgreSQL
  -> signed R2 file URL
```
