# How to Show Hidden Files in Your Project Folder

## Windows File Explorer

### Method 1: View Tab
1. Open File Explorer
2. Navigate to your project folder: `C:\Users\Akinola Olujobi\Documents\TrendtacticsDigitalClean`
3. Click the **"View"** tab at the top
4. Check the box **"Hidden items"** in the Show/hide section
5. Hidden files (like `.htaccess`, `.git`, `.env`) will now be visible

### Method 2: Folder Options
1. Open File Explorer
2. Click **"View"** tab → **"Options"** → **"Change folder and search options"**
3. In the popup, go to the **"View"** tab
4. Under "Advanced settings", select **"Show hidden files, folders, and drives"**
5. Click **"OK"**
6. All hidden files will now be visible in all folders

## VS Code (If you're using it)

1. Open VS Code
2. Go to **File** → **Preferences** → **Settings** (or press `Ctrl + ,`)
3. Search for: `files.exclude`
4. Look for patterns like:
   - `**/.git`
   - `**/.DS_Store`
   - `**/node_modules`
5. Remove or uncheck the patterns you want to see
6. Or search for: `explorer.fileNesting.enabled` and disable it if needed

## Command Line (PowerShell)

To see hidden files in PowerShell:
```powershell
Get-ChildItem -Force
```

Or to see only hidden files:
```powershell
Get-ChildItem -Force -Hidden
```

## Important Hidden Files in Your Project

- `.htaccess` - Apache configuration (important for clean URLs)
- `.git` - Git repository data
- `.env` - Environment variables (sensitive, don't commit)
- `.gitignore` - Files Git should ignore




