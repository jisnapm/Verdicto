
export interface IPCSection {
  section: string;
  title: string;
  description: string;
  bailable: string;
  compoundable: string;
}

export interface CaseAnalysis {
  id: string;
  timestamp: number;
  inputText: string;
  ipc_sections: IPCSection[];
  predicted_verdict: string;
  punishment: string;
  summary: string;
  precedents: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'Lawyer' | 'Judge' | 'Student' | 'General';
}
