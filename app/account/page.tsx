'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';
import { DEMO_APPLICATIONS } from '../data/services';

type AuthView = 'select' | 'aadhaar' | 'mobile' | 'dashboard';

export default function AccountPage() {
  const { lang, t, showToast } = useLang();
  const [view, setView] = useState<AuthView>('select');
  const [aadhaarInput, setAadhaarInput] = useState('981245678901');
  const [mobileInput, setMobileInput] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [activeTab, setActiveTab] = useState<'apps' | 'digilocker' | 'grievances'>('apps');

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpValue('123456');
    showToast(
      t('OTP प्राप्त हुआ 📲', 'OTP Received 📲'),
      t('सुरक्षा कोड: 123456 (डेमो हेतु स्वतः भरा गया)', 'Verification code: 123456 (Auto-filled for demo)'),
      'info'
    );
  };

  const handleVerify = () => {
    if (otpValue === '123456' || otpValue.length === 6) {
      setView('dashboard');
      showToast(
        t('लॉगिन सफल ✅', 'Login Successful ✅'),
        t('नमस्ते राम कुमार शर्मा, आपके नागरिक पोर्टल में स्वागत है।', 'Welcome back, Ram Kumar Sharma.'),
        'success'
      );
    }
  };

  const handleLogout = () => {
    setView('select');
    setOtpSent(false);
    setOtpValue('');
  };

  // DASHBOARD VIEW
  if (view === 'dashboard') {
    return (
      <main className="w-full max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              र
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  राम कुमार शर्मा (Ram Kumar Sharma)
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  Aadhaar eKYC ✓
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                +91 98765 43210 &bull; Raipur Road, Dehradun, Uttarakhand
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/services"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all"
            >
              + {t('नई सेवा आवेदन करें', 'Apply New Service')}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-3.5 rounded-xl transition-colors"
            >
              {t('लॉगआउट', 'Logout')}
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex border-b border-slate-200 mb-6 gap-2">
          {[
            { id: 'apps', labelHi: 'मेरे आवेदन (3)', labelEn: 'My Applications (3)' },
            { id: 'digilocker', labelHi: 'डिजीलॉकर वॉल्ट (4)', labelEn: 'DigiLocker Vault (4)' },
            { id: 'grievances', labelHi: 'मेरी शिकायतें (1)', labelEn: 'My Grievances (1)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-emerald-700 text-emerald-800 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {lang === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Tab 1: Applications */}
        {activeTab === 'apps' && (
          <div className="space-y-4">
            {DEMO_APPLICATIONS.map(app => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {app.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {lang === 'hi' ? app.statusLabelHi : app.statusLabelEn}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mt-2">
                    {lang === 'hi' ? app.serviceNameHi : app.serviceNameEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('जमा दिनांक:', 'Filed on:')} {app.appliedDate} &bull; {t('अपेक्षित RTS समयसीमा:', 'Expected by:')}{' '}
                    {app.estimatedDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/track?id=${app.id}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 px-4 rounded-xl transition-colors"
                  >
                    {t('स्थिति देखें', 'Track Live')}
                  </Link>

                  {app.status === 'approved' && (
                    <Link
                      href={`/track?id=${app.id}`}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 px-4 rounded-xl transition-colors"
                    >
                      {t('प्रमाण पत्र डाउनलोड 📥', 'Download Cert 📥')}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: DigiLocker Vault */}
        {activeTab === 'digilocker' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { nameHi: 'आधार कार्ड (UIDAI)', nameEn: 'Aadhaar Card (UIDAI)', id: 'XXXX-XXXX-9182', date: 'Verified 14 Sep' },
              { nameHi: 'राशन कार्ड (NFSA)', nameEn: 'Ration Card (NFSA)', id: 'UK-RAT-482910', date: 'Verified 10 Oct' },
              { nameHi: 'कक्षा 10वीं मार्कशीट (UK Board)', nameEn: 'Class 10th Marksheet (UK Board)', id: 'Roll: 2618902', date: 'Verified 18 Oct' },
              { nameHi: 'ड्राइविंग लाइसेंस (RTO Dehradun)', nameEn: 'Driving License (RTO UK-07)', id: 'UK-07-2018-0912', date: 'Verified 20 Oct' },
            ].map((doc, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <span className="text-3xl p-2 bg-blue-50 rounded-xl">🪪</span>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    DigiLocker Linked ✓
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-sm mt-1">
                    {lang === 'hi' ? doc.nameHi : doc.nameEn}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">{doc.id}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{doc.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Grievances */}
        {activeTab === 'grievances' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                  GRV-2026-4819
                </span>
                <h4 className="font-extrabold text-slate-900 text-base mt-2">
                  {t('आय प्रमाण पत्र में पटवारी स्थलीय सत्यापन में देरी', 'Delay in Income Certificate Field Verification')}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {t('राजस्व विभाग, देहरादून सदर', 'Revenue Department, Dehradun Sadar')} &bull; 21 Oct 2026
                </p>
              </div>

              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                {t('जांच प्रगति पर (3 दिन शेष)', 'Investigation in progress (3 days left)')}
              </span>
            </div>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {t(
                'तहसीलदार कार्यालय द्वारा संबंधित क्षेत्रीय लेखपाल को 24 घंटे के भीतर स्थलीय आख्या प्रस्तुत करने हेतु अनुस्मारक (Notice) प्रेषित कर दिया गया है।',
                'Reminder issued by Tehsildar office to Area Lekhpal to submit field report within 24 hours.'
              )}
            </p>
          </div>
        )}
      </main>
    );
  }

  // LOGIN SCREEN
  return (
    <main className="w-full max-w-xl mx-auto px-4 py-12 pb-32">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md text-center">
        {/* Emblem */}
        <div className="w-16 h-16 bg-linear-to-br from-emerald-700 to-green-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-sm">
          उ
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {t('नागरिक खाता / लॉगिन', 'Citizen Portal Login')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t(
            'आधार अथवा मोबाइल ओटीपी से सुरक्षित और पेपरलेस लॉगिन करें',
            'Secure paperless login with Aadhaar OTP or Mobile Number'
          )}
        </p>

        {view === 'select' && (
          <div className="mt-8 space-y-3">
            <button
              onClick={() => {
                setView('aadhaar');
                setOtpSent(false);
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold p-4 rounded-2xl shadow-xs transition-all flex items-center justify-between active:scale-95"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🪪</span>
                <div className="text-left">
                  <p className="text-sm font-bold leading-tight">{t('आधार OTP से लॉगिन करें', 'Login with Aadhaar OTP')}</p>
                  <p className="text-[11px] text-emerald-200">{t('डिजिटल इंडिया eKYC आधारित', 'Instant Aadhaar eKYC')}</p>
                </div>
              </div>
              <span className="text-lg">→</span>
            </button>

            <button
              onClick={() => {
                setView('mobile');
                setOtpSent(false);
              }}
              className="w-full bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 font-bold p-4 rounded-2xl transition-all flex items-center justify-between active:scale-95"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <p className="text-sm font-bold leading-tight">{t('मोबाइल नंबर OTP से लॉगिन', 'Login with Mobile OTP')}</p>
                  <p className="text-[11px] text-slate-400">{t('पंजीकृत फोन नंबर द्वारा', 'Using registered mobile number')}</p>
                </div>
              </div>
              <span className="text-lg text-slate-400">→</span>
            </button>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/services"
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                {t('अतिथि के रूप में सीधे सेवाएं देखें →', 'Continue as guest to view services →')}
              </Link>
            </div>
          </div>
        )}

        {/* Aadhaar or Mobile OTP input */}
        {(view === 'aadhaar' || view === 'mobile') && (
          <div className="mt-6 text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                {view === 'aadhaar' ? t('आधार नंबर (12 अंक)', 'Aadhaar Number (12 digits)') : t('मोबाइल नंबर (10 अंक)', 'Mobile Number')}
              </span>
              <button
                onClick={() => setView('select')}
                className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
              >
                ← {t('बदलें', 'Change')}
              </button>
            </div>

            {view === 'aadhaar' ? (
              <input
                type="text"
                value={aadhaarInput}
                onChange={e => setAadhaarInput(e.target.value)}
                className="input-field font-mono font-bold text-base tracking-widest text-center"
              />
            ) : (
              <input
                type="tel"
                value={mobileInput}
                onChange={e => setMobileInput(e.target.value)}
                className="input-field font-mono font-bold text-base tracking-widest text-center"
              />
            )}

            {!otpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-xs transition-all"
              >
                {t('OTP भेजें', 'Send Verification Code (OTP)')}
              </button>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs text-emerald-800 text-center">
                  {t('OTP भेजा गया: 123456 (डेमो)', 'Demo OTP: 123456 sent.')}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {t('6 अंकों का OTP दर्ज करें', 'Enter 6-digit OTP')}
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpValue}
                    onChange={e => setOtpValue(e.target.value)}
                    placeholder="123456"
                    className="input-field font-mono text-center text-xl font-bold tracking-widest"
                  />
                </div>

                <button
                  onClick={handleVerify}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-xs transition-all"
                >
                  {t('सत्यापित करें व लॉगिन करें ✓', 'Verify & Enter Portal ✓')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
