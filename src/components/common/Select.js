import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing.md}px;
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 6px;
  color: ${theme.palette.text.secondary};
  font-weight: 500;
  transition: color ${theme.transitions.fast};
  
  ${props => props.error && css`
    color: ${theme.palette.error.main};
  `}
`;

const StyledSelect = styled.select`
  font-family: ${theme.typography.fontFamily};
  font-size: 0.9375rem;
  padding: 10px 14px;
  padding-right: 36px;
  padding-left: ${props => props.hasLeftIcon ? '40px' : '14px'};
  border: 1px solid ${theme.palette.neutral[400]};
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};
  background-color: ${theme.palette.neutral[100]};
  color: ${theme.palette.text.primary};
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${theme.palette.primary.main}25;
  }
  
  ${props => props.error && css`
    border-color: ${theme.palette.error.main};
    
    &:focus {
      box-shadow: 0 0 0 2px ${theme.palette.error.main}25;
    }
  `}
  
  ${props => props.disabled && css`
    background-color: ${theme.palette.neutral[200]};
    border-color: ${theme.palette.neutral[300]};
    color: ${theme.palette.text.disabled};
    cursor: not-allowed;
  `}
`;

const HelperText = styled.div`
  font-size: 0.75rem;
  margin-top: 5px;
  color: ${theme.palette.text.secondary};
  
  ${props => props.error && css`
    color: ${theme.palette.error.main};
  `}
`;

const ChevronIcon = styled.div`
  position: absolute;
  top: 35px;
  right: 12px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${theme.palette.text.secondary};
  pointer-events: none;
  
  ${props => props.disabled && css`
    border-top-color: ${theme.palette.text.disabled};
  `}
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 33px;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.palette.text.secondary};
  pointer-events: none;
  
  svg {
    font-size: 1rem;
  }
`;

const Select = forwardRef(({
  label,
  helperText,
  error,
  children,
  disabled,
  options = [],
  icon,
  ...props
}, ref) => {
  return (
    <SelectWrapper>
      {label && <Label error={error}>{label}</Label>}
      <div style={{ position: 'relative' }}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledSelect 
          ref={ref} 
          error={error} 
          disabled={disabled} 
          hasLeftIcon={!!icon}
          {...props}
        >
          {options.length > 0 ? (
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            children
          )}
        </StyledSelect>
        <ChevronIcon disabled={disabled} />
      </div>
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </SelectWrapper>
  );
});

Select.displayName = 'Select';

export default Select; 