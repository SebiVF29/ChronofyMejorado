
import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAppData } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import { AppEvent, Task } from '../types';
import { Icon } from '../components/ui/Icon';
import QuickAdd from '../components/dashboard/QuickAdd';
import Gamification from '../components/dashboard/Gamification';
import { useTheme } from '../contexts/ThemeContext';
import { getTextColorForBackground } from '../utils/colorUtils';

const ProductivityTracker: React.FC = () => {
    const { tasks, events } = useAppData();
    const { eventColors } = useTheme();

    const stats = useMemo(() => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const tasksCompletedThisWeek = tasks.filter(task => 
            task.completed && task.completedAt && new Date(task.completedAt) > oneWeekAgo
        ).length;

        const scheduledHoursByCategory = events.reduce((acc, event) => {
            const start = new Date(event.startTime);
            if (start < oneWeekAgo) return acc; // Only count events from the last week

            const duration = (new Date(event.endTime).getTime() - start.getTime()) / (1000 * 60 * 60);
            if(duration > 0) {
                acc[event.type] = (acc[event.type] || 0) + duration;
            }
            return acc;
        }, {} as Record<AppEvent['type'], number>);

        const totalHours = Object.values(scheduledHoursByCategory).reduce((sum, hours) => sum + hours, 0);

        return { tasksCompletedThisWeek, scheduledHoursByCategory, totalHours };
    }, [tasks, events]);

    return (
        <Card className="bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-100 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name="sparkles" className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">📊 Weekly Progress</h2>
            </div>
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-3xl font-bold text-green-600">{stats.tasksCompletedThisWeek}</p>
                            <p className="text-sm text-green-700 font-medium">Tasks completed this week</p>
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">✅</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalHours.toFixed(1)}</p>
                            <p className="text-sm text-blue-700 font-medium">Hours scheduled this week</p>
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">⏰</span>
                        </div>
                    </div>
                    {stats.totalHours > 0 && (
                        <div className="space-y-3">
                            <div className="w-full bg-white rounded-full h-4 flex overflow-hidden shadow-inner border-2 border-gray-100">
                                {Object.entries(stats.scheduledHoursByCategory).map(([type, hours]) => (
                                    <div
                                        key={type}
                                        style={{
                                            width: `${(hours / stats.totalHours) * 100}%`,
                                            backgroundColor: eventColors[type as AppEvent['type']]
                                        }}
                                        className="transition-all duration-300 hover:opacity-80 first:rounded-l-full last:rounded-r-full"
                                        title={`${type.charAt(0).toUpperCase() + type.slice(1)}: ${hours.toFixed(1)} hrs`}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(stats.scheduledHoursByCategory).map(([type, hours]) => (
                                    <div key={type} className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border border-gray-200 shadow-sm">
                                        <div
                                            className="w-3 h-3 rounded-full shadow-sm"
                                            style={{ backgroundColor: eventColors[type as AppEvent['type']] }}
                                        ></div>
                                        <span className="text-xs text-gray-700 font-medium">
                                            {type.charAt(0).toUpperCase() + type.slice(1)}: {hours.toFixed(1)}h
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};


const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { events, tasks } = useAppData();
  const { eventColors } = useTheme();

  const today = new Date();
  
  const upcomingEvents = events
    .filter(event => new Date(event.startTime) >= today)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 3);
  
  const todaysTasks = tasks.filter(task => !task.completed).slice(0, 4);

  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const quotes = [
    "The secret of getting ahead is getting started.",
    "Believe you can and you're halfway there.",
    "The future depends on what you do today.",
    "Well done is better than well said."
  ];
  const dailyQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="space-y-8">
      {/* Colorful Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              <span className="text-2xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-5xl font-extrabold drop-shadow-lg tracking-tight leading-tight">
                {getGreeting()}, {user?.name}! 🌟
              </h1>
              <p className="text-xl text-white/90 mt-2 drop-shadow">
                Ready to conquer today? Here’s what’s on your plate.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <span className="text-sm font-medium">📅 {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <span className="text-sm font-medium">✅ {tasks.filter(t => !t.completed).length} tasks pending</span>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="calendar" className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">📅 Upcoming Events</h2>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map(event => {
                 const bgColor = eventColors[event.type];
                 const textColor = getTextColorForBackground(bgColor);
                return (
                <div key={event.id} className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white to-gray-50 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg">
                    <div
                       className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform"
                       style={{ backgroundColor: bgColor, color: textColor }}
                    >
                       <span className="text-xs font-bold uppercase">{new Date(event.startTime).toLocaleString('default', { month: 'short' })}</span>
                       <span className="text-xl font-bold">{new Date(event.startTime).getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{event.title}</p>
                      <p className="text-sm text-gray-600 mt-1">🕒 {formatDate(event.startTime)} - {formatDate(event.endTime)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <p className="text-gray-600 text-lg font-medium">No upcoming events</p>
              <p className="text-gray-500 text-sm">Time to relax or get ahead! 🎉</p>
            </div>
          )}
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50 border-2 border-green-100 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="check-circle" className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">✅ Today's To-Dos</h2>
          </div>
          {todaysTasks.length > 0 ? (
            <div className="space-y-3">
              {todaysTasks.map(task => (
                <div key={task.id} className="group hover:scale-[1.01] transition-all duration-200">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-white to-gray-50 border-2 border-gray-100 hover:border-green-200 hover:shadow-md">
                    <div className="w-6 h-6 border-2 border-green-500 rounded-full group-hover:border-emerald-600 transition-colors flex-shrink-0 group-hover:scale-110 transform duration-200" />
                    <p className="text-gray-800 group-hover:text-green-700 transition-colors font-medium flex-1">{task.text}</p>
                    <div className="ml-auto">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        task.tag === 'study' ? 'bg-blue-100 text-blue-700' :
                        task.tag === 'work' ? 'bg-purple-100 text-purple-700' :
                        task.tag === 'personal' ? 'bg-pink-100 text-pink-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-gray-600 text-lg font-medium">All tasks completed!</p>
              <p className="text-gray-500 text-sm">Great job! 🎉</p>
            </div>
          )}
        </Card>
      </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickAdd />
            <Gamification />
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white shadow-2xl border-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <span className="text-2xl">💭</span>
                </div>
                <h3 className="text-3xl font-black drop-shadow tracking-tight">Quote of the Day</h3>
              </div>
              <blockquote className="text-2xl font-medium italic leading-relaxed drop-shadow-sm">
                "{dailyQuote}"
              </blockquote>
              <div className="mt-6 flex items-center gap-2">
                <div className="w-8 h-1 bg-white/30 rounded-full"></div>
                <span className="text-sm text-white/80 font-medium">Daily Inspiration ✨</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"></div>
          </Card>
          <ProductivityTracker />
      </div>
    </div>
  );
};

export default DashboardPage;