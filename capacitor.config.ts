import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
// import { displayStrings } from '@capacitor-community/bluetooth-le';

const config: CapacitorConfig = {
  appId: 'com.alphavictorapp.app',
  appName: 'alpha-victor',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      style: KeyboardStyle.Dark,
      resize: KeyboardResize.Native,
      resizeOnFullScreen: true
    },
    "SplashScreen": {
      "launchShowDuration": 2000,
      "launchAutoHide": true,
      "backgroundColor": "#ffffffff",
      "androidScaleType": "CENTER_CROP",
      "showSpinner": false,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen"
    },
    BluetoothLe: {
      displayStrings: {
        scanning: "Scanning...",
        cancel: "Cancel",
        availableDevices: "Available devices",
        noDeviceFound: "No device found"
      }
    }
  },
  // server: {
  //   cleartext: true,
  //   url: "http://192.168.1.76:8100"
  // }
};

export default config;
