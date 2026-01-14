# Fix WSL I/O Error

## The Problem

You're running the command from **WSL (Windows Subsystem for Linux)**, but Yarn is trying to access files on the Windows filesystem (`/mnt/c/`). This causes I/O errors, especially with Yarn PnP.

## The Solution

**Run the commands from Windows PowerShell instead of WSL:**

1. Open **PowerShell** (not WSL/bash)
2. Navigate to your project:
   ```powershell
   cd C:\Users\keeth\SoftEng-Personal-Project
   ```

3. Run the commands:
   ```powershell
   yarn workspace database push
   yarn workspace database generate
   ```

## Why This Happens

- WSL accesses Windows files through `/mnt/c/` which can have I/O issues
- Yarn PnP uses virtual file systems that don't work well across WSL/Windows boundaries
- Node.js file operations can fail when accessing Windows files from WSL

## Alternative: Use WSL Linux Filesystem

If you prefer to use WSL, copy your project to the Linux filesystem:

```bash
# In WSL
cp -r /mnt/c/Users/keeth/SoftEng-Personal-Project ~/SoftEng-Personal-Project
cd ~/SoftEng-Personal-Project
yarn workspace database push
```

But you'll need to update your `.env` file to point to your PostgreSQL database (might need to use `localhost` or the Windows host IP).

## Recommended: Use PowerShell

For this project, **just use PowerShell** - it's simpler and avoids these cross-filesystem issues.
