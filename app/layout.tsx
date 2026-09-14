import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LangProvider } from './lang-context'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Jan Sahayak — Apuni Sarkar',
  description: 'Uttarakhand सरकारी सेवाएं — आसान, तेज़, मोबाइल पर',
  icons: { icon: '/favicon.ico' }
}

export const viewport: Viewport = {
  themeColor: '#15803d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <LangProvider>{children}</LangProvider>
        <Analytics />
      </body>
    </html>
  )
}