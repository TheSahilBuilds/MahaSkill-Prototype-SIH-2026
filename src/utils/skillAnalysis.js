// Skill Analysis Calculation Engine for MahaSkill Prototype
import { SKILL_REQUIREMENTS_BENCHMARK } from '../data/skillRequirements';

// Converts string options to 1-5 numerical score
export function optionToScore(val) {
  if (!val) return 1;
  const lower = String(val).toLowerCase();

  if (lower.includes("advanced") || lower.includes("strong") || lower.includes("5+") || lower.includes("multiple")) return 5;
  if (lower.includes("intermediate") || lower.includes("good") || lower.includes("internship") || lower.includes("work experience")) return 4;
  if (lower.includes("basic") || lower.includes("academic") || lower.includes("1–2") || lower.includes("1-2")) return 3;
  if (lower.includes("beginner") || lower.includes("none") || lower.includes("no experience") || lower.includes("needs improvement")) return 1;
  return 2;
}

export function performSkillGapAnalysis(surveyAnswers) {
  const targetRole = surveyAnswers?.targetRole || "Data Analyst";
  const benchmark = SKILL_REQUIREMENTS_BENCHMARK[targetRole] || SKILL_REQUIREMENTS_BENCHMARK["Data Analyst"] || SKILL_REQUIREMENTS_BENCHMARK["Software Developer"];

  const currentSkills = surveyAnswers?.currentSkills || surveyAnswers?.progLanguages || ["Python", "SQL", "Excel"];
  const profMap = surveyAnswers?.skillProficiency || {};
  const skillsToImprove = surveyAnswers?.skillsToImprove || ["SQL", "Power BI"];
  const expVal = surveyAnswers?.practicalExperience || surveyAnswers?.projectsCount || "Academic projects";

  // Helper to resolve rating for a specific skill
  const getSkillRating = (skillName) => {
    // Check direct skill match in currentSkills
    const isPresent = currentSkills.some(s => s.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(s.toLowerCase()));
    
    if (isPresent) {
      // Find matching key in profMap
      const profKey = Object.keys(profMap).find(k => k.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(k.toLowerCase()));
      if (profKey && profMap[profKey]) {
        return optionToScore(profMap[profKey]);
      }
      return 4; // default intermediate if selected without explicit level
    }

    const isMarkedForImprovement = skillsToImprove.some(s => s.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(s.toLowerCase()));
    if (isMarkedForImprovement) {
      return 2; // Low score due to explicit gap
    }

    return 1; // Default beginner/missing
  };

  // Map survey answers to user skill ratings for benchmark evaluation
  const userSkillMap = {
    "Programming": Math.max(getSkillRating("Python"), getSkillRating("Java"), getSkillRating("JavaScript"), getSkillRating("C++")),
    "Python": getSkillRating("Python"),
    "JavaScript": getSkillRating("JavaScript"),
    "Data Structures": Math.max(getSkillRating("C++"), getSkillRating("Java"), getSkillRating("Python")),
    "SQL": getSkillRating("SQL"),
    "Git/GitHub": getSkillRating("Git"),
    "Cloud": getSkillRating("Cloud"),
    "Machine Learning": getSkillRating("Machine Learning"),
    "Data Analysis": Math.max(getSkillRating("Python"), getSkillRating("Excel"), getSkillRating("SQL")),
    "Statistics": Math.max(getSkillRating("Python"), getSkillRating("Excel")),
    "Visualization": Math.max(getSkillRating("Power BI"), getSkillRating("Excel")),
    "HTML/CSS": getSkillRating("HTML/CSS"),
    "React": getSkillRating("React"),
    "Backend": Math.max(getSkillRating("Java"), getSkillRating("Python"), getSkillRating("SQL")),
    "Networking": getSkillRating("Cloud"),
    "Linux": getSkillRating("Git"),
    "Cybersecurity": getSkillRating("Cloud"),
    "DevOps": Math.max(getSkillRating("Git"), getSkillRating("Cloud")),
    "Data Engineering": Math.max(getSkillRating("SQL"), getSkillRating("Python")),
    "Projects": optionToScore(expVal),
    "Communication": 4
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
  const careerReadiness = Math.min(100, Math.max(40, Math.round(skillAlignment * 0.85 + (userSkillMap["Projects"] * 3))));

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

    let status = "Not Started";
    if (userLvl >= reqLvl) {
      status = "Completed";
    } else if (userLvl >= reqLvl - 1) {
      status = "Current Focus";
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
    targetLocation: surveyAnswers?.district || benchmark.targetLocation || "Pune",
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
