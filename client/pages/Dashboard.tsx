import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import VoiceAssistant from '@/components/VoiceAssistant';
import StudyMode from '@/components/StudyMode';
import CodeHelper from '@/components/CodeHelper';
import { Headphones, BookOpen, Code, Menu, X } from 'lucide-react';

type ActiveMode = 'overview' | 'voice' | 'study' | 'code';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [activeMode, setActiveMode] = useState<ActiveMode>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(currentUser);
    setUserName(user.name);

    // Initialize demo users if they don't exist
    const users = JSON.parse(localStorage.getItem('bodhaiUsers') || '[]');
    if (!users.some((u: any) => u.email === 'demo@bodhai.com')) {
      users.push({
        name: 'Demo User',
        email: 'demo@bodhai.com',
        password: 'demo123',
      });
      localStorage.setItem('bodhaiUsers', JSON.stringify(users));
    }
  }, [navigate]);

  const modes = [
    {
      id: 'voice',
      label: 'Voice Assistant',
      icon: Headphones,
      description: 'Learn through voice conversations',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'study',
      label: 'Study Mode',
      icon: BookOpen,
      description: 'Ask doubts and get detailed explanations',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'code',
      label: 'Code Helper',
      icon: Code,
      description: 'Understand code with detailed breakdowns',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/70 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        userName={userName}
        isOpen={isSidebarOpen}
        onNavigate={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-20 lg:ml-64">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 px-4 md:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Open sidebar"
              onClick={() => setIsSidebarOpen((open) => !open)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:bg-slate-800 smooth-transition"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-100">
                {activeMode === 'overview'
                  ? `Welcome back, ${userName}!`
                  : modes.find((m) => m.id === activeMode)?.label}
              </h1>
              <p className="text-slate-400 mt-2">
                {activeMode === 'overview'
                  ? 'Choose a learning mode to get started'
                  : modes.find((m) => m.id === activeMode)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Overview Mode */}
          {activeMode === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Learning Streak', value: '5 days', color: 'from-cyan-500 to-blue-500' },
                  { label: 'Topics Covered', value: '12', color: 'from-purple-500 to-pink-500' },
                  { label: 'Practice Questions', value: '48', color: 'from-yellow-500 to-orange-500' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-dark rounded-lg p-6 border-l-4 border-transparent bg-gradient-to-br"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.5)), linear-gradient(135deg, var(--neon-blue), var(--neon-pink))`,
                    }}
                  >
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-100 mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Mode Selection */}
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-6">Select a Learning Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {modes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id as ActiveMode)}
                        className="glass-dark rounded-xl p-8 space-y-4 hover:scale-105 smooth-transition border border-slate-700/30 hover:border-slate-600/50 group"
                      >
                        <div
                          className={`w-16 h-16 rounded-lg bg-gradient-to-br ${mode.color} p-0.5 group-hover:scale-110 smooth-transition`}
                        >
                          <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-slate-100">{mode.label}</h3>
                          <p className="text-sm text-slate-400">{mode.description}</p>
                        </div>
                        <div className="pt-4 border-t border-slate-700/30">
                          <p className="text-xs text-slate-500">→ Click to explore</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features Section */}
              <div className="glass-dark rounded-lg p-8 space-y-6">
                <h2 className="text-xl font-bold text-slate-100">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    '🎤 Voice-based learning with real-time feedback',
                    '📚 Comprehensive explanations with examples',
                    '💻 Code analysis and best practices',
                    '📊 Progress tracking and insights',
                    '⚡ Offline-first design',
                    '🎯 Personalized learning paths',
                  ].map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Voice Assistant Mode */}
          {activeMode === 'voice' && (
            <div className="max-w-3xl mx-auto">
              <VoiceAssistant />
            </div>
          )}

          {/* Study Mode */}
          {activeMode === 'study' && (
            <div className="max-w-3xl mx-auto">
              <StudyMode />
            </div>
          )}

          {/* Code Helper Mode */}
          {activeMode === 'code' && (
            <div className="max-w-4xl mx-auto">
              <CodeHelper />
            </div>
          )}

          {/* Back Button for modes */}
          {activeMode !== 'overview' && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setActiveMode('overview')}
                className="px-6 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-800/70 smooth-transition text-sm font-medium"
              >
                ← Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}
