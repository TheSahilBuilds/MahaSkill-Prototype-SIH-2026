import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  Sparkles,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  Sliders,
  Code2,
  Briefcase,
  Clock,
  MapPin,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS } from '../data/mockData';

const PREDEFINED_SKILL_CATEGORIES = {
  Programming: ["Python", "Java", "JavaScript", "C", "C++", "C#", "Go", "PHP"],
  Web: ["HTML", "CSS", "React", "Angular", "Node.js", "REST APIs"],
  Data: ["SQL", "Excel", "Pandas", "NumPy", "Power BI", "Tableau"],
  "AI & ML": ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP", "Generative AI"],
  Cloud: ["AWS", "Azure", "Google Cloud"],
  Tools: ["Git", "GitHub", "Docker", "Linux"]
};

export default function SkillGapSurveyModal({ isOpen, onClose }) {
  const { profile, userSkills, submitSurvey } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Survey Form State initialized with Sahil Bhole's profile defaults
  const [educationLevel, setEducationLevel] = useState(profile.degree || "Undergraduate");
  const [studyYear, setStudyYear] = useState("Final Year");
  const [gradYear, setGradYear] = useState("2026");
  const [course, setCourse] = useState("B.Tech");
  const [specialization, setSpecialization] = useState(profile.specialization || "Artificial Intelligence & Data Science");

  // Selected Skills & Ratings
  const [selectedSkills, setSelectedSkills] = useState(userSkills.map(s => s.name));
  const [skillRatings, setSkillRatings] = useState(
    userSkills.reduce((acc, s) => ({ ...acc, [s.name]: s.userLevel5 || 3 }), {})
  );
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Project Experience
  const [projectsCount, setProjectsCount] = useState("2–3");
  const [projectTypes, setProjectTypes] = useState(["Academic Project", "Hackathon"]);
  const [hasDeployed, setHasDeployed] = useState("Yes");

  // Career Goal & Location
  const [targetRole, setTargetRole] = useState(profile.targetRole || "AI/ML Engineer");
  const [targetLocation, setTargetLocation] = useState(profile.district || "Pune");

  // Experience & Learning Time
  const [profExperience, setProfExperience] = useState("No professional experience");
  const [confidenceScore, setConfidenceScore] = useState(3);
  const [learningHours, setLearningHours] = useState("5–10 hours/week");
  const [certifications, setCertifications] = useState(["Python", "AI/ML"]);
  const [preferredDomain, setPreferredDomain] = useState("Artificial Intelligence");

  if (!isOpen) return null;

  const toggleSkillSelect = (skillName) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(prev => prev.filter(s => s !== skillName));
    } else {
      setSelectedSkills(prev => [...prev, skillName]);
      if (!skillRatings[skillName]) {
        setSkillRatings(prev => ({ ...prev, [skillName]: 3 }));
      }
    }
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkillInput.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills(prev => [...prev, trimmed]);
      setSkillRatings(prev => ({ ...prev, [trimmed]: 3 }));
      setCustomSkillInput('');
    }
  };

  const setRatingForSkill = (skillName, val) => {
    setSkillRatings(prev => ({ ...prev, [skillName]: val }));
  };

  const toggleProjectType = (type) => {
    setProjectTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleCertification = (cert) => {
    setCertifications(prev => 
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const handleFinalSubmit = () => {
    setIsAnalyzing(true);
    
    // Simulate 1.2s analysis checklist
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisProgress(step);
      if (step >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          onClose();

          // Package survey data into AppContext
          submitSurvey({
            education: { level: educationLevel, year: studyYear, gradYear, course, specialization },
            skills: selectedSkills.map(name => ({
              name,
              level5: skillRatings[name] || 3,
              rating: (skillRatings[name] || 3) * 2.0
            })),
            projects: { count: projectsCount, types: projectTypes, deployed: hasDeployed },
            career: { role: targetRole, location: targetLocation },
            readiness: { experience: profExperience, confidence: confidenceScore, hours: learningHours, certs: certifications, domain: preferredDomain }
          });

          navigate('/skill-gap');
        }, 400);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#D9E1EA] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95">
        
        {/* WIZARD HEADER */}
        <div className="bg-[#062B52] text-white p-5 border-b border-[#0B3B70] flex justify-between items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#F2A900] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Skill Gap Survey Wizard</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">CHECK YOUR SKILL GAP</h2>
            <p className="text-xs text-slate-300">Let's understand your current profile and career goals</p>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        {!isAnalyzing && (
          <div className="bg-[#032447] text-white px-6 py-3 border-b border-slate-700/80">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-[#F2A900]">Step {currentStep} of 7</span>
              <span className="text-slate-300 text-[11px]">
                {currentStep === 1 && "Education"}
                {currentStep === 2 && "Course & Specialization"}
                {currentStep === 3 && "Technical Skills"}
                {currentStep === 4 && "Skill Proficiency Levels"}
                {currentStep === 5 && "Project Experience"}
                {currentStep === 6 && "Career Goal & Location"}
                {currentStep === 7 && "Readiness & Dedication"}
              </span>
            </div>

            {/* Visual Dots & Connector */}
            <div className="flex items-center justify-between relative px-1">
              <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div 
                  key={num}
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold z-10 transition-all
                    ${num === currentStep 
                      ? 'bg-[#F2A900] text-[#032447] scale-110 shadow-md ring-2 ring-amber-300' 
                      : num < currentStep 
                      ? 'bg-[#16A36A] text-white' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }
                  `}
                >
                  {num < currentStep ? "✓" : num}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WIZARD CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#172B4D]">
          
          {/* ANIMATED ANALYSIS SCREEN */}
          {isAnalyzing ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#062B52] flex items-center justify-center mx-auto shadow-md">
                <Loader2 className="w-8 h-8 animate-spin text-[#0B3B70]" />
              </div>
              
              <div>
                <h3 className="text-xl font-extrabold text-[#062B52]">Analyzing Your Skill Profile...</h3>
                <p className="text-xs text-[#52657A] mt-1">Comparing against Maharashtra industry baseline benchmarks</p>
              </div>

              <div className="max-w-xs mx-auto space-y-2 text-left text-xs bg-[#F5F7FA] p-4 rounded-2xl border border-slate-200 font-medium">
                <div className={`flex items-center gap-2 ${analysisProgress >= 1 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Education analyzed ({educationLevel})</span>
                </div>
                <div className={`flex items-center gap-2 ${analysisProgress >= 2 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{selectedSkills.length} Technical skills parsed</span>
                </div>
                <div className={`flex items-center gap-2 ${analysisProgress >= 3 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Industry requirements checked ({targetLocation})</span>
                </div>
                <div className={`flex items-center gap-2 ${analysisProgress >= 4 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Career goal matched ({targetRole})</span>
                </div>
                <div className={`flex items-center gap-2 ${analysisProgress >= 5 ? 'text-[#16A36A]' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Skill gaps identified & roadmap generated</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: EDUCATION */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#062B52]">
                    <GraduationCap className="w-5 h-5 text-[#0B3B70]" />
                    <h3>What is your current education level?</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["10th", "12th", "Diploma", "Undergraduate", "Postgraduate", "Other"].map((lvl) => (
                      <div
                        key={lvl}
                        onClick={() => setEducationLevel(lvl)}
                        className={`
                          p-3 rounded-xl border font-semibold cursor-pointer transition text-center
                          ${educationLevel === lvl 
                            ? 'bg-blue-50 border-[#0B3B70] text-[#0B3B70] font-bold shadow-2xs' 
                            : 'bg-[#F5F7FA] border-slate-200 text-slate-700 hover:bg-slate-100'
                          }
                        `}
                      >
                        {lvl}
                      </div>
                    ))}
                  </div>

                  {(educationLevel === "Undergraduate" || educationLevel === "Postgraduate" || educationLevel === "Diploma") && (
                    <div className="space-y-4 pt-3 border-t border-slate-100">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">Which year are you currently studying?</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {["1st Year", "2nd Year", "3rd Year", "4th Year", "Final Year", "Completed"].map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => setStudyYear(yr)}
                              className={`p-2 rounded-lg border text-xs ${studyYear === yr ? 'bg-[#062B52] text-white font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                            >
                              {yr}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Expected graduation year</label>
                        <select
                          value={gradYear}
                          onChange={(e) => setGradYear(e.target.value)}
                          className="w-full bg-[#F5F7FA] border border-slate-300 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                        >
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028+</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: COURSE & SPECIALIZATION */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#062B52]">
                    <BookOpen className="w-5 h-5 text-[#0B3B70]" />
                    <h3>What course & specialization are you pursuing?</h3>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Course / Degree</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["B.Tech", "B.E.", "B.Sc.", "BCA", "MCA", "M.Tech", "Diploma", "Other"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCourse(c)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold ${course === c ? 'bg-[#062B52] text-white font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block font-bold text-slate-700 mb-1.5">Specialization</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Artificial Intelligence & Data Science",
                        "Computer Science & Engineering",
                        "Information Technology",
                        "Electronics & Telecommunication",
                        "Mechanical Engineering",
                        "Civil Engineering",
                        "Electrical Engineering",
                        "Other"
                      ].map((spec) => (
                        <div
                          key={spec}
                          onClick={() => setSpecialization(spec)}
                          className={`p-2.5 rounded-xl border font-semibold cursor-pointer transition text-xs ${
                            specialization === spec 
                              ? 'bg-blue-50 border-[#0B3B70] text-[#0B3B70] font-bold' 
                              : 'bg-[#F5F7FA] border-slate-200 text-slate-700'
                          }`}
                        >
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CURRENT SKILLS */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#062B52]">
                    <BrainCircuit className="w-5 h-5 text-[#0B3B70]" />
                    <h3>Which technical skills do you currently have?</h3>
                  </div>

                  <p className="text-xs text-[#52657A]">Select all technical skills you have learned or worked with.</p>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {Object.entries(PREDEFINED_SKILL_CATEGORIES).map(([cat, skills]) => (
                      <div key={cat} className="space-y-1.5">
                        <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{cat}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {skills.map(sk => {
                            const isSel = selectedSkills.includes(sk);
                            return (
                              <button
                                key={sk}
                                type="button"
                                onClick={() => toggleSkillSelect(sk)}
                                className={`
                                  px-3 py-1.5 rounded-full text-xs font-semibold transition border flex items-center gap-1
                                  ${isSel 
                                    ? 'bg-[#062B52] text-white border-[#062B52]' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                  }
                                `}
                              >
                                {isSel && <Check className="w-3 h-3 text-[#F2A900]" />}
                                <span>{sk}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add custom skill input */}
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add another custom skill (e.g., OpenCV, Redis)..."
                      value={customSkillInput}
                      onChange={(e) => setCustomSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill())}
                      className="flex-1 bg-[#F5F7FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSkill}
                      className="bg-[#0B3B70] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: SKILL LEVEL */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#062B52]">
                    <Sliders className="w-5 h-5 text-[#0B3B70]" />
                    <h3>Rate your level for EACH selected skill (1 to 5 scale)</h3>
                  </div>

                  <p className="text-xs text-[#52657A]">
                    1: Just Started • 2: Basic • 3: Intermediate • 4: Advanced • 5: Strong
                  </p>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {selectedSkills.map(sk => {
                      const rating = skillRatings[sk] || 3;
                      return (
                        <div key={sk} className="p-3 bg-[#F5F7FA] rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <span className="font-bold text-slate-900">{sk}</span>
                            <div className="font-mono text-[11px] text-[#0B3B70] font-bold mt-0.5">
                              Level: {rating}/5 {rating === 5 ? '(Strong)' : rating === 4 ? '(Advanced)' : rating === 3 ? '(Intermediate)' : rating === 2 ? '(Basic)' : '(Just Started)'}
                            </div>
                          </div>

                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map(num => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setRatingForSkill(sk, num)}
                                className={`
                                  w-8 h-8 rounded-lg font-mono text-xs font-bold transition
                                  ${rating === num 
                                    ? 'bg-[#062B52] text-[#F2A900] shadow-2xs' 
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                  }
                                `}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: PROJECT EXPERIENCE */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#062B52]">
                    <Code2 className="w-5 h-5 text-[#0B3B70]" />
                    <h3>How many technical projects have you completed?</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["None", "1", "2–3", "4–5", "5+"].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setProjectsCount(opt)}
                        className={`p-3 rounded-xl border text-xs font-bold ${projectsCount === opt ? 'bg-[#062B52] text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="block font-bold text-slate-700 mb-1.5">What type of projects have you worked on?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Academic Project",
                        "Personal Project",
                        "Hackathon",
                        "Internship Project",
                        "Freelance Project",
                        "Open Source"
                      ].map(type => {
                        const isSel = projectTypes.includes(type);
                        return (
                          <div
                            key={type}
                            onClick={() => toggleProjectType(type)}
                            className={`p-2.5 rounded-xl border cursor-pointer font-semibold text-xs transition flex items-center justify-between ${
                              isSel ? 'bg-blue-50 border-[#0B3B70] text-[#0B3B70] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>{type}</span>
                            {isSel && <Check className="w-3.5 h-3.5 text-[#0B3B70]" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block font-bold text-slate-700 mb-1.5">Have you deployed any project live?</label>
                    <div className="flex gap-3">
                      {["Yes", "No"].map(dep => (
                        <button
                          key={dep}
                          type="button"
                          onClick={() => setHasDeployed(dep)}
                          className={`flex-1 p-2.5 rounded-xl border text-xs font-bold ${hasDeployed === dep ? 'bg-[#062B52] text-[#F2A900]' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                        >
                          {dep}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: CAREER GOAL & LOCATION */}
              {currentStep === 6 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#062B52]">
                    <Briefcase className="w-5 h-5 text-[#0B3B70]" />
                    <h3>What role & location are you targeting?</h3>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Target Role</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        "AI/ML Engineer",
                        "Software Developer",
                        "Full Stack Developer",
                        "Data Analyst",
                        "Data Scientist",
                        "Cloud Engineer",
                        "DevOps Engineer",
                        "Cybersecurity Analyst",
                        "UI/UX Designer",
                        "Embedded Systems Engineer"
                      ].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setTargetRole(r)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition truncate ${targetRole === r ? 'bg-[#062B52] text-white font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Target Location in Maharashtra</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Anywhere in MH", "Remote"].map(loc => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setTargetLocation(loc)}
                          className={`p-2 rounded-xl border text-xs font-semibold ${targetLocation === loc ? 'bg-[#062B52] text-[#F2A900] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: READINESS & DEDICATION */}
              {currentStep === 7 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[#062B52]">
                    <Clock className="w-5 h-5 text-[#0B3B70]" />
                    <h3>Experience & Weekly Learning Commitment</h3>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Professional Experience</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["No experience", "Internship", "Less than 1 year", "1–2 years", "2–5 years", "5+ years"].map(exp => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => setProfExperience(exp)}
                          className={`p-2 rounded-xl border text-xs ${profExperience === exp ? 'bg-[#062B52] text-white font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block font-bold text-slate-700 mb-1.5">How many hours per week can you dedicate to learning?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {["Less than 3 hours", "3–5 hours", "5–10 hours", "10–15 hours", "15+ hours"].map(hrs => (
                        <button
                          key={hrs}
                          type="button"
                          onClick={() => setLearningHours(hrs)}
                          className={`p-2.5 rounded-xl border text-xs text-center ${learningHours === hrs ? 'bg-[#062B52] text-[#F2A900] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                        >
                          {hrs}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block font-bold text-slate-700 mb-1.5">Certifications (Optional)</label>
                    <div className="flex flex-wrap gap-1.5">
                      {["None", "AWS", "Azure", "Google Cloud", "Python", "Data Analytics", "AI/ML"].map(c => {
                        const isSel = certifications.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleCertification(c)}
                            className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${isSel ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* WIZARD FOOTER NAVIGATION */}
        {!isAnalyzing && (
          <div className="bg-[#F5F7FA] p-4 border-t border-slate-200 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${currentStep === 1 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'text-slate-700 hover:bg-slate-200'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < 7 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(7, prev + 1))}
                className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-[#F2A900]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="bg-[#F2A900] hover:bg-amber-400 text-[#032447] px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-2 hover:scale-105 transition"
              >
                <span>Analyze My Skill Gap →</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
