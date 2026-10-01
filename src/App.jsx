import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Button, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { createMaterial3Theme } from './theme/material3';
import { LoginForm } from './components/LoginForm';
import { ChatWindow } from './components/ChatWindow';
import { SettingsPanel } from './components/SettingsPanel';
import { CredentialManager } from './utils/credentials';
import { useSettings } from './store/settings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [credentialManager, setCredentialManager] = useState(null);
  const { settings } = useSettings();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const theme = React.useMemo(
    () => createMaterial3Theme(settings.theme === 'dark'),
    [settings.theme]
  );

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      if (!formData.masterPassword) {
        throw new Error('Master password is required for credential storage');
      }

      // Initialize credential manager with master password
      const credMgr = new CredentialManager(formData.masterPassword);
      setCredentialManager(credMgr);

      // Mock login - in production, connect to Matrix homeserver
      const userId = `@${formData.username}:matrix.org`;
      
      // Save credentials
      credMgr.saveCredentials(
        formData.homeserver,
        userId,
        'mock_access_token_' + Math.random().toString(36).substr(2, 9),
        'DEVICE_ID'
      );

      setCurrentUser({
        userId,
        homeserver: formData.homeserver,
        displayName: formData.username
      });
      
      setIsLoggedIn(true);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (credentialManager) {
      // Optional: clear credentials on logout
      // credentialManager.deleteCredentials(currentUser.homeserver);
    }
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMessages([]);
    setSelectedRoom(null);
  };

  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginForm
          onLogin={handleLogin}
          isLoading={isLoading}
          error={loginError}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <span>Matrix Client - {currentUser?.displayName}</span>
            </Box>
            <IconButton
              color="inherit"
              onClick={() => setSettingsOpen(true)}
              title="Settings"
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar - Rooms List */}
          <Box
            sx={{
              width: 250,
              borderRight: '1px solid',
              borderColor: 'divider',
              overflow: 'auto',
              p: 1
            }}
          >
            <Box sx={{ fontWeight: 'bold', mb: 2, p: 1 }}>Rooms</Box>
            {/* Mock rooms */}
            {['General', 'Random', 'Dev'].map((room) => (
              <Button
                key={room}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  mb: 1,
                  bgcolor: selectedRoom?.name === room ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
                onClick={() => setSelectedRoom({ name: room })}
              >
                # {room}
              </Button>
            ))}
          </Box>

          {/* Chat Window */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <ChatWindow
              room={selectedRoom}
              messages={messages}
              onSendMessage={(msg) => {
                setMessages([...messages, {
                  sender: currentUser.displayName,
                  body: msg,
                  timestamp: new Date().toISOString()
                }]);
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Settings Panel */}
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </ThemeProvider>
  );
}

export default App;
