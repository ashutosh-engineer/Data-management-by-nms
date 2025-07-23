import { createGlobalStyle } from 'styled-components';
import theme from './index';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  :root {
    --primary-main: ${theme.palette.primary.main};
    --primary-light: ${theme.palette.primary.light};
    --primary-dark: ${theme.palette.primary.dark};
    --secondary-main: ${theme.palette.secondary.main};
    --secondary-light: ${theme.palette.secondary.light};
    --secondary-dark: ${theme.palette.secondary.dark};
    --accent-main: ${theme.palette.accent.main};
    --accent-light: ${theme.palette.accent.light};
    --accent-dark: ${theme.palette.accent.dark};
    --neutral-100: ${theme.palette.neutral[100]};
    --neutral-200: ${theme.palette.neutral[200]};
    --neutral-300: ${theme.palette.neutral[300]};
    --neutral-400: ${theme.palette.neutral[400]};
    --neutral-500: ${theme.palette.neutral[500]};
    --neutral-600: ${theme.palette.neutral[600]};
    --neutral-700: ${theme.palette.neutral[700]};
    --neutral-800: ${theme.palette.neutral[800]};
    --neutral-900: ${theme.palette.neutral[900]};
    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-xl: ${theme.shadows.xl};
    --radius-xs: ${theme.borderRadius.xs};
    --radius-sm: ${theme.borderRadius.sm};
    --radius-md: ${theme.borderRadius.md};
    --radius-lg: ${theme.borderRadius.lg};
    --radius-xl: ${theme.borderRadius.xl};
    --space-xs: ${theme.spacing.xs}px;
    --space-sm: ${theme.spacing.sm}px;
    --space-md: ${theme.spacing.md}px;
    --space-lg: ${theme.spacing.lg}px;
    --space-xl: ${theme.spacing.xl}px;
    --space-xxl: ${theme.spacing.xxl}px;
    --space-xxxl: ${theme.spacing.xxxl}px;
    --transition-fast: ${theme.transitions.fast};
    --transition-medium: ${theme.transitions.medium};
    --transition-slow: ${theme.transitions.slow};
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${theme.palette.text.primary};
    background-color: ${theme.palette.background.default};
    line-height: 1.5;
    overflow-x: hidden;
    
    /* Hide scrollbar but maintain functionality */
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      background: transparent;
    }
    
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${theme.palette.text.primary};
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: ${theme.palette.primary.main};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  button {
    font-family: inherit;
  }
  
  /* Custom scrollbar for elements that need it */
  .custom-scrollbar {
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.palette.neutral[300]};
      border-radius: 4px;
    }
    
    scrollbar-width: thin;
    scrollbar-color: ${theme.palette.neutral[300]} transparent;
  }
  
  /* Animation optimizations */
  * {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  h1 {
    font-size: ${theme.typography.h1.fontSize};
    font-weight: ${theme.typography.h1.fontWeight};
    line-height: ${theme.typography.h1.lineHeight};
    letter-spacing: ${theme.typography.h1.letterSpacing};
    margin-bottom: var(--space-lg);
  }
  
  h2 {
    font-size: ${theme.typography.h2.fontSize};
    font-weight: ${theme.typography.h2.fontWeight};
    line-height: ${theme.typography.h2.lineHeight};
    letter-spacing: ${theme.typography.h2.letterSpacing};
    margin-bottom: var(--space-md);
  }
  
  h3 {
    font-size: ${theme.typography.h3.fontSize};
    font-weight: ${theme.typography.h3.fontWeight};
    line-height: ${theme.typography.h3.lineHeight};
    letter-spacing: ${theme.typography.h3.letterSpacing};
    margin-bottom: var(--space-md);
  }
  
  h4 {
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.h4.fontWeight};
    line-height: ${theme.typography.h4.lineHeight};
    letter-spacing: ${theme.typography.h4.letterSpacing};
    margin-bottom: var(--space-sm);
  }
  
  h5 {
    font-size: ${theme.typography.h5.fontSize};
    font-weight: ${theme.typography.h5.fontWeight};
    line-height: ${theme.typography.h5.lineHeight};
    letter-spacing: ${theme.typography.h5.letterSpacing};
    margin-bottom: var(--space-sm);
  }
  
  h6 {
    font-size: ${theme.typography.h6.fontSize};
    font-weight: ${theme.typography.h6.fontWeight};
    line-height: ${theme.typography.h6.lineHeight};
    letter-spacing: ${theme.typography.h6.letterSpacing};
    margin-bottom: var(--space-sm);
  }
  
  p {
    margin-bottom: var(--space-md);
    font-size: ${theme.typography.body1.fontSize};
    line-height: ${theme.typography.body1.lineHeight};
  }
  
  a {
    color: ${theme.palette.primary.main};
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: ${theme.palette.primary.dark};
    }
  }
  
  button {
    font-family: ${theme.typography.fontFamily};
    cursor: pointer;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  ul, ol {
    margin-bottom: var(--space-md);
    padding-left: var(--space-lg);
  }
  
  li {
    margin-bottom: var(--space-xs);
  }
  
  /* Container utility class */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
  }
  
  /* Flexbox utility classes */
  .flex {
    display: flex;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .items-center {
    align-items: center;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .justify-between {
    justify-content: space-between;
  }
  
  .flex-wrap {
    flex-wrap: wrap;
  }
  
  /* Spacing utility classes */
  .mt-xs { margin-top: var(--space-xs); }
  .mt-sm { margin-top: var(--space-sm); }
  .mt-md { margin-top: var(--space-md); }
  .mt-lg { margin-top: var(--space-lg); }
  .mt-xl { margin-top: var(--space-xl); }
  
  .mb-xs { margin-bottom: var(--space-xs); }
  .mb-sm { margin-bottom: var(--space-sm); }
  .mb-md { margin-bottom: var(--space-md); }
  .mb-lg { margin-bottom: var(--space-lg); }
  .mb-xl { margin-bottom: var(--space-xl); }
  
  .mx-auto { margin-left: auto; margin-right: auto; }
  
  /* Media queries */
  @media (max-width: ${theme.breakpoints.md}) {
    html {
      font-size: 14px;
    }
    
    h1 {
      font-size: calc(${theme.typography.h1.fontSize} * 0.8);
    }
    
    h2 {
      font-size: calc(${theme.typography.h2.fontSize} * 0.85);
    }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    html {
      font-size: 13px;
    }
    
    h1 {
      font-size: calc(${theme.typography.h1.fontSize} * 0.65);
    }
    
    h2 {
      font-size: calc(${theme.typography.h2.fontSize} * 0.7);
    }
    
    .container {
      padding: 0 var(--space-sm);
    }
  }
`;

export default GlobalStyles; 