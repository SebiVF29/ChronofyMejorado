import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import { supabase } from '../services/supabaseClient';

const LoginPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    
    if (!email || !password || (!isLoginView && !name)) {
        setError("Please fill all fields");
        setLoading(false);
        return;
    }

    try {
        if (isLoginView) { // Login
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            // AuthProvider will handle navigation
        } else { // Sign Up
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                    }
                }
            });
            if (error) throw error;
            // Check if user object is present but session is not, which implies email verification is needed.
            if (data.user && !data.session) {
                setMessage("Sign up successful! Please check your email to verify your account before logging in.");
            }
        }
    } catch (err: any) {
        setError(err.error_description || err.message);
    } finally {
        setLoading(false);
    }
  };

  const featureList = [
      {
          icon: 'sparkles' as const,
          title: 'AI-Powered Scheduling',
          description: 'Upload your syllabus and let Chronofy auto-populate your calendar with deadlines, exams, and classes.'
      },
      {
          icon: 'home' as const,
          title: 'All-in-One Hub',
          description: 'Manage classes, tasks, exams, and even your work schedule in one beautifully organized space.'
      },
      {
          icon: 'cog' as const,
          title: 'Personalized For You',
          description: 'Choose your theme, set a custom background, and make the app feel truly like your own personal assistant.'
      }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-yellow-300/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-3/4 w-5 h-5 bg-pink-300/50 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto w-full max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-20">
              <div className="text-white hidden lg:block space-y-10">
                  <div className="space-y-6">
                     <div className="flex items-center gap-6">
                       <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl border-2 border-white/30">
                         <Icon name="academic-cap" className="w-14 h-14 text-white"/>
                       </div>
                       <div>
                         <h1 className="text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                           Chronofy
                         </h1>
                         <div className="flex items-center gap-2 mt-2">
                           <span className="text-2xl">✨</span>
                           <span className="text-xl font-light text-white/80">Smart Student Agenda</span>
                         </div>
                       </div>
                     </div>
                     <p className="text-2xl font-light text-white/90 leading-relaxed drop-shadow-lg">
                         Transform your academic journey with intelligent planning,
                         <span className="font-semibold text-yellow-200"> AI-powered insights</span>, and
                         <span className="font-semibold text-cyan-200"> seamless organization</span>. 🚀
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                      {featureList.map((feature, index) => (
                          <div key={feature.title} className="group hover:scale-105 transition-all duration-500 hover:translate-x-4">
                              <div className="flex items-start gap-6 p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl group-hover:bg-white/15 group-hover:shadow-2xl transition-all duration-500">
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/30">
                                  <Icon name={feature.icon} className="w-8 h-8 text-white"/>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{feature.title}</h3>
                                    <p className="text-white/80 text-lg leading-relaxed font-light">{feature.description}</p>
                                </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              <Card className="w-full bg-white/95 backdrop-blur-3xl border-2 border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="text-center mb-12">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 lg:hidden shadow-2xl transform hover:rotate-6 transition-transform duration-300">
                      <Icon name="academic-cap" className="w-12 h-12 text-white" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text">
                        {isLoginView ? 'Welcome Back!' : 'Join Chronofy'}
                      </h2>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">{isLoginView ? '🎉' : '🚀'}</span>
                        <span className="text-2xl">{isLoginView ? '✨' : '🌟'}</span>
                        <span className="text-2xl">{isLoginView ? '📚' : '💫'}</span>
                      </div>
                      <p className="text-gray-600 text-xl font-light leading-relaxed max-w-md mx-auto">
                          {isLoginView
                            ? 'Ready to continue your academic journey? Your organized life awaits! ✨'
                            : 'Start your journey to academic excellence and organized success! 🚀'
                          }
                      </p>
                    </div>
                </div>

                {error && <p className="mb-4 text-center text-red-500 bg-red-500/10 p-3 rounded-lg">{error}</p>}
                {message && <p className="mb-4 text-center text-green-500 bg-green-500/10 p-3 rounded-lg">{message}</p>}
                
                <form onSubmit={handleAuthAction} className="space-y-6">
                    <fieldset disabled={loading} className="space-y-6">
                        {!isLoginView && (
                            <div className="transform hover:scale-[1.02] transition-transform duration-200">
                              <Input
                                  label="Full Name"
                                  id="name"
                                  type="text"
                                  placeholder="e.g., Sebastian ✨"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  icon={<Icon name="user" className="w-5 h-5 text-indigo-500" />}
                                  required
                              />
                            </div>
                        )}
                        <div className="transform hover:scale-[1.02] transition-transform duration-200">
                          <Input
                              label="University Email"
                              id="email"
                              type="email"
                              placeholder="sebastian@university.edu 📧"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              icon={<Icon name="mail" className="w-5 h-5 text-purple-500" />}
                              required
                          />
                        </div>
                        <div className="transform hover:scale-[1.02] transition-transform duration-200">
                          <Input
                              label="Password"
                              id="password"
                              type="password"
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              icon={<Icon name="lock" className="w-5 h-5 text-pink-500" />}
                              required
                          />
                        </div>

                        <div className="pt-4">
                          <Button type="submit" className="w-full text-xl font-bold !mt-8 h-14 shadow-2xl hover:shadow-3xl" variant="primary">
                              <span className="flex items-center justify-center gap-3">
                                {loading ? (
                                  <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    {isLoginView ? 'Logging In...' : 'Creating Account...'}
                                  </>
                                ) : (
                                  <>
                                    {isLoginView ? '🚀 Log In' : '✨ Create Account'}
                                  </>
                                )}
                              </span>
                          </Button>
                        </div>
                    </fieldset>
                </form>

                <div className="mt-6 text-center">
                    <button 
                      onClick={() => { setIsLoginView(!isLoginView); setError(null); setMessage(null); }} 
                      className="text-sm text-primary hover:underline"
                      disabled={loading}
                    >
                      {isLoginView ? "Don't have an account? Create one" : 'Already have an account? Log in'}
                    </button>
                </div>
              </Card>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
