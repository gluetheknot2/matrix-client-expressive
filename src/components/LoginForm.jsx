import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

export const LoginForm = ({ onLogin, isLoading = false, error = null }) => {
  const [formData, setFormData] = useState({
    homeserver: 'https://matrix.org',
    username: '',
    password: '',
    masterPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <LockIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="headlineLarge" component="h1">
              Matrix Client
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Homeserver URL"
              name="homeserver"
              type="url"
              value={formData.homeserver}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="https://matrix.org"
            />
            
            <TextField
              fullWidth
              label="Username or User ID"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="username"
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="current-password"
            />
            
            <TextField
              fullWidth
              label="Master Password (for credential storage)"
              name="masterPassword"
              type="password"
              value={formData.masterPassword}
              onChange={handleChange}
              disabled={isLoading}
              helperText="Used to encrypt and backup your login credentials"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading || !formData.username || !formData.password}
              sx={{ mt: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
