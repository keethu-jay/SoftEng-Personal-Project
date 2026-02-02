# Deployment Guide - Render & Vercel

This guide provides step-by-step instructions to deploy this application to Render (backend + database) and Vercel (frontend) for free.

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub account with this repository
- ✅ Render account (sign up at [render.com](https://render.com))
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ Google Maps API key ([Get one here](https://console.cloud.google.com/))
- ✅ Auth0 account ([Sign up here](https://auth0.com))

---

## Step 1: Deploy Database (Render PostgreSQL)

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `hospital-nav-db` (or your preferred name)
   - **Database:** Leave blank (Render will auto-generate a name)
   - **User:** Leave blank (Render will auto-generate a user)
   - **Region:** Choose closest to you
   - **PostgreSQL Version:** Latest (15+)
   - **Plan:** Free (if available) or Starter ($7/month)
4. Click **"Create Database"**
5. Wait ~2 minutes for database creation
6. **Copy the Internal Database URL** (you'll need this for the backend)
   - Format: `postgresql://user:password@internal-host:5432/database`
   - Find it in: Database dashboard → "Connections" tab → "Internal Database URL"
   - This URL contains the auto-generated database name and user

---

## Step 2: Push Database Schema

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

## Step 3: Deploy Backend (Render Web Service)

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
     corepack enable && corepack prepare yarn@4.7.0 --activate && export PRISMA_SKIP_POSTINSTALL_GENERATE=true && export YARN_CACHE_FOLDER=".yarn/cache" && yarn install --immutable && yarn workspace database generate && yarn build
     ```
   
   **Note:** `YARN_CACHE_FOLDER=".yarn/cache"` keeps the cache inside the project so the **start** step can find packages (avoids "Required package missing from disk" for http-errors etc.). `PRISMA_SKIP_POSTINSTALL_GENERATE=true` must be set so Prisma does **not** run `generate` during `yarn install`. Also set `PRISMA_SKIP_POSTINSTALL_GENERATE=true` in Render **Environment Variables** (see below).
   - **Start Command:**
     ```bash
     BACKEND_PORT=$PORT NODE_OPTIONS="--max-old-space-size=480" yarn node apps/backend/dist/bin/www.js
     ```
   - **Important:** Run the **compiled** backend (Node runs `dist/bin/www.js`), not `ts-node`. This avoids "Required package missing from disk" for ts-node under Yarn PnP at runtime. The build step compiles the backend with `yarn build`.
   - **Plan:** Free (spins down after 15 min inactivity)
   
   **Note:** The `.nvmrc` file and `engines` field in `package.json` specify Node.js 20, which Render automatically detects. Corepack should work properly with Node 20.

4. **Environment Variables** - Add these:
   ```
   NODE_ENV=production
   POSTGRES_URL=<Internal Database URL from Step 1>
   BACKEND_SOURCE=production
   PRISMA_SKIP_POSTINSTALL_GENERATE=true
   YARN_CACHE_FOLDER=.yarn/cache
   ```
   **Important:** 
   - Use the **Internal Database URL** (not External) for `POSTGRES_URL`
   - **YARN_CACHE_FOLDER=.yarn/cache** keeps the Yarn cache inside the project so the start step finds packages (fixes "Required package missing from disk" for http-errors etc.).
   - **PRISMA_SKIP_POSTINSTALL_GENERATE=true** is required so Prisma does not run `generate` during `yarn install`.
   - **Note:** Google Maps API key is NOT needed here - it's only used in the frontend (Vercel)

5. Click **"Create Web Service"**
6. Wait ~5-10 minutes for first deployment
7. **Copy your backend URL** (e.g., `https://hospital-nav-backend.onrender.com`)

---

## Step 4: Deploy Frontend (Vercel)

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
   - `your-backend-name.onrender.com` with your actual Render backend URL (e.g., `https://hospital-back-195y.onrender.com`)
   - `your-auth0-domain` with your Auth0 domain
   - `your-auth0-client-id` with your Auth0 client ID
   - `your-google-maps-api-key` with your Google Maps API key
   
   **CRITICAL:** 
   - `VITE_API_URL` must include `https://` prefix
   - No trailing slash at the end
   - After setting environment variables, you MUST redeploy the frontend for changes to take effect

6. Click **"Deploy"**
7. Wait ~2-3 minutes for deployment
8. Your site will be live at `https://your-project.vercel.app`

---

## Step 5: Configure Auth0 for Production

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

## Step 6: Verify Deployment

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

## Updating Your Deployment

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

## Troubleshooting

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

### Build failed: "Required unplugged package missing" / Prisma postinstall failed (Render)
This usually means Prisma ran `generate` during `yarn install` (and failed under Yarn PnP), leaving the install in a bad state.

1. **Set `PRISMA_SKIP_POSTINSTALL_GENERATE=true` in Render**
   - Render → your Web Service → **Environment** → add:
   - **Key:** `PRISMA_SKIP_POSTINSTALL_GENERATE`  
   - **Value:** `true`
   - Save and redeploy.

2. **Use the updated Build Command** (it exports that variable and uses `yarn install --immutable`):
   ```bash
   corepack enable && corepack prepare yarn@4.7.0 --activate && export PRISMA_SKIP_POSTINSTALL_GENERATE=true && yarn install --immutable && yarn workspace database generate && yarn build
   ```

3. **Pin Prisma to one version** – The repo now pins `prisma` and `@prisma/client` to `6.5.0` (with `resolutions` in root `package.json`). After pulling, run **`yarn install`** locally so the lockfile updates, then commit and push so Render uses a single Prisma version.

### "Required package missing from disk" for http-errors or other packages at start (Render)
PnP is resolving packages to a path like `/opt/render/.cache/...` that doesn't exist at start. Force the cache **inside the project**:

1. **In the repo:** `.yarnrc.yml` should contain `cacheFolder: ".yarn/cache"` (already added).
2. **In Render Build Command** include: `export YARN_CACHE_FOLDER=".yarn/cache"` before `yarn install`.
3. **In Render Environment Variables** add: **Key** `YARN_CACHE_FOLDER`, **Value** `.yarn/cache`.
4. **Redeploy** so the build runs a fresh install with the project-local cache; then start will find packages.

### "Required package missing from disk" / ts-node missing at start (Render)
The **start** command must run the **compiled** backend (Node running JS), not `ts-node` (TypeScript at runtime). Under Yarn PnP on Render, ts-node is not available at runtime, so you get "Missing package: ts-node@virtual:...".

**Fix:** Use this start command (runs compiled `dist/bin/www.js` from repo root so PnP resolves `database` and `common`):
```bash
BACKEND_PORT=$PORT NODE_OPTIONS="--max-old-space-size=480" yarn node apps/backend/dist/bin/www.js
```
The build step (`yarn build`) compiles the backend to `apps/backend/dist/`. Do **not** use `yarn workspace backend docker:run` or `ts-node` in production on Render.

### "Ran out of memory (used over 512MB)" on Render backend
Render's free tier has a **512MB** memory limit. The deploy can exceed this if the **start command** runs a full `yarn install` again.

1. **Use the lighter start command** (no second install, cap Node heap):
   ```bash
   BACKEND_PORT=$PORT NODE_OPTIONS="--max-old-space-size=480" yarn workspace backend docker:run
   ```
   In Render: **Dashboard** → your Web Service → **Settings** → **Build & Deploy** → **Start Command** → paste the above and save.

2. **Do not** include `yarn install` or `corepack ... && yarn install` in the start command. The **build** step already installs dependencies; re-running install at start doubles memory use and often triggers the 512MB limit.

3. **Redeploy** after changing the start command (Manual Deploy or push a commit).

4. If it still runs out of memory, consider Render's **Starter** plan (e.g. $7/month) for more memory, or trim dependencies (e.g. remove unused workspaces from the deploy).

### "Unable to connect to server" / No data on any page (Vercel)
This usually means the frontend is calling **localhost** instead of your deployed backend.

1. **Set `VITE_API_URL` in Vercel** (required for production):
   - Vercel → Your project → **Settings** → **Environment Variables**
   - Add: **Name** `VITE_API_URL`, **Value** `https://YOUR-RENDER-BACKEND-URL.onrender.com`
   - Use your actual Render backend URL (e.g. `https://hospital-nav-backend.onrender.com`)
   - No trailing slash; must include `https://`
2. **Redeploy the frontend** after adding/changing env vars:
   - Vercel → **Deployments** → ⋮ on latest → **Redeploy**
3. **Confirm the backend is up**: open `https://YOUR-BACKEND.onrender.com/api/healthcheck` in a browser (free tier may take ~30s to wake).

### CORS Errors
- Backend has CORS enabled in code (updated to allow Vercel domains)
- Verify `VITE_API_URL` matches your backend URL exactly (must include `https://`)
- Check browser console for specific error messages
- **Common issue:** If data doesn't load, check that `VITE_API_URL` is set in Vercel environment variables

### Data Not Loading / API Calls Failing
1. **Verify `VITE_API_URL` is set in Vercel:**
   - Go to Vercel project → Settings → Environment Variables
   - Ensure `VITE_API_URL` is set to your Render backend URL (e.g., `https://hospital-back-195y.onrender.com`)
   - **Important:** Must include `https://` prefix, no trailing slash
   
2. **Check browser console:**
   - Open browser DevTools (F12) → Console tab
   - Look for errors like "Failed to fetch" or CORS errors
   - Check Network tab to see if API calls are being made and what URLs they're using
   
3. **Verify backend is running:**
   - Visit your Render backend URL directly: `https://your-backend.onrender.com/api/healthcheck`
   - Should return a response (backend might be sleeping on free tier - first request takes ~30 seconds)
   
4. **Redeploy frontend after setting environment variables:**
   - After adding/updating `VITE_API_URL` in Vercel, you must redeploy
   - Go to Vercel dashboard → Deployments → Click "..." → "Redeploy"

### Backend Sleeps (Free Tier)
- First request after 15 min inactivity takes ~30 seconds
- This is normal for free tier
- Consider upgrading to paid tier for production use

---

## Cost Summary

| Service | Tier | Cost |
|---------|------|------|
| Render Database | Free | $0/month* |
| Render Backend | Free | $0/month** |
| Vercel Frontend | Free | $0/month |
| **Total** | | **$0/month** |

\* Free tier: 90 days data retention  
\** Free tier: Spins down after 15 min inactivity (wakes automatically)

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth0 Documentation](https://auth0.com/docs)

---

## Quick Reference

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
