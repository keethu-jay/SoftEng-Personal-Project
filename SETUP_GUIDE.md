# Setup Guide for Portfolio Project

This guide will help you set up Auth0 and Google Maps API, and test your application locally before deploying.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Auth0 Setup](#auth0-setup)
3. [Google Maps API Setup](#google-maps-api-setup)
4. [Environment Variables](#environment-variables)
5. [Testing Locally](#testing-locally)

---

## Local Development Setup

### Quick Start

1. **Make sure you have the prerequisites:**
   - Node.js (v16 or higher)
   - PostgreSQL running locally
   - Yarn 4.7.0 (via Corepack)

2. **Run the setup script:**
   ```bash
   yarn setup
   ```
   This creates the necessary `.env` files.

3. **Install dependencies:**
   ```bash
   yarn install
   ```

4. **Set up the database:**
   ```bash
   yarn workspace database push
   ```

5. **Start development servers:**
   ```bash
   yarn dev
   ```
   
   This starts both frontend and backend. The frontend will be at `http://localhost:3000` (or the port in your `.env` file).

### Testing Your Changes

**To test UI and functionality changes locally:**

1. Make your changes to the code
2. Save the files - the dev server will auto-reload
3. Open `http://localhost:3000` in your browser
4. Test the functionality
5. If everything works, commit and push to GitHub (which triggers deployment)

**Benefits of local testing:**
- ✅ Instant feedback (no waiting for deployment)
- ✅ No deployment costs/quota usage
- ✅ Can test with real database data
- ✅ Debug easily with browser dev tools

---

## Auth0 Setup

Since the original Auth0 was set up on another team member's account, you need to create your own Auth0 application.

### Step 1: Create Auth0 Account

1. Go to [auth0.com](https://auth0.com)
2. Click **"Sign Up"** (free tier is fine)
3. Complete the sign-up process
4. Choose a region (pick one close to you)
5. Create your account

### Step 2: Create an Application

1. Once logged in, you'll see the Auth0 Dashboard
2. Click **"Applications"** in the left sidebar
3. Click **"Create Application"**
4. Fill in:
   - **Name:** `Your Project Name` (e.g., "Hospital Management System")
   - **Application Type:** Select **"Single Page Web Applications"**
5. Click **"Create"**

### Step 3: Configure Application Settings

1. You'll be taken to the application settings page
2. Scroll down to **"Application URIs"** section
3. Add the following URLs:

   **For Local Development:**
   - **Allowed Callback URLs:** `http://localhost:3000/directory, http://localhost:3000`
   - **Allowed Logout URLs:** `http://localhost:3000`
   - **Allowed Web Origins:** `http://localhost:3000`

   **For Production (after you deploy):**
   - **Allowed Callback URLs:** `http://localhost:3000/directory, http://localhost:3000, https://your-project.vercel.app/directory, https://your-project.vercel.app`
   - **Allowed Logout URLs:** `http://localhost:3000, https://your-project.vercel.app`
   - **Allowed Web Origins:** `http://localhost:3000, https://your-project.vercel.app`

4. Scroll up to find:
   - **Domain:** Copy this value (e.g., `dev-xxxxx.us.auth0.com`)
   - **Client ID:** Copy this value (a long string)

5. Click **"Save Changes"**

### Step 4: Configure Login Options (Optional - for Demo/Portfolio)

For a portfolio project, you might want to enable easier login methods:

1. In Auth0 Dashboard, go to **"Authentication"** → **"Database"**
2. You can enable:
   - **Username-Password-Authentication** (default - already enabled)
   - Or connect social providers (Google, GitHub, etc.) for easier demo access

3. For social logins (recommended for portfolio):
   - Go to **"Authentication"** → **"Social"**
   - Enable Google (easiest - no setup needed)
   - Enable GitHub, Facebook, Microsoft, etc. (optional)
   - Auth0 automatically shows all enabled providers on the login screen
   - Users can choose any provider they prefer

### Step 5: Add Credentials to Environment

1. Copy your **Domain** and **Client ID** from Auth0
2. Add them to your `.env` file in the project root:

   ```env
   VITE_AUTH0_DOMAIN=dev-xxxxx.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id-here
   ```

3. Also add them to Vercel environment variables when deploying (see DEPLOYMENT.md)

---

## Google Maps API Setup

### Step 1: Create Google Cloud Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click **"Select a project"** → **"New Project"**
4. Fill in:
   - **Project name:** `Your Project Name`
   - **Organization:** (leave default if personal)
5. Click **"Create"**
6. Wait for project creation (usually instant)

### Step 2: Enable Google Maps APIs

1. In the Google Cloud Console, click the **hamburger menu** (☰) → **"APIs & Services"** → **"Library"**
2. Search for **"Maps JavaScript API"**
3. Click on it and click **"Enable"**
4. Go back to the library and search for **"Places API"**
5. Click on it and click **"Enable"**
6. (Optional) Enable **"Directions API"** if you use directions features

### Step 3: Create API Key

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"API Key"**
3. A dialog will show your API key - **copy it immediately**
4. Click **"Restrict Key"** to secure it (important for production)

### Step 4: Restrict API Key (Important!)

1. In the "Restrict API key" dialog:
   - **Name:** Give it a name (e.g., "Portfolio Project Maps API Key")
   
2. **API restrictions:**
   - Select **"Restrict key"**
   - Check: **"Maps JavaScript API"**, **"Places API"**, and **"Directions API"** (if enabled)
   
3. **Application restrictions:**
   - For development: Select **"None"** (or "HTTP referrers" with `localhost:*`)
   - For production: Select **"HTTP referrers (web sites)"**
   - Add:
     - `localhost:*` (for local testing)
     - `https://your-project.vercel.app/*` (your production URL)
   
4. Click **"Save"**

### Step 5: Set Up Billing (Required for Maps API)

⚠️ **Important:** Google Maps API requires a billing account, but they give $200 free credit per month, which is usually more than enough for a portfolio project.

1. Go to **"Billing"** in the Google Cloud Console
2. Click **"Link a billing account"**
3. Add a payment method (credit card)
4. Don't worry - you'll get $200 free credit monthly, which covers ~28,000 map loads
5. You can set up billing alerts to avoid charges

### Step 6: Add API Key to Environment

1. Copy your API key from Google Cloud Console
2. Add it to your `.env` file:

   ```env
   VITE_GOOGLE_MAPS_API_KEY=your-api-key-here
   ```

3. Also add it to Vercel environment variables when deploying (see DEPLOYMENT.md)

---

## Environment Variables

Create or update your `.env` file in the project root with all the necessary variables:

```env
# Database (for local development)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=postgres

# Frontend
FRONTEND_PORT=3000
BACKEND_URL=http://localhost:3001
BACKEND_PORT=3001

# Auth0
VITE_AUTH0_DOMAIN=dev-xxxxx.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Backend
BACKEND_SOURCE=development
NODE_ENV=development
```

**Note:** The `.env` file should already exist (created by `yarn setup`). Just update it with your values.

---

## Creating a Test User

For testing Auth0 locally, you need to create a test user in the Auth0 dashboard. See `AUTH0_TEST_USER.md` for detailed instructions.

**Quick version:**
1. Go to Auth0 Dashboard → User Management → Users → Create User
2. Email: `jack@test.com` (or any email)
3. Password: `12345678` (must be 8+ characters)
4. Connection: Username-Password-Authentication
5. Click Create

Then test login at `http://localhost:3000`

## Testing Locally

### Full Local Testing Workflow

1. **Start PostgreSQL** (make sure it's running)

2. **Set up environment variables:**
   ```bash
   # Edit .env file with your Auth0 and Google Maps credentials
   ```

3. **Push database schema:**
   ```bash
   yarn workspace database push
   ```

4. **Start development servers:**
   ```bash
   yarn dev
   ```

5. **Open browser:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001`

6. **Test functionality:**
   - ✅ Login with Auth0
   - ✅ View maps (Google Maps should load)
   - ✅ Test all features
   - ✅ Make UI changes and see them instantly

7. **When ready to deploy:**
   - Commit your changes
   - Push to GitHub
   - Vercel and Render will auto-deploy

### Common Issues

**Auth0 not working locally:**
- Check that `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` are in `.env`
- Verify callback URLs in Auth0 dashboard include `http://localhost:3000`
- Restart the dev server after adding env variables

**Google Maps not loading:**
- Check that `VITE_GOOGLE_MAPS_API_KEY` is in `.env`
- Verify API key restrictions allow `localhost:*`
- Check browser console for API errors
- Make sure Maps JavaScript API and Places API are enabled

**Database connection errors:**
- Ensure PostgreSQL is running
- Check database credentials in `.env` match your PostgreSQL setup
- Run `yarn workspace database push` to create schema

---

## Next Steps

After setting up everything locally:

1. ✅ Test all functionality locally
2. ✅ Make your UI improvements
3. ✅ Commit and push to GitHub
4. ✅ Update environment variables in Vercel (see DEPLOYMENT.md)
5. ✅ Configure Auth0 and Google Maps for production URLs
6. ✅ Test the deployed site

For deployment instructions, see `DEPLOYMENT.md`.
