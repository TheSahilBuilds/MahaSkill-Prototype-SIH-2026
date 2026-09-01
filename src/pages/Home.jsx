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
  Compass
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

  const handleCheckSkillGap = () => {
    navigate('/login');
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* 1. HERO SECTION WITH 5-IMAGE CROSSFADE SLIDESHOW */}
      <section className="relative rounded-2xl overflow-hidden bg-white border border-[#D9E1EA] shadow-xs group min-h-[380px]">
        
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
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:via-white/50"></div>

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
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#062B52] leading-tight tracking-tight">
              {t('heroTitle1')} <br />
              <span className="text-[#F2A900]">{t('heroTitle2')}</span>
            </h1>

            <p className="text-[#52657A] text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              {t('heroDesc')}
            </p>

            <div className="flex flex-wrap gap-3.5 pt-1">
              <button
                onClick={handleCheckSkillGap}
                className="bg-[#062B52] hover:bg-[#0B3B70] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>{t('btnCheckGap')}</span>
                <ArrowRight className="w-4 h-4 text-[#F2A900]" />
              </button>
              
              <Link
                to="/industry-requirements"
                className="bg-white/90 backdrop-blur-xs hover:bg-slate-50 text-[#172B4D] border border-[#D9E1EA] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-2xs flex items-center gap-2"
              >
                <span>{t('btnExploreReq')}</span>
              </Link>
            </div>

          </div>

          {/* RIGHT HERO STATISTICS CARD */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/60 shadow-md space-y-2.5 max-w-xs ml-auto">
              
              <h3 className="font-bold text-xs sm:text-sm text-[#062B52] border-b border-slate-200/80 pb-1.5">
                {t('landscapeTitle')}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                
                <div className="p-2 bg-white/90 rounded-lg border border-slate-200/60 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#0B3B70]" />
                    <span className="text-base font-extrabold text-[#062B52] font-mono">12.5L+</span>
                  </div>
                  <div className="text-[10px] font-semibold text-[#52657A] leading-tight">{t('studentsAnalyzed')}</div>
                </div>

                <div className="p-2 bg-white/90 rounded-lg border border-slate-200/60 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#0B3B70]" />
                    <span className="text-base font-extrabold text-[#062B52] font-mono">2100+</span>
                  </div>
                  <div className="text-[10px] font-semibold text-[#52657A] leading-tight">{t('jobRolesCovered')}</div>
                </div>

                <div className="p-2 bg-white/90 rounded-lg border border-slate-200/60 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0B3B70]" />
                    <span className="text-base font-extrabold text-[#062B55] font-mono">850+</span>
                  </div>
                  <div className="text-[10px] font-semibold text-[#52657A] leading-tight">{t('industriesMapped')}</div>
                </div>

                <div className="p-2 bg-white/90 rounded-lg border border-slate-200/60 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#0B3B70]" />
                    <span className="text-base font-extrabold text-[#16A36A] font-mono">85%</span>
                  </div>
                  <div className="text-[10px] font-semibold text-[#52657A] leading-tight">{t('alignmentGoal')}</div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW MAHA SKILL WORKS */}
      <section className="space-y-6 text-center">
        <div>
          <div className="inline-block text-xs font-bold text-[#0B3B70] uppercase tracking-wider mb-1">
            — {language === 'mr' ? 'महास्किल कसे कार्य करते' : 'How MahaSkill Works'} —
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#062B52]">{t('howItWorksTitle')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {[
            {
              step: "01",
              title: t('step1Title'),
              desc: t('step1Desc'),
              icon: FileText
            },
            {
              step: "02",
              title: t('step2Title'),
              desc: t('step2Desc'),
              icon: BarChart2
            },
            {
              step: "03",
              title: t('step3Title'),
              desc: t('step3Desc'),
              icon: PieIcon
            },
            {
              step: "04",
              title: t('step4Title'),
              desc: t('step4Desc'),
              icon: Compass
            }
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.step} 
                onClick={handleCheckSkillGap}
                className="bg-white p-5 rounded-xl border border-[#D9E1EA] shadow-2xs hover:shadow-md transition space-y-3 relative flex flex-col justify-between cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold bg-[#062B52] text-white px-2 py-0.5 rounded">
                    {card.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#F5F7FA] text-[#0B3B70] flex items-center justify-center border border-slate-200">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#062B52] mb-1">{card.title}</h3>
                  <p className="text-xs text-[#52657A] leading-relaxed">{card.desc}</p>
                </div>

                <div className="pt-2 text-right">
                  <ChevronRight className="w-4 h-4 text-slate-300 inline" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DATA SECTION (THREE CARDS) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CARD 1: Top In-Demand Skills */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#062B52]">{t('topSkillsTitle')}</h3>
            <Link to="/industry-requirements" className="text-[11px] font-semibold text-[#0B3B70] hover:underline">
              {language === 'mr' ? 'सर्व पहा' : 'View All'}
            </Link>
          </div>

          <div className="space-y-3.5">
            {[
              { name: "Python", val: 82 },
              { name: "SQL", val: 76 },
              { name: "Cloud Computing", val: 68 },
              { name: "Data Analytics", val: 61 },
              { name: "Generative AI", val: 54 }
            ].map(skill => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-[#172B4D]">
                  <span>{skill.name}</span>
                  <span className="font-mono text-[#0B3B70]">{skill.val}%</span>
                </div>
                <div className="w-full bg-[#F5F7FA] rounded-full h-2 overflow-hidden border border-slate-200">
                  <div className="bg-[#062B52] h-full rounded-full" style={{ width: `${skill.val}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[10px] text-slate-400 font-mono">
            {language === 'mr' ? 'स्रोत: उद्योग डेटा विश्लेषण' : 'Source: Industry Data Analysis'}
          </div>
        </div>

        {/* CARD 2: Skill Gap Overview (Donut Chart) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#062B52]">{t('skillGapOverview')}</h3>
            <Link to="/skill-gap" className="text-[11px] font-semibold text-[#0B3B70] hover:underline">
              {language === 'mr' ? 'अहवाल पहा' : 'View Report'}
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
              <span className="text-2xl font-extrabold text-[#062B52]">29%</span>
              <span className="text-[10px] font-medium text-[#52657A]">
                {language === 'mr' ? 'सरासरी कौशल्य तफावत' : 'Average Skill Gap'}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-around text-xs font-semibold pt-1 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D92D20]"></span>
              <span className="text-slate-700">{language === 'mr' ? 'उच्च' : 'High'} <strong>32%</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2A900]"></span>
              <span className="text-slate-700">{language === 'mr' ? 'मध्यम' : 'Medium'} <strong>41%</strong></span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A]"></span>
              <span className="text-slate-700">{language === 'mr' ? 'कमी' : 'Low'} <strong>27%</strong></span>
            </span>
          </div>

          <div className="text-[11px] text-[#52657A] italic text-center">
            {language === 'mr' ? 'शिकत राहा. प्रगती करत राहा.' : 'Keep learning. Keep growing.'}
          </div>
        </div>

        {/* CARD 3: Maharashtra Focus */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#D9E1EA] shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-[#062B52]">{t('mahaFocus')}</h3>
            <span className="text-[11px] font-semibold text-[#0B3B70]">{language === 'mr' ? 'प्रमुख हब' : 'Key Clusters'}</span>
          </div>

          <div className="space-y-3">
            <div className="h-28 bg-[#F5F7FA] rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden p-2">
              <img 
                src="/image/maharashtra-map.png" 
                alt="Maharashtra Map" 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = '/image/maharashtra-map.webp';
                }}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="font-bold text-[#062B52]">{language === 'mr' ? 'पुणे' : 'Pune'}</span>
                <span className="text-[#52657A]">IT | AI | Automation</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="font-bold text-[#062B52]">{language === 'mr' ? 'मुंबई' : 'Mumbai'}</span>
                <span className="text-[#52657A]">Finance | Analytics | IT</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="font-bold text-[#062B52]">{language === 'mr' ? 'नागपूर' : 'Nagpur'}</span>
                <span className="text-[#52657A]">Logistics | IT Services</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#062B52]">{language === 'mr' ? 'नाशिक' : 'Nashik'}</span>
                <span className="text-[#52657A]">Manufacturing | Auto</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. FINAL CTA STRIP */}
      <section className="bg-[#062B52] text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/10 text-[#F2A900] flex items-center justify-center shrink-0">
            <GraduationCap className="w-[#F2A900] w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg">{t('ctaTitle')}</h3>
            <p className="text-slate-300 text-xs sm:text-sm">{t('ctaDesc')}</p>
          </div>
        </div>

        <button
          onClick={handleCheckSkillGap}
          className="bg-[#062B52] hover:bg-[#0B3B70] border border-[#F2A900] text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition shadow-xs flex items-center gap-2 shrink-0"
        >
          <span>{t('btnGetStarted')}</span>
          <ArrowRight className="w-4 h-4 text-[#F2A900]" />
        </button>
      </section>

    </div>
  );
}
