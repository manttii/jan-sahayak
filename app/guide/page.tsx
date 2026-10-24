'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';

interface GuideItem {
  id: string;
  iconEn: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
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
    titleHi: 'स्कूल / कॉलेज प्रवेश एवं छात्रवृत्ति',
    titleEn: 'School / College Admission & Scholarships',
    descHi: 'उत्तराखण्ड के किसी भी सरकारी या निजी कॉलेज, पॉलिटेक्निक या छात्रवृत्ति योजना हेतु',
    descEn: 'For admissions to universities, colleges, polytechnics, and state scholarship schemes',
    certs: [
      { hi: 'आय प्रमाण पत्र (Income)', en: 'Income Certificate', applyId: 'income' },
      { hi: 'स्थायी निवास प्रमाण पत्र (Domicile)', en: 'Domicile Certificate', applyId: 'domicile' },
      { hi: 'जाति प्रमाण पत्र (Caste)', en: 'Caste Certificate', applyId: 'caste' },
    ],
    docsHi: ['आधार कार्ड', 'राशन कार्ड / परिवार रजिस्टर', 'पिछली कक्षा की मार्कशीट', 'पासपोर्ट फोटो'],
    docsEn: ['Aadhaar Card', 'Ration Card / Pariwar Register', 'Previous marksheet', 'Passport photo'],
    timeHi: '7-14 कार्य दिवस',
    timeEn: '7-14 working days',
  },
  {
    id: 'job',
    iconEn: '💼',
    titleHi: 'सरकारी नौकरी एवं भर्ती (UKSSSC / UKPSC)',
    titleEn: 'Government Recruitment & Jobs (UKSSSC / UKPSC)',
    descHi: 'राज्य सरकार की नौकरियों में स्थानीय आरक्षण, शारीरिक छूट एवं सत्यापन हेतु',
    descEn: 'For state employment, reservation benefits, and physical standard concessions',
    certs: [
      { hi: 'स्थायी / मूल निवास प्रमाण पत्र', en: 'Domicile Certificate', applyId: 'domicile' },
      { hi: 'चरित्र प्रमाण पत्र (Police)', en: 'Character Certificate', applyId: 'character' },
      { hi: 'पर्वतीय क्षेत्र प्रमाण पत्र (Hill Concession)', en: 'Hilly Area Certificate', applyId: 'hilly' },
      { hi: 'जाति / ईडब्ल्यूएस प्रमाण पत्र', en: 'Caste / EWS Certificate', applyId: 'caste' },
    ],
    docsHi: ['आधार कार्ड', 'हाईस्कूल मार्कशीट (UK बोर्ड)', 'पटवारी आख्या / खतौनी', 'शपथ पत्र'],
    docsEn: ['Aadhaar Card', 'High School Marksheet (UK Board)', 'Patwari report / Land records', 'Affidavit'],
    timeHi: '7-15 कार्य दिवस',
    timeEn: '7-15 working days',
  },
  {
    id: 'army',
    iconEn: '⛰️',
    titleHi: 'सेना एवं पुलिस भर्ती (Hill Concession)',
    titleEn: 'Army, Police & Paramilitary Recruitment',
    descHi: 'पर्वतीय नागरिकों के लिए शारीरिक ऊंचाई एवं छाती के माप में छूट के लिए',
    descEn: 'For height and chest physical standard relaxations for hill residents',
    certs: [
      { hi: 'पर्वतीय क्षेत्र प्रमाण पत्र (Hill Certificate)', en: 'Hilly Area Certificate', applyId: 'hilly' },
      { hi: 'स्थायी निवास प्रमाण पत्र', en: 'Domicile Certificate', applyId: 'domicile' },
      { hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate', applyId: 'character' },
    ],
    docsHi: ['आधार कार्ड', 'स्थायी निवास प्रमाण पत्र', 'पटवारी पर्वतीय सत्यापन आख्या', 'पासपोर्ट फोटो'],
    docsEn: ['Aadhaar Card', 'Domicile Certificate', 'Patwari Hilly Verification Report', 'Passport photo'],
    timeHi: '7 कार्य दिवस',
    timeEn: '7 working days',
  },
  {
    id: 'scheme',
    iconEn: '🏛️',
    titleHi: 'सरकारी कल्याणकारी योजनाएं एवं पेंशन',
    titleEn: 'Govt Social Welfare Schemes & Pensions',
    descHi: 'वृद्धावस्था, दिव्यांग, विधवा पेंशन, किसान सम्मान निधि एवं उज्ज्वला योजना',
    descEn: 'For old age pension, disability benefits, widow assistance, and subsidised schemes',
    certs: [
      { hi: 'आय प्रमाण पत्र (Income)', en: 'Income Certificate', applyId: 'income' },
      { hi: 'परिवार रजिस्टर की नकल', en: 'Pariwar Register Copy', applyId: 'pariwar' },
      { hi: 'दिव्यांगता प्रमाण पत्र (यदि लागू)', en: 'Disability Certificate (if applicable)', applyId: 'disability' },
      { hi: 'राशन कार्ड (Ration)', en: 'Ration Card', applyId: 'ration' },
    ],
    docsHi: ['आधार कार्ड', 'बैंक पासबुक (खाता संख्या व IFSC)', 'परिवार रजिस्टर नकल', 'पासपोर्ट फोटो'],
    docsEn: ['Aadhaar Card', 'Bank passbook copy', 'Pariwar register copy', 'Passport photo'],
    timeHi: '3-14 कार्य दिवस',
    timeEn: '3-14 working days',
  },
  {
    id: 'marriage',
    iconEn: '💍',
    titleHi: 'विवाह पंजीकरण एवं कानूनी अभिलेख',
    titleEn: 'Marriage Registration & Legal Proof',
    descHi: 'पासपोर्ट, संयुक्त बैंक खाता, वीजा एवं महिला अधिकारों के विधिक संरक्षण हेतु',
    descEn: 'For passport, joint bank accounts, visa sponsorship, and statutory spousal rights',
    certs: [
      { hi: 'विवाह पंजीकरण प्रमाण पत्र', en: 'Marriage Certificate', applyId: 'marriage' },
      { hi: 'दोनों पक्षों का मूल निवास', en: 'Domicile of Spouses', applyId: 'domicile' },
    ],
    docsHi: ['वर एवं वधू का आधार कार्ड', 'संयुक्त विवाह फोटो', 'विवाह निमंत्रण कार्ड / निकाहनामा', 'दो गवाहों के पहचान पत्र'],
    docsEn: ['Aadhaar of Bride & Groom', 'Joint couple photo', 'Wedding invitation card', 'ID proofs of 2 witnesses'],
    timeHi: '15 कार्य दिवस',
    timeEn: '15 working days',
  },
];

