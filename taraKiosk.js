/**
 * TaraService - Web Interface for Android's TaraBridge Kiosk Manager
 */
export class KioskService {

  /**
   * Helper to safely check if the Android Native Bridge is available
   */
  static isBridgeAvailable() {
    if (typeof window.TaraBridge === 'undefined') {
      console.error("TaraBridge native interface is NOT available!");
      return false;
    }
    return true;
  }

  // ==========================================
  // 🚦 ACTIVITY NAVIGATION
  // ==========================================

  /**
   * Switches to the WebviewActivity inside the Android app.
   * @returns {boolean}
   */
  static moveToWebviewActivity() {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.moveToWebviewActivity();
  }

  /**
   * Switches to the LockscreenWebviewActivity inside the Android app.
   * @returns {boolean}
   */
  static moveToLockscreenWebviewActivity() {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.moveToLockscreenWebviewActivity();
  }

  // ==========================================
  // 🧼 CACHE & STORAGE CLEARING
  // ==========================================

  static clearAllWhitelistedAppsCache() {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.clearAllWhitelistedAppsCache();
  }

  static clearAppCacheByPackage(targetPackage) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.clearAppCacheByPackage(targetPackage);
  }

  // ==========================================
  // 📱 WHITELISTED APPS & LAUNCHER
  // ==========================================

  static getWhitelistedApps() {
    if (!this.isBridgeAvailable()) return [];
    try {
      return JSON.parse(window.TaraBridge.getWhitelistedApps() || "[]");
    } catch (e) {
      return [];
    }
  }

  static getWhitelistedAppsDetails() {
    if (!this.isBridgeAvailable()) return [];
    try {
      return JSON.parse(window.TaraBridge.getWhitelistedAppsDetails() || "[]");
    } catch (e) {
      return [];
    }
  }

  static getWhitelistedAppsGroupedByCategory() {
    if (!this.isBridgeAvailable()) return {};
    try {
      return JSON.parse(window.TaraBridge.getWhitelistedAppsGroupedByCategory() || "{}");
    } catch (e) {
      return {};
    }
  }

  static getWhitelistedAppsGroupedByConnectivity() {
    if (!this.isBridgeAvailable()) return { Online: [], Offline: [] };
    try {
      return JSON.parse(window.TaraBridge.getWhitelistedAppsGroupedByConnectivity() || '{"Online":[],"Offline":[]}');
    } catch (e) {
      return { Online: [], Offline: [] };
    }
  }

  static launchApp(packageName) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.launchApp(packageName);
  }

  static getPreviouslyOpenedApp() {
    if (!this.isBridgeAvailable()) return {};
    try {
      return JSON.parse(window.TaraBridge.getPreviouslyOpenedApp() || "{}");
    } catch (e) {
      return {};
    }
  }

  // ==========================================
  // 🔒 SECURE ENCRYPTED STORAGE
  // ==========================================

  static setSecureData(key, value) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.setSecureData(key, value);
  }

  static getSecureData(key, defaultValue = "") {
    if (!this.isBridgeAvailable()) return defaultValue;
    return window.TaraBridge.getSecureData(key, defaultValue);
  }

  static removeSecureData(key) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.removeSecureData(key);
  }

  static clearSecureData() {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.clearSecureData();
  }

  // ==========================================
  // ⚙️ PROCESS & APP MANAGEMENT
  // ==========================================

  static getRunningBackgroundApps() {
    if (!this.isBridgeAvailable()) return [];
    try {
      return JSON.parse(window.TaraBridge.getRunningBackgroundApps() || "[]");
    } catch (e) {
      return [];
    }
  }

  static stopApp(targetPackage) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.stopApp(targetPackage);
  }

  static showToast(message) {
    if (this.isBridgeAvailable()) {
      window.TaraBridge.showToast(message);
    }
  }

  static removeGoogleAccount() {
    if (this.isBridgeAvailable()) {
      window.TaraBridge.removeGoogleAccount();
    }
  }

  static clearDefaultMediaFolders() {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.clearDefaultMediaFolders();
  }

  static clearCustomFolders(folderPaths = []) {
    if (!this.isBridgeAvailable()) return false;
    try {
      return window.TaraBridge.clearCustomFolders(JSON.stringify(folderPaths));
    } catch (e) {
      return false;
    }
  }

  // ==========================================
  // 📶 NETWORK & BLUETOOTH
  // ==========================================

  static isBluetoothConnected() {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.isBluetoothConnected();
  }

  static getNetworkLatency(host = "8.8.8.8") {
    if (!this.isBridgeAvailable()) return -1;
    return window.TaraBridge.getNetworkLatency(host);
  }

  // ==========================================
  // 📁 SECURE FILE STORAGE MANAGEMENT
  // ==========================================

  static uploadFile(fileName, base64Data) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.uploadFile(fileName, base64Data);
  }

  static uploadTextFile(fileName, content) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.uploadTextFile(fileName, content);
  }

  static listSecureFiles() {
    if (!this.isBridgeAvailable()) return [];
    try {
      return JSON.parse(window.TaraBridge.listSecureFiles() || "[]");
    } catch (e) {
      return [];
    }
  }

  static deleteSecureFile(fileName) {
    if (!this.isBridgeAvailable()) return false;
    return window.TaraBridge.deleteSecureFile(fileName);
  }

  // ==========================================
  // 📱 SYSTEM & HARDWARE INFO
  // ==========================================

  static getDeviceInfo() {
    if (!this.isBridgeAvailable()) return {};

    return {
      refreshRate: window.TaraBridge.getScreenRefreshRate(),
      wifiIp: window.TaraBridge.getWifiIpAddress(),
	  wifiMac: window.TaraBridge.getWifiMacAddress(),
      ethernetIp: window.TaraBridge.getEthernetIpAddress(),
	  ethernetMac: window.TaraBridge.getEthernetMacAddress(),
      serial: window.TaraBridge.getDeviceSerial(),
      osVersion: window.TaraBridge.getOsVersion(),
      sdkInt: window.TaraBridge.getSdkInt(),
      model: window.TaraBridge.getDeviceModel(),
      manufacturer: window.TaraBridge.getManufacturer(),
      appVersion: window.TaraBridge.getAppVersion(),
      batteryLevel: window.TaraBridge.getBatteryLevel(),
      isCharging: window.TaraBridge.isCharging()
    };
  }
}