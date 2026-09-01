import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bookmark,
  Plus,
  Folder,
  Trash2,
  Sparkles,
  Play,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const { collections, questions, isBookmarked, toggleBookmark, openAiMentorWithPrompt, navigateTo } = useApp();

  const [selectedColId, setSelectedColId] = useState<string>(collections[0]?.id || 'col-1');
  const currentCol = collections.find(c => c.id === selectedColId) || collections[0];

  const bookmarkedQuestions = questions.filter(q =>
    currentCol?.questionIds.includes(q.id)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Bookmark className="w-7 h-7 text-amber-400 fill-amber-400" />
          সংরক্ষিত প্রশ্ন ও কালেকশন (Bookmarks)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          আপনার চিহ্নিত করা গুরুত্বপূর্ণ প্রশ্নাবলি ফোল্ডার অনুসারে সংরক্ষিত আছে
        </p>
      </div>

      {/* Collection Folders List */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        {collections.map(col => (
          <button
            key={col.id}
            onClick={() => setSelectedColId(col.id)}
            className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition flex items-center gap-2 border ${
              selectedColId === col.id
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>{col.name}</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-900/40 text-[10px]">
              {col.questionIds.length}
            </span>
          </button>
        ))}
      </div>

      {/* Bookmarked Questions */}
      {bookmarkedQuestions.length === 0 ? (
        <div className="rounded-3xl bg-slate-800/60 border border-slate-700/60 p-12 text-center text-slate-400 space-y-2">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-200">এই ফোল্ডারে এখনো কোনো প্রশ্ন সংরক্ষণ করা হয়নি</h3>
          <p className="text-xs text-slate-400">প্রশ্ন অনুশীলন বা পড়ার সময় বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">
              মোট {bookmarkedQuestions.length}টি প্রশ্ন
            </span>
            <button
              onClick={() =>
                navigateTo('practice', {
                  customQuestions: bookmarkedQuestions,
                  title: `${currentCol?.name} টেস্ট`
                })
              }
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> এই প্রশ্নগুলোর টেস্ট দিন
            </button>
          </div>

          {bookmarkedQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-5 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 font-semibold">{q.subjectName}</span>
                <button
                  onClick={() => toggleBookmark(q.id, currentCol.id)}
                  className="text-slate-400 hover:text-rose-400 transition"
                  title="Remove from collection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-bold text-slate-100 text-sm sm:text-base leading-relaxed">
                {idx + 1}. {q.question}
              </h4>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300">
                ✓ <strong>সঠিক উত্তর:</strong> {q.correctAnswer}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {q.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
