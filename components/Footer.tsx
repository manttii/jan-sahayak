'use client';
import Link from 'next/link';
import { useLang } from '../app/lang-context';

export default function Footer() {
  const { lang, t } = useLang();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                उ
              </div>
              <div>
                <p className="font-bold text-white text-base">
                  {t('जन सहायक (Jan Sahayak)', 'Jan Sahayak')}
                </p>
                <p className="text-xs text-slate-400">
                  {t('अपणी सरकार ई-सेवाएं पुनर्कल्पना', 'Apuni Sarkar Redesign Prototype')}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t(
                'उत्तराखण्ड नवाचार एवं समाधान हैकाथॉन (UKIS 2026) के समस्या कथन P-013 के अंतर्गत विकसित। उद्देश्य: उत्तराखण्ड के दूरस्थ पर्वतीय एवं मैदानी नागरिकों तक सरकारी सेवाओं की सुगम, पारदर्शी एवं तीव्र डिजिटल पहुंच सुनिश्चित करना।',
                'Developed for the Uttarakhand Innovation & Solution Hackathon (UKIS 2026) under Problem Statement P-013. Empowering citizens across hill and plain districts with transparent, rapid, mobile-first e-governance.'
              )}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-md border border-slate-700">
                ✓ ITDA Compliant
              </span>
              <span className="text-[11px] bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-md border border-slate-700">
                ✓ WCAG 2.2 AA
              </span>
              <span className="text-[11px] bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-md border border-slate-700">
                ✓ RTS Guaranteed
              </span>
              <span className="text-[11px] bg-slate-800 text-emerald-400 px-2.5 py-1 rounded-md border border-slate-700">
                ✓ DigiLocker Ready
              </span>
            </div>
          </div>

          {/* Col 2: Essential Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              {t('प्रमुख सेवाएं', 'Key Services')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/apply/income" className="hover:text-emerald-400 transition-colors">
                  {t('आय प्रमाण पत्र (Income)', 'Income Certificate')}
                </Link>
              </li>
              <li>
                <Link href="/apply/domicile" className="hover:text-emerald-400 transition-colors">
                  {t('स्थायी/मूल निवास (Domicile)', 'Domicile Certificate')}
                </Link>
              </li>
              <li>
                <Link href="/apply/caste" className="hover:text-emerald-400 transition-colors">
                  {t('जाति प्रमाण पत्र (Caste)', 'Caste Certificate')}
                </Link>
              </li>
              <li>
                <Link href="/apply/character" className="hover:text-emerald-400 transition-colors">
                  {t('चरित्र प्रमाण पत्र (Character)', 'Character Certificate')}
                </Link>
              </li>
              <li>
                <Link href="/apply/hilly" className="hover:text-emerald-400 transition-colors">
                  {t('पर्वतीय क्षेत्र प्रमाण (Hill Cert)', 'Hilly Area Certificate')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-emerald-400 font-semibold hover:underline block pt-1">
                  {t('सभी 12+ सेवाएं देखें →', 'View all 12+ services →')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Citizen Portals */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              {t('नागरिक अधिकार', 'Citizen Charter')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/timeline" className="hover:text-emerald-400 transition-colors">
                  {t('RTS सेवा समयसीमा (SLA)', 'RTS Delivery Timelines')}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-emerald-400 transition-colors">
                  {t('आवेदन स्थिति खोजें', 'Track Application')}
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-emerald-400 transition-colors">
                  {t('डिजिटल प्रमाण पत्र सत्यापन', 'Verify Certificate')}
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-emerald-400 transition-colors">
                  {t('दस्तावेज़ पूर्व-जांच सूची', 'Document Checklist')}
                </Link>
              </li>
              <li>
                <Link href="/grievance" className="hover:text-emerald-400 transition-colors">
                  {t('1905 सीएम हेल्पलाइन शिकायत', 'Grievance Redressal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Helplines & Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
              {t('सहायता एवं हेल्पलाइन', 'Helpline & Contact')}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-[11px]">{t('निःशुल्क हेल्पलाइन', 'Toll-Free Helpline')}</p>
                <a href="tel:18001804188" className="text-emerald-400 font-extrabold text-base block mt-0.5">
                  1800-180-4188
                </a>
                <p className="text-[10px] text-slate-500 mt-0.5">{t('सोम-शनि | 9:00 AM - 6:00 PM', 'Mon-Sat | 9 AM - 6 PM')}</p>
              </div>

              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <p className="text-slate-400 text-[11px]">{t('सीएम हेल्पलाइन', 'CM Citizen Helpline')}</p>
                <a href="tel:1905" className="text-amber-400 font-extrabold text-base block mt-0.5">
                  1905 (24x7)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 {t('उत्तराखण्ड शासन | सूचना प्रौद्योगिकी विकास एजेंसी (ITDA)', 'Government of Uttarakhand | ITDA')}.
          </p>
          <p className="text-slate-400">
            {t('डिजाइन एवं विकसित: मनित शर्मा (UKIS हैकाथॉन)', 'Designed & Engineered by Manit Sharma (UKIS Hackathon)')}
          </p>
        </div>
      </div>
    </footer>
  );
}
