import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Target,
  BookOpen,
  Flame,
  RotateCcw,
  BarChart3,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Trophy,
  Newspaper,
  Briefcase,
  Layers,
  ArrowRight,
  Zap,
  ShieldCheck,
  Brain,
  Calculator
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const {
    userStats,
    subjects,
    wrongQuestions,
    jobCirculars,
    currentAffairs,
    leaderboard,
    navigateTo,
    setIsAiMentorOpen,
    openAiMentorWithPrompt
  } = useApp();

  // Calculate days remaining
  const targetDate = new Date(userStats.examDate).getTime();
  const now = new Date().getTime();
  const diffDays = Math.max(0, Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24)));
  const progressPercent = Math.min(100, Math.round((userStats.todaySolvedMCQs / userStats.dailyTargetMCQs) * 100));

  return (
    <div className="space-y-6 pb-6">
      {/* Top Main Dashboard View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Status, Progress & Analytics (4 cols) */}
        <section className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          {/* Progress Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800 dark:text-slate-200 text-base">সামগ্রিক অগ্রগতি</h2>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg font-['Outfit']">
                {progressPercent}%
              </span>
            </div>
            
            <div className="relative h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
              <div
                className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">আজকের লক্ষ্য</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-1 text-sm">{progressPercent}% সম্পন্ন</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">প্রশ্নের উত্তর</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-1 text-sm font-['Outfit']">{userStats.totalQuestionsSolved.toLocaleString()}+</p>
              </div>
            </div>
          </div>

          {/* Analytics & Streak Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex-1 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-800 dark:text-slate-200 text-base">পারফরম্যান্স এনালিটিক্স</h2>
              <button
                onClick={() => navigateTo('analytics')}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                বিস্তারিত
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-600 dark:text-slate-400">সঠিক উত্তর (Accuracy)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-['Outfit']">{userStats.overallAccuracy}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${userStats.overallAccuracy}%` }}
                  />
                </div>
              </div>

              {/* Weak Topics */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <span>🔥 দুর্বল টপিকসমূহ</span>
                  </p>
                  <button
                    onClick={() => navigateTo('practice', { focusWeak: true })}
                    className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline font-bold"
                  >
                    অনুশীলন
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['মুক্তিযুদ্ধ', 'বীজগণিত', 'আন্তর্জাতিক সংস্থা', 'বাংলা ব্যাকরণ'].map(topic => (
                    <button
                      key={topic}
                      onClick={() => openAiMentorWithPrompt(`আমাকে "${topic}" বিষয়ের বিসিএস পরীক্ষার জন্য সবচেয়ে গুরুত্বপূর্ণ শর্টকাট টেকনিক ও বিগত প্রশ্নের ব্যাখ্যা দিন।`)}
                      className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs rounded-lg border border-amber-200 dark:border-amber-800/50 hover:bg-amber-100 transition"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Study Streak Banner */}
              <div className="mt-4 p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between shadow-md">
                <div>
                  <p className="text-xs text-slate-400 font-medium">স্টাডি স্ট্রিক</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-black font-['Outfit']">{userStats.studyStreakDays}</span>
                    <span className="text-emerald-400 text-xs font-bold">দিন টানা 🔥</span>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('analytics')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold border border-slate-700 transition"
                >
                  স্ট্রিক চার্ট
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Actions & Subject Grid (8 cols) */}
        <section className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          {/* Action Quick Grid (6 Solid Colorful Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {/* Exam */}
            <div
              id="card-exam"
              onClick={() => navigateTo('exams')}
              className="bg-emerald-600 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:bg-emerald-700 transition-all hover:-translate-y-0.5 select-none"
            >
              <div className="text-2xl mb-1.5">📝</div>
              <h3 className="font-bold text-base">পরীক্ষা</h3>
              <p className="text-xs opacity-85 mt-0.5">ফুল ও বিষয়ভিত্তিক টেস্ট</p>
            </div>

            {/* Practice */}
            <div
              id="card-practice"
              onClick={() => navigateTo('practice')}
              className="bg-blue-600 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:bg-blue-700 transition-all hover:-translate-y-0.5 select-none"
            >
              <div className="text-2xl mb-1.5">🎯</div>
              <h3 className="font-bold text-base">অনুশীলন</h3>
              <p className="text-xs opacity-85 mt-0.5">সীমাহীন কাস্টম MCQ</p>
            </div>

            {/* Study */}
            <div
              id="card-study"
              onClick={() => navigateTo('study')}
              className="bg-purple-600 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:bg-purple-700 transition-all hover:-translate-y-0.5 select-none"
            >
              <div className="text-2xl mb-1.5">📚</div>
              <h3 className="font-bold text-base">পড়াশোনা</h3>
              <p className="text-xs opacity-85 mt-0.5">অধ্যায়ভিত্তিক নোটস</p>
            </div>

            {/* Revision */}
            <div
              id="card-revision"
              onClick={() => navigateTo('revision')}
              className="bg-amber-500 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:bg-amber-600 transition-all hover:-translate-y-0.5 select-none"
            >
              <div className="text-2xl mb-1.5">🧠</div>
              <h3 className="font-bold text-base">রিভিশন</h3>
              <p className="text-xs opacity-85 mt-0.5">ভুল প্রশ্ন ও স্পেসড মেমোরি</p>
            </div>

            {/* Daily Quiz */}
            <div
              id="card-daily-quiz"
              onClick={() => navigateTo('daily-quiz')}
              className="bg-rose-500 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:bg-rose-600 transition-all hover:-translate-y-0.5 select-none"
            >
              <div className="text-2xl mb-1.5">🔥</div>
              <h3 className="font-bold text-base">ডেইলি কুইজ</h3>
              <p className="text-xs opacity-85 mt-0.5">আজকের ২০ প্রশ্নের ব্যাটল</p>
            </div>

            {/* Wrong notebook / more */}
            <div
              id="card-wrong-notebook"
              onClick={() => navigateTo('wrong-notebook')}
              className="bg-slate-800 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:bg-slate-900 transition-all hover:-translate-y-0.5 select-none flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl mb-1.5">📓</div>
                <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                  {wrongQuestions.length} ভুল
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base">ভুলের খাতা</h3>
                <p className="text-xs opacity-80 mt-0.5">ভুল উত্তরের খাতা ও রিটেস্ট</p>
              </div>
            </div>
          </div>

          {/* Subject Grid Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-slate-800 dark:text-slate-200 text-base">আপনার বিষয়সমূহ</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">১০টি বিসিএস প্রিলিমিনারি সিলেবাস বিষয়</p>
              </div>
              <button
                onClick={() => navigateTo('subjects')}
                className="text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:underline flex items-center gap-1"
              >
                সব দেখুন <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {subjects.slice(0, 4).map(subj => (
                <div
                  key={subj.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {subj.name}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        subj.accuracy >= 70
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : subj.accuracy >= 50
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {subj.accuracy}% একিউরেসি
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      মোট প্রশ্ন: {subj.totalQuestions.toLocaleString()} • {subj.marks} নম্বর
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigateTo('study', { subjectId: subj.id })}
                      className="flex-1 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >
                      পড়ুন
                    </button>
                    <button
                      onClick={() => navigateTo('practice', { subjectId: subj.id })}
                      className="flex-1 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-sm"
                    >
                      টেস্ট
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Special Preparation Hubs */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigateTo('rapid-revision')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 shadow-sm text-left transition group"
        >
          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 mb-1 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>৩০-মিনিট র্যাপিড</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">১০০ তথ্য • ৫০ MCQ • ২০ ফ্ল্যাশ</p>
        </button>

        <button
          onClick={() => navigateTo('final-prep')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 shadow-sm text-left transition group"
        >
          <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 mb-1 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>৭-দিনের ফাইনাল প্ল্যান</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">পরীক্ষার আগের চূড়ান্ত রিভিশন</p>
        </button>

        <button
          onClick={() => navigateTo('math-lab')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 shadow-sm text-left transition group"
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1 font-bold text-sm">
            <Calculator className="w-4 h-4" />
            <span>ম্যাথ ল্যাব ও শর্টকাট</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">শতকরা, লাভ-ক্ষতি, অনুপাত</p>
        </button>

        <button
          onClick={() => navigateTo('flashcards')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 shadow-sm text-left transition group"
        >
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1 font-bold text-sm">
            <Brain className="w-4 h-4" />
            <span>ইন্টারেক্টিভ ফ্ল্যাশকার্ড</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">সংবিধান, তারিখ, ভোকাবুলারি</p>
        </button>
      </section>

      {/* Current Affairs & Job Circulars Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Affairs */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">সাম্প্রতিক বিষয়াবলি</h3>
            </div>
            <button
              onClick={() => navigateTo('current-affairs')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              সব পড়ুন <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {currentAffairs.slice(0, 2).map(ca => (
              <div
                key={ca.id}
                onClick={() => navigateTo('current-affairs')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 cursor-pointer transition space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    {ca.category}
                  </span>
                  <span className="text-slate-400">{ca.date}</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{ca.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1">{ca.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Job Circulars */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">সর্বশেষ চাকরি সার্কুলার</h3>
            </div>
            <button
              onClick={() => navigateTo('job-circulars')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              সার্কুলার সেন্টার <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {jobCirculars.slice(0, 2).map(job => (
              <div
                key={job.id}
                onClick={() => navigateTo('job-circulars')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 cursor-pointer transition space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                    {job.category}
                  </span>
                  <span className="text-rose-500 font-semibold">ডেডলাইন: {job.deadline}</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{job.position}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{job.organization} • {job.vacancies}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Snapshot */}
      <section className="rounded-2xl bg-slate-900 text-white p-5 shadow-lg border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">মেধাতালিকা (জাতীয় র‍্যাঙ্ক)</h3>
              <p className="text-slate-400 text-xs">ধারাবাহিকতা, একিউরেসি ও স্কোর ভিত্তিক র‍্যাংকিং</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('leaderboard')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
          >
            সম্পূর্ণ লিডারবোর্ড
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {leaderboard.slice(0, 3).map(entry => (
            <div
              key={entry.id}
              className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  entry.rank === 1 ? 'bg-amber-400 text-slate-950' : entry.rank === 2 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700 text-white'
                }`}>
                  #{entry.rank}
                </span>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">{entry.name}</h4>
                  <span className="text-[11px] text-slate-400">{entry.university}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-amber-300 font-['Outfit']">{entry.score}</span>
                <span className="block text-[10px] text-emerald-400 font-medium">{entry.accuracy}% Acc</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
