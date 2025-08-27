
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

console.log('🚀 Chronofy starting...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = `
    <div style="display: flex; align-items: center; justify-center: center; min-height: 100vh; font-family: Inter, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div style="text-align: center; color: white; padding: 2rem;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">⚠️ Loading Error</h1>
        <p style="margin-bottom: 1rem;">Unable to find root element. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="background: white; color: #667eea; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: bold;">
          🔄 Reload Page
        </button>
      </div>
    </div>
  `;
  throw new Error("Could not find root element to mount to");
}

console.log('✅ Root element found, creating React app...');

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <HashRouter>
          <App />
        </HashRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('✅ React app rendered successfully!');
} catch (error) {
  console.error('❌ Error rendering React app:', error);
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Inter, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div style="text-align: center; color: white; padding: 2rem; max-width: 500px;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">❌ App Error</h1>
        <p style="margin-bottom: 1rem;">There was an error starting Chronofy. Please try refreshing the page.</p>
        <details style="margin-bottom: 1rem; text-align: left;">
          <summary style="cursor: pointer; margin-bottom: 0.5rem;">Error Details</summary>
          <pre style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 0.5rem; font-size: 0.8rem; overflow: auto;">${error}</pre>
        </details>
        <button onclick="window.location.reload()" style="background: white; color: #667eea; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: bold;">
          🔄 Reload Page
        </button>
      </div>
    </div>
  `;
}
