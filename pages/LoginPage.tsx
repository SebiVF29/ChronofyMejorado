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
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animated-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto w-full max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-16">
              <div className="text-white hidden lg:block">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl border border-white/30">
                       <Icon name="academic-cap" className="w-12 h-12"/>
                     </div>
                     <h1 className="text-7xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">Chronofy ✨</h1>
                  </div>
                  <p className="text-2xl mb-12 opacity-90 leading-relaxed font-light drop-shadow-lg">
                      Your academic life, simplified and supercharged. 🚀
                  </p>
                  <div className="space-y-8">
                      {featureList.map((feature, index) => (
                          <div key={feature.title} className="flex items-start gap-6 group hover:scale-105 transition-transform duration-300">
                              <div className="flex-shrink-0 bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-lg group-hover:bg-white/30 transition-all duration-300 border border-white/30">
                                <Icon name={feature.icon} className="w-7 h-7"/>
                              </div>
                              <div className="group-hover:translate-x-2 transition-transform duration-300">
                                  <h3 className="text-2xl font-bold mb-2 drop-shadow">{feature.title}</h3>
                                  <p className="opacity-80 text-lg leading-relaxed drop-shadow-sm">{feature.description}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              <Card className="w-full bg-white/95 backdrop-blur-2xl border-2 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 lg:hidden shadow-2xl">
                      <Icon name="academic-cap" className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome Back! 🎉</h2>
                    <p className="text-gray-600 text-lg">
                        {isLoginView ? 'Log in to simplify your academic life. ✨' : 'Create an account to get started on your journey. 🚀'}
                    </p>
                </div>

                {error && <p className="mb-4 text-center text-red-500 bg-red-500/10 p-3 rounded-lg">{error}</p>}
                {message && <p className="mb-4 text-center text-green-500 bg-green-500/10 p-3 rounded-lg">{message}</p>}
                
                <form onSubmit={handleAuthAction} className="space-y-4">
                    <fieldset disabled={loading} className="space-y-4">
                        {!isLoginView && (
                            <Input 
                                label="Full Name" 
                                id="name"
                                type="text" 
                                placeholder="e.g., Sebastian" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                icon={<Icon name="user" className="w-5 h-5 text-gray-400" />}
                                required 
                            />
                        )}
                        <Input 
                            label="University Email" 
                            id="email"
                            type="email" 
                            placeholder="sebastian@university.edu" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Icon name="mail" className="w-5 h-5 text-gray-400" />}
                            required
                        />
                        <Input 
                            label="Password" 
                            id="password"
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<Icon name="lock" className="w-5 h-5 text-gray-400" />}
                            required 
                        />

                        <Button type="submit" className="w-full text-lg !mt-6" variant="primary">
                            {loading ? (isLoginView ? 'Logging In...' : 'Creating Account...') : (isLoginView ? 'Log In' : 'Create Account')}
                        </Button>
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
