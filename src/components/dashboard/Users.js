import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../theme';
import Button from '../common/Button';
import { FaUserPlus, FaSearch, FaUserShield, FaUserTie, FaUserCog, FaFilter, FaSort, FaTimes, FaEllipsisV, FaTrash, FaLock, FaPencilAlt, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

const UsersContainer = styled.div`
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

const ActionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md}px;
  flex-wrap: wrap;
  gap: ${theme.spacing.md}px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  background-color: white;
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
    position: sticky;
    top: 0;
    z-index: 2;
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
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.9rem;
    
    th, td {
      padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
    }
  }
`;

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => props.isAdmin 
    ? 'rgba(156, 39, 176, 0.1)'
    : 'rgba(3, 169, 244, 0.1)'
  };
  color: ${props => props.isAdmin 
    ? '#9c27b0'
    : '#03a9f4'
  };
  
  svg {
    margin-right: 4px;
    font-size: 0.8rem;
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
  padding: 6px;
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.palette.text.secondary};
  transition: all ${theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${theme.palette.primary.main};
    background-color: ${theme.palette.primary.light}20;
  }
`;

// New styled components for tabs
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
  display: flex;
  align-items: center;
  gap: 8px;
  
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
  
  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.active ? theme.palette.primary.main : theme.palette.neutral[200]};
    color: ${props => props.active ? 'white' : theme.palette.text.secondary};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
    font-weight: 600;
  }
`;

const SearchBox = styled.div`
  position: relative;
  max-width: 300px;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  padding-left: 36px;
  padding-right: 36px;
  border: 1px solid ${theme.palette.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;
  box-shadow: ${theme.shadows.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${theme.palette.primary.light}40;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.palette.text.secondary};
  font-size: 0.9rem;
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
  font-size: 0.9rem;
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

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid ${theme.palette.neutral[300]};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;
  background-color: white;
  box-shadow: ${theme.shadows.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${theme.palette.primary.light}40;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex: 1;
  }
`;

const UserDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 500;
  color: ${theme.palette.text.primary};
