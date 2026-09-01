import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BrainCircuit, 
  Plus, 
  Trash2, 
  Star, 
  TrendingUp, 
  X, 
  Check, 
  Sliders,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function MySkills() {
  const { userSkills, addSkill, updateSkillRating, deleteSkill, t } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillRating, setNewSkillRating] = useState('6.0');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming');
  const [newSkillDemand, setNewSkillDemand] = useState('HIGH');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill({
      name: newSkillName.trim(),
      rating: parseFloat(newSkillRating),
      category: newSkillCategory,
      demandLevel: newSkillDemand
    });

    setNewSkillName('');
    setNewSkillRating('6.0');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full mb-1">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Interactive Skill Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">My Skills</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            View, add, or adjust your current technical skill proficiencies. Changes update your placement readiness instantly.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#1456A0] hover:bg-[#062B55] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2 shrink-0 hover:scale-105"
        >
          <Plus className="w-4 h-4 text-[#E8A317]" />
          <span>+ Add New Skill</span>
        </button>
      </div>

      {/* SKILL CARDS GRID */}
      {userSkills.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <BrainCircuit className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No skills added yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click '+ Add New Skill' to build your technical profile and calculate your industry skill gap.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#1456A0] text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSkills.map((skill) => (
            <div key={skill.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 relative group">
              
              {/* Card Top: Title & Badges */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{skill.category || 'Skill'}</span>
                  <h3 className="font-extrabold text-base text-[#062B55]">{skill.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    skill.demandLevel === 'HIGH' 
                      ? 'bg-rose-100 text-rose-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {skill.demandLevel || 'HIGH'} DEMAND
                  </span>

                  <button
                    onClick={() => deleteSkill(skill.id)}
                    className="text-slate-400 hover:text-rose-600 transition p-1"
                    title="Delete skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rating Slider & Score */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Proficiency Level</span>
                  <span className="font-extrabold text-[#1456A0] font-mono text-sm">{skill.rating} / 10</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={skill.rating}
                  onChange={(e) => updateSkillRating(skill.id, e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1456A0]"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Beginner (1)</span>
                  <span>Intermediate (5)</span>
                  <span>Expert (10)</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1 text-[11px]">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  <span>Real-time score synced</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ADD SKILL MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-6 animate-in zoom-in-95">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-[#062B55] flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#E8A317]" />
                <span>Add Skill to Profile</span>
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Computing, Docker, Java, PostgreSQL"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-[#1456A0] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Skill Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-[#1456A0]"
                >
                  <option value="Programming">Programming</option>
                  <option value="Database">Database</option>
                  <option value="Web / Frontend">Web / Frontend</option>
                  <option value="Backend & APIs">Backend & APIs</option>
                  <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                  <option value="Core CS">Core CS & Algorithms</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Current Proficiency Level</span>
                  <span className="font-mono text-blue-700 text-sm">{newSkillRating} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={newSkillRating}
                  onChange={(e) => setNewSkillRating(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1456A0]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Perceived Industry Demand</label>
                <select
                  value={newSkillDemand}
                  onChange={(e) => setNewSkillDemand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-[#1456A0]"
                >
                  <option value="HIGH">HIGH DEMAND</option>
                  <option value="MEDIUM">MEDIUM DEMAND</option>
                  <option value="LOW">LOW DEMAND</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1456A0] hover:bg-[#062B55] text-white font-bold shadow-md"
                >
                  Save Skill
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
