import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Landmark, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  MapPin,
  Building2,
  Info
} from 'lucide-react';
import { STATE_ADMIN_ANALYTICS } from '../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AdminInsights() {
  const { t } = useApp();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
          <Landmark className="w-3.5 h-3.5 text-amber-900" />
          <span>Government of Maharashtra Administrative View</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">Skill Intelligence — Maharashtra</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Statewide aggregated analytics tracking student skill development, district readiness, and industry alignment.
        </p>
      </div>

      {/* AGGREGATE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>Total Students Enrolled</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-[#062B55]">{STATE_ADMIN_ANALYTICS.totalStudents}</div>
          <div className="text-xs text-slate-500">Across 36 Maharashtra Districts</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>Students AI Analyzed</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700">{STATE_ADMIN_ANALYTICS.studentsAnalyzed}</div>
          <div className="text-xs text-slate-500">Profiles mapped with skill gap</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>Industry Aligned</span>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-[#E8A317]">{STATE_ADMIN_ANALYTICS.industryAligned}</div>
          <div className="text-xs text-slate-500">Meeting target role threshold</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
            <span>High-Demand Skill Gap</span>
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="text-3xl font-extrabold text-rose-600">{STATE_ADMIN_ANALYTICS.highGapPercentage}</div>
          <div className="text-xs text-slate-500">Targeting for skill training</div>
        </div>
      </div>

      {/* DISTRICT-WISE READINESS CHART & TABLE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-extrabold text-lg text-[#062B55]">District-Wise Skill Readiness</h2>
            <p className="text-xs text-slate-500">Aggregated employability scores across key industrial clusters in Maharashtra.</p>
          </div>
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            Aggregated Data
          </span>
        </div>

        {/* Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={STATE_ADMIN_ANALYTICS.districtReadiness}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="district" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="readinessScore" name="Readiness Score %" fill="#1456A0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">District</th>
                <th className="py-3 px-3">Analyzed Students</th>
                <th className="py-3 px-3">Avg Readiness Score</th>
                <th className="py-3 px-3">High Skill Gap %</th>
                <th className="py-3 px-3">Top In-Demand Domain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {STATE_ADMIN_ANALYTICS.districtReadiness.map(d => (
                <tr key={d.district} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">{d.district}</td>
                  <td className="py-3 px-3 font-mono">{d.totalStudents.toLocaleString()}</td>
                  <td className="py-3 px-3 font-bold text-blue-700 font-mono">{d.readinessScore}%</td>
                  <td className="py-3 px-3 font-bold text-rose-600 font-mono">{d.highGapPct}%</td>
                  <td className="py-3 px-3 text-slate-600">{d.topDemand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
