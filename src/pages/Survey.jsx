import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Loader2, 
  GraduationCap, 
  BookOpen, 
  Briefcase, 
  Code2, 
  Sliders, 
  Database, 
  GitBranch, 
  Cloud, 
  Cpu, 
  MessageSquare, 
  Clock, 
  Building2,
  CheckCircle2
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    title: "Q1. Education",
    question: "What is your current education level?",
    icon: GraduationCap,
    type: "single",
    options: ["Diploma", "Undergraduate", "Postgraduate", "Other"]
  },
  {
    id: 2,
    title: "Q2. Course / Branch",
    question: "What are you currently studying?",
    icon: BookOpen,
    type: "single",
    options: [
      "Artificial Intelligence & Data Science",
      "Computer Science",
      "Information Technology",
      "Electronics & Telecommunication",
      "Mechanical Engineering",
      "Civil Engineering",
      "Other"
    ]
  },
  {
    id: 3,
    title: "Q3. Career Goal",
    question: "What career role are you targeting?",
    icon: Briefcase,
    type: "single",
    options: [
      "AI / ML Engineer",
      "Data Scientist",
      "Data Analyst",
      "Software Developer",
      "Full Stack Developer",
      "Data Engineer",
      "Cybersecurity Engineer",
      "Cloud Engineer"
    ]
  },
  {
    id: 4,
    title: "Q4. Programming Languages",
    question: "Which programming languages do you know?",
    icon: Code2,
    type: "multi",
    options: ["Python", "Java", "JavaScript", "C", "C++", "SQL", "HTML/CSS", "None"]
  },
  {
    id: 5,
    title: "Q5. Skill Level",
    question: "What is your current level in your strongest programming language?",
    icon: Sliders,
    type: "single",
    options: ["Beginner", "Basic", "Intermediate", "Advanced"]
  },
  {
    id: 6,
    title: "Q6. Data Structures & Algorithms",
    question: "How comfortable are you with Data Structures & Algorithms?",
    icon: Code2,
    type: "single",
    options: ["Beginner", "Basic", "Intermediate", "Advanced"]
  },
  {
    id: 7,
    title: "Q7. Database Skills",
    question: "How comfortable are you with databases and SQL?",
    icon: Database,
    type: "single",
    options: ["Beginner", "Basic", "Intermediate", "Advanced"]
  },
  {
    id: 8,
    title: "Q8. Development / Projects",
    question: "How many technical projects have you completed?",
    icon: Code2,
    type: "single",
    options: ["None", "1–2", "3–5", "5+"]
  },
  {
    id: 9,
    title: "Q9. Git & GitHub",
    question: "How comfortable are you with Git & GitHub?",
    icon: GitBranch,
    type: "single",
    options: ["Beginner", "Basic", "Intermediate", "Advanced"]
  },
  {
    id: 10,
    title: "Q10. Cloud / Deployment",
    question: "How familiar are you with cloud platforms and deployment?",
    icon: Cloud,
    type: "single",
    options: ["No experience", "Beginner", "Intermediate", "Advanced"]
  },
  {
    id: 11,
    title: "Q11. AI / Emerging Technology",
    question: "How familiar are you with AI / Machine Learning?",
    icon: Cpu,
    type: "single",
    options: ["No experience", "Beginner", "Intermediate", "Advanced"]
  },
  {
    id: 12,
    title: "Q12. Communication",
    question: "How would you rate your communication and interview skills?",
    icon: MessageSquare,
    type: "single",
    options: ["Needs Improvement", "Basic", "Good", "Strong"]
  },
  {
    id: 13,
    title: "Q13. Weekly Learning Time",
    question: "How much time can you dedicate to improving your skills each week?",
    icon: Clock,
    type: "single",
    options: ["Less than 3 hours", "3–5 hours", "5–10 hours", "10+ hours"]
  },
  {
    id: 14,
    title: "Q14. Preferred Industry",
    question: "Which industry interests you the most?",
    icon: Building2,
    type: "single",
    options: [
      "IT & Software",
      "AI & Data",
      "FinTech",
      "Manufacturing",
      "Automotive",
      "Healthcare Technology",
      "Cybersecurity",
      "Cloud & Infrastructure"
    ]
  }
];

