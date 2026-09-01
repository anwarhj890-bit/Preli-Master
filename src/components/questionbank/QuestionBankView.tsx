import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Question } from '../../types';
import {
  Database,
  Search,
  Filter,
  Bookmark,
  Sparkles,
  CheckCircle2,
  Calendar,
  Share2,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';

export const QuestionBankView: React.FC = () => {
  const { questions, subjects, toggleBookmark, isBookmarked, openAiMentorWithPrompt, navigateTo } = useApp();

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [onlyRepeated, setOnlyRepeated] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const bcsYears = ['45th BCS', '44th BCS', '43rd BCS', '42nd BCS', '41st BCS', '40th BCS', '38th BCS', '37th BCS', '35th BCS'];

  const filteredQuestions = questions.filter(q => {
    const matchYear = selectedYear === 'all' || q.bcsYear === selectedYear;
    const matchSubject = selectedSubject === 'all' || q.subjectId === selectedSubject;
    const matchRepeated = !onlyRepeated || q.isRepeated;
    const matchSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subjectName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchYear && matchSubject && matchRepeated && matchSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <Database className="w-7 h-7 text-emerald-400" />
            প্রশ্নব্যাংক ও বিগত বছরের প্রশ্ন (Question Bank)
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            ৩৫তম থেকে ৪৫তম বিসিএস এবং অন্যান্য নিয়োগ পরীক্ষার প্রমাণিক প্রশ্ন ও ব্যাখ্যা
          </p>
        </div>

        {filteredQuestions.length > 0 && (
          <button
            onClick={() =>
              navigateTo('practice', {
                customQuestions: filteredQuestions,
                title: 'প্রশ্নব্যাংক থেকে কাস্টম টেস্ট'
              })
            }
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            এই প্রশ্নগুলো অনুশীলন করুন ({filteredQuestions.length}টি)
          </button>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-4 shadow-xl">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="প্রশ্ন বা ব্যাখ্যার কোনো কি-ওয়ার্ড দিয়ে খুঁজুন (যেমন: চর্যাপদ, মুজিবনগর, অমর্ত্য সেন)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Year Filter Chips */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase">বিসিএস সাল নির্বাচন:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                selectedYear === 'all'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              সব বিসিএস (All)
            </button>
            {bcsYears.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                  selectedYear === yr
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Subject and Repeated Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/50">
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                selectedSubject === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              সকল বিষয়
            </button>
            {subjects.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                  selectedSubject === s.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-amber-300 cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <input
              type="checkbox"
              checked={onlyRepeated}
              onChange={e => setOnlyRepeated(e.target.checked)}
              className="rounded bg-slate-800 text-amber-400 focus:ring-0"
            />
            <span>🔥 শুধু বারবার আসা প্রশ্ন (Repeated)</span>
          </label>
        </div>
      </div>

      {/* Questions Results List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-3xl bg-slate-800/60 border border-slate-700/60 p-12 text-center text-slate-400">
            কোনো প্রশ্ন খুঁজে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 sm:p-6 space-y-4 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-amber-500/30 font-bold">
                    {q.examSource}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300">{q.subjectName}</span>
                  {q.isRepeated && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      {q.repeatFrequency || '৫+ বার এসেছে'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-amber-400 transition"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked(q.id) ? 'fill-amber-400 text-amber-400' : ''}`}
                    />
                  </button>
                  <button
                    onClick={() =>
                      openAiMentorWithPrompt(
                        `প্রশ্ন: "${q.question}"\nঅপশনসমূহ: ${q.options.join(', ')}\nসঠিক উত্তর: ${q.correctAnswer}\n\nএই প্রশ্নটির একটি গভীর ব্যাকরণিক/ঐতিহাসিক ব্যাখ্যা ও সংশ্লিষ্ট গুরুত্বপূর্ণ তথ্যসমূহ দিন।`
                      )
                    }
                    className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition flex items-center gap-1 font-bold text-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI ব্যাখ্যা</span>
                  </button>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
                {idx + 1}. {q.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      opt === q.correctAnswer
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {opt === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                ))}
              </div>

              {/* Explanation Box */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> প্রামাণিক ব্যাখ্যা:
                </span>
                <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
