import React from 'react';

const SimpleApp: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f5f9',
      fontFamily: 'Inter, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📅</div>
        <h1 style={{ 
          color: '#1f2937', 
          marginBottom: '16px',
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          Chronofy
        </h1>
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '30px',
          fontSize: '18px',
          lineHeight: '1.6'
        }}>
          Your Smart Student Agenda
        </p>
        
        <div style={{
          backgroundColor: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '30px'
        }}>
          <p style={{ color: '#166534', margin: 0, fontWeight: '500' }}>
            ✅ React App is Loading Successfully!
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '30px'
        }}>
          <p style={{ color: '#92400e', margin: 0 }}>
            🔧 This is a simplified version to test deployment
          </p>
        </div>
        
        <button
          onClick={() => {
            console.log('Button clicked - JavaScript is working!');
            alert('JavaScript is working! The white screen issue is fixed.');
          }}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
          }}
        >
          Test Interaction
        </button>
        
        <div style={{ marginTop: '30px', fontSize: '14px', color: '#9ca3af' }}>
          <p>If you can see this page and the button works, your deployment is successful!</p>
          <p>The original app can be restored once we confirm this works.</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleApp;
