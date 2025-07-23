import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';
import GlobalStyles from './theme/GlobalStyles';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy loaded components for better performance
const Customers = lazy(() => import('./components/Customers'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));
const LoginPopup = lazy(() => import('./components/LoginPopup'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const Dashboard = lazy(() => import('./components/Dashboard'));

// Loading spinner component with improved styling
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner-circle"></div>
    <div className="spinner-text">Loading...</div>
  </div>
);

// Scroll to top on page load
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return null;
};

// Scroll to section helper
const ScrollToSection = ({ hash }) => {
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  
  return null;
};

// Protected route component
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authenticated, loading } = useAuth();
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <LoadingSpinner />;
        }
        return authenticated ? (
          <Suspense fallback={<LoadingSpinner />}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

const AppRoutes = () => {
  const { authenticated, loading } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToSection hash={window.location.hash} />
      <div className="App">
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/login">
            {loading ? (
              <LoadingSpinner />
            ) : (
              authenticated ? <Redirect to="/dashboard" /> : (
                <Suspense fallback={<LoadingSpinner />}>
                  <LoginPage />
                </Suspense>
              )
            )}
          </Route>
          <Route path="/">
            <Navbar />
            <main>
              <Hero />
              <Suspense fallback={<LoadingSpinner />}>
                <Customers />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <CTA />
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <Footer />
              </Suspense>
              {showLoginPopup && (
                <Suspense fallback={<LoadingSpinner />}>
                  <LoginPopup setShowLoginPopup={setShowLoginPopup} />
                </Suspense>
              )}
            </main>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} limit={3} />
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
