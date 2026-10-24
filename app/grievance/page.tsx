'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLang } from '../lang-context';

type Step = 1 | 2 | 3;

const complaintTypes = [
  { id: 'delayed', hi: 'आवेदन में समयसीमा से अधिक देरी (RTS Delay)', en: 'Application delayed beyond RTS limit', icon: '⏱️' },
  { id: 'wrong', hi: 'गलत या त्रुटिपूर्ण जानकारी (Errors in record)', en: 'Errors in issued certificate', icon: '📝' },
  { id: 'officer', hi: 'अधिकारी / कर्मचारी का असहयोगात्मक व्यवहार', en: 'Officer misconduct or unhelpful behavior', icon: '👔' },
  { id: 'bribe', hi: 'अनुचित मांग या सीएससी पर अतिरिक्त वसूली', en: 'Overcharging or bribery attempt', icon: '🚫' },
  { id: 'technical', hi: 'तकनीकी त्रुटि / सर्वर समस्या', en: 'Technical portal error / payment issue', icon: '💻' },
  { id: 'other', hi: 'अन्य समस्या (Other Grievance)', en: 'Other citizen issue', icon: '📢' },
];

const departments = [
  { id: 'revenue', hi: 'राजस्व विभाग (Revenue - पटवारी / तहसीलदार / एसडीएम)', en: 'Department of Revenue (Patwari/Tehsil/SDM)' },
  { id: 'police', hi: 'उत्तराखण्ड पुलिस (Police Verification / Kotwali)', en: 'Uttarakhand Police (Verification)' },
  { id: 'welfare', hi: 'समाज कल्याण विभाग (Social Welfare - Pension/Caste)', en: 'Social Welfare (Pension/Caste)' },
  { id: 'panchayat', hi: 'पंचायती राज विभाग (Panchayat & Village Development)', en: 'Panchayati Raj & VDO' },
  { id: 'health', hi: 'चिकित्सा स्वास्थ्य एवं परिवार कल्याण (Health & Birth/Death)', en: 'Health & Birth/Death Registry' },
  { id: 'food', hi: 'खाद्य एवं नागरिक आपूर्ति (Food & Civil Supplies - Ration)', en: 'Food & Civil Supplies (Ration)' },
  { id: 'itda', hi: 'सूचना प्रौद्योगिकी विकास एजेंसी (ITDA - Portal Tech)', en: 'ITDA (Apuni Sarkar Portal Issues)' },
];

