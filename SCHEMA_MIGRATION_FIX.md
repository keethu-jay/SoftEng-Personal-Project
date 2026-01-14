# Schema Migration Fix - What the Error Means

## The Problem

Your database already has **existing data** (195 departments, 24 posts, etc.), but the schema is trying to add **new required fields** without default values. Prisma can't add required columns to existing rows because those rows would have NULL values, which violates the "required" constraint.

## What I Fixed

I added **default values** to all the new required fields so existing rows can be updated:

- ✅ `Employee.password` → default: `"demo"`
- ✅ `Hospital.address`, `placeId` → default: `""`
- ✅ `Hospital.defaultLat`, `defaultLng` → default: `0.0`
- ✅ `Hospital.defaultZoom` → default: `10`
- ✅ `Department.building` → default: `""`
- ✅ `Department.lat`, `lng` → default: `0.0`
- ✅ `Department.hospitalId`, `graphId` → default: `0` (temporary - you'll need to update these)
- ✅ `Graph.name`, `imageURL` → default: `""`
- ✅ `Graph.north`, `south`, `east`, `west` → default: `0.0`
- ✅ `Node.tags` → default: `""`
- ✅ `Edge.weight` → default: `0`
- ✅ `Post.posterId` → made optional with default `1` (will use employee ID 1 if missing)
- ✅ `Reply.email` → default: `""`
- ✅ `Reply.replierId` → made optional with default `1`

## Now You Can Push

Run this command again:

```bash
yarn workspace database push
```

It should work now! The existing rows will get the default values.

## Important: Update Your Data After Push

After the push succeeds, you should **update the data** with proper values:

1. **For Departments**: Update `hospitalId` and `graphId` to match actual hospitals/graphs
2. **For Posts**: Update `posterId` to point to actual employees (or leave as 1 if you have an employee with ID 1)
3. **For Hospitals**: Update `address`, `placeId`, `defaultLat`, `defaultLng`, `defaultZoom` with real values
4. **For Graphs**: Update `name`, `imageURL`, and coordinates with real values

## Quick Data Update Example

You can use Prisma Studio to update data:

```bash
yarn workspace database studio
```

Or use SQL directly in pgAdmin to update the values.

## Why This Happened

Your database schema evolved - new fields were added to support new features (like forum posts, better hospital data, etc.). The existing data needs to be migrated to include these new fields.
