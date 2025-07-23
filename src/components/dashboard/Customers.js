import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaSearch, FaSpinner, FaUser, FaEnvelope, FaPhone, FaHome, FaBuilding, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import { getCustomers } from '../../services/apiService';
import theme from '../../theme';

// Styled components
const CustomersContainer = styled.div`
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

const SearchContainer = styled.div`
  flex: 1;
  min-width: 200px;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: 100%;
  }
`;

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
  top: 50%;
  transform: translateY(-50%);
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

const FilterSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: ${theme.borderRadius.md};
  background-color: white;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
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

const TableContainer = styled.div`
  border-radius: ${theme.borderRadius.lg};
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid rgba(230, 235, 240, 0.6);
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
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

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.type === 'Business' 
    ? 'rgba(66, 153, 225, 0.1)'
    : 'rgba(72, 187, 120, 0.1)'
  };
  color: ${props => props.type === 'Business'
    ? '#3182ce'
    : '#38a169'
  };
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  color: ${theme.palette.text.secondary};
`;

const Spinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: 1.75rem;
  margin-right: 10px;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  }
`;

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  
  useEffect(() => {
    fetchCustomers();
  }, []);
  
  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm, categoryFilter]);
  
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      // This would be replaced by a real API call
      // For now we'll simulate some data
      const mockData = [
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
      
      // In a real app, this would be:
      // const data = await getCustomers();
      setCustomers(mockData);
      setFilteredCustomers(mockData);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };
  
  const filterCustomers = () => {
    let filtered = [...customers];
    
    // Filter by search term
    if (searchTerm.trim()) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        (customer.name && customer.name.toLowerCase().includes(lowercaseSearch)) ||
        (customer.email && customer.email.toLowerCase().includes(lowercaseSearch)) ||
        (customer.phone && customer.phone.includes(lowercaseSearch)) ||
        (customer.address && customer.address.toLowerCase().includes(lowercaseSearch))
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'ALL') {
      filtered = filtered.filter(customer => customer.category === categoryFilter);
    }
    
    setFilteredCustomers(filtered);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };
  
  return (
    <CustomersContainer>
      <FilterToolbar>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search customers..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchContainer>
        
        <FilterControl>
          <FilterLabel>Filter by Category</FilterLabel>
          <FilterSelect value={categoryFilter} onChange={handleCategoryFilterChange}>
            <option value="ALL">All Categories</option>
            <option value="Business">Business</option>
            <option value="Individual">Individual</option>
          </FilterSelect>
        </FilterControl>
      </FilterToolbar>
      
      <ContentContainer>
        {loading ? (
          <Loading>
            <Spinner />
            <span style={{ marginLeft: '10px' }}>Loading customers...</span>
          </Loading>
        ) : filteredCustomers.length > 0 ? (
          <TableContainer>
            <DataTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Category</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <CategoryBadge type={customer.category}>
                        {customer.category}
                      </CategoryBadge>
                    </td>
                    <td>{customer.address}</td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </TableContainer>
        ) : (
          <EmptyState>
            <h4>No customers found</h4>
            <p>{searchTerm || categoryFilter !== 'ALL' ? 'Try adjusting your search or filters' : 'No customer data available'}</p>
          </EmptyState>
        )}
      </ContentContainer>
    </CustomersContainer>
  );
}

export default Customers; 