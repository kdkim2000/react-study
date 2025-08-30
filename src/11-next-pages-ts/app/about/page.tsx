// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">회사 소개</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">우리의 미션</h2>
        <p className="text-gray-700 mb-6">
          Vue.js 개발자들이 Next.js를 쉽게 배울 수 있도록 돕는 것이 우리의 목표입니다.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">핵심 가치</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>쉽고 친근한 학습 경험</li>
          <li>실무에 바로 적용 가능한 예제</li>
          <li>지속적인 업데이트와 개선</li>
        </ul>
      </div>
    </div>
  )
}