import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCircular } from '../../types';
import {
  Briefcase,
  Calendar,
  Clock,
  Bookmark,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const JobCircularsView: React.FC = () => {
  const { jobCirculars, toggleJobBookmark } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'BCS', 'Bank', 'Government', 'Primary', 'NTRCA'];

  const filteredJobs = jobCirculars.filter(j => {
    const matchCat = selectedCategory === 'all' || j.category === selectedCategory;
    const matchSearch =
      j.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Briefcase className="w-7 h-7 text-amber-400" />
          সরকারি চাকরি ও নিয়োগ সার্কুলার সেন্টার (Job Circulars)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          বিসিএস, বাংলাদেশ ব্যাংক, প্রাথমিক শিক্ষক ও বিভিন্ন মন্ত্রণালয়ের সর্বশেষ নিয়োগ বিজ্ঞপ্তি
        </p>
      </div>

      {/* Category Pills and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'সব সার্কুলার' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="পদবী বা প্রতিষ্ঠান খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Circular Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-4 shadow-xl hover:border-slate-600 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {job.category}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">{job.vacancies}</span>
                </div>

                <button
                  onClick={() => toggleJobBookmark(job.id)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-amber-400 transition"
                  title="Bookmark Circular"
                >
                  <Bookmark
                    className={`w-4 h-4 ${job.isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`}
                  />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-100 leading-snug">{job.position}</h3>
                <span className="text-xs text-slate-400">{job.organization}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">শিক্ষাগত যোগ্যতা:</span>
                  <span className="font-medium text-right">{job.educationalRequirement}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">বয়সসীমা:</span>
                  <span className="font-medium">{job.ageLimit}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
              <div className="flex items-center gap-1 text-rose-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>ডেডলাইন: {job.deadline}</span>
              </div>

              <a
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition shadow-md"
              >
                <span>আবেদন লিঙ্ক</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
