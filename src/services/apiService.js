/**
 * Consolidated API Service
 * 
 * This file centralizes all API operations in one place:
 * - API configuration and interceptors
 * - Authentication services
 * - Product management
 * - Order management
 * - Customer management
 * - User management
 * - Notifications
 * - API diagnostics
 * 
 * By consolidating all API services in one file, we simplify imports,
 * ensure consistent error handling, and make the codebase easier to maintain.
 */

import axios from 'axios';
import { toast } from 'react-toastify';

// Update to use the provided backend URL
const API_URL = 'http://3.110.174.62:8000/api/v1';

// Debug mode to help diagnose issues
const DEBUG_MODE = true;

/**
 * API_ENDPOINTS
 * 
 * Centralized mapping of all API endpoints. By keeping them here:
 * 1. We can easily update endpoints if the API changes
 * 2. We maintain consistency across the application
 * 3. We have a single source of truth for all endpoints
 */
export const API_ENDPOINTS = {
  // Authentication - updated to match the provided OAuth2 endpoint
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  
  // Users
  USERS: '/users',
  USER_ME: '/users/me',
  USER_DETAIL: (id) => `/users/${id}`,
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  ORDER_TEST_WHATSAPP: '/orders/test-whatsapp',
  ORDER_TEST_SMS: '/orders/test-sms',
  
  // Health check
  HEALTH: '/health'
};

/**
 * Local storage keys for auth data
 */
const STORAGE_KEYS = {
  TOKEN: 'manageday_token',
  USER: 'manageday_user',
  TOKEN_TYPE: 'manageday_token_type',
  TOKEN_EXPIRY: 'manageday_token_expiry',
};

/**
 * Create axios instance with appropriate configuration
 * This is the base instance that all API calls will use
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // Set timeout to 15 seconds
  withCredentials: false, // Don't send cookies with cross-origin requests
});

/**
 * Request interceptor
 * 
 * This interceptor runs before every request and:
 * 1. Adds authentication token to headers
 * 2. Adds user role for role-based permissions
 * 3. Logs requests in debug mode
 */
