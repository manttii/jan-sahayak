'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lang-context';
import { ALL_SERVICES } from '../data/services';

interface RTSCharterItem {
  serviceId: string;
  nameHi: string;
  nameEn: string;
  days: number;
  designatedOfficerHi: string;
  designatedOfficerEn: string;
  firstAppellateHi: string;
  firstAppellateEn: string;
  secondAppellateHi: string;
  secondAppellateEn: string;
}

const RTS_CHARTERS: RTSCharterItem[] = [
  {
    serviceId: 'income',
    nameHi: 'आय प्रमाण पत्र (Income Certificate)',
    nameEn: 'Income Certificate',
    days: 7,
    designatedOfficerHi: 'तहसीलदार / नायब तहसीलदार',
    designatedOfficerEn: 'Tehsildar / Nayab Tehsildar',
    firstAppellateHi: 'उप जिलाधिकारी (SDM)',
    firstAppellateEn: 'Sub-Divisional Magistrate (SDM)',
    secondAppellateHi: 'जिलाधिकारी (DM)',
    secondAppellateEn: 'District Magistrate (DM)',
  },
  {
    serviceId: 'domicile',
    nameHi: 'स्थायी / मूल निवास प्रमाण पत्र (Domicile)',
    nameEn: 'Domicile Certificate',
    days: 15,
    designatedOfficerHi: 'तहसीलदार',
    designatedOfficerEn: 'Tehsildar',
    firstAppellateHi: 'उप जिलाधिकारी (SDM)',
    firstAppellateEn: 'Sub-Divisional Magistrate (SDM)',
    secondAppellateHi: 'जिलाधिकारी (DM)',
    secondAppellateEn: 'District Magistrate (DM)',
  },
  {
    serviceId: 'caste',
    nameHi: 'जाति प्रमाण पत्र (SC/ST/OBC/EWS)',
    nameEn: 'Caste Certificate',
    days: 14,
    designatedOfficerHi: 'तहसीलदार',
    designatedOfficerEn: 'Tehsildar',
    firstAppellateHi: 'उप जिलाधिकारी (SDM)',
    firstAppellateEn: 'Sub-Divisional Magistrate (SDM)',
    secondAppellateHi: 'जिलाधिकारी (DM)',
    secondAppellateEn: 'District Magistrate (DM)',
  },
  {
    serviceId: 'birth',
    nameHi: 'जन्म प्रमाण पत्र (Birth Registration)',
    nameEn: 'Birth Certificate',
    days: 7,
    designatedOfficerHi: 'रजिस्ट्रार (जन्म-मृत्यु) / ग्राम विकास अधिकारी',
    designatedOfficerEn: 'Registrar (Birth & Death) / VDO',
    firstAppellateHi: 'खण्ड विकास अधिकारी (BDO) / अधिशासी अधिकारी (EO)',
    firstAppellateEn: 'Block Development Officer / Executive Officer',
    secondAppellateHi: 'मुख्य चिकित्सा अधिकारी (CMO)',
    secondAppellateEn: 'Chief Medical Officer (CMO)',
  },
  {
    serviceId: 'character',
    nameHi: 'चरित्र प्रमाण पत्र (Character Verification)',
    nameEn: 'Character Certificate',
    days: 10,
    designatedOfficerHi: 'प्रभारी निरीक्षक / थानाध्यक्ष (SHO)',
    designatedOfficerEn: 'Station House Officer (SHO / Kotwali)',
    firstAppellateHi: 'क्षेत्राधिकारी (CO Police)',
    firstAppellateEn: 'Circle Officer (CO Police)',
    secondAppellateHi: 'वरिष्ठ पुलिस अधीक्षक (SSP / SP)',
    secondAppellateEn: 'Senior Superintendent of Police (SSP)',
  },
  {
    serviceId: 'marriage',
    nameHi: 'विवाह पंजीकरण (Marriage Registration)',
    nameEn: 'Marriage Registration',
    days: 15,
    designatedOfficerHi: 'उप-पंजीयक (Sub-Registrar)',
    designatedOfficerEn: 'Sub-Registrar',
    firstAppellateHi: 'जिला पंजीयक (District Registrar)',
    firstAppellateEn: 'District Registrar',
    secondAppellateHi: 'महानिरीक्षक निबंधन (IG Registration)',
    secondAppellateEn: 'Inspector General of Registration',
  },
  {
    serviceId: 'hilly',
    nameHi: 'पर्वतीय क्षेत्र प्रमाण पत्र (Hill Certificate)',
    nameEn: 'Hilly Area Certificate',
    days: 7,
    designatedOfficerHi: 'तहसीलदार',
    designatedOfficerEn: 'Tehsildar',
    firstAppellateHi: 'उप जिलाधिकारी (SDM)',
    firstAppellateEn: 'Sub-Divisional Magistrate (SDM)',
    secondAppellateHi: 'जिलाधिकारी (DM)',
    secondAppellateEn: 'District Magistrate (DM)',
  },
  {
    serviceId: 'pariwar',
    nameHi: 'परिवार रजिस्टर नकल (Pariwar Register Copy)',
    nameEn: 'Pariwar Register Copy',
    days: 3,
    designatedOfficerHi: 'ग्राम पंचायत विकास अधिकारी (VPDO)',
    designatedOfficerEn: 'Village Panchayat Development Officer',
    firstAppellateHi: 'सहायक विकास अधिकारी (पंचायत) / ADO',
    firstAppellateEn: 'Assistant Development Officer (Panchayat)',
    secondAppellateHi: 'जिला पंचायत राज अधिकारी (DPRO)',
    secondAppellateEn: 'District Panchayat Raj Officer (DPRO)',
  },
];

