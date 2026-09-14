import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  ArrowDown, 
  X, 
  Check, 
  ChevronRight,
  SlidersHorizontal,
  Info,
  Award,
  Sparkles
} from 'lucide-react';

export default function SkillRoadmap() {
  const { user, analysisResult, outcomeState, t } = useApp();
  const navigate = useNavigate();
  
  const userName = user?.name || "Sahil Bhole";
  const userEmail = user?.email || "sahilbhole232@gcoe.com";
  const targetRole = outcomeState.jobRole || analysisResult?.targetRole || "Data Analyst";

  // Deterministic Roadmap Phases based on outcome profile
  const recommendedPhases = [
    {
      id: "phase-1",
      step: "01",
      title: "SQL Fundamentals & Relational Databases",
      duration: "Week 1 - 2",
      status: "Completed",
      userLevel: 4,
      targetLevel: 5,
      desc: "Master SELECT queries, WHERE filters, GROUP BY aggregations, and inner/left JOINs on PostgreSQL.",
      topics: ["Database Fundamentals", "SQL SELECT & Aggregations", "Multi-table Joins & Indexing"]
    },
    {
      id: "phase-2",
      step: "02",
      title: "Advanced SQL & Query Optimization",
      duration: "Week 3 - 4",
      status: "Current Focus",
      userLevel: 2,
      targetLevel: 5,
      desc: "Master Window functions (ROW_NUMBER, OVER), Subqueries, CTEs, and Query Execution Plans.",
      topics: ["Window Functions & Partitions", "Common Table Expressions (CTEs)", "Query Tuning & Index Optimization"]
    },
    {
      id: "phase-3",
      step: "03",
      title: "Power BI & DAX Business Analytics",
      duration: "Week 5 - 6",
      status: "Current Focus",
      userLevel: 2,
      targetLevel: 4,
      desc: "Build interactive dashboards, Power Query M-transformations, and complex DAX measures.",
      topics: ["Power Query Data Prep", "Star Schema Data Modeling", "DAX Calculated Measures & Time Intelligence"]
    },
    {
      id: "phase-4",
      step: "04",
      title: "Industry Capstone & Portfolio Project",
      duration: "Week 7 - 8",
      status: "Not Started",
      userLevel: 1,
      targetLevel: 4,
      desc: "Build end-to-end Maharashtra Skill & Outcome Dashboard showing real-world KPI metrics.",
      topics: ["Data Pipeline Automation", "Dashboard Storytelling", "Executive Summary Presentation"]
    },
    {
      id: "phase-5",
      step: "05",
      title: "Job Readiness & Wage Tier Acceleration",
      duration: "Week 9 - 10",
      status: "Not Started",
      userLevel: 1,
      targetLevel: 5,
      desc: "Conduct mock technical interviews, polish ATS resume, and verify outcome placement signals.",
      topics: ["SQL Live Coding Warmups", "Business Analytics Interview Prep", "Placement & Wage Mentorship"]
    }
  ];

  const [selectedNode, setSelectedNode] = useState(null);
  const [checkedTopics, setCheckedTopics] = useState({});

  const toggleTopicCheck = (topicName) => {
    setCheckedTopics(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      
      {/* HEADER WITH DEMO CANDIDATE INFO */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#062B52] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#0B3B70]" />
              <span>{t("Intervention & Learning Pathway")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B52]">
              {t("Recommended Upskilling Roadmap")}
            </h1>
            <p className="text-xs text-[#52657A]">
              Your roadmap from current skill level to job readiness for <span className="font-bold text-[#062B52]">{userName}</span> (Target Role: <span className="font-bold text-[#0B3B70]">{targetRole}</span>).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/skill-gap')}
              className="bg-[#F5F7FA] hover:bg-slate-200 border border-slate-300 text-[#062B52] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t("Skill Gaps")}</span>
            </button>
          </div>
        </div>

        {/* METRICS & STATUS LEGEND */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 font-semibold text-slate-700">
            <span>Target Role: <span className="font-bold text-[#062B52]">{targetRole}</span></span>
            <span className="text-slate-300">|</span>
            <span>Target Wage Growth: <span className="font-bold text-emerald-700">+35%</span></span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>✓ Completed</span>
            </span>
            <span className="flex items-center gap-1 text-amber-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2A900]"></span>
              <span>→ Current Focus</span>
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span>○ Not Started</span>
            </span>
          </div>
        </div>

      </div>

      {/* ROADMAP FLOWCHART CONTAINER */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-6">
        
        <div className="text-center max-w-lg mx-auto space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-[#0B3B70] tracking-wider">Outcome Acceleration Path</span>
          <h2 className="text-xl font-extrabold text-[#062B52]">SEQUENTIAL UPSKILLING FLOWCHART</h2>
          <p className="text-xs text-[#52657A]">Click any learning phase below to inspect modules and checklist.</p>
        </div>

        {/* FLOWCHART NODES WITH CONNECTING ARROWS */}
        <div className="max-w-xl mx-auto flex flex-col items-center space-y-4 relative py-4">
          
          {recommendedPhases.map((node, index) => {
            const isCompleted = node.status === "Completed";
            const isFocus = node.status === "Current Focus";

            return (
              <React.Fragment key={node.id}>
                
                {/* NODE CARD */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`
                    w-full p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 shadow-2xs group relative
                    ${isCompleted 
                      ? 'bg-emerald-50/60 border-emerald-500 hover:border-emerald-600' 
                      : isFocus 
                      ? 'bg-amber-50/70 border-[#F2A900] shadow-md ring-2 ring-amber-200' 
                      : 'bg-[#F5F7FA] border-slate-300 hover:border-[#062B52]'
                    }
                  `}
                >
                  
                  {/* Status Badge Tag */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        isCompleted ? 'bg-emerald-200 text-emerald-900' :
                        isFocus ? 'bg-[#F2A900] text-[#032447]' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {isCompleted && "✓ Completed"}
                        {isFocus && "→ Current Focus"}
                        {!isCompleted && !isFocus && "○ Not Started"}
                      </span>

                      <span className="text-[10px] font-mono text-slate-500 font-bold">{node.duration}</span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#062B52] group-hover:translate-x-1 transition" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-base text-[#062B52] group-hover:text-[#0B3B70] transition">
                    Phase {node.step}: {node.title}
                  </h3>
                  <p className="text-xs text-[#52657A] mt-1 leading-relaxed">{node.desc}</p>

                  {/* Rating comparison indicator */}
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono font-semibold text-slate-600">
                    <span>Current Level: <span className="font-bold text-[#062B52]">{node.userLevel}/5</span></span>
                    <span>Target Level: <span className="font-bold text-[#0B3B70]">{node.targetLevel}/5</span></span>
                  </div>

                </div>

                {/* CONNECTING ARROW BETWEEN NODES */}
                {index < recommendedPhases.length - 1 && (
                  <div className="flex flex-col items-center my-1 text-slate-400">
                    <div className="w-0.5 h-6 bg-slate-300"></div>
                    <ArrowDown className="w-5 h-5 -mt-1.5 text-slate-400" />
                  </div>
                )}

              </React.Fragment>
            );
          })}

        </div>

      </div>

      {/* NODE DETAIL MODAL */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#D9E1EA] w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="bg-[#062B52] text-white p-5 border-b border-[#0B3B70] flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-[#F2A900] uppercase tracking-wider block">Module Checklist</span>
                <h3 className="text-lg font-extrabold text-white">{selectedNode.title}</h3>
              </div>

              <button 
                onClick={() => setSelectedNode(null)} 
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs text-[#172B4D]">
              
              {/* Level Badges */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Current Level</span>
                  <span className="text-base font-extrabold font-mono text-[#062B52]">{selectedNode.userLevel}/5</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Target Level</span>
                  <span className="text-base font-extrabold font-mono text-[#0B3B70]">{selectedNode.targetLevel}/5</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Duration</span>
                  <span className="text-base font-extrabold font-mono text-emerald-700">{selectedNode.duration}</span>
                </div>
              </div>

              {/* Recommended Topics */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-xs text-[#062B52] block">Module Checklist Topics:</span>
                <div className="space-y-2">
                  {selectedNode.topics.map((topic, i) => {
                    const isDone = checkedTopics[topic];
                    return (
                      <div 
                        key={i}
                        onClick={() => toggleTopicCheck(topic)}
                        className={`
                          p-2.5 rounded-xl border cursor-pointer font-semibold flex items-center justify-between transition text-xs
                          ${isDone ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'}
                        `}
                      >
                        <span className={isDone ? 'line-through opacity-80' : ''}>{topic}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                          {isDone && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0B3B70] pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Time: {selectedNode.duration}</span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-[#F5F7FA] p-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  alert(`Started learning module: ${selectedNode.title}`);
                  setSelectedNode(null);
                }}
                className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5"
              >
                <span>Start Learning Module</span>
                <ChevronRight className="w-4 h-4 text-[#F2A900]" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
