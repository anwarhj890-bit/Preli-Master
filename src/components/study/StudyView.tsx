import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyTopic, SubjectInfo } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Calendar,
  UserCheck,
  Zap,
  ArrowLeft,
  FileCheck,
  Target,
  Bookmark,
  Share2,
  HelpCircle,
  Clock
} from 'lucide-react';

export const StudyView: React.FC = () => {
  const { subjects, questions, viewParams, navigateTo, openAiMentorWithPrompt, toggleBookmark, isBookmarked } = useApp();

  // Find selected subject
  const initialSubjectId = viewParams?.subjectId || 'bangladesh';
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId);
  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  // Topics for current subject
  const topics = currentSubject.topics && currentSubject.topics.length > 0
    ? currentSubject.topics
    : [
        {
          id: `${currentSubject.id}-demo-1`,
          subjectId: currentSubject.id,
          title: 'Primary Core Syllabus',
          banglaTitle: `${currentSubject.name} এর মৌলিক অধ্যায় ও গুরুত্বপূর্ণ তথ্য`,
          completionPercent: 50,
          shortNotes: `${currentSubject.name} অংশ থেকে প্রতি বছর বিসিএস প্রিলিমিনারিতে নির্ধারিত সিলেবাস অনুসারে প্রায় ${currentSubject.marks} নম্বরের প্রশ্ন আসে। বিগত বছরের প্রশ্ন বিশ্লেষণ ও মূল তথ্য আয়ত্ত করা আবশ্যক।`,
          concepts: [
            'বিগত ১০টি বিসিএস পরীক্ষার প্রশ্নাবলি বিশদ সমাধান করুন।',
            'গুরুত্বপূর্ণ পরিভাষা, সংজ্ঞা ও আন্তর্জাতিক/জাতীয় প্রেক্ষিতে প্রয়োগ বুঝুন।',
            'পরীক্ষার হলে বিভ্রান্তি সৃষ্টিকারী অপশনগুলো সতর্কতার সাথে বর্জন করুন।'
          ],
          importantFacts: [
            `${currentSubject.name} থেকে বিগত ৫ বছরের প্রশ্ন বিশ্লেষণ করে প্রায় ৬০% প্রশ্ন প্রত্যক্ষ বা পরোক্ষভাবে কমন আসে।`,
            'নিয়মিত রিভিশন ও ভুলের খাতা পর্যালোচনা সাফল্যের মূল চাবিকাঠি।'
          ],
          mnemonics: ['স্মৃতি সহায়ক টেকনিকের সাহায্যে কঠিন তালিকা ও সাল মনে রাখুন।'],
          commonTraps: ['সাদৃশ্যপূর্ণ অপশনের ফাঁদে না পড়ে সঠিক সংজ্ঞাটি মনে রাখুন।'],
          examTips: ['প্রতিটি অধ্যায় পড়ার পর সাথে সাথে ২০টি এমসিকিউ প্র্যাকটিস করুন।'],
          relatedQuestionIds: []
        }
      ];

  const [selectedTopic, setSelectedTopic] = useState<StudyTopic>(topics[0]);
  const [activeTab, setActiveTab] = useState<'notes' | 'facts' | 'mnemonics' | 'traps' | 'mcqs'>('notes');

  // Filter related questions
  const topicQuestions = questions.filter(
    q => q.subjectId === currentSubject.id || selectedTopic.relatedQuestionIds.includes(q.id)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Subject Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subjects.map(subj => {
          const isSelected = subj.id === selectedSubjectId;
          return (
            <button
              key={subj.id}
              onClick={() => {
                setSelectedSubjectId(subj.id);
                const firstTopic = subj.topics?.[0];
                if (firstTopic) setSelectedTopic(firstTopic);
              }}
              className={`px-3.5 py-2 rounded-2xl whitespace-nowrap text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/40 scale-105'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {subj.name} ({subj.marks})
            </button>
          );
        })}
      </div>

      {/* Main Study Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topics List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                অধ্যায় ও টপিক সিলেবাস
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{topics.length}টি টপিক</span>
            </div>

            <div className="space-y-2">
              {topics.map(t => {
                const active = t.id === selectedTopic.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopic(t)}
                    className={`w-full p-3 rounded-2xl text-left transition-all flex flex-col gap-1.5 border ${
                      active
                        ? 'bg-slate-900 border-emerald-500/60 shadow-md shadow-emerald-950/30'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-100">{t.banglaTitle}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400">
                        {t.completionPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${t.completionPercent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* AI Assistant Generator Helper */}
            <div className="pt-2 border-t border-slate-700/50">
              <button
                onClick={() =>
                  openAiMentorWithPrompt(
                    `আমি ${currentSubject.name} বিষয়ের "${selectedTopic.banglaTitle}" পড়ছি। আমাকে বিসিএস পরীক্ষার সবচেয়ে কার্যকর শর্টকাট নোটস, ট্র্যাপ ও ৫টি মডেল এমসিকিউ দিন।`
                  )
                }
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                AI-তে আরও বিস্তারিত নোটস নিন
              </button>
            </div>
          </div>
        </div>

        {/* Right Study Reader */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 sm:p-6 space-y-5">
            {/* Topic Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {currentSubject.name} • {selectedTopic.title}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 mt-1">
                  {selectedTopic.banglaTitle}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    openAiMentorWithPrompt(
                      `আমাকে "${selectedTopic.banglaTitle}" এর উপর একটি ৩ মিনিটের র্যাপিড মেমোরি রিভিশন সামারি দিন।`
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  AI সামারি
                </button>
                <button
                  onClick={() =>
                    navigateTo('practice', {
                      subjectId: currentSubject.id,
                      topic: selectedTopic.banglaTitle,
                      count: 20
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Target className="w-3.5 h-3.5" />
                  ২০ MCQ টেস্ট
                </button>
              </div>
            </div>

            {/* Navigation Tabs for Topic Details */}
            <div className="flex items-center gap-1.5 border-b border-slate-700 pb-2 overflow-x-auto scrollbar-none text-xs font-bold">
              {[
                { id: 'notes', label: '📖 শর্ট নোটস ও ধারণা', icon: BookOpen },
                { id: 'facts', label: '⭐ গুরুত্বপূর্ণ তথ্য ও সাল', icon: Lightbulb },
                { id: 'mnemonics', label: '🧠 শর্টকাট ও স্মৃতিছন্দ', icon: Zap },
                { id: 'traps', label: '⚠️ বিসিএস ট্র্যাপ ও টিপস', icon: AlertTriangle },
                { id: 'mcqs', label: '📝 সম্পর্কিত MCQ', icon: HelpCircle }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Short Notes & Core Concepts */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 leading-relaxed text-slate-200 text-sm sm:text-base">
                  <p>{selectedTopic.shortNotes}</p>
                </div>

                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    মূল ধারণাসমূহ (Core Concepts):
                  </h4>
                  <div className="space-y-2">
                    {selectedTopic.concepts.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-300 text-sm flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Personalities if any */}
                {selectedTopic.keyPersonalities && selectedTopic.keyPersonalities.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-blue-400" />
                      ঐতিহাসিক ব্যক্তিত্ব ও অবদান:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedTopic.keyPersonalities.map((p, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                          <span className="text-xs font-bold text-emerald-300">{p.name} ({p.role})</span>
                          <p className="text-xs text-slate-300">{p.contribution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Important Facts & Key Dates */}
            {activeTab === 'facts' && (
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    সবচেয়ে বেশি জিজ্ঞাসিত তথ্য (Frequently Asked Facts):
                  </h4>
                  <ul className="space-y-2">
                    {selectedTopic.importantFacts.map((f, i) => (
                      <li
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 text-sm flex items-start gap-2"
                      >
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedTopic.keyDates && selectedTopic.keyDates.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      গুরুত্বপূর্ণ সাল ও ঐতিহাসিক ঘটনা:
                    </h4>
                    <div className="space-y-2">
                      {selectedTopic.keyDates.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-sm"
                        >
                          <span className="font-bold text-amber-400">{d.date}</span>
                          <span className="text-slate-300 text-right">{d.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Mnemonics & Memory Tricks */}
            {activeTab === 'mnemonics' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 space-y-3">
                  <h4 className="font-bold text-purple-300 text-base flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    স্মৃতিসহায়ক ছন্দ ও শর্টকাট কৌশল (Mnemonics)
                  </h4>
                  <p className="text-xs text-slate-300">
                    জটিল বিষয়সমূহ সহজে মস্তিষ্কে দীর্ঘস্থায়ী করার জন্য পরীক্ষিত শর্টকাট:
                  </p>
                  <div className="space-y-2.5 pt-1">
                    {selectedTopic.mnemonics.map((m, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-900/90 border border-purple-500/20 text-slate-100 font-medium text-sm leading-relaxed">
                        ✨ {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Common Traps & Exam Tips */}
            {activeTab === 'traps' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
                  <h4 className="font-bold text-rose-300 text-base flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    পরীক্ষায় যে ভুলগুলো বেশি হয় (BCS Traps)
                  </h4>
                  <div className="space-y-2">
                    {selectedTopic.commonTraps.map((trap, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-slate-200 text-sm flex items-start gap-2">
                        <span className="text-rose-400 font-bold">⚠️</span>
                        <span>{trap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                  <h4 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                    টপ-র‍্যাঙ্কারদের পরামর্শ (Exam Tips)
                  </h4>
                  <div className="space-y-2">
                    {selectedTopic.examTips.map((tip, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-slate-200 text-sm flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">💡</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Related Questions & MCQs */}
            {activeTab === 'mcqs' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-100 text-sm">
                    এই টপিকের বিগত ও মডেল প্রশ্নসমূহ ({topicQuestions.length}টি)
                  </h4>
                  <button
                    onClick={() =>
                      navigateTo('practice', {
                        subjectId: currentSubject.id,
                        topic: selectedTopic.banglaTitle
                      })
                    }
                    className="text-xs text-emerald-400 font-bold hover:underline"
                  >
                    অনুশীলন সেন্টারে শুরু করুন
                  </button>
                </div>

                <div className="space-y-3">
                  {topicQuestions.map((q, i) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700 font-semibold">
                          {q.examSource}
                        </span>
                        <span className="text-slate-400">{q.difficulty}</span>
                      </div>
                      <h5 className="font-bold text-slate-100 text-sm">
                        {i + 1}. {q.question}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        {q.options.map((opt, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-xl border ${
                              opt === q.correctAnswer
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold'
                                : 'bg-slate-800/40 border-slate-800 text-slate-300'
                            }`}
                          >
                            {opt} {opt === q.correctAnswer && '✓'}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 pt-1.5 border-t border-slate-800 leading-relaxed">
                        <strong className="text-slate-300">ব্যাখ্যা:</strong> {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom "TEST YOURSELF" Signature Action Strip */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  টপিকটি শেষ করেছেন?
                </span>
                <h3 className="text-lg font-extrabold text-white">
                  নিজের প্রস্তুতি পরীক্ষা করুন (TEST YOURSELF)
                </h3>
                <p className="text-xs text-slate-400">
                  এই অধ্যায়ের ২০টি বাছাইকৃত প্রশ্নে অংশ নিয়ে একিউরেসি যাচাই করুন।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    navigateTo('practice', {
                      subjectId: currentSubject.id,
                      topic: selectedTopic.banglaTitle,
                      count: 20
                    })
                  }
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-950/50 transition hover:scale-105"
                >
                  ২০ MCQ টেস্ট শুরু করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
