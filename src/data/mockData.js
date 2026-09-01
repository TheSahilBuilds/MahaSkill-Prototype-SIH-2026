// Comprehensive realistic mock dataset for MahaSkill AI (SIH 2026 Prototype)

export const MARATHI_TRANSLATIONS = {
  // Navigation
  "Home": "मुख्य पृष्ठ",
  "Dashboard": "डॅशबोर्ड",
  "My Skills": "माझी कौशल्ये",
  "Skill Gap": "कौशल्य तफावत",
  "Roadmap": "करिअर रोडमॅप",
  "Industry Requirements": "उद्योग गरजा",
  "Career Opportunities": "नोकरीच्या संधी",
  "Resume Analyzer": "रेझ्युमे विश्लेषण",
  "Mock Interview": "मॉक मुलाखत",
  "Aptitude": "अ‍ॅप्टिट्यूड चाचणी",
  "Coding Practice": "कोडिंग सराव",
  "Placement Report": "प्लेसमेंट अहवाल",
  "State Analytics": "राज्य विश्लेषण",
  "History": "इतिहास",
  "Profile": "प्रोफाइल",
  "About Us": "आमच्याबद्दल",
  "Contact Us": "संपर्क",
  "AI Advisor": "एआय सल्लागार",
  "Demo Mode": "डेमो मोड",

  // Headings & Labels
  "Bridging Maharashtra's Skills with Tomorrow's Jobs": "महाराष्ट्राच्या कौशल्यांना उद्याच्या रोजगाराशी जोडणारा प्लॅटफॉर्म",
  "Skill Intelligence Platform": "कौशल्य बुद्धिमत्ता प्लॅटफॉर्म",
  "Check Your Skill Gap": "तुमची कौशल्य तफावत तपासा",
  "Explore Industry Demand": "उद्योग मागणी शोधा",
  "Skill Readiness": "कौशल्य तयारी",
  "Industry Alignment": "उद्योग सुसंगतता",
  "Priority Gaps": "प्राधान्य तफावत",
  "Career Match": "करिअर जुळवणी",
  "Good morning": "शुभ प्रभात",
  "Placement Readiness": "प्लेसमेंट तयारी",
  "Analyze Skill Gap": "कौशल्य विश्लेषण करा",
  "Download Report": "अहवाल डाउनलोड करा"
};

