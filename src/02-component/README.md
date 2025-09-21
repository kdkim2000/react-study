# 02. JSX와 컴포넌트 기초 - React의 구성 요소 완전정복

> **학습 목표**
> - JSX 문법의 본질과 동작 원리 이해
> - 함수형 컴포넌트의 구조와 작성 방법
> - Props를 통한 컴포넌트 간 데이터 전달
> - Children과 컴포넌트 합성 패턴
> - 조건부 렌더링과 리스트 렌더링 마스터
> - Compound Components 패턴과 고급 컴포넌트 설계

---

## 📚 목차
1. [JSX의 본질과 문법 체계](#1-jsx의-본질과-문법-체계)
2. [함수형 컴포넌트 아키텍처](#2-함수형-컴포넌트-아키텍처)
3. [Props를 통한 컴포넌트 통신](#3-props를-통한-컴포넌트-통신)
4. [Children과 컴포넌트 합성](#4-children과-컴포넌트-합성)
5. [조건부 렌더링과 동적 UI](#5-조건부-렌더링과-동적-ui)
6. [리스트 렌더링과 Key 전략](#6-리스트-렌더링과-key-전략)
7. [Compound Components 패턴](#7-compound-components-패턴)
8. [실습 프로젝트 상세 분석](#8-실습-프로젝트-상세-분석)
9. [베스트 프랙티스와 최적화 전략](#9-베스트-프랙티스와-최적화-전략)

---

## 1. JSX의 본질과 문법 체계

### 1.1 JSX란 무엇인가?

**JSX (JavaScript XML)**는 React에서 사용하는 JavaScript의 문법 확장입니다. HTML과 유사한 문법을 JavaScript 코드 안에서 사용할 수 있게 해주는 **문법적 설탕(Syntactic Sugar)**입니다.

#### JSX의 변환 과정

```jsx
// JSX 코드 (개발자가 작성)
const element = <h1 className="greeting">Hello, World!</h1>;

// 변환된 JavaScript 코드 (Babel이 처리)
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, World!'
);
```

#### 왜 JSX를 사용하는가?

**1. 직관적 UI 표현**
```jsx
// JSX 사용 - 직관적이고 읽기 쉬움
return (
  <div className="user-card">
    <h2>{user.name}</h2>
    <p>{user.role}</p>
  </div>
);

// JSX 없이 - 복잡하고 읽기 어려움
return React.createElement(
  'div',
  { className: 'user-card' },
  React.createElement('h2', null, user.name),
  React.createElement('p', null, user.role)
);
```

**2. 개발자 경험 향상**
- 문법 하이라이팅과 자동 완성
- 에러 메시지의 명확성
- 디버깅 용이성

### 1.2 JSX 핵심 문법 규칙

#### A) 표현식 삽입 - 중괄호 사용

```jsx
// src/components/Hello.jsx에서 발췌
export default function Hello() {
  const now = new Date().toLocaleTimeString();
  
  return (
    <Stack spacing={1}>
      <Typography variant="h5" component="h2" fontWeight={700}>
        안녕하세요 👋
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <AccessTimeIcon fontSize="small" />
        {/* 📍 JavaScript 표현식 삽입 */}
        지금 시각: {now}
      </Typography>
    </Stack>
  );
}
```

**표현식 삽입 가능한 것들**:
```jsx
function Example() {
  const user = { name: 'John', age: 30 };
  const items = ['Apple', 'Banana', 'Cherry'];
  
  return (
    <div>
      {/* 변수 */}
      <p>{user.name}</p>
      
      {/* 계산식 */}
      <p>나이: {user.age}세</p>
      
      {/* 함수 호출 */}
      <p>현재 시간: {new Date().toLocaleTimeString()}</p>
      
      {/* 삼항 연산자 */}
      <p>{user.age >= 18 ? '성인' : '미성년자'}</p>
      
      {/* 배열 (자동으로 문자열 결합) */}
      <p>과일: {items.join(', ')}</p>
    </div>
  );
}
```

#### B) 속성 명명 규칙 - camelCase 사용

```jsx
// HTML vs JSX 속성 비교
<div class="container">           <!-- HTML -->
<div className="container">      {/* JSX */}

<label for="email">              <!-- HTML -->
<label htmlFor="email">          {/* JSX */}

<div tabindex="0">               <!-- HTML -->
<div tabIndex="0">               {/* JSX */}
```

#### C) 스타일 속성 - 객체 형태

```jsx
// 인라인 스타일은 객체로 전달
<div style={{
  color: 'red',           // CSS: color: red
  fontSize: '16px',       // CSS: font-size: 16px
  backgroundColor: 'blue', // CSS: background-color: blue
  marginTop: '10px'       // CSS: margin-top: 10px
}}>
  스타일 적용 예시
</div>

// 스타일 객체를 변수로 분리 (권장)
const cardStyle = {
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5'
};

<div style={cardStyle}>카드 내용</div>
```

### 1.3 JSX의 제약 사항과 해결책

#### A) 단일 루트 요소 규칙

```jsx
// ❌ 잘못된 방식 - 여러 루트 요소
function BadComponent() {
  return (
    <h1>제목</h1>
    <p>내용</p>  // 에러: Adjacent JSX elements must be wrapped
  );
}

// ✅ 해결책 1: 부모 요소로 감싸기
function GoodComponent1() {
  return (
    <div>
      <h1>제목</h1>
      <p>내용</p>
    </div>
  );
}

// ✅ 해결책 2: Fragment 사용 (불필요한 DOM 노드 방지)
function GoodComponent2() {
  return (
    <>
      <h1>제목</h1>
      <p>내용</p>
    </>
  );
}

// ✅ 해결책 3: React.Fragment 명시적 사용
function GoodComponent3() {
  return (
    <React.Fragment>
      <h1>제목</h1>
      <p>내용</p>
    </React.Fragment>
  );
}
```

#### B) JSX 내에서 문(Statement) 사용 제한

```jsx
// ❌ JSX 내에서 if문 직접 사용 불가
function BadExample() {
  return (
    <div>
      {if (condition) { <p>조건 만족</p> }}  // 문법 에러
    </div>
  );
}

// ✅ 삼항 연산자 사용
function GoodExample1({ condition }) {
  return (
    <div>
      {condition ? <p>조건 만족</p> : <p>조건 불만족</p>}
    </div>
  );
}

// ✅ 논리 AND 연산자 사용
function GoodExample2({ condition }) {
  return (
    <div>
      {condition && <p>조건 만족</p>}
    </div>
  );
}

// ✅ 함수로 분리하여 복잡한 로직 처리
function GoodExample3({ user }) {
  const renderUserStatus = () => {
    if (user.isActive) {
      return <span style={{ color: 'green' }}>활성</span>;
    } else if (user.isPending) {
      return <span style={{ color: 'orange' }}>대기</span>;
    } else {
      return <span style={{ color: 'red' }}>비활성</span>;
    }
  };
  
  return (
    <div>
      사용자 상태: {renderUserStatus()}
    </div>
  );
}
```

---

## 2. 함수형 컴포넌트 아키텍처

### 2.1 함수형 컴포넌트의 진화

React는 클래스형 컴포넌트에서 함수형 컴포넌트로 패러다임이 전환되었습니다.

#### 클래스형 vs 함수형 컴포넌트

```jsx
// 과거: 클래스형 컴포넌트
class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString() };
  }
  
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  
  render() {
    return (
      <div>
        <h2>안녕하세요 👋</h2>
        <p>현재 시각: {this.state.time}</p>
      </div>
    );
  }
}

// 현재: 함수형 컴포넌트 + Hooks
function Hello() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div>
      <h2>안녕하세요 👋</h2>
      <p>현재 시각: {time}</p>
    </div>
  );
}
```

### 2.2 실제 프로젝트의 Hello 컴포넌트 분석

```jsx
// src/components/Hello.jsx 전체 분석
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Hello() {
  // 📍 1. 함수형 컴포넌트 정의
  // - PascalCase 명명 (Hello)
  // - 매개변수 없음 (props 받지 않음)
  // - default export로 내보내기
  
  // 📍 2. 로컬 변수 정의
  const now = new Date().toLocaleTimeString();
  // - 컴포넌트 렌더링 시점의 현재 시간
  // - 리렌더링 시마다 새로 계산됨
  
  // 📍 3. JSX 반환
  return (
    <Stack spacing={1}>
      {/* Material-UI 컴포넌트 조합 */}
      <Typography variant="h5" component="h2" fontWeight={700}>
        안녕하세요 👋
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1 
        }}
      >
        <AccessTimeIcon fontSize="small" />
        {/* 📍 4. JavaScript 표현식 삽입 */}
        지금 시각: {now}
      </Typography>
    </Stack>
  );
}
```

### 2.3 함수형 컴포넌트의 핵심 개념

#### A) 컴포넌트는 단순한 함수

```jsx
// 가장 간단한 컴포넌트
function SimpleComponent() {
  return <div>Hello World</div>;
}

// 화살표 함수로도 가능
const SimpleComponent = () => {
  return <div>Hello World</div>;
};

// 단일 표현식인 경우 return 생략 가능
const SimpleComponent = () => <div>Hello World</div>;
```

#### B) 렌더링 과정 이해

```jsx
function Hello() {
  console.log('Hello 컴포넌트 렌더링'); // 렌더링마다 실행
  
  const now = new Date().toLocaleTimeString(); // 매번 새로 계산
  
  return (
    <div>
      현재 시각: {now}
    </div>
  );
}

// App에서 Hello를 사용하면
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <Hello />  {/* count 변경 시 Hello도 다시 렌더링됨 */}
    </div>
  );
}
```

#### C) 컴포넌트 명명과 파일 구조

```jsx
// 파일명과 컴포넌트명 일치 권장
// src/components/Hello.jsx

// 📍 Named Export (여러 개 가능)
export function Hello() { }
export function Goodbye() { }

// 📍 Default Export (파일당 하나)
export default function Hello() { }

// 사용 시
import Hello from './components/Hello';           // default export
import { Hello, Goodbye } from './components/Hello'; // named export
```

---

## 3. Props를 통한 컴포넌트 통신

### 3.1 Props의 본질과 특성

**Props (Properties)**는 React에서 컴포넌트 간에 데이터를 전달하는 방법입니다.

#### Props의 핵심 특징

1. **읽기 전용 (Immutable)**: 자식 컴포넌트에서 props를 직접 수정할 수 없음
2. **단방향 데이터 플로우**: 부모 → 자식으로만 데이터 전달
3. **타입 무관**: 모든 JavaScript 값 전달 가능 (원시값, 객체, 함수, 컴포넌트 등)

### 3.2 UserBadge 컴포넌트로 보는 Props 패턴

```jsx
// src/components/UserBadge.jsx 상세 분석
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function UserBadge({ name, role = 'Member' }) {
  // 📍 1. Props 구조분해할당
  // - name: 필수 prop
  // - role: 선택적 prop (기본값 'Member')
  
  // 📍 2. Props 기반 로직 처리
  const initial = (name ?? 'U').trim().charAt(0);
  // - Null 병합 연산자(??)로 안전성 확보
  // - 문자열 메서드 체이닝으로 첫 글자 추출
  
  return (
    <Paper
      variant="outlined"
      sx={{ p: 1.5, borderRadius: 2, display: 'inline-block' }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {/* 📍 3. 계산된 값 사용 */}
        <Avatar sx={{ backgroundColor: 'primary.main' }}>
          {initial}
        </Avatar>
        
        {/* 📍 4. Props 직접 사용 */}
        <Typography fontWeight={700}>{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({role})
        </Typography>
      </Stack>
    </Paper>
  );
}
```

### 3.3 Props 사용 패턴 분석

#### A) Props 전달 방식

```jsx
// src/App.jsx에서 UserBadge 사용 분석
export default function App() {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        {/* 📍 1. 모든 props 명시적 전달 */}
        <UserBadge name="김경덕" role="Software Engineer" />
        
        {/* 📍 2. 기본값 활용 - role 생략 */}
        <UserBadge name="홍길동" />
        
        {/* 📍 3. 동적 props 전달 예시 */}
        {users.map(user => (
          <UserBadge 
            key={user.id}
            name={user.name} 
            role={user.role} 
          />
        ))}
      </Box>
    </Container>
  );
}
```

#### B) Props 기본값 설정 패턴

```jsx
// ✅ 방법 1: 함수 매개변수 기본값 (권장)
function UserBadge({ name, role = 'Member' }) {
  return <div>{name} - {role}</div>;
}

// ✅ 방법 2: 구조분해할당 후 기본값
function UserBadge(props) {
  const { name, role = 'Member' } = props;
  return <div>{name} - {role}</div>;
}

// ✅ 방법 3: Null 병합 연산자 활용
function UserBadge({ name, role }) {
  const displayRole = role ?? 'Member';
  return <div>{name} - {displayRole}</div>;
}

// ❌ 과거 방식: defaultProps (React 18.3+에서 deprecated)
UserBadge.defaultProps = {
  role: 'Member'
};
```

#### C) Props 검증과 안전한 접근

```jsx
// 프로젝트의 안전한 Props 접근 예시
export default function UserBadge({ name, role = 'Member' }) {
  // 📍 1. Null 안전성 확보
  const initial = (name ?? 'U').trim().charAt(0);
  //                ^^^^ null/undefined 처리
  //                      ^^^^^^ 빈 문자열 처리
  //                             ^^^^^^^^^ 첫 글자 안전 추출
  
  // 📍 2. 조건부 렌더링으로 예외 처리
  if (!name || name.trim() === '') {
    return (
      <Paper variant="outlined" sx={{ p: 1.5, opacity: 0.5 }}>
        <Typography color="text.disabled">
          이름이 필요합니다
        </Typography>
      </Paper>
    );
  }
  
  return (
    // 정상 렌더링 로직
  );
}
```

### 3.4 고급 Props 패턴

#### A) Props로 함수 전달 (콜백 패턴)

```jsx
// 부모 컴포넌트
function UserList() {
  const handleUserClick = (userName) => {
    console.log(`${userName} 클릭됨`);
  };
  
  return (
    <div>
      <UserBadge 
        name="김경덕" 
        role="Engineer"
        onClick={handleUserClick}  // 함수를 props로 전달
      />
    </div>
  );
}

// 자식 컴포넌트
function UserBadge({ name, role, onClick }) {
  const handleClick = () => {
    onClick?.(name);  // 선택적 체이닝으로 안전하게 호출
  };
  
  return (
    <Paper onClick={handleClick} sx={{ cursor: 'pointer' }}>
      {/* 컴포넌트 내용 */}
    </Paper>
  );
}
```

#### B) Props Spreading (전개 연산자 활용)

```jsx
// Props 전달 최적화
function App() {
  const users = [
    { id: 1, name: '김경덕', role: 'Software Engineer' },
    { id: 2, name: '홍길동', role: 'Designer' }
  ];
  
  return (
    <div>
      {users.map(user => (
        <UserBadge 
          key={user.id}
          {...user}  // user 객체의 모든 속성을 props로 전달
        />
      ))}
    </div>
  );
}
```

---

## 4. Children과 컴포넌트 합성

### 4.1 Children의 개념

**Children**은 React에서 컴포넌트의 여는 태그와 닫는 태그 사이에 전달되는 내용을 나타내는 특별한 prop입니다.

#### Vue.js Slot vs React Children

```vue
<!-- Vue.js 슬롯 -->
<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot>  <!-- 기본 슬롯 -->
    <slot name="footer"></slot>
  </div>
</template>
```

```jsx
// React Children (기본 단일 슬롯)
function Card({ children, title, footer }) {
  return (
    <div className="card">
      {title && <header>{title}</header>}
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}
```

### 4.2 Card 컴포넌트로 보는 Children 활용

```jsx
// src/components/Card.jsx 상세 분석
import * as React from 'react';
import MuiCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';

export default function Card({ title, children, footer }) {
  // 📍 1. Props 구조분해할당
  // - title: 카드 헤더 내용 (선택적)
  // - children: 카드 본문 내용 (React 기본 prop)
  // - footer: 카드 하단 내용 (선택적)
  
  return (
    <MuiCard variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
      {/* 📍 2. 조건부 헤더 렌더링 */}
      {title && (
        <CardHeader
          title={title}
          sx={{ 
            backgroundColor: 'primary.main', 
            color: 'primary.contrastText',
            '& .MuiCardHeader-title': { fontWeight: 700 } 
          }}
        />
      )}
      
      {/* 📍 3. Children 렌더링 - 핵심! */}
      <CardContent>{children}</CardContent>
      
      {/* 📍 4. 조건부 푸터 렌더링 */}
      {footer && (
        <>
          <Divider />
          <CardActions sx={{ px: 2, py: 1.5 }}>{footer}</CardActions>
        </>
      )}
    </MuiCard>
  );
}
```

### 4.3 App.jsx에서 Card 사용 패턴 분석

```jsx
// src/App.jsx에서 Card 컴포넌트 사용 분석
export default function App() {
  return (
    <Container maxWidth="md">
      {/* 📍 1. 문자열 Children */}
      <Card 
        title="공지"  
        children="리액트 스터디는 매주 화/목 19:00에 진행합니까?" 
        footer=""
      />

      {/* 📍 2. JSX 요소 Children - 복잡한 구조 */}
      <Card
        title="업무 가이드"
        children={
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>PR은 최소 1명 리뷰 후 머지</li>
            <li>Lint 에러 0 유지</li>
            <li>커밋 메시지 규칙: feat/fix/chore 등 prefix</li>
          </ul>
        }
        footer={
          <Typography variant="caption">
            마지막 업데이트: 2025-08-27
          </Typography>
        }
      />
    </Container>
  );
}
```

### 4.4 Children 사용 패턴들

#### A) 다양한 Children 타입

```jsx
function ExampleCard({ children }) {
  return <div className="card">{children}</div>;
}

// 1. 문자열 Children
<ExampleCard>간단한 텍스트</ExampleCard>

// 2. JSX 요소 Children
<ExampleCard>
  <p>복잡한 <strong>HTML</strong> 구조</p>
</ExampleCard>

// 3. 여러 요소 Children
<ExampleCard>
  <h2>제목</h2>
  <p>내용</p>
  <button>액션</button>
</ExampleCard>

// 4. 함수 Children (render props 패턴)
<ExampleCard>
  {(data) => <div>동적 데이터: {data}</div>}
</ExampleCard>
```

#### B) Children 조작과 검증

```jsx
import React from 'react';

function SafeCard({ children, maxItems = 3 }) {
  // Children 개수 확인
  const childCount = React.Children.count(children);
  
  if (childCount > maxItems) {
    return (
      <div className="warning">
        너무 많은 항목입니다. 최대 {maxItems}개까지 허용됩니다.
      </div>
    );
  }
  
  // Children을 배열로 변환하여 조작
  const processedChildren = React.Children.map(children, (child, index) => {
    return (
      <div key={index} className={`item-${index}`}>
        {child}
      </div>
    );
  });
  
  return <div className="safe-card">{processedChildren}</div>;
}
```

### 4.5 컴포넌트 합성 패턴

#### A) Layout 컴포넌트

```jsx
function Layout({ children }) {
  return (
    <div className="layout">
      <header>공통 헤더</header>
      <main>{children}</main>  {/* 페이지별 내용 */}
      <footer>공통 푸터</footer>
    </div>
  );
}

// 사용
<Layout>
  <h1>홈페이지</h1>
  <p>홈페이지 내용</p>
</Layout>
```

#### B) Modal 컴포넌트

```jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}  {/* 모달 내용은 사용하는 곳에서 정의 */}
      </div>
    </div>
  );
}

// 사용
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <h2>확인</h2>
  <p>정말로 삭제하시겠습니까?</p>
  <button onClick={handleDelete}>삭제</button>
</Modal>
```

---

## 5. 조건부 렌더링과 동적 UI

### 5.1 조건부 렌더링 패턴들

React에서는 JavaScript의 조건문을 활용하여 동적으로 UI를 렌더링할 수 있습니다.

#### A) 삼항 연산자 (Ternary Operator)

```jsx
function UserStatus({ user }) {
  return (
    <div>
      {user.isLoggedIn ? (
        <div>
          <h2>환영합니다, {user.name}님!</h2>
          <button>로그아웃</button>
        </div>
      ) : (
        <div>
          <h2>로그인이 필요합니다</h2>
          <button>로그인</button>
        </div>
      )}
    </div>
  );
}
```

#### B) 논리 AND 연산자

```jsx
// Card 컴포넌트의 조건부 렌더링 예시
export default function Card({ title, children, footer }) {
  return (
    <MuiCard>
      {/* title이 있을 때만 헤더 렌더링 */}
      {title && (
        <CardHeader title={title} />
      )}
      
      <CardContent>{children}</CardContent>
      
      {/* footer가 있을 때만 푸터 영역 렌더링 */}
      {footer && (
        <>
          <Divider />
          <CardActions>{footer}</CardActions>
        </>
      )}
    </MuiCard>
  );
}
```

#### C) 논리 OR 연산자 (기본값 제공)

```jsx
function UserBadge({ name, role }) {
  return (
    <div>
      <span>{name || '이름 없음'}</span>
      <span>({role || '역할 미정'})</span>
    </div>
  );
}

// Null 병합 연산자(??) 사용 (권장)
function UserBadge({ name, role }) {
  return (
    <div>
      <span>{name ?? '이름 없음'}</span>
      <span>({role ?? '역할 미정'})</span>
    </div>
  );
}
```

### 5.2 복잡한 조건부 렌더링

#### A) 다중 조건 처리

```jsx
function UserStatusBadge({ user }) {
  const renderStatus = () => {
    if (user.isActive) {
      return <span className="status active">활성</span>;
    }
    
    if (user.isPending) {
      return <span className="status pending">승인 대기</span>;
    }
    
    if (user.isSuspended) {
      return <span className="status suspended">계정 정지</span>;
    }
    
    return <span className="status inactive">비활성</span>;
  };
  
  return (
    <div className="user-badge">
      <span>{user.name}</span>
      {renderStatus()}
    </div>
  );
}
```

#### B) Switch-Case 패턴 (객체 매핑)

```jsx
function StatusBadge({ status }) {
  const statusConfig = {
    active: { text: '활성', color: 'green' },
    pending: { text: '대기', color: 'orange' },
    suspended: { text: '정지', color: 'red' },
    inactive: { text: '비활성', color: 'gray' }
  };
  
  const config = statusConfig[status] || statusConfig.inactive;
  
  return (
    <span style={{ color: config.color }}>
      {config.text}
    </span>
  );
}
```

### 5.3 조건부 클래스 및 스타일 적용

```jsx
function Button({ primary, disabled, children }) {
  // 조건부 클래스명 생성
  const getClassName = () => {
    let classes = ['btn'];
    
    if (primary) classes.push('btn-primary');
    if (disabled) classes.push('btn-disabled');
    
    return classes.join(' ');
  };
  
  // 조건부 스타일 객체
  const getStyles = () => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: primary ? '#007bff' : '#6c757d'
  });
  
  return (
    <button 
      className={getClassName()}
      style={getStyles()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

---

## 6. 리스트 렌더링과 Key 전략

### 6.1 배열을 이용한 리스트 렌더링

React에서는 JavaScript 배열의 `map()` 메서드를 사용하여 리스트를 렌더링합니다.

#### A) 기본 리스트 렌더링

```jsx
// App.jsx에서 UserBadge 리스트 렌더링 예시
function App() {
  const users = [
    { id: 1, name: '김경덕', role: 'Software Engineer' },
    { id: 2, name: '홍길동', role: 'Designer' },
    { id: 3, name: '이순신', role: 'Product Manager' }
  ];
  
  return (
    <Container>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        {/* 📍 배열 map을 이용한 리스트 렌더링 */}
        {users.map(user => (
          <UserBadge 
            key={user.id}  // 📍 중요: 고유 key 제공
            name={user.name} 
            role={user.role} 
          />
        ))}
      </Box>
    </Container>
  );
}
```

#### B) 조건부 필터링과 리스트 렌더링

```jsx
function FilteredUserList({ users, showOnlyActive }) {
  return (
    <div>
      {users
        .filter(user => !showOnlyActive || user.isActive)  // 필터링
        .map(user => (
          <UserBadge 
            key={user.id}
            name={user.name}
            role={user.role}
          />
        ))
      }
    </div>
  );
}
```

### 6.2 Key의 중요성과 선택 전략

#### A) Key가 필요한 이유

React는 리스트가 변경될 때 어떤 아이템이 추가/제거/변경되었는지 효율적으로 판단하기 위해 **key**를 사용합니다.

```jsx
// ❌ Key 없는 리스트 - React가 경고 메시지 표시
function BadList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li>{item.name}</li>  // Warning: Each child should have a unique "key" prop
      ))}
    </ul>
  );
}

// ✅ 적절한 Key 사용
function GoodList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

#### B) Key 선택 전략

```jsx
// ✅ 최고: 안정적인 고유 ID 사용
{users.map(user => (
  <UserBadge key={user.id} {...user} />
))}

// ✅ 좋음: 복합 키 생성
{users.map(user => (
  <UserBadge key={`${user.id}-${user.email}`} {...user} />
))}

// ⚠️ 주의: index 사용 - 순서가 바뀔 가능성이 없을 때만
{users.map((user, index) => (
  <UserBadge key={index} {...user} />
))}

// ❌ 최악: 매번 새로운 값 생성
{users.map(user => (
  <UserBadge key={Math.random()} {...user} />  // 매 렌더링마다 재생성
))}
```

#### C) Index를 Key로 사용했을 때의 문제점

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '첫 번째 할 일', completed: false },
    { id: 2, text: '두 번째 할 일', completed: false },
    { id: 3, text: '세 번째 할 일', completed: false }
  ]);
  
  // ❌ Index를 key로 사용하는 문제 케이스
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem 
          key={index}  // 문제: 아이템 순서가 바뀌면 혼란
          todo={todo}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}

