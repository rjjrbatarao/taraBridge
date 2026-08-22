# taraBridge
Javascript Bridge for tara print, menu and lockscreen. Built for TaraKiosk android app it enables web developers to access native android functions like network printing, bluetooth spp, apps whitelist in json, app launching, file management, file uploads, and other functions required by kiosk.

## KioskService.js Usage
```js
import { TaraKiosk } from './TaraKiosk.js';

async function runAllKioskMethods() {
  console.log('🚀 Starting Complete TaraKiosk API Test...\n');

  // ==================== 1. APP & LAUNCHER METHODS ====================
  console.log('--- 1. App & Launcher Methods ---');
  
  const whitelistedApps = TaraKiosk.getWhitelistedApps();
  console.log('getWhitelistedApps:', whitelistedApps);

  const groupedCategory = TaraKiosk.getWhitelistedAppsGroupedByCategory();
  console.log('getWhitelistedAppsGroupedByCategory:', groupedCategory);

  const groupedConnectivity = TaraKiosk.getWhitelistedAppsGroupedByConnectivity();
  console.log('getWhitelistedAppsGroupedByConnectivity:', groupedConnectivity);

  const appDetails = TaraKiosk.getWhitelistedAppsDetails();
  console.log('getWhitelistedAppsDetails:', appDetails);

  const appWhitelist = TaraKiosk.getAppWhitelist();
  console.log('getAppWhitelist:', appWhitelist);

  const prevApp = TaraKiosk.getPreviouslyOpenedApp();
  console.log('getPreviouslyOpenedApp:', prevApp);

  const runningAppsCount = TaraKiosk.getRunningBackgroundAppsCount();
  console.log('getRunningBackgroundAppsCount:', runningAppsCount);

  const runningAppsDetails = TaraKiosk.getRunningBackgroundAppsDetails();
  console.log('getRunningBackgroundAppsDetails:', runningAppsDetails);

  // Application Control Execution
  const launched = TaraKiosk.launchApp('com.example.app');
  console.log('launchApp:', launched);

  const stoppedBgApp = TaraKiosk.stopRunningBackgroundApp('com.example.app');
  console.log('stopRunningBackgroundApp:', stoppedBgApp);

  const stoppedApp = TaraKiosk.stopApp('com.example.app');
  console.log('stopApp:', stoppedApp);

  const stoppedAll = TaraKiosk.stopAllRunningBackgroundApp();
  console.log('stopAllRunningBackgroundApp:', stoppedAll);


  // ==================== 2. CACHE & STORAGE MANAGEMENT ====================
  console.log('\n--- 2. Cache & Storage Management ---');

  console.log('clearAppCacheByPackage:', TaraKiosk.clearAppCacheByPackage('com.example.app'));
  console.log('clearAllAppCache:', TaraKiosk.clearAllAppCache());
  console.log('clearAllAppCacheExcludingGames:', TaraKiosk.clearAllAppCacheExcludingGames());
  console.log('clearGameCacheByPackage:', TaraKiosk.clearGameCacheByPackage('com.example.game'));
  console.log('clearAllGameCache:', TaraKiosk.clearAllGameCache());
  console.log('clearDefaultMediaFolders:', TaraKiosk.clearDefaultMediaFolders());
  console.log('clearCustomFolders:', TaraKiosk.clearCustomFolders(['/sdcard/Download/Temp', '/sdcard/Logs']));


  // ==================== 3. SECURE LOCAL STORAGE ====================
  console.log('\n--- 3. Secure Local Storage ---');

  const setStorage = TaraKiosk.setSecureData('auth_token', 'secret123456');
  console.log('setSecureData:', setStorage);

  const token = TaraKiosk.getSecureData('auth_token', 'default_token');
  console.log('getSecureData:', token);

  const removedStorage = TaraKiosk.removeSecureData('auth_token');
  console.log('removeSecureData:', removedStorage);

  const clearedStorage = TaraKiosk.clearSecureData();
  console.log('clearSecureData:', clearedStorage);


  // ==================== 4. SECURE FILE STORAGE ====================
  console.log('\n--- 4. Secure File Storage ---');

  const uploadedTxt = TaraKiosk.uploadTextFile('config.json', '{"theme": "dark"}');
  console.log('uploadTextFile:', uploadedTxt);

  const uploadedBin = TaraKiosk.uploadFile('image.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=');
  console.log('uploadFile:', uploadedBin);

  const secureFiles = TaraKiosk.listSecureFiles();
  console.log('listSecureFiles:', secureFiles);

  const deletedFile = TaraKiosk.deleteSecureFile('config.json');
  console.log('deleteSecureFile:', deletedFile);


  // ==================== 5. DISPLAY & SYSTEM CONTROL ====================
  console.log('\n--- 5. Display & System Control ---');

  console.log('setScreenBrightness:', TaraKiosk.setScreenBrightness(75));
  console.log('getScreenBrightness:', TaraKiosk.getScreenBrightness());
  console.log('minDisplayBrightness:', TaraKiosk.minDisplayBrightness());
  console.log('maxDisplayBrightness:', TaraKiosk.maxDisplayBrightness());
  console.log('setKeepScreenAwake:', TaraKiosk.setKeepScreenAwake(true));
  console.log('setForceMaxRefreshRate:', TaraKiosk.setForceMaxRefreshRate(true));
  console.log('turnOffDisplay:', TaraKiosk.turnOffDisplay());
  console.log('turnOnDisplay:', TaraKiosk.turnOnDisplay());


  // ==================== 6. AUDIO & NOTIFICATIONS ====================
  console.log('\n--- 6. Audio & Notifications ---');

  console.log('setAudioLevel:', TaraKiosk.setAudioLevel(80));
  console.log('getAudioLevel:', TaraKiosk.getAudioLevel());
  console.log('setGameDoNotDisturb:', TaraKiosk.setGameDoNotDisturb(true));
  console.log('getGameDoNotDisturb:', TaraKiosk.getGameDoNotDisturb());
  console.log('playNotificationSound:', TaraKiosk.playNotificationSound('notification'));


  // ==================== 7. GAME MODE CONTROLS ====================
  console.log('\n--- 7. Game Mode Controls ---');

  console.log('setGameMode:', TaraKiosk.setGameMode('com.example.game', 'performance'));
  console.log('getGameMode:', TaraKiosk.getGameMode('com.example.game'));
  console.log('prepareRAMForGaming:', TaraKiosk.prepareRAMForGaming());


  // ==================== 8. HARDWARE & CONNECTIVITY ====================
  console.log('\n--- 8. Hardware & Connectivity ---');

  console.log('isBluetoothConnected:', TaraKiosk.isBluetoothConnected());
  console.log('sendBleCommand:', TaraKiosk.sendBleCommand('PING_HARDWARE'));
  console.log('getNetworkLatency:', TaraKiosk.getNetworkLatency('8.8.8.8'));
  console.log('sendSms:', TaraKiosk.sendSms('+1234567890', 'Hello from Kiosk!'));
  console.log('getLocation:', TaraKiosk.getLocation());
  
  // Triggers Android OS Setting GUI
  TaraKiosk.openLocationSettings();


  // ==================== 9. NAVIGATION & STATE MANAGEMENT ====================
  console.log('\n--- 9. Navigation & State Management ---');

  console.log('isLockscreen:', TaraKiosk.isLockscreen());
  console.log('isMenu:', TaraKiosk.isMenu());
  console.log('getLockscreenState:', TaraKiosk.getLockscreenState());
  console.log('setLockscreenState:', TaraKiosk.setLockscreenState(true));
  console.log('getMenuState:', TaraKiosk.getMenuState());
  console.log('setMenuState:', TaraKiosk.setMenuState(true));
  console.log('moveToMenuWebview:', TaraKiosk.moveToMenuWebview());
  console.log('moveToLockscreenWebview:', TaraKiosk.moveToLockscreenWebview());


  // ==================== 10. BACKGROUND TIMERS & UTILITIES ====================
  console.log('\n--- 10. Background Timers & Utilities ---');

  console.log('startBackgroundTimer:', TaraKiosk.startBackgroundTimer(120, true));
  console.log('isTimerRunning:', TaraKiosk.isTimerRunning());
  console.log('getTimerRemainingSeconds:', TaraKiosk.getTimerRemainingSeconds());
  console.log('pauseBackgroundTimer:', TaraKiosk.pauseBackgroundTimer());
  console.log('resumeBackgroundTimer:', TaraKiosk.resumeBackgroundTimer());
  console.log('stopBackgroundTimer:', TaraKiosk.stopBackgroundTimer());

  TaraKiosk.showToast('Test Toast Notification!');
  console.log('hasUsageStatsPermission:', TaraKiosk.hasUsageStatsPermission());

  // Triggers OS UI / Asynchronous Operations
  TaraKiosk.openUsageStatsSettings();
  TaraKiosk.removeGoogleAccount();
  
  TaraKiosk.sendEmailAsync(
    'target@domain.com',
    'Kiosk Report',
    'Report Body Content',
    'smtp.mail.com',
    587,
    'sender@domain.com',
    'secretpass',
    'onEmailSentCallback'
  );


  // ==================== 11. TURSO DATABASE & SALES ====================
  console.log('\n--- 11. Turso Database & Sales ---');

  TaraKiosk.setTursoRemoteUrl('https://my-db.turso.io');
  console.log('getTursoRemoteUrl:', TaraKiosk.getTursoRemoteUrl());

  TaraKiosk.setTursoAuthToken('eyJhbGciOiJIUzI1NiI...');
  console.log('getTursoAuthToken:', TaraKiosk.getTursoAuthToken());

  TaraKiosk.updateTursoConfig('https://my-db.turso.io', 'eyJhbGciOiJIUzI1NiI...');
  console.log('getTursoConfig:', TaraKiosk.getTursoConfig());

  // Sales Actions
  console.log('addSale:', TaraKiosk.addSale('tx_1001', 25.50, 'CASH'));
  console.log('getTotalCreditToday:', TaraKiosk.getTotalCreditToday());
  console.log('getTotalCreditYesterday:', TaraKiosk.getTotalCreditYesterday());
  console.log('getTotalCreditWeekly:', TaraKiosk.getTotalCreditWeekly());
  console.log('getTotalCreditMonthly:', TaraKiosk.getTotalCreditMonthly());
  console.log('getSalesSummary:', TaraKiosk.getSalesSummary());
  console.log('getSalesPaginated:', TaraKiosk.getSalesPaginated(1, 10));
  console.log('deleteAllSales:', TaraKiosk.deleteAllSales());


  // ==================== 12. TELEMETRY & HARDWARE INFO ====================
  console.log('\n--- 12. Telemetry & Hardware Info ---');

  TaraKiosk.setEspData('ESP32_OK_VAL:42');
  console.log('getEspData:', TaraKiosk.getEspData());
  console.log('hasInternetConnection:', TaraKiosk.hasInternetConnection());
  console.log('getCpuCount:', TaraKiosk.getCpuCount());
  console.log('getCpuHz:', TaraKiosk.getCpuHz());
  console.log('getCpuBrand:', TaraKiosk.getCpuBrand());
  console.log('getCpuModel:', TaraKiosk.getCpuModel());
  console.log('getRamMb:', TaraKiosk.getRamMb());
  console.log('getRamPercent:', TaraKiosk.getRamPercent());
  console.log('getCpuTemp:', TaraKiosk.getCpuTemp());
  console.log('getScreenRefreshRate:', TaraKiosk.getScreenRefreshRate());
  console.log('getWifiIpAddress:', TaraKiosk.getWifiIpAddress());
  console.log('getEthernetIpAddress:', TaraKiosk.getEthernetIpAddress());
  console.log('getWifiMacAddress:', TaraKiosk.getWifiMacAddress());
  console.log('getEthernetMacAddress:', TaraKiosk.getEthernetMacAddress());
  console.log('getDeviceSerial:', TaraKiosk.getDeviceSerial());
  console.log('getOsVersion:', TaraKiosk.getOsVersion());
  console.log('getSdkInt:', TaraKiosk.getSdkInt());
  console.log('getDeviceModel:', TaraKiosk.getDeviceModel());
  console.log('getManufacturer:', TaraKiosk.getManufacturer());
  console.log('getAppVersion:', TaraKiosk.getAppVersion());
  console.log('getBatteryLevel:', TaraKiosk.getBatteryLevel());
  console.log('isCharging:', TaraKiosk.isCharging());

  console.log('\n✅ Completed invoking all API methods!');
}

// Execute test suite
runAllKioskMethods();
```

## TaraPrint.js Usage
```js
import { PrinterService } from './taraPrint.js';

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
