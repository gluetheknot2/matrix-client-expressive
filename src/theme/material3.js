import { createTheme } from '@mui/material/styles';

const MATERIAL3_EXPRESSIVE = {
  tokens: {
    // Primary
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005E',
    
    // Secondary
    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1E192B',
    
    // Tertiary
    tertiary: '#7D5260',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFD8E4',
    onTertiaryContainer: '#31111D',
    
    // Error
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',
    
    // Neutral
    background: '#FFFBFE',
    onBackground: '#1C1B1F',
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454E',
    
    // Outline
    outline: '#79747E',
    outlineVariant: '#CAC7D0'
  },
  shapes: {
    small: 8,
    medium: 12,
    large: 16
  },
  typography: {
    displayLarge: { size: 57, weight: 400, lineHeight: 1.3 },
    displayMedium: { size: 45, weight: 400, lineHeight: 1.25 },
    displaySmall: { size: 36, weight: 400, lineHeight: 1.2 },
    headlineLarge: { size: 32, weight: 400, lineHeight: 1.2 },
    headlineMedium: { size: 28, weight: 400, lineHeight: 1.15 },
    headlineSmall: { size: 24, weight: 400, lineHeight: 1.17 },
    titleLarge: { size: 22, weight: 500, lineHeight: 1.27 },
    titleMedium: { size: 16, weight: 500, lineHeight: 1.5 },
    titleSmall: { size: 14, weight: 500, lineHeight: 1.43 },
    bodyLarge: { size: 16, weight: 400, lineHeight: 1.5 },
    bodyMedium: { size: 14, weight: 400, lineHeight: 1.43 },
    bodySmall: { size: 12, weight: 400, lineHeight: 1.33 },
    labelLarge: { size: 14, weight: 500, lineHeight: 1.43 },
    labelMedium: { size: 12, weight: 500, lineHeight: 1.33 },
    labelSmall: { size: 11, weight: 500, lineHeight: 1.45 }
  }
};

export const createMaterial3Theme = (isDark = false) => {
  const tokens = MATERIAL3_EXPRESSIVE.tokens;
  
  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: { main: tokens.primary },
      secondary: { main: tokens.secondary },
      background: { default: tokens.background },
      surface: { main: tokens.surface },
      error: { main: tokens.error }
    },
    shape: {
      borderRadius: MATERIAL3_EXPRESSIVE.shapes.medium
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: MATERIAL3_EXPRESSIVE.typography.displayLarge.size, fontWeight: MATERIAL3_EXPRESSIVE.typography.displayLarge.weight },
      h2: { fontSize: MATERIAL3_EXPRESSIVE.typography.headlineLarge.size, fontWeight: MATERIAL3_EXPRESSIVE.typography.headlineLarge.weight },
      body1: { fontSize: MATERIAL3_EXPRESSIVE.typography.bodyLarge.size }
    }
  });
};

export default MATERIAL3_EXPRESSIVE;
