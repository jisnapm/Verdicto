
export interface IPCSection {
  section: string;
  title: string;
  description: string;
  bailable: string;
  compoundable: string;
}

export interface PrecedentCase {
  // Human-readable case title, e.g. "State vs X"
  caseName: string;
  // Similarity score between 0 and 100
  similarity: number;
  // Full factual background of what happened in the precedent case
  factual_background: string;
  // Short summary of this precedent case
  summary: string;
  // IPC sections relevant specifically to this precedent
  ipc_sections: IPCSection[];
  predicted_verdict: string;
  punishment: string;
  // Any additional legal sections / notes for this precedent
  legal_sections: string;
}

export interface CaseAnalysis {
  id: string;
  timestamp: number;
  inputText: string;
  ipc_sections: IPCSection[];
  predicted_verdict: string;
  punishment: string;
  summary: string;
  // New analyses will have structured precedents; legacy ones may just be strings.
  precedents: (string | PrecedentCase)[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'Lawyer' | 'Judge' | 'Student' | 'General';
}
