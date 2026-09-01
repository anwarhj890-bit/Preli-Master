import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
});

// 1. Preli AI Mentor Chat & Conceptual Explanations
app.post('/api/gemini/mentor', async (req, res) => {
  try {
    const { prompt, mode, history = [] } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getAI();
    if (!ai) {
      return res.json({
        reply: `[অফলাইন মোড / সিমুলেশন]\n\n**${prompt}** সম্পর্কিত গুরুত্বপূর্ণ বিসিএস পরামর্শ:\n\n১. বিগত ১০ বছরের বিসিএস ও পিএসসি পরীক্ষার প্রশ্ন বিশ্লেষণ করে প্রস্তুতি নিন।\n২. বিসিএস প্রিলির জন্য মূল টেক্সটবুক ও রেফারেন্স বই থেকে গুরুত্বপূর্ণ অনুচ্ছেদগুলো হাইলাইট করে পড়ুন।\n৩. প্রতিদিন অন্তত ৫০টি এমসিকিউ ও ১টি রিভিশন সেট সমাধান করুন।\n\n*(Gemini API Key সংযুক্ত থাকলে সরাসরি এআই থেকে রিয়েল-টাইম বিস্তারিত উত্তর পাবেন)*`
      });
    }

    const systemInstruction = `You are PRELI MASTERMIND AI (প্রেক্ষাপট: বাংলাদেশ বিসিএস ও সরকারি চাকরি প্রস্তুতি এআই মেন্টর).
You are an expert BCS cadre mentor, top-ranker, and pedagogical coach for Bangladesh Public Service Commission (BPSC), Bank Recruitment, Primary, and NTRCA examinations.
Respond in natural, engaging, professional, and clear Bengali (বাংলা), with precise English terminology where necessary.

Modes:
- "explain_simply": Explain the topic in crystal-clear simple Bengali with relatable examples, bullet points, and memory tricks.
- "give_example": Provide real exam-oriented examples, case studies, or mathematical/grammatical applications.
- "make_mnemonic": Provide catchy Bengali mnemonics (ছন্দ / টেকনিক / শর্টকাট) to remember difficult lists, articles, dates, or formulas.
- "quiz_me": Ask 3-5 high-yield BCS standard questions to test the candidate immediately.
- "general": Give strategic, highly actionable advice, syllabus breakdown, or conceptual clarity.

Include:
- সহজ ব্যাখ্যা (Simple explanation)
- বিগত পরীক্ষার ট্র্যাপ (BCS Common Traps)
- মনে রাখার টেকনিক / শর্টকাট (Memory Trick)
- গুরুত্বপূর্ণ তথ্য (High-yield facts)
Keep it structured, visually clean, with bold headings and clean formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/gemini/mentor:', error);
    res.status(500).json({
      error: 'Failed to generate mentor response',
      details: error?.message || String(error)
    });
  }
});

// 2. Explain Specific Question with AI
app.post('/api/gemini/explain-question', async (req, res) => {
  try {
    const { question, options, correctAnswer, userAnswer, subject, topic, examSource } = req.body;

    const ai = getAI();
    if (!ai) {
      return res.json({
        explanation: `**সঠিক উত্তর ব্যাখ্যা:**\n\nসঠিক উত্তর: **${correctAnswer}**\n\n• **মূল কারণ:** এই প্রশ্নের সঠিক উত্তরটি পিএসসির অফিশিয়াল সিলেবাস ও বিগত পরীক্ষার রেফারেন্স অনুসারে প্রমাণিত।\n• **অন্য অপশনগুলো কেন ভুল:** বিকল্প অপশনগুলোর সাথে প্রশ্নোক্ত বিষয়ের সময়কাল বা সংজ্ঞাগত পার্থক্য রয়েছে।\n• **বিসিএস ট্র্যাপ:** এই ধরনের প্রশ্নে শিক্ষার্থীরা প্রায়শই একই রকম দেখতে শব্দের কারণে ভুল করে থাকে।`
      });
    }

    const promptText = `প্রশ্ন: ${question}
অপশনসমূহ:
A) ${options[0]}
B) ${options[1]}
C) ${options[2]}
D) ${options[3]}
সঠিক উত্তর: ${correctAnswer}
শিক্ষার্থীর উত্তর: ${userAnswer || 'উত্তর দেয়নি'}
বিষয়: ${subject || 'সাধারণ জ্ঞান'} | টপিক: ${topic || 'বিসিএস প্রস্তুতি'} | উৎস: ${examSource || 'বিসিএস প্রিলিমিনারি'}

