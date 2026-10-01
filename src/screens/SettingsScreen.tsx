import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Switch, List, Divider, useTheme } from 'react-native-paper';
import { useSettings } from '../store/settings';

const SettingsScreen = () => {
  const theme = useTheme();
  const { settings, setSetting } = useSettings();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          left={() => <List.Icon icon="moon-waning-crescent" />}
          right={() => (
            <Switch
              value={settings.theme === 'dark'}
              onValueChange={(v) => setSetting('theme', v ? 'dark' : 'light')}
            />
          )}
        />
        <List.Item
          title="Compact Mode"
          left={() => <List.Icon icon="compress" />}
          right={() => (
            <Switch
              value={settings.compactMode}
              onValueChange={(v) => setSetting('compactMode', v)}
            />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Privacy & Security</List.Subheader>
        <List.Item
          title="End-to-End Encryption"
          left={() => <List.Icon icon="lock" />}
          right={() => (
            <Switch
              value={settings.encryptionEnabled}
              onValueChange={(v) => setSetting('encryptionEnabled', v)}
            />
          )}
        />
        <List.Item
          title="Show Online Status"
          left={() => <List.Icon icon="eye" />}
          right={() => (
            <Switch
              value={settings.showOnlineStatus}
              onValueChange={(v) => setSetting('showOnlineStatus', v)}
            />
          )}
        />
        <List.Item
          title="Send Read Receipts"
          left={() => <List.Icon icon="check-double" />}
          right={() => (
            <Switch
              value={settings.readReceipts}
              onValueChange={(v) => setSetting('readReceipts', v)}
            />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Enable Notifications"
          left={() => <List.Icon icon="bell" />}
          right={() => (
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={(v) => setSetting('notificationsEnabled', v)}
            />
          )}
        />
        <List.Item
          title="Notification Sound"
          left={() => <List.Icon icon="speaker" />}
          right={() => (
            <Switch
              value={settings.notificationSound}
              onValueChange={(v) => setSetting('notificationSound', v)}
            />
          )}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
