import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  padding: 0;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #1a1f3a);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(232, 125, 81, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(42, 95, 122, 0.15) 0%, transparent 50%);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 100%);
    z-index: 2;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  position: relative;
  z-index: 3;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.4rem 1.2rem;
  }
`;

const Headline = styled.h1`
  font-size: 5.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #ffffff;
  letter-spacing: -0.03em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  
  span {
    background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: inline-block;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.7;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
    margin-bottom: 2.5rem;
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
  const handleContactClick = (e) => {
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const message = "Hello NMS Softwares, I'm interested in learning more about your ManageDay data management solution. Could you provide additional information?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = isMobile
      ? `https://wa.me/919558466409?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=919558466409&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLearnMore = () => {
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection>
      <Container>
        <Content>
          <Badge>🚀 Enterprise Data Management Platform</Badge>
          <Headline>
            Transform Your Data into <span>Strategic Assets</span>
          </Headline>
          <Description>
            Empower your enterprise with ManageDay—a cutting-edge data management solution designed for businesses with complex B2B2C relationships. Secure, scalable, and intelligent.
          </Description>
          <ButtonGroup>
            <PrimaryButton onClick={handleContactClick}>
              Request a Demo
            </PrimaryButton>
            <SecondaryButton href="#product" onClick={(e) => { e.preventDefault(); handleLearnMore(); }}>
              Explore Features
            </SecondaryButton>
          </ButtonGroup>
        </Content>
      </Container>
    </HeroSection>
  );
}

export default Hero; 