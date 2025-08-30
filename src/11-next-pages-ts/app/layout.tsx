// src/app/layout.tsx (업데이트된 버전)
import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next.js 교육',
  description: 'Vue 개발자를 위한 Next.js 가이드',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        {/* 전역 헤더 */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">Next.js 교육 사이트</h1>
          </div>
        </header>
        
        {/* 네비게이션 */}
        <Navigation />
        
        {/* 메인 콘텐츠 */}
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        
        {/* 전역 푸터 */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Next.js 교육. All rights reserved.</p>
            <p className="mt-2 text-gray-400">Vue 개발자를 위한 친절한 Next.js 가이드</p>
          </div>
        </footer>
      </body>
    </html>
  )
}