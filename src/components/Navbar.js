import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 1rem 0;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  ${props => props.$scrolled && `
    background-color: rgba(15, 32, 39, 0.95);
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    height: 70px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  `}
`;

const NavbarContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    text-decoration: none;
    transform: translateY(-2px);
  }
`;

const LogoText = styled.span`
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #E87D51 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LogoSoft = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  font-size: 1rem;
  margin-left: 0.5rem;
`;

const MenuToggle = styled.div`
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Hamburger = styled.div`
  width: 24px;
  height: 18px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #ffffff;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
    
    &:nth-child(1) {
      top: 0px;
    }
    
    &:nth-child(2) {
      top: 8px;
    }
    
    &:nth-child(3) {
      top: 16px;
    }
  }
  
  ${props => props.$isOpen && `
    span:nth-child(1) {
      top: 8px;
      transform: rotate(135deg);
    }
    
    span:nth-child(2) {
      opacity: 0;
      left: -60px;
    }
    
    span:nth-child(3) {
      top: 8px;
      transform: rotate(-135deg);
    }
  `}
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  ${props => props.$isOpen && `
    max-height: 300px;
    opacity: 1;
    padding: 1rem 0;
  `}
  
  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    gap: 0;
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  font-size: 1rem;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #ffffff;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 1rem 2rem;
    margin: 0;
    width: 100%;
    text-align: center;
    
    &::after {
      display: none;
    }
  }
`;

const NavLinkCTA = styled(NavLink)`
  background: linear-gradient(135deg, #E87D51 0%, #F9A825 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  opacity: 1;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(232, 125, 81, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    color: white;
    box-shadow: 0 6px 20px rgba(232, 125, 81, 0.5);
  }
  
  &::after {
    display: none;
  }
  
  @media (max-width: 768px) {
    margin: 1rem 2rem;
    display: inline-block;
    width: auto;
  }
`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // We can still keep the scroll detection for shadow effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled} className="navbar">
      <NavbarContainer className="container navbar-container">
        <Logo href="/" className="logo">
          <LogoText>ManageDay</LogoText> <LogoSoft>by NMS</LogoSoft>
        </Logo>
        
        <MenuToggle className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Hamburger $isOpen={isMenuOpen} className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
        </MenuToggle>
        
        <NavLinks $isOpen={isMenuOpen} className={`nav-links ${isMenuOpen ? 'menu-open' : ''}`}>
          <NavLink href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</NavLink>
          <NavLink href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</NavLink>
          <NavLinkCTA href="#" className="nav-link nav-link-cta" onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            
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
          }}>Contact Us</NavLinkCTA>
        </NavLinks>
      </NavbarContainer>
    </Nav>
  );
}

export default Navbar;