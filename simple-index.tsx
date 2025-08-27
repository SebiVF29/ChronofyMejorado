import React from 'react';
import ReactDOM from 'react-dom/client';
import SimpleApp from './SimpleApp';
import './index.css';

console.log('🚀 Starting Simple Chronofy App...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: red;">Error: Root element not found</h1>
      <p>The HTML file is missing the root div element.</p>
    </div>
  `;
} else {
  console.log('✅ Root element found, creating React app...');
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <SimpleApp />
      </React.StrictMode>
    );
    console.log('✅ React app rendered successfully!');
  } catch (error) {
    console.error('❌ Error rendering React app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <h1 style="color: red;">React Rendering Error</h1>
        <p>There was an error rendering the React application.</p>
        <pre style="background: #f5f5f5; padding: 10px; text-align: left;">${error}</pre>
        <button onclick="window.location.reload()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
}
