import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, getProducts } from '../../services/apiService';
import theme from '../../theme';
import { FaPlus, FaSearch, FaSpinner, FaBoxOpen, FaUser, FaEnvelope, FaPhone, FaHome, FaTimes, FaCalendarAlt, FaCheck, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// Form validation schema for order
const orderSchema = yup.object().shape({
  customer_name: yup.string().required('Customer name is required'),
  customer_email: yup.string().email('Invalid email format').required('Customer email is required'),
  customer_phone: yup.string().required('Customer phone is required'),
  customer_address: yup.string().required('Customer address is required'),
  notes: yup.string(),
  status: yup.string().required('Order status is required'),
});

// Form validation schema for order item
const orderItemSchema = yup.object().shape({
  product_id: yup.number().required('Product is required'),
  quantity: yup.number().typeError('Quantity must be a number').min(1, 'Quantity must be at least 1').required('Quantity is required'),
  mold_order_subtype: yup.string().required('Subtype is required'),
  status: yup.string().required('Status is required'),
});

const OrdersContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: ${theme.spacing.md}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm}px;
    height: calc(100vh - 60px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// New styled components for search and filters
const SearchAndFilterContainer = styled.div`
  display: flex;
  flex: 1;
  gap: ${theme.spacing.sm}px;
  max-width: 800px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    max-width: 100%;
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-left: 40px;
  padding-right: 40px;
  border: 1px solid #e2e8f0;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.95rem;
  transition: all 0.2s;
  background-color: white;
  box-shadow: ${theme.shadows.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.palette.text.secondary};
  font-size: 1rem;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.palette.text.secondary};
  font-size: 1rem;
  padding: 0;
  display: ${props => props.visible ? 'block' : 'none'};
  
  &:hover {
    color: ${theme.palette.error.main};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;

// Enhanced button for "New Order"
const NewOrderButton = styled(Button)`
  background: linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark});
  border-radius: ${theme.borderRadius.md};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main});
  }
  
  svg {
    margin-right: 8px;
    font-size: 1.1em;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex: 1;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.95rem;
  background-color: white;
  box-shadow: ${theme.shadows.sm};
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex: 1;
  }
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  box-shadow: ${theme.shadows.sm};
  color: ${theme.palette.text.secondary};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${theme.palette.neutral[100]};
    color: ${theme.palette.text.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

// Tabs for filtering orders
const TabsContainer = styled.div`
  margin-bottom: ${theme.spacing.md}px;
  border-bottom: 1px solid ${theme.palette.neutral[200]};
  width: 100%;
`;

const TabsList = styled.div`
  display: flex;
  gap: ${theme.spacing.sm}px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? theme.palette.primary.main : 'transparent'};
  color: ${props => props.active ? theme.palette.primary.main : theme.palette.text.secondary};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  white-space: nowrap;
  position: relative;
  
  &:hover {
    color: ${theme.palette.primary.main};
  }
  
  &:focus {
    outline: none;
  }
  
  &:after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => props.active ? theme.palette.primary.main : 'transparent'};
    transition: all ${theme.transitions.fast};
  }
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  -webkit-overflow-scrolling: touch;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.palette.neutral[300]};
    border-radius: 4px;
  }
  
  scrollbar-width: thin;
  scrollbar-color: ${theme.palette.neutral[300]} transparent;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  
  th, td {
    padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
    text-align: left;
  }
  
  th {
    background-color: ${theme.palette.neutral[100]};
    color: ${theme.palette.text.secondary};
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  tr {
    border-bottom: 1px solid ${theme.palette.neutral[200]};
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  tbody tr:hover {
    background-color: ${theme.palette.neutral[50]};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs}px;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.palette.text.secondary};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.palette.primary.main};
    background-color: ${theme.palette.primary.light}20;
  }
`;

const EmptyState = styled.div`
  padding: ${theme.spacing.xl}px;
  text-align: center;
  color: ${theme.palette.text.secondary};
  
  h4 {
    margin: ${theme.spacing.sm}px 0;
    font-weight: 600;
    font-size: 1.125rem;
  }
  
  p {
    margin-bottom: ${theme.spacing.md}px;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  color: ${theme.palette.text.secondary};
`;

const FormSection = styled.div`
  margin-bottom: ${theme.spacing.lg}px;
  padding-bottom: ${theme.spacing.md}px;
  border-bottom: 1px solid ${theme.palette.neutral[200]};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.md}px;
  color: ${theme.palette.text.primary};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: ${theme.palette.primary.main};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md}px;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md}px;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.lg}px;
`;

const OrderItems = styled.div`
  margin-top: ${theme.spacing.md}px;
`;

const OrderItem = styled.div`
  border: 1px solid ${theme.palette.neutral[200]};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  position: relative;
  background-color: ${theme.palette.neutral[50]};
  box-shadow: ${theme.shadows.sm};
  
  &:hover {
    border-color: ${theme.palette.primary.light};
  }
`;

const OrderItemHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
  padding-bottom: ${theme.spacing.xs}px;
  border-bottom: 1px dashed ${theme.palette.neutral[200]};
`;

const OrderItemTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.palette.text.primary};
  margin-right: auto;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: ${theme.palette.primary.main};
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: ${theme.spacing.xs}px;
  right: ${theme.spacing.xs}px;
  background: none;
  border: none;
  color: ${theme.palette.error.main};
  cursor: pointer;
  font-size: 1.25rem;
  padding: 4px;
  
  &:hover {
    color: ${theme.palette.error.dark};
  }
`;

const AddItemButton = styled(Button)`
  margin-top: ${theme.spacing.sm}px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    if (props.status === 'Ordered') {
      return `
        background-color: ${theme.palette.info.light};
        color: ${theme.palette.info.dark};
      `;
    } else if (props.status === 'Processing') {
      return `
        background-color: ${theme.palette.warning.light};
        color: ${theme.palette.warning.dark};
      `;
    } else if (props.status === 'Completed') {
      return `
        background-color: ${theme.palette.success.light};
        color: ${theme.palette.success.dark};
      `;
    } else if (props.status === 'Cancelled') {
      return `
        background-color: ${theme.palette.error.light};
        color: ${theme.palette.error.dark};
      `;
    }
    return `
      background-color: ${theme.palette.neutral[200]};
      color: ${theme.palette.neutral[700]};
    `;
  }}
`;

const OrderDetailModal = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
`;

const AddButton = styled(Button)`
  position: fixed;
  bottom: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.lg};
  padding: 0;
  z-index: 10;
  
  svg {
    font-size: 1.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    bottom: ${theme.spacing.md}px;
    right: ${theme.spacing.md}px;
  }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const FormModal = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md}px;
  border-bottom: 1px solid ${theme.palette.neutral[200]};
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.palette.text.primary};
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: ${theme.palette.primary.main};
  }
