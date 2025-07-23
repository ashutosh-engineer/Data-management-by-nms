import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import Button from './common/Button';
import theme from '../theme';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(10px); }
`;

// Styled Components
const ToggleButton = styled.button`
  position: fixed;
  bottom: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${theme.palette.primary.main};
  color: white;
  border: none;
  box-shadow: ${theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
    background-color: ${theme.palette.primary.dark};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.palette.primary.main}50;
  }
`;

const ChatIcon = styled.span`
  font-size: 24px;
`;

const PopupContainer = styled.div`
  position: fixed;
  bottom: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  width: 340px;
  background-color: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  overflow: hidden;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease forwards;
  transform-origin: bottom right;
  
  ${props => props.$isClosing && css`
    animation: ${fadeOut} 0.3s ease forwards;
  `}
  
  ${props => props.$isMinimized && css`
    height: 60px;
    overflow: hidden;
  `}
`;

const PopupHeader = styled.div`
  background: linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark});
  color: white;
  padding: ${theme.spacing.md}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PopupTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const LogoText = styled.span`
  font-weight: 700;
  margin-right: 5px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  margin-left: ${theme.spacing.sm}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${theme.borderRadius.round};
  transition: background-color ${theme.transitions.fast};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:focus {
    outline: none;
  }
`;

const PopupBody = styled.div`
  padding: ${theme.spacing.lg}px;
`;

const PopupMessage = styled.p`
  margin-bottom: ${theme.spacing.lg}px;
  color: ${theme.palette.text.primary};
  font-size: 0.9375rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm}px;
`;

const LoginPopup = ({ setShowLoginPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const history = useHistory();

  // Auto invoke the chat after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const togglePopup = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const minimizePopup = () => {
    setIsMinimized(true);
  };

  const maximizePopup = () => {
    setIsMinimized(false);
  };

  const handleCustomerClick = () => {
    // Close the popup
    setIsOpen(false);
    setShowLoginPopup(false);
    // Redirect to the login page
    history.push('/login');
  };

  const handleWhatsAppClick = () => {
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Detailed message for WhatsApp
    const message = "Hey, NMS Softwares and Innovation! I am interested too much in your ManageDay data management product and want it as a service. Kindly give more details about it.";
    const encodedMessage = encodeURIComponent(message);
    
    // Set the appropriate WhatsApp URL based on device
    const whatsappUrl = isMobile
      ? `https://wa.me/919558466409?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=919558466409&text=${encodedMessage}`;
    
    // Open the WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Close the popup
    setIsOpen(false);
    setShowLoginPopup(false);
  };

  return (
    <>
      {!isOpen && (
        <ToggleButton onClick={togglePopup}>
          <ChatIcon>💬</ChatIcon>
        </ToggleButton>
      )}

      {isOpen && (
        <PopupContainer $isMinimized={isMinimized} $isClosing={isClosing}>
          <PopupHeader>
            <PopupTitle>
              <LogoText>ManageDay</LogoText> Customer Portal
            </PopupTitle>
            <Controls>
              {isMinimized ? (
                <ControlButton onClick={maximizePopup} title="Maximize">
                  ↗️
                </ControlButton>
              ) : (
                <ControlButton onClick={minimizePopup} title="Minimize">
                  ↘️
                </ControlButton>
              )}
              <ControlButton onClick={handleClose} title="Close">
                ✖️
              </ControlButton>
            </Controls>
          </PopupHeader>
          
          {!isMinimized && (
            <PopupBody>
              <PopupMessage>Hello! Are you already a customer?</PopupMessage>
              <ButtonsContainer>
                <Button onClick={handleCustomerClick}>
                  Yes, I am
                </Button>
                <Button 
                  onClick={handleWhatsAppClick} 
                  variant="outline"
                >
                  No, I'm interested
                </Button>
              </ButtonsContainer>
            </PopupBody>
          )}
        </PopupContainer>
      )}
    </>
  );
};

export default LoginPopup; 