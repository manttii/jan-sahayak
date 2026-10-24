'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from './lang-context';
import { ALL_SERVICES } from './data/services';

export default function Home() {
  const { lang, t, speak } = useLang();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'certificate' | 'revenue' | 'welfare'>('all');
  const [quickTrackId, setQuickTrackId] = useState('');

  const filteredServices = ALL_SERVICES.filter(s => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      s.hi.toLowerCase().includes(q) ||
      s.en.toLowerCase().includes(q) ||
      s.descHi.toLowerCase().includes(q) ||
      s.descEn.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const categories = [
    { id: 'all', labelHi: 'सभी सेवाएं', labelEn: 'All Services', icon: '🏛' },
    { id: 'certificate', labelHi: 'प्रमाण पत्र', labelEn: 'Certificates', icon: '📄' },
    { id: 'revenue', labelHi: 'राजस्व एवं अभिलेख', labelEn: 'Revenue & Land', icon: '🗺' },
    { id: 'welfare', labelHi: 'कल्याण एवं राशन', labelEn: 'Welfare & Ration', icon: '🌾' },
  ];

  return (
    <main className="w-full pb-20 md:pb-12">
      {/* Hero Banner Section */}
      <section className="bg-linear-to-b from-emerald-800 via-emerald-900 to-slate-950 text-white pt-8 pb-14 px-4 sm:px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Ticker / Announcement */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 text-xs text-emerald-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">
              {t('सूचना:', 'Notice:')}
            </span>
            <span>
              {t(
                'उत्तराखण्ड सेवा का अधिकार (RTS) के तहत सभी प्रमाण पत्र 3 से 15 दिनों में डिजिटल प्राप्त करें।',
                'Guaranteed e-delivery within 3 to 15 working days under Uttarakhand RTS Act.'
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Greeting & Fast Action */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {t('नमस्ते उत्तराखण्ड 🙏', 'Welcome to Jan Sahayak 🙏')}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                {t(
                  'सरकारी दफ्तरों के चक्कर काटने से मुक्ति। अब आय, निवास, जाति एवं अन्य प्रमाण पत्र सीधे अपने फोन या कंप्यूटर से बनवाएं और ट्रैक करें।',
                  'Skip the government office queues. Apply, track, and download Uttarakhand state certificates and records directly from your phone or PC.'
                )}
              </p>

              {/* Fast Track Input on Hero */}
              <div className="pt-2">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (quickTrackId.trim()) {
                      window.location.href = `/track?id=${encodeURIComponent(quickTrackId.trim())}`;
                    }
                  }}
                  className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2 max-w-xl shadow-lg"
                >
                  <div className="flex-1 flex items-center px-3 gap-2 bg-white rounded-xl">
                    <span className="text-slate-400">🔍</span>
                    <input
                      type="text"
                      value={quickTrackId}
                      onChange={e => setQuickTrackId(e.target.value)}
                      placeholder={t('आवेदन संख्या (उदा: UK-INC-2026-48291)', 'Enter Application ID (e.g. UK-INC-2026-48291)')}
                      className="w-full py-2.5 text-xs sm:text-sm text-slate-900 bg-transparent outline-none placeholder:text-slate-400 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <span>{t('स्थिति खोजें', 'Track Now')}</span>
                    <span>→</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: RTS Guarantees Stats */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">52.8 L+</p>
                <p className="text-xs text-slate-300 mt-1 font-medium">{t('जारी डिजिटल प्रमाण पत्र', 'Certificates Issued')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-black text-amber-300">99.4%</p>
                <p className="text-xs text-slate-300 mt-1 font-medium">{t('समयसीमा अनुपालन (RTS)', 'RTS SLA Compliance')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-black text-teal-300">6.4 {t('दिन', 'Days')}</p>
                <p className="text-xs text-slate-300 mt-1 font-medium">{t('औसत निपटान समय', 'Average Turnaround')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <p className="text-2xl sm:text-3xl font-black text-emerald-300">100%</p>
                <p className="text-xs text-slate-300 mt-1 font-medium">{t('कागजरहित व पारदर्शी', 'Faceless & Paperless')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6">
        {/* Quick Service Categories Bar */}
        <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-200 flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Interactive In-Page Search */}
          <div className="w-full sm:w-72 relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('सेवा का नाम लिखें...', 'Search by service name...')}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Services Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t('नागरिक सेवाएं चुनें', 'Select a Citizen Service')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t(
                `${filteredServices.length} सेवाएं उपलब्ध — ऑनलाइन आवेदन, दस्तावेज पूर्व-जांच व त्वरित प्रमाण पत्र`,
                `${filteredServices.length} services ready for immediate application`
              )}
            </p>
          </div>

          <Link
            href="/guide"
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
          >
            <span>{t('कौन सा प्रमाण पत्र चाहिए? गाइड', 'Certificate Selection Guide')}</span>
            <span>→</span>
          </Link>
        </div>

        {/* Responsive Services Grid (2 cols mobile, 3 cols tablet, 4 cols PC desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: Emoji + Audio listen button */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl p-2 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform inline-block">
                    {service.emoji}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speak(`${lang === 'hi' ? service.hi : service.en}. ${lang === 'hi' ? service.descHi : service.descEn}`)}
                      title={t('सुनें (Audio)', 'Listen to service details')}
                      aria-label={t('विवरण सुनें', 'Listen to details')}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 flex items-center justify-center text-xs transition-colors"
                    >
                      🔊
                    </button>
                    <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
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

                {/* Prerequisites snippet */}
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    {t('आवश्यक दस्तावेज:', 'Required Docs:')}
                  </p>
                  <p className="text-xs text-slate-600 truncate">
                    {service.requiredDocs.map(d => (lang === 'hi' ? d.hi : d.en)).slice(0, 2).join(', ')}
                    {service.requiredDocs.length > 2 && ` +${service.requiredDocs.length - 2} ${t('अन्य', 'more')}`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <Link
                  href={`/apply/${service.id}`}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>{t('आवेदन करें', 'Apply Online')}</span>
                  <span>→</span>
                </Link>
                <span className="text-[11px] text-slate-500 font-medium px-2 py-1 bg-slate-100 rounded-lg">
                  {lang === 'hi' ? service.feeHi : service.fee}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards Grid: Fast Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {/* Card 1: Track Status */}
          <Link href="/track" className="group">
            <div className="bg-linear-to-br from-emerald-700 to-green-900 text-white rounded-3xl p-6 shadow-md group-hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-4">
                📍
              </div>
              <h3 className="font-extrabold text-lg leading-snug">
                {t('आवेदन स्थिति ट्रैक करें', 'Track Application Status')}
              </h3>
              <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                {t(
                  'SMS में मिली आवेदन संख्या या मोबाइल नंबर से पटवारी, तहसीलदार एवं एसडीएम स्तर की वास्तविक स्थिति देखें।',
                  'Track Patwari, Tehsildar, and SDM verification stages with live dates and SMS updates.'
                )}
              </p>
              <div className="mt-4 font-bold text-xs text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t('ट्रैकिंग शुरू करें', 'Start Tracking')}</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* Card 2: RTS Timelines */}
          <Link href="/timeline" className="group">
            <div className="bg-linear-to-br from-blue-700 to-indigo-900 text-white rounded-3xl p-6 shadow-md group-hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-4">
                ⏱️
              </div>
              <h3 className="font-extrabold text-lg leading-snug">
                {t('सेवा का अधिकार (RTS) समयसीमा', 'RTS Delivery Charters')}
              </h3>
              <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                {t(
                  'उत्तराखण्ड RTS एक्ट 2011 के तहत कानूनी गारंटीकृत दिन, अपीलीय अधिकारी एवं देरी पर क्षतिपूर्ति नियम।',
                  'Statutory time limits, designated officers, and delay penalty provisions under Uttarakhand RTS Act.'
                )}
              </p>
              <div className="mt-4 font-bold text-xs text-blue-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t('समयसीमा चार्ट देखें', 'View SLA Charter')}</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* Card 3: Grievance Redressal */}
          <Link href="/grievance" className="group">
            <div className="bg-linear-to-br from-amber-700 to-orange-900 text-white rounded-3xl p-6 shadow-md group-hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-4">
                📢
              </div>
              <h3 className="font-extrabold text-lg leading-snug">
                {t('1905 सीएम हेल्पलाइन शिकायत', 'File Citizen Grievance')}
              </h3>
              <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                {t(
                  'प्रमाण पत्र में देरी, रिश्वतखोरी या दुर्व्यवहार की शिकायत 7 दिन के भीतर निवारण गारंटी के साथ दर्ज करें।',
                  'Register complaints for delayed certificates or officer misconduct with guaranteed 7-day resolution.'
                )}
              </p>
              <div className="mt-4 font-bold text-xs text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>{t('शिकायत दर्ज करें', 'Register Grievance')}</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Assistance Accordion */}
        <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {t('❓ अक्सर पूछे जाने वाले प्रश्न व मदद', 'Need Guidance to Get Started?')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('बिना किसी संशय के सही प्रमाण पत्र और कागजात चुनें', 'Know exactly what you need before applying')}
              </p>
            </div>
            <Link
              href="/guide"
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              {t('पूरी गाइड देखें →', 'Full Certificate Guide →')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                qHi: 'मुझे कौन सा प्रमाण पत्र चाहिए?',
                qEn: 'Which certificate do I need?',
                descHi: 'कॉलेज, नौकरी, लोन या योजना हेतु सही चयन करें',
                descEn: 'Match your intent to the correct document',
                link: '/guide',
                icon: '🎓',
              },
              {
                qHi: 'दस्तावेज़ों की पूरी सूची क्या है?',
                qEn: 'Complete list of required documents?',
                descHi: 'आधार, खतौनी, राशन कार्ड एवं फोटो के नियम',
                descEn: 'Aadhaar, Land records, Ration card prerequisites',
                link: '/documents',
                icon: '📎',
              },
              {
                qHi: 'डिजिटल प्रमाण पत्र असली है या नहीं?',
                qEn: 'How to verify digital authenticity?',
                descHi: 'क्यूआर कोड एवं आवेदन संख्या से ऑनलाइन सत्यापन',
                descEn: 'Instant QR code and certificate number verification',
                link: '/verify',
                icon: '🛡️',
              },
            ].map((item, i) => (
              <Link href={item.link} key={i}>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all flex items-start gap-3">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-slate-900">
                      {lang === 'hi' ? item.qHi : item.qEn}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {lang === 'hi' ? item.descHi : item.descEn}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
