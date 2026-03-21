import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate login - store user data in localStorage
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('bodhaiUsers') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          email: user.email
        }));
        setLoading(false);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background glow elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="relative w-full max-w-md">
        {/* Card container */}
        <div className="glass-dark rounded-2xl p-8 space-y-8">
          {/* Logo & Title */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-full p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold neon-text-gradient">BodhAI</h1>
            <p className="text-slate-400">Your Offline Voice Learning Mentor</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 smooth-transition"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 smooth-transition"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg smooth-transition neon-glow"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

          {/* Sign up link */}
          <p className="text-center text-slate-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-semibold hover:from-cyan-300 hover:to-purple-300 smooth-transition"
            >
              Sign up here
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
