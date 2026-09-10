import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ADMIN_OVERALL_KPIS, 
  COURSE_OUTCOME_ANALYSIS, 
  PROVIDER_PERFORMANCE_DATA, 
  DISTRICT_OUTCOME_ANALYTICS, 
  NON_PLACEMENT_REASONS, 
  ATTRITION_REASONS 
} from '../data/outcomeData';
import { 
  BarChart3, 
  Filter, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  PieChart,
  Target,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Layers
} from 'lucide-react';

export default function OutcomeDashboard() {
  const { language } = useApp();

  // Collapsible Filters Drawer State (COLLAPSED BY DEFAULT)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');

  // Explore Analytics Dropdown State (DEFAULT = EMPTY STRING "")
  const [selectedAnalysisView, setSelectedAnalysisView] = useState('');
  
  // Specific view controls
  const [showDetailedDistrictTable, setShowDetailedDistrictTable] = useState(false);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState('Data Analytics & Business Intelligence');
  const [selectedDistrictDetail, setSelectedDistrictDetail] = useState('Pune');

  // Filter options lists
  const districtList = ['All', 'Pune', 'Mumbai Suburban & City', 'Thane', 'Nashik', 'Nagpur', 'Chhatrapati Sambhajinagar', 'Kolhapur'];
  const courseList = ['All', 'Data Analytics & Business Intelligence', 'Full Stack Web Development (Python & React)', 'AI & Machine Learning Technician', 'Industrial Automation & IoT Technician', 'Solar & Renewable Energy Technician'];
  const providerList = ['All', 'MahaSkill Training Centre, Pune', 'Government Polytechnic & Skill Hub, Nashik', 'Vidarbha Skill Excellence Academy, Nagpur', 'Marathwada Technical Institute, Chhatrapati Sambhajinagar', 'Konkan Maritime & Technical Skill Center, Thane'];

  // Calculate filtered metrics reactively
  const filteredMetrics = useMemo(() => {
    let multiplier = 1.0;
    
    if (selectedDistrict !== 'All') multiplier *= 0.85;
    if (selectedCourse !== 'All') multiplier *= 0.75;
    if (selectedProvider !== 'All') multiplier *= 0.65;
    if (selectedGender !== 'All') multiplier *= 0.50;
    if (selectedAgeGroup !== 'All') multiplier *= 0.40;

    const baseTrainees = Math.round(ADMIN_OVERALL_KPIS.totalTrainees * multiplier);
    const baseCertified = Math.round(ADMIN_OVERALL_KPIS.totalCertified * multiplier);
    const basePlaced = Math.round(ADMIN_OVERALL_KPIS.totalPlaced * multiplier);
    
    const placementRate = baseCertified > 0 ? ((basePlaced / baseCertified) * 100).toFixed(1) : "66.9";
    const retentionRate = (Number(placementRate) * 0.87).toFixed(1);

    return {
      totalTrainees: baseTrainees.toLocaleString('en-IN'),
      totalCertified: baseCertified.toLocaleString('en-IN'),
      totalPlaced: basePlaced.toLocaleString('en-IN'),
      placementRate: `${placementRate}%`,
      retentionRate: `${retentionRate}%`,
      avgWage: selectedDistrict === 'Pune' ? '₹22,400/mo' : selectedDistrict === 'Nashik' ? '₹16,900/mo' : '₹19,200/mo'
    };
  }, [selectedDistrict, selectedCourse, selectedProvider, selectedGender, selectedAgeGroup]);

  // Filtered provider list
  const filteredProviders = useMemo(() => {
    if (selectedProvider === 'All' && selectedDistrict === 'All') return PROVIDER_PERFORMANCE_DATA;
    return PROVIDER_PERFORMANCE_DATA.filter(p => {
      const matchP = selectedProvider === 'All' || p.providerName === selectedProvider;
      const matchD = selectedDistrict === 'All' || p.district === selectedDistrict;
      return matchP && matchD;
    });
  }, [selectedProvider, selectedDistrict]);

  // Reset filters
  const resetFilters = () => {
    setSelectedDistrict('All');
    setSelectedCourse('All');
    setSelectedProvider('All');
    setSelectedYear('2025-2026');
    setSelectedGender('All');
    setSelectedAgeGroup('All');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* 1. HEADER / PAGE TITLE */}
      <div className="bg-[#032447] text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2A900]/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#F2A900] text-[#032447] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded tracking-wide">
                GOVERNMENT OF MAHARASHTRA • PROGRAMME ANALYTICS
              </span>
              <span className="bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700">
                SIH 2026 Skilling Outcomes
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
              Skilling Outcomes & Impact
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              How effectively are training programmes translating into employment and sustainable livelihood outcomes?
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl shrink-0 text-right">
            <div className="text-[10px] font-bold uppercase text-[#F2A900] tracking-wider">Data Credibility</div>
            <div className="text-xs font-bold text-white mt-0.5">Prototype Dataset • Illustrative Data</div>
            <div className="text-[10px] text-slate-400 mt-0.5">MahaSkill Analytics Workflow</div>
          </div>
        </div>
      </div>

      {/* 2. COMPACT FILTERS (COLLAPSED BY DEFAULT) */}
      <div className="bg-white rounded-2xl border border-[#D9E1EA] shadow-2xs overflow-hidden">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full p-3.5 px-5 flex items-center justify-between hover:bg-slate-50 transition text-left"
        >
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-[#062B52]" />
            <span className="font-bold text-xs sm:text-sm text-[#062B52]">⚙ Filters</span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              District: <span className="font-bold text-slate-700">{selectedDistrict}</span> • Course: <span className="font-bold text-slate-700">{selectedCourse}</span> • FY: <span className="font-bold text-slate-700">{selectedYear}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(selectedDistrict !== 'All' || selectedCourse !== 'All' || selectedProvider !== 'All' || selectedGender !== 'All' || selectedAgeGroup !== 'All') && (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                Filtered
              </span>
            )}
            <span className="text-xs text-[#062B52] font-bold flex items-center gap-1">
              {isFilterOpen ? '[Collapse]' : '[Expand]'}
              {isFilterOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </span>
          </div>
        </button>

        {isFilterOpen && (
          <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#062B52] bg-white font-semibold"
                >
                  {districtList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#062B52] bg-white font-semibold truncate"
                >
                  {courseList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Training Provider</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#062B52] bg-white font-semibold truncate"
                >
                  {providerList.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Financial Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#062B52] bg-white font-semibold"
                >
                  <option value="2025-2026">2025 - 2026</option>
                  <option value="2024-2025">2024 - 2025</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Gender</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#062B52] bg-white font-semibold"
                >
                  <option value="All">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Age Group</label>
                <select
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#062B52] bg-white font-semibold"
                >
                  <option value="All">All Ages</option>
                  <option value="18-21">18 - 21 Yrs</option>
                  <option value="22-25">22 - 25 Yrs</option>
                  <option value="26-30">26 - 30 Yrs</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-1 border-t border-slate-200">
              <span className="text-[11px] text-slate-400 italic">Prototype Dataset • Illustrative Data</span>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-slate-500 hover:text-[#062B52] underline"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. KPI SUMMARY (6 COMPACT CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Trainees</div>
          <div className="text-xl font-black text-[#062B52] mt-0.5">{filteredMetrics.totalTrainees}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Certified</div>
          <div className="text-xl font-black text-[#062B52] mt-0.5">{filteredMetrics.totalCertified}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Placed / Employed</div>
          <div className="text-xl font-black text-emerald-700 mt-0.5">{filteredMetrics.totalPlaced}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Placement Rate</div>
          <div className="text-xl font-black text-blue-700 mt-0.5">{filteredMetrics.placementRate}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">6-Month Retention</div>
          <div className="text-xl font-black text-purple-700 mt-0.5">{filteredMetrics.retentionRate}</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Monthly Wage</div>
          <div className="text-xl font-black text-[#062B52] mt-0.5">{filteredMetrics.avgWage}</div>
        </div>

      </div>

      {/* 4. ONE KEY INSIGHT CARD */}
      <div className="bg-gradient-to-r from-[#062B52] to-[#0B3B70] text-white p-5 rounded-2xl shadow-xs border border-[#062B52]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F2A900] text-[#032447] flex items-center justify-center font-bold shrink-0 mt-0.5">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-[#F2A900]/20 text-[#F2A900] px-2 py-0.5 rounded border border-[#F2A900]/30">
              KEY INSIGHT
            </span>
            <h3 className="text-base font-extrabold mt-1 text-white">
              Skill mismatch is currently the leading non-placement factor.
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              35% of identified non-placement cases stem from curriculum mismatch with active role requirements.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 text-xs shrink-0 max-w-xs">
          <span className="font-bold text-[#F2A900] block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Recommended Action:
          </span>
          <p className="text-slate-200 text-[11px] mt-0.5 leading-snug">
            Strengthen practical, role-specific training modules across high-demand course streams.
          </p>
        </div>
      </div>

      {/* 5. EXPLORE ANALYTICS DROPDOWN SELECTOR */}
      <div className="bg-white rounded-2xl border border-[#D9E1EA] p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="block text-xs font-extrabold text-[#062B52] uppercase tracking-wider mb-0.5">
              Explore Analytics ▼
            </label>
            <p className="text-xs text-slate-500">
              Select an analysis to explore detailed outcomes. Only the selected view will be displayed below.
            </p>
          </div>

          <div className="w-full sm:w-80">
            <select
              value={selectedAnalysisView}
              onChange={(e) => setSelectedAnalysisView(e.target.value)}
              className="w-full p-2.5 rounded-xl border-2 border-[#062B52] bg-white font-extrabold text-xs text-[#062B52] focus:ring-2 focus:ring-[#F2A900] shadow-2xs"
            >
              <option value="">Select an analysis</option>

              <optgroup label="OUTCOMES">
                <option value="placement_employment">Placement & Employment</option>
                <option value="retention_attrition">Retention & Attrition</option>
                <option value="wage_progression">Wage Progression</option>
                <option value="training_relevance">Training Relevance</option>
              </optgroup>

              <optgroup label="PROGRAMME PERFORMANCE">
                <option value="course_outcomes">Course Outcomes</option>
                <option value="provider_performance">Training Provider Performance</option>
                <option value="cohort_analysis">Cohort Analysis</option>
              </optgroup>

              <optgroup label="REGIONAL & DEMOGRAPHIC">
                <option value="district_performance">District Performance</option>
                <option value="demographic_outcomes">Demographic Outcomes</option>
              </optgroup>

              <optgroup label="SKILL INTELLIGENCE">
                <option value="skill_gaps">Skill Gaps</option>
                <option value="non_placement_reasons">Non-Placement Reasons</option>
                <option value="recommended_interventions">Recommended Interventions</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. DETAILED ANALYTICS AREA (EMPTY BY DEFAULT UNTIL DROPDOWN IS SELECTED)   */}
      {/* ========================================================================= */}

      {/* DEFAULT EMPTY STATE WHEN NO ANALYSIS IS SELECTED */}
      {selectedAnalysisView === '' && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center space-y-2 shadow-2xs">
          <BarChart3 className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-extrabold text-sm text-[#062B52]">Select an analysis above to explore detailed outcomes.</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Choose an option from the "Explore Analytics" dropdown to examine specific outcome metrics, course trends, provider accountability, or district performance.
          </p>
        </div>
      )}

      {/* VIEW 1: PLACEMENT & EMPLOYMENT */}
      {selectedAnalysisView === 'placement_employment' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Placement & Employment Outcomes</h2>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
              Outcome Breakdown
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block">Wage Employed</span>
              <span className="text-xl font-black text-emerald-700 mt-1 block">57.5%</span>
              <span className="text-[10px] text-slate-500">14,620 Trainees</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block">Self-Employed</span>
              <span className="text-xl font-black text-purple-700 mt-1 block">9.4%</span>
              <span className="text-[10px] text-slate-500">2,310 Enterprise</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block">Apprenticeship</span>
              <span className="text-xl font-black text-amber-700 mt-1 block">7.2%</span>
              <span className="text-[10px] text-slate-500">1,840 Candidates</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block">Job Seeking</span>
              <span className="text-xl font-black text-rose-700 mt-1 block">16.8%</span>
              <span className="text-[10px] text-slate-500">4,280 Seekers</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-medium block">Higher Education</span>
              <span className="text-xl font-black text-slate-700 mt-1 block">9.1%</span>
              <span className="text-[10px] text-slate-500">2,380 Academic</span>
            </div>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Wage employment and self-employment account for 66.9% of certified trainees, with wage employment highest in Pune and Mumbai industrial hubs.
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Expand apprenticeship tie-ups with regional MIDC industrial clusters to convert job-seeking cohorts into active placements.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: RETENTION & ATTRITION */}
      {selectedAnalysisView === 'retention_attrition' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Retention & Attrition Analysis</h2>
            </div>
            <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded">
              6-Month Retention: 58.4%
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-xs text-[#062B52] uppercase tracking-wider">
                Longitudinal Retention Progression Timeline
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-emerald-100 text-emerald-900 p-2.5 rounded-lg border border-emerald-300">
                  <div className="font-bold">1 Month</div>
                  <div className="font-extrabold mt-0.5">✓ 89.2%</div>
                </div>
                <div className="bg-emerald-100 text-emerald-900 p-2.5 rounded-lg border border-emerald-300">
                  <div className="font-bold">3 Months</div>
                  <div className="font-extrabold mt-0.5">✓ 74.5%</div>
                </div>
                <div className="bg-purple-100 text-purple-900 p-2.5 rounded-lg border border-purple-300">
                  <div className="font-bold">6 Months</div>
                  <div className="font-extrabold mt-0.5">✓ 58.4%</div>
                </div>
                <div className="bg-slate-100 text-slate-500 p-2.5 rounded-lg border border-slate-300">
                  <div className="font-bold">12 Months</div>
                  <div className="font-medium mt-0.5">Pending</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-xs text-rose-800 uppercase tracking-wider">
                Top Attrition Factors (within 6 Months)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {ATTRITION_REASONS.map((att, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2 px-3 rounded border border-slate-200">
                    <span className="font-medium text-slate-700">{att.reason}</span>
                    <span className="font-bold text-rose-700">{att.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Compensation dissatisfaction (32%) and role mismatch (24%) are major attrition drivers within the first 6 months of employment.
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Introduce structured post-placement follow-ups and career progression support at 30 and 90 days.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: WAGE PROGRESSION */}
      {selectedAnalysisView === 'wage_progression' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Wage Progression Timeline</h2>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
              Prototype Dataset • Illustrative Data
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">Starting Wage</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">₹13,800/mo</span>
              <span className="text-[10px] text-slate-400">Baseline Offer</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">3 Months</span>
              <span className="text-xl font-black text-[#062B52] mt-1 block">₹15,500/mo</span>
              <span className="text-[10px] text-emerald-600">+12.3% Growth</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block">6 Months</span>
              <span className="text-xl font-black text-[#062B52] mt-1 block">₹17,800/mo</span>
              <span className="text-[10px] text-emerald-600">+28.9% Growth</span>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300">
              <span className="text-xs text-emerald-800 font-medium block">12 Months</span>
              <span className="text-xl font-black text-emerald-800 mt-1 block">₹19,200/mo</span>
              <span className="text-[10px] font-bold text-emerald-700">+39.1% Growth</span>
            </div>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Trainees who remain in employment achieve an average wage growth of +39.1% over 12 months (₹13,800 to ₹19,200/month).
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Establish employer wage benchmarks to align starting compensation with technical certification levels.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: TRAINING RELEVANCE */}
      {selectedAnalysisView === 'training_relevance' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Training Relevance Verification</h2>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
              Trainee Verified Alignment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <span className="text-emerald-800 font-bold block">Direct Alignment</span>
              <span className="text-2xl font-black text-emerald-700 mt-1 block">72.0%</span>
              <span className="text-slate-600 mt-1 block">Job duties directly match course curriculum.</span>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <span className="text-amber-800 font-bold block">Partial Alignment</span>
              <span className="text-2xl font-black text-amber-700 mt-1 block">18.0%</span>
              <span className="text-slate-600 mt-1 block">Uses basic skills but role differs from specialization.</span>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
              <span className="text-rose-800 font-bold block">Unrelated Role</span>
              <span className="text-2xl font-black text-rose-700 mt-1 block">10.0%</span>
              <span className="text-slate-600 mt-1 block">Employed in non-technical or unrelated sector.</span>
            </div>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              72% of placed trainees report direct relevance between training and daily job duties, while 10% take non-aligned jobs due to regional constraints.
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Update non-aligned course curricula in consultation with regional employer councils.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: COURSE OUTCOMES */}
      {selectedAnalysisView === 'course_outcomes' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Course Outcome Analysis</h2>
            </div>

            {/* Single Course Selector Dropdown */}
            <div className="w-full sm:w-72">
              <select
                value={selectedCourseDetail}
                onChange={(e) => setSelectedCourseDetail(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-[#062B52]"
              >
                {COURSE_OUTCOME_ANALYSIS.map(c => (
                  <option key={c.id} value={c.courseName}>{c.courseName}</option>
                ))}
              </select>
            </div>
          </div>

          {(() => {
            const courseData = COURSE_OUTCOME_ANALYSIS.find(c => c.courseName === selectedCourseDetail) || COURSE_OUTCOME_ANALYSIS[0];
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Enrolled:</span>
                    <span className="font-bold text-slate-800 text-sm">{courseData.enrolled.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Certified:</span>
                    <span className="font-bold text-slate-800 text-sm">{courseData.certified.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Placed:</span>
                    <span className="font-bold text-emerald-700 text-sm">{courseData.placed.toLocaleString('en-IN')} ({courseData.placementRate}%)</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Retention:</span>
                    <span className="font-bold text-purple-700 text-sm">{courseData.retentionRate}%</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Avg Wage:</span>
                    <span className="font-bold text-[#062B52] text-sm">{courseData.avgWage}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-rose-50 p-3.5 rounded-lg border border-rose-200">
                    <span className="font-bold text-rose-900 block">Top Skill Gap:</span>
                    <span className="text-rose-800 font-medium">{courseData.topSkillGap}</span>
                  </div>
                  <div className="bg-amber-50 p-3.5 rounded-lg border border-amber-200">
                    <span className="font-bold text-amber-900 block">Top Non-Placement Reason:</span>
                    <span className="text-amber-800 font-medium">{courseData.topNonPlacementReason}</span>
                  </div>
                </div>

                <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <div className="font-bold text-[#062B52] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" /> Recommended Action:
                  </div>
                  <p className="text-slate-700 font-medium">{courseData.recommendedAction}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW 6: TRAINING PROVIDER PERFORMANCE */}
      {selectedAnalysisView === 'provider_performance' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Training Provider Performance</h2>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded border border-slate-300">
              No Consumer Star Ratings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-[#062B52] font-extrabold border-b border-slate-200">
                  <th className="p-3">Training Provider</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Completion Rate</th>
                  <th className="p-3">Placement Rate</th>
                  <th className="p-3">Retention Rate</th>
                  <th className="p-3">Avg Monthly Wage</th>
                  <th className="p-3">Performance Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProviders.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition font-medium">
                    <td className="p-3 font-bold text-[#062B52]">{p.providerName}</td>
                    <td className="p-3 text-slate-600">{p.district}</td>
                    <td className="p-3 text-slate-700 font-bold">{p.completionRate}</td>
                    <td className="p-3 text-emerald-700 font-bold">{p.placementRate}</td>
                    <td className="p-3 text-purple-700 font-bold">{p.retentionRate}</td>
                    <td className="p-3 font-bold text-[#062B52]">{p.avgWage}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        p.performanceTier === 'High Performing' ? 'bg-emerald-100 text-emerald-800' :
                        p.performanceTier === 'Satisfactory' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {p.performanceTier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Polytechnics demonstrate high course completion (88%+) but require empanelment with placement partners to elevate placement rates.
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Empanel industry placement partners for regional polytechnics and skill hubs.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: COHORT ANALYSIS */}
      {selectedAnalysisView === 'cohort_analysis' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Cohort Analysis</h2>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
              Quarterly Trends
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block font-bold">FY24-25 Q3 Cohort</span>
              <span className="text-sm font-black text-slate-800 mt-1 block">61.5% Placement</span>
              <span className="text-[10px] text-slate-500">54.0% 6-Mo Retention</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block font-bold">FY24-25 Q4 Cohort</span>
              <span className="text-sm font-black text-slate-800 mt-1 block">63.8% Placement</span>
              <span className="text-[10px] text-slate-500">56.2% 6-Mo Retention</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-slate-500 block font-bold">FY25-26 Q1 Cohort</span>
              <span className="text-sm font-black text-slate-800 mt-1 block">65.2% Placement</span>
              <span className="text-[10px] text-slate-500">57.8% 6-Mo Retention</span>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-lg border border-emerald-300">
              <span className="text-emerald-900 block font-bold">FY25-26 Q2 Cohort</span>
              <span className="text-sm font-black text-emerald-800 mt-1 block">66.9% Placement</span>
              <span className="text-[10px] font-bold text-emerald-700">58.4% 6-Mo Retention</span>
            </div>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Placement rate increased by +5.4% across consecutive quarterly cohorts due to curriculum updates implemented in Q1.
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Standardize practical curriculum updates across all state training centers on a bi-annual schedule.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 8: DISTRICT PERFORMANCE */}
      {selectedAnalysisView === 'district_performance' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">District Performance</h2>
            </div>

            {/* Single District Selector */}
            <div className="w-full sm:w-64">
              <select
                value={selectedDistrictDetail}
                onChange={(e) => setSelectedDistrictDetail(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-[#062B52]"
              >
                {DISTRICT_OUTCOME_ANALYTICS.map(d => (
                  <option key={d.district} value={d.district}>{d.district}</option>
                ))}
              </select>
            </div>
          </div>

          {(() => {
            const districtData = DISTRICT_OUTCOME_ANALYTICS.find(d => d.district === selectedDistrictDetail) || DISTRICT_OUTCOME_ANALYTICS[0];
            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Total Trainees:</span>
                    <span className="font-bold text-slate-800 text-sm">{districtData.totalTrainees.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Placement Rate:</span>
                    <span className="font-bold text-emerald-700 text-sm">{districtData.placementRate}%</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">6-Mo Retention:</span>
                    <span className="font-bold text-purple-700 text-sm">{districtData.retentionRate}%</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500 block">Avg Monthly Wage:</span>
                    <span className="font-bold text-[#062B52] text-sm">{districtData.avgWage}</span>
                  </div>
                </div>

                {/* Collapsible Detailed District Table Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setShowDetailedDistrictTable(!showDetailedDistrictTable)}
                    className="text-xs font-bold text-[#062B52] hover:underline flex items-center gap-1"
                  >
                    <span>{showDetailedDistrictTable ? 'Hide Detailed District Table ▲' : 'View Detailed District Table ▼'}</span>
                  </button>

                  {showDetailedDistrictTable && (
                    <div className="overflow-x-auto pt-3 animate-fadeIn">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-100 text-[#062B52] font-extrabold border-b border-slate-200">
                            <th className="p-3">District</th>
                            <th className="p-3">Total Trainees</th>
                            <th className="p-3">Certified</th>
                            <th className="p-3">Placed</th>
                            <th className="p-3">Placement Rate</th>
                            <th className="p-3">6-Mo Retention</th>
                            <th className="p-3">Avg Monthly Wage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {DISTRICT_OUTCOME_ANALYTICS.map((d, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition font-medium">
                              <td className="p-3 font-bold text-[#062B52]">{d.district}</td>
                              <td className="p-3 text-slate-700">{d.totalTrainees.toLocaleString('en-IN')}</td>
                              <td className="p-3 text-slate-700">{d.certified.toLocaleString('en-IN')}</td>
                              <td className="p-3 text-emerald-700 font-bold">{d.placed.toLocaleString('en-IN')}</td>
                              <td className="p-3 font-bold text-emerald-800">{d.placementRate}%</td>
                              <td className="p-3 text-purple-700 font-bold">{d.retentionRate}%</td>
                              <td className="p-3 font-bold text-[#062B52]">{d.avgWage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Pune and Mumbai lead in placement rates while Tier-2 districts face local hiring bottlenecks.
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Target additional employer partnerships and local MSME skill drives in Nashik, Nagpur, and Chhatrapati Sambhajinagar.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 9: DEMOGRAPHIC OUTCOMES */}
      {selectedAnalysisView === 'demographic_outcomes' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Demographic Outcomes</h2>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-300">
              Aggregated data shown for privacy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-xs text-[#062B52]">Placement by Gender</h3>
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Male Candidates (62% of total)</span>
                  <span className="font-bold text-emerald-700">68.2%</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Female Candidates (38% of total)</span>
                  <span className="font-bold text-emerald-700">64.5%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-xs text-[#062B52]">Placement by Age Group</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium"><span>18 – 21 Yrs</span><span className="font-bold">62.0%</span></div>
                <div className="flex justify-between font-medium"><span>22 – 25 Yrs</span><span className="font-bold text-emerald-700">71.4%</span></div>
                <div className="flex justify-between font-medium"><span>26 – 30 Yrs</span><span className="font-bold">65.8%</span></div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              22–25 age group shows highest placement readiness (71.4%), while 18–21 cohorts require additional soft-skills preparation.
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Introduce targeted workplace communication modules for 18–21 entry cohorts.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 10: SKILL GAPS */}
      {selectedAnalysisView === 'skill_gaps' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-[#062B52]" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Skill Gaps</h2>
            </div>
            <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded">
              Associated with Non-Placement
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-[#062B52] font-extrabold border-b border-slate-200">
                  <th className="p-3">Skill Competency</th>
                  <th className="p-3">Current Avg Level</th>
                  <th className="p-3">Required Level</th>
                  <th className="p-3">Gap Index</th>
                  <th className="p-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 font-medium">
                  <td className="p-3 font-bold text-[#062B52]">Practical SQL & DAX</td>
                  <td className="p-3 text-slate-600">Level 2 (Basic)</td>
                  <td className="p-3 text-slate-800">Level 4 (Advanced)</td>
                  <td className="p-3 font-bold text-rose-700">-2.0 (82% non-placed)</td>
                  <td className="p-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold text-[10px]">HIGH</span></td>
                </tr>
                <tr className="hover:bg-slate-50 font-medium">
                  <td className="p-3 font-bold text-[#062B52]">Cloud Deployment (AWS/Docker)</td>
                  <td className="p-3 text-slate-600">Level 1 (Beginner)</td>
                  <td className="p-3 text-slate-800">Level 3 (Intermediate)</td>
                  <td className="p-3 font-bold text-rose-700">-2.0 (76% non-placed)</td>
                  <td className="p-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold text-[10px]">HIGH</span></td>
                </tr>
                <tr className="hover:bg-slate-50 font-medium">
                  <td className="p-3 font-bold text-[#062B52]">Git Collaborative Workflow</td>
                  <td className="p-3 text-slate-600">Level 2 (Basic)</td>
                  <td className="p-3 text-slate-800">Level 3 (Intermediate)</td>
                  <td className="p-3 font-bold text-amber-700">-1.0 (61% non-placed)</td>
                  <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recommended Upskilling Areas:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Introduce 30 hours of practical SQL labs and AWS deployment prior to course certification.
            </p>
          </div>
        </div>
      )}

      {/* VIEW 11: NON-PLACEMENT REASONS */}
      {selectedAnalysisView === 'non_placement_reasons' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Non-Placement Reasons</h2>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded">
              Single Chart Analysis
            </span>
          </div>

          {/* ONE CLEAN HORIZONTAL BAR CHART */}
          <div className="space-y-3">
            {NON_PLACEMENT_REASONS.map((r, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{r.reason}</span>
                  <span className="text-[#062B52]">{r.percentage}% ({r.count} Trainees)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${idx === 0 ? 'bg-rose-500' : idx === 1 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                    style={{ width: `${r.percentage * 2.5}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Insight:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Skill mismatch is the largest identified barrier (35%), followed by lack of practical experience (25%).
            </p>
            <div className="pt-1 text-xs font-bold text-[#0B3B70]">
              Recommended Action: Prioritize practical role-specific training and capstone projects.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 12: RECOMMENDED INTERVENTIONS */}
      {selectedAnalysisView === 'recommended_interventions' && (
        <div className="bg-white rounded-2xl border border-[#D9E1EA] p-6 shadow-2xs space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h2 className="font-extrabold text-lg text-[#062B52]">Recommended Interventions</h2>
            </div>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
              Action Plan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-[#062B52] font-extrabold border-b border-slate-200">
                  <th className="p-3">Identified Issue</th>
                  <th className="p-3">Evidence Baseline</th>
                  <th className="p-3">Recommended Policy Action</th>
                  <th className="p-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 font-medium">
                  <td className="p-3 font-bold text-[#062B52]">Skill Mismatch</td>
                  <td className="p-3 text-slate-600">35% non-placement cases</td>
                  <td className="p-3 text-slate-800 font-bold">Increase practical role-specific lab training by 30 hours.</td>
                  <td className="p-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold text-[10px]">HIGH</span></td>
                </tr>
                <tr className="hover:bg-slate-50 font-medium">
                  <td className="p-3 font-bold text-[#062B52]">Early Job Attrition</td>
                  <td className="p-3 text-slate-600">32% salary mismatch in 6 months</td>
                  <td className="p-3 text-slate-800 font-bold">Strengthen 30 and 90-day post-placement wage mentorship.</td>
                  <td className="p-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold text-[10px]">HIGH</span></td>
                </tr>
                <tr className="hover:bg-slate-50 font-medium">
                  <td className="p-3 font-bold text-[#062B52]">Tier-2 Placement Bottleneck</td>
                  <td className="p-3 text-slate-600">57% placement in Sambhajinagar</td>
                  <td className="p-3 text-slate-800 font-bold">Launch targeted local MSME cluster hiring drives.</td>
                  <td className="p-3"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#F5F7FA] p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="font-bold text-xs text-[#062B52] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Action Summary:
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              The platform transitions from Data → Insight → Targeted Policy Action to maximize state skilling return on investment.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
