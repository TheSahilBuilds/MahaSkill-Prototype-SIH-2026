import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  BrainCircuit, 
  Target, 
  Compass, 
  BarChart3, 
  Award, 
  Flame, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  UserCheck,
  Video,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { profile, userSkills, metrics, overallReadiness, t } = useApp();

  const pieData = [
    { name: 'Readiness', value: overallReadiness, color: '#1456A0' },
    { name: 'Remaining', value: 100 - overallReadiness, color: '#E2E8F0' }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#062B55] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#1456A0] relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#031B38] text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-300/30">
            <UserCheck className="w-3.5 h-3.5 text-[#E8A317]" />
            <span>Target Role: {profile.targetRole} • {profile.district}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {t("Good morning")}, {profile.name}! 👋
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Track your skills, career readiness, and industry alignment from one central dashboard.
          </p>
        </div>

        {/* Profile completion notice strip inside banner */}
        <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8A317] animate-ping"></span>
            <span className="font-semibold text-slate-200">Your career profile is 78% complete.</span>
          </div>
          <Link to="/profile" className="text-amber-300 hover:text-white font-bold underline flex items-center gap-1">
            <span>Complete Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* KPI 1: Skill Readiness */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Skill Readiness</span>
            <BrainCircuit className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#062B55]">{metrics.technicalSkillsScore}%</div>
          <div className="text-[10px] text-slate-500 font-medium">Technical average</div>
        </div>

        {/* KPI 2: Industry Alignment */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Industry Alignment</span>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{metrics.industryAlignment}%</div>
          <div className="text-[10px] text-slate-500 font-medium">Market demand match</div>
        </div>

        {/* KPI 3: Skill Gap */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Skill Gap</span>
            <Target className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600">{metrics.skillGapCount} <span className="text-xs font-normal">Skills</span></div>
          <div className="text-[10px] text-slate-500 font-medium">Needs improvement</div>
        </div>

        {/* KPI 4: Career Match */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Career Match</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#E8A317]">{metrics.careerMatch}%</div>
          <div className="text-[10px] text-slate-500 font-medium">Software Dev Role</div>
        </div>

        {/* KPI 5: Learning Streak */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Learning Streak</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-extrabold text-orange-600">12 <span className="text-xs font-normal">Days</span></div>
          <div className="text-[10px] text-slate-500 font-medium">Active daily study</div>
        </div>

        {/* KPI 6: Applications */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">Applications</span>
            <Send className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-700">6</div>
          <div className="text-[10px] text-slate-500 font-medium">Active job matches</div>
        </div>

      </div>

      {/* CAREER READINESS SECTION & PRIORITY GAPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Overall Readiness Radial Gauge & Category Breakdown */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-lg text-[#062B55]">Career Readiness Score</h2>
            <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded">
              SIH AI Calculation
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* Donut Chart Gauge */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={68}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-[#062B55]">{overallReadiness}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="flex-1 w-full space-y-3">
              {[
                { label: "Technical Skills", val: metrics.technicalSkillsScore, color: "bg-blue-600" },
                { label: "Communication", val: 64, color: "bg-[#E8A317]" },
                { label: "Industry Alignment", val: metrics.industryAlignment, color: "bg-emerald-600" },
                { label: "Projects & Resume", val: profile.atsScore || 78, color: "bg-purple-600" },
                { label: "Interview Readiness", val: profile.interviewScore || 69, color: "bg-rose-500" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-slate-900 font-mono">{item.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right: Priority Skill Gaps */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-lg text-[#062B55] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>High Priority Skill Gaps</span>
            </h2>
            <Link to="/skill-gap" className="text-xs font-bold text-[#1456A0] hover:underline">
              Analyze All ({metrics.skillGapCount})
            </Link>
          </div>

          <div className="space-y-3">
            {metrics.priorityGaps.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">
                Great job! No high priority skill gaps detected for {profile.targetRole}.
              </div>
            ) : (
              metrics.priorityGaps.slice(0, 4).map((item) => (
                <div key={item.skill} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                      <span>{item.skill}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Your Level: <strong className="text-slate-800">{item.userRating}/10</strong> • Industry Target: <strong className="text-blue-700">{item.requiredLevel}/10</strong>
                    </div>
                  </div>
                  <Link
                    to="/roadmap"
                    className="bg-[#1456A0] hover:bg-[#062B55] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition shrink-0"
                  >
                    Learn Next
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Quick Action Bar */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Link to="/skill-gap" className="p-2.5 bg-blue-50 hover:bg-blue-100 text-[#1456A0] rounded-xl text-center font-bold text-xs transition flex flex-col items-center gap-1">
              <Target className="w-4 h-4" />
              <span>Skill Gap</span>
            </Link>
            <Link to="/roadmap" className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-center font-bold text-xs transition flex flex-col items-center gap-1">
              <Compass className="w-4 h-4 text-[#E8A317]" />
              <span>Career Roadmap</span>
            </Link>
            <Link to="/mock-interview" className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-xl text-center font-bold text-xs transition flex flex-col items-center gap-1 col-span-2 sm:col-span-1">
              <Video className="w-4 h-4 text-purple-600" />
              <span>Mock Interview</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
