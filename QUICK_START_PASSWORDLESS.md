# Quick Start: Passwordless Auth0 Setup

This is a simplified guide to get passwordless authentication working quickly.

## Step 1: Enable Social Logins in Auth0 (2 minutes)

You can enable multiple providers - users will see all options on the login screen!

### Quick Setup (Google - Easiest):

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Click **"Authentication"** → **"Social"** (left sidebar)
3. Click **"Google"**
4. Toggle **"Enabled"** to ON
5. Click **"Save"**

That's it! Auth0 provides test credentials, so no configuration needed.

### Optional: Enable More Providers

You can also enable:
- **GitHub** - Just enable it (may need OAuth app setup)
- **Facebook** - Enable and configure
- **Microsoft** - Enable and configure
- And many more!

Auth0's login screen will automatically show all enabled providers as options. Users can choose whichever they prefer!

## Step 2: Set Admin Email(s) (1 minute)

1. Open `apps/frontend/src/hooks/useAdmin.ts`
2. Find the `ADMIN_EMAILS` array (around line 8)
3. Add email(s) - you can add multiple:
   ```typescript
   const ADMIN_EMAILS = [
       'your-email@gmail.com',           // Your email
       'recruiter-email@gmail.com',      // Optional: Add recruiters' emails
   ];
   ```
4. Save the file

**Tip:** You can add recruiters' emails so they can test admin features, or just share your admin email with them.

## Step 3: Test It!

1. Make sure your `.env` file has:
   ```
   VITE_AUTH0_DOMAIN=your-domain.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id
   ```

2. Start the dev server:
   ```bash
   yarn dev
   ```

3. Open `http://localhost:3000`

4. Click **"LOGIN"** button

5. You'll see Auth0's login page with "Continue with Google" option

6. Sign in with your Google account

7. **If you signed in with your admin email**, you'll see:
   - Admin navigation links (Directory Management, Map Editor)
   - Can access admin routes

8. **If you signed in with a different email**, you'll see:
   - Regular user navigation (All Requests)
   - No admin links
   - Cannot access admin routes

## That's It!

- ✅ Users can sign in with any enabled provider (Google, GitHub, Facebook, etc.)
- ✅ Admin users (your email) see admin features
- ✅ No passwords needed - just click "Sign in with [Provider]"

## For Production

1. Add your production URL to Auth0 callback URLs (see `AUTH0_PASSWORDLESS_SETUP.md`)
2. Add environment variables to Vercel
3. Deploy!

See `AUTH0_PASSWORDLESS_SETUP.md` for more detailed instructions.
