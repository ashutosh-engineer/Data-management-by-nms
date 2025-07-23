import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, Link, useHistory, useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import Products from './dashboard/Products';
import Customers from './dashboard/Customers';
import Users from './dashboard/Users';
import Orders from './dashboard/Orders';
import Notifications from './dashboard/Notifications';
import Profile from './dashboard/Profile';
import Button from './common/Button';
import Card from './common/Card';
import theme from '../theme';
import { useAuth } from '../context/AuthContext';

// Icons for sidebar
const icons = {
  products: <i className="fas fa-box"></i>,
  users: <i className="fas fa-users"></i>,
  customers: <i className="fas fa-user-tie"></i>,
  orders: <i className="fas fa-shopping-cart"></i>,
  profile: <i className="fas fa-user"></i>,
  signout: <i className="fas fa-sign-out-alt"></i>,
  expand: <i className="fas fa-chevron-right"></i>,
  collapse: <i className="fas fa-chevron-left"></i>,
  menu: <i className="fas fa-bars"></i>,
  dashboard: <i className="fas fa-tachometer-alt"></i>,
  notifications: <i className="fas fa-bell"></i>
};

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Styled components for Dashboard
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
`;

// Updated Sidebar component with improved design for mobile
const Sidebar = styled.div`
  width: ${props => props.$collapsed ? '70px' : '250px'};
  height: 100vh;
  background: linear-gradient(180deg, ${theme.palette.primary.dark} 0%, #1e3a5f 100%);
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.medium};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    width: 240px;
    box-shadow: ${props => props.$isOpen ? theme.shadows.lg : 'none'};
  }
`;

// Updated SidebarHeader component - simplified
const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
  padding: ${props => props.$collapsed ? '20px 0' : '20px 16px'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
`;

// Updated Logo component - smaller and cleaner
const Logo = styled(Link)`
  color: white;
  font-weight: 600;
  text-decoration: none;
  font-size: ${props => props.$collapsed ? '1.15rem' : '1.25rem'};
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  
  &:hover {
    text-decoration: none;
    color: ${theme.palette.accent.main};
  }
`;

const CompanyLogo = styled.div`
  width: ${props => props.$collapsed ? '30px' : '34px'};
  height: ${props => props.$collapsed ? '30px' : '34px'};
  background-color: white;
  border-radius: 8px;
  margin-right: ${props => props.$collapsed ? '0' : '10px'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${theme.palette.primary.main};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Navigation = styled.nav`
  flex: 1;
  padding-top: 12px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 3px 10px;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
`;

const NavSectionTitle = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: ${props => props.$collapsed ? '10px 0' : '10px 18px'};
  margin-top: 12px;
  font-weight: 500;
  display: ${props => props.$collapsed ? 'none' : 'block'};
`;

// Updated NavLink component - cleaner and more compact
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${props => props.$collapsed ? '12px 0' : '10px 14px'};
  color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  position: relative;
  font-weight: ${props => props.$active ? '500' : 'normal'};
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
  border-radius: 8px;
  background-color: ${props => props.$active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  transition: all ${theme.transitions.fast};
  margin: 2px 0;
  
  i {
    margin-right: ${props => props.$collapsed ? '0' : '10px'};
    font-size: 1.05rem;
    min-width: ${props => props.$collapsed ? 'auto' : '18px'};
    text-align: center;
    opacity: ${props => props.$active ? '1' : '0.8'};
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    
    i {
      opacity: 1;
    }
  }
`;

// Updated NavText component
const NavText = styled.span`
  white-space: nowrap;
  opacity: ${props => props.$collapsed ? '0' : '1'};
  width: ${props => props.$collapsed ? '0' : 'auto'};
  overflow: hidden;
  transition: opacity ${theme.transitions.fast}, width ${theme.transitions.fast};
  font-size: 0.92rem;
`;

// Updated CollapseButton component
const CollapseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 16px;
  right: ${props => props.$collapsed ? '50%' : '15px'};
  transform: ${props => props.$collapsed ? 'translateX(50%)' : 'none'};
  transition: all ${theme.transitions.medium};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: ${props => props.$collapsed ? 'translateX(50%) scale(1.1)' : 'scale(1.1)'};
  }
  
  &:active {
    transform: ${props => props.$collapsed ? 'translateX(50%) scale(0.95)' : 'scale(0.95)'};
  }
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

// Updated Main component with transient props
const Main = styled.div`
  flex: 1;
  margin-left: ${props => props.$sidebarCollapsed ? '70px' : '250px'};
  transition: margin-left ${theme.transitions.medium};
  width: calc(100% - ${props => props.$sidebarCollapsed ? '70px' : '250px'});
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0;
    width: 100%;
  }
