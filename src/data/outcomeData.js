// Outcome Tracking & Impact Measurement Data for MahaSkill AI (SIH 2026 Prototype)

export const DEFAULT_TRAINEE_RECORD = {
  traineeId: "MS-2026-8842",
  name: "Sahil Bhole",
  email: "sahilbhole232@gcoe.com",
  phone: "+91 98765 43210",
  college: "Government College of Engineering (GCOE)",
  district: "Pune",
  trainingProgramme: "Chief Minister's Skill Development Initiative (MSSDS)",
  course: "Data Analytics & Business Intelligence",
  trainingProvider: "MahaSkill Training Centre, Shivajinagar, Pune",
  trainingPeriod: "15 Oct 2025 – 15 Jan 2026 (3 Months)",
  attendance: "94%",
  assessmentScore: "88 / 100",
  certificationStatus: "Certified",
  trainingStatus: "Completed",
  hasConsented: true,
  consentDate: "15 Oct 2025"
};

export const DEFAULT_OUTCOME_STATE = {
  status: "Employed", // Employed, Self-employed, Apprenticeship, Looking for a job, Further education, Other
  // Employed details
  employerName: "Tata Consultancy Services (TCS)",
  jobRole: "Junior Data Analyst",
  joiningDate: "01 Feb 2026",
  startingSalary: 12000,
  currentSalary: 18000,
  location: "Pune (Hinjawadi)",
  isJobRelatedToTraining: "Yes",
  employmentType: "Full-Time",
  
  // Self-employed details
  businessSector: "IT Services & Data Consulting",
  startDate: "01 Feb 2026",
  monthlyIncome: 25000,
  
  // Apprenticeship details
  organization: "Persistent Systems",
  apprenticeRole: "Data Engineering Apprentice",
  apprenticeStatus: "Active",

  // Looking for job details
  lookingReason: "Seeking higher salary matching skill certification",
  primarySkillGap: "Advanced SQL & Power BI DAX",
  preferredLocation: "Pune / Remote",
  needsTrainingSupport: true,

  // Longitudinal Retention Progression
  retentionMilestones: [
    { period: "1 Month", status: "Verified", date: "01 Mar 2026", passed: true },
    { period: "3 Months", status: "Verified", date: "01 May 2026", passed: true },
    { period: "6 Months", status: "Verified", date: "01 Aug 2026", passed: true },
    { period: "12 Months", status: "Pending", date: "01 Feb 2027", passed: false }
  ]
};

export const DEFAULT_FOLLOWUP_TIMELINE = [
  {
    id: "fu-30",
    title: "30-Day Post Training Follow-up",
    period: "30 Days",
    dueDate: "15 Feb 2026",
    status: "Completed",
    completedDate: "16 Feb 2026",
    employmentStatus: "Employed",
    employer: "Tata Consultancy Services",
    salary: 12000,
    relevant: "Yes",
    satisfaction: "High"
  },
  {
    id: "fu-90",
    title: "90-Day Outcome Verification",
    period: "90 Days",
    dueDate: "15 Apr 2026",
    status: "Due",
    completedDate: null,
    employmentStatus: null,
    employer: null,
    salary: null,
    relevant: null
  },
  {
    id: "fu-180",
    title: "180-Day Progression Check",
    period: "180 Days",
    dueDate: "15 Jul 2026",
    status: "Upcoming",
    completedDate: null
  },
  {
    id: "fu-365",
    title: "1-Year Impact & Retention Assessment",
    period: "12 Months",
    dueDate: "15 Jan 2027",
    status: "Upcoming",
    completedDate: null
  }
];

export const ADMIN_OVERALL_KPIS = {
  totalTrainees: 25430,
  totalCertified: 21850,
  totalPlaced: 14620,
  employmentRate: "66.9%",
  sixMonthRetentionRate: "58.4%",
  avgStartingWage: "₹13,800/mo",
  avgCurrentWage: "₹19,200/mo",
  wageGrowth: "+39.1%",
  selfEmployedCount: 2310,
  apprenticeshipCount: 1840,
  lookingForJobCount: 4280,
  dataLabel: "Illustrative / Demo Data (MahaSkill Analytics Engine)"
};

