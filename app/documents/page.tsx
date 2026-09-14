'use client';
import Link from 'next/link';
import { useLang } from '../lang-context';

interface DocItem {
  emoji: string;
  hi: string;
  en: string;
  usedForHi: string;
  usedForEn: string;
  requiredFor: { hi: string; en: string }[];
}

const docs: DocItem[] = [
  {
    emoji: '🪪',
    hi: 'आधार कार्ड',
    en: 'Aadhaar Card',
    usedForHi: 'पहचान और पते का प्रमाण',
    usedForEn: 'Identity and address proof',
    requiredFor: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate' },
      { hi: 'निवास प्रमाण पत्र', en: 'Domicile Certificate' },
      { hi: 'जाति प्रमाण पत्र', en: 'Caste Certificate' },
      { hi: 'विवाह प्रमाण पत्र', en: 'Marriage Certificate' },
    ],
  },
  {
    emoji: '🌾',
    hi: 'राशन कार्ड',
    en: 'Ration Card',
    usedForHi: 'परिवार की आर्थिक स्थिति का प्रमाण',
    usedForEn: 'Proof of family economic status',
    requiredFor: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate' },
      { hi: 'जाति प्रमाण पत्र', en: 'Caste Certificate' },
    ],
  },
  {
    emoji: '📸',
    hi: 'पासपोर्ट फोटो',
    en: 'Passport Photo',
    usedForHi: 'सभी सरकारी आवेदनों के लिए',
    usedForEn: 'Required for all government applications',
    requiredFor: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate' },
      { hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate' },
      { hi: 'निवास प्रमाण पत्र', en: 'Domicile Certificate' },
    ],
  },
  {
    emoji: '💰',
    hi: 'आय प्रमाण',
    en: 'Income Proof',
    usedForHi: 'आय का स्तर दर्शाता है',
    usedForEn: 'Shows level of household income',
    requiredFor: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate' },
      { hi: 'विकलांगता प्रमाण पत्र', en: 'Disability Certificate' },
    ],
  },
  {
    emoji: '🏠',
    hi: 'निवास प्रमाण',
    en: 'Residence Proof',
    usedForHi: 'स्थाई पते का सत्यापन',
    usedForEn: 'Verification of permanent address',
    requiredFor: [
      { hi: 'निवास प्रमाण पत्र', en: 'Domicile Certificate' },
      { hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate' },
    ],
  },
  {
    emoji: '👶',
    hi: 'जन्म प्रमाण पत्र',
    en: 'Birth Certificate',
    usedForHi: 'आयु का आधिकारिक प्रमाण',
    usedForEn: 'Official proof of age and date of birth',
    requiredFor: [
      { hi: 'विवाह प्रमाण पत्र', en: 'Marriage Certificate' },
      { hi: 'पासपोर्ट', en: 'Passport' },
    ],
  },
  {
    emoji: '📋',
    hi: 'जाति प्रमाण पत्र',
    en: 'Caste Certificate',
    usedForHi: 'SC/ST/OBC आरक्षण के लिए',
    usedForEn: 'For SC/ST/OBC reservation benefits',
    requiredFor: [
      { hi: 'सरकारी योजनाएं', en: 'Govt. Schemes' },
      { hi: 'प्रवेश आरक्षण', en: 'Admission reservation' },
    ],
  },
];

const navItems = [
  { icon: '🏠', labelHi: 'होम',    labelEn: 'Home',      href: '/' },
  { icon: '📋', labelHi: 'सेवाएं', labelEn: 'Services',  href: '/services' },
  { icon: '🔍', labelHi: 'स्थिति', labelEn: 'Track',     href: '/track' },
  { icon: '📢', labelHi: 'शिकायत', labelEn: 'Grievance', href: '/grievance' },
  { icon: '👤', labelHi: 'खाता',   labelEn: 'Account',   href: '/account' },
];

export default function DocumentsPage() {
  const { lang, toggle } = useLang();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label={lang === 'hi' ? 'होम पर जाएं' : 'Go back home'}>
              <span className="text-slate-500 text-xl leading-none">←</span>
            </Link>
            <h1 className="font-bold text-slate-900 text-base">
              {lang === 'hi' ? 'कौन से दस्तावेज़ चाहिए?' : 'What Documents Do I Need?'}
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
        {/* Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-5 flex gap-3 items-start">
          <span className="text-xl mt-0.5" aria-hidden="true">📎</span>
          <p className="text-sm text-amber-800">
            <span className="font-semibold">
              {lang === 'hi' ? 'ध्यान दें: ' : 'Note: '}
            </span>
            {lang === 'hi'
              ? 'सभी दस्तावेज़ स्वयं-प्रमाणित होने चाहिए। फ़ाइल का आकार 2MB से कम होना चाहिए।'
              : 'All documents must be self-attested. File size must be under 2MB.'}
          </p>
        </div>

        <ul className="space-y-3" role="list" aria-label={lang === 'hi' ? 'दस्तावेज़ सूची' : 'Documents list'}>
          {docs.map(doc => (
            <li key={doc.en}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl shrink-0 mt-0.5" role="img" aria-label={doc.en}>{doc.emoji}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {lang === 'hi' ? doc.hi : doc.en}
                    </p>
                    <p className="text-xs text-slate-400">
                      {lang === 'hi' ? doc.en : doc.hi}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'hi' ? doc.usedForHi : doc.usedForEn}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1.5">
                    {lang === 'hi' ? 'इनके लिए जरूरी:' : 'Required for:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.requiredFor.map(r => (
                      <span
                        key={r.en}
                        className="text-xs bg-green-100 text-green-800 font-medium px-2.5 py-1 rounded-full"
                      >
                        {lang === 'hi' ? r.hi : r.en}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center">
          <Link
            href="/guide"
            aria-label={lang === 'hi' ? 'गाइड देखें' : 'View certificate guide'}
            className="inline-block text-sm text-green-700 font-semibold underline underline-offset-2 focus:outline-none"
          >
            {lang === 'hi' ? 'कौन सा प्रमाण पत्र चाहिए? →' : 'Which certificate do I need? →'}
          </Link>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]" aria-label="Main navigation">
        <div className="max-w-xl mx-auto flex justify-around py-2 px-2">
          {navItems.map(n => (
            <Link href={n.href} key={n.href} aria-label={lang === 'hi' ? n.labelHi : n.labelEn}>
              <div className={`flex flex-col items-center px-2 py-1 rounded-xl text-slate-400`}>
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