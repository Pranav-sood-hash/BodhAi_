import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, LayoutDashboard, Headphones, BookOpen, Code, LogOut } from 'lucide-react';

interface SidebarProps {
  userName: string;
}

export default function Sidebar({ userName }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/voice', label: 'Voice Assistant', icon: Headphones },
    { path: '/study', label: 'Study Mode', icon: BookOpen },
    { path: '/code', label: 'Code Helper', icon: Code },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-r border-slate-700/50 flex flex-col p-6 space-y-8">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-lg p-0.5">
          <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold neon-text-gradient">BodhAI</h2>
          <p className="text-xs text-slate-500">Learning Mentor</p>
        </div>
      </div>

      {/* User Info */}
      <div className="glass-dark rounded-lg p-4 space-y-2">
        <p className="text-xs text-slate-400">Welcome</p>
        <p className="text-sm font-semibold text-slate-100 truncate">{userName}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition ${
                active
                  ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/50 text-purple-300'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {active && <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>}
            </button>
          );
        })}
      </nav>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-300 smooth-transition border border-transparent hover:border-red-500/50"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}