api.interceptors.request.use(
  (config) => {
    if (DEBUG_MODE) {
      console.log(`🔍 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config);
    }
    
    const token = getToken();
    const tokenType = getTokenType();
    if (token) {
      // OAuth2 standard format
      config.headers['Authorization'] = `${tokenType} ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * 
 * This interceptor runs after every response and:
 * 1. Handles common API errors
 * 2. Logs responses in debug mode
 * 3. Refreshes token if expired
 */
api.interceptors.response.use(
  (response) => {
    if (DEBUG_MODE) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    // Extract response and request from error object
    const originalRequest = error.config;
    const response = error.response;
    
    if (DEBUG_MODE) {
      console.error('❌ API Error:', error.response || error.message);
    }
    
    // Handle token expiration (401 Unauthorized)
    if (response && response.status === 401 && !originalRequest._retry) {
      // Mark this request as retried to avoid infinite loops
      originalRequest._retry = true;
      
      // If refresh token functionality is added later, it would go here
      // For now, just logout the user
      logout();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // Handle validation errors (422)
    if (response && response.status === 422) {
      const validationErrors = response.data?.detail || [];
      if (validationErrors.length > 0) {
        // Format validation errors for display
        const errorMessages = validationErrors.map(err => {
          const field = err.loc[err.loc.length - 1];
          return `${field}: ${err.msg}`;
        }).join(', ');
        
        toast.error(`Validation error: ${errorMessages}`);
      }
    }
    
    // Handle server errors (500+)
    if (response && response.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    // Handle not found (404)
    if (response && response.status === 404) {
      toast.error('Resource not found.');
    }
    
    return Promise.reject(error);
  }
);

// =============== AUTH SERVICE FUNCTIONS ===============

/**
 * Login user with OAuth2 password flow
 * 
 * @param {string} username - User email
 * @param {string} password - User password
 * @param {boolean} rememberMe - Whether to store credentials
 * @returns {Promise<Object>} Login result with token and user info
 */
export const login = async (username, password, rememberMe = false) => {
  try {
    // Create form data for OAuth2 password flow
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    
    // Make the request with form data
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.LOGIN}`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    });
    
    // Extract token data
    const { access_token, token_type } = response.data;
    
    if (access_token) {
      // Store token in localStorage if remember me is checked
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEYS.TOKEN, access_token);
      storage.setItem(STORAGE_KEYS.TOKEN_TYPE, token_type || 'Bearer');
      
      try {
        // Get user info with the new token
        const userResponse = await axios.get(`${API_URL}${API_ENDPOINTS.USER_ME}`, {
          headers: {
            'Authorization': `${token_type || 'Bearer'} ${access_token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        
        const userData = userResponse.data;
        
        // Store user data
        storage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        
        return {
          success: true,
          token: access_token,
          user: userData,
          role: userData.is_superuser ? 'admin' : 'employee',
        };
      } catch (userError) {
        console.error('Error fetching user data:', userError);
        
        // Even if we can't get user data, we still have a token
        return {
          success: true,
          token: access_token,
          user: { email: username },
          role: 'employee', // Default to employee if we can't determine role
        };
      }
    }
    
    return { success: false };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register a new user (admin only)
 * 
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * 
 * @returns {boolean} Whether user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

/**
 * Get authentication token from storage
 * 
 * @returns {string|null} Authentication token
 */
export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN) || 
         sessionStorage.getItem(STORAGE_KEYS.TOKEN) || 
         null;
};

/**
 * Get token type from storage
 * 
 * @returns {string} Token type (default: Bearer)
 */
export const getTokenType = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN_TYPE) || 
         sessionStorage.getItem(STORAGE_KEYS.TOKEN_TYPE) || 
         'Bearer';
};

/**
 * Get current user data
 * 
 * @returns {Object|null} User data
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER) || 
                  sessionStorage.getItem(STORAGE_KEYS.USER);
  
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  }
  
  return null;
};

/**
 * Get user role (admin or employee)
 * 
 * @returns {string} User role
 */
export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.is_superuser ? 'admin' : 'employee';
};

/**
 * Logout user by clearing stored credentials
 */
export const logout = () => {
  // Clear all auth data from storage
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN_TYPE);
  localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
  
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN);
  sessionStorage.removeItem(STORAGE_KEYS.USER);
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN_TYPE);
  sessionStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
};

// =============== USER SERVICE FUNCTIONS ===============

/**
 * Get current user profile
 * 
 * @returns {Promise<Object>} User profile
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.USER_ME);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update current user profile
 * 
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} Updated user profile
 */