export default function GuidePage() {
  const { lang, t, speak } = useLang();
  const [openId, setOpenId] = useState<string | null>('school');

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
            {t('नागरिक निर्णय सहायक', 'Citizen Decision Assistant')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            {t('मुझे कौन सा प्रमाण पत्र चाहिए?', 'Which Certificate Do I Need?')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t(
              'अपनी वास्तविक आवश्यकता (कॉलेज, नौकरी, सेना, पेंशन) के अनुसार आवश्यक प्रमाण पत्रों की सही सूची जानें।',
              'Select your actual goal to find the exact set of certificates and documents required.'
            )}
          </p>
        </div>

        <Link
          href="/documents"
          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs py-2.5 px-4 rounded-xl border border-emerald-200 transition-colors shrink-0"
        >
          {t('दस्तावेज़ पूर्व-जांच सूची →', 'Document Checklist →')}
        </Link>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {guideItems.map(item => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                isOpen ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10' : 'border-slate-200 shadow-xs'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl p-2.5 bg-slate-50 rounded-2xl">{item.iconEn}</span>
                  <div>
                    <h2 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                      {lang === 'hi' ? item.titleHi : item.titleEn}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === 'hi' ? item.descHi : item.descEn}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg hidden sm:inline">
                    ⏱ {lang === 'hi' ? item.timeHi : item.timeEn}
                  </span>
                  <span className={`text-slate-400 font-bold transition-transform text-lg ${isOpen ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-5 animate-in fade-in">
                  {/* Required Certificates */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-black uppercase tracking-wider text-slate-600">
                        {t('आवश्यक प्रमाण पत्र (ऑनलाइन आवेदन करें):', 'Certificates Needed (Apply Online):')}
                      </p>
                      <button
                        onClick={() => speak(`${lang === 'hi' ? item.titleHi : item.titleEn}. ${lang === 'hi' ? item.descHi : item.descEn}`)}
                        className="text-emerald-700 text-xs font-bold flex items-center gap-1"
                      >
                        <span>🔊</span>
                        <span>{t('विवरण सुनें', 'Listen')}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {item.certs.map(cert => (
                        <div
                          key={cert.applyId}
                          className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs"
                        >
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {lang === 'hi' ? cert.hi : cert.en}
                          </span>
                          <Link
                            href={`/apply/${cert.applyId}`}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-all shrink-0"
                          >
                            {t('आवेदन करें →', 'Apply →')}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Supporting Documents */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                      {t('आवेदन हेतु साथ रखने वाले दस्तावेज़:', 'Documents to Keep Ready (DigiLocker supported):')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(lang === 'hi' ? item.docsHi : item.docsEn).map((doc, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-slate-800 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                        >
                          <span className="text-emerald-600">✓</span>
                          <span>{doc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
