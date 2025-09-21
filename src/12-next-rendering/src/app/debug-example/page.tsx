// src/app/debug-example/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function DebugExample() {
  const [renderInfo, setRenderInfo] = useState({
    renderTime: '',
    userAgent: '',
    isClient: false,
  });

  useEffect(() => {
    setRenderInfo({
      renderTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      isClient: true,
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        개발 도구 및 디버깅
      </h1>

      {/* 렌더링 정보 */}
      <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">렌더링 정보</h2>
        <div className="space-y-2 text-sm">
          <div>
            <strong>렌더링 시간:</strong> {renderInfo.renderTime}
          </div>
          <div>
            <strong>클라이언트 렌더링:</strong> {renderInfo.isClient ? '예' : '아니오'}
          </div>
          <div>
            <strong>User Agent:</strong> 
            <div className="mt-1 p-2 bg-white border rounded text-xs break-all">
              {renderInfo.userAgent || '서버에서는 사용할 수 없음'}
            </div>
          </div>
        </div>
      </div>

      {/* Next.js 개발 도구 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Next.js 개발 도구</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">개발 모드 명령어</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`# 개발 서버 시작
npm run dev

# 빌드 및 분석
npm run build
npm run start

# 번들 분석
npx @next/bundle-analyzer`}
            </pre>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-green-600 mb-2">유용한 환경변수</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development

# 분석 모드
ANALYZE=true npm run build`}
            </pre>
          </div>
        </div>
      </div>

      {/* 성능 측정 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-4">성능 측정 도구</h2>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• <strong>React Developer Tools:</strong> 컴포넌트 트리와 프로파일링</li>
          <li>• <strong>Chrome DevTools:</strong> 네트워크, 성능, Lighthouse</li>
          <li>• <strong>Next.js Speed Insights:</strong> 실제 사용자 성능 데이터</li>
          <li>• <strong>Vercel Analytics:</strong> 웹 바이탈 모니터링</li>
        </ul>
      </div>
    </div>
  );
}