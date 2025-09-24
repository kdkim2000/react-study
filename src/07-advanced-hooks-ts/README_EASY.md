# 🎯 React 고급 훅 완벽 가이드 - 초보자를 위한 쉬운 설명

> **이 가이드의 목표**
> - useRef, useMemo, useCallback이 뭔지 알아보기
> - 언제, 왜 사용하는지 이해하기
> - 웹사이트를 빠르게 만드는 방법 배우기
> - 실제로 써볼 수 있는 예시 익히기

---

## 📖 목차
1. [고급 훅이 왜 필요한가요?](#1-고급-훅이-왜-필요한가요)
2. [useRef - HTML 요소를 직접 조작하는 도구](#2-useref---html-요소를-직접-조작하는-도구)
3. [useMemo - 계산 결과를 기억하는 똑똑한 메모장](#3-usememo---계산-결과를-기억하는-똑똑한-메모장)
4. [useCallback - 함수를 기억하는 마법사](#4-usecallback---함수를-기억하는-마법사)
5. [React.memo - 똑똑한 컴포넌트 만들기](#5-reactmemo---똑똑한-컴포넌트-만들기)
6. [실제 예시로 배워보기](#6-실제-예시로-배워보기)
7. [연습 문제](#7-연습-문제)

---

## 1. 고급 훅이 왜 필요한가요?

### 🐌 웹사이트가 느려지는 이유들

기본적인 React 훅만 사용하면 이런 문제들이 생겨요:

#### 문제 1: 똑같은 계산을 계속 반복해요
```javascript
function SearchResults() {
  const [items] = useState(많은_데이터); // 1000개 상품
  const [searchWord] = useState('신발');
  
  // 검색할 때마다 1000개를 다시 뒤져봐요! (비효율적 😵)
  const results = items.filter(item => 
    item.name.includes(searchWord)
  );
  
  return <div>{results.map(/* 결과 표시 */)}</div>;
}
```

#### 문제 2: 필요 없는 화면 업데이트가 너무 많아요
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  // count가 바뀔 때마다 새로운 함수가 만들어져요
  const handleClick = () => console.log('클릭!');
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>숫자: {count}</button>
      <ExpensiveChild onClick={handleClick} /> {/* 불필요하게 다시 그려짐 */}
    </div>
  );
}
```

#### 문제 3: HTML 요소를 직접 조작하기 어려워요
```javascript
function LoginForm() {
  // 로그인 버튼을 누르면 비밀번호 입력창에 포커스를 주고 싶은데...
  // 어떻게 해야 하지? 🤔
  
  return (
    <div>
      <input type="text" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <button>로그인</button>
    </div>
  );
}
```

### ✨ 고급 훅이 해결해주는 것들

| 훅 이름 | 해결하는 문제 | 쉬운 비유 |
|---------|---------------|----------|
| **useRef** | HTML 요소 직접 조작 | 리모컨 (TV를 직접 조작) |
| **useMemo** | 똑같은 계산 반복 | 계산기의 메모리 기능 |
| **useCallback** | 함수를 계속 새로 만드는 문제 | 전화번호부 (한 번 저장하면 계속 사용) |

---

## 2. useRef - HTML 요소를 직접 조작하는 도구

### 🎮 리모컨 같은 개념

useRef는 **HTML 요소를 직접 조작할 수 있는 리모컨**이라고 생각해보세요!

- TV 리모컨으로 채널을 바꾸듯이
- useRef로 input에 포커스를 주거나 스크롤을 움직일 수 있어요

### 📱 기본 사용법

```javascript
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  // 1. 리모컨(ref) 만들기
  const inputRef = useRef(null);
  
  // 2. 화면이 나타나면 input에 포커스 주기
  useEffect(() => {
    inputRef.current.focus(); // 리모컨으로 포커스 조작!
  }, []);
  
  return (
    <div>
      <h2>자동으로 포커스가 맞춰져요!</h2>
      <input 
        ref={inputRef}  // 3. 리모컨을 input에 연결
        placeholder="자동으로 커서가 여기에 와요"
      />
    </div>
  );
}
```

### 🕐 숫자를 세는 스톱워치 만들기

```javascript
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // 타이머 ID를 저장할 ref (화면에는 안 보이는 값)
  const timerRef = useRef(null);
  
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      // 1초마다 숫자 증가
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };
  
  const stopTimer = () => {
    setIsRunning(false);
    // 타이머 정지
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '48px' }}>{seconds}초</h1>
      <div>
        <button onClick={startTimer} disabled={isRunning}>시작</button>
        <button onClick={stopTimer} disabled={!isRunning}>정지</button>
        <button onClick={resetTimer}>리셋</button>
      </div>
      <p>{isRunning ? '⏰ 실행 중...' : '⏹️ 정지됨'}</p>
    </div>
  );
}
```

### 📋 useRef vs useState 차이점

```javascript
function ComparisonExample() {
  // useState: 화면에 표시되고, 바뀌면 화면 업데이트
  const [visibleCount, setVisibleCount] = useState(0);
  
  // useRef: 화면에 안 보이고, 바뀌어도 화면 업데이트 안됨
  const hiddenCount = useRef(0);
  
  const increaseVisible = () => {
    setVisibleCount(prev => prev + 1); // 화면 업데이트 됨!
  };
  
  const increaseHidden = () => {
    hiddenCount.current += 1; // 화면 업데이트 안됨
    console.log('숨겨진 카운트:', hiddenCount.current);
  };
  
  return (
    <div>
      <h3>화면에 보이는 숫자: {visibleCount}</h3>
      <p>숨겨진 숫자는 콘솔에서 확인하세요</p>
      
      <button onClick={increaseVisible}>보이는 숫자 +1</button>
      <button onClick={increaseHidden}>숨겨진 숫자 +1</button>
    </div>
  );
}
```

**핵심 정리**:
- **useState**: 화면에 보여줄 값 (상태가 바뀌면 화면 업데이트)
- **useRef**: 화면에 안 보이는 값이나 HTML 요소 조작 (바뀌어도 화면 업데이트 안됨)

---

## 3. useMemo - 계산 결과를 기억하는 똑똑한 메모장

### 🧮 계산기의 메모리 기능

useMemo는 **계산기의 메모리 기능**과 같아요:
- 한 번 계산한 결과를 기억해두고
- 같은 계산을 또 하려고 하면 기억해둔 답을 바로 알려줘요

### 🔍 검색 기능 만들어보기

```javascript
function ProductSearch() {
  const [searchWord, setSearchWord] = useState('');
  
  // 가짜 상품 데이터 (실제로는 서버에서 가져옴)
  const products = [
    { id: 1, name: '나이키 운동화', price: 100000 },
    { id: 2, name: '아디다스 운동화', price: 120000 },
    { id: 3, name: '나이키 후드티', price: 80000 },
    { id: 4, name: '아디다스 바지', price: 60000 },
    // ... 실제로는 1000개 이상
  ];
  
  // 🚀 useMemo로 검색 결과 기억하기
  const searchResults = useMemo(() => {
    console.log('🔍 검색 중...'); // 언제 계산되는지 확인
    
    if (!searchWord) return products; // 검색어 없으면 전체 보기
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchWord.toLowerCase())
    );
  }, [products, searchWord]); // products나 searchWord가 바뀔 때만 다시 계산
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>🛍️ 상품 검색</h2>
      
      <input
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        placeholder="상품을 검색해보세요..."
        style={{ 
          padding: '10px', 
          fontSize: '16px', 
          width: '300px',
          marginBottom: '20px'
        }}
      />
      
      <p>검색 결과: {searchResults.length}개</p>
      
      <div style={{ display: 'grid', gap: '10px' }}>
        {searchResults.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            borderRadius: '5px' 
          }}>
            <h4>{product.name}</h4>
            <p>{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### ⚡ useMemo 없이 vs 있을 때 비교

```javascript
// ❌ useMemo 없이 (비효율적)
function SlowSearch() {
  const [searchWord, setSearchWord] = useState('');
  const [otherState, setOtherState] = useState(0);
  
  // 다른 상태가 바뀌어도 매번 검색 실행! 😱
  const results = products.filter(p => p.name.includes(searchWord));
  
  return (
    <div>
      {/* 이 버튼을 누를 때마다 검색이 다시 실행됨 */}
      <button onClick={() => setOtherState(prev => prev + 1)}>
        관계없는 버튼: {otherState}
      </button>
      <div>검색 결과: {results.length}개</div>
    </div>
  );
}

// ✅ useMemo로 최적화 (효율적)
function FastSearch() {
  const [searchWord, setSearchWord] = useState('');
  const [otherState, setOtherState] = useState(0);
  
  // searchWord가 바뀔 때만 검색 실행! 😊
  const results = useMemo(() => 
    products.filter(p => p.name.includes(searchWord)),
    [searchWord] // searchWord가 바뀔 때만!
  );
  
  return (
    <div>
      {/* 이 버튼을 눌러도 검색은 다시 실행 안됨 */}
      <button onClick={() => setOtherState(prev => prev + 1)}>
        관계없는 버튼: {otherState}
      </button>
      <div>검색 결과: {results.length}개</div>
    </div>
  );
}
```

### 🎯 useMemo 사용 기준

#### 사용해야 하는 경우 ✅
```javascript
// 1. 복잡한 계산이 있을 때
const expensiveResult = useMemo(() => {
  return hugeArray.map(item => complexCalculation(item));
}, [hugeArray]);

// 2. 큰 데이터를 필터링할 때
const filteredItems = useMemo(() => {
  return items.filter(item => item.category === selectedCategory);
}, [items, selectedCategory]);

// 3. 정렬 작업을 할 때
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);
```

#### 사용하지 말아야 하는 경우 ❌
```javascript
// 간단한 계산에는 불필요
const simpleSum = useMemo(() => a + b, [a, b]); // 너무 간단해!

// 매번 바뀌는 값에는 의미 없음
const randomValue = useMemo(() => Math.random(), [Math.random()]); // 의미 없어!
```

---

## 4. useCallback - 함수를 기억하는 마법사

### 📞 전화번호부 개념

useCallback은 **전화번호부**와 같아요:
- 한 번 저장한 전화번호(함수)는 계속 같은 번호를 사용
- 매번 새로운 번호를 만들지 않아도 돼요

### 🎭 문제 상황 이해하기

```javascript
// 문제가 있는 코드
function Parent() {
  const [count, setCount] = useState(0);
  
  // count가 바뀔 때마다 새로운 함수가 만들어져요!
  const handleClick = () => {
    console.log('버튼이 클릭됐어요!');
  };
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      
      {/* Child 컴포넌트가 불필요하게 다시 그려져요 */}
      <Child onClick={handleClick} />
    </div>
  );
}

function Child({ onClick }) {
  console.log('Child 컴포넌트가 다시 그려졌어요!');
  return <button onClick={onClick}>자식 버튼</button>;
}
```

### ✨ useCallback으로 해결하기

```javascript
function OptimizedParent() {
  const [count, setCount] = useState(0);
  
  // 함수를 기억해둬서 매번 새로 만들지 않아요!
  const handleClick = useCallback(() => {
    console.log('버튼이 클릭됐어요!');
  }, []); // 빈 배열 = 한 번만 만들고 계속 사용
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      
      {/* Child 컴포넌트가 불필요하게 다시 그려지지 않아요! */}
      <OptimizedChild onClick={handleClick} />
    </div>
  );
}

// React.memo로 감싸면 props가 같을 때 다시 그리지 않아요
const OptimizedChild = React.memo(function Child({ onClick }) {
  console.log('Child 컴포넌트가 다시 그려졌어요!');
  return <button onClick={onClick}>자식 버튼</button>;
});
```

### ❤️ 좋아요 기능 만들어보기

```javascript
function LikeSystem() {
  const [likes, setLikes] = useState(new Set()); // 좋아요한 게시물 ID들
  const [posts] = useState([
    { id: 1, title: '맛있는 피자 만들기', author: '요리왕' },
    { id: 2, title: '여행 후기: 제주도', author: '여행러버' },
    { id: 3, title: '프로그래밍 팁', author: '개발자' }
  ]);
  
  // 좋아요 토글 함수를 기억해두기
  const toggleLike = useCallback((postId) => {
    setLikes(prevLikes => {
      const newLikes = new Set(prevLikes);
      if (newLikes.has(postId)) {
        newLikes.delete(postId); // 좋아요 취소
      } else {
        newLikes.add(postId); // 좋아요 추가
      }
      return newLikes;
    });
  }, []); // 의존성 없음 - 한 번만 만들고 계속 사용
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 게시물 목록</h2>
      
      {posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          isLiked={likes.has(post.id)}
          onToggleLike={toggleLike} // 항상 같은 함수 전달
        />
      ))}
      
      <p>총 좋아요 수: {likes.size}개</p>
    </div>
  );
}

// React.memo로 최적화된 게시물 카드
const PostCard = React.memo(function PostCard({ post, isLiked, onToggleLike }) {
  console.log(`${post.title} 카드가 다시 그려졌어요!`);
  
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      margin: '10px 0',
      borderRadius: '8px'
    }}>
      <h3>{post.title}</h3>
      <p>작성자: {post.author}</p>
      
      <button
        onClick={() => onToggleLike(post.id)}
        style={{
          background: isLiked ? '#ff6b6b' : '#f0f0f0',
          color: isLiked ? 'white' : 'black',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isLiked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
      </button>
    </div>
  );
});
```

### 🎯 useCallback 사용 기준

#### 사용해야 하는 경우 ✅
```javascript
// 1. 자식 컴포넌트에 전달하는 함수
const handleClick = useCallback(() => {
  // 클릭 처리
}, []);

// 2. useEffect의 의존성으로 사용되는 함수
const fetchData = useCallback(async () => {
  // 데이터 가져오기
}, [userId]);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

#### 사용하지 말아야 하는 경우 ❌
```javascript
// 자식 컴포넌트에 전달하지 않는 단순한 함수
const handleClick = useCallback(() => {
  console.log('클릭!');
}, []); // 불필요함

// 직접 JSX에서 사용하는 함수
<button onClick={useCallback(() => doSomething(), [])}> // 의미 없음
```

---

## 5. React.memo - 똑똑한 컴포넌트 만들기

### 🧠 똑똑한 학생 비유

React.memo는 **똑똑한 학생**과 같아요:
- 선생님이 같은 문제를 또 내면 "이거 이미 풀었어요!" 라고 해서 시간을 절약
- React.memo로 감싼 컴포넌트는 "props가 같으면 다시 그리지 않아요!" 라고 해요

### 📊 성능 비교해보기

```javascript
// 일반 컴포넌트 (매번 다시 그려짐)
function RegularComponent({ name, age }) {
  console.log(`${name} 컴포넌트가 다시 그려졌어요!`);
  
  return (
    <div style={{ border: '1px solid blue', margin: '10px', padding: '10px' }}>
      <h3>일반 컴포넌트</h3>
      <p>이름: {name}</p>
      <p>나이: {age}살</p>
    </div>
  );
}

// React.memo로 최적화된 컴포넌트 (props가 같으면 다시 안 그려짐)
const SmartComponent = React.memo(function SmartComponent({ name, age }) {
  console.log(`${name} 똑똑한 컴포넌트가 다시 그려졌어요!`);
  
  return (
    <div style={{ border: '1px solid green', margin: '10px', padding: '10px' }}>
      <h3>똑똑한 컴포넌트 (React.memo)</h3>
      <p>이름: {name}</p>
      <p>나이: {age}살</p>
    </div>
  );
});

// 테스트용 부모 컴포넌트
function ComparisonTest() {
  const [count, setCount] = useState(0);
  const [name] = useState('김철수');
  const [age] = useState(15);
  
  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => setCount(count + 1)}>
        클릭 횟수: {count} (콘솔을 확인하세요!)
      </button>
      
      <RegularComponent name={name} age={age} />
      <SmartComponent name={name} age={age} />
      
      <p>🔍 콘솔에서 어떤 컴포넌트가 다시 그려지는지 확인해보세요!</p>
    </div>
  );
}
```

### 🎯 실제 사용 예시: 상품 카드

```javascript
// 상품 정보를 보여주는 카드 컴포넌트
const ProductCard = React.memo(function ProductCard({ 
  product, 
  isInCart, 
  onAddToCart, 
  onRemoveFromCart 
}) {
  console.log(`${product.name} 카드가 렌더링됐어요!`);
  
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      maxWidth: '250px'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
      
      {isInCart ? (
        <button 
          onClick={() => onRemoveFromCart(product.id)}
          style={{ background: '#ff6b6b', color: 'white', padding: '8px 16px' }}
        >
          🛒 장바구니에서 빼기
        </button>
      ) : (
        <button 
          onClick={() => onAddToCart(product.id)}
          style={{ background: '#4ecdc4', color: 'white', padding: '8px 16px' }}
        >
          🛒 장바구니에 담기
        </button>
      )}
    </div>
  );
});

