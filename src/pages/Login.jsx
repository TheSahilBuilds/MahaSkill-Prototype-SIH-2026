import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { loginUser, updateConsent, hasConsented } = useApp();
  const [email, setEmail] = useState('sahilbhole232@gcoe.com');
  const [password, setPassword] = useState('demo123');
  const [step, setStep] = useState(1); // 1: Login, 2: Consent
  const [consentCheck, setConsentCheck] = useState(hasConsented);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError("Please enter valid credentials.");
      return;
    }

    loginUser(email, "Sahil Bhole");
    setStep(2);
  };

  const handleConsentSubmit = (e) => {
    e.preventDefault();
    updateConsent(consentCheck);
    navigate('/survey');
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
          <p className="text-xs text-[#52657A]">
            {step === 1 ? "Login to start your Skill Gap Analysis & Roadmap" : "Step 2 of 2: Outcome Tracking Consent"}
          </p>
        </div>

        {step === 1 && (
          <>
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
                <span>Login to Account</span>
                <ArrowRight className="w-4 h-4 text-[#F2A900]" />
              </button>
            </form>
          </>
        )}

        {/* STEP 2: CONSENT */}
        {step === 2 && (
          <form onSubmit={handleConsentSubmit} className="space-y-5 text-left animate-fadeIn">
            <div className="bg-[#032447]/5 border border-[#032447]/20 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#062B52] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#F2A900]" />
                Outcome Tracking Consent
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your training and employment information helps measure training outcomes and improve skill-development programmes across Maharashtra.
              </p>

              <label className="flex items-start gap-2.5 pt-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={consentCheck}
                  onChange={(e) => setConsentCheck(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-[#062B52] rounded focus:ring-[#062B52]"
                />
                <span className="text-xs font-bold text-[#062B52]">
                  I consent to outcome tracking and follow-up.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!consentCheck}
              className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 ${
                consentCheck 
                  ? 'bg-[#062B52] hover:bg-[#0B3B70] text-white hover:scale-[1.02]' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Continue to Quick Survey</span>
              <ArrowRight className="w-4 h-4 text-[#F2A900]" />
            </button>
          </form>
        )}

        <div className="pt-2 text-xs text-[#52657A] border-t border-slate-100">
          Smart India Hackathon 2026 Prototype • College Demo Mode
        </div>

      </div>
    </div>
  );
}
