import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'matrix_credentials_vault';
const ENCRYPTION_PREFIX = 'ENC:';

/**
 * Credential storage with encryption support
 */
export class CredentialManager {
  constructor(masterPassword = null) {
    this.masterPassword = masterPassword;
    this.vault = this.loadVault();
  }

  /**
   * Set master password for encryption
   */
  setMasterPassword(password) {
    this.masterPassword = password;
  }

  /**
   * Encrypt sensitive data
   */
  encrypt(data) {
    if (!this.masterPassword) {
      throw new Error('Master password not set. Cannot encrypt.');
    }
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, this.masterPassword).toString();
    return ENCRYPTION_PREFIX + encrypted;
  }

  /**
   * Decrypt sensitive data
   */
  decrypt(encryptedData) {
    if (!this.masterPassword) {
      throw new Error('Master password not set. Cannot decrypt.');
    }
    if (!encryptedData.startsWith(ENCRYPTION_PREFIX)) {
      throw new Error('Invalid encrypted data format.');
    }
    const encrypted = encryptedData.slice(ENCRYPTION_PREFIX.length);
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.masterPassword).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }

  /**
   * Save credentials for a homeserver
   */
  saveCredentials(homeserver, userId, accessToken, deviceId, pickleKey = null) {
    if (!this.masterPassword) {
      throw new Error('Master password required for credential storage.');
    }

    const credential = {
      homeserver,
      userId,
      accessToken,
      deviceId,
      pickleKey,
      savedAt: new Date().toISOString()
    };

    this.vault.credentials = this.vault.credentials || {};
    this.vault.credentials[homeserver] = this.encrypt(credential);
    this.saveVault();
    return true;
  }

  /**
   * Retrieve credentials for a homeserver
   */
  getCredentials(homeserver) {
    if (!this.masterPassword) {
      throw new Error('Master password required to access credentials.');
    }

    const encrypted = this.vault.credentials?.[homeserver];
    if (!encrypted) return null;

    try {
      return this.decrypt(encrypted);
    } catch (e) {
      console.error('Failed to decrypt credentials:', e);
      return null;
    }
  }

  /**
   * List all saved homeservers
   */
  listHomeservers() {
    return Object.keys(this.vault.credentials || {});
  }

  /**
   * Delete credentials for a homeserver
   */
  deleteCredentials(homeserver) {
    if (this.vault.credentials?.[homeserver]) {
      delete this.vault.credentials[homeserver];
      this.saveVault();
      return true;
    }
    return false;
  }

  /**
   * Export vault as encrypted JSON for backup
   */
  exportBackup() {
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      vault: this.vault
    }, null, 2);
  }

  /**
   * Import vault from encrypted JSON backup
   */
  importBackup(backupJson) {
    try {
      const backup = JSON.parse(backupJson);
      if (backup.version !== 1) {
        throw new Error('Unsupported backup version.');
      }
      this.vault = backup.vault;
      this.saveVault();
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  }

  /**
   * Load vault from localStorage
   */
  loadVault() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { credentials: {} };
    } catch (e) {
      console.error('Failed to load vault:', e);
      return { credentials: {} };
    }
  }

  /**
   * Save vault to localStorage
   */
  saveVault() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.vault));
    } catch (e) {
      console.error('Failed to save vault:', e);
    }
  }

  /**
   * Clear all credentials
   */
  clearAll() {
    this.vault = { credentials: {} };
    localStorage.removeItem(STORAGE_KEY);
  }
}

export default CredentialManager;
