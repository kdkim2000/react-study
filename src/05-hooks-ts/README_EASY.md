# 🎯 React Hook 완전정복 - 초보자를 위한 쉬운 가이드

> **이 가이드의 목표**
> - React Hook이 뭔지 알아보기
> - useState로 화면의 내용을 바꾸는 방법 배우기
> - useEffect로 데이터를 불러오는 방법 알아보기
> - useMemo로 앱을 빠르게 만드는 방법 익히기

---

## 📖 목차
1. [React Hook이 뭐야?](#1-react-hook이-뭐야)
2. [useState - 화면을 바꾸는 마법](#2-usestate---화면을-바꾸는-마법)
3. [useEffect - 데이터를 가져오는 도구](#3-useeffect---데이터를-가져오는-도구)
4. [useMemo - 속도를 빠르게 하는 비법](#4-usememo---속도를-빠르게-하는-비법)
5. [실제 예시로 배워보기](#5-실제-예시로-배워보기)

---

## 1. React Hook이 뭐야?

### 🎭 비유로 이해하기

React Hook은 **마법의 도구상자**라고 생각해보세요!

- **useState** = 화면의 내용을 바꾸는 마법봉 ✨
- **useEffect** = 외부에서 정보를 가져오는 망원경 🔭
- **useMemo** = 계산을 빨리 해주는 계산기 🧮

### 🏠 Hook이 없었을 때의 문제

예전에는 React로 웹페이지를 만들 때 **클래스**라는 복잡한 방법을 써야 했어요.

```javascript
// 예전 방식 (너무 복잡해! 😵)
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return <div>{this.state.count}</div>;
  }
}
```

### ✨ Hook이 생긴 후

이제는 **함수**로 간단하게 만들 수 있어요!

```javascript
// 새로운 방식 (훨씬 쉬워! 😊)
function MyComponent() {
  const [count, setCount] = useState(0);
  
  return <div>{count}</div>;
}
```

### 🎯 Hook의 두 가지 중요한 규칙

**규칙 1: 맨 위에서만 사용하기**
```javascript
// ✅ 맞는 사용법
function MyComponent() {
  const [name, setName] = useState('홍길동');  // 맨 위에 적기
  const [age, setAge] = useState(20);          // 맨 위에 적기
  
  return <div>{name}은 {age}살입니다</div>;
}

// ❌ 틀린 사용법
function MyComponent() {
  if (someCondition) {
    const [name, setName] = useState('홍길동');  // 조건문 안에서 사용하면 안돼!
  }
}
```

**규칙 2: React 함수 안에서만 사용하기**
```javascript
// ✅ React 컴포넌트 안에서 사용
function MyComponent() {
  const [count, setCount] = useState(0);  // OK!
}

// ❌ 일반 함수에서 사용하면 안돼
function normalFunction() {
  const [count, setCount] = useState(0);  // 안돼!
}
```

---

## 2. useState - 화면을 바꾸는 마법

### 🎮 게임기의 점수판 같은 개념

게임을 할 때 점수가 바뀌면 화면의 점수도 바뀌죠? useState가 바로 그런 역할을 해요!

```javascript
const [점수, 점수바꾸기] = useState(0);
//     ↑        ↑           ↑
//   현재점수  점수바꾸는함수  처음점수
```

### 🔢 카운터 만들어보기

```javascript
function Counter() {
  // 카운트를 0으로 시작
  const [count, setCount] = useState(0);
  
  // 버튼을 누르면 카운트 증가
  const handleClick = () => {
    setCount(count + 1);  // 현재 count에 1을 더해서 업데이트
  };
  
  return (
    <div>
      <p>현재 숫자: {count}</p>
      <button onClick={handleClick}>숫자 올리기!</button>
    </div>
  );
}
```

### 📝 입력창 만들어보기

```javascript
function NameInput() {
  // 이름을 빈 문자열로 시작
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}  // 입력할 때마다 name 업데이트
        placeholder="이름을 입력하세요"
      />
      <p>안녕하세요, {name}님!</p>
    </div>
  );
}
```

### 🚦 여러 상태 관리하기

```javascript
function UserProfile() {
  const [name, setName] = useState('');      // 이름
  const [age, setAge] = useState(0);         // 나이
  const [email, setEmail] = useState('');    // 이메일
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input 
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="나이"
        type="number"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        type="email"
      />
      
      <h2>프로필 정보</h2>
      <p>이름: {name}</p>
      <p>나이: {age}살</p>
      <p>이메일: {email}</p>
    </div>
  );
}
```

### 💡 useState 핵심 포인트

1. **배열 분해**: `const [값, 값바꾸는함수] = useState(초기값)`
2. **상태 변경**: 값바꾸는함수를 호출하면 화면이 다시 그려져요
3. **여러 상태**: 여러 개의 useState를 사용할 수 있어요

---

## 3. useEffect - 데이터를 가져오는 도구

### 📡 인터넷에서 정보 가져오기

useEffect는 **컴포넌트가 화면에 나타났을 때** 특별한 작업을 하는 도구예요.

```javascript
useEffect(() => {
  // 여기서 특별한 작업을 해요
  console.log('컴포넌트가 화면에 나타났어요!');
}, []); // 빈 배열 = 처음 한 번만 실행
```

### 🎬 실행 타이밍 이해하기

```
1. 컴포넌트가 화면에 나타남
2. 화면이 그려짐
3. useEffect 안의 코드가 실행됨
```

### 🌐 API에서 사용자 정보 가져오기

```javascript
function UserList() {
  const [users, setUsers] = useState([]);        // 사용자 목록
  const [loading, setLoading] = useState(true);  // 로딩 중인지 확인
  const [error, setError] = useState(null);      // 에러가 있는지 확인
  
  // 컴포넌트가 나타나면 사용자 정보를 가져와요
  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);  // 로딩 시작
        
        // 인터넷에서 사용자 정보 가져오기
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const userData = await response.json();
        
        setUsers(userData);  // 가져온 정보를 상태에 저장
        setLoading(false);   // 로딩 완료
      } catch (err) {
        setError('사용자 정보를 가져올 수 없어요 😢');
        setLoading(false);
      }
    }
    
    getUsers();
  }, []); // 빈 배열 = 처음 한 번만 실행
  
  // 로딩 중일 때
  if (loading) {
    return <div>사용자 정보를 가져오는 중...</div>;
  }
  
  // 에러가 있을 때
  if (error) {
    return <div>{error}</div>;
  }
  
  // 성공했을 때
  return (
    <div>
      <h2>사용자 목록</h2>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>이메일: {user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### 🧹 정리하기 (Cleanup)

가끔은 컴포넌트가 사라질 때 정리 작업을 해야 해요. 예를 들어, 타이머를 멈추거나 이벤트 리스너를 제거하는 것처럼요.

```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // 1초마다 seconds를 1씩 증가
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // 컴포넌트가 사라질 때 타이머 정리
    return () => {
      clearInterval(timer);
      console.log('타이머를 정리했어요!');
    };
  }, []);
  
  return <div>{seconds}초가 지났어요</div>;
}
```

### 🔄 의존성 배열 이해하기

```javascript
function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // searchTerm이 바뀔 때마다 검색 실행
    console.log(`"${searchTerm}"을 검색해요!`);
    // 검색 로직...
  }, [searchTerm]); // searchTerm이 바뀌면 다시 실행
  
  return <div>검색 결과들...</div>;
}
```

**의존성 배열 종류**:
- `[]` (빈 배열): 처음 한 번만 실행
- `[searchTerm]`: searchTerm이 바뀔 때마다 실행
- 의존성 배열 없음: 매번 실행 (거의 사용하지 않아요)

---

## 4. useMemo - 속도를 빠르게 하는 비법

### ⚡ 왜 필요한가요?

컴퓨터가 같은 계산을 반복하면 느려져요. useMemo는 **한 번 계산한 결과를 기억해서** 다음에는 바로 결과를 알려줘요!

### 🧮 복잡한 계산 예시

```javascript
function ExpensiveCalculation({ numbers }) {
  // 숫자들의 합을 계산하는 복잡한 함수
  const calculateSum = (nums) => {
    console.log('계산 중...'); // 계산할 때마다 이 메시지가 나와요
    return nums.reduce((sum, num) => sum + num, 0);
  };
  
  // useMemo 없이 사용하면 매번 계산해요
  const sum = calculateSum(numbers);
  
  return <div>합계: {sum}</div>;
}
```

### 🚀 useMemo로 최적화하기

```javascript
function OptimizedCalculation({ numbers }) {
  // useMemo를 사용해서 numbers가 바뀔 때만 계산해요
  const sum = useMemo(() => {
    console.log('계산 중...'); // numbers가 바뀔 때만 이 메시지가 나와요
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]); // numbers가 바뀔 때만 다시 계산
  
  return <div>합계: {sum}</div>;
}
```

### 🔍 검색 기능에 useMemo 적용하기

```javascript
function UserSearch() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 검색 결과를 useMemo로 최적화
  const filteredUsers = useMemo(() => {
    console.log('검색 중...'); // searchTerm이나 users가 바뀔 때만 실행
    
    if (!searchTerm) return users;
    
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]); // users나 searchTerm이 바뀔 때만 다시 계산
  
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="사용자 검색..."
      />
      
      <div>
        {filteredUsers.map(user => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}
```

### ⚠️ useMemo 사용할 때 주의점

**사용해야 하는 경우**:
- 복잡한 계산이 있을 때
- 큰 배열을 필터링할 때
- 데이터를 가공하는 작업이 있을 때

**사용하지 말아야 하는 경우**:
- 간단한 계산 (예: `a + b`)
- 이미 빠른 작업들

```javascript
// ❌ 너무 간단한 계산에는 불필요
const simpleSum = useMemo(() => a + b, [a, b]); // 의미없어요

// ✅ 복잡한 계산에 사용
const complexResult = useMemo(() => {
  return largeArray.map(item => expensiveTransform(item));
}, [largeArray]);
```

---

## 5. 실제 예시로 배워보기

### 🎯 할 일 관리 앱 만들기

모든 Hook을 사용한 완전한 예시를 만들어보아요!

```javascript
function TodoApp() {
  // 1. useState로 상태 관리
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
  
  // 2. useEffect로 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  
  // 3. useEffect로 todos가 바뀔 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // 4. useMemo로 필터링된 할 일 목록 계산
  const filteredTodos = useMemo(() => {
    console.log('할 일 목록 필터링 중...');
    
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  // 할 일 추가 함수
  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };
  
  // 할 일 완료 상태 토글
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // 할 일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>📝 할 일 관리</h1>
      
      {/* 할 일 추가 */}
      <div style={{ marginBottom: '20px' }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="할 일을 입력하세요..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          style={{ padding: '10px', width: '70%' }}
        />
        <button onClick={addTodo} style={{ padding: '10px', marginLeft: '10px' }}>
          추가
        </button>
      </div>
      
      {/* 필터 버튼들 */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{ 
            padding: '5px 10px', 
            marginRight: '10px',
            backgroundColor: filter === 'all' ? '#007bff' : '#f8f9fa',
            color: filter === 'all' ? 'white' : 'black'
          }}
        >
          전체 ({todos.length})
        </button>
        <button 
          onClick={() => setFilter('active')}
          style={{ 
            padding: '5px 10px', 
            marginRight: '10px',
            backgroundColor: filter === 'active' ? '#007bff' : '#f8f9fa',
            color: filter === 'active' ? 'white' : 'black'
          }}
        >
          할 일 ({todos.filter(t => !t.completed).length})
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{ 
            padding: '5px 10px',
            backgroundColor: filter === 'completed' ? '#007bff' : '#f8f9fa',
            color: filter === 'completed' ? 'white' : 'black'
          }}
        >
          완료 ({todos.filter(t => t.completed).length})
        </button>
      </div>
      
      {/* 할 일 목록 */}
      <div>
        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            할 일이 없어요! 🎉
          </p>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginBottom: '5px',
                backgroundColor: todo.completed ? '#f0f0f0' : 'white'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : 'black'
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

### 🔧 이 예시에서 배울 점

1. **useState**: 여러 상태를 각각의 목적에 맞게 관리
2. **useEffect**: 컴포넌트 시작 시 데이터 불러오기, 상태 변경 시 저장하기
3. **useMemo**: 필터링 결과를 계산해서 성능 향상
4. **실제 기능**: 추가, 삭제, 완료 표시, 필터링 등 실용적인 기능들

---

## 🎯 핵심 정리

### 1. useState - 상태 관리
```javascript
const [값, 값바꾸기함수] = useState(초기값);
// 값이 바뀌면 화면이 다시 그려져요!
```

### 2. useEffect - 특별한 작업
```javascript
useEffect(() => {
  // 컴포넌트가 나타나거나 특정 값이 바뀔 때 실행
  
  return () => {
    // 정리 작업 (컴포넌트가 사라질 때)
  };
}, [의존성들]); // 이 배열 안의 값들이 바뀔 때마다 실행
```

### 3. useMemo - 성능 최적화
```javascript
const 계산결과 = useMemo(() => {
  return 복잡한계산();
}, [의존성들]); // 의존성이 바뀔 때만 다시 계산
```

### 4. Hook 사용 규칙
- 컴포넌트의 **맨 위**에서만 사용하기
- **조건문이나 반복문 안**에서 사용하지 않기
- **React 함수** 안에서만 사용하기

---

## 🚀 다음에 배울 것들

### 쉬운 것부터
1. **useCallback**: 함수를 기억해두는 방법
2. **useRef**: HTML 요소에 직접 접근하는 방법
3. **커스텀 Hook**: 내가 만든 Hook 사용하기

### 조금 더 어려운 것들
1. **Context API**: 전역 상태 관리
2. **useReducer**: 복잡한 상태 관리
3. **React Query**: 서버 데이터 관리

---

## 💪 연습 문제

### 초급
1. **카운터 앱**: +1, -1, 리셋 버튼이 있는 카운터 만들기
2. **이름 인사**: 이름을 입력하면 "안녕하세요, [이름]님!" 이라고 나오는 앱
3. **색깔 바꾸기**: 버튼을 누르면 배경색이 바뀌는 앱

### 중급
1. **계산기**: 간단한 더하기, 빼기 계산기
2. **쇼핑 리스트**: 항목 추가/삭제가 가능한 쇼핑 리스트
3. **날씨 앱**: 날씨 API에서 현재 날씨 정보 가져오기

### 고급
1. **블로그**: 글 목록, 글 읽기, 글 작성 기능
2. **채팅앱**: 실시간으로 메시지 주고받기
3. **게임**: 간단한 퀴즈 게임이나 카드 게임

---

## 🎉 마무리

React Hook은 처음에는 어려워 보이지만, 실제로는 **우리가 일상에서 하는 일들과 비슷**해요!

- **useState** = 메모장에 뭔가 적고 지우기
- **useEffect** = 친구한테 전화해서 소식 듣기
- **useMemo** = 한 번 계산한 것은 계산기에 저장해두기

많이 연습하면서 천천히 익혀나가세요. 궁금한 것이 있으면 언제든 질문하세요! 🚀✨