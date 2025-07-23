import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/apiService';
import { getOrders } from '../../services/apiService';
import theme from '../../theme';
import { FaPlus, FaSearch, FaChevronDown, FaChevronUp, FaBox, FaSpinner, FaCheck, FaTimes, FaChartBar, FaUser, FaEnvelope, FaPhone, FaHome, FaBoxOpen, FaChevronRight, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';


// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Product description is required'),
  stock: yup.number().typeError('Stock must be a number').required('Stock is required').min(0, 'Stock cannot be negative'),
  category: yup.string().required('Product type is required')
});

// Update the ProductsContainer for a lighter look
const ProductsContainer = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: ${theme.spacing.md}px;
  background-color: #f8fafc;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm}px;
    height: calc(100vh - 60px);
  }
`;

// Update the TableContainer for a more elegant look
const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  -webkit-overflow-scrolling: touch;
  padding-bottom: 80px;
  background-color: white;
  border: 1px solid rgba(230, 235, 240, 0.6);
  
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

// Update FilterToolbar for a cleaner look
const FilterToolbar = styled.div`
  display: flex;
  gap: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  flex-wrap: wrap;
  background-color: white;
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  position: sticky;
  top: 0;
  z-index: 4;
  border: 1px solid rgba(230, 235, 240, 0.6);
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm}px;
    gap: ${theme.spacing.sm}px;
    flex-direction: column;
  }
`;

// Update the ProductHeader to be sticky
const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
  padding-bottom: ${theme.spacing.sm}px;
  background-color: ${theme.palette.background.default};
  position: sticky;
  top: 0;
  z-index: 5;
`;

const SearchContainer = styled.div`
  flex: 1;
  min-width: 200px;
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: 100%;
  }
`;

// Update the SearchInput for a more professional look
const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  padding-left: 40px;
  border: 1px solid #e2e8f0;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.95rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: ${theme.palette.text.secondary};
  font-size: 1rem;
`;

const FilterControl = styled.div`
  min-width: 180px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: 100%;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 0.8rem;
  margin-bottom: 4px;
  color: ${theme.palette.text.secondary};
  font-weight: 500;
`;

// Update TypeBadge for a more professional look
const TypeBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.type === 'Mold' 
    ? 'rgba(66, 153, 225, 0.1)'
    : 'rgba(72, 187, 120, 0.1)'
  };
  color: ${props => props.type === 'Mold'
    ? '#3182ce'
    : '#38a169'
  };
`;

// Update DataTable for a cleaner look
const DataTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  
  th, td {
    padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
    text-align: left;
  }
  
  th {
    background-color: #f7fafc;
    color: #4a5568;
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.025em;
    border-bottom: 2px solid #edf2f7;
  }
  
  tr {
    border-bottom: 1px solid #edf2f7;
    transition: all 0.15s ease;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  tbody tr:hover {
    background-color: #f7fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.02);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.9rem;
    
    th, td {
      padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.xs}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-wrap: wrap;
    justify-content: center;
    gap: ${theme.spacing.sm}px;
  }
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
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 8px;
    font-size: 1.1rem;
  }
`;

// Update FilterSelect for a cleaner look
const FilterSelect = styled.select`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.95rem;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%234A5568' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

// Update FormGroup with better spacing
const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md}px;
  
  &:last-of-type {
    margin-bottom: ${theme.spacing.lg}px;
  }
`;

// Update OverlayContainer for a cleaner look
const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.15);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Update EmptyState for a cleaner look
const EmptyState = styled.div`
  padding: ${theme.spacing.xl}px;
  text-align: center;
  color: #718096;
  
  h4 {
    margin: ${theme.spacing.sm}px 0;
    font-weight: 600;
    font-size: 1.125rem;
    color: #4a5568;
  }
  
  p {
    margin-bottom: ${theme.spacing.md}px;
    color: #718096;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  color: ${theme.palette.text.secondary};
`;

// Update FormActions for a more balanced look
const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${theme.spacing.lg}px;
  gap: ${theme.spacing.sm}px;
  
  & > button {
    min-width: 120px;
  }
`;

// Update FloatingAddButton for a cleaner look
const FloatingAddButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 100;
  background: ${theme.palette.primary.main};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 14px rgba(66, 153, 225, 0.35);
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${theme.palette.primary.dark};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(66, 153, 225, 0.4);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    font-size: 1.4rem;
  }
