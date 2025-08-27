
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
    <aside className="w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 text-white p-6 flex flex-col shadow-2xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
          <Icon name="academic-cap" className="w-7 h-7 text-white"/>
        </div>
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">Chronofy ✨</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                      : 'hover:bg-white/10 hover:shadow-md backdrop-blur-sm'
                  }`
                }
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  ({ isActive }: { isActive: boolean }) => isActive
                    ? 'bg-white/20 backdrop-blur-sm shadow-lg'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <Icon name={item.icon as any} className="w-5 h-5" />
                </div>
                <span className="font-medium text-white drop-shadow">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto space-y-4">
        <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-bold text-white drop-shadow">{user?.name}</p>
              <p className="text-xs text-white/80 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
            >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-5 h-5 text-white"/>
                <span className="text-sm font-medium text-white drop-shadow">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-red-400/30"
            >
                <Icon name="logout" className="w-5 h-5"/>
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;