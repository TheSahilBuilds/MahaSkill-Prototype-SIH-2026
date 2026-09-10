import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Loader2, 
  User, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck,
  Search,
  ChevronDown
} from 'lucide-react';

const MAHARASHTRA_DISTRICTS = [
  "Pune",
  "Mumbai City",
  "Mumbai Suburban",
  "Thane",
  "Nashik",
  "Nagpur",
  "Chhatrapati Sambhajinagar",
  "Kolhapur",
  "Solapur",
  "Amravati",
  "Raigad",
  "Sangli",
  "Satara",
  "Nanded",
  "Latur",
  "Jalgaon",
  "Ahmednagar"
];

const AVAILABLE_SKILLS = [
  "Python",
  "Java",
  "JavaScript",
  "SQL",
  "HTML/CSS",
  "React",
  "C++",
  "Excel",
  "Power BI",
  "Machine Learning",
  "Git/GitHub",
  "Cloud/AWS",
  "Docker"
];

const SKILLS_TO_IMPROVE_OPTIONS = [
  "SQL",
  "Power BI",
  "Python",
  "Cloud/AWS",
  "Machine Learning",
  "Docker",
  "Git/GitHub",
  "Data Structures",
  "System Design"
];

export default function Survey() {
  const { user, submitSurveyData } = useApp();
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [validationError, setValidationError] = useState('');

  // Search filter for District dropdown
  const [districtSearch, setDistrictSearch] = useState('');
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);

  // 10-Question Form Answers State initialized with smart defaults
  const [answers, setAnswers] = useState({
    // Step 1: About You
    fullName: user?.name || "Sahil Bhole",
    education: user?.degree || "Undergraduate",
    course: user?.specialization || "B.Tech AI & Data Science",

    // Step 2: Career Goal
    currentStatus: "Student",
    targetRole: user?.targetRole || "Data Analyst",
    district: user?.district || "Pune",

    // Step 3: Your Skills
    currentSkills: ["Python", "SQL", "Excel"],
    skillProficiency: {
      "Python": "Intermediate",
      "SQL": "Intermediate",
      "Excel": "Advanced"
    },
    practicalExperience: "Academic projects",
    skillsToImprove: ["SQL", "Power BI"],

    // Step 4: Consent
    consent: true
  });

  // Toggle selection for Current Skills
  const toggleCurrentSkill = (skill) => {
    setAnswers(prev => {
      const exists = prev.currentSkills.includes(skill);
      let updatedSkills;
      let updatedProf = { ...prev.skillProficiency };

      if (exists) {
        updatedSkills = prev.currentSkills.filter(s => s !== skill);
        delete updatedProf[skill];
      } else {
        updatedSkills = [...prev.currentSkills, skill];
        updatedProf[skill] = "Intermediate"; // Default proficiency
      }

      return {
        ...prev,
        currentSkills: updatedSkills,
        skillProficiency: updatedProf
      };
    });
  };

  // Toggle selection for Skills to Improve
  const toggleSkillToImprove = (skill) => {
    setAnswers(prev => {
      const exists = prev.skillsToImprove.includes(skill);
      const updated = exists 
        ? prev.skillsToImprove.filter(s => s !== skill)
        : [...prev.skillsToImprove, skill];
      return { ...prev, skillsToImprove: updated };
    });
  };

  // Set proficiency for a specific skill
  const setProficiency = (skill, level) => {
    setAnswers(prev => ({
      ...prev,
      skillProficiency: {
        ...prev.skillProficiency,
        [skill]: level
      }
    }));
  };

  // Validation function per step
  const validateStep = () => {
    setValidationError('');

    if (currentStepIndex === 0) {
      if (!answers.fullName.trim()) {
        setValidationError('Please enter your full name.');
        return false;
      }
      if (!answers.education) {
        setValidationError('Please select your education qualification.');
        return false;
      }
      if (!answers.course.trim()) {
        setValidationError('Please select or specify your course / branch.');
        return false;
      }
    }

    if (currentStepIndex === 1) {
      if (!answers.currentStatus) {
        setValidationError('Please select your current status.');
        return false;
      }
      if (!answers.targetRole) {
        setValidationError('Please select your target job role.');
        return false;
      }
      if (!answers.district) {
        setValidationError('Please select your district.');
        return false;
      }
    }

    if (currentStepIndex === 2) {
      if (answers.currentSkills.length === 0) {
        setValidationError('Please select at least one current technical skill.');
        return false;
      }
      if (!answers.practicalExperience) {
        setValidationError('Please select your practical experience level.');
        return false;
      }
      if (answers.skillsToImprove.length === 0) {
        setValidationError('Please select at least one skill you want to improve.');
        return false;
      }
    }

    if (currentStepIndex === 3) {
      if (!answers.consent) {
        setValidationError('You must agree to outcome tracking and follow-ups to proceed.');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStepIndex < 3) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Step 4 Submission -> Trigger Analysis Animation
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

  const handleBack = () => {
    setValidationError('');
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  };

  const filteredDistricts = MAHARASHTRA_DISTRICTS.filter(d => 
    d.toLowerCase().includes(districtSearch.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6 animate-fadeIn pb-12">
      
      {/* MAIN CONTAINER */}
      <div className="bg-white rounded-3xl border border-[#D9E1EA] shadow-xl overflow-hidden">
        
        {/* HEADER & PROGRESS BAR */}
        <div className="bg-[#062B52] text-white p-6 border-b border-[#0B3B70] space-y-4">
          <div className="flex justify-between items-center text-xs">
            <div className="inline-flex items-center gap-1.5 font-bold text-[#F2A900] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#F2A900]" />
              <span>MahaSkill Skill Gap Diagnostic</span>
            </div>
            <span className="font-extrabold text-[#F2A900] bg-[#032447] px-3.5 py-1 rounded-full border border-amber-400/30">
              STEP {currentStepIndex + 1} OF 4
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">SKILL GAP ASSESSMENT SURVEY</h2>
            <p className="text-xs text-slate-300">
              {currentStepIndex === 0 && "Step 1: Tell us about your educational background"}
              {currentStepIndex === 1 && "Step 2: Define your career goals & target location"}
              {currentStepIndex === 2 && "Step 3: Evaluate your technical skills & improvement areas"}
              {currentStepIndex === 3 && "Step 4: Review your responses & outcome tracking consent"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
            <div 
              className="bg-[#F2A900] h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* BODY AREA */}
        <div className="p-6 sm:p-8 space-y-6 text-[#172B4D]">
          
          {/* VALIDATION ERROR BANNER */}
          {validationError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-bold animate-shake">
              ⚠️ {validationError}
            </div>
          )}

          {/* ANALYSIS LOADING OVERLAY */}
          {isAnalyzing ? (
            <div className="py-12 text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#062B52] flex items-center justify-center mx-auto shadow-md">
                <Loader2 className="w-8 h-8 animate-spin text-[#0B3B70]" />
              </div>
              
              <div>
                <h3 className="text-xl font-extrabold text-[#062B52]">Analyzing Your Skill Profile...</h3>
                <p className="text-xs text-[#52657A] mt-1">SIH 2026 Skill Gap & Employment Outcome Engine</p>
              </div>

              <div className="max-w-sm mx-auto space-y-2.5 text-left text-xs bg-[#F5F7FA] p-5 rounded-2xl border border-slate-200 font-semibold">
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 1 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Evaluating candidate: {answers.fullName} ({answers.education})...</span>
                </div>
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 2 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Assessing current skills ({answers.currentSkills.join(", ")})...</span>
                </div>
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 3 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Matching benchmark requirements for {answers.targetRole}...</span>
                </div>
                <div className={`flex items-center gap-2.5 ${analysisProgress >= 4 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                  <span>Generating upskilling roadmap & outcome signals...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">

              {/* ========================================================= */}
              {/* STEP 1 — ABOUT YOU */}
              {/* ========================================================= */}
              {currentStepIndex === 0 && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Q1: FULL NAME */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      1. Full Name <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input 
                        type="text"
                        value={answers.fullName}
                        onChange={(e) => setAnswers({ ...answers, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#062B52] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Q2: EDUCATION / QUALIFICATION */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      2. Education / Qualification <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        "Undergraduate",
                        "Graduate",
                        "Post-Graduate",
                        "Diploma",
                        "ITI / Vocational",
                        "Higher Secondary"
                      ].map((edu) => (
                        <div
                          key={edu}
                          onClick={() => setAnswers({ ...answers, education: edu })}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition font-semibold text-xs flex items-center justify-between ${
                            answers.education === edu 
                              ? 'bg-blue-50/70 border-[#062B52] text-[#062B52] font-extrabold shadow-2xs' 
                              : 'bg-[#F5F7FA] border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{edu}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers.education === edu ? 'bg-[#062B52] border-[#062B52] text-white' : 'border-slate-300 bg-white'}`}>
                            {answers.education === edu && <Check className="w-3 h-3 text-[#F2A900]" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Q3: COURSE / BRANCH */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      3. Course / Branch <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "B.Tech AI & Data Science",
                        "Computer Engineering",
                        "Information Technology",
                        "Mechanical Engineering",
                        "Electrical Engineering",
                        "BCA / BSc IT",
                        "Other"
                      ].map((crs) => (
                        <div
                          key={crs}
                          onClick={() => setAnswers({ ...answers, course: crs })}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition font-semibold text-xs flex items-center justify-between ${
                            answers.course === crs 
                              ? 'bg-blue-50/70 border-[#062B52] text-[#062B52] font-extrabold shadow-2xs' 
                              : 'bg-[#F5F7FA] border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{crs}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers.course === crs ? 'bg-[#062B52] border-[#062B52] text-white' : 'border-slate-300 bg-white'}`}>
                            {answers.course === crs && <Check className="w-3 h-3 text-[#F2A900]" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 2 — CAREER GOAL */}
              {/* ========================================================= */}
              {currentStepIndex === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Q4: CURRENT STATUS */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      4. Current Status <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        "Student",
                        "Graduate",
                        "Employed",
                        "Looking for Work",
                        "Self-employed"
                      ].map((status) => (
                        <div
                          key={status}
                          onClick={() => setAnswers({ ...answers, currentStatus: status })}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition font-semibold text-xs flex items-center justify-between ${
                            answers.currentStatus === status 
                              ? 'bg-blue-50/70 border-[#062B52] text-[#062B52] font-extrabold shadow-2xs' 
                              : 'bg-[#F5F7FA] border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{status}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers.currentStatus === status ? 'bg-[#062B52] border-[#062B52] text-white' : 'border-slate-300 bg-white'}`}>
                            {answers.currentStatus === status && <Check className="w-3 h-3 text-[#F2A900]" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Q5: TARGET JOB ROLE */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      5. Target Job Role <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "Data Analyst",
                        "Full Stack Developer",
                        "AI/ML Engineer",
                        "Cloud Engineer",
                        "Cybersecurity Analyst",
                        "Software Developer",
                        "Other"
                      ].map((role) => (
                        <div
                          key={role}
                          onClick={() => setAnswers({ ...answers, targetRole: role })}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition font-semibold text-xs flex items-center justify-between ${
                            answers.targetRole === role 
                              ? 'bg-blue-50/70 border-[#062B52] text-[#062B52] font-extrabold shadow-2xs' 
                              : 'bg-[#F5F7FA] border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{role}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers.targetRole === role ? 'bg-[#062B52] border-[#062B52] text-white' : 'border-slate-300 bg-white'}`}>
                            {answers.targetRole === role && <Check className="w-3 h-3 text-[#F2A900]" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Q6: DISTRICT (SEARCHABLE DROPDOWN) */}
                  <div className="space-y-2 relative">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      6. District (Maharashtra) <span className="text-rose-600">*</span>
                    </label>
                    
                    <div 
                      onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-[#062B52] flex items-center justify-between cursor-pointer hover:bg-white transition"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#0B3B70]" />
                        <span>{answers.district || "Select District"}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>

                    {isDistrictDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-300 rounded-2xl shadow-xl z-30 p-2 space-y-2 animate-in fade-in">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                          <input 
                            type="text" 
                            value={districtSearch}
                            onChange={(e) => setDistrictSearch(e.target.value)}
                            placeholder="Search Maharashtra District..."
                            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#062B52]"
                          />
                        </div>

                        <div className="max-h-48 overflow-y-auto space-y-1">
                          {filteredDistricts.map((dist) => (
                            <div
                              key={dist}
                              onClick={() => {
                                setAnswers({ ...answers, district: dist });
                                setIsDistrictDropdownOpen(false);
                                setDistrictSearch('');
                              }}
                              className={`p-2 rounded-lg text-xs font-semibold cursor-pointer flex items-center justify-between transition ${
                                answers.district === dist ? 'bg-[#062B52] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <span>{dist}</span>
                              {answers.district === dist && <Check className="w-3.5 h-3.5 text-[#F2A900]" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 3 — YOUR SKILLS */}
              {/* ========================================================= */}
              {currentStepIndex === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Q7: CURRENT TECHNICAL SKILLS (CHIPS) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      7. Current Technical Skills (Select all that apply) <span className="text-rose-600">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {AVAILABLE_SKILLS.map((skill) => {
                        const isSelected = answers.currentSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleCurrentSkill(skill)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
                              isSelected 
                                ? 'bg-[#062B52] text-white ring-2 ring-[#0B3B70]' 
                                : 'bg-[#F5F7FA] text-slate-700 border border-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            <span>{skill}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#F2A900]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Q8: SKILL PROFICIENCY FOR SELECTED SKILLS */}
                  {answers.currentSkills.length > 0 && (
                    <div className="space-y-3 bg-[#F5F7FA] p-4 rounded-2xl border border-slate-200">
                      <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                        8. Skill Proficiency Rating
                      </label>
                      <div className="space-y-2">
                        {answers.currentSkills.map((skill) => (
                          <div key={skill} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                            <span className="text-xs font-extrabold text-[#062B52]">{skill}</span>
                            <div className="flex items-center gap-1.5">
                              {["Beginner", "Intermediate", "Advanced"].map((level) => {
                                const isCurrent = answers.skillProficiency[skill] === level;
                                return (
                                  <button
                                    key={level}
                                    type="button"
                                    onClick={() => setProficiency(skill, level)}
                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition ${
                                      isCurrent 
                                        ? 'bg-[#062B52] text-[#F2A900]' 
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                  >
                                    {level}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Q9: PRACTICAL EXPERIENCE */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      9. Practical Experience <span className="text-rose-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "No experience",
                        "Academic projects",
                        "Internship",
                        "Work experience",
                        "Multiple projects/internships"
                      ].map((exp) => (
                        <div
                          key={exp}
                          onClick={() => setAnswers({ ...answers, practicalExperience: exp })}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition font-semibold text-xs flex items-center justify-between ${
                            answers.practicalExperience === exp 
                              ? 'bg-blue-50/70 border-[#062B52] text-[#062B52] font-extrabold shadow-2xs' 
                              : 'bg-[#F5F7FA] border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{exp}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers.practicalExperience === exp ? 'bg-[#062B52] border-[#062B52] text-white' : 'border-slate-300 bg-white'}`}>
                            {answers.practicalExperience === exp && <Check className="w-3 h-3 text-[#F2A900]" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Q10: SKILLS I WANT TO IMPROVE */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#062B52] uppercase tracking-wider">
                      10. Skills I Want to Improve (Select all that apply) <span className="text-rose-600">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {SKILLS_TO_IMPROVE_OPTIONS.map((skill) => {
                        const isSelected = answers.skillsToImprove.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkillToImprove(skill)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ${
                              isSelected 
                                ? 'bg-[#062B52] text-white ring-2 ring-[#0B3B70]' 
                                : 'bg-[#F5F7FA] text-slate-700 border border-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            <span>{skill}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#F2A900]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================= */}
              {/* STEP 4 — REVIEW & CONSENT */}
              {/* ========================================================= */}
              {currentStepIndex === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  
                  <div className="space-y-1 border-b border-slate-100 pb-3">
                    <h3 className="text-base font-extrabold text-[#062B52]">Review Your Skill Diagnostic Summary</h3>
                    <p className="text-xs text-slate-500">Please verify your responses before running the skill gap evaluation.</p>
                  </div>

                  {/* COMPACT SUMMARY CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    
                    {/* Personal */}
                    <div className="bg-[#F5F7FA] p-4 rounded-2xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-[#0B3B70] tracking-wider block">PERSONAL</span>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Name</div>
                        <div className="font-extrabold text-[#062B52]">{answers.fullName}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Education</div>
                        <div className="font-bold text-slate-800">{answers.education}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Course / Branch</div>
                        <div className="font-bold text-slate-800">{answers.course}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">District</div>
                        <div className="font-bold text-slate-800">{answers.district}</div>
                      </div>
                    </div>

                    {/* Career */}
                    <div className="bg-[#F5F7FA] p-4 rounded-2xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-[#0B3B70] tracking-wider block">CAREER</span>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Current Status</div>
                        <div className="font-bold text-slate-800">{answers.currentStatus}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Target Role</div>
                        <div className="font-extrabold text-[#0B3B70]">{answers.targetRole}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Practical Experience</div>
                        <div className="font-bold text-slate-800">{answers.practicalExperience}</div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-[#F5F7FA] p-4 rounded-2xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-[#0B3B70] tracking-wider block">SKILLS</span>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Current Skills</div>
                        <div className="font-bold text-[#062B52] flex flex-wrap gap-1 mt-0.5">
                          {answers.currentSkills.map(s => (
                            <span key={s} className="bg-blue-100 text-[#062B52] px-1.5 py-0.5 rounded text-[10px]">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 font-semibold text-[10px]">Skills to Improve</div>
                        <div className="font-bold text-amber-900 flex flex-wrap gap-1 mt-0.5">
                          {answers.skillsToImprove.map(s => (
                            <span key={s} className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded text-[10px]">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* CONSENT BOX */}
                  <div className="bg-[#032447] text-white p-5 rounded-2xl border border-amber-400 shadow-md space-y-3">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <ShieldCheck className="w-5 h-5 text-[#F2A900]" />
                      <span>Outcome Tracking Consent</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      "I agree to allow MahaSkill to use my information for skill-gap analysis and periodic outcome follow-ups such as employment, self-employment, apprenticeship, job retention and training relevance."
                    </p>
                    <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                      <input 
                        type="checkbox"
                        checked={answers.consent}
                        onChange={(e) => setAnswers({ ...answers, consent: e.target.checked })}
                        className="w-4.5 h-4.5 text-[#F2A900] rounded focus:ring-[#F2A900]"
                      />
                      <span className="text-xs font-bold text-white">
                        I agree to outcome tracking and follow-ups.
                      </span>
                    </label>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* FOOTER NAVIGATION */}
        {!isAnalyzing && (
          <div className="bg-[#F5F7FA] p-5 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                currentStepIndex === 0 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md flex items-center gap-2 transition hover:scale-105"
            >
              <span>{currentStepIndex === 3 ? "Analyze My Skills →" : "Next Step"}</span>
              {currentStepIndex < 3 && <ArrowRight className="w-4 h-4 text-[#F2A900]" />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
