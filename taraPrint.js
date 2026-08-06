/**
 * PrinterService - Web Interface for Android's PrinterBridge
 */
export class PrinterService {

  /**
   * Helper to safely check if the Android Native Bridge is available
   */
  static isBridgeAvailable() {
    if (typeof window.PrinterBridge === 'undefined') {
      console.error("PrinterBridge native interface is NOT available!");
      return false;
    }
    return true;
  }

  // ==========================================
  // 🔍 PRINTER DISCOVERY & SETTINGS
  // ==========================================

  /**
   * Discovers both Network (mDNS) and Paired Classic Bluetooth (SPP) printers.
   * @param {number} timeoutMs Discovery timeout in milliseconds (default: 3000)
   * @returns {Array<Object>} List of discovered printer objects
   */
  static getDiscoveredPrinters(timeoutMs = 3000) {
    if (!this.isBridgeAvailable()) return [];

    try {
      const jsonString = window.PrinterBridge.listDiscoveredPrinters(timeoutMs);
      return JSON.parse(jsonString || "[]");
    } catch (error) {
      console.error("Failed to parse discovered printers:", error);
      return [];
    }
  }

  /**
   * Opens Android System Print Services Settings
   */
  static openPrintSettings() {
    if (this.isBridgeAvailable()) {
      window.PrinterBridge.openPrintSettings();
    }
  }

  /**
   * Opens Android System Bluetooth Settings
   */
  static openBluetoothSettings() {
    if (this.isBridgeAvailable()) {
      window.PrinterBridge.openBluetoothSettings();
    }
  }

  // ==========================================
  // 🖨️ SYSTEM PRINTING (Documents / PDFs / Images)
  // ==========================================

  /**
   * Prints a document stored inside the Android app's Secure Storage.
   * 
   * @param {string} fileName Name of the file inside SecureStorage (e.g. "receipt_123.pdf")
   * @param {string} jobName Title displayed in the Android print spooler
   * @param {string} paperSize Options: "A4", "LETTER", "LEGAL", "EXECUTIVE", "A3", "A5", "B5"
   * @param {string} colorMode Options: "COLOR" or "MONO" / "MONOCHROME"
   * @returns {boolean} True if sent to spooler successfully
   */
  static printFromSecureStorage(
    fileName,
    jobName = "Kiosk Print Job",
    paperSize = "A4",
    colorMode = "COLOR"
  ) {
    if (!this.isBridgeAvailable()) return false;
    return window.PrinterBridge.printFromSecureStorage(fileName, jobName, paperSize, colorMode);
  }

  /**
   * Prints raw binary data (PDF/Image) directly passed as a Base64 string.
   * 
   * @param {string} base64Data Raw binary or data URL Base64 string
   * @param {string} jobName Title displayed in the Android print spooler
   * @param {string} paperSize Options: "A4", "LETTER", "LEGAL", "EXECUTIVE", "A3", "A5", "B5"
   * @param {string} colorMode Options: "COLOR" or "MONO" / "MONOCHROME"
   * @returns {boolean} True if sent to spooler successfully
   */
  static printDirectBinary(
    base64Data,
    jobName = "Direct Print",
    paperSize = "A4",
    colorMode = "COLOR"
  ) {
    if (!this.isBridgeAvailable()) return false;
    return window.PrinterBridge.printDirectBinary(base64Data, jobName, paperSize, colorMode);
  }

  // ==========================================
  // 🧾 THERMAL RECEIPT PRINTING (ESC/POS)
  // ==========================================

  /**
   * Sends ESC/POS receipt commands over Classic Bluetooth (SPP)
   * 
   * @param {string} macAddress Bluetooth MAC Address (e.g. "00:11:22:33:44:55")
   * @param {string} base64EscPosData Base64 encoded string of raw ESC/POS bytes
   * @returns {boolean} True if print job initiated
   */
  static printThermalBluetooth(macAddress, base64EscPosData) {
    if (!this.isBridgeAvailable()) return false;
    return window.PrinterBridge.printThermalBluetooth(macAddress, base64EscPosData);
  }

  /**
   * Sends ESC/POS receipt commands over Local Wi-Fi / LAN Network
   * 
   * @param {string} ipAddress Target printer IP address (e.g. "192.168.1.100")
   * @param {number} port RAW Socket Port (Default: 9100)
   * @param {string} base64EscPosData Base64 encoded string of raw ESC/POS bytes
   * @returns {boolean} True if print job initiated
   */
  static printThermalNetwork(ipAddress, port = 9100, base64EscPosData) {
    if (!this.isBridgeAvailable()) return false;
    return window.PrinterBridge.printThermalNetwork(ipAddress, port, base64EscPosData);
  }

  /**
   * Prints an ESC/POS command file stored inside SecureStorage over Network
   * 
   * @param {string} fileName Name of the file in SecureStorage
   * @param {string} ipAddress Target printer IP address
   * @param {number} port RAW Socket Port (Default: 9100)
   * @returns {boolean} True if print job initiated
   */
  static printSecureFileToThermal(fileName, ipAddress, port = 9100) {
    if (!this.isBridgeAvailable()) return false;
    return window.PrinterBridge.printSecureFileToThermal(fileName, ipAddress, port);
  }
}