`;

// Modal Overlay - improve with subtle backdrop blur
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.15);
  backdrop-filter: blur(2px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Update ModalContent for a more professional look
const ModalContent = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.2s ease;
  border: 1px solid rgba(240, 244, 248, 0.8);
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 95%;
    max-height: 95vh;
  }
  
  /* Add custom scrollbar styling */
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

const ModalClose = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
  z-index: 10;
`;

// Order status icons
const getStatusIcon = (status) => {
  switch(status.toLowerCase()) {
    case 'ordered': return <FaBox />;
    case 'processing': return <FaSpinner />;
    case 'dispatched': return <FaBox />;
    case 'delivered': return <FaCheck />;
    case 'cancelled': return <FaTimes />;
    default: return <FaBox />;
  }
};

// Order status colors
const getStatusColor = (status) => {
  switch(status.toLowerCase()) {
    case 'ordered': return theme.palette.info.main;
    case 'processing': return theme.palette.warning.main;
    case 'dispatched': return theme.palette.secondary.main;
    case 'delivered': return theme.palette.success.main;
    case 'cancelled': return theme.palette.error.main;
    default: return theme.palette.text.secondary;
  }
};

// Update StatusBadge for a cleaner, more professional look
const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${props => props.$color}15;
  color: ${props => props.$color};
  margin: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  
  svg {
    font-size: 0.9rem;
  }
`;

// Collapse section
const CollapseSection = styled.div`
  margin: ${theme.spacing.lg}px 0;
  border: 1px solid ${theme.palette.neutral[200]};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

const CollapseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background-color: ${theme.palette.neutral[50]};
  cursor: pointer;
  user-select: none;
  border-bottom: ${props => props.isOpen ? `1px solid ${theme.palette.neutral[200]}` : 'none'};
  
  h4 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 1rem;
    color: ${theme.palette.text.primary};
  }
  
  &:hover {
    background-color: ${theme.palette.neutral[100]};
  }
`;

const CollapseContent = styled.div`
  padding: ${props => props.isOpen ? '20px' : '0'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: white;
`;

// Update StatusTable for a cleaner look
const StatusTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  th, td {
    padding: 12px 16px;
    text-align: left;
  }
  
  th {
    font-weight: 600;
    color: #4a5568;
    font-size: 0.9rem;
    border-bottom: 2px solid #edf2f7;
    letter-spacing: 0.025em;
  }
  
  td {
    font-weight: 500;
    border-bottom: 1px solid #edf2f7;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

// Update StatusGrid for a more elegant look
const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${theme.spacing.md}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm}px;
  }
`;

// Update StatusContainer for a cleaner look
const StatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #edf2f7;
  padding-top: 20px;
`;

// Update OrderStatusTitle for a cleaner look
const OrderStatusTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 12px;
  text-align: center;
`;

const StatusDropdown = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1100;
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  width: min(90%, 600px);
  overflow: hidden;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    0% { opacity: 0; transform: translate(-50%, -48%); }
    100% { opacity: 1; transform: translate(-50%, -50%); }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 95%;
    max-height: 80vh;
  }
`;

const StatusDropdownHeader = styled.div`
  padding: 16px 20px;
  background-color: #4299e1;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  span {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
  }
`;

const StatusDropdownContent = styled.div`
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

const ActionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  background-color: rgba(0,0,0,0.5);
  animation: fadeInBg 0.2s ease;
  
  @keyframes fadeInBg {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(255,255,255,0.1);
  }
`;

// Add a new styled component for customer orders section
const CustomerOrdersSection = styled.div`
  margin-top: ${theme.spacing.lg}px;
  background-color: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: ${theme.spacing.md}px;
  border-bottom: 1px solid ${theme.palette.neutral[200]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.palette.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    color: ${theme.palette.primary.main};
  }
`;

// Update the StatusFilterTabs component
const StatusFilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs}px;
  margin-top: ${theme.spacing.md}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: ${theme.spacing.xs}px;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: ${theme.palette.neutral[300]};
      border-radius: 4px;
    }
  }
`;