function GrievanceContent() {
  const { lang, t, showToast } = useLang();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState('delayed');
  const [selectedDept, setSelectedDept] = useState('revenue');
  const [appIdInput, setAppIdInput] = useState('');
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [generatedGrvId, setGeneratedGrvId] = useState('');

  useEffect(() => {
    const qAppId = searchParams.get('appId');
    if (qAppId) {
      setAppIdInput(qAppId);
      setSelectedType('delayed');
    }
  }, [searchParams]);

  const handleSimulateVoiceRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setHasVoiceNote(true);
      if (!description) {
        setDescription(
          lang === 'hi'
            ? 'मैंने 10 दिन पहले आय प्रमाण पत्र के लिए आवेदन किया था (आवेदन सं: UK-INC-2026-48291), परन्तु अभी तक पटवारी जांच पूरी नहीं हुई है। RTS एक्ट के तहत 7 दिन में जारी होना चाहिए था।'
            : 'I applied for Income Certificate 10 days ago (App ID: UK-INC-2026-48291), but the Patwari field inquiry has still not been completed despite the 7-day RTS guarantee.'
        );
      }
      showToast(
        t('वॉइस शिकायत रिकॉर्ड हुई 🎙️', 'Voice Grievance Recorded 🎙️'),
        t('ऑडियो ट्रांसक्रिप्ट विवरण में स्वतः जुड़ गया है।', 'Audio note transcript added to complaint description.'),
        'success'
      );
    }, 1800);
  };

  const handleFinalSubmit = () => {
    const randomId = 'GRV-2026-' + Math.floor(1000 + Math.random() * 9000);
    setGeneratedGrvId(randomId);
    setStep(3);
    showToast(
      t('शिकायत दर्ज हुई!', 'Grievance Registered!'),
      t(`शिकायत संख्या: ${randomId}। 7 कार्य दिवसों में समाधान सुनिश्चित किया जाएगा।`, `Ref ID: ${randomId}. Guaranteed 7-day resolution window.`),
      'success'
    );
  };

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-8 pb-32">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
          >
            ←
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-bold">
            📢
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {t('नागरिक शिकायत निवारण (सीएम हेल्पलाइन 1905)', 'Citizen Grievance Redressal (CM Helpline 1905)')}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('उत्तराखण्ड शासन द्वारा 7 कार्य दिवस में समाधान गारंटी', 'Guaranteed 7-day administrative resolution')}
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-center shrink-0">
          <span className="text-[10px] text-amber-800 block font-bold">{t('टोल-फ्री हेल्पलाइन', 'Toll-Free')}</span>
          <span className="text-sm font-black text-amber-900 font-mono">1905 (24x7)</span>
        </div>
      </div>

      {/* Step Indicator */}
      {step < 3 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6 flex items-center justify-around text-xs font-bold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-800' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 1 ? 'bg-amber-600' : 'bg-slate-300'}`}>
              1
            </span>
            <span>{t('शिकायत का प्रकार', 'Grievance Type')}</span>
          </div>
          <span className="text-slate-300">───</span>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-800' : 'text-slate-400'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 2 ? 'bg-amber-600' : 'bg-slate-300'}`}>
              2
            </span>
            <span>{t('विवरण एवं वॉइस नोट', 'Details & Voice Note')}</span>
          </div>
        </div>
      )}

      {/* STEP 1: SELECT CATEGORY */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in">
          <h2 className="text-base sm:text-lg font-black text-slate-900 pb-2 border-b border-slate-100">
            {t('अपनी समस्या की श्रेणी चुनें:', 'Select Complaint Category:')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {complaintTypes.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedType(c.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  selectedType === c.id
                    ? 'bg-amber-50 border-amber-500 shadow-xs ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl mt-0.5">{c.icon}</span>
                <div>
                  <p className="font-extrabold text-sm text-slate-900 leading-snug">
                    {lang === 'hi' ? c.hi : c.en}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {lang === 'hi' ? c.en : c.hi}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>{t('विवरण भरें →', 'Continue to Details →')}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DETAILS & VOICE NOTE */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {t('शिकायत का पूर्ण विवरण लिखें या बोलें:', 'Complaint Particulars & Voice Recording:')}
            </h2>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:underline"
            >
              ← {t('प्रकार बदलें', 'Change Type')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('संबंधित विभाग चुनें *', 'Select Concerned Department *')}
              </label>
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="input-field"
              >
                {departments.map(d => (
                  <option key={d.id} value={d.id}>
                    {lang === 'hi' ? d.hi : d.en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('आवेदन संख्या (यदि उपलब्ध हो)', 'Application Reference ID (if applicable)')}
              </label>
              <input
                type="text"
                value={appIdInput}
                onChange={e => setAppIdInput(e.target.value)}
                placeholder="UK-INC-2026-48291"
                className="input-field font-mono uppercase"
              />
            </div>
          </div>

          {/* Voice Input Action Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎙️</span>
              <div>
                <p className="font-bold text-xs sm:text-sm text-amber-950">
                  {t('बोलकर शिकायत दर्ज करें (वॉइस नोट)', 'Voice Recording Assistance')}
                </p>
                <p className="text-[11px] text-amber-800">
                  {t('टाइप करने में परेशानी हो तो बोलें, AI विवरण स्वतः भर देगा।', 'Speak naturally; AI will auto-transcribe into the text box.')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSimulateVoiceRecord}
              disabled={isRecording}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
              }`}
            >
              <span>{isRecording ? '🔴 रिकॉर्ड हो रहा है...' : '🎤 वॉइस नोट शुरू करें'}</span>
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t('शिकायत का विस्तृत विवरण *', 'Detailed Description of Complaint *')}
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={t(
                'कृपया स्पष्ट शब्दों में बताएं कि किस अधिकारी / कार्यालय स्तर पर क्या समस्या आई है...',
                'Please describe the issue faced, dates, and officer responses...'
              )}
              className="input-field resize-none leading-relaxed"
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              {t('← पीछे', '← Back')}
            </button>

            <button
              onClick={handleFinalSubmit}
              disabled={!description.trim()}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-2xl shadow-sm transition-all"
            >
              {t('✅ शिकायत दर्ज करें', '✅ Submit Grievance')}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SUCCESS CONFIRMATION */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center animate-in zoom-in-95">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
            ✅
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            {t('शिकायत पंजीकृत', 'Registered')}
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-3">
            {t('आपकी शिकायत सफलतापूर्वक दर्ज हो गई है!', 'Grievance Successfully Registered!')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {t(
              'यह शिकायत मुख्य मंत्री हेल्पलाइन 1905 एवं संबंधित विभाग के वरिष्ठ नोडल अधिकारी को प्रेषित कर दी गई है।',
              'Forwarded to CM Helpline 1905 & departmental senior vigilance officer for immediate intervention.'
            )}
          </p>

          <div className="my-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-xs text-slate-400 font-semibold">{t('शिकायत संख्या', 'Grievance Ref No.')}</span>
              <span className="font-mono font-black text-sm text-amber-800 bg-amber-100 px-3 py-1 rounded-lg">
                {generatedGrvId}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{t('अपेक्षित समाधान समयसीमा', 'Guaranteed SLA')}</span>
              <span className="font-bold text-emerald-700">7 {t('कार्य दिवस', 'Working Days')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">{t('नोडल जांच अधिकारी', 'Nodal Investigator')}</span>
              <span className="font-bold text-slate-800">अपर जिलाधिकारी (ADM / Grievance Cell)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link
              href="/account"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-xs transition-all"
            >
              {t('नागरिक खाते में शिकायत स्थिति देखें', 'View Status in Citizen Portal')}
            </Link>
            <Link
              href="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm py-3 px-6 rounded-2xl transition-all"
            >
              {t('होम पेज पर जाएं', 'Return to Home')}
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default function GrievancePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Grievance Redressal...</div>}>
      <GrievanceContent />
    </Suspense>
  );
}
