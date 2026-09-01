import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Clock,
  Trophy,
  Play,
  CheckCircle2,
  AlertCircle,
  Share2,
  RotateCcw,
  Zap,
  Sparkles
} from 'lucide-react';

export const DailyQuizView: React.FC = () => {
  const { questions, userStats, navigateTo, playSound, triggerConfetti } = useApp();

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const dailyQuestions = questions.slice(0, 10);

  const handleStartDailyQuiz = () => {
    navigateTo('practice', {
      customQuestions: dailyQuestions,
      title: "আজকের ডেইলি কুইজ ব্যাটল (Today's Daily Quiz)"
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          TODAY'S BATTLE ⚔️
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          ডেইলি কুইজ চ্যালেঞ্জ (Daily Quiz)
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          প্রতিদিন ২০টি নতুন ও সাম্প্রতিক তথ্যের প্রশ্ন। সময় ১০ মিনিট। হাজারো বিসিএস প্রার্থীর সাথে লাইভ মেধার লড়াই।
        </p>
      </div>

      {/* Main Challenge Card */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-950/60 text-white font-black text-2xl font-['Outfit']">
              20Q
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">আজকের স্পেশাল চ্যালেঞ্জ ডেক</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                বাংলা, ইংরেজি, গণিত, বিজ্ঞান ও সাম্প্রতিক ঘটনা সমন্বিত
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">সময়সীমা</span>
              <span className="text-sm font-extrabold text-amber-300 font-['Outfit']">১০ মিনিট</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-medium">পয়েন্টস</span>
              <span className="text-sm font-extrabold text-emerald-400 font-['Outfit']">+100 XP</span>
            </div>
          </div>
        </div>

        {/* Live Leaderboard Teaser */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> আজকের টপারদের তালিকা:
            </span>
            <span className="text-slate-400">৩,৪২০ জন প্রার্থী অংশ নিয়েছে</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: 'তানভীর আহমেদ', score: '২০/২০', time: '৪ মি. ১২ সে.', rank: '১' },
              { name: 'নুসরাত জাহান', score: '২০/২০', time: '৪ মি. ৪৫ সে.', rank: '২' },
              { name: 'মেহেদী হাসান', score: '১৯/২০', time: '৩ মি. ৫৮ সে.', rank: '৩' }
            ].map((t, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center">
                    #{t.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-200 text-xs">{t.name}</h4>
                    <span className="text-[10px] text-slate-400">{t.time}</span>
                  </div>
                </div>
                <span className="font-extrabold text-emerald-400 text-xs font-['Outfit']">{t.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={handleStartDailyQuiz}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 hover:from-rose-500 hover:to-emerald-400 text-slate-950 font-black text-base shadow-2xl shadow-rose-950/60 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            আজকের কুইজে অংশ নিন (START BATTLE)
          </button>
        </div>
      </div>
    </div>
  );
};
