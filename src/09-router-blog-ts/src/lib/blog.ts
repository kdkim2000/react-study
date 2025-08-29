export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;      // ISO
  tags: string[];
};

const POSTS: Post[] = [
  {
    id: '1',
    slug: 'hello-react-router',
    title: 'Hello React Router',
    excerpt: 'React Router로 SPA 라우팅 시작하기',
    body: '첫 글입니다. 라우팅의 기본 개념과 목적을 소개합니다.',
    date: '2025-08-20',
    tags: ['react', 'router']
  },
  {
    id: '2',
    slug: 'data-loading-with-loaders',
    title: 'Loader로 데이터 로딩하기',
    excerpt: 'route-level 데이터 로딩과 에러 처리',
    body: 'loader에서 데이터를 불러오고 useLoaderData로 사용하는 방법.',
    date: '2025-08-21',
    tags: ['data', 'loader']
  },
  {
    id: '3',
    slug: 'dynamic-routes-and-params',
    title: '동적 라우트와 파라미터',
    excerpt: 'URL 파라미터로 상세 페이지 만들기',
    body: 'useParams로 slug를 읽고 맞는 글을 찾는 예제.',
    date: '2025-08-22',
    tags: ['route', 'params']
  },
];

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function fetchPosts() {
  await delay(200); // 로딩 체감
  // 보통은 API 호출(fetch/axios) 후 JSON 파싱
  return POSTS;
}

export async function fetchPostBySlug(slug: string) {
  await delay(120);
  return POSTS.find((p) => p.slug === slug) ?? null;
}