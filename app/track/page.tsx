'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';

const demoStatus = {
  id: 'UK-INC-2026-48291',
  steps: [
    { hi: 'आवेदन जमा',          en: 'Application Received',      date: '14 Sep, 10:32 AM', done: true,  active: false },
    { hi: 'दस्तावेज़ सत्यापन',   en: 'Documents Verified',         date: '14 Sep, 2:15 PM',  done: true,  active: false },
    { hi: 'तहसीलदार समीक्षा',   en: 'Tehsildar Review',           date: 'In progress…',      done: false, active: true  },
    { hi: 'जिलाधिकारी अनुमोदन', en: 'District Officer Approval',  date: 'Pending',           done: false, active: false },
    { hi: 'प्रमाण पत्र जारी',    en: 'Certificate Issued',         date: 'Pending',           done: false, active: false },
  ]
};

export default function TrackPage() {
  const { lang } = useLang();
  const [appId, setAppId] = useState('');
  const [showResult, setShowResult] = useState(false);

  const t = (hi: string, en: string) => lang === 'hi' ? hi : en;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" aria-label={t('वापस जाएं', 'Go back')}>
            <span className="text-slate-400 text-xl">←</span>
          </Link>
          <div>
            <p className="font-bold text-slate-900 text-sm">{t('आवेदन स्थिति', 'Application Status')}</p>
            <p className="text-xs text-slate-400">{t('Track Your Application', 'Track Your Application')}</p>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-5 pb-24">
        {!showResult ? (
          <div>
            <div className="text-center pt-6 pb-8">
              <div className="text-6xl mb-3" role="img" aria-label="Search">🔍</div>
              <h1 className="text-xl font-bold text-slate-900 mb-1">{t('अपना आवेदन खोजें', 'Find Your Application')}</h1>
              <p className="text-sm text-slate-400">{t('SMS में मिली आवेदन संख्या डालें', 'Enter the application number from your SMS')}</p>
            </div>
            <label htmlFor="appId" className="text-sm font-semibold text-slate-700 block mb-2">
              {t('आवेदन संख्या', 'Application Number')}
            </label>
            <input
              id="appId"
              value={appId}
              onChange={e => setAppId(e.target.value)}
              placeholder="UK-INC-2026-XXXXX"
              className="w-full border-2 border-slate-200 rounded-2xl px-4 py-4 text-base focus:outline-none focus:border-green-500 bg-white text-center font-mono tracking-wider mb-4"
              aria-label={t('आवेदन संख्या दर्ज करें', 'Enter your application number')}
            />
            <button
              onClick={() => setShowResult(true)}
              className="w-full bg-green-700 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-green-200 mb-4 active:scale-95 transition-transform"
            >
              {t('स्थिति देखें', 'Check Status')}
            </button>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm text-amber-800">
              💡 <strong>Demo:</strong> {t('कोई भी ID डालें — demo status दिखेगा', 'Enter any ID to see the demo status')}
            </div>
          </div>
        ) : (
          <div>
            {/* Status Badge */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">{t('आवेदन संख्या', 'Application No.')}</p>
                  <p className="font-bold text-green-700 font-mono text-sm">{demoStatus.id}</p>
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
                  ⏳ {t('प्रगति में', 'In Progress')}
                </span>
              </div>
              <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-slate-400">{t('सेवा', 'Service')}</p><p className="font-semibold text-slate-900">{t('आय प्रमाण पत्र', 'Income Certificate')}</p></div>
                <div><p className="text-xs text-slate-400">{t('आवेदक', 'Applicant')}</p><p className="font-semibold text-slate-900">Ram Kumar Sharma</p></div>
                <div><p className="text-xs text-slate-400">{t('जमा तिथि', 'Filed On')}</p><p className="font-semibold text-slate-900">14 Sep 2026</p></div>
                <div><p className="text-xs text-slate-400">{t('अनुमानित', 'Expected By')}</p><p className="font-semibold text-green-700">21 Sep 2026</p></div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
              <p className="font-bold text-slate-900 mb-4 text-sm">{t('आवेदन की यात्रा', 'Application Journey')}</p>
              <ol aria-label={t('आवेदन के चरण', 'Application stages')}>
                {demoStatus.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 mb-4 last:mb-0">
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${s.done ? 'bg-green-700 text-white' : s.active ? 'bg-amber-100 border-2 border-amber-500 text-amber-700' : 'bg-slate-100 border-2 border-slate-200 text-slate-400'}`}
                        aria-label={s.done ? 'Completed' : s.active ? 'In progress' : 'Pending'}>
                        {s.done ? '✓' : s.active ? '…' : ''}
                      </div>
                      {i < demoStatus.steps.length - 1 && <div className={`w-0.5 h-6 mt-1 rounded-full ${s.done ? 'bg-green-700' : 'bg-slate-200'}`} />}
                    </div>
                    <div className="pb-1 pt-0.5">
                      <p className={`text-sm font-semibold ${s.done ? 'text-slate-900' : s.active ? 'text-amber-700' : 'text-slate-400'}`}>
                        {t(s.hi, s.en)}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.date}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button className="bg-green-50 border border-green-300 text-green-700 rounded-2xl py-3 text-sm font-semibold active:scale-95 transition-transform">
                📲 {t('SMS भेजें', 'Send SMS')}
              </button>
              <button className="bg-red-50 border border-red-200 text-red-600 rounded-2xl py-3 text-sm font-semibold active:scale-95 transition-transform">
                📢 {t('शिकायत करें', 'File Grievance')}
              </button>
            </div>

            <button onClick={() => setShowResult(false)} className="w-full text-sm text-slate-400 py-2 underline">
              {t('← दूसरा आवेदन खोजें', '← Search another application')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
