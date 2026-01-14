# Deployment Troubleshooting Guide

## Common Backend Deployment Issues on Render

### Issue 1: Port Configuration

**Problem:** Render automatically provides a `PORT` environment variable, but the backend code uses `BACKEND_PORT`.

**Solution:** In Render's environment variables, set:
```
BACKEND_PORT=$PORT
```
Or remove `PORT=10000` and just set `BACKEND_PORT` to match Render's PORT (usually 10000, but Render will assign it automatically).

**Better Solution:** Update the start command to use Render's PORT:
- Change Start Command to: `cd apps/backend && BACKEND_PORT=$PORT yarn docker:run`

### Issue 2: Build Command Fails

**Error:** Corepack or Yarn version issues

**Solution:** Make sure your Build Command is exactly:
```
corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install && yarn workspace database generate && yarn build
```

### Issue 3: Database Connection Fails

**Error:** "Unable to establish database connection"

**Solutions:**
1. Make sure you're using the **Internal Database URL** (not External) for the `POSTGRES_URL` environment variable
2. Ensure the database is running (check database dashboard)
3. Verify the POSTGRES_URL format is correct: `postgresql://user:password@host:port/database`

### Issue 4: Start Command Fails

**Error:** Command not found or path issues

**Solutions:**
1. Make sure you're in the right directory - the Start Command should be:
   ```
   cd apps/backend && yarn docker:run
   ```
2. Or use the full path from repository root:
   ```
   yarn workspace backend docker:run
   ```

### Issue 5: Missing Dependencies

**Error:** Module not found or package errors

**Solution:** The build command should install everything. If it fails, try simplifying:
```
corepack enable && corepack prepare yarn@4.7.0 --activate && yarn install
```

### How to View Logs

1. Go to your Render service dashboard
2. Click on "Logs" tab
3. Look for error messages in red
4. Common log locations:
   - Build logs: Show during deployment
   - Runtime logs: Show after deployment starts

### Quick Checklist

- [ ] Build Command includes corepack enable
- [ ] POSTGRES_URL uses Internal Database URL (not External)
- [ ] BACKEND_PORT is set (or use BACKEND_PORT=$PORT)
- [ ] All environment variables are set correctly
- [ ] Database schema is pushed (Step 2)
- [ ] Start Command path is correct
