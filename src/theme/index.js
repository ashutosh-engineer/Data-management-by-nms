import { createTheme } from '@emotion/react';

// Professional color palette
export const palette = {
  primary: {
    main: '#2A5F7A',
    light: '#5686A2',
    dark: '#1F4559',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#E87D51',
    light: '#FF9F75',
    dark: '#C25E34',
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#F9C77C',
    light: '#FFEBB0',
    dark: '#D4A54E',
    contrastText: '#333333',
  },
  neutral: {
    100: '#FFFFFF',
    200: '#F8F9FC',
    300: '#E9ECF2',
    400: '#D0D5DE',
    500: '#9DA4B2',
    600: '#6B7280',
    700: '#4B5563',
    800: '#343A46',
    900: '#1F232B',
  },
  text: {
    primary: '#1F232B',
    secondary: '#4B5563',
    disabled: '#9DA4B2',
    hint: '#6B7280',
  },
  background: {
    default: '#F8F9FC',
    paper: '#FFFFFF',
  },
  error: {
    main: '#E53935',
    light: '#FF6B67',
    dark: '#AB000D',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFB74D',
    light: '#FFE97D',
    dark: '#C88719',
    contrastText: '#333333',
  },
  success: {
    main: '#43A047',
    light: '#76D275',
    dark: '#00701A',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#039BE5',
    light: '#63CCFF',
    dark: '#006DB3',
    contrastText: '#FFFFFF',
  },
};

// Typography system
const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  h1: {
    fontSize: '3.5rem',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: '-0.015em',
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.35,
    letterSpacing: '-0.005em',
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: 0,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: 1.45,
    letterSpacing: 0,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: 0,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: 0,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.03em',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    textTransform: 'none',
  },
};

// Spacing system (in pixels)
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Shadows
const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
};

// Border radius values
const borderRadius = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  round: '50%',
};

// Transitions
const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  medium: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
};

// Breakpoints
const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
};

// Combine everything into a theme
const theme = {
  palette,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
};

export default theme; 