'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';

type Step = 1 | 2 | 3;

const complaintTypes = [
  { id: 'delayed',   hi: 'आवेदन में देरी',    en: 'Application delayed' },
  { id: 'wrong',     hi: 'गलत जानकारी',       en: 'Wrong information' },
  { id: 'officer',   hi: 'अधिकारी का व्यवहार', en: 'Officer behavior' },
  { id: 'technical', hi: 'तकनीकी समस्या',     en: 'Technical issue' },
  { id: 'other',     hi: 'अन्य',              en: 'Other' },
];

function generateGrievanceId() {
  return 'GRV-2026-' + Math.floor(1000 + Math.random() * 9000);
}

const navItems = [
  { icon: '🏠', labelHi: 'होम',    labelEn: 'Home',      href: '/' },
  { icon: '📋', labelHi: 'सेवाएं', labelEn: 'Services',  href: '/services' },
  { icon: '🔍', labelHi: 'स्थिति', labelEn: 'Track',     href: '/track' },
  { icon: '📢', labelHi: 'शिकायत', labelEn: 'Grievance', href: '/grievance' },
  { icon: '👤', labelHi: 'खाता',   labelEn: 'Account',   href: '/account' },
];

export default function GrievancePage() {
  const { lang, toggle } = useLang();
  const [step, setStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [grievanceId] = useState(generateGrievanceId);

  const canProceedStep1 = selectedType !== '';
  const canProceedStep2 = description.trim().length >= 10;

  const stepLabel = (s: Step) =>
    lang === 'hi'
      ? ['शिकायत प्रकार', 'विवरण', 'सफलता'][s - 1]
      : ['Type', 'Details', 'Done'][s - 1];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && step < 3 ? (
              <button
                onClick={() => setStep((s) => (s - 1) as Step)}
                aria-label={lang === 'hi' ? 'पिछला चरण' : 'Previous step'}
                className="text-slate-500 text-xl leading-none focus:outline-none"
              >
                ←
              </button>
            ) : (
              <Link href="/" aria-label={lang === 'hi' ? 'होम पर जाएं' : 'Go back home'}>
                <span className="text-slate-500 text-xl leading-none">←</span>
              </Link>
            )}
            <h1 className="font-bold text-slate-900 text-base">
              {lang === 'hi' ? 'शिकायत दर्ज करें' : 'File a Grievance'}
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
        {/* Step indicator */}
        {step < 3 && (
          <div className="max-w-xl mx-auto px-4 pb-3">
            <div className="flex items-center gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={lang === 'hi' ? `चरण ${step} / 2` : `Step ${step} of 2`}>
              {([1, 2] as const).map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    s <= step ? 'bg-green-700 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {s}
                  </div>
                  <span className={`text-xs ${s === step ? 'text-green-700 font-semibold' : 'text-slate-400'}`}>
                    {stepLabel(s)}
                  </span>
                  {s < 2 && <div className="w-8 h-0.5 bg-slate-200" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-xl mx-auto px-4 pb-24 pt-4">
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <p className="text-slate-500 text-sm mb-4">
              {lang === 'hi' ? 'शिकायत का प्रकार चुनें:' : 'Select the type of complaint:'}
            </p>
            <ul className="space-y-2" role="list">
              {complaintTypes.map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => setSelectedType(t.id)}
                    aria-pressed={selectedType === t.id}
                    aria-label={lang === 'hi' ? t.hi : t.en}
                    className={`w-full text-left px-4 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      selectedType === t.id
                        ? 'border-green-700 bg-green-50 text-green-800 font-semibold'
                        : 'border-slate-100 bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-medium">{lang === 'hi' ? t.hi : t.en}</span>
                    {lang === 'hi' && <span className="text-slate-400 text-sm block">{t.en}</span>}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              aria-label={lang === 'hi' ? 'आगे जाएं' : 'Continue'}
              className="mt-6 w-full bg-green-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {lang === 'hi' ? 'आगे जाएं →' : 'Continue →'}
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 mb-4 text-sm">
              <span className="text-green-700 font-medium">
                {complaintTypes.find(t => t.id === selectedType)?.[lang === 'hi' ? 'hi' : 'en']}
              </span>
            </div>
            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="description">
              {lang === 'hi' ? 'शिकायत का विवरण लिखें *' : 'Describe your complaint *'}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={lang === 'hi'
                ? 'कृपया अपनी शिकायत विस्तार से लिखें (कम से कम 10 अक्षर)...'
                : 'Please describe your issue in detail (minimum 10 characters)...'}
              aria-label={lang === 'hi' ? 'शिकायत का विवरण' : 'Complaint description'}
              rows={5}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-slate-400 resize-none"
            />
            <p className="text-xs text-slate-400 mt-1 mb-4">{description.length} / 500</p>

            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-700 mb-2">
                {lang === 'hi' ? 'फोटो संलग्न करें (वैकल्पिक)' : 'Attach photo (optional)'}
              </p>
              <label
                htmlFor="photo-upload"
                aria-label={lang === 'hi' ? 'फोटो अपलोड करें' : 'Upload photo'}
                className="flex items-center gap-3 border-2 border-dashed border-slate-300 rounded-2xl px-4 py-4 cursor-pointer hover:border-green-400 transition-colors"
              >
                <span className="text-2xl" aria-hidden="true">📷</span>
                <span className="text-sm text-slate-500">
                  {photoName
                    ? photoName
                    : lang === 'hi' ? 'फोटो चुनें (JPG, PNG, 2MB तक)' : 'Choose photo (JPG, PNG, up to 2MB)'}
                </span>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={e => setPhotoName(e.target.files?.[0]?.name ?? null)}
                />
              </label>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!canProceedStep2}
              aria-label={lang === 'hi' ? 'शिकायत जमा करें' : 'Submit grievance'}
              className="w-full bg-green-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {lang === 'hi' ? 'शिकायत जमा करें ✓' : 'Submit Grievance ✓'}
            </button>
          </div>
        )}

        {/* Step 3 - Success */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl" aria-hidden="true">
              ✅
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {lang === 'hi' ? 'शिकायत दर्ज हो गई!' : 'Grievance Filed!'}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {lang === 'hi'
                ? 'आपकी शिकायत सफलतापूर्वक दर्ज की गई है।'
                : 'Your grievance has been successfully registered.'}
            </p>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                {lang === 'hi' ? 'शिकायत ID' : 'Grievance ID'}
              </p>
              <p className="text-2xl font-bold text-green-700 tracking-widest mb-4" aria-live="polite">
                {grievanceId}
              </p>
              <div className="border-t border-slate-100 pt-4 space-y-2 text-sm text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === 'hi' ? 'प्रकार' : 'Type'}</span>
                  <span className="font-medium text-slate-700">
                    {complaintTypes.find(t => t.id === selectedType)?.[lang === 'hi' ? 'hi' : 'en']}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === 'hi' ? 'अपेक्षित समाधान' : 'Expected resolution'}</span>
                  <span className="font-medium text-green-700">7 {lang === 'hi' ? 'दिन' : 'days'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{lang === 'hi' ? 'दिनांक' : 'Date'}</span>
                  <span className="font-medium text-slate-700">{new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left mb-6">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">📱 </span>
                {lang === 'hi'
                  ? 'इस ID को SMS द्वारा आपके मोबाइल पर भेजा गया है। ट्रैक करने के लिए इसे संभाल कर रखें।'
                  : 'This ID has been sent to your mobile via SMS. Keep it safe to track your grievance.'}
              </p>
            </div>

            <Link
              href="/"
              aria-label={lang === 'hi' ? 'होम पर जाएं' : 'Go to home'}
              className="block w-full text-center bg-green-700 text-white font-semibold py-4 rounded-2xl hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {lang === 'hi' ? 'होम पर जाएं' : 'Back to Home'}
            </Link>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]" aria-label="Main navigation">
        <div className="max-w-xl mx-auto flex justify-around py-2 px-2">
          {navItems.map(n => (
            <Link href={n.href} key={n.href} aria-label={lang === 'hi' ? n.labelHi : n.labelEn}>
              <div className={`flex flex-col items-center px-2 py-1 rounded-xl ${n.href === '/grievance' ? 'text-green-700' : 'text-slate-400'}`}>
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