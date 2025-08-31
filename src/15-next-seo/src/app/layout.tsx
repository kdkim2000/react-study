// app/layout.tsx 수정
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CustomThemeProvider from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Blog',
  description: '개발과 기술에 대한 인사이트를 공유하는 블로그',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}