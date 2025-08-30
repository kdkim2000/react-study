// src/app/products/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 실제 API 대신 모의 데이터 사용
      const mockProducts: Product[] = [
        {
          id: 1,
          title: "MacBook Pro 16인치",
          price: 2499,
          description: "Apple M2 Max 칩이 탑재된 고성능 노트북입니다.",
          category: "electronics",
          image: "/placeholder-laptop.jpg",
          rating: { rate: 4.8, count: 120 }
        },
        {
          id: 2,
          title: "무선 이어폰",
          price: 199,
          description: "노이즈 캔슬링 기능이 있는 프리미엄 무선 이어폰입니다.",
          category: "electronics",
          image: "/placeholder-earphone.jpg",
          rating: { rate: 4.5, count: 89 }
        },
        {
          id: 3,
          title: "스마트워치",
          price: 299,
          description: "건강 모니터링과 피트니스 추적이 가능한 스마트워치입니다.",
          category: "electronics",
          image: "/placeholder-watch.jpg",
          rating: { rate: 4.2, count: 156 }
        },
        {
          id: 4,
          title: "운동화",
          price: 129,
          description: "편안한 착용감과 뛰어난 내구성을 자랑하는 운동화입니다.",
          category: "clothing",
          image: "/placeholder-shoes.jpg",
          rating: { rate: 4.6, count: 203 }
        }
      ]
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProducts(mockProducts)
    } catch (err) {
      setError('상품을 불러오는데 실패했습니다.')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">상품을 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">오류가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={fetchProducts}>다시 시도</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">상품 목록</h1>
        <Button onClick={fetchProducts}>새로고침</Button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex space-x-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? '전체' : category}
          </Button>
        ))}
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">선택한 카테고리에 상품이 없습니다.</p>
        </div>
      )}
    </div>
  )
}

// 상품 카드 컴포넌트
function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-gray-400">이미지</span>
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 flex-1">
          {product.description}
        </p>
        
        <div className="space-y-3">
          {/* 평점 */}
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{product.rating.rate}</span>
            <span className="text-sm text-gray-500">({product.rating.count})</span>
          </div>
          
          {/* 가격 */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
            <Button size="sm">장바구니</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}