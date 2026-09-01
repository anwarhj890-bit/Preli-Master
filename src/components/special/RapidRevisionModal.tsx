import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Clock,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const RapidRevisionModal: React.FC = () => {
  const { navigateTo, openAiMentorWithPrompt } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
          SPEED REVISION PROTOCOL
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          ৩০-মিনিট র্যাপিড রিভিশন (30-Min Rapid Revision)
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          কম সময়ে সর্বোচ্চ তথ্য ঝালাই করার বৈজ্ঞানিক কাঠামো: ১০০ তথ্য • ৫০ MCQ • ২০ ফ্ল্যাশকার্ড
        </p>
      </div>

      {/* 3 Step Protocol Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-black text-sm flex items-center justify-center font-['Outfit']">
              01
            </span>
            <h3 className="text-lg font-bold text-white">১০০ অতি-গুরুত্বপূর্ণ তথ্য</h3>
            <p className="text-xs text-slate-300">
              ১০ মিনিটে ১০টি বিষয়ের ১০টি করে সবচেয়ে গুরুত্বপূর্ণ তথ্য দ্রুত স্কিমিং।
            </p>
          </div>
          <button
            onClick={() => navigateTo('most-important')}
            className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            তথ্যগুলো পড়ুন <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-sm flex items-center justify-center font-['Outfit']">
              02
            </span>
            <h3 className="text-lg font-bold text-white">৫০টি হাই-স্পিড MCQ</h3>
            <p className="text-xs text-slate-300">
              ১৫ মিনিটে ৫০টি বহুমুখী প্রশ্নের তাৎক্ষণিক সমাধান ও একিউরেসি চেক।
            </p>
          </div>
          <button
            onClick={() => navigateTo('practice', { count: 50 })}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            ৫০ MCQ শুরু করুন <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-black text-sm flex items-center justify-center font-['Outfit']">
              03
            </span>
            <h3 className="text-lg font-bold text-white">২০টি ফ্ল্যাশকার্ড ড্রিল</h3>
            <p className="text-xs text-slate-300">
              ৫ মিনিটে সবচেয়ে জটিল ২০টি সাল ও পরিভাষা রি-ভেরিফিকেশন।
            </p>
          </div>
          <button
            onClick={() => navigateTo('flashcards')}
            className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            ফ্ল্যাশকার্ড ডেক <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FinalPreparationModal: React.FC = () => {
  const { openAiMentorWithPrompt } = useApp();

  const days = [
    { day: 'Day 1', focus: 'বাংলা সাহিত্য ও ব্যাকরণ রিভিশন + ২০০ MCQ' },
    { day: 'Day 2', focus: 'ইংরেজি গ্রামার, লিটারেচার ও ৫০ ভোকাব ড্রিল' },
    { day: 'Day 3', focus: 'বাংলাদেশ বিষয়াবলি: সংবিধান, মুক্তিযুদ্ধ ও অর্থনৈতিক সমীক্ষা' },
    { day: 'Day 4', focus: 'আন্তর্জাতিক বিষয়াবলি: চুক্তি, সংস্থা ও সাম্প্রতিক বৈশ্বিক ঘটনা' },
    { day: 'Day 5', focus: 'গণিত ও মানসিক দক্ষতা: সমস্ত শর্টকাট সূত্র রিভিশন' },
    { day: 'Day 6', focus: 'বিজ্ঞান ও তথ্যপ্রযুক্তি + ৩টি পূর্ণাঙ্গ মডেল টেস্ট' },
    { day: 'Day 7', focus: 'ভুলের খাতা পর্যালোচনা ও সম্পূর্ণ রিল্যাক্সেশন মোড' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          ৭-দিনের ফাইনাল প্রিপারেশন রোডম্যাপ (Final Prep Protocol)
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          পরীক্ষার পূর্বের শেষ সপ্তাহের দিনভিত্তিক নিবিড় রিভিশন প্ল্যান
        </p>
      </div>

      <div className="space-y-3">
        {days.map((d, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs font-['Outfit']">
                {d.day}
              </span>
              <span className="font-bold text-slate-200 text-sm">{d.focus}</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-slate-500 hover:text-emerald-400 cursor-pointer transition" />
          </div>
        ))}
      </div>
    </div>
  );
};
