import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SolutionsSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(135deg, #0f2027 0%, #1a1f3a 50%, #2c5364 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 10% 20%, rgba(232, 125, 81, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(249, 168, 37, 0.1) 0%, transparent 50%);
  }
  
  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  animation: ${fadeIn} 1s ease-out;
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
`;

const Title = styled.h2`
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
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HighlightText = styled.p`
  font-size: 1.35rem;
  color: #F9A825;
  font-weight: 600;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  padding-left: 1.5rem;
  border-left: 4px solid #E87D51;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const CTAButton = styled.button`
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
    width: 100%;
  }
`;

const VisualContent = styled.div`
  position: relative;
  height: 500px;
  
  @media (max-width: 968px) {
    height: 400px;
  }
`;

const FeatureItem = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 968px) {
    position: relative;
    margin-bottom: 1rem;
  }
`;

const Feature1 = styled(FeatureItem)`
  top: 10%;
  left: 0;
  width: 280px;
`;

const Feature2 = styled(FeatureItem)`
  top: 35%;
  right: 0;
  width: 300px;
`;

const Feature3 = styled(FeatureItem)`
  bottom: 25%;
  left: 5%;
  width: 260px;
`;

const Feature4 = styled(FeatureItem)`
  bottom: 5%;
  right: 10%;
  width: 280px;
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.25rem 0;
`;

const FeatureDesc = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

function CustomSolutions() {
  const handleContactClick = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const message = "Hello NMS Softwares, I'm interested in getting a customized data management solution for my business. Can we discuss my requirements?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = isMobile 
      ? `https://wa.me/919558466409?text=${encodedMessage}` 
      : `https://web.whatsapp.com/send?phone=919558466409&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <SolutionsSection id="solutions">
      <Container>
        <ContentWrapper>
          <TextContent>
            <Badge>🎯 Tailored for Your Business</Badge>
            <Title>
              Custom <span>Data Management</span> Solutions
            </Title>
            <Description>
              We understand that every business has unique challenges and requirements. That's why ManageDay isn't a one-size-fits-all solution.
            </Description>
            <HighlightText>
              We customize our data management platform specifically to match your business processes, industry requirements, and growth objectives.
            </HighlightText>
            <Description>
              From workflow automation to custom integrations, security protocols to compliance frameworks—we adapt every aspect of ManageDay to serve your specific needs perfectly.
            </Description>
            <CTAButton onClick={handleContactClick}>
              Discuss Your Requirements
            </CTAButton>
          </TextContent>
          
          <VisualContent>
            <Feature1 $delay="0.2s">
              <IconBox>🎨</IconBox>
              <FeatureText>
                <FeatureTitle>Custom Workflows</FeatureTitle>
                <FeatureDesc>Tailored to your processes</FeatureDesc>
              </FeatureText>
            </Feature1>
            
            <Feature2 $delay="0.4s">
              <IconBox>🔗</IconBox>
              <FeatureText>
                <FeatureTitle>API Integration</FeatureTitle>
                <FeatureDesc>Connect your existing tools</FeatureDesc>
              </FeatureText>
            </Feature2>
            
            <Feature3 $delay="0.6s">
              <IconBox>⚙️</IconBox>
              <FeatureText>
                <FeatureTitle>Custom Features</FeatureTitle>
                <FeatureDesc>Built for your needs</FeatureDesc>
              </FeatureText>
            </Feature3>
            
            <Feature4 $delay="0.8s">
              <IconBox>🛡️</IconBox>
              <FeatureText>
                <FeatureTitle>Security Compliance</FeatureTitle>
                <FeatureDesc>Industry-specific standards</FeatureDesc>
              </FeatureText>
            </Feature4>
          </VisualContent>
        </ContentWrapper>
      </Container>
    </SolutionsSection>
  );
}

export default CustomSolutions;
