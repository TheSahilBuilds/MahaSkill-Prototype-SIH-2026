import React, { createContext, useContext, useState, useEffect } from 'react';
import { performSkillGapAnalysis } from '../utils/skillAnalysis';
import { TRANSLATIONS, MARATHI_DICTIONARY, MARATHI_DICTIONARY_LOWER } from '../data/translations';
import { 
  DEFAULT_TRAINEE_RECORD, 
  DEFAULT_OUTCOME_STATE, 
  DEFAULT_FOLLOWUP_TIMELINE 
} from '../data/outcomeData';

const AppContext = createContext();

const MOCK_DEFAULT_USER = {
  name: "Sahil Bhole",
  email: "sahilbhole232@gcoe.com",
  phone: "+91 98765 43210",
  college: "Government College of Engineering (GCOE)",
  degree: "Undergraduate",
  specialization: "Artificial Intelligence & Data Science",
  graduationYear: "2026",
  district: "Pune",
  targetRole: "Data Analyst",
  isLoggedIn: true
};

const DEFAULT_ENROLLED_COURSES = [
  {
    id: "c-sql",
    title: "Advanced SQL Querying & Optimization",
    category: "Data Analytics",
    duration: "4 Weeks",
    provider: "MahaSkill Training Centre, Pune",
    progress: 80,
    status: "In Progress",
    recommendedReason: "Large SQL skill gap for your target role (Data Analyst).",
    certificateId: "MSA-2026-8842",
    completionDate: "15 Jan 2026"
  },
  {
    id: "c-powerbi",
    title: "Power BI & Business Intelligence DAX",
    category: "Data Analytics",
    duration: "3 Weeks",
    provider: "MahaSkill Training Centre, Pune",
    progress: 0,
    status: "Not Started",
    recommendedReason: "Improves role-specific analytical reporting capability.",
    certificateId: null,
    completionDate: null
  },
  {
    id: "c-capstone",
    title: "Industry Capstone Analytics Project",
    category: "Practical Experience",
    duration: "4 Weeks",
    provider: "MahaSkill Training Centre, Pune",
    progress: 0,
    status: "Not Started",
    recommendedReason: "Build practical project experience for employer evaluation.",
    certificateId: null,
    completionDate: null
  }
];

