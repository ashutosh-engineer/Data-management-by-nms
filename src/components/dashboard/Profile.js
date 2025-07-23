import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import FormGroup from '../common/FormGroup';
import { getUserProfile, updateUserProfile } from '../../services/apiService';
import theme from '../../theme';

// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string(),
});

const ProfileContainer = styled.div`
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md}px;
  color: ${theme.palette.text.primary};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${theme.spacing.lg}px;
  
  & > button:not(:last-child) {
    margin-right: ${theme.spacing.sm}px;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: ${theme.spacing.lg}px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${theme.spacing.md}px;
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  color: ${theme.palette.text.secondary};
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${theme.palette.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: ${theme.spacing.md}px;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

const ProfileName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: ${theme.spacing.xs}px 0;
`;

const ProfileEmail = styled.p`
  font-size: 1rem;
  color: ${theme.palette.text.secondary};
  margin: 0;
`;

const Profile = ({ user: propUser }) => {
  const [user, setUser] = useState(propUser || null);
  const [loading, setLoading] = useState(!propUser);
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });
  
  useEffect(() => {
    if (!propUser) {
      fetchUserData();
    }
  }, [propUser]);
  
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user, reset]);
  
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile information');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateProfile = async (data) => {
    try {
      const updatedUser = await updateUserProfile(data);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    reset({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  };

  if (loading) {
    return <LoadingState>Loading profile information...</LoadingState>;
  }

  return (
    <ProfileContainer>
      <h2 className="page-title">My Profile</h2>
      
      <Card>
        <Card.Header>
          <Card.Title>Profile Information</Card.Title>
          <Card.Subtitle>View and manage your account details</Card.Subtitle>
        </Card.Header>
        
        <Card.Content>
          {isEditing ? (
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <ProfileSection>
                <FormTitle>Personal Information</FormTitle>
                <FormRow>
                  <FormGroup>
                    <Input
                      label="Name"
                      placeholder="Your full name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      {...register('name')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      label="Email Address"
                      placeholder="Your email address"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...register('email')}
                    />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <Input
                      label="Phone Number"
                      placeholder="Your phone number"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      {...register('phone')}
                    />
                  </FormGroup>
                </FormRow>
              </ProfileSection>
              
              <FormActions>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </FormActions>
            </form>
          ) : (
            <>
              <ProfileHeader>
                <ProfileAvatar>
                  {user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </ProfileAvatar>
                <ProfileName>{user?.name || 'User'}</ProfileName>
                <ProfileEmail>{user?.email}</ProfileEmail>
              </ProfileHeader>
            
              <ProfileSection>
                <FormTitle>Personal Information</FormTitle>
                <div>
                  <p><strong>Name:</strong> {user?.name || 'Not provided'}</p>
                  <p><strong>Email:</strong> {user?.email || 'Not provided'}</p>
                  <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
                </div>
              </ProfileSection>
              
              <FormActions>
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              </FormActions>
            </>
          )}
        </Card.Content>
      </Card>
    </ProfileContainer>
  );
};

export default Profile; 