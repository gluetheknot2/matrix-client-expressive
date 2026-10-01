import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_SETTINGS = {
  theme: 'light',
  fontSize: 'normal',
  compactMode: false,
  showOnlineStatus: true,
  encryptionEnabled: true,
  autoLogin: false,
  syncInterval: 3000,
  messageLimit: 50,
  typingIndicators: true,
  readReceipts: true,
  notificationsEnabled: true,
  notificationSound: true,
  language: 'en',
  trayMinimize: true,
  startMinimized: false,
  enableSpellcheck: true,
  proxyEnabled: false,
  proxyUrl: ''
};

export const useSettings = create(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      
      setSetting: (key, value) => set((state) => ({
        settings: {
          ...state.settings,
          [key]: value
        }
      })),
      
      updateSettings: (newSettings) => set((state) => ({
        settings: {
          ...state.settings,
          ...newSettings
        }
      })),
      
      getSetting: (key) => ((state) => state.settings[key]),
      
      resetToDefaults: () => set({
        settings: DEFAULT_SETTINGS
      })
    }),
    {
      name: 'matrix-client-settings',
      storage: localStorage
    }
  )
);

export default useSettings;