// 문제 시나리오:
// 1. 두 번째 아이템 삭제
// 2. 기존 "세 번째 할 일"이 index 1이 됨
// 3. React는 key가 1인 컴포넌트를 재사용
// 4. 잘못된 상태나 입력값이 남아있을 수 있음

// ✅ 올바른 해결책
return (
  <div>
    {todos.map(todo => (
      <TodoItem 
        key={todo.id}  // 안정적인 고유 ID 사용
        todo={todo}
        onDelete={() => deleteTodo(todo.id)}
      />
    ))}
  </div>
);
```

### 6.3 동적 리스트 조작

#### A) 아이템 추가/제거

```jsx
function DynamicUserList() {
  const [users, setUsers] = useState([
    { id: 1, name: '김경덕', role: 'Engineer' }
  ]);
  
  const addUser = () => {
    const newUser = {
      id: Date.now(), // 임시 ID 생성
      name: '새 사용자',
      role: 'Member'
    };
    setUsers(prev => [...prev, newUser]);
  };
  
  const removeUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };
  
  return (
    <div>
      <button onClick={addUser}>사용자 추가</button>
      
      {users.map(user => (
        <div key={user.id}>
          <UserBadge name={user.name} role={user.role} />
          <button onClick={() => removeUser(user.id)}>삭제</button>
        </div>
      ))}
    </div>
  );
}
```

#### B) 리스트 정렬과 필터링

```jsx
function SortableUserList({ users }) {
  const [sortBy, setSortBy] = useState('name');
  const [filterRole, setFilterRole] = useState('all');
  
  const processedUsers = users
    .filter(user => filterRole === 'all' || user.role === filterRole)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'role') return a.role.localeCompare(b.role);
      return 0;
    });
  
  return (
    <div>
      <div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name">이름순</option>
          <option value="role">역할순</option>
        </select>
        
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="all">전체</option>
          <option value="Engineer">엔지니어</option>
          <option value="Designer">디자이너</option>
        </select>
      </div>
      
      {processedUsers.map(user => (
        <UserBadge 
          key={user.id}
          name={user.name} 
          role={user.role} 
        />
      ))}
    </div>
  );
}
```

---

## 7. Compound Components 패턴

### 7.1 Compound Components란?

**Compound Components**는 여러 개의 컴포넌트가 함께 작동하여 하나의 완전한 기능을 제공하는 패턴입니다. HTML의 `<select>`와 `<option>` 관계와 유사합니다.

### 7.2 Panel 컴포넌트로 보는 Compound 패턴

```jsx
// src/components/Panel.jsx 상세 분석
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// 📍 1. 메인 컴포넌트 - 컨테이너 역할
function Panel({ children }) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {children}
    </Paper>
  );
}

