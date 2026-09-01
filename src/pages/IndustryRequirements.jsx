import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart2, Filter, Zap, Info } from 'lucide-react';
import { MAHARASHTRA_DISTRICTS, MAHARASHTRA_INDUSTRIES, TARGET_ROLES } from '../data/mockData';

export default function IndustryRequirements() {
  const [district, setDistrict] = useState("Pune");
  const [industry, setIndustry] = useState("Information Technology");
  const [role, setRole] = useState("Software Developer");

  const inDemandSkills = [
    { name: "Python", pct: 82, demand: "High" },
    { name: "SQL", pct: 76, demand: "High" },
    { name: "Cloud Computing (AWS/Azure)", pct: 68, demand: "High" },
    { name: "Data Analytics", pct: 61, demand: "Medium" },
    { name: "Generative AI", pct: 54, demand: "High" },
    { name: "JavaScript & React", pct: 71, demand: "High" },
  ];

  const emergingTech = [
    { name: "Generative AI & LLMs", growth: "+142%", domain: "AI" },
    { name: "Cloud Computing", growth: "+38%", domain: "Infrastructure" },
    { name: "Cybersecurity & Zero Trust", growth: "+32%", domain: "Security" },
    { name: "Data Engineering (Spark/Kafka)", growth: "+29%", domain: "Data" },
    { name: "EV & Embedded Systems", growth: "+45%", domain: "Automotive" },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3B70] bg-[#F5F7FA] px-2.5 py-0.5 rounded-full border border-slate-200">
            <BarChart2 className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Maharashtra Market Data</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
            <Info className="w-3.5 h-3.5 text-[#F2A900]" />
            <span>Illustrative Industry Benchmark — Prototype Data</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B52]">Industry Requirements</h1>
        <p className="text-xs sm:text-sm text-[#52657A]">
          Understand what Maharashtra's industries are looking for across roles and locations.
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <div className="text-xs font-bold text-[#062B52] flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#F2A900]" />
          <span>Filters</span>
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
            <label className="block text-[#52657A] mb-1">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-lg p-2 text-[#172B4D]"
            >
              {TARGET_ROLES.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[#52657A] mb-1">Location</label>
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

      {/* SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Most In-Demand Skills */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <h3 className="font-extrabold text-base text-[#062B52] border-b border-slate-100 pb-3">
            Most In-Demand Skills for {role} in {district}
          </h3>

          <div className="space-y-4">
            {inDemandSkills.map((item) => (
              <div key={item.name} className="space-y-1 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-[#172B4D]">{item.name}</span>
                  <span className="font-mono text-[#0B3B70]">{item.pct}% Demand</span>
                </div>
                <div className="w-full bg-[#F5F7FA] rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="bg-[#062B52] h-full rounded-full" style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fastest Emerging Technologies */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <h3 className="font-extrabold text-base text-[#062B52] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Zap className="w-4 h-4 text-[#F2A900]" />
            <span>Fastest Emerging Technologies</span>
          </h3>

          <div className="space-y-3 text-xs">
            {emergingTech.map((em) => (
              <div key={em.name} className="p-3 bg-[#F5F7FA] rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#062B52]">{em.name}</div>
                  <div className="text-[10px] text-[#52657A]">Domain: {em.domain}</div>
                </div>
                <span className="font-bold text-[#16A36A] bg-emerald-100 px-2 py-0.5 rounded font-mono text-[11px]">
                  {em.growth}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
