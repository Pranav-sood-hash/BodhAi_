import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import VoiceAssistant from '@/components/VoiceAssistant';

export default function Voice() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(currentUser);
    setUserName(user.name);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
      <Sidebar userName={userName} />

      <div className="flex-1 w-full min-w-0 overflow-auto pl-0 md:pl-20 lg:pl-64">
        <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 px-4 md:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-100">Voice Assistant</h1>
          <p className="text-slate-400 mt-2">Learn through voice conversations with your AI mentor</p>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            <VoiceAssistant />
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}
