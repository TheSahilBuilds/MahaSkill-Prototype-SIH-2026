import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  Target, 
  BrainCircuit, 
  FileText, 
  Video, 
  Code2, 
  BookOpen,
  Printer
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';

export default function PlacementReport() {
  const { profile, metrics, overallReadiness, t } = useApp();

  const radarData = [
    { category: 'Technical', score: metrics.technicalSkillsScore || 78 },
    { category: 'Alignment', score: metrics.industryAlignment || 72 },
    { category: 'Resume ATS', score: profile.atsScore || 82 },
    { category: 'Interview', score: profile.interviewScore || 69 },
    { category: 'Coding', score: profile.codingScore || 80 },
    { category: 'Aptitude', score: profile.aptitudeScore || 72 }
  ];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12 print:p-0">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>SIH 2026 Executive Summary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">Placement Readiness Report</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            A comprehensive radar evaluation of your technical skills, market alignment, resume, and interview prep.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="bg-[#1456A0] hover:bg-[#062B55] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2 shrink-0 hover:scale-105"
        >
          <Printer className="w-4 h-4 text-[#E8A317]" />
          <span>Print / Download Report</span>
        </button>
      </div>

      {/* OFFICIAL REPORT CONTAINER */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-8 print:border-none print:shadow-none">
        
        {/* Report Top Header */}
        <div className="border-b-2 border-[#062B55] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-xs font-extrabold text-amber-700 tracking-wider uppercase">GOVERNMENT OF MAHARASHTRA • MAHASKILL AI</div>
            <h2 className="text-2xl font-extrabold text-[#062B55]">Student Placement Audit</h2>
            <div className="text-xs text-slate-500 mt-1">
              Candidate: <strong>{profile.name}</strong> • SPPU Pune • Target Role: <strong>{profile.targetRole} ({profile.district})</strong>
            </div>
          </div>

          <div className="bg-[#031B38] text-white p-4 rounded-2xl text-center shrink-0 border border-slate-700">
            <div className="text-[10px] font-bold text-slate-300 uppercase">Overall Score</div>
            <div className="text-3xl font-extrabold text-[#E8A317] font-mono">{overallReadiness} <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
            <div className="text-[10px] text-emerald-400 font-bold">Industry Ready</div>
          </div>
        </div>

        {/* RADAR CHART & METRIC BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Radar Chart */}
          <div className="lg:col-span-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-700 text-center uppercase tracking-wider">
              6-Axis Readiness Radar Evaluation
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#CBD5E1" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#062B55', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94A3B8" />
                  <Radar name="Candidate Score" dataKey="score" stroke="#1456A0" fill="#1456A0" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Metric Breakdown Table */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="font-extrabold text-sm text-[#062B55]">Dimension Score Breakdown</h3>

            <div className="space-y-2.5">
              {radarData.map(item => (
                <div key={item.category} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{item.category} Score</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#1456A0] h-full rounded-full" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="font-mono font-extrabold text-blue-900 w-8">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RECOMMENDED ACTIONS */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="font-extrabold text-base text-[#062B55] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E8A317]" />
            <span>AI Recommended Actions to Reach 85%+ Readiness</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
              <div className="font-bold text-amber-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E8A317]" />
                <span>1. Improve System Design Baseline</span>
              </div>
              <p className="text-amber-900 text-[11px]">Complete the System Design module in Phase 3 of your roadmap to bridge your highest gap.</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
              <div className="font-bold text-blue-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>2. Solve 20 DSA Practice Questions</span>
              </div>
              <p className="text-blue-900 text-[11px]">Practice Arrays, Trees, and SQL Joins on the Coding Practice sandbox.</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
              <div className="font-bold text-purple-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>3. Deploy 1 Cloud Capstone Project</span>
              </div>
              <p className="text-purple-900 text-[11px]">Containerize web app using Docker and publish AWS live deployment link.</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4. Complete 2 AI Mock Interviews</span>
              </div>
              <p className="text-emerald-900 text-[11px]">Practice verbal responses to boost your communication score from 69% to 80%+.</p>
            </div>
          </div>
        </div>

        {/* Report Footer */}
        <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <div>Report ID: MS-AI-2026-SPPU-8941</div>
          <div>MahaSkill AI Engine • Smart India Hackathon Prototype</div>
        </div>

      </div>

    </div>
  );
}
