# React Context API 완벽 가이드
## 전역 상태 관리와 테마 시스템 구현

> **학습 목표**: React Context API를 이해하고, 실제 프로젝트에서 전역 상태 관리를 위해 언제, 어떻게 사용하는지 학습한다.

---

## 📚 목차

1. [전역 상태 관리의 필요성](#1-전역-상태-관리의-필요성)
2. [React Context API 이해](#2-react-context-api-이해)
3. [useReducer와 Context 조합](#3-usereducer와-context-조합)
4. [성능 최적화 전략](#4-성능-최적화-전략)
5. [실전 프로젝트 분석](#5-실전-프로젝트-분석)
6. [고급 패턴과 베스트 프랙티스](#6-고급-패턴과-베스트-프랙티스)
7. [실습 미션](#7-실습-미션)

---

## 1. 전역 상태 관리의 필요성

### 1.1 Props Drilling 문제

React 애플리케이션이 커질수록 **Props Drilling** 문제가 발생합니다:

```tsx
// 문제 상황: 깊은 컴포넌트 트리
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return (
    <Layout user={user} theme={theme} setTheme={setTheme}>
      <Dashboard user={user} theme={theme} setTheme={setTheme}>
        <UserProfile user={user} theme={theme} setTheme={setTheme}>
          <ThemeToggleButton theme={theme} setTheme={setTheme} />
        </UserProfile>
      </Dashboard>
    </Layout>
  );
}
```

**문제점**:
- 중간 컴포넌트들이 사용하지 않는 props를 계속 전달해야 함
- 새로운 전역 상태 추가 시 모든 중간 컴포넌트 수정 필요
- 코드 유지보수성 저하

### 1.2 전역 상태가 필요한 경우들

| 상태 유형 | 예시 | 특징 |
|----------|------|------|
| **UI 설정** | 테마, 언어, 폰트 크기 | 앱 전체에 영향, 낮은 변경 빈도 |
| **사용자 정보** | 로그인 상태, 권한, 프로필 | 많은 컴포넌트에서 참조 |
| **기능 플래그** | A/B 테스트, 기능 토글 | 조건부 렌더링에 사용 |
| **앱 상태** | 로딩, 에러, 알림 | 전역적인 피드백 필요 |

### 1.3 Context API vs 다른 상태 관리 도구

#### Context API를 사용하는 경우
```
✅ UI 전역 설정 (테마, 언어 등)
✅ 사용자 인증 정보
✅ 변경 빈도가 낮은 상태
✅ React 생태계 내에서 완결
```

#### Redux/Zustand를 고려하는 경우
```
🔄 복잡한 비즈니스 로직
🔄 고빈도 상태 업데이트
🔄 미들웨어 (로깅, 비동기 처리)
🔄 시간 여행 디버깅 필요
```

---

## 2. React Context API 이해

### 2.1 Context의 기본 개념

**Context**는 React에서 컴포넌트 트리를 통해 데이터를 전역적으로 공유하는 방법입니다.

#### 핵심 구성 요소
```tsx
// 1. Context 생성
const MyContext = createContext(defaultValue);

// 2. Provider로 값 제공
<MyContext.Provider value={someValue}>
  <ChildComponents />
</MyContext.Provider>

// 3. Consumer에서 값 사용
const value = useContext(MyContext);
```

### 2.2 Context 생성과 타입 정의

본 프로젝트의 테마 시스템을 예로 살펴보겠습니다:

```tsx
// ThemeContext.tsx
export type ThemeOption = 'light' | 'dark' | 'system';
export type EffectiveTheme = 'light' | 'dark';

type ThemeState = {
  option: ThemeOption;        // 사용자가 선택한 옵션
  effective: EffectiveTheme;  // 실제 적용되는 테마
};
```

**타입 설계 포인트**:
- `option`: 사용자의 선택을 저장 ('system' 포함)
- `effective`: 실제 화면에 적용되는 테마 ('light' 또는 'dark')
- `system` 옵션 시 OS 설정에 따라 `effective` 자동 결정

### 2.3 Context 생성과 초기값 설정

```tsx
// ThemeContext.tsx
const ThemeStateContext = createContext<ThemeState | null>(null);
const ThemeMethodsContext = createContext<{
  setOption: (o: ThemeOption) => void;
  toggle: () => void;
} | null>(null);
```

**Context 분리의 이유**:
- **상태(State)와 액션(Methods) 분리**로 불필요한 리렌더링 방지
- 상태만 필요한 컴포넌트와 액션만 필요한 컴포넌트 구분 가능

### 2.4 Provider 구현

```tsx
// ThemeContext.tsx
export function ThemeProvider({ children }: { children: ReactNode }) {
  const initialOption = getInitialOption(); // localStorage에서 복원
  
  const [state, dispatch] = useReducer(reducer, {
    option: initialOption,
    effective: computeEffective(initialOption),
  });

  // 상태 메모이제이션 (성능 최적화)
  const stateValue = useMemo(() => state, [state]);
  const methodsValue = useMemo(() => ({ setOption, toggle }), [setOption, toggle]);

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeMethodsContext.Provider value={methodsValue}>
        {children}
      </ThemeMethodsContext.Provider>
    </ThemeStateContext.Provider>
  );
}
```

**핵심 패턴**:
1. **중첩된 Provider**: 상태와 메서드를 분리된 Context로 제공
2. **메모이제이션**: `useMemo`로 Provider value 참조 안정성 확보
3. **초기값 복원**: localStorage에서 이전 설정 불러오기

---

## 3. useReducer와 Context 조합

### 3.1 useState vs useReducer 선택 기준

| 상황 | useState | useReducer |
|------|----------|------------|
| **단순한 상태** | ✅ 적합 | ❌ 과도함 |
| **복잡한 상태 로직** | ❌ 복잡함 | ✅ 적합 |
| **여러 액션 타입** | ❌ 어려움 | ✅ 명확함 |
| **상태 전이 추적** | ❌ 어려움 | ✅ 쉬움 |

### 3.2 액션과 리듀서 설계

본 프로젝트의 테마 리듀서를 분석해보겠습니다:

```tsx
// ThemeContext.tsx
type Action =
  | { type: 'SET_OPTION'; option: ThemeOption }      // 사용자 옵션 변경
  | { type: 'SYSTEM_CHANGED'; system: EffectiveTheme }; // 시스템 테마 변경

function reducer(state: ThemeState, action: Action): ThemeState {
  switch (action.type) {
    case 'SET_OPTION': {
      const nextEff = computeEffective(action.option);
      return { option: action.option, effective: nextEff };
    }
    case 'SYSTEM_CHANGED': {
      // system 모드일 때만 반영
      if (state.option !== 'system') return state;
      return { ...state, effective: action.system };
    }
    default:
      return state;
  }
}
```

**설계 포인트**:
1. **명확한 액션 타입**: 각 액션이 하는 일이 명확함
2. **상태 불변성**: 새 객체 반환으로 React 리렌더 보장
3. **조건부 처리**: `SYSTEM_CHANGED`는 system 모드일 때만 적용

### 3.3 복잡한 상태 계산 로직

```tsx
// ThemeContext.tsx
function computeEffective(option: ThemeOption): EffectiveTheme {
  return option === 'system' ? getSystemTheme() : option;
}

function getSystemTheme(): EffectiveTheme {
  if (typeof window === 'undefined') return 'light'; // SSR 대응
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
```

**로직 분석**:
- `system` 선택 시 OS의 다크모드 설정 자동 감지
- 서버 사이드 렌더링(SSR) 환경 고려
- `matchMedia` API로 시스템 테마 감지

---

## 4. 성능 최적화 전략

### 4.1 Context 분리 패턴

본 프로젝트에서 사용한 **상태/액션 분리** 패턴을 살펴보겠습니다:

```tsx
// ThemeContext.tsx
const ThemeStateContext = createContext<ThemeState | null>(null);
const ThemeMethodsContext = createContext<{
  setOption: (o: ThemeOption) => void;
  toggle: () => void;
} | null>(null);
```

#### 분리의 장점
```
🎯 상태만 필요한 컴포넌트 → ThemeStateContext만 구독
🎯 액션만 필요한 컴포넌트 → ThemeMethodsContext만 구독
🎯 불필요한 리렌더링 최소화
```

#### 실제 사용 예시
```tsx
// DemoCard.tsx - 상태만 필요
function DemoCard() {
  const { effective } = useThemeState(); // 액션은 구독하지 않음
  return <div>Current theme: {effective}</div>;
}

// ThemeToggle.tsx - 상태와 액션 모두 필요  
function ThemeToggle() {
  const { option, effective } = useThemeState();
  const { setOption, toggle } = useThemeActions();
  return (
    <div>
      <span>{option} / {effective}</span>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

### 4.2 메모이제이션을 통한 최적화

Provider에서 값의 참조 안정성을 보장하는 방법:

```tsx
// ThemeContext.tsx
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 액션 메서드들 메모이제이션
  const setOption = useCallback((option: ThemeOption) => {
    dispatch({ type: 'SET_OPTION', option });
  }, []);

  const toggle = useCallback(() => {
    const next: EffectiveTheme = state.effective === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'SET_OPTION', option: next });
  }, [state.effective]);

  // Provider value 메모이제이션
  const stateValue = useMemo(() => state, [state]);
  const methodsValue = useMemo(() => ({ setOption, toggle }), [setOption, toggle]);

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeMethodsContext.Provider value={methodsValue}>
        {children}
      </ThemeMethodsContext.Provider>
    </ThemeStateContext.Provider>
  );
}
```

**최적화 효과**:
- Provider value가 매번 새로 생성되는 것을 방지
- Consumer 컴포넌트의 불필요한 리렌더 방지

---

## 5. 실전 프로젝트 분석

### 5.1 전체 아키텍처 이해

본 프로젝트의 구조를 분석해보겠습니다:

```
App (ThemeProvider로 감싸짐)
├── ThemeToggle (상태 읽기 + 액션 실행)
├── DemoCard × 2 (상태만 읽기)
└── ThemeBridge (MUI와 Context 연결)
```

### 5.2 App 컴포넌트와 Provider 구성

```tsx
// App.tsx
export default function App() {
  return (
    <AppThemeProvider>  {/* 커스텀 Context Provider */}
      <ThemeBridge>     {/* MUI와 Context 연결 */}
        <CssBaseline />
        <Container maxWidth="md">
          <Typography variant="h4">
            08. Context API — 다크모드 전환 (MUI)
          </Typography>
          
          <ThemeToggle />  {/* 테마 제어 컴포넌트 */}
          
          <Box sx={{ display: 'grid', gap: 2 }}>
            <DemoCard />   {/* 테마 적용 확인용 */}
            <DemoCard />
          </Box>
        </Container>
      </ThemeBridge>
    </AppThemeProvider>
  );
}
```

**아키텍처 특징**:
- **이중 Provider 구조**: 커스텀 Context + MUI ThemeProvider
- **Bridge 패턴**: 두 시스템 간의 연결고리 역할

### 5.3 ThemeBridge - Context와 MUI 연결

```tsx
// App.tsx
function ThemeBridge({ children }: { children: React.ReactNode }) {
  const { effective } = useTheme(); // 커스텀 Context에서 테마 읽기
  
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: { mode: effective }, // Context 상태를 MUI에 반영
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: [
            'Roboto',
            'Apple SD Gothic Neo',
            'Noto Sans KR',
            'system-ui',
            'sans-serif',
          ].join(','),
        },
      }),
    [effective] // effective가 변경될 때만 MUI 테마 재생성
  );

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}
```

**Bridge 패턴의 장점**:
- Context 상태 변경 시 MUI 테마 자동 업데이트
- MUI 컴포넌트들이 자동으로 다크/라이트 모드 적용
- 두 시스템 간의 결합도 최소화

### 5.4 ThemeToggle 컴포넌트 분석

```tsx
// ThemeToggle.tsx
export default function ThemeToggle() {
  const { option, effective, setOption, toggle } = useTheme();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>, 
    value: 'light' | 'dark' | 'system' | null
  ) => {
    if (value) setOption(value);
  };

  return (
    <Stack spacing={1.5}>
      {/* 현재 상태 표시 */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label={`option: ${option}`} size="small" variant="outlined" />
        <Chip label={`effective: ${effective}`} size="small" />
      </Stack>

      {/* 테마 선택 버튼들 */}
      <Stack direction="row" spacing={1} alignItems="center">
        <ToggleButtonGroup 
          value={option} 
          exclusive 
          onChange={handleChange}
        >
          <ToggleButton value="light">
            <LightModeIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="system">
            <SettingsSuggestIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Button onClick={toggle}>Toggle</Button>
      </Stack>
    </Stack>
  );
}
```

**컴포넌트 분석**:
1. **상태 시각화**: `option`과 `effective` 구분하여 표시
2. **다중 선택 방식**: 개별 버튼 + 토글 버튼 모두 제공
3. **MUI 컴포넌트**: Context와 연동된 MUI 컴포넌트들 사용

### 5.5 부수 효과(Side Effects) 처리

Context Provider에서 여러 부수 효과를 처리합니다:

#### 1. DOM 속성 업데이트
```tsx
// ThemeContext.tsx
useEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', state.effective);
  }
}, [state.effective]);
```

#### 2. localStorage 동기화
```tsx
// ThemeContext.tsx  
useEffect(() => {
  try {
    localStorage.setItem(THEME_KEY, state.option);
  } catch { /* empty */ }
}, [state.option]);
```

#### 3. 시스템 테마 변경 감지
```tsx
// ThemeContext.tsx
useEffect(() => {
  if (typeof window === 'undefined') return;
  const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
  if (!mql) return;

  const applyFromSystem = () =>
    dispatch({ 
      type: 'SYSTEM_CHANGED', 
      system: mql.matches ? 'dark' : 'light' 
    });

  if (state.option === 'system') {
    // 최신 브라우저 API
    if ('addEventListener' in mql) {
      mql.addEventListener('change', applyFromSystem);
      return () => mql.removeEventListener('change', applyFromSystem);
    }
    // 레거시 브라우저 API
    mql.addListener?.(applyFromSystem);
    return () => mql.removeListener?.(applyFromSystem);
  }
}, [state.option]);
```

**부수 효과 처리 패턴**:
- **조건부 구독**: `system` 모드일 때만 미디어 쿼리 리스너 등록
- **브라우저 호환성**: 최신 API와 레거시 API 모두 지원
- **적절한 정리**: cleanup 함수로 리스너 제거

---

## 6. 고급 패턴과 베스트 프랙티스

### 6.1 커스텀 훅 패턴

Context를 안전하게 사용하기 위한 커스텀 훅 패턴:

```tsx
// ThemeContext.tsx
export function useThemeState(): ThemeState {
  const ctx = useContext(ThemeStateContext);
  if (!ctx) throw new Error('useThemeState must be used within ThemeProvider');
  return ctx;
}

