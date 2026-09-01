import { SubjectInfo, Question, Flashcard, CurrentAffairArticle, JobCircular, Achievement, LeaderboardEntry, StudyPlanItem } from '../types';

export const INITIAL_SUBJECTS: SubjectInfo[] = [
  {
    id: 'bangla',
    name: 'বাংলা ভাষা ও সাহিত্য',
    englishName: 'Bengali Language & Literature',
    marks: 35,
    iconName: 'BookOpen',
    totalQuestions: 1450,
    completedQuestions: 890,
    accuracy: 74,
    topicCompletion: 68,
    weakTopics: ['বাংলা ব্যাকরণ ও ধ্বনিতত্ত্ব', 'মধ্যযুগের সাহিত্য'],
    strongTopics: ['আধুনিক যুগের উপন্যাস ও নাটক', 'রবীন্দ্রনাথ ও নজরুল'],
    topics: [
      {
        id: 'bangla-1',
        subjectId: 'bangla',
        title: 'Ancient & Medieval Literature',
        banglaTitle: 'চর্যাপদ ও মধ্যযুগের সাহিত্য',
        completionPercent: 80,
        isStrong: true,
        shortNotes: 'চর্যাপদ বাংলা ভাষার প্রাচীনতম কাব্য তথা গান সংকলন। হরপ্রসাদ শাস্ত্রী ১৯০৭ সালে নেপালের রাজদরবারের রয়েল লাইব্রেরি থেকে এটি আবিষ্কার করেন এবং ১৯১৬ সালে বঙ্গীয় সাহিত্য পরিষদ থেকে "হাজার বছরের পুরাণ বাঙ্গালা ভাষায় রচিত বৌদ্ধগান ও দোহা" নামে প্রকাশ করেন।',
        concepts: [
          'চর্যাপদের মোট পদ সংখ্যা সাড়ে ৪৬টি (মতান্তরে ৫১টি)। মোট পদকর্তা ২৪ জন (মতান্তরে ২৩ জন)।',
          'সবচেয়ে বেশি পদ রচনা করেছেন কাহ্নপা (১৩টি পদ), দ্বিতীয় সর্বোচ্চ ভুসুকুপা (৮টি)।',
          'মধ্যযুগের সাহিত্যের অন্যতম ধারা: মঙ্গলকাব্য, বৈষ্ণব পদাবলি, শ্রীকৃষ্ণকীর্তন (বড়ু চণ্ডীদাস), রোমান্টিক প্রণয়োপাখ্যান (শাহ মুহম্মদ সগীর)।',
          'মঙ্গলকাব্যের প্রধান ধারা দুটি: মনসামঙ্গল (কানাহরি দত্ত আদি কবি) এবং চণ্ডীমঙ্গল (মুকুন্দরাম চক্রবর্তী কবিকঙ্কণ)।'
        ],
        importantFacts: [
          'চর্যাপদের আদি কবি লুইপা (১নং পদের রচয়িতা)।',
          'চর্যাপদের একমাত্র নারী পদকর্তা কুক্কুরীপা (মতান্তরে)।',
          'ড. সুনীতিকুমার চট্টোপাধ্যায় ১৯২৬ সালে "ODBL" গ্রন্থে প্রমাণ করেন চর্যাপদের ভাষা বাংলা।',
          'শ্রীকৃষ্ণকীর্তন কাব্য ১৯০৯ সালে বসন্তরঞ্জন রায় বিদ্বদ্বল্লভ বাঁকুড়ার কাকিল্যা গ্রামের এক গোয়ালঘর থেকে আবিষ্কার করেন।'
        ],
        keyDates: [
          { date: '১৯০৭ খ্রিষ্টাব্দ', event: 'হরপ্রসাদ শাস্ত্রী কর্তৃক নেপাল থেকে চর্যাপদ পুথি আবিষ্কার' },
          { date: '১৯১৬ খ্রিষ্টাব্দ', event: 'বঙ্গীয় সাহিত্য পরিষদ থেকে চর্যাপদ প্রকাশ' },
          { date: '১৯২৬ খ্রিষ্টাব্দ', event: 'ড. সুনীতিকুমার চট্টোপাধ্যায় কর্তৃক চর্যাপদের ভাষা যে বাংলা তা ভাষাতাত্ত্বিকভাবে প্রমাণ' }
        ],
        keyPersonalities: [
          { name: 'হরপ্রসাদ শাস্ত্রী', role: 'মহামহোপাধ্যায় গবেষক', contribution: 'চর্যাপদের আবিষ্কারক ও প্রথম সম্পাদক' },
          { name: 'কাহ্নপা', role: 'সিদ্ধাচার্য কবি', contribution: 'চর্যাপদে সর্বাধিক ১৩টি পদের রচয়িতা' },
          { name: 'আলাওল', role: 'আরাকান রাজসভার কবি', contribution: 'পদ্মাবতী মহাকাব্য রচনা (মালিক মুহম্মদ জায়সির পদুমাবত অবলম্বনে)' }
        ],
        mnemonics: [
          'চর্যাপদের সর্বোচ্চ পদকর্তা: "কাহ্নপা ১৩, ভুসুকুপা ৮, সরহপা ৪, লুইপা ও কুক্কুরীপা ২টি করে"।',
          'মঙ্গলকাব্যের দেবী-কবি শর্টকাট: "মনসা কানাহরি, চণ্ডী মুকুন্দরাম, অন্নদা ভারতচন্দ্র"।'
        ],
        commonTraps: [
          'চর্যাপদের মোট পদ সংখ্যা ৪৬.৫ টি, ৫০ বা ৫১ অপশনে থাকলে টিক দেবেন না যদি ৪৬.৫ থাকে।',
          'আলাওলের পদ্মাবতী মৌলিক রচনা নয়, এটি অনুবাদের মাধ্যমে সৃষ্ট মহাকাব্য।'
        ],
        examTips: [
          'চর্যাপদের তিব্বতি অনুবাদ আবিষ্কার করেন ড. প্রবোধচন্দ্র বাগচী।',
          'চর্যাপদের টিকাকারের নাম মুনিদত্ত (তিনি নির্মলগিরা টিকা রচনা করেন)।'
        ],
        relatedQuestionIds: ['q-bn-1', 'q-bn-2', 'q-bn-3', 'q-bn-4']
      },
      {
        id: 'bangla-2',
        subjectId: 'bangla',
        title: 'Grammar & Syntax',
        banglaTitle: 'বাংলা ব্যাকরণ, ধ্বনি ও সমাস',
        completionPercent: 54,
        isWeak: true,
        shortNotes: 'বাংলা ব্যাকরণে ধ্বনি, বর্ণ, সন্ধি, ণ-ত্ব ও ষ-ত্ব বিধান, সমাস, প্রত্যয় ও উপসর্গ বিসিএস পরীক্ষার সবচেয়ে ট্রিকি ও ভুলপ্রবণ অংশ।',
        concepts: [
          'ধ্বনি তত্ত্বের আলোচ্য বিষয়: ধ্বনি, বর্ণ, সন্ধি, ণ-ত্ব ও ষ-ত্ব বিধান।',
          'বাক্য তত্ত্বের আলোচ্য বিষয়: পদক্রম, বাক্য পরিবর্তন, যতিচিহ্ন, বাচ্য।',
          'সমাস ৬ প্রকার: দ্বন্দ্ব, দ্বিগু, কর্মধারয়, তৎপুরুষ, বহুব্রীহি, অব্যয়ীভাব।'
        ],
        importantFacts: [
          'বাংলা বর্ণমালায় মোট বর্ণ ৫০টি (স্বরবর্ণ ১১টি, ব্যঞ্জনবর্ণ ৩৯টি)।',
          'মাত্রাহীন বর্ণ ১০টি (স্বরবর্ণ ৪টি, ব্যঞ্জনবর্ণ ৬টি), অর্ধমাত্রার বর্ণ ৮টি (স্বরবর্ণ ১টি, ব্যঞ্জনবর্ণ ৭টি), পূর্ণমাত্রার বর্ণ ৩২টি।',
          'যে সমাসে সমস্যমান পদগুলোর কোনোটির অর্থ না বুঝিয়ে ভিন্ন কোনো পদকে বোঝায় তাকে বহুব্রীহি সমাস বলে (যেমন: দশানন, বীণাপাণি)।'
        ],
        keyDates: [
          { date: '১৭৭৮ খ্রিষ্টাব্দ', event: 'নাথানিয়েল ব্রাসি হ্যালহেড কর্তৃক প্রথম মুদ্রিত বাংলা ব্যাকরণ বই রচনা' },
          { date: '১৮২৬ খ্রিষ্টাব্দ', event: 'রাজা রামমোহন রায় কর্তৃক বাংলা ভাষায় প্রথম বাংলা ব্যাকরণ "গৌড়ীয় ব্যাকরণ" রচনা' }
        ],
        keyPersonalities: [
          { name: 'রামমোহন রায়', role: 'সমাজ সংস্কারক ও পণ্ডিত', contribution: 'বাঙালিদের মধ্যে প্রথম বাংলা ব্যাকরণ রচয়িতা' }
        ],
        mnemonics: [
          'মাত্রাহীন বর্ণ মনে রাখার ছন্দ: "এ ঐ ও ঔ + ঙ ঞ ৎ ং ঃ ঁ" = মোট ১০টি বর্ণ।',
          'অর্ধমাত্রার বর্ণ: "ঋ + খ গ ণ থ ধ প শ" = মোট ৮টি।'
        ],
        commonTraps: [
          'সন্ধি ব্যাকরণের ধ্বনিতত্ত্বে আলোচিত হয়, কিন্তু সমাস আলোচিত হয় রূপতত্ত্বে (শব্দতত্ত্বে)।',
          '"ণ-ত্ব বিধান" কেবল খাঁটি তৎসম (সংস্কৃত) শব্দের ক্ষেত্রে প্রযোজ্য, দেশি বা বিদেশি শব্দে কখনো ণ হয় না।'
        ],
        examTips: [
          'উপসর্গ ধাতুর পূর্বে বসে, প্রত্যয় শব্দের বা ধাতুর পরে বসে।',
          'বাংলা উপসর্গের সংখ্যা ২১টি, সংস্কৃত উপসর্গ ২০টি।'
        ],
        relatedQuestionIds: ['q-bn-5', 'q-bn-6', 'q-bn-7']
      }
    ]
  },
  {
    id: 'english',
    name: 'English Language & Literature',
    englishName: 'English Language & Literature',
    marks: 35,
    iconName: 'Languages',
    totalQuestions: 1520,
    completedQuestions: 920,
    accuracy: 71,
    topicCompletion: 64,
    weakTopics: ['Idioms & Phrases', 'Romantic & Victorian Era'],
    strongTopics: ['Parts of Speech & Subject-Verb Agreement', 'Shakespearean Drama'],
    topics: [
      {
        id: 'eng-1',
        subjectId: 'english',
        title: 'Shakespeare & Elizabethan Era',
        banglaTitle: 'উইলিয়াম শেক্সপিয়র ও এলিজাবেথান সাহিত্য',
        completionPercent: 85,
        isStrong: true,
        shortNotes: 'William Shakespeare (1564–1616) is known as the Bard of Avon. He wrote 37 plays, 154 sonnets, and 2 long narrative poems. Elizabethan period (1558-1603) is considered the Golden Age of English Drama.',
        concepts: [
          'Four Greatest Tragedies of Shakespeare (HOKM): Hamlet, Othello, King Lear, Macbeth.',
          'Famous comedies: As You Like It, Twelfth Night, The Merchant of Venice, The Tempest, A Midsummer Night’s Dream.',
          'Famous tragicomedies / Romances: The Tempest, The Winter’s Tale, Cymbeline.'
        ],
        importantFacts: [
          'Shakespeare died on his birthday (April 23, 1616).',
          '"To be or not to be, that is the question" is from Hamlet.',
          '"Frailty, thy name is woman" is from Hamlet.',
          '"All the world\'s a stage, and all the men and women merely players" is from As You Like It (spoken by Jaques).',
          '"Fair is foul, and foul is fair" is the central paradox of Macbeth.'
        ],
        keyDates: [
          { date: '1564', event: 'Birth of William Shakespeare at Stratford-upon-Avon' },
          { date: '1623', event: 'First Folio publication of Shakespeare’s plays' }
        ],
        keyPersonalities: [
          { name: 'William Shakespeare', role: 'National Poet of England', contribution: 'Master of Elizabethan blank verse and tragedy' },
          { name: 'Christopher Marlowe', role: 'Father of English Tragedy', contribution: 'Doctor Faustus, Tamburlaine' }
        ],
        mnemonics: [
          'Great Tragedies Shortcut: "H-O-K-M" (Hamlet, Othello, King Lear, Macbeth).',
          'King Lear\'s three daughters: "G-R-C" (Goneril, Regan, Cordelia).'
        ],
        commonTraps: [
          'The play "Doctor Faustus" was written by Christopher Marlowe, NOT Shakespeare.',
          '"The Spanish Tragedy" was written by Thomas Kyd.'
        ],
        examTips: [
          'Shakespeare’s shortest tragedy is Macbeth; longest play is Hamlet.',
          'Silent characters in King Lear: Cordelia is the only honest daughter.'
        ],
        relatedQuestionIds: ['q-en-1', 'q-en-2', 'q-en-3']
      }
    ]
  },
  {
    id: 'bangladesh',
    name: 'বাংলাদেশ বিষয়াবলি',
    englishName: 'Bangladesh Affairs',
    marks: 30,
    iconName: 'MapPin',
    totalQuestions: 2840,
    completedQuestions: 2150,
    accuracy: 76,
    topicCompletion: 72,
    weakTopics: ['মুক্তিযুদ্ধ ও সেক্টর কমান্ডারগণ', 'অর্থনৈতিক সমীক্ষা ও পঞ্চবার্ষিক পরিকল্পনা'],
    strongTopics: ['বাংলাদেশের সংবিধানের অনুচ্ছেদসমূহ', 'প্রাচীন বাংলার জনপদ ও ইতিহাস'],
    topics: [
      {
        id: 'bd-1',
        subjectId: 'bangladesh',
        title: 'Constitution of Bangladesh',
        banglaTitle: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান',
        completionPercent: 88,
        isStrong: true,
        shortNotes: 'বাংলাদেশের সংবিধান প্রণয়ন কমিটির প্রধান ছিলেন ড. কামাল হোসেন (মোট সদস্য ৩৪ জন, একমাত্র নারী সদস্য বেগম রাজিয়া বানু)। এটি ৪ নভেম্বর ১৯৭২ গণপরিষদে গৃহীত হয় এবং ১৬ ডিসেম্বর ১৯৭২ থেকে কার্যকর হয়। সংবিধানে ১৫৩টি অনুচ্ছেদ, ১১টি ভাগ ও ৭টি তফসিল রয়েছে।',
        concepts: [
          'মৌলিক অধিকারসমূহ সংবিধানের ৩য় ভাগে (অনুচ্ছেদ ২৭ থেকে ৪৪) বর্ণিত।',
          '৭০ অনুচ্ছেদ: রাজনৈতিক দল থেকে পদত্যাগ বা দলের বিরুদ্ধে ভোটদান সম্পর্কিত আসন শূন্য হওয়া।',
          '৭৭ অনুচ্ছেদ: ন্যায়পাল (Ombudsman) নিয়োগ সংক্রান্ত বিধান।',
          '৯৩ অনুচ্ছেদ: রাষ্ট্রপতির অধ্যাদেশ (Ordinance) জারির ক্ষমতা।',
          '১৪১(ক) অনুচ্ছেদ: দেশে জরুরি অবস্থা ঘোষণার বিধান।'
        ],
        importantFacts: [
          'সংবিধানের মূলনীতি ৪টি: জাতীয়তাবাদ, সমাজতন্ত্র, গণতন্ত্র ও ধর্মনিরপেক্ষতা (অনুচ্ছেদ ৮)।',
          'সংবিধানের হস্তলিখিত কপির প্রধান লিপিকার ছিলেন এ কে এম আব্দুর রউফ এবং অঙ্গসজ্জা করেন শিল্পাচার্য জয়নুল আবেদিন।',
          'সংবিধান এ পর্যন্ত ১৭ বার সংশোধিত হয়েছে।',
          '১৫ অনুচ্ছেদে মৌলিক চাহিদার (অন্ন, বস্ত্র, আশ্রয়, শিক্ষা, চিকিৎসা) নিশ্চয়তা দেওয়া হয়েছে।'
        ],
        keyDates: [
          { date: '৪ নভেম্বর ১৯৭২', event: 'গণপরিষদে গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান গৃহীত' },
          { date: '১৬ ডিসেম্বর ১৯৭২', event: 'বাংলাদেশের সংবিধান আনুষ্ঠানিকভাবে কার্যকর' },
          { date: '১৯৭৩ খ্রিষ্টাব্দ', event: 'সংবিধানের ১ম সংশোধনী পাস (যুদ্ধাপরাধীদের বিচার সংক্রান্ত)' }
        ],
        keyPersonalities: [
          { name: 'বঙ্গবন্ধু শেখ মুজিবুর রহমান', role: 'জাতির পিতা', contribution: 'সংবিধান প্রণয়নের দিকনির্দেশক' },
          { name: 'ড. কামাল হোসেন', role: 'আইনমন্ত্রী ও সভাপতি', contribution: 'সংবিধান খসড়া প্রণয়ন কমিটির সভাপতি' },
          { name: 'শিল্পাচার্য জয়নুল আবেদিন', role: 'চিত্রশিল্পী', contribution: 'মূল সংবিধানের অলংকরণ' }
        ],
        mnemonics: [
          'সংবিধানের ৩য় ভাগের গুরুত্বপূর্ণ ধারা শর্টকাট: "২৭ সমতা, ২৮ বৈষম্যহীনতা, ২৯ সুযোগের সমতা, ৩১ আইনের আশ্রয়, ৩৩ গ্রেপ্তার থেকে সুরক্ষা, ৩৬ চলাফেরা, ৩৭ সমাবেশ, ৩৮ সমিতি, ৩৯ চিন্তা ও বিবেক, ৪১ ধর্ম, ৪২ সম্পত্তি"।',
          'তফসিল সংখ্যা ৭টি মনে রাখার উপায়: "৪র্থ সংশোধনী পর্যন্ত ৪টি, ৫ম এ ৩টি যুক্ত হয়ে মোট ৭টি"।'
        ],
        commonTraps: [
          'সংবিধান গৃহীত হয় ৪ নভেম্বর (সংবিধান দিবস), কিন্তু কার্যকর হয় ১৬ ডিসেম্বর।',
          'মৌলিক অধিকার লঙ্ঘিত হলে অনুচ্ছেদ ১০২ (হাইকোর্টে রিট) এবং অনুচ্ছেদ ৪৪ অনুযায়ী আবেদন করা যায়।'
        ],
        examTips: [
          'সংবিধানের অভিভাবক ও ব্যাখ্যাকারী হলো সুপ্রিম কোর্ট।',
          'রাষ্ট্রপতির অভিশংসন প্রক্রিয়া সংবিধানের ৫২ অনুচ্ছেদে বর্ণিত।'
        ],
        relatedQuestionIds: ['q-bd-1', 'q-bd-2', 'q-bd-3', 'q-bd-4']
      },
      {
        id: 'bd-2',
        subjectId: 'bangladesh',
        title: 'Liberation War & Sectors',
        banglaTitle: 'মুক্তিযুদ্ধ, মুজিবনগর সরকার ও সেক্টরসমূহ',
        completionPercent: 62,
        isWeak: true,
        shortNotes: '১৯৭১ সালের ১০ এপ্রিল মুজিবনগর সরকার গঠিত হয় এবং ১৭ এপ্রিল মেহেরপুরের বৈদ্যনাথতলার ভবেরপাড়ায় (বর্তমান মুজিবনগর) শপথ গ্রহণ করে। মুক্তিযুদ্ধের সমগ্র বাংলাদেশকে ১১টি সেক্টর ও ৬৪টি সাব-সেক্টরে ভাগ করা হয়েছিল।',
        concepts: [
          'মুজিবনগর সরকারের রাষ্ট্রপতি: বঙ্গবন্ধু শেখ মুজিবুর রহমান (অনুপস্থিতিতে অস্থায়ী রাষ্ট্রপতি সৈয়দ নজরুল ইসলাম)।',
          'প্রধানমন্ত্রী: তাজউদ্দীন আহমদ। সেনাপ্রধান: কর্নেল এম এ জি ওসমানী।',
          'সেক্টর ১০ ছিল কোনো নিয়মিত কমান্ডারবিহীন নৌ সেক্টর (অপারেশন জ্যাকপট পরিচালনাকারী)।',
          'সেক্টর কমান্ডারদের তালিকা ও আওতাধীন এলাকা বিসিএসের সবচেয়ে বেশি রিপিটেড প্রশ্ন।'
        ],
        importantFacts: [
          'মুক্তিযুদ্ধের একমাত্র নিয়মিত কমান্ডারবিহীন সেক্টর হলো ১০ নম্বর সেক্টর।',
          'বীরশ্রেষ্ঠ খেতাবপ্রাপ্ত শহীদ যোদ্ধা ৭ জন (সর্বকনিষ্ঠ বীরশ্রেষ্ঠ ফ্লাইট লেফটেন্যান্ট মতিউর রহমান ও বীরশ্রেষ্ঠ সিপাহী হামিদুর রহমান)।',
          'বীর প্রতীক খেতাবপ্রাপ্ত বিদেশি নাগরিক ডব্লিউ এ এস ওডারল্যান্ড (অস্ট্রেলিয়ান)।',
          'তারামন বিবি ও সেতারা বেগম নারী বীর প্রতীক খেতাবপ্রাপ্ত।'
        ],
        keyDates: [
          { date: '৭ মার্চ ১৯৭১', event: 'রেসকোর্স ময়দানে বঙ্গবন্ধুর ঐতিহাসিক ভাষণ' },
          { date: '২৫ মার্চ ১৯৭১', event: 'পাকিস্তানি হানাদার বাহিনীর বর্বরোচিত অপারেশন সার্চলাইট' },
          { date: '১০ এপ্রিল ১৯৭১', event: 'মুজিবনগর সরকার গঠন ও স্বাধীনতার ঘোষণাপত্র জারি' },
          { date: '১৭ এপ্রিল ১৯৭১', event: 'মুজিবনগর সরকারের শপথ গ্রহণ' },
          { date: '১৬ ডিসেম্বর ১৯৭১', event: 'চূড়ান্ত বিজয় অর্জন ও পাকিস্তানি বাহিনীর আত্মসমর্পণ' }
        ],
        keyPersonalities: [
          { name: 'তাজউদ্দীন আহমদ', role: 'প্রথম প্রধানমন্ত্রী', contribution: 'মুক্তিযুদ্ধের প্রশাসনিক ও সামরিক সমন্বয়' },
          { name: 'জেনারেল এম এ জি ওসমানী', role: 'প্রধান সেনাপতি', contribution: 'মুক্তিযুদ্ধের সর্বাধিনায়ক' }
        ],
        mnemonics: [
          'বীরশ্রেষ্ঠ ৭ জনের নাম মনে রাখার টেকনিক: "মু হামিদ মোস্তফা নূরু রুহুল মতিউর জাহাঙ্গীর" (মতিউর বিমান, রুহুল নৌ, বাকিরা সেনাবাহিনী/ইপিআর)।',
          '১০ নং সেক্টর: "১০ এ নাই কোনো বস, সমুদ্রে মারব ডস" (নৌ সেক্টর)।'
        ],
        commonTraps: [
          'মুজিবনগর সরকার শপথ গ্রহণ করে ১৭ এপ্রিল, কিন্তু গঠিত হয়েছিল ১০ এপ্রিল।',
          'বীরউত্তম ৬৯ জন, বীরবিক্রম ১৭৫ জন, বীরপ্রতীক ৪২৬ জন (মোট ৬৭৭ জন)।'
        ],
        examTips: [
          'স্বাধীনতার ঘোষণাপত্র পাঠ করেন অধ্যাপক এম ইউসুফ আলী।',
          'স্বাধীনতার ঘোষণাপত্র রচিত হয় সংবিধানের ৭ম তফসিলে।'
        ],
        relatedQuestionIds: ['q-bd-5', 'q-bd-6', 'q-bd-7']
      }
    ]
  },
  {
    id: 'international',
    name: 'আন্তর্জাতিক বিষয়াবলি',
    englishName: 'International Affairs',
    marks: 20,
    iconName: 'Globe2',
    totalQuestions: 1680,
    completedQuestions: 980,
    accuracy: 69,
    topicCompletion: 58,
    weakTopics: ['আন্তর্জাতিক সংস্থা ও সদরদপ্তর', 'ভূ-রাজনীতি ও চুক্তি'],
    strongTopics: ['জাতিসংঘ ও মহাসচিবগণ', 'বিশ্বের আলোচিত সীমারেখা'],
    topics: [
      {
        id: 'intl-1',
        subjectId: 'international',
        title: 'United Nations & Global Organizations',
        banglaTitle: 'জাতিসংঘ, বিশ্ব সংস্থা ও আন্তর্জাতিক চুক্তি',
        completionPercent: 65,
        isWeak: false,
        shortNotes: 'জাতিসংঘ ১৯৪৫ সালের ২৪ অক্টোবর প্রতিষ্ঠিত হয় (সদর দপ্তর নিউইয়র্ক)। বর্তমান সদস্য সংখ্যা ১৯৩ (সর্বশেষ সদস্য দক্ষিণ সুদান)। নিরাপত্তা পরিষদের স্থায়ী সদস্য ৫টি (ভেটো ক্ষমতাপ্রাপ্ত): যুক্তরাষ্ট্র, যুক্তরাজ্য, ফ্রান্স, রাশিয়া ও চীন।',
        concepts: [
          'জাতিসংঘের প্রধান অঙ্গসংস্থা ৬টি: সাধারণ পরিষদ, নিরাপত্তা পরিষদ, অর্থনৈতিক ও সামাজিক পরিষদ, আন্তর্জাতিক আদালত (হেগ), ওছি পরিষদ ও সচিবালয়।',
          'আন্তর্জাতিক আদালতের (ICJ) বিচারক সংখ্যা ১৫ জন এবং তাদের কার্যকাল ৯ বছর।',
          'ব্রেটন উডস ইনস্টিটিউশন: বিশ্বব্যাংক ও আন্তর্জাতিক মুদ্রা তহবিল (IMF) - ১৯৪৪ সালে প্রতিষ্ঠিত।'
        ],
        importantFacts: [
          'জাতিসংঘের বর্তমান মহাসচিব আন্তোনিও গুতেরেস (পর্তুগাল)।',
          'জাতিসংঘের অফিশিয়াল ভাষা ৬টি: আরবি, চীনা, ইংরেজি, ফরাসি, রুশ ও স্প্যানিশ।',
          'জেনেভায় সদরদপ্তর অবস্থিত: WHO, WTO, ILO, UNHCR, WIPO, WMO, ITU।',
          'প্যারিসে সদরদপ্তর: UNESCO, OECD।'
        ],
        keyDates: [
          { date: '২৪ অক্টোবর ১৯৪৫', event: 'জাতিসংঘ সনদ কার্যকর ও আনুষ্ঠানিকভাবে জাতিসংঘ প্রতিষ্ঠা' },
          { date: '১৯৪৮ খ্রিষ্টাব্দ', event: 'মানবাধিকার সংক্রান্ত সর্বজনীন ঘোষণাপত্র (UDHR) গৃহীত' }
        ],
        keyPersonalities: [
          { name: 'ট্রিগভেলি', role: 'প্রথম জাতিসংঘ মহাসচিব', contribution: 'নরওয়ের নাগরিক (১৯৪৬-১৯৫২)' },
          { name: 'উ থান্ট', role: 'প্রথম এশীয় মহাসচিব', contribution: 'মিয়ানমারের নাগরিক' }
        ],
        mnemonics: [
          'ভেটো ক্ষমতাপ্রাপ্ত ৫ দেশ (FRACE): France, Russia, America, China, England.',
          'জেনেভায় অবস্থিত সংস্থাসমূহ: World দিয়ে শুরু এবং Organization দিয়ে শেষ হওয়া প্রায় সবই জেনেভায় (WHO, WTO, WMO, WIPO) - ব্যতিক্রম IMO লন্ডনে।'
        ],
        commonTraps: [
          'আন্তর্জাতিক বিচারালয়ের (ICJ) বিচারক সংখ্যা ১৫ জন, কিন্তু ট্রাইব্যুনাল বা অন্যান্য কোর্টের সাথে গোলমাল করবেন না।',
          'বিশ্বব্যাংকের সদরদপ্তর ওয়াশিংটন ডিসিতে, নিউইয়র্কে নয়।'
        ],
        examTips: [
          'জাতিসংঘের বাজেট সবচেয়ে বেশি দেয় যুক্তরাষ্ট্র (২২%)।',
          'জাতিসংঘ শান্তি মিশনে বাংলাদেশ দীর্ঘ সময় শীর্ষ শান্তিরক্ষী প্রেরণকারী দেশ।'
        ],
        relatedQuestionIds: ['q-int-1', 'q-int-2', 'q-int-3']
      }
    ]
  },
  {
    id: 'geography',
    name: 'ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা',
    englishName: 'Geography, Environment & Disaster Management',
    marks: 10,
    iconName: 'Compass',
    totalQuestions: 780,
    completedQuestions: 540,
    accuracy: 80,
    topicCompletion: 70,
    weakTopics: ['জলবায়ু পরিবর্তন ও আন্তর্জাতিক সম্মেলন'],
    strongTopics: ['বাংলাদেশের নদ-নদী ও ভূ-প্রকৃতি'],
    topics: []
  },
  {
    id: 'science',
    name: 'সাধারণ বিজ্ঞান',
    englishName: 'General Science',
    marks: 15,
    iconName: 'Atom',
    totalQuestions: 1120,
    completedQuestions: 740,
    accuracy: 72,
    topicCompletion: 66,
    weakTopics: ['জৈব রসায়ন ও ভিটামিন'],
    strongTopics: ['মানবদেহ ও চিকিৎসাবিজ্ঞান', 'পদার্থবিজ্ঞানের একক ও সূত্র'],
    topics: []
  },
  {
    id: 'ict',
    name: 'কম্পিউটার ও তথ্যপ্রযুক্তি',
    englishName: 'Computer & Information Technology',
    marks: 15,
    iconName: 'Cpu',
    totalQuestions: 1250,
    completedQuestions: 830,
    accuracy: 63,
    topicCompletion: 60,
    weakTopics: ['Computer Networking & IP Addressing', 'Database & SQL'],
    strongTopics: ['Hardware & Memory Types', 'Number System Conversion'],
    topics: []
  },
  {
    id: 'math',
    name: 'গাণিতিক যুক্তি',
    englishName: 'Mathematical Reasoning',
    marks: 15,
    iconName: 'Calculator',
    totalQuestions: 1350,
    completedQuestions: 780,
    accuracy: 61,
    topicCompletion: 55,
    weakTopics: ['Algebra & Logarithms', 'Permutation & Combination', 'Probability'],
    strongTopics: ['Percentage & Profit-Loss', 'Ratio & Proportion'],
    topics: []
  },
  {
    id: 'mental',
    name: 'মানসিক দক্ষতা',
    englishName: 'Mental Ability',
    marks: 15,
    iconName: 'Brain',
    totalQuestions: 1080,
    completedQuestions: 810,
    accuracy: 84,
    topicCompletion: 78,
    weakTopics: ['Direction & Distance Reasoning', 'Mirror Images & Patterns'],
    strongTopics: ['Series Completion', 'Blood Relations', 'Analogy'],
    topics: []
  },
  {
    id: 'ethics',
    name: 'নৈতিকতা, মূল্যবোধ ও সুশাসন',
    englishName: 'Ethics, Values & Good Governance',
    marks: 10,
    iconName: 'Scale',
    totalQuestions: 640,
    completedQuestions: 480,
    accuracy: 75,
    topicCompletion: 74,
    weakTopics: ['দার্শনিকদের নৈতিক তত্ত্বসমূহ'],
    strongTopics: ['সুশাসনের উপাদান ও বিশ্বব্যাংকের ধারণা'],
    topics: []
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // Bangla
  {
    id: 'q-bn-1',
    question: 'চর্যাপদ কত সালে এবং কোথা থেকে আবিষ্কৃত হয়?',
    options: ['১৯০৭ সালে নেপালের রয়েল লাইব্রেরি থেকে', '১৯১৬ সালে কলকাতা বিশ্ববিদ্যালয় থেকে', '১৯০৯ সালে বাঁকুড়ার গোয়ালঘর থেকে', '১৯১২ সালে তিব্বত থেকে'],
    correctAnswer: '১৯০৭ সালে নেপালের রয়েল লাইব্রেরি থেকে',
    explanation: 'মহামহোপাধ্যায় হরপ্রসাদ শাস্ত্রী ১৯০৭ সালে নেপালের রাজদরবারের রয়েল লাইব্রেরি থেকে চর্যাপদের পুথি আবিষ্কার করেন এবং ১৯১৬ সালে বঙ্গীয় সাহিত্য পরিষদ থেকে তা প্রকাশ করেন।',
    subjectId: 'bangla',
    subjectName: 'বাংলা ভাষা ও সাহিত্য',
    topic: 'চর্যাপদ ও প্রাচীন যুগ',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৪৪তম প্রিলিমিনারি',
    year: '44th BCS',
    isRepeated: true,
    repeatFrequency: '৭+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-bn-2',
    question: 'চর্যাপদে সবচেয়ে বেশি পদ রচনা করেছেন কে?',
    options: ['কাহ্নপা', 'লুইপা', 'ভুসুকুপা', 'শবরপা'],
    correctAnswer: 'কাহ্নপা',
    explanation: 'চর্যাপদের মোট পদকর্তাদের মধ্যে কাহ্নপা সর্বোচ্চ ১৩টি পদ (মতান্তরে ১২টি) রচনা করেন। দ্বিতীয় সর্বোচ্চ ৮টি পদ রচনা করেন ভুসুকুপা। আদি কবি লুইপা ২টি পদ রচনা করেন।',
    subjectId: 'bangla',
    subjectName: 'বাংলা ভাষা ও সাহিত্য',
    topic: 'চর্যাপদ ও প্রাচীন যুগ',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪১তম প্রিলিমিনারি',
    year: '41st BCS',
    isRepeated: true,
    repeatFrequency: '৫+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-bn-3',
    question: '‘পদ্মাবতী’ কাব্যের রচয়িতা কে?',
    options: ['আলাওল', 'দৌলত কাজী', 'শাহ মুহম্মদ সগীর', 'সৈয়দ সুলতান'],
    correctAnswer: 'আলাওল',
    explanation: 'মহাকবি আলাওল হিন্দি কবি মালিক মুহম্মদ জায়সির ‘পদুমাবত’ কাব্য অবলম্বনে রোমান্টিক প্রণয়োপাখ্যান ‘পদ্মাবতী’ রচনা করেন। তিনি সপ্তদশ শতাব্দীর আরাকান রাজসভার অন্যতম শ্রেষ্ঠ কবি ছিলেন।',
    subjectId: 'bangla',
    subjectName: 'বাংলা ভাষা ও সাহিত্য',
    topic: 'মধ্যযুগের সাহিত্য',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৪০তম প্রিলিমিনারি',
    year: '40th BCS',
    isRepeated: true,
    repeatFrequency: '৬+ বার এসেছে',
    importanceLevel: 'Must Remember'
  },
  {
    id: 'q-bn-4',
    question: 'বাংলা বর্ণমালায় মাত্রাহীন বর্ণের সংখ্যা কয়টি?',
    options: ['১০টি', '৮টি', '৩২টি', '১১টি'],
    correctAnswer: '১০টি',
    explanation: 'বাংলা বর্ণমালায় মোট বর্ণ ৫০টি। এর মধ্যে মাত্রাহীন বর্ণ ১০টি (স্বরবর্ণ ৪টি: এ, ঐ, ও, ঔ এবং ব্যঞ্জনবর্ণ ৬টি: ঙ, ঞ, ৎ, ং, ঃ, ঁ)। অর্ধমাত্রার বর্ণ ৮টি এবং পূর্ণমাত্রার বর্ণ ৩২টি।',
    subjectId: 'bangla',
    subjectName: 'বাংলা ভাষা ও সাহিত্য',
    topic: 'বাংলা ব্যাকরণ ও ধ্বনিতত্ত্ব',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪৩তম প্রিলিমিনারি',
    year: '43rd BCS',
    isRepeated: true,
    repeatFrequency: '৪+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-bn-5',
    question: '‘বীণাপাণি’ কোন সমাসের উদাহরণ?',
    options: ['ব্যধিকরণ বহুব্রীহি', 'সমানাধিকরণ বহুব্রীহি', 'মধ্যপদলোপী কর্মধারয়', 'তৎপুরুষ সমাস'],
    correctAnswer: 'ব্যধিকরণ বহুব্রীহি',
    explanation: 'বীণা পাণিতে (হাতে) যার = বীণাপাণি (দেবী সরস্বতী)। বহুব্রীহি সমাসের পূর্বপদ ও পরপদ কোনোটিই যদি বিশেষ্য বা কোনোটি যদি বিশেষণ না হয়ে দুটিই বিশেষ্য পদ হয় এবং বিভক্তियুক্ত থাকে তবে তাকে ব্যধিকরণ বহুব্রীহি বলে।',
    subjectId: 'bangla',
    subjectName: 'বাংলা ভাষা ও সাহিত্য',
    topic: 'সমাস ও ব্যাকরণ',
    difficulty: 'Hard',
    examSource: 'বিসিএস ৪৫তম প্রিলিমিনারি',
    year: '45th BCS',
    isRepeated: true,
    repeatFrequency: '৩+ বার এসেছে',
    importanceLevel: 'Important'
  },

  // English
  {
    id: 'q-en-1',
    question: 'Who wrote the play "The Tempest"?',
    options: ['William Shakespeare', 'Christopher Marlowe', 'Ben Jonson', 'John Webster'],
    correctAnswer: 'William Shakespeare',
    explanation: '"The Tempest" is one of William Shakespeare’s last tragicomedies / romances, written around 1610–1611, featuring characters Prospero, Miranda, and Caliban.',
    subjectId: 'english',
    subjectName: 'English Language & Literature',
    topic: 'Shakespearean Drama',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৪২তম প্রিলিমিনারি',
    year: '42nd BCS',
    isRepeated: true,
    repeatFrequency: '৮+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-en-2',
    question: 'What is the meaning of the idiom "A bolt from the blue"?',
    options: ['An unexpected and sudden calamity', 'A flash of lightning', 'A pleasant surprise', 'A stormy weather'],
    correctAnswer: 'An unexpected and sudden calamity',
    explanation: '"A bolt from the blue" means a completely sudden, unexpected, and shocking event (বিনা মেঘে বজ্রপাত).',
    subjectId: 'english',
    subjectName: 'English Language & Literature',
    topic: 'Idioms & Phrases',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৩৮তম প্রিলিমিনারি',
    year: '38th BCS',
    isRepeated: true,
    repeatFrequency: '৪+ বার এসেছে',
    importanceLevel: 'Important'
  },
  {
    id: 'q-en-3',
    question: 'Select the correct sentence with subject-verb agreement:',
    options: [
      'Neither the teacher nor the students were present.',
      'Neither the teacher nor the students was present.',
      'Neither the students nor the teacher were present.',
      'Neither of the boys have done their homework.'
    ],
    correctAnswer: 'Neither the teacher nor the students were present.',
    explanation: 'When two subjects are connected by "Neither... nor", the verb agrees in number and person with the closest subject. Here "students" (plural) is closest to the verb, so "were" is correct.',
    subjectId: 'english',
    subjectName: 'English Language & Literature',
    topic: 'Grammar & Subject-Verb Agreement',
    difficulty: 'Hard',
    examSource: 'বাংলাদেশ ব্যাংক এডি ২০২৩',
    year: 'BB AD 2023',
    isRepeated: true,
    repeatFrequency: '৫+ বার এসেছে',
    importanceLevel: 'Must Remember'
  },

  // Bangladesh Affairs
  {
    id: 'q-bd-1',
    question: 'বাংলাদেশের সংবিধানের কোন অনুচ্ছেদে "নির্বাহী বিভাগ থেকে বিচার বিভাগের পৃথকীকরণ" এর কথা বলা হয়েছে?',
    options: ['অনুচ্ছেদ ২২', 'অনুচ্ছেদ ২১', 'অনুচ্ছেদ ২৭', 'অনুচ্ছেদ ৩৩'],
    correctAnswer: 'অনুচ্ছেদ ২২',
    explanation: 'সংবিধানের রাষ্ট্র পরিচালনার মূলনীতি অংশের ২২ নম্বর অনুচ্ছেদে স্পষ্টভাবে রাষ্ট্র কর্তৃক নির্বাহী অঙ্গসমূহ থেকে বিচার বিভাগের পৃথকীকরণ নিশ্চিত করার নির্দেশনা দেওয়া হয়েছে। (মাজদার হোসেন মামলার প্রেক্ষিতে ১ নভেম্বর ২০০৭ পৃথক হয়)।',
    subjectId: 'bangladesh',
    subjectName: 'বাংলাদেশ বিষয়াবলি',
    topic: 'বাংলাদেশের সংবিধান',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪৫তম প্রিলিমিনারি',
    year: '45th BCS',
    isRepeated: true,
    repeatFrequency: '৬+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-bd-2',
    question: 'মুক্তিযুদ্ধের সময় সমগ্র বাংলাদেশকে কয়টি সেক্টরে ভাগ করা হয়েছিল?',
    options: ['১১টি সেক্টরে', '১০টি সেক্টরে', '৬৪টি সেক্টরে', '৮টি সেক্টরে'],
    correctAnswer: '১১টি সেক্টরে',
    explanation: '১৯৭১ সালের জুলাই মাসে অনুষ্ঠিত সেক্টর কমান্ডার্স কনফারেন্সে সমগ্র বাংলাদেশকে ১১টি প্রশাসনিক সেক্টর এবং ৬৪টি সাব-সেক্টরে ভাগ করা হয়েছিল। ১০ নং সেক্টর ছিল নৌ কমান্ডো সেক্টর।',
    subjectId: 'bangladesh',
    subjectName: 'বাংলাদেশ বিষয়াবলি',
    topic: 'মুক্তিযুদ্ধ ও সেক্টরসমূহ',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৩৭তম প্রিলিমিনারি',
    year: '37th BCS',
    isRepeated: true,
    repeatFrequency: '১০+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-bd-3',
    question: 'ঐতিহাসিক ৭ই মার্চের ভাষণ সংবিধানের কোন তফসিলে অন্তর্ভুক্ত করা হয়েছে?',
    options: ['৫ম তফসিলে', '৬ষ্ঠ তফসিলে', '৭ম তফসিলে', '৪র্থ তফসিলে'],
    correctAnswer: '৫ম তফসিলে',
    explanation: 'সংবিধানের ১৫০(২) অনুচ্ছেদ অনুযায়ী ৫ম তফসিলে ৭ই মার্চের ভাষণ, ৬ষ্ঠ তফসিলে ২৫শে মার্চ মধ্যরাতে বঙ্গবন্ধুর স্বাধীনতার ঘোষণা এবং ৭ম তফসিলে ১০ই এপ্রিল ১৯৭১ মুজিবনগরে জারিকৃত স্বাধীনতার ঘোষণাপত্র সন্নিবেশিত হয়েছে।',
    subjectId: 'bangladesh',
    subjectName: 'বাংলাদেশ বিষয়াবলি',
    topic: 'সংবিধানের তফসিলসমূহ',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪৩তম প্রিলিমিনারি',
    year: '43rd BCS',
    isRepeated: true,
    repeatFrequency: '৫+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-bd-4',
    question: 'মুজিবনগর সরকারের অর্থমন্ত্রী কে ছিলেন?',
    options: ['ক্যাপ্টেন এম মনসুর আলী', 'তাজউদ্দীন আহমদ', 'খন্দকার মোশতাক আহমদ', 'এ এইচ এম কামারুজ্জামান'],
    correctAnswer: 'ক্যাপ্টেন এম মনসুর আলী',
    explanation: 'মুজিবনগর সরকারের অর্থমন্ত্রী ছিলেন ক্যাপ্টেন এম মনসুর আলী। প্রধানমন্ত্রী ছিলেন তাজউদ্দীন আহমদ, পররাষ্ট্র ও আইনমন্ত্রী ছিলেন খন্দকার মোশতাক আহমদ এবং স্বরাষ্ট্র ও ত্রাণমন্ত্রী ছিলেন এ এইচ এম কামারুজ্জামান।',
    subjectId: 'bangladesh',
    subjectName: 'বাংলাদেশ বিষয়াবলি',
    topic: 'মুজিবনগর সরকার',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪১তম প্রিলিমিনারি',
    year: '41st BCS',
    isRepeated: true,
    repeatFrequency: '৬+ বার এসেছে',
    importanceLevel: 'Must Remember'
  },

  // International Affairs
  {
    id: 'q-int-1',
    question: 'আন্তর্জাতিক বিচার আদালত (ICJ) এর সদরদপ্তর কোথায় অবস্থিত?',
    options: ['দ্য হেগ, নেদারল্যান্ডস', 'জেনেভা, সুইজারল্যান্ড', 'নিউইয়র্ক, যুক্তরাষ্ট্র', 'ভিয়েনা, অস্ট্রিয়া'],
    correctAnswer: 'দ্য হেগ, নেদারল্যান্ডস',
    explanation: 'জাতিসংঘের প্রধান বিচার বিভাগীয় অঙ্গ আন্তর্জাতিক আদালত (ICJ) নেদারল্যান্ডসের দ্য হেগের পিস প্যালেসে অবস্থিত। এর ১৫ জন বিচারক ৯ বছরের জন্য নির্বাচিত হন।',
    subjectId: 'international',
    subjectName: 'আন্তর্জাতিক বিষয়াবলি',
    topic: 'আন্তর্জাতিক সংস্থা ও সদরদপ্তর',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৪৪তম প্রিলিমিনারি',
    year: '44th BCS',
    isRepeated: true,
    repeatFrequency: '৮+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-int-2',
    question: 'জাতিসংঘ নিরাপত্তা পরিষদের মোট সদস্য সংখ্যা কত?',
    options: ['১৫টি', '৫টি', '১০টি', '২০টি'],
    correctAnswer: '১৫টি',
    explanation: 'জাতিসংঘের নিরাপত্তা পরিষদে মোট সদস্য ১৫টি। এর মধ্যে ৫টি স্থায়ী সদস্য রাষ্ট্র (যুক্তরাষ্ট্র, যুক্তরাজ্য, রাশিয়া, চীন ও ফ্রান্স) যারা ভেটো ক্ষমতাসম্পন্ন এবং ১০টি অস্থায়ী সদস্য রাষ্ট্র যারা ২ বছরের জন্য সাধারণ পরিষদ কর্তৃক নির্বাচিত হয়।',
    subjectId: 'international',
    subjectName: 'আন্তর্জাতিক বিষয়াবলি',
    topic: 'জাতিসংঘ ব্যবস্থা',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৪০তম প্রিলিমিনারি',
    year: '40th BCS',
    isRepeated: true,
    repeatFrequency: '৭+ বার এসেছে',
    importanceLevel: 'Must Remember'
  },

  // ICT & Computer
  {
    id: 'q-ict-1',
    question: 'IPv4 অ্যাড্রেস কত বিটের হয়ে থাকে?',
    options: ['৩২ বিট', '৬৪ বিট', '১২৮ বিট', '১৬ বিট'],
    correctAnswer: '৩২ বিট',
    explanation: 'IPv4 (Internet Protocol version 4) অ্যাড্রেস ৩২ বিটের (৪ বাইট) হয়ে থাকে এবং এটি ৪টি অক্টেটে বিভক্ত থাকে। পক্ষান্তরে IPv6 অ্যাড্রেস ১২৮ বিটের (১৬ বাইট) হয়ে থাকে।',
    subjectId: 'ict',
    subjectName: 'কম্পিউটার ও তথ্যপ্রযুক্তি',
    topic: 'Computer Networking & IP Addressing',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪৫তম প্রিলিমিনারি',
    year: '45th BCS',
    isRepeated: true,
    repeatFrequency: '৪+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },
  {
    id: 'q-ict-2',
    question: 'কম্পিউটারের অস্থায়ী মেমোরি কোনটি?',
    options: ['RAM', 'ROM', 'Hard Disk', 'SSD'],
    correctAnswer: 'RAM',
    explanation: 'RAM (Random Access Memory) একটি ভোলাটাইল বা উদ্বায়ী অস্থায়ী মেমোরি, বিদ্যুৎ চলে গেলে এতে সংরক্ষিত সমস্ত ডেটা মুছে যায়। ROM একটি স্থায়ী ও নন-ভোলাটাইল মেমোরি।',
    subjectId: 'ict',
    subjectName: 'কম্পিউটার ও তথ্যপ্রযুক্তি',
    topic: 'Hardware & Memory Types',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৩৯তম বিশেষ বিসিএস',
    year: '39th BCS',
    isRepeated: true,
    repeatFrequency: '৫+ বার এসেছে',
    importanceLevel: 'Must Remember'
  },

  // Math
  {
    id: 'q-math-1',
    question: 'একটি দ্রব্য ৫০০ টাকায় ক্রয় করে ১০% লাভে বিক্রয় করা হলো। বিক্রয়মূল্য কত?',
    options: ['৫৫০ টাকা', '৫২৫ টাকা', '৬০০ টাকা', '৫১৫ টাকা'],
    correctAnswer: '৫৫০ টাকা',
    explanation: '১০% লাভে বিক্রয়মূল্য = ক্রয়মূল্যের ১১০%। অতএব বিক্রয়মূল্য = ৫০০ × (১১০/১০০) = ৫৫০ টাকা।',
    subjectId: 'math',
    subjectName: 'গাণিতিক যুক্তি',
    topic: 'লাভ ও ক্ষতি (Profit & Loss)',
    difficulty: 'Easy',
    examSource: 'প্রাথমিক শিক্ষক নিয়োগ ২০২২',
    year: 'Primary 2022',
    isRepeated: true,
    repeatFrequency: '৩+ বার এসেছে',
    importanceLevel: 'Important'
  },
  {
    id: 'q-math-2',
    question: 'log₂ 64 এর মান কত?',
    options: ['৬', '৪', '৮', '৩২'],
    correctAnswer: '৬',
    explanation: '৬৪ = ২⁶। সুতরাং log₂ 64 = log₂ (2⁶) = 6 · log₂ 2 = 6 · 1 = 6।',
    subjectId: 'math',
    subjectName: 'গাণিতিক যুক্তি',
    topic: 'লগারিদম (Logarithms)',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪১তম প্রিলিমিনারি',
    year: '41st BCS',
    isRepeated: true,
    repeatFrequency: '৪+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },

  // Mental Ability
  {
    id: 'q-men-1',
    question: 'ধারার পরবর্তী সংখ্যাটি কত? ৩, ৮, ১৫, ২৪, ৩৫, ... ?',
    options: ['৪৮', '৪৫', '৫০', '৪৬'],
    correctAnswer: '৪৮',
    explanation: 'পার্থক্য বৃদ্ধি পাচ্ছে: ৩ (+৫) = ৮, ৮ (+৭) = ১৫, ১৫ (+৯) = ২৪, ২৪ (+১১) = ৩৫, ৩৫ (+১৩) = ৪৮। (প্রতি ধাপে ২ করে বৃদ্ধি)।',
    subjectId: 'mental',
    subjectName: 'মানসিক দক্ষতা',
    topic: 'সংখ্যার ধারা (Number Series)',
    difficulty: 'Medium',
    examSource: 'বিসিএস ৪৩তম প্রিলিমিনারি',
    year: '43rd BCS',
    isRepeated: true,
    repeatFrequency: '৫+ বার এসেছে',
    importanceLevel: 'Extremely Important'
  },

  // General Science
  {
    id: 'q-sci-1',
    question: 'পানিতে দ্রবণীয় ভিটামিন কোনগুলো?',
    options: ['ভিটামিন B এবং C', 'ভিটামিন A এবং D', 'ভিটামিন E এবং K', 'ভিটামিন A এবং K'],
    correctAnswer: 'ভিটামিন B এবং C',
    explanation: 'ভিটামিন B-কমপ্লেক্স ও ভিটামিন C পানিতে দ্রবণীয় (শর্টকাট: BC)। আর ভিটামিন A, D, E, K চর্বিতে (স্নেহ পদার্থে) দ্রবণীয় (শর্টকাট: ADEK / KEDA)।',
    subjectId: 'science',
    subjectName: 'সাধারণ বিজ্ঞান',
    topic: 'ভিটামিন ও পুষ্টিবিজ্ঞান',
    difficulty: 'Easy',
    examSource: 'বিসিএস ৩৭তম প্রিলিমিনারি',
    year: '37th BCS',
    isRepeated: true,
    repeatFrequency: '৭+ বার এসেছে',
    importanceLevel: 'Must Remember'
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Constitution',
    front: 'অনুচ্ছেদ ৭০ (Article 70)',
    back: 'রাজনৈতিক দল থেকে পদত্যাগ বা দলের বিরুদ্ধে ভোটদান সংক্রান্ত বিধানে সংসদ সদস্য পদ শূন্য হওয়া।',
    hint: 'দলীয় আনুগত্য ও ফ্লোর ক্রসিং রোধের বিধান'
  },
  {
    id: 'fc-2',
    category: 'Constitution',
    front: 'অনুচ্ছেদ ৭৭ (Article 77)',
    back: 'ন্যায়পাল (Ombudsman) প্রতিষ্ঠা ও নিয়োগ সংক্রান্ত আইনগত বিধান।',
    hint: 'প্রশাসনিক জবাবদিহিতা নিশ্চিতকারী পদ'
  },
  {
    id: 'fc-3',
    category: 'Vocabulary',
    front: 'Ephemeral',
    back: 'ক্ষণস্থায়ী, ক্ষণভঙ্গুর (Lasting for a very short time / Transitory / Fleeting).',
    hint: 'Synonyms: Transient, Evancent, Temporary'
  },
  {
    id: 'fc-4',
    category: 'Vocabulary',
    front: 'Ubiquitous',
    back: 'সর্বব্যাপী, একই সাথে সর্বত্র বিদ্যমান (Present, appearing, or found everywhere).',
    hint: 'Synonyms: Omnipresent, Pervasive, Universal'
  },
  {
    id: 'fc-5',
    category: 'International Orgs',
    front: 'বিশ্ব বাণিজ্য সংস্থা (WTO)',
    back: 'প্রতিষ্ঠা: ১ জানুয়ারি ১৯৯৫, সদরদপ্তর: জেনেভা, সুইজারল্যান্ড। পূর্বসূরি সংস্থা: GATT (১৯৪৭)।',
    hint: 'আন্তর্জাতিক মুক্ত বাণিজ্য নিয়ন্ত্রণকারী'
  },
  {
    id: 'fc-6',
    category: 'Science Facts',
    front: 'রক্তের সার্বজনীন গ্রহীতা ও দাতা',
    back: 'সার্বজনীন গ্রহীতা (Universal Recipient): AB+ গ্রুপ। সার্বজনীন দাতা (Universal Donor): O- গ্রুপ।',
    hint: 'AB+ সবার রক্ত নিতে পারে, O- সবাইকে দিতে পারে'
  },
  {
    id: 'fc-7',
    category: 'Shortcuts',
    front: 'স্নেহে দ্রবণীয় ভিটামিন মনে রাখার টেকনিক',
    back: '"K-E-D-A" (কীডা) = ভিটামিন K, E, D, A। বাকি B এবং C পানিতে দ্রবণীয়।',
    hint: 'চর্বি বা স্নেহের ভিটামিন শর্টকাট'
  },
  {
    id: 'fc-8',
    category: 'Dates',
    front: 'মুজিবনগর সরকার গঠন ও শপথ',
    back: 'গঠন: ১০ এপ্রিল ১৯৭১ | শপথ গ্রহণ: ১৭ এপ্রিল ১৯৭১ (মেহেরপুরের বৈদ্যনাথতলা/মুজিবনগর)।',
    hint: 'স্বাধীন বাংলাদেশের প্রথম সরকার'
  }
];

export const INITIAL_CURRENT_AFFAIRS: CurrentAffairArticle[] = [
  {
    id: 'ca-1',
    title: 'পদ্মা সেতু ও আধুনিক বাংলাদেশের যোগাযোগ বিপ্লব',
    category: 'Bangladesh',
    date: '২০২৬ আপডেট',
    period: 'This Month',
    summary: 'পদ্মা বহুমুখী সেতু বাংলাদেশের নিজস্ব অর্থায়নে নির্মিত ৬.১৫ কিলোমিটার দীর্ঘ দ্বি-তলবিশিষ্ট সেতু। যা দেশের দক্ষিণ-পশ্চিমাঞ্চলের ২১টি জেলাকে রাজধানী ঢাকার সাথে সরাসরি সংযুক্ত করেছে।',
    importantFacts: [
      'পদ্মা সেতুর মোট দৈর্ঘ্য ৬.১৫ কিমি এবং প্রস্থ ১৮.১০ মিটার।',
      'সেতুতে মোট ৪১টি স্প্যান এবং ৪২টি পিলার রয়েছে (প্রতিটি স্প্যানের দৈর্ঘ্য ১৫০ মিটার)।',
      'রেল সংযোগসহ মোট দৈর্ঘ্য দাঁড়িয়েছে প্রায় ৯.৮৩ কিমি।',
      'প্রকল্পের প্রধান নকশাকার ছিল এইকম (AECOM)।'
    ],
    possibleBcsQuestions: [
      'পদ্মা সেতুর দৈর্ঘ্য কত এবং মোট স্প্যান কয়টি?',
      'পদ্মা সেতু কোন দুটি জেলাকে সংযুক্ত করেছে (মুন্সিগঞ্জ লৌহজং ও শরীয়তপুর জাজিরা)?',
      'পদ্মা সেতুর রেল সংযোগ প্রকল্প কবে উদ্বোধন করা হয়?'
    ],
    miniMcqs: [
      {
        id: 'ca-q-1',
        question: 'পদ্মা সেতুর মোট স্প্যান সংখ্যা কয়টি?',
        options: ['৪১টি', '৪২টি', '৪০টি', '৪৫টি'],
        correctAnswer: '৪১টি',
        explanation: 'পদ্মা সেতুতে মোট ৪১টি স্প্যান রয়েছে এবং পিলার রয়েছে ৪২টি।',
        subjectId: 'bangladesh',
        subjectName: 'বাংলাদেশ বিষয়াবলি',
        topic: 'সাম্প্রতিক মেগা প্রকল্প',
        difficulty: 'Easy',
        examSource: 'বিসিএস ৪৪তম প্রিলিমিনারি'
      }
    ]
  },
  {
    id: 'ca-2',
    title: 'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্র ও নিউক্লিয়ার ক্লাবে বাংলাদেশ',
    category: 'Science & Tech',
    date: '২০২৬ পর্যবেক্ষণ',
    period: 'This Month',
    summary: 'পাবনার ঈশ্বরদীর রূপপুরে রাশিয়ার রাষ্ট্রীয় পরমাণু শক্তি সংস্থা রোসাটমের কারিগরি সহায়তায় নির্মিত হচ্ছে বাংলাদেশের প্রথম ২,৪০০ মেগাওয়াট পারমাণবিক বিদ্যুৎ কেন্দ্র। বাংলাদেশ বিশ্বের ৩৩তম পারমাণবিক শক্তিসম্পন্ন দেশ।',
    importantFacts: [
      'মোট উৎপাদন ক্ষমতা ২,৪০০ মেগাওয়াট (২টি ইউনিট, প্রতিটিতে ১,২০০ মেগাওয়াট)।',
      'ব্যবহৃত প্রযুক্তি: রাশিয়ার অত্যাধুনিক ভিভিইআর-১২০০ (VVER-1200) রিঅ্যাক্টর।',
      'বাংলাদেশ আনুষ্ঠানিকভাবে বিশ্বের ৩৩তম নিউক্লিয়ার পাওয়ার ক্লাবে প্রবেশ করেছে।'
    ],
    possibleBcsQuestions: [
      'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্রে কোন দেশ কারিগরি সহায়তা দিচ্ছে?',
      'পারমাণবিক বিদ্যুৎ উৎপাদনে বাংলাদেশ বিশ্বের কততম দেশ?',
      'রূপপুর বিদ্যুৎ কেন্দ্রে ব্যবহৃত রিঅ্যাক্টরের নাম কী?'
    ],
    miniMcqs: [
      {
        id: 'ca-q-2',
        question: 'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্রের কারিগরি সহায়তা প্রদানকারী রাষ্ট্র কোনটি?',
        options: ['রাশিয়া (Rosatom)', 'চীন', 'ফ্রান্স', 'যুক্তরাষ্ট্র'],
        correctAnswer: 'রাশিয়া (Rosatom)',
        explanation: 'রাশিয়ার রোসাটম কর্পোরেশন ভিভিইআর-১২০০ রিঅ্যাক্টর স্থাপন করে রূপপুর প্রকল্প বাস্তবায়ন করছে।',
        subjectId: 'bangladesh',
        subjectName: 'বাংলাদেশ বিষয়াবলি',
        topic: 'বিজ্ঞান ও মেগা প্রকল্প',
        difficulty: 'Easy',
        examSource: 'সাম্প্রতিক প্রশ্নব্যাংক'
      }
    ]
  }
];

export const INITIAL_JOB_CIRCULARS: JobCircular[] = [
  {
    id: 'job-1',
    organization: 'বাংলাদেশ সরকারি কর্ম কমিশন (BPSC)',
    position: '৪৭তম বিসিএস ক্যাডার পদ (সাধারণ ও কারিগরি)',
    vacancies: '৩,৪৮০+',
    deadline: '৩০ নভেম্বর ২০২৬',
    eligibility: 'যেকোনো স্বীকৃত বিশ্ববিদ্যালয় থেকে ন্যূনতম ৪ বছর মেয়াদী স্নাতক বা সমমান ডিগ্রি',
    salary: '২২,০০০ - ৫৩,০৬০ টাকা (গ্রেড-৯)',
    category: 'BCS',
    applicationLink: 'http://bpsc.teletalk.com.bd',
    importantDates: 'প্রিলি সম্ভাব্য তারিখ: জানুয়ারি ২০২৭',
    isBookmarked: true
  },
  {
    id: 'job-2',
    organization: 'বাংলাদেশ ব্যাংক (ব্যাংকার্স সিলেকশন কমিটি)',
    position: 'সহকারী পরিচালক (Assistant Director - General)',
    vacancies: '২২৫ জন',
    deadline: '১৫ অক্টোবর ২০২৬',
    eligibility: 'স্নাতকোত্তর বা ৪ বছর মেয়াদী স্নাতক (ন্যূনতম ২টি প্রথম শ্রেণি/বিভাগ)',
    salary: '২২,০০০ - ৫৩,০৬০ টাকা (জাতীয় বেতন স্কেল ২০১৫)',
    category: 'Bank',
    applicationLink: 'https://erecruitment.bb.org.bd',
    importantDates: 'প্রিলিমিনারি পরীক্ষা: ডিসেম্বর ২০২৬',
    isBookmarked: false
  },
  {
    id: 'job-3',
    organization: 'প্রাথমিক শিক্ষা অধিদপ্তর (DPE)',
    position: 'সহকারী শিক্ষক (সরকারি প্রাথমিক বিদ্যালয়)',
    vacancies: '১৩,৭৭০ জন',
    deadline: '২৫ অক্টোবর ২০২৬',
    eligibility: 'যেকোনো বিষয়ে স্নাতক বা সমমানের ডিগ্রি (ন্যূনতম ২য় শ্রেণি/বিভাগ)',
    salary: '১১,০০০ - ২৬,৫৯০ টাকা (গ্রেড-১৩)',
    category: 'Primary',
    applicationLink: 'http://dpe.teletalk.com.bd',
    importantDates: 'লিখিত পরীক্ষা: নভেম্বর ২০২৬',
    isBookmarked: false
  },
  {
    id: 'job-4',
    organization: 'বেসরকারি শিক্ষক নিবন্ধন ও প্রত্যয়ন কর্তৃপক্ষ (NTRCA)',
    position: '১৯তম শিক্ষক নিবন্ধন পরীক্ষা (স্কুল ও কলেজ পর্যায়)',
    vacancies: '৫০,০০০+ সম্ভাব্য পদ',
    deadline: '১০ নভেম্বর ২০২৬',
    eligibility: 'সংশ্লিষ্ট বিষয়ে স্নাতক বা স্নাতকোত্তর ডিগ্রি',
    salary: 'স্কুল: ১২,৫০০-৩০,২৩০ টাকা (গ্রেড-১০/১১)',
    category: 'NTRCA',
    applicationLink: 'http://ntrca.teletalk.com.bd',
    importantDates: 'প্রিলিমিনারি টেস্ট: জানুয়ারি ২০২৭',
    isBookmarked: false
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Mock Test',
    description: 'প্রথমবার সম্পূর্ণ ২০০ নম্বরের বিসিএস প্রিলি মডেল টেস্ট সম্পন্ন করেছেন।',
    icon: 'Trophy',
    isUnlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedAt: Date.now() - 86400000 * 5
  },
  {
    id: 'ach-2',
    title: '7-Day Study Streak',
    description: 'টানা ৭ দিন নিয়মমাফিক স্টাডি লক্ষ্য ও কুইজ শেষ করেছেন।',
    icon: 'Flame',
    isUnlocked: true,
    progress: 23,
    maxProgress: 7,
    unlockedAt: Date.now() - 86400000 * 16
  },
  {
    id: 'ach-3',
    title: '1,000 MCQs Solved',
    description: '১,০০০টিরও বেশি বিসিএস প্রশ্ন সফলভাবে অনুশীলন করেছেন।',
    icon: 'Target',
    isUnlocked: true,
    progress: 8425,
    maxProgress: 1000,
    unlockedAt: Date.now() - 86400000 * 10
  },
  {
    id: 'ach-4',
    title: 'Accuracy Master (80%+)',
    description: 'ধারাবাহিক পরীক্ষায় ৮০% বা তার বেশি সঠিক নির্ভুলতা বজায় রেখেছেন।',
    icon: 'Zap',
    isUnlocked: true,
    progress: 81,
    maxProgress: 80,
    unlockedAt: Date.now() - 86400000 * 2
  },
  {
    id: 'ach-5',
    title: 'Constitution Scholar',
    description: 'বাংলাদেশের সংবিধানের সমস্ত গুরুত্বপূর্ণ অনুচ্ছেদের প্রশ্ন নির্ভুল করেছেন।',
    icon: 'BookOpen',
    isUnlocked: false,
    progress: 42,
    maxProgress: 50
  },
  {
    id: 'ach-6',
    title: 'Mock Master',
    description: '৫০টির বেশি পূর্ণাঙ্গ ও সাবজেক্টভিত্তিক মডেল টেস্ট শেষ করেছেন।',
    icon: 'Crown',
    isUnlocked: true,
    progress: 67,
    maxProgress: 50,
    unlockedAt: Date.now() - 86400000 * 1
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    id: 'u-1',
    name: 'তানভীর আহমেদ',
    avatar: '👨‍💼',
    score: 184.5,
    accuracy: 94.2,
    testsCompleted: 112,
    streakDays: 45,
    district: 'ঢাকা',
    university: 'ঢাকা বিশ্ববিদ্যালয়'
  },
  {
    rank: 2,
    id: 'u-2',
    name: 'ফারহানা আফরোজ',
    avatar: '👩‍💼',
    score: 181.0,
    accuracy: 92.8,
    testsCompleted: 98,
    streakDays: 38,
    district: 'চট্টগ্রাম',
    university: 'চট্টগ্রাম বিশ্ববিদ্যালয়'
  },
  {
    rank: 3,
    id: 'u-3',
    name: 'মাহমুদুল হাসান',
    avatar: '👨‍🎓',
    score: 179.5,
    accuracy: 91.5,
    testsCompleted: 105,
    streakDays: 32,
    district: 'রাজশাহী',
    university: 'রাজশাহী বিশ্ববিদ্যালয়'
  },
  {
    rank: 4,
    id: 'u-4',
    name: 'নুসরাত জাহান',
    avatar: '👩‍⚕️',
    score: 177.0,
    accuracy: 90.4,
    testsCompleted: 89,
    streakDays: 29,
    district: 'সিলেট',
    university: 'শাবিপ্রবি (SUST)'
  },
  {
    rank: 5,
    id: 'current-user',
    name: 'প্রার্থী (আপনি)',
    avatar: '🎯',
    score: 174.5,
    accuracy: 81.0,
    testsCompleted: 67,
    streakDays: 23,
    district: 'ঢাকা',
    university: 'বুয়েট (BUET)',
    isCurrentUser: true
  },
  {
    rank: 6,
    id: 'u-6',
    name: 'আরিফুল ইসলাম',
    avatar: '👨‍🏫',
    score: 172.0,
    accuracy: 88.5,
    testsCompleted: 76,
    streakDays: 21,
    district: 'খুলনা',
    university: 'খুলনা বিশ্ববিদ্যালয়'
  },
  {
    rank: 7,
    id: 'u-7',
    name: 'শামীমা নাসরিন',
    avatar: '👩‍🎓',
    score: 169.5,
    accuracy: 87.2,
    testsCompleted: 84,
    streakDays: 19,
    district: 'ময়মনসিংহ',
    university: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয়'
  }
];

export const INITIAL_STUDY_PLAN: StudyPlanItem[] = [
  {
    id: 'plan-1',
    timeSlot: 'Morning',
    subjectName: 'বাংলা ভাষা ও সাহিত্য',
    topicName: 'চর্যাপদ ও মধ্যযুগের পদাবলি সাহিত্য',
    durationMinutes: 45,
    type: 'Theory',
    isCompleted: true
  },
  {
    id: 'plan-2',
    timeSlot: 'Afternoon',
    subjectName: 'গাণিতিক যুক্তি (Math)',
    topicName: 'শতকরা ও লাভ-ক্ষতির শর্টকাট টেকনিক',
    durationMinutes: 60,
    type: 'Theory',
    isCompleted: true
  },
  {
    id: 'plan-3',
    timeSlot: 'Evening',
    subjectName: 'বাংলাদেশ বিষয়াবলি',
    topicName: 'সংবিধানের অনুচ্ছেদ ও মুক্তিযুদ্ধ সেক্টর',
    durationMinutes: 60,
    type: 'Theory',
    isCompleted: false
  },
  {
    id: 'plan-4',
    timeSlot: 'Night',
    subjectName: '৫০ MCQ প্র্যাকটিস',
    topicName: 'বিগত বিসিএস ও পিএসসি মডেল প্রশ্ন',
    durationMinutes: 30,
    type: 'MCQ Practice',
    isCompleted: false
  },
  {
    id: 'plan-5',
    timeSlot: 'Night',
    subjectName: 'ভুলের খাতা ও রিভিশন',
    topicName: 'আজকের ভুল প্রশ্ন ও দুর্বল টপিক রিভিশন',
    durationMinutes: 20,
    type: 'Revision',
    isCompleted: false
  }
];
