import React, { useState } from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContentLeft = styled.div``;

const ContentRight = styled.div``;

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

const Description = styled.p`
  font-size: 1.25rem;
  color: var(--color-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 520px;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ContactIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.25rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h4`
  font-size: 1.25rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const ContactValue = styled.p`
  font-size: 1rem;
  color: var(--color-secondary);
  margin: 0;
  line-height: 1.5;
`;

const ContactLink = styled.a`
  color: var(--color-accent);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-of-type {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: var(--color-primary);
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(0, 51, 102, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: var(--color-primary);
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(0, 51, 102, 0.1);
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: var(--color-accent);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #002040;
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const BackgroundCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  z-index: 0;
  opacity: 0.5;
  background: radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%);
`;

const SuccessMessage = styled.div`
  background-color: #e6f4ea;
  color: #137333;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
`;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <ContactSection id="contact">
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
          bottom: '10%', 
          left: '-150px' 
        }} 
      />
      
      <Container>
        <ContentLeft>
          <SectionTitle>Get In <span>Touch</span></SectionTitle>
          <Description>
            Have questions about ManageDay? Our team is ready to assist you with any inquiries about our enterprise data management solutions.
          </Description>
          
          <ContactInfoItem>
            <ContactIconWrapper>
              <ContactIcon>E</ContactIcon>
            </ContactIconWrapper>
            <ContactText>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>
                <ContactLink href="mailto:info@nmssoftwares.com">info@nmssoftwares.com</ContactLink>
              </ContactValue>
            </ContactText>
          </ContactInfoItem>
          
          <ContactInfoItem>
            <ContactIconWrapper>
              <ContactIcon>P</ContactIcon>
            </ContactIconWrapper>
            <ContactText>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue>
                <ContactLink href="tel:+919558466409">+91 95584 66409</ContactLink>
              </ContactValue>
            </ContactText>
          </ContactInfoItem>
          
          <ContactInfoItem>
            <ContactIconWrapper>
              <ContactIcon>L</ContactIcon>
            </ContactIconWrapper>
            <ContactText>
              <ContactLabel>Location</ContactLabel>
              <ContactValue>
                Vadodara, Gujarat, India
              </ContactValue>
            </ContactText>
          </ContactInfoItem>
        </ContentLeft>
        
        <ContentRight>
          <FormContainer>
            <FormTitle>Send us a message</FormTitle>
            
            {formSubmitted && (
              <SuccessMessage>
                Thank you for your message! We'll get back to you shortly.
              </SuccessMessage>
            )}
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </Form>
          </FormContainer>
        </ContentRight>
      </Container>
    </ContactSection>
  );
}

export default Contact; 