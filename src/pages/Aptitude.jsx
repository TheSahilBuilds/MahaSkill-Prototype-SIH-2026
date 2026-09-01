import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { APTITUDE_QUESTIONS } from '../data/mockData';

export default function Aptitude() {
  const { addHistoryEntry, t } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const q = APTITUDE_QUESTIONS[currentIdx] || APTITUDE_QUESTIONS[0];

  const handleNext = () => {
    if (selectedOption === q.correctAnswer) {
      setUserScore(prev => prev + 1);
    }

    setUserAnswers(prev => ({ ...prev, [currentIdx]: selectedOption }));
    setSelectedOption(null);

    if (currentIdx < APTITUDE_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      const finalPct = Math.round(((userScore + (selectedOption === q.correctAnswer ? 1 : 0)) / APTITUDE_QUESTIONS.length) * 100);
      addHistoryEntry({
        type: "Placement Aptitude Test",
        targetRole: "TCS / Infosys Placement Test",
        score: `${finalPct}% Score`,
        status: "Completed"
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setUserScore(0);
    setIsFinished(false);
    setUserAnswers({});
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
          <BookOpen className="w-3.5 h-3.5 text-[#E8A317]" />
          <span>Placement Aptitude Module</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">AI Placement Aptitude Test</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Solve real company aptitude tests for TCS NQT, Infosys, and Accenture recruitment drives in Maharashtra.
        </p>
      </div>

      {/* QUIZ INTERFACE */}
      {!isFinished ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 max-w-3xl mx-auto">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded font-mono">
                {q.company}
              </span>
              <span className="text-slate-500">{q.category}</span>
            </div>

            <span className="font-bold text-[#1456A0] bg-blue-50 px-3 py-1 rounded-full">
              Question {currentIdx + 1} of {APTITUDE_QUESTIONS.length}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-extrabold text-[#062B55]">
              {q.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {q.options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`
                    p-3.5 rounded-xl border text-xs font-semibold cursor-pointer transition flex items-center justify-between
                    ${selectedOption === idx 
                      ? 'bg-blue-50 border-[#1456A0] text-[#1456A0] shadow-xs' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <span>{opt}</span>
                  {selectedOption === idx && <CheckCircle2 className="w-4 h-4 text-[#1456A0]" />}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`
                px-6 py-3 rounded-xl font-bold text-xs transition flex items-center gap-2
                ${selectedOption !== null 
                  ? 'bg-[#1456A0] hover:bg-[#062B55] text-white shadow-md' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <span>{currentIdx < APTITUDE_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Test'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* TEST RESULTS CARD */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 max-w-2xl mx-auto text-center animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-[#E8A317] flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-[#062B55]">Aptitude Test Completed!</h2>
            <p className="text-xs text-slate-500">Here is your performance breakdown across Quantitative & Logical modules.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Correct Answers</div>
              <div className="text-2xl font-extrabold text-emerald-700">{userScore} / {APTITUDE_QUESTIONS.length}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy Rate</div>
              <div className="text-2xl font-extrabold text-[#1456A0]">{Math.round((userScore / APTITUDE_QUESTIONS.length) * 100)}%</div>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left text-xs space-y-1">
            <strong className="text-amber-900">AI Weak Topic Recommendation:</strong>
            <p className="text-amber-950">
              Practice Speed-Time-Distance formulas and Geometric series to hit 90%+ placement benchmarks for TCS NQT.
            </p>
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="bg-[#1456A0] hover:bg-[#062B55] text-white text-xs font-bold px-6 py-3 rounded-xl transition inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Aptitude Test</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
