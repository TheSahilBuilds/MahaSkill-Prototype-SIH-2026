import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Volume2, 
  User, 
  Menu, 
  X, 
  ChevronRight,
  ArrowRight,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import RajyageetModal from './RajyageetModal';

export default function GovernmentHeader() {
  const { language, toggleLanguage, user, resetDemo, t, userRole } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRajyageetOpen, setIsRajyageetOpen] = useState(false);
  const location = useLocation();

  const handleFontSizeChange = (delta) => {
    document.documentElement.style.fontSize = `${100 + delta}%`;
  };

  const navLinks = userRole === 'admin'
    ? [
        { name: language === 'mr' ? 'मुख्य पृष्ठ' : 'Home', path: '/' },
        { name: language === 'mr' ? 'निकाल डॅशबोर्ड' : 'Outcome Dashboard', path: '/outcome-dashboard' },
        { name: language === 'mr' ? 'कौशल्य बुद्धिमत्ता' : 'Skill Intelligence', path: '/skill-gap' },
        { name: language === 'mr' ? 'कार्यक्रम विश्लेषण' : 'Programmes', path: '/industry-requirements' },
        { name: language === 'mr' ? 'आमच्याबद्दल' : 'About', path: '/about' },
      ]
    : [
        { name: language === 'mr' ? 'मुख्य पृष्ठ' : 'Home', path: '/' },
        { name: language === 'mr' ? 'माझे प्रशिक्षण' : 'My Training', path: '/my-training' },
        { name: language === 'mr' ? 'माझे निकाल' : 'My Outcomes', path: '/my-dashboard' },
        { name: language === 'mr' ? 'कौशल्य बुद्धिमत्ता' : 'Skill Intelligence', path: '/skill-gap' },
        { name: language === 'mr' ? 'करिअर रोडमॅप' : 'Roadmap', path: '/roadmap' },
        { name: language === 'mr' ? 'उद्योग गरजा' : 'Industry Requirements', path: '/industry-requirements' },
        { name: language === 'mr' ? 'आमच्याबद्दल' : 'About', path: '/about' },
      ];

  return (
    <header className="w-full bg-white select-none shadow-xs border-b border-[#D9E1EA]">
      
      {/* 1. TOP DARK NAVY STRIP (#032447) */}
      <div className="bg-[#032447] text-slate-200 text-[11px] py-1.5 px-4 sm:px-8 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* LEFT: State Emblem before Government of Maharashtra */}
          <div className="flex items-center space-x-2">
            <img 
              src="/image/emblem.png" 
              alt="Government Emblem" 
              className="h-6 sm:h-7 w-auto object-contain brightness-200 drop-shadow-sm"
              onError={(e) => { e.target.src = '/image/emblem.jpeg'; }}
            />
            <span className="font-semibold text-white tracking-wide">
              {t('govMaha')}
            </span>
          </div>


          {/* RIGHT CONTROLS */}
          <div className="flex items-center space-x-3 text-slate-300">
            
            <button 
              onClick={resetDemo}
              className="flex items-center gap-1 text-[#F2A900] hover:underline font-bold transition"
              title="Reset Demo Journey to Beginning"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('resetDemo')}</span>
            </button>

            <span className="text-slate-600">|</span>

            <button 
              onClick={() => setIsRajyageetOpen(true)} 
              className="flex items-center gap-1 hover:text-[#F2A900] text-white font-semibold transition"
              title="Play Official Rajyageet Anthem & Lyrics"
            >
              <span>{t('rajyageet')}</span>
              <Volume2 className="w-3.5 h-3.5 text-[#F2A900]" />
            </button>

            <span className="text-slate-600">|</span>

            {/* Font size adjustment */}
            <div className="flex items-center space-x-1 font-mono text-[10px] bg-slate-800/90 px-1.5 py-0.5 rounded border border-slate-700">
              <button onClick={() => handleFontSizeChange(-5)} className="px-1 hover:text-white" title="Decrease Font">A-</button>
              <button onClick={() => handleFontSizeChange(0)} className="px-1 hover:text-white font-bold" title="Reset Font">A</button>
              <button onClick={() => handleFontSizeChange(5)} className="px-1 hover:text-white" title="Increase Font">A+</button>
            </div>

            <span className="text-slate-600">|</span>

            {/* Language Switcher Button */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 font-bold text-[#F2A900] bg-slate-800 px-2 py-0.5 rounded hover:text-white transition"
              title="Toggle Language"
            >
              <span>{language === 'en' ? 'मराठी' : 'English'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. MAIN HEADER (State Emblem + Maharashtra Gov Logo + MahaSkill Branding & Navigation) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        
        {/* LEFT: Official Emblem & Logo before MahaSkill Brand */}
        <Link to="/" className="flex items-center space-x-3.5 sm:space-x-4 group shrink-0">
          
          {/* 1. Official State Emblem */}
          <img 
            src="/image/emblem.png" 
            alt="State Emblem of Maharashtra" 
            className="h-14 sm:h-16 md:h-[72px] w-auto max-w-[70px] object-contain shrink-0 group-hover:scale-[1.03] transition-transform duration-200"
            onError={(e) => {
              e.target.src = '/image/emblem.jpeg';
            }}
          />

          {/* 2. Maharashtra Government Logo */}
          <img 
            src="/image/maha-logo.png" 
            alt="Government of Maharashtra Logo" 
            className="h-14 sm:h-16 md:h-[72px] w-auto max-w-[82px] object-contain shrink-0 group-hover:scale-[1.03] transition-transform duration-200"
            onError={(e) => {
              e.target.src = '/image/maha-logo.webp';
            }}
          />

          {/* 3. Text Branding Block */}
          <div className="flex flex-col justify-center">
            <span className="text-[10px] sm:text-xs font-bold text-[#062B52] tracking-wider uppercase leading-tight">
              {t('govMaha').toUpperCase()}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#062B52] tracking-tight leading-none my-0.5">
              Maha<span className="text-[#F2A900]">Skill</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#52657A] font-semibold leading-tight hidden sm:block">
              {language === 'mr' ? 'महाराष्ट्र कौशल्य व प्रभाव मापन मंच' : 'Maharashtra Skill Outcome & Impact System'}
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION & LOGIN */}
        <div className="hidden lg:flex items-center space-x-5">
          <nav className="flex items-center space-x-4 text-xs font-bold text-[#172B4D]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`py-1 relative transition-colors hover:text-[#0B3B70] ${
                    isActive ? 'text-[#0B3B70] font-extrabold' : 'text-[#172B4D]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F2A900] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Login / Profile Button */}
          <Link
            to="/login"
            className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-4 py-2 rounded-lg font-bold text-xs shadow-xs transition flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>{user?.name ? `${user.name}` : t('loginReg')}</span>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#062B52] p-2 hover:bg-slate-100 rounded-lg transition"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#D9E1EA] px-4 py-4 space-y-3 shadow-lg">

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#172B4D]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#062B52] text-white text-center py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{user?.name ? user.name : t('loginReg')}</span>
            </Link>
          </div>
        </div>
      )}

      {/* 3. NOTICE BAR */}
      <div className="bg-[#FFFBEB] border-t border-b border-[#FDE68A] text-[#172B4D] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <span className="bg-[#F2A900] text-[#032447] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-2xs shrink-0 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              कौशल्य निकाल प्रणाली 📢
            </span>
            <div className="truncate font-medium text-xs sm:text-sm text-[#172B4D]">
              {language === 'mr' 
                ? 'कौशल्य प्रशिक्षण ते रोजगार प्रभाव मापन प्रणाली. आपले निकाल अपडेट करा व करिअर प्रगती पहा.'
                : 'Longitudinal Skilling Outcome System. Track your training, employment signals, and upskilling.'}
            </div>
          </div>
          <Link to="/my-training" className="text-xs font-bold text-[#0B3B70] hover:underline shrink-0 flex items-center gap-1">
            <span>{language === 'mr' ? 'माझे निकाल पहा' : 'Update Outcome'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0B3B70]" />
          </Link>
        </div>
      </div>

      {/* RAJYAGEET ANTHEM MODAL */}
      <RajyageetModal isOpen={isRajyageetOpen} onClose={() => setIsRajyageetOpen(false)} />

    </header>
  );
}
