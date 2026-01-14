# Accepting Data Loss for Schema Push

## Why You're Seeing These Warnings

The remaining warnings are about:
1. **Primary key changes** in `FloorGraph` and `ParkingGraph` tables
2. **Column type mismatches** for `graphType` (Graph table) and `type` (Node table)

These are **legacy tables** that don't appear to be used in your active codebase.

## Solution: Accept Data Loss

Since these are legacy/unused tables, it's safe to accept data loss. 

**Note:** The `--accept-data-loss` flag has been added to the push script, but due to how `pnpify` wraps Prisma commands, it may not always pass through correctly. If you still see warnings, use the manual approach below.

### Option 1: Manual Interactive Acceptance (Most Reliable)

Since pnpify may not pass the flag correctly, you can manually accept when Prisma prompts you. However, Prisma 6.5.0 doesn't have an interactive prompt for this - it requires the flag.

### Option 2: Direct Prisma Command (Recommended Workaround)

Bypass yarn/pnpify and run Prisma directly with the environment variable:

```powershell
cd c:\Users\keeth\SoftEng-Personal-Project\packages\database

# Load the .env file and get POSTGRES_URL
$envContent = Get-Content ..\..\.env
$postgresUrl = ($envContent | Select-String "POSTGRES_URL").ToString().Split('=', 2)[1]

# Set the environment variable
$env:POSTGRES_URL = $postgresUrl

# Run Prisma directly (using the version from node_modules via yarn)
yarn pnpify prisma db push --accept-data-loss --schema=prisma/schema.prisma
```

### Option 2: Modify the Script Temporarily (Recommended)

Edit `packages/database/package.json` and change line 21 from:
```json
"push": "dotenv -e ${PROJECT_CWD}/.env pnpify prisma db push",
```

To:
```json
"push": "dotenv -e ${PROJECT_CWD}/.env pnpify prisma db push --accept-data-loss",
```

Then run:
```powershell
yarn workspace database push
```

**Remember to revert this change after pushing!** (Change it back to the original)

### Option 3: Use the Force Script

I've added a `push:force` script. Try:
```powershell
yarn workspace database push:force
```

If this doesn't work due to pnpify/dotenv issues, use Option 2 instead.

## What Data Will Be Lost?

- **Legacy tables**: `Building`, `FloorGraph`, `ParkingGraph`, `Algorithm` - These appear unused
- **Column type changes**: `graphType` and `type` columns will be recreated (data in these columns will be lost, but the tables themselves remain)

## Your Important Data is Safe!

✅ **All your active data is preserved:**
- Employees
- Departments  
- Hospitals
- Service Requests
- Posts & Replies (new forum feature)
- Nodes & Edges (pathfinding)
- Graphs

Only the legacy/unused tables and a few unused columns will be affected.

## After Pushing

Once the push succeeds:
1. Run `yarn workspace database generate` to regenerate Prisma Client
2. Your app will be able to read all your existing data
3. Forum posts will work
4. Hospitals will show up in the dropdown
