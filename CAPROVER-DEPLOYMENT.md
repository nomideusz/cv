# CapRover Deployment Guide

This guide covers how to deploy the CV Maker backend to your CapRover VPS.

## Prerequisites

- CapRover installed on your VPS
- CapRover CLI installed on your local machine
- Access to your CapRover dashboard

## Step 1: Install CapRover CLI (if not already installed)

```bash
npm install -g caprover
```

## Step 2: Connect to Your CapRover Server

```bash
caprover login
```

You'll be prompted to enter:
- CapRover URL (e.g., `https://captain.your-domain.com`)
- Password (your CapRover password)
- Choose a name for this CapRover instance (e.g., "my-vps")

## Step 3: Create a New App in CapRover

### Option A: Via CLI

```bash
caprover apps create cv-maker-api
```

### Option B: Via Dashboard

1. Go to your CapRover dashboard
2. Click "Apps" in the sidebar
3. Click "Create New App"
4. Enter app name: `cv-maker-api` (or your preferred name)
5. Click "Create New App"

## Step 4: Configure Environment Variables

Go to your CapRover dashboard:

1. Navigate to **Apps** → **cv-maker-api**
2. Click on **App Configs** tab
3. Scroll to **Environmental Variables**
4. Add the following variables:

```
ALLOWED_ORIGINS=https://your-netlify-site.netlify.app,http://localhost:5173
PORT=80
```

**Important Notes:**
- `PORT=80` is required for CapRover (it expects apps to listen on port 80 internally)
- Replace `https://your-netlify-site.netlify.app` with your actual Netlify URL
- Keep `http://localhost:5173` for local development testing

5. Click **Add & Update** to save

## Step 5: Enable HTTPS (Recommended)

Still in your app settings:

1. Scroll to **HTTP Settings**
2. Check **Enable HTTPS**
3. Check **Force HTTPS by redirecting all HTTP traffic to HTTPS**
4. Click **Save & Update**

## Step 6: Deploy Your Backend

From your project root directory:

```bash
caprover deploy
```

You'll be prompted to:
1. Select your CapRover instance (the name you chose in Step 2)
2. Select your app (`cv-maker-api`)
3. Confirm the deployment

The deployment process will:
- Build your application using the `captain-definition` file
- Create a Docker container
- Deploy it to CapRover
- Start your backend server

## Step 7: Get Your Backend URL

After successful deployment, your backend will be available at:

```
https://cv-maker-api.your-caprover-domain.com
```

To find your exact URL:
1. Go to CapRover dashboard
2. Navigate to **Apps** → **cv-maker-api**
3. Look for **App URLs** section at the top

## Step 8: Configure Your Frontend

Now update your Netlify frontend with the backend URL:

### In Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add/update variable:
   - Key: `VITE_API_URL`
   - Value: `https://cv-maker-api.your-caprover-domain.com/api`
3. Click **Save**
4. **Redeploy** your site for changes to take effect

### For Local Development:

Create a `.env` file in your project root:

```env
VITE_API_URL=https://cv-maker-api.your-caprover-domain.com/api
```

## Step 9: Update CORS Settings

After deploying to Netlify, update the CORS settings in CapRover:

1. Go to **Apps** → **cv-maker-api** → **App Configs**
2. Update `ALLOWED_ORIGINS` to include your Netlify URL:
   ```
   ALLOWED_ORIGINS=https://your-actual-netlify-site.netlify.app,http://localhost:5173
   ```
3. Click **Save & Update**
4. Click **Save & Restart** to restart your app with new settings

## Troubleshooting

### Deployment Fails

**Check build logs:**
```bash
caprover logs cv-maker-api
```

**Common issues:**
- Missing `captain-definition` file - Make sure it's in your project root
- Node version mismatch - The `captain-definition` uses Node 18, which should work fine
- Build errors - Check that `package.json` is correct

### App Not Starting

1. Go to CapRover dashboard → Apps → cv-maker-api
2. Click on **Logs** tab
3. Check for error messages
4. Common issues:
   - Port mismatch: Make sure `PORT=80` in environment variables
   - Database errors: SQLite database will be created automatically on first run

### CORS Errors

If you see CORS errors in browser console:

1. Verify `ALLOWED_ORIGINS` includes your frontend URL
2. Make sure both URLs use same protocol (http vs https)
3. Check for typos in the domain
4. Restart the app after changing environment variables

### Testing Your Backend

Test that your backend is running:

```bash
curl https://cv-maker-api.your-caprover-domain.com/api/health
```

Should return:
```json
{"status":"ok"}
```

## Updating Your App

To deploy updates:

1. Make your code changes
2. Commit to git (optional but recommended)
3. Run from project root:
   ```bash
   caprover deploy
   ```

CapRover will rebuild and redeploy your app automatically.

## Database Persistence

⚠️ **Important**: By default, CapRover containers are ephemeral. Your SQLite database will persist between deployments, but it's stored in the container.

### To Ensure Database Persistence:

1. Go to CapRover dashboard → Apps → cv-maker-api
2. Click on **App Configs** tab
3. Scroll to **Persistent Directories**
4. Add a persistent directory:
   - Path in App: `/usr/src/app/server`
   - Label: `cv-database`
5. Click **Add Persistent Directory**
6. Click **Save & Restart**

This ensures your database survives app restarts and redeployments.

## Advanced: Custom Domain

To use a custom domain for your backend:

1. In CapRover dashboard, go to Apps → cv-maker-api
2. Scroll to **App URLs** section
3. Click **Connect New Domain**
4. Enter your domain (e.g., `api.your-domain.com`)
5. Make sure DNS is pointing to your CapRover server
6. Click **Connect**
7. Enable HTTPS for the new domain

Then update `VITE_API_URL` in Netlify to use your custom domain.

## Cost

Since you're self-hosting on your own VPS:
- **Backend hosting**: Free (using your VPS)
- **Frontend (Netlify)**: Free tier
- **Total**: $0/month (excluding VPS costs)

## Next Steps

1. Deploy frontend to Netlify (see main [DEPLOYMENT.md](DEPLOYMENT.md))
2. Test the full application
3. Set up database backups (recommended)

## Quick Reference

```bash
# Deploy
caprover deploy

# View logs
caprover logs cv-maker-api

# Login to different server
caprover login

# List all apps
caprover apps list
```
