import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Flame,
  Zap,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Play
} from 'lucide-react';

export const MostImportantView: React.FC = () => {
  const { openAiMentorWithPrompt, navigateTo } = useApp();

  const highYieldPillars = [
    {
      title: 'বাংলাদেশ সংবিধানের গুরুত্বপূর্ণ অনুচ্ছেদ ও সংশোধনী',
      sub: 'বিসিএস প্রিলিতে নিশ্চিত ৪-৫ মার্কস',
      facts: [
        'অনুচ্ছেদ ২ক: রাষ্ট্রধর্ম',
        'অনুচ্ছেদ ৭: সংবিধানের প্রাধান্য ও ৭ক/৭খ',
        'অনুচ্ছেদ ১১: গণতন্ত্র ও মানবাধিকার',
        'অনুচ্ছেদ ১৭: অবৈতনিক ও বাধ্যতামূলক শিক্ষা',
        'অনুচ্ছেদ ২৭: আইনের দৃষ্টিতে সমতা',
        'অনুচ্ছেদ ২৮: ধর্ম প্রভৃতি কারণে বৈষম্য বর্জন',
        'অনুচ্ছেদ ৭০: সংসদে দলের বিরুদ্ধে ভোটদানের বিধিনিষেধ',
        'অনুচ্ছেদ ৯৩: রাষ্ট্রপতির অধ্যাদেশ প্রণয়ন ক্ষমতা',
        'অনুচ্ছেদ ১৩৭: বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) প্রতিষ্ঠা'
      ]
    },
    {
      title: 'বঙ্গবন্ধু, মুক্তিযুদ্ধ ও ঐতিহাসিক ঘটনাবলি',
      sub: 'বিসিএস প্রিলিতে নিশ্চিত ৬-৮ মার্কস',
      facts: [
        '১৯৪৮ ও ১৯৫২: ভাষা আন্দোলন এবং ২১ ফেব্রুয়ারি',
        '১৯৫৪: যুক্তফ্রন্ট নির্বাচন ও ২১ দফা',
        '১৯৬৬: ঐতিহাসিক ৬ দফা (বাংলার মুক্তিসনদ)',
        '১৯৬৯: গণঅভ্যুত্থান ও বঙ্গবন্ধুকে উপাধি প্রদান (২৩ ফেব্রুয়ারি ১৯৬৯)',
        '১৯৭০: সাধারণ নির্বাচনে আওয়ামী লীগের নিরঙ্কুশ বিজয়',
        '৭ মার্চ ১৯৭১: ঐতিহাসিক ভাষণ (ইউনেস্কো বিশ্ব প্রামাণ্য ঐতিহ্য)',
        '১০ এপ্রিল ১৯৭১: মুজিবনগর সরকার গঠন ও ১৭ এপ্রিল শপথ গ্রহণ',
        '১১টি সেক্টর এবং সেক্টর কমান্ডারগণের তালিকা',
        'বীরশ্রেষ্ঠ ৭ জন এবং তাদের সেক্টর ও শহীদ হওয়ার স্থান'
      ]
    },
    {
      title: 'আন্তর্জাতিক প্রধান সংস্থা, সদর দপ্তর ও চুক্তি',
      sub: 'বিসিএস প্রিলিতে নিশ্চিত ৫-৬ মার্কস',
      facts: [
        'জাতিসংঘ: প্রতিষ্ঠা ২৪ অক্টোবর ১৯৪৫, সদর দপ্তর নিউইয়র্ক',
        'আন্তর্জাতিক আদালত (ICJ): হেগ, নেদারল্যান্ডস (১৫ জন বিচারক, মেয়াদ ৯ বছর)',
        'ব্রিটন উডস প্রতিষ্ঠান: বিশ্বব্যাংক ও আইএমএফ (সদর দপ্তর ওয়াশিংটন ডিসি)',
        'পরিবেশ চুক্তি: কিয়োটো প্রটোকল (১৯৯৭), প্যারিস জলবায়ু চুক্তি (২০১৫)',
        'ন্যাটো (NATO): প্রতিষ্ঠা ১৯৪৯, সদর দপ্তর ব্রাসেলস, বেলজিয়াম'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          HIGH-YIELD BCS CONTENT
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2 flex items-center gap-2.5">
          <Zap className="w-7 h-7 text-amber-400" />
          সবচেয়ে গুরুত্বপূর্ণ ও কমন উপযোগী তথ্য (Most Important for BCS)
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          বিগত ১০টি বিসিএস বিশ্লেষণ করে ১০০% পরীক্ষায় আসা আবশ্যিক টপিকসমূহের হ্যান্ডনোট
        </p>
      </div>

      {/* Pillars */}
      <div className="space-y-5">
        {highYieldPillars.map((p, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-slate-800/80 border border-slate-700/60 p-6 space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700">
              <div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <span className="text-xs font-semibold text-emerald-400">{p.sub}</span>
              </div>

              <button
                onClick={() =>
                  openAiMentorWithPrompt(
                    `আমাকে "${p.title}" এর উপর একটি চূড়ান্ত রিভিশন শীট ও ১০টি সম্ভাব্য কঠিন এমসিকিউ তৈরি করে দিন।`
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI রিভিশন শীট
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {p.facts.map((fact, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 flex items-start gap-2"
                >
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
