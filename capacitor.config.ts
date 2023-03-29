import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
// import { displayStrings } from '@capacitor-community/bluetooth-le';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'alpha-victor',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      style: KeyboardStyle.Dark,
      resize: KeyboardResize.Native,
      resizeOnFullScreen: true
    },
    BluetoothLe: {
      displayStrings: {
        scanning: "Scanning...",
        cancel: "Cancel",
        availableDevices: "Available devices",
        noDeviceFound: "No device found"
      }
    }
  }
};

export default config;
