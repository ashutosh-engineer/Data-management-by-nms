import React from 'react';
import styled from 'styled-components';

const ServicesSection = styled.section`
  padding: 8rem 0;
  background-color: #f8fafc;
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
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Subheading = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--secondary-main, #E87D51);
`;

const Heading = styled.h2`
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1F232B;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: #4B5563;
  max-width: 700px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 8px;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  span {
    font-size: 2rem;
    color: var(--secondary-main, #E87D51);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1F232B;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #4B5563;
  flex: 1;
`;

const ContactButton = styled.button`
  padding: 1rem 2rem;
  background-color: var(--secondary-main, #E87D51);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 4rem auto 0;
  
  &:hover {
    background-color: var(--secondary-dark, #C25E34);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(232, 125, 81, 0.3);
  }
`;

function CTA() {
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
    <ServicesSection id="services">
      <Container>
        <SectionHeader>
          <Subheading>Our Offerings</Subheading>
          <Heading>Comprehensive Data Management Services</Heading>
          <Description>
            ManageDay provides a range of services to help your business manage data efficiently and securely. 
          </Description>
        </SectionHeader>
        
        <ServicesGrid>
          <ServiceCard>
            <ServiceIcon>
              <span>📊</span>
            </ServiceIcon>
            <ServiceTitle>Data Analytics</ServiceTitle>
            <ServiceDescription>
              Turn your raw data into actionable insights with our powerful analytics tools. Visualize trends, identify opportunities, and make data-driven decisions.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceIcon>
              <span>🔒</span>
            </ServiceIcon>
            <ServiceTitle>Secure Storage</ServiceTitle>
            <ServiceDescription>
              Keep your critical business data safe with enterprise-grade security measures, encryption, and automated backups to prevent data loss.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceIcon>
              <span>🔄</span>
            </ServiceIcon>
            <ServiceTitle>Workflow Automation</ServiceTitle>
            <ServiceDescription>
              Streamline your business processes with intelligent workflow automation. Reduce manual tasks and minimize errors in your data management.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceIcon>
              <span>🌐</span>
            </ServiceIcon>
            <ServiceTitle>API Integration</ServiceTitle>
            <ServiceDescription>
              Seamlessly connect ManageDay with your existing business systems through our comprehensive API library and integration services.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceIcon>
              <span>📱</span>
            </ServiceIcon>
            <ServiceTitle>Mobile Access</ServiceTitle>
            <ServiceDescription>
              Access your business data anytime, anywhere with our mobile-friendly platform. Stay connected and make decisions on the go.
            </ServiceDescription>
          </ServiceCard>
          
          <ServiceCard>
            <ServiceIcon>
              <span>👥</span>
            </ServiceIcon>
            <ServiceTitle>Dedicated Support</ServiceTitle>
            <ServiceDescription>
              Get personalized assistance from our expert team. We're committed to helping you succeed with ongoing support and training.
            </ServiceDescription>
          </ServiceCard>
        </ServicesGrid>
        
        <ContactButton onClick={handleContactClick}>
          Request a Demo
        </ContactButton>
      </Container>
    </ServicesSection>
  );
}

export default CTA; 