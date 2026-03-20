import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import CodeHelper from '@/components/CodeHelper';

export default function Code() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <Sidebar userName={userName} />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-100">Code Helper</h1>
          <p className="text-slate-400 mt-2">Understand code with detailed line-by-line explanations</p>
        </div>

        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <CodeHelper />
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
