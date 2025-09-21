// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/components/providers/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js 스타일링 튜토리얼',
    default: 'Next.js 스타일링 튜토리얼',
  },
  description: 'Material-UI와 함께 하는 Next.js 스타일링 가이드',
  keywords: ['Next.js', 'React', 'Material-UI', 'TypeScript', 'Styling'],
  authors: [{ name: 'Development Team' }],
  creator: 'Next.js Tutorial',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'Next.js 스타일링 튜토리얼',
    description: 'Material-UI와 함께 하는 Next.js 스타일링 가이드',
    siteName: 'Next.js Tutorial',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js 스타일링 튜토리얼',
    description: 'Material-UI와 함께 하는 Next.js 스타일링 가이드',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}