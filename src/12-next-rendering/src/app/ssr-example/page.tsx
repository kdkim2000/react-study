// app/ssr-example/page.tsx
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 서버에서 데이터를 가져오는 함수
async function getPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    // Next.js 15+에서는 기본적으로 캐시되므로, 실시간 데이터가 필요한 경우 no-store 사용
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export default async function SSRExample() {
  // 서버에서 데이터를 가져옴
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        SSR Example - Server Side Rendering
      </h1>
      
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800">
          이 페이지는 서버에서 렌더링되었습니다. 페이지 소스를 확인하면 완전한 HTML 내용을 볼 수 있습니다.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{post.body}</p>
            <div className="mt-4 text-sm text-gray-500">
              User ID: {post.userId} | Post ID: {post.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 메타데이터 생성 (SSR에서도 가능)
export async function generateMetadata() {
  return {
    title: 'SSR Example - Next.js',
    description: 'Server-side rendering example with Next.js App Router',
  };
}