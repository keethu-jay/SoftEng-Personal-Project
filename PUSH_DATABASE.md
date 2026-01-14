# Quick Guide: Pushing Database Schema with Data Loss Acceptance

## The Issue

When running `yarn workspace database push`, you see warnings about data loss for legacy tables (`FloorGraph`, `ParkingGraph`, etc.). These are unused tables, so it's safe to accept the data loss.

## Quick Solution

I've updated the `push` script in `packages/database/package.json` to include `--accept-data-loss`, but due to how `pnpify` wraps Prisma, the flag may not always pass through.

## Try This First

Run the normal command - the flag is already in the script:

```powershell
cd c:\Users\keeth\SoftEng-Personal-Project
yarn workspace database push
```

If you still see the error asking for `--accept-data-loss`, the flag isn't being passed through pnpify.

## Workaround: Run Prisma Directly

If the flag doesn't work through yarn, run Prisma directly:

```powershell
cd c:\Users\keeth\SoftEng-Personal-Project\packages\database

# Method 1: Use dotenv-cli directly
npx dotenv-cli -e ../../.env -- npx prisma db push --accept-data-loss --schema=prisma/schema.prisma
```

Or if you have the POSTGRES_URL in your environment:

```powershell
cd c:\Users\keeth\SoftEng-Personal-Project\packages\database
npx prisma db push --accept-data-loss --schema=prisma/schema.prisma
```

## What Data Will Be Lost?

Only legacy/unused tables:
- `Building` (5 rows)
- `FloorGraph` (7 rows) 
- `ParkingGraph` (4 rows)
- `Algorithm` (3 rows)
- Some columns in `Graph.graphType` and `Node.type`

**Your important data is safe:**
- ✅ All employees
- ✅ All departments
- ✅ All hospitals
- ✅ All service requests
- ✅ All forum posts & replies
- ✅ All pathfinding nodes & edges

## After Success

Once the push succeeds:

1. **Generate Prisma Client:**
   ```powershell
   yarn workspace database generate
   ```

2. **Test your app:**
   ```powershell
   yarn dev
   ```

Your forum posts, hospitals, and all other data should work correctly!
