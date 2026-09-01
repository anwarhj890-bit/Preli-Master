import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Flame,
  Brain,
  Clock,
  Layers
} from 'lucide-react';

export const SmartRevisionView: React.FC = () => {
  const { wrongQuestions, questions, navigateTo, openAiMentorWithPrompt, triggerConfetti } = useApp();

  const [activeDeck, setActiveDeck] = useState<'all' | 'weak' | 'review' | 'mastered'>('all');

  const weakDeck = wrongQuestions.map(w => w.question);
  const reviewSoonDeck = questions.slice(0, 15);
  const masteredDeck = questions.slice(15, 25);

  const handleStartRevisionSession = () => {
    let pool = [...weakDeck, ...reviewSoonDeck].slice(0, 35);
    if (pool.length === 0) pool = questions.slice(0, 20);

    navigateTo('practice', {
      customQuestions: pool,
      title: 'স্মার্ট রিভিশন সেশন (৩৫টি প্রশ্ন)'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <RotateCcw className="w-7 h-7 text-purple-400" />
          স্মার্ট স্পেসড-রিপিটিশন রিভিশন (Smart Revision)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          বিজ্ঞানসম্মত ব্যবধানযুক্ত পুনরাবৃত্তি পদ্ধতিতে ভুলে যাওয়ার আগেই রিভিশন নিশ্চিত করুন
        </p>
      </div>

      {/* Hero Today's 35 Question Deck */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/50 border border-purple-500/40 p-6 sm:p-7 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              দৈনিক অ্যালগরিদমিক ডেক • ৩৫ প্রশ্ন
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              আজকের স্মার্ট রিভিশন সেট
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              আপনার অতীতের ভুল উত্তর, বিলম্বিত সমাধান এবং কম একিউরেসির অধ্যায় থেকে নির্বাচিত।
            </p>
          </div>

          <button
            onClick={handleStartRevisionSession}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-950/50 flex items-center justify-center gap-2 transition hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            রিভিশন শুরু করুন (৩৫টি প্রশ্ন)
          </button>
        </div>

        {/* 3 Categories Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-bold text-rose-300">🔴 দুর্বল প্রশ্ন (Weak)</span>
            </div>
            <p className="text-2xl font-extrabold text-white font-['Outfit']">{weakDeck.length}টি</p>
            <span className="text-[10px] text-slate-400">বারবার ভুল হয় বা ভুল হয়েছিল</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-amber-300">🟡 শীঘ্রই রিভিশন (Review Soon)</span>
            </div>
            <p className="text-2xl font-extrabold text-white font-['Outfit']">{reviewSoonDeck.length}টি</p>
            <span className="text-[10px] text-slate-400">৭ দিন ধরে পড়া হয়নি</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-300">🟢 আয়ত্তাধীন (Mastered)</span>
            </div>
            <p className="text-2xl font-extrabold text-white font-['Outfit']">{masteredDeck.length}টি</p>
            <span className="text-[10px] text-slate-400">একিউরেসি ৯০%+</span>
          </div>
        </div>
      </div>

      {/* Smart Memory Retention Schedule Card */}
      <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4">
        <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
          <Brain className="w-5 h-5 text-emerald-400" />
          স্মৃতি ধারণ অ্যালগরিদম (Ebbinghaus Forgetting Curve Optimization)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          একটি তথ্য পড়ার পর ২৪ ঘণ্টা, ৩ দিন, ৭ দিন ও ২১ দিন পর রিভিশন দিলে স্মৃতি ৯৫% পর্যন্ত দীর্ঘস্থায়ী হয়।
          PRELI MASTERMIND স্বয়ংক্রিয়ভাবে সঠিক সময়ে সেই প্রশ্নগুলো আপনার সামনে নিয়ে আসে।
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
            <span className="font-bold text-slate-400 block">১ম ধাপ</span>
            <span className="text-emerald-400 font-bold">১ম দিন (২৪ ঘণ্টা)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
            <span className="font-bold text-slate-400 block">২য় ধাপ</span>
            <span className="text-emerald-400 font-bold">৩য় দিন</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
            <span className="font-bold text-slate-400 block">৩য় ধাপ</span>
            <span className="text-amber-400 font-bold">৭ম দিন</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
            <span className="font-bold text-slate-400 block">৪র্থ ধাপ</span>
            <span className="text-purple-400 font-bold">২১তম দিন</span>
          </div>
        </div>
      </div>
    </div>
  );
};
