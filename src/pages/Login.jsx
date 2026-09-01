import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  const [email, setEmail] = useState('sahilbhole232@gcoe.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError("Please enter valid credentials.");
      return;
    }

    loginUser(email, "Sahil Bhole");
    setSuccessMessage("Login successful! Redirecting to Skill Gap Survey...");

    setTimeout(() => {
      navigate('/survey');
    }, 600);
  };

  return (
    <div className="py-12 flex items-center justify-center px-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#D9E1EA] shadow-xl w-full max-w-md space-y-6 text-center">
        
        {/* Logo Header */}
        <div className="space-y-2">
          <img 
            src="/image/maha-logo.png" 
            alt="MahaSkill Logo" 
            className="h-16 w-auto mx-auto object-contain"
            onError={(e) => {
              e.target.src = '/image/emblem.png';
            }}
          />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            GOVERNMENT OF MAHARASHTRA
          </span>
          <h2 className="text-2xl font-extrabold text-[#062B52]">Welcome to MahaSkill</h2>
          <p className="text-xs text-[#52657A]">Login to start your Skill Gap Analysis & Roadmap</p>
        </div>

        {/* Demo Seeded User Hint */}
        <div className="bg-[#FFFBEB] p-3 rounded-xl border border-[#FDE68A] text-left text-[11px] space-y-1">
          <span className="font-extrabold text-[#032447] text-[10px] uppercase tracking-wider block">
            Demo Account Credentials
          </span>
          <div className="font-mono text-slate-800">
            Email: <strong>sahilbhole232@gcoe.com</strong>
          </div>
          <div className="font-mono text-slate-800">
            Password: <strong>demo123</strong>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left text-xs font-semibold">
          <div>
            <label className="block text-[#172B4D] mb-1">Email / Mobile Number</label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl px-3 py-2.5 pl-9 text-[#172B4D] focus:ring-2 focus:ring-[#062B52]"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-[#172B4D] mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl px-3 py-2.5 pl-9 text-[#172B4D] focus:ring-2 focus:ring-[#062B52]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#062B52] hover:bg-[#0B3B70] text-white py-3 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>Login & Begin Survey</span>
            <ArrowRight className="w-4 h-4 text-[#F2A900]" />
          </button>
        </form>

        <div className="pt-2 text-xs text-[#52657A] border-t border-slate-100">
          Smart India Hackathon 2026 Prototype • College Demo Mode
        </div>

      </div>
    </div>
  );
}
