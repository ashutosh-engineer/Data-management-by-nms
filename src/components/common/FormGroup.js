import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.spacing ? `${theme.spacing[props.spacing]}px` : `${theme.spacing.lg}px`};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md}px;
  color: ${theme.palette.text.primary};
`;

const FormDescription = styled.p`
  font-size: 0.875rem;
  margin-top: -${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
  color: ${theme.palette.text.secondary};
`;

const FormDivider = styled.hr`
  border: none;
  height: 1px;
  background-color: ${theme.palette.neutral[300]};
  margin: ${theme.spacing.sm}px 0 ${theme.spacing.md}px;
`;

const FormGroup = ({ 
  children, 
  title, 
  description,
  showDivider = false,
  spacing,
  ...props 
}) => {
  return (
    <StyledFormGroup spacing={spacing} {...props}>
      {title && <FormTitle>{title}</FormTitle>}
      {description && <FormDescription>{description}</FormDescription>}
      {showDivider && <FormDivider />}
      {children}
    </StyledFormGroup>
  );
};

export default FormGroup; 