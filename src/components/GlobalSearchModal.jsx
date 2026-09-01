import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, X, BrainCircuit, Briefcase, Compass, FileText, ArrowRight } from 'lucide-react';
import { TARGET_ROLES, CAREER_JOBS, TOP_DEMANDED_SKILLS_DATA } from '../data/mockData';

export default function GlobalSearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const lowerQuery = query.toLowerCase().trim();

  const matchingSkills = TOP_DEMANDED_SKILLS_DATA.filter(s => 
    !lowerQuery || s.skill.toLowerCase().includes(lowerQuery)
  );

  const matchingRoles = TARGET_ROLES.filter(r => 
    !lowerQuery || r.title.toLowerCase().includes(lowerQuery)
  );

  const matchingJobs = CAREER_JOBS.filter(j => 
    !lowerQuery || j.title.toLowerCase().includes(lowerQuery) || j.company.toLowerCase().includes(lowerQuery)
  );

  const handleSelect = (path) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-[#1456A0]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills (Python, Cloud), job roles, company openings..."
            className="flex-1 bg-transparent text-sm text-slate-800 focus:outline-none font-medium"
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Category: Skills */}
          {matchingSkills.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-blue-600" />
                <span>Skills & Demand Data</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingSkills.slice(0, 4).map(s => (
                  <div
                    key={s.skill}
                    onClick={() => handleSelect('/my-skills')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{s.skill}</div>
                      <div className="text-[10px] text-slate-500">{s.category} • {s.growth} Growth</div>
                    </div>
                    <span className="font-mono text-xs text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-bold">
                      {s.demandScore}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category: Roles */}
          {matchingRoles.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-600" />
                <span>Job Roles</span>
              </div>
              <div className="space-y-1.5">
                {matchingRoles.slice(0, 3).map(r => (
                  <div
                    key={r.id}
                    onClick={() => handleSelect('/skill-gap')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 cursor-pointer transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{r.title}</div>
                      <div className="text-[10px] text-slate-500">{r.industry} • Avg: {r.avgSalary}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category: Jobs */}
          {matchingJobs.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                <span>Maharashtra Job Openings</span>
              </div>
              <div className="space-y-1.5">
                {matchingJobs.slice(0, 3).map(j => (
                  <div
                    key={j.id}
                    onClick={() => handleSelect('/career-opportunities')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 cursor-pointer transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{j.title}</div>
                      <div className="text-[10px] text-slate-500">{j.company} • {j.district} ({j.salary})</div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {j.matchPercentage}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Press ESC to close modal</span>
          <span>MahaSkill AI Search Engine</span>
        </div>

      </div>
    </div>
  );
}