// Update the StatusTab component
const StatusTab = styled.button`
  background-color: ${props => props.active ? theme.palette.primary.main : 'white'};
  color: ${props => props.active ? 'white' : theme.palette.text.primary};
  border: 1px solid ${props => props.active ? theme.palette.primary.main : theme.palette.neutral[300]};
  border-radius: ${theme.borderRadius.md};
  padding: 8px 16px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${props => props.active ? theme.shadows.sm : 'none'};
  
  &:hover {
    background-color: ${props => props.active ? theme.palette.primary.main : theme.palette.neutral[100]};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.sm};
  }
  
  span.count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.active ? 'white' : theme.palette.primary.main};
    color: ${props => props.active ? theme.palette.primary.main : 'white'};
    border-radius: 50%;
    min-width: 24px;
    height: 24px;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0 4px;
  }
`;

const CustomerOrdersContainer = styled.div`
  padding: ${theme.spacing.md}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm}px;
  }
`;

// Update CustomerOrdersGrid for a cleaner look
const CustomerOrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.md}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm}px;
  }
`;

// Update CustomerCard for a more professional look
const CustomerCard = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid #edf2f7;
  padding: ${theme.spacing.md}px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
  will-change: transform, box-shadow;
  
  &:hover {
    border-color: rgba(66, 153, 225, 0.3);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const CustomerInfo = styled.div`
  margin-bottom: ${theme.spacing.sm}px;
`;

const CustomerInfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
  
  svg {
    color: ${theme.palette.text.secondary};
    flex-shrink: 0;
  }
  
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9rem;
  }
`;

const CustomerName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 8px;
  color: ${theme.palette.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: ${theme.palette.primary.main};
  }
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${theme.palette.neutral[200]};
  padding-top: ${theme.spacing.sm}px;
  margin-top: ${theme.spacing.sm}px;
`;

const OrderQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    color: ${theme.palette.text.secondary};
  }
  
  span {
    font-weight: 500;
  }
`;

const OrderStatus = styled.div`
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'Ordered': return '#FFF4DE';
      case 'Processing': return '#DCEDFF';
      case 'Ready': return '#E5F9F6';
      case 'Delivered': return '#E3F9E5';
      case 'Cancelled': return '#FFEBEE';
      default: return theme.palette.neutral[100];
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Ordered': return '#FF9800';
      case 'Processing': return '#1976D2';
      case 'Ready': return '#00BCD4';
      case 'Delivered': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      default: return theme.palette.text.secondary;
    }
  }};
`;

// Add a new StatusDashboard component
const StatusDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.sm}px;
  }
`;

const StatusIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.xs}px;
  background-color: ${props => {
    switch (props.status) {
      case 'Ordered': return '#FFF4DE';
      case 'Processing': return '#DCEDFF';
      case 'Ready': return '#E5F9F6';
      case 'Delivered': return '#E3F9E5';
      case 'Cancelled': return '#FFEBEE';
      default: return theme.palette.neutral[100];
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Ordered': return '#FF9800';
      case 'Processing': return '#1976D2';
      case 'Ready': return '#00BCD4';
      case 'Delivered': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      default: return theme.palette.text.secondary;
    }
  }};
`;

const StatusLabel = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${theme.palette.text.primary};
`;

const StatusCountValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.palette.text.primary};
`;

const CustomerListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  padding-bottom: ${theme.spacing.sm}px;
  border-bottom: 1px solid ${theme.palette.neutral[200]};
`;

const CustomerListTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.palette.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    color: ${theme.palette.primary.main};
  }
`;

const OrderStatusCount = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 14px;
  background-color: rgba(66, 153, 225, 0.1);
  color: #3182ce;
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 4px;
`;

// Update DetailModal for a more professional look
const DetailModal = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.2s ease;
  will-change: transform, opacity;
  border: 1px solid rgba(240, 244, 248, 0.9);
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 95%;
    max-height: 95vh;
  }
  
  /* Add custom scrollbar styling */
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-bottom: 1px solid #edf2f7;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-top-left-radius: ${theme.borderRadius.xl};
  border-top-right-radius: ${theme.borderRadius.xl};
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
  font-size: 1.4rem;
  color: ${theme.palette.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background-color: rgba(237, 242, 247, 0.8);
    color: ${theme.palette.text.primary};
    transform: rotate(90deg);
  }
`;

