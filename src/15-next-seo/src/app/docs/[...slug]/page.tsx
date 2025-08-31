// app/docs/[...slug]/page.tsx
interface DocsProps {
  params: {
    slug: string[];
  };
}

export default function Docs({ params }: DocsProps) {
  const { slug } = params;
  
  return (
    <div>
      <h1>문서 경로: {slug.join('/')}</h1>
    </div>
  );
}