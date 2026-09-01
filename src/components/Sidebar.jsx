import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Target, 
  Compass, 
  BarChart3, 
  Briefcase, 
  FileText, 
  Video, 
  BookOpen, 
  Code2, 
  Award, 
  Landmark, 
  History, 
  UserCheck, 
  Info,
  Sparkles,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { t, overallReadiness } = useApp();

  const menuGroups = [
    {
      group: "Core Guidance",
      items: [
        { name: t("Dashboard"), path: "/dashboard", icon: LayoutDashboard },
        { name: t("My Skills"), path: "/my-skills", icon: BrainCircuit },
        { name: t("Skill Gap"), path: "/skill-gap", icon: Target },
        { name: t("Roadmap"), path: "/roadmap", icon: Compass },
      ]
    },
    {
      group: "Market Intelligence",
      items: [
        { name: t("Industry Requirements"), path: "/industry-requirements", icon: BarChart3 },
        { name: t("Career Opportunities"), path: "/career-opportunities", icon: Briefcase },
        { name: t("State Analytics"), path: "/admin-insights", icon: Landmark },
      ]
    },
    {
      group: "Placement Prep Modules",
      items: [
        { name: t("Resume Analyzer"), path: "/resume-analyzer", icon: FileText },
        { name: t("Mock Interview"), path: "/mock-interview", icon: Video },
        { name: t("Aptitude"), path: "/aptitude", icon: BookOpen },
        { name: t("Coding Practice"), path: "/coding-practice", icon: Code2 },
        { name: t("Placement Report"), path: "/placement-report", icon: Award },
      ]
    },
    {
      group: "Account & System",
      items: [
        { name: t("History"), path: "/history", icon: History },
        { name: t("Profile"), path: "/profile", icon: UserCheck },
        { name: t("About Us"), path: "/about", icon: Info },
      ]
    }
  ];

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#031B38] text-slate-300 border-r border-slate-700/80
        flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        {/* Mobile Sidebar Header */}
        <div className="p-4 border-b border-slate-700/80 flex items-center justify-between lg:hidden bg-[#062B55]">
          <div className="flex items-center space-x-2 font-bold text-white text-base">
            <Sparkles className="w-5 h-5 text-[#E8A317]" />
            <span>MahaSkill AI Navigation</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Mini Widget */}
        <div className="p-4 bg-[#062B55]/60 border-b border-slate-700/60">
          <div className="flex justify-between items-center mb-1.5 text-xs text-slate-300">
            <span className="font-semibold text-slate-200">Readiness Score</span>
            <span className="font-extrabold text-[#E8A317]">{overallReadiness}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${overallReadiness}%` }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5 custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {group.group}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group
                        ${isActive 
                          ? 'bg-[#1456A0] text-white font-semibold shadow-sm border-l-4 border-[#E8A317]' 
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-amber-300 transition" />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-700/80 bg-[#062B55]/40 text-[11px] text-slate-400 text-center">
          <div>Govt of Maharashtra • SIH 2026</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">v1.0.4 Prototype</div>
        </div>
      </aside>
    </>
  );
}
