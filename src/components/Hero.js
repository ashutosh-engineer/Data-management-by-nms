import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  padding: 0;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 100%);
    z-index: 1;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/hero-image.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.7) contrast(1.2);
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Headline = styled.h1`
  font-size: 4.8rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #ffffff;
  letter-spacing: -0.025em;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  
  span {
    color: var(--secondary-main, #E87D51);
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 100%;
      height: 4px;
      background-color: var(--secondary-main, #E87D51);
      box-shadow: 0 2px 8px rgba(232, 125, 81, 0.6);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 3rem;
  line-height: 1.6;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  opacity: 0.95;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    max-width: 280px;
    margin: 0 auto;
  }
`;

const PrimaryButton = styled.button`
  padding: 1.25rem 3rem;
  background-color: var(--secondary-main, #E87D51);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.125rem;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  
  &:hover {
    background-color: var(--secondary-dark, #C25E34);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(232, 125, 81, 0.4);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: all 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

const SecondaryButton = styled.a`
  padding: 1.25rem 3rem;
  background-color: transparent;
  color: white;
  font-weight: 600;
  border: 2px solid white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.125rem;
  display: inline-block;
  text-decoration: none;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

function Hero() {
  // Function to contact via WhatsApp
  const handleContactClick = (e) => {
    e.preventDefault();
    
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Professional message for WhatsApp
    const message = "Hello NMS Softwares, I'm interested in learning more about your ManageDay data management solution. Could you provide additional information?";
    const encodedMessage = encodeURIComponent(message);
    
    // Set the appropriate WhatsApp URL based on device
    const whatsappUrl = isMobile
      ? `https://wa.me/919558466409?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=919558466409&text=${encodedMessage}`;
    
    // Open the WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <HeroSection>
      <BackgroundImage />
      <Container>
        <Content>
          <Headline>
            <span>ManageDay:</span> Enterprise Data Management Solution
          </Headline>
          <Description>
            Securely manage, structure, and analyze customer data for enterprises with complex B2B2C relationships.
          </Description>
          <ButtonGroup>
            <PrimaryButton onClick={handleContactClick}>
              Request Demo
            </PrimaryButton>
            <SecondaryButton href="#">
              Learn More
            </SecondaryButton>
          </ButtonGroup>
        </Content>
      </Container>
    </HeroSection>
  );
}

export default Hero; 