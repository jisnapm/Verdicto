
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeLegalCase } from '../services/geminiService';
import { CaseAnalysis } from '../types';

interface AnalyzeProps {
  onSave: (analysis: CaseAnalysis) => void;
}

const Analyze: React.FC<AnalyzeProps> = ({ onSave }) => {
  const [caseText, setCaseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!caseText.trim()) {
      setError('Please enter case details');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await analyzeLegalCase(caseText);
      onSave(result);
      navigate('/result', { state: { analysis: result } });
    } catch (err: any) {
      setError(err.message || 'Failed to analyze case. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-10 text-center bg-white">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-blue-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing Justice...</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          Our AI is consulting Indian Legal Precedents and IPC sections. This may take a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Analyze Case</h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-2xl mb-8 border border-blue-100 flex gap-3 items-start">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <p className="text-sm text-blue-700 leading-snug">
          Describe the situation including actors, intent, and outcome. Be as detailed as possible for better results.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Case Description</label>
          <textarea
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            className="w-full h-64 px-5 py-4 rounded-3xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-slate-50 resize-none text-slate-800 leading-relaxed"
            placeholder="e.g. A group of four individuals entered a private bank at midnight. They forced the vault open and took ₹50 Lakhs in cash..."
          />
        </div>

        {error && <p className="text-red-500 text-sm px-2 font-medium">⚠️ {error}</p>}

        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-3xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Run Analysis</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Analyze;
