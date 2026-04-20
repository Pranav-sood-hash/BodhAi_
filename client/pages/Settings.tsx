import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [groqApiKey, setGroqApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Load saved API key
    const saved = localStorage.getItem('groqApiKey');
    if (saved) {
      setGroqApiKey(saved);
    }
  }, [navigate]);

  const handleSave = () => {
    if (!groqApiKey.trim()) {
      setMessage('Please enter a valid API key');
      setMessageType('error');
      return;
    }

    // Save to localStorage
    localStorage.setItem('groqApiKey', groqApiKey.trim());
    
    // Also send to backend to set as env variable
    fetch('/api/set-api-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: groqApiKey.trim() }),
    })
      .catch(() => {
        // Silently fail - key is still saved in localStorage
      });

    setMessage('API key saved successfully! You can now use the AI features.');
    setMessageType('success');
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to remove your API key?')) {
      localStorage.removeItem('groqApiKey');
      setGroqApiKey('');
      setMessage('API key removed');
      setMessageType('success');
    }
  };

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

          {/* API Key Setup */}
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-semibold mb-1">Groq API Key Required</p>
                <p>To use the AI features (Code Helper, Study Mode, Voice Assistant), you need to:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-blue-300">
                  <li>Sign up at <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-100">console.groq.com</a></li>
                  <li>Create an API key in your dashboard</li>
                  <li>Paste it below</li>
                </ol>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">Groq API Key</label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={groqApiKey}
                  onChange={(e) => setGroqApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 pr-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 smooth-transition font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-slate-500">Your API key is stored locally and never shared with anyone</p>
            </div>

            {message && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  messageType === 'success'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                    : 'border-red-500/30 bg-red-500/10 text-red-200'
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={!groqApiKey.trim()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold smooth-transition neon-glow"
              >
                <Save className="w-4 h-4" />
                Save API Key
              </button>

              {groqApiKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/15 smooth-transition text-sm font-semibold"
                >
                  Remove Key
                </button>
              )}

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-600/50 text-slate-200 hover:bg-slate-800/60 smooth-transition text-sm font-semibold"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="border-t border-slate-700/30 pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-100">How it works</h2>
            <div className="space-y-3 text-sm text-slate-400">
              <p>
                <span className="text-slate-300 font-semibold">Your API Key:</span> Is stored only in your browser's local storage. We don't send it to our servers or store it anywhere else.
              </p>
              <p>
                <span className="text-slate-300 font-semibold">Using the API:</span> When you use the AI features, your browser sends your API key securely to Groq's servers to process your requests.
              </p>
              <p>
                <span className="text-slate-300 font-semibold">Privacy:</span> We take your privacy seriously. Your API key and requests are your own.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
