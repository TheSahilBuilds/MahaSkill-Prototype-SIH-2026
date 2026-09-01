import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Save, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Code2, 
  Award,
  Sparkles
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS, MAHARASHTRA_INDUSTRIES, TARGET_ROLES } from '../data/mockData';

export default function Profile() {
  const { profile, updateProfile, userSkills, t } = useApp();

  const [formData, setFormData] = useState({ ...profile });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Student Career Preferences & Bio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">Student Profile</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Manage your personal information, target role preferences, education, and career aspirations.
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile 78% Complete</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* PERSONAL INFO & EDUCATION */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-extrabold text-base text-[#062B55] flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-[#1456A0]" />
            <span>Personal Information & Education</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">College / University</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Degree & Major</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Graduation Year</label>
              <input
                type="text"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Home District</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              >
                {MAHARASHTRA_DISTRICTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CAREER PREFERENCES */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-extrabold text-base text-[#062B55] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-5 h-5 text-[#E8A317]" />
            <span>Career Preferences & Goals</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Job Role</label>
              <select
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              >
                {TARGET_ROLES.map(r => (
                  <option key={r.id} value={r.title}>{r.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Industry</label>
              <select
                value={formData.targetIndustry}
                onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              >
                {MAHARASHTRA_INDUSTRIES.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Expected Salary</label>
              <input
                type="text"
                value={formData.targetSalary}
                onChange={(e) => setFormData({ ...formData, targetSalary: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-[#1456A0]"
              />
            </div>
          </div>
        </div>

        {/* PROJECTS SECTION */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-[#062B55] flex items-center gap-2 border-b border-slate-100 pb-3">
            <Code2 className="w-5 h-5 text-purple-600" />
            <span>Academic & Capstone Projects</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">MahaSkill AI — Skill Intelligence Platform</div>
              <div className="text-slate-600">Tech Stack: React, Tailwind CSS, Recharts, LocalStorage Engine</div>
              <div className="text-blue-700 font-mono">github.com/aarav-patil/mahaskill-ai</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900">E-Commerce Microservices Backend</div>
              <div className="text-slate-600">Tech Stack: Python, SQL, REST APIs, Docker</div>
              <div className="text-blue-700 font-mono">github.com/aarav-patil/microservice-demo</div>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-between items-center bg-slate-100 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-600">
            {isSaved ? "✓ Profile preferences updated successfully!" : "Ensure all fields are accurate for optimal AI recommendations."}
          </span>

          <button
            type="submit"
            className="bg-[#1456A0] hover:bg-[#062B55] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#E8A317]" />
            <span>Save Profile Preferences</span>
          </button>
        </div>

      </form>

    </div>
  );
}
