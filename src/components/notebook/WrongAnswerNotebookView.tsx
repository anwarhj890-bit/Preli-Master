import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play,
  Search,
  BookOpen
} from 'lucide-react';

export const WrongAnswerNotebookView: React.FC = () => {
  const {
    wrongQuestions,
    removeWrongQuestion,
    retryWrongQuestion,
    openAiMentorWithPrompt,
    navigateTo,
    playSound
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredWrong = wrongQuestions.filter(item => {
    const matchSubject = selectedSubject === 'all' || item.question.subjectId === selectedSubject;
    const matchSearch =
      item.question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.question.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  const handleStartMistakeClearanceTest = () => {
    if (wrongQuestions.length === 0) return;
    navigateTo('practice', {
      customQuestions: wrongQuestions.map(w => w.question),
      title: 'ভুলের খাতা রিভিশন ও ক্লিয়ারেন্স টেস্ট'
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {wrongQuestions.length}টি প্রশ্ন সংগৃহীত
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 flex items-center gap-2.5">
            <AlertTriangle className="w-7 h-7 text-rose-400" />
            আমার ভুলের খাতা (Mistake Notebook)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            মডেল টেস্ট ও অনুশীলনে ভুল করা সমস্ত প্রশ্ন এখানে স্বয়ংক্রিয়ভাবে জমা হয়
          </p>
        </div>

        {wrongQuestions.length > 0 && (
          <button
            onClick={handleStartMistakeClearanceTest}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-rose-950/40 flex items-center justify-center gap-2 transition hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            ভুল সংশোধনী টেস্ট শুরু করুন ({wrongQuestions.length}টি)
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ভুলের খাতায় প্রশ্ন খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-rose-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          {['all', 'bangla', 'english', 'bangladesh', 'international', 'math', 'ict'].map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition ${
                selectedSubject === s
                  ? 'bg-rose-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s === 'all' ? 'সব বিষয়' : s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* List of Wrong Questions */}
      {filteredWrong.length === 0 ? (
        <div className="rounded-3xl bg-slate-800/60 border border-slate-700/60 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-200">ভুলের খাতা খালি বা কোনো প্রশ্ন মেলেনি!</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            চমৎকার! আপনি যা অনুশীলন করেছেন সঠিকভাবে আয়ত্ত করেছেন অথবা ফিল্টারের সাথে প্রশ্ন মেলেনি।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWrong.map((item, idx) => {
            const q = item.question;
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 sm:p-6 space-y-4 shadow-xl"
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-bold">
                      {q.subjectName}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                      ভুল হয়েছে {item.mistakeCount} বার
                    </span>
                    <span className="text-slate-400">{q.examSource}</span>
                  </div>

                  <button
                    onClick={() => removeWrongQuestion(item.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition"
                    title="Remove from notebook"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>খাতা থেকে মুছুন</span>
                  </button>
                </div>

                {/* Question */}
                <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
                  {idx + 1}. {q.question}
                </h3>

                {/* Answers Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-rose-400 font-bold uppercase block">আপনার দেওয়া ভুল উত্তর:</span>
                      <span className="text-rose-200 font-semibold">{item.userAnswer || 'অনুক্ত ছিল'}</span>
                    </div>
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase block">সঠিক উত্তর:</span>
                      <span className="text-emerald-200 font-semibold">{q.correctAnswer}</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                </div>

                {/* Detailed Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> সঠিক ব্যাখ্যা ও বিশ্লেষণ:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/60">
                  <button
                    onClick={() => retryWrongQuestion(q)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-emerald-950/40"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> পুনরায় সমাধান করুন
                  </button>

                  <button
                    onClick={() =>
                      openAiMentorWithPrompt(
                        `প্রশ্ন: "${q.question}"\nআমার ভুল উত্তর ছিল: "${item.userAnswer}"\nসঠিক উত্তর: "${q.correctAnswer}"\n\nআমি কেন বারবার এখানে ভুল করছি? আমাকে মনে রাখার জন্য একটি সহজ ছন্দ বা ট্রিক দিন।`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI গভীর ব্যাখ্যা ও ট্রিক
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
