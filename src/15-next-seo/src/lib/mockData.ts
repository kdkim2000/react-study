// lib/mockData.ts
import { BlogPost } from '@/types/blog';

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'nextjs-15-new-features',
    title: 'Next.js 15의 새로운 기능들과 Turbopack 활용법',
    content: `
      <h2>Next.js 15의 주요 변화점</h2>
      <p>Next.js 15는 웹 개발의 새로운 패러다임을 제시합니다. 특히 Turbopack의 통합으로 개발 경험이 크게 향상되었습니다.</p>
      
      <h3>1. Turbopack 통합</h3>
      <p>Turbopack은 Rust 기반의 차세대 번들러로, 기존 Webpack 대비 700배 빠른 성능을 자랑합니다.</p>
      <pre><code>npm run dev -- --turbo</code></pre>
      
      <h3>2. App Router 안정화</h3>
      <p>App Router가 완전히 안정화되어 프로덕션에서 안전하게 사용할 수 있습니다.</p>
      
      <blockquote>
        "Next.js 15는 개발자 경험과 성능 모두에서 큰 도약을 이뤘습니다."
      </blockquote>
      
      <h3>3. 새로운 Metadata API</h3>
      <p>SEO 최적화를 위한 새로운 Metadata API가 도입되었습니다.</p>
      
      <ul>
        <li>동적 메타데이터 생성</li>
        <li>자동 OG 이미지 생성</li>
        <li>구조화된 데이터 지원</li>
      </ul>
    `,
    excerpt: 'Next.js 15의 새로운 기능들과 Turbopack을 활용한 개발 환경 최적화 방법을 알아봅니다.',
    author: {
      name: '김개발',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: '풀스택 개발자로 Next.js와 React 생태계에 관심이 많습니다.',
    },
    publishedAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    tags: ['Next.js', 'Turbopack', 'React', '웹개발'],
    category: 'Frontend',
    readTime: 8,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  },
  {
    id: '2',
    slug: 'typescript-advanced-patterns',
    title: 'TypeScript 고급 패턴과 실무 활용법',
    content: `
      <h2>TypeScript로 더 안전한 코드 작성하기</h2>
      <p>TypeScript의 고급 기능들을 활용해 더욱 안전하고 유지보수하기 쉬운 코드를 작성하는 방법을 알아봅니다.</p>
      
      <h3>1. Generic 활용</h3>
      <p>Generic을 사용하여 재사용 가능한 컴포넌트를 만들 수 있습니다.</p>
      <pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}</code></pre>
      
      <h3>2. Union Types와 Discriminated Unions</h3>
      <p>복잡한 상태 관리를 위한 Union Types 활용법입니다.</p>
      
      <h3>3. Utility Types 마스터하기</h3>
      <ul>
        <li>Partial&lt;T&gt;</li>
        <li>Required&lt;T&gt;</li>
        <li>Pick&lt;T, K&gt;</li>
        <li>Omit&lt;T, K&gt;</li>
      </ul>
    `,
    excerpt: 'TypeScript의 고급 기능들을 실무에 적용하여 더 안전한 코드를 작성하는 방법을 다룹니다.',
    author: {
      name: '박타입',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'TypeScript 전도사이자 오픈소스 컨트리뷰터입니다.',
    },
    publishedAt: '2024-03-10T14:30:00Z',
    updatedAt: '2024-03-10T14:30:00Z',
    tags: ['TypeScript', 'JavaScript', '타입시스템'],
    category: 'Programming',
    readTime: 12,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
  },
  {
    id: '3',
    slug: 'material-ui-design-system',
    title: 'Material-UI로 일관된 디자인 시스템 구축하기',
    content: `
      <h2>확장 가능한 디자인 시스템</h2>
      <p>Material-UI를 활용해 확장 가능하고 일관된 디자인 시스템을 구축하는 방법을 알아봅니다.</p>
      
      <h3>1. 테마 커스터마이징</h3>
      <p>브랜드에 맞는 테마를 생성하고 관리하는 방법입니다.</p>
      
      <h3>2. 컴포넌트 스타일링 전략</h3>
      <ul>
        <li>sx prop 활용</li>
        <li>styled() API 사용</li>
        <li>useTheme 훅 활용</li>
      </ul>
      
      <h3>3. 반응형 디자인</h3>
      <p>Material-UI의 breakpoint 시스템을 활용한 반응형 디자인 구현법입니다.</p>
    `,
    excerpt: 'Material-UI를 사용하여 확장 가능하고 일관된 디자인 시스템을 구축하는 실무 가이드입니다.',
    author: {
      name: '이디자인',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'UI/UX 디자이너이자 프론트엔드 개발자입니다.',
    },
    publishedAt: '2024-03-05T11:15:00Z',
    updatedAt: '2024-03-05T11:15:00Z',
    tags: ['Material-UI', 'Design System', 'UI/UX'],
    category: 'Design',
    readTime: 10,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=400&fit=crop',
  },
];