# Consolidated API Service

## Overview

This project uses a consolidated API service approach where all API operations are managed from a single file. This architectural decision provides several benefits:

1. **Single Source of Truth**: All API endpoints are defined in one place
2. **Consistent Error Handling**: Errors are handled uniformly across all API calls
3. **Simplified Imports**: Components only need to import from one file
4. **Easier Maintenance**: API changes only need to be made in one location
5. **Centralized Authentication**: Token management is handled consistently

## File Structure

The main API file is `apiService.js` which contains:

- API configuration with axios
- Request and response interceptors
- Authentication functions
- CRUD operations for all resources:
  - Products
  - Orders
  - Customers
  - Users
- Notification services
- API diagnostic tools

## Usage Examples

### Authentication

```js
import { login, logout, isAuthenticated } from '../services/apiService';

// Login
const handleLogin = async () => {
  try {
    const result = await login(username, password, rememberMe);
    // Handle successful login
  } catch (error) {
    // Handle login failure
  }
};

// Check authentication status
if (isAuthenticated()) {
  // User is logged in
} else {
  // User is not logged in
}

// Logout
const handleLogout = () => {
  logout(); // Clears tokens and redirects to home
};
```

### Data Operations

```js
import { 
  getProducts, 
  createProduct, 
  updateProduct,
  deleteProduct 
} from '../services/apiService';

// Fetch data
const fetchProducts = async () => {
  try {
    const products = await getProducts();
    // Handle products data
  } catch (error) {
    // Handle error
  }
};

// Create new item
const handleCreate = async (productData) => {
  try {
    const newProduct = await createProduct(productData);
    // Handle successful creation
  } catch (error) {
    // Handle error
  }
};

// Update item
const handleUpdate = async (id, productData) => {
  try {
    const updatedProduct = await updateProduct(id, productData);
    // Handle successful update
  } catch (error) {
    // Handle error
  }
};

// Delete item
const handleDelete = async (id) => {
  try {
    await deleteProduct(id);
    // Handle successful deletion
  } catch (error) {
    // Handle error
  }
};
```

### Diagnostics

```js
import { testAllEndpoints, testServerConnectivity } from '../services/apiService';

// Test all API endpoints
const runDiagnostics = async () => {
  try {
    const results = await testAllEndpoints();
    // Display results
  } catch (error) {
    // Handle error
  }
};

// Test basic connectivity
const checkServerStatus = async () => {
  try {
    const result = await testServerConnectivity();
    // Display connectivity status
  } catch (error) {
    // Handle error
  }
};
```

## API Endpoints

All API endpoints are defined in the `API_ENDPOINTS` object within `apiService.js`:

```js
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/login',
  REFRESH_TOKEN: '/refresh-token',
  
  // Products
  PRODUCTS: '/items',
  PRODUCT_DETAIL: (id) => `/items/${id}`,
  
  // Orders
  ORDERS: '/sales',
  ORDER_DETAIL: (id) => `/sales/${id}`,
  
  // Customers
  CUSTOMERS: '/clients',
  CUSTOMER_DETAIL: (id) => `/clients/${id}`,
  CUSTOMER_ORDERS: (id) => `/clients/${id}/sales`,
  
  // Users
  USERS: '/users',
  USER_DETAIL: (id) => `/users/${id}`,
  USER_ME: '/users/me',
  USER_UPDATE_PROFILE: '/users/me',
};
```

## Error Handling

API errors are automatically handled by response interceptors which:

1. Log detailed error information to the console
2. Show user-friendly toast notifications
3. Handle authentication failures and redirect to login
4. Provide detailed error context for debugging

## Direct API Access

For advanced use cases, you can access the axios instance directly:

```js
import api from '../services/apiService';

// Custom API call
const makeCustomRequest = async () => {
  try {
    const response = await api.post('/custom/endpoint', data);
    return response.data;
  } catch (error) {
    console.error('Custom request error:', error);
    throw error;
  }
};
```

## Maintenance

When making changes to the API:

1. Update endpoint mappings in `API_ENDPOINTS` if paths change
2. Add new service functions for new endpoints
3. Keep the same error handling patterns for consistency
4. Document new functions with JSDoc comments 