এই প্রশ্নটির একটি চমৎকার BCS স্ট্যান্ডার্ড AI বিশ্লেষণ প্রদান করুন। এতে থাকবে:
১. ✅ সঠিক উত্তর কেন সঠিক (সুস্পষ্ট তথ্য ও ব্যাকগ্রাউন্ড)
২. ❌ অন্যান্য অপশনগুলো কেন ভুল (সংক্ষিপ্ত কারণ)
৩. ⚠️ বিসিএস ট্র্যাপ ও কনফিউশন পয়েন্ট (পরীক্ষায় কী ভুল হতে পারে)
৪. 🧠 মনে রাখার শর্টকাট টেকনিক / ছন্দ (যদি প্রযোজ্য হয়)
৫. 📌 সম্পর্কিত ৩টি গুরুত্বপূর্ণ তথ্য যা পরীক্ষায় আসতে পারে

ভাষার মাধ্যম: বাংলা (সহজ ও সাবলীল)।`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction: 'You are the Chief Examiner and BCS Mentor for PRELI MASTERMIND. Provide authentic, highly accurate, and motivating explanations for competitive exams in Bangladesh.',
      },
    });

    res.json({ explanation: response.text });
  } catch (error: any) {
    console.error('Error in /api/gemini/explain-question:', error);
    res.status(500).json({
      error: 'Failed to generate question explanation',
      details: error?.message || String(error)
    });
  }
});

// 3. AI Question Generator
app.post('/api/gemini/generate-questions', async (req, res) => {
  try {
    const { subject, topic, difficulty = 'Medium', count = 5, examType = 'BCS Preliminary' } = req.body;

    const ai = getAI();
    if (!ai) {
      // Fallback offline mock generator if no key
      return res.json({
        questions: [
          {
            id: `gen-${Date.now()}-1`,
            question: `বাংলাদেশের সংবিধানের কোন অনুচ্ছেদ অনুযায়ী নির্বাচন কমিশন গঠিত হয়?`,
            options: ['১১৮ অনুচ্ছেদ', '১১৯ অনুচ্ছেদ', '১২০ অনুচ্ছেদ', '১২৩ অনুচ্ছেদ'],
            correctAnswer: '১১৮ অনুচ্ছেদ',
            explanation: 'সংবিধানের ১১৮(১) অনুচ্ছেদ অনুসারে প্রধান নির্বাচন কমিশনার এবং অনধিক চারজন নির্বাচন কমিশনার নিয়ে একটি নির্বাচন কমিশন থাকবে।',
            subject: subject || 'বাংলাদেশ বিষয়াবলি',
            topic: topic || 'সংবিধান',
            difficulty: 'Medium',
            examSource: 'AI Custom Generator'
          },
          {
            id: `gen-${Date.now()}-2`,
            question: `মহাস্থানগড় কোন নদীর তীরে অবস্থিত?`,
            options: ['করতোয়া', 'তিস্তা', 'ব্রহ্মপুত্র', 'পদ্মা'],
            correctAnswer: 'করতোয়া',
            explanation: 'বগুড়া জেলায় করতোয়া নদীর পশ্চিম তীরে প্রাচীন পুণ্ড্রবর্ধনের রাজধানী মহাস্থানগড় অবস্থিত।',
            subject: subject || 'বাংলাদেশ বিষয়াবলি',
            topic: topic || 'প্রাচীন ইতিহাস',
            difficulty: 'Easy',
            examSource: 'AI Custom Generator'
          }
        ]
      });
    }

    const promptText = `Generate ${Math.min(count, 10)} high-quality multiple choice questions (MCQs) in Bengali for ${examType}.
Subject: ${subject}
Topic: ${topic}
Difficulty level: ${difficulty}

Return ONLY valid JSON matching this schema:
Array of objects where each object has:
- "question": string (Bangla text)
- "options": array of 4 strings (Bangla text)
- "correctAnswer": string (must exactly match one of the 4 options)
- "explanation": string (Detailed explanation in Bangla with facts and memory tip)
- "subject": string
- "topic": string
- "difficulty": "Easy" | "Medium" | "Hard"
- "examSource": string (e.g. "AI Mastermind Specially Curated")`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING },
              subject: { type: Type.STRING },
              topic: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              examSource: { type: Type.STRING },
            },
            required: ['question', 'options', 'correctAnswer', 'explanation', 'subject', 'topic', 'difficulty'],
          },
        },
      },
    });

    const parsed = JSON.parse(response.text.trim());
    const formatted = parsed.map((q: any, i: number) => ({
      ...q,
      id: `ai-gen-${Date.now()}-${i}`,
      examSource: q.examSource || `${examType} Model`
    }));

    res.json({ questions: formatted });
  } catch (error: any) {
    console.error('Error in /api/gemini/generate-questions:', error);
    res.status(500).json({
      error: 'Failed to generate custom questions',
      details: error?.message || String(error)
    });
  }
});

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PRELI MASTERMIND server running on http://localhost:${PORT}`);
  });
}

startServer();