// 쇼핑몰 메인 페이지
function ShoppingMall() {
  const [cart, setCart] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    { id: 1, name: '멋진 신발', price: 50000, image: '👟' },
    { id: 2, name: '따뜻한 자켓', price: 80000, image: '🧥' },
    { id: 3, name: '예쁜 가방', price: 30000, image: '👜' }
  ];
  
  // 장바구니에 상품 추가 (useCallback으로 최적화)
  const addToCart = useCallback((productId) => {
    setCart(prev => new Set([...prev, productId]));
  }, []);
  
  // 장바구니에서 상품 제거 (useCallback으로 최적화)
  const removeFromCart = useCallback((productId) => {
    setCart(prev => {
      const newCart = new Set(prev);
      newCart.delete(productId);
      return newCart;
    });
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>🛍️ 쇼핑몰</h1>
      
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="상품 검색..."
        style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
      />
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={cart.has(product.id)}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        ))}
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
        <h3>🛒 장바구니: {cart.size}개 상품</h3>
      </div>
    </div>
  );
}
```

---

## 6. 실제 예시로 배워보기

### 🎯 할 일 관리 앱 - 모든 훅 사용하기

이번에는 모든 고급 훅을 사용한 완전한 할 일 관리 앱을 만들어보아요!

```javascript
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