// 📍 2. 서브 컴포넌트들 - 각각의 특정 역할
function PanelHeader({ children }) {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        fontWeight: 700,
      }}
    >
      {children}
    </Box>
  );
}

function PanelBody({ children }) {
  return <Box sx={{ px: 1.5, py: 1.5 }}>{children}</Box>;
}

function PanelFooter({ children }) {
  return (
    <Box sx={{ px: 1.5, py: 1.5, borderTop: 1, borderColor: 'divider' }}>
      {children}
    </Box>
  );
}

// 📍 3. 컴포넌트 조합 - 핵심!
Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

export default Panel;
```

### 7.3 Compound Components 사용 패턴

```jsx
// src/App.jsx에서 Panel 사용 분석
export default function App() {
  return (
    <Container>
      <Typography variant="h4">Compound Components</Typography>
      
      {/* 📍 Compound Components 사용 패턴 */}
      <Panel>
        <Panel.Header>프로젝트 알림</Panel.Header>
        <Panel.Body>이번 스프린트 목표는 성능 30% 개선입니다.</Panel.Body>
        <Panel.Footer>담당: FE Chapter</Panel.Footer>
      </Panel>
    </Container>
  );
}
```

### 7.4 Compound Components의 장점

#### A) 유연성
```jsx
// 필요한 부분만 사용 가능
<Panel>
  <Panel.Header>제목만 있는 패널</Panel.Header>
  <Panel.Body>본문 내용</Panel.Body>
  {/* Footer 생략 가능 */}
