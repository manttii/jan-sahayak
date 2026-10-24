'use client';
import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLang } from '../../lang-context';
import { ALL_SERVICES, UTTARAKHAND_DISTRICTS, StoredApplication } from '../../data/services';

export default function DynamicApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { lang, t, showToast } = useLang();
  const service = ALL_SERVICES.find(s => s.id === resolvedParams.id);

  if (!service) {
    notFound();
  }

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: 'राम कुमार शर्मा (Ram Kumar Sharma)',
    fatherName: 'श्री महेश कुमार',
    dob: '1996-05-14',
    gender: 'Male',
    mobile: '9876543210',
    district: 'Dehradun (देहरादून)',
    tehsil: 'देहरादून सदर',
    address: 'मकान नं 42, रायपुर रोड, देहरादून, उत्तराखण्ड',
    customValues: {} as Record<string, string>,
  });

  const [uploadedDocs, setUploadedDocs] = useState<Record<string, { name: string; isDigilocker: boolean }>>({
    aadhar: { name: 'Aadhaar_UIDAI_Verified.xml', isDigilocker: true },
  });

  const [isDigilockerLoading, setIsDigilockerLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<StoredApplication | null>(null);

  const steps = [
    { hi: 'आवेदक विवरण', en: 'Applicant Info' },
    { hi: 'सेवा विवरण', en: 'Service Details' },
    { hi: 'दस्तावेज़ एवं डिजीलॉकर', en: 'Documents & DigiLocker' },
    { hi: 'समीक्षा व शुल्क', en: 'Review & Submit' },
  ];

  const handleCustomFieldChange = (name: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      customValues: { ...prev.customValues, [name]: val },
    }));
  };

  const handleDigiLockerFetchAll = () => {
    setIsDigilockerLoading(true);
    setTimeout(() => {
      setIsDigilockerLoading(false);
      const updated = { ...uploadedDocs };
      service.requiredDocs.forEach(d => {
        if (d.digilockerAvailable) {
          updated[d.id] = { name: `${d.en}_DigiLocker_Verified.pdf`, isDigilocker: true };
        }
      });
      setUploadedDocs(updated);
      showToast(
        t('डिजीलॉकर से दस्तावेज़ प्राप्त', 'DigiLocker Documents Fetched'),
        t('आधार एवं राज्य अभिलेखों से 3 दस्तावेज़ सफलतापूर्वक जुड़े।', 'Documents successfully retrieved & verified via DigiLocker.'),
        'success'
      );
    }, 1200);
  };

  const handleSubmit = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const prefix = service.id.toUpperCase().slice(0, 3);
    const generatedId = `UK-${prefix}-2026-${randomNum}`;

    const today = new Date();
    const appliedStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const estDate = new Date();
    estDate.setDate(today.getDate() + service.days);
    const estStr = estDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newApp: StoredApplication = {
      id: generatedId,
      serviceId: service.id,
      serviceNameHi: service.hi,
      serviceNameEn: service.en,
      applicantName: formData.name,
      mobile: formData.mobile,
      district: formData.district,
      tehsil: formData.tehsil,
      appliedDate: appliedStr,
      estimatedDate: estStr,
      status: 'submitted',
      statusLabelHi: 'आवेदन ऑनलाइन जमा हुआ (सत्यापन प्रक्रियाधीन)',
      statusLabelEn: 'Application Submitted Online (Scrutiny Pending)',
      stages: [
        {
          titleHi: 'आवेदन सीएससी/पोर्टल पर दर्ज',
          titleEn: 'Application Submitted Online',
          officerHi: 'नागरिक स्व-सेवा पोर्टल',
          officerEn: 'Citizen Self Portal',
          date: `${appliedStr}, Just now`,
          done: true,
          active: false,
        },
        {
          titleHi: 'दस्तावेज़ प्रारंभिक सत्यापन',
          titleEn: 'Document Scrutiny Verified',
          officerHi: 'तहसील लिपिक (Clerk)',
          officerEn: 'Tehsil Scrutiny Clerk',
          date: 'अपेक्षित: 24 घंटे में',
          done: false,
          active: true,
        },
        {
          titleHi: 'पटवारी / लेखपाल स्थलीय जांच',
          titleEn: 'Patwari Field Verification',
          officerHi: 'क्षेत्रीय लेखपाल',
          officerEn: 'Area Lekhpal',
          date: 'प्रक्रियाधीन',
          done: false,
          active: false,
        },
        {
          titleHi: 'तहसीलदार/एसडीएम अंतिम स्वीकृति',
          titleEn: 'Tehsildar/SDM Final Approval',
          officerHi: service.departmentHi,
          officerEn: service.departmentEn,
          date: 'लंबित',
          done: false,
          active: false,
        },
        {
          titleHi: 'डिजिटल प्रमाण पत्र जारी',
          titleEn: 'Digital Certificate Issued',
          officerHi: 'अपणी सरकार डिजिटल सिग्नेचर सर्वर',
          officerEn: 'Apuni Sarkar Digital Signer',
          date: 'लंबित',
          done: false,
          active: false,
        },
      ],
    };

    // Save into localStorage
    try {
      const existing = localStorage.getItem('jan_sahayak_applications');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newApp);
      localStorage.setItem('jan_sahayak_applications', JSON.stringify(list));
    } catch {
      // ignore
    }

    setSubmittedApp(newApp);
    showToast(
      t('आवेदन सफलतापूर्वक जमा हुआ!', 'Application Submitted!'),
      t(`आवेदन संख्या: ${generatedId}। SMS आपके नंबर पर भेज दिया गया है।`, `Ref ID: ${generatedId}. Confirmation SMS dispatched.`),
      'success'
    );
  };

  // SUCCESS SCREEN
  if (submittedApp) {
    return (
      <main className="w-full max-w-4xl mx-auto px-4 py-8 pb-28">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
            ✅
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            {t('सफल आवेदन', 'Submission Success')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            {t('आपका आवेदन सफलतापूर्वक दर्ज हो गया है!', 'Application Successfully Filed!')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
            {t(
              'उत्तराखण्ड सेवा का अधिकार (RTS) के तहत आपका आवेदन संबंधित सक्षम अधिकारी को अग्रेषित कर दिया गया है।',
              'Forwarded to competent Tehsil authorities under Uttarakhand Right to Services statutory guarantee.'
            )}
          </p>

          {/* Acknowledgement Slip Container */}
          <div className="mt-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-6 text-left max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {t('उत्तराखण्ड ई-डिस्ट्रिक्ट पावती रसीद', 'e-District Acknowledgement Slip')}
                </p>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {lang === 'hi' ? service.hi : service.en}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 block sm:inline">
                  {submittedApp.id}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div>
                <span className="text-slate-400 block">{t('आवेदक का नाम', 'Applicant')}</span>
                <span className="font-bold text-slate-800">{submittedApp.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('मोबाइल नंबर', 'Mobile')}</span>
                <span className="font-bold text-slate-800">{submittedApp.mobile}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('जिला / तहसील', 'District/Tehsil')}</span>
                <span className="font-bold text-slate-800">{submittedApp.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('जमा तिथि', 'Date Filed')}</span>
                <span className="font-bold text-slate-800">{submittedApp.appliedDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('RTS अधिकतम समयसीमा', 'RTS SLA Limit')}</span>
                <span className="font-bold text-emerald-700">{service.days} {t('कार्य दिवस', 'Working Days')}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('अपेक्षित जारी तिथि', 'Expected Date')}</span>
                <span className="font-bold text-emerald-700">{submittedApp.estimatedDate}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <p className="text-[11px] text-slate-500">
                  {t('प्रत्येक चरण पर SMS अपडेट भेजा जाएगा।', 'Live SMS updates active on your mobile.')}
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>🖨️</span>
                <span>{t('रसीद प्रिंट करें', 'Print Slip')}</span>
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link
              href={`/track?id=${submittedApp.id}`}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>📍</span>
              <span>{t('लाइव स्थिति ट्रैक करें', 'Track Application Live')}</span>
            </Link>
            <Link
              href="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 px-6 rounded-2xl transition-all"
            >
              {t('होम पेज पर वापस जाएं', 'Return to Home')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // MULTI-STEP WIZARD
  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-8 pb-32">
      {/* Service Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/services"
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors"
            aria-label="Back to services"
          >
            ←
          </Link>
          <span className="text-4xl p-2 bg-emerald-50 rounded-2xl">{service.emoji}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {lang === 'hi' ? service.hi : service.en}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'hi' ? service.departmentHi : service.departmentEn} &bull; {service.days} {t('दिन (RTS)', 'Days (RTS)')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
          <span className="font-bold text-slate-700">{t('शुल्क:', 'Fee:')}</span>
          <span className="font-bold text-emerald-700">{lang === 'hi' ? service.feeHi : service.fee}</span>
        </div>
      </div>

      {/* Step Progress Indicator */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  idx < step
                    ? 'bg-emerald-700 text-white'
                    : idx === step
                    ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 shadow-sm'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {idx < step ? '✓' : idx + 1}
              </div>
              <span
                className={`text-[10px] sm:text-xs font-bold mt-1 text-center truncate max-w-[80px] sm:max-w-none ${
                  idx === step ? 'text-emerald-800' : 'text-slate-400'
                }`}
              >
                {lang === 'hi' ? s.hi : s.en}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 0: Personal Info */}
      {step === 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            {t('चरण 1: आवेदक का व्यक्तिगत विवरण', 'Step 1: Applicant Personal Information')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('आवेदक का पूरा नाम *', 'Full Name (as per Aadhaar) *')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('पिता / पति का नाम *', "Father's / Husband's Name *")}
              </label>
              <input
                type="text"
                value={formData.fatherName}
                onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('जन्म तिथि (Date of Birth) *', 'Date of Birth *')}
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('मोबाइल नंबर (SMS अपडेट हेतु) *', 'Mobile Number (for SMS) *')}
              </label>
              <input
                type="tel"
                maxLength={10}
                value={formData.mobile}
                onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                className="input-field font-mono"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('जिला (District) *', 'District *')}
              </label>
              <select
                value={formData.district}
                onChange={e => setFormData({ ...formData, district: e.target.value })}
                className="input-field"
              >
                {UTTARAKHAND_DISTRICTS.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {t('तहसील (Tehsil) *', 'Tehsil *')}
              </label>
              <input
                type="text"
                value={formData.tehsil}
                onChange={e => setFormData({ ...formData, tehsil: e.target.value })}
                placeholder="e.g. Dehradun Sadar, Rishikesh"
                className="input-field"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t('स्थायी पता (गाँव/मोहल्ला, पोस्ट, पिन कोड) *', 'Permanent Address (Village, Post, PIN) *')}
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="input-field resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 1: Service Specific Fields */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900">
              {t(`चरण 2: ${service.hi} विशिष्ट विवरण`, `Step 2: ${service.en} Specifics`)}
            </h2>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
              {service.days} {t('दिन SLA', 'Days SLA')}
            </span>
          </div>

          <div className="space-y-4">
            {service.customFields && service.customFields.length > 0 ? (
              service.customFields.map(field => (
                <div key={field.name}>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'hi' ? field.labelHi : field.labelEn} {field.required && '*'}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      value={formData.customValues[field.name] || ''}
                      onChange={e => handleCustomFieldChange(field.name, e.target.value)}
                      className="input-field"
                    >
                      <option value="">{t('चुनें (Select)...', 'Select...')}</option>
                      {field.options?.map((opt, i) => (
                        <option key={i} value={opt.en}>
                          {lang === 'hi' ? opt.hi : opt.en}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData.customValues[field.name] || ''}
                      onChange={e => handleCustomFieldChange(field.name, e.target.value)}
                      placeholder={lang === 'hi' ? field.placeholderHi : field.placeholderEn}
                      className="input-field"
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-600">
                {t(
                  'इस सेवा के लिए कोई अतिरिक्त विशेष फॉर्म फ़ील्ड आवश्यक नहीं है। सीधे अगले चरण पर जाएं।',
                  'No specialized extra parameters needed. Proceed directly to document validation.'
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Documents & DigiLocker */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {t('चरण 3: दस्तावेज़ एवं डिजीलॉकर सत्यापन', 'Step 3: Documents & DigiLocker Fetch')}
              </h2>
              <p className="text-xs text-slate-500">
                {t(
                  'डिजीलॉकर से स्वतः आयात करें अथवा अपने फोन/कंप्यूटर से फाइल अपलोड करें।',
                  'Auto-import verified files from DigiLocker or upload from device.'
                )}
              </p>
            </div>

            {/* Fast 1-Click DigiLocker Auto-Fetch Button */}
            <button
              onClick={handleDigiLockerFetchAll}
              disabled={isDigilockerLoading}
              className="bg-linear-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
            >
              <span>⚡</span>
              <span>
                {isDigilockerLoading
                  ? t('डिजीलॉकर से जुड़ रहा है...', 'Connecting to DigiLocker...')
                  : t('डिजीलॉकर से 1-क्लिक आयात', '1-Click DigiLocker Import')}
              </span>
            </button>
          </div>

          {/* List of Documents */}
          <div className="space-y-3">
            {service.requiredDocs.map(doc => {
              const isAttached = uploadedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isAttached
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{isAttached ? '📄' : '📎'}</span>
                    <div>
                      <p className="font-bold text-sm text-slate-900 leading-tight">
                        {lang === 'hi' ? doc.hi : doc.en}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            doc.required
                              ? 'bg-red-100 text-red-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {doc.required ? t('⚠️ अनिवार्य', '⚠️ Required') : t('वैकल्पिक', 'Optional')}
                        </span>

                        {doc.digilockerAvailable && (
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                            DigiLocker ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Upload State */}
                  <div>
                    {isAttached ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
                          <span>✅</span>
                          <span className="truncate max-w-[150px]">{isAttached.name}</span>
                        </span>
                        <button
                          onClick={() => {
                            const updated = { ...uploadedDocs };
                            delete updated[doc.id];
                            setUploadedDocs(updated);
                          }}
                          className="text-xs text-red-600 hover:underline"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setUploadedDocs({
                            ...uploadedDocs,
                            [doc.id]: { name: `${doc.en}_Manual_Upload.pdf`, isDigilocker: false },
                          });
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5"
                      >
                        <span>📷</span>
                        <span>{t('अपलोड करें', 'Upload')}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            {t('चरण 4: आवेदन समीक्षा एवं वैधानिक घोषणा', 'Step 4: Review Application & Declaration')}
          </h2>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">{t('सेवा का नाम', 'Service Name')}</span>
              <span className="font-bold text-slate-900">{lang === 'hi' ? service.hi : service.en}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">{t('आवेदक का नाम', 'Applicant Name')}</span>
              <span className="font-bold text-slate-900">{formData.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">{t('पिता/पति', "Father's Name")}</span>
              <span className="font-bold text-slate-900">{formData.fatherName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">{t('मोबाइल', 'Mobile')}</span>
              <span className="font-bold text-slate-900">{formData.mobile}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">{t('जिला / तहसील', 'District/Tehsil')}</span>
              <span className="font-bold text-slate-900">{formData.district} / {formData.tehsil}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">{t('सरकारी शुल्क (Fee)', 'Government Fee')}</span>
              <span className="font-bold text-emerald-700">{lang === 'hi' ? service.feeHi : service.fee}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">{t('दस्तावेज़ स्थिति', 'Uploaded Documents')}</span>
              <span className="font-bold text-emerald-700">
                {Object.keys(uploadedDocs).length} {t('संलग्न', 'Attached')} ✓
              </span>
            </div>
          </div>

          {/* Legal Undertaking */}
          <label className="flex items-start gap-3 bg-amber-50/70 border border-amber-200 rounded-2xl p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 accent-emerald-700 shrink-0"
            />
            <span className="text-xs text-amber-950 leading-relaxed">
              {t(
                'मैं प्रमाणित करता/करती हूँ कि आवेदन में दी गई सभी सूचनाएं पूर्णतः सत्य व प्रामाणिक हैं। गलत तथ्य प्रस्तुत करने पर धारा 199/200 भा.दं.सं. के अधीन विधिक कार्यवाही का उत्तरदायित्व मेरा होगा।',
                'I hereby certify that all information submitted is true and authentic. Any false declaration will make me liable for statutory legal prosecution under applicable laws.'
              )}
            </span>
          </label>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3.5 px-4 z-30 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all"
            >
              {t('← पीछे (Back)', '← Back')}
            </button>
          ) : (
            <Link
              href="/services"
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition-all"
            >
              {t('रद्द करें', 'Cancel')}
            </Link>
          )}

          <div className="flex items-center gap-2">
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-2xl shadow-md transition-all active:scale-95"
              >
                {t('आगे बढ़ें →', 'Next Step →')}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!agreed}
                className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm px-8 py-3 rounded-2xl shadow-lg transition-all active:scale-95"
              >
                {t('✅ आवेदन अंतिम रूप से जमा करें', '✅ Final Submit Application')}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
