import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck, 
  Filter, 
  CheckCircle2,
  Building2,
  Eye,
  X
} from 'lucide-react';
import { CAREER_JOBS, MAHARASHTRA_DISTRICTS } from '../data/mockData';

export default function CareerOpportunities() {
  const { savedJobs, toggleSaveJob, t } = useApp();
  
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = CAREER_JOBS.filter(j => 
    selectedDistrict === "All" || j.district === selectedDistrict
  );

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>AI Job Match Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">Career Opportunities</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Discover Maharashtra job openings matched against your profile and current skills.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs font-semibold">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>District:</span>
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
          >
            <option value="All">All Districts</option>
            {MAHARASHTRA_DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* JOB CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const isSaved = savedJobs.includes(job.id);
          return (
            <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{job.company}</span>
                    <h3 className="text-lg font-extrabold text-[#062B55]">{job.title}</h3>
                  </div>

                  <span className="font-extrabold text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full shrink-0">
                    {job.matchPercentage}% Profile Match
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{job.district}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                    <span>{job.salary}</span>
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {job.experience}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold text-slate-500">Key Required Skills:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map(sk => (
                      <span key={sk} className="text-[11px] bg-blue-50 text-blue-900 px-2.5 py-0.5 rounded-full font-medium border border-blue-100">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="bg-[#1456A0] hover:bg-[#062B55] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Requirements</span>
                </button>

                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border transition flex items-center gap-1.5 ${
                    isSaved 
                      ? 'bg-amber-50 text-amber-900 border-amber-300' 
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#E8A317]" /> : <Bookmark className="w-4 h-4 text-slate-400" />}
                  <span>{isSaved ? 'Saved' : 'Save Job'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-6 animate-in zoom-in-95">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-700">{selectedJob.company}</span>
                <h3 className="text-xl font-extrabold text-[#062B55]">{selectedJob.title}</h3>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div><strong>Location:</strong> {selectedJob.district}, Maharashtra</div>
                <div><strong>Salary:</strong> {selectedJob.salary}</div>
                <div><strong>Experience Required:</strong> {selectedJob.experience}</div>
                <div><strong>Posted:</strong> {selectedJob.postedDate}</div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Required Competencies:</h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  {selectedJob.requiredSkills.map(s => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
              <button 
                onClick={() => setSelectedJob(null)} 
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  alert(`Application submitted to ${selectedJob.company} for ${selectedJob.title}!`);
                  setSelectedJob(null);
                }} 
                className="px-5 py-2 rounded-xl bg-[#1456A0] hover:bg-[#062B55] text-white text-xs font-bold"
              >
                Apply Now (Demo)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
