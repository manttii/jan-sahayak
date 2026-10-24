'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from '../app/lang-context';

export default function BottomNav() {
  const { lang } = useLang();
  const pathname = usePathname();

  const navItems = [
    { icon: '🏠', labelHi: 'होम', labelEn: 'Home', href: '/' },
    { icon: '📋', labelHi: 'सेवाएं', labelEn: 'Services', href: '/services' },
    { icon: '🔍', labelHi: 'स्थिति', labelEn: 'Track', href: '/track' },
    { icon: '📢', labelHi: 'शिकायत', labelEn: 'Grievance', href: '/grievance' },
    { icon: '👤', labelHi: 'खाता', labelEn: 'Account', href: '/account' },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40 pb-safe"
      aria-label={lang === 'hi' ? 'मुख्य मोबाइल नेविगेशन' : 'Mobile navigation'}
    >
      <div className="max-w-xl mx-auto flex justify-around py-2 px-1">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              aria-label={lang === 'hi' ? item.labelHi : item.labelEn}
              className="flex-1"
            >
              <div
                className={`flex flex-col items-center py-1.5 px-2 rounded-2xl transition-all ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="text-xl" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-[11px] mt-0.5 tracking-tight">
                  {lang === 'hi' ? item.labelHi : item.labelEn}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
