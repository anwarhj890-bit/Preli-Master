import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  RotateCw,
  Zap,
  Bookmark
} from 'lucide-react';

export const VocabBuilder: React.FC = () => {
  const { openAiMentorWithPrompt, navigateTo } = useApp();

  const vocabWords = [
    {
      word: 'Magnanimous',
      bangla: 'উদারহৃদয়, মহানুভব',
      pos: 'Adjective',
      synonyms: ['Generous', 'Noble', 'Altruistic', 'Beneficent'],
      antonyms: ['Selfish', 'Petty', 'Spiteful', 'Mean'],
      sentence: 'He was magnanimous in victory and congratulated his defeated opponent warmly.',
      mnemonic: 'Magna (Great) + Anima (Mind/Soul) = মহান বা উদার মনের অধিকারী।'
    },
    {
      word: 'Ephemeral',
      bangla: 'ক্ষণস্থায়ী, অল্পকালস্থায়ী',
      pos: 'Adjective',
      synonyms: ['Transient', 'Fleeting', 'Short-lived', 'Evancescent'],
      antonyms: ['Permanent', 'Enduring', 'Everlasting', 'Perpetual'],
      sentence: 'Fame in the digital world is often ephemeral.',
      mnemonic: 'E-ph-emeral sounds like "for few moments" (কিছুক্ষণের জন্য)।'
    },
    {
      word: 'Lucid',
      bangla: 'স্পষ্ট, সহজবোধ্য, স্বচ্ছ',
      pos: 'Adjective',
      synonyms: ['Clear', 'Intelligible', 'Luminous', 'Transparent'],
      antonyms: ['Confusing', 'Ambiguous', 'Obscure', 'Vague'],
      sentence: 'The professor gave a remarkably lucid explanation of quantum physics.',
      mnemonic: 'Luc = Light (আলো) -> যা স্পষ্ট ও সহজে বোঝা যায়।'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-2.5">
          <BookOpen className="w-7 h-7 text-emerald-400" />
          বিসিএস ইংরেজি ভোকাবুলারি মাস্টার (BCS Vocab Builder)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          বিগত বিসিএস পরীক্ষায় বারবার আসা সিনোনিম, অ্যান্টনিম, ইডিয়ম ও প্রিপজিশন মাস্টারক্লাস
        </p>
      </div>

      {/* Daily Words Cards */}
      <div className="space-y-4">
        {vocabWords.map((item, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                    {item.pos}
                  </span>
                  <span className="text-xs text-slate-400">High-Yield BCS Word</span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1 font-['Outfit']">{item.word}</h3>
                <span className="text-sm font-bold text-amber-300">{item.bangla}</span>
              </div>

              <button
                onClick={() =>
                  openAiMentorWithPrompt(
                    `"${item.word}" শব্দের বিসিএস প্রিলির অনুরূপ ৪টি প্রশ্ন, বিগত বছরের প্রয়োগ এবং আরও ৫টি সিনোনিম দিন।`
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI ভোকাব ড্রিল
              </button>
            </div>

            {/* Synonyms & Antonyms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-400 block text-xs">সমার্থক শব্দ (Synonyms):</span>
                <p className="text-slate-200 font-medium">{item.synonyms.join(', ')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                <span className="font-bold text-rose-400 block text-xs">বিপরীতার্থক শব্দ (Antonyms):</span>
                <p className="text-slate-200 font-medium">{item.antonyms.join(', ')}</p>
              </div>
            </div>

            {/* Example sentence & mnemonic */}
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                💬 <strong>Example:</strong> "{item.sentence}"
              </div>
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200">
                🧠 <strong>Memory Mnemonic:</strong> {item.mnemonic}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigateTo('practice', { subjectId: 'english', count: 20 })}
        className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition"
      >
        <BookOpen className="w-4 h-4" /> ইংরেজি ভোকাবুলারি স্পেশাল টেস্ট দিন
      </button>
    </div>
  );
};
