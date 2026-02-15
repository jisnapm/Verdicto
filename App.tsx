
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, orderBy, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { App as CapApp } from '@capacitor/app';
import { auth, db } from './services/firebase';
import Splash from './views/Splash';
import Login from './views/Login';
import Home from './views/Home';
import Analyze from './views/Analyze';
import History from './views/History';
import About from './views/About';
import Result from './views/Result';
import { User, CaseAnalysis } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<CaseAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle Android Hardware Back Button
    const setupBackListener = async () => {
      const listener = await CapApp.addListener('backButton', () => {
        const exitPaths = ['/home', '/login', '/'];
        if (exitPaths.includes(location.pathname)) {
          CapApp.exitApp();
        } else {
          navigate(-1);
        }
      });
      return listener;
    };

    const backListenerPromise = setupBackListener();
    return () => {
      backListenerPromise.then(l => l.remove());
    };
  }, [location, navigate]);

  useEffect(() => {
    // Initial load from localStorage
    const savedUser = localStorage.getItem('verdicto_user');
    const savedHistory = localStorage.getItem('verdicto_history');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("[AUTH] User logged in:", firebaseUser.uid);
        if (!user) {
          try {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              setUser(userData);
              localStorage.setItem('verdicto_user', JSON.stringify(userData));
            }
          } catch (e) {
            console.error("[AUTH ERROR] Profile restore failed:", e);
          }
        }
        fetchUserHistory(firebaseUser.uid);
      } else {
        console.log("[AUTH] User logged out");
        setUser(null);
        setHistory([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserHistory = async (userId: string) => {
    console.log("[FETCH] Requesting history for:", userId);
    try {
      const q = query(
        collection(db, "history"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const cases: CaseAnalysis[] = [];
      querySnapshot.forEach((docSnap) => {
        cases.push({ ...docSnap.data(), id: docSnap.id } as CaseAnalysis);
      });
      console.log("[FETCH SUCCESS] Items found:", cases.length);
      setHistory(cases);
      localStorage.setItem('verdicto_history', JSON.stringify(cases));
    } catch (error) {
      console.error("[FETCH ERROR] History query failed:", error);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('verdicto_user', JSON.stringify(userData));
    fetchUserHistory(userData.id);
    navigate('/home');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setHistory([]); 
      localStorage.removeItem('verdicto_user');
      localStorage.removeItem('verdicto_history');
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const saveCase = async (analysis: CaseAnalysis) => {
    if (user) {
      try {
        console.log("[SAVE] Saving to Cloud Firestore...");
        await addDoc(collection(db, "history"), {
          ...analysis,
          userId: user.id
        });
        fetchUserHistory(user.id);
      } catch (error) {
        console.error("[SAVE ERROR] Cloud save failed:", error);
      }
    } else {
      const newHistory = [analysis, ...history];
      setHistory(newHistory);
      localStorage.setItem('verdicto_history', JSON.stringify(newHistory));
    }
  };

  const deleteCase = async (caseId: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, "history", caseId));
        fetchUserHistory(user.id);
      } catch (error) {
        console.error("[DELETE ERROR] Cloud delete failed:", error);
      }
    } else {
      const newHistory = history.filter(h => h.id !== caseId);
      setHistory(newHistory);
      localStorage.setItem('verdicto_history', JSON.stringify(newHistory));
    }
  };

  // Bottom Navigation helper
  const showNav = ['/home', '/history', '/about'].includes(location.pathname);

  if (loading && location.pathname !== '/') {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col relative overflow-hidden">
      <div className="flex-1 pb-20 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
          <Route path="/analyze" element={<Analyze onSave={saveCase} />} />
          <Route path="/history" element={<History history={history} onDelete={deleteCase} />} />
          <Route path="/result" element={<Result />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 h-16 flex items-center justify-around px-4 z-50">
          <button 
            onClick={() => navigate('/home')}
            className={`flex flex-col items-center gap-1 ${location.pathname === '/home' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button 
            onClick={() => navigate('/history')}
            className={`flex flex-col items-center gap-1 ${location.pathname === '/history' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-[10px] font-medium">History</span>
          </button>
          <button 
            onClick={() => navigate('/about')}
            className={`flex flex-col items-center gap-1 ${location.pathname === '/about' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-[10px] font-medium">About</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
