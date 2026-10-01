/**
 * Backup & Restore utilities for credential management
 * Allows users to export/import encrypted credential vaults
 */

export class BackupManager {
  /**
   * Create a backup file from credential manager
   */
  static createBackup(credentialManager, filename = null) {
    const backup = credentialManager.exportBackup();
    const defaultName = `matrix-backup-${new Date().toISOString().split('T')[0]}.json`;
    const finalName = filename || defaultName;
    
    // Create download link
    const blob = new Blob([backup], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return finalName;
  }

  /**
   * Restore from backup file
   */
  static async restoreBackup(file, credentialManager) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const backupData = e.target.result;
          const success = credentialManager.importBackup(backupData);
          
          if (success) {
            resolve({
              success: true,
              message: 'Backup restored successfully'
            });
          } else {
            reject(new Error('Failed to restore backup'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read backup file'));
      reader.readAsText(file);
    });
  }

  /**
   * Validate backup file format
   */
  static validateBackup(backupJson) {
    try {
      const backup = JSON.parse(backupJson);
      
      if (!backup.version || backup.version !== 1) {
        throw new Error('Unsupported backup version');
      }
      
      if (!backup.vault || !backup.vault.credentials) {
        throw new Error('Invalid backup structure');
      }
      
      return { valid: true, version: backup.version };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  /**
   * Get backup metadata
   */
  static getBackupMetadata(backupJson) {
    try {
      const backup = JSON.parse(backupJson);
      const credentials = backup.vault.credentials || {};
      
      return {
        exportedAt: backup.exportedAt,
        version: backup.version,
        credentialCount: Object.keys(credentials).length,
        servers: Object.keys(credentials)
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Encrypt backup with additional password
   */
  static encryptBackupFile(backupJson, additionalPassword) {
    // Optional: Add extra encryption layer if needed
    // For now, credentials are already encrypted in the backup
    return backupJson;
  }
}

export default BackupManager;
