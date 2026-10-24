'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';
import { ALL_SERVICES } from '../data/services';

export default function ServicesPage() {
  const { lang, t, speak } = useLang();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelHi: 'सभी सेवाएं', labelEn: 'All Services', icon: '🏛' },
    { id: 'certificate', labelHi: 'प्रमाण पत्र', labelEn: 'Certificates', icon: '📄' },
    { id: 'revenue', labelHi: 'राजस्व एवं अभिलेख', labelEn: 'Revenue & Land', icon: '🗺' },
    { id: 'welfare', labelHi: 'कल्याण एवं पेंशन', labelEn: 'Welfare & Pension', icon: '🌾' },
  ];

  const filtered = ALL_SERVICES.filter(s => {
    const matchCat = activeCategory === 'all' || s.category === activeCategory;
    const q = query.toLowerCase().trim();
    const matchQ =
      !q ||
      s.hi.toLowerCase().includes(q) ||
      s.en.toLowerCase().includes(q) ||
      s.descHi.toLowerCase().includes(q) ||
      s.descEn.toLowerCase().includes(q) ||
      s.departmentHi.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-32">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
            {t('नागरिक ई-सेवाएं निर्देशिका', 'Citizen e-Services Directory')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            {t('उत्तराखण्ड अपणी सरकार सेवाएं', 'Uttarakhand Apuni Sarkar e-Services')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t(
              'सेवा का अधिकार अधिनियम (RTS Act) के तहत कानूनी गारंटीकृत समयसीमा, पूर्व-शर्तें एवं ऑनलाइन आवेदन',
              'Guaranteed statutory delivery times, required documents, and instant online submission'
            )}
          </p>
        </div>

        <Link
          href="/timeline"
          className="bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs py-2.5 px-4 rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>⏱️</span>
          <span>{t('RTS समयसीमा चार्ट (SLA)', 'RTS Delivery Charters')}</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-80 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('सेवा, विभाग या उद्देश्य खोजें...', 'Search service or department...')}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold text-slate-500">
          {t(`${filtered.length} सेवाएं उपलब्ध`, `${filtered.length} services matching query`)}
        </p>
      </div>

      {/* Services Grid (Responsive 1/2/3/4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl p-2 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform inline-block">
                  {service.emoji}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => speak(`${lang === 'hi' ? service.hi : service.en}. ${lang === 'hi' ? service.descHi : service.descEn}`)}
                    title={t('सुनें (Audio)', 'Listen')}
                    aria-label={t('विवरण सुनें', 'Listen to details')}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 flex items-center justify-center text-xs transition-colors"
                  >
                    🔊
                  </button>
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    ⏱ {service.days} {t('दिन', 'Days')}
                  </span>
                </div>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-emerald-800 transition-colors">
                {lang === 'hi' ? service.hi : service.en}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                {lang === 'hi' ? service.en : service.hi}
              </p>

              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                {lang === 'hi' ? service.descHi : service.descEn}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] space-y-1">
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-700">{t('विभाग: ', 'Dept: ')}</span>
                  {lang === 'hi' ? service.departmentHi : service.departmentEn}
                </p>
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-700">{t('सरकारी शुल्क: ', 'Fee: ')}</span>
                  <span className="font-bold text-emerald-800">{lang === 'hi' ? service.feeHi : service.fee}</span>
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <Link
                href={`/apply/${service.id}`}
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all text-center block shadow-xs"
              >
                {t('ऑनलाइन आवेदन करें →', 'Apply Online →')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
