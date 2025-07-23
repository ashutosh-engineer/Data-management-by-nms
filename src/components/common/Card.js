import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';

const CardWrapper = styled.div`
  background-color: ${theme.palette.neutral[100]};
  border-radius: ${props => theme.borderRadius[props.$radius || 'md']};
  box-shadow: ${props => theme.shadows[props.$elevation || 'md']};
  overflow: hidden;
  transition: all ${theme.transitions.medium};
  position: relative;
  
  ${props => props.$hoverable && css`
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
  
  ${props => props.$bordered && css`
    border: 1px solid ${theme.palette.neutral[300]};
  `}
  
  ${props => props.$fullHeight && css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `}
`;

const CardHeader = styled.div`
  padding: ${props => props.$compact ? '16px 20px' : '20px 24px'};
  border-bottom: ${props => props.$divider ? `1px solid ${theme.palette.neutral[300]}` : 'none'};
  display: flex;
  align-items: center;
  justify-content: ${props => props.$align || 'space-between'};
  
  ${props => props.$background && css`
    background-color: ${props.$background};
  `}
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.$size === 'small' ? '1rem' : '1.25rem'};
  font-weight: 600;
  color: ${theme.palette.text.primary};
`;

const CardSubtitle = styled.h4`
  margin: 4px 0 0 0;
  font-size: ${props => props.$size === 'small' ? '0.75rem' : '0.875rem'};
  font-weight: 400;
  color: ${theme.palette.text.secondary};
`;

const CardContent = styled.div`
  padding: ${props => props.$compact ? '16px 20px' : '20px 24px'};
  
  ${props => props.$noPadding && css`
    padding: 0;
  `}
`;

const CardFooter = styled.div`
  padding: ${props => props.$compact ? '12px 20px' : '16px 24px'};
  border-top: 1px solid ${theme.palette.neutral[300]};
  display: flex;
  align-items: center;
  justify-content: ${props => props.$align || 'flex-end'};
  
  ${props => props.$background && css`
    background-color: ${props.$background};
  `}
  
  ${props => props.$fullHeight && css`
    margin-top: auto;
  `}
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Card = ({
  children,
  hoverable = false,
  bordered = false,
  elevation = 'md',
  radius = 'md',
  fullHeight = false,
  ...props
}) => {
  return (
    <CardWrapper 
      $hoverable={hoverable} 
      $bordered={bordered} 
      $elevation={elevation} 
      $radius={radius}
      $fullHeight={fullHeight}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

// Update the sub-components to accept transient props
Card.Header = ({ children, compact, divider, align, background, ...props }) => (
  <CardHeader 
    $compact={compact}
    $divider={divider}
    $align={align}
    $background={background}
    {...props}
  >
    {children}
  </CardHeader>
);

Card.Title = ({ children, size, ...props }) => (
  <CardTitle $size={size} {...props}>
    {children}
  </CardTitle>
);

Card.Subtitle = ({ children, size, ...props }) => (
  <CardSubtitle $size={size} {...props}>
    {children}
  </CardSubtitle>
);

Card.Content = ({ children, compact, noPadding, ...props }) => (
  <CardContent 
    $compact={compact}
    $noPadding={noPadding}
    {...props}
  >
    {children}
  </CardContent>
);

Card.Footer = ({ children, compact, align, background, fullHeight, ...props }) => (
  <CardFooter 
    $compact={compact}
    $align={align}
    $background={background}
    $fullHeight={fullHeight}
    {...props}
  >
    {children}
  </CardFooter>
);

Card.Actions = CardActions;

export default Card; 