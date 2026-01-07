# FourMileBay Costing System - Complete Setup Guide
## Version 5.1.0 - January 2026

---

# 🚨 IMPORTANT: READ THIS ENTIRE GUIDE BEFORE STARTING

This guide is divided into 3 parts:
1. **Part A: Google Apps Script Setup** (15 minutes)
2. **Part B: React UI Deployment to Heroku** (30 minutes)
3. **Part C: Testing & Verification** (10 minutes)

---

# PART A: GOOGLE APPS SCRIPT SETUP
## Time Required: ~15 minutes

### Step A1: Backup Your Current Spreadsheet

1. Open your `Costing_Master_File_1` in Google Sheets
2. Click **File** → **Make a copy**
3. Name it: `Costing_Master_File_BACKUP_Jan2026`
4. Click **OK**

✅ **Checkpoint:** You should now have a backup copy

---

### Step A2: Open the Script Editor

1. In your **original** `Costing_Master_File_1` spreadsheet
2. Click **Extensions** → **Apps Script**
3. This opens the Script Editor in a new tab

---

### Step A3: Replace the Script Code

1. In the Script Editor, you'll see `Code.gs` in the left sidebar
2. **Select ALL** the existing code (Ctrl+A or Cmd+A)
3. **Delete** it (press Delete or Backspace)
4. Open the file `COMPLETE_COSTING_SYSTEM_V5.1.0.gs` (provided)
5. **Copy ALL** the code from that file
6. **Paste** it into the Script Editor
7. Click **the floppy disk icon** (💾) to Save
   - Or press Ctrl+S / Cmd+S

✅ **Checkpoint:** Script editor shows "Project saved"

---

### Step A4: Run Initial Setup

1. In the Script Editor, find the dropdown that says "Select function"
2. Click it and select `runAllCleanups`
3. Click the **▶ Run** button
4. **FIRST TIME ONLY:** Google will ask for permissions:
   - Click "Review permissions"
   - Select your Google account
   - Click "Advanced" → "Go to Costing System (unsafe)"
   - Click "Allow"
5. Wait for the script to complete (10-20 seconds)
6. Switch to your spreadsheet tab - you should see an alert box

✅ **Checkpoint:** You see "✅ Cleanup Complete" message

---

### Step A5: Initialize the System

1. Back in the Script Editor
2. Select function: `initializeSystemV510`
3. Click **▶ Run**
4. Wait for completion
5. Switch to spreadsheet and click "Yes" when prompted

✅ **Checkpoint:** You see "✅ System V5.1.0 Initialized!" message

---

### Step A6: Verify the New Tabs

Refresh your spreadsheet (F5 or Ctrl+R). You should now see these tabs:

- ✅ Dashboard
- ✅ Costing_Rules (updated to V5.1.0)
- ✅ Materials_Library
- ✅ **Profile_Registry** (NEW!)
- ✅ Components_Library
- ✅ BOM_Upload_Template
- ✅ Product_Index
- ✅ And more...

---

### Step A7: Set Up the Menu

1. **Close** the spreadsheet tab completely
2. **Reopen** `Costing_Master_File_1`
3. Wait 5 seconds for scripts to load
4. You should see a new menu: **🏭 Costing V5.1.0**

✅ **PART A COMPLETE!** The Google Sheets backend is ready.

---

# PART B: REACT UI DEPLOYMENT TO HEROKU
## Time Required: ~30 minutes

### Prerequisites Checklist

Before starting, ensure you have:

- [ ] A Heroku account (free at heroku.com)
- [ ] Git installed on your computer
- [ ] Node.js installed (v18 or higher)
- [ ] A code editor (VS Code recommended)

---

### Step B1: Install Required Software (if not already installed)

**Install Node.js:**
1. Go to https://nodejs.org
2. Download the "LTS" version (18.x or higher)
3. Run the installer, accept all defaults
4. Verify: Open Terminal/Command Prompt and type:
   ```
   node --version
   ```
   Should show: v18.x.x or higher

**Install Git:**
1. Go to https://git-scm.com
2. Download for your operating system
3. Run installer, accept all defaults
4. Verify: In Terminal/Command Prompt:
   ```
   git --version
   ```
   Should show: git version 2.x.x

**Install Heroku CLI:**
1. Go to https://devcenter.heroku.com/articles/heroku-cli
2. Download for your operating system
3. Run installer
4. Verify: In Terminal/Command Prompt:
   ```
   heroku --version
   ```
   Should show: heroku/8.x.x or similar

---

### Step B2: Create Project Folder

1. Create a new folder on your computer:
   - Windows: `C:\Projects\fourmilbay-costing-ui`
   - Mac: `/Users/YourName/Projects/fourmilbay-costing-ui`

2. Copy ALL these files into that folder:
   - `package.json`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `static.json`
   - `public/` folder (with index.html)
   - `src/` folder (with all .js and .css files)

