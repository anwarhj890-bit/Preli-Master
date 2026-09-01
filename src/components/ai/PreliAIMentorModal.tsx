import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Zap,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}

export const PreliAIMentorModal: React.FC = () => {
  const { isAiMentorOpen, setIsAiMentorOpen, aiMentorInitialPrompt } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'আসসালামু আলাইকুম! আমি আপনার **PRELI MASTERMIND AI স্টাডি মেন্টর**। বিসিএস প্রিলিমিনারি সিলেবাসের যে কোনো কঠিন অধ্যায়, বিভ্রান্তিকর প্রশ্ন, শর্টকাট টেকনিক, স্মৃতিছন্দ (Mnemonics) কিংবা পড়াশোনার স্ট্র্যাটেজি জানতে আমাকে যে কোনো প্রশ্ন করুন।',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAiMentorOpen && aiMentorInitialPrompt) {
      handleSendMessage(aiMentorInitialPrompt);
    }
  }, [isAiMentorOpen, aiMentorInitialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          topic: 'BCS Preliminary General Preparation'
        })
      });

      const data = await response.json();
      const reply = data.reply || 'দুঃখিত, এই মুহূর্তে উত্তর তৈরিতে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'দুঃখিত, সংযোগে সমস্যা হয়েছে। আপনার প্রশ্নের জন্য বিসিএস হ্যান্ডনোট ও বিগত প্রশ্নের তথ্য পর্যালোচনা করুন।',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isAiMentorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl h-[85vh] rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base flex items-center gap-1.5">
                PRELI AI মেন্টর
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Gemini Flash
                </span>
              </h3>
              <span className="text-xs text-slate-400">বিসিএস পরীক্ষার তাৎক্ষণিক গাইড ও কৌশল</span>
            </div>
          </div>

          <button
            onClick={() => setIsAiMentorOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          {[
            'সংবিধানের জরুরি অনুচ্ছেদগুলো মনে রাখার ছন্দ দিন',
            'চর্যাপদ থেকে নিশ্চিত কমন প্রশ্ন কী কী?',
            'গাণিতিক যুক্তির কাজ ও সময়ের শর্টকাট সূত্র',
            'আন্তর্জাতিক সংস্থার সদর দপ্তর মনে রাখার ট্রিক'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap transition border border-slate-700/50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white font-medium shadow-md'
                      : 'bg-slate-800/90 border border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  {!isUser && (
                    <div className="flex justify-end pt-2 border-t border-slate-700/50 mt-2">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                    U
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-slate-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>PRELI AI বিশ্লেষণ ও নোট তৈরি করছে...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
            placeholder="বিসিএস প্রস্তুতি সম্পর্কিত যে কোনো প্রশ্ন লিখুন..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500"
          />

          <button
            disabled={!inputText.trim() || isLoading}
            onClick={() => handleSendMessage()}
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white disabled:opacity-40 transition shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
