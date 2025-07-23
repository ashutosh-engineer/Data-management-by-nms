import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--color-primary);
  color: var(--color-light);
  padding: 3rem 0 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0 1rem;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const FooterColumn = styled.div``;

const MobileRow = styled.div`
  display: contents; /* This makes it not affect the desktop layout */
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const Logo = styled.a`
  color: var(--color-light);
  margin-bottom: 0.75rem;
  display: block;
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
  }
`;

const FooterText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--color-light);
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.35rem;
    line-height: 1.3;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    gap: 0.8rem;
  }
`;

const SocialLink = styled.a`
  color: var(--color-light);
  opacity: 0.8;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Heading = styled.h3`
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 2px;
    width: 30px;
    background-color: var(--color-accent);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.6rem;
    
    &:after {
      bottom: -3px;
      height: 1px;
      width: 20px;
    }
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.a`
  display: block;
  color: var(--color-light);
  opacity: 0.8;
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  
  &:hover {
    opacity: 1;
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.35rem;
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--color-light);
  opacity: 0.6;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    padding-top: 0.75rem;
    font-size: 0.7rem;
  }
`;

const FooterPattern = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, 
    var(--color-accent) 0%, 
    var(--color-accent) 25%, 
    transparent 25%, 
    transparent 50%, 
    var(--color-accent) 50%, 
    var(--color-accent) 75%, 
    transparent 75%, 
    transparent 100%);
  background-size: 20px 100%;
  
  @media (max-width: 768px) {
    height: 2px;
    background-size: 12px 100%;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <Container>
        <FooterGrid>
          <FooterColumn>
            <Logo href="/">ManageDay</Logo>
            <FooterText>
              Enterprise data management solutions designed for modern businesses with complex B2B2C relationships. Secure, scalable, and compliant.
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com/company/nms-softwares-and-innovation-india-pvt-ltd/" target="_blank" rel="noopener noreferrer">LinkedIn</SocialLink>
              <SocialLink href="https://github.com/Nmssoftwares" target="_blank" rel="noopener noreferrer">GitHub</SocialLink>
              <SocialLink href="https://nmssoftwares.com/" target="_blank" rel="noopener noreferrer">Website</SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <MobileRow>
            <FooterColumn>
              <Heading>Contact</Heading>
              <FooterText>NMS Softwares</FooterText>
              <FooterText>Vadodara, Gujarat</FooterText>
              <FooterText>info@nmssoftwares.com</FooterText>
              <FooterText>+91 95584 66409</FooterText>
            </FooterColumn>
            
            <FooterColumn>
              <Heading>Links</Heading>
              <FooterLinks>
                <li><FooterLink href="#benefits">Benefits</FooterLink></li>
                <li><FooterLink href="#why-us">Why Choose Us</FooterLink></li>
                <li><FooterLink href="#privacy">Privacy</FooterLink></li>
                <li><FooterLink href="#terms">Terms</FooterLink></li>
              </FooterLinks>
            </FooterColumn>
          </MobileRow>
        </FooterGrid>
        
        <Copyright>
          &copy; {new Date().getFullYear()} ManageDay by NMS Softwares. All rights reserved.
        </Copyright>
      </Container>
      <FooterPattern />
    </FooterContainer>
  );
}

export default Footer; 