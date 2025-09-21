# React 고급 훅 완벽 가이드
## useRef, useMemo, useCallback을 통한 성능 최적화

> **학습 목표**: React의 고급 훅들을 이해하고, 실제 프로젝트에서 성능 최적화를 위해 언제, 어떻게 사용하는지 학습한다.

---

## 📚 목차

1. [React 훅의 진화와 필요성](#1-react-훅의-진화와-필요성)
2. [useRef - 참조와 DOM 제어](#2-useref---참조와-dom-제어)
3. [useMemo - 연산 결과 메모이제이션](#3-usememo---연산-결과-메모이제이션)
4. [useCallback - 함수 메모이제이션](#4-usecallback---함수-메모이제이션)
5. [React.memo와 성능 최적화](#5-reactmemo와-성능-최적화)
6. [실전 프로젝트 분석](#6-실전-프로젝트-분석)
7. [성능 측정과 최적화 전략](#7-성능-측정과-최적화-전략)
8. [실습 미션](#8-실습-미션)

---

## 1. React 훅의 진화와 필요성

### 1.1 기본 훅에서 고급 훅으로

React를 시작할 때 우리는 `useState`와 `useEffect`를 먼저 배웠습니다:

```tsx
// 기본 훅들
const [count, setCount] = useState(0);  // 상태 관리
useEffect(() => {                       // 부수 효과 처리
  document.title = `Count: ${count}`;
}, [count]);
```

하지만 실제 애플리케이션을 개발하다 보면 다음과 같은 문제들이 발생합니다:

#### 문제 1: 불필요한 리렌더링
```tsx
// 부모 컴포넌트가 리렌더될 때마다
function Parent() {
  const [count, setCount] = useState(0);
  
  // 매번 새로운 함수 생성! 
  const handleClick = () => console.log('clicked');
  
  return <ExpensiveChild onClick={handleClick} />;
}
```

#### 문제 2: 비싼 계산의 반복 실행
```tsx
function SearchResults({ query, items }) {
  // 매 렌더마다 필터링 실행!
  const filtered = items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return <div>{filtered.map(/* ... */)}</div>;
}
```

#### 문제 3: DOM 요소 접근의 어려움
```tsx
// input에 포커스를 주고 싶은데...
function SearchForm() {
  // DOM에 직접 접근하려면?
  return <input /* 어떻게 포커스를? */ />;
}
```

### 1.2 고급 훅이 해결하는 문제들

React의 고급 훅들은 이러한 문제들을 체계적으로 해결합니다:

| 훅 | 해결하는 문제 | 사용 시나리오 |
|---|---|---|
| **useRef** | DOM 접근, 값 보존 | 포커스 제어, 타이머 관리, 이전 값 추적 |
| **useMemo** | 비싼 계산 반복 | 복잡한 필터링, 정렬, 계산 결과 캐싱 |
| **useCallback** | 함수 재생성 | 자식 컴포넌트에 전달하는 핸들러 최적화 |

---

## 2. useRef - 참조와 DOM 제어

### 2.1 useRef의 핵심 개념

`useRef`는 **렌더링과 무관한 값**을 저장하는 훅입니다. 가장 중요한 특징은:

- **값이 변경되어도 리렌더링을 발생시키지 않음**
- **렌더링 간에 값이 유지됨**
- **DOM 요소에 직접 접근 가능**

#### 기본 문법
```tsx
const ref = useRef(initialValue);
```

### 2.2 프로젝트에서의 useRef 활용 사례

#### 사례 1: DOM 요소 접근 (SearchInput.tsx)

```tsx
// SearchInput.tsx
import { forwardRef } from 'react';

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, placeholder }, ref) => {
    return (
      <input
        ref={ref}  // 외부에서 이 input에 접근 가능
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? '검색어 입력'}
        aria-label="검색 입력"
      />
    );
  }
);
```

**forwardRef를 사용하는 이유**:
- 일반적으로 컴포넌트는 내부 DOM을 숨깁니다
- `forwardRef`로 감싸면 부모가 자식의 DOM에 접근할 수 있습니다

#### 사례 2: 컴포넌트 마운트 시 포커스 (SearchApp.tsx)

```tsx
// SearchApp.tsx
export default function SearchApp() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // 마운트 시 1회 포커스
  }, []);

  return (
    <SearchInput
      ref={inputRef}  // ref 전달
      value={rawQuery}
      onChange={handleQueryChange}
    />
  );
}
```

**동작 원리**:
1. `inputRef.current`는 실제 DOM input 요소를 참조
2. 컴포넌트 마운트 후 `?.focus()` 호출로 포커스 설정
3. `?.` 연산자로 null 체크 (아직 마운트되지 않은 경우 대비)

#### 사례 3: 타이머 관리 (SearchApp.tsx)

```tsx
// SearchApp.tsx
export default function SearchApp() {
  const debounceRef = useRef<number | null>(null);

  const handleQueryChange = useCallback((next: string) => {
    setRawQuery(next);
    
    // 이전 타이머가 있으면 취소
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    
    // 새 타이머 설정하고 ID 저장
    debounceRef.current = window.setTimeout(() => {
      setQuery(next);
    }, 200);
  }, []);
}
```

**디바운스 패턴 분석**:
- 사용자가 타이핑할 때마다 기존 타이머를 취소하고 새 타이머 설정
- 200ms 동안 추가 입력이 없으면 실제 검색 실행
- `debounceRef.current`에 타이머 ID 저장 (리렌더되어도 유지)

#### 사례 4: 렌더 카운터 (ResultItem.tsx)

```tsx
// ResultItem.tsx
function ResultItemBase({ item, query, isFavorite, onToggleFavorite }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1; // 렌더될 때마다 증가

  return (
    <li>
      {/* ... */}
      <span style={{ marginLeft: 'auto', fontSize: 12, color: '#999' }}>
        renders: {renderCount.current}
      </span>
      {/* ... */}
    </li>
  );
}
```

**렌더 카운터의 용도**:
- 성능 디버깅 도구
- 컴포넌트가 몇 번 렌더되었는지 추적
- `useState`를 쓰면 카운터 증가 때마다 리렌더가 발생하므로 무한루프

### 2.3 useRef vs useState 비교

| 측면 | useRef | useState |
|---|---|---|
| **리렌더링 발생** | ❌ 없음 | ✅ 있음 |
| **값 유지** | ✅ 유지됨 | ✅ 유지됨 |
| **UI 반영** | ❌ 안됨 | ✅ 됨 |
| **사용 사례** | DOM 접근, 타이머, 카운터 | 화면에 표시할 상태 |

---

## 3. useMemo - 연산 결과 메모이제이션

### 3.1 useMemo의 필요성

React에서 컴포넌트가 리렌더될 때마다 **모든 계산이 다시 실행**됩니다:

```tsx
function ExpensiveComponent({ items, query }) {
  // 매 렌더마다 실행됨!
  const expensiveResult = items
    .filter(item => item.name.includes(query))
    .sort((a, b) => a.price - b.price)
    .slice(0, 100);
    
  return <div>{expensiveResult.map(/* ... */)}</div>;
}
```

만약 `items`와 `query`가 변하지 않았다면 **같은 계산을 반복**하는 것입니다.

### 3.2 useMemo 기본 문법

```tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]); // 의존성 배열
```

**동작 원리**:
1. 첫 번째 렌더: 계산 실행 후 결과 저장
2. 이후 렌더: 의존성 배열 `[a, b]` 검사
3. 변경된 값이 있으면 재계산, 없으면 캐시된 값 반환

### 3.3 프로젝트에서의 useMemo 활용

#### 사례 1: 카테고리 목록 메모이제이션 (SearchApp.tsx)

```tsx
// SearchApp.tsx
export default function SearchApp() {
  // 의존성 없는 고정 데이터 메모이제이션
  const categories = useMemo<Category[]>(
    () => ['all', 'Framework', 'Library', 'Tool'],
    [] // 빈 배열: 컴포넌트 생명주기 동안 한 번만 생성
  );

  return (
    <CategorySelect
      categories={categories} // 항상 같은 배열 참조
      value={category}
      onChange={setCategory}
    />
  );
}
```

**왜 필요한가?**:
- 매 렌더마다 `['all', 'Framework', 'Library', 'Tool']` 새 배열 생성 방지
- `CategorySelect`가 `React.memo`로 감싸져 있다면 불필요한 리렌더 방지
- 메모리 사용량 감소

#### 사례 2: 복잡한 필터링 로직 (SearchApp.tsx)

```tsx
// SearchApp.tsx
export default function SearchApp() {
  // 비싼 계산(검색/필터) 메모이제이션
  const filtered = useMemo(() => {
    console.log('🔍 필터링 계산 실행'); // 디버깅용
    
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      // 텍스트 매칭 검사
      const qOk = !q || it.name.toLowerCase().includes(q);
      
      // 카테고리 매칭 검사  
      const cOk = category === 'all' || it.category === category;
      
      return qOk && cOk;
    });
  }, [items, query, category]); // items, query, category 중 하나라도 변경되면 재계산

  return (
    <ResultsList
      items={filtered} // 메모이제이션된 결과
      query={query}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}
```

**최적화 효과**:
- `query`, `category`가 같으면 필터링을 다시 하지 않음
- 큰 데이터셋에서는 상당한 성능 향상 가능
- 브라우저 개발자 도구에서 계산 실행 횟수 확인 가능

### 3.4 useMemo 사용 시 주의사항

#### 주의사항 1: 과도한 사용 금지
```tsx
// ❌ 불필요한 useMemo - 단순 계산
const doubledValue = useMemo(() => value * 2, [value]);

// ✅ 그냥 사용하는 것이 더 효율적
const doubledValue = value * 2;
```

#### 주의사항 2: 의존성 배열 정확히 작성
```tsx
// ❌ 의존성 누락
const filtered = useMemo(() => {
  return items.filter(item => item.name.includes(query));
}, [items]); // query가 빠졌음!

// ✅ 모든 의존성 포함
const filtered = useMemo(() => {
  return items.filter(item => item.name.includes(query));
}, [items, query]);
```

---

## 4. useCallback - 함수 메모이제이션

### 4.1 함수 재생성 문제

JavaScript에서 함수는 **객체**입니다. 컴포넌트가 리렌더될 때마다 새로운 함수 객체가 생성됩니다:

```tsx
function Parent() {
  const [count, setCount] = useState(0);
  
  // 매 렌더마다 새로운 함수 생성
  const handleClick = () => {
    console.log('clicked');
  };
  
  console.log(handleClick === handleClick); // false (리렌더 후)
  
  return <Child onClick={handleClick} />;
}
```

이것이 문제가 되는 경우:
- `Child`가 `React.memo`로 감싸져 있을 때
- `handleClick`이 `useEffect`의 의존성일 때

### 4.2 useCallback 기본 문법

```tsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // 의존성 배열
```

**동작 방식**:
- `useMemo(() => fn, deps)`와 동일
- 의존성이 변경되지 않으면 같은 함수 참조 반환

### 4.3 프로젝트에서의 useCallback 활용

#### 사례 1: 즐겨찾기 토글 핸들러 (SearchApp.tsx)

```tsx
// SearchApp.tsx
export default function SearchApp() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 안정적인 핸들러(참조 동일성) - memoized child와 궁합
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev); // 새 Set 생성 (불변성)
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []); // 의존성 없음 - 클로저 문제 없이 안전

  return (
    <ResultsList
      items={filtered}
      query={query}
      favorites={favorites}
      onToggleFavorite={toggleFavorite} // 항상 같은 함수 참조
    />
  );
}
```

**핵심 포인트**:
1. **빈 의존성 배열 `[]`**: 함수가 외부 변수를 사용하지 않음
2. **함수형 업데이트**: `setFavorites(prev => ...)` 패턴으로 최신 상태 접근
3. **불변성 유지**: 기존 Set을 수정하지 않고 새 Set 반환

#### 사례 2: 디바운스 검색 핸들러 (SearchApp.tsx)

```tsx
// SearchApp.tsx  
export default function SearchApp() {
  const debounceRef = useRef<number | null>(null);

  const handleQueryChange = useCallback((next: string) => {
    setRawQuery(next); // 즉시 UI 업데이트
    
    // 이전 타이머 취소
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    
    // 새 타이머 설정
    debounceRef.current = window.setTimeout(() => {
      setQuery(next); // 200ms 후 실제 검색
    }, 200);
  }, []); // 빈 의존성 배열 가능 (ref와 setState는 안정적)

  return (
    <SearchInput
      ref={inputRef}
      value={rawQuery}
      onChange={handleQueryChange} // 항상 같은 함수 참조
      placeholder="예: react / next / vite"
    />
  );
}
```

**최적화 효과**:
- `SearchInput`이 `React.memo`로 감싸져 있다면 불필요한 리렌더 방지
- 함수 생성 비용 절약 (미미하지만)

### 4.4 useCallback의 한계와 대안

#### 한계 1: 과도한 사용의 역효과
```tsx
// ❌ 단순한 핸들러에 useCallback 남용
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []); // 메모이제이션 비용 > 함수 생성 비용

// ✅ 그냥 사용
const handleClick = () => setCount(c => c + 1);
```

#### 한계 2: 의존성이 자주 변하는 경우
```tsx
// ❌ 의존성이 자주 변해서 메모이제이션 효과 없음
const handleSubmit = useCallback((data) => {
  onSubmit(data, userId, timestamp); // userId, timestamp 자주 변함
}, [onSubmit, userId, timestamp]);
```

---

## 5. React.memo와 성능 최적화

### 5.1 React.memo의 역할

`React.memo`는 **컴포넌트 메모이제이션** 도구입니다:

```tsx
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});
```

**동작 방식**:
- props가 변경되지 않으면 리렌더를 건너뜀
- **얕은 비교(shallow comparison)** 수행
- 참조 동일성을 기준으로 판단

### 5.2 프로젝트에서의 React.memo 활용

#### ResultItem 컴포넌트 최적화

```tsx
// ResultItem.tsx
function ResultItemBase({ item, query, isFavorite, onToggleFavorite }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <li>
      <div>
        <strong>{highlight(item.name, query)}</strong>
        <span>#{item.category}</span>
        <span>renders: {renderCount.current}</span> {/* 렌더 횟수 표시 */}
      </div>
      
      <div>
        <button
          onClick={() => onToggleFavorite(item.id)}
          style={{
            background: isFavorite ? '#111' : '#fff',
            color: isFavorite ? '#fff' : '#111'
          }}
        >
          {isFavorite ? '★ 즐겨찾기' : '☆ 즐겨찾기'}
        </button>
      </div>
    </li>
  );
}

// React.memo로 감싸기
const ResultItem = memo(ResultItemBase);
export default ResultItem;
```

### 5.3 메모이제이션 효과 확인하기

프로젝트를 실행하고 다음을 관찰해보세요:

1. **검색어 입력**: 매칭되지 않는 아이템의 `renders:` 숫자가 증가하지 않음
2. **카테고리 변경**: 해당 카테고리가 아닌 아이템들은 리렌더되지 않음
3. **즐겨찾기 토글**: 다른 아이템들은 영향받지 않음

#### useCallback 제거 실험

임시로 `SearchApp.tsx`에서 `useCallback`을 제거해보세요:

```tsx
// useCallback 제거
const toggleFavorite = (id: string) => {
  setFavorites((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
};
```

결과: 모든 `ResultItem`의 `renders:` 숫자가 함께 증가 (불필요한 리렌더)

---

## 6. 실전 프로젝트 분석

### 6.1 전체 아키텍처 이해

본 프로젝트는 **검색 필터링 UI**를 구현하며 다음 최적화 기법들을 사용합니다:

```
SearchApp (메인 컨테이너)
├── SearchInput (forwardRef + useCallback 핸들러)
├── CategorySelect (useMemo 카테고리 목록)
└── ResultsList
    └── ResultItem[] (React.memo + 렌더 카운터)
```

### 6.2 데이터 흐름과 최적화 포인트

#### 1단계: 사용자 입력
```
사용자 타이핑 → SearchInput → handleQueryChange (useCallback)
→ rawQuery (즉시 반영) + 디바운스 타이머 → query (200ms 후)
```

#### 2단계: 데이터 필터링
```
query + category 변경 → filtered (useMemo) → ResultsList → ResultItem[]
```

#### 3단계: 상호작용
```
즐겨찾기 버튼 클릭 → toggleFavorite (useCallback) → favorites 업데이트
→ 해당 아이템만 리렌더 (React.memo 덕분)
```

### 6.3 성능 최적화 효과

#### 최적화 전 (가상의 시나리오)
```
사용자가 'r' 입력
→ 10개 ResultItem 모두 리렌더
→ 필터링 계산 실행
→ 'e' 추가 입력  
→ 다시 10개 모두 리렌더
→ 다시 필터링 계산...
```

#### 최적화 후 (현재 구현)
```
사용자가 'r' 입력
→ 디바운스로 200ms 대기
→ 필터링 계산 1회 (useMemo)
→ 매칭되는 아이템만 리렌더 (React.memo)
→ 'e' 추가 입력
→ 다시 200ms 대기 (기존 타이머 취소)
```

---

## 7. 성능 측정과 최적화 전략

### 7.1 React Developer Tools로 성능 측정

#### Profiler 탭 사용법
1. Chrome에서 React DevTools 설치
2. Profiler 탭 열기
3. 녹화 시작 후 앱과 상호작용
4. 결과 분석:
   - 각 컴포넌트의 렌더 시간
   - 리렌더 원인 (props, state 변경)
   - 최적화 효과 확인

#### 측정 지표
```tsx
// 렌더 카운터로 직접 확인
const renderCount = useRef(0);
renderCount.current += 1;

console.log(`${componentName} 렌더: ${renderCount.current}회`);
```

### 7.2 최적화 결정 트리

```
성능 문제 발견
├── 느린 계산이 원인?
│   ├── Yes → useMemo 적용
│   └── No → 다음 단계
├── 불필요한 리렌더가 원인?  
│   ├── Yes → React.memo + useCallback
│   └── No → 다음 단계
└── DOM 조작 최적화 필요?
    └── useRef로 직접 제어
```

### 7.3 안티패턴과 해결책

#### 안티패턴 1: 모든 곳에 메모이제이션
```tsx
// ❌ 과도한 최적화
const Component = memo(() => {
  const value1 = useMemo(() => prop1 + prop2, [prop1, prop2]);
  const value2 = useMemo(() => prop3 * 2, [prop3]);
  const handler = useCallback(() => {}, []);
  // ...
});
```

#### 해결책: 필요한 곳에만 적용
```tsx
// ✅ 적절한 최적화
const Component = memo(() => {
  const expensiveValue = useMemo(() => {
    // 실제로 비싼 계산만
    return heavyCalculation(largeArray);
  }, [largeArray]);
  
  // 단순한 계산은 그대로
  const simpleValue = prop1 + prop2;
  
  return <div>{expensiveValue + simpleValue}</div>;
});
```

---

## 8. 실습 미션

### 8.1 기초 미션

#### 미션 1: 정렬 기능 추가
현재 프로젝트에 정렬 기능을 추가하세요.

**요구사항**:
- 이름순, 카테고리순 정렬 옵션
- `useMemo`를 사용하여 정렬 결과 캐싱
- 정렬 상태가 변경될 때만 재계산되도록 최적화

**힌트**:
```tsx
const [sortBy, setSortBy] = useState<'name' | 'category'>('name');

const sortedAndFiltered = useMemo(() => {
  const filtered = /* 기존 필터링 로직 */;
  
  return filtered.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });
}, [/* 의존성 배열 */]);
```

#### 미션 2: 검색 히스토리 기능
최근 검색어 5개를 저장하고 표시하는 기능을 구현하세요.

**요구사항**:
- `useRef`를 사용하여 히스토리 저장 (리렌더 없이)
- 중복 검색어 제거
- 최대 5개까지만 보관

#### 미션 3: 렌더링 성능 분석
개발자 도구를 사용하여 성능을 측정하고 개선하세요.

**분석 항목**:
- 각 컴포넌트의 평균 렌더 시간
- 불필요한 리렌더 발생 패턴
- 메모이제이션 적용 전후 비교

### 8.2 중급 미션

#### 미션 4: 가상 스크롤링 구현
1000개 이상의 아이템을 효율적으로 렌더링하는 가상 스크롤을 구현하세요.

**도전 과제**:
- `useRef`로 스크롤 위치 추적
- `useMemo`로 보이는 아이템 범위 계산
- `useCallback`으로 스크롤 핸들러 최적화

#### 미션 5: 다중 필터 조합
여러 조건을 동시에 적용할 수 있는 고급 필터를 구현하세요.

**요구사항**:
- 가격 범위, 즐겨찾기 여부, 검색어를 동시 적용
- 각 필터의 독립적인 상태 관리
- 복잡한 필터링 로직의 성능 최적화

### 8.3 고급 미션

#### 미션 6: 커스텀 훅 추상화
반복되는 최적화 패턴을 커스텀 훅으로 추상화하세요.

**예시 훅들**:
```tsx
// 디바운스 훅
function useDebounce(value: string, delay: number) {
  // useRef와 useState를 조합하여 구현
}

// 메모이제이션된 필터 훅  
function useFilteredItems(items: Item[], filters: FilterState) {
  // useMemo를 내부적으로 사용
}

// 렌더 카운터 훅
function useRenderCount(componentName: string) {
  // useRef를 사용하여 렌더 횟수 추적
}
```

#### 미션 7: 성능 모니터링 시스템
실시간으로 앱의 성능 지표를 수집하고 표시하는 시스템을 구현하세요.

**수집 데이터**:
- 컴포넌트별 렌더 횟수
- 필터링 계산 소요 시간
- 메모리 사용량 변화
- 사용자 상호작용 응답 시간

---

## 9. 마무리와 실무 적용 가이드

### 9.1 핵심 원칙 정리

#### 1. "측정 우선, 최적화는 그 다음"
```tsx
// ❌ 무작정 최적화
const Component = memo(() => {
  const value = useMemo(/* ... */);
  const handler = useCallback(/* ... */);
});

// ✅ 문제 확인 후 최적화
// 1. 성능 문제 측정
// 2. 원인 파악  
// 3. 적절한 도구 선택
// 4. 효과 재측정
```

#### 2. "의존성 배열의 정확성"
```tsx
// ❌ 의존성 누락 위험
const filtered = useMemo(() => {
  return items.filter(item => item.name.includes(query));
}, [items]); // query 누락!

// ✅ ESLint 규칙 활용
// eslint-plugin-react-hooks의 exhaustive-deps 규칙 활성화
```

#### 3. "적절한 도구 선택"
| 상황 | 도구 | 이유 |
|---|---|---|
| DOM 조작 필요 | useRef | 리액트 방식의 DOM 접근 |
| 비싼 계산 결과 | useMemo | 불필요한 재계산 방지 |
| 자식에게 전달할 함수 | useCallback | 참조 안정성으로 리렌더 방지 |
| 컴포넌트 전체 | React.memo | props 변화 시에만 렌더 |

### 9.2 팀 개발에서의 적용 전략

#### 단계적 도입
1. **1단계**: 명백한 성능 문제가 있는 부분만 최적화
2. **2단계**: 팀 내 최적화 가이드라인 수립
3. **3단계**: 코드 리뷰에서 성능 관점 추가
4. **4단계**: 자동화된 성능 테스트 도입

#### 코드 리뷰 체크리스트
```markdown
- [ ] 의존성 배열이 정확한가?
- [ ] 메모이제이션이 실제로 필요한가?
- [ ] 렌더 카운터나 프로파일러로 효과를 확인했는가?
- [ ] 과도한 최적화는 아닌가?
```

### 9.3 다음 학습 단계

#### 추가 학습 주제
1. **React Suspense와 Concurrent Features**
2. **상태 관리 라이브러리 (Redux, Zustand) 최적화**
3. **번들 최적화 (Code Splitting, Lazy Loading)**
4. **웹 성능 지표 (Core Web Vitals) 이해**

#### 실무 프로젝트 적용
1. 기존 프로젝트에서 성능 병목 지점 찾기
2. React DevTools Profiler로 측정
3. 적절한 최적화 기법 적용
4. 효과 측정 및 문서화

---

## 🎯 학습 체크리스트

### 이론 이해
- [ ] useRef의 두 가지 주요 용도 (DOM 접근, 값 보존) 이해
- [ ] useMemo와 useCallback의 차이점과 사용 시나리오 파악
- [ ] React.memo와 고급 훅의 조합 효과 이해
- [ ] 메모이제이션의 비용과 이익 계산 방법 습득

### 실습 완료
- [ ] 프로젝트 실행 및 렌더 카운터 관찰
- [ ] useCallback 제거/복원 실험으로 효과 확인
- [ ] React DevTools Profiler 사용법 습득
- [ ] 기초 미션 중 2개 이상 완료

### 실무 적용
- [ ] 현재 진행 중인 프로젝트의 성능 측정
- [ ] 적절한 최적화 포인트 식별
- [ ] 팀과 성능 최적화 가이드라인 논의

---

**다음 챕터 미리보기**: 08. 상태 관리 심화 - Context API, useReducer를 활용한 복잡한 상태 관리

---

*본 교재는 React 고급 훅을 실무에서 효과적으로 활용할 수 있도록 실전 중심으로 작성되었습니다. 성능 최적화는 측정을 통해 검증하며 점진적으로 적용하시기 바랍니다.*