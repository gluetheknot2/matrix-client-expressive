import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const MATERIAL3_COLORS = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005E',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1E192B',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',
  background: '#FFFBFE',
  onBackground: '#1C1B1F',
  surface: '#FFFBFE',
  onSurface: '#1C1B1F',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454E',
  outline: '#79747E',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: MATERIAL3_COLORS.primary,
    onPrimary: MATERIAL3_COLORS.onPrimary,
    primaryContainer: MATERIAL3_COLORS.primaryContainer,
    secondary: MATERIAL3_COLORS.secondary,
    tertiary: MATERIAL3_COLORS.tertiary,
    error: MATERIAL3_COLORS.error,
    background: MATERIAL3_COLORS.background,
    surface: MATERIAL3_COLORS.surface,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: MATERIAL3_COLORS.primary,
    onPrimary: MATERIAL3_COLORS.onPrimary,
    primaryContainer: MATERIAL3_COLORS.primaryContainer,
    secondary: MATERIAL3_COLORS.secondary,
    tertiary: MATERIAL3_COLORS.tertiary,
    error: MATERIAL3_COLORS.error,
  },
};

export const createMaterial3Theme = (isDark: boolean) => {
  return isDark ? darkTheme : lightTheme;
};
