# Creating a Test User in Auth0

## Quick Setup for Testing

### Step 1: Create a Test User in Auth0 Dashboard

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. In the left sidebar, click **"User Management"** → **"Users"**
3. Click **"Create User"** button (top right)
4. Fill in the form:
   - **Email:** `jack@test.com` (Auth0 uses email as username)
   - **Password:** `1234`
   - **Connection:** Select **"Username-Password-Authentication"** (this is the default database connection)
   - **Verify Email:** Uncheck this (for testing, you don't need email verification)
5. Click **"Create"**

**Note:** Auth0 requires passwords to be at least 8 characters by default. If you want to use "1234", you may need to:
- Use a longer password like `12345678` or `Test1234!`
- Or change Auth0 password policy (Settings → Security → Password Policy)

### Step 2: Test the Login Locally

1. Make sure your `.env` file has your Auth0 credentials:
   ```
   VITE_AUTH0_DOMAIN=your-domain.us.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id
   ```

2. Make sure Auth0 callback URLs are set:
   - Go to Auth0 Dashboard → Applications → Your App → Settings
   - Under **Application URIs**, make sure you have:
     - **Allowed Callback URLs:** `http://localhost:3000/directory, http://localhost:3000`
     - **Allowed Logout URLs:** `http://localhost:3000`
     - **Allowed Web Origins:** `http://localhost:3000`

3. Start your development server:
   ```bash
   yarn dev
   ```

4. Open `http://localhost:3000` in your browser

5. Click the **"LOGIN"** button

6. You'll be redirected to Auth0's login page

7. Log in with:
   - **Email/Username:** `jack@test.com`
   - **Password:** `1234` (or whatever password you set)

8. After login, you'll be redirected back to your app at `/directory`

### Step 3: Verify It Works

- You should see your profile information (if you go to `/profile` route)
- The navbar should show logout button instead of login
- Protected routes should now be accessible

---

## About Auth0 and Database Connection

**Important:** Auth0 handles user authentication separately from your database. Here's how it works:

- **Auth0 Database:** Stores user credentials (email, password) - this is where your test user "Jack" lives
- **Your PostgreSQL Database:** Stores application data (employees, service requests, etc.)

These are **separate systems**, but you can:
1. Use Auth0 user info (email, name) to link to your database records
2. Sync Auth0 users to your Employee table if needed
3. Use Auth0 user's email to find the corresponding employee in your database

For a portfolio demo, having Auth0 authentication working is sufficient - you don't need to sync users to your database unless your application requires it.

---

## Changing Password Policy (Optional)

If you want to allow simple passwords like "1234" for testing:

1. Go to Auth0 Dashboard → **Branding** → **Universal Login** → **Login**
2. Or go to **Authentication** → **Database** → **Username-Password-Authentication** → **Settings**
3. Look for **Password Policy** settings
4. You can adjust complexity requirements (not recommended for production!)

For testing, it's easier to just use a password that meets Auth0's default requirements (8+ characters, some complexity).