// 할 일 아이템 컴포넌트 (React.memo로 최적화)
const TodoItem = React.memo(function TodoItem({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef(null); // 수정할 때 포커스용
  
  // 수정 모드로 전환할 때 input에 포커스
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleEdit = useCallback(() => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  }, [todo.id, editText, onEdit]);
  
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }, [handleEdit, todo.text]);
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      marginBottom: '8px',
      backgroundColor: todo.completed ? '#f0f8f0' : 'white'
    }}>
      {/* 완료 체크박스 */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: '12px' }}
      />
      
      {/* 할 일 텍스트 또는 수정 입력창 */}
      {isEditing ? (
        <input
          ref={editInputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            padding: '4px 8px',
            border: '2px solid #007bff',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      ) : (
        <span
          style={{
            flex: 1,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#666' : '#333',
            cursor: 'pointer'
          }}
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      
      {/* 버튼들 */}
      <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{ padding: '4px 8px', background: '#ffc107', border: 'none', borderRadius: '4px' }}
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          style={{ padding: '4px 8px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
});

// 메인 할 일 관리 앱
function AdvancedTodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  
  const inputRef = useRef(null); // 새 할 일 입력창 참조
  const todoIdRef = useRef(1); // 할 일 ID 생성용
  
  // 새 할 일 추가 (useCallback으로 최적화)
  const addTodo = useCallback(() => {
    if (inputText.trim()) {
      const newTodo = {
        id: todoIdRef.current++,
        text: inputText,
        completed: false,
        createdAt: new Date()
      };
      setTodos(prev => [...prev, newTodo]);
      setInputText('');
      inputRef.current?.focus(); // 입력 후 다시 포커스
    }
  }, [inputText]);
  
  // 할 일 완료 상태 토글 (useCallback으로 최적화)
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);
  
  // 할 일 삭제 (useCallback으로 최적화)
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);
  
  // 할 일 수정 (useCallback으로 최적화)
  const editTodo = useCallback((id, newText) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }, []);
  
  // 필터링된 할 일 목록 (useMemo로 최적화)
  const filteredTodos = useMemo(() => {
    let filtered = todos;
    
    // 상태 필터링
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        // 'all'인 경우 모든 할 일 표시
        break;
    }
    
    // 검색어 필터링
    if (searchTerm.trim()) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [todos, filter, searchTerm]);
  
  // 통계 계산 (useMemo로 최적화)
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }, [todos]);
  
  // Enter 키로 할 일 추가
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }, [addTodo]);
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>📝 고급 할 일 관리</h1>
      
      {/* 통계 표시 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>전체: {stats.total}</div>
        <div>완료: {stats.completed}</div>
        <div>미완료: {stats.active}</div>
      </div>
      
      {/* 새 할 일 추가 */}
      <div style={{ display: 'flex', marginBottom: '20px', gap: '8px' }}>
        <input
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="새 할 일을 입력하세요..."
          style={{
            flex: 1,
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '12px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          추가
        </button>
      </div>
      
      {/* 검색 */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="할 일 검색..."
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px'
        }}
      />
      
      {/* 필터 버튼들 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { key: 'all', label: '전체' },
          { key: 'active', label: '미완료' },
          { key: 'completed', label: '완료' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '8px 16px',
              background: filter === key ? '#007bff' : '#f8f9fa',
              color: filter === key ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* 할 일 목록 */}
      <div>
        {filteredTodos.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            padding: '40px',
            border: '2px dashed #ddd',
            borderRadius: '8px'
          }}>
            {searchTerm ? '검색 결과가 없어요 🔍' : '할 일이 없어요! 🎉'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AdvancedTodoApp;
```

### 🎯 이 예시에서 배우는 것들

1. **useRef 활용**
   - `inputRef`: 새 할 일 추가 후 포커스 유지
   - `editInputRef`: 수정 모드에서 자동 포커스
   - `todoIdRef`: 고유 ID 생성 (리렌더와 무관한 값)

2. **useMemo 활용**
   - `filteredTodos`: 필터링 결과 캐싱
   - `stats`: 통계 계산 결과 캐싱

3. **useCallback 활용**
   - 모든 핸들러 함수들을 최적화
   - `TodoItem`에 전달되는 함수들의 참조 안정성 확보

4. **React.memo 활용**
   - `TodoItem` 컴포넌트 최적화
   - props가 변하지 않으면 리렌더 방지

---

## 7. 연습 문제

### 🏃‍♂️ 초급 연습문제

#### 연습 1: 포커스 관리하기
로그인 폼을 만들어서 페이지가 로드되면 자동으로 아이디 입력창에 포커스가 가도록 만들어보세요.

```javascript
function LoginForm() {
  // useRef를 사용해서 input 요소에 접근하기
  // useEffect를 사용해서 컴포넌트 마운트 시 포커스 주기
  
  return (
    <div>
      <input type="text" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <button>로그인</button>
    </div>
  );
}
```

#### 연습 2: 계산기 최적화하기
숫자 두 개를 입력받아서 사칙연산을 하는 계산기를 만들고, useMemo를 사용해서 계산 결과를 최적화해보세요.

```javascript
function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
  
  // useMemo를 사용해서 계산 결과 최적화하기
  
  return (
    <div>
      <input value={num1} onChange={(e) => setNum1(Number(e.target.value))} />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">×</option>
        <option value="/">/</option>
      </select>
      <input value={num2} onChange={(e) => setNum2(Number(e.target.value))} />
      <p>결과: {/* 계산 결과 표시 */}</p>
    </div>
  );
}
```

### 🏃‍♀️ 중급 연습문제

#### 연습 3: 검색 기능이 있는 연락처 앱
이름과 전화번호를 관리하는 연락처 앱을 만들어보세요. 검색 기능과 즐겨찾기 기능도 포함해야 합니다.

**요구사항**:
- useMemo로 검색 결과 최적화
- useCallback으로 핸들러 함수들 최적화
- React.memo로 연락처 카드 컴포넌트 최적화

#### 연습 4: 실시간 채팅 UI
메시지를 주고받는 채팅 UI를 만들어보세요. (실제 서버 연결은 없이 가짜 데이터 사용)

**요구사항**:
- 새 메시지가 오면 자동으로 맨 아래로 스크롤 (useRef + useEffect)
- 메시지 필터링 기능 (useMemo)
- 이모지 반응 기능 (useCallback)

### 🏋️‍♂️ 고급 연습문제

#### 연습 5: 드래그 앤 드롭 할 일 관리
할 일을 드래그해서 순서를 바꿀 수 있는 고급 할 일 관리 앱을 만들어보세요.

**요구사항**:
- 모든 고급 훅 사용하기
- 드래그 상태 관리
- 성능 최적화 적용

#### 연습 6: 가상 스크롤링 구현
1000개 이상의 아이템을 효율적으로 렌더링하는 가상 스크롤을 구현해보세요.

**요구사항**:
- 화면에 보이는 아이템만 렌더링
- 스크롤 위치에 따른 동적 계산
- 성능 최적화

---

## 🎉 핵심 정리

### 고급 훅 한 줄 요약

| 훅 | 한 줄 요약 | 언제 사용? |
|---|-----------|-----------|
| **useRef** | HTML 요소를 직접 조작하는 리모컨 | 포커스, 스크롤, 타이머 관리 |
| **useMemo** | 계산 결과를 기억하는 똑똑한 메모장 | 복잡한 계산, 필터링, 정렬 |
| **useCallback** | 함수를 기억하는 전화번호부 | 자식 컴포넌트에 전달하는 함수 |
| **React.memo** | 똑똑한 컴포넌트 래퍼 | props가 자주 안 바뀌는 컴포넌트 |

### 성능 최적화의 기본 원칙

1. **측정부터 하기**: 문제가 있는지 먼저 확인
2. **필요한 곳에만**: 모든 곳에 적용하지 말기
3. **조합해서 사용**: 여러 훅을 함께 사용해서 시너지 효과
4. **단순함 유지**: 복잡하게 만들지 않기

### 다음에 배울 것들

#### 쉬운 것부터
1. **커스텀 훅**: 내가 만든 훅 사용하기
2. **Context API**: 전역 상태 관리
3. **useReducer**: 복잡한 상태 로직 관리

#### 조금 더 어려운 것들
1. **Suspense**: 로딩 상태를 더 우아하게
2. **React Query**: 서버 데이터 관리
3. **Zustand/Jotai**: 가벼운 상태 관리

---

## 💪 마무리 응원

고급 훅들이 처음에는 어려워 보일 수 있지만, 실제로는 **우리가 일상에서 하는 일들과 비슷**해요!

- **useRef** = 리모컨으로 TV 조작하기
- **useMemo** = 계산기 메모리 기능 사용하기  
- **useCallback** = 전화번호부에 번호 저장해두기
- **React.memo** = 똑똑한 학생이 같은 문제 다시 안 풀기

하나씩 천천히 연습하면서 익혀나가세요. 처음에는 "언제 써야 하지?" 하는 고민이 들 수 있지만, 많이 사용해보다 보면 자연스럽게 "아, 여기서 이걸 써야겠구나!" 하는 감이 생겨요.

궁금한 것이 있으면 언제든 질문하세요! 🚀✨

---

## 🔗 추가 자료

### 유용한 개발자 도구
- **React DevTools**: 컴포넌트 성능 측정
- **브라우저 콘솔**: 렌더 횟수 확인
- **Performance 탭**: 실제 성능 분석

### 더 공부하고 싶다면
1. 공식 React 문서 읽어보기
2. 작은 프로젝트에 적용해보기
3. 다른 사람들의 코드 보면서 학습하기
4. 성능 최적화 관련 글들 찾아보기