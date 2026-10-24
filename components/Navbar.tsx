'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '../app/lang-context';

export default function Navbar() {
  const { lang, toggle, fontScale, cycleFontScale, highContrast, toggleHighContrast, t } = useLang();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', labelHi: 'होम', labelEn: 'Home' },
    { href: '/services', labelHi: 'सेवाएं', labelEn: 'Services' },
    { href: '/track', labelHi: 'स्थिति ट्रैक करें', labelEn: 'Track Status' },
    { href: '/timeline', labelHi: 'RTS समयसीमा', labelEn: 'RTS Timelines' },
    { href: '/guide', labelHi: 'प्रमाण पत्र गाइड', labelEn: 'Guide' },
    { href: '/documents', labelHi: 'दस्तावेज़ सूची', labelEn: 'Documents' },
    { href: '/grievance', labelHi: 'शिकायत निवारण', labelEn: 'Grievance' },
    { href: '/verify', labelHi: 'सत्यापन', labelEn: 'Verify' },
    { href: '/account', labelHi: 'नागरिक खाता', labelEn: 'Citizen Portal' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Gov Tricolor & Accessibility Strip */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="font-medium tracking-wide">
              {t('उत्तराखण्ड शासन | आधिकारिक नागरिक सेवा पोर्टल', 'Govt of Uttarakhand | Official Citizen Services')}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">ITDA P-013 UKIS</span>
          </div>

          {/* Accessibility Quick Tools */}
          <div className="flex items-center gap-3">
            <button
              onClick={cycleFontScale}
              title={t('अक्षर का आकार बदलें', 'Adjust Font Size')}
              aria-label={t('अक्षर का आकार बदलें', 'Adjust Font Size')}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono font-bold transition-colors"
            >
              A{fontScale === 'large' ? '+' : fontScale === 'xlarge' ? '++' : ''}
            </button>
            <button
              onClick={toggleHighContrast}
              title={t('हाई कंट्रास्ट मोड', 'Toggle High Contrast')}
              aria-label={t('हाई कंट्रास्ट मोड', 'Toggle High Contrast')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                highContrast ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {highContrast ? '⚡ High-C' : '🌓 Contrast'}
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={toggle}
              aria-label={lang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-2.5 py-0.5 rounded-full transition-all focus:ring-2 focus:ring-emerald-400"
            >
              {lang === 'hi' ? 'English (EN)' : 'हिंदी (हि)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & Crest */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 bg-linear-to-br from-green-700 to-emerald-900 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform" aria-hidden="true">
            <span>उ</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-widest leading-none">
                {t('अपणी सरकार', 'Apuni Sarkar')}
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                2.0
              </span>
            </div>
            <h1 className="font-extrabold text-slate-900 text-lg leading-tight tracking-tight">
              {t('जन सहायक', 'Jan Sahayak')}
            </h1>
            <p className="text-[11px] text-slate-500 leading-none hidden sm:block">
              {t('नागरिक-प्रथम ई-सेवाएं उत्तराखण्ड', 'Citizen-First e-Services of Uttarakhand')}
            </p>
          </div>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Desktop primary navigation">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {lang === 'hi' ? link.labelHi : link.labelEn}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/track"
            className="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 transition-colors"
          >
            <span>🔍</span>
            <span>{t('ट्रैक करें', 'Track App')}</span>
          </Link>

          <Link
            href="/account"
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>👤</span>
            <span className="hidden sm:inline">{t('खाता / लॉगिन', 'Citizen Login')}</span>
            <span className="sm:hidden">{t('लॉगिन', 'Login')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
