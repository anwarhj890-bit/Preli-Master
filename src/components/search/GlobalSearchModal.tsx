import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  BookOpen,
  Target,
  FileCheck,
  RotateCcw,
  Briefcase,
  Newspaper,
  ChevronRight
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    subjects,
    questions,
    currentAffairs,
    jobCirculars,
    navigateTo
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const matchedSubjects = query.trim()
    ? subjects.filter(
        s =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.englishName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedQuestions = query.trim()
    ? questions.filter(
        q =>
          q.question.toLowerCase().includes(query.toLowerCase()) ||
          q.explanation.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const matchedAffairs = query.trim()
    ? currentAffairs.filter(
        a =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="বিষয়, প্রশ্ন, অধ্যায়, সার্কুলার বা কারেন্ট অ্যাফেয়ার্স খুঁজুন..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase">জনপ্রিয় অনুসন্ধান:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {['সংবিধানের অনুচ্ছেদ', 'চর্যাপদ ও মধ্যযুগীয় সাহিত্য', 'মুক্তিযুদ্ধের সেক্টর', 'ইংরেজি গ্রামার ও প্রিপজিশন', 'শতকরা ও লাভক্ষতি'].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(q)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Subjects */}
              {matchedSubjects.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase">বিষয়সমূহ:</span>
                  <div className="space-y-1">
                    {matchedSubjects.map(s => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('study', { subjectId: s.id });
                        }}
                        className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 cursor-pointer flex items-center justify-between transition"
                      >
                        <span className="font-bold text-slate-100 text-sm">{s.name} ({s.marks} মার্কস)</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions */}
              {matchedQuestions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase">প্রশ্নব্যাংক থেকে:</span>
                  <div className="space-y-1.5">
                    {matchedQuestions.map(q => (
                      <div
                        key={q.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('practice', { customQuestions: [q] });
                        }}
                        className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 cursor-pointer space-y-1 transition"
                      >
                        <span className="text-[10px] font-bold text-amber-300">{q.subjectName} • {q.examSource}</span>
                        <p className="font-semibold text-slate-100 text-xs sm:text-sm line-clamp-1">{q.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Affairs */}
              {matchedAffairs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-blue-400 uppercase">সাম্প্রতিক বিষয়াবলি:</span>
                  <div className="space-y-1.5">
                    {matchedAffairs.map(a => (
                      <div
                        key={a.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('current-affairs');
                        }}
                        className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 cursor-pointer space-y-1 transition"
                      >
                        <span className="text-[10px] font-bold text-blue-300">{a.category} • {a.date}</span>
                        <p className="font-semibold text-slate-100 text-xs sm:text-sm line-clamp-1">{a.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedSubjects.length === 0 && matchedQuestions.length === 0 && matchedAffairs.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  "{query}" এর জন্য কোনো ফলাফল পাওয়া যায়নি।
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const NotificationModal: React.FC = () => {
  const { isNotificationOpen, setIsNotificationOpen, navigateTo } = useApp();

  if (!isNotificationOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'আজকের ডেইলি কুইজ লাইভ হয়েছে!',
      desc: '২০টি নতুন প্রশ্নের সেট এখন উপলব্ধ। আপনার ১০ মিনিটের ব্যাটল সম্পন্ন করুন।',
      time: '১০ মিনিট আগে',
      action: () => {
        setIsNotificationOpen(false);
        navigateTo('daily-quiz');
      }
    },
    {
      id: 'notif-2',
      title: 'সাপ্তাহিক গ্র্যান্ড মডেল টেস্টের সময়সূচি',
      desc: 'আগামীকাল সকাল ১০টায় শুরু হচ্ছে ৪৬তম বিসিএস স্পেশাল গ্র্যান্ড টেস্ট।',
      time: '২ ঘণ্টা আগে',
      action: () => {
        setIsNotificationOpen(false);
        navigateTo('weekly-grand-test');
      }
    },
    {
      id: 'notif-3',
      title: 'স্মার্ট রিভিশন সেট আপডেট',
      desc: 'আপনার ভুলের খাতার উপর ভিত্তি করে ৩৫টি প্রশ্নের নতুন রিভিশন ডেক প্রস্তুত।',
      time: 'আজ সকালে',
      action: () => {
        setIsNotificationOpen(false);
        navigateTo('revision');
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-bold text-white text-base">নোটিফিকেশন সেন্টার</h3>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={n.action}
              className="p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 cursor-pointer space-y-1 transition"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-emerald-400">নতুন বার্তা</span>
                <span className="text-slate-500">{n.time}</span>
              </div>
              <h4 className="font-bold text-slate-100 text-xs">{n.title}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
