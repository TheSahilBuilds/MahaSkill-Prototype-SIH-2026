import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  CheckSquare, 
  Square,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';

export default function Roadmap() {
  const { profile, roadmapPhases, toggleRoadmapTask, overallReadiness, t } = useApp();

  // Overall roadmap completion percentage
  const totalTasks = roadmapPhases.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = roadmapPhases.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);
  const overallRoadmapProgress = Math.round((completedTasks / (totalTasks || 1)) * 100);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full mb-1">
              <Compass className="w-3.5 h-3.5 text-[#E8A317]" />
              <span>Personalized Learning Pathway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">Your Career Roadmap</h1>
            <p className="text-xs sm:text-sm text-slate-600">
              A structured 12-week journey tailored to your target role ({profile.targetRole}) and missing skill gaps.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-right shrink-0">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Roadmap Progress</div>
            <div className="text-2xl font-extrabold text-[#1456A0] font-mono">{overallRoadmapProgress}%</div>
            <div className="text-[10px] text-slate-500 font-medium">{completedTasks} of {totalTasks} tasks done</div>
          </div>
        </div>

        {/* Top Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 flex items-center justify-between">
            <span className="text-slate-600 font-semibold">Target Role:</span>
            <span className="font-extrabold text-[#062B55]">{profile.targetRole}</span>
          </div>

          <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-100 flex items-center justify-between">
            <span className="text-slate-600 font-semibold">Estimated Duration:</span>
            <span className="font-extrabold text-amber-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#E8A317]" />
              <span>12 Weeks</span>
            </span>
          </div>

          <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 flex items-center justify-between">
            <span className="text-slate-600 font-semibold">Current Readiness:</span>
            <span className="font-extrabold text-emerald-800 font-mono">{overallReadiness}%</span>
          </div>
        </div>

      </div>

      {/* ROADMAP TIMELINE PHASES */}
      <div className="space-y-6 relative before:absolute before:left-4 sm:before:left-8 before:top-6 before:bottom-6 before:w-1 before:bg-slate-200">
        
        {roadmapPhases.map((phase, idx) => (
          <div key={phase.id} className="relative pl-10 sm:pl-16">
            
            {/* Timeline Dot Indicator */}
            <div className={`
              absolute left-1.5 sm:left-5 top-6 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center font-mono text-[10px] font-bold text-white z-10
              ${phase.status === 'Completed' ? 'bg-emerald-600' : phase.status === 'In Progress' ? 'bg-[#1456A0]' : 'bg-slate-400'}
            `}>
              {idx + 1}
            </div>

            {/* Phase Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-blue-300 transition">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {phase.phaseNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{phase.duration}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#062B55] mt-1">{phase.title}</h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    phase.status === 'Completed' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : phase.status === 'In Progress' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {phase.status} ({phase.progress}%)
                  </span>
                </div>
              </div>

              {/* Covered Skills */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="font-bold text-slate-500 mr-1">Skills Covered:</span>
                {phase.skills.map(s => (
                  <span key={s} className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>

              {/* Actionable Checkbox Tasks */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Checklist Action Items
                </div>
                {phase.tasks.map(task => (
                  <div 
                    key={task.id}
                    onClick={() => toggleRoadmapTask(phase.id, task.id)}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-white cursor-pointer transition text-xs select-none"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className={`leading-relaxed ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Action buttons */}
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-slate-500 font-medium">
                  {phase.tasks.filter(t => t.completed).length} of {phase.tasks.length} tasks completed
                </span>
                <button
                  onClick={() => alert(`Launching interactive learning module for ${phase.title}...`)}
                  className="bg-[#1456A0] hover:bg-[#062B55] text-white px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
