'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '../lang-context';
import { DEMO_APPLICATIONS, StoredApplication } from '../data/services';

function TrackContent() {
  const { lang, t, showToast } = useLang();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<StoredApplication | null>(null);
  const [matchingApps, setMatchingApps] = useState<StoredApplication[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Load and merge applications on mount
  useEffect(() => {
    const idFromParam = searchParams.get('id');
    const allApps = getAllApplications();

    if (idFromParam) {
      setSearchQuery(idFromParam);
      const matched = allApps.find(a => a.id.toLowerCase() === idFromParam.toLowerCase());
      if (matched) {
        setSelectedApp(matched);
        setHasSearched(true);
      }
    } else {
      // Default to demo app
      setSelectedApp(allApps[0]);
    }
  }, [searchParams]);

  const getAllApplications = (): StoredApplication[] => {
    try {
      const stored = localStorage.getItem('jan_sahayak_applications');
      const customApps = stored ? JSON.parse(stored) : [];
      return [...customApps, ...DEMO_APPLICATIONS];
    } catch {
      return DEMO_APPLICATIONS;
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const all = getAllApplications();
    // Search by ID or mobile
    const matchedById = all.find(a => a.id.toLowerCase() === q);
    if (matchedById) {
      setSelectedApp(matchedById);
      setMatchingApps([]);
      setHasSearched(true);
      return;
    }

    // Search by mobile
    const matchedByMobile = all.filter(a => a.mobile.includes(q) || a.mobile.replace(/\D/g, '').includes(q));
    if (matchedByMobile.length > 0) {
      setMatchingApps(matchedByMobile);
      setSelectedApp(matchedByMobile[0]);
      setHasSearched(true);
      return;
    }

    // Fallback: create dynamic placeholder for search
    const dynamicFallback: StoredApplication = {
      id: searchQuery.toUpperCase(),
      serviceId: 'income',
      serviceNameHi: 'आय प्रमाण पत्र',
      serviceNameEn: 'Income Certificate',
      applicantName: 'राम कुमार शर्मा (Ram Kumar Sharma)',
      mobile: '9876543210',
      district: 'Dehradun (देहरादून)',
      tehsil: 'देहरादून सदर',
      appliedDate: '18 Oct 2026',
      estimatedDate: '25 Oct 2026',
      status: 'field_inquiry',
      statusLabelHi: 'तहसीलदार समीक्षा / जांच प्रगति पर',
      statusLabelEn: 'Tehsildar Review & Field Inquiry in Progress',
      stages: DEMO_APPLICATIONS[0].stages,
    };
    setSelectedApp(dynamicFallback);
    setMatchingApps([]);
    setHasSearched(true);
  };

  const handleSendSms = () => {
    if (!selectedApp) return;
    showToast(
      t('SMS संदेश भेजा गया 📲', 'SMS Dispatched 📲'),
      t(
        `[Uttarakhand e-District] प्रिय ${selectedApp.applicantName.split(' ')[0]}, आपका आवेदन ${selectedApp.id} वर्तमान में "${selectedApp.statusLabelHi}" स्तर पर है।`,
        `[Uttarakhand e-District] Dear applicant, your application ${selectedApp.id} is currently at "${selectedApp.statusLabelEn}".`
      ),
      'info'
    );
  };

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-8 pb-32">
      {/* Search Header Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
          🔍
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {t('आवेदन स्थिति ट्रैक करें', 'Track Application Status')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t(
            'SMS में प्राप्त आवेदन संख्या (उदा: UK-INC-2026-48291) अथवा 10 अंकों का मोबाइल नंबर दर्ज करें',
            'Enter Application Reference Number or registered 10-digit mobile number'
          )}
        </p>

        <form onSubmit={handleSearch} className="mt-5 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="UK-INC-2026-48291 or 9876543210"
            className="flex-1 input-field text-center sm:text-left font-mono font-bold tracking-wider uppercase text-slate-800"
          />
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xs transition-all active:scale-95 shrink-0"
          >
            {t('स्थिति खोजें', 'Check Status')}
          </button>
        </form>

        {/* Demo Quick Suggestion Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <span>{t('डेमो आईडी चुनें:', 'Quick Demos:')}</span>
          <button
            onClick={() => {
              setSearchQuery('UK-DOM-2026-31942');
              const a = getAllApplications().find(x => x.id === 'UK-DOM-2026-31942');
              if (a) setSelectedApp(a);
            }}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200"
          >
            UK-DOM-2026-31942 (Approved ✅)
          </button>
          <button
            onClick={() => {
              setSearchQuery('UK-INC-2026-48291');
              const a = getAllApplications().find(x => x.id === 'UK-INC-2026-48291');
              if (a) setSelectedApp(a);
            }}
            className="bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md border border-amber-200"
          >
            UK-INC-2026-48291 (In Progress ⏳)
          </button>
        </div>
      </div>

      {/* Multiple Matching Applications (if searched by mobile) */}
      {matchingApps.length > 1 && (
        <div className="mb-6 bg-slate-100 p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-700 mb-2">
            {t(`इस मोबाइल नंबर से ${matchingApps.length} आवेदन प्राप्त हुए:`, `${matchingApps.length} applications found for this mobile:`)}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {matchingApps.map(app => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                  selectedApp?.id === app.id
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {lang === 'hi' ? app.serviceNameHi : app.serviceNameEn} ({app.id})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Application Details */}
      {selectedApp && (
        <div className="space-y-6">
          {/* Status Badge Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {t('आवेदन संदर्भ संख्या', 'Application Reference ID')}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-800 font-mono tracking-wider">
                  {selectedApp.id}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'hi' ? selectedApp.serviceNameHi : selectedApp.serviceNameEn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-extrabold px-4 py-2 rounded-xl border flex items-center gap-1.5 ${
                    selectedApp.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}
                >
                  <span>{selectedApp.status === 'approved' ? '✅' : '⏳'}</span>
                  <span>{lang === 'hi' ? selectedApp.statusLabelHi : selectedApp.statusLabelEn}</span>
                </span>
              </div>
            </div>

            {/* Quick Particulars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
              <div>
                <span className="text-slate-400 block">{t('आवेदक (Applicant)', 'Applicant')}</span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{selectedApp.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('जिला / तहसील', 'District/Tehsil')}</span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{selectedApp.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('आवेदन दिनांक', 'Date Filed')}</span>
                <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{selectedApp.appliedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('RTS समयसीमा', 'RTS Guaranteed By')}</span>
                <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">{selectedApp.estimatedDate}</span>
              </div>
            </div>

            {/* If Approved: Certificate Download Strip */}
            {selectedApp.status === 'approved' && (
              <div className="mt-6 p-4 bg-linear-to-r from-emerald-500 to-green-600 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📜</span>
                  <div>
                    <h3 className="font-black text-sm">
                      {t('डिजिटल प्रमाण पत्र जारी हो चुका है!', 'Digital Certificate Issued!')}
                    </h3>
                    <p className="text-xs text-emerald-100">
                      {t('सक्षम प्राधिकारी के डिजिटल हस्ताक्षर सहित मूल प्रति डाउनलोड करें।', 'Official copy with verified digital signature & QR code.')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="bg-white hover:bg-slate-100 text-emerald-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>📥</span>
                  <span>{t('प्रमाण पत्र देखें व डाउनलोड करें', 'View & Download Certificate')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Workflow Timeline Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {t('प्रशासनिक अनुमोदन यात्रा (RTS Stages)', 'Administrative Verification Journey')}
                </h3>
                <p className="text-xs text-slate-500">
                  {t('तहसीलदार, पटवारी व एसडीएम स्तर की प्रत्यक्ष समय-मुहर (Timestamps)', 'Direct officer stamps under Right to Services Act')}
                </p>
              </div>

              <button
                onClick={handleSendSms}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 shrink-0"
              >
                <span>📲</span>
                <span>{t('SMS भेजें', 'Resend SMS')}</span>
              </button>
            </div>

            {/* Stages List */}
            <div className="relative pl-6 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {selectedApp.stages.map((stg, i) => (
                <div key={i} className="relative flex items-start gap-4 group">
                  {/* Dot / Icon */}
                  <div
                    className={`absolute -left-6 top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white transition-all ${
                      stg.done
                        ? 'bg-emerald-700 text-white'
                        : stg.active
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {stg.done ? '✓' : stg.active ? '…' : i + 1}
                  </div>

                  <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-200 group-hover:border-slate-300 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <p
                        className={`font-black text-sm ${
                          stg.done
                            ? 'text-slate-900'
                            : stg.active
                            ? 'text-amber-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {lang === 'hi' ? stg.titleHi : stg.titleEn}
                      </p>
                      <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {stg.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      <span className="font-semibold">{t('प्राधिकारी:', 'Authority:')} </span>
                      {lang === 'hi' ? stg.officerHi : stg.officerEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Escalation Action */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                {t('क्या समयसीमा का उल्लंघन हुआ है?', 'Is your application delayed beyond RTS limit?')}
              </span>
              <Link
                href={`/grievance?appId=${selectedApp.id}`}
                className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>📢</span>
                <span>{t('1905 सीएम हेल्पलाइन पर शिकायत दर्ज करें', 'File RTS Delay Grievance')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Digital Certificate Preview Modal */}
      {showCertificateModal && selectedApp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-300 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <span className="font-bold text-sm">
                  {t('उत्तराखण्ड शासन आधिकारिक डिजिटल प्रमाण पत्र', 'Govt of Uttarakhand Digital Certificate')}
                </span>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-white/60 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Official Certificate Visual */}
            <div className="p-6 sm:p-10 overflow-y-auto bg-amber-50/30 space-y-6 text-center border-8 border-double border-emerald-800 m-4 rounded-2xl relative">
              {/* Emblem */}
              <div className="w-16 h-16 rounded-full bg-emerald-800 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
                उ
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-black text-slate-500">
                  उत्तराखण्ड शासन | GOVERNMENT OF UTTARAKHAND
                </p>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  राजस्व विभाग / DEPARTMENT OF REVENUE
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-emerald-950 mt-2 uppercase tracking-wide border-b-2 border-emerald-800 pb-2 inline-block">
                  {lang === 'hi' ? selectedApp.serviceNameHi : selectedApp.serviceNameEn}
                </h2>
              </div>

              {/* Certificate Body Text */}
              <div className="text-left text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 font-serif">
                <p>
                  प्रमाणित किया जाता है कि <strong>{selectedApp.applicantName}</strong>, निवासी{' '}
                  <strong>{selectedApp.district}</strong>, उत्तराखण्ड शासन के आधिकारिक अभिलेखों एवं क्षेत्रीय
                  राजस्व उप-निरीक्षक की आख्या के आधार पर उत्तराखण्ड के विधि सम्मत स्थायी नागरिक हैं।
                </p>
                <p>
                  यह प्रमाण पत्र उत्तराखण्ड लोक सेवाओं के अधिकार अधिनियम (RTS Act) के तहत डिजिटल रूप से हस्ताक्षरित
                  एवं जारी किया गया है।
                </p>
              </div>

              {/* Certificate Meta Details */}
              <div className="grid grid-cols-2 gap-4 text-left text-xs border-t border-b border-slate-300 py-3 font-mono">
                <div>
                  <span className="text-slate-400 block">प्रमाण पत्र क्रमांक (Certificate No.):</span>
                  <span className="font-bold text-slate-900">{selectedApp.id}-CERT</span>
                </div>
                <div>
                  <span className="text-slate-400 block">जारी दिनांक (Date of Issue):</span>
                  <span className="font-bold text-slate-900">{selectedApp.appliedDate}</span>
                </div>
              </div>

              {/* QR & Digital Seal */}
              <div className="flex items-center justify-between pt-4">
                <div className="text-left">
                  <div className="w-20 h-20 bg-white border-2 border-slate-800 p-1 flex items-center justify-center font-mono text-[9px] text-center shadow-xs">
                    [QR VERIFIED<br />GOVT-UK<br />{selectedApp.id}]
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Scan to verify</span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 block">Digitally Signed By:</span>
                  <p className="text-xs font-extrabold text-slate-900">उप-जिलाधिकारी (SDM)</p>
                  <p className="text-[10px] text-slate-500">उत्तराखण्ड शासन</p>
                  <p className="text-[9px] text-emerald-700 font-mono mt-0.5">Signature Valid ✓</p>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                {t('बंद करें', 'Close')}
              </button>
              <button
                onClick={() => window.print()}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>🖨️</span>
                <span>{t('डाउनलोड / प्रिंट (PDF)', 'Download / Print (PDF)')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Tracking Engine...</div>}>
      <TrackContent />
    </Suspense>
  );
}
