import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Divider,
  Box,
  Typography
} from '@mui/material';
import { useSettings } from '../store/settings';

export const SettingsPanel = ({ open, onClose }) => {
  const { settings, setSetting } = useSettings();

  const handleSettingChange = (key, value) => {
    setSetting(key, value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Appearance */}
          <Box>
            <Typography variant="titleMedium" sx={{ mb: 2 }}>Appearance</Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Theme</InputLabel>
              <Select
                value={settings.theme}
                label="Theme"
                onChange={(e) => handleSettingChange('theme', e.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="auto">Auto</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Font Size</InputLabel>
              <Select
                value={settings.fontSize}
                label="Font Size"
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.compactMode}
                  onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                />
              }
              label="Compact Mode"
            />
          </Box>
          
          <Divider />
          
          {/* Notifications */}
          <Box>
            <Typography variant="titleMedium" sx={{ mb: 2 }}>Notifications</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notificationsEnabled}
                  onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                />
              }
              label="Enable Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notificationSound}
                  onChange={(e) => handleSettingChange('notificationSound', e.target.checked)}
                />
              }
              label="Notification Sound"
            />
          </Box>
          
          <Divider />
          
          {/* Privacy */}
          <Box>
            <Typography variant="titleMedium" sx={{ mb: 2 }}>Privacy & Security</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.encryptionEnabled}
                  onChange={(e) => handleSettingChange('encryptionEnabled', e.target.checked)}
                />
              }
              label="End-to-End Encryption"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showOnlineStatus}
                  onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
                />
              }
              label="Show Online Status"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.readReceipts}
                  onChange={(e) => handleSettingChange('readReceipts', e.target.checked)}
                />
              }
              label="Send Read Receipts"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsPanel;
