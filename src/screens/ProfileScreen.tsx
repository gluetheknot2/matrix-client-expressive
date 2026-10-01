import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Text, Button, useTheme, Divider } from 'react-native-paper';

const ProfileScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Avatar.Text
          size={80}
          label="MC"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <Text variant="headlineSmall" style={styles.name}>
          Matrix Client
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          @matrix:example.com
        </Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text variant="titleMedium" style={{ marginBottom: 12 }}>
          Device
        </Text>
        <View style={styles.infoRow}>
          <Text variant="bodySmall">Device ID</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            ABCD1234
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="bodySmall">Last Seen</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            Just now
          </Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Button mode="outlined" onPress={() => {}}>
          Backup Credentials
        </Button>
        <Button mode="outlined" style={{ marginTop: 8 }} onPress={() => {}}>
          Restore from Backup
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 8 }}
          buttonColor={theme.colors.error}
          onPress={() => {}}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  name: {
    marginTop: 12,
  },
  divider: {
    marginVertical: 8,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default ProfileScreen;
