# Fix Seed Error - Prisma Client Not Generated

## The Problem

When running `yarn workspace database seed`, you get:
```
Cannot find module '../.prisma/client' or its corresponding type declarations.
```

This happens because Prisma Client hasn't been generated yet.

## The Solution

**Generate Prisma Client first, then seed:**

```bash
# Step 1: Generate Prisma Client
yarn workspace database generate

# Step 2: Push schema to database (if not done already)
yarn workspace database push

# Step 3: Now seed the database
yarn workspace database seed
```

## Why This Happens

The seed file imports `PrismaClient` from the generated client. If you haven't run `generate` yet, that file doesn't exist.

## Quick Fix Script

You can run all three commands at once:

```bash
yarn workspace database generate && yarn workspace database push && yarn workspace database seed
```

## If Data Already Exists in pgAdmin

If your data is already in pgAdmin but not showing in the app:

1. **Check your `.env` file** - Make sure `POSTGRES_URL` points to the same database:
   ```bash
   # Check what database URL is configured
   cat .env | grep POSTGRES_URL
   ```

2. **Verify connection** - The app might be connecting to a different database:
   ```bash
   # Open Prisma Studio to see what database Prisma is using
   yarn workspace database studio
   ```

3. **Common issue**: Your `.env` might point to a different database than pgAdmin. Check:
   - Database name in `.env` matches pgAdmin
   - Host/port match
   - User/password match

4. **If using different database**: Update `.env` file:
   ```
   POSTGRES_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public
   ```

## After Fixing

Once Prisma Client is generated and schema is pushed:
- Your seed file will run successfully
- Data will be added to the database
- The app will be able to read/write data
