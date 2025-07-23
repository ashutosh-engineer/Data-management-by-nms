import React from 'react';

function Services() {
  return (
    <section className="section" id="services" style={{ backgroundColor: 'var(--color-lighter)' }}>
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Custom Software Development</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Tailored software solutions designed to meet your specific business needs and requirements.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>Custom application development</li>
              <li>Legacy system modernization</li>
              <li>Software integration services</li>
              <li>Quality assurance and testing</li>
            </ul>
          </div>
          
          <div className="service-item">
            <h3>Web Development</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Modern, responsive web applications built with cutting-edge technologies and best practices.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>Frontend development</li>
              <li>Backend development</li>
              <li>Progressive Web Apps</li>
              <li>Web optimization & SEO</li>
            </ul>
          </div>
          
          <div className="service-item">
            <h3>Mobile App Development</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Native and cross-platform mobile applications that deliver exceptional user experiences.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>iOS and Android development</li>
              <li>Cross-platform solutions</li>
              <li>Mobile app UI/UX design</li>
              <li>App maintenance and support</li>
            </ul>
          </div>
          
          <div className="service-item">
            <h3>IT Consulting</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Expert guidance and strategic planning to help you make informed technology decisions.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>Technology strategy consulting</li>
              <li>Digital transformation</li>
              <li>IT infrastructure planning</li>
              <li>Security assessment</li>
            </ul>
          </div>
          
          <div className="service-item">
            <h3>Data Analytics & BI</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Transform your data into actionable insights with our advanced analytics solutions.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>Business Intelligence solutions</li>
              <li>Data visualization</li>
              <li>Predictive analytics</li>
              <li>Real-time analytics dashboards</li>
            </ul>
          </div>
          
          <div className="service-item">
            <h3>Cloud Solutions</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Scalable and secure cloud infrastructure solutions for modern businesses.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>Cloud migration services</li>
              <li>Cloud-native development</li>
              <li>DevOps implementation</li>
              <li>Cloud optimization</li>
            </ul>
          </div>
          
          <div className="service-item">
            <h3>AI & Machine Learning</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Leverage the power of artificial intelligence to automate and optimize your business processes.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>Machine learning models</li>
              <li>Natural Language Processing</li>
              <li>Computer Vision solutions</li>
              <li>AI-powered automation</li>
            </ul>
          </div>
          
          <div className="service-item">
            <h3>Robotics & Automation</h3>
            <p style={{ color: 'var(--color-secondary)', margin: '0 0 var(--spacing-sm)' }}>
              Comprehensive industrial automation solutions integrating robotics and PLC systems for enhanced manufacturing efficiency.
            </p>
            <ul style={{ color: 'var(--color-secondary)', paddingLeft: 'var(--spacing-md)' }}>
              <li>PLC programming and integration</li>
              <li>Industrial robotics control</li>
              <li>SCADA system development</li>
              <li>Process automation solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services; 