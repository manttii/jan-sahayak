'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'hi' | 'en';
const LangCtx = createContext<{ lang: Lang; toggle: () => void }>({ lang: 'hi', toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('hi');
  return (
    <LangCtx.Provider value={{ lang, toggle: () => setLang(l => l === 'hi' ? 'en' : 'hi') }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
