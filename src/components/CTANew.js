import React from 'react';
import styled from 'styled-components';

const CTASection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const CTABadge = styled.div`
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
`;

const CTATitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  span {
    background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.35rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 3rem;
  line-height: 1.7;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 3rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const PrimaryButton = styled.button`
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.125rem;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(232, 125, 81, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(232, 125, 81, 0.6);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

const SecondaryButton = styled.button`
  padding: 1.25rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 600;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.125rem;
  border-radius: 50px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .stat-label {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }
`;

function CTA() {
  const handleContactClick = (e) => {
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const message = "Hello NMS Softwares, I'm interested in learning more about your ManageDay data management solution. Could you provide additional information?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = isMobile ? `https://wa.me/919558466409?text=${encodedMessage}` : `https://web.whatsapp.com/send?phone=919558466409&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLearnMore = () => {
    const element = document.getElementById('solutions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CTASection id="cta">
      <Container>
        <CTABadge>🚀 Ready to Transform Your Business?</CTABadge>
        <CTATitle>
          Start Managing Your Data <span>Smarter Today</span>
        </CTATitle>
        <CTADescription>
          Join hundreds of enterprises that trust ManageDay for their critical data management needs. Get started with a personalized demo.
        </CTADescription>
        <ButtonGroup>
          <PrimaryButton onClick={handleContactClick}>
            Schedule a Demo
          </PrimaryButton>
          <SecondaryButton onClick={handleLearnMore}>
            Learn More
          </SecondaryButton>
        </ButtonGroup>
        <StatsContainer>
          <StatItem>
            <div className="stat-number">500+</div>
            <div className="stat-label">Enterprise Clients</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime Guarantee</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">24/7</div>
            <div className="stat-label">Expert Support</div>
          </StatItem>
        </StatsContainer>
      </Container>
    </CTASection>
  );
}

export default CTA;