export function useThemeActions() {
  const ctx = useContext(ThemeMethodsContext);
  if (!ctx) throw new Error('useThemeActions must be used within ThemeProvider');
  return ctx;
}

// 편의를 위한 통합 훅
export function useTheme() {
  return { ...useThemeState(), ...useThemeActions() };
}
```

**커스텀 훅의 장점**:
1. **타입 안전성**: null 체크로 런타임 에러 방지
2. **명확한 에러 메시지**: Provider 누락 시 친화적 에러
3. **사용 편의성**: 필요한 부분만 선택적으로 구독 가능

### 6.2 초기값 처리와 SSR 대응

```tsx
// ThemeContext.tsx
function getSystemTheme(): EffectiveTheme {
  if (typeof window === 'undefined') return 'light'; // SSR 환경
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialOption(): ThemeOption {
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemeOption | null;
    return saved ?? 'system';
  } catch {
    return 'system'; // localStorage 접근 실패 시 기본값
  }
}
```

**SSR 고려사항**:
- `window` 객체 존재 여부 확인
- localStorage 접근 예외 처리
- 하이드레이션 불일치 방지

### 6.3 에러 경계와 Fallback UI

Context 에러 처리를 위한 패턴:

```tsx
function ThemeErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary 
      fallback={<div>테마 시스템을 불러올 수 없습니다.</div>}
    >
      {children}
    </ErrorBoundary>
  );
}

