// src/app/page.tsx
'use client'

import { useState } from 'react'

export default function HomePage() {
  const [message, setMessage] = useState('Next.js에 오신 것을 환영합니다!')
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
    setMessage(`버튼을 ${count + 1}번 클릭했습니다!`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Vue 개발자를 위한 Next.js 가이드
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">상태 관리 예제</h2>
        <p className="mb-4 text-gray-700">{message}</p>
        <button 
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          클릭하세요! (카운트: {count})
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard 
          title="파일 기반 라우팅"
          description="Vue Router 설정 없이 파일 구조로 라우팅이 결정됩니다."
        />
        <FeatureCard 
          title="서버 사이드 렌더링"
          description="기본적으로 SSR을 지원하여 SEO와 성능이 뛰어납니다."
        />
      </div>
    </div>
  )
}

// 컴포넌트 분리 예제
function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-blue-600">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}