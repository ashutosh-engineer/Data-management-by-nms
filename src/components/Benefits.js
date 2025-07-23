import React from 'react';
import styled from 'styled-components';

const BenefitsSection = styled.section`
  padding: 8rem 0;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 5rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-bottom: 3.5rem;
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

const SectionDescription = styled.p`
  font-size: 1.25rem;
  color: var(--color-secondary);
  max-width: 700px;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const BenefitsContainer = styled.div`
  position: relative;
`;

const BenefitsTimeline = styled.div`
  position: absolute;
  top: 0;
  left: 50px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    var(--color-accent-light) 0%,
    var(--color-accent) 50%,
    var(--color-accent-light) 100%
  );
  
  @media (max-width: 768px) {
    left: 25px;
  }
  
  &::before, &::after {
    content: '';
    position: absolute;
    left: -4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-accent);
  }
  
  &::before {
    top: 0;
  }
  
  &::after {
    bottom: 0;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  margin-bottom: 5rem;
  position: relative;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    transform: translateX(10px);
  }
`;

const BenefitNumber = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--color-accent), #002040);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-right: 3rem;
  box-shadow: 0 10px 25px rgba(0, 51, 102, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
    margin-right: 1.5rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
  }
`;

const BenefitContent = styled.div`
  flex: 1;
  padding-top: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  
  ${BenefitItem}:hover & {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const BenefitHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-right: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const BenefitTag = styled.span`
  display: inline-block;
  padding: 0.35rem 1.25rem;
  background-color: var(--color-accent-light);
  color: var(--color-accent);
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const BenefitDescription = styled.p`
  color: var(--color-secondary);
  line-height: 1.8;
  font-size: 1.125rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
  }
`;

const HighlightedText = styled.span`
  color: var(--color-accent);
  font-weight: 600;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  z-index: 0;
  opacity: 0.4;
  background: radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%);
`;

function Benefits() {
  return (
    <BenefitsSection className="benefits-section" id="benefits">
      <BackgroundCircle 
        style={{ 
          width: '400px', 
          height: '400px', 
          top: '10%', 
          right: '-200px' 
        }} 
      />
      <BackgroundCircle 
        style={{ 
          width: '300px', 
          height: '300px', 
          bottom: '5%', 
          left: '-150px' 
        }} 
      />
      
      <Container>
        <SectionHeader>
          <SectionTitle>Key <span>Benefits</span></SectionTitle>
          <SectionDescription>
            Our data management platform delivers exceptional value through these core advantages that set us apart from traditional solutions
          </SectionDescription>
        </SectionHeader>
        
        <BenefitsContainer>
          <BenefitsTimeline />
          
          <BenefitItem>
            <BenefitNumber>01</BenefitNumber>
            <BenefitContent>
              <BenefitHeader>
                <BenefitTitle>Centralized Data Control</BenefitTitle>
                <BenefitTag>Enterprise Ready</BenefitTag>
              </BenefitHeader>
              <BenefitDescription>
                Manage all your customer data from a single, secure platform with <HighlightedText>role-based access controls</HighlightedText> and detailed audit logs. Maintain comprehensive visibility while ensuring proper data governance across your entire organization.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitNumber>02</BenefitNumber>
            <BenefitContent>
              <BenefitHeader>
                <BenefitTitle>Automated Workflows</BenefitTitle>
                <BenefitTag>Productivity Boost</BenefitTag>
              </BenefitHeader>
              <BenefitDescription>
                Reduce manual data handling with <HighlightedText>intelligent workflows</HighlightedText> that automate data processing, validation, and distribution. Eliminate repetitive tasks and minimize human error while increasing team productivity.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitNumber>03</BenefitNumber>
            <BenefitContent>
              <BenefitHeader>
                <BenefitTitle>Secure Cloud Infrastructure</BenefitTitle>
                <BenefitTag>99.9% Uptime</BenefitTag>
              </BenefitHeader>
              <BenefitDescription>
                Built on <HighlightedText>enterprise-grade cloud architecture</HighlightedText> that scales with your business while maintaining the highest security standards. Protect your valuable data assets with multi-layered security and continuous monitoring.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
          
          <BenefitItem>
            <BenefitNumber>04</BenefitNumber>
            <BenefitContent>
              <BenefitHeader>
                <BenefitTitle>Real-time Data Syncing</BenefitTitle>
                <BenefitTag>Instant Updates</BenefitTag>
              </BenefitHeader>
              <BenefitDescription>
                Ensure data consistency across your organization with <HighlightedText>automatic synchronization</HighlightedText> and integrity verification. Make confident decisions based on up-to-date, reliable information available to all stakeholders.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
        </BenefitsContainer>
      </Container>
    </BenefitsSection>
  );
}

export default Benefits; 