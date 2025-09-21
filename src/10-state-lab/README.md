# React 외부 상태 관리 완전 가이드
*Redux Toolkit을 활용한 현대적 상태 관리 기법*

---

## 📚 목차

1. [React 상태 관리의 이해](#1-react-상태-관리의-이해)
2. [외부 상태 관리의 필요성](#2-외부-상태-관리의-필요성)
3. [Redux Toolkit 소개](#3-redux-toolkit-소개)
4. [프로젝트 구조와 설정](#4-프로젝트-구조와-설정)
5. [상태 슬라이스(Slice) 설계](#5-상태-슬라이스slice-설계)
6. [비동기 상태 관리](#6-비동기-상태-관리)
7. [컴포넌트와 상태 연결](#7-컴포넌트와-상태-연결)
8. [영속화와 데이터 보존](#8-영속화와-데이터-보존)
9. [베스트 프랙티스](#9-베스트-프랙티스)
10. [실무 적용 가이드](#10-실무-적용-가이드)

---

## 1. React 상태 관리의 이해

### 1.1 상태(State)란 무엇인가?

React에서 **상태(State)**는 컴포넌트가 기억하고 있어야 하는 데이터를 의미합니다. 사용자의 입력, API 응답, UI의 현재 모습 등을 관리하는 메커니즘입니다.

#### 로컬 상태 vs 전역 상태

**로컬 상태 (Local State)**
- 특정 컴포넌트 내에서만 사용되는 상태
- `useState`, `useReducer` 등으로 관리
- 예: 폼 입력값, 모달 열림/닫힘 상태

**전역 상태 (Global State)**
- 여러 컴포넌트에서 공유해야 하는 상태
- 애플리케이션 전체에서 접근 가능
- 예: 사용자 로그인 정보, 테마 설정, 장바구니 데이터

### 1.2 Props Drilling 문제

React는 기본적으로 부모에서 자식으로만 데이터를 전달할 수 있습니다. 깊게 중첩된 컴포넌트에 데이터를 전달하려면 중간 컴포넌트들을 모두 거쳐야 합니다.

```
App
├─ Header
│  └─ UserMenu (user 정보 필요)
├─ Content
│  └─ Profile
│     └─ UserDetails (user 정보 필요)
└─ Footer
   └─ Copyright (user 정보 필요)
```

이런 구조에서 `user` 정보를 각 컴포넌트에 전달하려면, 실제로 사용하지 않는 중간 컴포넌트들도 모두 props를 받아서 전달해야 합니다.

---

## 2. 외부 상태 관리의 필요성

### 2.1 언제 외부 상태 관리가 필요한가?

다음과 같은 상황에서 외부 상태 관리를 고려해야 합니다:

1. **사용자 인증 정보**: 로그인한 사용자 정보를 여러 컴포넌트에서 사용
2. **전역 설정**: 테마, 언어 설정 등
3. **캐시된 데이터**: API로 받아온 데이터를 여러 곳에서 재사용
4. **복잡한 폼 상태**: 여러 단계의 폼이나 복잡한 유효성 검사
5. **실시간 데이터**: 채팅, 알림 등

### 2.2 외부 상태 관리의 장점

- **데이터 일관성**: 하나의 진실의 원천(Single Source of Truth)
- **성능 향상**: 불필요한 props drilling 제거
- **개발 효율성**: 상태 로직의 재사용성 증대
- **디버깅 용이성**: 상태 변화 추적 가능
- **테스트 용이성**: 상태 로직을 독립적으로 테스트 가능

---

## 3. Redux Toolkit 소개

### 3.1 Redux의 진화

**Redux**는 JavaScript 애플리케이션을 위한 예측 가능한 상태 컨테이너입니다. 하지만 전통적인 Redux는 많은 보일러플레이트 코드가 필요했습니다.

**Redux Toolkit (RTK)**은 Redux를 더 쉽고 효율적으로 사용할 수 있도록 만든 공식 도구 세트입니다.

### 3.2 Redux Toolkit의 핵심 개념

#### Action (액션)
상태 변화를 나타내는 객체입니다.
```javascript
{ type: 'counter/increment' }
{ type: 'auth/login', payload: { user: {...} } }
```

#### Reducer (리듀서)
액션을 받아서 새로운 상태를 반환하는 순수 함수입니다.

#### Store (스토어)
애플리케이션의 전체 상태를 담고 있는 객체입니다.

#### Slice (슬라이스)
Redux Toolkit의 핵심 개념으로, 관련된 상태와 리듀서를 한 곳에 모은 것입니다.

### 3.3 Redux Toolkit의 장점

- **간소화된 설정**: `configureStore`로 쉬운 스토어 설정
- **Immer 내장**: 불변성을 자동으로 처리
- **RTK Query**: 강력한 데이터 페칭 및 캐싱 솔루션
- **개발자 도구**: Redux DevTools 자동 설정
- **TypeScript 지원**: 타입 안전성 보장

---

## 4. 프로젝트 구조와 설정

### 4.1 폴더 구조

프로젝트에서 사용한 구조를 살펴보겠습니다:

```
src/
├─ lib/
│  └─ auth.ts              # API 함수들
├─ store/
│  ├─ index.ts             # 스토어 설정
│  ├─ hooks.ts             # 타입이 지정된 훅
│  ├─ counterSlice.ts      # 카운터 상태 슬라이스
│  └─ authSlice.ts         # 인증 상태 슬라이스
├─ components/
│  ├─ CounterRedux.tsx     # 카운터 컴포넌트
│  └─ AuthRedux.tsx        # 인증 컴포넌트
└─ AppRedux.tsx            # 메인 앱 컴포넌트
```

### 4.2 스토어 설정 분석

프로젝트의 `src/store/index.ts` 파일을 살펴보겠습니다:

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counter from './counterSlice';
import auth, { hydrate } from './authSlice';

const KEY = 'state.auth';

function loadAuth() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.token && parsed?.user) return parsed;
  } catch {/*no-empty*/}
  return null;
}

export const store = configureStore({
  reducer: { counter, auth },
});

const restored = loadAuth();
if (restored) store.dispatch(hydrate(restored));

store.subscribe(() => {
  const s = store.getState();
  try {
    if (s.auth.token && s.auth.user) {
      localStorage.setItem(KEY, JSON.stringify({ token: s.auth.token, user: s.auth.user }));
    } else {
      localStorage.removeItem(KEY);
    }
  } catch {/*localStorage 접근 실패 시 무시*/}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### 주요 구성 요소 설명:

1. **configureStore**: Redux Toolkit의 스토어 생성 함수
2. **reducer 결합**: 여러 슬라이스를 하나의 스토어에 결합
3. **영속화 로직**: 로컬스토리지를 사용한 데이터 보존
4. **타입 정의**: TypeScript 지원을 위한 타입 내보내기

### 4.3 타입 안전성을 위한 훅

`src/store/hooks.ts` 파일:

```typescript
// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

이 훅들은 TypeScript의 타입 안전성을 보장하면서 Redux 상태를 사용할 수 있게 해줍니다.

---

## 5. 상태 슬라이스(Slice) 설계

### 5.1 카운터 슬라이스 분석

`src/store/counterSlice.ts`의 구조를 자세히 살펴보겠습니다:

```typescript
// src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = { value: number };
const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (s) => { s.value += 1; },
    decrement: (s) => { s.value = Math.max(0, s.value - 1); },
    addBy: (s, a: PayloadAction<number>) => { s.value += a.payload; },
    reset: () => initialState,
  }
});

export const { increment, decrement, addBy, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

#### 핵심 구성 요소:

1. **State 타입 정의**: `CounterState` 인터페이스로 상태 구조 명시
2. **초기 상태**: `initialState`로 기본값 설정
3. **Slice 생성**: `createSlice`로 액션과 리듀서를 한번에 정의
4. **Immer 활용**: `s.value += 1` 같은 직접 수정이 가능 (내부적으로 불변성 보장)
5. **액션 내보내기**: 자동 생성된 액션 크리에이터들

### 5.2 슬라이스 설계 원칙

#### 단일 책임 원칙
각 슬라이스는 하나의 관련된 기능만 담당해야 합니다.
- `counterSlice`: 카운터 관련 상태만
- `authSlice`: 인증 관련 상태만

#### 최소한의 상태
파생될 수 있는 데이터는 상태에 포함하지 않습니다.
```typescript
// 좋은 예
type CounterState = { value: number };

// 나쁜 예 (doubled는 계산으로 구할 수 있음)
type CounterState = { 
  value: number; 
  doubled: number; 
};
```

#### 정규화된 상태 구조
복잡한 데이터는 정규화해서 저장합니다.
```typescript
// 좋은 예
type PostsState = {
  byId: Record<string, Post>;
  allIds: string[];
};

// 나쁜 예 (중복과 일관성 문제)
type PostsState = {
  posts: Post[];
  selectedPost: Post;
};
```

---

## 6. 비동기 상태 관리

### 6.1 createAsyncThunk의 이해

프로젝트의 인증 슬라이스(`src/store/authSlice.ts`)에서 비동기 처리를 어떻게 구현했는지 살펴보겠습니다:

```typescript
// src/store/authSlice.ts (일부)
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (input: LoginInput, { rejectWithValue }) => {
    try { 
      return await loginApi(input); 
    }
    catch (e: unknown) { 
      const errorMessage = e instanceof Error ? e.message : '로그인 실패';
      return rejectWithValue(errorMessage); 
    }
  }
);
```

#### createAsyncThunk의 생명주기:

1. **Pending**: 요청 시작 (`auth/login/pending`)
2. **Fulfilled**: 요청 성공 (`auth/login/fulfilled`)
3. **Rejected**: 요청 실패 (`auth/login/rejected`)

### 6.2 비동기 상태 관리 패턴

#### 상태 구조 설계
```typescript
type Status = 'idle' | 'loading' | 'error';
type AuthState = {
  token: string | null;
  user: User | null;
  status: Status;
  error?: string;
};
```

#### extraReducers로 비동기 액션 처리
```typescript
extraReducers: (b) => {
  b.addCase(loginThunk.pending, (s) => { 
    s.status = 'loading'; 
    s.error = undefined; 
  });
  b.addCase(loginThunk.fulfilled, (s, a) => {
    s.status = 'idle'; 
    s.token = a.payload.token; 
    s.user = a.payload.user;
  });
  b.addCase(loginThunk.rejected, (s, a) => {
    s.status = 'error'; 
    s.error = String(a.payload ?? a.error?.message ?? '오류');
  });
}
```

### 6.3 에러 처리 전략

#### 1. rejectWithValue 활용
사용자 친화적인 에러 메시지를 제공합니다:

```typescript
async (input: LoginInput, { rejectWithValue }) => {
  try { 
    return await loginApi(input); 
  }
  catch (e: unknown) { 
    const errorMessage = e instanceof Error ? e.message : '로그인 실패';
    return rejectWithValue(errorMessage); 
  }
}
```

#### 2. UI에서 에러 표시
컴포넌트에서 에러 상태를 적절히 처리합니다:

```typescript
// src/components/AuthRedux.tsx (일부)
{status === 'error' && (
  <Box mt={2}>
    <Alert severity="error">{error}</Alert>
  </Box>
)}
```

---

## 7. 컴포넌트와 상태 연결

### 7.1 인증 컴포넌트 분석

`src/components/AuthRedux.tsx`에서 Redux 상태를 어떻게 사용하는지 분석해보겠습니다:

```typescript
// src/components/AuthRedux.tsx (핵심 부분)
export default function AuthRedux() {
  const { token, user, status, error } = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('pass');

  const login = () => dispatch(loginThunk({ username, password }));
  const logout = () => dispatch(logoutThunk());

  // UI 렌더링...
}
```

#### 핵심 패턴들:

1. **선택적 구독**: `useAppSelector`로 필요한 상태만 선택
2. **액션 디스패치**: `useAppDispatch`로 상태 변경 요청
3. **로컬 상태와 전역 상태 조합**: 폼 입력은 로컬, 인증 정보는 전역

### 7.2 상태 선택 최적화

#### 좋은 예: 필요한 것만 선택
```typescript
const { token, user, status, error } = useAppSelector(s => s.auth);
```

#### 나쁜 예: 전체 상태 선택 (불필요한 리렌더링 발생)
```typescript
const authState = useAppSelector(s => s.auth); // 모든 변경에 리렌더링
```

#### 계산된 값 사용
```typescript
const isAuthenticated = useAppSelector(s => !!s.auth.token);
const isLoading = useAppSelector(s => s.auth.status === 'loading');
```

### 7.3 카운터 컴포넌트 패턴

`src/components/CounterRedux.tsx`의 패턴을 살펴보겠습니다:

```typescript
// src/components/CounterRedux.tsx (핵심 로직)
export default function CounterRedux() {
  const count = useAppSelector(s => s.counter.value);
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);

  return (
    <Card elevation={3}>
      <CardContent>
        {/* 현재 값 표시 */}
        <Chip 
          label={count} 
          color="primary" 
          variant="outlined"
          sx={{ minWidth: 60, fontSize: '1.2rem' }}
        />
        
        {/* 기본 액션들 */}
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Button onClick={() => dispatch(increment())}>+</Button>
        <Button onClick={() => dispatch(reset())}>Reset</Button>
        
        {/* 매개변수가 있는 액션 */}
        <Button onClick={() => dispatch(addBy(step))}>+{step}</Button>
      </CardContent>
    </Card>
  );
}
```

#### 주요 특징:
1. **간단한 상태 선택**: 단일 값만 구독
2. **다양한 액션 활용**: 매개변수 있는 액션과 없는 액션
3. **로컬 상태 조합**: step 값은 컴포넌트 내부에서 관리

---

## 8. 영속화와 데이터 보존

### 8.1 영속화의 필요성

사용자가 페이지를 새로고침하거나 브라우저를 재시작해도 중요한 상태(로그인 정보 등)는 유지되어야 합니다.

### 8.2 구현 방식 분석

프로젝트에서는 간단하지만 효과적인 영속화 방식을 사용했습니다:

```typescript
// src/store/index.ts (영속화 로직)
const KEY = 'state.auth';

// 초기 로드 시 복원
function loadAuth() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.token && parsed?.user) return parsed;
  } catch {/*no-empty*/}
  return null;
}

// 스토어 생성 후 복원
const restored = loadAuth();
if (restored) store.dispatch(hydrate(restored));

// 상태 변경 시 저장
store.subscribe(() => {
  const s = store.getState();
  try {
    if (s.auth.token && s.auth.user) {
      localStorage.setItem(KEY, JSON.stringify({ 
        token: s.auth.token, 
        user: s.auth.user 
      }));
    } else {
      localStorage.removeItem(KEY);
    }
  } catch {/*localStorage 접근 실패 시 무시*/}
});
```

### 8.3 영속화 전략

#### 선택적 영속화
모든 상태를 저장하지 않고, 필요한 부분만 저장합니다:
- ✅ 저장: 로그인 토큰, 사용자 정보
- ❌ 미저장: 로딩 상태, 에러 메시지, 임시 데이터

#### 안전한 저장/복원
```typescript
// 안전한 저장
try {
  localStorage.setItem(key, JSON.stringify(data));
} catch {
  // localStorage 접근 실패 시 조용히 무시
}

// 안전한 복원
function loadData() {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // 데이터 검증
    if (isValidData(parsed)) return parsed;
  } catch {
    // 파싱 실패 시 기본값 반환
  }
  return null;
}
```

### 8.4 Hydrate 패턴

상태 복원을 위한 특별한 액션을 정의합니다:

```typescript
// authSlice.ts에서
reducers: {
  hydrate(state, { payload }: { payload: { token: string; user: User } }) {
    state.token = payload.token;
    state.user = payload.user;
    state.status = 'idle';
    state.error = undefined;
  },
  // ...
}
```

이 패턴의 장점:
- 명시적인 복원 과정
- 부분적 상태 복원 가능
- 복원 과정에서의 상태 검증 가능

---

## 9. 베스트 프랙티스

### 9.1 상태 설계 원칙

#### 정규화된 상태 구조
```typescript
// 좋은 예: 정규화된 구조
type UsersState = {
  byId: Record<string, User>;
  allIds: string[];
  loading: boolean;
};

// 나쁜 예: 비정규화된 구조
type UsersState = {
  users: User[];
  selectedUser: User | null; // 중복 가능성
};
```

#### 최소한의 상태
```typescript
// 좋은 예: 최소한의 상태
type TodoState = {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
};

// 파생 데이터는 selector로
const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => todos.filter(todo => {
    // 필터링 로직
  })
);
```

### 9.2 성능 최적화

#### Selector 최적화
```typescript
// 좋은 예: 필요한 데이터만 선택
const userName = useAppSelector(s => s.auth.user?.name);

// 나쁜 예: 전체 객체 선택
const auth = useAppSelector(s => s.auth); // 불필요한 리렌더링
```

#### 메모이제이션 활용
```typescript
import { createSelector } from '@reduxjs/toolkit';

const selectExpensiveComputation = createSelector(
  [selectLargeDataSet, selectFilter],
  (data, filter) => {
    // 비싼 계산 로직
    return data.filter(item => item.type === filter);
  }
);
```

### 9.3 에러 처리 패턴

#### 일관된 에러 상태 관리
```typescript
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// 모든 비동기 슬라이스에서 동일한 패턴 사용
```

#### 사용자 친화적 에러 메시지
```typescript
async (input: LoginInput, { rejectWithValue }) => {
  try {
    return await loginApi(input);
  } catch (error) {
    if (error instanceof Error) {
      // 구체적인 에러 메시지 제공
      return rejectWithValue(error.message);
    }
    return rejectWithValue('알 수 없는 오류가 발생했습니다');
  }
}
```

### 9.4 타입 안전성

#### 강타입 Slice 정의
```typescript
type CounterState = {
  value: number;
  step: number;
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, step: 1 } as CounterState,
  reducers: {
    // 타입 안전한 리듀서들
  }
});
```

#### 커스텀 훅 활용
```typescript
// 도메인별 커스텀 훅
export const useAuth = () => {
  const auth = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  
  return {
    ...auth,
    login: (data: LoginInput) => dispatch(loginThunk(data)),
    logout: () => dispatch(logoutThunk()),
    isAuthenticated: !!auth.token,
  };
};
```

---

## 10. 실무 적용 가이드

### 10.1 점진적 도입 전략

#### 1단계: 핵심 전역 상태 식별
- 사용자 인증 정보
- 애플리케이션 설정
- 글로벌 UI 상태 (테마, 언어 등)

#### 2단계: 간단한 슬라이스부터 시작
```typescript
// 설정 슬라이스 (간단한 예)
const settingsSlice = createSlice({
  name: 'settings',
  initialState: { theme: 'light', language: 'ko' },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    }
  }
});
```

#### 3단계: 복잡한 비동기 로직 추가
- API 호출이 필요한 기능
- 복잡한 상태 변화가 있는 기능

### 10.2 코드 구조화 가이드

#### 폴더 구조 권장사항
```
src/
├─ store/
│  ├─ index.ts           # 스토어 설정
│  ├─ hooks.ts           # 타입 안전 훅
│  └─ slices/
│     ├─ authSlice.ts
│     ├─ settingsSlice.ts
│     └─ index.ts        # 슬라이스 재내보내기
├─ lib/
│  └─ api/              # API 함수들
├─ hooks/
│  └─ domain/           # 도메인별 커스텀 훅
└─ components/
```

#### 네이밍 컨벤션
- 슬라이스: `authSlice`, `userSlice`
- 액션: `login`, `logout`, `updateProfile`
- Thunk: `loginThunk`, `fetchUserThunk`
- 상태 타입: `AuthState`, `UserState`

### 10.3 테스트 전략

#### 슬라이스 테스트
```typescript
describe('authSlice', () => {
  it('should handle login success', () => {
    const initialState = { token: null, user: null, status: 'idle' };
    const action = { type: 'auth/login/fulfilled', payload: mockUser };
    const state = authReducer(initialState, action);
    
    expect(state.user).toEqual(mockUser);
    expect(state.status).toBe('idle');
  });
});
```

#### 컴포넌트 테스트
```typescript
const renderWithStore = (component: ReactElement) => {
  const store = configureStore({
    reducer: { auth: authSlice.reducer }
  });
  
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};
```

### 10.4 성능 모니터링

#### Redux DevTools 활용
- 액션 디스패치 추적
- 상태 변화 시각화
- 시간 여행 디버깅

#### 리렌더링 최적화 체크
```typescript
// React Developer Tools Profiler 사용
// 불필요한 리렌더링 체크
const Component = React.memo(() => {
  const specificValue = useAppSelector(s => s.specific.value);
  // ...
});
```

### 10.5 마이그레이션 가이드

#### 기존 Context API에서 Redux로
```typescript
// Before: Context API
const UserContext = createContext();

// After: Redux Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { /* ... */ }
});
```

#### 기존 useState에서 Redux로
```typescript
// Before: Component state
const [user, setUser] = useState(null);

// After: Redux state
const user = useAppSelector(s => s.auth.user);
const dispatch = useAppDispatch();
```

---

## 📝 마무리

Redux Toolkit을 활용한 외부 상태 관리는 복잡한 React 애플리케이션에서 상태를 체계적으로 관리하는 강력한 도구입니다. 

### 핵심 요점 정리:

1. **적절한 사용**: 모든 상태를 전역으로 만들 필요는 없습니다
2. **타입 안전성**: TypeScript와 함께 사용하여 런타임 에러 방지
3. **점진적 도입**: 핵심 기능부터 시작해서 점진적으로 확장
4. **성능 고려**: 선택적 구독과 메모이제이션 활용
5. **일관된 패턴**: 팀 내에서 일관된 상태 관리 패턴 유지

### 다음 단계:

- RTK Query를 활용한 서버 상태 관리
- 복잡한 비동기 플로우 처리
- 실시간 데이터 연동
- 대용량 데이터 최적화

이 가이드를 바탕으로 실제 프로젝트에 Redux Toolkit을 적용해보세요. 처음에는 어려울 수 있지만, 일단 익숙해지면 복잡한 상태 관리가 훨씬 수월해질 것입니다.

