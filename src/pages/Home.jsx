import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Briefcase, 
  Building2, 
  Target, 
  ArrowRight, 
  GraduationCap, 
  ChevronRight,
  ChevronLeft,
  PieChart as PieIcon,
  FileText,
  BarChart2,
  Compass,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const HERO_SLIDES = [
  { id: 1, src: '/image/hero-slide-1.png', fallback: '/image/hero-fort.png', alt: 'Maharashtra Heritage & Skills' },
  { id: 2, src: '/image/hero-slide-2.png', fallback: '/image/hero-fort.png', alt: 'Maharashtra Skill Intelligence Hub' },
  { id: 3, src: '/image/hero-slide-3.png', fallback: '/image/hero-fort.png', alt: 'Maharashtra Industry Employment' },
  { id: 4, src: '/image/hero-slide-4.png', fallback: '/image/hero-fort.png', alt: 'Youth Skill Training' },
  { id: 5, src: '/image/hero-slide-5.png', fallback: '/image/hero-fort.png', alt: 'Future Ready Workforce' },
];

export default function Home() {
  const { user, t, language } = useApp();
  const navigate = useNavigate();

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play timer for hero image carousel (every 4.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const donutData = [
    { name: 'High Gap', value: 32, color: '#D92D20' },
    { name: 'Medium Gap', value: 41, color: '#F2A900' },
    { name: 'Low Gap', value: 27, color: '#16A36A' }
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* 1. HERO SECTION WITH 5-IMAGE CROSSFADE SLIDESHOW */}
      <section className="relative rounded-2xl overflow-hidden bg-white border border-[#D9E1EA] shadow-xs group min-h-[400px]">
        
        {/* Background 5-Slide Images on Right Half */}
        <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full z-0 overflow-hidden bg-slate-100">
          {HERO_SLIDES.map((slide, index) => (
            <img 
              key={slide.id}
              src={slide.src} 
              alt={slide.alt} 
              className={`
                absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out
                ${index === currentSlide ? 'opacity-85 scale-100' : 'opacity-0 scale-105'}
              `}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = slide.fallback;
              }}
            />
          ))}

          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:via-white/60"></div>

          {/* Slideshow Navigation Controls */}
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            <button 
              onClick={() => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="text-white hover:text-[#F2A900] transition p-0.5"
              title="Previous Slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 px-1">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${i === currentSlide ? 'w-4 bg-[#F2A900]' : 'w-1.5 bg-white/60 hover:bg-white'}
                  `}
                  title={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={() => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length)}
              className="text-white hover:text-[#F2A900] transition p-0.5"
              title="Next Slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="relative z-10 max-w-7xl mx-auto p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT HERO TEXT & CTA */}
          <div className="lg:col-span-8 space-y-5">
            
            <div className="inline-flex items-center gap-2 bg-[#062B52]/10 border border-[#062B52]/20 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-[#062B52]" />
              <span className="text-xs font-bold text-[#062B52]">
                {t('SIH 2026 Longitudinal Outcome Tracking')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#062B52] leading-tight tracking-tight">
              {t("From Skill Development to")} <br />
              <span className="text-[#F2A900]">{t("Real Outcomes")}</span>
            </h1>

            <p className="text-[#52657A] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              {t("Identify skill gaps, build the right skills, and track what happens after training — from employment and retention to wage progression.")}
            </p>

            <div className="flex flex-wrap gap-3.5 pt-1">
              <Link
                to="/login"
                className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>{t("Check My Skill Gap")}</span>
                <ArrowRight className="w-4 h-4 text-[#F2A900]" />
              </Link>
              
              <Link
                to="/my-dashboard"
                className="bg-white/90 backdrop-blur-xs hover:bg-slate-50 text-[#172B4D] border border-[#D9E1EA] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs flex items-center gap-2"
              >
                <span>{t("Explore Outcomes")}</span>
              </Link>
            </div>

            {/* SMALL SUPPORTING JOURNEY FLOW STRIP */}
            <div className="pt-2 text-[11px] font-bold text-[#062B52] flex flex-wrap items-center gap-1.5 opacity-90">
              <span className="bg-blue-50 text-[#062B52] px-2 py-0.5 rounded border border-blue-200">{t("Skill Gap")}</span>
              <span className="text-slate-400">→</span>
              <span className="bg-blue-50 text-[#062B52] px-2 py-0.5 rounded border border-blue-200">{t("Training")}</span>
              <span className="text-slate-400">→</span>
              <span className="bg-blue-50 text-[#062B52] px-2 py-0.5 rounded border border-blue-200">{t("Certificate")}</span>
              <span className="text-slate-400">→</span>
              <span className="bg-blue-50 text-[#062B52] px-2 py-0.5 rounded border border-blue-200">{t("Employment")}</span>
              <span className="text-slate-400">→</span>
              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">{t("Long-Term Outcomes")}</span>
            </div>

          </div>

          {/* RIGHT HERO STATISTICS CARD */}
          <div className="lg:col-span-4">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200/80 shadow-md space-y-3 max-w-xs ml-auto">
              
              <h3 className="font-bold text-xs sm:text-sm text-[#062B52] border-b border-slate-200/80 pb-1.5 flex items-center justify-between">
                <span>{t("Skilling Impact Metrics")}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-extrabold">{t("LIVE")}</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                
                <div className="p-2 bg-white rounded-lg border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#0B3B70]" />
                    <span className="text-base font-extrabold text-[#062B52]">25.4K</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">{t("Trainees Tracked")}</div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-base font-extrabold text-emerald-700">66.9%</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">{t("Placed Trainees")}</div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-base font-extrabold text-purple-700">58.4%</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">{t("6-Mo Retention")}</div>
                </div>

                <div className="p-2 bg-white rounded-lg border border-slate-200 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#062B52]" />
                    <span className="text-base font-extrabold text-[#062B52]">+39%</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500">{t("Avg Wage Growth")}</div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. CORE CONCEPT WORKFLOW: TRAINING -> OUTCOME -> FOLLOW-UP -> INSIGHT -> ACTION */}
      <section className="space-y-6 text-center">
        <div>
          <div className="inline-block text-xs font-bold text-[#0B3B70] uppercase tracking-wider mb-1">
            — {t("Outcome & Impact Workflow")} —
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062B52]">
            {t("Training → Outcome → Follow-up → Insight → Action")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-left">
          {[
            {
              step: "01",
              title: t("Training Record"),
              desc: t("Consent-based trainee record created with course, provider & certification status."),
              path: "/my-training"
            },
            {
              step: "02",
              title: t("Outcome Tracking"),
              desc: t("Capture employed, self-employed, apprenticeship, or job-seeking status."),
              path: "/my-training"
            },
            {
              step: "03",
              title: t("Follow-up System"),
              desc: t("Automated 30, 90, 180-day and 12-month follow-ups to measure wage & retention."),
              path: "/my-training"
            },
            {
              step: "04",
              title: t("Skill Insight"),
              desc: t("Identify skill gaps and reasons for non-placement or employment attrition."),
              path: "/skill-gap"
            },
            {
              step: "05",
              title: t("Personalized Action"),
              desc: t("Recommended upskilling roadmap for trainees and intervention for government."),
              path: "/roadmap"
            }
          ].map((card) => (
            <Link 
              key={card.step} 
              to={card.path}
              className="bg-white p-4 rounded-xl border border-[#D9E1EA] shadow-2xs hover:shadow-md transition space-y-2 relative flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold bg-[#062B52] text-[#F2A900] px-2 py-0.5 rounded">
                  {card.step}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#062B52] transition-colors" />
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#062B52]">{card.title}</h3>
                <p className="text-xs text-[#52657A] leading-snug mt-1">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. DATA SECTION (THREE CARDS) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CARD 1: Top In-Demand Skills */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#062B52]">{t("Top Trainee Skill Gaps")}</h3>
            <Link to="/skill-gap" className="text-[11px] font-semibold text-[#0B3B70] hover:underline">
              {t("View Skill Intelligence")}
            </Link>
          </div>

          <div className="space-y-3.5">
            {[
              { name: t("SQL & Query Optimization"), val: 82, gap: t("High Priority") },
              { name: t("Power BI & DAX Calculations"), val: 76, gap: t("High Priority") },
              { name: t("Python Data Structures"), val: 68, gap: t("Medium Priority") },
              { name: t("Git Collaborative Workflow"), val: 61, gap: t("Medium Priority") },
              { name: t("Cloud Deployment (AWS/Docker)"), val: 54, gap: t("High Priority") }
            ].map(skill => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#172B4D]">
                  <span>{skill.name}</span>
                  <span className="font-mono text-rose-700 font-bold">{skill.gap}</span>
                </div>
                <div className="w-full bg-[#F5F7FA] rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="bg-[#062B52] h-full rounded-full" style={{ width: `${skill.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10px] text-slate-400 font-mono">
            {t("Source: MahaSkill Deterministic Analysis Engine")}
          </div>
        </div>

        {/* CARD 2: Skill Gap Overview (Donut Chart) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#062B52]">{t("Trainee Outcome Alignment")}</h3>
            <Link to="/outcome-dashboard" className="text-[11px] font-semibold text-[#0B3B70] hover:underline">
              {t("Admin Analytics")}
            </Link>
          </div>

          {/* Donut Chart */}
          <div className="h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={66}
                  dataKey="value"
                  stroke="none"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-extrabold text-[#062B52]">66.9%</span>
              <span className="text-[10px] font-medium text-[#52657A]">
                {t("Employment Placement Rate")}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-around text-xs font-semibold pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A]"></span>
              <span className="text-slate-700">{t("Placed")} <strong>66.9%</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2A900]"></span>
              <span className="text-slate-700">{t("Self-Employed")} <strong>9.1%</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D92D20]"></span>
              <span className="text-slate-700">{t("Seeking")} <strong>24%</strong></span>
            </span>
          </div>

          <div className="text-[11px] text-[#52657A] italic text-center">
            {t("Longitudinal skilling outcome verification active.")}
          </div>
        </div>

        {/* CARD 3: Maharashtra District Performance */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#062B52]">{t("District Placement Leaderboard")}</h3>
            <Link to="/outcome-dashboard" className="text-[11px] font-semibold text-[#0B3B70] hover:underline">{t("Full District Map")}</Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-bold text-[#062B52]">Pune</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">78% {t("Placed")} (71.5% Retention)</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-bold text-[#062B52]">Mumbai City & Suburbs</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">75% {t("Placed")} (68.2% Retention)</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-bold text-[#062B52]">Thane</span>
              <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">70.9% {t("Placed")} (64.0% Retention)</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
              <span className="font-bold text-[#062B52]">Nashik</span>
              <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">64% {t("Placed")} (57.5% Retention)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#062B52]">Nagpur</span>
              <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">61% {t("Placed")} (54.8% Retention)</span>
            </div>
          </div>
        </div>

      </section>

      {/* 4. FINAL CTA STRIP */}
      <section className="bg-[#062B52] text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/10 text-[#F2A900] flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-[#F2A900]" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">{t("Ready to measure training outcomes & upskill?")}</h3>
            <p className="text-slate-300 text-xs sm:text-sm">{t("Update your training outcome status or view administrative analytics.")}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/my-training"
            className="bg-[#F2A900] hover:bg-amber-400 text-[#032447] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-xs flex items-center gap-2"
          >
            <span>{t("Update My Outcome")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
