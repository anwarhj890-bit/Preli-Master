import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flashcard } from '../../types';
import {
  Brain,
  RotateCw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
  Bookmark,
  Layers
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const { flashcards, updateFlashcardStatus, openAiMentorWithPrompt, playSound } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const categories = ['all', 'সংবিধান ও আইন', 'ইংরেজি ভোকাবুলারি', 'আন্তর্জাতিক চুক্তি', 'সাধারণ বিজ্ঞান', 'তথ্যপ্রযুক্তি'];

  const filteredCards = flashcards.filter(
    c => selectedCategory === 'all' || c.category === selectedCategory
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleKnowCard = () => {
    if (!currentCard) return;
    playSound('correct');
    updateFlashcardStatus(currentCard.id, true);
    handleNextCard();
  };

  const handleNeedReview = () => {
    if (!currentCard) return;
    playSound('wrong');
    updateFlashcardStatus(currentCard.id, false);
    handleNextCard();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <Brain className="w-7 h-7 text-purple-400" />
          স্মার্ট ফ্ল্যাশকার্ড (Smart Flashcards)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          কঠিন সাল, সংবিধানের অনুচ্ছেদ, আন্তর্জাতিক চুক্তি ও ভোকাবুলারি দ্রুত মুখস্থ করার ফ্ল্যাশ ডেক
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'সকল ফ্ল্যাশকার্ড' : cat}
          </button>
        ))}
      </div>

      {/* Flashcard Component */}
      {filteredCards.length > 0 && currentCard && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 text-xs text-slate-400 font-semibold">
            <span>কার্ড {currentIndex + 1} / {filteredCards.length}</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">
              {currentCard.category}
            </span>
          </div>

          {/* Interactive Card Stage */}
          <div
            onClick={() => setIsFlipped(prev => !prev)}
            className="min-h-[280px] sm:min-h-[320px] rounded-3xl bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border-2 border-purple-500/40 p-8 flex flex-col justify-between cursor-pointer select-none shadow-2xl hover:border-purple-400 transition-all text-center relative overflow-hidden group"
          >
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> উল্টাতে ক্লিক করুন (Tap to Flip)
              </span>
              {currentCard.mastered && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                  ✓ আয়ত্তাধীন
                </span>
              )}
            </div>

            {/* Front & Back Content */}
            <div className="py-6 space-y-3">
              {!isFlipped ? (
                <div className="space-y-2 animate-fadeIn">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">প্রশ্ন / পদাবলী</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-relaxed">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">উত্তর ও অর্থ</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-emerald-300 leading-relaxed">
                    {currentCard.back}
                  </h3>
                  {currentCard.notes && (
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed pt-2 border-t border-slate-700">
                      💡 <strong>নোট:</strong> {currentCard.notes}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openAiMentorWithPrompt(
                    `আমাকে ফ্ল্যাশকার্ডের এই টপিকটির উপর বিস্তারিত শর্টকাট মেমোরি ট্রিক দিন:\n"${currentCard.front}" -> "${currentCard.back}"`
                  );
                }}
                className="text-xs text-amber-300 font-bold hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI মেমোরি ট্রিক জানুন
              </button>
            </div>
          </div>

          {/* Bottom Swipe Controls */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleNeedReview}
              className="py-3.5 px-4 rounded-2xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <XCircle className="w-5 h-5 text-rose-400" />
              আবার পড়া প্রয়োজন (Need Review)
            </button>

            <button
              onClick={handleKnowCard}
              className="py-3.5 px-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              পারা গেছে (Mastered)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