</Panel>

// 순서 변경 가능
<Panel>
  <Panel.Body>내용이 먼저 오는 패널</Panel.Body>
  <Panel.Header>나중에 오는 제목</Panel.Header>
</Panel>
```

#### B) 명시적 구조
```jsx
// ✅ 구조가 명확함
<Panel>
  <Panel.Header>헤더</Panel.Header>
  <Panel.Body>본문</Panel.Body>
</Panel>

// ❌ Props 방식 - 복잡한 구조에서는 불명확
<Panel 
  header="헤더"
  body="본문"
  footer={<ComplexFooter />}
/>
```

### 7.5 고급 Compound Components 패턴

#### A) Context를 활용한 상태 공유

```jsx
// 고급 패턴: Panel 내부 상태 공유
const PanelContext = React.createContext();

function Panel({ children, collapsible = false }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const value = {
    isCollapsed,
    setIsCollapsed,
    collapsible
  };
  
  return (
    <PanelContext.Provider value={value}>
      <Paper variant="outlined">
        {children}
      </Paper>
    </PanelContext.Provider>
  );
}

function PanelHeader({ children }) {
  const { isCollapsed, setIsCollapsed, collapsible } = useContext(PanelContext);
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{children}</span>
      {collapsible && (
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '펼치기' : '접기'}
        </button>
      )}
    </Box>
  );
}

