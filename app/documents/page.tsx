'use client';
import Link from 'next/link';
import { useLang } from '../lang-context';

interface DocItem {
  emoji: string;
  hi: string;
  en: string;
  usedForHi: string;
  usedForEn: string;
  digilocker: boolean;
  requiredFor: { hi: string; en: string; id: string }[];
  fileFormatHi: string;
  fileFormatEn: string;
}

const docsList: DocItem[] = [
  {
    emoji: '🪪',
    hi: 'आधार कार्ड (Aadhaar Card)',
    en: 'Aadhaar Card (UIDAI)',
    usedForHi: 'नागरिक की पहचान, बायोमेट्रिक eKYC एवं स्थायी पते का प्राथमिक प्रमाण',
    usedForEn: 'Primary proof of identity, biometric eKYC, and residence address',
    digilocker: true,
    fileFormatHi: 'PDF / XML (DigiLocker से 1-क्लिक)',
    fileFormatEn: 'PDF / XML (1-Click via DigiLocker)',
    requiredFor: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate', id: 'income' },
      { hi: 'स्थायी निवास प्रमाण पत्र', en: 'Domicile Certificate', id: 'domicile' },
      { hi: 'जाति प्रमाण पत्र', en: 'Caste Certificate', id: 'caste' },
      { hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate', id: 'character' },
      { hi: 'पर्वतीय क्षेत्र प्रमाण पत्र', en: 'Hilly Area Certificate', id: 'hilly' },
    ],
  },
  {
    emoji: '🌾',
    hi: 'राशन कार्ड / परिवार रजिस्टर नकल',
    en: 'Ration Card / Pariwar Register',
    usedForHi: 'पारिवारिक सदस्यों की संख्या, आर्थिक स्थिति एवं सामाजिक श्रेणी का प्रमाण',
    usedForEn: 'Proof of family composition, economic status, and household categorization',
    digilocker: true,
    fileFormatHi: 'PDF / JPG (2MB से कम)',
    fileFormatEn: 'PDF / JPG (under 2MB)',
    requiredFor: [
      { hi: 'आय प्रमाण पत्र', en: 'Income Certificate', id: 'income' },
      { hi: 'जाति प्रमाण पत्र', en: 'Caste Certificate', id: 'caste' },
      { hi: 'नया राशन कार्ड', en: 'Ration Card Services', id: 'ration' },
    ],
  },
  {
    emoji: '🗺️',
    hi: 'खतौनी / बिजली बिल / पैतृक निवास अभिलेख',
    en: 'Land Record (Khatauni) / Utility Bill',
    usedForHi: 'उत्तराखण्ड राज्य में 15 वर्ष या पैतृक भूमि/निवास का विधिक साक्ष्य',
    usedForEn: 'Legal proof of ancestral land or 15+ years residency in Uttarakhand',
    digilocker: true,
    fileFormatHi: 'भूलेख PDF / स्कैन प्रति',
    fileFormatEn: 'Bhulekh PDF / Scanned copy',
    requiredFor: [
      { hi: 'स्थायी / मूल निवास प्रमाण पत्र', en: 'Domicile Certificate', id: 'domicile' },
      { hi: 'पर्वतीय क्षेत्र प्रमाण पत्र', en: 'Hilly Area Certificate', id: 'hilly' },
    ],
  },
  {
    emoji: '🎓',
    hi: 'हाईस्कूल मार्कशीट (UK बोर्ड / समकक्ष)',
    en: 'Class 10th Marksheet (UK Board / Recognized)',
    usedForHi: 'जन्म तिथि एवं उत्तराखण्ड राज्य में न्यूनतम शैक्षणिक अध्ययन का प्रमाण',
    usedForEn: 'Official age verification and schooling within the state of Uttarakhand',
    digilocker: true,
    fileFormatHi: 'डिजीलॉकर प्रमाणित PDF',
    fileFormatEn: 'DigiLocker Verified PDF',
    requiredFor: [
      { hi: 'स्थायी निवास प्रमाण पत्र', en: 'Domicile Certificate', id: 'domicile' },
      { hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate', id: 'character' },
    ],
  },
  {
    emoji: '📸',
    hi: 'पासपोर्ट साइज रंगीन फोटो',
    en: 'Recent Passport Size Color Photo',
    usedForHi: 'डिजिटल प्रमाण पत्र पर मुद्रण एवं चेहरे के सत्यापन हेतु',
    usedForEn: 'Printing on the digital certificate and biographic verification',
    digilocker: false,
    fileFormatHi: 'JPG / PNG (साफ सफेद पृष्ठभूमि, 50KB-500KB)',
    fileFormatEn: 'JPG / PNG (plain white background, 50KB-500KB)',
    requiredFor: [
      { hi: 'सभी प्रमाण पत्र सेवाएं', en: 'All Certificate Services', id: 'services' },
    ],
  },
  {
    emoji: '⚖️',
    hi: 'स्व-घोषणा पत्र / शपथ पत्र (Affidavit)',
    en: 'Self-Declaration / Notarized Affidavit',
    usedForHi: 'आपराधिक रिकॉर्ड शून्य होने अथवा आय/जाति के स्व-प्रमाणीकरण हेतु',
    usedForEn: 'Self-certification of true income or no criminal antecedents',
    digilocker: false,
    fileFormatHi: 'PDF / स्कैन कॉपी (हस्ताक्षरित)',
    fileFormatEn: 'Signed PDF / Scanned copy',
    requiredFor: [
      { hi: 'चरित्र प्रमाण पत्र', en: 'Character Certificate', id: 'character' },
      { hi: 'विवाह पंजीकरण', en: 'Marriage Registration', id: 'marriage' },
    ],
  },
];

export default function DocumentsPage() {
  const { lang, t, speak } = useLang();

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
            {t('दस्तावेज़ पूर्व-जांच संदर्शिका', 'Document Checklist Guide')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            {t('कौन से दस्तावेज़ तैयार रखें?', 'Required Documents Checklist')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t(
              'आवेदन से पूर्व इन सभी दस्तावेज़ों की स्पष्ट प्रति अथवा डिजीलॉकर खाता तैयार रखें ताकि आवेदन एक ही बार में स्वीकृत हो।',
              'Keep these files ready or link your DigiLocker account to ensure 100% first-time approval.'
            )}
          </p>
        </div>

        <Link
          href="/guide"
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all shrink-0"
        >
          {t('प्रमाण पत्र गाइड देखें →', 'Certificate Guide →')}
        </Link>
      </div>

      {/* DigiLocker Notice Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-blue-950">
        <div className="flex items-center gap-3.5">
          <span className="text-3xl">⚡</span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base">
              {t('डिजीलॉकर से स्वतः सत्यापन सुविधा', 'Instant Auto-Import via DigiLocker')}
            </h3>
            <p className="text-xs text-blue-800 mt-0.5">
              {t('आधार, राशन कार्ड एवं 10वीं मार्कशीट स्कैन करने की जरूरत नहीं — हमारे फॉर्म में सीधे 1-क्लिक में जुड़ते हैं।', 'No manual scanning required for Aadhaar, Ration, or Marksheets. Linked in 1 click.')}
            </p>
          </div>
        </div>

        <Link
          href="/account"
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shrink-0 text-center"
        >
          {t('नागरिक खाता लॉगिन करें', 'Connect DigiLocker')}
        </Link>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {docsList.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl p-2 bg-slate-50 rounded-2xl">{doc.emoji}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speak(`${lang === 'hi' ? doc.hi : doc.en}. ${lang === 'hi' ? doc.usedForHi : doc.usedForEn}`)}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 flex items-center justify-center text-xs"
                    title={t('सुनें', 'Listen')}
                  >
                    🔊
                  </button>
                  {doc.digilocker && (
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                      DigiLocker ✓
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-black text-slate-900 text-base">
                {lang === 'hi' ? doc.hi : doc.en}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {lang === 'hi' ? doc.usedForHi : doc.usedForEn}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-400 block font-semibold mb-1">
                  {t('अनुशंसित प्रारूप:', 'File Format:')}
                </span>
                <span className="font-mono text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 inline-block">
                  {lang === 'hi' ? doc.fileFormatHi : doc.fileFormatEn}
                </span>
              </div>

              <div className="mt-3 text-xs">
                <span className="text-slate-400 block font-semibold mb-1">
                  {t('इन सेवाओं में आवश्यक:', 'Required for Services:')}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {doc.requiredFor.map((req, rIdx) => (
                    <Link
                      key={rIdx}
                      href={req.id === 'services' ? '/services' : `/apply/${req.id}`}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                    >
                      {lang === 'hi' ? req.hi : req.en} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