`;

const CloseModalButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${theme.palette.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background-color: ${theme.palette.neutral[100]};
    color: ${theme.palette.text.primary};
  }
`;

const ModalContent = styled.div`
  padding: ${theme.spacing.md}px;
  overflow-y: auto;
  max-height: calc(90vh - 70px);
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.palette.neutral[300]};
    border-radius: 4px;
  }
  
  scrollbar-width: thin;
  scrollbar-color: ${theme.palette.neutral[300]} transparent;
`;

// Define animations
const spinnerAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Create a styled spinner component
const Spinner = styled(FaSpinner)`
  animation: ${spinnerAnimation} 1s linear infinite;
  font-size: 2rem;
  color: ${theme.palette.primary.main};
  will-change: transform;
`;

// Define mold order subtypes
const MOLD_SUBTYPES = [
  { value: 'Mold', label: 'Mold' },
  { value: 'Injection Mold', label: 'Injection Mold' },
  { value: 'Press Mold', label: 'Press Mold' },
  { value: 'Blow Mold', label: 'Blow Mold' },
  { value: 'Compression Mold', label: 'Compression Mold' },
  { value: 'Transfer Mold', label: 'Transfer Mold' },
];

const MACHINERY_SUBTYPES = [
  { value: 'Machinery', label: 'Machinery' },
  { value: 'CNC Machine', label: 'CNC Machine' },
  { value: 'Injection Machine', label: 'Injection Machine' },
  { value: 'Assembly Machine', label: 'Assembly Machine' },
  { value: 'Packaging Machine', label: 'Packaging Machine' },
];

