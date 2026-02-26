# 🚀 Quick Start Guide - See Your Preview

## The Problem
You can't see the preview because the app needs to be started first!

## Solution (3 Steps)

### Step 1: Install Node.js (if not installed)
1. Go to https://nodejs.org/
2. Download the LTS version
3. Install it
4. **Restart your terminal/IDE**

### Step 2: Install Dependencies
Open terminal in the `mobile` folder and run:
```bash
cd C:\Aipron\mobile
npm install
```

**OR** double-click `mobile/start.bat` (Windows)

### Step 3: Start the App
```bash
npm run dev
```

**OR** use the batch file:
```bash
cd mobile
start.bat
```

## Viewing Options

### Option 1: Web Browser (Easiest)
After starting, press `w` in the terminal
- Opens immediately in browser
- Limited functionality but good for UI preview

### Option 2: Phone (Best Experience)
1. Install "Expo Go" app on your phone
2. Start the dev server (`npm run dev`)
3. Scan the QR code shown in terminal
4. App loads on your phone!

### Option 3: Simulator
- iOS: Press `i` (Mac only, needs Xcode)
- Android: Press `a` (needs Android Studio)

## Quick Test

Try this right now:
```bash
cd C:\Aipron\mobile
npx expo start --web
```

This should open the app in your browser immediately!

## Troubleshooting

**"npm is not recognized"**
→ Install Node.js and restart terminal

**"Cannot find module"**
→ Run `npm install` in the mobile folder

**Port already in use**
→ Use `npx expo start --port 8082`

**Still not working?**
→ Check `PREVIEW_TROUBLESHOOTING.md` for detailed help

## What You Should See

When you run `npm run dev`, you should see:
- A QR code
- Options to press w/i/a
- A URL like `exp://192.168.x.x:8081`

The app will show:
1. Login screen (first time)
2. Chat screen (after login)
3. Bottom navigation with 4 tabs

---

**Need help?** Check the terminal output for error messages and share them!
