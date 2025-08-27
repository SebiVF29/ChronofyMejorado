
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AppDataProvider, useAppData } from './contexts/AppContext';
import { FocusTimerProvider } from './contexts/FocusTimerContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import TasksPage from './pages/TasksPage';
import ExamsPage from './pages/ExamsPage';
import WorkPage from './pages/WorkPage';
import AiAssistantPage from './pages/AiAssistantPage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/layout/Layout';
import ClassesPage from './pages/ClassesPage';
import { Icon } from './components/ui/Icon';
import FocusHubPage from './pages/FocusHubPage';

const App: React.FC = () => {
  try {
    return (
      <ThemeProvider>
        <AuthProvider>
            <AppDataProvider>
              <FocusTimerProvider>
                <MainApp />
              </FocusTimerProvider>
            </AppDataProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  } catch (error) {
    console.error('Critical app error:', error);
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f5f9',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#dc2626' }}>Critical Error</h1>
          <p>Failed to initialize Chronofy. Please refresh the page.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
};

const MainApp: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  try {
    const { theme } = useTheme();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      try {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        root.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#f1f5f9';
      } catch (err) {
        console.error('Theme error:', err);
      }
    }, [theme]);

    if (loading) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f1f5f9',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ fontSize: '18px', color: '#3b82f6' }}>Loading Chronofy...</div>
        </div>
      );
    }

    return (
      <div style={{
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif',
        backgroundColor: theme === 'dark' ? '#0f172a' : '#f1f5f9',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      }}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/*" element={isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    );
  } catch (err) {
    console.error('App error:', err);
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
          maxWidth: '400px',
          textAlign: 'center',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '16px' }}>App Error</h1>
          <p style={{ color: '#374151', marginBottom: '20px' }}>
            There was an error loading Chronofy. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

const ProtectedRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route path="/exams" element={<ExamsPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/ai-assistant" element={<AiAssistantPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/focus-hub" element={<FocusHubPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Layout>
);


export default App;