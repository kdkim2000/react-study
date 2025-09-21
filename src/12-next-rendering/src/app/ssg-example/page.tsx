
// app/ssg-example/page.tsx
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 정적 데이터 가져오기 (빌드 시점에 실행)
async function getPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export default async function SSGExample() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        SSG Example - Static Site Generation
      </h1>
      
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800">
          이 페이지는 빌드 시점에 정적으로 생성되었습니다. 매우 빠른 로딩 속도를 제공합니다.
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