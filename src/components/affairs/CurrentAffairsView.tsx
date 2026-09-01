import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrentAffairArticle } from '../../types';
import {
  Newspaper,
  Calendar,
  Sparkles,
  HelpCircle,
  Play,
  Share2,
  Bookmark,
  CheckCircle2,
  Layers
} from 'lucide-react';

export const CurrentAffairsView: React.FC = () => {
  const { currentAffairs, openAiMentorWithPrompt, navigateTo } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<CurrentAffairArticle>(currentAffairs[0]);

  const categories = ['all', 'বাংলাদেশ', 'আন্তর্জাতিক', 'অর্থনীতি', 'বিজ্ঞান ও প্রযুক্তি', 'পুরস্কার ও সম্মাননা'];

  const filteredArticles = currentAffairs.filter(
    a => selectedCategory === 'all' || a.category === selectedCategory
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Newspaper className="w-7 h-7 text-emerald-400" />
          সাম্প্রতিক বিষয়াবলি (Current Affairs Hub)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          বিসিএস ও সরকারি চাকরির প্রিলিমিনারি ও লিখিত পরীক্ষার উপযোগী দৈনন্দিন ও মাসিক ঘটনা প্রবাহ
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'সব খবর' : cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Articles List & Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredArticles.map(art => {
            const active = art.id === selectedArticle.id;
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`p-4 rounded-3xl border text-left cursor-pointer transition-all space-y-2 ${
                  active
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {art.category}
                  </span>
                  <span className="text-slate-400 font-medium">{art.date}</span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm sm:text-base leading-snug">
                  {art.title}
                </h3>
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Article Deep View */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-slate-800/90 border border-slate-700/60 p-6 space-y-6 shadow-2xl">
            <div className="space-y-2 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  {selectedArticle.category}
                </span>
                <span className="text-slate-400">{selectedArticle.date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                {selectedArticle.title}
              </h2>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-slate-200 text-sm sm:text-base leading-relaxed">
              <p>{selectedArticle.summary}</p>
            </div>

            {/* Key Facts */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                পরীক্ষার জন্য গুরুত্বপূর্ণ বুলেট পয়েন্ট (Key Facts):
              </h3>
              <div className="space-y-2">
                {selectedArticle.keyFacts.map((fact, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Probable Exam Questions */}
            <div className="space-y-3">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                বিসিএস প্রিলিতে সম্ভাব্য প্রশ্নসমূহ (Expected MCQs):
              </h3>
              <div className="space-y-2">
                {selectedArticle.probableQuestions.map((q, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs sm:text-sm text-amber-200 font-medium">
                    ❓ {q}
                  </div>
                ))}
              </div>
            </div>

            {/* Ask AI Trigger */}
            <div className="pt-2">
              <button
                onClick={() =>
                  openAiMentorWithPrompt(
                    `সাম্প্রতিক ঘটনা: "${selectedArticle.title}"\n\nএই ঘটনা থেকে বিসিএস প্রিলিমিনারি ও লিখিত পরীক্ষায় আসতে পারে এমন ৫টি সম্ভাব্য প্রশ্ন ও বিস্তারিত উত্তর তৈরি করে দিন।`
                  )
                }
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                এই বিষয়ে AI লিখিত ও প্রিলি নোটস তৈরি করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
