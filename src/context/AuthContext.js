import React, { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated, getCurrentUser, logout, getUserRole } from '../services/apiService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [userRole, setUserRole] = useState(getUserRole());

  useEffect(() => {
    // Check authentication status on load
    if (authenticated) {
      fetchUserData();
    } else {
      setLoading(false);
    }

    // Listen to storage events for auth changes in other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'manageday_token' || e.key === 'manageday_user') {
        setAuthenticated(isAuthenticated());
        setUserRole(getUserRole());
        
        if (!e.newValue && e.key === 'manageday_token') {
          setUser(null);
          setUserRole('employee');
        } else if (e.key === 'manageday_user' && e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch (error) {
            console.error('Error parsing user data from storage', error);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [authenticated]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = getCurrentUser();
      if (userData) {
        setUser(userData);
        setUserRole(getUserRole());
      } else {
        // If no user data but token exists, token is invalid
        if (isAuthenticated()) {
          logout();
          setAuthenticated(false);
          setUserRole('employee');
        }
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // On error, assume token is invalid
      logout();
      setAuthenticated(false);
      setUserRole('employee');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setAuthenticated(false);
    setUserRole('employee');
  };

  const checkIsAdmin = () => {
    return userRole === 'admin';
  };

  const value = {
    user,
    loading,
    authenticated,
    userRole,
    isAdmin: checkIsAdmin,
    setUser,
    setAuthenticated,
    setUserRole,
    logout: handleLogout,
    refreshUser: fetchUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 