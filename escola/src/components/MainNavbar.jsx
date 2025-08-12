import React, { useState } from 'react';

function MainNavbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { name: 'Home', dropdown: ['Home 01', 'Home 02', 'Home 03'] },
    { name: 'About Us' },
    { name: 'Course' },
    { name: 'Pages', dropdown: ['Team', 'Pricing', 'Testimonial', 'Events', 'FAQs', '404 Error'] },
    { name: 'Blog' },
    { name: 'Contact Us' },
  ];

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '18px 0',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      width: '100%',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
      }}>
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '32px',
          fontWeight: '700',
          color: '#2c3e50',
          textDecoration: 'none',
        }}>
          <i className="fas fa-book-open" style={{ color: '#4fd1c7' }}></i>
          Escola
        </a>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '40px',
          margin: 0,
          padding: 0,
        }}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              style={{ position: 'relative' }}
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
            >
              <a href="#" style={{
                textDecoration: 'none',
                color: '#2c3e50',
                fontWeight: '500',
                fontSize: '16px',
              }}>
                {item.name}
              </a>
              {item.dropdown && activeDropdown === item.name && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  listStyle: 'none',
                  margin: '10px 0 0 0',
                  padding: '10px 0',
                  minWidth: '150px',
                  boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
                  borderRadius: '5px',
                  zIndex: 20,
                }}>
                  {item.dropdown.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a href="#" style={{
                        display: 'block',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        color: '#2c3e50',
                        fontWeight: '500',
                        fontSize: '14px',
                      }}>
                        {subItem}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 20px',
          border: '2px solid #e9ecef',
          borderRadius: '50px',
        }}>
          <i className="fas fa-headset" style={{ color: '#4285f4' }}></i>
          <div>
            <div style={{ fontSize: '12px', color: '#6c757d' }}>Need help?</div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: '#2c3e50' }}>(307) 555-0133</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { MainNavbar };