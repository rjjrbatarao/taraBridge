# taraBridge
Javascript Bridge for tara print, menu and lockscreen

## TaraKiosk.js Usage
```js
import { TaraKiosk } from './TaraKiosk.js';

// Get list of simple package strings[cite: 2]
const packageNames = TaraKiosk.getWhitelistedApps();
console.log("Allowed Packages:", packageNames);

// Get apps grouped by category with Base64 icons[cite: 2]
const categorizedApps = TaraKiosk.getWhitelistedAppsGroupedByCategory();
console.log("Categorized Apps:", categorizedApps);
/*
Output example:
{
  "Education": [{ appName: "Duolingo", packageName: "com.duolingo", icon: "data:image/png;base64,..." }],
  "Games": [{ appName: "Chess", packageName: "com.chess", icon: "data:image/png;base64,..." }]
}
*/

// Launch a target app dynamically[cite: 2]
TaraKiosk.launchApp("com.duolingo");

// Get details of app opened prior to kiosk[cite: 2]
const lastApp = TaraKiosk.getPreviouslyOpenedApp();
console.log("Previously Opened App:", lastApp.appName, lastApp.packageName);


// Save encrypted auth token[cite: 2]
TaraKiosk.setSecureData("authToken", "eyJhbGciOiJIUzI1NiI...");

// Read encrypted value[cite: 2]
const token = TaraKiosk.getSecureData("authToken", "GUEST");

// Remove a specific key[cite: 2]
TaraKiosk.removeSecureData("authToken");

// Clear all encrypted preferences[cite: 2]
TaraKiosk.clearSecureData();


// Clear app cache for all whitelisted packages[cite: 2]
TaraKiosk.clearAllWhitelistedAppsCache();

// Clear cache for a specific app[cite: 2]
TaraKiosk.clearAppCacheByPackage("com.example.app");

// Clear default media folders (Downloads, DCIM, Movies, Pictures)[cite: 2]
TaraKiosk.clearDefaultMediaFolders();

// Clear specific custom folder paths[cite: 2]
TaraKiosk.clearCustomFolders([
  "/sdcard/Download/TempPdfs",
  "/sdcard/DCIM/KioskCaptures"
]);

// Upload text/HTML file[cite: 2]
TaraKiosk.uploadTextFile("index.html", "<h1>Welcome to Kiosk</h1>");

// Upload Base64 binary file[cite: 2]
TaraKiosk.uploadFile("logo.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...");

// List all files inside secure file storage[cite: 2]
const fileList = TaraKiosk.listSecureFiles();
console.log("Stored Secure Files:", fileList); // ["index.html", "logo.png"]

// Delete a secure file[cite: 2]
TaraKiosk.deleteSecureFile("logo.png");


// Get entire device stats object[cite: 2]
const device = TaraKiosk.getDeviceInfo();
console.log(`Device: ${device.manufacturer} ${device.model} (Android ${device.osVersion})`);
console.log(`Battery: ${device.batteryLevel}% (Charging: ${device.isCharging})`);
console.log(`IP: Wi-Fi (${device.wifiIp}), Ethernet (${device.ethernetIp})`);

// Measure latency to server[cite: 2]
const pingMs = TaraKiosk.getNetworkLatency("8.8.8.8");
console.log(`Ping latency: ${pingMs} ms`);

// Check connected Bluetooth peripherals[cite: 2]
const isBtConnected = TaraKiosk.isBluetoothConnected();
console.log("Bluetooth Connected:", isBtConnected);


// List running background app packages[cite: 2]
const runningApps = TaraKiosk.getRunningBackgroundApps();
console.log("Running background apps:", runningApps);

// Stop a running application process[cite: 2]
TaraKiosk.stopApp("com.example.app");

// Show native Toast message[cite: 2]
TaraKiosk.showToast("Kiosk Settings Updated!");

// Trigger Google Accounts removal[cite: 2]
TaraKiosk.removeGoogleAccount();


// Trigger transition to standard Webview Activity
TaraKiosk.moveToWebviewActivity();

// Trigger transition to Lockscreen Activity
TaraKiosk.moveToLockscreenWebviewActivity();
```

## TaraPrint.js Usage
```js
// Scan for 3 seconds and get available Network and Bluetooth printers
const printers = PrinterService.getDiscoveredPrinters(3000);

console.log("Found Printers:", printers);
/*
Output Array Example:
[
  {
    "name": "Epson TM-T88VI",
    "address": "00:11:22:33:44:55",
    "type": "BLUETOOTH_SPP",
    "isPaired": true
  },
  {
    "name": "Brother Workstation",
    "ip": "192.168.1.150",
    "port": 9100,
    "type": "NETWORK_MDNS"
  }
]
*/


// Print a PDF stored in Secure Storage on Letter size paper in Black & White
const success = PrinterService.printFromSecureStorage(
  "invoice_2026.pdf", // fileName
  "Customer Invoice",  // jobName
  "LETTER",            // paperSize ("A4", "LETTER", "LEGAL", "EXECUTIVE", etc.)
  "MONO"               // colorMode ("COLOR" or "MONO")
);

if (success) {
  console.log("Print job sent to system spooler!");
}


// Example Base64 string from canvas, PDF generator, or API
const pdfBase64 = "data:application/pdf;base64,JVBERi0xLjQN...";

// Print directly in Color on A4 paper
PrinterService.printDirectBinary(
  pdfBase64,
  "Direct PDF Print",
  "A4",
  "COLOR"
);

// Raw Base64 encoded ESC/POS commands
const escPosBase64 = "EACaA2FiY2RlZmc..."; 
const printerMac = "00:11:22:33:44:55";

// Send directly to the Bluetooth receipt printer
PrinterService.printThermalBluetooth(printerMac, escPosBase64);

const escPosBase64 = "EACaA2FiY2RlZmc..."; 
const printerIp = "192.168.1.100";

// Send payload to port 9100 on local network
PrinterService.printThermalNetwork(printerIp, 9100, escPosBase64);

// Open Android System Print Settings (to enable Epson/Brother Print Service Plugins)
PrinterService.openPrintSettings();

// Open Android Bluetooth Settings (to pair new Bluetooth receipt printers)
PrinterService.openBluetoothSettings();

```
