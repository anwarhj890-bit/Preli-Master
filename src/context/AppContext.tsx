import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SubjectInfo,
  Question,
  WrongQuestionRecord,
  Flashcard,
  CurrentAffairArticle,
  JobCircular,
  UserStats,
  ExamResult,
  StudyPlanItem,
  LeaderboardEntry,
  BookmarkCollection,
  SubjectId,
  ExamType
} from '../types';
import {
  INITIAL_SUBJECTS,
  INITIAL_QUESTIONS,
  INITIAL_FLASHCARDS,
  INITIAL_CURRENT_AFFAIRS,
  INITIAL_JOB_CIRCULARS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_LEADERBOARD,
  INITIAL_STUDY_PLAN
} from '../data/bcsDatabase';
import confetti from 'canvas-confetti';

export type AppView =
  | 'home'
  | 'study'
  | 'practice'
  | 'exams'
  | 'profile'
  | 'subjects'
  | 'analytics'
  | 'revision'
  | 'wrong-notebook'
  | 'question-bank'
  | 'previous-years'
  | 'daily-quiz'
  | 'weekly-grand-test'
  | 'leaderboard'
  | 'flashcards'
  | 'current-affairs'
  | 'job-circulars'
  | 'study-planner'
  | 'math-lab'
  | 'mental-lab'
  | 'vocab-builder'
  | 'most-important'
  | 'rapid-revision'
  | 'final-prep'
  | 'bookmarks';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  subjects: SubjectInfo[];
  questions: Question[];
  wrongQuestions: WrongQuestionRecord[];
  flashcards: Flashcard[];
  currentAffairs: CurrentAffairArticle[];
  jobCirculars: JobCircular[];
  userStats: UserStats;
  studyPlan: StudyPlanItem[];
  leaderboard: LeaderboardEntry[];
  collections: BookmarkCollection[];
  examHistory: ExamResult[];
  activeExam: ExamResult | null;
  setActiveExam: (exam: ExamResult | null) => void;
  
  // Navigation helper
  navigateTo: (view: AppView, params?: any) => void;
  viewParams: any;

  // Actions
  recordQuestionAnswer: (question: Question, chosenAnswer: string) => boolean;
  addWrongQuestion: (question: Question, userAnswer: string) => void;
  removeWrongQuestion: (id: string) => void;
  retryWrongQuestion: (question: Question) => void;
  
  toggleBookmark: (questionId: string, collectionId?: string) => void;
  isBookmarked: (questionId: string) => boolean;
  createCollection: (name: string, color: string) => void;
  
  toggleJobBookmark: (jobId: string) => void;
  toggleStudyPlanItem: (planId: string) => void;
  updateTargetExam: (exam: ExamType, targetDays: number) => void;
  updateProfile: (updates: Partial<UserStats>) => void;
  
  updateFlashcardStatus: (cardId: string, mastered: boolean) => void;
  saveExamResult: (result: ExamResult) => void;
  addCustomQuestions: (newQuestions: Question[]) => void;
  
  // AI Helper Modals
  isAiMentorOpen: boolean;
  setIsAiMentorOpen: (open: boolean) => void;
  aiMentorInitialPrompt: string;
  openAiMentorWithPrompt: (prompt: string) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;

  // Feedback sound & animation
  playSound: (type: 'correct' | 'wrong' | 'complete' | 'click') => void;
  triggerConfetti: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [viewParams, setViewParams] = useState<any>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('preli_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('preli_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [subjects] = useState<SubjectInfo[]>(INITIAL_SUBJECTS);
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('preli_questions');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });
  
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestionRecord[]>(() => {
    const saved = localStorage.getItem('preli_wrong_questions');
    if (saved) return JSON.parse(saved);
    // Seed with a few initial mistakes for demonstration
    return [
      {
        id: 'wq-1',
        question: INITIAL_QUESTIONS[4], // বীণাপাণি
        userAnswer: 'সমানাধিকরণ বহুব্রীহি',
        timestamp: Date.now() - 3600000 * 12,
        mistakeCount: 2,
        notes: 'ব্যধিকরণ ও সমানাধিকরণ এর পার্থক্য বারবার ভুল হচ্ছে'
      },
      {
        id: 'wq-2',
        question: INITIAL_QUESTIONS[7], // Subject-verb agreement
        userAnswer: 'Neither the teacher nor the students was present.',
        timestamp: Date.now() - 3600000 * 24,
        mistakeCount: 1,
        notes: 'Neither...nor এ নিকটবর্তী subject অনুসারে verb বসে'
      }
    ];
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('preli_flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [currentAffairs] = useState<CurrentAffairArticle[]>(INITIAL_CURRENT_AFFAIRS);
  const [jobCirculars, setJobCirculars] = useState<JobCircular[]>(() => {
    const saved = localStorage.getItem('preli_job_circulars');
    return saved ? JSON.parse(saved) : INITIAL_JOB_CIRCULARS;
  });

  const [studyPlan, setStudyPlan] = useState<StudyPlanItem[]>(() => {
    const saved = localStorage.getItem('preli_study_plan');
    return saved ? JSON.parse(saved) : INITIAL_STUDY_PLAN;
  });

  const [collections, setCollections] = useState<BookmarkCollection[]>(() => {
    const saved = localStorage.getItem('preli_collections');
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'col-1', name: 'My Important Questions', color: '#f59e0b', questionIds: ['q-bn-1', 'q-bd-1', 'q-int-1'] },
          { id: 'col-2', name: 'BCS Must Read', color: '#10b981', questionIds: ['q-bn-2', 'q-bd-2'] },
          { id: 'col-3', name: 'Last Week Revision', color: '#3b82f6', questionIds: ['q-en-3'] }
        ];
  });

  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => {
    const saved = localStorage.getItem('preli_exam_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeExam, setActiveExam] = useState<ExamResult | null>(null);

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('preli_user_stats');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'অনামিকা সেনগুপ্ত',
          targetExam: 'BCS Preliminary' as ExamType,
          examDate: '2027-01-15',
          dailyTargetMCQs: 50,
          dailyTargetTopics: 2,
          dailyTargetMiniTests: 1,
          todaySolvedMCQs: 39,
          todayCompletedTopics: 2,
          todayCompletedMiniTests: 1,
          totalQuestionsSolved: 8425,
          overallAccuracy: 81,
          totalTestsCompleted: 67,
          studyStreakDays: 23,
          xpPoints: 12450,
          level: 14,
          nationalRank: 1284,
          district: 'ঢাকা',
          university: 'ঢাকা বিশ্ববিদ্যালয়',
          achievements: INITIAL_ACHIEVEMENTS
        };
  });

  const [leaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);

  // Modals
  const [isAiMentorOpen, setIsAiMentorOpen] = useState<boolean>(false);
  const [aiMentorInitialPrompt, setAiMentorInitialPrompt] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('preli_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('preli_sound_enabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('preli_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('preli_wrong_questions', JSON.stringify(wrongQuestions));
  }, [wrongQuestions]);

  useEffect(() => {
    localStorage.setItem('preli_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('preli_job_circulars', JSON.stringify(jobCirculars));
  }, [jobCirculars]);

  useEffect(() => {
    localStorage.setItem('preli_study_plan', JSON.stringify(studyPlan));
  }, [studyPlan]);

  useEffect(() => {
    localStorage.setItem('preli_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('preli_user_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('preli_exam_history', JSON.stringify(examHistory));
  }, [examHistory]);

  const navigateTo = (view: AppView, params?: any) => {
    setCurrentView(view);
    setViewParams(params || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playSound = (type: 'correct' | 'wrong' | 'complete' | 'click') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'wrong') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(146.83, audioCtx.currentTime + 0.2); // D3
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'complete') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      }
    } catch (e) {
      // AudioContext might be blocked until first user gesture
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899']
      });
    } catch (e) {}
  };

  const recordQuestionAnswer = (question: Question, chosenAnswer: string): boolean => {
    const isCorrect = chosenAnswer === question.correctAnswer;
    
    // Update stats
    setUserStats(prev => {
      const newSolved = prev.todaySolvedMCQs + 1;
      const totalSolved = prev.totalQuestionsSolved + 1;
      const xpGain = isCorrect ? 15 : 2;
      return {
        ...prev,
        todaySolvedMCQs: newSolved,
        totalQuestionsSolved: totalSolved,
        xpPoints: prev.xpPoints + xpGain,
        level: Math.floor((prev.xpPoints + xpGain) / 1000) + 1
      };
    });

    if (isCorrect) {
      playSound('correct');
      // If was previously wrong, check if we want to remove from notebook or update mistake stats
    } else {
      playSound('wrong');
      addWrongQuestion(question, chosenAnswer);
    }

    return isCorrect;
  };

  const addWrongQuestion = (question: Question, userAnswer: string) => {
    setWrongQuestions(prev => {
      const existing = prev.find(item => item.question.id === question.id);
      if (existing) {
        return prev.map(item =>
          item.question.id === question.id
            ? { ...item, userAnswer, mistakeCount: item.mistakeCount + 1, timestamp: Date.now() }
            : item
        );
      }
      return [
        {
          id: `wq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          question,
          userAnswer,
          timestamp: Date.now(),
          mistakeCount: 1
        },
        ...prev
      ];
    });
  };

  const removeWrongQuestion = (id: string) => {
    setWrongQuestions(prev => prev.filter(item => item.id !== id));
  };

  const retryWrongQuestion = (question: Question) => {
    navigateTo('practice', {
      customQuestions: [question],
      title: 'ভুলের খাতা থেকে প্রশ্ন সমাধান'
    });
  };

  const toggleBookmark = (questionId: string, collectionId: string = 'col-1') => {
    setCollections(prev => {
      return prev.map(col => {
        if (col.id === collectionId) {
          const exists = col.questionIds.includes(questionId);
          return {
            ...col,
            questionIds: exists
              ? col.questionIds.filter(id => id !== questionId)
              : [...col.questionIds, questionId]
          };
        }
        return col;
      });
    });
  };

  const isBookmarked = (questionId: string): boolean => {
    return collections.some(col => col.questionIds.includes(questionId));
  };

  const createCollection = (name: string, color: string) => {
    const newCol: BookmarkCollection = {
      id: `col-${Date.now()}`,
      name,
      color,
      questionIds: []
    };
    setCollections(prev => [...prev, newCol]);
  };

  const toggleJobBookmark = (jobId: string) => {
    setJobCirculars(prev =>
      prev.map(job => (job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job))
    );
  };

  const toggleStudyPlanItem = (planId: string) => {
    setStudyPlan(prev =>
      prev.map(item => {
        if (item.id === planId) {
          const newState = !item.isCompleted;
          if (newState) {
            playSound('complete');
            triggerConfetti();
          }
          return { ...item, isCompleted: newState };
        }
        return item;
      })
    );
  };

  const updateTargetExam = (exam: ExamType, targetDays: number) => {
    const targetDate = new Date(Date.now() + targetDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setUserStats(prev => ({
      ...prev,
      targetExam: exam,
      examDate: targetDate
    }));
  };

  const updateProfile = (updates: Partial<UserStats>) => {
    setUserStats(prev => ({ ...prev, ...updates }));
  };

  const updateFlashcardStatus = (cardId: string, mastered: boolean) => {
    setFlashcards(prev =>
      prev.map(card =>
        card.id === cardId
          ? { ...card, mastered, lastReviewed: Date.now() }
          : card
      )
    );
  };

  const saveExamResult = (result: ExamResult) => {
    setExamHistory(prev => [result, ...prev]);
    setActiveExam(result);
    playSound('complete');
    triggerConfetti();

    // Update tests completed and accuracy
    setUserStats(prev => {
      const tests = prev.totalTestsCompleted + 1;
      const xp = prev.xpPoints + Math.round(result.userScore * 5);
      return {
        ...prev,
        totalTestsCompleted: tests,
        xpPoints: xp,
        level: Math.floor(xp / 1000) + 1
      };
    });
  };

  const addCustomQuestions = (newQuestions: Question[]) => {
    setQuestions(prev => [...newQuestions, ...prev]);
  };

  const openAiMentorWithPrompt = (prompt: string) => {
    setAiMentorInitialPrompt(prompt);
    setIsAiMentorOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        darkMode,
        setDarkMode,
        soundEnabled,
        setSoundEnabled,
        subjects,
        questions,
        wrongQuestions,
        flashcards,
        currentAffairs,
        jobCirculars,
        userStats,
        studyPlan,
        leaderboard,
        collections,
        examHistory,
        activeExam,
        setActiveExam,
        navigateTo,
        viewParams,
        recordQuestionAnswer,
        addWrongQuestion,
        removeWrongQuestion,
        retryWrongQuestion,
        toggleBookmark,
        isBookmarked,
        createCollection,
        toggleJobBookmark,
        toggleStudyPlanItem,
        updateTargetExam,
        updateProfile,
        updateFlashcardStatus,
        saveExamResult,
        addCustomQuestions,
        isAiMentorOpen,
        setIsAiMentorOpen,
        aiMentorInitialPrompt,
        openAiMentorWithPrompt,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        playSound,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
