# Mobile App Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Expo CLI** - Install globally: `npm install -g expo-cli`
3. **Expo Go app** on your phone (iOS/Android) OR an emulator

## Quick Start

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Or use Expo CLI directly:
```bash
npx expo start
```

### 3. View the App

**Option A: On Your Phone (Recommended)**
- Install "Expo Go" app from App Store/Play Store
- Scan the QR code shown in terminal/browser
- The app will load on your phone

**Option B: iOS Simulator (Mac only)**
- Press `i` in the terminal after starting the server
- Requires Xcode installed

**Option B: Android Emulator**
- Press `a` in the terminal after starting the server
- Requires Android Studio installed

**Option C: Web Browser**
- Press `w` in the terminal
- Opens in browser (limited functionality)

## Troubleshooting

### "npm is not recognized"
- Install Node.js from nodejs.org
- Restart your terminal/IDE after installation

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

### "Expo not found"
- Install globally: `npm install -g expo-cli`
- Or use: `npx expo start` (no global install needed)

### Preview Not Showing
1. Make sure backend is running (if testing API calls)
2. Check terminal for errors
3. Try clearing cache: `npx expo start -c`
4. Restart the Metro bundler

### Port Already in Use
- Kill the process using port 8081
- Or use: `npx expo start --port 8082`

## Development Tips

- **Hot Reload**: Changes auto-reload in the app
- **Shake Device**: Opens developer menu
- **Reload**: Pull down on app or press `r` in terminal
- **Clear Cache**: Press `shift+r` in terminal

## Environment Variables

Create `mobile/.env` file:
```
EXPO_PUBLIC_API_URL=http://localhost:3001
```

For physical device testing, use your computer's IP:
```
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:3001
```