function PanelBody({ children }) {
  const { isCollapsed } = useContext(PanelContext);
  
  if (isCollapsed) return null;
  
  return <Box sx={{ p: 1.5 }}>{children}</Box>;
}
```

#### B) 실제 라이브러리에서의 Compound 패턴

```jsx
// React Router의 Compound 패턴
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>

// Ant Design의 Compound 패턴
<Menu>
  <Menu.Item key="1">메뉴 1</Menu.Item>
  <Menu.SubMenu title="서브메뉴">
    <Menu.Item key="2">서브 아이템</Menu.Item>
  </Menu.SubMenu>
</Menu>

// React Hook Form의 Compound 패턴
<Form>
  <Form.Item label="이름">
    <Input />
  </Form.Item>
  <Form.Item label="이메일">
    <Input type="email" />
  </Form.Item>
</Form>
```

---

## 8. 실습 프로젝트 상세 분석

### 8.1 전체 애플리케이션 구조

```jsx
// src/App.jsx - 프로젝트 전체 구조 분석
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

// 📍 컴포넌트 import - 각각 다른 패턴을 보여줌
import Hello from './components/Hello';        // 기본 함수형 컴포넌트
import UserBadge from './components/UserBadge'; // Props 활용
import Card from './components/Card';           // Children 패턴
import Panel from './components/Panel';         // Compound Components

