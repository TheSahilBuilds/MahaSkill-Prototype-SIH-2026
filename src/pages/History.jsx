import React from 'react';
import { useApp } from '../context/AppContext';
import { History as HistoryIcon, Calendar, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function History() {
  const { historyLog, t } = useApp();

  return (
    <div className="space-y-8 pb-12">
      
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>User Activity Audit Trail</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#062B55]">Activity History</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Review past skill gap evaluations, mock interviews, resume uploads, and practice test logs.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-[#062B55]">Logged Activity Timeline</h3>

        <div className="space-y-3">
          {historyLog.map((log) => (
            <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>{log.type}</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {log.status}
                  </span>
                </div>
                <div className="text-slate-500">{log.targetRole}</div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="font-extrabold text-[#1456A0] font-mono">{log.score}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{log.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
