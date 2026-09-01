import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubjectInfo, SubjectId } from '../../types';
import {
  BookOpen,
  Target,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronRight,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

export const SubjectsView: React.FC = () => {
  const { subjects, navigateTo, openAiMentorWithPrompt } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = subjects.filter(
    s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            ১০টি বিসিএস প্রিলিমিনারি বিষয়সমূহ
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            সিলেবাসভিত্তিক প্রস্তুতি, নির্ভুল অনুশীলন এবং বিষয়ভিত্তিক টেস্ট
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="বিষয় বা টপিক খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 shadow-sm transition"
          />
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubjects.map(subj => {
          return (
            <div
              key={subj.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm flex flex-col justify-between"
            >
              {/* Top Details */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                      {subj.marks} নম্বর
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {subj.completedQuestions} / {subj.totalQuestions} প্রশ্ন সমাধান
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1.5">{subj.name}</h2>
                  <span className="text-xs text-slate-400">{subj.englishName}</span>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-['Outfit']">
                    {subj.accuracy}%
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium uppercase">
                    Accuracy
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span>টপিক সমাপ্তি: {subj.topicCompletion}%</span>
                  <span>প্রশ্ন সলভড: {Math.round((subj.completedQuestions / subj.totalQuestions) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${subj.topicCompletion}%` }}
                  />
                </div>
              </div>

              {/* Weak & Strong Topics Indicators */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40">
                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 mb-0.5">
                    <AlertTriangle className="w-3 h-3" /> দুর্বল টপিক:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 truncate text-[11px]">
                    {subj.weakTopics.length > 0 ? subj.weakTopics.join(', ') : 'চিহ্নিত নেই'}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 mb-0.5">
                    <CheckCircle2 className="w-3 h-3" /> স্ট্রং টপিক:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 truncate text-[11px]">
                    {subj.strongTopics.length > 0 ? subj.strongTopics.join(', ') : 'চিহ্নিত নেই'}
                  </p>
                </div>
              </div>

              {/* Three Action Buttons: STUDY, PRACTICE, TEST */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  id={`btn-study-${subj.id}`}
                  onClick={() => navigateTo('study', { subjectId: subj.id })}
                  className="py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-slate-200 dark:border-slate-700"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  STUDY
                </button>

                <button
                  id={`btn-practice-${subj.id}`}
                  onClick={() => navigateTo('practice', { subjectId: subj.id })}
                  className="py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-emerald-200 dark:border-emerald-800"
                >
                  <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  PRACTICE
                </button>

                <button
                  id={`btn-test-${subj.id}`}
                  onClick={() =>
                    navigateTo('exams', {
                      customConfig: {
                        subjectId: subj.id,
                        title: `${subj.name} স্পেশাল টেস্ট`,
                        questionCount: subj.marks,
                        timeMinutes: Math.round(subj.marks * 0.8)
                      }
                    })
                  }
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  TEST
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