export default function App() {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* 📍 섹션 1: 기본 컴포넌트 */}
      <Typography variant="h4" fontWeight={800} gutterBottom>
        JSX & 컴포넌트 기초
      </Typography>
      <Hello />

      <Divider sx={{ my: 3 }} />

      {/* 📍 섹션 2: Props 패턴 */}
      <Typography variant="h4" fontWeight={800} gutterBottom>
        props 기본
      </Typography>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        <UserBadge name="김경덕" role="Software Engineer" />
        <UserBadge name="홍길동" />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 📍 섹션 3: Children 패턴 */}
      <Card title="공지" footer="">
        리액트 스터디는 매주 화/목 19:00에 진행합니까?
      </Card>

      <Card
        title="업무 가이드"
        footer={<Typography variant="caption">마지막 업데이트: 2025-08-27</Typography>}
      >
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>PR은 최소 1명 리뷰 후 머지</li>
          <li>Lint 에러 0 유지</li>
          <li>커밋 메시지 규칙: feat/fix/chore 등 prefix</li>
        </ul>
      </Card>

      <Divider sx={{ my: 3 }} />

      {/* 📍 섹션 4: Compound Components 패턴 */}
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Compound Components
      </Typography>
      <Panel>
        <Panel.Header>프로젝트 알림</Panel.Header>
        <Panel.Body>이번 스프린트 목표는 성능 30% 개선입니다.</Panel.Body>
        <Panel.Footer>담당: FE Chapter</Panel.Footer>
      </Panel>
    </Container>
  );
}
```

### 8.2 컴포넌트별 학습 목표와 패턴

#### A) Hello.jsx - 기본 컴포넌트 패턴
```jsx
// 학습 목표: 함수형 컴포넌트 기초, JSX 표현식
export default function Hello() {
  const now = new Date().toLocaleTimeString();
  
  return (
    <Stack spacing={1}>
      <Typography variant="h5" component="h2" fontWeight={700}>
        안녕하세요 👋
      </Typography>
      <Typography variant="body1" color="text.secondary">
        <AccessTimeIcon fontSize="small" />
        지금 시각: {now}  {/* JSX 표현식 삽입 */}
      </Typography>
    </Stack>
  );
}
```

**핵심 학습 포인트**:
1. 함수형 컴포넌트 정의
2. JSX 표현식 사용 (`{now}`)
3. Material-UI 컴포넌트 조합
4. 로컬 변수 활용

#### B) UserBadge.jsx - Props 활용 패턴
```jsx
// 학습 목표: Props 구조분해할당, 기본값, 안전한 접근
export default function UserBadge({ name, role = 'Member' }) {
  const initial = (name ?? 'U').trim().charAt(0);
  
  return (
    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ backgroundColor: 'primary.main' }}>
          {initial}
        </Avatar>
        <Typography fontWeight={700}>{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({role})
        </Typography>
      </Stack>
    </Paper>
  );
}
```

**핵심 학습 포인트**:
1. Props 구조분해할당
2. 기본값 설정 (`role = 'Member'`)
3. Null 안전성 (`name ?? 'U'`)
4. Props 기반 로직 처리

#### C) Card.jsx - Children 활용 패턴
```jsx
// 학습 목표: Children prop, 조건부 렌더링, 컴포넌트 합성
export default function Card({ title, children, footer }) {
  return (
    <MuiCard variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
      {title && (
        <CardHeader title={title} sx={{ backgroundColor: 'primary.main' }} />
      )}
      <CardContent>{children}</CardContent>  {/* Children 렌더링 */}
      {footer && (
        <>
          <Divider />
          <CardActions sx={{ px: 2, py: 1.5 }}>{footer}</CardActions>
        </>
      )}
    </MuiCard>
  );
}
```

**핵심 학습 포인트**:
1. Children prop 활용
2. 조건부 렌더링 (`{title && ...}`)
3. 레이아웃 컴포넌트 설계
4. Material-UI 컴포넌트 합성

#### D) Panel.jsx - Compound Components 패턴
```jsx
// 학습 목표: 컴포넌트 조합, 네임스페이스 패턴
function Panel({ children }) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {children}
    </Paper>
  );
}

