'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../../lang-context';

const steps = [
  { hi: 'आपकी जानकारी', en: 'Your Details' },
  { hi: 'परिवार की जानकारी', en: 'Family Info' },
  { hi: 'दस्तावेज़', en: 'Documents' },
  { hi: 'समीक्षा करें', en: 'Review & Submit' },
];

const docs = [
  { id: 'aadhar',    hi: 'आधार कार्ड',              en: 'Aadhaar Card',       required: true },
  { id: 'ration',    hi: 'राशन कार्ड',               en: 'Ration Card',        required: true },
  { id: 'photo',     hi: 'पासपोर्ट साइज़ फोटो',       en: 'Passport Photo',    required: true },
  { id: 'affidavit', hi: 'स्व-घोषणा पत्र',           en: 'Self-Declaration',   required: false },
];

const purposes = [
  { hi: 'स्कूल/कॉलेज में दाखिला', en: 'School / College Admission' },
  { hi: 'सरकारी योजना का लाभ',    en: 'Government Scheme Benefit' },
  { hi: 'छात्रवृत्ति',            en: 'Scholarship' },
  { hi: 'बैंक लोन',              en: 'Bank Loan' },
  { hi: 'अन्य',                  en: 'Other' },
];

export default function IncomeCertificatePage() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', dob: '', mobile: '', address: '', income: '', purpose: '', fatherName: '' });
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = (hi: string, en: string) => lang === 'hi' ? hi : en;
  const requiredDocs = docs.filter(d => d.required);
  const uploadedRequired = requiredDocs.filter(d => uploaded[d.id]).length;
  const canSubmit = agreed && uploadedRequired === requiredDocs.length;

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-4" role="img" aria-label="Success">✅</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('आवेदन सफल!', 'Application Submitted!')}</h1>
        <p className="text-slate-500 mb-6 text-sm">{t('आपको SMS पर OTP और status मिलेगा।', 'You will receive SMS updates on your mobile.')}</p>
        <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-sm border border-slate-100 mb-6">
          <p className="text-xs text-slate-400 mb-1">{t('आवेदन संख्या', 'Application Number')}</p>
          <p className="text-2xl font-bold text-green-700 tracking-wider font-mono">UK-INC-2026-48291</p>
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-slate-400">{t('सेवा', 'Service')}</p>
              <p className="font-medium text-slate-900">{t('आय प्रमाण पत्र', 'Income Certificate')}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">{t('अनुमानित समय', 'Est. Time')}</p>
              <p className="font-medium text-green-700">{t('7 कार्य दिवस', '7 Working Days')}</p>
            </div>
          </div>
        </div>
        <Link href="/track" className="w-full max-w-sm">
          <button className="bg-green-700 text-white rounded-2xl px-6 py-3.5 font-bold w-full mb-3">
            {t('📍 स्थिति ट्रैक करें', '📍 Track Application')}
          </button>
        </Link>
        <Link href="/">
          <span className="text-sm text-slate-400 underline">{t('होम पर जाएं', 'Back to Home')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" aria-label={t('वापस जाएं', 'Go back')}>
            <span className="text-slate-400 text-xl font-light">←</span>
          </Link>
          <div>
            <p className="font-bold text-slate-900 text-sm">{t('आय प्रमाण पत्र', 'Income Certificate')}</p>
            <p className="text-xs text-slate-400">{t('ऑनलाइन आवेदन', 'Online Application')}</p>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-5 pb-36">
        {/* Step Progress */}
        <nav aria-label={t('आवेदन चरण', 'Application Steps')} className="mb-6">
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div
                  aria-current={i === step ? 'step' : undefined}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    i < step ? 'bg-green-700 text-white' :
                    i === step ? 'bg-green-700 text-white ring-4 ring-green-100' :
                    'bg-slate-200 text-slate-400'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-1 rounded-full transition-colors ${i < step ? 'bg-green-700' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">{t(steps[step].hi, steps[step].en)} &mdash; {t(`चरण ${step+1}/${steps.length}`, `Step ${step+1} of ${steps.length}`)}</p>
        </nav>

        {/* Step 0: Personal Info */}
        {step === 0 && (
          <div className="space-y-4">
            <Field label={t('पूरा नाम', 'Full Name')} required>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={t('जैसे: राम कुमार शर्मा', 'e.g. Ram Kumar Sharma')}
                autoComplete="name"
                className="input-field" />
            </Field>
            <Field label={t('जन्म तिथि', 'Date of Birth')} required>
              <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })}
                className="input-field" />
            </Field>
            <Field label={t('मोबाइल नंबर', 'Mobile Number')} required hint={t('इसी नंबर पर OTP और updates आएंगे', 'OTP and updates will be sent here')}>
              <input type="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })}
                placeholder="10-digit number" autoComplete="tel" maxLength={10}
                className="input-field" />
            </Field>
            <Field label={t('प्रयोजन', 'Purpose')} required>
              <select value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })}
                className="input-field text-slate-700">
                <option value="">{t('चुनें...', 'Select...')}</option>
                {purposes.map(p => <option key={p.en}>{t(p.hi, p.en)}</option>)}
              </select>
            </Field>
          </div>
        )}

        {/* Step 1: Family Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-sm text-blue-800">
              ℹ️ {t('वार्षिक पारिवारिक आय — नौकरी, खेती, व्यापार सब मिलाकर', 'Annual household income — include salary, farming, business, all sources')}
            </div>
            <Field label={t('पिता / पति का नाम', "Father's / Husband's Name")} required>
              <input value={form.fatherName} onChange={e => setForm({ ...form, fatherName: e.target.value })}
                placeholder={t('जैसे: श्री महेश कुमार', 'e.g. Shri Mahesh Kumar')}
                className="input-field" />
            </Field>
            <Field label={t('वार्षिक पारिवारिक आय (₹)', 'Annual Family Income (₹)')} required>
              <input type="number" value={form.income} onChange={e => setForm({ ...form, income: e.target.value })}
                placeholder="e.g. 120000"
                className="input-field" />
              {form.income && parseInt(form.income) <= 200000 && (
                <p className="text-xs text-green-600 mt-1.5">✅ {t('आप BPL श्रेणी में आते हैं — अतिरिक्त योजनाओं के पात्र हो सकते हैं', 'You qualify for BPL category — may be eligible for extra schemes')}</p>
              )}
            </Field>
            <Field label={t('स्थायी पता', 'Permanent Address')} required>
              <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder={t('गांव/मोहल्ला, तहसील, जिला', 'Village/Colony, Tehsil, District')}
                rows={3}
                className="input-field resize-none" />
            </Field>
          </div>
        )}

        {/* Step 2: Documents */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-sm text-amber-800">
              📎 {t('दस्तावेज़ की साफ़ फोटो या स्कैन कॉपी अपलोड करें — फाइल साइज़ 2MB से कम हो', 'Upload a clear photo or scan — file size must be under 2MB')}
            </div>
            {docs.map(d => (
              <div key={d.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{t(d.hi, d.en)}</p>
                  <p className={`text-xs mt-0.5 ${d.required ? 'text-red-500' : 'text-slate-400'}`}>
                    {d.required ? t('⚠️ अनिवार्य', '⚠️ Required') : t('✓ वैकल्पिक', '✓ Optional')}
                  </p>
                </div>
                {uploaded[d.id] ? (
                  <span className="text-green-600 text-sm font-medium">✅ {t('अपलोड', 'Uploaded')}</span>
                ) : (
                  <button
                    onClick={() => setUploaded({ ...uploaded, [d.id]: true })}
                    aria-label={t(`${d.hi} अपलोड करें`, `Upload ${d.en}`)}
                    className="bg-green-50 border border-green-300 text-green-700 rounded-xl px-3 py-2 text-sm font-semibold active:scale-95 transition-transform"
                  >
                    📷 {t('अपलोड', 'Upload')}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-4">
              <p className="font-semibold text-slate-900 mb-3 text-sm">{t('आपकी जानकारी की समीक्षा करें', 'Review Your Information')}</p>
              {[
                [t('नाम', 'Name'), form.name || '—'],
                [t('जन्म तिथि', 'Date of Birth'), form.dob || '—'],
                [t('मोबाइल', 'Mobile'), form.mobile || '—'],
                [t('प्रयोजन', 'Purpose'), form.purpose || '—'],
                [t('वार्षिक आय', 'Annual Income'), form.income ? `₹${parseInt(form.income).toLocaleString('en-IN')}` : '—'],
                [t('पिता/पति', "Father's/Husband's Name"), form.fatherName || '—'],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-medium text-slate-900 text-right max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>

            <div className={`rounded-2xl p-3 text-sm ${uploadedRequired === requiredDocs.length ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {uploadedRequired === requiredDocs.length
                ? `✅ ${t('सभी अनिवार्य दस्तावेज़ अपलोड किए', 'All required documents uploaded')}`
                : `⚠️ ${t(`${requiredDocs.length - uploadedRequired} अनिवार्य दस्तावेज़ बाकी`, `${requiredDocs.length - uploadedRequired} required document(s) missing`)}`}
            </div>

            <label className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-4 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-green-700 w-4 h-4 shrink-0" />
              <span className="text-sm text-slate-700">
                {t('मैं प्रमाणित करता/करती हूं कि दी गई सभी जानकारी सत्य है। गलत जानकारी देने पर कानूनी कार्रवाई हो सकती है।',
                   'I certify that all information provided is true. Providing false information may result in legal action.')}
              </span>
            </label>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 shadow-lg max-w-xl mx-auto">
        <div className="flex gap-3">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)}
              className="flex-1 border border-slate-200 text-slate-600 rounded-2xl py-3.5 font-semibold active:scale-95 transition-transform">
              {t('← पीछे', '← Back')}
            </button>
          ) : (
            <Link href="/" className="flex-1">
              <button className="w-full border border-slate-200 text-slate-600 rounded-2xl py-3.5 font-semibold">
                {t('← रद्द करें', '← Cancel')}
              </button>
            </Link>
          )}
          <button
            onClick={() => step < steps.length - 1 ? setStep(step + 1) : setSubmitted(true)}
            disabled={step === steps.length - 1 && !canSubmit}
            className={`flex-1 rounded-2xl py-3.5 font-bold active:scale-95 transition-all ${
              step === steps.length - 1 && !canSubmit
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-green-700 text-white shadow-lg shadow-green-200'
            }`}
          >
            {step === steps.length - 1 ? t('✅ जमा करें', '✅ Submit') : t('आगे →', 'Next →')}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700 block mb-1.5">
        {label} {required && <span className="text-red-500" aria-label="required">*</span>}
      </label>
      <style jsx global>{`.input-field { width: 100%; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 0.75rem 1rem; font-size: 1rem; background: white; outline: none; transition: border-color 0.15s, box-shadow 0.15s; } .input-field:focus { border-color: #15803d; box-shadow: 0 0 0 3px rgba(21,128,61,0.15); }`}</style>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">💡 {hint}</p>}
    </div>
  );
}
