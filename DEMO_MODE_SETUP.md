# Demo Mode Setup for Portfolio

For a portfolio demo, you want to show recruiters:
1. ✅ Auth0 integration is implemented
2. ✅ Different views for admin vs regular users

## Simple Approach: Multiple Sign-In Providers

The current setup works perfectly for this! Here's how:

### For Recruiters to Test:

1. **Regular User View:**
   - Recruiter signs in with any provider (Google, GitHub, etc.)
   - They see: Regular user navigation (All Requests, Profile)
   - They DON'T see: Admin links (Directory Management, Map Editor)

2. **Admin View (Your Demo):**
   - You sign in with your admin email (the one you added to `ADMIN_EMAILS`)
   - You see: All navigation including admin links
   - You can show them admin features

### What Recruiters See:

- ✅ Auth0 login screen (professional, shows OAuth integration)
- ✅ Multiple sign-in options (Google, GitHub, Facebook, etc.)
- ✅ After login, different views based on user role
- ✅ Clean, professional authentication flow

### To Enable Recruiters to Test Admin Features:

**Option 1: Add Their Email**
- Add the recruiter's email to `ADMIN_EMAILS` array in `useAdmin.ts`
- They sign in with any provider (Google, GitHub, etc.) and automatically see admin features

**Option 2: Share Your Admin Email**
- Share your admin email with the recruiter
- They sign in with that email (using any provider) to test admin features

**Option 3: Show Both Views**
- Recruiter signs in with their account (any provider) → See regular user view
- You sign in with admin email → Show admin view
- Explain the difference

### Even Simpler: Add a Demo Account

You can create a demo admin account by:
1. Adding a second email to `ADMIN_EMAILS` array
2. That way you have a dedicated demo account

This approach is perfect for portfolios because:
- ✅ Shows real Auth0 integration (not fake/mocked)
- ✅ Shows role-based access control
- ✅ Easy for recruiters to test
- ✅ Professional and production-ready code

---

## Alternative: Hardcode Demo Mode (If You Really Don't Want Real Auth)

If you prefer to bypass Auth0 entirely for the demo (not recommended, but possible), you could add a URL parameter like `?demo=admin` that shows admin view. However, this defeats the purpose of showing Auth0 integration.

**Recommendation:** Keep the current Auth0 setup - it's perfect for a portfolio because it shows real integration skills!