// 서브 컴포넌트들
function PanelHeader({ children }) { /* ... */ }
function PanelBody({ children }) { /* ... */ }
function PanelFooter({ children }) { /* ... */ }

// 컴포넌트 조합
Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

export default Panel;
```

**핵심 학습 포인트**:
1. Compound Components 패턴
2. 네임스페이스를 통한 컴포넌트 그룹화
3. 구조적 유연성 제공
4. 명시적인 컴포넌트 관계

### 8.3 프로젝트의 교육적 가치

#### A) 점진적 복잡성 증가
```
Hello (기본) 
→ UserBadge (Props) 
→ Card (Children) 
→ Panel (Compound)
```

#### B) 실무 패턴 학습
1. **재사용 가능한 컴포넌트** 설계
2. **Props 인터페이스** 설계
3. **컴포넌트 합성** 전략
4. **Material-UI 통합** 방법

#### C) 베스트 프랙티스 적용
1. **타입 안전성** (기본값, Null 체크)
2. **접근성** (semantic HTML, ARIA)
3. **성능 고려사항** (조건부 렌더링)
4. **코드 구조화** (관심사 분리)

---

## 9. 베스트 프랙티스와 최적화 전략

### 9.1 컴포넌트 설계 원칙

#### A) 단일 책임 원칙 (SRP)
```jsx
// ✅ 각 컴포넌트가 하나의 명확한 책임을 가짐
function UserAvatar({ user }) {
  return <Avatar src={user.avatar} alt={user.name} />;
}

function UserInfo({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.role}</p>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <UserAvatar user={user} />
      <UserInfo user={user} />
    </div>
  );
}