export const COURSE_OUTCOME_ANALYSIS = [
  {
    id: "c1",
    courseName: "Data Analytics & Business Intelligence",
    enrolled: 1200,
    completed: 1050,
    certified: 980,
    placed: 690,
    placementRate: 70.4,
    retention6m: 520,
    retentionRate: 75.3,
    avgWage: "₹18,500/mo",
    topSkillGap: "Practical SQL & Power BI DAX",
    topNonPlacementReason: "Insufficient Practical Experience",
    recommendedAction: "Increase practical SQL & project-based internship training by 30 hours."
  },
  {
    id: "c2",
    courseName: "Full Stack Web Development (Python & React)",
    enrolled: 2400,
    completed: 2100,
    certified: 1950,
    placed: 1480,
    placementRate: 75.9,
    retention6m: 1180,
    retentionRate: 79.7,
    avgWage: "₹22,000/mo",
    topSkillGap: "Git Workflow & Cloud Deployment",
    topNonPlacementReason: "Skill mismatch with industry requirements",
    recommendedAction: "Mandate Docker & AWS deployment module before certification."
  },
  {
    id: "c3",
    courseName: "AI & Machine Learning Technician",
    enrolled: 950,
    completed: 810,
    certified: 760,
    placed: 490,
    placementRate: 64.5,
    retention6m: 380,
    retentionRate: 77.5,
    avgWage: "₹26,000/mo",
    topSkillGap: "MLOps & Model Deployment",
    topNonPlacementReason: "Salary expectation gap & Lack of hands-on model tuning",
    recommendedAction: "Add industry mentor-led hackathons and MLOps curriculum."
  },
  {
    id: "c4",
    courseName: "Industrial Automation & IoT Technician",
    enrolled: 1800,
    completed: 1600,
    certified: 1480,
    placed: 920,
    placementRate: 62.1,
    retention6m: 680,
    retentionRate: 73.9,
    avgWage: "₹16,000/mo",
    topSkillGap: "PLC Programming & SCADA Integration",
    topNonPlacementReason: "Location constraints (Relocation issues)",
    recommendedAction: "Partner with local MIDC manufacturing clusters in Chhatrapati Sambhajinagar & Nashik."
  },
  {
    id: "c5",
    courseName: "Solar & Renewable Energy Technician",
    enrolled: 1100,
    completed: 990,
    certified: 920,
    placed: 680,
    placementRate: 73.9,
    retention6m: 540,
    retentionRate: 79.4,
    avgWage: "₹15,500/mo",
    topSkillGap: "Grid Tie Inverter Operations",
    topNonPlacementReason: "Lack of certified apprenticeship seats",
    recommendedAction: "Expand apprenticeship partnerships with Maharashtra State Electricity Distribution Co."
  }
];

export const PROVIDER_PERFORMANCE_DATA = [
  {
    id: "p1",
    providerName: "MahaSkill Training Centre, Pune",
    district: "Pune",
    traineesTrained: 2150,
    completionRate: "92%",
    placementRate: "78.4%",
    retentionRate: "72.1%",
    avgWage: "₹21,500/mo",
    performanceTier: "High Performing"
  },
  {
    id: "p2",
    providerName: "Government Polytechnic & Skill Hub, Nashik",
    district: "Nashik",
    traineesTrained: 1840,
    completionRate: "88%",
    placementRate: "66.5%",
    retentionRate: "61.0%",
    avgWage: "₹17,200/mo",
    performanceTier: "Satisfactory"
  },
  {
    id: "p3",
    providerName: "Vidarbha Skill Excellence Academy, Nagpur",
    district: "Nagpur",
    traineesTrained: 1620,
    completionRate: "85%",
    placementRate: "63.8%",
    retentionRate: "58.5%",
    avgWage: "₹16,800/mo",
    performanceTier: "Needs Support"
  },
  {
    id: "p4",
    providerName: "Marathwada Technical Institute, Chhatrapati Sambhajinagar",
    district: "Chhatrapati Sambhajinagar",
    traineesTrained: 1290,
    completionRate: "83%",
    placementRate: "59.2%",
    retentionRate: "54.2%",
    avgWage: "₹15,400/mo",
    performanceTier: "Needs Intervention"
  },
  {
    id: "p5",
    providerName: "Konkan Maritime & Technical Skill Center, Thane",
    district: "Thane",
    traineesTrained: 1450,
    completionRate: "90%",
    placementRate: "74.1%",
    retentionRate: "68.4%",
    avgWage: "₹20,100/mo",
    performanceTier: "High Performing"
  }
];

export const DISTRICT_OUTCOME_ANALYTICS = [
  { district: "Pune", totalTrainees: 6450, certified: 5890, placed: 5030, placementRate: 78.0, retentionRate: 71.5, avgWage: "₹22,400" },
  { district: "Mumbai Suburban & City", totalTrainees: 7200, certified: 6410, placed: 5400, placementRate: 75.0, retentionRate: 68.2, avgWage: "₹23,800" },
  { district: "Thane", totalTrainees: 3100, certified: 2750, placed: 2200, placementRate: 70.9, retentionRate: 64.0, avgWage: "₹19,500" },
  { district: "Nashik", totalTrainees: 2800, certified: 2400, placed: 1792, placementRate: 64.0, retentionRate: 57.5, avgWage: "₹16,900" },
  { district: "Nagpur", totalTrainees: 2500, certified: 2150, placed: 1525, placementRate: 61.0, retentionRate: 54.8, avgWage: "₹16,200" },
  { district: "Chhatrapati Sambhajinagar", totalTrainees: 1900, certified: 1590, placed: 1083, placementRate: 57.0, retentionRate: 51.2, avgWage: "₹15,800" },
  { district: "Kolhapur", totalTrainees: 1480, certified: 1260, placed: 869, placementRate: 58.7, retentionRate: 53.0, avgWage: "₹15,500" }
];

