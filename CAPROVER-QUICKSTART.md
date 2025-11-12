# CapRover Quick Start - CV Maker Backend

## Prerequisites
✅ CapRover installed on your VPS
✅ Node.js installed locally

## 1. Install CapRover CLI

```bash
npm install -g caprover
```

## 2. Login to CapRover

```bash
caprover login
```

Enter:
- Your CapRover URL: `https://captain.your-domain.com`
- Password
- Instance name: `my-vps` (or any name you prefer)

## 3. Create App

```bash
caprover apps create cv-maker-api
```

## 4. Set Environment Variables

Go to CapRover Dashboard → Apps → cv-maker-api → App Configs

Add these variables:
```
ALLOWED_ORIGINS=https://your-netlify-site.netlify.app,http://localhost:5173
PORT=80
```

Click **Save & Update**

## 5. Enable HTTPS

In the same page:
- HTTP Settings section
- ☑️ Enable HTTPS
- ☑️ Force HTTPS
- Click **Save & Update**

## 6. Deploy

From your project root:

```bash
caprover deploy
```

Select:
- Your CapRover instance
- App: `cv-maker-api`

## 7. Get Your Backend URL

Your backend will be at:
```
https://cv-maker-api.your-caprover-domain.com
```

Test it:
```bash
curl https://cv-maker-api.your-caprover-domain.com/api/health
```

Should return: `{"status":"ok"}`

## 8. Configure Netlify Frontend

In Netlify Dashboard:
- Site settings → Environment variables
- Add: `VITE_API_URL` = `https://cv-maker-api.your-caprover-domain.com/api`
- Redeploy your site

## 9. Update CORS

After getting your Netlify URL, update CapRover:
- Apps → cv-maker-api → App Configs
- Update `ALLOWED_ORIGINS` with your actual Netlify URL
- Click **Save & Restart**

## Done! 🎉

Your CV Maker backend is now running on your VPS!

## Update Your App

To deploy changes:
```bash
caprover deploy
```

## View Logs

```bash
caprover logs cv-maker-api
```

## Need Help?

See full guide: [CAPROVER-DEPLOYMENT.md](CAPROVER-DEPLOYMENT.md)
