// app/blog/[id]/page.tsx
interface BlogPostProps {
  params: {
    id: string;
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const { id } = params;
  
  return (
    <div>
      <h1>블로그 포스트 ID: {id}</h1>
    </div>
  );
}