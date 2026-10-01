import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
};

export const useSettings = create(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      setSetting: (key, value) => set((state) => ({
        settings: { ...state.settings, [key]: value }
      })),
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      resetToDefaults: () => set({ settings: DEFAULT_SETTINGS })
    }),
    {
      name: 'matrix-settings',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
