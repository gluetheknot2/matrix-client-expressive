/**
 * Restore UI Dialog Component
 * For importing previously exported backup files
 */

import React, { useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Box,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { BackupManager } from '../utils/backup';

export const RestoreDialog = ({ open, onClose, credentialManager, onRestoreSuccess }) => {
  const fileInputRef = useRef(null);
  const [isRestoring, setIsRestoring] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleRestore = async () => {
    if (!selectedFile || !credentialManager) return;
    
    setIsRestoring(true);
    setError(null);
    
    try {
      await BackupManager.restoreBackup(selectedFile, credentialManager);
      onRestoreSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Restore from Backup</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'primary.main',
            cursor: 'pointer',
            mb: 2,
            '&:hover': { bgcolor: 'action.hover' }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="titleMedium">Click to select backup file</Typography>
          <Typography variant="bodySmall" color="textSecondary">
            or drag and drop
          </Typography>
        </Paper>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        {selectedFile && (
          <Box sx={{ mb: 2, p: 1, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography variant="labelSmall">
              ✓ File selected: {selectedFile.name}
            </Typography>
          </Box>
        )}
        
        <Typography variant="bodySmall" color="textSecondary">
          Select a backup file (matrix-backup-*.json) to restore your credentials.
          The backup is encrypted and requires your master password to decrypt.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isRestoring}>Cancel</Button>
        <Button
          onClick={handleRestore}
          variant="contained"
          disabled={!selectedFile || isRestoring}
        >
          {isRestoring ? <CircularProgress size={24} /> : 'Restore'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestoreDialog;
