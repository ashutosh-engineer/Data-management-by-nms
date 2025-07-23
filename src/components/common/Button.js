import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';

const variants = {
  primary: css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    border: 1px solid ${theme.palette.primary.main};
    
    &:hover {
      background-color: ${theme.palette.primary.dark};
      border-color: ${theme.palette.primary.dark};
    }
  `,
  
  secondary: css`
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.contrastText};
    border: 1px solid ${theme.palette.secondary.main};
    
    &:hover {
      background-color: ${theme.palette.secondary.dark};
      border-color: ${theme.palette.secondary.dark};
    }
  `,
  
  accent: css`
    background-color: ${theme.palette.accent.main};
    color: ${theme.palette.accent.contrastText};
    border: 1px solid ${theme.palette.accent.main};
    
    &:hover {
      background-color: ${theme.palette.accent.dark};
      border-color: ${theme.palette.accent.dark};
    }
  `,
  
  outline: css`
    background-color: transparent;
    color: ${theme.palette.primary.main};
    border: 1px solid ${theme.palette.primary.main};
    
    &:hover {
      background-color: ${theme.palette.primary.light}20;
      color: ${theme.palette.primary.dark};
      border-color: ${theme.palette.primary.dark};
    }
  `,
  
  ghost: css`
    background-color: transparent;
    color: ${theme.palette.primary.main};
    border: 1px solid transparent;
    
    &:hover {
      background-color: ${theme.palette.primary.light}10;
    }
  `
};

const sizes = {
  small: css`
    padding: 6px 16px;
    font-size: 0.8125rem;
  `,
  
  medium: css`
    padding: 8px 20px;
    font-size: 0.875rem;
  `,
  
  large: css`
    padding: 10px 24px;
    font-size: 1rem;
  `
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-weight: 600;
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  outline: none;
  text-transform: none;
  letter-spacing: 0.02em;
  white-space: nowrap;
  box-shadow: none;
  text-decoration: none;
  
  ${props => variants[props.$variant]};
  ${props => sizes[props.$size]};
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.$disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  `}
  
  &:active {
    transform: translateY(1px);
  }
  
  > * + * {
    margin-left: 8px;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $disabled={disabled}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 