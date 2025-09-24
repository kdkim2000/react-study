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
  {
    id: '4',
    slug: 'react-hooks-useState',
    title: 'React useState Hook 마스터하기',
    excerpt: '가장 기본적인 React Hook인 useState의 활용법과 주의사항',
    body: 'useState를 사용하여 컴포넌트의 상태를 관리하는 방법을 자세히 알아보겠습니다. 함수형 업데이트와 배치 업데이트에 대해서도 다룹니다.',
    date: '2025-08-23',
    tags: ['react', 'hooks', 'useState']
  },
  {
    id: '5',
    slug: 'useEffect-lifecycle',
    title: 'useEffect로 생명주기 다루기',
    excerpt: 'useEffect Hook을 활용한 사이드 이펙트 처리와 정리',
    body: 'useEffect는 컴포넌트의 생명주기를 관리하는 핵심 Hook입니다. 의존성 배열과 정리 함수의 올바른 사용법을 학습합니다.',
    date: '2025-08-24',
    tags: ['react', 'hooks', 'useEffect', 'lifecycle']
  },
  {
    id: '6',
    slug: 'typescript-react-basics',
    title: 'TypeScript와 React 기초',
    excerpt: 'TypeScript를 활용한 타입 안전한 React 컴포넌트 작성',
    body: 'TypeScript의 타입 시스템을 React와 함께 사용하여 더 안전하고 유지보수가 쉬운 코드를 작성하는 방법을 알아봅니다.',
    date: '2025-08-25',
    tags: ['typescript', 'react', 'types']
  },
  {
    id: '7',
    slug: 'material-ui-theme-setup',
    title: 'Material-UI 테마 설정과 커스터마이징',
    excerpt: 'MUI의 테마 시스템을 활용한 일관된 디자인 구현',
    body: 'Material-UI의 테마 프로바이더를 설정하고 커스텀 색상, 타이포그래피, 컴포넌트 스타일을 적용하는 방법을 배웁니다.',
    date: '2025-08-26',
    tags: ['mui', 'material-ui', 'theme', 'design']
  },
  {
    id: '8',
    slug: 'react-context-api',
    title: 'Context API로 전역 상태 관리하기',
    excerpt: 'React Context를 활용한 컴포넌트 간 데이터 공유',
    body: 'Context API를 사용하여 props drilling 없이 컴포넌트 트리 전반에 걸쳐 데이터를 공유하는 방법을 실습합니다.',
    date: '2025-08-27',
    tags: ['react', 'context', 'state-management']
  },
  {
    id: '9',
    slug: 'custom-hooks-pattern',
    title: '커스텀 Hook 패턴과 재사용성',
    excerpt: '로직을 분리하고 재사용 가능한 커스텀 Hook 만들기',
    body: '반복되는 로직을 커스텀 Hook으로 추출하여 컴포넌트를 더 깔끔하고 재사용 가능하게 만드는 방법을 알아봅니다.',
    date: '2025-08-28',
    tags: ['react', 'hooks', 'custom-hooks', 'reusability']
  },
  {
    id: '10',
    slug: 'react-memo-optimization',
    title: 'React.memo와 성능 최적화',
    excerpt: '불필요한 리렌더링을 방지하는 메모이제이션 기법',
    body: 'React.memo, useMemo, useCallback을 활용하여 컴포넌트의 성능을 최적화하는 전략을 학습합니다.',
    date: '2025-08-29',
    tags: ['react', 'performance', 'optimization', 'memo']
  },
  {
    id: '11',
    slug: 'error-boundary-handling',
    title: 'Error Boundary로 에러 처리하기',
    excerpt: 'React 애플리케이션의 안정적인 에러 핸들링 구현',
    body: 'Error Boundary 컴포넌트를 만들어 자식 컴포넌트에서 발생하는 JavaScript 에러를 우아하게 처리하는 방법을 배웁니다.',
    date: '2025-08-30',
    tags: ['react', 'error-handling', 'boundary']
  },
  {
    id: '12',
    slug: 'react-lazy-suspense',
    title: 'React.lazy와 Suspense로 코드 스플리팅',
    excerpt: '동적 임포트를 활용한 번들 크기 최적화',
    body: 'React.lazy와 Suspense를 조합하여 컴포넌트를 필요할 때만 로드하는 코드 스플리팅 기법을 구현합니다.',
    date: '2025-08-31',
    tags: ['react', 'lazy', 'suspense', 'code-splitting']
  },
  {
    id: '13',
    slug: 'react-router-nested-routes',
    title: '중첩 라우트와 레이아웃 구조',
    excerpt: '복잡한 페이지 구조를 위한 중첩 라우팅 설계',
    body: 'React Router의 중첩 라우트 기능을 활용하여 공통 레이아웃을 가진 복잡한 페이지 구조를 효율적으로 관리하는 방법을 알아봅니다.',
    date: '2025-09-01',
    tags: ['react-router', 'nested-routes', 'layout']
  },
  {
    id: '14',
    slug: 'form-handling-controlled',
    title: '제어 컴포넌트로 폼 다루기',
    excerpt: 'React에서 폼 입력을 효과적으로 관리하는 방법',
    body: '제어 컴포넌트 패턴을 사용하여 폼 데이터를 관리하고 유효성 검사를 구현하는 실용적인 접근법을 학습합니다.',
    date: '2025-09-02',
    tags: ['react', 'forms', 'controlled-components']
  },
  {
    id: '15',
    slug: 'react-testing-jest',
    title: 'Jest와 React Testing Library로 테스트 작성',
    excerpt: '신뢰할 수 있는 React 컴포넌트 테스트 전략',
    body: 'Jest와 React Testing Library를 사용하여 컴포넌트의 동작을 검증하고 버그를 예방하는 효과적인 테스트를 작성합니다.',
    date: '2025-09-03',
    tags: ['testing', 'jest', 'react-testing-library']
  },
  {
    id: '16',
    slug: 'react-patterns-composition',
    title: 'React 컴포지션 패턴 활용하기',
    excerpt: '상속 대신 컴포지션을 활용한 유연한 컴포넌트 설계',
    body: 'React의 컴포지션 패턴을 활용하여 재사용 가능하고 유연한 컴포넌트를 만드는 고급 기법을 탐구합니다.',
    date: '2025-09-04',
    tags: ['react', 'patterns', 'composition']
  },
  {
    id: '17',
    slug: 'react-portals-modal',
    title: 'React Portals로 모달 컴포넌트 만들기',
    excerpt: 'DOM 트리를 벗어난 렌더링으로 모달 구현',
    body: 'React Portals를 사용하여 부모 컴포넌트의 DOM 계층 구조를 벗어나 모달, 툴팁 등을 효과적으로 렌더링하는 방법을 배웁니다.',
    date: '2025-09-05',
    tags: ['react', 'portals', 'modal']
  },
  {
    id: '18',
    slug: 'react-refs-dom-access',
    title: 'useRef로 DOM에 직접 접근하기',
    excerpt: 'Ref를 활용한 DOM 조작과 값 보존',
    body: 'useRef Hook을 사용하여 DOM 요소에 직접 접근하거나 컴포넌트 생명주기 동안 값을 보존하는 방법을 실습합니다.',
    date: '2025-09-06',
    tags: ['react', 'hooks', 'useRef', 'dom']
  },
  {
    id: '19',
    slug: 'react-reducer-complex-state',
    title: 'useReducer로 복잡한 상태 관리',
    excerpt: 'useState를 넘어선 고급 상태 관리 패턴',
    body: 'useReducer Hook을 활용하여 복잡한 상태 로직을 더 예측 가능하고 테스트하기 쉬운 방식으로 관리하는 방법을 알아봅니다.',
    date: '2025-09-07',
    tags: ['react', 'hooks', 'useReducer', 'state-management']
  },
  {
    id: '20',
    slug: 'react-performance-profiler',
    title: 'React DevTools Profiler로 성능 분석',
    excerpt: '애플리케이션 성능 병목 지점 찾기와 해결',
    body: 'React DevTools의 Profiler를 사용하여 컴포넌트의 렌더링 성능을 측정하고 최적화 포인트를 찾는 실용적인 방법을 배웁니다.',
    date: '2025-09-08',
    tags: ['react', 'performance', 'profiler', 'devtools']
  },
  {
    id: '21',
    slug: 'next-js-introduction',
    title: 'Next.js 시작하기: React의 프로덕션 프레임워크',
    excerpt: 'Next.js의 핵심 기능과 React와의 차이점 이해',
    body: 'Next.js가 제공하는 SSR, SSG, 파일 기반 라우팅, API Routes 등의 기능을 통해 React 애플리케이션을 프로덕션 수준으로 향상시키는 방법을 알아봅니다.',
    date: '2025-09-09',
    tags: ['nextjs', 'react', 'ssr', 'framework']
  },
  {
    id: '22',
    slug: 'nextjs-app-router-migration',
    title: 'Next.js App Router로 마이그레이션하기',
    excerpt: 'Pages Router에서 App Router로의 전환 가이드',
    body: 'Next.js 13에서 도입된 App Router의 새로운 기능들을 살펴보고, 기존 Pages Router 애플리케이션을 점진적으로 마이그레이션하는 전략을 수립합니다.',
    date: '2025-09-10',
    tags: ['nextjs', 'app-router', 'migration']
  },
  {
    id: '23',
    slug: 'react-query-data-fetching',
    title: 'React Query로 서버 상태 관리하기',
    excerpt: '효율적인 데이터 페칭과 캐싱 전략',
    body: 'React Query(TanStack Query)를 사용하여 서버 데이터를 효과적으로 페칭하고, 캐싱, 동기화, 백그라운드 업데이트를 구현하는 방법을 학습합니다.',
    date: '2025-09-11',
    tags: ['react-query', 'data-fetching', 'caching']
  },
  {
    id: '24',
    slug: 'zustand-state-management',
    title: 'Zustand로 간단한 전역 상태 관리',
    excerpt: 'Redux 없이도 강력한 상태 관리 라이브러리 활용',
    body: 'Zustand를 사용하여 보일러플레이트 없는 간단하면서도 강력한 전역 상태 관리 솔루션을 구현하고, TypeScript와 함께 사용하는 방법을 배웁니다.',
    date: '2025-09-12',
    tags: ['zustand', 'state-management', 'typescript']
  },
  {
    id: '25',
    slug: 'react-spring-animations',
    title: 'React Spring으로 부드러운 애니메이션 구현',
    excerpt: '선언적이고 성능 좋은 애니메이션 라이브러리 활용',
    body: 'React Spring을 사용하여 CSS 트랜지션의 한계를 넘어선 복잡하고 부드러운 애니메이션을 구현하는 방법을 실습을 통해 알아봅니다.',
    date: '2025-09-13',
    tags: ['react-spring', 'animation', 'ui-ux']
  }
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