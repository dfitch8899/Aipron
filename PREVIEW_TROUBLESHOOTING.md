# Why Can't I See the Preview?

## Common Issues & Solutions

### 1. **Dependencies Not Installed**

**Problem**: `node_modules` folder doesn't exist or is incomplete.

**Solution**:
```bash
cd mobile
npm install
```

If npm is not found:
- Install Node.js from https://nodejs.org/ (v18 or higher)
- Restart your terminal/IDE after installation
- Verify: `node --version` and `npm --version`

### 2. **Expo Not Running**

**Problem**: Development server isn't started.

**Solution**:
```bash
cd mobile
npm run dev
```

Or:
```bash
npx expo start
```

### 3. **Preview Method**

**You need to choose how to view the app:**

**Option A: Expo Go App (Easiest)**
1. Install "Expo Go" on your phone (iOS/Android)
2. Start the dev server: `npm run dev`
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app
4. App loads on your phone

**Option B: Web Browser**
1. Start dev server: `npm run dev`
2. Press `w` in terminal
3. Opens in browser (limited functionality)

**Option C: Simulator/Emulator**
- iOS: Press `i` (requires Xcode on Mac)
- Android: Press `a` (requires Android Studio)

### 4. **Backend Not Running**

**Problem**: API calls fail, but UI should still show.

**Solution**: Start backend separately:
```bash
cd backend
npm install
npm run dev
```

### 5. **Port Conflicts**

**Problem**: Port 8081 already in use.

**Solution**:
```bash
npx expo start --port 8082
```

Or kill the process using port 8081.

### 6. **Cache Issues**

**Problem**: Old cached code showing.

**Solution**:
```bash
npx expo start -c
```

Or clear cache:
```bash
npx expo start --clear
```

### 7. **TypeScript Errors**

**Problem**: Type errors preventing compilation.

**Solution**: Check terminal for errors. Common fixes:
- Missing type definitions
- Import path issues
- Check `mobile/tsconfig.json` is correct

### 8. **Missing Assets**

**Problem**: Icon/splash image errors.

**Solution**: I've already fixed this - assets are now optional in `app.json`.

## Step-by-Step Setup

1. **Install Node.js** (if not installed)
   - Download from https://nodejs.org/
   - Choose LTS version
   - Restart terminal after install

2. **Install Dependencies**
   ```bash
   cd C:\Aipron\mobile
   npm install
   ```

3. **Start Expo**
   ```bash
   npm run dev
   ```
   OR
   ```bash
   npx expo start
   ```

4. **View Preview**
   - Install Expo Go app on phone
   - Scan QR code
   - OR press `w` for web preview

## Quick Test

Try this minimal test:

```bash
cd C:\Aipron\mobile
npx expo start --web
```

This should open the app in your browser immediately (if dependencies are installed).

## Still Not Working?

Check:
1. ✅ Node.js installed? (`node --version`)
2. ✅ Dependencies installed? (`cd mobile && dir node_modules`)
3. ✅ Expo running? (terminal shows QR code)
4. ✅ No errors in terminal?
5. ✅ Backend running? (if testing API)

Share the error message from terminal and I'll help debug!
