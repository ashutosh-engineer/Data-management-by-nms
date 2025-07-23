import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from '../theme';
import Card from './common/Card';
import Button from './common/Button';
import Input from './common/Input';
import Checkbox from './common/Checkbox';
import { login, isAuthenticated, getUserRole } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

// Form validation schema
const schema = yup.object().shape({
  username: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean()
});

// Styled components
const LoginPageWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}40 100%);
  padding: ${theme.spacing.md}px;
  position: relative;
  overflow: hidden;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 460px;
  z-index: 1;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: ${theme.borderRadius.md}px;
  backdrop-filter: blur(8px);
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.div`
  color: ${theme.palette.error.main};
  background-color: ${theme.palette.error.light}20;
  border-radius: ${theme.borderRadius.sm};
  padding: 10px;
  margin-bottom: ${theme.spacing.md}px;
  font-size: 0.875rem;
  border-left: 3px solid ${theme.palette.error.main};
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

// Decorative elements
const CircleDecoration = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, ${theme.palette.primary.main}20 0%, ${theme.palette.primary.light}10 70%);
  
  &.circle-1 {
    width: 600px;
    height: 600px;
    top: -200px;
    right: -100px;
    opacity: 0.8;
  }
  
  &.circle-2 {
    width: 500px;
    height: 500px;
    bottom: -150px;
    left: -100px;
    opacity: 0.6;
  }
  
  &.circle-3 {
    width: 300px;
    height: 300px;
    top: 50%;
    right: 10%;
    opacity: 0.4;
  }
`;

const LoginButton = styled(Button)`
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const RoleSelector = styled.div`
  margin-bottom: ${theme.spacing.md}px;
  display: flex;
  flex-direction: column;
`;

const RoleOption = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: ${theme.borderRadius.sm}px;
  background-color: ${props => props.$selected ? `${theme.palette.primary.main}20` : 'transparent'};
  border: 1px solid ${props => props.$selected ? theme.palette.primary.main : '#e1e1e1'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$selected ? `${theme.palette.primary.main}20` : '#f5f5f5'};
  }
  
  input {
    margin-right: 8px;
  }
  
  label {
    cursor: pointer;
    flex: 1;
    font-weight: ${props => props.$selected ? '500' : 'normal'};
  }
`;

const LoginPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { setAuthenticated, setUserRole } = useAuth();
  
  // Check if already authenticated on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      setAuthenticated(true);
      const role = getUserRole();
      
      // Redirect based on role
      if (role === 'admin') {
        history.push('/dashboard');
      } else {
        history.push('/dashboard');  // Can be changed to employee specific route
      }
    }
  }, [history, setAuthenticated]);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: true // Default to checked for better UX
    }
  });
  
  // Update the onSubmit function to handle OAuth2 errors better
  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');
    
    try {
      const loginResult = await login(data.username, data.password, data.rememberMe);
      
      if (loginResult.success) {
        setAuthenticated(true);
        setUserRole(loginResult.role);
        
        // Show appropriate success message
        const roleDisplay = loginResult.role === 'admin' ? 'Administrator' : 'Employee';
        toast.success(`Login successful! Welcome, ${roleDisplay}`);
        
        // Redirect based on role
        if (loginResult.role === 'admin') {
          history.push('/dashboard'); // Admin dashboard
        } else {
          history.push('/dashboard'); // Employee dashboard (could be different path)
        }
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.status === 422) {
        // Handle validation errors
        const validationErrors = error.response.data?.detail || [];
        if (validationErrors.length > 0) {
          const errorMessages = validationErrors.map(err => {
            const field = err.loc[err.loc.length - 1];
            return `${field}: ${err.msg}`;
          }).join(', ');
          
          setLoginError(`Validation error: ${errorMessages}`);
        } else {
          setLoginError('Validation error. Please check your credentials.');
        }
      } else if (error.response?.status === 401) {
        setLoginError('Invalid username or password. Please try again.');
      } else if (error.response?.status === 403) {
        setLoginError('You do not have permission to access this resource.');
      } else if (error.response?.status >= 500) {
        setLoginError('Server error. Please try again later.');
      } else {
        setLoginError(error.response?.data?.detail || 'Login failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <LoginPageWrapper>
      <ToastContainer position="top-right" autoClose={3000} />
      <CircleDecoration className="circle-1" />
      <CircleDecoration className="circle-2" />
      <CircleDecoration className="circle-3" />
      
      <LoginContainer>
        <LogoWrapper>
          <Logo>ManageDay</Logo>
        </LogoWrapper>
        
        <Card>
          <Card.Header>
            <div>
              <Card.Title>Welcome back</Card.Title>
              <Card.Subtitle>Please sign in to continue</Card.Subtitle>
            </div>
          </Card.Header>
          
          <Card.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
              
              <Input
                label="Email"
                placeholder="Enter your email"
                error={!!errors.username}
                helperText={errors.username?.message}
                {...register('username')}
              />
              
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
              />
              
              <FormActions>
                <Checkbox
                  label="Remember me"
                  {...register('rememberMe')}
                  checked={register('rememberMe').value}
                  onChange={(e) => {
                    // This is necessary due to how react-hook-form works with custom checkbox components
                    const { onChange } = register('rememberMe');
                    onChange(e);
                  }}
                />
              </FormActions>
              
              <LoginButton type="submit" $fullWidth={true} fullWidth disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </LoginButton>
            </form>
          </Card.Content>
        </Card>
      </LoginContainer>
    </LoginPageWrapper>
  );
};

export default LoginPage; 