# 05. React Hook 완전정복 - 함수형 컴포넌트의 핵심

> **학습 목표**
> - React Hook의 개념과 등장 배경 이해
> - useState와 useEffect의 동작 원리와 활용법
> - useMemo를 통한 성능 최적화 전략
> - 비동기 데이터 처리와 생명주기 관리
> - 실무에서 자주 사용하는 Hook 패턴
> - 에러 처리와 로딩 상태 관리

---

## 📚 목차
1. [React Hook의 철학과 등장 배경](#1-react-hook의-철학과-등장-배경)
2. [useState - 상태 관리의 핵심](#2-usestate---상태-관리의-핵심)
3. [useEffect - 생명주기와 사이드 이펙트](#3-useeffect---생명주기와-사이드-이펙트)
4. [useMemo - 성능 최적화의 핵심](#4-usememo---성능-최적화의-핵심)
5. [비동기 데이터 처리 패턴](#5-비동기-데이터-처리-패턴)
6. [상태 기반 UI 렌더링 전략](#6-상태-기반-ui-렌더링-전략)
7. [실습 프로젝트 상세 분석](#7-실습-프로젝트-상세-분석)
8. [Hook 사용 시 주의사항과 베스트 프랙티스](#8-hook-사용-시-주의사항과-베스트-프랙티스)
9. [고급 패턴과 확장 가능성](#9-고급-패턴과-확장-가능성)

---

## 1. React Hook의 철학과 등장 배경

### 1.1 Hook이란 무엇인가?

**Hook**은 React 16.8에서 도입된 기능으로, **함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 함수들**입니다.

#### Hook 등장 이전의 문제점

**1. 클래스 컴포넌트의 복잡성**
```javascript
// Hook 이전: 클래스 컴포넌트
class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      error: null
    };
  }
  
  componentDidMount() {
    this.fetchUsers();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.fetchUsers();
    }
  }
  
  componentWillUnmount() {
    this.abortController.abort();
  }
  
  fetchUsers = async () => {
    // 비동기 로직
  }
  
  render() {
    return <div>{/* 렌더링 로직 */}</div>;
  }
}
```

**2. 로직 재사용의 어려움**
클래스 컴포넌트에서는 상태 로직을 재사용하기 위해 복잡한 패턴(HOC, Render Props)이 필요했습니다.

**3. 생명주기 메서드의 분산된 로직**
관련된 로직이 여러 생명주기 메서드에 분산되어 유지보수가 어려웠습니다.

#### Hook의 해결책

```tsx
// Hook 이후: 함수형 컴포넌트
function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await api.fetchUsers(controller.signal);
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
    
    return () => controller.abort(); // 정리 함수
  }, []); // 의존성 배열
  
  return <div>{/* 렌더링 로직 */}</div>;
}
```

### 1.2 Hook의 핵심 원칙

#### A) Hook의 규칙 (Rules of Hooks)

**1. 최상위에서만 호출**
```tsx
// ✅ 올바른 사용
function MyComponent() {
  const [count, setCount] = useState(0);  // 최상위
  const [name, setName] = useState('');   // 최상위
  
  useEffect(() => {
    // 사이드 이펙트
  }, []);
  
  return <div>{count}</div>;
}

// ❌ 잘못된 사용
function MyComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0);  // 조건부 Hook 호출
  }
  
  for (let i = 0; i < 5; i++) {
    useEffect(() => {}, []);  // 반복문 내 Hook 호출
  }
}
```

**2. React 함수에서만 호출**
```tsx
// ✅ 올바른 사용
function MyComponent() {
  const [state, setState] = useState(0);  // 함수형 컴포넌트
}

function useCustomHook() {
  const [state, setState] = useState(0);  // 커스텀 Hook
}

// ❌ 잘못된 사용
function regularFunction() {
  const [state, setState] = useState(0);  // 일반 함수
}
```

#### B) Hook의 동작 원리

React는 컴포넌트 렌더링 시 Hook 호출 순서를 기반으로 상태를 관리합니다.

```tsx
function MyComponent() {
  // 첫 번째 렌더링: Hook 순서 기록
  const [name, setName] = useState('');     // Hook 1
  const [age, setAge] = useState(0);        // Hook 2
  const [email, setEmail] = useState('');   // Hook 3
  
  // 두 번째 렌더링: 같은 순서로 Hook 호출되어야 함
  // React가 이전 상태를 올바르게 연결할 수 있음
}
```

---

## 2. useState - 상태 관리의 핵심

### 2.1 useState의 기본 구조

```tsx
const [상태값, 상태변경함수] = useState(초기값);
```

### 2.2 프로젝트에서의 useState 활용 분석

#### A) 단순 상태 관리

```tsx
// ResizeWatcher.tsx - 윈도우 크기 추적
export default function ResizeWatcher() {
  // 📍 초기값을 함수로 제공하여 SSR 안전성 확보
  const [w, setW] = useState<number>(() => 
    (typeof window !== 'undefined' ? window.innerWidth : 0)
  );

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);  // 📍 직접 값 설정
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        icon={<MonitorRoundedIcon />}
        label={`윈도우 너비: ${w}px`}  {/* 📍 상태값 직접 사용 */}
        variant="outlined"
        size="small"
      />
    </Stack>
  );
}
```

**학습 포인트**:
1. **Lazy Initial State**: `useState(() => value)` 패턴으로 초기값을 함수로 제공
2. **SSR 호환성**: `typeof window !== 'undefined'` 체크로 서버 사이드 렌더링 대응
3. **이벤트 기반 상태 업데이트**: 브라우저 이벤트에 반응하여 상태 변경

#### B) 복합 상태 관리

```tsx
// UsersPage.tsx - 여러 상태의 조합
export default function UsersPage() {
  // 📍 각각의 관심사를 별도 상태로 분리
  const [status, setStatus] = useState<Status>('idle');
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');

  // 📍 타입 안전한 상태 정의
  // type Status = 'idle' | 'loading' | 'success' | 'error';
  
  // ... 비즈니스 로직
}
```

**상태 설계 원칙**:
1. **관심사 분리**: 각각의 책임을 가진 상태를 독립적으로 관리
2. **타입 안전성**: 유니온 타입으로 가능한 상태값 제한
3. **명시적 상태**: 'loading', 'error' 등 명확한 의미를 가진 상태명 사용

### 2.3 useState 고급 패턴

#### A) 함수형 업데이트

```tsx
// 이전 상태를 기반으로 새 상태 계산
setUsers(prevUsers => [...prevUsers, newUser]);
setCount(prev => prev + 1);

// 객체 상태 업데이트
setUser(prev => ({ ...prev, name: 'Updated Name' }));
```

#### B) 상태 초기화 패턴

```tsx
// 조건부 초기화
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('data');
  return saved ? JSON.parse(saved) : defaultValue;
});

// 비동기 초기화
const [asyncData, setAsyncData] = useState(null);
useEffect(() => {
  loadInitialData().then(setAsyncData);
}, []);
```

---

## 3. useEffect - 생명주기와 사이드 이펙트

### 3.1 useEffect의 실행 시점

**useEffect는 렌더링이 완료된 후 비동기적으로 실행됩니다.**

```
컴포넌트 렌더링 → DOM 업데이트 → useEffect 실행
```

### 3.2 의존성 배열에 따른 실행 패턴

#### A) 마운트 시에만 실행

```tsx
// ResizeWatcher.tsx - 이벤트 리스너 등록/해제
useEffect(() => {
  const onResize = () => setW(window.innerWidth);
  window.addEventListener('resize', onResize);
  
  // 📍 정리 함수 - 컴포넌트 언마운트 시 실행
  return () => window.removeEventListener('resize', onResize);
}, []); // 📍 빈 배열 - 마운트 시에만 실행
```

#### B) 특정 값 변경 시 실행

```tsx
// 검색어가 변경될 때마다 필터링 수행
useEffect(() => {
  const filtered = users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredUsers(filtered);
}, [users, query]); // users나 query가 변경될 때 실행
```

### 3.3 프로젝트의 useEffect 패턴 분석

#### A) API 호출과 에러 처리

```tsx
// UsersPage.tsx - 데이터 페칭과 정리
export default function UsersPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let cancelled = false;                    // 📍 경쟁 상태 방지 플래그
    const controller = new AbortController(); // 📍 요청 취소를 위한 컨트롤러

    async function load() {
      try {
        setStatus('loading');
        const data = await fetchUsers(controller.signal);
        
        // 📍 컴포넌트가 언마운트되었는지 확인
        if (cancelled) return;
        
        setUsers(data);
        setStatus('success');
      } catch (err) {
        // 📍 요청 취소 에러는 무시
        if (
          (err instanceof DOMException && err.name === 'AbortError') ||
          (err instanceof Error && err.name === 'AbortError')
        ) {
          return;
        }
        console.error(err);
        setStatus('error');
      }
    }

    load();
    
    // 📍 정리 함수 - 메모리 누수 방지
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []); // 마운트 시에만 실행
  
  // ... 렌더링 로직
}
```

**핵심 학습 포인트**:

1. **경쟁 상태(Race Condition) 방지**
   - `cancelled` 플래그로 언마운트된 컴포넌트의 상태 업데이트 방지
   
2. **AbortController 활용**
   - 컴포넌트 언마운트 시 진행 중인 네트워크 요청 취소
   
3. **에러 처리 전략**
   - 취소된 요청은 에러로 처리하지 않음
   - 실제 에러만 상태에 반영

#### B) 이벤트 리스너 관리

```tsx
// ResizeWatcher.tsx - 브라우저 이벤트 처리
useEffect(() => {
  const onResize = () => setW(window.innerWidth);
  
  // 📍 이벤트 리스너 등록
  window.addEventListener('resize', onResize);
  
  // 📍 정리 함수로 메모리 누수 방지
  return () => window.removeEventListener('resize', onResize);
}, []); // 의존성 없음 - 한 번만 등록/해제
```

### 3.4 useEffect 사용 시 흔한 실수들

#### A) 의존성 배열 누락

```tsx
// ❌ 잘못된 예시
function BadComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);  // userId에 의존하지만 배열에 없음
  }, []); // userId 변경 시 재실행되지 않음
  
  return <div>{user?.name}</div>;
}

// ✅ 올바른 예시
function GoodComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // userId 변경 시 재실행
  
  return <div>{user?.name}</div>;
}
```

#### B) 정리 함수 누락

```tsx
// ❌ 메모리 누수 발생
function BadTimer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    // 정리 함수 없음 - 타이머가 계속 실행됨
  }, []);
  
  return <div>{count}</div>;
}

// ✅ 올바른 정리
function GoodTimer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer); // 정리 함수로 타이머 해제
  }, []);
  
  return <div>{count}</div>;
}
```

---

## 4. useMemo - 성능 최적화의 핵심

### 4.1 useMemo의 목적과 동작 원리

**useMemo**는 계산 비용이 높은 값을 메모이제이션하여 불필요한 재계산을 방지합니다.

```tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]); // a나 b가 변경될 때만 재계산
```

### 4.2 프로젝트에서의 useMemo 활용

```tsx
// UsersPage.tsx - 검색 필터링 최적화
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');

  // 📍 검색 결과를 메모이제이션
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [users, query]); // users나 query가 변경될 때만 재계산

  return (
    <Container>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="이름/아이디/이메일 검색"
      />
      {status === 'success' && <UsersList users={filtered} />}
    </Container>
  );
}
```

**최적화 효과**:
1. **불필요한 재계산 방지**: 다른 상태가 변경되어도 필터링 로직은 재실행되지 않음
2. **렌더링 성능 향상**: 자식 컴포넌트에 전달되는 props가 안정적
3. **메모리 효율성**: 결과값이 변경되지 않으면 이전 참조 유지

### 4.3 useMemo 사용 기준

#### A) 사용해야 하는 경우

```tsx
// 1. 복잡한 계산
const expensiveValue = useMemo(() => {
  return largeArray.reduce((acc, item) => {
    return acc + complexCalculation(item);
  }, 0);
}, [largeArray]);

// 2. 객체/배열 생성 최적화
const config = useMemo(() => ({
  theme: 'dark',
  language: 'ko',
  features: enabledFeatures.filter(f => f.active)
}), [enabledFeatures]);

// 3. 정규표현식 같은 생성 비용이 높은 객체
const regex = useMemo(() => 
  new RegExp(pattern, 'gi')
, [pattern]);
```

#### B) 사용하지 말아야 하는 경우

```tsx
// ❌ 단순한 계산에는 불필요
const simpleValue = useMemo(() => a + b, [a, b]); // 오버엔지니어링

// ❌ 원시값 계산
const doubled = useMemo(() => count * 2, [count]); // 불필요한 메모이제이션

// ❌ 매번 다른 의존성
const randomValue = useMemo(() => Math.random(), [Math.random()]); // 의미 없음
```

---

## 5. 비동기 데이터 처리 패턴

### 5.1 상태 기반 비동기 처리

프로젝트에서 사용하는 상태 머신 패턴:

```tsx
type Status = 'idle' | 'loading' | 'success' | 'error';
```

이 패턴의 장점:
1. **명확한 상태 구분**: 현재 어떤 상태인지 명확
2. **조건부 렌더링 최적화**: switch/case 문으로 깔끔한 분기 처리
3. **타입 안전성**: TypeScript로 불가능한 상태 조합 방지

### 5.2 API 호출 패턴 상세 분석

```tsx
// api.ts - 타입 안전한 API 함수
export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
  if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
  return (await res.json()) as User[];
}
```

**API 함수 설계 원칙**:
1. **AbortSignal 지원**: 요청 취소 가능
2. **명확한 에러 처리**: HTTP 상태 코드 확인
3. **타입 안전성**: 반환값의 타입 명시

### 5.3 에러 처리 전략

```tsx
// UsersPage.tsx - 포괄적 에러 처리
try {
  setStatus('loading');
  const data = await fetchUsers(controller.signal);
  if (cancelled) return;
  setUsers(data);
  setStatus('success');
} catch (err) {
  // 📍 특정 에러 타입 처리
  if (
    (err instanceof DOMException && err.name === 'AbortError') ||
    (err instanceof Error && err.name === 'AbortError')
  ) {
    return; // 취소는 무시
  }
  console.error(err);
  setStatus('error');
}
```

**에러 처리 레벨**:
1. **네트워크 레벨**: fetch 실패, 타임아웃
2. **HTTP 레벨**: 4xx, 5xx 상태 코드
3. **애플리케이션 레벨**: 비즈니스 로직 에러
4. **사용자 레벨**: 의미있는 에러 메시지 표시

---

## 6. 상태 기반 UI 렌더링 전략

### 6.1 조건부 렌더링 패턴

프로젝트에서 사용하는 상태 기반 렌더링:

```tsx
// UsersPage.tsx - 상태에 따른 UI 분기
return (
  <Container maxWidth="md" sx={{ py: 4, display: 'grid', gap: 2 }}>
    <Typography variant="h4" fontWeight={800}>
      사용자 목록
    </Typography>

    {/* 검색 입력 - 항상 표시 */}
    <TextField
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="이름/아이디/이메일 검색"
      // ... props
    />

    {/* 📍 상태별 조건부 렌더링 */}
    {status === 'idle' && <Alert severity="info">대기 중…</Alert>}
    
    {status === 'loading' && (
      <Stack spacing={1}>
        <LinearProgress />
        <Typography variant="body2" color="text.secondary">
          불러오는 중…
        </Typography>
      </Stack>
    )}
    
    {status === 'error' && (
      <Alert severity="error" role="alert">
        데이터를 불러오지 못했습니다. 잠시 후 다시 시도하세요.
      </Alert>
    )}
    
    {status === 'success' && <UsersList users={filtered} />}
  </Container>
);
```

**렌더링 전략의 핵심**:
1. **Early Return 패턴**: 각 상태에 맞는 UI만 렌더링
2. **접근성 고려**: `role="alert"`로 스크린 리더 지원
3. **사용자 경험**: 로딩 시각화, 명확한 에러 메시지

### 6.2 리스트 렌더링과 성능 최적화

```tsx
// UsersList.tsx - 효율적인 리스트 렌더링
export default function UsersList({ users }: Props) {
  // 📍 빈 상태 처리
  if (users.length === 0) {
    return <Typography color="text.secondary">결과가 없습니다.</Typography>;
  }
  
  return (
    <Grid container spacing={1.5}>
      {users.map((u) => (
        <Grid key={u.id} size={{ xs: 12, sm: 6 }}>  {/* 📍 안정적인 key */}
          <UserCard user={u} />
        </Grid>
      ))}
    </Grid>
  );
}
```

**리스트 렌더링 베스트 프랙티스**:
1. **안정적인 key**: `user.id`와 같은 고유 식별자 사용
2. **빈 상태 처리**: 데이터가 없을 때의 사용자 경험 고려
3. **반응형 그리드**: 화면 크기에 따른 적응형 레이아웃

### 6.3 컴포넌트 분리와 관심사 분리

```tsx
// UserCard.tsx - 프레젠테이션 컴포넌트
export default function UserCard({ user }: Props) {
  // 📍 안전한 데이터 접근
  const initial = user.name?.trim()?.charAt(0).toUpperCase() || 'U';
  
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardHeader
        avatar={<Avatar>{initial}</Avatar>}
        title={user.name}
        subheader={`@${user.username}`}
        sx={{ '& .MuiCardHeader-title': { fontWeight: 700 } }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary">
          <PersonIcon fontSize="small" />
          <Link href={`mailto:${user.email}`} underline="hover">
            {user.email}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
```

**컴포넌트 설계 원칙**:
1. **데이터 안전성**: 옵셔널 체이닝으로 안전한 접근
2. **단일 책임**: 사용자 카드 표시만 담당
3. **재사용성**: props를 통해 다양한 상황에서 활용 가능

---

## 7. 실습 프로젝트 상세 분석

### 7.1 전체 아키텍처

```
App (루트)
├── ThemeProvider (Material-UI 테마)
├── UsersPage (데이터 페칭 + 상태 관리)
│   ├── TextField (검색 입력)
│   ├── Alert/LinearProgress (상태 표시)
│   └── UsersList (리스트 컨테이너)
│       └── UserCard (개별 카드)
└── ResizeWatcher (브라우저 이벤트 데모)
```

### 7.2 데이터 플로우 분석

```
1. 컴포넌트 마운트
   ↓
2. useEffect 실행 (API 호출 시작)
   ↓
3. 로딩 상태 표시 (LinearProgress)
   ↓
4. API 응답 수신
   ↓
5. 성공/에러 상태 업데이트
   ↓
6. 사용자가 검색어 입력
   ↓
7. useMemo로 필터링된 결과 계산
   ↓
8. 필터링된 결과 렌더링
```

### 7.3 Hook 사용 패턴 요약

| Hook | 사용처 | 목적 | 패턴 |
|------|--------|------|------|
| `useState` | 상태 관리 | 컴포넌트 상태 추적 | `const [state, setState] = useState(initial)` |
| `useEffect` | 사이드 이펙트 | API 호출, 이벤트 리스너 | `useEffect(() => { /* logic */ return cleanup; }, [deps])` |
| `useMemo` | 성능 최적화 | 값 메모이제이션 | `useMemo(() => calculation, [deps])` |

---

## 8. Hook 사용 시 주의사항과 베스트 프랙티스

### 8.1 의존성 배열 관리

#### A) ESLint 규칙 활용
```json
// .eslintrc.json
{
  "rules": {
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

#### B) 의존성 최소화 전략
```tsx
// ❌ 불필요한 의존성
function BadComponent({ user, onUpdate }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchUserData(user.id).then(setData);
  }, [user, onUpdate]); // onUpdate는 불필요한 의존성
}

// ✅ 필요한 의존성만
function GoodComponent({ user, onUpdate }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchUserData(user.id).then(setData);
  }, [user.id]); // 실제 사용하는 값만 의존성에 포함
}
```

### 8.2 메모리 누수 방지

#### A) 이벤트 리스너 정리
```tsx
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  // 📍 반드시 정리 함수 제공
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

#### B) 비동기 작업 취소
```tsx
useEffect(() => {
  const controller = new AbortController();
  let cancelled = false;
  
  const fetchData = async () => {
    try {
      const data = await api.getData(controller.signal);
      if (!cancelled) setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  };
  
  fetchData();
  
  return () => {
    cancelled = true;
    controller.abort();
  };
}, []);
```

### 8.3 성능 최적화 가이드라인

#### A) useMemo 사용 기준
```tsx
// ✅ 복잡한 계산에 사용
const expensiveResult = useMemo(() => {
  return data.reduce((acc, item) => {
    return acc + complexCalculation(item);
  }, 0);
}, [data]);

// ❌ 단순한 계산에는 불필요
const simple = useMemo(() => a + b, [a, b]); // 오버엔지니어링
```

#### B) useCallback과 함께 사용
```tsx
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);

const filteredItems = useMemo(() => {
  return items.filter(item => item.category === selectedCategory);
}, [items, selectedCategory]);
```

---

## 9. 고급 패턴과 확장 가능성

### 9.1 커스텀 Hook 패턴

```tsx
// 데이터 페칭을 재사용 가능한 Hook으로 추출
function useUsers() {
  const [status, setStatus] = useState<Status>('idle');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    const controller = new AbortController();
    let cancelled = false;

    try {
      setStatus('loading');
      setError(null);
      const data = await fetchUsers(controller.signal);
      if (!cancelled) {
        setUsers(data);
        setStatus('success');
      }
    } catch (err) {
      if (err.name !== 'AbortError' && !cancelled) {
        setError(err);
        setStatus('error');
      }
    }

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const cleanup = refetch();
    return cleanup;
  }, [refetch]);

  return {
    users,
    status,
    error,
    refetch
  };
}

// 사용
function UsersPage() {
  const { users, status, error, refetch } = useUsers();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    // 필터링 로직
  }, [users, query]);

  return (
    // UI 렌더링
  );
}
```

### 9.2 에러 바운더리와 통합

```tsx
// ErrorBoundary 컴포넌트
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={() => window.location.reload()} />;
    }

    return this.props.children;
  }
}

// 사용
function App() {
  return (
    <ErrorBoundary>
      <UsersPage />
    </ErrorBoundary>
  );
}
```

### 9.3 테스팅 전략

```tsx
// UsersPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UsersPage from './UsersPage';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('사용자 목록을 불러와서 표시한다', async () => {
  render(<UsersPage />);
  
  // 로딩 상태 확인
  expect(screen.getByText('불러오는 중…')).toBeInTheDocument();
  
  // 데이터 로딩 완료 대기
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  // 사용자 정보 확인
  expect(screen.getByText('@johndoe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});
```

---

## 핵심 요약

### 1. Hook의 본질
- **함수형 컴포넌트의 상태와 생명주기**: 클래스 컴포넌트 없이도 완전한 기능 구현
- **로직 재사용**: 커스텀 Hook으로 상태 로직 공유
- **관심사 분리**: 관련된 로직을 한 곳에 모아 관리

### 2. 핵심 Hook 활용
- **useState**: 컴포넌트 상태 관리, 타입 안전성, 함수형 업데이트
- **useEffect**: 사이드 이펙트 처리, 정리 함수, 의존성 배열 관리
- **useMemo**: 성능 최적화, 값 메모이제이션, 적절한 사용 기준

### 3. 비동기 데이터 처리
- **상태 머신 패턴**: 명확한 로딩/성공/에러 상태 관리
- **AbortController**: 요청 취소와 메모리 누수 방지
- **경쟁 상태 해결**: cancelled 플래그와 정리 함수 활용

### 4. 성능과 안전성
- **의존성 배열**: ESLint 규칙 활용, 필요한 의존성만 포함
- **메모리 관리**: 이벤트 리스너, 타이머, 구독 정리
- **에러 처리**: 타입별 에러 처리, 사용자 친화적 메시지

---

## 다음 단계 학습 로드맵

### 즉시 적용 가능
1. **useCallback**: 함수 메모이제이션과 자식 컴포넌트 최적화
2. **useRef**: DOM 접근과 값 참조 관리
3. **useReducer**: 복잡한 상태 로직 관리

### 중급 개발자
1. **커스텀 Hook**: 로직 재사용과 관심사 분리
2. **Context API**: 전역 상태 관리
3. **Suspense**: 비동기 컴포넌트와 로딩 상태 관리

### 고급 패턴
1. **React Query/SWR**: 서버 상태 관리
2. **Zustand/Jotai**: 경량 전역 상태 관리
3. **React Hook Form**: 폼 상태 최적화

### 실무 완성
1. **에러 바운더리**: 전역 에러 처리
2. **성능 모니터링**: React DevTools 활용
3. **테스팅**: Hook 테스팅 전략

---

## 실습 과제

### 기본 과제
1. **리트라이 기능 추가**
   - 에러 상태에서 "다시 시도" 버튼 구현
   - 재요청 시 로딩 상태 관리

2. **검색 디바운싱**
   - 검색어 입력 시 즉시 필터링하지 않고 300ms 지연 후 처리
   - useEffect와 setTimeout 활용

### 중급 과제
1. **무한 스크롤**
   - Intersection Observer API 활용
   - 페이지네이션된 데이터 로딩

2. **로컬 스토리지 연동**
   - 검색어를 localStorage에 저장
   - 페이지 새로고침 시에도 검색어 유지

### 고급 과제
1. **커스텀 Hook 추출**
   - useUsers Hook으로 데이터 페칭 로직 분리
   - useLocalStorage Hook으로 저장소 로직 추상화

2. **에러 복구 전략**
   - 네트워크 에러 시 자동 재시도
   - 지수 백오프 알고리즘 구현

이러한 과제들을 통해 React Hook의 실무 활용 능력을 키우고, 확장 가능하고 유지보수가 용이한 애플리케이션을 개발할 수 있습니다.