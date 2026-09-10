import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Target,
  Sparkles,
  MapPin,
  Building2,
  Calendar
} from 'lucide-react';

export default function MyOutcomeDashboard() {
  const { traineeRecord, outcomeState, followupTimeline } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* 1. HEADER */}
      <div className="bg-[#032447] text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F2A900]/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#F2A900] text-[#032447] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wide">
                TRAINEE OUTCOME SUMMARY
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700">
                Personal Livelihood Dashboard
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
              My Training & Career Outcome
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Track your post-training employment verification, wage progression, retention milestones, and next upskilling steps.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl shrink-0 text-right">
            <div className="text-[10px] font-bold uppercase text-[#F2A900] tracking-wider">Verification Status</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">✓ Outcome Verified</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Demo Verification</div>
          </div>
        </div>
      </div>

      {/* 2. COMPACT SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Training Status</div>
          <div className="text-base font-extrabold text-emerald-700 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Completed
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 truncate">{traineeRecord.course}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Certification</div>
          <div className="text-base font-extrabold text-[#062B52] mt-1 flex items-center gap-1">
            <Award className="w-4 h-4 text-[#F2A900]" />
            Certified
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Score: {traineeRecord.assessmentScore}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Employment Outcome</div>
          <div className="text-base font-extrabold text-blue-700 mt-1 flex items-center gap-1 truncate">
            <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
            {outcomeState.status}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 truncate">{outcomeState.employerName}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">6-Month Retention</div>
          <div className="text-base font-extrabold text-purple-700 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            Active
          </div>
          <div className="text-[10px] text-purple-600 font-semibold mt-0.5">Sustained Employment</div>
        </div>

      </div>

      {/* 3. WAGE PROGRESSION & RELEVANCE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WAGE PROGRESSION */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Wage Progression</h2>
            </div>
            <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
              +{outcomeState.wageGrowthPercentage || 39.1}% Growth
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Starting Salary</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">
                ₹{outcomeState.startingSalary?.toLocaleString('en-IN')}/mo
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Initial placement offer</span>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300">
              <span className="text-xs text-emerald-800 font-bold block">Current Salary</span>
              <span className="text-xl font-black text-emerald-700 mt-1 block">
                ₹{outcomeState.currentSalary?.toLocaleString('en-IN')}/mo
              </span>
              <span className="text-[10px] font-bold text-emerald-700 mt-0.5 block">
                +{outcomeState.wageGrowthPercentage || 39.1}% Increase post-training
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-[#062B52]">Employment Details</div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div><strong>Employer:</strong> {outcomeState.employerName}</div>
              <div><strong>Role:</strong> {outcomeState.jobRole}</div>
              <div><strong>Location:</strong> {outcomeState.location}</div>
              <div><strong>Verification:</strong> <span className="text-emerald-700 font-bold">✓ Demo Verified</span></div>
            </div>
          </div>
        </div>

        {/* TRAINING RELEVANCE */}
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#062B52]">Training Relevance</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">High</span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Job Alignment:</span>
                <span className="font-bold text-[#062B52]">Directly Aligned</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Skill Utilization:</span>
                <span className="font-bold text-emerald-700">88% Skills Used</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/my-training"
              className="w-full bg-[#062B52] hover:bg-[#0B3B70] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Update Outcome Signals</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2A900]" />
            </Link>
          </div>
        </div>

      </div>

      {/* 4. OUTCOME JOURNEY TIMELINE & CURRENT SKILL GAPS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TIMELINE */}
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-base text-[#062B52]">Outcome Follow-up Journey</h2>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              Longitudinal Schedule
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {followupTimeline.map((item) => {
              const isCompleted = item.status === "Completed";
              const isDue = item.status === "Due";
              return (
                <div key={item.id} className={`p-2.5 rounded-xl border ${
                  isCompleted ? 'bg-emerald-50 border-emerald-300 text-emerald-900' :
                  isDue ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold animate-pulse' :
                  'bg-slate-50 border-slate-200 text-slate-400'
                }`}>
                  <div className="font-bold">{item.period}</div>
                  <div className="text-[11px] mt-1">{isCompleted ? '✓ Done' : isDue ? '● Due' : '○ Upcoming'}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SKILL GAPS & NEXT STEP CTA */}
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#062B52]" />
                <h2 className="font-extrabold text-base text-[#062B52]">Current Skill Gaps</h2>
              </div>
              <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                For Next Career Tier
              </span>
            </div>

            <div className="space-y-2 mt-3 text-xs">
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold text-[#062B52]">Advanced SQL & Query Optimization</span>
                <span className="font-mono text-rose-700 font-bold">High Priority</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="font-bold text-[#062B52]">Power BI & DAX Analytics</span>
                <span className="font-mono text-amber-700 font-bold">Medium Priority</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/roadmap"
              className="w-full bg-[#F2A900] hover:bg-amber-400 text-[#032447] py-2.5 rounded-xl font-extrabold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Improve My Skills (View Roadmap)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
