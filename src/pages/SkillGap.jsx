import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Compass,
  ArrowRight,
  User,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export default function SkillGap() {
  const { user, analysisResult } = useApp();
  const navigate = useNavigate();

  const userName = user?.name || "Sahil Bhole";
  const userEmail = user?.email || "sahilbhole232@gcoe.com";
  const targetRole = analysisResult?.targetRole || "Software Developer";
  const targetLocation = analysisResult?.targetLocation || "Pune";

  const readinessScore = analysisResult?.careerReadiness || 66;
  const alignmentScore = analysisResult?.skillAlignment || 72;
  const gapCount = analysisResult?.skillGapCount || 5;

  const strongSkills = analysisResult?.strongSkills || [];
  const highPriorityGaps = analysisResult?.highPriorityGaps || [];
  const mediumPriorityGaps = analysisResult?.mediumPriorityGaps || [];

  return (
    <div className="space-y-8 pb-12">
      
      {/* HEADER WITH USER IDENTITY */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#062B52] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-[#0B3B70]" />
              <span>Skill Intelligence Analysis Result</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B52]">AI Skill Gap Analysis</h1>
            <p className="text-xs text-[#52657A]">
              Personalized evaluation for <span className="font-bold text-[#062B52]">{userName}</span> ({userEmail})
            </p>
          </div>

          <button
            onClick={() => navigate('/survey')}
            className="bg-[#F5F7FA] hover:bg-slate-200 border border-slate-300 text-[#062B52] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Retake Survey</span>
          </button>
        </div>

        {/* DEMO CANDIDATE CARD & BENCHMARK NOTICE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#F5F7FA] p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Candidate Name</span>
            <span className="font-extrabold text-[#062B52] text-sm">{userName}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Email Address</span>
            <span className="font-bold text-slate-700 font-mono text-[11px] truncate block">{userEmail}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Target Role</span>
            <span className="font-extrabold text-[#0B3B70]">{targetRole}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Target Location</span>
            <span className="font-bold text-slate-700">{targetLocation}, Maharashtra</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] text-slate-500 italic bg-amber-50/60 px-3 py-1 rounded-lg border border-amber-200/60">
          <Info className="w-3.5 h-3.5 text-[#F2A900] shrink-0" />
          <span>Illustrative Industry Benchmark — Prototype Data</span>
        </div>

      </div>

      {/* RESULT KPIS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Career Readiness */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2 text-center flex flex-col justify-center items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CAREER READINESS</span>
          <div className="text-4xl font-extrabold text-[#062B52] font-mono my-1">
            {readinessScore}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs">
            <div className="bg-[#16A36A] h-full rounded-full transition-all duration-500" style={{ width: `${readinessScore}%` }}></div>
          </div>
          <p className="text-[11px] text-[#52657A] mt-1 font-medium">Placement Benchmark for {targetRole}</p>
        </div>

        {/* Skill Alignment */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2 text-center flex flex-col justify-center items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">INDUSTRY ALIGNMENT</span>
          <div className="text-3xl font-extrabold text-[#0B3B70] font-mono my-1">{alignmentScore}%</div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs">
            <div className="bg-[#0B3B70] h-full rounded-full transition-all duration-500" style={{ width: `${alignmentScore}%` }}></div>
          </div>
          <p className="text-[11px] text-[#52657A] mt-1 font-medium">Technical Competency Match</p>
        </div>

        {/* Skill Gaps Count */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2 text-center flex flex-col justify-center items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SKILL GAPS IDENTIFIED</span>
          <div className="text-3xl font-extrabold text-rose-600 font-mono my-1">
            {gapCount} <span className="text-xs font-normal text-slate-500">Skills</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${(gapCount / 8) * 100}%` }}></div>
          </div>
          <p className="text-[11px] text-[#52657A] mt-1 font-medium">Skills requiring training focus</p>
        </div>

      </div>

      {/* STRONG SKILLS VS GAPS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* STRONG SKILLS */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CheckCircle2 className="w-5 h-5 text-[#16A36A]" />
            <h3 className="font-extrabold text-base text-[#062B52]">Strong Skills</h3>
          </div>

          <div className="space-y-2.5">
            {strongSkills.length > 0 ? (
              strongSkills.map((s, idx) => (
                <div key={idx} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-900">{s.skill}</span>
                  <span className="font-mono text-emerald-700 font-bold bg-white px-2.5 py-0.5 rounded border border-emerald-300">
                    Level {s.userRating}/5 ✓
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">Add programming skills to highlight strong areas.</p>
            )}
          </div>
        </div>

        {/* HIGH PRIORITY GAPS */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <h3 className="font-extrabold text-base text-[#062B52]">High Priority Gaps</h3>
          </div>

          <div className="space-y-2.5">
            {highPriorityGaps.length > 0 ? (
              highPriorityGaps.map((g, idx) => (
                <div key={idx} className="p-3 bg-rose-50/60 rounded-xl border border-rose-200/80 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-rose-900 block">{g.skill}</span>
                    <span className="text-[10px] text-rose-700">Gap: {g.gap} level(s) below industry benchmark</span>
                  </div>
                  <span className="font-mono text-rose-800 font-bold bg-white px-2 py-0.5 rounded border border-rose-300">
                    {g.userRating}/5 vs {g.requiredLevel}/5
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No critical high-priority gaps found.</p>
            )}
          </div>
        </div>

      </div>

      {/* RECOMMENDED NEXT SKILLS */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <h3 className="font-extrabold text-base text-[#062B52] flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#0B3B70]" />
          <span>Recommended Next Skills to Master</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {mediumPriorityGaps.concat(highPriorityGaps).slice(0, 3).map((item, idx) => (
            <div key={idx} className="p-4 bg-[#F5F7FA] border border-slate-200 rounded-xl space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#0B3B70] uppercase block">
                {idx === 0 ? "1. Immediate Priority" : idx === 1 ? "2. Core Technical" : "3. Industry Practice"}
              </span>
              <h4 className="font-bold text-[#062B52] text-sm">{item.skill}</h4>
              <p className="text-[#52657A] text-[11px] leading-relaxed">
                Improve from Level {item.userRating}/5 to Level {item.requiredLevel}/5 to increase overall readiness.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ROADMAP ACTION BANNER */}
      <div className="bg-[#032447] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#F2A900] uppercase tracking-wider">Next Recommended Step</span>
          <h3 className="text-xl font-extrabold text-white">View Your Personalized Learning Flowchart</h3>
          <p className="text-slate-300 text-xs max-w-xl">
            Explore your node-by-node learning flowchart customized for <span className="font-bold text-white">{userName}</span>'s target role of {targetRole}.
          </p>
        </div>

        <button
          onClick={() => navigate('/roadmap')}
          className="bg-[#F2A900] hover:bg-amber-400 text-[#032447] font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md shrink-0 flex items-center gap-2 hover:scale-105"
        >
          <span>View My Skill Roadmap →</span>
        </button>
      </div>

    </div>
  );
}