`;

const UserEmail = styled.div`
  font-size: 0.85rem;
  color: ${theme.palette.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
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

function Users() {
  const history = useHistory();
  // Check if user is admin, redirect if not
  const userType = localStorage.getItem('userType');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  if (userType !== 'admin') {
    history.push('/dashboard');
    return null;
  }
  
  // Mock user data with additional properties for filtering
  const allUsers = [
    {
      id: 'USR001',
      name: 'Admin User',
      email: 'admin@nms.com',
      role: 'Administrator',
      department: 'Management',
      phone: '+1 (555) 123-4567',
      lastLogin: 'May 14, 2023 10:23 AM'
    },
    {
      id: 'USR002',
      name: 'John Manager',
      email: 'john@nms.com',
      role: 'Employee',
      department: 'Sales',
      phone: '+1 (555) 234-5678',
      lastLogin: 'May 13, 2023 09:45 AM'
    },
    {
      id: 'USR003',
      name: 'Sarah Analyst',
      email: 'sarah@nms.com',
      role: 'Employee',
      department: 'Operations',
      phone: '+1 (555) 345-6789',
      lastLogin: 'May 12, 2023 03:12 PM'
    },
    {
      id: 'USR004',
      name: 'Mike Support',
      email: 'mike@nms.com',
      role: 'Employee',
      department: 'Support',
      phone: '+1 (555) 456-7890',
      lastLogin: 'May 10, 2023 11:05 AM'
    },
    {
      id: 'USR005',
      name: 'Lisa Admin',
      email: 'lisa@nms.com',
      role: 'Administrator',
      department: 'IT',
      phone: '+1 (555) 567-8901',
      lastLogin: 'May 15, 2023 08:30 AM'
    },
    {
      id: 'USR006',
      name: 'David Developer',
      email: 'david@nms.com',
      role: 'Employee',
      department: 'IT',
      phone: '+1 (555) 678-9012',
      lastLogin: 'May 14, 2023 02:15 PM'
    },
    {
      id: 'USR007',
      name: 'Emma Marketing',
      email: 'emma@nms.com',
      role: 'Employee',
      department: 'Marketing',
      phone: '+1 (555) 789-0123',
      lastLogin: 'May 11, 2023 09:20 AM'
    }
  ];
  
  // Get unique departments for filter dropdown
  const departments = ['all', ...new Set(allUsers.map(user => user.department))];
  
  // Filter users based on active tab and search query
  const filterUsers = () => {
    let filtered = [...allUsers];
    
    // Filter by tab
    if (activeTab === 'admin') {
      filtered = filtered.filter(user => user.role === 'Administrator');
    } else if (activeTab === 'employees') {
      filtered = filtered.filter(user => user.role === 'Employee');
    }
    
    // Filter by department
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(user => user.department === departmentFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query) || 
        user.id.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const displayUsers = filterUsers();
  
  // Count users by role for tab badges
  const adminCount = allUsers.filter(user => user.role === 'Administrator').length;
  const employeeCount = allUsers.filter(user => user.role === 'Employee').length;
  
  return (
    <UsersContainer>
      <ActionHeader>
        <TabsContainer>
          <TabsList>
            <Tab 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
            >
              All Users <span>{allUsers.length}</span>
            </Tab>
            <Tab 
              active={activeTab === 'admin'} 
              onClick={() => setActiveTab('admin')}
            >
              <FaUserShield /> Administrators <span>{adminCount}</span>
            </Tab>
            <Tab 
              active={activeTab === 'employees'} 
              onClick={() => setActiveTab('employees')}
            >
              <FaUserTie /> Employees <span>{employeeCount}</span>
            </Tab>
          </TabsList>
        </TabsContainer>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <SearchBox>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ClearButton 
              visible={searchQuery.length > 0} 
              onClick={() => setSearchQuery('')}
            >
              <FaTimes />
            </ClearButton>
          </SearchBox>
          
          <FilterContainer>
            <FilterSelect 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.filter(d => d !== 'all').map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </FilterSelect>
            
            <Button onClick={() => {}}>
              <FaUserPlus style={{ marginRight: '8px' }} /> Add User
            </Button>
          </FilterContainer>
        </div>
      </ActionHeader>
      
      <TableContainer>
        {displayUsers.length > 0 ? (
          <DataTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <UserDetailContainer>
                      <UserName>{user.name}</UserName>
                      <UserEmail>
                        <FaEnvelope size={10} /> {user.email}
                      </UserEmail>
                    </UserDetailContainer>
                  </td>
                  <td>
                    <RoleBadge isAdmin={user.role === 'Administrator'}>
                      {user.role === 'Administrator' ? <FaUserShield /> : <FaUserTie />}
                      {user.role}
                    </RoleBadge>
                  </td>
                  <td>{user.department}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaPhone size={10} /> {user.phone}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FaCalendarAlt size={10} /> {user.lastLogin}
                    </div>
                  </td>
                  <td>
                    <ActionButtons>
                      <IconButton title="Edit User">
                        <FaPencilAlt size={14} />
                      </IconButton>
                      <IconButton title="Reset Password">
                        <FaLock size={14} />
                      </IconButton>
                      <IconButton title="Delete User">
                        <FaTrash size={14} />
                      </IconButton>
                    </ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        ) : (
          <EmptyState>
            <h4>No users found</h4>
            <p>{searchQuery || departmentFilter !== 'all' ? 'Try adjusting your search or filters' : 'Add users to get started'}</p>
            <Button onClick={() => {
              setSearchQuery('');
              setDepartmentFilter('all');
              setActiveTab('all');
            }}>
              {searchQuery || departmentFilter !== 'all' ? 'Clear Filters' : 'Add User'}
            </Button>
          </EmptyState>
        )}
      </TableContainer>
    </UsersContainer>
  );
}

export default Users; 