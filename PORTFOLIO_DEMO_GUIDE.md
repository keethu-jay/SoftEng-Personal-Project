# Portfolio Demo Guide

## Quick Overview

Your app now supports passwordless authentication with Auth0 and shows different views for admin vs regular users. Perfect for portfolio demos!

## How It Works for Recruiters

### What Recruiters Will See:

1. **Landing Page** - Click "LOGIN" button
2. **Auth0 Login Screen** - Professional OAuth login with multiple provider options (Google, GitHub, etc.)
3. **After Login** - Different interface based on user role:
   - **Regular Users:** See "All Requests" navigation link
   - **Admin Users:** See "All Requests" + "Directory Management" + "Map Editor" navigation links

### To Demonstrate:

**Option 1: Use Your Admin Account**
- Sign in with your admin email (the one you added to `ADMIN_EMAILS`)
- Show all the admin features (Directory Management, Map Editor)
- Explain: "This is what admins see"

**Option 2: Let Recruiter Test**
- Have recruiter sign in with their own Google account
- They'll see the regular user view
- Explain: "Regular users only see these features"
- Then sign in with your admin account to show admin view

## Setup Instructions

### 1. Enable Social Logins in Auth0

You can enable multiple providers - users will see all options on the login screen!

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Authentication → Social
3. Enable providers you want:
   - **Google** (recommended - easiest, no setup needed)
   - **GitHub** (also popular)
   - **Facebook, Microsoft, etc.** (optional)
4. For Google: Just enable it - Auth0 provides test credentials
5. Save

**Tip:** Enable multiple providers to give users more login options!

### 2. Set Admin Email(s)

1. Open `apps/frontend/src/hooks/useAdmin.ts`
2. Add email(s) to the `ADMIN_EMAILS` array:
   ```typescript
   const ADMIN_EMAILS = [
       'your-email@gmail.com',      // Your email
       'recruiter-email@gmail.com', // Optional: Add recruiters' emails so they can test admin features
   ];
   ```
   
   **Options:**
   - **Option 1:** Just add your email and share it with recruiters so they can use it
   - **Option 2:** Add recruiters' emails so they can test admin features with their own Google accounts
   - **Option 3:** Use a shared demo Google account (create one just for demos)

### 3. Configure Auth0 Callback URLs

In Auth0 Dashboard → Applications → Your App → Settings:
- **Allowed Callback URLs:** `http://localhost:3000/directory, http://localhost:3000, https://your-project.vercel.app/directory, https://your-project.vercel.app`
- **Allowed Logout URLs:** `http://localhost:3000, https://your-project.vercel.app`
- **Allowed Web Origins:** `http://localhost:3000, https://your-project.vercel.app`

### 4. Test Locally

```bash
yarn dev
```

Visit `http://localhost:3000` and test login with:
- Your admin email → Should see admin links
- Any other email → Should see regular user view only

## What This Demonstrates

✅ **Modern Authentication** - OAuth 2.0 with Auth0  
✅ **Passwordless Login** - Easy for users (just click "Sign in with Google")  
✅ **Role-Based Access Control** - Different views for admin vs regular users  
✅ **Production-Ready Code** - Real integration, not mocked  

## For Production Deployment

1. Add Auth0 environment variables to Vercel
2. Update Auth0 callback URLs with your production URL
3. Deploy!

That's it! Your portfolio demo is ready. 🎉