// 사용법
<ThemeErrorBoundary>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</ThemeErrorBoundary>
```

### 6.4 Context 조합 패턴

여러 Context를 조합할 때의 패턴:

```tsx
// 여러 Provider 조합
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// 사용법
function App() {
  return (
    <AppProviders>
      <Routes />
    </AppProviders>
  );
}
```

---

## 7. 실습 미션

### 7.1 기초 미션

#### 미션 1: 키보드 단축키 추가
테마 토글을 위한 키보드 단축키를 구현하세요.

**요구사항**:
- `Ctrl/Cmd + Shift + T`로 테마 토글
- Provider 내에서 전역 키보드 리스너 구현
- 컴포넌트 언마운트 시 리스너 정리

**힌트**:
```tsx
useEffect(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
      e.preventDefault();
      toggle();
    }
  };
  
  window.addEventListener('keydown', handleKeydown);
  return () => window.removeEventListener('keydown', handleKeydown);
}, [toggle]);
```

#### 미션 2: 테마 전환 애니메이션
테마 변경 시 부드러운 전환 효과를 추가하세요.

**구현 방법**:
- CSS transition 속성 활용
- `data-theme` 속성 변경 시 애니메이션 적용
- 색상, 배경, 보더 모두 애니메이션 처리

#### 미션 3: 초기 로딩 깜빡임(FOUC) 해결
페이지 로드 시 잠깐 보이는 기본 테마 깜빡임을 해결하세요.

**해결 방법**:
- `index.html`에 인라인 스크립트 추가
- localStorage 값을 읽어 즉시 `data-theme` 설정
- React 앱 로드 전에 테마 적용

### 7.2 중급 미션

#### 미션 4: 다중 Context 시스템
테마 외에 추가 Context를 구현하세요.

**구현할 Context들**:
```tsx
// LocaleContext - 다국어 지원
type Locale = 'ko' | 'en' | 'ja';

