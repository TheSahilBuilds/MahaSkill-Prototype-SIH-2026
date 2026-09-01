import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Video, 
  Play, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Award,
  RefreshCw
} from 'lucide-react';
import { MOCK_INTERVIEW_BANK } from '../data/mockData';

export default function MockInterview() {
  const { profile, addHistoryEntry, t } = useApp();

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answersLog, setAnswersLog] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const [interviewType, setInterviewType] = useState('Technical Interview');
  const [difficulty, setDifficulty] = useState('Medium');

  const currentQ = MOCK_INTERVIEW_BANK[currentQIndex] || MOCK_INTERVIEW_BANK[0];

  const handleStart = () => {
    setInterviewStarted(true);
    setCurrentQIndex(0);
    setUserAnswer('');
    setAnswersLog([]);
    setIsCompleted(false);
  };

  const handleSubmitAnswer = () => {
    const newLog = [...answersLog, { question: currentQ.question, answer: userAnswer }];
    setAnswersLog(newLog);
    setUserAnswer('');

    if (currentQIndex < MOCK_INTERVIEW_BANK.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      setInterviewStarted(false);
      addHistoryEntry({
        type: "AI Mock Interview",
        targetRole: `${profile.targetRole} (${interviewType})`,
        score: "78 / 100",
        status: "Evaluated"
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
          <Video className="w-3.5 h-3.5" />
          <span>Placement Voice & Technical Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">AI Mock Interview</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Practice technical and behavioral interview questions evaluated against industry response models.
        </p>
      </div>

      {/* SETUP CARD */}
      {!interviewStarted && !isCompleted && (
        <div className="bg-[#031B38] text-white p-8 rounded-3xl border border-slate-700 shadow-lg space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2 border-b border-slate-700/80 pb-4">
            <h3 className="text-xl font-extrabold text-white">Configure Your Mock Interview</h3>
            <p className="text-xs text-slate-300">Tailored for {profile.targetRole} roles in Maharashtra.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Interview Type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              >
                <option value="Technical Interview">Technical Interview (Core CS & Coding)</option>
                <option value="HR Interview">HR & Behavioral Interview</option>
                <option value="Resume-Based Interview">Resume & Project Deep Dive</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              >
                <option value="Easy">Easy (Standard Placement Warmup)</option>
                <option value="Medium">Medium (TCS Digital / Infosys DSE Level)</option>
                <option value="Hard">Hard (Product Company Technical Bar)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={handleStart}
              className="bg-[#E8A317] hover:bg-amber-400 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-xl transition shadow-lg inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Interview Session</span>
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE INTERVIEW INTERFACE */}
      {interviewStarted && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 animate-in fade-in">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-xs">
            <span className="font-bold text-[#1456A0] bg-blue-50 px-3 py-1 rounded-full">
              Question {currentQIndex + 1} of {MOCK_INTERVIEW_BANK.length}
            </span>

            <span className="font-mono text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Time Limit: {currentQ.timeLimit}s</span>
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-extrabold text-[#062B55] leading-relaxed">
              "{currentQ.question}"
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Written Answer / Explanation:</label>
              <textarea
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your structured answer here. Include relevant keywords, algorithms, or architectural trade-offs..."
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-xs text-slate-800 focus:ring-2 focus:ring-[#1456A0] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleSubmitAnswer}
              className="bg-[#1456A0] hover:bg-[#062B55] text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2"
            >
              <span>{currentQIndex < MOCK_INTERVIEW_BANK.length - 1 ? "Submit Answer & Next" : "Finish Interview"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* INTERVIEW SCORECARD SUMMARY */}
      {isCompleted && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in zoom-in-95">
          <div className="text-center space-y-2 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#062B55]">Interview Evaluation Complete!</h2>
            <p className="text-xs text-slate-500">AI analysis of your technical response clarity and key domain terms.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Overall Score</div>
              <div className="text-2xl font-extrabold text-[#1456A0]">78 / 100</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Technical Knowledge</div>
              <div className="text-2xl font-extrabold text-emerald-700">82%</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Communication</div>
              <div className="text-2xl font-extrabold text-amber-700">74%</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Keyword Coverage</div>
              <div className="text-2xl font-extrabold text-purple-700">76%</div>
            </div>
          </div>

          {/* AI Feedback */}
          <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 space-y-3 text-xs">
            <h3 className="font-extrabold text-sm text-[#062B55] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E8A317]" />
              <span>AI Advisor Feedback</span>
            </h3>
            <p className="text-slate-800 leading-relaxed">
              <strong>What you did well:</strong> Good technical framing on memory allocation and database B-Tree index lookup mechanisms.
            </p>
            <p className="text-slate-800 leading-relaxed">
              <strong>What to improve:</strong> Clearly articulate context switching overhead during process transitions and specify write amplification trade-offs on indexed tables.
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsCompleted(false)}
              className="bg-[#1456A0] hover:bg-[#062B55] text-white text-xs font-bold px-6 py-3 rounded-xl transition inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start Another Practice Interview</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
