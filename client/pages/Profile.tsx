import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, LogOut, Save, User } from 'lucide-react';

const STORAGE_KEYS = {
  name: 'userName',
  email: 'userEmail',
  avatar: 'userAvatar',
  dob: 'userDOB',
  goal: 'userGoal',
} as const;

function readCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  } catch {
    return {};
  }
}

export default function Profile() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userDOB, setUserDOB] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentUser = readCurrentUser();

    const storedName = localStorage.getItem(STORAGE_KEYS.name);
    const storedEmail = localStorage.getItem(STORAGE_KEYS.email);
    const storedAvatar = localStorage.getItem(STORAGE_KEYS.avatar);
    const storedDOB = localStorage.getItem(STORAGE_KEYS.dob);
    const storedGoal = localStorage.getItem(STORAGE_KEYS.goal);

    if (!currentUser.email && !storedEmail) {
      navigate('/login', { replace: true });
      return;
    }

    setUserName(storedName || currentUser.name || '');
    setUserEmail(storedEmail || currentUser.email || '');
    setUserAvatar(storedAvatar || '');
    setUserDOB(storedDOB || '');
    setUserGoal(storedGoal || '');
  }, [navigate]);

  const initials = useMemo(() => {
    return (userName || 'BodhAI')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }, [userName]);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const avatar = String(reader.result || '');
      setUserAvatar(avatar);
      localStorage.setItem(STORAGE_KEYS.avatar, avatar);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEYS.name, userName);
    localStorage.setItem(STORAGE_KEYS.email, userEmail);
    localStorage.setItem(STORAGE_KEYS.avatar, userAvatar);
    localStorage.setItem(STORAGE_KEYS.dob, userDOB);
    localStorage.setItem(STORAGE_KEYS.goal, userGoal);
    localStorage.setItem('currentUser', JSON.stringify({ name: userName, email: userEmail }));

    setMessage('Profile saved successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(STORAGE_KEYS.name);
    localStorage.removeItem(STORAGE_KEYS.email);
    localStorage.removeItem(STORAGE_KEYS.avatar);
    localStorage.removeItem(STORAGE_KEYS.dob);
    localStorage.removeItem(STORAGE_KEYS.goal);
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 px-4 py-8 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-4xl mx-auto">
        <div className="glass-dark rounded-2xl border border-slate-700/40 p-8 space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-slate-400">Account settings</p>
              <h1 className="text-3xl font-bold neon-text-gradient mt-2">Profile</h1>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/15 smooth-transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 text-center space-y-4">
                <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-400 p-1">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    {userAvatar ? (
                      <img src={userAvatar} alt="Profile avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-purple-300">{initials || <User className="w-10 h-10" />}</span>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-100">{userName || 'Your Name'}</h2>
                  <p className="text-sm text-slate-400 truncate">{userEmail || 'your@email.com'}</p>
                </div>

                <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700/50 text-sm text-slate-200 cursor-pointer hover:bg-slate-800 smooth-transition">
                  <Camera className="w-4 h-4" />
                  Upload Avatar
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Name</label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 smooth-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Email</label>
                  <input
                    value={userEmail}
                    readOnly
                    className="w-full bg-slate-800/30 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-400 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Date of Birth</label>
                  <input
                    type="date"
                    value={userDOB}
                    onChange={(e) => setUserDOB(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 smooth-transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Learning Goal</label>
                  <input
                    value={userGoal}
                    onChange={(e) => setUserGoal(e.target.value)}
                    placeholder="What do you want to learn?"
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 smooth-transition"
                  />
                </div>
              </div>

              {message && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200 text-sm">
                  {message}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold smooth-transition neon-glow"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
