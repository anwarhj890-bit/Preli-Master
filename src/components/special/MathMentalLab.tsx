import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calculator,
  Brain,
  Zap,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Play,
  Lightbulb
} from 'lucide-react';

export const MathMentalLab: React.FC = () => {
  const { openAiMentorWithPrompt, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'math' | 'mental'>('math');

  const mathShortcuts = [
    {
      topic: 'শতকরা ও বৃদ্ধি-হ্রাস (Percentage)',
      formula: 'যদি কোনো সংখ্যা প্রথমে a% বৃদ্ধি পায় এবং পরে b% বৃদ্ধি পায়, মোট পরিবর্তন = a + b + (a×b)/100',
      example: 'একটি পণ্যের দাম ২০% বাড়িয়ে পরে ১০% কমানো হলে, মোটের ওপর পরিবর্তন = ২০ - ১০ - (২০×১০)/১০০ = +৮% বৃদ্ধি।'
    },
    {
      topic: 'কাজ ও সময় (Work & Time)',
      formula: 'A একা একটি কাজ x দিনে এবং B একা y দিনে করলে, একত্রে করবে = (x × y) / (x + y) দিনে।',
      example: 'A একটি কাজ ১০ দিনে ও B ১৫ দিনে করলে, একত্রে করবে = (১০×১৫)/(১০+১৫) = ১৫০/২৫ = ৬ দিনে।'
    },
    {
      topic: 'ধারা ও অনুক্রম (Series & Progressions)',
      formula: 'প্রথম n-সংখ্যক স্বাভাবিক সংখ্যার যোগফল = [n(n+1)] / 2',
      example: '১ থেকে ৫০ পর্যন্ত সংখ্যার যোগফল = [৫০ × ৫১] / ২ = ১২৭৫।'
    }
  ];

  const mentalPatterns = [
    {
      type: 'কোডিং-ডিকোডিং ও বর্ণমালা মান',
      rule: 'A=1, B=2 ... Z=26 মনে রাখার ট্রিক: E-J-O-T-Y (5-10-15-20-25)',
      tip: 'বিপরীত বর্ণ মনে রাখার সূত্র: A-Z (Azad), B-Y (Boy), C-X (Crux), D-W (Dew), E-V (Love), F-U (Fun)...'
    },
    {
      type: 'ঘড়ির কাঁটার মধ্যবর্তী কোণ',
      rule: 'কোণ = |(60H - 11M) / 2| ডিগ্রি',
      tip: '৮টা ২০ মিনিটে কোণ = |(৬০×৮ - ১১×২০) / ২| = |(৪৮০ - ২২০) / ২| = ১৩০ ডিগ্রি।'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Calculator className="w-7 h-7 text-emerald-400" />
          ম্যাথ ল্যাব ও মানসিক দক্ষতা (Math & Mental Lab)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          বিসিএস প্রিলিমিনারি গাণিতিক যুক্তি (১৫) ও মানসিক দক্ষতা (১৫) এর মোট ৩০ নম্বরের শর্টকাট হাব
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold w-full sm:w-auto">
        <button
          onClick={() => setActiveTab('math')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition ${
            activeTab === 'math'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🧮 গাণিতিক যুক্তি শর্টকাট ল্যাব
        </button>
        <button
          onClick={() => setActiveTab('mental')}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl transition ${
            activeTab === 'mental'
              ? 'bg-purple-600 text-white font-bold shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          🧠 মানসিক দক্ষতা প্যাটার্ন ল্যাব
        </button>
      </div>

      {/* Content */}
      {activeTab === 'math' ? (
        <div className="space-y-4">
          {mathShortcuts.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> {item.topic}
                </h3>
                <button
                  onClick={() =>
                    openAiMentorWithPrompt(
                      `আমাকে গণিতের "${item.topic}" টপিকটির উপর বিসিএস পরীক্ষায় আসা ৩টি কঠিন প্রশ্নের শর্টকাট সমাধান দিন।`
                    )
                  }
                  className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> AI ট্রিকস
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-amber-300 font-mono text-xs sm:text-sm">
                📌 <strong>সূত্র:</strong> {item.formula}
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-slate-300 text-xs sm:text-sm">
                💡 <strong>উদাহরণ সমাধান:</strong> {item.example}
              </div>
            </div>
          ))}

          <button
            onClick={() => navigateTo('practice', { subjectId: 'math', count: 15 })}
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-white" /> গাণিতিক যুক্তি স্পেশাল টেস্ট দিন (১৫ প্রশ্ন)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {mentalPatterns.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" /> {item.type}
                </h3>
                <button
                  onClick={() =>
                    openAiMentorWithPrompt(
                      `মানসিক দক্ষতার "${item.type}" সম্পর্কিত বিসিএস প্যাটার্ন এবং দ্রুত সমাধান করার উপায় বুঝিয়ে দিন।`
                    )
                  }
                  className="text-xs text-purple-300 font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> AI প্যাটার্ন
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-purple-300 text-xs sm:text-sm">
                🔍 <strong>নিয়ম:</strong> {item.rule}
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-slate-300 text-xs sm:text-sm">
                💡 <strong>পরীক্ষার টিপস:</strong> {item.tip}
              </div>
            </div>
          ))}

          <button
            onClick={() => navigateTo('practice', { subjectId: 'mental', count: 15 })}
            className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-white" /> মানসিক দক্ষতা স্পেশাল টেস্ট দিন (১৫ প্রশ্ন)
          </button>
        </div>
      )}
    </div>
  );
};
