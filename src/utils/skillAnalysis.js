// Skill Analysis Calculation Engine for MahaSkill Prototype
import { SKILL_REQUIREMENTS_BENCHMARK } from '../data/skillRequirements';

// Converts string options to 1-5 numerical score
export function optionToScore(val) {
  if (!val) return 1;
  const lower = String(val).toLowerCase();

  if (lower.includes("advanced") || lower.includes("strong") || lower.includes("5+")) return 5;
  if (lower.includes("intermediate") || lower.includes("good") || lower.includes("3–5") || lower.includes("3-5")) return 4;
  if (lower.includes("basic") || lower.includes("1–2") || lower.includes("1-2")) return 2;
  if (lower.includes("beginner") || lower.includes("none") || lower.includes("no experience") || lower.includes("needs improvement")) return 1;
  return 2;
}

export function performSkillGapAnalysis(surveyAnswers) {
  const targetRole = surveyAnswers?.targetRole || "Software Developer";
  const benchmark = SKILL_REQUIREMENTS_BENCHMARK[targetRole] || SKILL_REQUIREMENTS_BENCHMARK["Software Developer"];

  // Map 14-Question survey answers to user skill ratings
  const userSkillMap = {
    "Programming": optionToScore(surveyAnswers?.skillLevel),
    "Python": surveyAnswers?.progLanguages?.includes("Python") ? optionToScore(surveyAnswers?.skillLevel) : 1,
    "JavaScript": surveyAnswers?.progLanguages?.includes("JavaScript") ? optionToScore(surveyAnswers?.skillLevel) : 1,
    "Data Structures": optionToScore(surveyAnswers?.dsaLevel),
    "SQL": optionToScore(surveyAnswers?.dbLevel),
    "Git/GitHub": optionToScore(surveyAnswers?.gitLevel),
    "Cloud": optionToScore(surveyAnswers?.cloudLevel),
    "Machine Learning": optionToScore(surveyAnswers?.aiLevel),
    "Data Analysis": optionToScore(surveyAnswers?.dbLevel),
    "Statistics": optionToScore(surveyAnswers?.dsaLevel),
    "Visualization": optionToScore(surveyAnswers?.dbLevel),
    "HTML/CSS": surveyAnswers?.progLanguages?.includes("HTML/CSS") ? 4 : 1,
    "React": surveyAnswers?.progLanguages?.includes("JavaScript") ? optionToScore(surveyAnswers?.skillLevel) : 1,
    "Backend": optionToScore(surveyAnswers?.dbLevel),
    "Networking": optionToScore(surveyAnswers?.cloudLevel),
    "Linux": optionToScore(surveyAnswers?.gitLevel),
    "Cybersecurity": optionToScore(surveyAnswers?.aiLevel),
    "DevOps": optionToScore(surveyAnswers?.cloudLevel),
    "Data Engineering": optionToScore(surveyAnswers?.dbLevel),
    "Projects": optionToScore(surveyAnswers?.projectsCount),
    "Communication": optionToScore(surveyAnswers?.commLevel)
  };

  const reqSkills = benchmark.requiredSkills;
  const strongSkills = [];
  const highPriorityGaps = [];
  const mediumPriorityGaps = [];
  let totalBenchmarkScore = 0;
  let totalUserScore = 0;
  let gapCount = 0;

  Object.entries(reqSkills).forEach(([skillName, requiredLevel]) => {
    const userRating = userSkillMap[skillName] || 1;
    const gap = Math.max(0, requiredLevel - userRating);

    totalBenchmarkScore += requiredLevel;
    totalUserScore += Math.min(userRating, requiredLevel);

    if (gap === 0 || userRating >= requiredLevel) {
      strongSkills.push({ skill: skillName, userRating, requiredLevel });
    } else if (gap >= 2) {
      gapCount++;
      highPriorityGaps.push({ skill: skillName, userRating, requiredLevel, gap });
    } else {
      gapCount++;
      mediumPriorityGaps.push({ skill: skillName, userRating, requiredLevel, gap });
    }
  });

  const skillAlignment = Math.min(100, Math.max(35, Math.round((totalUserScore / totalBenchmarkScore) * 100)));
  const careerReadiness = Math.min(100, Math.max(40, Math.round(skillAlignment * 0.9 + (userSkillMap["Projects"] * 2.5))));

  // Prioritized recommended next skills
  const recommendedSkills = [
    ...highPriorityGaps.map(g => ({ ...g, priority: "High Priority" })),
    ...mediumPriorityGaps.map(g => ({ ...g, priority: "Medium Priority" }))
  ];

  // Flowchart Node Status Calculation
  const evaluatedFlowchart = benchmark.flowchartNodes.map((node) => {
    const reqKey = node.key || "Programming";
    const userLvl = userSkillMap[reqKey] || 1;
    const reqLvl = reqSkills[reqKey] || 4;

    let status = "Not Started"; // ○ Not started
    if (userLvl >= reqLvl) {
      status = "Completed"; // ✓ Completed / Strong
    } else if (userLvl >= reqLvl - 1) {
      status = "Current Focus"; // → Current focus
    }

    return {
      ...node,
      status,
      userLevel: userLvl,
      targetLevel: reqLvl,
      gap: Math.max(0, reqLvl - userLvl)
    };
  });

  return {
    targetRole,
    targetLocation: benchmark.targetLocation,
    industry: benchmark.industry,
    careerReadiness,
    skillAlignment,
    skillGapCount: gapCount,
    strongSkills,
    highPriorityGaps,
    mediumPriorityGaps,
    recommendedSkills,
    flowchartNodes: evaluatedFlowchart,
    userSkillMap
  };
}