export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put(API_ENDPOINTS.USER_ME, profileData);
    
    // Update stored user data
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...response.data };
      
      if (localStorage.getItem(STORAGE_KEYS.USER)) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      } else {
        sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Get all users (admin only)
 * 
 * @param {number} skip - Number of records to skip
 * @param {number} limit - Maximum number of records to return
 * @returns {Promise<Array>} List of users
 */
export const getUsers = async (skip = 0, limit = 100) => {
  try {
    const response = await api.get(API_ENDPOINTS.USERS, {
      params: { skip, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Get user by ID (admin only)
 * 
 * @param {string|number} id - User ID
 * @returns {Promise<Object>} User details
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.USER_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

/**
 * Update user by ID (admin only)
 * 
 * @param {string|number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(API_ENDPOINTS.USER_DETAIL(id), userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

/**
 * Delete user by ID (admin only)
 * 
 * @param {string|number} id - User ID
 * @returns {Promise<Object>} Deleted user
 */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(API_ENDPOINTS.USER_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};

// =============== PRODUCT SERVICE FUNCTIONS ===============

/**
 * Get all products with optional filtering
 * 
 * @param {number} skip - Number of records to skip
 * @param {number} limit - Maximum number of records to return
 * @param {string} name - Filter products by name
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async (skip = 0, limit = 100, name = '') => {
  try {
    const params = { skip, limit };
    if (name) params.name = name;
    
    const response = await api.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// =============== CUSTOMER SERVICE FUNCTIONS ===============

/**
 * Get all customers with optional filtering
 * 
 * @param {number} skip - Number of records to skip
 * @param {number} limit - Maximum number of records to return
 * @param {string} name - Filter customers by name
 * @returns {Promise<Array>} List of customers
 */
export const getCustomers = async (skip = 0, limit = 100, name = '') => {
  try {
    // For now, return mock data as we don't have a real endpoint
    // When API is ready, use this commented code:
    // const params = { skip, limit };
    // if (name) params.name = name;
    // const response = await api.get('/customers', { params });
    // return response.data;
    
    // Mock data for customers
    return [
      {
        id: 1,
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '555-123-4567',
        address: '123 Business Ave, Suite 100',
        category: 'Business',
        contactPerson: 'John Doe'
      },
      {
        id: 2,
        name: 'Tech Solutions Inc',
        email: 'info@techsolutions.com',
        phone: '555-987-6543',
        address: '456 Innovation Way',
        category: 'Business',
        contactPerson: 'Jane Smith'
      },
      {
        id: 3,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '555-222-3333',
        address: '789 Residential St',
        category: 'Individual',
        contactPerson: null
      },
      {
        id: 4,
        name: 'Global Industries',
        email: 'contact@globalind.com',
        phone: '555-444-5555',
        address: '1010 Enterprise Blvd',
        category: 'Business',
        contactPerson: 'Robert Brown'
      },
      {
        id: 5,
        name: 'Michael Williams',
        email: 'mwilliams@example.com',
        phone: '555-777-8888',
        address: '222 Highland Ave',
        category: 'Individual',
        contactPerson: null
      }
    ];
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

/**
 * Get product by ID
 * 
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCT_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Create new product
 * 
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update existing product
 * 
 * @param {string|number} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(API_ENDPOINTS.PRODUCT_DETAIL(id), productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

/**
 * Delete product
 * 
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(API_ENDPOINTS.PRODUCT_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};

// =============== ORDER SERVICE FUNCTIONS ===============

/**
 * Get all orders with optional filtering
 * 
 * @param {number} skip - Number of records to skip
 * @param {number} limit - Maximum number of records to return
 * @returns {Promise<Array>} List of orders
 */
export const getOrders = async (skip = 0, limit = 100) => {
  try {
    const response = await api.get(API_ENDPOINTS.ORDERS, { 
      params: { skip, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Get order by ID
 * 
 * @param {string|number} id - Order ID
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.ORDER_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

/**
 * Create new order
 * 
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Created order
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post(API_ENDPOINTS.ORDERS, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

/**
 * Update existing order
 * 
 * @param {string|number} id - Order ID
 * @param {Object} orderData - Updated order data
 * @returns {Promise<Object>} Updated order
 */
export const updateOrder = async (id, orderData) => {
  try {
    const response = await api.put(API_ENDPOINTS.ORDER_DETAIL(id), orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    throw error;
  }
};

/**
 * Delete order
 * 
 * @param {string|number} id - Order ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteOrder = async (id) => {
  try {
    const response = await api.delete(API_ENDPOINTS.ORDER_DETAIL(id));
    return response.data;
  } catch (error) {
    console.error(`Error deleting order ${id}:`, error);
    throw error;
  }
};

/**
 * Send WhatsApp notification test
 * 
 * @param {Object} data - Notification data
 * @returns {Promise<Object>} Notification result
 */
export const testWhatsAppNotification = async (data) => {
  try {
    const response = await api.post(API_ENDPOINTS.ORDER_TEST_WHATSAPP, data);
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    throw error;
  }
};

/**
 * Send SMS notification test
 * 
 * @param {Object} data - Notification data
 * @returns {Promise<Object>} Notification result
 */
export const testSMSNotification = async (data) => {
  try {
    const response = await api.post(API_ENDPOINTS.ORDER_TEST_SMS, data);
    return response.data;
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    throw error;
  }
};

// =============== HEALTH CHECK FUNCTIONS ===============

/**
 * Get API health status
 * 
 * @returns {Promise<Object>} API health status
 */
export const getApiHealth = async () => {
  try {
    const startTime = Date.now();
    const response = await api.get(API_ENDPOINTS.HEALTH);
    const endTime = Date.now();
    
    return {
      status: response.data.status || 'ok',
      responseTime: endTime - startTime,
      version: response.data.version || 'unknown',
    };
  } catch (error) {
    console.error('Error fetching API health:', error);
    return {
      status: 'error',
      responseTime: 0,
      version: 'unknown',
      error: error.message,
    };
  }
}; 