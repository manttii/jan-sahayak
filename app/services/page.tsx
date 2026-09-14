'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';

type Category = 'all' | 'certificate' | 'permit' | 'other';

const services = [
  { id: 'income',      emoji: '📄', hi: 'आय प्रमाण पत्र',            en: 'Income Certificate',       time: '7-10 days',  timeHi: '7-10 दिन',   cat: 'certificate' as Category },
  { id: 'domicile',   emoji: '🏠', hi: 'निवास प्रमाण पत्र',          en: 'Domicile Certificate',     time: '10-15 days', timeHi: '10-15 दिन',  cat: 'certificate' as Category },
  { id: 'caste',      emoji: '📋', hi: 'जाति प्रमाण पत्र',           en: 'Caste Certificate',        time: '7-14 days',  timeHi: '7-14 दिन',   cat: 'certificate' as Category },
  { id: 'birth',      emoji: '👶', hi: 'जन्म प्रमाण पत्र',           en: 'Birth Certificate',        time: '5-7 days',   timeHi: '5-7 दिन',    cat: 'certificate' as Category },
  { id: 'character',  emoji: '✅', hi: 'चरित्र प्रमाण पत्र',         en: 'Character Certificate',    time: '10 days',    timeHi: '10 दिन',     cat: 'certificate' as Category },
  { id: 'marriage',   emoji: '💍', hi: 'विवाह प्रमाण पत्र',          en: 'Marriage Certificate',     time: '15-21 days', timeHi: '15-21 दिन',  cat: 'certificate' as Category },
  { id: 'death',      emoji: '🕊', hi: 'मृत्यु प्रमाण पत्र',         en: 'Death Certificate',        time: '5-7 days',   timeHi: '5-7 दिन',    cat: 'certificate' as Category },
  { id: 'disability', emoji: '♿', hi: 'विकलांगता प्रमाण पत्र',      en: 'Disability Certificate',   time: '15-30 days', timeHi: '15-30 दिन',  cat: 'certificate' as Category },
  { id: 'hilly',      emoji: '⛰', hi: 'पहाड़ी क्षेत्र प्रमाण पत्र',   en: 'Hilly Area Certificate',   time: '7 days',     timeHi: '7 दिन',      cat: 'certificate' as Category },
  { id: 'arms',       emoji: '🔐', hi: 'शस्त्र लाइसेंस',              en: 'Arms Licence',             time: '30-60 days', timeHi: '30-60 दिन',  cat: 'permit' as Category },
  { id: 'trade',      emoji: '🏪', hi: 'व्यापार लाइसेंस',             en: 'Trade Licence',            time: '15-20 days', timeHi: '15-20 दिन',  cat: 'permit' as Category },
  { id: 'ration',     emoji: '🌾', hi: 'राशन कार्ड',                  en: 'Ration Card',              time: '30 days',    timeHi: '30 दिन',     cat: 'other' as Category },
];

const filters: { id: Category; hi: string; en: string }[] = [
  { id: 'all',         hi: 'सभी',        en: 'All' },
  { id: 'certificate', hi: 'प्रमाण पत्र', en: 'Certificates' },
  { id: 'permit',      hi: 'अनुमति',     en: 'Permits' },
  { id: 'other',       hi: 'अन्य',       en: 'Other' },
];

const navItems = [
  { icon: '🏠', labelHi: 'होम',    labelEn: 'Home',      href: '/' },
  { icon: '📋', labelHi: 'सेवाएं', labelEn: 'Services',  href: '/services' },
  { icon: '🔍', labelHi: 'स्थिति', labelEn: 'Track',     href: '/track' },
  { icon: '📢', labelHi: 'शिकायत', labelEn: 'Grievance', href: '/grievance' },
  { icon: '👤', labelHi: 'खाता',   labelEn: 'Account',   href: '/account' },
];

export default function ServicesPage() {
  const { lang, toggle } = useLang();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filtered = services.filter(s => {
    const matchCat = activeFilter === 'all' || s.cat === activeFilter;
    const q = query.toLowerCase();
    const matchQ = !q || s.hi.includes(q) || s.en.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label={lang === 'hi' ? 'होम पर जाएं' : 'Go back home'}>
              <span className="text-slate-500 text-xl leading-none">←</span>
            </Link>
            <h1 className="font-bold text-slate-900 text-base">
              {lang === 'hi' ? 'सभी सेवाएं' : 'All Services'}
            </h1>
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

      <main className="max-w-xl mx-auto px-4 pb-24">
        <div className="relative mt-4 mb-3">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">🔍</span>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'सेवा खोजें...' : 'Search services...'}
            aria-label={lang === 'hi' ? 'सेवा खोजें' : 'Search services'}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-slate-400"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4" role="group" aria-label={lang === 'hi' ? 'श्रेणी फ़िल्टर' : 'Category filter'}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              aria-label={lang === 'hi' ? f.hi : f.en}
              aria-pressed={activeFilter === f.id}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                activeFilter === f.id
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {lang === 'hi' ? f.hi : f.en}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 mb-3">
          {lang === 'hi'
            ? `${filtered.length} सेवाएं मिलीं`
            : `${filtered.length} service${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        <ul className="space-y-3" role="list" aria-label={lang === 'hi' ? 'सेवाओं की सूची' : 'Services list'}>
          {filtered.length === 0 ? (
            <li className="text-center py-12 text-slate-400">
              <div className="text-4xl mb-2">🔍</div>
              <p>{lang === 'hi' ? 'कोई सेवा नहीं मिली' : 'No services found'}</p>
            </li>
          ) : (
            filtered.map(s => (
              <li key={s.id}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3.5 flex items-center gap-4">
                  <span className="text-3xl shrink-0" role="img" aria-label={s.en}>{s.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">
                      {lang === 'hi' ? s.hi : s.en}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === 'hi' ? s.en : s.hi}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs" aria-hidden="true">⏱</span>
                      <span className="text-xs text-slate-500">
                        {lang === 'hi' ? s.timeHi : s.time}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/apply/${s.id}`}
                    aria-label={lang === 'hi' ? `${s.hi} के लिए आवेदन करें` : `Apply for ${s.en}`}
                    className="shrink-0 bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-800 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {lang === 'hi' ? '→ आवेदन' : '→ Apply'}
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]" aria-label="Main navigation">
        <div className="max-w-xl mx-auto flex justify-around py-2 px-2">
          {navItems.map(n => (
            <Link href={n.href} key={n.href} aria-label={lang === 'hi' ? n.labelHi : n.labelEn}>
              <div className={`flex flex-col items-center px-2 py-1 rounded-xl ${n.href === '/services' ? 'text-green-700' : 'text-slate-400'}`}>
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