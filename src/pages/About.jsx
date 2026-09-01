import React from 'react';
import { Target, Award, BrainCircuit, Users, Building2, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-[#062B52] text-white p-8 sm:p-10 rounded-2xl shadow-md space-y-3">
        <span className="bg-[#032447] text-[#F2A900] text-xs font-bold px-3 py-1 rounded-full border border-[#F2A900]/30 inline-block">
          Smart India Hackathon 2026 Prototype
        </span>
        <h1 className="text-3xl font-extrabold">About MahaSkill AI</h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          MahaSkill AI is a Maharashtra-focused skill intelligence and career guidance platform designed to help students understand their skill gaps, discover industry requirements, and follow a structured learning roadmap.
        </p>
      </div>

      {/* VISION & MISSION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B3B70] flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#062B52]">Our Vision</h3>
          <p className="text-xs text-[#52657A] leading-relaxed">
            "Build a skilled, employable and future-ready Maharashtra."
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F2A900] flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-[#062B52]">Our Mission</h3>
          <p className="text-xs text-[#52657A] leading-relaxed">
            "Connect student capabilities with real industry requirements through intelligent skill analysis."
          </p>
        </div>

      </div>

      {/* WHY MAHASKILL AI */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-6">
        <h3 className="font-extrabold text-lg text-[#062B52]">Why MahaSkill AI?</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { title: "Skill Intelligence", desc: "Understand actual industry skill demands across Maharashtra clusters.", icon: BrainCircuit },
            { title: "Personalized Roadmap", desc: "Get a clear week-by-week learning pathway tailored to your gaps.", icon: Target },
            { title: "Industry Alignment", desc: "Bridge the gap between academic training and employer expectations.", icon: Building2 },
            { title: "Youth Empowerment", desc: "Empower students in Pune, Mumbai, Nagpur, Nashik and beyond.", icon: GraduationCap },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="p-4 bg-[#F5F7FA] rounded-xl border border-slate-200 space-y-2">
                <Icon className="w-5 h-5 text-[#0B3B70]" />
                <h4 className="font-bold text-[#062B52]">{card.title}</h4>
                <p className="text-[#52657A] text-[11px] leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
