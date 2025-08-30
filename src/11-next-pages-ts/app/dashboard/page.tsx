// src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

interface DashboardData {
  totalUsers: number
  totalOrders: number
  revenue: number
  activeUsers: number
}

interface RecentOrder {
  id: number
  customer: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  date: string
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 모의 데이터 로딩
    const loadDashboardData = async () => {
      setLoading(true)
      
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setData({
        totalUsers: 1234,
        totalOrders: 567,
        revenue: 89012,
        activeUsers: 234
      })
      
      setRecentOrders([
        { id: 1, customer: '김철수', amount: 45000, status: 'completed', date: '2024-01-15' },
        { id: 2, customer: '이영희', amount: 32000, status: 'pending', date: '2024-01-14' },
        { id: 3, customer: '박민수', amount: 67000, status: 'completed', date: '2024-01-14' },
        { id: 4, customer: '정수현', amount: 23000, status: 'cancelled', date: '2024-01-13' },
      ])
      
      setLoading(false)
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">대시보드</h1>
        <Button onClick={() => window.location.reload()}>
          새로고침
        </Button>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="전체 사용자"
          value={data?.totalUsers || 0}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="전체 주문"
          value={data?.totalOrders || 0}
          icon="📦"
          color="green"
        />
        <StatCard
          title="총 매출"
          value={`₩${(data?.revenue || 0).toLocaleString()}`}
          icon="💰"
          color="yellow"
        />
        <StatCard
          title="활성 사용자"
          value={data?.activeUsers || 0}
          icon="🔥"
          color="red"
        />
      </div>

      {/* 최근 주문 목록 */}
      <Card title="최근 주문">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">주문 ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">고객명</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">금액</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">상태</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">날짜</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4 font-medium">{order.customer}</td>
                  <td className="py-3 px-4">₩{order.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 차트 영역 (모의) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="월별 매출">
          <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">차트가 여기에 표시됩니다</p>
          </div>
        </Card>
        <Card title="사용자 증가율">
          <div className="h-64 bg-gradient-to-r from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">차트가 여기에 표시됩니다</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

// 통계 카드 컴포넌트
interface StatCardProps {
  title: string
  value: string | number
  icon: string
  color: 'blue' | 'green' | 'yellow' | 'red'
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`${colorClasses[color]} p-3 rounded-full text-white text-xl`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

// 상태 뱃지 컴포넌트
function StatusBadge({ status }: { status: RecentOrder['status'] }) {
  const statusConfig = {
    pending: { text: '대기중', color: 'bg-yellow-100 text-yellow-800' },
    completed: { text: '완료', color: 'bg-green-100 text-green-800' },
    cancelled: { text: '취소', color: 'bg-red-100 text-red-800' }
  }

  const config = statusConfig[status]

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
      {config.text}
    </span>
  )
}

// 로딩 스피너 컴포넌트
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-gray-600">데이터를 불러오는 중...</p>
    </div>
  )
}