
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Icon } from '../ui/Icon';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: 'home', text: 'Dashboard' },
    { to: '/calendar', icon: 'calendar', text: 'Calendar' },
    { to: '/tasks', icon: 'check-circle', text: 'To-Do List' },
    { to: '/focus-hub', icon: 'clock', text: 'Focus Hub' },
    { to: '/classes', icon: 'book-open', text: 'Classes' },
    { to: '/exams', icon: 'academic-cap', text: 'Exams' },
    { to: '/work', icon: 'briefcase', text: 'Work' },
    { to: '/ai-assistant', icon: 'sparkles', text: 'AI Assistant' },
    { to: '/settings', icon: 'cog', text: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-card to-card/80 text-card-foreground p-6 flex flex-col shadow-2xl border-r border-foreground/5 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="academic-cap" className="w-7 h-7 text-white"/>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Chronofy</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform scale-105'
                      : 'hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:scale-105 hover:shadow-md'
                  }`
                }
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  ({ isActive }: { isActive: boolean }) => isActive
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'bg-foreground/5 group-hover:bg-primary/20'
                }`}>
                  <Icon name={item.icon as any} className="w-5 h-5" />
                </div>
                <span className="font-medium">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-background to-background/50 border border-foreground/5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">{user?.name}</p>
              <p className="text-xs text-foreground/60 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-foreground/5 to-foreground/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 hover:scale-105"
            >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-5 h-5"/>
                <span className="text-sm font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 hover:from-red-500/20 hover:to-red-600/20 text-red-500 transition-all duration-300 hover:scale-105"
            >
                <Icon name="logout" className="w-5 h-5"/>
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;