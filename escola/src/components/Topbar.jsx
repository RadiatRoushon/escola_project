import React, { useState } from 'react';
import QuoteModal from './QuoteModal';

const TopBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define inline styles for the button and links to ensure visibility.
  const buttonStyle = {
    backgroundColor: isHovered ? '#4a5568' : '#2d3748', // Dark blue on hover
    color: 'white',
    padding: '0 20px',
    height: '40px',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 4px 10px rgba(45, 55, 72, 0.4)' : 'none',
    display: 'flex',
    alignItems: 'center',
    border: 'none',
  };

  const linkStyle = {
    color: '#4a5568', // Dark gray text color for visibility
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  };

  const socialIconStyle = {
    color: '#4a5568', // Dark gray color for social icons
  };

  return (
    <>
      {/* IMPORTANT: For the icons to work, you must add the following line
        to the <head> section of your index.html file:
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      */}
      <nav style={{
        backgroundColor: 'white',
        padding: '12px 0',
        width: '100%',
        borderBottom: '1px solid #e2e8f0',
      }}>
      
        <div style={{
          maxWidth: '1280px', // Corresponds to max-w-7xl
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px', // Corresponds to px-5
        }}>
          <div style={{ display: 'flex', gap: '30px' }}>
            <a href="mailto:info@example.com" style={linkStyle}>
              <i className="fas fa-envelope"></i>
              info@example.com
            </a>
            <a href="#" style={linkStyle}>
              <i className="fas fa-map-marker-alt"></i>
              6391 Elgin St. Celina, 10299
            </a>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            height: '40px'
          }}>
            <button
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsModalOpen(true)}
            >
              Get a Quote
            </button>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={socialIconStyle}><i className="fab fa-facebook-f"></i></a>
              <a href="#" style={socialIconStyle}><i className="fab fa-twitter"></i></a>
              <a href="#" style={socialIconStyle}><i className="fab fa-youtube"></i></a>
              <a href="#" style={socialIconStyle}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </nav>
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default TopBar;
