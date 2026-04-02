import './globals.css';

import type { Metadata, Viewport } from 'next';
import { UIProvider } from '@whispa/web-ui/components';
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google';
import { cn } from '@whispa/web-ui/utils';
import uiConfig from '@/configs/ui';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin']
});

const notoMono = Noto_Sans_Mono({
  variable: '--font-noto-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: 'https://whispa.sdsarun.dev',
  title: {
    default: 'Whispa',
    template: '%s | Whispa'
  },
  description:
    'Whispa is a place for spontaneous, meaningful conversations with people around the world.',
  keywords: ['Whispa', 'chat', 'conversation', 'social', 'random chat', 'friends', 'voice', 'video'],
  applicationName: 'Whispa',
  authors: [{ name: 'Whispa' }],
  openGraph: {
    title: 'Whispa',
    description:
      'Drop into spontaneous conversations with people across the globe. Meet, chat, and discover.',
    url: 'https://whispa.sdsarun.dev',
    siteName: 'Whispa',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whispa',
    description:
      'Drop into spontaneous conversations with people across the globe. Meet, chat, and discover.'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff'
};

export default function GlobalLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(notoSans.variable, notoMono.variable, 'antialiased')}
      suppressHydrationWarning
    >
      <body className="bg-white/80 dark:bg-gray-950/80">
        <UIProvider
          globalTokenConfig={uiConfig.globalTokenConfig}
          componentThemeConfig={uiConfig.componentThemeConfig}
          themeProviderProps={{
            attribute: ['class', 'data-theme']
          }}
        >
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
