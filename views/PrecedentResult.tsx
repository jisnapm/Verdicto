import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CaseAnalysis, PrecedentCase } from '../types';

const PrecedentResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state || {}) as {
    precedent?: PrecedentCase;
    sourceAnalysis?: CaseAnalysis;
  };

  const precedent = state.precedent;

  if (!precedent) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-10 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Precedent Found</h3>
        <button onClick={() => navigate('/home')} className="text-blue-600 font-bold">Back to Home</button>
      </div>
    );
  }

  const similarityLabel = `${Math.round(precedent.similarity)}% Similar`;

  return (
    <div className="px-6 pt-10 pb-24 bg-slate-50">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-slate-800">Similar Precedent Analysis</h2>
            <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-semibold uppercase tracking-widest">
              {similarityLabel}
            </span>
          </div>
          <p className="text-[12px] text-slate-600 mt-1 font-semibold">
            {precedent.caseName}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Factual background */}
        <div className="bg-white p-6 rounded-3xl material-shadow border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">What happened in this case</h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            {precedent.factual_background}
          </p>
          {precedent.summary && (
            <p className="text-slate-500 text-xs leading-relaxed mt-4 italic">
              {precedent.summary}
            </p>
          )}
        </div>

        {/* Verdict & Punishment Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl text-white material-shadow shadow-slate-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Predicted Verdict</h3>
              <p className={`text-2xl font-bold ${precedent.predicted_verdict.toLowerCase().includes('guilty') ? 'text-red-400' : 'text-green-400'}`}>
                {precedent.predicted_verdict}
              </p>
            </div>
            <div className="bg-white/10 p-2 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Punishment Range</h3>
            <p className="text-lg font-medium text-slate-200">
              {precedent.punishment}
            </p>
          </div>
        </div>

        {/* IPC Sections List */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 ml-1">Relevant IPC Sections</h3>
          {precedent.ipc_sections.map((ipc, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 material-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Section {ipc.section}</span>
                <div className="flex gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ipc.bailable === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {ipc.bailable === 'Yes' ? 'Bailable' : 'Non-Bailable'}
                  </span>
                </div>
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">{ipc.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{ipc.description}</p>
            </div>
          ))}
        </div>

        {/* Legal sections */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 material-shadow">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Legal Sections / Notes</h3>
          <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
            {precedent.legal_sections}
          </p>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-4 rounded-3xl transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PrecedentResult;

