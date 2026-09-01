import React, { createContext, useContext, useState, useEffect } from 'react';
import { performSkillGapAnalysis } from '../utils/skillAnalysis';
import { TRANSLATIONS } from '../data/translations';

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
  targetRole: "Software Developer",
  isLoggedIn: true
};

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mahaSkillUser');
    return saved ? JSON.parse(saved) : MOCK_DEFAULT_USER;
  });

  // Survey answers state
  const [surveyAnswers, setSurveyAnswers] = useState(() => {
    const saved = localStorage.getItem('mahaSkillSurvey');
    return saved ? JSON.parse(saved) : null;
  });

  // Analysis result state
  const [analysisResult, setAnalysisResult] = useState(() => {
    const saved = localStorage.getItem('mahaSkillAnalysis');
    if (saved) return JSON.parse(saved);

    // Initial default analysis for Sahil Bhole (Software Developer)
    return performSkillGapAnalysis({
      education: "Undergraduate",
      course: "Artificial Intelligence & Data Science",
      targetRole: "Software Developer",
      progLanguages: ["Python", "JavaScript", "SQL"],
      skillLevel: "Intermediate",
      dsaLevel: "Basic",
      dbLevel: "Basic",
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

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('mahaSkillUser', JSON.stringify(user));
  }, [user]);

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

  const submitSurveyData = (answers) => {
    setSurveyAnswers(answers);

    setUser(prev => ({
      ...prev,
      targetRole: answers.targetRole,
      degree: answers.education,
      specialization: answers.course
    }));

    const result = performSkillGapAnalysis(answers);
    setAnalysisResult(result);
  };

  const resetDemo = () => {
    if (window.confirm(language === 'mr' ? "तुम्ही महास्किल डेमो डेटा रीसेट करू इच्छिता?" : "Reset your MahaSkill demo data?")) {
      localStorage.removeItem('mahaSkillUser');
      localStorage.removeItem('mahaSkillSurvey');
      localStorage.removeItem('mahaSkillAnalysis');
      localStorage.removeItem('mahaskill_profile');

      setUser(MOCK_DEFAULT_USER);
      setSurveyAnswers(null);
      setAnalysisResult(performSkillGapAnalysis({
        education: "Undergraduate",
        course: "Artificial Intelligence & Data Science",
        targetRole: "Software Developer",
        progLanguages: ["Python", "JavaScript", "SQL"],
        skillLevel: "Intermediate",
        dsaLevel: "Basic",
        dbLevel: "Basic",
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

  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <AppContext.Provider value={{
      user,
      profile: user,
      loginUser,
      surveyAnswers,
      analysisResult,
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
