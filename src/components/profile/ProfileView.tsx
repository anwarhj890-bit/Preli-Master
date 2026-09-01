import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExamType } from '../../types';
import {
  User,
  Award,
  Flame,
  Zap,
  Target,
  Calendar,
  Sparkles,
  CheckCircle2,
  Edit2,
  Save,
  BookOpen,
  Trophy,
  ShieldCheck
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { userStats, updateProfile, updateTargetExam, triggerConfetti } = useApp();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(userStats.name);
  const [district, setDistrict] = useState<string>(userStats.district);
  const [university, setUniversity] = useState<string>(userStats.university);
  const [targetExam, setTargetExam] = useState<ExamType>(userStats.targetExam);
  const [dailyMCQs, setDailyMCQs] = useState<number>(userStats.dailyTargetMCQs);

  const handleSaveProfile = () => {
    updateProfile({
      name,
      district,
      university,
      targetExam,
      dailyTargetMCQs: dailyMCQs
    });
    setIsEditing(false);
    triggerConfetti();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Profile Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 p-1 shadow-xl">
              <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300 font-['Outfit']">
                {userStats.name.charAt(0)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold text-white">{userStats.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Level {userStats.level}
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm">
                {userStats.university} • {userStats.district}
              </p>
              <span className="inline-block text-xs font-semibold text-emerald-400 pt-1">
                🎯 টার্গেট: {userStats.targetExam}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            <span>{isEditing ? 'বাতিল' : 'প্রোফাইল এডিট'}</span>
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">নাম:</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">টার্গেট পরীক্ষা:</label>
                <select
                  value={targetExam}
                  onChange={e => setTargetExam(e.target.value as ExamType)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="BCS Preliminary">BCS Preliminary (৪৬তম/৪৭তম)</option>
                  <option value="Bank Recruitment">Bangladesh Bank / Combined 9 Banks</option>
                  <option value="Primary Teacher">Primary Teacher Recruitment</option>
                  <option value="NTRCA">NTRCA Non-Govt Teacher</option>
                  <option value="Government Job">10th-20th Grade Govt Jobs</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">বিশ্ববিদ্যালয় / কলেজ:</label>
                <input
                  type="text"
                  value={university}
                  onChange={e => setUniversity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">জেলা:</label>
                <input
                  type="text"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-300">দৈনিক টার্গেট MCQ সংখ্যা:</label>
                <input
                  type="number"
                  value={dailyMCQs}
                  onChange={e => setDailyMCQs(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              সংরক্ষণ করুন
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">XP পয়েন্টস</span>
            <span className="text-xl font-black text-amber-300 font-['Outfit']">{userStats.xpPoints}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">স্টাডি স্ট্রিক</span>
            <span className="text-xl font-black text-amber-400 font-['Outfit']">{userStats.studyStreakDays} দিন</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">জাতীয় র‍্যাঙ্ক</span>
            <span className="text-xl font-black text-emerald-400 font-['Outfit']">#{userStats.nationalRank}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block font-medium">মোট টেস্ট</span>
            <span className="text-xl font-black text-blue-400 font-['Outfit']">{userStats.totalTestsCompleted}টি</span>
          </div>
        </div>
      </div>

      {/* Gamification & Achievements */}
      <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          অর্জন ও ব্যাজসমূহ (Achievements & Badges)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {userStats.achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border space-y-2 ${
                ach.isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/30'
                  : 'bg-slate-900/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{ach.icon}</span>
                {ach.isUnlocked ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    +৫০০ XP
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">লকড</span>
                )}
              </div>
              <h3 className="font-bold text-slate-100 text-sm">{ach.title}</h3>
              <p className="text-xs text-slate-400 leading-snug">{ach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
