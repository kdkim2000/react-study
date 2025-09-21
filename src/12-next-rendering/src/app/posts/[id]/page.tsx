// app/posts/[id]/page.tsx
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// 동적 경로를 위한 매개변수 생성
export async function generateStaticParams() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json());
  
  // 처음 10개 포스트만 정적 생성
  return posts.slice(0, 10).map((post: Post) => ({
    id: post.id.toString(),
  }));
}

// 포스트 데이터 가져오기
async function getPost(id: string): Promise<Post> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return response.json();
}

// 사용자 데이터 가져오기
async function getUser(userId: number): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  
  return response.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const user = await getUser(post.userId);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {post.title}
        </h1>
        <div className="text-sm text-gray-500">
          작성자: {user.name} ({user.email}) | 포스트 ID: {post.id}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <p className="text-gray-700 leading-relaxed text-lg">
          {post.body}
        </p>
      </div>
    </div>
  );
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  
  return {
    title: `${post.title} - Next.js Blog`,
    description: post.body.substring(0, 160),
  };
}