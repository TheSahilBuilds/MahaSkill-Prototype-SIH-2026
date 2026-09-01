// Utility engine for dynamic skill gap, industry alignment, career match, and placement readiness calculations

import { TARGET_ROLES } from '../data/mockData';

export function calculateSkillMetrics(userSkills, targetRoleId = "software_dev") {
  const targetRole = TARGET_ROLES.find(r => r.id === targetRoleId) || TARGET_ROLES[0];
  
  if (!userSkills || userSkills.length === 0) {
    return {
      skillReadiness: 0,
      industryAlignment: 0,
      careerMatch: 0,
      overallPlacementReadiness: 0,
      skillGapCount: targetRole.requiredSkills.length,
      skillBreakdown: [],
      priorityGaps: []
    };
  }

  let totalWeightedAchieved = 0;
  let totalWeightedRequired = 0;
  let gapCount = 0;

  const skillBreakdown = targetRole.requiredSkills.map(req => {
    const userSkill = userSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase() || req.name.toLowerCase().includes(s.name.toLowerCase()));
    const currentRating = userSkill ? userSkill.rating : 0;
    const gap = Math.max(0, parseFloat((req.requiredLevel - currentRating).toFixed(1)));
    
    if (gap > 1.0) gapCount++;

    const weight = req.priority === "High" ? 1.5 : 1.0;
    totalWeightedAchieved += Math.min(currentRating, req.requiredLevel) * weight;
    totalWeightedRequired += req.requiredLevel * weight;

    let priorityTag = "Low";
    if (gap >= 3.0) priorityTag = "High";
    else if (gap >= 1.5) priorityTag = "Medium";

    return {
      skill: req.name,
      userRating: currentRating,
      requiredLevel: req.requiredLevel,
      gap: gap,
      priority: priorityTag,
      industryDemand: req.priority
    };
  });

  // Industry Alignment % (0-100)
  const industryAlignment = Math.min(98, Math.round((totalWeightedAchieved / (totalWeightedRequired || 1)) * 100));

  // Technical Skills Average % (0-100)
  const avgUserRating = userSkills.reduce((acc, curr) => acc + curr.rating, 0) / (userSkills.length || 1);
  const technicalSkillsScore = Math.min(100, Math.round((avgUserRating / 10) * 100));

  // Sort priority gaps
  const priorityGaps = [...skillBreakdown]
    .filter(s => s.gap > 0.5)
    .sort((a, b) => b.gap - a.gap);

  // Career Match % calculation against target role
  const matchRatio = skillBreakdown.filter(s => s.userRating >= s.requiredLevel * 0.7).length / (skillBreakdown.length || 1);
  const careerMatch = Math.min(96, Math.max(40, Math.round(matchRatio * 100)));

  return {
    technicalSkillsScore,
    industryAlignment,
    careerMatch,
    skillGapCount: gapCount,
    skillBreakdown,
    priorityGaps
  };
}

export function calculateOverallPlacementReadiness(metrics, profile) {
  const tech = metrics.technicalSkillsScore || 70;
  const align = metrics.industryAlignment || 68;
  const resume = profile.atsScore || 75;
  const interview = profile.interviewScore || 65;
  const coding = profile.codingScore || 75;
  const aptitude = profile.aptitudeScore || 70;

  const weightedScore = Math.round(
    (tech * 0.30) +
    (align * 0.25) +
    (resume * 0.15) +
    (interview * 0.12) +
    (coding * 0.10) +
    (aptitude * 0.08)
  );

  return Math.min(99, Math.max(30, weightedScore));
}
