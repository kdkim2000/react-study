// app/category/[category]/post/[id]/page.tsx
interface CategoryPostProps {
  params: {
    category: string;
    id: string;
  };
}

export default function CategoryPost({ params }: CategoryPostProps) {
  const { category, id } = params;
  
  return (
    <div>
      <h1>카테고리: {category}</h1>
      <h2>포스트 ID: {id}</h2>
    </div>
  );
}