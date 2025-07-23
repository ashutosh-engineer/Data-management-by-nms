import api, { API_ENDPOINTS } from './api';

/**
 * Product Service
 * 
 * This service provides functions to interact with the product API endpoints
 */

/**
 * Get all products with optional filtering
 * 
 * @param {Object} params - Query parameters for filtering
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Get a single product by ID
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
 * Create a new product
 * 
 * @param {Object} productData - Product data to create
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
 * Update an existing product
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
 * Delete a product
 * 
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Response data
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