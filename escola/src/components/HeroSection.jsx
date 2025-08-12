import React from 'react';

// This component displays a hero section with two side-by-side images and an overlay on the left image.
function HeroSection() {
  return (
    // The main container for the hero section.
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      padding: '3rem 0',
    }}>
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 20px',
        width: '100%',
        gap: '2rem',
      }}>
        
        {/* Left side: Image container with text overlay */}
        <div style={{ flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
          <img
            src="./media/students.jpg"
            alt="Students studying"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(17, 24, 39, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ textAlign: 'left', color: 'white', maxWidth: '512px' }}>
              <h3 style={{ color: '#4fd1c7', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Click Learn Thrive</h3>
              <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: 1.25, marginBottom: '1rem' }}>
                Unlock your potential through education
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'rgba(209, 213, 219, 1)', marginBottom: '2rem' }}>
                Magnis viverra nisl rhoncus egestas rhoncus elit at. Massa volutpat eleifend pellentesque vivamus nulla.
              </p>
              <button style={{
                backgroundColor: '#facc15',
                color: '#1f2937',
                fontWeight: 'bold',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                transition: 'background-color 0.3s',
                cursor: 'pointer',
                border: 'none',
              }}>
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Right side: Rectangle image container */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '400px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', overflow: 'hidden' }}>
            <img
              src="./media/rectangle.png"
              alt="Right side visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
