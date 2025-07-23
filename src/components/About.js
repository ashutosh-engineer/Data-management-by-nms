import React from 'react';

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div style={{ maxWidth: '800px' }}>
          <h2 className="section-title">About NMS Softwares</h2>
          <p style={{ fontSize: '1.1rem' }}>
            NMS Softwares is a modern technology company that specializes in end-to-end data management solutions. Founded with a vision to simplify complex data challenges, we've helped enterprises transform their data operations and unlock new business value.
          </p>
          <p style={{ fontSize: '1.05rem' }}>
            While our core focus is on data management, we also provide tailored services in web and mobile app development, as well as advanced AI and machine learning solutions. Our team combines technical excellence with deep industry knowledge to deliver solutions that address real business needs.
          </p>
          <p>
            Headquartered in Vadodara, Gujarat, our expert team works with businesses across multiple sectors, helping them leverage the power of data for strategic advantage. We pride ourselves on building long-term partnerships with our clients, serving as their trusted technology advisors throughout their digital transformation journey.
          </p>
          <p>
            At NMS Softwares, we believe that every business, regardless of size or industry, should have access to powerful data management tools that drive growth and innovation. This philosophy guides our product development and service delivery, ensuring that our solutions are both sophisticated and accessible.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About; 