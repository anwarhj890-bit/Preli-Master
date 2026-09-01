import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Flame,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  BookOpen
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    userStats,
    darkMode,
    setDarkMode,
    soundEnabled,
    setSoundEnabled,
    setIsSearchOpen,
    setIsNotificationOpen,
    setIsAiMentorOpen,
    navigateTo,
    currentView
  } = useApp();

  // Target exam countdown calculations
  const targetDate = new Date(userStats.examDate).getTime();
  const now = new Date().getTime();
  const diffDays = Math.max(0, Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24)));

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white px-4 sm:px-8 py-3 flex justify-between items-center shadow-lg border-b border-slate-800 transition-colors">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Candidate greeting */}
        <div
          id="app-brand"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-extrabold text-xl text-slate-950 shadow-md group-hover:scale-105 transition-transform duration-200">
            PM
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              PRELI MASTERMIND
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                BCS 2026
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              শুভ সকাল, {userStats.name} 👋
            </p>
          </div>
        </div>

        {/* Center/Right: Target Countdown & Prep Level & Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Target Countdown Indicator */}
          <div className="hidden md:block text-right">
            <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
              {userStats.targetExam} Target
            </p>
            <p className="text-sm lg:text-base font-mono font-bold text-slate-100">
              {diffDays} দিন : ১৪ ঘণ্টা : ৩২ মিনিট
            </p>
          </div>

          {/* Sleek Vertical Divider */}
          <div className="h-8 w-[1px] bg-slate-700 hidden md:block" />

          {/* Prep Level Bar Indicator */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs text-slate-400 font-medium">প্রস্তুতি লেভেল</span>
            <div className="flex gap-1 mt-1">
              <div className="w-4 h-1.5 bg-emerald-500 rounded-full" />
              <div className="w-4 h-1.5 bg-emerald-500 rounded-full" />
              <div className="w-4 h-1.5 bg-emerald-500 rounded-full" />
              <div className="w-4 h-1.5 bg-slate-700 rounded-full" />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Quick Streak Chip */}
            <button
              id="header-streak-btn"
              onClick={() => navigateTo('analytics')}
              title="Study Streak"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>{userStats.studyStreakDays}d</span>
            </button>

            {/* Ask AI Trigger */}
            <button
              id="header-ai-btn"
              onClick={() => setIsAiMentorOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Preli AI</span>
            </button>

            {/* Search Trigger */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              id="header-sound-btn"
              onClick={() => setSoundEnabled(prev => !prev)}
              aria-label="Toggle Sound"
              className="hidden sm:flex p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Dark / Light Toggle */}
            <button
              id="header-theme-btn"
              onClick={() => setDarkMode(prev => !prev)}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
            </button>

            {/* Notification Trigger */}
            <button
              id="header-notification-btn"
              onClick={() => setIsNotificationOpen(true)}
              aria-label="Notifications"
              className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