// ❌ 너무 많은 책임을 가진 컴포넌트
function UserEverything({ user }) {
  // 아바타 로직, 정보 표시, 편집, 삭제, 권한 체크 등
  // 모든 것을 하나의 컴포넌트에서 처리
}
```

#### B) Props 인터페이스 설계
```jsx
// ✅ 명확하고 예측 가능한 Props
function Button({
  children,                    // 버튼 내용
  onClick,                     // 클릭 핸들러
  disabled = false,           // 비활성화 상태
  variant = 'primary',        // 스타일 변형
  size = 'medium',           // 크기
  type = 'button',           // HTML 타입
  ...rest                    // 기타 HTML 속성
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size}`}
      {...rest}
    >
      {children}
    </button>
  );
}

// ❌ 불분명한 Props
function Button({ data, config, options }) {
  // 어떤 데이터가 필요한지 알 수 없음
}
```

### 9.2 성능 최적화 전략

#### A) 불필요한 렌더링 방지
```jsx
// React.memo로 프롭스 변경시만 리렌더링
const UserBadge = React.memo(function UserBadge({ name, role }) {
  console.log(`UserBadge 렌더링: ${name}`);
  
  return (
    <div>
      <span>{name}</span>
      <span>({role})</span>
    </div>
  );
});

// 부모 컴포넌트
function UserList({ users, searchTerm }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}  {/* count 변경시 UserBadge는 리렌더링 안됨 */}
      </button>
      
      {users.map(user => (
        <UserBadge key={user.id} name={user.name} role={user.role} />
      ))}
    </div>
  );
}
```

#### B) 조건부 렌더링 최적화
```jsx
// ✅ 조건이 자주 바뀌지 않는 경우
function UserProfile({ user, showDetails }) {
  return (
    <div>
      <UserBasicInfo user={user} />
      {showDetails && <UserDetailInfo user={user} />}
    </div>
  );
}

// ✅ 복잡한 조건부 렌더링
function UserStatus({ user }) {
  if (user.isLoading) {
    return <LoadingSpinner />;
  }
  
  if (user.error) {
    return <ErrorMessage error={user.error} />;
  }
  
  if (!user.data) {
    return <EmptyState />;
  }
  
  return <UserInfo user={user.data} />;
}
```

### 9.3 접근성 (Accessibility) 고려사항

#### A) 의미있는 HTML 구조
```jsx
// ✅ 적절한 HTML 시맨틱 사용
function UserCard({ user }) {
  return (
    <article className="user-card">      {/* 독립적 콘텐츠 */}
      <header>
        <h2>{user.name}</h2>             {/* 제목 계층 */}
      </header>
      <section>
        <p>역할: {user.role}</p>
        <p>부서: {user.department}</p>
      </section>
    </article>
  );
}

// ❌ div만 사용하는 구조
function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="title">{user.name}</div>
      <div>{user.role}</div>
    </div>
  );
}
```

#### B) ARIA 속성 활용
```jsx
function ExpandableSection({ title, children, isExpanded, onToggle }) {
  const contentId = `content-${title.replace(/\s+/g, '-')}`;
  
  return (
    <div>
      <button
        aria-expanded={isExpanded}           // 확장 상태
        aria-controls={contentId}            // 제어하는 요소
        onClick={onToggle}
      >
        {title}
        <span aria-hidden="true">           {/* 스크린리더에서 숨김 */}
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>
      
      <div
        id={contentId}
        aria-hidden={!isExpanded}            // 숨김 상태
        role="region"                        // 영역 역할
        aria-labelledby={`${contentId}-title`}
      >
        {children}
      </div>
    </div>
  );
}
```

### 9.4 에러 처리와 안전성

#### A) 방어적 코딩
```jsx
// UserBadge.jsx의 안전한 Props 처리 예시
export default function UserBadge({ name, role = 'Member' }) {
  // 📍 방어적 코딩 - 예외 상황 처리
  if (!name || typeof name !== 'string') {
    return (
      <Paper sx={{ p: 1.5, opacity: 0.5 }}>
        <Typography color="text.disabled">
          유효하지 않은 사용자 정보
        </Typography>
      </Paper>
    );
  }
  
  const initial = name.trim().charAt(0) || 'U';
  
  return (
    <Paper variant="outlined" sx={{ p: 1.5 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar>{initial}</Avatar>
        <Typography>{name}</Typography>
        <Typography variant="body2">({role})</Typography>
      </Stack>
    </Paper>
  );
}
```

#### B) PropTypes 또는 TypeScript
```jsx
// PropTypes 사용 (JavaScript)
import PropTypes from 'prop-types';

function UserBadge({ name, role }) {
  // 컴포넌트 로직
}

UserBadge.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string
};

UserBadge.defaultProps = {
  role: 'Member'
};

// TypeScript 사용 (권장)
interface UserBadgeProps {
  name: string;
  role?: string;
}

function UserBadge({ name, role = 'Member' }: UserBadgeProps) {
  // 타입 안전한 컴포넌트 로직
}
```

### 9.5 코드 구조화와 유지보수성

#### A) 커스텀 훅으로 로직 분리
```jsx
// 로직을 커스텀 훅으로 분리
function useUserInitial(name) {
  return useMemo(() => {
    if (!name || typeof name !== 'string') return 'U';
    return name.trim().charAt(0).toUpperCase();
  }, [name]);
}

function UserBadge({ name, role = 'Member' }) {
  const initial = useUserInitial(name);
  
  return (
    <Paper>
      <Avatar>{initial}</Avatar>
      <span>{name}</span>
      <span>({role})</span>
    </Paper>
  );
}
```

#### B) 상수와 설정 분리
```jsx
// constants/userRoles.js
export const USER_ROLES = {
  ADMIN: 'Administrator',
  ENGINEER: 'Software Engineer',
  DESIGNER: 'Designer',
  MEMBER: 'Member'
} as const;

export const ROLE_COLORS = {
  [USER_ROLES.ADMIN]: 'error.main',
  [USER_ROLES.ENGINEER]: 'primary.main',
  [USER_ROLES.DESIGNER]: 'secondary.main',
  [USER_ROLES.MEMBER]: 'text.secondary'
} as const;

// UserBadge.jsx
import { USER_ROLES, ROLE_COLORS } from '../constants/userRoles';

function UserBadge({ name, role = USER_ROLES.MEMBER }) {
  const roleColor = ROLE_COLORS[role] || ROLE_COLORS[USER_ROLES.MEMBER];
  
  return (
    <Paper>
      <Avatar>{name?.[0] || 'U'}</Avatar>
      <Typography>{name}</Typography>
      <Typography color={roleColor}>({role})</Typography>
    </Paper>
  );
}
```

---

## 🎯 핵심 요약

### 1. JSX의 본질
- **JavaScript + XML**: JavaScript 안에서 HTML-like 문법 사용
- **표현식 삽입**: `{}` 안에서 JavaScript 표현식 활용
- **변환 과정**: Babel이 `React.createElement()` 호출로 변환

### 2. 함수형 컴포넌트
- **단순한 함수**: Props를 받아 JSX를 반환하는 함수
- **PascalCase 명명**: 컴포넌트는 대문자로 시작
- **재사용성**: 독립적이고 재사용 가능한 UI 단위

### 3. Props 시스템
- **읽기 전용**: 자식에서 Props 수정 불가
- **단방향 데이터 플로우**: 부모 → 자식으로만 전달
- **구조분해할당**: `{ name, role = 'Member' }` 패턴 활용

### 4. Children과 합성
- **Children prop**: 컴포넌트 태그 사이의 내용
- **컴포넌트 합성**: 작은 컴포넌트들을 조합하여 복잡한 UI 구성
- **레이아웃 패턴**: Card, Modal, Layout 등에 활용

### 5. 조건부/리스트 렌더링
- **조건부**: `{condition && <Component />}`, 삼항 연산자
- **리스트**: `array.map()` 메서드 활용
- **Key**: 안정적이고 고유한 식별자 제공

### 6. Compound Components
- **컴포넌트 조합**: 여러 컴포넌트가 협력하여 기능 제공
- **네임스페이스 패턴**: `Panel.Header`, `Panel.Body` 형태
- **구조적 유연성**: 필요한 부분만 조합하여 사용

---

## 🚀 다음 단계 학습 로드맵

### 즉시 적용 가능
1. **이벤트 처리**: onClick, onChange, onSubmit
2. **상태 관리**: useState를 활용한 동적 UI
3. **폼 처리**: Controlled Components 심화

### 중급 개발자
1. **useEffect**: 사이드 이펙트와 생명주기 관리
2. **커스텀 훅**: 로직 재사용과 관심사 분리
3. **Context API**: 컴포넌트 간 상태 공유

### 고급 패턴
1. **Render Props**: 함수를 children으로 전달
2. **HOC (Higher-Order Components)**: 컴포넌트 기능 확장
3. **Error Boundaries**: 에러 처리와 복구

### 실무 완성
1. **테스팅**: React Testing Library, Jest
2. **성능 최적화**: React.memo, useMemo, useCallback
3. **타입 시스템**: TypeScript 완전 활용

---

## 📝 실습 과제

### 기본 과제
1. **TodoList 컴포넌트**
   - 할 일 목록을 배열로 관리
   - 각 항목을 TodoItem 컴포넌트로 렌더링
   - 완료 상태에 따른 스타일 변경

2. **사용자 프로필 카드**
   - 사용자 정보를 props로 받는 ProfileCard 컴포넌트
   - 조건부 렌더링으로 선택적 정보 표시
   - 기본값 설정과 에러 처리

### 중급 과제
1. **Accordion 컴포넌트**
   - Compound Components 패턴 적용
   - 접기/펼치기 기능 구현
   - 여러 섹션을 독립적으로 제어

2. **검색 가능한 사용자 목록**
   - 검색어 입력 필드
   - 실시간 필터링
   - 결과 하이라이팅

### 고급 과제
1. **재사용 가능한 Modal 시스템**
   - Portal을 활용한 모달 구현
   - 다양한 크기와 스타일 지원
   - 키보드 접근성 고려

2. **동적 폼 빌더**
   - 설정에 따라 다양한 폼 필드 생성
   - 검증 로직 통합
   - TypeScript 타입 안전성 확보

이러한 과제들을 통해 JSX와 컴포넌트의 기초를 탄탄히 다지고, 실무에서 바로 활용할 수 있는 React 개발 역량을 기를 수 있습니다.