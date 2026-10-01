import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'matrix_credentials_vault';
const ENCRYPTION_PREFIX = 'ENC:';

export class CredentialManager {
  private masterPassword: string | null = null;
  private vault: any = {};

  constructor(masterPassword: string | null = null) {
    this.masterPassword = masterPassword;
  }

  setMasterPassword(password: string) {
    this.masterPassword = password;
  }

  private encrypt(data: any): string {
    if (!this.masterPassword) throw new Error('Master password not set');
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, this.masterPassword).toString();
    return ENCRYPTION_PREFIX + encrypted;
  }

  private decrypt(encryptedData: string): any {
    if (!this.masterPassword) throw new Error('Master password not set');
    if (!encryptedData.startsWith(ENCRYPTION_PREFIX)) {
      throw new Error('Invalid encrypted data format');
    }
    const encrypted = encryptedData.slice(ENCRYPTION_PREFIX.length);
    const decrypted = CryptoJS.AES.decrypt(encrypted, this.masterPassword).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(decrypted);
  }

  async saveCredentials(
    homeserver: string,
    userId: string,
    accessToken: string,
    deviceId: string,
    pickleKey?: string
  ) {
    if (!this.masterPassword) throw new Error('Master password required');

    const vault = await this.loadVault();
    const credential = {
      homeserver,
      userId,
      accessToken,
      deviceId,
      pickleKey,
      savedAt: new Date().toISOString()
    };

    vault.credentials = vault.credentials || {};
    vault.credentials[homeserver] = this.encrypt(credential);
    await this.saveVault(vault);
    return true;
  }

  async getCredentials(homeserver: string) {
    if (!this.masterPassword) throw new Error('Master password required');
    const vault = await this.loadVault();
    const encrypted = vault.credentials?.[homeserver];
    if (!encrypted) return null;

    try {
      return this.decrypt(encrypted);
    } catch (e) {
      console.error('Failed to decrypt:', e);
      return null;
    }
  }

  async listHomeservers() {
    const vault = await this.loadVault();
    return Object.keys(vault.credentials || {});
  }

  async deleteCredentials(homeserver: string) {
    const vault = await this.loadVault();
    if (vault.credentials?.[homeserver]) {
      delete vault.credentials[homeserver];
      await this.saveVault(vault);
      return true;
    }
    return false;
  }

  async exportBackup() {
    const vault = await this.loadVault();
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      vault
    }, null, 2);
  }

  async importBackup(backupJson: string) {
    try {
      const backup = JSON.parse(backupJson);
      if (backup.version !== 1) throw new Error('Unsupported version');
      await this.saveVault(backup.vault);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  private async loadVault() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { credentials: {} };
    } catch (e) {
      return { credentials: {} };
    }
  }

  private async saveVault(vault: any) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vault));
    } catch (e) {
      console.error('Save vault failed:', e);
    }
  }

  async clearAll() {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export default CredentialManager;
