// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Rendering Tutorial',
  description: 'Learn about different rendering strategies in Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-bold cursor-pointer hover:text-gray-300">
                Next.js Rendering Tutorial
              </h1>
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                홈
              </Link>
              <Link href="/csr-example" className="hover:text-gray-300 transition-colors">
                CSR
              </Link>
              <Link href="/ssr-example" className="hover:text-gray-300 transition-colors">
                SSR
              </Link>
              <Link href="/ssg-example" className="hover:text-gray-300 transition-colors">
                SSG
              </Link>
              <Link href="/isr-example" className="hover:text-gray-300 transition-colors">
                ISR
              </Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}