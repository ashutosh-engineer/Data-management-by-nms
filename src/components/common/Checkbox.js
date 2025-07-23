import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.marginBottom ? props.marginBottom : theme.spacing.sm}px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: ${props => props.checked ? theme.palette.primary.main : theme.palette.neutral[100]};
  border: 1px solid ${props => props.checked ? theme.palette.primary.main : theme.palette.neutral[400]};
  border-radius: ${theme.borderRadius.xs};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  flex-shrink: 0;
  
  ${props => props.error && css`
    border-color: ${theme.palette.error.main};
  `}
  
  ${props => props.disabled && css`
    background-color: ${props.checked ? theme.palette.primary.main + '80' : theme.palette.neutral[200]};
    border-color: ${props.checked ? theme.palette.primary.main + '80' : theme.palette.neutral[400]};
    cursor: not-allowed;
  `}
  
  &:hover {
    border-color: ${props => props.disabled ? '' : props.checked ? theme.palette.primary.dark : theme.palette.primary.main};
  }
  
  &:after {
    content: '';
    display: ${props => props.checked ? 'block' : 'none'};
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 0.875rem;
  color: ${props => props.disabled ? theme.palette.text.disabled : theme.palette.text.primary};
  user-select: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  ${props => props.error && css`
    color: ${theme.palette.error.main};
  `}
`;

const HelperText = styled.div`
  margin-left: 28px;
  font-size: 0.75rem;
  color: ${props => props.error ? theme.palette.error.main : theme.palette.text.secondary};
  margin-top: 2px;
`;

const Checkbox = forwardRef(({ 
  label, 
  checked, 
  onChange, 
  disabled, 
  error, 
  helperText,
  marginBottom,
  ...props 
}, ref) => {
  return (
    <div>
      <CheckboxContainer marginBottom={helperText ? 0 : marginBottom}>
        <HiddenCheckbox
          ref={ref}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <StyledCheckbox 
          checked={checked} 
          disabled={disabled} 
          error={error}
          onClick={disabled ? undefined : () => onChange({ target: { checked: !checked } })}
        />
        {label && (
          <Label 
            disabled={disabled} 
            error={error}
            onClick={disabled ? undefined : () => onChange({ target: { checked: !checked } })}
          >
            {label}
          </Label>
        )}
      </CheckboxContainer>
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox; 