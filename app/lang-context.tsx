'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'hi' | 'en';
type FontScale = 'normal' | 'large' | 'xlarge';

interface ToastMessage {
  id: string;
  title: string;
  body: string;
  type?: 'info' | 'success' | 'warning';
}

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  setLanguage: (l: Lang) => void;
  t: (hi: string, en: string) => string;
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  cycleFontScale: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  showToast: (title: string, body: string, type?: 'info' | 'success' | 'warning') => void;
  speak: (text: string) => void;
}

const LangCtx = createContext<LangContextType>({
  lang: 'hi',
  toggle: () => {},
  setLanguage: () => {},
  t: (hi, _en) => hi,
  fontScale: 'normal',
  setFontScale: () => {},
  cycleFontScale: () => {},
  highContrast: false,
  toggleHighContrast: () => {},
  showToast: () => {},
  speak: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('hi');
  const [fontScale, setFontScale] = useState<FontScale>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('jan_sahayak_lang') as Lang;
      if (savedLang === 'hi' || savedLang === 'en') {
        setLang(savedLang);
      }
      const savedScale = localStorage.getItem('jan_sahayak_scale') as FontScale;
      if (savedScale) setFontScale(savedScale);

      const savedContrast = localStorage.getItem('jan_sahayak_contrast');
      if (savedContrast === 'true') setHighContrast(true);
    } catch {
      // ignore
    }
  }, []);

  const toggle = () => {
    setLang(prev => {
      const next = prev === 'hi' ? 'en' : 'hi';
      try {
        localStorage.setItem('jan_sahayak_lang', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const setLanguage = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem('jan_sahayak_lang', l);
    } catch {
      // ignore
    }
  };

  const cycleFontScale = () => {
    setFontScale(prev => {
      const next = prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal';
      try {
        localStorage.setItem('jan_sahayak_scale', next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const next = !prev;
      try {
        localStorage.setItem('jan_sahayak_contrast', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const showToast = (title: string, body: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, body, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5500);
  };

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch {
      // speech synthesis fallback
    }
  };

  const t = (hi: string, en: string) => (lang === 'hi' ? hi : en);

  const fontScaleClass =
    fontScale === 'large' ? 'text-[1.08rem]' : fontScale === 'xlarge' ? 'text-[1.18rem]' : '';

  return (
    <LangCtx.Provider
      value={{
        lang,
        toggle,
        setLanguage,
        t,
        fontScale,
        setFontScale,
        cycleFontScale,
        highContrast,
        toggleHighContrast,
        showToast,
        speak,
      }}
    >
      <div
        className={`${fontScaleClass} ${
          highContrast ? 'contrast-125 dark:bg-black font-semibold' : ''
        } min-h-screen transition-all`}
      >
        {children}

        {/* Global Toast Stack */}
        <aside
          aria-live="polite"
          aria-atomic="true"
          className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-3 pointer-events-none"
        >
          {toasts.map(toast => (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto rounded-2xl p-4 shadow-xl border animate-in slide-in-from-top-2 duration-200 ${
                toast.type === 'success'
                  ? 'bg-green-900 text-white border-green-700'
                  : toast.type === 'warning'
                  ? 'bg-amber-900 text-white border-amber-700'
                  : 'bg-slate-900 text-white border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0" aria-hidden="true">
                  {toast.type === 'success' ? '✅' : toast.type === 'warning' ? '⚠️' : '📱'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm tracking-wide">{toast.title}</p>
                  <p className="text-xs opacity-90 mt-1 leading-relaxed break-words">{toast.body}</p>
                </div>
                <button
                  onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="text-white/60 hover:text-white text-sm"
                  aria-label="Close notification"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
