# Passwordless Auth0 Setup with Admin Roles

This guide will help you set up passwordless authentication (Google/GitHub login) and create an admin account for showcasing admin features.

## Benefits of Passwordless Auth

- ✅ **Easy for recruiters** - No need to create accounts or remember passwords
- ✅ **Quick testing** - Just click "Sign in with Google" or GitHub
- ✅ **Professional** - Shows modern authentication patterns
- ✅ **Secure** - Uses OAuth 2.0

---

## Step 1: Enable Social Logins in Auth0

You can enable multiple social login providers. Auth0 will automatically show all enabled providers on the login screen, giving users options.

### Enable Multiple Providers (Recommended)

Enable as many as you want - users will see all options on the login screen:

#### Google Login (Easiest - Recommended)

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **"Authentication"** → **"Social"** (left sidebar)
3. Click on **"Google"**
4. Toggle the switch to **"Enabled"**
5. **Auth0 provides test credentials** - just enable it, no setup needed!
6. Click **"Save"**

#### GitHub Login

1. Go to **"Authentication"** → **"Social"**
2. Click on **"GitHub"**
3. Toggle to **"Enabled"**
4. You'll need to create a GitHub OAuth App (optional - can skip if you only want Google):
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Authorization callback URL: `https://YOUR_AUTH0_DOMAIN/login/callback`
   - Copy Client ID and Client Secret to Auth0
5. Click **"Save"**

#### Other Providers (Optional)

You can also enable:
- **Facebook**
- **Twitter/X**
- **Microsoft**
- **Apple**
- And many more!

**Recommendation:** Enable at least Google (easiest, no setup). Enable GitHub too if you want to give users more options. Auth0's login screen will automatically show all enabled providers!

---

## Step 2: Add Social Logins to Your Application

1. In Auth0 Dashboard, go to **"Applications"** → Select your app
2. Go to **"Settings"** tab
3. Scroll to **"Application URIs"** section
4. Make sure these are set:
   - **Allowed Callback URLs:** `http://localhost:3000/directory, http://localhost:3000, https://your-project.vercel.app/directory, https://your-project.vercel.app`
   - **Allowed Logout URLs:** `http://localhost:3000, https://your-project.vercel.app`
   - **Allowed Web Origins:** `http://localhost:3000, https://your-project.vercel.app`
5. Click **"Save Changes"**

---

## Step 3: Frontend Code (Already Done!)

Your code already supports all social login providers! When users click the login button:

1. They're redirected to Auth0's login page
2. Auth0 automatically shows all enabled social providers (Google, GitHub, Facebook, etc.)
3. Users can choose any provider they prefer
4. After authentication, they're redirected back to your app

No code changes needed - Auth0 handles everything automatically!

---

## Step 4: Set Up Admin Role

### Create an Admin Role

1. In Auth0 Dashboard, go to **"User Management"** → **"Roles"**
2. Click **"Create Role"**
3. Fill in:
   - **Name:** `admin`
   - **Description:** `Administrator with full access`
4. Click **"Create"**

### Assign Admin Role to Your Account

1. Go to **"User Management"** → **"Users"**
2. Find or create your user account (the one you'll use to demo admin features)
   - If you don't have one yet, sign in once with Google/GitHub to create it
3. Click on your user
4. Go to **"Roles"** tab
5. Click **"Assign Roles"**
6. Check the **"admin"** role
7. Click **"Assign"**

### Get Your User ID

1. While viewing your user, copy the **User ID** (looks like `auth0|xxxxxxxxxxxxx` or `google-oauth2|xxxxxxxxxxxxx`)
2. Save this - you'll need it to identify the admin user in your code

---

## Step 5: Update Code to Check for Admin Role

We need to:
1. Get user's roles from Auth0
2. Check if user has "admin" role
3. Show/hide admin features based on role

See the code updates in the next section.

---

## Step 6: Test It!

1. Start your dev server: `yarn dev`
2. Go to `http://localhost:3000`
3. Click **"LOGIN"**
4. You should see options to "Continue with Google" or "Continue with GitHub"
5. Click one and sign in
6. You'll be redirected back to your app
7. If you signed in with your admin account, you should see admin features

---

## Code Updates Needed

The frontend code will need to be updated to:
1. Fetch user roles from Auth0
2. Check if user has "admin" role
3. Conditionally show admin routes/features

See the implementation guide below for the code changes.
