import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Plus,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

export const StudyPlannerView: React.FC = () => {
  const { studyPlan, toggleStudyPlanItem, userStats, openAiMentorWithPrompt } = useApp();

  const completedCount = studyPlan.filter(i => i.isCompleted).length;
  const progressPercent = Math.round((completedCount / studyPlan.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Calendar className="w-7 h-7 text-emerald-400" />
          ব্যক্তিগত স্টাডি প্ল্যানার (Personalized Study Planner)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          পরীক্ষার রুটিন মাফিক দৈনিক সময়সূচি, টাস্ক ট্র্যাকিং এবং লক্ষ্য নির্ধারণ
        </p>
      </div>

      {/* Daily Target Progress Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/40 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">আজকের স্টাডি রুটিন সমাপ্তি</h2>
              <p className="text-xs text-slate-400">টার্গেট: {userStats.targetExam}</p>
            </div>
          </div>

          <span className="text-2xl font-extrabold text-emerald-400 font-['Outfit']">
            {completedCount} / {studyPlan.length} টাস্ক
          </span>
        </div>

        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tasks Checkable List */}
      <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
          <h3 className="font-bold text-slate-100 text-sm">আজকের পরিকল্পিত টাইম-স্লটসমূহ</h3>
          <button
            onClick={() =>
              openAiMentorWithPrompt(
                `আমার দৈনিক রুটিনে বিসিএস প্রিলির জন্য সেরা একটি ১০ ঘণ্টার ভারসাম্যপূর্ণ টাইম-ব্লক স্টাডি প্ল্যান তৈরি করে দিন।`
              )
            }
            className="text-xs text-amber-300 font-bold hover:underline flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI রুটিন জেনারেট করুন
          </button>
        </div>

        <div className="space-y-2.5">
          {studyPlan.map(item => (
            <div
              key={item.id}
              onClick={() => toggleStudyPlanItem(item.id)}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer select-none transition-all ${
                item.isCompleted
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400'
                  : 'bg-slate-900/70 hover:bg-slate-900 border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <button className="shrink-0">
                  {item.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500" />
                  )}
                </button>
                <div>
                  <h4 className={`font-bold text-sm ${item.isCompleted ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                    {item.taskTitle}
                  </h4>
                  <span className="text-xs text-slate-400">{item.subjectName}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold shrink-0">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.estimatedMinutes} মি.</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
