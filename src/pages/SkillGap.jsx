import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Info,
  TrendingUp
} from 'lucide-react';

export default function SkillGap() {
  const { user, analysisResult, outcomeState } = useApp();
  const navigate = useNavigate();

  const userName = user?.name || "Sahil Bhole";
  const userEmail = user?.email || "sahilbhole232@gcoe.com";
  const targetRole = outcomeState.jobRole || analysisResult?.targetRole || "Data Analyst";

  const readinessScore = analysisResult?.careerReadiness || 68;
  const alignmentScore = analysisResult?.skillAlignment || 72;
  
  // Custom outcome-linked skill gaps
  const skillComparisonList = [
    { skill: "SQL Querying & DB Joins", currentPct: 40, requiredPct: 80, gap: "High Priority", gapPct: 40 },
    { skill: "Power BI & DAX Calculations", currentPct: 35, requiredPct: 75, gap: "High Priority", gapPct: 40 },
    { skill: "Python Data Analysis (Pandas)", currentPct: 65, requiredPct: 80, gap: "Medium Priority", gapPct: 15 },
    { skill: "Git & Version Control", currentPct: 50, requiredPct: 75, gap: "Medium Priority", gapPct: 25 },
    { skill: "Cloud Data Warehouse (AWS/Snowflake)", currentPct: 30, requiredPct: 70, gap: "High Priority", gapPct: 40 }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      
      {/* HEADER WITH OUTCOME LINKAGE */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[#062B52] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider">
              <Target className="w-3.5 h-3.5 text-[#0B3B70]" />
              <span>Skill Intelligence & Employment Risk Diagnostic</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B52]">
              Which skills may be affecting my employment outcome?
            </h1>
            <p className="text-xs text-[#52657A]">
              Longitudinal analysis for <span className="font-bold text-[#062B52]">{userName}</span> ({userEmail}) • Target Role: <span className="font-bold text-[#0B3B70]">{targetRole}</span>
            </p>
          </div>

          <button
            onClick={() => navigate('/survey')}
            className="bg-[#F5F7FA] hover:bg-slate-200 border border-slate-300 text-[#062B52] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Update Skill Ratings</span>
          </button>
        </div>

        {/* DEMO CANDIDATE CARD & BENCHMARK NOTICE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#F5F7FA] p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Candidate Name</span>
            <span className="font-extrabold text-[#062B52] text-sm">{userName}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Employment Status</span>
            <span className="font-bold text-emerald-700 font-mono text-[11px] block">{outcomeState.status}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Current Wage Tier</span>
            <span className="font-extrabold text-[#0B3B70]">₹{outcomeState.currentSalary?.toLocaleString('en-IN')}/mo</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold text-[10px] uppercase block">Target Location</span>
            <span className="font-bold text-slate-700">Pune, Maharashtra</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] text-slate-500 italic bg-amber-50/60 px-3 py-1 rounded-lg border border-amber-200/60">
          <Info className="w-3.5 h-3.5 text-[#F2A900] shrink-0" />
          <span>Illustrative Industry Benchmark — Maharashtra State Skill Engine</span>
        </div>

      </div>

      {/* RESULT KPIS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Career Readiness */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2 text-center flex flex-col justify-center items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OUTCOME ALIGNMENT SCORE</span>
          <div className="text-4xl font-extrabold text-[#062B52] font-mono my-1">
            {readinessScore}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs">
            <div className="bg-[#16A36A] h-full rounded-full transition-all duration-500" style={{ width: `${readinessScore}%` }}></div>
          </div>
          <p className="text-[11px] text-[#52657A] mt-1 font-medium">Placement & Wage Tier Benchmark</p>
        </div>

        {/* Skill Alignment */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2 text-center flex flex-col justify-center items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">INDUSTRY TECHNICAL MATCH</span>
          <div className="text-3xl font-extrabold text-[#0B3B70] font-mono my-1">{alignmentScore}%</div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs">
            <div className="bg-[#0B3B70] h-full rounded-full transition-all duration-500" style={{ width: `${alignmentScore}%` }}></div>
          </div>
          <p className="text-[11px] text-[#52657A] mt-1 font-medium">Competency Alignment</p>
        </div>

        {/* Skill Gaps Count */}
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2 text-center flex flex-col justify-center items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PRIMARY SKILL GAPS</span>
          <div className="text-3xl font-extrabold text-rose-600 font-mono my-1">
            3 <span className="text-xs font-normal text-slate-500">Critical Gaps</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-xs">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
          </div>
          <p className="text-[11px] text-[#52657A] mt-1 font-medium">Skills affecting wage growth</p>
        </div>

      </div>

      {/* CURRENT SKILLS VS ROLE REQUIREMENTS COMPARISON */}
      <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#062B52]" />
            <h3 className="font-extrabold text-base text-[#062B52]">Current Skills vs Role Requirements</h3>
          </div>
          <span className="text-[11px] font-extrabold bg-[#062B52]/10 text-[#062B52] px-2.5 py-0.5 rounded">
            Illustrative Industry Benchmark
          </span>
        </div>

        <div className="space-y-4">
          {skillComparisonList.map((s, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-bold text-sm text-[#062B52] flex items-center gap-2">
                  <span>{s.skill}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    s.gap === 'High Priority' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {s.gap}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-slate-600">
                  Current: <span className="text-rose-600">{s.currentPct}%</span> | Required: <span className="text-emerald-700">{s.requiredPct}%</span>
                </div>
              </div>

              {/* Progress bars comparison */}
              <div className="space-y-1">
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden relative">
                  {/* Required bar indicator */}
                  <div className="bg-emerald-500/30 h-full absolute top-0 left-0 rounded-full" style={{ width: `${s.requiredPct}%` }}></div>
                  {/* Current bar */}
                  <div className="bg-[#062B52] h-full rounded-full relative z-10" style={{ width: `${s.currentPct}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP SKILL GAPS RANKING */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <h3 className="font-extrabold text-base text-[#062B52] flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#0B3B70]" />
          <span>Top Skill Gap Priority Ranking</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
            <span className="text-[10px] font-extrabold text-rose-800 uppercase block">1. SQL Querying</span>
            <h4 className="font-extrabold text-rose-950 text-sm">SQL Querying — High Priority</h4>
            <p className="text-rose-900 text-[11px] leading-relaxed">
              Current: 40% vs Required: 80%. Critical for data analysis & database reporting tasks.
            </p>
          </div>

          <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
            <span className="text-[10px] font-extrabold text-rose-800 uppercase block">2. Power BI & DAX</span>
            <h4 className="font-extrabold text-rose-950 text-sm">Power BI — High Priority</h4>
            <p className="text-rose-900 text-[11px] leading-relaxed">
              Current: 35% vs Required: 75%. Essential for creating business dashboards and KPIs.
            </p>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <span className="text-[10px] font-extrabold text-amber-800 uppercase block">3. Python (Pandas)</span>
            <h4 className="font-extrabold text-amber-950 text-sm">Python — Medium Priority</h4>
            <p className="text-amber-900 text-[11px] leading-relaxed">
              Current: 65% vs Required: 80%. Automated data cleaning and analytics scripting.
            </p>
          </div>
        </div>
      </div>

      {/* RECOMMENDED COURSES SECTION LINKED TO GAPS */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F2A900]" />
            <h3 className="font-extrabold text-base text-[#062B52]">Recommended Upskilling Interventions</h3>
          </div>
          <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded">
            Targeted for {targetRole}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F5F7FA] border border-slate-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-[#062B52] transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="bg-[#062B52] text-[#F2A900] px-2 py-0.5 rounded uppercase">High Priority Gap</span>
                <span className="text-slate-500 font-mono">4 Weeks</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#062B52]">Advanced SQL & Query Optimization</h4>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Master complex JOINs, CTEs, Window Functions, and query tuning required for data analyst roles.
              </p>
            </div>
            <button
              onClick={() => {
                const { updateCourseProgress } = useApp();
              }}
              onClickCapture={() => {
                navigate('/my-training');
              }}
              className="w-full bg-[#062B52] hover:bg-[#0B3B70] text-white py-2.5 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Start Training →</span>
            </button>
          </div>

          <div className="bg-[#F5F7FA] border border-slate-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-[#062B52] transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="bg-[#062B52] text-[#F2A900] px-2 py-0.5 rounded uppercase">High Priority Gap</span>
                <span className="text-slate-500 font-mono">3 Weeks</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#062B52]">Power BI & Business Intelligence</h4>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Build executive dashboards, DAX calculations, and automated reporting pipelines.
              </p>
            </div>
            <button
              onClickCapture={() => {
                navigate('/my-training');
              }}
              className="w-full bg-[#062B52] hover:bg-[#0B3B70] text-white py-2.5 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Start Training →</span>
            </button>
          </div>

          <div className="bg-[#F5F7FA] border border-slate-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-[#062B52] transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded uppercase border border-amber-300">Capstone Project</span>
                <span className="text-slate-500 font-mono">2 Weeks</span>
              </div>
              <h4 className="font-extrabold text-sm text-[#062B52]">Industry Outcome Capstone</h4>
              <p className="text-xs text-[#52657A] leading-relaxed">
                Build real-world Maharashtra skill gap & outcome analytics portfolio projects for hiring managers.
              </p>
            </div>
            <button
              onClickCapture={() => {
                navigate('/my-training');
              }}
              className="w-full bg-[#062B52] hover:bg-[#0B3B70] text-white py-2.5 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Start Training →</span>
            </button>
          </div>
        </div>
      </div>

      {/* ROADMAP ACTION BANNER */}
      <div className="bg-[#032447] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#F2A900] uppercase tracking-wider">PERSONALIZED ROADMAP INTERVENTION</span>
          <h3 className="text-xl font-extrabold text-white">View My Recommended Upskilling Roadmap</h3>
          <p className="text-slate-300 text-xs max-w-xl">
            Generated deterministically from your identified skill gaps to boost your placement readiness and wage tier.
          </p>
        </div>

        <button
          onClick={() => navigate('/roadmap')}
          className="bg-[#F2A900] hover:bg-amber-400 text-[#032447] font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md shrink-0 flex items-center gap-2 hover:scale-105"
        >
          <span>View My Upskilling Roadmap →</span>
        </button>
      </div>

    </div>
  );
}
