// src/app/hybrid-example/page.tsx
import { Suspense } from 'react';
import { Post } from '@/types';

// 정적 데이터 (SSG)
async function getStaticPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
  return response.json();
}

// 동적 데이터 (SSR)
async function getDynamicPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_start=3&_limit=3', {
    cache: 'no-store'
  });
  return response.json();
}

// 클라이언트 컴포넌트 (CSR)
function ClientComponent() {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-semibold text-blue-800 mb-2">클라이언트 컴포넌트</h3>
      <p className="text-blue-700 text-sm">
        이 부분은 클라이언트에서 렌더링되며, 상태 관리와 이벤트 처리가 가능합니다.
      </p>
      <button 
        onClick={() => alert('클라이언트에서 실행됩니다!')}
        className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        클릭해보세요
      </button>
    </div>
  );
}

// 로딩 컴포넌트
function PostsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-6 rounded mb-2"></div>
          <div className="bg-gray-200 h-20 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// 동적 포스트 컴포넌트
async function DynamicPosts() {
  const posts = await getDynamicPosts();
  
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">동적 콘텐츠 (SSR)</h3>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-800">{post.title}</h4>
            <p className="text-gray-600 text-sm mt-2">{post.body}</p>
            <span className="text-xs text-gray-500">
              렌더링 시간: {new Date().toLocaleTimeString('ko-KR')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HybridExample() {
  const staticPosts = await getStaticPosts();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        하이브리드 렌더링 예제
      </h1>
      
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          이 페이지는 SSG, SSR, CSR을 모두 조합하여 사용합니다. 각 섹션의 렌더링 방식을 확인해보세요.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 정적 콘텐츠 (SSG) */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            정적 콘텐츠 (SSG)
          </h2>
          <div className="space-y-4">
            {staticPosts.map((post) => (
              <div key={post.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-medium text-gray-800">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{post.body}</p>
                <span className="text-xs text-green-600">빌드 시점에 생성됨</span>
              </div>
            ))}
          </div>
        </div>

        {/* 동적 콘텐츠 (SSR) */}
        <div>
          <Suspense fallback={<PostsLoading />}>
            <DynamicPosts />
          </Suspense>
        </div>
      </div>

      {/* 클라이언트 컴포넌트 (CSR) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          클라이언트 상호작용 (CSR)
        </h2>
        <ClientComponent />
      </div>
    </div>
  );
}