// Mobile-friendly styles
const MobileFormRow = styled(FormRow)`
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm}px;
  }
`;

const MobileFormModal = styled(FormModal)`
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 95%;
    max-height: 95vh;
    border-radius: ${theme.borderRadius.md};
  }
`;

const MobileModalContent = styled(ModalContent)`
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm}px;
  }
`;

const MobileOrderItem = styled(OrderItem)`
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm}px;
  }
`;

const SubmitButton = styled(Button)`
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    margin-top: ${theme.spacing.sm}px;
    height: 48px; /* Larger touch target */
    font-size: 1rem;
  }
`;

const MobileFormActions = styled(FormActions)`
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    margin-top: ${theme.spacing.md}px;
  }
`;

const MobileAddButton = styled(AddItemButton)`
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
  }
`;

const MobileCloseButton = styled(CloseModalButton)`
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
    font-size: 1.8rem;
  }
`;

const MobileSectionTitle = styled(SectionTitle)`
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.2rem;
    margin-bottom: ${theme.spacing.md}px;
  }
`;

const MobileAddItemButton = styled(AddItemButton)`
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
  }
`;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([{ 
    product_id: '',
    quantity: 1,
    mold_order_subtype: 'Mold',
    status: 'Ordered'
  }]);
  
  // New state for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortDirection, setSortDirection] = useState('desc');
  const [activeTab, setActiveTab] = useState('all');
  
  const { user } = useAuth();
  
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      customer_address: '',
      notes: '',
      status: 'Ordered',
    }
  });
  
  // Watch selected products to determine available subtypes
  const watchedItems = watch();

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);
  
  useEffect(() => {
    if (editingOrder) {
      reset({
        customer_name: editingOrder.customer_name || '',
        customer_email: editingOrder.customer_email || '',
        customer_phone: editingOrder.customer_phone || '',
        customer_address: editingOrder.customer_address || '',
        notes: editingOrder.notes || '',
        status: editingOrder.status || 'Ordered',
      });
      
      if (editingOrder.items && editingOrder.items.length > 0) {
        setOrderItems(editingOrder.items);
      } else {
        setOrderItems([{ 
          product_id: '',
          quantity: 1,
          mold_order_subtype: 'Mold',
          status: 'Ordered'
        }]);
      }
    } else {
      reset({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_address: '',
        notes: '',
        status: 'Ordered',
      });
      
      setOrderItems([{ 
        product_id: '',
        quantity: 1,
        mold_order_subtype: 'Mold',
        status: 'Ordered'
      }]);
    }
  }, [editingOrder, reset]);

  // Update the fetchOrders function
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const fetchOrderDetail = async (id) => {
    try {
      const data = await getOrderById(id);
      setOrderDetail(data);
      setShowDetail(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
    }
  };

  // Update the handleCreateOrder function to match the API structure
  const handleCreateOrder = async (data) => {
    // Validate items
    const validItems = orderItems.filter(item => 
      item.product_id && item.quantity && item.mold_order_subtype && item.status
    );
    
    if (validItems.length === 0) {
      toast.error('At least one valid item is required');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Format the request payload according to API specification
      const orderData = {
        status: data.status,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        customer_address: data.customer_address,
        notes: data.notes || "",
        employee_id: user?.id || 1, // Use current user's ID
        items: orderItems
          .filter(item => item.product_id) // Only include items with product_id
          .map(item => ({
            product_id: Number(item.product_id),
            quantity: Number(item.quantity),
            mold_order_subtype: item.mold_order_subtype,
            status: "Ordered" // Always use "Ordered" for new items
          }))
      };
      
      // Log the request payload for debugging
      console.log('Creating order with payload:', JSON.stringify(orderData, null, 2));
      
      await createOrder(orderData);
      toast.success('Order created successfully');
      setShowForm(false);
      fetchOrders();
      reset();
      setOrderItems([{ 
        product_id: '',
        quantity: 1,
        mold_order_subtype: 'Mold',
        status: 'Ordered'
      }]);
    } catch (error) {
      console.error('Error creating order:', error);
      
      // Enhanced error handling
      if (error.response) {
        console.log('Error response data:', error.response.data);
        if (error.response.data && error.response.data.detail) {
          toast.error(`Failed to create order: ${error.response.data.detail}`);
        } else {
          toast.error(`Failed to create order: ${error.response.status} ${error.response.statusText}`);
        }
      } else {
        toast.error('Failed to create order. Please check your connection and try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateOrder = async (data) => {
    // Validate items
    const validItems = orderItems.filter(item => 
      item.product_id && item.quantity && item.mold_order_subtype && item.status
    );
    
    if (validItems.length === 0) {
      toast.error('At least one valid item is required');
      return;
    }
    
    const employee_id = user?.id || 1; // Define employee_id here
    
    const orderData = {
      ...data,
      employee_id,
      items: orderItems.map(item => ({
        ...item,
        product_id: parseInt(item.product_id),
        quantity: parseInt(item.quantity)
      }))
    };
    
    try {
      await updateOrder(editingOrder.id, orderData);
      toast.success('Order updated successfully');
      setShowForm(false);
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id);
        toast.success('Order deleted successfully');
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to delete order');
      }
    }
  };

  const onSubmit = (data) => {
    if (editingOrder) {
      handleUpdateOrder(data);
    } else {
      handleCreateOrder(data);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingOrder(null);
  };
  
  const handleAddItem = () => {
    setOrderItems([
      ...orderItems,
      { 
        product_id: '',
        quantity: 1,
        mold_order_subtype: 'Mold',
        status: 'Ordered'
      }
    ]);
  };
  
  const handleRemoveItem = (index) => {
    if (orderItems.length === 1) {
      toast.info('Order must have at least one item');
      return;
    }
    
    const newItems = [...orderItems];
    newItems.splice(index, 1);
    setOrderItems(newItems);
  };
  
  const handleItemChange = (index, field, value) => {
    const newItems = [...orderItems];
    newItems[index][field] = value;
    
    // If product type changes, update the subtype accordingly
    if (field === 'product_id') {
      const selectedProduct = products.find(p => p.id === parseInt(value));
      if (selectedProduct) {
        if (selectedProduct.category === 'Mold') {
          newItems[index].mold_order_subtype = 'Injection Mold';
        } else if (selectedProduct.category === 'Machinery') {
          newItems[index].mold_order_subtype = 'CNC Machine';
        }
      }
    }
    
    setOrderItems(newItems);
  };
  
  const getSubtypeOptions = (productId) => {
    if (!productId) return MOLD_SUBTYPES;
    
    const selectedProduct = products.find(p => p.id === parseInt(productId));
    if (!selectedProduct) return MOLD_SUBTYPES;
    
    return selectedProduct.category === 'Machinery' ? MACHINERY_SUBTYPES : MOLD_SUBTYPES;
  };
  
  const closeDetailModal = () => {
    setShowDetail(false);
    setOrderDetail(null);
  };

  // Filter and sort orders
  const getFilteredOrders = () => {
    let filtered = [...orders];
    
    // Filter by tab
    if (activeTab === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(order => new Date(order.created_at) >= oneWeekAgo);
    } else if (activeTab === 'processing') {
      filtered = filtered.filter(order => order.status === 'Processing');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(order => order.status === 'Completed' || order.status === 'Delivered');
    }
    
    // Filter by status if not 'all'
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        (order.id && order.id.toString().includes(query)) ||
        (order.customer_name && order.customer_name.toLowerCase().includes(query)) ||
        (order.customer_email && order.customer_email.toLowerCase().includes(query))
      );
    }
    
    // Sort orders
    filtered.sort((a, b) => {
      if (sortDirection === 'asc') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    });
    
    return filtered;
  };

  return (
    <OrdersContainer>
      <OrderHeader>
        <TabsContainer>
          <TabsList>
            <Tab 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
            >
              All Orders
            </Tab>
            <Tab 
              active={activeTab === 'recent'} 
              onClick={() => setActiveTab('recent')}
            >
              Recent (7 days)
            </Tab>
            <Tab 
              active={activeTab === 'processing'} 
              onClick={() => setActiveTab('processing')}
            >
              Processing
            </Tab>
            <Tab 
              active={activeTab === 'completed'} 
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </Tab>
          </TabsList>
        </TabsContainer>
        
        <SearchAndFilterContainer>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search by ID, customer name, or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ClearButton 
              visible={searchQuery.length > 0} 
              onClick={() => setSearchQuery('')}
            >
              <FaTimes />
            </ClearButton>
          </SearchContainer>
          
          <FilterContainer>
            <FilterSelect 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Ordered">Ordered</option>
              <option value="Processing">Processing</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </FilterSelect>
            
            <SortButton 
              title={sortDirection === 'desc' ? 'Sort Oldest First' : 'Sort Newest First'}
              onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
            >
              {sortDirection === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
            </SortButton>
            
            <NewOrderButton onClick={() => setShowForm(true)}>
              <FaPlus style={{ marginRight: '8px' }} /> New Order
            </NewOrderButton>
          </FilterContainer>
        </SearchAndFilterContainer>
      </OrderHeader>
      
      <TableContainer>
        {loading ? (
          <Loading>
            <Spinner />
            <span style={{ marginLeft: '10px' }}>Loading orders...</span>
          </Loading>
        ) : getFilteredOrders().length > 0 ? (
          <DataTable>
                <thead>
                  <tr>
                  <th>ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                  <th>Items</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {getFilteredOrders().map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      <div>{order.customer_name}</div>
                      <div style={{ fontSize: '0.85rem', color: theme.palette.text.secondary }}>
                        {order.customer_email}
                      </div>
                    </td>
                    <td>
                      <Badge status={order.status}>{order.status}</Badge>
                    </td>
                    <td>{order.items ? order.items.length : 0} items</td>
                    <td>
                      <ActionButtons>
                        <IconButton onClick={() => fetchOrderDetail(order.id)} title="View">👁️</IconButton>
                        <IconButton onClick={() => handleEdit(order)} title="Edit">✏️</IconButton>
                        <IconButton onClick={() => handleDeleteOrder(order.id)} title="Delete">🗑️</IconButton>
                      </ActionButtons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          ) : (
            <EmptyState>
              <h4>No orders found</h4>
              <p>{searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or filters' : 'Create your first order to get started'}</p>
              <Button onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setActiveTab('all');
                if (orders.length === 0) {
                  setShowForm(true);
                }
              }}>
                {searchQuery || statusFilter !== 'all' ? 'Clear Filters' : 'Create Order'}
              </Button>
            </EmptyState>
          )}
        </TableContainer>
      
      {/* Order Form Modal */}
      {showForm && (
        <OverlayContainer onClick={handleCancel}>
          <MobileFormModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingOrder ? (
                  <>
                    <FaBoxOpen /> Edit Order #{editingOrder.id}
                  </>
                ) : (
                  <>
                    <FaPlus /> Create New Order
                  </>
                )}
              </ModalTitle>
              <MobileCloseButton onClick={handleCancel}>
                <FaTimes />
              </MobileCloseButton>
            </ModalHeader>
            <MobileModalContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormSection>
                  <MobileSectionTitle>
                    <FaUser style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                    Customer Information
                  </MobileSectionTitle>
                  <MobileFormRow>
                    <FormGroup>
                      <Input
                        label="Customer Name"
                        placeholder="Full name"
                        error={!!errors.customer_name}
                        helperText={errors.customer_name?.message}
                        {...register('customer_name')}
                        icon={<FaUser />}
                        autoFocus
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        label="Customer Email"
                        placeholder="Email address"
                        error={!!errors.customer_email}
                        helperText={errors.customer_email?.message}
                        {...register('customer_email')}
                        icon={<FaEnvelope />}
                        type="email"
                      />
                    </FormGroup>
                  </MobileFormRow>
                  
                  <MobileFormRow>
                    <FormGroup>
                      <Input
                        label="Customer Phone"
                        placeholder="Phone number"
                        error={!!errors.customer_phone}
                        helperText={errors.customer_phone?.message}
                        {...register('customer_phone')}
                        icon={<FaPhone />}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        label="Customer Address"
                        placeholder="Delivery address"
                        error={!!errors.customer_address}
                        helperText={errors.customer_address?.message}
                        {...register('customer_address')}
                        icon={<FaHome />}
                      />
                    </FormGroup>
                  </MobileFormRow>
                </FormSection>
                
                <FormSection>
                  <MobileSectionTitle>
                    <FaCalendarAlt style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                    Order Details
                  </MobileSectionTitle>
                  <MobileFormRow>
                    <FormGroup>
                      <Select
                        label="Order Status"
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        {...register('status')}
                        icon={<FaCalendarAlt />}
                      >
                        <option value="Ordered">Ordered</option>
                        <option value="Processing">Processing</option>
                        <option value="Ready">Ready</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </Select>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        label="Notes (Optional)"
                        placeholder="Additional notes or instructions"
                        error={!!errors.notes}
                        helperText={errors.notes?.message}
                        {...register('notes')}
                      />
                    </FormGroup>
                  </MobileFormRow>
                </FormSection>
                
                <FormSection>
                  <MobileSectionTitle>
                    <FaBoxOpen style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                    Order Items
                  </MobileSectionTitle>
                  <OrderItems>
                    {orderItems.map((item, index) => (
                      <MobileOrderItem key={index}>
                        <OrderItemHeader>
                          <OrderItemTitle>
                            <FaBoxOpen /> Item #{index + 1}
                          </OrderItemTitle>
                          <RemoveButton 
                            type="button" 
                            onClick={() => handleRemoveItem(index)}
                            title="Remove item"
                          >
                            <FaTimes />
                          </RemoveButton>
                        </OrderItemHeader>
                        <MobileFormRow>
                          <FormGroup>
                            <Select
                              label="Product"
                              value={item.product_id}
                              onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                              required
                              icon={<FaBoxOpen />}
                            >
                              <option value="">Select Product</option>
                              {products.map(product => (
                                <option key={product.id} value={product.id}>
                                  {product.name} ({product.category})
                                </option>
                              ))}
                            </Select>
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="number"
                              label="Quantity"
                              placeholder="Enter quantity"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                              min="1"
                              required
                            />
                          </FormGroup>
                        </MobileFormRow>
                        <MobileFormRow>
                          <FormGroup>
                            <Select
                              label="Subtype"
                              value={item.mold_order_subtype}
                              onChange={(e) => handleItemChange(index, 'mold_order_subtype', e.target.value)}
                              required
                            >
                              {getSubtypeOptions(item.product_id).map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          </FormGroup>
                          <FormGroup>
                            <Select
                              label="Status"
                              value={item.status}
                              onChange={(e) => handleItemChange(index, 'status', e.target.value)}
                              required
                            >
                              <option value="Ordered">Ordered</option>
                              <option value="Processing">Processing</option>
                              <option value="Ready">Ready</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </Select>
                          </FormGroup>
                        </MobileFormRow>
                      </MobileOrderItem>
                    ))}
                    <MobileAddItemButton 
                      type="button" 
                      onClick={handleAddItem}
                      variant="outline"
                      size="small"
                    >
                      <FaPlus style={{ marginRight: '8px' }} /> Add Another Item
                    </MobileAddItemButton>
                  </OrderItems>
                </FormSection>

                <MobileFormActions>
                  <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                  <SubmitButton 
                    type="submit" 
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <FaSpinner style={{ marginRight: '8px' }} /> Submitting...
                      </>
                    ) : (
                      <>
                        {editingOrder ? (
                          <>
                            <FaCheck style={{ marginRight: '8px' }} /> Update Order
                          </>
                        ) : (
                          <>
                            <FaCheck style={{ marginRight: '8px' }} /> Create Order
                          </>
                        )}
                      </>
                    )}
                  </SubmitButton>
                </MobileFormActions>
              </form>
            </MobileModalContent>
          </MobileFormModal>
        </OverlayContainer>
      )}
      
      {/* Order Detail Modal */}
      {showDetail && orderDetail && (
        <OverlayContainer onClick={closeDetailModal}>
          <MobileFormModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <FaBoxOpen /> Order #{orderDetail.id}
              </ModalTitle>
              <MobileCloseButton onClick={closeDetailModal}>
                <FaTimes />
              </MobileCloseButton>
            </ModalHeader>
            <MobileModalContent>
              <FormSection>
                <SectionTitle>
                  <FaUser style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                  Customer Information
                </SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <FaUser style={{ marginRight: '8px', color: theme.palette.text.secondary }} />
                      <strong>Name:</strong> 
                      <span style={{ marginLeft: '8px' }}>{orderDetail.customer_name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <FaEnvelope style={{ marginRight: '8px', color: theme.palette.text.secondary }} />
                      <strong>Email:</strong>
                      <span style={{ marginLeft: '8px' }}>{orderDetail.customer_email}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <FaPhone style={{ marginRight: '8px', color: theme.palette.text.secondary }} />
                      <strong>Phone:</strong>
                      <span style={{ marginLeft: '8px' }}>{orderDetail.customer_phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <FaHome style={{ marginRight: '8px', color: theme.palette.text.secondary }} />
                      <strong>Address:</strong>
                      <span style={{ marginLeft: '8px' }}>{orderDetail.customer_address || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </FormSection>
              
              <FormSection>
                <SectionTitle>
                  <FaCalendarAlt style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                  Order Details
                </SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Status:</strong>
                    <span style={{ marginLeft: '8px' }}>
                      <Badge status={orderDetail.status}>{orderDetail.status}</Badge>
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Notes:</strong>
                    <span style={{ marginLeft: '8px' }}>{orderDetail.notes || 'None'}</span>
                  </div>
                </div>
              </FormSection>
              
              <FormSection>
                <SectionTitle>
                  <FaBoxOpen style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                  Order Items
                </SectionTitle>
                {orderDetail.items && orderDetail.items.length > 0 ? (
                  <DataTable>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Subtype</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetail.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product_id}</td>
                          <td>{item.quantity}</td>
                          <td>{item.mold_order_subtype}</td>
                          <td>
                            <Badge status={item.status}>{item.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </DataTable>
                ) : (
                  <p>No items in this order</p>
                )}
              </FormSection>
              <FormActions>
                <SubmitButton onClick={closeDetailModal}>Close</SubmitButton>
              </FormActions>
            </MobileModalContent>
          </MobileFormModal>
        </OverlayContainer>
      )}
    </OrdersContainer>
  );
}

export default Orders; 