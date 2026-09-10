import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  ShieldCheck, 
  Edit3, 
  FileCheck,
  BookOpen,
  X,
  PlayCircle
} from 'lucide-react';

export default function MyTraining() {
  const { 
    user,
    traineeRecord, 
    outcomeState, 
    updateOutcomeState, 
    followupTimeline, 
    completeFollowupItem, 
    hasConsented, 
    updateConsent,
    enrolledCourses,
    updateCourseProgress,
    completeCourse
  } = useApp();

  const navigate = useNavigate();

  // Tab State: 'courses' | 'followups' | 'certificates'
  const [activeTab, setActiveTab] = useState('courses');

  // Modals state
  const [isOutcomeModalOpen, setIsOutcomeModalOpen] = useState(false);
  const [activeFollowupId, setActiveFollowupId] = useState(null);
  const [consentCheck, setConsentCheck] = useState(hasConsented);
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);
  const [celebrationCourse, setCelebrationCourse] = useState(null);

  // Outcome Form state
  const [selectedStatus, setSelectedStatus] = useState(outcomeState.status || "Employed");
  const [employerName, setEmployerName] = useState(outcomeState.employerName || "Tata Consultancy Services (TCS)");
  const [jobRole, setJobRole] = useState(outcomeState.jobRole || "Junior Data Analyst");
  const [currentSalary, setCurrentSalary] = useState(outcomeState.currentSalary || 18000);

  // Followup form state
  const [fuStatus, setFuStatus] = useState("Employed");
  const [fuEmployer, setFuEmployer] = useState(outcomeState.employerName || "TCS");
  const [fuSalary, setFuSalary] = useState(outcomeState.currentSalary || 18000);
  const [fuStillInJob, setFuStillInJob] = useState("Yes");
  const [fuAttritionReason, setFuAttritionReason] = useState("Low salary");

  const handleSaveOutcome = (e) => {
    e.preventDefault();
    updateOutcomeState({
      status: selectedStatus,
      employerName,
      jobRole,
      joiningDate,
      currentSalary: Number(currentSalary),
      location,
      isJobRelatedToTraining: isJobRelated
    });
    setIsOutcomeModalOpen(false);
  };

  const handleSaveFollowup = (e) => {
    e.preventDefault();
    if (!activeFollowupId) return;

    completeFollowupItem(activeFollowupId, {
      employmentStatus: fuStatus,
      employer: fuStatus === "Employed" ? fuEmployer : null,
      salary: fuStatus === "Employed" ? Number(fuSalary) : null,
      relevant: fuRelevant,
      attritionReason: fuStillInJob === "No" || fuStatus !== "Employed" ? fuAttritionReason : null
    });

    setActiveFollowupId(null);
  };

  const handleCompleteCourseClick = (course) => {
    completeCourse(course.id);
    setCelebrationCourse(course);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* 1. CONSENT STEP BANNER */}
      {!hasConsented && (
        <div className="bg-[#032447] text-white p-5 rounded-xl border border-amber-400 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-8 h-8 text-[#F2A900] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-base text-amber-300">
                Trainee Outcome Consent Required
              </h3>
              <p className="text-xs text-slate-200 mt-1 max-w-2xl">
                Your data helps us measure training outcomes and improve future Maharashtra skill programmes.
              </p>
              <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={consentCheck}
                  onChange={(e) => setConsentCheck(e.target.checked)}
                  className="w-4 h-4 text-[#F2A900] rounded focus:ring-[#F2A900]"
                />
                <span className="text-xs font-semibold text-white">
                  I consent to outcome tracking and longitudinal follow-up.
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => updateConsent(consentCheck)}
              disabled={!consentCheck}
              className={`px-5 py-2 rounded-lg font-bold text-xs transition ${
                consentCheck 
                  ? 'bg-[#F2A900] hover:bg-amber-400 text-[#032447] shadow-sm' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* 2. WELCOME TRAINEE HEADER & METRICS */}
      <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 sm:p-8 shadow-xs relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#062B52] text-[#F2A900] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wide">
                TRAINEE DASHBOARD
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <FileCheck className="w-3 h-3" /> DEMO VERIFIED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B52] mt-1">
              My Training & Certification Journey
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Trainee: <span className="font-bold text-[#062B52]">{user?.name || "Sahil Bhole"}</span> • Course Track: <span className="font-bold text-[#0B3B70]">{traineeRecord.course}</span> ({traineeRecord.district})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOutcomeModalOpen(true)}
              className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-[#F2A900]" />
              <span>Update Employment Outcome</span>
            </button>
          </div>
        </div>

        {/* 3 TAB NAVIGATION */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-3 px-4 text-xs sm:text-sm font-extrabold transition border-b-2 flex items-center gap-2 ${
              activeTab === 'courses' 
                ? 'border-[#062B52] text-[#062B52]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>MY ENROLLED COURSES ({enrolledCourses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('followups')}
            className={`pb-3 px-4 text-xs sm:text-sm font-extrabold transition border-b-2 flex items-center gap-2 ${
              activeTab === 'followups' 
                ? 'border-[#062B52] text-[#062B52]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>FOLLOW-UP SCHEDULE ({followupTimeline.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 px-4 text-xs sm:text-sm font-extrabold transition border-b-2 flex items-center gap-2 ${
              activeTab === 'certificates' 
                ? 'border-[#062B52] text-[#062B52]' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>MY CERTIFICATES</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB A: MY ENROLLED COURSES */}
      {/* ========================================================= */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-lg text-[#062B52]">Enrolled Upskilling Courses</h2>
            <span className="text-xs font-semibold text-slate-500">
              Interactive Progress Controls (Demo Simulation)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const isCompleted = course.progress >= 100 || course.status === "Completed";

              return (
                <div key={course.id} className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#062B52] transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase ${
                        isCompleted ? 'bg-emerald-100 text-emerald-900' :
                        course.progress > 0 ? 'bg-amber-100 text-amber-900' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {isCompleted ? '✓ Completed' : course.progress > 0 ? '→ In Progress' : '○ Not Started'}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-bold">{course.duration}</span>
                    </div>

                    <h3 className="font-extrabold text-base text-[#062B52]">{course.title}</h3>
                    <p className="text-xs text-[#52657A]">{course.recommendedReason}</p>
                    <div className="text-[11px] text-slate-400">Provider: <span className="font-bold text-slate-600">{course.provider}</span></div>

                    {/* Progress bar */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-xs font-mono font-bold">
                        <span className="text-slate-500">Course Progress</span>
                        <span className={isCompleted ? 'text-emerald-700 font-extrabold' : 'text-[#062B52]'}>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-600' : 'bg-[#062B52]'}`} 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Course Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    {!isCompleted ? (
                      <>
                        <button
                          onClick={() => updateCourseProgress(course.id, course.progress + 25)}
                          className="flex-1 bg-[#F5F7FA] hover:bg-slate-200 border border-slate-300 text-[#062B52] py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>+25% Progress</span>
                        </button>
                        <button
                          onClick={() => handleCompleteCourseClick(course)}
                          className="flex-1 bg-[#062B52] hover:bg-[#0B3B70] text-white py-2 rounded-xl text-xs font-extrabold transition shadow-xs flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F2A900]" />
                          <span>Complete Course</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedCertCourse(course);
                          setActiveTab('certificates');
                        }}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl text-xs font-extrabold transition shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-4 h-4" />
                        <span>View Verified Certificate</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB B: FOLLOW-UP SCHEDULE */}
      {/* ========================================================= */}
      {activeTab === 'followups' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 sm:p-8 shadow-xs space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="font-extrabold text-lg text-[#062B52]">Automated Longitudinal Follow-up Schedule</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Outcome verification surveys triggered at 30, 90, 180, and 365 days post-completion.
              </p>
            </div>
            <span className="text-xs font-bold bg-[#062B52]/10 text-[#062B52] px-3 py-1 rounded-full">
              Automated Timeline
            </span>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6">
            {followupTimeline.map((fu) => {
              const isCompleted = fu.status === "Completed";
              const isDue = fu.status === "Due";

              return (
                <div key={fu.id} className="relative group">
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
                    isCompleted ? 'bg-emerald-600 border-white ring-2 ring-emerald-200' :
                    isDue ? 'bg-[#F2A900] border-white ring-4 ring-amber-200 animate-pulse' :
                    'bg-slate-300 border-white'
                  }`}></div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#062B52] uppercase tracking-wider">
                          {fu.period}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCompleted ? 'bg-emerald-100 text-emerald-800' :
                          isDue ? 'bg-amber-100 text-amber-800 font-extrabold' :
                          'bg-slate-200 text-slate-600'
                        }`}>
                          {fu.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#172B4D] mt-1">{fu.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Due Date: {fu.dueDate} {fu.completedDate ? `• Completed on ${fu.completedDate}` : ''}
                      </p>

                      {isCompleted && (
                        <div className="mt-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 flex flex-wrap gap-x-4 gap-y-1">
                          <span><strong>Employer:</strong> {fu.employer || outcomeState.employerName || 'TCS'}</span>
                          <span><strong>Salary:</strong> ₹{(fu.salary || outcomeState.currentSalary)?.toLocaleString('en-IN')}/mo</span>
                          <span><strong>Relevant:</strong> {fu.relevant || 'Yes'}</span>
                        </div>
                      )}
                    </div>

                    {isDue && (
                      <button
                        onClick={() => {
                          setActiveFollowupId(fu.id);
                          setFuStatus(outcomeState.status || "Employed");
                          setFuEmployer(outcomeState.employerName || "TCS");
                          setFuSalary(outcomeState.currentSalary || 18000);
                        }}
                        className="bg-[#F2A900] hover:bg-amber-400 text-[#032447] px-5 py-2.5 rounded-lg font-extrabold text-xs shadow-xs transition shrink-0 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Complete Follow-up</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB C: CERTIFICATES */}
      {/* ========================================================= */}
      {activeTab === 'certificates' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-lg text-[#062B52]">My Earned Certificates</h2>
            <span className="text-xs font-semibold text-[#0B3B70] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              Prototype Verification Seals
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const isCompleted = course.progress >= 100 || course.status === "Completed";

              return (
                <div key={course.id} className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-4 hover:border-[#062B52] transition">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#062B52]/10 flex items-center justify-center text-[#062B52]">
                      <Award className="w-6 h-6 text-[#F2A900]" />
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase ${
                      isCompleted ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isCompleted ? '✓ Certificate Issued' : '○ Completion Pending'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-[#062B52]">{course.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{course.provider}</p>
                    {isCompleted && (
                      <div className="mt-2 text-xs font-mono text-slate-600 space-y-0.5">
                        <div>Certificate ID: <span className="font-bold text-[#062B52]">{course.certificateId || 'MSA-2026-8842'}</span></div>
                        <div>Date Issued: <span className="font-bold text-slate-700">{course.completionDate || '15 Jan 2026'}</span></div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    {isCompleted ? (
                      <button
                        onClick={() => setSelectedCertCourse(course)}
                        className="w-full bg-[#062B52] hover:bg-[#0B3B70] text-white py-2.5 rounded-xl text-xs font-extrabold transition shadow-xs flex items-center justify-center gap-2"
                      >
                        <Award className="w-4 h-4 text-[#F2A900]" />
                        <span>View Sample Certificate</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleteCourseClick(course)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Complete Course to Unlock Certificate</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CELEBRATION MODAL BANNER AFTER COURSE COMPLETION */}
      {/* ========================================================= */}
      {celebrationCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl space-y-4 animate-in zoom-in-95 border-2 border-emerald-500">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <Award className="w-10 h-10 text-[#F2A900]" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">CONGRATULATIONS!</span>
              <h3 className="text-xl font-extrabold text-[#062B52]">Course Completed Successfully</h3>
              <p className="text-xs text-slate-600">
                You have completed <strong className="text-[#062B52]">{celebrationCourse.title}</strong>. Your sample certificate is now unlocked!
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setSelectedCertCourse(celebrationCourse);
                  setCelebrationCourse(null);
                  setActiveTab('certificates');
                }}
                className="w-full bg-[#062B52] hover:bg-[#0B3B70] text-white py-3 rounded-xl font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-[#F2A900]" />
                <span>View Sample Certificate</span>
              </button>

              <button
                onClick={() => {
                  setCelebrationCourse(null);
                  navigate('/my-dashboard');
                }}
                className="w-full bg-[#F5F7FA] hover:bg-slate-200 border border-slate-300 text-[#062B52] py-2.5 rounded-xl font-bold text-xs transition"
              >
                Go to My Outcome Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SAMPLE CERTIFICATE MODAL */}
      {/* ========================================================= */}
      {selectedCertCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 animate-in zoom-in-95 my-8 border-4 border-[#062B52] relative">
            
            {/* Modal Close */}
            <button 
              onClick={() => setSelectedCertCourse(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {/* CERTIFICATE LOGO HEADER */}
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-2">
              {/* State Emblem of Maharashtra */}
              <img 
                src="/image/emblem.png" 
                alt="State Emblem of Maharashtra" 
                className="h-14 sm:h-16 w-auto object-contain shrink-0"
                onError={(e) => { e.target.src = '/image/emblem.jpeg'; }}
              />

              {/* Title & Department */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1 bg-[#062B52]/10 text-[#062B52] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                  <span>Government of Maharashtra</span>
                </div>
                <div className="text-[11px] font-bold text-[#062B52]">
                  Skill Development, Employment & Innovation Department
                </div>
              </div>

              {/* MahaSkill Logo */}
              <img 
                src="/image/maha-logo.png" 
                alt="MahaSkill AI Logo" 
                className="h-12 sm:h-14 w-auto object-contain shrink-0"
                onError={(e) => { e.target.src = '/image/emblem.png'; }}
              />
            </div>

            {/* CERTIFICATE TITLE */}
            <div className="text-center space-y-1 pb-4 border-b border-slate-100">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#062B52] tracking-tight">
                CERTIFICATE OF COMPLETION
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Certificate ID: <strong className="text-[#062B52]">{selectedCertCourse.certificateId || "MSA-2026-8842"}</strong>
              </p>
            </div>

            {/* CERTIFICATE BODY */}
            <div className="text-center space-y-4 py-2">
              <p className="text-xs text-slate-500 uppercase tracking-widest">This is to certify that</p>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#062B52] font-serif border-b border-slate-300 pb-2 max-w-md mx-auto">
                {user?.name || "SAHIL BHOLE"}
              </div>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                has successfully completed the skill enhancement module in
              </p>
              <div className="text-lg font-bold text-[#0B3B70]">
                {selectedCertCourse.title}
              </div>
              <p className="text-xs text-slate-500">
                Issued by <strong className="text-slate-700">{selectedCertCourse.provider || "MahaSkill Training Centre, Pune"}</strong> on {selectedCertCourse.completionDate || "11 September 2026"}.
              </p>
            </div>

            {/* CERTIFICATE SIGNATURE & STAMP FOOTER */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-slate-200 items-end">
              <div className="text-left space-y-1">
                <div className="font-serif italic font-bold text-slate-700 text-sm">Director of Skill Development</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Government of Maharashtra</div>
              </div>

              <div className="text-right space-y-1">
                <div className="inline-block border-2 border-emerald-600 text-emerald-700 px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider">
                  ✓ VERIFIED DEMO CERTIFICATE
                </div>
                <div className="text-[10px] text-slate-400 font-mono">MahaSkill AI Prototype</div>
              </div>
            </div>

            {/* PROTOTYPE TAG DISCLAIMER */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-center text-[11px] text-amber-900 font-bold">
              PROTOTYPE / SAMPLE CERTIFICATE • DEMO VERIFICATION ONLY
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCertCourse(null)}
                className="bg-[#062B52] text-white px-6 py-2 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* OUTCOME UPDATE MODAL */}
      {/* ========================================================= */}
      {isOutcomeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#062B52]">Update Outcome Record</h3>
                <p className="text-xs text-slate-500">Provide your current employment & career status</p>
              </div>
              <button 
                onClick={() => setIsOutcomeModalOpen(false)} 
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveOutcome} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-2">
                  What is your current employment status?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Employed", "Self-employed", "Apprenticeship", "Looking for a job"].map((statusOpt) => (
                    <label 
                      key={statusOpt} 
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition ${
                        selectedStatus === statusOpt 
                          ? 'border-[#062B52] bg-slate-50 text-[#062B52] ring-1 ring-[#062B52]' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="outcomeStatus"
                        value={statusOpt}
                        checked={selectedStatus === statusOpt}
                        onChange={() => setSelectedStatus(statusOpt)}
                        className="text-[#062B52] focus:ring-[#062B52]"
                      />
                      <span>{statusOpt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedStatus === "Employed" && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Employer / Company Name</label>
                    <input 
                      type="text" 
                      value={employerName} 
                      onChange={(e) => setEmployerName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Job Role</label>
                      <input 
                        type="text" 
                        value={jobRole} 
                        onChange={(e) => setJobRole(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Salary (₹)</label>
                      <input 
                        type="number" 
                        value={currentSalary} 
                        onChange={(e) => setCurrentSalary(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOutcomeModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FOLLOW-UP COMPLETION MODAL */}
      {/* ========================================================= */}
      {activeFollowupId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-[#062B52]">Complete Follow-up Form</h3>
              <button onClick={() => setActiveFollowupId(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleSaveFollowup} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Are you still employed in your role?</label>
                <select 
                  value={fuStillInJob} 
                  onChange={(e) => setFuStillInJob(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                >
                  <option value="Yes">Yes — Still in same job</option>
                  <option value="Changed">Changed to better job</option>
                  <option value="No">No longer employed</option>
                </select>
              </div>

              {fuStillInJob !== "No" ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Employer</label>
                    <input 
                      type="text" 
                      value={fuEmployer} 
                      onChange={(e) => setFuEmployer(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Monthly Salary (₹)</label>
                    <input 
                      type="number" 
                      value={fuSalary} 
                      onChange={(e) => setFuSalary(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </>
              ) : (
                <div className="bg-rose-50 p-3 rounded-lg border border-rose-200 space-y-2">
                  <label className="block text-xs font-bold text-rose-900">Why did you leave your employment?</label>
                  <select 
                    value={fuAttritionReason} 
                    onChange={(e) => setFuAttritionReason(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-rose-300 bg-white"
                  >
                    <option value="Low salary">Low salary</option>
                    <option value="Skill mismatch">Skill mismatch</option>
                    <option value="Better opportunity">Better opportunity</option>
                    <option value="Location constraints">Location constraints</option>
                    <option value="Personal reasons">Personal reasons</option>
                  </select>
                </div>
              )}

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveFollowupId(null)}
                  className="px-3 py-2 text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#F2A900] hover:bg-amber-400 text-[#032447] px-5 py-2 rounded-lg font-bold text-xs shadow-xs"
                >
                  Submit Follow-up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
