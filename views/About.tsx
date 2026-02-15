
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="px-6 pt-12 pb-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">About Verdicto</h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Our Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Verdicto is designed to bridge the gap between complex legal statutes and everyday understanding. By leveraging cutting-edge Large Language Models (LLMs), we provide instant analysis of criminal case descriptions under the Indian Penal Code (IPC) and Bhartiya Nyaya Sanhita (BNS).
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-3xl">
          <h3 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">Core Technology</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs text-blue-900 leading-relaxed"><strong>Gemini 2.0 Flash:</strong> High-speed reasoning and extraction of legal clauses using the latest AI models.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs text-blue-900 leading-relaxed"><strong>Legal Knowledge Base:</strong> Pre-trained on thousands of IPC sections and landmark judgments from the Indian judiciary.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs text-blue-900 leading-relaxed"><strong>Firebase Cloud Sync:</strong> Secure real-time synchronization of user case history across web and mobile platforms.</p>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Legal Disclaimer</h3>
          <div className="bg-slate-100 p-4 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
            Verdicto is an AI tool intended for educational and informational purposes only. It does not constitute professional legal advice. Users should always consult with a qualified legal professional for official case representation. Accuracy of AI predictions is subject to data quality and model limitations.
          </div>
        </section>

        <div className="text-center pt-8">
          <p className="text-slate-400 text-[10px]">VERDICTO v1.0.4 - 2025</p>
          <p className="text-slate-400 text-[10px]">Built with Passion for Justice</p>
        </div>
      </div>
    </div>
  );
};

export default About;
