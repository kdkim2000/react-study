export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string; // ISO
  tags: string[];
};

export const POSTS: Post[] = [
  {
    slug: 'hello-app-router',
    title: 'Hello App Router',
    excerpt: 'App Router로 파일 기반 라우팅 시작',
    body: 'App Router는 /app 폴더를 중심으로 레이아웃/페이지/중첩 라우팅을 제공합니다.',
    date: '2025-08-20',
    tags: ['next', 'app-router'],
  },
  {
    slug: 'turbopack-dev',
    title: 'Turbopack 개발 서버',
    excerpt: 'next dev --turbo로 빠른 개발 환경',
    body: 'Turbopack은 Next.js에 내장된 Rust 기반 번들러로 빠른 로컬 개발 경험을 제공합니다.',
    date: '2025-08-21',
    tags: ['turbopack', 'dev'],
  },
  {
    slug: 'dynamic-routes',
    title: '동적 라우트',
    excerpt: '세그먼트 폴더와 [slug] 라우팅',
    body: '폴더 이름에 대괄호를 사용해 동적 세그먼트를 정의합니다.',
    date: '2025-08-22',
    tags: ['route', 'params'],
  },
];

export function getAll() {
  return POSTS;
}
export function getBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug) ?? null;
}
