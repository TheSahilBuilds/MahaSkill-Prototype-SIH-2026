import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { AI_OUTCOME_KNOWLEDGE_BASE } from '../data/outcomeData';

export default function AIAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, userRole } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: `Hello ${profile.name || "Sahil"}! I am your MahaSkill AI Outcome Advisor. Ask me anything about trainee outcomes, skill gap diagnostics, district placement rates, or job attrition reasons.` 
    }
  ]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let reply = `Based on Maharashtra skill outcome records for ${profile.targetRole || "Data Analyst"}, top skill gaps center on practical SQL querying and Power BI DAX calculations.`;
      const lower = query.toLowerCase();

      // Search in deterministic knowledge base
      const matchedItem = AI_OUTCOME_KNOWLEDGE_BASE.find(item => 
        item.keywords.some(kw => lower.includes(kw))
      );

      if (matchedItem) {
        reply = userRole === 'admin' ? matchedItem.adminAnswer : matchedItem.traineeAnswer;
      } else if (lower.includes("remedial") || lower.includes("intervention")) {
        reply = "Recommended Intervention: Introduce a mandatory 30-hour practical project capstone in partnership with Pune & Nashik MIDC industrial clusters.";
      } else if (lower.includes("placement") || lower.includes("low")) {
        reply = "Data Analytics placement rate stands at 70.4%, but has a 35% non-placement bottleneck due to insufficient practical SQL project experience.";
      } else if (lower.includes("district") || lower.includes("pune") || lower.includes("nagpur")) {
        reply = "Pune leads district placement at 78% (71.5% retention), while Nagpur (61%) and Chhatrapati Sambhajinagar (57%) require intervention in industrial automation training.";
      } else if (lower.includes("roadmap") || lower.includes("skill")) {
        reply = "Your recommended upskilling roadmap focuses on: Phase 1 (SQL Fundamentals) -> Phase 2 (Advanced SQL & Power BI) -> Phase 3 (Industry Capstone).";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  const quickPrompts = userRole === 'admin' ? [
    "Why is placement low for this course?",
    "Which district needs intervention?",
    "Why are trainees leaving jobs?",
    "What remedial training to introduce?"
  ] : [
    "What skills should I improve?",
    "Why is my role not matching training?",
    "Show my recommended roadmap."
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#062B52] hover:bg-[#0B3B70] text-white px-4 py-3 rounded-full shadow-xl border-2 border-[#F2A900] flex items-center gap-2 transition hover:scale-105"
        >
          <Bot className="w-5 h-5 text-[#F2A900]" />
          <span className="font-bold text-xs tracking-wide pr-1">AI Outcome Advisor</span>
        </button>
      )}

      {/* Chat Drawer Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#D9E1EA] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Panel Header */}
          <div className="bg-[#062B52] text-white p-3.5 flex justify-between items-center border-b border-[#0B3B70]">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-[#F2A900]" />
              <div>
                <span className="font-bold text-xs text-white block">AI Outcome Advisor</span>
                <span className="text-[9px] text-[#F2A900] font-semibold uppercase">
                  {userRole === 'admin' ? 'Government Analytics Mode' : 'Trainee Guidance Mode'}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-3.5 space-y-2.5 h-64 overflow-y-auto bg-[#F5F7FA] text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user' ? 'bg-[#062B52] text-white rounded-br-none' : 'bg-white text-[#172B4D] border border-slate-200 rounded-bl-none shadow-2xs'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex flex-wrap gap-1 text-[10px]">
            {quickPrompts.map(p => (
              <button 
                key={p} 
                onClick={() => handleSend(p)}
                className="bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 px-2 py-1 rounded text-left truncate font-semibold"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2 bg-white border-t border-slate-200 flex items-center gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI Outcome Advisor..."
              className="flex-1 bg-[#F5F7FA] border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            />
            <button onClick={() => handleSend()} className="bg-[#062B52] text-white p-1.5 rounded-lg hover:bg-[#0B3B70]">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
