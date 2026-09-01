import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award
} from 'lucide-react';

export default function ResumeAnalyzer() {
  const { profile, t } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleUpload = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowAnalysis(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
          <FileText className="w-3.5 h-3.5" />
          <span>ATS Parser & Keyword Optimizer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">AI Resume Analyzer</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Upload your resume PDF to scan for ATS compatibility, keyword gaps, and industry formatting.
        </p>
      </div>

      {/* UPLOAD BOX */}
      <div className="bg-[#031B38] text-white p-8 rounded-3xl border border-slate-700 shadow-lg text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-dashed border-[#E8A317] flex items-center justify-center mx-auto text-[#E8A317]">
          {isScanning ? (
            <RefreshCw className="w-8 h-8 animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">
            {isScanning ? "Scanning Resume with AI..." : "Upload Your Resume for AI Scan"}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Supports PDF, DOCX formats. Scans against Maharashtra IT baseline keyword benchmarks.
          </p>
        </div>

        <button
          onClick={handleUpload}
          disabled={isScanning}
          className="bg-[#E8A317] hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg inline-flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{isScanning ? 'Processing...' : 'Upload & Analyze Resume'}</span>
        </button>
      </div>

      {/* ANALYSIS RESULTS */}
      {showAnalysis && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Top Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Resume Score</div>
              <div className="text-3xl font-extrabold text-[#062B55]">78 <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
              <div className="text-[10px] text-emerald-700 font-bold mt-1">Strong Profile</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">ATS Compatibility</div>
              <div className="text-3xl font-extrabold text-emerald-700">82%</div>
              <div className="text-[10px] text-slate-500 mt-1">Passes major scanners</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Skills Detected</div>
              <div className="text-3xl font-extrabold text-purple-700">14</div>
              <div className="text-[10px] text-slate-500 mt-1">Key technical tags</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Projects Found</div>
              <div className="text-3xl font-extrabold text-amber-700">3</div>
              <div className="text-[10px] text-slate-500 mt-1">GitHub repository links</div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#062B55] flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Resume Strengths</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span><strong>Strong technical skills section:</strong> Python, SQL, JavaScript, React.js clearly indexed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span><strong>Good project exposure:</strong> 3 practical capstone projects with technology stack tags.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span><strong>Professional layout:</strong> GitHub portfolio link and SPPU University details included.</span>
                </li>
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#062B55] flex items-center gap-2 border-b border-slate-100 pb-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>Areas to Improve</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span><strong>Missing Industry Keywords:</strong> Include "Cloud Computing (AWS)" and "System Design" to match high-demand software developer ATS filters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span><strong>Add Measurable Impact:</strong> Quantify project outcomes (e.g. "Reduced query response time by 35%").</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span><strong>Professional Summary:</strong> Needs sharper focus on Software Engineering target roles.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* AI Action CTA */}
          <div className="bg-gradient-to-r from-[#062B55] to-[#1456A0] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-extrabold">Improve Your Resume with AI</h3>
              <p className="text-xs text-slate-300">Generate optimized professional bullet points and keyword additions automatically.</p>
            </div>

            <button
              onClick={() => setAiModalOpen(true)}
              className="bg-[#E8A317] hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Improve Resume with AI</span>
            </button>
          </div>

        </div>
      )}

      {/* MOCK AI MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-extrabold text-base text-[#062B55] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8A317]" />
                <span>AI Rewritten Resume Summary</span>
              </h3>
              <button onClick={() => setAiModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono">
              "Results-driven B.Tech Computer Science candidate with strong proficiency in Python, SQL, Data Structures, and React.js. Experienced in developing full-stack web applications and optimizing relational database schemas. Currently expanding expertise in AWS Cloud Architecture and System Design to drive scalable enterprise software solutions."
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setAiModalOpen(false)} className="px-4 py-2 rounded-xl bg-[#1456A0] text-white text-xs font-bold">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
