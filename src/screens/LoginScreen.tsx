import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme
} from 'react-native-paper';
import { CredentialManager } from '../utils/credentials';

const LoginScreen = ({ onLoginSuccess }: any) => {
  const theme = useTheme();
  const [homeserver, setHomeserver] = useState('https://matrix.org');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password || !masterPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsLoading(true);
    try {
      const credMgr = new CredentialManager(masterPassword);
      const userId = `@${username}:matrix.org`;

      await credMgr.saveCredentials(
        homeserver,
        userId,
        'mock_token_' + Math.random().toString(36).substr(2, 9),
        'DEVICE_ID'
      );

      onLoginSuccess();
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.header}>
        <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
          Matrix Client
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Expressive
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Homeserver URL"
          value={homeserver}
          onChangeText={setHomeserver}
          mode="outlined"
          placeholder="https://matrix.org"
          editable={!isLoading}
          style={styles.input}
        />

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          editable={!isLoading}
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          editable={!isLoading}
          style={styles.input}
        />

        <TextInput
          label="Master Password"
          value={masterPassword}
          onChangeText={setMasterPassword}
          mode="outlined"
          secureTextEntry
          placeholder="For credential encryption"
          editable={!isLoading}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          disabled={isLoading}
          style={styles.button}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  form: {
    gap: 12,
  },
  input: {
    marginVertical: 6,
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
});

export default LoginScreen;
