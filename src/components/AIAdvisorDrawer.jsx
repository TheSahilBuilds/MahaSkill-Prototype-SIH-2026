import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Lightbulb, 
  BrainCircuit, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export default function AIAdvisorDrawer() {
  const { 
    isAIAdvisorOpen, 
    setIsAIAdvisorOpen, 
    profile, 
    userSkills, 
    metrics, 
    overallReadiness 
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: `Namaste ${profile.name}! I am your MahaSkill AI Career Advisor. Based on your profile for ${profile.targetRole} in ${profile.district}, your current Industry Alignment is ${metrics.industryAlignment}%. How can I assist your skill development today?`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    "Which skills should I learn next?",
    "Why is my skill gap high?",
    "Which jobs match my profile?",
    "Create my learning roadmap",
    "How can I improve my placement readiness?"
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInputMsg('');
    setIsTyping(true);

    // Dynamic mock response generator based on query
    setTimeout(() => {
      let aiReply = "";

      const lower = query.toLowerCase();
      if (lower.includes("learn next") || lower.includes("skills should i learn")) {
        const topGaps = metrics.priorityGaps.slice(0, 3).map(g => g.skill).join(", ");
        aiReply = `Based on your target role of **${profile.targetRole}**, your highest priority skill gaps in Maharashtra's industry dataset are: **${topGaps || 'Data Structures & Cloud'}**.\n\nI recommend:\n1. **Data Structures & Algorithms** (3 Weeks)\n2. **Cloud Computing (AWS)** (2 Weeks)\n3. **System Design Basics** (2 Weeks)\n\nCompleting these will boost your alignment from ${metrics.industryAlignment}% to approximately 86%.`;
      } 
      else if (lower.includes("gap high") || lower.includes("skill gap")) {
        aiReply = `Your skill gap count stands at **${metrics.skillGapCount} skills**. This is primarily because roles like ${profile.targetRole} in ${profile.district} require deeper proficiency in System Design and Cloud Architecture than your current baseline rating.`;
      }
      else if (lower.includes("jobs match") || lower.includes("job")) {
        aiReply = `Currently, **Persistent Systems** (Pune) and **TCS** have Junior Software Engineer openings matching **84%** of your skill profile. Check the 'Career Opportunities' tab to apply directly!`;
      }
      else if (lower.includes("roadmap")) {
        aiReply = `I have updated your personalized 12-week roadmap! It prioritizes Foundation in Weeks 1-2, Core DSA in Weeks 3-5, Web & Cloud in Weeks 6-8, Capstone Project in Weeks 9-10, and Mock Placement in Weeks 11-12.`;
      }
      else if (lower.includes("readiness") || lower.includes("placement")) {
        aiReply = `Your overall Placement Readiness is **${overallReadiness}%**. To hit the 85%+ high-readiness tier for campus placements, focus on raising your Mock Interview score (currently ${profile.interviewScore}/100) and solving 20 more DSA practice problems.`;
      }
      else {
        aiReply = `That's a great career question! For ${profile.targetRole} roles in ${profile.district}, companies prioritize candidates with strong problem solving and practical project exposure. I advise checking your Skill Gap tab to view itemized target benchmarks.`;
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isAIAdvisorOpen && (
        <button
          onClick={() => setIsAIAdvisorOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#1456A0] hover:bg-[#062B55] text-white p-3.5 rounded-full shadow-2xl border-2 border-[#E8A317] flex items-center gap-2.5 transition-all hover:scale-105 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-[#E8A317]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="font-bold text-xs pr-1 tracking-wide hidden sm:inline">AI Advisor</span>
        </button>
      )}

      {/* Side Chat Drawer */}
      {isAIAdvisorOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="bg-[#062B55] text-white p-4 flex items-center justify-between border-b border-[#1456A0]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#031B38] border border-[#E8A317] flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#E8A317]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>MahaSkill AI Advisor</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[11px] text-slate-300">Career Guidance Engine for Maharashtra</p>
              </div>
            </div>
            <button 
              onClick={() => setIsAIAdvisorOpen(false)}
              className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Status Summary Banner */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#1456A0]" />
              <span className="font-semibold text-slate-800">{profile.targetRole}</span>
            </div>
            <div className="text-[11px] font-bold text-[#1B8A5A] bg-emerald-100 px-2 py-0.5 rounded">
              Alignment: {metrics.industryAlignment}%
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-[#062B55] text-[#E8A317] flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`
                  max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs
                  ${msg.sender === 'user' 
                    ? 'bg-[#1456A0] text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none whitespace-pre-line'
                  }
                `}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <Bot className="w-4 h-4 text-[#1456A0] animate-bounce" />
                <span>AI Advisor is analyzing profile data...</span>
              </div>
            )}
          </div>

          {/* Suggested Prompts */}
          <div className="p-3 bg-slate-100 border-t border-slate-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-[#E8A317]" />
              <span>Suggested Prompts</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] bg-white hover:bg-[#1456A0] hover:text-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-left transition truncate max-w-full"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI Career Advisor anything..."
              className="flex-1 bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1456A0]"
            />
            <button
              onClick={() => handleSend()}
              className="bg-[#1456A0] hover:bg-[#062B55] text-white p-2 rounded-lg transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
