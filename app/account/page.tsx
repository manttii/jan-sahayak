'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';

type AuthView = 'home' | 'aadhaar' | 'mobile';

const features = [
  { iconEn: '📝', hi: 'ड्राफ्ट सेव करें',           en: 'Save application drafts' },
  { iconEn: '📍', hi: 'सभी आवेदन ट्रैक करें',       en: 'Track all applications' },
  { iconEn: '📥', hi: 'प्रमाण पत्र डाउनलोड करें',   en: 'Download certificates' },
  { iconEn: '🔔', hi: 'SMS और नोटिफिकेशन पाएं',     en: 'Get SMS & notifications' },
];

const navItems = [
  { icon: '🏠', labelHi: 'होम',    labelEn: 'Home',      href: '/' },
  { icon: '📋', labelHi: 'सेवाएं', labelEn: 'Services',  href: '/services' },
  { icon: '🔍', labelHi: 'स्थिति', labelEn: 'Track',     href: '/track' },
  { icon: '📢', labelHi: 'शिकायत', labelEn: 'Grievance', href: '/grievance' },
  { icon: '👤', labelHi: 'खाता',   labelEn: 'Account',   href: '/account' },
];

export default function AccountPage() {
  const { lang, toggle } = useLang();
  const [view, setView] = useState<AuthView>('home');
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [mobileInput, setMobileInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const handleSendOtp = () => setOtpSent(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {view !== 'home' ? (
              <button
                onClick={() => { setView('home'); setOtpSent(false); setOtpValue(''); }}
                aria-label={lang === 'hi' ? 'वापस जाएं' : 'Go back'}
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
              {lang === 'hi' ? 'खाता / लॉगिन' : 'Account / Login'}
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

      <main className="max-w-xl mx-auto px-4 pb-24 pt-6">

        {/* ===== HOME VIEW ===== */}
        {view === 'home' && (
          <div>
            {/* Brand badge */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3" aria-hidden="true">उ</div>
              <h2 className="text-xl font-bold text-slate-900">{lang === 'hi' ? 'अपना खाता खोलें' : 'Access Your Account'}</h2>
              <p className="text-slate-500 text-sm mt-1 text-center">
                {lang === 'hi' ? 'सुरक्षित और आसान लॉगिन' : 'Safe and easy login'}
              </p>
            </div>

            {/* Aadhaar OTP button */}
            <button
              onClick={() => setView('aadhaar')}
              aria-label={lang === 'hi' ? 'आधार OTP से लॉगिन करें' : 'Login with Aadhaar OTP'}
              className="w-full flex items-center gap-4 bg-green-700 text-white rounded-2xl px-5 py-5 mb-3 shadow-lg shadow-green-200 hover:bg-green-800 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <span className="text-3xl" aria-hidden="true">🪪</span>
              <div className="text-left">
                <p className="font-bold text-base">{lang === 'hi' ? 'आधार OTP से लॉगिन' : 'Login with Aadhaar OTP'}</p>
                <p className="text-green-200 text-xs mt-0.5">{lang === 'hi' ? 'सबसे सुरक्षित तरीका' : 'Most secure method'}</p>
              </div>
              <span className="ml-auto text-xl" aria-hidden="true">→</span>
            </button>

            {/* Mobile OTP button */}
            <button
              onClick={() => setView('mobile')}
              aria-label={lang === 'hi' ? 'मोबाइल OTP से लॉगिन करें' : 'Login with Mobile OTP'}
              className="w-full flex items-center gap-4 bg-white border-2 border-slate-200 text-slate-800 rounded-2xl px-5 py-4 mb-5 hover:border-green-400 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <span className="text-3xl" aria-hidden="true">📱</span>
              <div className="text-left">
                <p className="font-semibold text-base">{lang === 'hi' ? 'मोबाइल OTP से लॉगिन' : 'Login with Mobile OTP'}</p>
                <p className="text-slate-400 text-xs mt-0.5">{lang === 'hi' ? 'अपने फ़ोन नंबर से' : 'Using your phone number'}</p>
              </div>
              <span className="ml-auto text-xl text-slate-400" aria-hidden="true">→</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-sm text-slate-400">{lang === 'hi' ? 'या' : 'or'}</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Guest */}
            <Link
              href="/"
              aria-label={lang === 'hi' ? 'अतिथि के रूप में जारी रखें' : 'Continue as guest'}
              className="block w-full text-center text-green-700 font-semibold py-3 focus:outline-none focus:underline"
            >
              {lang === 'hi' ? 'अतिथि के रूप में जारी रखें →' : 'Continue as Guest →'}
            </Link>

            {/* Feature preview */}
            <div className="mt-8 bg-slate-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                {lang === 'hi' ? 'लॉगिन के बाद आप कर सकते हैं:' : 'After logging in you can:'}
              </p>
              <ul className="space-y-2.5">
                {features.map(f => (
                  <li key={f.en} className="flex items-center gap-3">
                    <span className="text-xl" aria-hidden="true">{f.iconEn}</span>
                    <span className="text-sm text-slate-700 font-medium">{lang === 'hi' ? f.hi : f.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ===== AADHAAR VIEW ===== */}
        {view === 'aadhaar' && (
          <div>
            <div className="text-center mb-6">
              <div className="text-5xl mb-2" aria-hidden="true">🪪</div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'hi' ? 'आधार से लॉगिन' : 'Login with Aadhaar'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {lang === 'hi' ? 'आपका 12 अंकों का आधार नंबर दर्ज करें' : 'Enter your 12-digit Aadhaar number'}
              </p>
            </div>

            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="aadhaar">
              {lang === 'hi' ? 'आधार नंबर' : 'Aadhaar Number'}
            </label>
            <input
              id="aadhaar"
              type="tel"
              inputMode="numeric"
              maxLength={12}
              value={aadhaarInput}
              onChange={e => setAadhaarInput(e.target.value.replace(/\D/g, '').slice(0, 12))}
              placeholder="XXXX XXXX XXXX"
              aria-label={lang === 'hi' ? 'आधार नंबर दर्ज करें' : 'Enter Aadhaar number'}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
            />

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={aadhaarInput.length !== 12}
                aria-label={lang === 'hi' ? 'OTP भेजें' : 'Send OTP'}
                className="w-full bg-green-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {lang === 'hi' ? 'OTP भेजें' : 'Send OTP'}
              </button>
            ) : (
              <>
                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-sm text-green-700 mb-3">
                  {lang === 'hi' ? 'OTP आधार से जुड़े मोबाइल पर भेजा गया है।' : 'OTP sent to your Aadhaar-linked mobile number.'}
                </div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="otp-aadhaar">
                  {lang === 'hi' ? 'OTP दर्ज करें' : 'Enter OTP'}
                </label>
                <input
                  id="otp-aadhaar"
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpValue}
                  onChange={e => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="- - - - - -"
                  aria-label={lang === 'hi' ? 'OTP दर्ज करें' : 'Enter OTP'}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-lg tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
                />
                <button
                  disabled={otpValue.length !== 6}
                  aria-label={lang === 'hi' ? 'सत्यापित करें' : 'Verify'}
                  className="w-full bg-green-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {lang === 'hi' ? 'सत्यापित करें ✓' : 'Verify ✓'}
                </button>
              </>
            )}
            <p className="text-center text-xs text-slate-400 mt-4">
              {lang === 'hi' ? '🔒 यह एक demo है — कोई वास्तविक डेटा नहीं भेजा जाएगा।' : '🔒 This is a demo — no real data is transmitted.'}
            </p>
          </div>
        )}

        {/* ===== MOBILE VIEW ===== */}
        {view === 'mobile' && (
          <div>
            <div className="text-center mb-6">
              <div className="text-5xl mb-2" aria-hidden="true">📱</div>
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'hi' ? 'मोबाइल OTP से लॉगिन' : 'Login with Mobile OTP'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {lang === 'hi' ? 'अपना 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Enter your 10-digit mobile number'}
              </p>
            </div>

            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="mobile">
              {lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
            </label>
            <div className="flex gap-2 mb-3">
              <span className="flex items-center bg-slate-100 rounded-2xl px-3 text-slate-600 font-semibold border border-slate-200">+91</span>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobileInput}
                onChange={e => setMobileInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98XXXXXXXX"
                aria-label={lang === 'hi' ? 'मोबाइल नंबर दर्ज करें' : 'Enter mobile number'}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                disabled={mobileInput.length !== 10}
                aria-label={lang === 'hi' ? 'OTP भेजें' : 'Send OTP'}
                className="w-full bg-green-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {lang === 'hi' ? 'OTP भेजें' : 'Send OTP'}
              </button>
            ) : (
              <>
                <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-sm text-green-700 mb-3">
                  {lang === 'hi' ? `OTP +91-${mobileInput} पर भेजा गया।` : `OTP sent to +91-${mobileInput}.`}
                </div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="otp-mobile">
                  {lang === 'hi' ? 'OTP दर्ज करें' : 'Enter OTP'}
                </label>
                <input
                  id="otp-mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpValue}
                  onChange={e => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="- - - - - -"
                  aria-label={lang === 'hi' ? 'OTP दर्ज करें' : 'Enter OTP'}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-lg tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
                />
                <button
                  disabled={otpValue.length !== 6}
                  aria-label={lang === 'hi' ? 'सत्यापित करें' : 'Verify'}
                  className="w-full bg-green-700 text-white font-semibold py-4 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {lang === 'hi' ? 'सत्यापित करें ✓' : 'Verify ✓'}
                </button>
              </>
            )}
            <p className="text-center text-xs text-slate-400 mt-4">
              {lang === 'hi' ? '🔒 यह एक demo है — कोई वास्तविक डेटा नहीं भेजा जाएगा।' : '🔒 This is a demo — no real data is transmitted.'}
            </p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]" aria-label="Main navigation">
        <div className="max-w-xl mx-auto flex justify-around py-2 px-2">
          {navItems.map(n => (
            <Link href={n.href} key={n.href} aria-label={lang === 'hi' ? n.labelHi : n.labelEn}>
              <div className={`flex flex-col items-center px-2 py-1 rounded-xl ${n.href === '/account' ? 'text-green-700' : 'text-slate-400'}`}>
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