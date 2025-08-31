// app/shop/[[...category]]/page.tsx
interface ShopProps {
  params: {
    category?: string[];
  };
}

export default function Shop({ params }: ShopProps) {
  const { category = [] } = params;
  
  if (category.length === 0) {
    return <div>전체 상품</div>;
  }
  
  return (
    <div>
      <h1>카테고리: {category.join(' > ')}</h1>
    </div>
  );
}