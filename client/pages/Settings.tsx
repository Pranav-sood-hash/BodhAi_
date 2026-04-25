import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
  }, [navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 px-4 py-8 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-2xl mx-auto">
        <div className="glass-dark rounded-2xl border border-slate-700/40 p-8 space-y-8">
          <div>
            <p className="text-sm text-slate-400">Configuration</p>
            <h1 className="text-3xl font-bold neon-text-gradient mt-2">Settings</h1>
          </div>

          {/* API Configuration Status */}
          <div className="space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 flex gap-4">
              <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-emerald-200">Groq API Configured</p>
                <p className="text-sm text-emerald-300/80">
                  The Groq API is already configured and ready to use. All AI features (Code Helper, Study Mode, Voice Assistant) are fully functional.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold smooth-transition neon-glow"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Features Overview */}
          <div className="border-t border-slate-700/30 pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-100">Available Features</h2>
            <div className="space-y-3">
              <div className="p-4 bg-slate-800/50 border border-slate-700/30 rounded-lg">
                <p className="font-semibold text-slate-200">🎤 Voice Assistant</p>
                <p className="text-sm text-slate-400 mt-1">Learn through natural voice conversations with AI</p>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700/30 rounded-lg">
                <p className="font-semibold text-slate-200">📚 Study Mode</p>
                <p className="text-sm text-slate-400 mt-1">Ask questions and get detailed explanations</p>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700/30 rounded-lg">
                <p className="font-semibold text-slate-200">💻 Code Helper</p>
                <p className="text-sm text-slate-400 mt-1">Get detailed code analysis and optimization tips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
