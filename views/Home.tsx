
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface HomeProps {
  user: User | null;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="px-6 pt-12 pb-24">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {user ? `Welcome, ${user.name.split(' ')[0]} 👋` : "Welcome to Verdicto 👋"}
          </h2>
          <p className="text-slate-500 text-sm">
            {user ? "Legal Intelligence at your fingertips" : "Analyze Indian legal cases instantly"}
          </p>
        </div>
        {user ? (
          <button 
            onClick={onLogout}
            className="flex flex-col items-center group"
          >
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-red-50 transition-colors">
              <svg className="w-5 h-5 text-slate-500 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
            <span className="text-[10px] mt-1 text-slate-400 group-hover:text-red-500">Logout</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="flex flex-col items-center group"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <span className="text-[10px] mt-1 text-blue-600 font-medium">Sign In</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 mb-10">
        <button 
          onClick={() => navigate('/analyze')}
          className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-left overflow-hidden group active:scale-[0.98] transition-all material-shadow"
        >
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Analyze Case</h3>
            <p className="text-blue-100 text-sm">Predict IPC sections & outcomes</p>
          </div>
          <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/history')}
            className="bg-white p-5 rounded-3xl border border-slate-100 flex flex-col items-start active:scale-[0.98] transition-all material-shadow"
          >
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="font-bold text-slate-800">History</h4>
            <p className="text-[11px] text-slate-400">Past case analyses</p>
          </button>
          <button 
             onClick={() => navigate('/about')}
            className="bg-white p-5 rounded-3xl border border-slate-100 flex flex-col items-start active:scale-[0.98] transition-all material-shadow"
          >
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h4 className="font-bold text-slate-800">About</h4>
            <p className="text-[11px] text-slate-400">Project details</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
