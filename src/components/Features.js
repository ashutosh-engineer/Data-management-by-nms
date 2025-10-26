import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 0.8; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const FeaturesSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fc 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  }
  
  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const HeroShowcase = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
  position: relative;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const ShowcaseContent = styled.div`
  position: relative;
  z-index: 2;
`;

const ShowcaseBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, rgba(232, 125, 81, 0.1) 0%, rgba(249, 168, 37, 0.1) 100%);
  border-radius: 50px;
  color: #E87D51;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  border: 1px solid rgba(232, 125, 81, 0.2);
`;

const ShowcaseTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: #1a1f3a;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  span {
    background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ShowcaseDescription = styled.p`
  font-size: 1.25rem;
  color: #4A5568;
  line-height: 1.8;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ShowcaseVisual = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 968px) {
    height: 400px;
  }
  
  @media (max-width: 568px) {
    height: 300px;
  }
`;

const CircleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrbitCircle = styled.div`
  position: absolute;
  border: 2px solid rgba(232, 125, 81, 0.2);
  border-radius: 50%;
  animation: ${rotate} ${props => props.$duration || '20s'} linear infinite;
  
  ${props => props.$reverse && `
    animation-direction: reverse;
  `}
`;

const Circle1 = styled(OrbitCircle)`
  width: 400px;
  height: 400px;
  border-color: rgba(232, 125, 81, 0.3);
  
  @media (max-width: 968px) {
    width: 320px;
    height: 320px;
  }
  
  @media (max-width: 568px) {
    width: 250px;
    height: 250px;
  }
`;

const Circle2 = styled(OrbitCircle)`
  width: 300px;
  height: 300px;
  border-color: rgba(249, 168, 37, 0.3);
  
  @media (max-width: 968px) {
    width: 240px;
    height: 240px;
  }
  
  @media (max-width: 568px) {
    width: 190px;
    height: 190px;
  }
`;

const Circle3 = styled(OrbitCircle)`
  width: 200px;
  height: 200px;
  border-color: rgba(42, 95, 122, 0.3);
  
  @media (max-width: 968px) {
    width: 160px;
    height: 160px;
  }
  
  @media (max-width: 568px) {
    width: 130px;
    height: 130px;
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 8px 25px rgba(232, 125, 81, 0.4);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.$delay || '0s'};
  
  @media (max-width: 568px) {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
`;

const Icon1 = styled(FloatingIcon)`
  top: 10%;
  left: 20%;
`;

const Icon2 = styled(FloatingIcon)`
  top: 15%;
  right: 15%;
`;

const Icon3 = styled(FloatingIcon)`
  bottom: 20%;
  left: 15%;
`;

const Icon4 = styled(FloatingIcon)`
  bottom: 15%;
  right: 20%;
`;

const CenterIcon = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #1a1f3a 0%, #2c5364 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
  animation: ${pulse} 4s ease-in-out infinite;
  
  @media (max-width: 968px) {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
  
  @media (max-width: 568px) {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(232, 125, 81, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: linear-gradient(135deg, rgba(232, 125, 81, 0.1) 0%, rgba(249, 168, 37, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1f3a;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #4A5568;
  line-height: 1.7;
  margin: 0;
`;

const features = [
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with GDPR, CCPA, and international data protection standards.'
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Process millions of records in seconds with our optimized infrastructure and caching mechanisms.'
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Turn raw data into actionable insights with customizable dashboards and real-time reporting.'
  },
  {
    icon: '🔄',
    title: 'Seamless Integration',
    description: 'Connect with 100+ platforms via our REST API, webhooks, and pre-built integrations.'
  },
  {
    icon: '☁️',
    title: 'Cloud Native',
    description: 'Built on modern cloud infrastructure that scales automatically with your business needs.'
  },
  {
    icon: '🤝',
    title: '24/7 Support',
    description: 'Expert support team available around the clock to ensure your operations run smoothly.'
  }
];

function Features() {
  return (
    <FeaturesSection id="features">
      <Container>
        <HeroShowcase>
          <ShowcaseContent>
            <ShowcaseBadge>✨ Comprehensive Platform</ShowcaseBadge>
            <ShowcaseTitle>
              Everything You Need to <span>Succeed</span>
            </ShowcaseTitle>
            <ShowcaseDescription>
              ManageDay provides a comprehensive suite of tools designed to streamline your data management workflows and empower your team.
            </ShowcaseDescription>
          </ShowcaseContent>
          
          <ShowcaseVisual>
            <GlowEffect />
            <CircleContainer>
              <Circle1 $duration="25s" />
              <Circle2 $duration="20s" $reverse />
              <Circle3 $duration="15s" />
            </CircleContainer>
            <Icon1 $delay="0s">🔒</Icon1>
            <Icon2 $delay="0.5s">⚡</Icon2>
            <Icon3 $delay="1s">📊</Icon3>
            <Icon4 $delay="1.5s">☁️</Icon4>
            <CenterIcon>💎</CenterIcon>
          </ShowcaseVisual>
        </HeroShowcase>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </FeaturesSection>
  );
}

export default Features;
