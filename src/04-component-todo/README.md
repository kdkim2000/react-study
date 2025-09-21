# 04. React 컴포넌트 구조화 - 확장 가능한 애플리케이션 설계

> **학습 목표**
> - 단방향 데이터 플로우의 원리와 구현 방법
> - 부모-자식 컴포넌트 간 효율적인 데이터 전달
> - Props Drilling 문제점과 해결 전략
> - 컨테이너와 프레젠테이션 컴포넌트 분리
> - 실제 애플리케이션 규모의 컴포넌트 구조 설계
> - TypeScript를 활용한 타입 안전한 컴포넌트 통신

---

## 📚 목차
1. [단방향 데이터 플로우의 철학](#1-단방향-데이터-플로우의-철학)
2. [컴포넌트 아키텍처 설계 원칙](#2-컴포넌트-아키텍처-설계-원칙)
3. [Props Drilling과 해결 전략](#3-props-drilling과-해결-전략)
4. [TodoApp으로 보는 실전 구조화](#4-todoapp으로-보는-실전-구조화)
5. [컨테이너와 프레젠테이션 컴포넌트](#5-컨테이너와-프레젠테이션-컴포넌트)
6. [타입 시스템과 컴포넌트 인터페이스](#6-타입-시스템과-컴포넌트-인터페이스)
7. [상태 관리와 액션 패턴](#7-상태-관리와-액션-패턴)
8. [성능 최적화 전략](#8-성능-최적화-전략)
9. [확장성을 위한 베스트 프랙티스](#9-확장성을-위한-베스트-프랙티스)

---

## 1. 단방향 데이터 플로우의 철학

### 1.1 왜 단방향 데이터 플로우인가?

React의 핵심 철학 중 하나는 **데이터가 위에서 아래로만 흐른다**는 것입니다. 이는 Vue.js나 Angular의 양방향 바인딩과는 다른 접근 방식입니다.

#### 단방향 vs 양방향 데이터 플로우

```javascript
// Vue.js 양방향 바인딩
<template>
  <input v-model="message" />
  <p>{{ message }}</p>
</template>

// React 단방향 플로우
function MyComponent() {
  const [message, setMessage] = useState('');
  
  return (
    <>
      <input 
        value={message} 
        onChange={e => setMessage(e.target.value)} 
      />
      <p>{message}</p>
    </>
  );
}
```

### 1.2 단방향 플로우의 장점

#### A) 예측 가능성
데이터 변경의 출처가 명확하므로 애플리케이션의 동작을 예측하기 쉽습니다.

```
부모 상태 변경 → 자식으로 props 전달 → 자식 리렌더링
```

#### B) 디버깅 용이성
데이터 흐름을 역추적하기 쉬워 버그를 찾고 수정하기 편합니다.

#### C) 테스트 가능성
각 컴포넌트의 입력(props)과 출력(렌더링 결과)이 명확하므로 단위 테스트가 용이합니다.

### 1.3 실제 프로젝트에서의 데이터 플로우

```tsx
// TodoApp.tsx에서의 데이터 플로우 분석
export default function TodoApp() {
  // 📍 1. 상태의 단일 진실 공급원 (Single Source of Truth)
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // 📍 2. 액션 정의 - 상태 변경의 명확한 인터페이스
  const actions: TodoActions = {
    add: (text: string) => setTodos((prev) => [createTodo(text), ...prev]),
    toggle: (id: string) =>
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    remove: (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id)),
    clearCompleted: () => setTodos((prev) => prev.filter((t) => !t.done)),
  };

  return (
    <Card>
      {/* 📍 3. 단방향 데이터 전달 */}
      <TodoForm onAdd={actions.add} />                    {/* 부모 → 자식 */}
      <TodoFilters 
        current={filter}                                  {/* 상태 전달 */}
        onChange={setFilter}                              {/* 콜백 전달 */}
        onClearCompleted={actions.clearCompleted} 
      />
      <TodoList todos={filtered} actions={actions} />    {/* 데이터 + 액션 전달 */}
    </Card>
  );
}
```

**데이터 플로우 시각화**:
```
TodoApp (상태 소유자)
├── todos: Todo[] ─────┐
├── filter: Filter ────┤
└── actions: TodoActions ─┤
                          │
                          ▼
                     자식 컴포넌트들
                    (props로 데이터 수신)
                          │
                          ▼
                      콜백 함수 호출
                          │
                          ▼
                    부모 상태 업데이트
```

---

## 2. 컴포넌트 아키텍처 설계 원칙

### 2.1 컴포넌트 분류 체계

#### A) 컨테이너 컴포넌트 (Container Components)
- **역할**: 상태 관리, 비즈니스 로직, API 호출
- **특징**: 다른 컴포넌트를 조합하여 완전한 기능 제공
- **예시**: `TodoApp.tsx`

```tsx
// TodoApp.tsx - 컨테이너 컴포넌트 예시
export default function TodoApp() {
  // 📍 상태 관리 책임
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // 📍 비즈니스 로직 처리
  const filtered = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter((t) => !t.done);
      case 'completed': return todos.filter((t) => t.done);
      default: return todos;
    }
  }, [todos, filter]);

  // 📍 자식 컴포넌트들을 조합
  return (
    <Card>
      <TodoForm onAdd={actions.add} />
      <TodoFilters /* props */ />
      <TodoList todos={filtered} actions={actions} />
    </Card>
  );
}
```

#### B) 프레젠테이션 컴포넌트 (Presentation Components)
- **역할**: UI 렌더링, 사용자 상호작용 처리
- **특징**: props를 받아 JSX를 반환하는 순수 함수
- **예시**: `TodoItem.tsx`, `EmptyState.tsx`

```tsx
// TodoItem.tsx - 프레젠테이션 컴포넌트 예시
export default function TodoItem({ todo, actions }: Props) {
  // 📍 UI 렌더링에만 집중
  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={() => actions.remove(todo.id)}>
          <DeleteOutlineIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <Checkbox
          checked={todo.done}
          onChange={() => actions.toggle(todo.id)}  {/* 콜백 호출 */}
        />
      </ListItemIcon>
      <ListItemText
        primary={todo.text}
        primaryTypographyProps={{
          sx: { textDecoration: todo.done ? 'line-through' : 'none' },
        }}
      />
    </ListItem>
  );
}
```

### 2.2 컴포넌트 분리 기준

#### A) 단일 책임 원칙 (SRP)
각 컴포넌트는 하나의 명확한 책임만을 가져야 합니다.

```tsx
// ✅ 좋은 예시 - 각각 명확한 책임
function TodoForm({ onAdd }) {          // 할 일 추가만 담당
  // 입력 처리 로직
}

function TodoFilters({ current, onChange }) {  // 필터링만 담당
  // 필터 상태 관리
}

function TodoList({ todos, actions }) { // 목록 표시만 담당
  // 리스트 렌더링
}

// ❌ 나쁜 예시 - 너무 많은 책임
function TodoEverything() {
  // 입력 처리 + 필터링 + 리스트 + 통계 + 설정 + ...
  // 하나의 컴포넌트가 모든 것을 처리
}
```

#### B) 재사용성 고려
범용적으로 사용 가능한 컴포넌트는 별도로 분리합니다.

```tsx
// EmptyState.tsx - 재사용 가능한 컴포넌트
export default function EmptyState({
  title = '할 일이 없습니다',
  description = '상단 입력창에 새 할 일을 추가하세요.',
}: Props) {
  return (
    <Paper variant="outlined" sx={{ /* 스타일 */ }}>
      <Box sx={{ display: 'grid', gap: 1, placeItems: 'center' }}>
        <HelpOutlineIcon color="disabled" />
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
}

// 다양한 곳에서 재사용 가능
<EmptyState title="검색 결과 없음" description="다른 키워드로 검색해보세요." />
<EmptyState title="로딩 중..." description="잠시만 기다려주세요." />
```

---

## 3. Props Drilling과 해결 전략

### 3.1 Props Drilling이란?

**Props Drilling**은 하위 컴포넌트에 데이터를 전달하기 위해 중간 컴포넌트들을 거쳐 props를 전달하는 현상입니다.

#### 문제 상황 예시
```tsx
// ❌ Props Drilling 문제
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return <Layout user={user} theme={theme} onThemeChange={setTheme} />;
}

function Layout({ user, theme, onThemeChange }) {
  return (
    <div>
      <Header user={user} theme={theme} onThemeChange={onThemeChange} />
      <Sidebar user={user} theme={theme} />
      <Content user={user} theme={theme} />
    </div>
  );
}

function Header({ user, theme, onThemeChange }) {
  return (
    <header>
      <UserInfo user={user} />  {/* user만 필요 */}
      <ThemeToggle theme={theme} onChange={onThemeChange} />  {/* theme만 필요 */}
    </header>
  );
}
```

### 3.2 해결 전략 1: 액션 객체 번들링

프로젝트에서 사용한 방법으로, 관련된 함수들을 하나의 객체로 묶어 전달합니다.

```tsx
// TodoApp.tsx - 액션 번들링 전략
export default function TodoApp() {
  // 📍 관련 액션들을 하나의 객체로 묶음
  const actions: TodoActions = {
    add: (text: string) => setTodos((prev) => [createTodo(text), ...prev]),
    toggle: (id: string) =>
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    remove: (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id)),
    clearCompleted: () => setTodos((prev) => prev.filter((t) => !t.done)),
  };

  return (
    <Card>
      <TodoForm onAdd={actions.add} />               {/* 필요한 액션만 전달 */}
      <TodoList todos={filtered} actions={actions} /> {/* 여러 액션이 필요하면 번들 전달 */}
    </Card>
  );
}
```

#### 액션 번들링의 장점

**1. Props 개수 감소**
```tsx
// ❌ 개별 전달 - props가 많아짐
<TodoList 
  todos={todos}
  onToggle={handleToggle}
  onRemove={handleRemove}
  onEdit={handleEdit}
  onPriority={handlePriority}
/>

// ✅ 번들 전달 - 깔끔함
<TodoList todos={todos} actions={actions} />
```

**2. 타입 안전성**
```tsx
// TodoActions 타입 정의
export type TodoActions = {
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clearCompleted: () => void;
};

// 필요한 액션만 선택적으로 사용
type Props = {
  todo: Todo;
  actions: Pick<TodoActions, 'toggle' | 'remove'>;  // 필요한 것만 Pick
};
```

### 3.3 해결 전략 2: 컴포넌트 합성

불필요한 props 전달을 피하기 위해 컴포넌트 구조를 조정합니다.

```tsx
// ✅ 합성을 통한 해결
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return (
    <Layout>
      <Header>
        <UserInfo user={user} />  {/* 직접 전달 */}
        <ThemeToggle theme={theme} onChange={setTheme} />  {/* 직접 전달 */}
      </Header>
      <Content user={user} />  {/* 직접 전달 */}
    </Layout>
  );
}

function Layout({ children }) {
  return <div className="layout">{children}</div>;  // props 전달 불필요
}
```

### 3.4 해결 전략 3: 상태 위치 최적화

상태를 실제로 사용하는 컴포넌트와 가까운 곳에 배치합니다.

```tsx
// TodoApp.tsx - 상태 위치 최적화 예시
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');  // 필터 상태는 여기서 관리

  return (
    <Card>
      <TodoForm onAdd={actions.add} />
      
      {/* 필터 상태를 바로 전달 - 중간 컴포넌트 불필요 */}
      <TodoFilters
        current={filter}
        onChange={setFilter}  {/* 직접 setter 전달 */}
        onClearCompleted={actions.clearCompleted}
        completedCount={completedCount}
      />
      
      <TodoList todos={filtered} actions={actions} />
    </Card>
  );
}
```

---

## 4. TodoApp으로 보는 실전 구조화

### 4.1 전체 애플리케이션 구조

```
App (루트)
└── TodoApp (컨테이너)
    ├── TodoForm (입력 처리)
    ├── TodoFilters (필터링 + 상태 표시)
    ├── TodoList (리스트 컨테이너)
    │   └── TodoItem (개별 아이템)
    └── EmptyState (빈 상태 표시)
```

### 4.2 타입 시스템 설계

```tsx
// TodoApp.tsx - 타입 정의
export type Todo = {
  id: string;          // 고유 식별자
  text: string;        // 할 일 내용
  done: boolean;       // 완료 상태
  createdAt: number;   // 생성 시간 (정렬용)
};

export type Filter = 'all' | 'active' | 'completed';  // 필터 옵션

export type TodoActions = {
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clearCompleted: () => void;
};
```

#### 타입 설계의 핵심 원칙

**1. 명확한 도메인 모델링**
```tsx
// ✅ 명확한 의미의 타입
type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

// ❌ 모호한 타입
type Item = {
  key: string;
  value: any;
  flag: boolean;
};
```

**2. 유니온 타입으로 제한된 옵션**
```tsx
// 가능한 값들을 명시적으로 제한
export type Filter = 'all' | 'active' | 'completed';

// 런타임 검증도 함께
const isValidFilter = (filter: string): filter is Filter => {
  return ['all', 'active', 'completed'].includes(filter);
};
```

### 4.3 상태 관리 패턴

```tsx
// TodoApp.tsx - 상태 관리 패턴 분석
export default function TodoApp() {
  // 📍 1. 원시 상태 (Primary State)
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // 📍 2. 액션 정의 - 상태 변경의 인터페이스
  const actions: TodoActions = {
    add: (text: string) => setTodos((prev) => [createTodo(text), ...prev]),
    toggle: (id: string) =>
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    remove: (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id)),
    clearCompleted: () => setTodos((prev) => prev.filter((t) => !t.done)),
  };

  // 📍 3. 파생 상태 (Derived State) - 계산된 값들
  const filtered = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter((t) => !t.done);
      case 'completed': return todos.filter((t) => t.done);
      default: return todos;
    }
  }, [todos, filter]);

  const completedCount = todos.filter((t) => t.done).length;

  // 📍 4. 조건부 렌더링
  return (
    <Card>
      <TodoForm onAdd={actions.add} />
      <TodoFilters
        current={filter}
        onChange={setFilter}
        onClearCompleted={actions.clearCompleted}
        completedCount={completedCount}
      />
      
      {/* 조건부 렌더링으로 적절한 컴포넌트 선택 */}
      {filtered.length > 0 ? (
        <TodoList todos={filtered} actions={actions} />
      ) : (
        <EmptyState />
      )}
      
      <Typography variant="caption" color="text.secondary">
        총 {todos.length}개 / 완료 {completedCount}개
      </Typography>
    </Card>
  );
}
```

### 4.4 헬퍼 함수와 비즈니스 로직

```tsx
// TodoApp.tsx - 비즈니스 로직 분리
function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),  // 브라우저 내장 UUID 생성
    text,
    done: false,
    createdAt: Date.now(),
  };
}

// 더 복잡한 로직의 경우 별도 파일로 분리 가능
// utils/todoHelpers.ts
export const todoHelpers = {
  createTodo,
  sortByCreatedDate: (todos: Todo[]) => 
    todos.sort((a, b) => b.createdAt - a.createdAt),
  groupByStatus: (todos: Todo[]) => 
    todos.reduce((acc, todo) => {
      const key = todo.done ? 'completed' : 'active';
      acc[key] = [...(acc[key] || []), todo];
      return acc;
    }, {} as Record<string, Todo[]>),
};
```

---

## 5. 컨테이너와 프레젠테이션 컴포넌트

### 5.1 프레젠테이션 컴포넌트 설계

#### TodoItem - 순수한 UI 컴포넌트

```tsx
// TodoItem.tsx - 프레젠테이션 컴포넌트 분석
import type { Todo, TodoActions } from './TodoApp';

type Props = {
  todo: Todo;                                      // 📍 표시할 데이터
  actions: Pick<TodoActions, 'toggle' | 'remove'>; // 📍 필요한 액션만 선택
};

export default function TodoItem({ todo, actions }: Props) {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        // 📍 이벤트 발생 시 부모에게 콜백으로 알림
        <IconButton onClick={() => actions.remove(todo.id)}>
          <DeleteOutlineIcon />
        </IconButton>
      }
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
    >
      <ListItemIcon>
        <Checkbox
          checked={todo.done}
          onChange={() => actions.toggle(todo.id)}  // 📍 상태 변경 요청
          inputProps={{ 'aria-label': `${todo.text} 완료 토글` }}
        />
      </ListItemIcon>
      <ListItemText
        primary={todo.text}
        primaryTypographyProps={{
          // 📍 상태에 따른 시각적 피드백
          sx: { textDecoration: todo.done ? 'line-through' : 'none' },
        }}
      />
    </ListItem>
  );
}
```

**프레젠테이션 컴포넌트의 특징**:
1. **Props 의존적**: 외부에서 받은 데이터만 사용
2. **사이드 이펙트 없음**: 외부 상태를 직접 변경하지 않음
3. **재사용 가능**: 다양한 컨텍스트에서 사용 가능
4. **테스트 용이**: 입력과 출력이 명확

#### EmptyState - 범용 프레젠테이션 컴포넌트

```tsx
// EmptyState.tsx - 재사용 가능한 프레젠테이션 컴포넌트
type Props = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = '할 일이 없습니다',
  description = '상단 입력창에 새 할 일을 추가하세요.',
}: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: 'center',
        color: 'text.secondary',
        borderStyle: 'dashed',  // 시각적으로 "빈 상태"임을 표현
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'grid', gap: 1, placeItems: 'center' }}>
        <HelpOutlineIcon color="disabled" />
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
}
```

### 5.2 컨테이너 컴포넌트 설계

#### TodoForm - 상태가 있는 프레젠테이션 컴포넌트

```tsx
// TodoForm.tsx - 로컬 상태 + 프레젠테이션
type Props = { onAdd: (text: string) => void };  // 📍 단일 책임: 추가 요청만 처리

export default function TodoForm({ onAdd }: Props) {
  // 📍 폼 상태는 로컬에서 관리 (encapsulation)
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    
    onAdd(value);    // 📍 부모에게 추가 요청
    setText('');     // 📍 입력 필드 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={1}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력 후 Enter"
          aria-label="새 할 일"
          fullWidth
          size="small"
        />
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>
          추가
        </Button>
      </Stack>
    </form>
  );
}
```

#### TodoFilters - 복합 기능 컴포넌트

```tsx
// TodoFilters.tsx - 필터링 + 상태 표시 + 액션
type Props = {
  current: Filter;
  onChange: (f: Filter) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

export default function TodoFilters({
  current,
  onChange,
  onClearCompleted,
  completedCount,
}: Props) {
  // 📍 Material-UI 특화 이벤트 처리
  const handleChange = (_: React.MouseEvent<HTMLElement>, value: Filter | null) => {
    if (value) onChange(value);  // null 체크 후 부모에게 전달
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* 📍 필터 선택 UI */}
      <ToggleButtonGroup
        value={current}
        exclusive
        onChange={handleChange}
        size="small"
        aria-label="todo filters"
      >
        {filters.map((f) => (
          <ToggleButton key={f} value={f} aria-label={f}>
            {f}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* 📍 상태 표시 */}
      <Chip label={`완료: ${completedCount}`} size="small" variant="outlined" />

      {/* 📍 액션 버튼 */}
      <Button
        onClick={onClearCompleted}
        size="small"
        startIcon={<ClearAllIcon />}
        color="secondary"
      >
        완료 삭제
      </Button>
    </Stack>
  );
}
```

---

## 6. 타입 시스템과 컴포넌트 인터페이스

### 6.1 Props 인터페이스 설계

#### Pick 유틸리티 타입 활용

```tsx
// TodoApp.tsx - 전체 액션 타입 정의
export type TodoActions = {
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clearCompleted: () => void;
};

// TodoList.tsx - 필요한 액션만 선택
type Props = {
  todos: Todo[];
  actions: Pick<TodoActions, 'toggle' | 'remove'>;  // 필요한 것만 Pick
};

// TodoItem.tsx - 더 세밀한 선택
type Props = {
  todo: Todo;
  actions: Pick<TodoActions, 'toggle' | 'remove'>;  // add, clearCompleted 제외
};
```

#### 선택적 Props와 기본값

```tsx
// EmptyState.tsx - 선택적 Props 설계
type Props = {
  title?: string;      // 선택적 prop
  description?: string; // 선택적 prop
};

export default function EmptyState({
  title = '할 일이 없습니다',                    // 기본값 제공
  description = '상단 입력창에 새 할 일을 추가하세요.',  // 기본값 제공
}: Props) {
  // 구현
}

// 사용 시 유연성 제공
<EmptyState />  // 기본 메시지
<EmptyState title="검색 결과 없음" />  // 부분 커스터마이징
<EmptyState title="오류" description="다시 시도해주세요." />  // 완전 커스터마이징
```

### 6.2 이벤트 핸들러 타입

```tsx
// TodoForm.tsx - 이벤트 타입 정의
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // 폼 제출 로직
};

// TodoFilters.tsx - Material-UI 특화 이벤트
const handleChange = (
  _: React.MouseEvent<HTMLElement>, 
  value: Filter | null
) => {
  if (value) onChange(value);
};

// TodoItem.tsx - 간단한 클릭 이벤트
<IconButton onClick={() => actions.remove(todo.id)}>
  <DeleteOutlineIcon />
</IconButton>
```

### 6.3 제네릭을 활용한 재사용성

```tsx
// 재사용 가능한 List 컴포넌트 예시
type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyState?: React.ReactNode;
};

function List<T>({ items, renderItem, keyExtractor, emptyState }: ListProps<T>) {
  if (items.length === 0) {
    return emptyState || <EmptyState />;
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={keyExtractor(item)}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// 사용 예시
<List
  items={todos}
  renderItem={(todo) => <TodoItem todo={todo} actions={actions} />}
  keyExtractor={(todo) => todo.id}
  emptyState={<EmptyState title="할 일이 없습니다" />}
/>
```

---

## 7. 상태 관리와 액션 패턴

### 7.1 액션 패턴의 장점

#### 일관된 상태 변경 인터페이스

```tsx
// TodoApp.tsx - 액션 패턴 구현
const actions: TodoActions = {
  // 📍 명확한 의도를 가진 함수명
  add: (text: string) => setTodos((prev) => [createTodo(text), ...prev]),
  
  // 📍 함수형 업데이트로 안전한 상태 변경
  toggle: (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
  
  // 📍 불변성을 지키는 배열 조작
  remove: (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id)),
  
  // 📍 복잡한 로직도 명확한 이름으로 추상화
  clearCompleted: () => setTodos((prev) => prev.filter((t) => !t.done)),
};
```

#### 테스트 가능한 비즈니스 로직

```tsx
// __tests__/todoActions.test.ts
describe('Todo Actions', () => {
  it('should add new todo to the beginning', () => {
    const initialTodos = [{ id: '1', text: 'existing', done: false }];
    const newTodo = createTodo('new todo');
    
    const result = [newTodo, ...initialTodos];
    
    expect(result[0].text).toBe('new todo');
    expect(result).toHaveLength(2);
  });

  it('should toggle todo completion status', () => {
    const todos = [{ id: '1', text: 'test', done: false }];
    
    const toggled = todos.map(t => 
      t.id === '1' ? { ...t, done: !t.done } : t
    );
    
    expect(toggled[0].done).toBe(true);
  });
});
```

### 7.2 상태 정규화 패턴

복잡한 애플리케이션에서는 상태를 정규화하여 관리합니다.

```tsx
// 확장된 상태 구조 예시
type TodoState = {
  items: Record<string, Todo>;  // id를 키로 하는 객체
  itemIds: string[];           // 순서 유지를 위한 배열
  filter: Filter;
  loading: boolean;
  error: string | null;
};

// 정규화된 상태의 액션들
const normalizedActions = {
  add: (todo: Todo) => {
    setState(prev => ({
      ...prev,
      items: { ...prev.items, [todo.id]: todo },
      itemIds: [todo.id, ...prev.itemIds]
    }));
  },
  
  toggle: (id: string) => {
    setState(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [id]: { ...prev.items[id], done: !prev.items[id].done }
      }
    }));
  },
  
  // 선택기(Selector) 함수
  getVisibleTodos: (state: TodoState): Todo[] => {
    return state.itemIds
      .map(id => state.items[id])
      .filter(todo => {
        switch (state.filter) {
          case 'active': return !todo.done;
          case 'completed': return todo.done;
          default: return true;
        }
      });
  }
};
```

---

## 8. 성능 최적화 전략

### 8.1 메모이제이션 전략

#### useMemo로 계산 최적화

```tsx
// TodoApp.tsx - 필터링 로직 메모이제이션
const filtered = useMemo(() => {
  console.log('필터링 재계산'); // 개발 시 확인용
  
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.done);
    case 'completed':
      return todos.filter((t) => t.done);
    default:
      return todos;
  }
}, [todos, filter]);  // 의존성: todos나 filter 변경 시에만 재계산
```

#### React.memo로 불필요한 리렌더링 방지

```tsx
// TodoItem.tsx - 컴포넌트 메모이제이션
import React from 'react';

const TodoItem = React.memo(function TodoItem({ todo, actions }: Props) {
  console.log(`TodoItem ${todo.id} 렌더링`); // 개발 시 확인용
  
  return (
    <ListItem>
      {/* UI 구현 */}
    </ListItem>
  );
});

export default TodoItem;

// 사용자 정의 비교 함수 (필요한 경우)
const TodoItemWithCustomComparison = React.memo(
  TodoItem,
  (prevProps, nextProps) => {
    // todo 객체의 내용이 실제로 변경되었는지 확인
    return (
      prevProps.todo.id === nextProps.todo.id &&
      prevProps.todo.text === nextProps.todo.text &&
      prevProps.todo.done === nextProps.todo.done
    );
  }
);
```

#### useCallback으로 함수 메모이제이션

```tsx
// 최적화된 TodoApp.tsx
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // 📍 함수들을 useCallback으로 메모이제이션
  const handleAdd = useCallback((text: string) => {
    setTodos(prev => [createTodo(text), ...prev]);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setTodos(prev => prev.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleClearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.done));
  }, []);

  // 📍 액션 객체도 메모이제이션
  const actions = useMemo(() => ({
    add: handleAdd,
    toggle: handleToggle,
    remove: handleRemove,
    clearCompleted: handleClearCompleted,
  }), [handleAdd, handleToggle, handleRemove, handleClearCompleted]);

  // 나머지 구현...
}
```

### 8.2 리스트 렌더링 최적화

#### 가상화(Virtualization) 고려

대량의 데이터를 다룰 때는 가상화 라이브러리를 고려합니다.

```tsx
// react-window를 사용한 가상화 예시
import { FixedSizeList as List } from 'react-window';

function VirtualizedTodoList({ todos, actions }: Props) {
  const itemRenderer = ({ index, style }: any) => (
    <div style={style}>
      <TodoItem todo={todos[index]} actions={actions} />
    </div>
  );

  return (
    <List
      height={400}        // 컨테이너 높이
      itemCount={todos.length}
      itemSize={60}       // 각 아이템 높이
      itemData={{ todos, actions }}
    >
      {itemRenderer}
    </List>
  );
}
```

---

## 9. 확장성을 위한 베스트 프랙티스

### 9.1 컴포넌트 디렉토리 구조

```
src/
├── components/
│   ├── common/              # 재사용 가능한 공통 컴포넌트
│   │   ├── Button/
│   │   ├── Input/
│   │   └── EmptyState/
│   ├── todo/               # 기능별 컴포넌트 그룹
│   │   ├── TodoApp/
│   │   │   ├── TodoApp.tsx
│   │   │   ├── TodoApp.test.tsx
│   │   │   └── index.ts
│   │   ├── TodoForm/
│   │   ├── TodoList/
│   │   └── TodoItem/
│   └── layout/             # 레이아웃 컴포넌트
├── hooks/                  # 커스텀 훅
│   ├── useTodos.ts
│   └── useLocalStorage.ts
├── types/                  # 타입 정의
│   └── todo.ts
└── utils/                  # 유틸리티 함수
    └── todoHelpers.ts
```

### 9.2 커스텀 훅으로 로직 분리

```tsx
// hooks/useTodos.ts - 비즈니스 로직 추출
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const actions = useMemo(() => ({
    add: (text: string) => setTodos(prev => [createTodo(text), ...prev]),
    toggle: (id: string) => setTodos(prev => 
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    ),
    remove: (id: string) => setTodos(prev => prev.filter(t => t.id !== id)),
    clearCompleted: () => setTodos(prev => prev.filter(t => !t.done)),
  }), []);

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.done);
      case 'completed': return todos.filter(t => t.done);
      default: return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter(t => t.done).length,
    active: todos.filter(t => !t.done).length,
  }), [todos]);

  return {
    todos: filtered,
    filter,
    setFilter,
    actions,
    stats,
  };
}

// TodoApp.tsx - 간소화된 컴포넌트
export default function TodoApp() {
  const { todos, filter, setFilter, actions, stats } = useTodos();

  return (
    <Card>
      <TodoForm onAdd={actions.add} />
      <TodoFilters
        current={filter}
        onChange={setFilter}
        onClearCompleted={actions.clearCompleted}
        completedCount={stats.completed}
      />
      {todos.length > 0 ? (
        <TodoList todos={todos} actions={actions} />
      ) : (
        <EmptyState />
      )}
    </Card>
  );
}
```

### 9.3 에러 경계와 에러 처리

```tsx
// components/common/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('TodoApp 에러:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <EmptyState
          title="문제가 발생했습니다"
          description="페이지를 새로고침해 주세요."
        />
      );
    }

    return this.props.children;
  }
}

// App.tsx에서 사용
function App() {
  return (
    <ErrorBoundary>
      <TodoApp />
    </ErrorBoundary>
  );
}
```

### 9.4 테스트 친화적 설계

```tsx
// TodoApp.test.tsx - 컴포넌트 테스트 예시
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
  it('할 일을 추가할 수 있다', async () => {
    render(<TodoApp />);
    
    const input = screen.getByPlaceholderText('할 일을 입력 후 Enter');
    const addButton = screen.getByText('추가');
    
    fireEvent.change(input, { target: { value: '새 할 일' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('새 할 일')).toBeInTheDocument();
  });

  it('할 일을 완료 처리할 수 있다', async () => {
    render(<TodoApp />);
    
    // 할 일 추가
    const input = screen.getByPlaceholderText('할 일을 입력 후 Enter');
    fireEvent.change(input, { target: { value: '테스트 할 일' } });
    fireEvent.click(screen.getByText('추가'));
    
    // 완료 체크
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // 완료된 할 일은 취소선 스타일을 가져야 함
    const todoText = screen.getByText('테스트 할 일');
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });
});
```

---

## 🎯 핵심 요약

### 1. 단방향 데이터 플로우
- **상태는 위에서 아래로**: 부모가 상태를 소유하고 자식에게 props로 전달
- **변경은 콜백으로**: 자식이 상태를 변경하려면 부모의 콜백 함수 호출
- **예측 가능한 데이터 흐름**: 상태 변경의 출처가 명확하여 디버깅 용이

### 2. 컴포넌트 분류와 책임
- **컨테이너 컴포넌트**: 상태 관리, 비즈니스 로직, 다른 컴포넌트 조합
- **프레젠테이션 컴포넌트**: UI 렌더링, 사용자 상호작용 처리
- **단일 책임 원칙**: 각 컴포넌트는 명확한 하나의 책임만 가져야 함

### 3. Props Drilling 해결
- **액션 번들링**: 관련 함수들을 객체로 묶어 전달
- **컴포넌트 합성**: 불필요한 props 전달을 피하는 구조 설계
- **상태 위치 최적화**: 실제 사용하는 곳과 가까운 곳에 상태 배치

### 4. 타입 안전성
- **명확한 인터페이스**: Props와 상태의 타입을 명시적으로 정의
- **유틸리티 타입 활용**: Pick, Omit 등으로 필요한 부분만 선택
- **제네릭 활용**: 재사용 가능한 컴포넌트 설계

### 5. 성능 최적화
- **메모이제이션**: useMemo, useCallback, React.memo 적절한 활용
- **리스트 최적화**: 안정적인 key 사용, 가상화 고려
- **불필요한 리렌더링 방지**: 의존성 배열 관리

---

## 🚀 다음 단계 학습 로드맵

### 즉시 적용 가능
1. **useEffect**: 사이드 이펙트와 생명주기 관리
2. **커스텀 훅**: 로직 재사용과 관심사 분리
3. **에러 처리**: Error Boundary와 안전한 컴포넌트 설계

### 중급 개발자
1. **Context API**: 전역 상태 관리의 기초
2. **Reducer 패턴**: 복잡한 상태 로직 관리
3. **포털**: 모달, 툴팁 등 DOM 트리 외부 렌더링

### 고급 패턴
1. **상태 관리 라이브러리**: Zustand, Redux Toolkit
2. **서버 상태**: React Query, SWR
3. **코드 스플리팅**: React.lazy, Suspense

### 실무 완성
1. **테스팅**: 단위 테스트, 통합 테스트, E2E 테스트
2. **성능 모니터링**: React DevTools, 성능 지표 측정
3. **접근성**: ARIA, 키보드 네비게이션, 스크린 리더 지원

---

## 📝 실습 과제

### 기본 과제
1. **편집 기능 추가**
   - TodoItem에 인라인 편집 모드 추가
   - 더블클릭으로 편집 모드 진입
   - Enter로 저장, Escape로 취소

2. **로컬 스토리지 연동**
   - useEffect로 초기 데이터 로드
   - 상태 변경 시 자동 저장
   - 커스텀 훅으로 로직 분리

### 중급 과제
1. **드래그 앤 드롭 정렬**
   - react-beautiful-dnd 또는 네이티브 API 활용
   - 순서 변경 시 상태 업데이트
   - 접근성 고려사항 구현

2. **카테고리 기능**
   - 할 일에 카테고리 속성 추가
   - 카테고리별 필터링
   - 색상 구분 표시

### 고급 과제
1. **다중 선택 기능**
   - 체크박스로 여러 항목 선택
   - 선택된 항목 일괄 작업
   - 키보드 단축키 지원

2. **무한 스크롤**
   - 대량 데이터 시뮬레이션
   - Intersection Observer API 활용
   - 가상화 적용으로 성능 최적화

이러한 과제들을 통해 컴포넌트 구조화의 실무 역량을 키우고, 확장 가능한 React 애플리케이션 개발 능력을 향상시킬 수 있습니다.