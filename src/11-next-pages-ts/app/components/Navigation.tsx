// src/app/components/Navigation.tsx (업데이트된 버전)
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '홈', icon: '🏠' },
    { href: '/about', label: '소개', icon: 'ℹ️' },
    { href: '/dashboard', label: '대시보드', icon: '📊' },
    { href: '/products', label: '상품', icon: '🛍️' },
    { href: '/contact', label: '문의', icon: '📞' },
  ]

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8 py-4 overflow-x-auto">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`flex items-center space-x-2 font-medium transition-colors whitespace-nowrap ${
                  pathname === item.href 
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}