// Update DetailModalContent to be scrollable if needed
const DetailModalContent = styled.div`
  padding: ${theme.spacing.lg}px;
  max-height: 70vh;
  overflow-y: auto;
  
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

// Add missing ModalBody component
const ModalBody = styled.div`
  padding: ${theme.spacing.lg}px;
  max-height: 70vh;
  overflow-y: auto;
  
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

// Create a styled spinner component with improved design
const Spinner = styled(FaSpinner)`
  animation: ${spinnerAnimation} 1s linear infinite;
  font-size: 1.75rem;
  color: ${theme.palette.primary.main};
  will-change: transform;
  opacity: 0.9;
`;

// Add a new component for order status breakdown
const StatusBreakdownCard = styled(Card)`
  margin-bottom: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  background: white;
`;

const StatusBreakdownTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 ${theme.spacing.md}px 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    color: ${theme.palette.primary.main};
  }
`;

// Update StatusSummaryCard for a more elegant design
const StatusSummaryCard = styled.div`
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.lg};
  background-color: ${props => {
    switch (props.$status?.toLowerCase()) {
      case 'delivered': return 'rgba(72, 187, 120, 0.07)';
      case 'processing': return 'rgba(237, 137, 54, 0.07)';
      case 'cancelled': return 'rgba(229, 62, 62, 0.07)';
      case 'ordered': return 'rgba(66, 153, 225, 0.07)';
      case 'ready': return 'rgba(72, 187, 120, 0.05)';
      case 'dispatched': return 'rgba(76, 81, 191, 0.07)';
      default: return 'rgba(226, 232, 240, 0.6)';
    }
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid ${props => {
    switch (props.$status?.toLowerCase()) {
      case 'delivered': return 'rgba(72, 187, 120, 0.2)';
      case 'processing': return 'rgba(237, 137, 54, 0.2)';
      case 'cancelled': return 'rgba(229, 62, 62, 0.2)';
      case 'ordered': return 'rgba(66, 153, 225, 0.2)';
      case 'ready': return 'rgba(72, 187, 120, 0.15)';
      case 'dispatched': return 'rgba(76, 81, 191, 0.2)';
      default: return 'rgba(226, 232, 240, 0.6)';
    }
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
  }
`;

const StatusCountDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => {
    switch (props.$status?.toLowerCase()) {
      case 'delivered': return theme.palette.success.dark;
      case 'processing': return theme.palette.warning.dark;
      case 'cancelled': return theme.palette.error.dark;
      case 'ordered': return theme.palette.info.dark;
      case 'ready': return theme.palette.success.dark;
      case 'dispatched': return theme.palette.primary.dark;
      default: return theme.palette.text.primary;
    }
  }};
`;

const StatusLabelText = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${theme.palette.text.secondary};
  text-transform: capitalize;
`;

// Enhance the action buttons
const EnhancedActionButtons = styled(ActionButtons)`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    transition: all 0.2s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
  }
  
  .edit-btn {
    background-color: rgba(66, 153, 225, 0.08);
    color: #3182ce;
    
    &:hover {
      background-color: rgba(66, 153, 225, 0.15);
    }
  }
  
  .delete-btn {
    background-color: rgba(229, 62, 62, 0.08);
    color: #e53e3e;
    
    &:hover {
      background-color: rgba(229, 62, 62, 0.15);
    }
  }
  
  .view-btn {
    background-color: rgba(56, 178, 172, 0.08);
    color: #319795;
    
    &:hover {
      background-color: rgba(56, 178, 172, 0.15);
    }
  }
`;

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [orderStatusData, setOrderStatusData] = useState({});
  const [showOrderStatusBreakdown, setShowOrderStatusBreakdown] = useState(false); // Changed to false to hide order status breakdown
  const [allOrderStatusData, setAllOrderStatusData] = useState({
    ordered: 0,
    processing: 0,
    ready: 0,
    delivered: 0,
    cancelled: 0
  });
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [activeStatusDropdown, setActiveStatusDropdown] = useState(null);
  const statusDropdownRef = useRef(null);
  const { user } = useAuth();
  
  const [customerOrders, setCustomerOrders] = useState([]);
  const [filteredCustomerOrders, setFilteredCustomerOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loadingCustomerOrders, setLoadingCustomerOrders] = useState(false);
  const [showCustomerOrders, setShowCustomerOrders] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [statusCounts, setStatusCounts] = useState({});
  
  // Add new state for modal views
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCustomersModal, setShowCustomersModal] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      stock: '',
      category: 'Mold'
    }
  });

  useEffect(() => {
    console.log("Fetching products...");
    fetchProducts();
  }, []);
  
  // Filter products when search term or type filter changes
  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, typeFilter]);
  
  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name,
        description: editingProduct.description || '',
        stock: editingProduct.stock || 0,
        category: editingProduct.category || 'Mold'
      });
      
      console.log("Editing product:", editingProduct);
      // Fetch order status data when a product is being edited/viewed
      // fetchOrderStatusData(editingProduct.id); // This is now handled by handleOrderStatusClick
    } else {
      reset({
        name: '',
        description: '',
        stock: '',
        category: 'Mold'
      });
    }
  }, [editingProduct, reset]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setActiveStatusDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update the fetchProducts function to use the new API structure
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      console.log("Products received:", data);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  
  const filterProducts = () => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          (product.name && product.name.toLowerCase().includes(lowercaseSearch)) || 
          (product.description && product.description.toLowerCase().includes(lowercaseSearch))
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'ALL') {
      result = result.filter(product => product.category === typeFilter);
    }
    
    setFilteredProducts(result);
  };

  const handleCreateProduct = async (data) => {
    try {
      // Format the request payload according to API specification
      const productData = {
        name: data.name,
        description: data.description,
        category: data.category, // Use category directly
        stock: parseInt(data.stock, 10) // Ensure stock is a number
      };
      
      await createProduct(productData);
      toast.success('Product added successfully!');
      setShowForm(false);
      reset(); // Clear form
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product. Please try again.');
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      // Format the request payload according to API specification
      const productData = {
        name: data.name,
        description: data.description,
        category: data.category, // Use category directly
        stock: parseInt(data.stock, 10) // Ensure stock is a number
      };
      
      await updateProduct(editingProduct.id, productData);
      toast.success('Product updated successfully');
      setShowForm(false);
      setEditingProduct(null);
      reset(); // Clear form
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  const onSubmit = (data) => {
    if (editingProduct) {
      handleUpdateProduct(data);
    } else {
      handleCreateProduct(data);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };
  
  // Fetch order status breakdown for a specific product
  const fetchOrderStatusData = async (productId) => {
    setLoadingOrders(true);
    console.log("Fetching order data for product ID:", productId);
    
    try {
      // Try to get real order data
      const orders = await getOrders();
      console.log("Orders fetched:", orders);
      
      // Process orders to count product statuses
      const statusCounts = {
        'Ordered': 0,
        'Processing': 0,
        'Ready': 0,
        'Delivered': 0,
        'Cancelled': 0
      };
      
      if (Array.isArray(orders)) {
        orders.forEach(order => {
          console.log("Processing order:", order);
          if (order.products && Array.isArray(order.products)) {
            order.products.forEach(item => {
              if (item.product_id === productId) {
                const status = item.status || 'Unknown';
                const quantity = item.quantity || 1;
                
                if (!statusCounts[status]) {
                  statusCounts[status] = 0;
                }
                
                statusCounts[status] += quantity;
              }
            });
          }
        });
      } else {
        console.warn("Orders is not an array:", orders);
      }
      
      console.log("Calculated status counts:", statusCounts);
      
      // Filter out statuses with zero count
      const filteredStatusCounts = Object.fromEntries(
        Object.entries(statusCounts).filter(([_, count]) => count > 0)
      );
      
      setOrderStatusData(filteredStatusCounts);
      
      // Always show the order status section
      setShowOrderStatus(true);
      
    } catch (error) {
      console.error('Error fetching order data:', error);
      // Initialize with empty data instead of mock data
      setOrderStatusData({});
      setShowOrderStatus(true);
    } finally {
      setLoadingOrders(false);
    }
  };

  const toggleOrderStatus = () => {
    setShowOrderStatus(!showOrderStatus);
  };

  const handleOrderStatusClick = async (productId, productName) => {
    setSelectedProductId(productId);
    setSelectedProductName(productName);
    setShowStatusModal(true);
    setLoadingOrders(true);
    
    try {
      await fetchOrderStatusData(productId);
    } finally {
      setLoadingOrders(false);
    }
  };

  const closeStatusDropdown = () => {
    setActiveStatusDropdown(null);
  };

  // Fetch customer orders for a specific product
  const fetchCustomerOrders = async (productId) => {
    setLoadingCustomerOrders(true);
    console.log("Fetching customer orders for product ID:", productId);
    
    try {
      const orders = await getOrders();
      console.log("Orders fetched for customer view:", orders);
      
      // Filter orders containing the selected product
      const filteredOrders = [];
      const counts = { All: 0 };
      
      if (Array.isArray(orders)) {
        orders.forEach(order => {
          if (order.products && Array.isArray(order.products)) {
            // Find items that match the product ID
            const matchingItems = order.products.filter(item => item.product_id === productId);
            
            if (matchingItems.length > 0) {
              // For each matching item, create a customer order entry
              matchingItems.forEach(item => {
                const customerOrder = {
                  customer_name: order.customer_name || 'Unknown Customer',
                  customer_email: order.customer_email || 'No email provided',
                  customer_phone: order.customer_phone || 'No phone provided',
                  customer_address: order.customer_address || 'No address provided',
                  quantity: item.quantity || 1,
                  status: item.status || 'Unknown',
                  order_id: order.id,
                  product_id: productId
                };
                
                filteredOrders.push(customerOrder);
                
                // Update status counts
                counts.All = (counts.All || 0) + 1;
                counts[item.status] = (counts[item.status] || 0) + 1;
              });
            }
          }
        });
      }
      
      console.log("Filtered customer orders:", filteredOrders);
      console.log("Status counts:", counts);
      
      setCustomerOrders(filteredOrders);
      setFilteredCustomerOrders(filteredOrders);
      setStatusCounts(counts);
      setShowCustomerOrders(true);
      
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      toast.error('Failed to load customer orders');
      
      // Initialize with empty arrays instead of mock data
      setCustomerOrders([]);
      setFilteredCustomerOrders([]);
      setStatusCounts({ All: 0 });
      
    } finally {
      setLoadingCustomerOrders(false);
    }
  };
  
  // Filter customer orders by status
  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    
    if (status === 'All') {
      setFilteredCustomerOrders(customerOrders);
    } else {
      const filtered = customerOrders.filter(order => order.status === status);
      setFilteredCustomerOrders(filtered);
    }
  };
  
  // Handle view customer orders button click
  const handleViewCustomerOrders = async (productId, productName) => {
    setSelectedProductId(productId);
    setSelectedProductName(productName);
    setShowCustomersModal(true);
    setLoadingCustomerOrders(true);
    
    try {
      await fetchCustomerOrders(productId);
    } finally {
      setLoadingCustomerOrders(false);
    }
  };

  // Add close modal functions
  const closeStatusModal = () => {
    setShowStatusModal(false);
  };
  
  const closeCustomersModal = () => {
    setShowCustomersModal(false);
    setStatusFilter('All'); // Reset filter when closing
  };

  // Check if user is authorized to add products (is_superuser)
  const isAuthorizedToAddProducts = user && user.is_superuser;

  // Check if the screen is mobile size
  const [isMobile, setIsMobile] = useState(window.innerWidth <= parseInt(theme.breakpoints.sm));
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= parseInt(theme.breakpoints.sm.replace('px', '')));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add a function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ordered': return '🛒';
      case 'Processing': return '⚙️';
      case 'Ready': return '📦';
      case 'Delivered': return '✅';
      case 'Cancelled': return '❌';
      default: return '📋';
    }
  };

  // Add a function to fetch order status data for all products
  const fetchAllOrderStatusData = async () => {
    try {
      const orders = await getOrders();
      
      // Count orders by status
      const statusCounts = {
        ordered: 0,
        processing: 0,
        ready: 0,
        delivered: 0,
        cancelled: 0
      };
      
      orders.forEach(order => {
        const status = order.status?.toLowerCase() || 'processing';
        if (statusCounts.hasOwnProperty(status)) {
          statusCounts[status]++;
        }
      });
      
      setAllOrderStatusData(statusCounts);
    } catch (error) {
      console.error('Error fetching order status data:', error);
    }
  };

  return (
    <ProductsContainer>
      {/* Filter Toolbar - Redesigned to match Orders page */}
      <FilterToolbar>
        <SearchAndFilterContainer>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <ClearButton
                visible={searchTerm ? true : false}
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                <FaTimes />
              </ClearButton>
            )}
          </SearchContainer>
          
          <FilterContainer>
            <FilterSelect value={typeFilter} onChange={handleTypeFilterChange}>
              <option value="ALL">All Types</option>
              <option value="Mold">Mold</option>
              <option value="Machinery">Machinery</option>
            </FilterSelect>
          </FilterContainer>
        </SearchAndFilterContainer>
        
        {/* New Order button moved to align with Orders page layout */}
        <NewProductButton onClick={() => setShowForm(true)}>
          <FaPlus /> Add Product
        </NewProductButton>
      </FilterToolbar>
      
      {/* Products Table */}
      <TableContainer>
        {loading ? (
          <Loading>
            <FaSpinner className="spinner" />
            <span style={{ marginLeft: '10px' }}>Loading products...</span>
          </Loading>
        ) : filteredProducts.length > 0 ? (
          <DataTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                    <TypeBadge type={product.category}>
                      {product.category}
                    </TypeBadge>
                  </td>
                  <td>
                    <EnhancedActionButtons>
                      <IconButton 
                        className="edit-btn"
                        onClick={() => handleEdit(product)} 
                        title="Edit Product"
                      >
                        ✏️
                      </IconButton>
                      <IconButton 
                        className="view-btn"
                        onClick={() => handleViewCustomerOrders(product.id, product.name)} 
                        title="View Customer Orders"
                      >
                        👁️
                      </IconButton>
                      <IconButton 
                        className="view-btn"
                        onClick={() => handleOrderStatusClick(product.id, product.name)} 
                        title="View Order Status"
                      >
                        📊
                      </IconButton>
                      <IconButton 
                        className="delete-btn"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                            handleDeleteProduct(product.id);
                          }
                        }} 
                        title="Delete Product"
                      >
                        🗑️
                      </IconButton>
                    </EnhancedActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        ) : (
          <EmptyState>
            <FaBoxOpen size={48} color={theme.palette.neutral[400]} />
            <h4>No products found</h4>
            <p>{searchTerm || typeFilter ? 'Try adjusting your filters' : 'Add your first product to get started'}</p>
            <Button onClick={() => setShowForm(true)}>
              <FaPlus style={{ marginRight: '8px' }} /> Add Product
            </Button>
          </EmptyState>
        )}
      </TableContainer>
      
      {/* Remove the floating add button as we now have it in the toolbar */}
      
      {/* Form Modal */}
      {showForm && (
        <OverlayContainer>
          <ModalContent style={{ position: 'relative' }}>
            <ModalClose onClick={handleCancel} title="Close">×</ModalClose>
            <Card style={{ boxShadow: 'none', border: 'none', margin: 0, padding: 0 }}>
              <Card.Header>
                <Card.Title>
                  {editingProduct && !isAuthorizedToAddProducts 
                    ? 'Product Details' 
                    : editingProduct 
                      ? 'Edit Product' 
                      : 'Add New Product'
                  }
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Input
                      label="Product Name"
                      placeholder="Enter product name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      disabled={editingProduct && !isAuthorizedToAddProducts}
                      {...register('name')}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      label="Description"
                      placeholder="Enter product description"
                      multiline
                      rows={3}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      disabled={editingProduct && !isAuthorizedToAddProducts}
                      {...register('description')}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Select
                      label="Product Type"
                      error={!!errors.category}
                      helperText={errors.category?.message}
                      disabled={editingProduct && !isAuthorizedToAddProducts}
                      {...register('category')}
                    >
                      <option value="Mold">Mold</option>
                      <option value="Machinery">Machinery</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="number"
                      label="Stock"
                      placeholder="Enter stock quantity"
                      error={!!errors.stock}
                      helperText={errors.stock?.message}
                      disabled={editingProduct && !isAuthorizedToAddProducts}
                      {...register('stock')}
                    />
                  </FormGroup>

                  <FormActions>
                    <Button type="button" variant="secondary" onClick={handleCancel}>
                      {editingProduct && !isAuthorizedToAddProducts ? 'Close' : 'Cancel'}
                    </Button>
                    {(isAuthorizedToAddProducts || !editingProduct) && (
                      <Button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</Button>
                    )}
                  </FormActions>
                </form>
              </Card.Content>
            </Card>
          </ModalContent>
        </OverlayContainer>
      )}

      {/* Order Status Modal */}
      {showStatusModal && (
        <OverlayContainer onClick={closeStatusModal}>
          <DetailModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <FaChartBar /> Order Status Breakdown - {selectedProductName}
              </ModalTitle>
              <CloseModalButton onClick={closeStatusModal} title="Close">
                ×
              </CloseModalButton>
            </ModalHeader>
            <DetailModalContent>
              {loadingOrders ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '30px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <Spinner />
                  <div>Loading order data...</div>
                </div>
              ) : Object.keys(orderStatusData).length > 0 ? (
                <>
                  <StatusTable>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th style={{ textAlign: 'center' }}>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(orderStatusData).map(([status, count]) => (
                        <tr key={status}>
                          <td>
                            <StatusBadge $color={getStatusColor(status)}>
                              {getStatusIcon(status)} {status}
                            </StatusBadge>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <OrderStatusCount>{count}</OrderStatusCount>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </StatusTable>
                  
                  <StatusContainer>
                    <OrderStatusTitle>Order Status Summary</OrderStatusTitle>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      justifyContent: 'center', 
                      width: '100%',
                      gap: '10px'
                    }}>
                      {Object.entries(orderStatusData).map(([status, count]) => (
                        <StatusBadge key={status} $color={getStatusColor(status)}>
                          {getStatusIcon(status)} {status}: {count}
                        </StatusBadge>
                      ))}
                    </div>
                  </StatusContainer>
                </>
              ) : (
                <EmptyState>
                  <h4>No order data</h4>
                  <p>There are no orders for this product.</p>
                </EmptyState>
              )}
            </DetailModalContent>
          </DetailModal>
        </OverlayContainer>
      )}

      {/* Customer Orders Modal - Enhanced */}
      {showCustomersModal && selectedProductId && (
        <OverlayContainer onClick={closeCustomersModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <FaChartBar /> Customer Orders for {selectedProductName}
              </ModalTitle>
              <CloseModalButton onClick={closeCustomersModal}>&times;</CloseModalButton>
            </ModalHeader>
            <ModalBody>
              {loadingCustomerOrders ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                  <FaSpinner className="spinner" size={24} />
                </div>
              ) : customerOrders.length > 0 ? (
                <div>
                  <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Button 
                      variant={statusFilter === '' ? 'primary' : 'outline'} 
                      onClick={() => handleStatusFilterChange('')}
                    >
                      All
                    </Button>
                    {['ordered', 'processing', 'ready', 'delivered', 'cancelled'].map(status => (
                      <Button 
                        key={status}
                        variant={statusFilter === status ? 'primary' : 'outline'} 
                        onClick={() => handleStatusFilterChange(status)}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                  
                  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {filteredCustomerOrders.map((order, index) => (
                      <Card key={index} style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            <FaUser style={{ marginRight: '0.5rem' }} />
                            {order.customer_name}
                          </div>
                          <StatusBadge $status={order.status}>{order.status}</StatusBadge>
                        </div>
                        
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                          <FaCalendarAlt style={{ marginRight: '0.5rem' }} />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                        
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                          <FaEnvelope style={{ marginRight: '0.5rem' }} />
                          {order.customer_email}
                        </div>
                        
                        <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                          <FaPhone style={{ marginRight: '0.5rem' }} />
                          {order.customer_phone}
                        </div>
                        
                        <div style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start' }}>
                          <FaHome style={{ marginRight: '0.5rem', marginTop: '0.2rem' }} />
                          <div>{order.customer_address}</div>
                        </div>
                        
                        {order.notes && (
                          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                            Note: {order.notes}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>No customer orders found for this product.</p>
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </OverlayContainer>
      )}
    </ProductsContainer>
  );
}

export default Products; 

// Add these new styled components for the redesigned Orders-style layout
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

const FilterContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
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

const NewProductButton = styled(Button)`
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