// src/app/performance-example/page.tsx
import { Suspense } from 'react';
import Image from 'next/image';
import { Post } from '@/types';

// 이미지 최적화를 위한 컴포넌트
function OptimizedImage({ src, alt, width = 300, height = 200 }: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="rounded-lg"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      priority={false}
    />
  );
}

// 지연 로딩되는 무거운 컴포넌트
async function HeavyComponent() {
  // 의도적인 지연 (무거운 계산 시뮬레이션)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2', {
    next: { revalidate: 60 }
  }).then(res => res.json());

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">무거운 컴포넌트 (지연 로딩)</h3>
      {posts.map((post: Post) => (
        <div key={post.id} className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium">{post.title}</h4>
          <p className="text-gray-600 text-sm mt-2">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

// 스켈레톤 로딩 컴포넌트
function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded"></div>
      {[1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default function PerformanceExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        성능 최적화 예제
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 이미지 최적화 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">이미지 최적화</h2>
          <div className="space-y-4">
            <OptimizedImage
              src="https://picsum.photos/300/200?random=1"
              alt="최적화된 이미지 1"
            />
            <p className="text-sm text-gray-600">
              Next.js Image 컴포넌트를 사용하여 자동 최적화, 지연 로딩, WebP 변환 등을 적용했습니다.
            </p>
          </div>
        </div>

        {/* 지연 로딩 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">컴포넌트 지연 로딩</h2>
          <Suspense fallback={<SkeletonLoader />}>
            <HeavyComponent />
          </Suspense>
        </div>
      </div>

      {/* 성능 팁 */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">성능 최적화 팁</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">권장사항</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Next.js Image 컴포넌트 사용</li>
              <li>• Suspense와 함께 지연 로딩 활용</li>
              <li>• 적절한 캐싱 전략 선택</li>
              <li>• 코드 분할(Code Splitting) 적용</li>
              <li>• 불필요한 리렌더링 방지</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">피해야 할 것</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 모든 페이지를 SSR로 구현</li>
              <li>• 과도한 클라이언트 상태 관리</li>
              <li>• 큰 번들 크기</li>
              <li>• 불필요한 useEffect 사용</li>
              <li>• 이미지 최적화 무시</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}