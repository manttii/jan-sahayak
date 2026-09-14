'use client';
import Link from 'next/link';
import { useLang } from './lang-context';

const services = [
  { id: 'income',    emoji: '📄', hi: 'आय प्रमाण पत्र',    en: 'Income Certificate',  desc: 'For school, college, govt schemes' },
  { id: 'domicile',  emoji: '🏠', hi: 'निवास प्रमाण पत्र',  en: 'Domicile Certificate', desc: 'Proof of residence in Uttarakhand' },
  { id: 'caste',     emoji: '📋', hi: 'जाति प्रमाण पत्र',   en: 'Caste Certificate',    desc: 'SC / ST / OBC verification' },
  { id: 'birth',     emoji: '👶', hi: 'जन्म प्रमाण पत्र',   en: 'Birth Certificate',    desc: 'Official record of birth' },
  { id: 'character', emoji: '✅', hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate', desc: 'For jobs & college admissions' },
  { id: 'marriage',  emoji: '💍', hi: 'विवाह प्रमाण पत्र',  en: 'Marriage Certificate',  desc: 'Legal marriage registration' },
];

const quickHelp = [
  { q: 'Which certificate do I need?',    qhi: 'मुझे कौन सा प्रमाण पत्र चाहिए?',   link: '/guide' },
  { q: 'What documents are required?',   qhi: 'कौन से दस्तावेज़ चाहिए?',            link: '/documents' },
  { q: 'How long will it take?',         qhi: 'कितना समय लगेगा?',                   link: '/timeline' },
];

export default function Home() {
  const { lang, toggle } = useLang();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" aria-hidden="true">उ</div>
            <div>
              <p className="text-[10px] text-slate-400 leading-none uppercase tracking-wide">Uttarakhand Sarkar</p>
              <p className="font-bold text-sm text-slate-900 leading-tight">Apuni Sarkar</p>
            </div>
          </div>
          <button
            onClick={toggle}
            aria-label={lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
            className="text-sm border border-green-700 text-green-700 rounded-full px-3 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {lang === 'hi' ? 'EN' : 'हि'}
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pb-28">
        {/* Hero */}
        <div className="pt-6 pb-3">
          <h1 className="text-2xl font-bold text-slate-900">
            {lang === 'hi' ? 'नमस्ते 🙏' : 'Welcome 🙏'}
          </h1>
          <p className="text-slate-500 mt-1">
            {lang === 'hi' ? 'आज आपको क्या चाहिए?' : 'What can we help you with today?'}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder={lang === 'hi' ? 'सेवा खोजें...' : 'Search for a service...'}
            aria-label={lang === 'hi' ? 'सेवा खोजें' : 'Search services'}
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-slate-400"
          />
        </div>

        {/* Services Grid */}
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          {lang === 'hi' ? 'सेवाएं चुनें' : 'Select a Service'}
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-7">
          {services.map(s => (
            <Link href={s.id === 'income' ? '/apply/income' : `/apply/${s.id}`} key={s.id}>
              <div
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm active:scale-95 transition-transform cursor-pointer hover:border-green-300 hover:shadow-md min-h-[100px]"
                role="button"
                tabIndex={0}
              >
                <div className="text-3xl mb-2" role="img" aria-label={s.en}>{s.emoji}</div>
                <p className="font-semibold text-slate-900 text-sm leading-snug">
                  {lang === 'hi' ? s.hi : s.en}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Track Application CTA */}
        <Link href="/track">
          <div className="bg-green-700 text-white rounded-2xl p-4 flex items-center justify-between mb-4 shadow-lg shadow-green-200 active:scale-[0.98] transition-transform">
            <div>
              <p className="font-bold">{lang === 'hi' ? '📍 आवेदन ट्रैक करें' : '📍 Track Your Application'}</p>
              <p className="text-green-200 text-xs mt-0.5">
                {lang === 'hi' ? 'SMS में मिली ID डालें' : 'Enter the ID from your SMS'}
              </p>
            </div>
            <span className="text-2xl" aria-hidden="true">→</span>
          </div>
        </Link>

        {/* Quick Help */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <p className="font-semibold text-amber-800 text-sm mb-3">
            {lang === 'hi' ? '❓ समझ नहीं आया?' : '❓ Not sure where to start?'}
          </p>
          {quickHelp.map((h, i) => (
            <Link href={h.link} key={i}>
              <div className="flex items-center justify-between py-2.5 border-b border-amber-100 last:border-0 cursor-pointer">
                <span className="text-sm text-amber-900">{lang === 'hi' ? h.qhi : h.q}</span>
                <span className="text-amber-500 font-bold ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Helpline */}
        <div className="text-center text-sm text-slate-400">
          <p>{lang === 'hi' ? 'मदद चाहिए? कॉल करें' : 'Need help? Call us (free)'}</p>
          <a href="tel:18001804188" className="text-green-700 font-bold text-2xl block mt-1 focus:outline-none focus:underline">
            1800-180-4188
          </a>
          <p className="text-xs mt-1">{lang === 'hi' ? 'सोमवार–शनिवार, 9 AM – 6 PM' : 'Mon–Sat, 9 AM–6 PM'}</p>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]" aria-label="Main navigation">
        <div className="max-w-xl mx-auto flex justify-around py-2 px-2">
          {[
            { icon: '🏠', labelHi: 'होम',    labelEn: 'Home',     href: '/' },
            { icon: '📋', labelHi: 'सेवाएं', labelEn: 'Services', href: '/services' },
            { icon: '🔍', labelHi: 'स्थिति', labelEn: 'Track',    href: '/track' },
            { icon: '📢', labelHi: 'शिकायत', labelEn: 'Grievance',href: '/grievance' },
            { icon: '👤', labelHi: 'खाता',   labelEn: 'Account',  href: '/account' },
          ].map(n => (
            <Link href={n.href} key={n.href} aria-label={lang === 'hi' ? n.labelHi : n.labelEn}>
              <div className={`flex flex-col items-center px-2 py-1 rounded-xl ${n.href === '/' ? 'text-green-700' : 'text-slate-400'}`}>
                <span className="text-xl" aria-hidden="true">{n.icon}</span>
                <span className="text-[10px] mt-0.5 font-medium">{lang === 'hi' ? n.labelHi : n.labelEn}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
