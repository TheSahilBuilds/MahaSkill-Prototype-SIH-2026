// Benchmark Target Role Skill Requirements for MahaSkill Analysis Engine
// Labeled as: "Illustrative Industry Benchmark — Prototype Data"

export const SKILL_REQUIREMENTS_BENCHMARK = {
  "AI / ML Engineer": {
    roleTitle: "AI / ML Engineer",
    industry: "AI & Emerging Tech",
    avgSalary: "₹7.0 - ₹14.0 LPA",
    targetLocation: "Pune",
    requiredSkills: {
      "Python": 5,
      "Machine Learning": 5,
      "Data Structures": 4,
      "SQL": 3,
      "Git/GitHub": 3,
      "Cloud": 3,
      "Projects": 4,
      "Communication": 3
    },
    flowchartNodes: [
      { id: "n1", title: "Programming Basics", desc: "Python & Virtual Environments", time: "1-2 Weeks", key: "Python" },
      { id: "n2", title: "Python Data Stack", desc: "NumPy, Pandas & Data Manipulation", time: "2 Weeks", key: "Python" },
      { id: "n3", title: "Data Structures & Algorithms", desc: "Arrays, Trees & Problem Solving", time: "3 Weeks", key: "Data Structures" },
      { id: "n4", title: "SQL & Relational Databases", desc: "Data Queries & Aggregations", time: "2 Weeks", key: "SQL" },
      { id: "n5", title: "Git & Version Control", desc: "GitHub Workflow & Branching", time: "1 Week", key: "Git/GitHub" },
      { id: "n6", title: "Machine Learning Core", desc: "Supervised & Unsupervised Models", time: "3 Weeks", key: "Machine Learning" },
      { id: "n7", title: "Deep Learning & Neural Networks", desc: "CNNs, RNNs & PyTorch/TensorFlow", time: "3 Weeks", key: "Machine Learning" },
      { id: "n8", title: "Generative AI & LLMs", desc: "Transformers, RAG & LangChain", time: "2 Weeks", key: "Machine Learning" },
      { id: "n9", title: "Deployed AI Capstone Projects", desc: "FastAPI REST API & Docker Service", time: "3 Weeks", key: "Projects" },
      { id: "n10", title: "Cloud & MLOps", desc: "Model Serving & AWS/Azure Deployment", time: "2 Weeks", key: "Cloud" },
      { id: "n11", title: "Interview & Behavioral Prep", desc: "System Design & Technical Interviews", time: "1 Week", key: "Communication" }
    ]
  },

  "Software Developer": {
    roleTitle: "Software Developer",
    industry: "IT & Software",
    avgSalary: "₹5.5 - ₹10.0 LPA",
    targetLocation: "Pune",
    requiredSkills: {
      "Programming": 5,
      "Data Structures": 5,
      "Git/GitHub": 4,
      "Projects": 4,
      "SQL": 3,
      "Cloud": 3,
      "Communication": 3
    },
    flowchartNodes: [
      { id: "n1", title: "Programming Fundamentals", desc: "Control Flow, OOP & Logic", time: "2 Weeks", key: "Programming" },
      { id: "n2", title: "Data Structures & Algorithms", desc: "Arrays, Trees, Graphs & DP", time: "4 Weeks", key: "Data Structures" },
      { id: "n3", title: "Git & GitHub CLI", desc: "Version Control & Pull Requests", time: "1 Week", key: "Git/GitHub" },
      { id: "n4", title: "SQL & Databases", desc: "Relational Queries & Indexing", time: "2 Weeks", key: "SQL" },
      { id: "n5", title: "Web & API Architecture", desc: "REST Services & HTTP Methods", time: "2 Weeks", key: "Programming" },
      { id: "n6", title: "Full Stack Capstone Project", desc: "End-to-End Application Build", time: "3 Weeks", key: "Projects" },
      { id: "n7", title: "System Design Basics", desc: "Scalability, Caching & Load Balancers", time: "2 Weeks", key: "Cloud" },
      { id: "n8", title: "Technical Interview Practice", desc: "Mock Coding & Placement Drills", time: "1 Week", key: "Communication" }
    ]
  },

  "Data Scientist": {
    roleTitle: "Data Scientist",
    industry: "AI & Data",
    avgSalary: "₹6.5 - ₹13.0 LPA",
    targetLocation: "Mumbai",
    requiredSkills: {
      "Python": 5,
      "SQL": 4,
      "Statistics": 5,
      "Machine Learning": 4,
      "Data Structures": 3,
      "Git/GitHub": 3,
      "Projects": 4,
      "Communication": 3
    },
    flowchartNodes: [
      { id: "n1", title: "Python for Data Science", desc: "Data Manipulation & Scripting", time: "2 Weeks", key: "Python" },
      { id: "n2", title: "Statistics & Probability", desc: "Hypothesis Testing & A/B Experiments", time: "3 Weeks", key: "Statistics" },
      { id: "n3", title: "SQL Data Mining", desc: "Window Functions & Complex Aggregations", time: "2 Weeks", key: "SQL" },
      { id: "n4", title: "Predictive Machine Learning", desc: "Scikit-Learn Regression & Classification", time: "3 Weeks", key: "Machine Learning" },
      { id: "n5", title: "Data Visualization & Dashboards", desc: "Power BI, Tableau & Seaborn", time: "2 Weeks", key: "Projects" },
      { id: "n6", title: "Data Science Capstone", desc: "Real-world Analytics Project Showcase", time: "3 Weeks", key: "Projects" }
    ]
  },

  "Data Analyst": {
    roleTitle: "Data Analyst",
    industry: "AI & Data",
    avgSalary: "₹4.5 - ₹8.5 LPA",
    targetLocation: "Mumbai",
    requiredSkills: {
      "Python": 4,
      "SQL": 5,
      "Data Analysis": 5,
      "Statistics": 4,
      "Visualization": 4,
      "Git/GitHub": 2,
      "Communication": 4
    },
    flowchartNodes: [
      { id: "n1", title: "Excel Advanced & Business Analytics", desc: "Pivot Tables, VLOOKUP & Data Cleansing", time: "2 Weeks", key: "Data Analysis" },
      { id: "n2", title: "SQL Database Queries", desc: "Joins, Subqueries & Aggregations", time: "3 Weeks", key: "SQL" },
      { id: "n3", title: "Python for Data Analysis", desc: "Pandas DataFrames & Automation", time: "2 Weeks", key: "Python" },
      { id: "n4", title: "Power BI & Tableau Reporting", desc: "Interactive Dashboard Building", time: "2 Weeks", key: "Visualization" },
      { id: "n5", title: "Business Communication & Case Studies", desc: "Stakeholder Insights Presentation", time: "1 Week", key: "Communication" }
    ]
  },

  "Full Stack Developer": {
    roleTitle: "Full Stack Developer",
    industry: "IT & Software",
    avgSalary: "₹6.0 - ₹11.0 LPA",
    targetLocation: "Pune",
    requiredSkills: {
      "JavaScript": 5,
      "HTML/CSS": 5,
      "React": 4,
      "Backend": 4,
      "SQL": 4,
      "Git/GitHub": 4,
      "Projects": 4,
      "Communication": 3
    },
    flowchartNodes: [
      { id: "n1", title: "HTML, CSS & Modern JS", desc: "DOM Manipulation & ES6+ Syntax", time: "2 Weeks", key: "HTML/CSS" },
      { id: "n2", title: "React.js Frontend", desc: "Components, Hooks & State Management", time: "3 Weeks", key: "React" },
      { id: "n3", title: "Node.js / Express Backend", desc: "RESTful API Endpoints", time: "2 Weeks", key: "Backend" },
      { id: "n4", title: "SQL & NoSQL Databases", desc: "PostgreSQL & MongoDB Integrations", time: "2 Weeks", key: "SQL" },
      { id: "n5", title: "Git & CI/CD Deployment", desc: "Vercel, Render & GitHub Actions", time: "1 Week", key: "Git/GitHub" },
      { id: "n6", title: "Full Stack Capstone Web App", desc: "End-to-End Deployed Production App", time: "3 Weeks", key: "Projects" }
    ]
  },

  "Data Engineer": {
    roleTitle: "Data Engineer",
    industry: "Cloud & Infrastructure",
    avgSalary: "₹6.5 - ₹12.5 LPA",
    targetLocation: "Pune",
    requiredSkills: {
      "Python": 4,
      "SQL": 5,
      "Data Structures": 4,
      "Cloud": 4,
      "Git/GitHub": 4,
      "Data Engineering": 5,
      "Projects": 4
    },
    flowchartNodes: [
      { id: "n1", title: "Python & Data Warehousing", desc: "ETL Pipeline Fundamentals", time: "2 Weeks", key: "Python" },
      { id: "n2", title: "Advanced SQL & Database Indexing", desc: "Data Modeling & Query Optimization", time: "3 Weeks", key: "SQL" },
      { id: "n3", title: "Distributed Computing (Spark/Kafka)", desc: "Big Data Stream Processing", time: "3 Weeks", key: "Data Engineering" },
      { id: "n4", title: "Cloud Data Engineering (AWS Glue/S3)", desc: "Cloud Pipeline Automation", time: "2 Weeks", key: "Cloud" }
    ]
  },

  "Cybersecurity Engineer": {
    roleTitle: "Cybersecurity Engineer",
    industry: "Cybersecurity",
    avgSalary: "₹5.5 - ₹11.5 LPA",
    targetLocation: "Mumbai",
    requiredSkills: {
      "Networking": 5,
      "Linux": 4,
      "Cybersecurity": 5,
      "Python": 3,
      "Cloud": 4,
      "Git/GitHub": 3,
      "Projects": 4
    },
    flowchartNodes: [
      { id: "n1", title: "Network Architecture & Protocols", desc: "TCP/IP, Firewalls & Subnetting", time: "2 Weeks", key: "Networking" },
      { id: "n2", title: "Linux Security Administration", desc: "CLI Scripting & Access Controls", time: "2 Weeks", key: "Linux" },
      { id: "n3", title: "Ethical Hacking & Vulnerability Scan", desc: "Penetration Testing & SIEM Tools", time: "3 Weeks", key: "Cybersecurity" },
      { id: "n4", title: "Cloud Security & Zero Trust", desc: "AWS IAM & Security Audits", time: "2 Weeks", key: "Cloud" }
    ]
  },

  "Cloud Engineer": {
    roleTitle: "Cloud Engineer",
    industry: "Cloud & Infrastructure",
    avgSalary: "₹6.0 - ₹12.0 LPA",
    targetLocation: "Pune",
    requiredSkills: {
      "Linux": 4,
      "Networking": 4,
      "Cloud": 5,
      "Python": 3,
      "Git/GitHub": 4,
      "DevOps": 5,
      "Projects": 4
    },
    flowchartNodes: [
      { id: "n1", title: "Linux Administration", desc: "Shell Scripting & Server Config", time: "2 Weeks", key: "Linux" },
      { id: "n2", title: "AWS / Azure Cloud Architecture", desc: "EC2, S3, VPC & IAM Policies", time: "3 Weeks", key: "Cloud" },
      { id: "n3", title: "Docker & Kubernetes Containers", desc: "Container Orchestration", time: "3 Weeks", key: "DevOps" },
      { id: "n4", title: "CI/CD & Infrastructure as Code", desc: "GitHub Actions & Terraform", time: "2 Weeks", key: "DevOps" }
    ]
  }
};
