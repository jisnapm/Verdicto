
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isSignUp) {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const userData: User = {
          id: userCred.user.uid,
          name,
          email,
          userType: 'General'
        };
        await setDoc(doc(db, "users", userCred.user.uid), userData);
        onLogin(userData);
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
        if (userDoc.exists()) {
          onLogin(userDoc.data() as User);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 pt-10 h-screen flex flex-col bg-white overflow-y-auto pb-10">
      <div className="mb-10 mt-6">
        <h2 className="text-3xl font-bold text-slate-800">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-slate-500 mt-2">
          {isSignUp ? "Join our legal intelligence community" : "Log in to your portal"}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-5" autoComplete="off">
        {isSignUp && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text" required value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50"
              placeholder=""
              autoComplete="new-name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50"
            placeholder=""
            autoComplete="new-email"
          />
        </div>



        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none bg-slate-50"
            placeholder=""
            autoComplete="new-password"
          />
        </div>

        {!isSignUp && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-xs">{error}</p>}
        {message && <p className="text-green-600 text-xs font-medium">{message}</p>}

        <button
          type="submit" disabled={loading}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 disabled:opacity-50"
        >
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 font-semibold text-sm"
        >
          {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Login;
