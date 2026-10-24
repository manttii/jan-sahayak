'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '../app/lang-context';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  textHi: string;
  textEn: string;
  action?: {
    labelHi: string;
    labelEn: string;
    href: string;
  };
}

const PRESET_QUERIES = [
  {
    qHi: 'मुझे कॉलेज दाखिले के लिए कौन से सर्टिफिकेट चाहिए?',
    qEn: 'Which certificates are needed for college admission?',
    ansHi: 'कॉलेज और स्कॉलरशिप के लिए आपको मुख्य रूप से "आय प्रमाण पत्र (Income Certificate)" और "स्थायी निवास (Domicile Certificate)" की आवश्यकता होती है। यदि आप आरक्षित वर्ग से हैं तो "जाति प्रमाण पत्र" भी चाहिए।',
    ansEn: 'For college admissions and scholarships, you primarily need an "Income Certificate" and "Domicile Certificate". If applicable, a "Caste Certificate" is also needed.',
    action: {
      labelHi: 'आय प्रमाण पत्र हेतु आवेदन करें →',
      labelEn: 'Apply for Income Certificate →',
      href: '/apply/income',
    },
  },
  {
    qHi: 'मूल निवास (Domicile) के लिए कौन से कागजात जरूरी हैं?',
    qEn: 'What documents are required for Domicile Certificate?',
    ansHi: 'उत्तराखण्ड मूल निवास के लिए: (1) आधार कार्ड, (2) 15 वर्ष या पैतृक निवास प्रमाण/खतौनी/बिजली बिल, (3) हाईस्कूल मार्कशीट (UK बोर्ड या राज्य के मान्यता प्राप्त स्कूल), और (4) पासपोर्ट फोटो आवश्यक है। DigiLocker से 1-क्लिक में दस्तावेज जुड़ जाते हैं।',
    ansEn: 'For Uttarakhand Domicile: (1) Aadhaar Card, (2) Land record/Electricity bill showing 15+ years stay, (3) High school marksheet from UK school, and (4) Passport photo. Can be auto-fetched from DigiLocker.',
    action: {
      labelHi: 'मूल निवास आवेदन खोलें →',
      labelEn: 'Open Domicile Application →',
      href: '/apply/domicile',
    },
  },
  {
    qHi: 'प्रमाण पत्र बनने में कितने दिन लगते हैं (RTS गारंटी)?',
    qEn: 'How many days does it take under Right to Services?',
    ansHi: 'उत्तराखण्ड सेवा का अधिकार अधिनियम (RTS Act) के तहत: आय प्रमाण पत्र 7 कार्य दिवस, स्थायी निवास 15 कार्य दिवस, जाति प्रमाण पत्र 14 दिन और जन्म प्रमाण पत्र 7 दिन में जारी करना अनिवार्य है। समय सीमा पार होने पर जिम्मेदार अधिकारी पर ₹250/दिन का जुर्माना लग सकता है।',
    ansEn: 'Under Uttarakhand Right to Services Act: Income certificate takes 7 working days, Domicile takes 15 days, Caste takes 14 days, and Birth takes 7 days. Delays attract statutory penalties on officers.',
    action: {
      labelHi: 'RTS समयसीमा चार्ट देखें →',
      labelEn: 'View RTS Timelines Chart →',
      href: '/timeline',
    },
  },
  {
    qHi: 'पर्वतीय क्षेत्र (Hill Certificate) का क्या लाभ है?',
    qEn: 'What is the benefit of Hilly Area Certificate?',
    ansHi: 'पर्वतीय क्षेत्र प्रमाण पत्र से उत्तराखण्ड के युवाओं को भारतीय सेना (Army), असम राइफल्स, पुलिस एवं अर्द्धसैनिक बलों की भर्ती में लंबाई (Height) एवं सीने के माप में निर्धारित छूट प्राप्त होती है।',
    ansEn: 'Hilly Area Certificate provides Uttarakhand youth height and chest physical measurement concessions in Indian Army, Police, and paramilitary recruitment.',
    action: {
      labelHi: 'पर्वतीय प्रमाण पत्र आवेदन करें →',
      labelEn: 'Apply for Hilly Certificate →',
      href: '/apply/hilly',
    },
  },
  {
    qHi: 'मैंने पहले आवेदन किया था, उसका स्टेटस कैसे देखूं?',
    qEn: 'How can I check the status of an existing application?',
    ansHi: 'आप अपने मोबाइल नंबर या SMS में प्राप्त आवेदन संख्या (जैसे UK-INC-2026-48291) को हमारे "ट्रैक" पेज पर डालकर वास्तविक समय की प्रगति देख सकते हैं।',
    ansEn: 'You can check real-time progress by entering your Application ID (e.g. UK-INC-2026-48291) or your 10-digit mobile number on our Track page.',
    action: {
      labelHi: 'अभी स्टेटस ट्रैक करें →',
      labelEn: 'Track Status Now →',
      href: '/track',
    },
  },
];

