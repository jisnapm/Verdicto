
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Always go to home now, making login optional
      navigate('/home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-pulse">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-blue-900 tracking-tight">Verdicto</h1>
      <p className="text-slate-500 mt-2 font-medium">AI-Powered Legal Case Analysis</p>
      
      <div className="absolute bottom-12 flex flex-col items-center">
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping mb-4"></div>
        <p className="text-xs text-slate-400 uppercase tracking-widest">Loading Justice</p>
      </div>
    </div>
  );
};

export default Splash;
