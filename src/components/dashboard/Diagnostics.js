import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getApiHealth } from '../../services/apiService';
import Card from '../common/Card';
import Button from '../common/Button';
import theme from '../../theme';

const DiagnosticsContainer = styled.div`
  padding: ${theme.spacing.lg}px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatusCard = styled(Card)`
  margin-bottom: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const ResultsContainer = styled.div`
  margin-top: ${theme.spacing.md}px;
`;

const EndpointResult = styled.div`
  margin-bottom: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${props => 
    props.$success ? theme.palette.success.light : theme.palette.error.light};
  color: ${props => 
    props.$success ? theme.palette.success.dark : theme.palette.error.dark};
`;

const PreformattedText = styled.pre`
  background-color: ${theme.palette.neutral[100]};
  padding: ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.sm};
  overflow-x: auto;
  font-size: 0.85rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg}px;
  color: ${theme.palette.text.secondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const CustomEndpointInput = styled.div`
  display: flex;
  gap: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  
  input {
    flex: 1;
    padding: ${theme.spacing.sm}px;
    border: 1px solid ${theme.palette.neutral[300]};
    border-radius: ${theme.borderRadius.sm};
    
    &:focus {
      outline: none;
      border-color: ${theme.palette.primary.main};
      box-shadow: 0 0 0 2px ${theme.palette.primary.light}50;
    }
  }
`;

const ApiEndpoint = ({ endpoint, result }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <EndpointResult $success={result.success}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{endpoint}</strong> - {result.message}
        </div>
        <Button 
          variant={result.success ? "success" : "outline"}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>
      
      {expanded && (
        <div style={{ marginTop: theme.spacing.sm }}>
          <div>Status: {result.status}</div>
          {result.responseTime && <div>Response Time: {result.responseTime}ms</div>}
          
          {result.details && (
            <PreformattedText>
              {JSON.stringify(result.details, null, 2)}
            </PreformattedText>
          )}
        </div>
      )}
    </EndpointResult>
  );
};

const Diagnostics = () => {
  const [allResults, setAllResults] = useState(null);
  const [connectivityResult, setConnectivityResult] = useState(null);
  const [customResult, setCustomResult] = useState(null);
  const [customEndpoint, setCustomEndpoint] = useState('/products');
  const [loading, setLoading] = useState(false);
  
  const handleTestAllEndpoints = async () => {
    setLoading(true);
    try {
      // Instead of testing all endpoints, just test the health endpoint
      const healthResult = await getApiHealth();
      setAllResults({
        baseUrl: 'API Server',
        timestamp: new Date().toISOString(),
        endpoints: {
          health: {
            status: healthResult.status === 'ok' ? 200 : 500,
            success: healthResult.status === 'ok',
            responseTime: healthResult.responseTime,
            message: healthResult.status === 'ok' ? 'Success' : 'Error',
            details: healthResult
          }
        }
      });
    } catch (error) {
      console.error('Error testing endpoints:', error);
      setAllResults({
        baseUrl: 'API Server',
        timestamp: new Date().toISOString(),
        endpoints: {
          health: {
            status: 'Error',
            success: false,
            message: error.message,
            details: { error: error.message }
          }
        }
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleTestServerConnectivity = async () => {
    setLoading(true);
    try {
      const result = await getApiHealth();
      setConnectivityResult({
        success: result.status === 'ok',
        responseTime: result.responseTime,
        status: result.status === 'ok' ? 200 : 500,
        message: result.status === 'ok' ? 'Successfully connected to server' : 'Failed to connect to server'
      });
    } catch (error) {
      console.error('Error testing server connectivity:', error);
      setConnectivityResult({
        success: false,
        message: `Failed to connect to server: ${error.message}`,
        details: {
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText
        }
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleTestCustomEndpoint = async () => {
    setLoading(true);
    try {
      // We can't test custom endpoints anymore, so just show a message
      setCustomResult({
        endpoint: customEndpoint,
        status: 'Not Available',
        success: false,
        message: 'Custom endpoint testing is not available in this version',
        details: {
          note: 'This functionality has been removed to match the API structure'
        }
      });
    } catch (error) {
      console.error('Error testing custom endpoint:', error);
      setCustomResult({
        endpoint: customEndpoint,
        status: 'Error',
        success: false,
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <DiagnosticsContainer>
      <Header>
        <Title>API Diagnostics</Title>
      </Header>
      
      <StatusCard>
        <h2>API Endpoint Tester</h2>
        <p>Test API connectivity and endpoints to diagnose issues.</p>
        
        <ButtonGroup>
          <Button 
            onClick={handleTestAllEndpoints} 
            disabled={loading}
          >
            Test All Endpoints
          </Button>
          
          <Button 
            onClick={handleTestServerConnectivity} 
            disabled={loading}
          >
            Test Server Connectivity
          </Button>
        </ButtonGroup>
        
        <CustomEndpointInput>
          <input 
            type="text" 
            value={customEndpoint} 
            onChange={(e) => setCustomEndpoint(e.target.value)}
            placeholder="Enter endpoint path (e.g. /products)"
          />
          <Button 
            onClick={handleTestCustomEndpoint} 
            disabled={loading}
          >
            Test Endpoint
          </Button>
        </CustomEndpointInput>
        
        {loading && <LoadingMessage>Testing endpoints, please wait...</LoadingMessage>}
        
        <ResultsContainer>
          {connectivityResult && (
            <div style={{ marginBottom: theme.spacing.md }}>
              <h3>Server Connectivity</h3>
              <ApiEndpoint endpoint="Base URL" result={connectivityResult} />
            </div>
          )}
          
          {customResult && (
            <div style={{ marginBottom: theme.spacing.md }}>
              <h3>Custom Endpoint Test</h3>
              <ApiEndpoint endpoint={customResult.endpoint} result={customResult} />
            </div>
          )}
          
          {allResults && (
            <div>
              <h3>All Endpoints</h3>
              <div style={{ marginBottom: theme.spacing.sm }}>
                <strong>Base URL:</strong> {allResults.baseURL}
              </div>
              <div style={{ marginBottom: theme.spacing.md }}>
                <strong>Timestamp:</strong> {allResults.timestamp}
              </div>
              
              {Object.entries(allResults.endpoints).map(([name, result]) => (
                <ApiEndpoint key={name} endpoint={name} result={result} />
              ))}
            </div>
          )}
        </ResultsContainer>
      </StatusCard>
    </DiagnosticsContainer>
  );
};

export default Diagnostics; 