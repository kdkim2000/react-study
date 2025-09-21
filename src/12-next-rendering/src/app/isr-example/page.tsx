// app/isr-example/page.tsx
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  timestamp?: string;
}

// ISR을 위한 데이터 가져오기 (60초마다 재생성)
async function getPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    next: { revalidate: 60 } // 60초마다 재검증
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const posts: Post[] = await response.json();
  
  // 현재 시간 추가 (데이터 업데이트 확인용)
  return posts.map(post => ({
    ...post,
    timestamp: new Date().toISOString()
  }));
}

export default async function ISRExample() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        ISR Example - Incremental Static Regeneration
      </h1>
      
      <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-purple-800">
          이 페이지는 60초마다 백그라운드에서 재생성됩니다. 
          정적 페이지의 성능과 동적 콘텐츠의 신선함을 모두 제공합니다.
        </p>
        <p className="text-purple-600 text-sm mt-2">
          마지막 업데이트: {posts[0]?.timestamp ? new Date(posts[0].timestamp).toLocaleString('ko-KR') : 'N/A'}
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