`;

// Updated Header for better mobile display
const Header = styled.header`
  background-color: white;
  padding: 0 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 12px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const MenuToggle = styled.button`
  background: transparent;
  border: none;
  color: ${theme.palette.text.secondary};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: none;
  
  &:hover {
    background-color: ${theme.palette.neutral[100]};
    color: ${theme.palette.primary.main};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }
`;

// Updated PageTitle - smaller and lighter
const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 500;
  color: ${theme.palette.text.primary};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 1.2rem;
  }
`;

// Updated with cleaner design
const BreadcrumbContainer = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const Breadcrumb = styled.div`
  font-size: 0.85rem;
  color: ${theme.palette.text.secondary};
  display: flex;
  align-items: center;
  
  a {
    color: ${theme.palette.text.secondary};
    text-decoration: none;
    
    &:hover {
      color: ${theme.palette.primary.main};
      text-decoration: underline;
    }
  }
  
  span {
    margin: 0 8px;
    color: ${theme.palette.neutral[400]};
  }
  
  strong {
    color: ${theme.palette.text.secondary};
    font-weight: 500;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationBadge = styled.div`
  position: relative;
  margin-right: 16px;
  cursor: pointer;
  color: ${theme.palette.text.secondary};
  font-size: 1.1rem;
  padding: 8px;
  border-radius: 50%;
  
  &:hover {
    background-color: ${theme.palette.neutral[100]};
    color: ${theme.palette.primary.main};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    margin-right: 12px;
  }
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background-color: ${theme.palette.error.main};
  border-radius: 50%;
  border: 2px solid white;
`;

const UserBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.palette.neutral[100]};
  }
`;

// More compact profile avatar for mobile
const ProfileAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${theme.palette.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.95rem;
`;

const UserRole = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  
  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${theme.palette.text.primary};
  }
  
  small {
    font-size: 0.75rem;
    color: ${theme.palette.text.secondary};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

// Sidebar overlay for mobile
const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
  display: none;
  animation: ${fadeIn} 0.3s ease;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 0;
  position: relative;
  overflow-x: hidden;
  background-color: #f8fafc;
`;

const Footer = styled.footer`
  padding: 16px;
  text-align: center;
  color: ${theme.palette.text.secondary};
  font-size: 0.85rem;
  background-color: white;
  border-top: 1px solid ${theme.palette.neutral[200]};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 12px;
    font-size: 0.8rem;
  }
`;

// Add a new styled-component for mobile navigation
const MobileNavActions = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
  z-index: 80;
  justify-content: space-around;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: flex;
  }
`;

const MobileNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  color: ${props => props.$active ? theme.palette.primary.main : theme.palette.text.secondary};
  font-size: 0.7rem;
  cursor: pointer;
  flex: 1;
  
  i {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }
  
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { logout, user, isAdmin } = useAuth();
  const sidebarRef = useRef(null);
  
  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(savedState === 'true');
    }
  }, []);
  
  const handleLogout = () => {
    logout();
    history.push('/');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleSidebarCollapse = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState);
  };
  
  // Helper function to determine if a nav link is active
  const isActive = (path) => {
    if (path === '/dashboard/products' && (location.pathname === '/dashboard' || location.pathname === '/dashboard/products')) {
      return true;
    }
    if (path !== '/dashboard' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  // Helper function to get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes('/products')) return 'Products';
    if (path.includes('/users')) return 'Users';
    if (path.includes('/customers')) return 'Customers';
    if (path.includes('/orders')) return 'Orders';
    if (path.includes('/profile')) return 'Profile';
    
    // Default to Products if no match
    return 'Products';
  };
  
  // Helper function to generate breadcrumb
  const getBreadcrumb = () => {
    const path = location.pathname;
    const basePath = 'Dashboard';
    const currentPage = getPageTitle();
    
    return (
      <BreadcrumbContainer>
        <Breadcrumb>
          <Link to="/dashboard">{basePath}</Link>
          <span>›</span>
          <strong>{currentPage}</strong>
        </Breadcrumb>
      </BreadcrumbContainer>
    );
  };
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) && 
        window.innerWidth <= parseInt(theme.breakpoints.md) && 
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Close sidebar when window resizes to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > theme.breakpoints.md.replace('px', '') && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarOpen]);
  
  return (
    <DashboardContainer>
      {sidebarOpen && <SidebarOverlay $isOpen={sidebarOpen} onClick={() => setSidebarOpen(false)} />}
      <Sidebar ref={sidebarRef} $isOpen={sidebarOpen} $collapsed={sidebarCollapsed}>
        <SidebarHeader $collapsed={sidebarCollapsed}>
          <Logo to="/dashboard" $collapsed={sidebarCollapsed}>
            <CompanyLogo $collapsed={sidebarCollapsed}>
              N
            </CompanyLogo>
            {!sidebarCollapsed && 'NMS'}
          </Logo>
        </SidebarHeader>
        
        <Navigation>
          <NavList>
            <NavSectionTitle $collapsed={sidebarCollapsed}>Management</NavSectionTitle>
            <NavItem>
              <NavLink to="/dashboard/products" $active={isActive('/dashboard/products') ? 1 : 0} $collapsed={sidebarCollapsed}>
                <i>{icons.products}</i>
                <NavText $collapsed={sidebarCollapsed}>Products</NavText>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dashboard/users" $active={isActive('/dashboard/users') ? 1 : 0} $collapsed={sidebarCollapsed}>
                <i>{icons.users}</i>
                <NavText $collapsed={sidebarCollapsed}>Users</NavText>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dashboard/customers" $active={isActive('/dashboard/customers') ? 1 : 0} $collapsed={sidebarCollapsed}>
                <i>{icons.customers}</i>
                <NavText $collapsed={sidebarCollapsed}>Customers</NavText>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dashboard/orders" $active={isActive('/dashboard/orders') ? 1 : 0} $collapsed={sidebarCollapsed}>
                <i>{icons.orders}</i>
                <NavText $collapsed={sidebarCollapsed}>Orders</NavText>
              </NavLink>
            </NavItem>
            
            <NavSectionTitle $collapsed={sidebarCollapsed}>Account</NavSectionTitle>
            <NavItem>
              <NavLink to="/dashboard/profile" $active={isActive('/dashboard/profile') ? 1 : 0} $collapsed={sidebarCollapsed}>
                <i>{icons.profile}</i>
                <NavText $collapsed={sidebarCollapsed}>Profile</NavText>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink as="button" onClick={handleLogout} $collapsed={sidebarCollapsed}>
                <i>{icons.signout}</i>
                <NavText $collapsed={sidebarCollapsed}>Sign Out</NavText>
              </NavLink>
            </NavItem>
          </NavList>
        </Navigation>
        
        <CollapseButton 
          onClick={toggleSidebarCollapse} 
          $collapsed={sidebarCollapsed}
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {sidebarCollapsed ? icons.expand : icons.collapse}
        </CollapseButton>
      </Sidebar>
      
      <Main $sidebarCollapsed={sidebarCollapsed}>
        <Header>
          <HeaderLeft>
            <MenuToggle onClick={toggleSidebar} title="Toggle Menu">
              {icons.menu}
            </MenuToggle>
            <PageTitle>{getPageTitle()}</PageTitle>
            {getBreadcrumb()}
          </HeaderLeft>
          <HeaderRight>
            <NotificationBadge>
              <i className="fas fa-bell"></i>
              <NotificationDot />
            </NotificationBadge>
            <UserBadge>
              <ProfileAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </ProfileAvatar>
              <UserRole>
                <span>{user?.name || 'User'}</span>
                <small>{isAdmin ? 'Administrator' : 'Employee'}</small>
              </UserRole>
            </UserBadge>
          </HeaderRight>
        </Header>
        
        <Content>
          <Switch>
            <Route path="/dashboard" exact>
              <Products />
            </Route>
            <Route path="/dashboard/products">
              <Products />
            </Route>
            <Route path="/dashboard/users">
              <Users />
            </Route>
            <Route path="/dashboard/customers">
              <Customers />
            </Route>
            <Route path="/dashboard/orders">
              <Orders />
            </Route>
            <Route path="/dashboard/profile">
              <Profile />
            </Route>
          </Switch>
        </Content>
        
        {/* Mobile Navigation Bar */}
        <MobileNavActions>
          <MobileNavItem $active={isActive('/dashboard/products')} onClick={() => history.push('/dashboard/products')}>
            <i className="fas fa-box"></i>
            <span>Products</span>
          </MobileNavItem>
          <MobileNavItem $active={isActive('/dashboard/users')} onClick={() => history.push('/dashboard/users')}>
            <i className="fas fa-users"></i>
            <span>Users</span>
          </MobileNavItem>
          <MobileNavItem $active={isActive('/dashboard/orders')} onClick={() => history.push('/dashboard/orders')}>
            <i className="fas fa-shopping-cart"></i>
            <span>Orders</span>
          </MobileNavItem>
          <MobileNavItem $active={isActive('/dashboard/profile')} onClick={() => history.push('/dashboard/profile')}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </MobileNavItem>
        </MobileNavActions>
        
        <Footer>
          © {new Date().getFullYear()} NMS - All rights reserved.
        </Footer>
      </Main>
    </DashboardContainer>
  );
};

export default Dashboard;