export const AppProvider = ({ children }) => {
  // Active Role State ('trainee' | 'admin')
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('mahaSkillUserRole') || 'trainee';
  });

  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mahaSkillUser');
    return saved ? JSON.parse(saved) : MOCK_DEFAULT_USER;
  });

  // Enrolled Courses state
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('mahaSkillCourses');
    return saved ? JSON.parse(saved) : DEFAULT_ENROLLED_COURSES;
  });

  // Trainee Consent state
  const [hasConsented, setHasConsented] = useState(() => {
    const saved = localStorage.getItem('mahaSkillConsent');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Trainee Outcome state
  const [outcomeState, setOutcomeState] = useState(() => {
    const saved = localStorage.getItem('mahaSkillOutcome');
    return saved ? JSON.parse(saved) : DEFAULT_OUTCOME_STATE;
  });

  // Follow-up timeline state
  const [followupTimeline, setFollowupTimeline] = useState(() => {
    const saved = localStorage.getItem('mahaSkillFollowup');
    return saved ? JSON.parse(saved) : DEFAULT_FOLLOWUP_TIMELINE;
  });

  // Survey answers state
  const [surveyAnswers, setSurveyAnswers] = useState(() => {
    const saved = localStorage.getItem('mahaSkillSurvey');
    return saved ? JSON.parse(saved) : null;
  });

  // Skill analysis result state
  const [analysisResult, setAnalysisResult] = useState(() => {
    const saved = localStorage.getItem('mahaSkillAnalysis');
    if (saved) return JSON.parse(saved);

    return performSkillGapAnalysis({
      education: "Undergraduate",
      course: "Data Analytics & Business Intelligence",
      targetRole: "Data Analyst",
      progLanguages: ["Python", "SQL"],
      skillLevel: "Intermediate",
      dsaLevel: "Basic",
      dbLevel: "Intermediate",
      projectsCount: "1–2",
      gitLevel: "Basic",
      cloudLevel: "Beginner",
      aiLevel: "Beginner",
      commLevel: "Good"
    });
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('mahaSkillLang') || 'en';
  });

  // LocalStorage synchronizations
  useEffect(() => {
    localStorage.setItem('mahaSkillUserRole', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('mahaSkillUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mahaSkillConsent', JSON.stringify(hasConsented));
  }, [hasConsented]);

  useEffect(() => {
    localStorage.setItem('mahaSkillOutcome', JSON.stringify(outcomeState));
  }, [outcomeState]);

  useEffect(() => {
    localStorage.setItem('mahaSkillFollowup', JSON.stringify(followupTimeline));
  }, [followupTimeline]);

  useEffect(() => {
    if (surveyAnswers) {
      localStorage.setItem('mahaSkillSurvey', JSON.stringify(surveyAnswers));
    }
  }, [surveyAnswers]);

  useEffect(() => {
    if (analysisResult) {
      localStorage.setItem('mahaSkillAnalysis', JSON.stringify(analysisResult));
    }
  }, [analysisResult]);

  useEffect(() => {
    localStorage.setItem('mahaSkillLang', language);
  }, [language]);

  const loginUser = (email, name = "Sahil Bhole") => {
    const updated = {
      ...MOCK_DEFAULT_USER,
      name,
      email,
      isLoggedIn: true
    };
    setUser(updated);
  };

  const updateConsent = (consentBool) => {
    setHasConsented(consentBool);
  };

  useEffect(() => {
    localStorage.setItem('mahaSkillCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const updateCourseProgress = (courseId, newProgress) => {
    setEnrolledCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const isComp = newProgress >= 100;
        return {
          ...c,
          progress: Math.min(100, Math.max(0, newProgress)),
          status: isComp ? "Completed" : newProgress > 0 ? "In Progress" : "Not Started",
          certificateId: isComp ? (c.certificateId || `MSA-2026-${Math.floor(1000 + Math.random() * 9000)}`) : c.certificateId,
          completionDate: isComp ? (c.completionDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })) : c.completionDate
        };
      }
      return c;
    }));
  };

  const completeCourse = (courseId) => {
    updateCourseProgress(courseId, 100);
  };

  const updateOutcomeState = (newDetails) => {
    setOutcomeState(prev => {
      const updated = { ...prev, ...newDetails };
      
      // Update salary change percentage if salary changes
      if (newDetails.currentSalary && prev.startingSalary) {
        const growth = Math.round(((newDetails.currentSalary - prev.startingSalary) / prev.startingSalary) * 100);
        updated.wageGrowthPercentage = growth;
      }
      return updated;
    });
  };

  const completeFollowupItem = (followupId, followupAnswers) => {
    setFollowupTimeline(prev => 
      prev.map(item => {
        if (item.id === followupId) {
          return {
            ...item,
            status: "Completed",
            completedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            ...followupAnswers
          };
        }
        return item;
      })
    );

    // If followup contains outcome updates (e.g. current salary or employer), sync to outcomeState
    if (followupAnswers) {
      updateOutcomeState({
        status: followupAnswers.employmentStatus || outcomeState.status,
        employerName: followupAnswers.employer || outcomeState.employerName,
        currentSalary: followupAnswers.salary ? Number(followupAnswers.salary) : outcomeState.currentSalary,
        isJobRelatedToTraining: followupAnswers.relevant || outcomeState.isJobRelatedToTraining,
        attritionReason: followupAnswers.attritionReason || null
      });
    }
  };

  const submitSurveyData = (answers) => {
    setSurveyAnswers(answers);

    if (answers.consent !== undefined) {
      setHasConsented(Boolean(answers.consent));
    }

    setUser(prev => ({
      ...prev,
      name: answers.fullName || prev.name,
      targetRole: answers.targetRole || prev.targetRole,
      degree: answers.education || prev.degree,
      specialization: answers.course || prev.specialization,
      district: answers.district || prev.district
    }));

    const result = performSkillGapAnalysis(answers);
    setAnalysisResult(result);
  };

  const resetDemo = () => {
    if (window.confirm(language === 'mr' ? "तुम्ही महास्किल डेमो डेटा रीसेट करू इच्छिता?" : "Reset your MahaSkill demo data?")) {
      localStorage.removeItem('mahaSkillUserRole');
      localStorage.removeItem('mahaSkillUser');
      localStorage.removeItem('mahaSkillConsent');
      localStorage.removeItem('mahaSkillOutcome');
      localStorage.removeItem('mahaSkillFollowup');
      localStorage.removeItem('mahaSkillSurvey');
      localStorage.removeItem('mahaSkillAnalysis');
      localStorage.removeItem('mahaskill_profile');

      setUserRole('trainee');
      setUser(MOCK_DEFAULT_USER);
      setHasConsented(true);
      setOutcomeState(DEFAULT_OUTCOME_STATE);
      setFollowupTimeline(DEFAULT_FOLLOWUP_TIMELINE);
      setSurveyAnswers(null);
      setAnalysisResult(performSkillGapAnalysis({
        education: "Undergraduate",
        course: "Data Analytics & Business Intelligence",
        targetRole: "Data Analyst",
        progLanguages: ["Python", "SQL"],
        skillLevel: "Intermediate",
        dsaLevel: "Basic",
        dbLevel: "Intermediate",
        projectsCount: "1–2",
        gitLevel: "Basic",
        cloudLevel: "Beginner",
        aiLevel: "Beginner",
        commLevel: "Good"
      }));

      window.location.href = '/';
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'mr' : 'en');
  };

  const t = (keyOrText) => {
    if (keyOrText === null || keyOrText === undefined) return keyOrText;
    if (typeof keyOrText !== 'string') return keyOrText;

    if (language === 'mr') {
      // 1. Check TRANSLATIONS.mr[keyOrText]
      if (TRANSLATIONS.mr && TRANSLATIONS.mr[keyOrText]) {
        return TRANSLATIONS.mr[keyOrText];
      }

      // 2. Check MARATHI_DICTIONARY exact match
      if (MARATHI_DICTIONARY && MARATHI_DICTIONARY[keyOrText]) {
        return MARATHI_DICTIONARY[keyOrText];
      }

      // 3. Check trimmed string
      const trimmed = keyOrText.trim();
      if (MARATHI_DICTIONARY && MARATHI_DICTIONARY[trimmed]) {
        return MARATHI_DICTIONARY[trimmed];
      }

      // 4. Case-insensitive lookup
      const lower = trimmed.toLowerCase();
      if (MARATHI_DICTIONARY_LOWER && MARATHI_DICTIONARY_LOWER[lower]) {
        return MARATHI_DICTIONARY_LOWER[lower];
      }

      // 5. Fallback return keyOrText
      return keyOrText;
    }

    // English mode
    if (TRANSLATIONS.en && TRANSLATIONS.en[keyOrText]) {
      return TRANSLATIONS.en[keyOrText];
    }
    return keyOrText;
  };

  return (
    <AppContext.Provider value={{
      userRole,
      setUserRole,
      user,
      profile: user,
      traineeRecord: DEFAULT_TRAINEE_RECORD,
      hasConsented,
      updateConsent,
      outcomeState,
      updateOutcomeState,
      followupTimeline,
      completeFollowupItem,
      loginUser,
      surveyAnswers,
      analysisResult,
      enrolledCourses,
      updateCourseProgress,
      completeCourse,
      metrics: {
        industryAlignment: analysisResult?.skillAlignment || 68,
        skillGapCount: analysisResult?.skillGapCount || 4,
        skillBreakdown: []
      },
      submitSurveyData,
      resetDemo,
      language,
      toggleLanguage,
      t,
      openSurvey: () => { window.location.href = '/survey'; }
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
