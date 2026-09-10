import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart2, Filter, Zap, Info, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { MAHARASHTRA_DISTRICTS, MAHARASHTRA_INDUSTRIES, TARGET_ROLES } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function IndustryRequirements() {
  const [district, setDistrict] = useState("Pune");
  const [industry, setIndustry] = useState("Information Technology");
  const [role, setRole] = useState("Data Analyst");

  const benchmarkMatrix = [
    { skill: "SQL Querying & DB Joins", industryReq: "80%", currentLevel: "40%", gap: "40%", priority: "High Priority" },
    { skill: "Power BI & DAX Calculations", industryReq: "75%", currentLevel: "35%", gap: "40%", priority: "High Priority" },
    { skill: "Python Data Analysis (Pandas)", industryReq: "80%", currentLevel: "65%", gap: "15%", priority: "Medium Priority" },
    { skill: "Git & Version Control", industryReq: "75%", currentLevel: "50%", gap: "25%", priority: "Medium Priority" },
    { skill: "Cloud Data Warehouse (AWS)", industryReq: "70%", currentLevel: "30%", gap: "40%", priority: "High Priority" }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3B70] bg-[#F5F7FA] px-2.5 py-0.5 rounded-full border border-slate-200">
            <BarChart2 className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Maharashtra Outcome Alignment Benchmark</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>Illustrative Industry Benchmark — Prototype Data</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B52]">Industry Requirements & Skilling Linkage</h1>
        <p className="text-xs sm:text-sm text-[#52657A]">
          Connecting Industry Benchmarks → Current Trainee Skills → Skill Gap → Employment Outcome.
        </p>

        {/* WORKFLOW PIPELINE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs font-bold">
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[#062B52]">
            1. Industry Benchmark
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[#062B52]">
            2. Trainee Current Level
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-rose-700">
            3. Identified Skill Gap
          </div>
          <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
            4. Employment Outcome
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <div className="text-xs font-bold text-[#062B52] flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#F2A900]" />
          <span>Select Role & District Benchmark</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
          <div>
            <label className="block text-[#52657A] mb-1">Industry</label>
            <select 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-lg p-2 text-[#172B4D]"
            >
              {MAHARASHTRA_INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[#52657A] mb-1">Target Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-lg p-2 text-[#172B4D]"
            >
              {TARGET_ROLES.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[#52657A] mb-1">District Location</label>
            <select 
              value={district} 
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-lg p-2 text-[#172B4D]"
            >
              {MAHARASHTRA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* BENCHMARK TABLE */}
      <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-[#062B52]">
            Industry Requirement Benchmark Matrix — {role} ({district})
          </h3>
          <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-300">
            Illustrative Industry Benchmark
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100 text-[#062B52] font-extrabold border-b border-slate-200">
                <th className="p-3">Skill Component</th>
                <th className="p-3">Industry Requirement</th>
                <th className="p-3">Current Trainee Level</th>
                <th className="p-3">Identified Gap</th>
                <th className="p-3">Intervention Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {benchmarkMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-[#062B52]">{item.skill}</td>
                  <td className="p-3 text-emerald-700 font-bold">{item.industryReq}</td>
                  <td className="p-3 text-slate-700">{item.currentLevel}</td>
                  <td className="p-3 font-bold text-rose-600">{item.gap}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                      item.priority === 'High Priority' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 flex justify-end">
          <Link
            to="/roadmap"
            className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5"
          >
            <span>View Recommended Upskilling Roadmap</span>
            <ArrowRight className="w-4 h-4 text-[#F2A900]" />
          </Link>
        </div>
      </div>

    </div>
  );
}
