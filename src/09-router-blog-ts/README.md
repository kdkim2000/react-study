# React Router 완벽 가이드
## SPA 라우팅과 동적 페이지 네비게이션

> **학습 목표**: React Router를 이해하고, Single Page Application에서 페이지 라우팅과 데이터 로딩을 효과적으로 구현하는 방법을 학습한다.

---

## 📚 목차

1. [SPA와 라우팅의 이해](#1-spa와-라우팅의-이해)
2. [React Router 기본 개념](#2-react-router-기본-개념)
3. [라우터 설정과 구조](#3-라우터-설정과-구조)
4. [중첩 라우팅과 레이아웃](#4-중첩-라우팅과-레이아웃)
5. [동적 라우팅과 매개변수](#5-동적-라우팅과-매개변수)
6. [데이터 로딩과 에러 처리](#6-데이터-로딩과-에러-처리)
7. [실전 프로젝트 분석](#7-실전-프로젝트-분석)
8. [실습 미션](#8-실습-미션)

---

## 1. SPA와 라우팅의 이해

### 1.1 전통적인 웹 애플리케이션 vs SPA

#### 전통적인 웹 애플리케이션 (MPA - Multi Page Application)
```
사용자가 링크 클릭
→ 서버에 새 HTML 요청
→ 전체 페이지 새로고침
→ 새로운 HTML 렌더링
```

**문제점**:
- 페이지 전환 시마다 전체 새로고침
- 느린 사용자 경험
- 상태 정보 유실
- 중복 리소스 로딩

#### Single Page Application (SPA)
```
사용자가 링크 클릭
→ JavaScript가 URL 변경
→ 브라우저 히스토리 업데이트
→ 해당 컴포넌트만 렌더링
```

**장점**:
- 빠른 페이지 전환
- 부드러운 사용자 경험
- 상태 유지 가능
- 효율적인 리소스 사용

### 1.2 라우팅이 해결하는 문제들

React만으로는 다음과 같은 한계가 있습니다:

```tsx
// React만 사용할 때의 문제점
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  // 문제 1: URL과 화면이 동기화되지 않음
  // 문제 2: 브라우저 뒤로가기 버튼이 작동하지 않음
  // 문제 3: 북마크나 직접 URL 접근 불가
  // 문제 4: SEO에 불리함
  
  return (
    <div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'about' && <AboutPage />}
    </div>
  );
}
```

**React Router가 해결하는 문제들**:
- URL과 컴포넌트 자동 매핑
- 브라우저 히스토리 관리
- 동적 라우트 매개변수 처리
- 중첩 라우팅으로 복잡한 레이아웃 구현
- 라우트별 데이터 로딩과 에러 처리

---

## 2. React Router 기본 개념

### 2.1 핵심 구성 요소

React Router는 다음 핵심 개념들로 구성됩니다:

| 개념 | 역할 | 예시 |
|------|------|------|
| **Router** | 라우팅 시스템의 최상위 컨테이너 | `BrowserRouter`, `createBrowserRouter` |
| **Route** | URL 경로와 컴포넌트를 매핑 | `{ path: '/blog', element: <BlogPage /> }` |
| **Link** | SPA 방식의 페이지 이동 | `<Link to="/about">소개</Link>` |
| **Outlet** | 중첩 라우트의 자식 컴포넌트 렌더링 위치 | `<Outlet />` |

### 2.2 라우터 방식 비교

#### 레거시 방식 vs 데이터 라우터
```tsx
// 레거시 방식 (BrowserRouter)
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/blog" element={<BlogPage />} />
  </Routes>
</BrowserRouter>

// 데이터 라우터 방식 (권장)
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/blog', element: <BlogPage />, loader: blogLoader },
]);
<RouterProvider router={router} />
```

**데이터 라우터의 장점**:
- 라우트별 데이터 로딩 (`loader`)
- 라우트별 에러 처리 (`errorElement`)
- 더 나은 TypeScript 지원
- 성능 최적화 기능

### 2.3 본 프로젝트의 라우터 구조

본 프로젝트에서는 데이터 라우터 방식을 사용합니다:

```tsx
// AppRouter.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,        // 최상위 레이아웃
    errorElement: <ErrorPage />,    // 전역 에러 처리
    children: [
      { index: true, element: <HomePage /> },           // '/' 경로
      { path: 'about', element: <AboutPage /> },        // '/about' 경로
      {
        path: 'blog',
        element: <BlogLayout />,                        // 블로그 레이아웃
        children: [
          { index: true, element: <BlogIndexPage />, loader: blogIndexLoader },
          { path: ':slug', element: <BlogPostPage />, loader: blogPostLoader },
        ],
      },
      { path: '*', element: <ErrorPage /> },           // 404 처리
    ],
  },
]);
```

**구조 분석**:
- **3레벨 중첩**: Root → Blog → Post
- **인덱스 라우트**: `index: true`로 기본 페이지 지정
- **동적 라우트**: `:slug`로 매개변수 받기
- **와일드카드**: `*`로 404 처리

---

## 3. 라우터 설정과 구조

### 3.1 프로젝트 초기 설정

#### 필수 패키지 설치
```bash
npm install react-router-dom
```

#### 기본 타입 정의
```tsx
// React Router의 주요 타입들
import type { 
  RouteObject,           // 라우트 설정 객체
  LoaderFunction,        // 데이터 로더 함수
  LoaderFunctionArgs     // 로더 함수 인자
} from 'react-router-dom';
```

### 3.2 라우터 설정 파일 구성

본 프로젝트의 `AppRouter.tsx` 파일을 분석해보겠습니다:

```tsx
// AppRouter.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import BlogLayout from './layouts/BlogLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
import BlogIndexPage, { blogIndexLoader } from './pages/BlogIndexPage';
import BlogPostPage, { blogPostLoader } from './pages/BlogPostPage';

const router = createBrowserRouter([
  {
    path: '/',                          // 루트 경로
    element: <RootLayout />,            // 최상위 레이아웃 컴포넌트
    errorElement: <ErrorPage />,        // 이 라우트에서 발생하는 모든 에러 처리
    children: [                         // 중첩된 자식 라우트들
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'blog',
        element: <BlogLayout />,
        children: [
          { index: true, element: <BlogIndexPage />, loader: blogIndexLoader },
          { path: ':slug', element: <BlogPostPage />, loader: blogPostLoader },
        ],
      },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
```

**설정 포인트**:
1. **계층적 구조**: URL 구조가 컴포넌트 계층과 일치
2. **에러 경계**: 각 레벨에서 에러 처리 가능
3. **코드 분할**: 각 페이지를 별도 파일로 분리
4. **타입 안전성**: TypeScript와 완벽 호환

### 3.3 진입점 연결

```tsx
// main.tsx
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';
import './index.css';

createRoot(document.getElementById('root')!).render(<AppRouter />);
```

**기존 App.tsx 대신 AppRouter 사용**:
- 라우터가 앱의 최상위 컴포넌트가 됨
- 모든 페이지가 라우터 컨텍스트 내에서 실행

---

## 4. 중첩 라우팅과 레이아웃

### 4.1 중첩 라우팅의 필요성

복잡한 애플리케이션에서는 다음과 같은 레이아웃 구조가 필요합니다:

```
전체 애플리케이션
├── 헤더 (모든 페이지 공통)
├── 메인 콘텐츠
│   ├── 홈페이지
│   ├── 블로그 섹션
│   │   ├── 블로그 헤더 (블로그 페이지들만)
│   │   ├── 글 목록 페이지
│   │   └── 글 상세 페이지
│   └── 소개 페이지
└── 푸터 (모든 페이지 공통)
```

### 4.2 RootLayout - 최상위 레이아웃

```tsx
// RootLayout.tsx
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function RootLayout() {
  const { pathname } = useLocation();
  
  // 현재 경로에 따른 활성 탭 결정
  const current = pathname.startsWith('/blog')
    ? '/blog'
    : pathname === '/about'
    ? '/about'
    : '/';

  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      {/* 상단 네비게이션 */}
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
            React Router Blog
          </Typography>
          <Tabs
            value={current}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ ml: 'auto' }}
          >
            <Tab label="Home" value="/" to="/" component={RouterLink} />
            <Tab label="Blog" value="/blog" to="/blog" component={RouterLink} />
            <Tab label="About" value="/about" to="/about" component={RouterLink} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 영역 - 자식 라우트가 렌더링됨 */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Outlet />  {/* 핵심: 자식 컴포넌트가 이 위치에 렌더링 */}
      </Container>

      {/* 하단 푸터 */}
      <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary' }}>
        © 2025 FE Chapter
      </Box>
    </Box>
  );
}
```

**RootLayout 분석**:
1. **useLocation()**: 현재 URL 정보 취득
2. **네비게이션**: MUI Tabs와 RouterLink 조합으로 SPA 네비게이션 구현
3. **Outlet**: 자식 라우트의 컴포넌트가 렌더링되는 위치
4. **반응형 레이아웃**: CSS Grid로 헤더-메인-푸터 구조

### 4.3 BlogLayout - 블로그 전용 레이아웃

```tsx
// BlogLayout.tsx
import { Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function BlogLayout() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={800}>블로그</Typography>
      <Outlet />  {/* 블로그 하위 페이지들이 이 위치에 렌더링 */}
    </Stack>
  );
}
```

**중첩 구조의 이점**:
- **코드 재사용**: 공통 레이아웃을 한 번만 정의
- **일관성**: 같은 섹션의 페이지들이 동일한 레이아웃 공유
- **유지보수성**: 레이아웃 변경 시 한 곳만 수정

### 4.4 URL과 컴포넌트 계층 매핑

```
URL 구조                    컴포넌트 계층
/                          RootLayout
├── /                        └── HomePage
├── /about                   └── AboutPage  
└── /blog                    └── BlogLayout
    ├── /blog                    ├── BlogIndexPage
    └── /blog/hello-react        └── BlogPostPage
```

**매핑 규칙**:
- URL 세그먼트와 컴포넌트 계층이 1:1 대응
- 각 레벨에서 `<Outlet />`이 하위 컴포넌트 렌더링
- `index: true` 라우트가 해당 레벨의 기본 페이지

---

## 5. 동적 라우팅과 매개변수

### 5.1 동적 라우트의 필요성

블로그 같은 애플리케이션에서는 다음과 같은 URL 패턴이 필요합니다:

```
정적 라우트:
/blog           → 블로그 목록
/about          → 소개 페이지

동적 라우트:
/blog/hello-react-router     → 특정 글 (slug: hello-react-router)
/blog/data-loading           → 특정 글 (slug: data-loading)
/blog/dynamic-routes         → 특정 글 (slug: dynamic-routes)
```

미리 모든 글의 라우트를 정의할 수는 없으므로, **매개변수**를 사용합니다.

### 5.2 동적 라우트 정의

```tsx
// AppRouter.tsx에서 동적 라우트 설정
{
  path: 'blog',
  element: <BlogLayout />,
  children: [
    { index: true, element: <BlogIndexPage />, loader: blogIndexLoader },
    { path: ':slug', element: <BlogPostPage />, loader: blogPostLoader },
    //      ↑ 동적 매개변수 정의
  ],
}
```

**매개변수 문법**:
- `:slug`: slug라는 이름의 매개변수
- `:id`, `:category` 등 다양한 이름 사용 가능
- URL의 해당 세그먼트가 매개변수 값이 됨

### 5.3 매개변수 사용하기

BlogPostPage에서 URL 매개변수를 사용하는 방법:

```tsx
// BlogPostPage.tsx
import { useParams, useLoaderData } from 'react-router-dom';
import type { Post } from '../lib/blog';

export default function BlogPostPage() {
  const { slug } = useParams();           // URL에서 매개변수 추출
  const post = useLoaderData() as Post;   // 로더에서 가져온 데이터
  
  return (
    <Stack spacing={1.5}>
      <Typography variant="h4" fontWeight={800}>
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {new Date(post.date).toLocaleString()}
      </Typography>
      <Typography sx={{ mt: 1 }}>{post.body}</Typography>
      
      {/* 디버깅용: 현재 slug 표시 */}
      <Typography color="text.secondary" variant="caption">
        slug: <code>{slug}</code>
      </Typography>
    </Stack>
  );
}
```

**핵심 포인트**:
1. **useParams()**: URL 매개변수를 객체로 반환
2. **타입 안전성**: TypeScript에서 `params.slug`의 타입은 `string | undefined`
3. **디버깅**: 개발 시 매개변수 값 확인용 표시

### 5.4 매개변수 타입과 검증

```tsx
// 매개변수 타입 처리 패턴
export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug;  // string | undefined
  
  // 방법 1: 옵셔널 체이닝
  if (!slug) {
    return <div>잘못된 URL입니다.</div>;
  }
  
  // 방법 2: 비구조화 할당 + 단언
  const { slug: paramSlug } = useParams();
  const slug2 = paramSlug!; // 라우터에서 보장된다면 단언 가능
  
  return <div>현재 글: {slug}</div>;
}
```

---

## 6. 데이터 로딩과 에러 처리

### 6.1 데이터 로더의 필요성

전통적인 React에서는 컴포넌트가 마운트된 후 데이터를 로딩합니다:

```tsx
// 기존 방식의 문제점
function BlogPostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 컴포넌트 마운트 후 데이터 로딩
    fetchPost(slug).then(setPost).catch(setError).finally(() => setLoading(false));
  }, [slug]);
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!post) return <div>글을 찾을 수 없습니다</div>;
  
  return <div>{post.title}</div>;
}
```

**문제점**:
- 컴포넌트 마운트 후 로딩 시작 (지연)
- 각 컴포넌트에서 로딩/에러 상태 반복 관리
- 라우트 전환 시 빈 화면 노출

### 6.2 React Router의 데이터 로더

React Router의 로더는 **라우트 진입 전에** 데이터를 준비합니다:

```tsx
// BlogPostPage.tsx의 로더 함수
import { LoaderFunctionArgs } from 'react-router-dom';

export async function blogPostLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug!;                    // 매개변수에서 slug 추출
  const post = await fetchPostBySlug(slug);     // 데이터 로딩
  
  if (!post) {
    // 존재하지 않는 글이면 404 에러 발생
    throw new Response('Post not found', { 
      status: 404, 
      statusText: 'Not Found' 
    });
  }
  
  return post;  // 컴포넌트에서 useLoaderData()로 사용 가능
}
```

**로더의 장점**:
1. **사전 로딩**: 컴포넌트 렌더링 전에 데이터 준비
2. **중앙화**: 데이터 로딩 로직을 한 곳에 집중
3. **에러 처리**: 로더에서 발생한 에러는 errorElement로 자동 연결
4. **타입 안전성**: 로더 반환값의 타입을 컴포넌트에서 추론 가능

### 6.3 블로그 목록 로더 구현

```tsx
// BlogIndexPage.tsx의 로더와 컴포넌트
import { useLoaderData, useSearchParams } from 'react-router-dom';
import type { Post } from '../lib/blog';
import { fetchPosts } from '../lib/blog';

export async function blogIndexLoader(): Promise<Post[]> {
  try {
    const posts = await fetchPosts();
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];  // 에러 시 빈 배열 반환
  }
}

export default function BlogIndexPage() {
  const posts = useLoaderData() as Post[];        // 로더에서 가져온 데이터
  const [params, setParams] = useSearchParams();  // URL 쿼리 매개변수

  const q = (params.get('q') ?? '').toLowerCase();
  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setParams({ q: value });
    } else {
      setParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('q');
        return newParams;
      });
    }
  };

  return (
    <Stack spacing={2}>
      {/* 검색 입력 */}
      <TextField
        value={q}
        placeholder="검색어(제목/요약/태그)"
        onChange={handleSearchChange}
        fullWidth
      />

      {/* 검색 결과 표시 */}
      <Grid container spacing={2}>
        {filtered.map((p) => (
          <Grid item xs={12} sm={6} key={p.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="h3">
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.excerpt}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to={`/blog/${p.slug}`}>
                  자세히 보기 →
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
```

**구현 분석**:
1. **useLoaderData()**: 로더 함수의 반환값 사용
2. **useSearchParams()**: URL 쿼리 매개변수 관리
3. **실시간 검색**: 쿼리 매개변수 변경 시 URL도 함께 업데이트
4. **북마크 가능**: 검색 상태가 URL에 반영되어 북마크/공유 가능

### 6.4 에러 처리 시스템

```tsx
// ErrorPage.tsx - 통합 에러 처리
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  
  let message = '알 수 없는 오류가 발생했습니다.';
  
  if (isRouteErrorResponse(error)) {
    // HTTP 에러 응답 (로더에서 throw new Response)
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    // JavaScript 에러
    message = error.message;
  }
  
  return (
    <Stack spacing={1} role="alert">
      <Typography variant="h5" fontWeight={800}>오류</Typography>
      <Alert severity="error">{message}</Alert>
    </Stack>
  );
}
```

**에러 처리 레벨**:
1. **글로벌 에러**: 루트 라우트의 `errorElement`가 처리
2. **라우트별 에러**: 각 라우트의 `errorElement` 지정 가능  
3. **로더 에러**: 로더에서 던진 에러는 해당 라우트의 errorElement로 전달

---

## 7. 실전 프로젝트 분석

### 7.1 전체 아키텍처 이해

본 프로젝트의 구조를 상세히 분석해보겠습니다:

```
URL 구조                      컴포넌트                    로더
/                            RootLayout
├── /                          └── HomePage              (정적 페이지)
├── /about                     └── AboutPage             (정적 페이지)
└── /blog                      └── BlogLayout
    ├── /blog                      ├── BlogIndexPage     blogIndexLoader
    └── /blog/:slug                └── BlogPostPage      blogPostLoader
```

### 7.2 데이터 계층 분석

```tsx
// lib/blog.ts - 데이터 레이어
export type Post = {
  id: string;
  slug: string;      // URL에서 사용할 고유 식별자
  title: string;
  excerpt: string;   // 목록에서 보여줄 요약
  body: string;      // 상세 페이지의 본문
  date: string;      // ISO 형식 날짜
  tags: string[];    // 분류용 태그
};

// 가상의 데이터베이스 역할
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
  // ... 더 많은 데이터
];

// 네트워크 지연 시뮬레이션
function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

// API 함수들
export async function fetchPosts() {
  await delay(200); // 로딩 체감을 위한 지연
  return POSTS;
}

export async function fetchPostBySlug(slug: string) {
  await delay(120);
  return POSTS.find((p) => p.slug === slug) ?? null;
}
```

**데이터 설계 포인트**:
1. **slug 기반 식별**: ID 대신 slug로 SEO 친화적 URL
2. **구조화된 데이터**: 목록용(excerpt)과 상세용(body) 데이터 분리
3. **비동기 시뮬레이션**: 실제 API 호출처럼 지연 시간 포함
4. **에러 시나리오**: 존재하지 않는 slug 처리

### 7.3 상태 관리 패턴

#### URL을 상태로 활용
```tsx
// BlogIndexPage.tsx에서 검색 상태 관리
const [params, setParams] = useSearchParams();
const q = (params.get('q') ?? '').toLowerCase();

// URL: /blog?q=react 형태로 검색 상태 저장
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (value) {
    setParams({ q: value });  // URL에 쿼리 추가
  } else {
    setParams((prev) => {     // 쿼리 제거
      const newParams = new URLSearchParams(prev);
      newParams.delete('q');
      return newParams;
    });
  }
};
```

**URL 상태 관리의 장점**:
- **북마크 가능**: 검색 상태를 포함한 URL 저장 가능
- **뒤로가기 지원**: 브라우저 히스토리로 검색 기록 탐색
- **공유 가능**: 특정 검색 결과 URL을 다른 사람과 공유
- **새로고침 안전**: 페이지 새로고침 후에도 상태 유지

### 7.4 Navigation과 Link 처리

#### MUI와 React Router 통합
```tsx
// RootLayout.tsx의 네비게이션
<Tabs value={current} textColor="inherit" indicatorColor="secondary">
  <Tab label="Home" value="/" to="/" component={RouterLink} />
  <Tab label="Blog" value="/blog" to="/blog" component={RouterLink} />
  <Tab label="About" value="/about" to="/about" component={RouterLink} />
</Tabs>
```

#### 동적 링크 생성
```tsx
// BlogIndexPage.tsx에서 동적 링크
<Button component={RouterLink} to={`/blog/${p.slug}`}>
  자세히 보기 →
</Button>
```

**링크 패턴**:
- **정적 링크**: 고정된 경로 (`/about`)
- **동적 링크**: 매개변수 포함 (`/blog/${slug}`)
- **상대 링크**: 현재 경로 기준 (`../category`)
- **절대 링크**: 루트 기준 (`/blog/category`)

---

## 8. 실습 미션

### 8.1 기초 미션

#### 미션 1: 카테고리 페이지 구현
블로그에 카테고리별 필터링 기능을 추가하세요.

**요구사항**:
- 경로: `/blog/category/:tag`
- 해당 태그를 가진 글만 표시
- 상단에 현재 카테고리 표시

**구현 힌트**:
```tsx
// 라우터에 추가
{ path: 'category/:tag', element: <BlogCategoryPage />, loader: blogCategoryLoader }

// 로더 구현
export async function blogCategoryLoader({ params }: LoaderFunctionArgs) {
  const { tag } = params;
  const posts = await fetchPosts();
  const filtered = posts.filter(post => post.tags.includes(tag!));
  return { posts: filtered, tag };
}
```

#### 미션 2: 이전/다음 글 네비게이션
블로그 상세 페이지에 이전/다음 글로 이동하는 버튼을 추가하세요.

**요구사항**:
- 현재 글의 이전/다음 글 찾기
- 첫 글에서는 "이전" 버튼 숨김
- 마지막 글에서는 "다음" 버튼 숨김

#### 미션 3: 검색 기능 향상
현재 검색 기능을 향상시키세요.

**개선사항**:
- 검색어 하이라이팅
- 검색 결과 개수 표시
- 최근 검색어 저장 (localStorage 활용)

### 8.2 중급 미션

#### 미션 4: 코드 분할과 지연 로딩
React.lazy와 Suspense를 사용하여 코드 분할을 구현하세요.

**목표**:
- 블로그 관련 컴포넌트들을 별도 청크로 분리
- 로딩 중 스피너 표시
- 네트워크 탭에서 청크 로딩 확인

**구현 예시**:
```tsx
import { lazy, Suspense } from 'react';

const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// 라우터에서 Suspense로 감싸기
{
  path: 'blog',
  element: (
    <Suspense fallback={<div>로딩 중...</div>}>
      <BlogLayout />
    </Suspense>
  ),
  children: [
    { index: true, element: <BlogIndexPage />, loader: blogIndexLoader },
    { path: ':slug', element: <BlogPostPage />, loader: blogPostLoader },
  ],
}
```

#### 미션 5: 무한 스크롤 구현
블로그 목록에 무한 스크롤을 구현하세요.

**요구사항**:
- 초기에 10개 글만 로드
- 스크롤이 하단에 도달하면 추가 로드
- 로딩 상태 표시

#### 미션 6: 블로그 글 작성 기능
새 블로그 글을 작성할 수 있는 기능을 추가하세요.

**구현 요소**:
- `/blog/new` 경로 추가
- 제목, 내용, 태그 입력 폼
- React Hook Form 사용
- 작성 후 상세 페이지로 리디렉션

### 8.3 고급 미션

#### 미션 7: 블로그 관리자 영역
관리자용 대시보드를 구현하세요.

**기능 요구사항**:
- `/admin` 경로 하위에 관리자 영역
- 글 목록, 편집, 삭제 기능
- 통계 대시보드 (글 개수, 조회수 등)
- 관리자 인증 (간단한 패스워드)

**라우트 구조**:
```tsx
{
  path: 'admin',
  element: <AdminLayout />,
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: 'posts', element: <AdminPosts /> },
    { path: 'posts/:id/edit', element: <AdminPostEdit /> },
  ],
}
```

#### 미션 8: SEO와 메타 데이터
각 페이지에 적절한 메타 데이터를 추가하세요.

**구현 요소**:
- react-helmet-async 라이브러리 사용
- 페이지별 title, description, keywords 설정
- Open Graph 메타 태그
- 구조화된 데이터 (JSON-LD)

---

## 9. 마무리와 실무 적용 가이드

### 9.1 React Router 핵심 원칙

#### 1. URL이 진실의 원천
```tsx
// ✅ URL을 상태로 활용
const [searchParams] = useSearchParams();
const page = Number(searchParams.get('page')) || 1;

// ❌ 내부 상태로만 관리
const [page, setPage] = useState(1); // URL과 동기화되지 않음
```

#### 2. 선언적 라우팅
```tsx
// ✅ 라우트 구조가 한눈에 보임
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <Post /> },
    ],
  },
]);

// ❌ 명령적 라우팅
if (path === '/blog') return <Blog />;
if (path.startsWith('/blog/')) return <Post />;
```

#### 3. 데이터와 라우팅의 결합
```tsx
// ✅ 라우트 정의와 데이터 로딩을 한 곳에
{ path: 'blog/:slug', element: <BlogPost />, loader: blogPostLoader }

// ❌ 컴포넌트 내에서 별도 데이터 로딩
function BlogPost() {
  const [post, setPost] = useState(null);
  useEffect(() => { /* 데이터 로딩 */ }, []);
}
```

### 9.2 성능 최적화 전략

#### 코드 분할 체크리스트
```markdown
- [ ] 페이지별 컴포넌트를 React.lazy로 분할
- [ ] 큰 의존성 라이브러리 별도 청크로 분리
- [ ] 라우트별 Suspense 경계 설정
- [ ] 로딩 상태에 스켈레톤 UI 적용
- [ ] Preloading 전략 수립 (hover 시 등)
```

#### 데이터 로딩 최적화
```tsx
// 병렬 데이터 로딩
export async function pageLoader() {
  const [posts, categories, user] = await Promise.all([
    fetchPosts(),
    fetchCategories(), 
    fetchCurrentUser()
  ]);
  return { posts, categories, user };
}

// 에러 처리와 폴백
export async function safeLoader() {
  try {
    return await fetchData();
  } catch (error) {
    console.error('Data loading failed:', error);
    return { error: 'Failed to load data' };
  }
}
```

### 9.3 팀 개발 가이드라인

#### 라우트 구조 규칙
```tsx
// 팀 표준 라우트 구조
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      // 정적 페이지들
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      
      // 기능별 섹션 (중첩 라우팅)
      {
        path: 'blog',
        element: <BlogLayout />,
        children: [
          { index: true, element: <BlogIndex />, loader: blogLoader },
          { path: ':slug', element: <BlogPost />, loader: postLoader },
        ],
      },
      
      // 404 처리
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
```

#### 파일 조직 규칙
```
src/
├── pages/              # 페이지 컴포넌트
│   ├── HomePage.tsx
│   ├── BlogIndexPage.tsx
│   └── BlogPostPage.tsx
├── layouts/            # 레이아웃 컴포넌트
│   ├── RootLayout.tsx
│   └── BlogLayout.tsx
├── lib/               # 유틸리티와 API
│   ├── api.ts
│   └── blog.ts
└── AppRouter.tsx      # 라우터 설정
```

### 9.4 SEO와 접근성 고려사항

#### 메타 데이터 관리
```tsx
// react-helmet-async 활용
import { Helmet } from 'react-helmet-async';

function BlogPost({ post }: { post: Post }) {
  return (
    <>
      <Helmet>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>
      <article>{/* 콘텐츠 */}</article>
    </>
  );
}
```

#### 접근성 개선
```tsx
// ARIA 라벨과 시맨틱 마크업
<nav aria-label="Main navigation">
  <ul>
    <li><Link to="/">홈</Link></li>
    <li><Link to="/blog" aria-current={pathname === '/blog' ? 'page' : undefined}>블로그</Link></li>
  </ul>
</nav>

<main>
  <Outlet />
</main>
```

### 9.5 다음 학습 단계

#### Next.js로 발전
React Router는 클라이언트 사이드 라우팅에 특화되어 있습니다. 서버 사이드 렌더링이 필요하다면 Next.js로 발전시킬 수 있습니다:

```tsx
// React Router → Next.js 마이그레이션 매핑
React Router              Next.js
/blog                 →   /blog/page.tsx
/blog/:slug          →   /blog/[slug]/page.tsx  
/blog/category/:tag  →   /blog/category/[tag]/page.tsx
```

#### 고급 패턴 학습
- **Remix**: React Router 팀이 만든 풀스택 프레임워크
- **React Location**: 타입 안전한 라우팅 라이브러리
- **Reach Router**: React Router의 이전 버전 (현재는 통합됨)

---

## 🎯 학습 체크리스트

### 이론 이해
- [ ] SPA와 MPA의 차이점과 라우팅의 필요성 이해
- [ ] React Router의 핵심 개념 (Router, Route, Link, Outlet) 파악
- [ ] 중첩 라우팅과 레이아웃 시스템 이해
- [ ] 동적 라우팅과 매개변수 처리 방법 습득

### 실습 완료
- [ ] 프로젝트 실행 및 네비게이션 동작 확인
- [ ] 블로그 목록과 상세 페이지 라우팅 이해
- [ ] 검색 기능과 URL 쿼리 매개변수 연동 확인
- [ ] 기초 미션 중 2개 이상 완료

### 실무 적용
- [ ] 현재 프로젝트에 적합한 라우팅 구조 설계
- [ ] SEO와 접근성을 고려한 라우팅 계획 수립
- [ ] 팀과 라우팅 컨벤션 및 가이드라인 논의

---

**다음 챕터 미리보기**: 10. API 연동 - REST API와 비동기 데이터 처리

---

*본 교재는 React Router를 실무에서 효과적으로 활용할 수 있도록 실전 중심으로 작성되었습니다. 라우팅은 사용자 경험의 핵심이므로 성능과 접근성을 항상 고려하여 구현하시기 바랍니다.*