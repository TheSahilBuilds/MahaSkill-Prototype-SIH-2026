import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send } from 'lucide-react';

export default function AIAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: `Hello ${profile.name || "Sahil"}! I am your MahaSkill AI Advisor. How can I help with your ${profile.targetRole || "AI/ML Engineer"} career journey?` }
  ]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let reply = `For your target role of ${profile.targetRole || "AI/ML Engineer"}, focus on mastering Data Structures, PyTorch, and NumPy/Pandas data manipulation.`;
      const lower = query.toLowerCase();
      if (lower.includes("learn") || lower.includes("skills")) {
        reply = `Based on your survey for ${profile.targetRole || "AI/ML Engineer"}, your top priority skill gaps are Data Structures & Algorithms, Deep Learning / PyTorch, and System Design.`;
      } else if (lower.includes("roadmap")) {
        reply = `Check out your interactive flowchart roadmap! It starts with Python & Math -> NumPy/Pandas -> Machine Learning -> PyTorch & Deep Learning -> Capstone Projects.`;
      } else if (lower.includes("gap") || lower.includes("high")) {
        reply = `Your readiness score is 68/100. Increasing your DSA and PyTorch rating to 4/5 will reduce your overall gap significantly for ${profile.district || "Pune"} hiring drives.`;
      } else if (lower.includes("dsa") || lower.includes("important")) {
        reply = `DSA is essential for passing technical screening rounds at IT & AI hubs in ${profile.district || "Pune"} and Mumbai.`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 450);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#062B52] hover:bg-[#0B3B70] text-white px-4 py-3 rounded-full shadow-xl border-2 border-[#F2A900] flex items-center gap-2 transition hover:scale-105"
        >
          <Bot className="w-5 h-5 text-[#F2A900]" />
          <span className="font-bold text-xs tracking-wide pr-1">AI Advisor</span>
        </button>
      )}

      {/* Chat Drawer Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#D9E1EA] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Panel Header */}
          <div className="bg-[#062B52] text-white p-3.5 flex justify-between items-center border-b border-[#0B3B70]">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-[#F2A900]" />
              <span className="font-bold text-xs text-white">AI Advisor</span>
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
                  m.sender === 'user' ? 'bg-[#062B52] text-white rounded-br-none' : 'bg-white text-[#172B4D] border border-slate-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex flex-wrap gap-1 text-[10px]">
            {["What should I learn next?", "Why is DSA important?", "Show me my roadmap."].map(p => (
              <button 
                key={p} 
                onClick={() => handleSend(p)}
                className="bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 px-2 py-0.5 rounded text-left truncate"
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
              placeholder="Ask AI Advisor..."
              className="flex-1 bg-[#F5F7FA] border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            />
            <button onClick={() => handleSend()} className="bg-[#062B52] text-white p-1.5 rounded-lg">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
