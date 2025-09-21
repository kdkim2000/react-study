# 03. React 상태관리(State)와 이벤트 처리 완전정복

> **학습 목표**
> - React의 상태(State) 개념과 useState 훅의 동작 원리 이해
> - 이벤트 처리 방식과 TypeScript를 활용한 타입 안전한 이벤트 핸들링
> - Controlled Components를 통한 양방향 데이터 바인딩 구현
> - 폼 상태 관리와 검증 로직 구현

---

## 📚 목차
1. [React 상태(State)의 개념과 중요성](#1-react-상태state의-개념과-중요성)
2. [useState 훅 완전정복](#2-usestate-훅-완전정복)
3. [이벤트 처리의 기본 원리](#3-이벤트-처리의-기본-원리)
4. [Controlled Components와 양방향 바인딩](#4-controlled-components와-양방향-바인딩)
5. [복합 상태 관리와 폼 검증](#5-복합-상태-관리와-폼-검증)
6. [실습 프로젝트 상세 분석](#6-실습-프로젝트-상세-분석)
7. [베스트 프랙티스와 주의사항](#7-베스트-프랙티스와-주의사항)

---

## 1. React 상태(State)의 개념과 중요성

### 1.1 상태란 무엇인가?

**상태(State)**는 컴포넌트가 기억해야 하는 정보입니다. 웹 애플리케이션에서 사용자의 상호작용에 따라 변하는 모든 데이터가 상태에 해당합니다.

#### 일상 예시로 이해하는 상태
- **TV 리모컨**: 현재 채널 번호, 볼륨 레벨
- **계산기**: 현재 표시되는 숫자, 연산 기록
- **게임**: 점수, 레벨, 플레이어 위치

#### React에서 상태가 필요한 경우
```tsx
// ❌ 잘못된 방식 - 일반 변수 사용
let count = 0;  // React가 추적하지 않음

function BadCounter() {
  const increment = () => {
    count++;  // 값은 변경되지만 화면이 업데이트되지 않음
    console.log(count);  // 콘솔에는 증가하지만 UI는 변경 안됨
  };
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

```tsx
// ✅ 올바른 방식 - useState 사용
import { useState } from 'react';

function GoodCounter() {
  const [count, setCount] = useState(0);  // React가 추적하는 상태
  
  const increment = () => {
    setCount(count + 1);  // 상태 변경 시 자동으로 리렌더링
  };
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

### 1.2 React에서 상태가 중요한 이유

1. **반응성(Reactivity)**: 상태가 변경되면 자동으로 UI가 업데이트됩니다
2. **컴포넌트 재사용성**: 각 컴포넌트 인스턴스가 독립적인 상태를 가집니다
3. **예측 가능성**: 상태 변경은 명시적이고 추적 가능합니다
4. **성능 최적화**: React가 필요한 부분만 효율적으로 업데이트합니다

---

## 2. useState 훅 완전정복

### 2.1 useState의 기본 구조

```tsx
const [상태값, 상태변경함수] = useState(초기값);
```

#### 실제 프로젝트 예시 분석

```tsx
// src/components/CounterButton.tsx
import * as React from 'react';
import { useState } from 'react';

export default function CounterButton() {
  // 📍 Point 1: 타입 명시로 안전한 상태 관리
  const [count, setCount] = useState<number>(0);
  
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        // 📍 Point 2: 함수형 업데이트로 안전한 상태 변경
        onClick={() => setCount((c) => c + 1)}
      >
        count: {count}
      </Button>

      <Button
        variant="text"
        startIcon={<RestartAltIcon />}
        // 📍 Point 3: 직접 값 설정
        onClick={() => setCount(0)}
      >
        Reset
      </Button>
    </Stack>
  );
}
```

### 2.2 useState의 핵심 개념들

#### A) 구조분해할당 (Destructuring Assignment)
```tsx
// useState가 반환하는 배열을 구조분해할당으로 받음
const stateArray = useState(0);  // [0, function]
const count = stateArray[0];     // 상태값
const setCount = stateArray[1];  // 상태변경함수

// 위와 동일하지만 더 간편한 방식
const [count, setCount] = useState(0);
```

#### B) 상태 변경 함수의 두 가지 방식

**1. 직접 값 설정**
```tsx
setCount(0);        // 카운터 리셋
setCount(100);      // 특정 값으로 설정
```

**2. 함수형 업데이트 (권장)**
```tsx
// 현재 상태를 기반으로 새 상태 계산
setCount((currentCount) => currentCount + 1);
setCount((prev) => prev * 2);
```

#### C) 함수형 업데이트를 사용해야 하는 이유

```tsx
// ❌ 문제가 될 수 있는 코드
const [count, setCount] = useState(0);

const handleMultipleClicks = () => {
  setCount(count + 1);  // count는 현재 렌더링 시점의 값
  setCount(count + 1);  // 같은 값을 참조 - 1회만 증가
  setCount(count + 1);  // 결과: 1만 증가
};
```

```tsx
// ✅ 올바른 코드
const handleMultipleClicks = () => {
  setCount((prev) => prev + 1);  // 이전 상태 기반
  setCount((prev) => prev + 1);  // 계속 이전 상태 참조
  setCount((prev) => prev + 1);  // 결과: 3 증가
};
```

### 2.3 타입 안전한 useState 사용법

```tsx
// 기본 타입들
const [name, setName] = useState<string>('');
const [age, setAge] = useState<number>(0);
const [isVisible, setIsVisible] = useState<boolean>(false);

// 배열 타입
const [items, setItems] = useState<string[]>([]);
const [numbers, setNumbers] = useState<number[]>([1, 2, 3]);

// 객체 타입
interface User {
  id: number;
  name: string;
  email: string;
}
const [user, setUser] = useState<User | null>(null);

// 유니온 타입 (여러 타입 허용)
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
```

---

## 3. 이벤트 처리의 기본 원리

### 3.1 HTML DOM 이벤트 vs React 이벤트

#### HTML/JavaScript 방식
```html
<!-- HTML -->
<button onclick="handleClick()">클릭</button>

<script>
function handleClick() {
  console.log('클릭됨');
}
</script>
```

#### React 방식
```tsx
function MyButton() {
  const handleClick = () => {
    console.log('클릭됨');
  };
  
  return <button onClick={handleClick}>클릭</button>;
}
```

### 3.2 React 이벤트의 특징

1. **SyntheticEvent**: React가 브라우저 이벤트를 래핑하여 일관된 동작 보장
2. **카멜케이스**: `onclick` → `onClick`, `onchange` → `onChange`
3. **함수 참조**: 문자열이 아닌 함수를 직접 전달
4. **자동 바인딩**: 화살표 함수나 명시적 바인딩 필요

### 3.3 프로젝트에서 사용하는 주요 이벤트들

#### A) 클릭 이벤트 (onClick)

```tsx
// src/components/CounterButton.tsx에서 발췌
export default function CounterButton() {
  const [count, setCount] = useState<number>(0);

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      {/* 인라인 화살표 함수 - 간단한 로직 */}
      <Button onClick={() => setCount((c) => c + 1)}>
        count: {count}
      </Button>

      {/* 별도 함수 정의 - 복잡한 로직 */}
      <Button onClick={() => setCount(0)}>
        Reset
      </Button>
    </Stack>
  );
}
```

#### B) 입력 변경 이벤트 (onChange)

```tsx
// src/components/ControlledInput.tsx에서 발췌
export default function ControlledInput() {
  const [text, setText] = useState<string>('');

  // 📍 TypeScript 이벤트 타입 명시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);  // 입력된 값 추출
  };

  return (
    <TextField
      label="메모"
      placeholder="메모를 입력하세요"
      value={text}           // 📍 상태와 연결
      onChange={handleChange} // 📍 이벤트 핸들러 연결
      fullWidth
      variant="outlined"
    />
  );
}
```

### 3.4 TypeScript 이벤트 타입 가이드

```tsx
// 자주 사용하는 이벤트 타입들
interface EventTypes {
  // 클릭 이벤트
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  // 입력 변경 이벤트
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  
  // 폼 제출 이벤트
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  
  // 키보드 이벤트
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  
  // 포커스 이벤트
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
```

---

## 4. Controlled Components와 양방향 바인딩

### 4.1 Controlled vs Uncontrolled Components

#### Vue.js의 v-model과 비교
```vue
<!-- Vue.js 방식 -->
<template>
  <input v-model="message" />
  <p>{{ message }}</p>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello'
    }
  }
}
</script>
```

#### React의 Controlled Component 방식
```tsx
// React 방식 - 명시적 제어
function ControlledInput() {
  const [message, setMessage] = useState('Hello');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  
  return (
    <>
      <input value={message} onChange={handleChange} />
      <p>{message}</p>
    </>
  );
}
```

### 4.2 프로젝트 예시로 보는 Controlled Components

```tsx
// src/components/ControlledInput.tsx - 전체 코드 분석
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ControlledInput() {
  // 📍 1. 상태 정의 - 단일 진실 공급원(Single Source of Truth)
  const [text, setText] = useState<string>('');

  // 📍 2. 이벤트 핸들러 - 상태 업데이트 로직
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'grid', gap: 1.5, maxWidth: 420 }}
    >
      {/* 📍 3. Controlled Component 패턴 */}
      <TextField
        label="메모"
        placeholder="메모를 입력하세요"
        value={text}        // ⭐ 상태에서 값 가져오기
        onChange={handleChange}  // ⭐ 변경 시 상태 업데이트
        fullWidth
        variant="outlined"
      />
      
      {/* 📍 4. 상태 기반 파생 데이터 표시 */}
      <Typography variant="subtitle2" color="text.secondary">
        글자 수: {text.length}
      </Typography>
    </Box>
  );
}
```

### 4.3 Controlled Components의 장점

1. **예측 가능성**: 항상 React 상태가 UI의 값을 결정
2. **검증 용이성**: 입력 과정에서 실시간 검증 가능
3. **디버깅 편의성**: 상태를 통해 현재 값 추적 가능
4. **일관성**: 모든 폼 요소가 동일한 패턴으로 관리

### 4.4 다양한 폼 요소의 Controlled 패턴

```tsx
// 체크박스
const [isChecked, setIsChecked] = useState(false);
<input 
  type="checkbox" 
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

// 라디오 버튼
const [selectedOption, setSelectedOption] = useState('option1');
<input 
  type="radio" 
  value="option1"
  checked={selectedOption === 'option1'}
  onChange={(e) => setSelectedOption(e.target.value)}
/>

// 셀렉트 박스
const [selectedValue, setSelectedValue] = useState('');
<select 
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
>
  <option value="">선택하세요</option>
  <option value="option1">옵션 1</option>
</select>
```

---

## 5. 복합 상태 관리와 폼 검증

### 5.1 객체 상태 관리의 원리

#### 불변성(Immutability)의 중요성

```tsx
// ❌ 잘못된 방식 - 직접 변경
const [user, setUser] = useState({ name: '', age: 0 });

const updateName = (newName: string) => {
  user.name = newName;  // 직접 변경 - React가 감지하지 못함
  setUser(user);        // 같은 객체 참조 - 리렌더링 안됨
};
```

```tsx
// ✅ 올바른 방식 - 새 객체 생성
const [user, setUser] = useState({ name: '', age: 0 });

const updateName = (newName: string) => {
  setUser(prevUser => ({
    ...prevUser,    // 기존 속성 복사
    name: newName   // 특정 속성만 업데이트
  }));
};
```

### 5.2 프로젝트의 복합 폼 상태 관리 분석

```tsx
// src/components/ProfileForm.tsx - 핵심 부분 분석
type Role = 'admin' | 'user' | 'guest';

// 📍 1. 타입 정의로 안전한 상태 구조
type FormState = {
  name: string;
  age: number | '';     // 숫자와 빈 문자열 허용
  role: Role;
  agree: boolean;
};

// 📍 2. 초기 상태 정의
const initialForm: FormState = {
  name: '',
  age: '',
  role: 'user',
  agree: false,
};

export default function ProfileForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [open, setOpen] = useState(false);

  // 📍 3. 통합 입력 핸들러 - 모든 입력 타입 처리
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    
    setForm((prev) => ({
      ...prev,  // 기존 상태 유지
      [name]:   // 동적 키로 특정 필드 업데이트
        type === 'checkbox'
          ? checked  // 체크박스는 checked 값 사용
          : name === 'age'
          ? value === '' ? '' : Number(value)  // 나이는 숫자 변환
          : value,  // 나머지는 문자열 그대로
    }));
  }

  // 📍 4. 셀렉트 전용 핸들러 - Material-UI SelectChangeEvent 타입
  function handleSelectChange(e: SelectChangeEvent) {
    setForm((prev) => ({ ...prev, role: e.target.value as Role }));
  }

  // ... 나머지 코드
}
```

### 5.3 입력 핸들러의 세부 동작 분석

```tsx
// handleInputChange 함수의 동작 과정 상세 분석
function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  // 📍 Step 1: 이벤트에서 필요한 정보 추출
  const { name, value, type, checked } = e.target;
  
  // 📍 Step 2: 입력 타입에 따른 값 결정 로직
  let newValue;
  if (type === 'checkbox') {
    newValue = checked;  // true/false
  } else if (name === 'age') {
    newValue = value === '' ? '' : Number(value);  // 숫자 변환
  } else {
    newValue = value;  // 문자열 그대로
  }
  
  // 📍 Step 3: 함수형 업데이트로 새 상태 생성
  setForm((prev) => ({
    ...prev,     // 기존 모든 필드 복사
    [name]: newValue  // 특정 필드만 업데이트
  }));
}

// 실제 사용 예시
<TextField
  name="name"           // 📍 name 속성으로 필드 식별
  value={form.name}     // 📍 상태에서 값 가져오기
  onChange={handleInputChange}  // 📍 통합 핸들러 사용
/>
```

### 5.4 폼 검증과 제출 로직

```tsx
// src/components/ProfileForm.tsx의 검증 로직 분석
export default function ProfileForm() {
  const [form, setForm] = useState<FormState>(initialForm);

  // 📍 제출 가능 여부 계산 - 파생 상태
  const canSubmit =
    form.name.trim() !== '' &&           // 이름이 공백이 아님
    typeof form.age === 'number' &&     // 나이가 숫자임
    form.age > 0 &&                     // 나이가 0보다 큼
    form.agree;                         // 동의 체크됨

  // 📍 폼 제출 핸들러
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();  // 기본 폼 제출 동작 방지
    // 실제 환경에서는 API 호출
    setOpen(true);  // 성공 메시지 표시
  }

  // 📍 초기화 함수
  const reset = () => setForm(initialForm);

  return (
    <Paper variant="outlined" sx={{ p: 2, maxWidth: 520 }}>
      <Box component="form" onSubmit={handleSubmit}>
        {/* 폼 필드들 */}
        
        <Stack direction="row" spacing={1}>
          {/* 📍 검증 결과에 따른 버튼 활성화 */}
          <Button type="submit" variant="contained" disabled={!canSubmit}>
            제출
          </Button>
          <Button type="button" variant="outlined" onClick={reset}>
            초기화
          </Button>
        </Stack>

        {/* 📍 실시간 상태 디버깅 */}
        <Box component="pre" sx={{ bgcolor: 'grey.100', p: 2 }}>
          {JSON.stringify(form, null, 2)}
        </Box>
      </Box>
    </Paper>
  );
}
```

---

## 6. 실습 프로젝트 상세 분석

### 6.1 전체 프로젝트 구조

```tsx
// src/App.tsx - 메인 컴포넌트 구조 분석
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 📍 컴포넌트 import - 각각 다른 상태 관리 패턴 보여줌
import CounterButton from './components/CounterButton';      // 단순 숫자 상태
import ControlledInput from './components/ControlledInput';  // 문자열 상태
import ProfileForm from './components/ProfileForm';         // 복합 객체 상태

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4, display: 'grid', gap: 3 }}>
        {/* 📍 각 섹션별로 다른 상태 관리 패턴 학습 */}
        <Box component="section">
          <Typography variant="h5">useState 기본</Typography>
          <CounterButton />  {/* 기본적인 숫자 상태 */}
        </Box>

        <Box component="section">
          <Typography variant="h5">onChange로 제어되는 입력</Typography>
          <ControlledInput />  {/* Controlled Component 패턴 */}
        </Box>

        <Box component="section">
          <Typography variant="h5">양방향 바인딩: 폼</Typography>
          <ProfileForm />  {/* 복합 상태와 폼 검증 */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
```

### 6.2 각 컴포넌트의 학습 포인트

#### A) CounterButton - useState 기본
- **학습 목표**: 가장 단순한 상태 관리 패턴
- **핵심 개념**: 함수형 업데이트, 이벤트 핸들링

```tsx
// 핵심 학습 포인트
const [count, setCount] = useState<number>(0);

// ✅ 함수형 업데이트 (권장)
onClick={() => setCount((c) => c + 1)}

// ✅ 직접 값 설정
onClick={() => setCount(0)}
```

#### B) ControlledInput - 기본 Controlled Component
- **학습 목표**: 입력과 상태의 동기화
- **핵심 개념**: value/onChange 패턴, 실시간 반응

```tsx
// 핵심 학습 포인트
const [text, setText] = useState<string>('');

// Controlled 패턴의 핵심
<TextField
  value={text}                    // 상태 → UI
  onChange={(e) => setText(e.target.value)}  // UI → 상태
/>

// 파생 상태 계산
<Typography>글자 수: {text.length}</Typography>
```

#### C) ProfileForm - 복합 상태 관리
- **학습 목표**: 실무에서 사용하는 폼 패턴
- **핵심 개념**: 객체 상태, 불변성, 검증, 다양한 입력 타입

```tsx
// 핵심 학습 포인트들
// 1. 타입 안전한 상태 정의
type FormState = {
  name: string;
  age: number | '';
  role: Role;
  agree: boolean;
};

// 2. 통합 입력 핸들러
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

// 3. 검증 로직
const canSubmit = form.name.trim() !== '' && 
                 typeof form.age === 'number' && 
                 form.agree;

// 4. 폼 제출 처리
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // 서버 전송 로직
};
```

### 6.3 Material-UI와의 통합

프로젝트에서 Material-UI를 사용하는 이유와 패턴:

```tsx
// Material-UI 컴포넌트들의 React 상태 통합
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// 일반 HTML input과 동일한 패턴
<TextField
  value={form.name}
  onChange={handleInputChange}
  name="name"
/>

// Material-UI Select의 특별한 타입
const handleSelectChange = (e: SelectChangeEvent) => {
  setForm(prev => ({ ...prev, role: e.target.value as Role }));
};
```

---

## 7. 베스트 프랙티스와 주의사항

### 7.1 상태 관리 베스트 프랙티스

#### A) 상태 구조 설계
```tsx
// ✅ 평면적이고 명확한 구조 선호
type FormState = {
  name: string;
  email: string;
  age: number;
};

// ❌ 과도하게 중첩된 구조 지양
type BadFormState = {
  user: {
    profile: {
      personal: {
        name: string;
        age: number;
      };
    };
  };
};
```

#### B) 파생 상태는 계산으로 처리
```tsx
// ✅ 파생 상태는 렌더링 시 계산
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const fullName = `${firstName} ${lastName}`;  // 계산된 값

// ❌ 파생 상태를 별도 상태로 관리하지 말 것
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');  // 불필요한 상태
```

#### C) 초기값 설정의 중요성
```tsx
// ✅ 명확한 타입과 적절한 초기값
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

// ❌ 불명확한 초기값
const [user, setUser] = useState({});  // 타입 불명확
const [count, setCount] = useState();  // undefined 초기값
```

### 7.2 이벤트 처리 베스트 프랙티스

#### A) 이벤트 핸들러 명명 규칙
```tsx
// ✅ 일관된 명명 규칙
const handleClick = () => { /* ... */ };
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
const handleFormSubmit = (e: React.FormEvent) => { /* ... */ };

// ✅ 구체적인 동작 명시
const handleUserDelete = () => { /* ... */ };
const handlePasswordReset = () => { /* ... */ };
```

#### B) 이벤트 객체 활용
```tsx
// ✅ 구조분해할당으로 필요한 정보만 추출
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;
  // 필요한 로직만 처리
};

// ❌ 이벤트 객체 전체를 남용
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e);  // 전체 이벤트 객체 로깅
  setValue(e.target.value);
};
```

### 7.3 자주 하는 실수와 해결책

#### A) 상태 직접 변경
```tsx
// ❌ 상태 직접 변경
const [items, setItems] = useState([1, 2, 3]);
const addItem = (item: number) => {
  items.push(item);  // 직접 변경 금지!
  setItems(items);
};

// ✅ 새 배열 생성
const addItem = (item: number) => {
  setItems(prev => [...prev, item]);
};
```

#### B) 비동기 상태 업데이트 오해
```tsx
// ❌ 상태 변경 직후 바로 사용
const handleClick = () => {
  setCount(count + 1);
  console.log(count);  // 이전 값 출력됨
};

// ✅ useEffect로 상태 변경 감지
const handleClick = () => {
  setCount(prev => prev + 1);
};

useEffect(() => {
  console.log(count);  // 변경된 값 출력
}, [count]);
```

#### C) 과도한 상태 세분화
```tsx
// ❌ 관련된 상태를 개별로 관리
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');

// ✅ 관련 상태를 객체로 묶어서 관리
const [userForm, setUserForm] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
});
```

### 7.4 성능 최적화 고려사항

#### A) 불필요한 리렌더링 방지
```tsx
// ✅ 인라인 객체/배열 생성 최소화
const [user, setUser] = useState(initialUser);

// ❌ 매 렌더링마다 새 객체 생성
const handleSubmit = () => {
  onSubmit({ name: user.name, age: user.age });  // 새 객체
};

// ✅ 필요시에만 새 객체 생성
const handleSubmit = useCallback(() => {
  onSubmit({ name: user.name, age: user.age });
}, [user.name, user.age]);
```

#### B) 상태 업데이트 최적화
```tsx
// ✅ 변경이 실제로 필요한지 확인
const updateUser = (newName: string) => {
  setUser(prev => {
    if (prev.name === newName) return prev;  // 동일하면 업데이트 스킵
    return { ...prev, name: newName };
  });
};
```

---

## 🎯 핵심 요약

### 1. 상태(State)의 본질
- React에서 **변경 가능한 모든 데이터**는 상태로 관리해야 합니다
- 상태 변경 시 자동으로 UI가 업데이트되는 **반응성**이 React의 핵심입니다

### 2. useState 활용법
- `const [state, setState] = useState(initialValue)` 패턴
- **함수형 업데이트** `setState(prev => newValue)` 권장
- **TypeScript**로 타입 안전성 확보

### 3. 이벤트 처리
- **SyntheticEvent**를 통한 브라우저 호환성
- **구조분해할당**으로 필요한 정보 추출
- **타입 명시**로 개발 경험 향상

### 4. Controlled Components
- **단일 진실 공급원** 원칙으로 상태와 UI 동기화
- `value`와 `onChange` 쌍으로 양방향 바인딩 구현
- **실시간 검증**과 **파생 상태** 활용

### 5. 복합 상태 관리
- **불변성 유지**로 안전한 상태 업데이트
- **객체 스프레드 연산자**로 부분 업데이트
- **타입 정의**로 구조화된 상태 관리

---

## 🚀 다음 단계 학습 가이드

1. **useEffect 훅**: 컴포넌트 생명주기와 사이드 이펙트 관리
2. **커스텀 훅**: 상태 로직의 재사용성 향상
3. **Context API**: 전역 상태 관리의 기초
4. **폼 라이브러리**: React Hook Form, Formik 등 실무 도구
5. **상태 관리 라이브러리**: Zustand, Redux Toolkit 등

---

## 📝 실습 과제

### 기본 과제
1. **할 일 목록 앱** 만들기
   - 할 일 추가/삭제/완료 처리
   - 필터링 기능 (전체/완료/미완료)

2. **계산기 앱** 만들기
   - 사칙연산 구현
   - 연산 기록 상태 관리

### 심화 과제
1. **회원가입 폼** 만들기
   - 실시간 입력 검증
   - 비밀번호 확인 일치 검사
   - 이메일 중복 확인 (가상)

2. **쇼핑 카트** 만들기
   - 상품 추가/삭제
   - 수량 변경
   - 총 금액 계산

이러한 과제들을 통해 오늘 학습한 상태 관리와 이벤트 처리 패턴을 실습하며 React 개발 역량을 향상시킬 수 있습니다.