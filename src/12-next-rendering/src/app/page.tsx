// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  const examples = [
    {
      title: 'CSR (Client-Side Rendering)',
      description: '클라이언트에서 데이터를 가져와 렌더링합니다.',
      href: '/csr-example',
      color: 'bg-blue-500',
    },
    {
      title: 'SSR (Server-Side Rendering)',
      description: '서버에서 데이터를 가져와 렌더링합니다.',
      href: '/ssr-example',
      color: 'bg-green-500',
    },
    {
      title: 'SSG (Static Site Generation)',
      description: '빌드 시점에 정적 페이지를 생성합니다.',
      href: '/ssg-example',
      color: 'bg-purple-500',
    },
    {
      title: 'ISR (Incremental Static Regeneration)',
      description: '정적 페이지를 주기적으로 업데이트합니다.',
      href: '/isr-example',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Next.js 렌더링 방식 이해
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          CSR, SSR, SSG, ISR의 차이점을 실제 예제를 통해 학습해보세요.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {examples.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3 ${example.color}`}>
              {example.title.split(' ')[0]}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
              {example.title}
            </h2>
            <p className="text-gray-600">
              {example.description}
            </p>
            <div className="mt-4 text-blue-600 font-medium group-hover:text-blue-800">
              예제 보기 →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          각 렌더링 방식 비교
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700">렌더링 방식</th>
                <th className="py-3 px-4 font-semibold text-gray-700">실행 시점</th>
                <th className="py-3 px-4 font-semibold text-gray-700">초기 로딩</th>
                <th className="py-3 px-4 font-semibold text-gray-700">SEO</th>
                <th className="py-3 px-4 font-semibold text-gray-700">사용 사례</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-blue-600">CSR</td>
                <td className="py-3 px-4 text-gray-600">클라이언트</td>
                <td className="py-3 px-4 text-gray-600">느림</td>
                <td className="py-3 px-4 text-gray-600">불리</td>
                <td className="py-3 px-4 text-gray-600">대시보드, SPA</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-green-600">SSR</td>
                <td className="py-3 px-4 text-gray-600">서버</td>
                <td className="py-3 px-4 text-gray-600">빠름</td>
                <td className="py-3 px-4 text-gray-600">유리</td>
                <td className="py-3 px-4 text-gray-600">뉴스, 블로그</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-purple-600">SSG</td>
                <td className="py-3 px-4 text-gray-600">빌드 시점</td>
                <td className="py-3 px-4 text-gray-600">매우 빠름</td>
                <td className="py-3 px-4 text-gray-600">매우 유리</td>
                <td className="py-3 px-4 text-gray-600">문서, 랜딩 페이지</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-orange-600">ISR</td>
                <td className="py-3 px-4 text-gray-600">하이브리드</td>
                <td className="py-3 px-4 text-gray-600">빠름</td>
                <td className="py-3 px-4 text-gray-600">유리</td>
                <td className="py-3 px-4 text-gray-600">전자상거래, CMS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}