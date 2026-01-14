# Database Access Guide

## Where is the Database?

Your database is **PostgreSQL** and can be in one of two places:

### 1. Local Development Database
- **Location**: Your local PostgreSQL installation
- **Connection**: Defined in `.env` file in the project root
- **Default credentials** (if using default setup):
  - Host: `localhost`
  - Port: `5432`
  - User: `postgres`
  - Password: `postgres`
  - Database: `postgres`

### 2. Production Database (Render)
- **Location**: Render PostgreSQL service
- **Connection**: Defined in `.env.prod` file or Render environment variables
- **Access**: Through Render dashboard or External Database URL

## How to Access the Database

### Option 1: Prisma Studio (Easiest - Recommended)

Prisma Studio is a visual database browser that comes with Prisma:

```bash
# For local development
yarn workspace database studio

# For production (if you have .env.prod set up)
yarn workspace database studio:prod
```

This opens a web interface at `http://localhost:5555` where you can:
- View all tables
- Browse data
- Edit records
- Add new records
- Delete records

### Option 2: Command Line (psql)

If you have PostgreSQL installed locally:

```bash
# Connect to local database
psql -U postgres -d postgres

# Or if password is different
psql -h localhost -U postgres -d postgres
```

Then you can run SQL queries:
```sql
-- View all hospitals
SELECT * FROM "Hospital";

-- View all employees
SELECT * FROM "Employee";

-- View all posts
SELECT * FROM "Post";

-- View all departments
SELECT * FROM "Department";
```

### Option 3: Render Dashboard (For Production)

1. Go to [render.com](https://render.com) and log in
2. Click on your PostgreSQL database service
3. Go to the "Connections" tab
4. Use the "External Database URL" to connect with any PostgreSQL client
5. Or use the "psql" command shown in the dashboard

### Option 4: Database GUI Tools

You can use any PostgreSQL client with the connection string:

**Popular options:**
- **pgAdmin** (Free, full-featured)
- **DBeaver** (Free, cross-platform)
- **TablePlus** (Paid, beautiful UI)
- **Postico** (Mac only, paid)

**Connection String Format:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

From your `.env` file, use the `POSTGRES_URL` value.

## Common Database Commands

### Push Schema Changes
```bash
# Local
yarn workspace database push

# Production
yarn workspace database push:prod
```

### Seed Database (Add Initial Data)
```bash
# Local
yarn workspace database seed

# Note: Production seeding should be done carefully
```

### Generate Prisma Client
```bash
yarn workspace database generate
```

### View Database Schema
The schema is defined in: `packages/database/prisma/schema.prisma`

## Troubleshooting

### "Can't connect to database"
1. Check if PostgreSQL is running locally
2. Verify `.env` file has correct `POSTGRES_URL`
3. Check firewall/network settings

### "Table doesn't exist"
1. Run `yarn workspace database push` to sync schema
2. Check if you're connected to the right database

### "Permission denied"
1. Check database user permissions
2. Verify password in connection string

## Checking Your Data

### Quick Check - Are hospitals in the database?

```bash
# Using Prisma Studio (easiest)
yarn workspace database studio
# Then navigate to "Hospital" table

# Or using psql
psql -U postgres -d postgres -c "SELECT * FROM \"Hospital\";"
```

### Check if employees exist:

```bash
# Prisma Studio
yarn workspace database studio
# Navigate to "Employee" table

# Or psql
psql -U postgres -d postgres -c "SELECT email, \"firstName\", \"lastName\" FROM \"Employee\";"
```

## Adding Test Data

If you need to add test employees or hospitals:

1. **Use Prisma Studio** (easiest):
   ```bash
   yarn workspace database studio
   ```
   Then click "Add record" in the Employee or Hospital table

2. **Or run the seed file**:
   ```bash
   yarn workspace database seed
   ```
   This adds all the seed data from `packages/database/prisma/seed.ts`

3. **Or use SQL directly**:
   ```sql
   INSERT INTO "Employee" (email, password, "firstName", "lastName", occupation)
   VALUES ('test@example.com', 'password123', 'Test', 'User', 'Nurse');
   ```

## Important Notes

- **Local vs Production**: Make sure you're working with the right database
- **Backup**: Always backup before making major changes
- **Schema Changes**: Use `yarn workspace database push` instead of direct SQL for schema changes
- **Environment Variables**: Never commit `.env` files with real credentials to git