export default function TimelinePage() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState('');

  const filtered = RTS_CHARTERS.filter(
    c =>
      !filter ||
      c.nameHi.toLowerCase().includes(filter.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(filter.toLowerCase()) ||
      c.designatedOfficerHi.toLowerCase().includes(filter.toLowerCase()) ||
      c.designatedOfficerEn.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-8 pb-32">
      {/* Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {t('उत्तराखण्ड लोक सेवा का अधिकार अधिनियम, 2011', 'Uttarakhand Right to Services Act, 2011')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t('नागरिक अधिकार पत्र एवं सेवा समयसीमा (SLA)', 'Citizen Charter & Statutory Delivery SLAs')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                'उत्तराखण्ड शासन द्वारा प्रत्येक नागरिक सेवा हेतु कानूनन अधिकतम समयसीमा निर्धारित है। निर्धारित अवधि में सेवा न मिलने पर उत्तरदायी अधिकारी पर ₹250 प्रति दिन की दर से अर्थदण्ड का कानूनी प्रावधान है।',
                'Strict statutory timeframes guaranteed by law. Officers causing undue delay without justified reason are subject to mandatory penalties under Section 19 of the RTS Act.'
              )}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0">
            <p className="text-3xl font-black text-amber-300">₹250 / {t('दिन', 'Day')}</p>
            <p className="text-xs text-slate-200 mt-1 font-medium">
              {t('देरी पर विधिक प्रतिकर', 'Statutory Delay Penalty')}
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder={t('सेवा अथवा अधिकारी खोजें...', 'Filter by service or officer...')}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <p className="text-xs text-slate-500 shrink-0 font-medium">
          {t(`${filtered.length} सेवाएं सूचीबद्ध`, `${filtered.length} services listed`)}
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-4 px-6">{t('सेवा का नाम', 'Service Name')}</th>
              <th className="py-4 px-4 text-center">{t('अधिकतम दिन (SLA)', 'Maximum Days')}</th>
              <th className="py-4 px-4">{t('नामित अधिकारी', 'Designated Officer')}</th>
              <th className="py-4 px-4">{t('प्रथम अपीलीय अधिकारी', '1st Appellate Authority')}</th>
              <th className="py-4 px-4">{t('द्वितीय अपीलीय अधिकारी', '2nd Appellate Authority')}</th>
              <th className="py-4 px-6 text-right">{t('त्वरित आवेदन', 'Action')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(item => (
              <tr key={item.serviceId} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                  {lang === 'hi' ? item.nameHi : item.nameEn}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-black px-3 py-1 rounded-full text-xs">
                    {item.days} {t('दिन', 'Days')}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-700 font-medium">
                  {lang === 'hi' ? item.designatedOfficerHi : item.designatedOfficerEn}
                </td>
                <td className="py-4 px-4 text-slate-600">
                  {lang === 'hi' ? item.firstAppellateHi : item.firstAppellateEn}
                </td>
                <td className="py-4 px-4 text-slate-600">
                  {lang === 'hi' ? item.secondAppellateHi : item.secondAppellateEn}
                </td>
                <td className="py-4 px-6 text-right">
                  <Link
                    href={`/apply/${item.serviceId}`}
                    className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-1.5 px-3.5 rounded-xl transition-all shadow-xs"
                  >
                    {t('आवेदन →', 'Apply →')}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Responsive Cards */}
      <div className="lg:hidden space-y-4 mb-8">
        {filtered.map(item => (
          <div key={item.serviceId} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm">
                {lang === 'hi' ? item.nameHi : item.nameEn}
              </h3>
              <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-2.5 py-1 rounded-full shrink-0">
                ⏱ {item.days} {t('दिन', 'Days')}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <p>
                <span className="text-slate-400 font-semibold">{t('नामित अधिकारी: ', 'Designated Officer: ')}</span>
                <span className="font-bold text-slate-800">{lang === 'hi' ? item.designatedOfficerHi : item.designatedOfficerEn}</span>
              </p>
              <p>
                <span className="text-slate-400 font-semibold">{t('1st अपील: ', '1st Appeal: ')}</span>
                <span className="text-slate-700">{lang === 'hi' ? item.firstAppellateHi : item.firstAppellateEn}</span>
              </p>
              <p>
                <span className="text-slate-400 font-semibold">{t('2nd अपील: ', '2nd Appeal: ')}</span>
                <span className="text-slate-700">{lang === 'hi' ? item.secondAppellateHi : item.secondAppellateEn}</span>
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/apply/${item.serviceId}`}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl text-center block"
              >
                {t('ऑनलाइन आवेदन करें →', 'Apply Online →')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* RTS Commission Redressal Help Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🏛️</span>
          <div>
            <h4 className="font-black text-sm sm:text-base">
              {t('उत्तराखण्ड सेवा का अधिकार आयोग (RTS Commission)', 'Uttarakhand Right to Services Commission')}
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              {t('यदि द्वितीय अपील के बाद भी सेवा प्राप्त नहीं होती, तो सीधे आयोग में परिवाद दर्ज करें।', 'If services are not rendered after second appeal, file direct petition to the Commission.')}
            </p>
          </div>
        </div>
        <Link
          href="/grievance"
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-3 px-5 rounded-2xl shrink-0 transition-all shadow-xs"
        >
          {t('शिकायत दर्ज करें', 'File RTS Complaint')}
        </Link>
      </div>
    </main>
  );
}
