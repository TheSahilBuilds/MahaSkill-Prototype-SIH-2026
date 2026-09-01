import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t, language } = useApp();

  return (
    <footer className="bg-[#032447] text-slate-300 text-xs border-t border-slate-800 mt-auto select-none">
      
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* LEFT */}
        <div className="space-y-2">
          <div className="text-white font-extrabold text-lg flex items-center gap-1.5">
            <span>Maha<span className="text-[#F2A900]">Skill</span></span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed max-w-sm font-normal">
            {t('tagline')}
          </p>
        </div>

        {/* CENTER: QUICK LINKS */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase text-[11px] tracking-wider text-[#F2A900]">
            {t('quickLinks')}
          </h4>
          <ul className="space-y-1.5 text-slate-300 font-medium">
            <li><Link to="/" className="hover:text-white transition">{t('home')}</Link></li>
            <li><Link to="/roadmap" className="hover:text-white transition">{t('roadmap')}</Link></li>
            <li><Link to="/industry-requirements" className="hover:text-white transition">{t('industryReq')}</Link></li>
            <li><Link to="/about" className="hover:text-white transition">{t('aboutUs')}</Link></li>
          </ul>
        </div>

        {/* RIGHT: PROTOTYPE NOTICE */}
        <div className="space-y-2 bg-[#062B52]/60 p-4 rounded-xl border border-slate-700/80">
          <h4 className="font-bold text-white text-xs text-[#F2A900]">
            {t('hackathonNotice')}
          </h4>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {language === 'mr' 
              ? 'हा प्रोटोटाइप प्रात्यक्षिकासाठी तयार केला आहे आणि SIH 2026 (समस्या विधान SIH26134) साठी बनवला आहे.'
              : 'This prototype uses illustrative data for demonstration purposes and is built for SIH 2026 (Problem Statement SIH26134).'}
          </p>
          <div className="text-[10px] text-[#16A36A] font-bold uppercase tracking-wider">
            {t('demoVersion')}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-[#021327] py-3 text-center text-slate-400 text-[11px]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            © 2026 MahaSkill — Government of Maharashtra SIH Prototype
          </div>
          <div className="text-slate-400 font-mono">
            College Level Hackathon Edition
          </div>
        </div>
      </div>

    </footer>
  );
}
