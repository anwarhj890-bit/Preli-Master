import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  Home,
  BookOpen,
  Target,
  FileCheck,
  User,
  Sparkles
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, navigateTo, setIsAiMentorOpen } = useApp();

  const navItems = [
    { id: 'home' as AppView, label: 'হোম', englishLabel: 'Home', icon: Home },
    { id: 'study' as AppView, label: 'সিলেবাস', englishLabel: 'Study', icon: BookOpen },
    { id: 'practice' as AppView, label: 'অনুশীলন', englishLabel: 'Practice', icon: Target },
    { id: 'exams' as AppView, label: 'পরীক্ষা', englishLabel: 'Exams', icon: FileCheck },
    { id: 'profile' as AppView, label: 'প্রোফাইল', englishLabel: 'Profile', icon: User }
  ];

  const isCurrentActive = (id: AppView) => {
    if (currentView === id) return true;
    if (id === 'study' && ['subjects', 'flashcards', 'vocab-builder'].includes(currentView)) return true;
    if (id === 'practice' && ['question-bank', 'previous-years', 'wrong-notebook', 'revision', 'math-lab', 'mental-lab'].includes(currentView)) return true;
    if (id === 'exams' && ['daily-quiz', 'weekly-grand-test', 'rapid-revision', 'final-prep'].includes(currentView)) return true;
    if (id === 'profile' && ['analytics', 'leaderboard', 'bookmarks', 'study-planner'].includes(currentView)) return true;
    return false;
  };

  return (
    <>
      {/* Floating Sleek AI Button */}
      <div className="fixed right-5 bottom-20 md:bottom-8 z-40 flex flex-col items-end pointer-events-none">
        <div className="pointer-events-auto bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-200 mb-1.5 animate-bounce flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>যেকোনো প্রশ্ন জিজ্ঞেস করুন!</span>
        </div>
        <button
          id="floating-ai-mentor-btn"
          onClick={() => setIsAiMentorOpen(true)}
          aria-label="Ask Preli AI Mentor"
          className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white dark:border-slate-900 transform transition-transform hover:scale-105 active:scale-95 group"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">🤖</span>
            <span className="text-[8px] font-extrabold tracking-tighter text-emerald-400">PRELI AI</span>
          </div>
        </button>
      </div>

      {/* Bottom Bar for Mobile & Tablet */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl h-16 flex items-center justify-around px-2 sm:px-20 transition-colors">
        <div className="w-full max-w-lg mx-auto flex items-center justify-around">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isCurrentActive(item.id);
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[58px] ${
                  active
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110 text-emerald-600 dark:text-emerald-400' : ''}`} />
                <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight font-semibold">{item.label}</span>
                {active && (
                  <span className="w-1.5 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
