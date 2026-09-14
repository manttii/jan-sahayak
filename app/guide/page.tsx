'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';

interface GuideItem {
  id: string;
  iconEn: string;
  titleHi: string;
  titleEn: string;
  certs: { hi: string; en: string; applyId: string }[];
  docsHi: string[];
  docsEn: string[];
  timeHi: string;
  timeEn: string;
}

const guideItems: GuideItem[] = [
  {
    id: 'school',
    iconEn: '🎓',
    titleHi: 'स्कूल / कॉलेज प्रवेश',
    titleEn: 'School / College Admission',
    certs: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate', applyId: 'income' },
      { hi: 'जाति प्रमाण पत्र', en: 'Caste Certificate', applyId: 'caste' },
    ],
    docsHi: ['आधार कार्ड', 'पासपोर्ट फोटो', 'पिछली कक्षा की मार्कशीट', 'आय प्रमाण'],
    docsEn: ['Aadhaar Card', 'Passport Photo', 'Previous marksheet', 'Income proof'],
    timeHi: '7-14 दिन',
    timeEn: '7-14 days',
  },
  {
    id: 'job',
    iconEn: '💼',
    titleHi: 'नौकरी आवेदन',
    titleEn: 'Job Application',
    certs: [
      { hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate', applyId: 'character' },
      { hi: 'निवास प्रमाण पत्र', en: 'Domicile Certificate', applyId: 'domicile' },
    ],
    docsHi: ['आधार कार्ड', 'पासपोर्ट फोटो', 'शैक्षिक प्रमाण पत्र', 'निवास प्रमाण'],
    docsEn: ['Aadhaar Card', 'Passport Photo', 'Educational certificates', 'Residence proof'],
    timeHi: '10-15 दिन',
    timeEn: '10-15 days',
  },
  {
    id: 'scheme',
    iconEn: '🏛',
    titleHi: 'सरकारी योजना लाभ',
    titleEn: 'Govt. Scheme Benefit',
    certs: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate', applyId: 'income' },
      { hi: 'जाति प्रमाण पत्र', en: 'Caste Certificate', applyId: 'caste' },
    ],
    docsHi: ['आधार कार्ड', 'राशन कार्ड', 'बैंक पासबुक', 'आय प्रमाण'],
    docsEn: ['Aadhaar Card', 'Ration Card', 'Bank passbook', 'Income proof'],
    timeHi: '7-14 दिन',
    timeEn: '7-14 days',
  },
  {
    id: 'marriage',
    iconEn: '💍',
    titleHi: 'विवाह पंजीकरण',
    titleEn: 'Marriage Registration',
    certs: [
      { hi: 'आयु प्रमाण (जन्म प्रमाण पत्र)', en: 'Age Proof (Birth Certificate)', applyId: 'birth' },
      { hi: 'निवास प्रमाण पत्र', en: 'Residence Proof (Domicile)', applyId: 'domicile' },
    ],
    docsHi: ['वर-वधू का आधार कार्ड', 'पासपोर्ट फोटो (युगल)', 'विवाह का फोटो', 'गवाहों का आधार'],
    docsEn: ['Aadhaar of both spouses', 'Couple passport photo', 'Wedding photo', 'Witness Aadhaar'],
    timeHi: '15-21 दिन',
    timeEn: '15-21 days',
  },
  {
    id: 'loan',
    iconEn: '🏦',
    titleHi: 'बैंक लोन',
    titleEn: 'Bank Loan',
    certs: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate', applyId: 'income' },
    ],
    docsHi: ['आधार कार्ड', 'पैन कार्ड', 'बैंक स्टेटमेंट (6 माह)', 'संपत्ति दस्तावेज़'],
    docsEn: ['Aadhaar Card', 'PAN Card', 'Bank statement (6 months)', 'Property documents'],
    timeHi: '7-10 दिन',
    timeEn: '7-10 days',
  },
];

const navItems = [
  { icon: '🏠', labelHi: 'होम',    labelEn: 'Home',      href: '/' },
  { icon: '📋', labelHi: 'सेवाएं', labelEn: 'Services',  href: '/services' },
  { icon: '🔍', labelHi: 'स्थिति', labelEn: 'Track',     href: '/track' },
  { icon: '📢', labelHi: 'शिकायत', labelEn: 'Grievance', href: '/grievance' },
  { icon: '👤', labelHi: 'खाता',   labelEn: 'Account',   href: '/account' },
];

export default function GuidePage() {
  const { lang, toggle } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle2 = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label={lang === 'hi' ? 'होम पर जाएं' : 'Go back home'}>
              <span className="text-slate-500 text-xl leading-none">←</span>
            </Link>
            <h1 className="font-bold text-slate-900 text-base">
              {lang === 'hi' ? 'कौन सा प्रमाण पत्र चाहिए?' : 'Which Certificate Do I Need?'}
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

      <main className="max-w-xl mx-auto px-4 pb-24 pt-4">
        <p className="text-slate-500 text-sm mb-5">
          {lang === 'hi'
            ? 'अपनी ज़रूरत के अनुसार श्रेणी चुनें और जानें कि कौन से दस्तावेज़ चाहिए।'
            : 'Tap a category to find out which certificates and documents you need.'}
        </p>

        <div className="space-y-3" role="list">
          {guideItems.map(item => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" role="listitem">
                <button
                  onClick={() => toggle2(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`guide-panel-${item.id}`}
                  aria-label={lang === 'hi' ? item.titleHi : item.titleEn}
                  className="w-full flex items-center justify-between px-4 py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">{item.iconEn}</span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {lang === 'hi' ? item.titleHi : item.titleEn}
                    </span>
                  </div>
                  <span className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div id={`guide-panel-${item.id}`} className="border-t border-slate-100 px-4 pb-4 pt-3">
                    {/* Certificates needed */}
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      {lang === 'hi' ? 'आवश्यक प्रमाण पत्र' : 'Certificates Needed'}
                    </p>
                    <div className="space-y-2 mb-4">
                      {item.certs.map(cert => (
                        <div key={cert.applyId} className="flex items-center justify-between bg-green-50 rounded-xl px-3 py-2.5">
                          <span className="text-sm font-medium text-green-800">
                            {lang === 'hi' ? cert.hi : cert.en}
                          </span>
                          <Link
                            href={`/apply/${cert.applyId}`}
                            aria-label={lang === 'hi' ? `${cert.hi} के लिए आवेदन करें` : `Apply for ${cert.en}`}
                            className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            {lang === 'hi' ? '→ आवेदन' : '→ Apply Now'}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Documents */}
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      {lang === 'hi' ? 'साथ लाएं' : 'Bring These Documents'}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {(lang === 'hi' ? item.docsHi : item.docsEn).map((doc, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="text-green-600" aria-hidden="true">•</span>
                          {doc}
                        </li>
                      ))}
                    </ul>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <span aria-hidden="true">⏱</span>
                      <span>
                        {lang === 'hi' ? 'अनुमानित समय: ' : 'Est. time: '}
                        <span className="font-semibold text-slate-700">
                          {lang === 'hi' ? item.timeHi : item.timeEn}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]" aria-label="Main navigation">
        <div className="max-w-xl mx-auto flex justify-around py-2 px-2">
          {navItems.map(n => (
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