export default function AIAssistantModal() {
  const { lang, t, speak } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      textHi: 'नमस्ते! मैं "जन सहायक साथी" (AI Assistant) हूँ। मैं उत्तराखण्ड की ई-सेवाओं, आवश्यक दस्तावेज़ों, सरकारी समयसीमा और आवेदन में आपकी सहायता कर सकता हूँ। आप मुझसे हिंदी या अंग्रेजी में पूछ सकते हैं!',
      textEn: 'Hello! I am "Jan Sahayak Sathi" (AI Assistant). I can help you find services, required documents, RTS timelines, and guide your application. Ask me anything in Hindi or English!',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      textHi: query,
      textEn: query,
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Process intelligent assistant answer
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matchedPreset = PRESET_QUERIES.find(
        p =>
          qLower.includes(p.qEn.toLowerCase()) ||
          qLower.includes(p.qHi.toLowerCase()) ||
          (qLower.includes('college') && p.qEn.includes('college')) ||
          (qLower.includes('domicile') && p.qEn.includes('Domicile')) ||
          (qLower.includes('निवास') && p.qHi.includes('निवास')) ||
          (qLower.includes('income') && p.qEn.includes('college')) ||
          (qLower.includes('आय') && p.qHi.includes('दाखिले')) ||
          (qLower.includes('days') && p.qEn.includes('days')) ||
          (qLower.includes('दिन') && p.qHi.includes('दिन')) ||
          (qLower.includes('track') && p.qEn.includes('status')) ||
          (qLower.includes('ट्रैक') && p.qHi.includes('स्टेटस')) ||
          (qLower.includes('hill') && p.qEn.includes('Hilly')) ||
          (qLower.includes('पहाड़') && p.qHi.includes('पर्वतीय'))
      );

      let reply: Message;
      if (matchedPreset) {
        reply = {
          id: Math.random().toString(),
          sender: 'assistant',
          textHi: matchedPreset.ansHi,
          textEn: matchedPreset.ansEn,
          action: matchedPreset.action,
        };
      } else {
        reply = {
          id: Math.random().toString(),
          sender: 'assistant',
          textHi: `आपके प्रश्न "${query}" के संबंध में: उत्तराखण्ड अपणी सरकार पोर्टल पर आय, निवास, जाति, चरित्र और पर्वतीय प्रमाण पत्र उपलब्ध हैं। आप नीचे दिए गए बटन से सीधे सेवाएं देख सकते हैं या 1800-180-4188 पर कॉल कर सकते हैं।`,
          textEn: `Regarding your query "${query}": Uttarakhand Apuni Sarkar offers online certificates for Income, Domicile, Caste, Character, and Hill concession. You can explore all services or call 1800-180-4188.`,
          action: {
            labelHi: 'सभी सेवाएं देखें →',
            labelEn: 'Explore All Services →',
            href: '/services',
          },
        };
      }

      setMessages(prev => [...prev, reply]);
      speak(lang === 'hi' ? reply.textHi : reply.textEn);
    }, 600);
  };

  const handleVoiceSim = () => {
    setIsListening(true);
    // Simulate voice speech capture with realistic query
    setTimeout(() => {
      setIsListening(false);
      const voiceQuery =
        lang === 'hi'
          ? 'मुझे मूल निवास के लिए क्या कागजात चाहिए?'
          : 'What documents are required for Domicile Certificate?';
      setInput(voiceQuery);
      handleSend(voiceQuery);
    }, 1400);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t('जन सहायक साथी से बात करें', 'Talk to Jan Sahayak AI Assistant')}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 bg-linear-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-full p-3.5 sm:px-5 sm:py-3.5 shadow-2xl flex items-center gap-2.5 active:scale-95 transition-all border-2 border-white/40 ring-4 ring-emerald-500/20"
      >
        <span className="text-2xl animate-bounce" role="img" aria-label="AI bot">
          🤖
        </span>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-bold leading-tight">{t('जन सहायक साथी', 'Jan Sahayak Sathi')}</p>
          <p className="text-[10px] text-emerald-100 font-medium">{t('AI वॉइस व चैट मदद', 'AI Voice & Chat Help')}</p>
        </div>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('जन सहायक AI साथी', 'Jan Sahayak AI Assistant')}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 flex flex-col h-[85vh] max-h-[640px] overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-emerald-700 to-green-800 p-4 text-white flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                    {t('जन सहायक साथी (AI Assistant)', 'Jan Sahayak Sathi (AI Assistant)')}
                  </h3>
                  <p className="text-[11px] text-emerald-200">
                    {t('उत्तराखण्ड ई-सेवाएं परामर्श', 'Uttarakhand e-Services Advisor')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      m.sender === 'user'
                        ? 'bg-emerald-700 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p>{lang === 'hi' ? m.textHi : m.textEn}</p>

                    {m.sender === 'assistant' && (
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => speak(lang === 'hi' ? m.textHi : m.textEn)}
                          className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1"
                          title={t('सुनें', 'Listen to answer')}
                        >
                          <span>🔊</span>
                          <span>{t('सुनें', 'Listen')}</span>
                        </button>

                        {m.action && (
                          <Link
                            href={m.action.href}
                            onClick={() => setIsOpen(false)}
                            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                          >
                            {lang === 'hi' ? m.action.labelHi : m.action.labelEn}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions Carousel */}
            <div className="p-2.5 bg-slate-100 border-t border-slate-200 shrink-0 overflow-x-auto flex gap-2 no-scrollbar">
              {PRESET_QUERIES.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(lang === 'hi' ? p.qHi : p.qEn)}
                  className="shrink-0 bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-700 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors"
                >
                  {lang === 'hi' ? p.qHi : p.qEn}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={handleVoiceSim}
                  aria-label={t('बोलकर पूछें', 'Speak question')}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse border-red-600'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                  title={t('माइक से बोलें', 'Speak with microphone')}
                >
                  {isListening ? '🎙️...' : '🎙️'}
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={
                    lang === 'hi'
                      ? 'अपना प्रश्न यहां लिखें (जैसे: आय प्रमाण पत्र)...'
                      : 'Ask a question (e.g. documents for domicile)...'
                  }
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0"
                >
                  {t('पूछें', 'Send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
