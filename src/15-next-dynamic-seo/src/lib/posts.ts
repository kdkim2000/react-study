export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;   // ISO
  tags: string[];
};

export const POSTS: Post[] = [
  {
    slug: 'hello-app-router',
    title: 'Hello App Router',
    excerpt: 'App Router로 동적 라우팅 시작하기',
    body: '폴더 기반 라우팅과 동적 세그먼트를 소개합니다.',
    date: '2025-08-20',
    tags: ['next', 'router'],
  },
  {
    slug: 'dynamic-metadata',
    title: '동적 Metadata로 SEO 강화',
    excerpt: 'generateMetadata로 OG/Twitter 메타 태그 구성',
    body: '게시글별 제목/설명/이미지/URL을 동적으로 생성합니다.',
    date: '2025-08-21',
    tags: ['seo', 'metadata'],
  },
  {
    slug: 'ssg-with-params',
    title: 'generateStaticParams로 SSG',
    excerpt: '정적 경로 생성과 ISR 개념',
    body: 'SSG/ISR로 상세 페이지를 빠르게 제공하는 방법을 설명합니다.',
    date: '2025-08-22',
    tags: ['ssg', 'isr'],
  },
];

export function getAll() { return POSTS; }
export function getBySlug(slug: string) { return POSTS.find(p => p.slug === slug) ?? null; }