export const NON_PLACEMENT_REASONS = [
  { reason: "Skill mismatch with employer criteria", percentage: 35, count: 2520, priority: "High", intervention: "Align curriculum with quarterly industry skill updates and certification criteria." },
  { reason: "Lack of practical experience / lab projects", percentage: 25, count: 1800, priority: "High", intervention: "Introduce 4-week mandatory capstone projects with industry partner labs." },
  { reason: "Location constraints (Relocation unwillingness)", percentage: 15, count: 1080, priority: "Medium", intervention: "Expand district-level local MSME hiring drives and remote work training." },
  { reason: "Salary expectations vs initial offer gap", percentage: 12, count: 864, priority: "Medium", intervention: "Conduct career counseling on initial wage growth trajectories and probation terms." },
  { reason: "Pursuing further higher education", percentage: 8, count: 576, priority: "Low", intervention: "Track as positive academic progression in longitudinal records." },
  { reason: "Other / Personal reasons", percentage: 5, count: 360, priority: "Low", intervention: "Provide helpline support for trainees needing delayed placement assistance." }
];

export const ATTRITION_REASONS = [
  { reason: "Low initial salary / uncompetitive compensation", percentage: 32, icon: "DollarSign" },
  { reason: "Skill mismatch & role dissatisfaction", percentage: 24, icon: "AlertTriangle" },
  { reason: "Better job opportunity elsewhere", percentage: 18, icon: "TrendingUp" },
  { reason: "Location & commuting difficulties", percentage: 12, icon: "MapPin" },
  { reason: "Personal or family obligations", percentage: 8, icon: "User" },
  { reason: "Further education or competitive exam prep", percentage: 6, icon: "BookOpen" }
];

export const AI_OUTCOME_KNOWLEDGE_BASE = [
  {
    keywords: ["placement low", "why low placement", "course placement"],
    adminAnswer: "Placement rate is lower in courses like 'AI & ML Technician' (64.5%) primarily due to a 35% skill mismatch in practical MLOps & Model Deployment, and 25% lack of practical project exposure. Recommended Intervention: Increase hands-on SQL & project labs by 30 hours.",
    traineeAnswer: "To boost your placement eligibility, focus on narrowing your top skill gaps: SQL (needs +40% boost) and Power BI DAX. Completing Phase 3 of your recommended roadmap will increase your placement match score to 85%+"
  },
  {
    keywords: ["district intervention", "which district", "pune", "nagpur", "nashik"],
    adminAnswer: "Chhatrapati Sambhajinagar (57% placement rate) and Nagpur (61%) require urgent intervention. Top bottleneck: Lack of local practical labs and industrial partnerships in automation & manufacturing.",
    traineeAnswer: "In Pune district, demand is highest for Junior Data Analysts and Software Engineers with starting wages around ₹18,000–₹22,000/mo."
  },
  {
    keywords: ["why leaving job", "attrition", "trainees leaving"],
    adminAnswer: "Primary reasons for trainee job attrition within 6 months: 32% report low starting salary expectations, 24% report skill mismatch with actual job duties, and 18% move to better opportunities. Recommended: Introduce post-placement 90-day wage mentorship.",
    traineeAnswer: "If you feel your current salary or job role doesn't match your training, updating your outcome follow-up triggers personalized upskilling roadmaps to unlock 35%+ wage growth."
  },
  {
    keywords: ["top skill gap", "skill gaps", "what skills"],
    adminAnswer: "Statewide Top Skill Gaps: 1. Practical SQL Querying & DAX (High), 2. Git/GitHub Collaborative Workflow (High), 3. Cloud Deployment (AWS/Docker) (Medium).",
    traineeAnswer: "Your current top skill gaps are SQL (40% vs 80% required) and Power BI (35% vs 75% required). Check your 'Skill Intelligence' tab for detailed recommendations."
  },
  {
    keywords: ["roadmap", "recommended upskilling", "courses"],
    adminAnswer: "Recommended curriculum interventions have been pushed to 4 training providers, emphasizing SQL, Docker, and practical industry internships.",
    traineeAnswer: "Your Recommended Upskilling Roadmap consists of 5 phases: Phase 1 (Foundation SQL), Phase 2 (Advanced SQL & Power BI), Phase 3 (Industry Capstone), Phase 4 (Placement Prep). Click 'Roadmap' in the top menu to get started!"
  }
];
