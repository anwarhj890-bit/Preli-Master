import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Medal,
  Award,
  Users,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { leaderboard, userStats } = useApp();

  const [activeTab, setActiveTab] = useState<'national' | 'varsity' | 'district' | 'weekly'>('national');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLeaderboard = leaderboard.filter(
    u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Trophy className="w-7 h-7 text-amber-400" />
          মেধাতালিকা ও জাতীয় র‍্যাঙ্কিং (Leaderboard)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          ধারাবাহিক অধ্যয়ন, একিউরেসি ও মডেল টেস্ট পারফরম্যান্স ভিত্তিক জাতীয় র‍্যাঙ্ক
        </p>
      </div>

      {/* User's Own Standing Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-amber-950/40 border border-emerald-500/40 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center font-black text-slate-950 text-xl font-['Outfit'] shadow-lg">
            #{userStats.nationalRank}
          </div>
          <div>
            <span className="text-xs font-bold text-amber-300">আপনার বর্তমান জাতীয় অবস্থান</span>
            <h3 className="text-lg font-bold text-white">{userStats.name}</h3>
            <p className="text-xs text-slate-400">{userStats.university} • {userStats.district}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center">
          <div>
            <span className="text-xs text-slate-400">মোট স্কোর</span>
            <p className="text-lg font-extrabold text-amber-300 font-['Outfit']">{userStats.xpPoints} XP</p>
          </div>
          <div>
            <span className="text-xs text-slate-400">একিউরেসি</span>
            <p className="text-lg font-extrabold text-emerald-400 font-['Outfit']">{userStats.overallAccuracy}%</p>
          </div>
          <div>
            <span className="text-xs text-slate-400">স্ট্রিক</span>
            <p className="text-lg font-extrabold text-amber-400 font-['Outfit']">{userStats.studyStreakDays} দিন</p>
          </div>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto text-xs font-bold">
          {[
            { id: 'national', label: '🇧🇩 জাতীয়' },
            { id: 'varsity', label: '🎓 বিশ্ববিদ্যালয়' },
            { id: 'district', label: '📍 জেলাভিত্তিক' },
            { id: 'weekly', label: '⚡ সাপ্তাহিক' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="প্রার্থী বা প্রতিষ্ঠান খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filteredLeaderboard.slice(0, 3).map((entry, idx) => {
          const isGold = entry.rank === 1;
          const isSilver = entry.rank === 2;
          const isBronze = entry.rank === 3;

          return (
            <div
              key={entry.id}
              className={`rounded-3xl p-5 border text-center space-y-3 relative overflow-hidden ${
                isGold
                  ? 'bg-gradient-to-b from-amber-500/20 to-slate-900 border-amber-500/50 shadow-xl shadow-amber-950/30 sm:-translate-y-2'
                  : isSilver
                  ? 'bg-gradient-to-b from-slate-400/20 to-slate-900 border-slate-500/50'
                  : 'bg-gradient-to-b from-amber-700/20 to-slate-900 border-amber-700/50'
              }`}
            >
              <div className="flex justify-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-lg ${
                    isGold
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30'
                      : isSilver
                      ? 'bg-slate-300 text-slate-950 ring-4 ring-slate-300/30'
                      : 'bg-amber-700 text-white ring-4 ring-amber-700/30'
                  }`}
                >
                  #{entry.rank}
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-white text-base">{entry.name}</h3>
                <span className="text-xs text-slate-400">{entry.university}</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 gap-1 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px]">স্কোর</span>
                  <p className="font-bold text-amber-300 font-['Outfit']">{entry.score}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">একিউরেসি</span>
                  <p className="font-bold text-emerald-400 font-['Outfit']">{entry.accuracy}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Table List */}
      <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-4 space-y-2 shadow-xl">
        <div className="divide-y divide-slate-800">
          {filteredLeaderboard.map(entry => (
            <div
              key={entry.id}
              className="py-3 px-3 rounded-2xl hover:bg-slate-900/60 transition flex items-center justify-between gap-3 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-7 text-center font-bold text-slate-400 font-['Outfit'] text-sm">
                  #{entry.rank}
                </span>
                <div>
                  <h4 className="font-bold text-slate-200">{entry.name}</h4>
                  <span className="text-[11px] text-slate-400">{entry.university} • {entry.district}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div>
                  <span className="font-extrabold text-amber-300 font-['Outfit'] text-sm sm:text-base">
                    {entry.score}
                  </span>
                  <span className="block text-[10px] text-slate-400">XP</span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-emerald-400 font-['Outfit']">{entry.accuracy}%</span>
                  <span className="block text-[10px] text-slate-400">একিউরেসি</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
