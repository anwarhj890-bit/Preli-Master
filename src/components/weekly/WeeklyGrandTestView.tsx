import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Calendar,
  Clock,
  Award,
  Users,
  Play,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

export const WeeklyGrandTestView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          WEEKLY GRAND TEST • জাতীয় মূল্যায়ন
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          সাপ্তাহিক গ্র্যান্ড মডেল টেস্ট (Weekly Grand Test)
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          প্রতি শুক্রবার দেশব্যাপী একযোগে অনুষ্ঠিত ২০০ নম্বরের বিসিএস সিমুলেশন টেস্ট
        </p>
      </div>

      {/* Main Feature Event Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              গ্র্যান্ড টেস্ট #২৪ • সরাসরি মেধা মূল্যায়ন
            </span>
            <h2 className="text-2xl font-extrabold text-white">
              ৪৬তম বিসিএস জাতীয় গ্র্যান্ড মডেল টেস্ট
            </h2>
            <p className="text-xs text-slate-300 max-w-md">
              সারা দেশের সেরা প্রার্থীদের সাথে নিজের প্রস্তুতি যাচাই করে জাতীয় মেধা তালিকা, জেলা র‍্যাঙ্ক ও বিশ্ববিদ্যালয় র‍্যাঙ্ক দেখুন।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">পূর্ণমান ও সময়</span>
              <span className="text-sm font-extrabold text-amber-300 font-['Outfit']">২০০ মার্কস • ২ ঘণ্টা</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">নিবন্ধিত পরীক্ষার্থী</span>
              <span className="text-sm font-extrabold text-emerald-400 font-['Outfit']">১৪,৮৫০+ জন</span>
            </div>
          </div>
        </div>

        {/* 4 Multi-Tier Leaderboards Preview */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            মেধাতালিকা শ্রেণিবিভাগ (Tier Rankings):
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-amber-400 block">🇧🇩 জাতীয় র‍্যাঙ্ক</span>
              <span className="text-[11px] text-slate-400">সমগ্র বাংলাদেশের মধ্যে</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-emerald-400 block">🎓 বিশ্ববিদ্যালয় র‍্যাঙ্ক</span>
              <span className="text-[11px] text-slate-400">ক্যাম্পাসভিত্তিক শীর্ষ তালিকা</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-blue-400 block">📍 জেলাভিত্তিক র‍্যাঙ্ক</span>
              <span className="text-[11px] text-slate-400">৬৪ জেলার মেধা প্রতিযোগিতা</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-purple-400 block">👥 ফ্রেন্ডস সার্কেল</span>
              <span className="text-[11px] text-slate-400">বন্ধুদের সাথে তুলনামূলক স্কোর</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() =>
              navigateTo('exams', {
                customConfig: {
                  title: '৪৬তম বিসিএস জাতীয় গ্র্যান্ড মডেল টেস্ট',
                  questionCount: 20,
                  timeMinutes: 20
                }
              })
            }
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-500 hover:to-amber-400 text-white font-black text-base shadow-2xl shadow-indigo-950/60 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
          >
            <Play className="w-5 h-5 fill-white" />
            গ্র্যান্ড মডেল টেস্টে অংশগ্রহণ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