export default function Survey() {
  const { user, submitSurveyData } = useApp();
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Survey Form Answers State
  const [answers, setAnswers] = useState({
    education: "Undergraduate",
    course: "Computer Science",
    targetRole: "Software Developer",
    progLanguages: ["Python", "JavaScript", "SQL"],
    skillLevel: "Intermediate",
    dsaLevel: "Basic",
    dbLevel: "Basic",
    projectsCount: "1–2",
    gitLevel: "Basic",
    cloudLevel: "Beginner",
    aiLevel: "Beginner",
    commLevel: "Good",
    learningTime: "5–10 hours",
    preferredIndustry: "IT & Software"
  });

  const currentQ = QUESTIONS[currentStepIndex];

  const handleSingleSelect = (val) => {
    const keyMap = {
      1: "education",
      2: "course",
      3: "targetRole",
      5: "skillLevel",
      6: "dsaLevel",
      7: "dbLevel",
      8: "projectsCount",
      9: "gitLevel",
      10: "cloudLevel",
      11: "aiLevel",
      12: "commLevel",
      13: "learningTime",
      14: "preferredIndustry"
    };

    const fieldKey = keyMap[currentQ.id];
    if (fieldKey) {
      setAnswers(prev => ({ ...prev, [fieldKey]: val }));
    }
  };

  const handleMultiToggle = (val) => {
    if (val === "None") {
      setAnswers(prev => ({ ...prev, progLanguages: ["None"] }));
      return;
    }

    setAnswers(prev => {
      const currentList = prev.progLanguages.filter(l => l !== "None");
      if (currentList.includes(val)) {
        const nextList = currentList.filter(l => l !== val);
        return { ...prev, progLanguages: nextList.length > 0 ? nextList : ["None"] };
      } else {
        return { ...prev, progLanguages: [...currentList, val] };
      }
    });
  };

  const handleNext = () => {
    if (currentStepIndex < QUESTIONS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Trigger Animated Analysis State
      setIsAnalyzing(true);
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setAnalysisProgress(step);
        if (step >= 4) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            submitSurveyData(answers);
            navigate('/skill-gap');
          }, 300);
        }
      }, 350);
    }
  };

  const CurrentIcon = currentQ.icon;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      
      {/* CARD WIZARD CONTAINER */}
      <div className="bg-white rounded-3xl border border-[#D9E1EA] shadow-xl overflow-hidden">
        
        {/* HEADER & PROGRESS BAR */}
        <div className="bg-[#062B52] text-white p-6 border-b border-[#0B3B70] space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div className="inline-flex items-center gap-1.5 font-bold text-[#F2A900] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Skill Intelligence Survey</span>
            </div>
            <span className="font-extrabold text-[#F2A900] bg-[#032447] px-3 py-1 rounded-full border border-amber-400/30">
              Step {currentStepIndex + 1} of {QUESTIONS.length}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">CHECK YOUR SKILL GAP</h2>
          <p className="text-xs text-slate-300">Answer 14 simple questions to evaluate your readiness for {answers.targetRole}</p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div 
              className="bg-[#F2A900] h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* QUESTION CONTENT OR ANIMATED ANALYSIS */}
        <div className="p-6 sm:p-8 space-y-6 text-[#172B4D]">
          
          {isAnalyzing ? (
            <div className="py-12 text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#062B52] flex items-center justify-center mx-auto shadow-md">
                <Loader2 className="w-8 h-8 animate-spin text-[#0B3B70]" />
              </div>
              
              <div>
                <h3 className="text-xl font-extrabold text-[#062B52]">Analyzing Your Skill Profile...</h3>
                <p className="text-xs text-[#52657A] mt-1">Illustrative Industry Benchmark Evaluation</p>
              </div>

              <div className="max-w-sm mx-auto space-y-2.5 text-left text-xs bg-[#F5F7FA] p-5 rounded-2xl border border-slate-200 font-semibold">
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 1 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Analyzing your profile...</span>
                </div>
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 2 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Comparing your skills ({answers.progLanguages.join(", ")})...</span>
                </div>
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 3 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Checking industry requirements ({answers.targetRole})...</span>
                </div>
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 4 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Generating personalized recommendations...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Question Header */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B3B70] flex items-center justify-center font-bold">
                  <CurrentIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">{currentQ.title}</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#062B52]">{currentQ.question}</h3>
                </div>
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt) => {
                  let isSelected = false;
                  if (currentQ.type === "multi") {
                    isSelected = answers.progLanguages.includes(opt);
                  } else {
                    const keyMap = { 1: "education", 2: "course", 3: "targetRole", 5: "skillLevel", 6: "dsaLevel", 7: "dbLevel", 8: "projectsCount", 9: "gitLevel", 10: "cloudLevel", 11: "aiLevel", 12: "commLevel", 13: "learningTime", 14: "preferredIndustry" };
                    const fk = keyMap[currentQ.id];
                    isSelected = answers[fk] === opt;
                  }

                  return (
                    <div
                      key={opt}
                      onClick={() => currentQ.type === "multi" ? handleMultiToggle(opt) : handleSingleSelect(opt)}
                      className={`
                        p-4 rounded-xl border-2 cursor-pointer transition font-semibold text-xs flex items-center justify-between
                        ${isSelected 
                          ? 'bg-blue-50/70 border-[#062B52] text-[#062B52] font-bold shadow-2xs' 
                          : 'bg-[#F5F7FA] border-slate-200 text-slate-700 hover:bg-slate-100'
                        }
                      `}
                    >
                      <span>{opt}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#062B52] border-[#062B52] text-white' : 'border-slate-300 bg-white'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#F2A900]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* FOOTER CONTROLS */}
        {!isAnalyzing && (
          <div className="bg-[#F5F7FA] p-5 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${currentStepIndex === 0 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-2 transition hover:scale-105"
            >
              <span>{currentStepIndex === QUESTIONS.length - 1 ? "Analyze My Skill Gap →" : "Next"}</span>
              {currentStepIndex < QUESTIONS.length - 1 && <ArrowRight className="w-4 h-4 text-[#F2A900]" />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
