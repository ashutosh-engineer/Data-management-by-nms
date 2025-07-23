import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import FormGroup from '../common/FormGroup';
import Checkbox from '../common/Checkbox';
import { testWhatsAppNotification, testSMSNotification } from '../../services/apiService';
import theme from '../../theme';

// Form validation schema
const schema = yup.object().shape({
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10,12}$/, 'Phone number should be 10-12 digits'),
  message: yup.string().required('Message is required'),
  useSMSFallback: yup.boolean(),
});

const NotificationsContainer = styled.div`
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md}px;
  color: ${theme.palette.text.primary};
`;

const FormDescription = styled.p`
  font-size: 0.9375rem;
  color: ${theme.palette.text.secondary};
  margin-bottom: ${theme.spacing.md}px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${theme.spacing.md}px;
  
  & > button:not(:last-child) {
    margin-right: ${theme.spacing.sm}px;
  }
`;

const NotificationCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const NotificationCard = styled.div`
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.palette.neutral[200]};
  background-color: white;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  ${props => props.active && `
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 1px ${theme.palette.primary.main};
  `}
  
  &:hover {
    border-color: ${theme.palette.primary.main};
  }
`;

const NotificationTitle = styled.h4`
  margin: 0 0 ${theme.spacing.xs}px;
  font-weight: 600;
  font-size: 1.1rem;
  color: ${theme.palette.text.primary};
`;

const NotificationDescription = styled.p`
  margin: 0;
  color: ${theme.palette.text.secondary};
  font-size: 0.875rem;
`;

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notificationType, setNotificationType] = useState('whatsapp');
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '',
      message: '',
      useSMSFallback: true,
    },
  });
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      if (notificationType === 'whatsapp') {
        await testWhatsAppNotification({
          phone: data.phone,
          message: data.message,
          use_sms_fallback: data.useSMSFallback
        });
        toast.success('WhatsApp message sent successfully!');
      } else {
        await testSMSNotification({
          phone: data.phone,
          message: data.message
        });
        toast.success('SMS sent successfully!');
      }
      
      reset();
    } catch (error) {
      toast.error('Failed to send notification: ' + (error.response?.data?.detail || error.message));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <NotificationsContainer>
      <h2 className="page-title">Notifications</h2>
      
      <NotificationCards>
        <NotificationCard 
          active={notificationType === 'whatsapp'} 
          onClick={() => setNotificationType('whatsapp')}
        >
          <NotificationTitle>WhatsApp</NotificationTitle>
          <NotificationDescription>
            Send WhatsApp messages to customers with SMS fallback
          </NotificationDescription>
        </NotificationCard>
        
        <NotificationCard 
          active={notificationType === 'sms'} 
          onClick={() => setNotificationType('sms')}
        >
          <NotificationTitle>SMS</NotificationTitle>
          <NotificationDescription>
            Send direct SMS messages to customers
          </NotificationDescription>
        </NotificationCard>
      </NotificationCards>
      
      <Card>
        <Card.Header>
          <Card.Title>
            {notificationType === 'whatsapp' ? 'Send WhatsApp Message' : 'Send SMS'}
          </Card.Title>
          <Card.Subtitle>
            {notificationType === 'whatsapp' 
              ? 'Send a WhatsApp message with optional SMS fallback' 
              : 'Send a direct SMS message to the customer'}
          </Card.Subtitle>
        </Card.Header>
        
        <Card.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Input
                label="Phone Number"
                placeholder="Enter phone number with country code (e.g., 919999999999)"
                error={!!errors.phone}
                helperText={errors.phone?.message || "Include country code (e.g., 91 for India)"}
                {...register('phone')}
              />
            </FormGroup>
            
            <FormGroup>
              <Input
                label="Message"
                placeholder="Type your message here..."
                multiline
                rows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
                {...register('message')}
              />
            </FormGroup>
            
            {notificationType === 'whatsapp' && (
              <FormGroup>
                <Checkbox
                  label="Use SMS as fallback if WhatsApp fails"
                  {...register('useSMSFallback')}
                  checked={watch('useSMSFallback')}
                  onChange={(e) => {
                    const { onChange } = register('useSMSFallback');
                    onChange(e);
                  }}
                />
              </FormGroup>
            )}
            
            <FormActions>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Notification'}
              </Button>
            </FormActions>
          </form>
        </Card.Content>
      </Card>
    </NotificationsContainer>
  );
};

export default Notifications; 