// AuthContext - 사용자 인증
type User = { id: string; name: string; email: string } | null;

// FeatureFlagContext - 기능 토글
type FeatureFlags = {
  newDashboard: boolean;
  betaFeatures: boolean;
  debugMode: boolean;
};
```

#### 미션 5: Context Selector 구현
대규모 Context에서 부분적 구독을 위한 selector 패턴을 구현하세요.

**목표**:
- Context 일부만 변경되어도 모든 Consumer가 리렌더되는 문제 해결
- 필요한 상태만 선택적으로 구독하는 훅 구현

**예시**:
```tsx
// 전체 Context 대신 필요한 부분만 구독
const theme = useThemeSelector(state => state.effective);
const setOption = useThemeSelector(state => state.setOption);
```

#### 미션 6: Context 상태 영속화
Context 상태를 localStorage 외에 다른 저장소에 저장하세요.

**구현 옵션**:
- IndexedDB를 활용한 대용량 상태 저장
- 서버 동기화를 위한 API 연동
- 암호화된 상태 저장

### 7.3 고급 미션

#### 미션 7: Context 성능 측정 도구
Context 사용으로 인한 성능 영향을 측정하는 도구를 구현하세요.

**측정 항목**:
- Context Provider value 변경 빈도
- Consumer 컴포넌트 리렌더 횟수
- 메모이제이션 효과 측정

**구현 방향**:
```tsx
function PerformanceMonitor({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState({
    providerChanges: 0,
    consumerRenders: 0,
    memoHits: 0,
  });
  
  // 성능 지표 수집 및 표시
  return (
    <>
      <div>Performance: {JSON.stringify(metrics)}</div>
      {children}
    </>
  );
}
```

#### 미션 8: Context DevTools 구현
Context 상태를 시각적으로 디버깅할 수 있는 도구를 만드세요.

**기능 요구사항**:
- Context 상태 트리 시각화
- 상태 변경 히스토리 추적
- 시간 여행 디버깅 (상태 되돌리기)
- Consumer 컴포넌트 하이라이팅

---

## 8. 마무리와 실무 적용 가이드

### 8.1 Context API 사용 가이드라인

#### 언제 Context를 사용할까?

```
✅ 좋은 Context 사용 사례:
- 테마, 언어 설정 (변경 빈도 낮음)
- 사용자 인증 정보 (로그인 상태)
- 앱 전역 설정 (기능 플래그)
- Modal, Toast 같은 UI 상태

❌ 피해야 할 Context 사용:
- 폼 입력값 (로컬 상태로 충분)
- 서버 데이터 캐시 (React Query 등 사용)
- 고빈도 업데이트 상태 (애니메이션 등)
- 컴포넌트 간 일시적 통신
```

#### Context 설계 원칙

1. **단일 책임**: 하나의 Context는 하나의 도메인만 담당
2. **안정적 구조**: 자주 변하지 않는 구조로 설계
3. **타입 안전성**: TypeScript로 타입 정의 필수
4. **에러 처리**: Provider 누락 시 명확한 에러 메시지

### 8.2 성능 최적화 체크리스트

```markdown
Performance Checklist:

상태 분리:
- [ ] 상태와 액션을 분리된 Context로 제공
- [ ] 자주 변하는 상태와 드물게 변하는 상태 분리

메모이제이션:
- [ ] Provider value를 useMemo로 메모이제이션
- [ ] 액션 함수들을 useCallback으로 메모이제이션
- [ ] Consumer에서 필요한 부분만 구독

렌더링 최적화:
- [ ] React.memo로 불필요한 리렌더 방지
- [ ] Context 변경 시 영향받는 컴포넌트 최소화
- [ ] 큰 객체보다는 primitive 값 위주로 상태 구성
```

### 8.3 팀 개발에서의 적용 전략

#### 단계적 도입 방법

1. **1단계**: 작은 단위부터 시작 (테마, 사용자 정보)
2. **2단계**: 팀 내 Context 사용 가이드라인 수립
3. **3단계**: 코드 리뷰에서 Context 사용 패턴 점검
4. **4단계**: 성능 모니터링 도구 도입

#### 팀 규칙 예시

```tsx
// 팀 표준 Context 구조
interface AppContextValue {
  // 상태: 읽기 전용 데이터
  state: AppState;
  
  // 액션: 상태 변경 함수들
  actions: {
    updateUser: (user: User) => void;
    toggleTheme: () => void;
    setLocale: (locale: Locale) => void;
  };
  
  // 계산된 값: 파생 상태
  computed: {
    isLoggedIn: boolean;
    isDarkMode: boolean;
    currentTheme: Theme;
  };
}
```

### 8.4 Context와 다른 상태 관리 도구 비교

| 측면 | Context API | Redux Toolkit | Zustand |
|------|-------------|---------------|---------|
| **러닝 커브** | 낮음 | 높음 | 낮음 |
| **번들 크기** | 없음 | 중간 | 작음 |
| **DevTools** | 제한적 | 강력함 | 기본적 |
| **미들웨어** | 없음 | 풍부함 | 있음 |
| **타입스크립트** | 수동 | 좋음 | 좋음 |

### 8.5 다음 학습 단계

#### 심화 학습 주제
1. **Context + React Query 조합**: 서버 상태와 클라이언트 상태 분리
2. **Context Selector 패턴**: 부분 구독으로 성능 최적화
3. **Context 미들웨어**: 로깅, 변경 추적, 검증 로직 추가
4. **React 18 Concurrent Features**: Suspense, startTransition과의 조합

#### 실무 프로젝트 적용
1. 현재 프로젝트에서 props drilling이 발생하는 부분 식별
2. Context로 해결할 수 있는 전역 상태 정리
3. 성능 측정 도구로 Context 도입 효과 검증
4. 팀과 Context 사용 가이드라인 수립

---

## 🎯 학습 체크리스트

### 이론 이해
- [ ] Props Drilling 문제와 Context의 해결 방식 이해
- [ ] Context와 Provider의 동작 원리 파악
- [ ] useReducer와 Context 조합의 장점 이해
- [ ] Context 분리를 통한 성능 최적화 방법 습득

### 실습 완료
- [ ] 프로젝트 실행 및 테마 전환 기능 확인
- [ ] Context 상태와 액션 분리 구조 이해
- [ ] MUI와 Context 연동 방식 파악
- [ ] 기초 미션 중 2개 이상 완료

### 실무 적용
- [ ] 현재 프로젝트의 전역 상태 요구사항 분석
- [ ] Context 도입이 적합한 상황과 부적합한 상황 구분
- [ ] Context 성능 최적화 전략 수립
- [ ] 팀과 Context 사용 가이드라인 논의

---

**다음 챕터 미리보기**: 09. React Router - SPA 라우팅과 네비게이션 구현

---

*본 교재는 Context API를 실무에서 효과적으로 활용할 수 있도록 실전 중심으로 작성되었습니다. Context는 강력한 도구이지만 적절한 사용이 중요하므로 성능과 유지보수성을 항상 고려하시기 바랍니다.*