import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';

// Views
import { HomeDashboard } from './components/home/HomeDashboard';
import { SubjectsView } from './components/subjects/SubjectsView';
import { StudyView } from './components/study/StudyView';
import { PracticeCenter } from './components/practice/PracticeCenter';
import { MockExamSimulator } from './components/exam/MockExamSimulator';
import { SmartRevisionView } from './components/revision/SmartRevisionView';
import { QuestionBankView } from './components/questionbank/QuestionBankView';
import { WrongAnswerNotebookView } from './components/notebook/WrongAnswerNotebookView';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { DailyQuizView } from './components/daily/DailyQuizView';
import { WeeklyGrandTestView } from './components/weekly/WeeklyGrandTestView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { FlashcardsView } from './components/flashcards/FlashcardsView';
import { CurrentAffairsView } from './components/affairs/CurrentAffairsView';
import { JobCircularsView } from './components/circulars/JobCircularsView';
import { StudyPlannerView } from './components/planner/StudyPlannerView';
import { MathMentalLab } from './components/special/MathMentalLab';
import { VocabBuilder } from './components/special/VocabBuilder';
import { MostImportantView } from './components/special/MostImportantView';
import { RapidRevisionModal, FinalPreparationModal } from './components/special/RapidRevisionModal';
import { BookmarksView } from './components/bookmarks/BookmarksView';
import { ProfileView } from './components/profile/ProfileView';

// Modals
import { PreliAIMentorModal } from './components/ai/PreliAIMentorModal';
import { GlobalSearchModal, NotificationModal } from './components/search/GlobalSearchModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeDashboard />;
      case 'subjects':
        return <SubjectsView />;
      case 'study':
        return <StudyView />;
      case 'practice':
        return <PracticeCenter />;
      case 'exams':
        return <MockExamSimulator />;
      case 'revision':
        return <SmartRevisionView />;
      case 'question-bank':
        return <QuestionBankView />;
      case 'notebook':
        return <WrongAnswerNotebookView />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'daily-quiz':
        return <DailyQuizView />;
      case 'weekly-grand-test':
        return <WeeklyGrandTestView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'flashcards':
        return <FlashcardsView />;
      case 'current-affairs':
        return <CurrentAffairsView />;
      case 'job-circulars':
        return <JobCircularsView />;
      case 'planner':
        return <StudyPlannerView />;
      case 'math-mental-lab':
        return <MathMentalLab />;
      case 'vocab-builder':
        return <VocabBuilder />;
      case 'most-important':
        return <MostImportantView />;
      case 'rapid-revision':
        return <RapidRevisionModal />;
      case 'final-prep':
        return <FinalPreparationModal />;
      case 'bookmarks':
        return <BookmarksView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Global Status Ticker */}
      <div className="bg-emerald-950 text-emerald-100 text-[10px] sm:text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center uppercase tracking-widest font-medium border-b border-emerald-900/60 select-none z-50">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>সাম্প্রতিক খবর: ৪৬তম বিসিএস পরীক্ষার তারিখ ঘোষণা...</span>
          </span>
          <span className="text-emerald-500 hidden sm:inline">●</span>
          <span className="hidden md:inline text-emerald-200">নতুন সার্কুলার: বাংলাদেশ ব্যাংক (সহকারী পরিচালক)</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-emerald-300">
          <span>অ্যাক্টিভ পরীক্ষার্থী: ১৪,৮২০+</span>
          <span className="text-emerald-500">●</span>
          <span className="text-emerald-400 font-bold">সার্ভার: অপটিমাল (০.২s)</span>
        </div>
      </div>

      {/* Top Header */}
      <Header />

      {/* Main Dynamic View Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 pb-28">
        {renderView()}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav />

      {/* Floating & Global Modals */}
      <PreliAIMentorModal />
      <GlobalSearchModal />
      <NotificationModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
