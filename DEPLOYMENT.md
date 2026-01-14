# Deployment Guide - Render & Vercel

This guide provides step-by-step instructions to deploy this application to Render (backend + database) and Vercel (frontend) for free.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account with this repository
- ✅ Render account (sign up at [render.com](https://render.com))
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ Google Maps API key ([Get one here](https://console.cloud.google.com/))
- ✅ Auth0 account ([Sign up here](https://auth0.com))

---

## 🗄️ Step 1: Deploy Database (Render PostgreSQL)

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `hospital-nav-db` (or your preferred name)
   - **Database:** `postgres` (default)
   - **User:** `postgres` (default)
   - **Region:** Choose closest to you
   - **PostgreSQL Version:** Latest (15+)
   - **Plan:** Free (if available) or Starter ($7/month)
4. Click **"Create Database"**
5. Wait ~2 minutes for database creation
6. **Copy the Internal Database URL** (you'll need this for the backend)
   - Format: `postgresql://user:password@internal-host:5432/database`
   - Find it in: Database dashboard → "Connections" tab → "Internal Database URL"

---

## 🔧 Step 2: Push Database Schema

Before deploying the backend, push your Prisma schema to the Render database:

1. In Render, go to your PostgreSQL database dashboard
2. Find the **"External Database URL"** (different from Internal URL)
   - Located in "Connections" tab
   - Format: `postgresql://user:password@external-host:5432/database`
3. In your local project root, create/update `.env.prod`:
   ```env
   POSTGRES_URL=<External Database URL from Render>
   ```
4. Run locally:
   ```bash
   yarn workspace database push:prod
   ```
   This will create all tables in your Render database.

---

## 🖥️ Step 3: Deploy Backend (Render Web Service)

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:
   - **Name:** `hospital-nav-backend`
   - **Environment:** `Node`
   - **Region:** Same as database
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** Leave empty
   - **Build Command:**
     ```bash
     corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install && yarn workspace database generate && yarn build
     ```
   - **Start Command:**
     ```bash
     corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install --immutable && BACKEND_PORT=$PORT yarn workspace backend docker:run
     ```
   - **Plan:** Free (spins down after 15 min inactivity)

4. **Environment Variables** - Add these:
   ```
   NODE_ENV=production
   POSTGRES_URL=<Internal Database URL from Step 1>
   BACKEND_SOURCE=production
   ```
   **Important:** Use the **Internal Database URL** (not External) for `POSTGRES_URL`

5. Click **"Create Web Service"**
6. Wait ~5-10 minutes for first deployment
7. **Copy your backend URL** (e.g., `https://hospital-nav-backend.onrender.com`)

---

## 🎨 Step 4: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Other (or leave blank)
   - **Root Directory:** Leave empty
   - **Install Command:** Leave empty
   - **Build Command:**
     ```bash
     corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install && cd apps/frontend && yarn build
     ```
   - **Output Directory:** `apps/frontend/build`

5. **Environment Variables** - Add these:
   ```
   ENABLE_EXPERIMENTAL_COREPACK=1
   VITE_API_URL=https://your-backend-name.onrender.com
   VITE_AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```
   **Replace:**
   - `your-backend-name.onrender.com` with your actual Render backend URL
   - `your-auth0-domain` with your Auth0 domain
   - `your-auth0-client-id` with your Auth0 client ID
   - `your-google-maps-api-key` with your Google Maps API key

6. Click **"Deploy"**
7. Wait ~2-3 minutes for deployment
8. Your site will be live at `https://your-project.vercel.app`

---

## 🔐 Step 5: Configure Auth0 for Production

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Select your application
3. Go to **Settings** tab
4. Scroll to **Application URIs** section
5. Add your production URLs:
   - **Allowed Callback URLs:**
     ```
     https://your-project.vercel.app/directory, https://your-project.vercel.app
     ```
   - **Allowed Logout URLs:**
     ```
     https://your-project.vercel.app
     ```
   - **Allowed Web Origins:**
     ```
     https://your-project.vercel.app
     ```
6. Click **"Save Changes"**

---

## ✅ Step 6: Verify Deployment

1. Visit your Vercel frontend URL
2. Test key features:
   - ✅ Home page loads
   - ✅ Directory page shows departments
   - ✅ Directions page works
   - ✅ Service request forms work
   - ✅ Forum loads posts
3. Check browser console for any errors
4. Check Render logs if backend seems slow

---

## 🔄 Updating Your Deployment

### Frontend Updates
- Push changes to GitHub → Vercel auto-deploys
- Or manually redeploy in Vercel dashboard

### Backend Updates
- Push changes to GitHub → Render auto-deploys
- Or manually redeploy in Render dashboard

### Database Schema Changes
1. Update Prisma schema locally
2. Run `yarn workspace database push:prod` (using External URL)
3. Push code changes → Backend will auto-redeploy

---

## 🐛 Troubleshooting

### Backend Won't Start
- **Check Render logs** for error messages
- **Verify environment variables** are set correctly
- **Ensure database is running** (not paused)
- **Check build command** includes `corepack enable`

### Frontend Build Fails
- **Verify `ENABLE_EXPERIMENTAL_COREPACK=1`** is set
- **Check build command** includes `corepack enable`
- **Verify all environment variables** are set

### Database Connection Issues
- **Use Internal URL** for Render services
- **Use External URL** for local connections
- **Check database is not paused** in Render dashboard

### CORS Errors
- Backend has CORS enabled in code
- Verify `VITE_API_URL` matches your backend URL exactly
- Check browser console for specific error messages

### Backend Sleeps (Free Tier)
- First request after 15 min inactivity takes ~30 seconds
- This is normal for free tier
- Consider upgrading to paid tier for production use

---

## 💰 Cost Summary

| Service | Tier | Cost |
|---------|------|------|
| Render Database | Free | $0/month* |
| Render Backend | Free | $0/month** |
| Vercel Frontend | Free | $0/month |
| **Total** | | **$0/month** |

\* Free tier: 90 days data retention  
\** Free tier: Spins down after 15 min inactivity (wakes automatically)

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth0 Documentation](https://auth0.com/docs)

---

## 🎯 Quick Reference

**Backend URL:** `https://your-backend-name.onrender.com`  
**Frontend URL:** `https://your-project.vercel.app`  
**Database:** Render PostgreSQL (Internal URL for backend, External URL for local)

**Key Environment Variables:**
- `POSTGRES_URL` - Database connection (Internal URL in Render)
- `VITE_API_URL` - Backend API URL (in Vercel)
- `VITE_AUTH0_DOMAIN` - Auth0 domain (in Vercel)
- `VITE_AUTH0_CLIENT_ID` - Auth0 client ID (in Vercel)
- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps key (in Vercel)

---

**Need Help?** Check the logs in Render/Vercel dashboards for detailed error messages.
