import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { userStats, subjects, navigateTo, openAiMentorWithPrompt } = useApp();

  const weakAreas = [
    { name: 'বাংলা ব্যাকরণ ও ধ্বনিতত্ত্ব', acc: 54, sub: 'বাংলা' },
    { name: 'আন্তর্জাতিক সংস্থা ও চুক্তি', acc: 58, sub: 'আন্তর্জাতিক' },
    { name: 'বীজগণিত ও লগারিদম', acc: 61, sub: 'গণিত' },
    { name: 'কম্পিউটার নেটওয়ার্কিং ও আইপি', acc: 63, sub: 'আইসিটি' },
    { name: 'মুক্তিযুদ্ধ ও সেক্টর কমান্ডারগণ', acc: 65, sub: 'বাংলাদেশ' }
  ];

  const strongAreas = [
    { name: 'বাংলা প্রাচীন ও মধ্যযুগীয় সাহিত্য', acc: 92, sub: 'বাংলা' },
    { name: 'বাংলাদেশ সংবিধান ও সংশোধনী', acc: 89, sub: 'বাংলাদেশ' },
    { name: 'সাধারণ বিজ্ঞান - পদার্থ ও শক্তি', acc: 88, sub: 'বিজ্ঞান' },
    { name: 'নৈতিকতা ও সুশাসন মূল্যবোধ', acc: 87, sub: 'নৈতিকতা' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-emerald-400" />
          পারফরম্যান্স অ্যানালিটিক্স ও দুর্বলতা নিরাময়
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          আপনার প্রতিটি টেস্ট, সঠিক/ভুল অনুপাত এবং সময় ব্যবহারের বিজ্ঞানসম্মত বিশ্লেষণ
        </p>
      </div>

      {/* Top High-Level Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">সার্বিক প্রস্তুতি লেভেল</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400 font-['Outfit']">৭৮%</span>
            <span className="text-xs text-emerald-300 font-bold">বিসিএস রেডি</span>
          </div>
          <p className="text-[11px] text-slate-400">কাট-অফ পাসের উচ্চ সম্ভাবনা</p>
        </div>

        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">সামগ্রিক একিউরেসি</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-300 font-['Outfit']">{userStats.overallAccuracy}%</span>
            <span className="text-xs text-slate-400">গড় সঠিকতা</span>
          </div>
          <p className="text-[11px] text-slate-400">টপ ১৫% প্রার্থীর সমকক্ষ</p>
        </div>

        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">সমাধানকৃত প্রশ্ন</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-['Outfit']">{userStats.totalQuestionsSolved.toLocaleString()}</span>
            <span className="text-xs text-slate-400">MCQ</span>
          </div>
          <p className="text-[11px] text-slate-400">{userStats.totalTestsCompleted}টি মডেল টেস্টে</p>
        </div>

        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-1">
          <span className="text-xs text-slate-400 font-medium">স্টাডি ধারাবাহিকতা</span>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400" />
            <span className="text-3xl font-black text-amber-400 font-['Outfit']">{userStats.studyStreakDays}</span>
            <span className="text-xs text-slate-300 font-bold">দিন টানা</span>
          </div>
          <p className="text-[11px] text-amber-300 font-semibold">টপ ৫% মোটিভেটেড</p>
        </div>
      </div>

      {/* TOP 5 WEAK AREAS - HERO ACTION */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">শীর্ষ ৫টি দুর্বল ক্ষেত্র (Critical Weak Areas)</h2>
              <p className="text-xs text-slate-300">
                এই অধ্যায়গুলোতে ভুল বেশি হচ্ছে। দ্রুত রিভিশন ও প্র্যাকটিস করে মার্কস নিশ্চিত করুন।
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('practice', { focusWeak: true })}
            className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 transition hover:scale-105"
          >
            <Zap className="w-4 h-4" /> FIX MY WEAKNESS (প্র্যাকটিস)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {weakAreas.map((w, i) => (
            <div
              key={i}
              onClick={() =>
                openAiMentorWithPrompt(
                  `আমাকে "${w.name}" এর জন্য ৫টি গুরুত্বপূর্ণ শর্টকাট সূত্র ও বিভ্রান্তি এড়ানোর কৌশল শেখান।`
                )
              }
              className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/20 hover:border-rose-400 cursor-pointer transition space-y-2 group"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{w.sub}</span>
                <span className="font-bold text-rose-400 font-['Outfit']">{w.acc}% Accuracy</span>
              </div>
              <h3 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition">
                {w.name}
              </h3>
              <div className="flex items-center justify-between text-[11px] text-amber-300 pt-1">
                <span>AI পরামর্শ নিন</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject-Wise Performance Chart & Matrix */}
      <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            ১০টি বিষয়ের একিউরেসি ও প্রস্তুতি ম্যাট্রিক্স
          </h2>
          <span className="text-xs text-slate-400 font-semibold">টার্গেট: ৮০%+ প্রতি বিষয়ে</span>
        </div>

        <div className="space-y-3">
          {subjects.map(s => (
            <div key={s.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-100 text-sm">{s.name}</span>
                  <span className="text-xs text-slate-500">({s.marks} মার্কস)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{s.completedQuestions}টি সলভড</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-['Outfit']">{s.accuracy}%</span>
                </div>
              </div>

              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    s.accuracy >= 80
                      ? 'bg-emerald-500'
                      : s.accuracy >= 65
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${s.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strong Areas Showcase */}
      <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          আপনার শক্তিশালী অধ্যায়সমূহ (High Mastery)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {strongAreas.map((st, i) => (
            <div key={i} className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">{st.sub}</span>
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm">{st.name}</h3>
              <span className="text-xs font-extrabold text-emerald-300 font-['Outfit'] block pt-1">
                {st.acc}% Accuracy
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
