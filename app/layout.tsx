import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LangProvider } from './lang-context';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import AIAssistantModal from '../components/AIAssistantModal';

export const metadata: Metadata = {
  title: 'Jan Sahayak (जन सहायक) — Apuni Sarkar e-Services Uttarakhand',
  description:
    'Citizen-First UI/UX Redesign of Uttarakhand Apuni Sarkar e-Services portal. Fast, accessible, mobile & desktop optimized public service delivery under RTS Act.',
  keywords: [
    'Uttarakhand',
    'Apuni Sarkar',
    'Jan Sahayak',
    'Income Certificate',
    'Domicile Certificate',
    'ITDA',
    'e-District',
    'UKIS Hackathon',
  ],
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#15803d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 flex flex-col min-h-screen" suppressHydrationWarning>
        <LangProvider>
          <Navbar />
          <div className="flex-1 w-full">
            {children}
          </div>
          <Footer />
          <BottomNav />
          <AIAssistantModal />
        </LangProvider>
      </body>
    </html>
  );
}
