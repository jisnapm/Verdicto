
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaseAnalysis } from '../types';

interface HistoryProps {
  history: CaseAnalysis[];
  onDelete: (caseId: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredHistory = history.filter(item => 
    item.inputText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ipc_sections.some(s => s.section.includes(searchTerm)) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 pt-12 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Case History</h2>
      </div>

      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input 
          type="text"
          placeholder="Search by case text or IPC section..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
             <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">
            {searchTerm ? "No matches found" : "No Records Yet"}
          </h3>
          <p className="text-slate-500 text-sm mb-8">
            {searchTerm ? "Try searching for something else." : "You haven't analyzed any cases yet."}
          </p>
          {!searchTerm && (
            <button 
              onClick={() => navigate('/analyze')}
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold"
            >
              Analyze Now
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => navigate('/result', { state: { analysis: item } })}
                className="w-full text-left bg-white p-5 rounded-3xl border border-slate-100 material-shadow active:scale-[0.98] transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-slate-800 line-clamp-2 mb-2 pr-8">
                  {item.inputText}
                </h4>
                <div className="flex justify-between items-center">
                   <div className="flex gap-1 overflow-hidden">
                      {item.ipc_sections.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">IPC {s.section}</span>
                      ))}
                   </div>
                   <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest whitespace-nowrap">View Result →</span>
                </div>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if(window.confirm("Delete this case from history?")) {
                    onDelete(item.id);
                  }
                }}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
