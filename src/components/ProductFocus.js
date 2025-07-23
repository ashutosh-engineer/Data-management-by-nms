import React from 'react';

function ProductFocus() {
  // Function to detect mobile and open the appropriate WhatsApp link
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    
    // Check if the device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Set the appropriate WhatsApp URL based on device
    const whatsappUrl = isMobile
      ? 'https://wa.me/919558466409?text=I%20am%20interested%20in%20your%20product%20and%20would%20like%20to%20know%20more.'
      : 'https://web.whatsapp.com/send?phone=919558466409&text=I%20am%20interested%20in%20your%20product%20and%20would%20like%20to%20know%20more.';
    
    // Open the WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="product-section" id="product">
      <div className="container">
        <h2>Flagship Data Management Solution</h2>
        <p style={{ maxWidth: '800px', fontSize: '1.1rem', marginBottom: 'var(--spacing-lg)' }}>
          Our core product enables businesses to securely manage and structure large datasets related to their customers — especially useful for enterprises managing layered customer networks (B2B2C). The platform delivers comprehensive data governance while maintaining flexibility for your specific business needs.
        </p>
        
        <div className="product-grid">
          <div>
            <div className="feature-list">
              <div className="feature-item">
                <h3>Centralized Data Control & Access</h3>
                <p>
                  Manage all your customer data from a single, secure platform with role-based access controls and detailed audit logs. Our solution provides granular permission settings, ensuring that sensitive information is only accessible to authorized personnel while maintaining a comprehensive view of your entire data ecosystem.
                </p>
              </div>
              <div className="feature-item">
                <h3>Automation in Data Workflows</h3>
                <p>
                  Reduce manual data handling with intelligent workflows that automate data processing, validation, and distribution. Our platform includes customizable triggers, conditions, and actions that streamline repetitive tasks, reduce human error, and ensure consistent data handling across your organization.
                </p>
              </div>
              <div className="feature-item">
                <h3>Secure, Scalable Cloud Infrastructure</h3>
                <p>
                  Built on enterprise-grade cloud architecture that scales with your business while maintaining the highest security standards. Our infrastructure incorporates multi-layered security protocols, regular penetration testing, and compliance with international data protection standards to safeguard your valuable information.
                </p>
              </div>
              <div className="feature-item">
                <h3>Real-time Data Syncing & Integrity Checks</h3>
                <p>
                  Ensure data consistency across your organization with automatic synchronization and integrity verification. Our platform performs continuous validation checks, identifies inconsistencies, and maintains data quality through advanced reconciliation algorithms, providing you with confidence in your data's accuracy.
                </p>
              </div>
            </div>
            <div style={{ marginTop: 'var(--spacing-lg)' }}>
              <button className="btn" onClick={handleWhatsAppClick}>
                Consult About Product
              </button>
            </div>
          </div>
          <div style={{ 
            backgroundColor: 'var(--color-lighter)', 
            padding: 'var(--spacing-lg)',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-md)',
            height: 'fit-content',
            position: 'sticky',
            top: 'calc(var(--spacing-xl) + 80px)'
          }}>
            <h3>Key Benefits</h3>
            <ul>
              <li>Reduce data management overhead by up to 60% through intelligent automation and streamlined workflows</li>
              <li>Ensure compliance with GDPR, CCPA, and other data protection regulations through built-in privacy controls</li>
              <li>Seamlessly integrate with your existing tech stack using our extensive API library and pre-built connectors</li>
              <li>Gain actionable insights through advanced analytics dashboards with customizable reporting capabilities</li>
              <li>Scale your data operations without proportional cost increases thanks to our efficient cloud architecture</li>
              <li>Eliminate data silos by connecting disparate systems into a unified data management ecosystem</li>
              <li>Improve decision-making with reliable, consistent data available to stakeholders when they need it</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductFocus; 