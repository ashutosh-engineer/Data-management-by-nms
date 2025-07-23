import React from 'react';
import styled from 'styled-components';

// Styled components
const Section = styled.section`
  padding: 8rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 5rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
  
  span {
    color: var(--color-accent);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 4px;
      background: var(--color-accent);
    }
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-secondary);
  max-width: 700px;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const ChooseUsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 4rem;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FeatureCard = styled.div`
  position: relative;
  background-color: white;
  padding: 2.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: var(--color-accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-primary);
`;

const FeatureDescription = styled.p`
  color: var(--color-secondary);
  line-height: 1.7;
  font-size: 1rem;
  flex: 1;
`;

const FeatureTag = styled.div`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(0, 51, 102, 0.05);
  color: var(--color-accent);
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const BackgroundElement = styled.div`
  position: absolute;
  z-index: 0;
  opacity: 0.7;
`;

const BackgroundCircle = styled(BackgroundElement)`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 51, 102, 0.03) 0%, transparent 70%);
`;

const BackgroundSquare = styled(BackgroundElement)`
  width: 300px;
  height: 300px;
  transform: rotate(45deg);
  background: radial-gradient(circle, rgba(0, 51, 102, 0.02) 0%, transparent 70%);
`;

function WhyChooseUs() {
  return (
    <Section className="choose-us" id="why-us">
      <BackgroundCircle style={{ top: '10%', right: '-200px' }} />
      <BackgroundSquare style={{ bottom: '10%', left: '-150px' }} />
      
      <Container>
        <SectionHeader>
          <SectionTitle>Why Choose <span>NMS Softwares</span></SectionTitle>
          <SectionSubtitle>
            We combine industry expertise with cutting-edge technology to deliver superior data management solutions that transform how businesses handle their critical information
          </SectionSubtitle>
        </SectionHeader>
        
        <ChooseUsGrid>
          <FeatureCard>
            <FeatureIconWrapper>E</FeatureIconWrapper>
            <FeatureTitle>Enterprise-Ready</FeatureTitle>
            <FeatureDescription>
              Built for the demands of large organizations managing complex data relationships. Our solution handles high volumes of data while maintaining performance.
            </FeatureDescription>
            <FeatureTag>Scalable Architecture</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIconWrapper>S</FeatureIconWrapper>
            <FeatureTitle>Security First</FeatureTitle>
            <FeatureDescription>
              Multiple security layers protect your sensitive data. Regular security audits, encryption at rest and in transit, and comprehensive access controls.
            </FeatureDescription>
            <FeatureTag>ISO 27001 Compliant</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIconWrapper>I</FeatureIconWrapper>
            <FeatureTitle>Seamless Integration</FeatureTitle>
            <FeatureDescription>
              Connect with your existing tech stack using our extensive API library. Import and export data with minimal friction across your business systems.
            </FeatureDescription>
            <FeatureTag>100+ API Endpoints</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIconWrapper>D</FeatureIconWrapper>
            <FeatureTitle>Dedicated Support</FeatureTitle>
            <FeatureDescription>
              Enterprise-grade support with dedicated account managers. Technical expertise available when you need it to ensure maximum system value.
            </FeatureDescription>
            <FeatureTag>24/7 Priority Response</FeatureTag>
          </FeatureCard>
        </ChooseUsGrid>
      </Container>
    </Section>
  );
}

export default WhyChooseUs; 