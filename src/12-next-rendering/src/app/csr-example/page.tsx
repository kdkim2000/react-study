// src/app/csr-example/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';

export default function CSRExample() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // 의도적으로 지연 시간 추가 (CSR의 특성을 보여주기 위해)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          CSR Example - Client Side Rendering
        </h1>
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">클라이언트에서 데이터를 로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          CSR Example - Client Side Rendering
        </h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        CSR Example - Client Side Rendering
      </h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="font-semibold text-blue-800 mb-2">CSR 특징:</h2>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• 페이지 소스 보기를 하면 빈 HTML을 확인할 수 있습니다</li>
          <li>• JavaScript가 실행된 후에 콘텐츠가 나타납니다</li>
          <li>• 초기 로딩 시 스피너가 표시됩니다</li>
          <li>• SEO에는 불리하지만 상호작용이 빠릅니다</li>
        </ul>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{post.body}</p>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                User ID: {post.userId} | Post ID: {post.id}
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                자세히 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}