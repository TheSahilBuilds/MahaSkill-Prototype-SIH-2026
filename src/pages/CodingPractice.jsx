import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Terminal, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CODING_PROBLEMS } from '../data/mockData';

export default function CodingPractice() {
  const { addHistoryEntry, t } = useApp();

  const [selectedProblem, setSelectedProblem] = useState(CODING_PROBLEMS[0]);
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(CODING_PROBLEMS[0].starterCode.python);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  const handleSelectProblem = (prob) => {
    setSelectedProblem(prob);
    const langKey = selectedLang in prob.starterCode ? selectedLang : Object.keys(prob.starterCode)[0];
    setCode(prob.starterCode[langKey] || '');
    setExecutionResult(null);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionResult({
        status: "Passed",
        passedCases: "3 / 3",
        time: selectedProblem.executionTime,
        memory: "14.2 MB",
        stdout: "Output: [0, 1]\nTest cases passed successfully."
      });

      addHistoryEntry({
        type: "Coding Test",
        targetRole: `${selectedProblem.title} (${selectedProblem.difficulty})`,
        score: "Passed",
        status: "Passed"
      });
    }, 900);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full mb-1">
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Algorithmic Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">Coding Practice</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Solve DSA and SQL coding challenges required by top product and IT hiring teams in Maharashtra.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs shrink-0 font-semibold">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Problems Solved: <strong>18</strong></span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Streak: <strong className="text-orange-600">12 Days</strong></span>
          </div>
        </div>
      </div>

      {/* MAIN CODING LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Problem Selector & Description */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Problem Selector Tabs */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase">Select Problem</div>
            <div className="space-y-1.5">
              {CODING_PROBLEMS.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`
                    p-3 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center justify-between
                    ${selectedProblem.id === prob.id 
                      ? 'bg-blue-50 border-[#1456A0] text-[#1456A0] shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <div>
                    <div className="font-bold text-slate-900">{prob.title}</div>
                    <div className="text-[10px] text-slate-500">{prob.category}</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    prob.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {prob.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Description Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-base text-[#062B55]">{selectedProblem.title}</h3>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {selectedProblem.category}
              </span>
            </div>

            <p className="text-slate-700 leading-relaxed">{selectedProblem.description}</p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 font-mono text-[11px]">
              <div><strong>Sample Input:</strong> {selectedProblem.sampleInput}</div>
              <div><strong>Expected Output:</strong> {selectedProblem.expectedOutput}</div>
            </div>
          </div>

        </div>

        {/* Right 7 Cols: Mock Code Editor & Test Execution Runner */}
        <div className="lg:col-span-7 bg-[#031B38] text-white p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col justify-between space-y-4">
          
          {/* Editor Header */}
          <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <Terminal className="w-4 h-4" />
              <span>IDE Code Editor</span>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedLang}
                onChange={(e) => {
                  setSelectedLang(e.target.value);
                  setCode(selectedProblem.starterCode[e.target.value] || '');
                }}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                {Object.keys(selectedProblem.starterCode).map(lang => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>

              <button
                onClick={handleRunCode}
                disabled={isExecuting}
                className="bg-[#E8A317] hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-lg transition flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="flex-1">
            <textarea
              rows={12}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-900 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed"
            />
          </div>

          {/* Execution Result Box */}
          {executionResult && (
            <div className="bg-slate-900/90 border border-emerald-500/40 p-4 rounded-xl text-xs font-mono space-y-2 animate-in fade-in">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Test Execution Passed ({executionResult.passedCases})</span>
                </span>
                <span className="text-[10px] text-slate-400">Time: {executionResult.time}</span>
              </div>
              <pre className="text-slate-300 text-[11px] whitespace-pre-wrap">{executionResult.stdout}</pre>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
