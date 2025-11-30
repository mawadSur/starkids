# StarKids
A React Native onboarding flow for a family task management app.

## Overview
- Green-themed welcome + account creation screen with social CTAs and email/password form (`src/screens/WelcomeScreen.js`).
- Parent profile setup (step 1/6) with weekly summary email and notification toggles (`src/screens/ParentProfileSetupScreen.js`).
- Children count selector (step 2/6) with counter controls and progress bar (`src/screens/ChildrenCountScreen.js`).
- Child profile setup (step 3/6) with name, age picker, avatar theme choices, goal chips, and looping for multiple children (`src/screens/ChildProfileSetupScreen.js`).

## Prerequisites
- Node.js and a React Native toolchain (Expo or React Native CLI).
- Install gradient dependency (adjust if using Expo):
  - Bare RN: `npm install react-native-linear-gradient`
  - Expo: `expo install expo-linear-gradient` and update imports accordingly.
- Install picker dependency for age selection:
  - `npm install @react-native-picker/picker`
- Navigation stack/gestures (already listed in package.json):
  - `npm install @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens`

## Setup
```
npm install
# or
yarn
```

For iOS, also install pods:
```
cd ios && npx pod-install && cd ..
```

## Navigation wiring (example)
Register the screens in your navigator:
```js
import WelcomeScreen from './src/screens/WelcomeScreen';
import ParentProfileSetupScreen from './src/screens/ParentProfileSetupScreen';
import ChildrenCountScreen from './src/screens/ChildrenCountScreen';
import ChildProfileSetupScreen from './src/screens/ChildProfileSetupScreen';

<Stack.Screen name="Welcome" component={WelcomeScreen} />
<Stack.Screen name="ParentProfileSetup" component={ParentProfileSetupScreen} />
<Stack.Screen name="Step2" component={ChildrenCountScreen} />
<Stack.Screen name="Step3" component={ChildProfileSetupScreen} />
<Stack.Screen name="Step4" component={NextScreen} />
```

## Running
- iOS (macOS only): `npx react-native run-ios`
- Android (Windows/macOS/Linux): `npx react-native run-android`
- Expo: `npx expo start`

## Notes
- Replace the placeholder logo image in the welcome screen with your asset.
- Social buttons currently show placeholder icons/alerts; connect to your auth provider when ready.
- Form validation covers basic email format and password confirmation. Parent profile validates name + email. Children count enforces a minimum of 1.
- `babel.config.js` is configured with the Reanimated plugin; keep it in place for navigation/gestures to work.

## Windows tips (Android)
- Run commands from **PowerShell** or **CMD**, not WSL, so Android tooling and node paths resolve correctly.
- If you see `ENOENT spawn C:\Program Files\git\bin\bash.exe`, reset npm's shell:  
  `npm config delete script-shell`  
  or set it explicitly:  
  `npm config set script-shell "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"`
- Ensure Android Studio/SDK + emulator or device is set up and on `PATH` (`adb devices` should list something).
