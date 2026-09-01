import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Question, ExamResult, SubjectId } from '../../types';
import {
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Bookmark,
  ChevronRight,
  Flag,
  Award,
  BarChart2,
  ArrowRight,
  ArrowLeft,
  Check,
  Layers,
  HelpCircle
} from 'lucide-react';

export const MockExamSimulator: React.FC = () => {
  const {
    questions,
    subjects,
    viewParams,
    saveExamResult,
    activeExam,
    setActiveExam,
    navigateTo,
    openAiMentorWithPrompt,
    playSound,
    triggerConfetti
  } = useApp();

  // Mode: 'select' | 'live' | 'result'
  const [examState, setExamState] = useState<'select' | 'live' | 'result'>(
    activeExam ? 'result' : 'select'
  );

  // Exam Configuration
  const [selectedExamType, setSelectedExamType] = useState<string>('Full BCS Preliminary Model Test');
  const [questionCount, setQuestionCount] = useState<number>(viewParams?.customConfig?.questionCount || 20);
  const [durationMinutes, setDurationMinutes] = useState<number>(viewParams?.customConfig?.timeMinutes || 20);

  // Live Exam State
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(durationMinutes * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Current result viewing
  const [currentResult, setCurrentResult] = useState<ExamResult | null>(activeExam);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'skipped'>('all');

  // Start Live Exam
  const handleStartExam = (preset?: { title: string; count: number; mins: number; subjectId?: SubjectId }) => {
    const totalQ = preset?.count || questionCount;
    const mins = preset?.mins || durationMinutes;
    const title = preset?.title || selectedExamType;

    let pool = [...questions];
    if (preset?.subjectId) {
      pool = pool.filter(q => q.subjectId === preset.subjectId);
    }
    if (pool.length === 0) pool = [...questions];

    // Pick questions
    const selected = pool.sort(() => 0.5 - Math.random()).slice(0, Math.min(totalQ, pool.length));

    setExamQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setFlagged({});
    setTimeLeft(mins * 60);
    setExamState('live');
    playSound('click');
  };

  // Timer Tick
  useEffect(() => {
    if (examState === 'live') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState, examQuestions, answers]);

  // Finish & Calculate BCS Score (1 mark correct, -0.5 mark wrong)
  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    const subjectStats: Record<string, { total: number; correct: number; wrong: number }> = {};

    examQuestions.forEach(q => {
      const subj = q.subjectId;
      if (!subjectStats[subj]) {
        subjectStats[subj] = { total: 0, correct: 0, wrong: 0 };
      }
      subjectStats[subj].total += 1;

      const userAns = answers[q.id];
      if (!userAns) {
        skipped += 1;
      } else if (userAns === q.correctAnswer) {
        correct += 1;
        subjectStats[subj].correct += 1;
      } else {
        wrong += 1;
        subjectStats[subj].wrong += 1;
      }
    });

    const negativeMarks = wrong * 0.5;
    const finalScore = Math.max(0, correct - negativeMarks);
    const accuracy = examQuestions.length - skipped > 0
      ? Math.round((correct / (correct + wrong)) * 100)
      : 0;

    const subjectScores = Object.entries(subjectStats).map(([subjId, stat]) => {
      const info = subjects.find(s => s.id === subjId);
      const subjScore = Math.max(0, stat.correct - stat.wrong * 0.5);
      return {
        subjectId: subjId as SubjectId,
        subjectName: info?.name || subjId,
        total: stat.total,
        correct: stat.correct,
        wrong: stat.wrong,
        score: subjScore
      };
    });

    const resultObj: ExamResult = {
      id: `exam-${Date.now()}`,
      examTitle: selectedExamType,
      examType: 'Mock Test',
      timestamp: Date.now(),
      totalQuestions: examQuestions.length,
      totalMarks: examQuestions.length,
      userScore: Number(finalScore.toFixed(2)),
      correctCount: correct,
      wrongCount: wrong,
      skippedCount: skipped,
      accuracy,
      timeUsedSeconds: durationMinutes * 60 - timeLeft,
      negativeMarksDeducted: Number((wrong * 0.5).toFixed(2)),
      rank: Math.floor(Math.random() * 50) + 1,
      totalCandidates: 2500,
      percentile: Math.min(99.4, Number((((correct / examQuestions.length) * 100)).toFixed(1))),
      subjectScores,
      weakTopicsIdentified: [],
      strongTopicsIdentified: [],
      questions: examQuestions,
      userAnswers: answers
    };

    saveExamResult(resultObj);
    setCurrentResult(resultObj);
    setExamState('result');
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = examQuestions[currentIndex];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. EXAM SELECTION & MODEL TEST CATALOG */}
      {examState === 'select' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
                <FileCheck className="w-7 h-7 text-emerald-400" />
                বিসিএস মডেল টেস্ট সিমুলেটর (Exam Simulator)
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                নেগেটিভ মার্কিংসহ (০.৫) বাস্তবধর্মী পূর্ণাঙ্গ ও বিষয়ভিত্তিক অনলাইন পরীক্ষা
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                নেগেটিভ মার্কিং: ০.৫ / ভুল
              </span>
            </div>
          </div>

          {/* Model Test Catalog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Grand Model Test 1 */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-900/40 via-slate-800 to-slate-900 border border-blue-500/30 p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    পূর্ণাঙ্গ বিসিএস
                  </span>
                  <span className="text-xs text-slate-400">১০টি বিষয়</span>
                </div>
                <h3 className="text-xl font-bold text-white">৪৬তম বিসিএস প্রিলি স্পেশাল মডেল টেস্ট - ০১</h3>
                <p className="text-xs text-slate-300">
                  বিসিএস সিলেবাসের অনুকরণে প্রণীত ২০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট।
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs text-slate-300 border-t border-slate-700/60 pt-2 font-semibold">
                  <span>প্রশ্ন: ২০০টি</span>
                  <span>সময়: ১২০ মিনিট</span>
                </div>
                <button
                  onClick={() =>
                    handleStartExam({
                      title: '৪৬তম বিসিএস প্রিলি স্পেশাল মডেল টেস্ট - ০১',
                      count: 20, // using high-yield pool
                      mins: 20
                    })
                  }
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-950/50 transition"
                >
                  পরীক্ষা শুরু করুন
                </button>
              </div>
            </div>

            {/* Subject-Wise Mega Test */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-900/40 via-slate-800 to-slate-900 border border-emerald-500/30 p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    বাংলাদেশ বিষয়াবলি
                  </span>
                  <span className="text-xs text-slate-400">৩০ নম্বর</span>
                </div>
                <h3 className="text-xl font-bold text-white">বাংলাদেশ বিষয়াবলি ক্র্যাক টেস্ট</h3>
                <p className="text-xs text-slate-300">
                  সংবিধান, মুক্তিযুদ্ধ, অর্থনীতি ও ইতিহাস ভিত্তিক পূর্ণাঙ্গ বিষয় টেস্ট।
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs text-slate-300 border-t border-slate-700/60 pt-2 font-semibold">
                  <span>প্রশ্ন: ৩০টি</span>
                  <span>সময়: ২৫ মিনিট</span>
                </div>
                <button
                  onClick={() =>
                    handleStartExam({
                      title: 'বাংলাদেশ বিষয়াবলি ক্র্যাক টেস্ট',
                      count: 30,
                      mins: 25,
                      subjectId: 'bangladesh'
                    })
                  }
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition"
                >
                  টেস্ট শুরু করুন
                </button>
              </div>
            </div>

            {/* Quick 20-Question Daily Sprint */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-900/40 via-slate-800 to-slate-900 border border-amber-500/30 p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    স্পিড ও একিউরেসি
                  </span>
                  <span className="text-xs text-slate-400">র‍্যাপিড স্প্রিন্ট</span>
                </div>
                <h3 className="text-xl font-bold text-white">১৫-মিনিট হাই-স্পিড মডেল টেস্ট</h3>
                <p className="text-xs text-slate-300">
                  সময় ব্যবস্থাপনা ও দ্রুত সঠিক সিদ্ধান্ত গ্রহণের বিশেষ স্পিড টেস্ট।
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs text-slate-300 border-t border-slate-700/60 pt-2 font-semibold">
                  <span>প্রশ্ন: ২০টি</span>
                  <span>সময়: ১৫ মিনিট</span>
                </div>
                <button
                  onClick={() =>
                    handleStartExam({
                      title: '১৫-মিনিট হাই-স্পিড মডেল টেস্ট',
                      count: 20,
                      mins: 15
                    })
                  }
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-950/50 transition"
                >
                  স্প্রিন্ট শুরু করুন
                </button>
              </div>
            </div>
          </div>

          {/* Previous Exam Results History */}
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              আপনার পূর্ববর্তী মডেল টেস্টের ইতিহাস
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 uppercase text-[11px]">
                    <th className="pb-3 font-semibold">পরীক্ষার নাম</th>
                    <th className="pb-3 font-semibold">তারিখ</th>
                    <th className="pb-3 font-semibold">স্কোর</th>
                    <th className="pb-3 font-semibold">সঠিক/ভুল</th>
                    <th className="pb-3 font-semibold">একিউরেসি</th>
                    <th className="pb-3 font-semibold text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-900/50 transition">
                    <td className="py-3.5 font-bold text-slate-200">৪৫তম বিসিএস ফুল মডেল টেস্ট - ৩</td>
                    <td className="py-3.5 text-slate-400">গতকাল</td>
                    <td className="py-3.5 font-extrabold text-amber-300 font-['Outfit']">১২৬.৫০ / ২০০</td>
                    <td className="py-3.5 text-slate-300">১৩৮ সঠিক • ২৩ ভুল</td>
                    <td className="py-3.5 text-emerald-400 font-bold">৮৫%</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() =>
                          handleStartExam({
                            title: '৪৫তম বিসিএস ফুল মডেল টেস্ট - ৩',
                            count: 20,
                            mins: 20
                          })
                        }
                        className="px-3 py-1 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold"
                      >
                        পুনরায় দিন
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. REALTIME LIVE EXAM INTERFACE */}
      {examState === 'live' && currentQ && (
        <div className="space-y-4">
          {/* Top Live Bar: Timer & Status */}
          <div className="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border border-slate-700/80 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-100 text-sm hidden sm:inline">{selectedExamType}</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                উত্তর দেওয়া: {Object.keys(answers).length} / {examQuestions.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Countdown Display */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-['Outfit'] font-black text-sm border ${
                  timeLeft < 300
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                    : 'bg-slate-800 border-slate-700 text-amber-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeft)}</span>
              </div>

              <button
                id="submit-exam-btn"
                onClick={() => {
                  if (window.confirm('আপনি কি নিশ্চিত যে পরীক্ষা সাবমিট করতে চান?')) {
                    handleFinishExam();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-md shadow-rose-950/40 transition"
              >
                সাবমিট করুন
              </button>
            </div>
          </div>

          {/* Main Exam Stage: Left Question & Right Nav Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Question Area */}
            <div className="lg:col-span-8 rounded-3xl bg-slate-800/90 border border-slate-700 p-6 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center">
                    {currentIndex + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{currentQ.subjectName}</span>
                </div>

                <button
                  onClick={() =>
                    setFlagged(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    flagged[currentQ.id]
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {flagged[currentQ.id] ? 'ফ্ল্যাগ করা আছে' : 'পর্যালোচনার জন্য রাখুন'}
                </button>
              </div>

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, i) => {
                  const isSelected = answers[currentQ.id] === opt;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
                        playSound('click');
                      }}
                      className={`w-full p-4 rounded-2xl text-left border text-sm sm:text-base flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold shadow-md shadow-emerald-950/40'
                          : 'bg-slate-900/70 hover:bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-700/60">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-30 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-4 h-4" /> পূর্ববর্তী
                </button>

                <button
                  onClick={() => {
                    setAnswers(prev => {
                      const next = { ...prev };
                      delete next[currentQ.id];
                      return next;
                    });
                  }}
                  className="text-xs text-slate-400 hover:text-rose-400 font-semibold"
                >
                  উত্তর মুছে ফেলুন
                </button>

                <button
                  onClick={() => {
                    if (currentIndex < examQuestions.length - 1) {
                      setCurrentIndex(prev => prev + 1);
                    }
                  }}
                  disabled={currentIndex === examQuestions.length - 1}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-emerald-950/40"
                >
                  পরবর্তী <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Question Grid Palette */}
            <div className="lg:col-span-4 rounded-3xl bg-slate-800/90 border border-slate-700 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  প্রশ্ন প্যালেট
                </h3>
                <span className="text-xs text-slate-400">{examQuestions.length} প্রশ্ন</span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>উত্তর দেওয়া ({Object.keys(answers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>ফ্ল্যাগ করা ({Object.keys(flagged).filter(k => flagged[k]).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-700" />
                  <span>অনুক্ত ({examQuestions.length - Object.keys(answers).length})</span>
                </div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1">
                {examQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAns = !!answers[q.id];
                  const isFlag = !!flagged[q.id];

                  let color = 'bg-slate-900 text-slate-400 border-slate-800';
                  if (isFlag) color = 'bg-purple-600/30 text-purple-200 border-purple-500';
                  else if (isAns) color = 'bg-emerald-500 text-slate-950 font-bold border-emerald-400';

                  if (isCurrent) color += ' ring-2 ring-amber-400';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl text-xs font-['Outfit'] border flex items-center justify-center transition-all ${color}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. DETAILED EXAM RESULT & PERFORMANCE AUDIT */}
      {examState === 'result' && currentResult && (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-2xl text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                পরীক্ষার রিপোর্ট ও মেধাতালিকা পূর্বাভাস
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentResult.examTitle}
              </h2>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                <span className="text-xs text-slate-400 font-medium">চূড়ান্ত স্কোর</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-['Outfit'] mt-1">
                  {currentResult.userScore} <span className="text-sm text-slate-400">/ {currentResult.totalMarks}</span>
                </p>
                <span className="text-[10px] text-slate-400">(০.৫ নেগেটিভ মার্কিং সহ)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
                <span className="text-xs text-emerald-400 font-medium">সঠিক উত্তর</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-['Outfit'] mt-1">
                  {currentResult.correctCount}টি
                </p>
                <span className="text-[10px] text-emerald-300 font-semibold">+{currentResult.correctCount} মার্কস</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/30">
                <span className="text-xs text-rose-400 font-medium">ভুল উত্তর</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-['Outfit'] mt-1">
                  {currentResult.wrongCount}টি
                </p>
                <span className="text-[10px] text-rose-400 font-semibold">-{(currentResult.wrongCount * 0.5).toFixed(1)} কাটা গেছে</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700">
                <span className="text-xs text-slate-400 font-medium">একিউরেসি রেট</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-['Outfit'] mt-1">
                  {currentResult.accuracy}%
                </p>
                <span className="text-[10px] text-slate-400">{currentResult.skippedCount}টি প্রশ্ন অনুক্ত</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => setExamState('select')}
                className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> মডেল টেস্ট ক্যাটালগে ফিরে যান
              </button>

              <button
                onClick={() =>
                  openAiMentorWithPrompt(
                    `আমি বিসিএস মডেল টেস্টে স্কোর করেছি ${currentResult.userScore}/${currentResult.totalMarks} (${currentResult.correctCount} সঠিক, ${currentResult.wrongCount} ভুল)। আমার কাট-অফ পাসের সম্ভাবনা বাড়াতে পরবর্তী ৩ দিনের একটি নিবিড় রিভিশন প্ল্যান দিন।`
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> AI পারফরম্যান্স অডিট নিন
              </button>
            </div>
          </div>

          {/* Subject-Wise Breakdown Table */}
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-400" />
              বিষয়ভিত্তিক ফলাফল বিশ্লেষণ (Subject Breakdown)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentResult.subjectScores.map(sb => (
                <div key={sb.subjectId} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 text-sm">{sb.subjectName}</span>
                    <span className="text-xs font-extrabold text-amber-300 font-['Outfit']">
                      {sb.score} / {sb.total}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="text-emerald-400 font-medium">সঠিক: {sb.correct}</span>
                    <span className="text-rose-400 font-medium">ভুল: {sb.wrong}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${Math.max(0, (sb.score / (sb.total || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution & Explanation Review */}
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
              <h3 className="font-bold text-slate-100 text-base">
                সম্পূর্ণ প্রশ্ন সমাধান ও বিশদ ব্যাখ্যা ({currentResult.questions.length}টি)
              </h3>

              <div className="flex items-center gap-1.5 text-xs">
                {(['all', 'wrong', 'correct', 'skipped'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setReviewFilter(f)}
                    className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition ${
                      reviewFilter === f
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {f === 'all' ? 'সব প্রশ্ন' : f === 'wrong' ? 'ভুল উত্তর' : f === 'correct' ? 'সঠিক' : 'অনুক্ত'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {currentResult.questions
                .filter(q => {
                  const userAns = currentResult.userAnswers[q.id];
                  if (reviewFilter === 'wrong') return userAns && userAns !== q.correctAnswer;
                  if (reviewFilter === 'correct') return userAns === q.correctAnswer;
                  if (reviewFilter === 'skipped') return !userAns;
                  return true;
                })
                .map((q, idx) => {
                  const userAns = currentResult.userAnswers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  const isSkipped = !userAns;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border space-y-3 ${
                        isSkipped
                          ? 'bg-slate-900/60 border-slate-700'
                          : isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-rose-950/20 border-rose-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-400">{q.subjectName}</span>
                        {isSkipped ? (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">অনুক্ত ছিল</span>
                        ) : isCorrect ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">সঠিক উত্তর (+১)</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">ভুল উত্তর (-০.৫)</span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-100 text-sm">
                        {idx + 1}. {q.question}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${
                              opt === q.correctAnswer
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                : opt === userAns
                                ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                                : 'bg-slate-900/50 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span>{opt}</span>
                            {opt === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                            {opt === userAns && opt !== q.correctAnswer && <XCircle className="w-4 h-4 text-rose-400" />}
                          </div>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                        <span className="font-bold text-amber-300 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" /> ব্যাখ্যা:
                        </span>
                        <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
