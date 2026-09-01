import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Question, SubjectId } from '../../types';
import {
  Target,
  Filter,
  Play,
  RotateCcw,
  Sparkles,
  Bookmark,
  Share2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Zap,
  Check,
  AlertCircle
} from 'lucide-react';

export const PracticeCenter: React.FC = () => {
  const {
    subjects,
    questions,
    viewParams,
    recordQuestionAnswer,
    toggleBookmark,
    isBookmarked,
    openAiMentorWithPrompt,
    playSound
  } = useApp();

  // Filters State
  const [selectedExam, setSelectedExam] = useState<string>('BCS');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(viewParams?.subjectId || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Mixed');
  const [selectedSource, setSelectedSource] = useState<string>('Previous BCS');
  const [questionCount, setQuestionCount] = useState<number>(viewParams?.count || 10);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<string>('No Time Limit');

  // Active Practice Session State
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Filter and start practice session
  const handleGeneratePractice = () => {
    let pool = [...questions];

    if (viewParams?.customQuestions && viewParams.customQuestions.length > 0) {
      pool = viewParams.customQuestions;
    } else {
      if (selectedSubjectId !== 'all') {
        pool = pool.filter(q => q.subjectId === selectedSubjectId);
      }
      if (selectedDifficulty !== 'Mixed') {
        pool = pool.filter(q => q.difficulty === selectedDifficulty);
      }
      if (selectedSource === 'Frequently Repeated') {
        pool = pool.filter(q => q.isRepeated);
      }
    }

    if (pool.length === 0) {
      pool = [...questions];
    }

    // Shuffle and slice
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, questionCount);
    setPracticeQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
    setIsPracticing(true);
    playSound('click');
  };

  const handleSelectOption = (option: string) => {
    const currentQ = practiceQuestions[currentIndex];
    if (userAnswers[currentQ.id]) return; // already answered

    const newAnswers = { ...userAnswers, [currentQ.id]: option };
    setUserAnswers(newAnswers);
    setShowExplanation(true);
    recordQuestionAnswer(currentQ, option);
  };

  const currentQ = practiceQuestions[currentIndex];
  const totalCorrect = Object.entries(userAnswers).filter(([id, ans]) => {
    const q = practiceQuestions.find(item => item.id === id);
    return q && q.correctAnswer === ans;
  }).length;

  return (
    <div className="space-y-6 pb-12">
      {!isPracticing ? (
        // 1. PRACTICE GENERATOR CONFIGURATION
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
              <Target className="w-7 h-7 text-emerald-400" />
              অনুশীলন সেন্টার (Practice Center)
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              কাস্টম ফিল্টার প্রয়োগ করে নিজের পছন্দমতো প্রশ্নব্যাংক থেকে আনলিমিটেড প্র্যাকটিস করুন
            </p>
          </div>

          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-6 shadow-2xl">
            {/* Filter 1: Target Exam */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                ১. পরীক্ষার ধরণ (Target Exam):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {['BCS', 'Bank', 'Primary', 'NTRCA', 'Govt Jobs', 'Custom'].map(exam => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition border ${
                      selectedExam === exam
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-950/40'
                        : 'bg-slate-900/60 hover:bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Subject */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                ২. বিষয় নির্বাচন (Subject):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedSubjectId('all')}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition border ${
                    selectedSubjectId === 'all'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-900/60 hover:bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  সব বিষয় (All Subjects)
                </button>
                {subjects.map(subj => (
                  <button
                    key={subj.id}
                    onClick={() => setSelectedSubjectId(subj.id)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold truncate transition border ${
                      selectedSubjectId === subj.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-900/60 hover:bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {subj.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Difficulty & Source */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  ৩. কাঠিন্যের মাত্রা (Difficulty):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Easy', 'Medium', 'Hard', 'Mixed'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                        selectedDifficulty === diff
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                          : 'bg-slate-900/60 text-slate-300 border-slate-700'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  ৪. প্রশ্নের উৎস (Question Source):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Previous BCS', 'Frequently Repeated', 'Model Questions', 'All Sources'].map(src => (
                    <button
                      key={src}
                      onClick={() => setSelectedSource(src)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold truncate transition border ${
                        selectedSource === src
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                          : 'bg-slate-900/60 text-slate-300 border-slate-700'
                      }`}
                    >
                      {src}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter 4: Number of Questions & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  ৫. প্রশ্নের সংখ্যা (Number of Questions):
                </label>
                <div className="flex items-center gap-2">
                  {[5, 10, 20, 30, 50, 100].map(cnt => (
                    <button
                      key={cnt}
                      onClick={() => setQuestionCount(cnt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                        questionCount === cnt
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold'
                          : 'bg-slate-900/60 text-slate-300 border-slate-700'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  ৬. সময়সীমা (Timer):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['No Time Limit', '10 min', '20 min'].map(tm => (
                    <button
                      key={tm}
                      onClick={() => setSelectedTimeLimit(tm)}
                      className={`py-2 rounded-xl text-xs font-bold truncate transition border ${
                        selectedTimeLimit === tm
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-900/60 text-slate-300 border-slate-700'
                      }`}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-4 border-t border-slate-700">
              <button
                id="generate-test-btn"
                onClick={handleGeneratePractice}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                GENERATE TEST ({questionCount} MCQs)
              </button>
            </div>
          </div>
        </div>
      ) : isFinished ? (
        // 2. PRACTICE SESSION COMPLETED SUMMARY
        <div className="max-w-2xl mx-auto rounded-3xl bg-slate-800/90 border border-slate-700 p-7 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">অনুশীলন সেশন সম্পন্ন!</h2>
            <p className="text-slate-400 text-sm">
              আপনার ফলাফল বিশ্লেষণ ও প্রস্তুতি হালনাগাদ করা হয়েছে।
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
            <div>
              <span className="text-xs text-slate-400">মোট প্রশ্ন</span>
              <p className="text-xl font-bold text-white font-['Outfit']">{practiceQuestions.length}</p>
            </div>
            <div>
              <span className="text-xs text-emerald-400">সঠিক উত্তর</span>
              <p className="text-xl font-bold text-emerald-400 font-['Outfit']">{totalCorrect}</p>
            </div>
            <div>
              <span className="text-xs text-rose-400">ভুল উত্তর</span>
              <p className="text-xl font-bold text-rose-400 font-['Outfit']">
                {practiceQuestions.length - totalCorrect}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsPracticing(false)}
              className="flex-1 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition"
            >
              নতুন ফিল্টার
            </button>
            <button
              onClick={handleGeneratePractice}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> আবার অনুশীলন করুন
            </button>
          </div>
        </div>
      ) : (
        // 3. INTERACTIVE PRACTICE QUESTION SOLVER
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Top Session Progress Bar */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                প্রশ্ন {currentIndex + 1} / {practiceQuestions.length}
              </span>
              <span className="text-xs text-slate-400">{currentQ.subjectName}</span>
            </div>

            <button
              onClick={() => setIsFinished(true)}
              className="text-xs font-bold text-rose-400 hover:underline"
            >
              অনুশীলন শেষ করুন
            </button>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / practiceQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="rounded-3xl bg-slate-800/90 border border-slate-700/80 p-6 space-y-5 shadow-2xl">
            {/* Meta Tags */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {currentQ.examSource}
                </span>
                {currentQ.isRepeated && (
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                    🔥 বারবার আসে ({currentQ.repeatFrequency || '৫+ বার'})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(currentQ.id)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-amber-400 transition"
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(currentQ.id) ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
                <button
                  onClick={() =>
                    openAiMentorWithPrompt(
                      `প্রশ্ন: "${currentQ.question}"\nঅপশনসমূহ: ${currentQ.options.join(', ')}\nসঠিক উত্তর: ${currentQ.correctAnswer}\n\nএই প্রশ্নটির একটি চমৎকার বিসিএস স্ট্যান্ডার্ড সহজ ব্যাখ্যা ও স্মৃতিসহায়ক ছন্দ দিন।`
                    )
                  }
                  className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition flex items-center gap-1 text-xs font-bold"
                  title="Ask AI"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI ব্যাখ্যা</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
              {currentIndex + 1}. {currentQ.question}
            </h3>

            {/* 4 Options Grid */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, i) => {
                const isSelected = userAnswers[currentQ.id] === opt;
                const isAnswered = !!userAnswers[currentQ.id];
                const isCorrect = opt === currentQ.correctAnswer;

                let btnStyle = 'bg-slate-900/70 hover:bg-slate-900 border-slate-700 text-slate-200';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-950/40';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold shadow-md shadow-rose-950/40';
                  } else {
                    btnStyle = 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-3.5 rounded-2xl text-left border text-sm sm:text-base flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detailed Explanation Box */}
            {showExplanation && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> বিশদ ব্যাখ্যা:
                  </span>
                  <button
                    onClick={() =>
                      openAiMentorWithPrompt(
                        `প্রশ্ন: "${currentQ.question}"\nবিষয়: ${currentQ.subjectName}\nসঠিক উত্তর: ${currentQ.correctAnswer}\n\nকেন এই উত্তরটি সঠিক এবং বিসিএস পরীক্ষায় এই টপিক থেকে আর কী ধরনের প্রশ্ন আসতে পারে বিস্তারিত বুঝিয়ে দিন।`
                      )
                    }
                    className="text-[11px] text-amber-300 font-bold hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> এআই মেন্টর থেকে আরও জানুন
                  </button>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Question Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
              <button
                disabled={currentIndex === 0}
                onClick={() => {
                  setCurrentIndex(prev => prev - 1);
                  setShowExplanation(!!userAnswers[practiceQuestions[currentIndex - 1]?.id]);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" /> পূর্ববর্তী
              </button>

              {currentIndex < practiceQuestions.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentIndex(prev => prev + 1);
                    setShowExplanation(!!userAnswers[practiceQuestions[currentIndex + 1]?.id]);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-emerald-950/40"
                >
                  পরবর্তী <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsFinished(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition shadow-lg"
                >
                  ফলাফল দেখুন <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
