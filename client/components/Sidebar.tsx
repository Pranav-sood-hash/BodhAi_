import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, LayoutDashboard, Headphones, BookOpen, Code, LogOut, User } from 'lucide-react';

interface SidebarProps {
  userName: string;
  isOpen?: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({ userName, isOpen = false, onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
    onNavigate?.();
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/voice', label: 'Voice Assistant', icon: Headphones },
    { path: '/study', label: 'Study Mode', icon: BookOpen },
    { path: '/code', label: 'Code Helper', icon: Code },
    { path: '/profile', label: '👤 Profile', icon: User },
  ];

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-64 md:w-20 lg:w-64 bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-r border-slate-700/50 flex flex-col p-6 md:px-3 md:py-6 lg:p-6 space-y-8 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 justify-center md:justify-center lg:justify-start">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 rounded-lg p-0.5 shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div className="hidden lg:block">
          <h2 className="text-lg font-bold neon-text-gradient">BodhAI</h2>
          <p className="text-xs text-slate-500">Learning Mentor</p>
        </div>
      </div>

      {/* User Info */}
      <div className="hidden lg:block glass-dark rounded-lg p-4 space-y-2">
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
              onClick={() => {
                navigate(item.path);
                onNavigate?.();
              }}
              title={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg smooth-transition justify-center lg:justify-start ${
                active
                  ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/50 text-purple-300'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="hidden lg:inline text-sm font-medium">{item.label}</span>
              {active && <div className="hidden lg:block ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />}
            </button>
          );
        })}
      </nav>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        title="Logout"
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-300 smooth-transition border border-transparent hover:border-red-500/50 justify-center lg:justify-start"
      >
        <LogOut className="w-5 h-5 shrink-0" />
        <span className="hidden lg:inline text-sm font-medium">Logout</span>
      </button>
    </div>
  );
}
