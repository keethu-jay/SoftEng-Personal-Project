# Free Deployment Guide

This guide will help you deploy your project for free (or very low cost) so you can share it on your resume.

**Before deploying, make sure you've set up:**
- Auth0 account and application (see `SETUP_GUIDE.md`)
- Google Maps API key (see `SETUP_GUIDE.md`)
- Tested everything locally (see `SETUP_GUIDE.md`) 

## Recommended Setup (100% Free)

**Frontend:** Vercel (Free, fast, never sleeps)  
**Backend:** Render (Free tier, sleeps after 15 min inactivity but wakes up automatically)  
**Database:** Render PostgreSQL (Free tier, 90 days retention)

---

## Option 1: Render + Vercel (Recommended - Free)

### Step 1: Set Up Database (Render PostgreSQL)

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `your-project-name-db`
   - **Database:** `postgres` (default)
   - **User:** `postgres` (default)
   - **Region:** Choose closest to you
   - **PostgreSQL Version:** Latest
   - **Plan:** Free (if available) or Starter ($7/month)
4. Click **"Create Database"**
5. Wait for database to be created (~2 minutes)
6. Copy the **Internal Database URL** (you'll need this later)
   - This URL contains all connection info: `postgresql://user:password@host:port/database`
   - **To find individual values** (if needed): Click on your database in Render dashboard → Go to "Connections" tab → You'll see:
     - **Host:** Under "Internal Database Host" (e.g., `dpg-xxxxx-a.oregon-postgres.render.com`)
     - **Port:** Usually `5432`
     - **User:** Usually `postgres` (shown in credentials)
     - **Password:** Click "Show" to reveal
     - **Database:** Usually `postgres`

### Step 2: Push Database Schema (Recommended Before Backend Deployment)

**Do this step before deploying the backend** (or right after Step 1):

1. In Render, go to your PostgreSQL database dashboard
2. Scroll down to find the **"External Database URL"** 
   - This is different from the Internal Database URL
   - It's under "Connections" or "External Database URL" section
   - Format: `postgresql://user:password@external-host:port/database`
3. In your local project, create/update `.env.prod` file in the root directory:
   ```
   POSTGRES_URL=<External Database URL from Render>
   ```
4. Open your terminal and run:
   ```bash
   yarn workspace database push:prod
   ```
   This will push your Prisma schema to the Render database.

**Note:** The External Database URL allows connections from outside Render. The Internal Database URL is only for connections between Render services.

### Step 3: Deploy Backend (Render Web Service)

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name:** `your-project-backend`
   - **Environment:** Node
   - **Build Command:** `corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install && yarn workspace database generate && yarn build`
   - **Start Command:** `corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install --immutable && BACKEND_PORT=$PORT yarn workspace backend docker:run`
   - **Plan:** Free (spins down after 15 min of inactivity)

4. **Environment Variables:** Add these:
   ```
   NODE_ENV=production
   POSTGRES_URL=<paste the Internal Database URL from Step 1>
   BACKEND_SOURCE=production
   BACKEND_URL=https://your-backend-name.onrender.com
   ```
   **Note:** We don't set `BACKEND_PORT` here - it will be set in the Start Command from Render's `$PORT` variable.
   **Important Notes:**
   - `BACKEND_PORT` is set in the Start Command (from Render's `$PORT`) - don't set it in environment variables
   - Use the **Internal Database URL** (not External) - it's in the format `postgresql://user:password@internal-host:port/database`
   - Replace `your-backend-name` with your actual Render service name
   - Since Prisma uses `POSTGRES_URL`, you only need that one database variable

5. Click **"Create Web Service"**
6. Wait for deployment (~5-10 minutes)

**After creating the service, update the Start Command:**
- If the deployment fails, or to update it later:
  1. Go to your service dashboard (not the Environment tab)
  2. Click **"Settings"** in the left sidebar (or scroll down on the main page)
  3. Find the **"Start Command"** field
  4. Change it to: `corepack enable && yarn workspace backend docker:run`
  5. Click **"Save Changes"**

7. Copy your backend URL (e.g., `https://your-backend-name.onrender.com`)

### Step 4: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other (or leave blank)
   - **Root Directory:** Leave empty (use root of repo)
   - **Install Command:** Leave empty
   - **Build Command:** `corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install && cd apps/frontend && yarn build`
   - **Output Directory:** `apps/frontend/build`

5. **Environment Variables:** Add:
   ```
   ENABLE_EXPERIMENTAL_COREPACK=1
   VITE_API_URL=https://your-backend-name.onrender.com
   VITE_AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```
   - `ENABLE_EXPERIMENTAL_COREPACK=1` tells Vercel to enable Corepack support
   - `VITE_API_URL` is your backend URL (we'll configure axios to use this)
   - `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` are for Auth0 authentication (see Step 5)
   - `VITE_GOOGLE_MAPS_API_KEY` is for Google Maps (see SETUP_GUIDE.md for setup instructions)

6. Click **"Deploy"**
7. Wait for deployment (~2-3 minutes)
8. Your site will be live at `https://your-project.vercel.app`

### Step 5: Configure Auth0 for Production

To enable login functionality on your deployed site, you need to configure Auth0:

1. Go to [Auth0 Dashboard](https://manage.auth0.com/) and sign in
2. Select your application (or create a new one if needed)
3. Go to **Settings** tab
4. Scroll down to **Application URIs** section
5. Add your production URLs:
   - **Allowed Callback URLs:** `https://your-project.vercel.app/directory, https://your-project.vercel.app`
   - **Allowed Logout URLs:** `https://your-project.vercel.app`
   - **Allowed Web Origins:** `https://your-project.vercel.app`
6. If you also want local development to work, add:
   - **Allowed Callback URLs:** `https://your-project.vercel.app/directory, https://your-project.vercel.app, http://localhost:3000/directory`
   - **Allowed Logout URLs:** `https://your-project.vercel.app, http://localhost:3000`
   - **Allowed Web Origins:** `https://your-project.vercel.app, http://localhost:3000`
7. Scroll up and copy:
   - **Domain** (e.g., `dev-b5d68fi8od5s513y.us.auth0.com`)
   - **Client ID** (e.g., `jepCXrJUcBq34pKdSGGzd2sidUxVpnsL`)
8. Update Vercel environment variables with these values (if different from defaults)
9. Click **Save Changes** in Auth0
10. Redeploy your Vercel app (or it will auto-deploy on next commit)

**Note:** The code has been updated to use environment variables for Auth0 config. The default values are already set, but you can override them via Vercel environment variables if needed.

### Step 6: Frontend API Configuration (Already Done!)

The code has been updated to support production deployment. Here's what was changed:

1. **Axios Configuration**: Created `apps/frontend/src/lib/axios.ts` that uses `VITE_API_URL` environment variable
2. **Updated Services**: Updated service files to use the new axios instance
3. **CORS Enabled**: Added CORS support to the backend

**Important**: When deploying to Vercel, set the environment variable:
- `VITE_API_URL=https://your-backend-name.onrender.com`

**Note**: Some files may still use `axios` directly. If you encounter issues, update them to use `apiClient` from `src/lib/axios.ts`.

---

## Option 2: All-in-One Render (Simpler but Backend Sleeps)

Deploy everything on Render:

1. **Database:** Follow Step 1 from Option 1
2. **Push Schema:** Follow Step 2 from Option 1 (push schema locally)
3. **Backend:** Follow Step 3 from Option 1
4. **Frontend:** 
   - In Render, create a new **Static Site**
   - Connect GitHub repo
   - Build Command: `corepack enable && corepack prepare yarn@4.7.0 --activate && cd apps/frontend && yarn build`
   - Publish Directory: `apps/frontend/build`
   - Add environment variable: `VITE_API_URL=https://your-backend-name.onrender.com`

**Note:** Backend will sleep after 15 min, first request will take ~30 seconds to wake up.

---

## Option 3: Railway (Easier Setup, $5/month after free trial)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project → Deploy from GitHub repo
4. Add PostgreSQL service
5. Add environment variables
6. Deploy

Railway offers $5 free credit monthly, which usually covers small projects.

---

## Code Changes Made

The following changes have been implemented to support production deployment:

### 1. Axios Configuration (`apps/frontend/src/lib/axios.ts`)
- Created a centralized axios instance that uses `VITE_API_URL` environment variable
- In development: Uses relative URLs (works with Vite proxy)
- In production: Uses the full backend URL from environment variable

### 2. Updated Service Files
- Updated `apps/frontend/src/services/getAllRequests.ts`
- Updated `apps/frontend/src/services/getEquipmentRequests.ts`
- Updated `apps/frontend/src/services/getTranslatorRequests.ts`
- Updated `apps/frontend/src/routes/AllServiceRequests.tsx`
- Updated `apps/frontend/src/routes/Directions.tsx`

### 3. Backend CORS Support
- Added CORS middleware to `apps/backend/src/app.ts`
- This allows the frontend (hosted on Vercel) to make requests to the backend (hosted on Render)

### Note on Remaining Files

Some files may still use `axios` directly instead of `apiClient`. These files will still work in development but may need updating for production. If you encounter CORS or connection issues, update those files to import and use `apiClient` from `src/lib/axios.ts` instead of `axios`.

---

## Cost Summary

| Option | Frontend | Backend | Database | Total |
|--------|----------|---------|----------|-------|
| Render + Vercel | Free | Free* | Free** | **$0/month** |
| All Render | Free | Free* | Free** | **$0/month** |
| Railway | Included | Included | Included | **$5/month*** |

\* Free tier spins down after inactivity (wakes up automatically)  
\** Free tier has limitations (90 days data retention on Render)  
\*** Railway gives $5 free credit monthly, usually enough for small projects

---

## Tips for Resume Projects

1. **First Request Slowdown:** Free Render backend sleeps after 15 min. The first request after sleep takes ~30 seconds. This is fine for resume demos - just mention it if asked.

2. **Database Retention:** Render free tier databases delete after 90 days of no usage. For a resume project, this is usually fine.

3. **Custom Domain:** Vercel allows free custom domains. You can add your own domain if you have one.

4. **Monitoring:** Set up basic monitoring to keep services awake if needed (Render has built-in monitoring).

5. **Backup:** For important demo data, export your database periodically.

---

## Troubleshooting

### Backend Won't Start

**Check the logs in Render:**
1. Go to your service → "Logs" tab
2. Look for error messages (usually in red)

**Common issues:**
- **Port error:** Make sure `BACKEND_PORT=$PORT` is set (Render provides `PORT` automatically)
- **Database connection:** Use the **Internal Database URL** (not External) for `POSTGRES_URL`
- **Build fails:** Verify build command includes `corepack enable`
- **Missing env vars:** Ensure all required environment variables are set

**Quick fixes:**
- If you see "Missing PORT environment variable": Set `BACKEND_PORT=$PORT` in env vars
- If database connection fails: Double-check you're using Internal Database URL
- If build fails: Check that build command has `corepack enable` at the start

### Frontend Build Fails on Vercel (Yarn Version Error)

**Error:** `error Couldn't find any versions for "common" that matches "workspace:*"` or `yarn install v1.22.19`

**Problem:** Vercel is using Yarn v1 instead of Yarn 4.7.0

**Solution:**
1. Go to Vercel project settings → "Settings" → "Environment Variables"
2. Add environment variable:
   - **Key:** `ENABLE_EXPERIMENTAL_COREPACK`
   - **Value:** `1`
3. Go to "General" (or "Build & Development Settings")
4. Set **Install Command** to: Leave empty
5. Set **Build Command** to: `corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install && cd apps/frontend && yarn build`
6. Save and redeploy

**Why this works:** The `ENABLE_EXPERIMENTAL_COREPACK=1` environment variable tells Vercel to enable Corepack support, which allows it to use the Yarn version specified in your `package.json` (Yarn 4.7.0) instead of the system Yarn v1. This is the recommended approach for Yarn 2+ on Vercel.

### Frontend Can't Connect to Backend
- Check CORS settings in backend (already enabled in code)
- Verify backend URL is correct in frontend env vars (`VITE_API_URL`)
- Check browser console for errors
- Make sure backend is running (check Render dashboard)

### Database Connection Issues
- Use **Internal Database URL** for Render services (between Render services)
- Use **External Database URL** for local connections (your computer)
- Check database is running (not paused) in Render dashboard
- Verify `POSTGRES_URL` format: `postgresql://user:password@host:port/database`

### Need More Help?

See `DEPLOYMENT_TROUBLESHOOTING.md` for detailed troubleshooting steps for each error type.

---

## When to Redeploy

### When Changes Require Redeployment:

**Frontend Changes (UI, Components, Routes, etc.):**
- ✅ Code changes in `apps/frontend/src/`
- ✅ New environment variables
- ✅ Auth0 configuration changes
- ✅ Build configuration changes
- **Action:** Push to GitHub → Vercel auto-deploys (or manually redeploy in Vercel dashboard)

**Backend Changes (API, Routes, Services, etc.):**
- ✅ Code changes in `apps/backend/src/`
- ✅ Database schema changes (after running migrations)
- ✅ New environment variables
- ✅ Package.json changes
- **Action:** Push to GitHub → Render auto-deploys (or manually redeploy in Render dashboard)

### When Changes DON'T Require Redeployment:

- ❌ Database data changes (just updates in the database)
- ❌ Environment variable changes in dashboard (just update in Vercel/Render settings)

### Best Practice Workflow:

1. **Make all your changes locally** (UI updates, Auth0 setup, etc.)
2. **Test locally** to make sure everything works
3. **Commit and push to GitHub** - this will trigger automatic deployments
4. **Update environment variables** in Vercel/Render dashboards if needed
5. **Wait for deployments to complete** (2-3 minutes each)
6. **Test the live site**

**Tip:** You can make multiple changes and push them all at once. Both Vercel and Render will rebuild, so you don't need to redeploy after each small change.

## Next Steps

After deployment:
1. Test all functionality (especially login!)
2. Update your resume with the live URL
3. Add a note about the free tier limitations (sleeping backend) if needed
4. Consider setting up a simple health check to keep backend awake during demo periods
