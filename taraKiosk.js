/**
 * TaraService - Web Interface for Android's TaraBridge Kiosk Manager
 */
export class KioskService {

  // Helper to safely parse JSON strings returned by native methods
  static #safeJsonParse(data, fallback) {
    if (typeof data !== 'string') return fallback;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('[TaraKiosk] Error parsing JSON response:', e);
      return fallback;
    }
  }

  // Private helper method to execute calls on window.TaraBridge
  static #callNative(methodName, fallbackValue, ...args) {
    if (typeof window !== 'undefined' && window.TaraBridge && typeof window.TaraBridge[methodName] === 'function') {
      try {
        return window.TaraBridge[methodName](...args);
      } catch (e) {
        console.error(`[TaraKiosk] Error executing ${methodName}:`, e);
        return fallbackValue;
      }
    } else {
      console.warn(`[TaraKiosk] Native interface method window.TaraBridge.${methodName} is unavailable.`);
      return fallbackValue;
    }
  }

  // ==================== APP & LAUNCHER METHODS ====================

  /** Get list of whitelisted package names */
  static getWhitelistedApps() {
    const result = this.#callNative('getWhitelistedApps', '[]');
    return safeJsonParse(result, []);
  }

  /** Get whitelisted apps grouped by standard categories with base64 icons */
  static getWhitelistedAppsGroupedByCategory() {
    const result = this.#callNative('getWhitelistedAppsGroupedByCategory', '{}');
    return safeJsonParse(result, {});
  }

  /** Get whitelisted apps grouped by 'Online' and 'Offline' connectivity support */
  static getWhitelistedAppsGroupedByConnectivity() {
    const result = this.#callNative('getWhitelistedAppsGroupedByConnectivity', '{}');
    return safeJsonParse(result, { Online: [], Offline: [] });
  }

  /** Get extended telemetry/stats for all whitelisted apps (RAM, storage, version, etc.) */
  static getWhitelistedAppsDetails() {
    const result = this.#callNative('getWhitelistedAppsDetails', '[]');
    return safeJsonParse(result, []);
  }

  /** Launch an installed application by package name */
  static launchApp(packageName) {
    return this.#callNative('launchApp', false, packageName);
  }

  /** Stop/kill a specific running background app */
  static stopRunningBackgroundApp(packageName) {
    return this.#callNative('stopRunningBackgroundApp', false, packageName);
  }

  /** Force stop an application */
  static stopApp(packageName) {
    return this.#callNative('stopApp', false, packageName);
  }

  /** Stop all running non-essential background applications */
  static stopAllRunningBackgroundApp() {
    return this.#callNative('stopAllRunningBackgroundApp', false);
  }

  /** Get details of running background applications */
  static getRunningBackgroundAppsDetails() {
    const result = this.#callNative('getRunningBackgroundAppsDetails', '[]');
    return safeJsonParse(result, []);
  }

  /** Get count of actively running background apps */
  static getRunningBackgroundAppsCount() {
    return this.#callNative('getRunningBackgroundAppsCount', 0);
  }

  /** Get details of the application opened prior to the kiosk */
  static getPreviouslyOpenedApp() {
    const result = this.#callNative('getPreviouslyOpenedApp', '{}');
    return safeJsonParse(result, {});
  }

  /** Get main activity app launcher whitelist */
  static getAppWhitelist() {
    const result = this.#callNative('getAppWhitelist', '[]');
    return safeJsonParse(result, []);
  }

  // ==================== CACHE & STORAGE MANAGEMENT ====================

  /** Clear cache for all whitelisted applications */
  static clearAllAppCache() {
    return this.#callNative('clearAllAppCache', false);
  }

  /** Clear cache for a specific application package */
  static clearAppCacheByPackage(targetPackage) {
    return this.#callNative('clearAppCacheByPackage', false, targetPackage);
  }

  /** Clear app caches excluding games */
  static clearAllAppCacheExcludingGames() {
    return this.#callNative('clearAllAppCacheExcludingGames', false);
  }

  /** Clear game caches without wiping OBB game data */
  static clearAllGameCache() {
    return this.#callNative('clearAllGameCache', false);
  }

  /** Clear game cache by package without wiping OBB game data */
  static clearGameCacheByPackage(targetPackage) {
    return this.#callNative('clearGameCacheByPackage', false, targetPackage);
  }

  /** Clear standard media folders (Downloads, DCIM, Pictures, Movies) */
  static clearDefaultMediaFolders() {
    return this.#callNative('clearDefaultMediaFolders', false);
  }

  /** Clear custom folders given an array of string paths */
  static clearCustomFolders(pathsArray = []) {
    const jsonPaths = JSON.stringify(pathsArray);
    return this.#callNative('clearCustomFolders', false, jsonPaths);
  }

  // ==================== SECURE LOCAL STORAGE ====================

  /** Set encrypted key-value string data */
  static setSecureData(key, value) {
    return this.#callNative('setSecureData', false, key, value);
  }

  /** Read encrypted string data by key */
  static getSecureData(key, defaultValue = '') {
    return this.#callNative('getSecureData', defaultValue, key, defaultValue);
  }

  /** Remove key from encrypted storage */
  static removeSecureData(key) {
    return this.#callNative('removeSecureData', false, key);
  }

  /** Clear all encrypted storage */
  static clearSecureData() {
    return this.#callNative('clearSecureData', false);
  }

  // ==================== SECURE FILE STORAGE ====================

  /** Upload binary file using Base64 string */
  static uploadFile(fileName, base64Data) {
    return this.#callNative('uploadFile', false, fileName, base64Data);
  }

  /** Upload plain text file (HTML, CSS, JS, etc.) */
  static uploadTextFile(fileName, content) {
    return this.#callNative('uploadTextFile', false, fileName, content);
  }

  /** List all stored secure asset files */
  static listSecureFiles() {
    const result = this.#callNative('listSecureFiles', '[]');
    return safeJsonParse(result, []);
  }

  /** Delete a specific stored secure file */
  static deleteSecureFile(fileName) {
    return this.#callNative('deleteSecureFile', false, fileName);
  }

  // ==================== DISPLAY & SYSTEM CONTROL ====================

  /** Turn display off (Locks device via DPM) */
  static turnOffDisplay() {
    return this.#callNative('turnOffDisplay', false);
  }

  /** Turn display back on */
  static turnOnDisplay() {
    return this.#callNative('turnOnDisplay', false);
  }

  /** Dim display to minimum brightness */
  static minDisplayBrightness() {
    return this.#callNative('minDisplayBrightness', false);
  }

  /** Set display to maximum brightness */
  static maxDisplayBrightness() {
    return this.#callNative('maxDisplayBrightness', false);
  }

  /** Set screen brightness percentage (0 - 100) */
  static setScreenBrightness(percentage) {
    return this.#callNative('setScreenBrightness', false, percentage);
  }

  /** Get current screen brightness percentage */
  static getScreenBrightness() {
    return this.#callNative('getScreenBrightness', -1);
  }

  /** Keep screen awake / prevent sleeping */
  static setKeepScreenAwake(enable) {
    return this.#callNative('setKeepScreenAwake', false, enable);
  }

  /** Enable or disable maximum available refresh rate (e.g. 90Hz/120Hz) */
  static setForceMaxRefreshRate(enable) {
    return this.#callNative('setForceMaxRefreshRate', false, enable);
  }

  // ==================== AUDIO & NOTIFICATIONS ====================

  /** Set media audio volume level percentage (0 - 100) */
  static setAudioLevel(percentage) {
    return this.#callNative('setAudioLevel', false, percentage);
  }

  /** Get media volume level percentage */
  static getAudioLevel() {
    return this.#callNative('getAudioLevel', -1);
  }

  /** Toggle Do Not Disturb (DND) status */
  static setGameDoNotDisturb(enable) {
    return this.#callNative('setGameDoNotDisturb', false, enable);
  }

  /** Query whether DND mode is active */
  static getGameDoNotDisturb() {
    return this.#callNative('getGameDoNotDisturb', false);
  }

  /** Play native notification audio ('notification', 'alarm', or 'ringtone') */
  static playNotificationSound(type = 'notification') {
    return this.#callNative('playNotificationSound', false, type);
  }

  // ==================== GAME MODE CONTROLS ====================

  /** Set Game Mode ('performance', 'battery', 'standard') */
  static setGameMode(packageName, mode) {
    return this.#callNative('setGameMode', false, packageName, mode);
  }

  /** Get Game Mode state */
  static getGameMode(packageName = '') {
    return this.#callNative('getGameMode', 'unsupported', packageName);
  }

  /** Clear background process memory prior to launching games */
  static prepareRAMForGaming() {
    return this.#callNative('prepareRAMForGaming', false);
  }

  // ==================== HARDWARE & CONNECTIVITY ====================

  /** Check if Bluetooth is enabled and connected */
  static isBluetoothConnected() {
    return this.#callNative('isBluetoothConnected', false);
  }

  /** Send BLE command payload string to connected hardware */
  static sendBleCommand(command) {
    return this.#callNative('sendBleCommand', false, command);
  }

  /** Measure network ping/latency to a given host (ms) */
  static getNetworkLatency(host = '8.8.8.8') {
    return this.#callNative('getNetworkLatency', -1, host);
  }

  /** Send SMS to target phone number */
  static sendSms(phoneNumber, message) {
    return this.#callNative('sendSms', 'Error: Interface missing', phoneNumber, message);
  }

  /** Open system location settings screen */
  static openLocationSettings() {
    this.#callNative('openLocationSettings', null);
  }

  /** Get current GPS coordinates as JSON object {latitude, longitude} */
  static getLocation() {
    const result = this.#callNative('getLocation', '');
    return safeJsonParse(result, result);
  }

  // ==================== NAVIGATION & STATE MANAGEMENT ====================

  /** Move to Menu Webview Activity */
  static moveToMenuWebview() {
    return this.#callNative('moveToMenuWebview', false);
  }

  /** Move to Lockscreen Webview Activity */
  static moveToLockscreenWebview() {
    return this.#callNative('moveToLockscreenWebview', false);
  }

  /** Check if current activity is Lockscreen */
  static isLockscreen() {
    return this.#callNative('isLockscreen', false);
  }

  /** Check if current activity is Menu */
  static isMenu() {
    return this.#callNative('isMenu', false);
  }

  /** Get Lockscreen state */
  static getLockscreenState() {
    return this.#callNative('getLockscreenState', false);
  }

  /** Set Lockscreen state */
  static setLockscreenState(state) {
    return this.#callNative('setLockscreenState', false, state);
  }

  /** Get Menu state */
  static getMenuState() {
    return this.#callNative('getMenuState', false);
  }

  /** Set Menu state */
  static setMenuState(state) {
    return this.#callNative('setMenuState', false, state);
  }

  // ==================== BACKGROUND TIMERS & UTILITIES ====================

  /** Start persistent background timer in seconds */
  static startBackgroundTimer(seconds, canLock = true) {
    return this.#callNative('startBackgroundTimer', false, seconds, canLock);
  }

  /** Stop running background timer */
  static stopBackgroundTimer() {
    return this.#callNative('stopBackgroundTimer', false);
  }

  /** Pause active background timer */
  static pauseBackgroundTimer() {
    return this.#callNative('pauseBackgroundTimer', false);
  }

  /** Resume paused background timer */
  static resumeBackgroundTimer() {
    return this.#callNative('resumeBackgroundTimer', false);
  }

  /** Get remaining seconds of background timer */
  static getTimerRemainingSeconds() {
    return this.#callNative('getTimerRemainingSeconds', 0);
  }

  /** Query if background timer is running */
  static isTimerRunning() {
    return this.#callNative('isTimerRunning', false);
  }

  /** Display system Toast message */
  static showToast(message) {
    this.#callNative('showToast', null, message);
  }

  /** Remove linked Google accounts from device */
  static removeGoogleAccount() {
    this.#callNative('removeGoogleAccount', null);
  }

  /** Check/Query Usage Stats access permission */
  static hasUsageStatsPermission() {
    return this.#callNative('hasUsageStatsPermission', false);
  }

  /** Open Android Usage Access Settings screen */
  static openUsageStatsSettings() {
    this.#callNative('openUsageStatsSettings', null);
  }

  /** Send email asynchronously via native SMTP bridge */
  static sendEmailAsync(toEmail, subject, body, smtpHost, smtpPort, senderEmail, senderPassword, callbackName = null) {
    this.#callNative('sendEmailAsync', null, toEmail, subject, body, smtpHost, smtpPort, senderEmail, senderPassword, callbackName);
  }

  // ==================== TURSO DATABASE & SALES ====================

  /** Get Turso Remote Database URL */
  static getTursoRemoteUrl() {
    return this.#callNative('getTursoRemoteUrl', '');
  }

  /** Set Turso Remote Database URL */
  static setTursoRemoteUrl(url) {
    this.#callNative('setTursoRemoteUrl', null, url);
  }

  /** Get Turso Auth Token */
  static getTursoAuthToken() {
    return this.#callNative('getTursoAuthToken', '');
  }

  /** Set Turso Auth Token */
  static setTursoAuthToken(token) {
    this.#callNative('setTursoAuthToken', null, token);
  }

  /** Get Turso configuration JSON object */
  static getTursoConfig() {
    const result = this.#callNative('getTursoConfig', '{}');
    return safeJsonParse(result, {});
  }

  /** Update Turso credentials */
  static updateTursoConfig(remoteUrl, authToken) {
    this.#callNative('updateTursoConfig', null, remoteUrl, authToken);
  }

  /** Add sales transaction */
  static addSale(id, credit, type) {
    return this.#callNative('addSale', false, id, credit, type);
  }

  /** Get total sales credit for today */
  static getTotalCreditToday() {
    return this.#callNative('getTotalCreditToday', 0.0);
  }

  /** Get total sales credit for yesterday */
  static getTotalCreditYesterday() {
    return this.#callNative('getTotalCreditYesterday', 0.0);
  }

  /** Get total sales credit for the current week */
  static getTotalCreditWeekly() {
    return this.#callNative('getTotalCreditWeekly', 0.0);
  }

  /** Get total sales credit for current month */
  static getTotalCreditMonthly() {
    return this.#callNative('getTotalCreditMonthly', 0.0);
  }

  /** Get sales summary breakdown */
  static getSalesSummary() {
    const result = this.#callNative('getSalesSummary', '{}');
    return safeJsonParse(result, { today: 0, yesterday: 0, weekly: 0, monthly: 0 });
  }

  /** Delete all recorded sales records */
  static deleteAllSales() {
    return this.#callNative('deleteAllSales', false);
  }

  /** Get paginated sales record object */
  static getSalesPaginated(page, limit) {
    const result = this.#callNative('getSalesPaginated', '{}', page, limit);
    return safeJsonParse(result, {});
  }

  // ==================== TELEMETRY & HARDWARE INFO ====================

  /** Get raw ESP32 data string */
  static getEspData() {
    return this.#callNative('getEspData', '');
  }

  /** Set raw ESP32 data string */
  static setEspData(data) {
    return this.#callNative('setEspData', false, data);
  }

  /** Check active internet connection */
  static hasInternetConnection() {
    return this.#callNative('hasInternetConnection', false);
  }

  /** Get CPU core count */
  static getCpuCount() {
    return this.#callNative('getCpuCount', 0);
  }

  /** Get CPU frequency in Hz */
  static getCpuHz() {
    return this.#callNative('getCpuHz', 0);
  }

  /** Get CPU Processor Brand */
  static getCpuBrand() {
    return this.#callNative('getCpuBrand', '');
  }

  /** Get CPU Processor Model */
  static getCpuModel() {
    return this.#callNative('getCpuModel', '');
  }

  /** Get system RAM size in MB */
  static getRamMb() {
    return this.#callNative('getRamMb', 0);
  }

  /** Get current RAM usage percentage */
  static getRamPercent() {
    return this.#callNative('getRamPercent', 0);
  }

  /** Get CPU Temperature in °C */
  static getCpuTemp() {
    return this.#callNative('getCpuTemp', 0.0);
  }

  /** Get screen refresh rate (Hz) */
  static getScreenRefreshRate() {
    return this.#callNative('getScreenRefreshRate', 0.0);
  }

  /** Get Wi-Fi IP address */
  static getWifiIpAddress() {
    return this.#callNative('getWifiIpAddress', '');
  }

  /** Get Ethernet IP address */
  static getEthernetIpAddress() {
    return this.#callNative('getEthernetIpAddress', '');
  }

  /** Get Wi-Fi MAC address */
  static getWifiMacAddress() {
    return this.#callNative('getWifiMacAddress', '');
  }

  /** Get Ethernet MAC address */
  static getEthernetMacAddress() {
    return this.#callNative('getEthernetMacAddress', '');
  }

  /** Get Hardware Serial Number */
  static getDeviceSerial() {
    return this.#callNative('getDeviceSerial', '');
  }

  /** Get OS Version */
  static getOsVersion() {
    return this.#callNative('getOsVersion', '');
  }

  /** Get Android SDK API Level */
  static getSdkInt() {
    return this.#callNative('getSdkInt', 0);
  }

  /** Get Device Model */
  static getDeviceModel() {
    return this.#callNative('getDeviceModel', '');
  }

  /** Get Manufacturer Name */
  static getManufacturer() {
    return this.#callNative('getManufacturer', '');
  }

  /** Get Application Version */
  static getAppVersion() {
    return this.#callNative('getAppVersion', '');
  }

  /** Get Battery Percentage */
  static getBatteryLevel() {
    return this.#callNative('getBatteryLevel', 0);
  }

  /** Query charging status */
  static isCharging() {
    return this.#callNative('isCharging', false);
  }
}