Your folder structure should look like:
```
fourmilbay-costing-ui/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── static.json
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── index.css
    └── App.js
```

---

### Step B3: Install Dependencies

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to your project folder:
   ```
   cd C:\Projects\fourmilbay-costing-ui
   ```
   or on Mac:
   ```
   cd /Users/YourName/Projects/fourmilbay-costing-ui
   ```

3. Run this command:
   ```
   npm install
   ```
   
4. Wait 2-5 minutes for installation to complete

✅ **Checkpoint:** You see "added XXX packages" message

---

### Step B4: Test Locally (Optional but Recommended)

1. In the same terminal, run:
   ```
   npm start
   ```

2. Your browser should open to http://localhost:3000
3. You should see the FourMileBay Costing UI!
4. Press Ctrl+C in terminal to stop

✅ **Checkpoint:** App runs locally without errors

---

### Step B5: Initialize Git Repository

In terminal, run these commands ONE BY ONE:

```
git init
```

```
git add .
```

```
git commit -m "Initial commit - FourMileBay Costing UI v1.0"
```

✅ **Checkpoint:** You see "create mode" messages for your files

---

### Step B6: Login to Heroku

1. In terminal, run:
   ```
   heroku login
   ```

2. Press any key when prompted
3. A browser window opens - click "Log In"
4. Return to terminal

✅ **Checkpoint:** Terminal shows "Logged in as your@email.com"

---

### Step B7: Create Heroku App

Run this command (replace YOUR-APP-NAME with something unique):

```
heroku create fourmilbay-costing
```

If that name is taken, try:
```
heroku create fourmilbay-costing-2026
```

✅ **Checkpoint:** You see "Creating ⬢ fourmilbay-costing... done"

---

### Step B8: Add Buildpacks

Run these TWO commands:

```
heroku buildpacks:add heroku/nodejs
```

```
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static
```

✅ **Checkpoint:** Both commands show "Buildpack added"

---

### Step B9: Deploy to Heroku

Run this command:

```
git push heroku main
```

If you get an error about "main", try:
```
git push heroku master
```

Wait 3-5 minutes for deployment to complete.

✅ **Checkpoint:** You see "Verifying deploy... done"

---

### Step B10: Open Your App

Run:
```
heroku open
```

Your browser opens to your live app!

✅ **PART B COMPLETE!** Your React UI is now live on Heroku.

---

# PART C: TESTING & VERIFICATION
## Time Required: ~10 minutes

### Test C1: Google Sheets Functions

1. Open your `Costing_Master_File_1`
2. Click menu: **🏭 Costing V5.1.0** → **Data Cleanup** → **Generate Quality Report**
3. You should see a report popup

✅ **Pass:** Report shows without errors

---

### Test C2: Profile Registry

1. Click menu: **🏭 Costing V5.1.0** → **Profile Registry** → **View Profile Registry**
2. You should see profile statistics

✅ **Pass:** Shows "Total Profiles: X"

---

### Test C3: Test Profile Detection

1. Click menu: **🏭 Costing V5.1.0** → **Testing** → **Test Profile Detection**
2. All tests should show ✓

✅ **Pass:** Shows "Passed: 6/6" or similar

---

### Test C4: React UI Navigation

1. Open your Heroku app URL
2. Click through each navigation item:
   - Dashboard
   - BOM Creator
   - Cost Analysis
   - Profile Registry
   - Materials Library
   - Products
   - Settings

✅ **Pass:** All pages load without errors

---

# 🎉 SETUP COMPLETE!

## What You Now Have:

### In Google Sheets:
- ✅ V5.1.0 Costing Engine
- ✅ Profile Registry for standardisation
- ✅ Data cleanup tools
- ✅ Automated wood/aluminum detection

### On Heroku:
- ✅ Modern React UI
- ✅ BOM Creator interface
- ✅ Cost Analysis dashboard
- ✅ Profile standardisation view

---

## Next Steps:

1. **Mark your existing profiles as PRODUCED:**
   - Go to Profile_Registry tab
   - Change Status from "REVIEW" to "PRODUCED" for profiles you have tooling for

2. **Process a test BOM:**
   - Paste BOM data into BOM_Upload_Template
   - Run: Costing V5.1.0 → Process BOM

3. **Review the variance:**
   - When factory quotes arrive, enter actual costs
   - Run: Reports → Variance Analysis

---

## Troubleshooting

### "Script function not found"
- Make sure you saved the script (Ctrl+S)
- Try refreshing the spreadsheet

### "Heroku push rejected"
- Make sure all files are committed: `git add . && git commit -m "fix"`
- Try: `git push heroku main --force`

### "npm install fails"
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Need Help?
- Check Heroku logs: `heroku logs --tail`
- Check browser console for React errors: F12 → Console tab

---

Document Version: 1.0
Last Updated: January 6, 2026