export const TARGET_ROLES = [
  {
    id: "software_dev",
    title: "Software Developer",
    industry: "Information Technology",
    avgSalary: "₹5.5 - ₹10 LPA",
    demandScore: 88,
    requiredSkills: [
      { name: "Python", requiredLevel: 8.5, priority: "High" },
      { name: "SQL", requiredLevel: 8.0, priority: "High" },
      { name: "Data Structures & Algorithms", requiredLevel: 8.0, priority: "High" },
      { name: "JavaScript", requiredLevel: 7.5, priority: "Medium" },
      { name: "React.js", requiredLevel: 7.0, priority: "Medium" },
      { name: "Git & GitHub", requiredLevel: 7.5, priority: "Medium" },
      { name: "Cloud Computing", requiredLevel: 7.0, priority: "High" },
      { name: "System Design", requiredLevel: 6.5, priority: "High" },
      { name: "REST APIs", requiredLevel: 7.5, priority: "Medium" }
    ]
  },
  {
    id: "data_analyst",
    title: "Data Analyst",
    industry: "Information Technology",
    avgSalary: "₹4.5 - ₹8.5 LPA",
    demandScore: 84,
    requiredSkills: [
      { name: "SQL", requiredLevel: 9.0, priority: "High" },
      { name: "Python", requiredLevel: 8.0, priority: "High" },
      { name: "Power BI / Tableau", requiredLevel: 8.5, priority: "High" },
      { name: "Statistics & Math", requiredLevel: 7.5, priority: "High" },
      { name: "Excel Advanced", requiredLevel: 9.0, priority: "Medium" },
      { name: "Data Warehousing", requiredLevel: 6.5, priority: "Medium" }
    ]
  },
  {
    id: "ml_engineer",
    title: "ML Engineer",
    industry: "AI & Emerging Tech",
    avgSalary: "₹7.0 - ₹14 LPA",
    demandScore: 92,
    requiredSkills: [
      { name: "Python", requiredLevel: 9.0, priority: "High" },
      { name: "Machine Learning", requiredLevel: 8.5, priority: "High" },
      { name: "Deep Learning", requiredLevel: 7.5, priority: "High" },
      { name: "SQL", requiredLevel: 7.5, priority: "Medium" },
      { name: "Data Structures & Algorithms", requiredLevel: 8.0, priority: "High" },
      { name: "MLOps & Cloud", requiredLevel: 7.0, priority: "High" }
    ]
  },
  {
    id: "cloud_engineer",
    title: "Cloud & DevOps Engineer",
    industry: "Information Technology",
    avgSalary: "₹6.0 - ₹12 LPA",
    demandScore: 89,
    requiredSkills: [
      { name: "Cloud Computing", requiredLevel: 9.0, priority: "High" },
      { name: "Docker", requiredLevel: 8.5, priority: "High" },
      { name: "Kubernetes", requiredLevel: 7.5, priority: "High" },
      { name: "Linux Administration", requiredLevel: 8.0, priority: "High" },
      { name: "Git & GitHub", requiredLevel: 8.5, priority: "Medium" },
      { name: "CI/CD Pipelines", requiredLevel: 8.0, priority: "High" }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    industry: "Information Technology",
    avgSalary: "₹5.5 - ₹11 LPA",
    demandScore: 81,
    requiredSkills: [
      { name: "Network Security", requiredLevel: 8.5, priority: "High" },
      { name: "Ethical Hacking", requiredLevel: 8.0, priority: "High" },
      { name: "Linux Administration", requiredLevel: 8.0, priority: "High" },
      { name: "SIEM Tools", requiredLevel: 7.5, priority: "Medium" },
      { name: "Python", requiredLevel: 6.5, priority: "Medium" }
    ]
  }
];

export const MAHARASHTRA_DISTRICTS = [
  "Pune",
  "Mumbai City",
  "Mumbai Suburban",
  "Nagpur",
  "Nashik",
  "Chhatrapati Sambhajinagar (Aurangabad)",
  "Thane",
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

export const MAHARASHTRA_INDUSTRIES = [
  "Information Technology",
  "AI & Emerging Tech",
  "FinTech & Banking",
  "Manufacturing & Automotive",
  "Healthcare & Biotech",
  "Logistics & Supply Chain",
  "Renewable Energy & EV"
];

export const DEFAULT_STUDENT_PROFILE = {
  name: "Sahil Bhole",
  email: "sahilbhole232@gcoe.com",
  phone: "+91 98765 43210",
  college: "Government College of Engineering (GCOE)",
  degree: "B.Tech",
  specialization: "Artificial Intelligence & Data Science",
  graduationYear: "2026",
  district: "Pune",
  targetRole: "AI/ML Engineer",
  targetIndustry: "AI & Emerging Tech",
  experienceLevel: "No professional experience",
  targetSalary: "₹7.5 LPA",
  workMode: "Hybrid / On-site",
  projectsCount: "2–3",
  learningHours: "5–10 hours/week",
  resumeUploaded: true,
  resumeScore: 80,
  atsScore: 84,
  interviewScore: 72,
  codingScore: 82,
  aptitudeScore: 76,
  learningStreak: 14,
  applicationsSent: 4
};

export const DEFAULT_STUDENT_SKILLS = [
  { id: "s1", name: "Python", rating: 8.0, userLevel5: 4, category: "Programming", demandLevel: "HIGH" },
  { id: "s2", name: "SQL", rating: 6.0, userLevel5: 3, category: "Database", demandLevel: "HIGH" },
  { id: "s3", name: "JavaScript", rating: 6.0, userLevel5: 3, category: "Frontend", demandLevel: "HIGH" },
  { id: "s4", name: "React", rating: 4.0, userLevel5: 2, category: "Frontend", demandLevel: "MEDIUM" },
  { id: "s5", name: "Machine Learning", rating: 6.0, userLevel5: 3, category: "AI & ML", demandLevel: "HIGH" },
  { id: "s6", name: "Git / GitHub", rating: 6.0, userLevel5: 3, category: "DevOps & Tools", demandLevel: "HIGH" }
];

export const TOP_DEMANDED_SKILLS_DATA = [
  { skill: "Python", demandScore: 82, postings: 12540, growth: "+18%", category: "Programming" },
  { skill: "SQL", demandScore: 76, postings: 10890, growth: "+14%", category: "Database" },
  { skill: "JavaScript", demandScore: 71, postings: 9450, growth: "+12%", category: "Web" },
  { skill: "Data Structures & Algorithms", demandScore: 64, postings: 8230, growth: "+15%", category: "Core CS" },
  { skill: "React.js", demandScore: 59, postings: 7560, growth: "+22%", category: "Frontend" },
  { skill: "Git & GitHub", demandScore: 54, postings: 6890, growth: "+10%", category: "Tools" },
  { skill: "Cloud Computing (AWS/Azure)", demandScore: 51, postings: 6230, growth: "+28%", category: "Cloud" },
  { skill: "Docker & Containers", demandScore: 45, postings: 5120, growth: "+31%", category: "DevOps" },
  { skill: "REST APIs", demandScore: 43, postings: 4980, growth: "+16%", category: "Backend" },
  { skill: "System Design", demandScore: 38, postings: 4210, growth: "+25%", category: "Architecture" }
];

export const EMERGING_SKILLS_DATA = [
  { name: "Generative AI & LLMs", growthRate: "+142%", demand: "Very High", domain: "AI" },
  { name: "Cloud Computing (AWS/Azure)", growthRate: "+38%", demand: "High", domain: "Cloud" },
  { name: "Cybersecurity & Zero Trust", growthRate: "+32%", demand: "High", domain: "Security" },
  { name: "Data Engineering (Spark/Kafka)", growthRate: "+29%", demand: "High", domain: "Data" },
  { name: "EV Battery Tech & Embedded Systems", growthRate: "+45%", demand: "High", domain: "Automotive" }
];

export const TOP_COMPANIES_HIRING = [
  { name: "Tata Consultancy Services (TCS)", locations: "Pune, Mumbai, Nagpur", openings: 3450 },
  { name: "Infosys", locations: "Pune, Nagpur", openings: 2800 },
  { name: "Accenture", locations: "Pune, Mumbai", openings: 2100 },
  { name: "Capgemini", locations: "Pune, Mumbai, Nashik", openings: 1950 },
  { name: "Persistent Systems", locations: "Pune, Nagpur", openings: 1420 },
  { name: "LTI Mindtree", locations: "Mumbai, Pune", openings: 1180 }
];

export const CAREER_JOBS = [
  {
    id: "job1",
    title: "Junior Software Engineer",
    company: "Persistent Systems",
    district: "Pune",
    experience: "Fresher (0-1 Yrs)",
    salary: "₹4.5 - ₹6.5 LPA",
    type: "Full Time",
    postedDate: "2 days ago",
    requiredSkills: ["Python", "SQL", "Data Structures & Algorithms", "Git & GitHub"],
    matchPercentage: 84
  },
  {
    id: "job2",
    title: "Graduate Engineer Trainee - Full Stack",
    company: "Tata Consultancy Services",
    district: "Pune",
    experience: "Fresher",
    salary: "₹4.0 - ₹7.0 LPA",
    type: "Full Time",
    postedDate: "1 day ago",
    requiredSkills: ["JavaScript", "React.js", "REST APIs", "SQL"],
    matchPercentage: 78
  },
  {
    id: "job3",
    title: "Data Analyst Associate",
    company: "Capgemini",
    district: "Mumbai",
    experience: "Fresher",
    salary: "₹4.2 - ₹6.8 LPA",
    type: "Hybrid",
    postedDate: "3 days ago",
    requiredSkills: ["SQL", "Python", "Power BI / Tableau"],
    matchPercentage: 72
  },
  {
    id: "job4",
    title: "Cloud Operations Associate",
    company: "Infosys",
    district: "Nagpur",
    experience: "0-2 Years",
    salary: "₹5.0 - ₹8.0 LPA",
    type: "Full Time",
    postedDate: "Just now",
    requiredSkills: ["Cloud Computing", "Linux Administration", "Git & GitHub"],
    matchPercentage: 65
  },
  {
    id: "job5",
    title: "Junior ML Engineer",
    company: "Accenture AI Labs",
    district: "Pune",
    experience: "0-2 Years",
    salary: "₹6.5 - ₹11.0 LPA",
    type: "Full Time",
    postedDate: "4 days ago",
    requiredSkills: ["Python", "Machine Learning", "Data Structures & Algorithms"],
    matchPercentage: 76
  }
];

export const DEFAULT_ROADMAP_PHASES = [
  {
    id: "phase1",
    phaseNumber: "PHASE 01",
    title: "Foundation & CS Fundamentals",
    duration: "Week 1-2",
    progress: 100,
    status: "Completed",
    skills: ["Programming Fundamentals", "Problem Solving", "Git & Version Control"],
    tasks: [
      { id: "t1", text: "Master Python data types, functions, and OOP concepts", completed: true },
      { id: "t2", text: "Learn Git CLI workflow, branching, and GitHub PRs", completed: true },
      { id: "t3", text: "Solve 10 basic algorithmic problem warmup challenges", completed: true }
    ]
  },
  {
    id: "phase2",
    phaseNumber: "PHASE 02",
    title: "Core Technical Skills & Data Structures",
    duration: "Week 3-5",
    progress: 60,
    status: "In Progress",
    skills: ["Data Structures & Algorithms", "SQL Databases", "OOP Principles"],
    tasks: [
      { id: "t4", text: "Implement Arrays, Linked Lists, Stacks, Queues in Python", completed: true },
      { id: "t5", text: "Master SQL Joins, Aggregations, Subqueries, and Indexing", completed: true },
      { id: "t6", text: "Practice Trees, Graphs, Dynamic Programming on Coding Sandbox", completed: false },
      { id: "t7", text: "Complete 20 LeetCode Easy/Medium DSA Questions", completed: false }
    ]
  },
  {
    id: "phase3",
    phaseNumber: "PHASE 03",
    title: "Industry Web & Cloud Stack",
    duration: "Week 6-8",
    progress: 25,
    status: "In Progress",
    skills: ["React.js", "REST APIs", "Cloud Fundamentals (AWS/Azure)"],
    tasks: [
      { id: "t8", text: "Build responsive React components with state management", completed: true },
      { id: "t9", text: "Create Python FastAPI / Node REST API microservices", completed: false },
      { id: "t10", text: "Deploy web service on AWS EC2 & S3 bucket", completed: false },
      { id: "t11", text: "Containerize application using Docker", completed: false }
    ]
  },
  {
    id: "phase4",
    phaseNumber: "PHASE 04",
    title: "Industry Capstone Projects",
    duration: "Week 9-10",
    progress: 0,
    status: "Pending",
    skills: ["Full Stack Engineering", "CI/CD Pipelines", "Portfolio Showcase"],
    tasks: [
      { id: "t12", text: "Develop real-world Maharashtra Skill Analytics dashboard app", completed: false },
      { id: "t13", text: "Set up GitHub Actions automated build & test pipeline", completed: false },
      { id: "t14", text: "Publish project live with custom documentation and demo video", completed: false }
    ]
  },
  {
    id: "phase5",
    phaseNumber: "PHASE 05",
    title: "Placement Readiness & Technical Interviews",
    duration: "Week 11-12",
    progress: 0,
    status: "Pending",
    skills: ["Aptitude Prep", "ATS Resume Polish", "Mock Technical & HR Interviews"],
    tasks: [
      { id: "t15", text: "Complete 3 AI Mock Technical Interviews for Software Developer role", completed: false },
      { id: "t16", text: "Achieve 85%+ score on TCS/Infosys placement aptitude test", completed: false },
      { id: "t17", text: "Polish ATS Resume score to 85+ using AI resume analyzer", completed: false }
    ]
  }
];

export const APTITUDE_QUESTIONS = [
  {
    id: 1,
    category: "Quantitative Aptitude",
    company: "TCS NQT",
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train in meters?",
    options: ["120 meters", "150 meters", "180 meters", "324 meters"],
    correctAnswer: 1,
    explanation: "Speed = 60 * (5/18) = 50/3 m/sec. Distance = Speed * Time = (50/3) * 9 = 150 meters."
  },
  {
    id: 2,
    category: "Logical Reasoning",
    company: "Infosys",
    question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
    options: ["1/3", "1/8", "2/8", "1/16"],
    correctAnswer: 1,
    explanation: "This is a geometric division series where each number is half of the previous number. (1/4) / 2 = 1/8."
  },
  {
    id: 3,
    category: "Verbal Ability",
    company: "Accenture",
    question: "Choose the word that is most nearly OPPOSITE in meaning to 'OBSTINATE':",
    options: ["Stubborn", "Flexible", "Rigid", "Dogmatic"],
    correctAnswer: 1,
    explanation: "'Obstinate' means stubborn or unyielding. The opposite is 'Flexible' or compliant."
  },
  {
    id: 4,
    category: "Data Interpretation",
    company: "Product Company",
    question: "If Company X produced 50,000 units in 2024 and production increased by 20% in 2025 and decreased by 10% in 2026, what is the 2026 production?",
    options: ["54,000 units", "55,000 units", "60,000 units", "52,000 units"],
    correctAnswer: 0,
    explanation: "2025 = 50,000 * 1.20 = 60,000. 2026 = 60,000 * 0.90 = 54,000 units."
  }
];

export const MOCK_INTERVIEW_BANK = [
  {
    id: 1,
    question: "Can you explain the difference between Process and Thread in operating systems, and how memory is shared?",
    type: "Technical",
    role: "Software Developer",
    timeLimit: 120,
    idealKeywords: ["memory space", "virtual memory", "stack", "heap", "context switching overhead", "lightweight"]
  },
  {
    id: 2,
    question: "How does indexing improve SQL query execution speed, and what are the trade-offs when inserting data?",
    type: "Technical",
    role: "Software Developer",
    timeLimit: 120,
    idealKeywords: ["B-Tree", "binary search", "read optimization", "insert/update overhead", "disk IO"]
  },
  {
    id: 3,
    question: "Tell me about a challenging technical project you built. What was your biggest architectural bottleneck and how did you resolve it?",
    type: "HR & Behavioral",
    role: "Software Developer",
    timeLimit: 180,
    idealKeywords: ["problem statement", "trade-off decision", "measurable result", "teamwork", "learnings"]
  }
];

export const CODING_PROBLEMS = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Data Structures & Algorithms",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    starterCode: {
      python: `def two_sum(nums, target):\n    # Write your solution here\n    hash_map = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in hash_map:\n            return [hash_map[diff], i]\n        hash_map[num] = i\n    return []\n\n# Test case\nprint(two_sum([2, 7, 11, 15], 9))`,
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) {\n            return [map.get(diff), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}\n\nconsole.log(twoSum([2, 7, 11, 15], 9));`
    },
    sampleInput: "[2, 7, 11, 15], target = 9",
    expectedOutput: "[0, 1]",
    executionTime: "1.2 ms"
  },
  {
    id: "sql-join",
    title: "Department Highest Salary",
    difficulty: "Medium",
    category: "SQL",
    description: "Write a SQL query to find employees who have the highest salary in each of the departments.",
    starterCode: {
      sql: `SELECT d.Name AS Department, e.Name AS Employee, e.Salary\nFROM Employee e\nJOIN Department d ON e.DepartmentId = d.Id\nWHERE (e.DepartmentId, e.Salary) IN (\n    SELECT DepartmentId, MAX(Salary)\n    FROM Employee\n    GROUP BY DepartmentId\n);`
    },
    sampleInput: "Employee & Department tables",
    expectedOutput: "3 rows returned",
    executionTime: "4.5 ms"
  }
];

export const STATE_ADMIN_ANALYTICS = {
  totalStudents: "1.2M+",
  studentsAnalyzed: "860,450",
  industryAligned: "68%",
  highGapPercentage: "42%",
  topEmergingSkills: ["AI / Generative ML", "Cloud Infrastructure", "Cybersecurity", "EV Automotive Tech"],
  districtReadiness: [
    { district: "Pune", totalStudents: 285000, readinessScore: 78, highGapPct: 34, topDemand: "Software Dev, AI, Cloud" },
    { district: "Mumbai City & Suburbs", totalStudents: 310000, readinessScore: 75, highGapPct: 37, topDemand: "FinTech, Data Analytics, Web" },
    { district: "Nagpur", totalStudents: 125000, readinessScore: 69, highGapPct: 44, topDemand: "Cloud, Java, Embedded" },
    { district: "Nashik", totalStudents: 98000, readinessScore: 65, highGapPct: 48, topDemand: "Manufacturing Tech, SQL, Python" },
    { district: "Chhatrapati Sambhajinagar", totalStudents: 74000, readinessScore: 61, highGapPct: 52, topDemand: "Auto Tech, IoT, QA" },
    { district: "Kolhapur", totalStudents: 68000, readinessScore: 59, highGapPct: 55, topDemand: "Foundry Tech, Web Dev" }
  ]
};

export const NOTIFICATIONS_DATA = [
  { id: 1, title: "Skill Gap Analysis Ready", desc: "Your skill gap for Software Developer in Pune has been updated.", time: "10 mins ago", read: false },
  { id: 2, title: "Industry Demand Alert", desc: "Cloud Computing demand increased by 28% in Maharashtra IT sector.", time: "2 hours ago", read: false },
  { id: 3, title: "Roadmap Progress Milestone", desc: "Congratulations! You completed Phase 01 (Foundation).", time: "Yesterday", read: true },
  { id: 4, title: "New Job Match Found", desc: "Persistent Systems posted Junior Software Engineer role matching 84% of your profile.", time: "2 days ago", read: true }
];

export const HISTORY_LOG_DATA = [
  { id: "h1", type: "Skill Gap Analysis", date: "01 Sep 2026", targetRole: "Software Developer", score: "68% Readiness", status: "Completed" },
  { id: "h2", type: "AI Mock Interview", date: "30 Aug 2026", targetRole: "Software Developer (Technical)", score: "69 / 100", status: "Evaluated" },
  { id: "h3", type: "Resume Analysis", date: "28 Aug 2026", targetRole: "Software Developer", score: "78 / 100 ATS", status: "Completed" },
  { id: "h4", type: "Coding Practice Test", date: "27 Aug 2026", targetRole: "DSA Two Sum & SQL", score: "100% Passed", status: "Passed" },
  { id: "h5", type: "Placement Aptitude Test", date: "26 Aug 2026", targetRole: "TCS Placement Mock", score: "72% Score", status: "Completed" }
];
