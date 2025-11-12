# Deployment Guide

This guide covers how to deploy the CV Maker application with database sync functionality.

## Architecture Overview

- **Frontend**: Static Svelte app → Deploy to Netlify
- **Backend**: Express.js + SQLite → Deploy to Railway/Render/etc.

## Option 1: Frontend Only (No Database Sync)

Deploy just the frontend to Netlify without database functionality.

### Steps:
1. Push your code to GitHub
2. Connect repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

Users will only have localStorage (no cross-browser sync).

---

## Option 2: Full Stack (Frontend + Backend)

Deploy frontend to Netlify and backend to a separate service.

### Part A: Deploy Backend to Railway (Recommended)

Railway offers a free tier and is very easy to use.

#### Steps:

1. **Sign up at [railway.app](https://railway.app)**

2. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Configure the backend service**
   - Railway should auto-detect Node.js
   - Set the start command: `node server/server.js`
   - Set the root directory: `/` (or leave default)

4. **Add environment variables in Railway**:
   - Go to your project → Variables tab
   - Add these variables:
     - `ALLOWED_ORIGINS`: `https://your-netlify-site.netlify.app,http://localhost:5173`
       (Replace with your actual Netlify URL after deploying frontend)
   - Railway will auto-assign `PORT` - no need to set it

5. **Deploy**
   - Railway will automatically deploy
   - Note your backend URL (e.g., `https://your-app.railway.app`)

### Part B: Deploy Frontend to Netlify

1. **Push code to GitHub** (including the changes above)

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add environment variable**:
   - Go to Site settings → Environment variables
   - Add variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-app.railway.app/api`

5. **Deploy**

---

## Alternative Backend Hosts

### CapRover (Self-Hosted VPS) ⭐ Recommended for VPS Users

If you have a VPS with CapRover installed, see the detailed guide:

**👉 [CAPROVER-DEPLOYMENT.md](CAPROVER-DEPLOYMENT.md)**

**Quick steps:**
1. Install CapRover CLI: `npm install -g caprover`
2. Login: `caprover login`
3. Create app: `caprover apps create cv-maker-api`
4. Set environment variables in dashboard:
   - `ALLOWED_ORIGINS`: Your Netlify URL
   - `PORT`: `80`
5. Deploy: `caprover deploy`

**Benefits:**
- Self-hosted on your own VPS
- No monthly fees
- Full control
- SQLite persistence with CapRover volumes

---

### Render.com

1. Create account at [render.com](https://render.com)
2. New → Web Service
3. Connect repository
4. Settings:
   - Environment: Node
   - Build command: `npm install`
   - Start command: `node server/server.js`
   - Plan: Free
5. Add PORT environment variable: `3001`
6. Deploy

### Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Create `fly.toml` in project root:
```toml
app = "your-cv-app"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```
4. Deploy: `fly launch`

---

## Important Notes

### Database Persistence

⚠️ **SQLite in Production**:
- Railway/Render have **ephemeral filesystems** - the database may be lost on redeploy
- For production, consider:
  1. Using Railway's persistent volumes
  2. Switching to PostgreSQL (recommended for production)
  3. Using a managed database service (Supabase, PlanetScale)

### Switching to PostgreSQL (Production Ready)

If you need true persistence, switch to PostgreSQL:

1. **Install pg instead of better-sqlite3**:
```bash
npm uninstall better-sqlite3
npm install pg
```

2. **Update `server/database.js`** to use PostgreSQL

3. **Add database URL to environment**:
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

4. **Railway/Render offer free PostgreSQL databases**

---

## Testing Your Deployment

1. Visit your Netlify URL
2. Click "Login to Sync"
3. Enter a username
4. Save a CV version
5. Open the app in a different browser
6. Login with same username
7. Verify CVs are synced

---

## Troubleshooting

### "Failed to connect to server"
- Check backend is running: visit `https://your-backend-url.com/api/health`
- Verify CORS settings in `server/server.js`
- Check environment variable `VITE_API_URL` in Netlify

### "Failed to sync to server"
- Open browser console (F12)
- Check for CORS or network errors
- Verify API_URL is correct

### Database not persisting
- Railway/Render: Add persistent volume
- Or switch to PostgreSQL

---

## Cost Estimates

### Free Tier Limits:

**Netlify**:
- 100GB bandwidth/month
- 300 build minutes/month
- ✅ Sufficient for personal use

**Railway**:
- $5 free credit/month
- ~500 hours runtime
- ✅ Sufficient for personal use

**Render**:
- 750 hours/month free
- ✅ Sufficient for personal use

### Recommended Setup:
- Netlify (Frontend): **Free**
- Railway (Backend): **Free** (with credit card)
- Total: **$0/month** for personal use
