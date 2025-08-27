
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600 mb-2">Critical Error</h1>
          <p className="text-foreground mb-4">Failed to initialize Chronofy. Please refresh the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
};

const MainApp: React.FC = () => {
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
        <div className="bg-background text-foreground min-h-screen font-sans flex items-center justify-center">
          <Icon name="cog" className="w-16 h-16 text-primary animate-spin" />
        </div>
      );
    }

    return (
      <div className="text-foreground min-h-screen font-sans transition-colors duration-500">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/*" element={isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    );
  } catch (err) {
    console.error('App error:', err);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md bg-card p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-xl font-bold text-red-600 mb-4">App Error</h1>
          <p className="text-card-foreground mb-4">
            There was an error loading Chronofy. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
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