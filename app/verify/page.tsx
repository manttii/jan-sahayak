'use client';
import { useState } from 'react';
import { useLang } from '../lang-context';
import { DEMO_APPLICATIONS } from '../data/services';

export default function VerifyPage() {
  const { lang, t } = useLang();
  const [certInput, setCertInput] = useState('UK-DOM-2026-31942-CERT');
  const [verifiedResult, setVerifiedResult] = useState<any>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const q = certInput.trim().toUpperCase();
    setHasChecked(true);

    if (q.includes('DOM') || q.includes('31942')) {
      setVerifiedResult({
        isValid: true,
        certNo: 'UK-DOM-2026-31942-CERT',
        serviceName: lang === 'hi' ? 'स्थायी निवास प्रमाण पत्र' : 'Permanent Residence (Domicile) Certificate',
        beneficiary: 'प्रियंका रावत (Priyanka Rawat)',
        fatherName: 'श्री बी. एस. रावत',
        district: 'Pauri Garhwal (पौड़ी गढ़वाल)',
        issueDate: '19 Oct 2026',
        issuingAuthority: 'उप-जिलाधिकारी (SDM), श्रीनगर गढ़वाल',
        digitalSignStatus: 'Digitally Signed with Valid DSC (e-Mudhra / NIC CA)',
      });
    } else if (q.includes('INC') || q.includes('48291')) {
      setVerifiedResult({
        isValid: true,
        certNo: 'UK-INC-2026-48291-CERT',
        serviceName: lang === 'hi' ? 'आय प्रमाण पत्र' : 'Income Certificate',
        beneficiary: 'राम कुमार शर्मा (Ram Kumar Sharma)',
        fatherName: 'श्री महेश कुमार',
        district: 'Dehradun (देहरादून)',
        issueDate: '24 Oct 2026',
        issuingAuthority: 'तहसीलदार, देहरादून सदर',
        digitalSignStatus: 'Digitally Signed with Valid DSC (NIC CA)',
      });
    } else {
      setVerifiedResult({
        isValid: false,
        certNo: certInput,
      });
    }
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
          🛡️
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {t('डिजिटल प्रमाण पत्र सत्यापन पोर्टल', 'Public Certificate Verification')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t(
            'उत्तराखण्ड शासन द्वारा जारी किसी भी ई-प्रमाण पत्र की प्रामाणिकता की तत्काल जांच करें',
            'Instantly verify the authenticity of any e-certificate issued by Govt of Uttarakhand'
          )}
        </p>

        <form onSubmit={handleVerify} className="mt-5 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={certInput}
            onChange={e => setCertInput(e.target.value)}
            placeholder="UK-DOM-2026-XXXXX-CERT"
            className="flex-1 input-field font-mono font-bold tracking-wider text-center sm:text-left text-slate-800"
            required
          />
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xs transition-all active:scale-95 shrink-0"
          >
            {t('सत्यापित करें', 'Verify Document')}
          </button>
        </form>

        <div className="mt-4 text-xs text-slate-400">
          💡 {t('डेमो के लिए:', 'Sample valid ID:')}{' '}
          <button
            type="button"
            onClick={() => setCertInput('UK-DOM-2026-31942-CERT')}
            className="text-emerald-700 font-mono font-bold underline ml-1"
          >
            UK-DOM-2026-31942-CERT
          </button>
        </div>
      </div>

      {/* Verification Result */}
      {hasChecked && verifiedResult && (
        <div className="max-w-2xl mx-auto">
          {verifiedResult.isValid ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-lg animate-in zoom-in-95">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="text-4xl">✅</span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                    {t('वैध एवं प्रामाणिक', 'OFFICIALLY VERIFIED & AUTHENTIC')}
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-1">
                    {verifiedResult.serviceName}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 text-xs">
                <div>
                  <span className="text-slate-400 block">{t('प्रमाण पत्र क्रमांक', 'Certificate No.')}</span>
                  <span className="font-mono font-bold text-slate-900">{verifiedResult.certNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('जारी दिनांक', 'Issue Date')}</span>
                  <span className="font-bold text-slate-900">{verifiedResult.issueDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('लाभार्थी का नाम', 'Beneficiary Name')}</span>
                  <span className="font-bold text-slate-900">{verifiedResult.beneficiary}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('पिता / पति का नाम', 'Father / Spouse')}</span>
                  <span className="font-bold text-slate-900">{verifiedResult.fatherName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('जिला', 'District')}</span>
                  <span className="font-bold text-slate-900">{verifiedResult.district}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('सक्षम प्राधिकारी', 'Issuing Authority')}</span>
                  <span className="font-bold text-emerald-800">{verifiedResult.issuingAuthority}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 bg-emerald-50/50 p-3 rounded-2xl flex items-center justify-between">
                <div className="text-[11px] text-emerald-900">
                  <p className="font-bold">🔒 {verifiedResult.digitalSignStatus}</p>
                  <p className="text-slate-500 mt-0.5">
                    {t('यह प्रमाण पत्र उत्तराखण्ड सूचना प्रौद्योगिकी एजेंसी के सुरक्षित सर्वर द्वारा प्रमाणित है।', 'Secured & verified by ITDA Uttarakhand Cryptographic Vault.')}
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0"
                >
                  {t('प्रिंट सत्यापन', 'Print')}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center animate-in zoom-in-95">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-base font-black text-red-900 mt-2">
                {t('प्रमाण पत्र अभिलेख उपलब्ध नहीं', 'Record Not Found or Invalid')}
              </h3>
              <p className="text-xs text-red-700 mt-1 max-w-md mx-auto">
                {t(
                  'प्रदान की गई आईडी से कोई डिजिटल प्रमाण पत्र मेल नहीं खाता। कृपया प्रमाण पत्र पर मुद्रित सही आईडी दर्ज करें अथवा सीएससी केंद्र से संपर्क करें।',
                  'No valid Uttarakhand e-District certificate matches this ID. Verify spelling or contact 1800-180-4188.'
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
