# 🎯 React Context API 완벽 가이드 - 초보자를 위한 쉬운 설명

> **이 가이드의 목표**
> - Context API가 뭔지 알아보기
> - 전역 상태 관리가 왜 필요한지 이해하기
> - 다크모드 같은 테마 시스템 만들어보기
> - 실제로 써볼 수 있는 예시 익히기

---

## 📖 목차
1. [전역 상태가 뭐고 왜 필요한가요?](#1-전역-상태가-뭐고-왜-필요한가요)
2. [Context API - 정보를 전체에 공유하는 방법](#2-context-api---정보를-전체에-공유하는-방법)
3. [다크모드 만들어보기](#3-다크모드-만들어보기)
4. [실제 예시로 배워보기](#4-실제-예시로-배워보기)
5. [연습 문제](#5-연습-문제)

---

## 1. 전역 상태가 뭐고 왜 필요한가요?

### 🎭 학교 방송실 비유로 이해하기

Context API는 **학교 방송실**과 같아요!

- **방송실**: Context Provider (정보를 공유하는 곳)
- **스피커**: Context Consumer (정보를 받아서 사용하는 곳)
- **방송 내용**: 전역 상태 (모든 곳에서 필요한 정보)

### 🚫 Props 지옥 (Props Drilling) 문제

Context 없이 정보를 전달하려면 이렇게 해야 해요:

```javascript
// 할아버지 컴포넌트
function Grandfather() {
  const [money, setMoney] = useState(10000);
  
  // 할아버지가 돈을 아버지에게 전달
  return <Father money={money} setMoney={setMoney} />;
}

// 아버지 컴포넌트
function Father({ money, setMoney }) {
  // 아버지는 돈을 사용하지 않지만 아들에게 전달해야 함
  return <Son money={money} setMoney={setMoney} />;
}

// 아들 컴포넌트
function Son({ money, setMoney }) {
  // 드디어 돈을 사용!
  return (
    <div>
      <p>용돈: {money}원</p>
      <button onClick={() => setMoney(money - 1000)}>
        과자 사기 (1000원)
      </button>
    </div>
  );
}
```

**문제점**: 아버지는 돈을 사용하지 않는데도 계속 전달만 해야 해요. 이게 **Props 지옥**이에요!

### ✨ Context로 해결하기

Context를 사용하면 이렇게 됩니다:

```javascript
// 1. 돈 Context 만들기
const MoneyContext = createContext();

// 2. 할아버지가 방송실 역할 (Provider)
function Grandfather() {
  const [money, setMoney] = useState(10000);
  
  return (
    <MoneyContext.Provider value={{ money, setMoney }}>
      <Father />  {/* 더 이상 props 전달 안 해도 됨! */}
    </MoneyContext.Provider>
  );
}

// 3. 아버지는 돈에 관심 없음
function Father() {
  return <Son />; // 그냥 아들만 렌더링
}

// 4. 아들이 직접 방송을 듣기 (Consumer)
function Son() {
  const { money, setMoney } = useContext(MoneyContext);
  
  return (
    <div>
      <p>용돈: {money}원</p>
      <button onClick={() => setMoney(money - 1000)}>
        과자 사기 (1000원)
      </button>
    </div>
  );
}
```

**장점**: 아들이 할아버지의 돈을 직접 받을 수 있어요! 중간에 있는 아버지는 신경 쓸 필요 없어요.

### 🎯 전역 상태가 필요한 경우들

| 상황 | 설명 | 예시 |
|------|------|------|
| **테마 설정** | 앱 전체의 색깔이나 모양 | 다크모드, 라이트모드 |
| **로그인 정보** | 현재 접속한 사용자 정보 | 사용자 이름, 프로필 사진 |
| **언어 설정** | 앱에서 사용할 언어 | 한국어, 영어, 일본어 |
| **장바구니** | 쇼핑몰에서 담은 상품들 | 상품 목록, 총 가격 |

---

## 2. Context API - 정보를 전체에 공유하는 방법

### 📡 Context의 3단계 구성

Context API는 3단계로 구성되어 있어요:

#### 1단계: Context 만들기 (방송국 설립)
```javascript
import { createContext } from 'react';

// 빈 방송국을 만들어요
const MyContext = createContext();
```

#### 2단계: Provider로 정보 전달 (방송 송출)
```javascript
function App() {
  const [message, setMessage] = useState('안녕하세요!');
  
  return (
    <MyContext.Provider value={{ message, setMessage }}>
      <AllComponents />  {/* 모든 하위 컴포넌트가 message를 받을 수 있어요 */}
    </MyContext.Provider>
  );
}
```

#### 3단계: useContext로 정보 받기 (방송 수신)
```javascript
function SomeComponent() {
  const { message, setMessage } = useContext(MyContext);
  
  return (
    <div>
      <p>받은 메시지: {message}</p>
      <button onClick={() => setMessage('새로운 메시지!')}>
        메시지 바꾸기
      </button>
    </div>
  );
}
```

### 🎮 게임으로 이해하기: 마법사의 주문

Context를 마법사의 주문으로 생각해보세요:

```javascript
// 1. 마법 주문서 만들기 (Context 생성)
const MagicContext = createContext();

// 2. 대마법사가 주문 시전 (Provider)
function GreatWizard() {
  const [magic, setMagic] = useState('파이어볼');
  
  return (
    <MagicContext.Provider value={{ magic, setMagic }}>
      <Castle />  {/* 성 전체에 마법이 퍼져요 */}
    </MagicContext.Provider>
  );
}

// 3. 성 안의 모든 사람이 마법 사용 가능 (Consumer)
function Knight() {
  const { magic } = useContext(MagicContext);
  
  return <div>기사가 {magic} 마법을 사용합니다!</div>;
}

function Archer() {
  const { magic } = useContext(MagicContext);
  
  return <div>궁수가 {magic} 마법을 사용합니다!</div>;
}
```

---

## 3. 다크모드 만들어보기

실제로 다크모드 기능을 단계별로 만들어보아요!

### 🌙 1단계: 테마 Context 만들기

```javascript
import { createContext, useContext, useState } from 'react';

// 테마 정보를 담을 Context
const ThemeContext = createContext();

// 테마 Provider 컴포넌트
function ThemeProvider({ children }) {
  // 현재 테마 (light, dark, system 중 하나)
  const [theme, setTheme] = useState('light');
  
  // 실제로 적용될 테마 계산
  const getEffectiveTheme = () => {
    if (theme === 'system') {
      // 시스템 설정 확인
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };
  
  const effectiveTheme = getEffectiveTheme();
  
  // 테마 토글 함수
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };
  
  return (
    <ThemeContext.Provider value={{
      theme,           // 사용자가 선택한 테마
      effectiveTheme,  // 실제 적용되는 테마
      setTheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 테마 사용을 위한 커스텀 훅
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 안에서만 사용할 수 있어요!');
  }
  return context;
}
```

### 🎨 2단계: 테마 컨트롤 버튼 만들기

```javascript
function ThemeControl() {
  const { theme, effectiveTheme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div style={{
      padding: '20px',
      background: effectiveTheme === 'dark' ? '#333' : '#fff',
      color: effectiveTheme === 'dark' ? '#fff' : '#333',
      borderRadius: '10px',
      marginBottom: '20px'
    }}>
      <h3>🎨 테마 컨트롤러</h3>
      
      {/* 현재 상태 표시 */}
      <div style={{ marginBottom: '15px' }}>
        <p>선택한 테마: <strong>{theme}</strong></p>
        <p>실제 테마: <strong>{effectiveTheme}</strong></p>
      </div>
      
      {/* 테마 선택 버튼들 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button
          onClick={() => setTheme('light')}
          style={{
            padding: '10px 15px',
            backgroundColor: theme === 'light' ? '#007bff' : '#f0f0f0',
            color: theme === 'light' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ☀️ 라이트
        </button>
        
        <button
          onClick={() => setTheme('dark')}
          style={{
            padding: '10px 15px',
            backgroundColor: theme === 'dark' ? '#007bff' : '#f0f0f0',
            color: theme === 'dark' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🌙 다크
        </button>
        
        <button
          onClick={() => setTheme('system')}
          style={{
            padding: '10px 15px',
            backgroundColor: theme === 'system' ? '#007bff' : '#f0f0f0',
            color: theme === 'system' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          💻 시스템
        </button>
      </div>
      
      {/* 토글 버튼 */}
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🔄 테마 바꾸기
      </button>
    </div>
  );
}
```

### 🏠 3단계: 테마가 적용된 카드 만들기

```javascript
function ThemedCard({ title, children }) {
  const { effectiveTheme } = useTheme();
  
  const cardStyle = {
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '15px',
    border: `2px solid ${effectiveTheme === 'dark' ? '#555' : '#ddd'}`,
    backgroundColor: effectiveTheme === 'dark' ? '#444' : '#fff',
    color: effectiveTheme === 'dark' ? '#fff' : '#333',
    transition: 'all 0.3s ease' // 부드러운 전환 효과
  };
  
  return (
    <div style={cardStyle}>
      <h4 style={{ marginTop: 0 }}>{title}</h4>
      {children}
    </div>
  );
}
```

### 🎯 4단계: 모든 것을 조합하기

```javascript
function App() {
  return (
    <ThemeProvider>  {/* 1. 앱 전체를 Provider로 감싸기 */}
      <div style={{
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>🌈 다크모드 테스트 앱</h1>
        
        {/* 2. 테마 컨트롤러 */}
        <ThemeControl />
        
        {/* 3. 테마가 적용된 카드들 */}
        <ThemedCard title="📝 할 일 목록">
          <ul>
            <li>React 공부하기</li>
            <li>Context API 이해하기</li>
            <li>다크모드 만들기</li>
            <li>포트폴리오 만들기</li>
          </ul>
        </ThemedCard>
        
        <ThemedCard title="📊 통계">
          <p>오늘 공부한 시간: 3시간</p>
          <p>완료한 과제: 2개</p>
          <p>남은 과제: 1개</p>
        </ThemedCard>
        
        <ThemedCard title="🎮 미니 게임">
          <MiniGame />
        </ThemedCard>
      </div>
    </ThemeProvider>
  );
}

// 보너스: 테마를 사용하는 미니게임
function MiniGame() {
  const { effectiveTheme } = useTheme();
  const [score, setScore] = useState(0);
  
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: effectiveTheme === 'dark' ? '#6c757d' : '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px'
  };
  
  return (
    <div>
      <p>현재 점수: {score}</p>
      <button
        style={buttonStyle}
        onClick={() => setScore(score + 1)}
      >
        +1점
      </button>
      <button
        style={buttonStyle}
        onClick={() => setScore(0)}
      >
        리셋
      </button>
    </div>
  );
}
```

### 🔧 5단계: localStorage에 테마 저장하기

```javascript
// ThemeProvider를 개선해서 설정을 저장하고 불러오기
function ThemeProvider({ children }) {
  // 저장된 테마를 불러오거나 기본값 사용
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });
  
  // 테마가 바뀔 때마다 저장
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
      
      // HTML에 테마 클래스 추가 (CSS에서 사용 가능)
      document.body.className = effectiveTheme === 'dark' ? 'dark-theme' : 'light-theme';
    } catch {
      // 저장에 실패해도 앱은 계속 동작
    }
  }, [theme, effectiveTheme]);
  
  // ... 나머지 코드는 동일
}
```

---

## 4. 실제 예시로 배워보기

### 🛒 쇼핑몰 장바구니 만들기

Context API를 사용해서 쇼핑몰의 장바구니 기능을 만들어보아요!

```javascript
// 1. 장바구니 Context 만들기
const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  
  // 장바구니에 상품 추가
  const addToCart = (product) => {
    setCartItems(prev => {
      // 이미 있는 상품인지 확인
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // 이미 있으면 수량만 증가
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 새 상품이면 추가
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };
  
  // 장바구니에서 상품 제거
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  
  // 총 가격 계산
  const totalPrice = cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );
  
  // 총 상품 개수 계산
  const totalItems = cartItems.reduce((total, item) => 
    total + item.quantity, 0
  );
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

// 장바구니 사용을 위한 훅
function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart는 CartProvider 안에서만 사용 가능해요!');
  }
  return context;
}

// 2. 상품 컴포넌트
function Product({ product }) {
  const { addToCart } = useCart();
  
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      textAlign: 'center'
    }}>
      <h3>{product.name}</h3>
      <p>가격: {product.price.toLocaleString()}원</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🛒 장바구니 담기
      </button>
    </div>
  );
}

// 3. 장바구니 표시 컴포넌트
function CartSummary() {
  const { cartItems, totalPrice, totalItems, removeFromCart } = useCart();
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      border: '2px solid #007bff',
      borderRadius: '10px',
      padding: '15px',
      minWidth: '250px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>🛒 장바구니 ({totalItems}개)</h3>
      
      {cartItems.length === 0 ? (
        <p>장바구니가 비어있어요</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              padding: '5px',
              background: '#f8f9fa',
              borderRadius: '5px'
            }}>
              <div>
                <div>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {item.price.toLocaleString()}원 × {item.quantity}개
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '5px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                삭제
              </button>
            </div>
          ))}
          
          <hr />
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
            총 가격: {totalPrice.toLocaleString()}원
          </div>
        </>
      )}
    </div>
  );
}

// 4. 쇼핑몰 메인 앱
function ShoppingApp() {
  const products = [
    { id: 1, name: '맛있는 피자', price: 15000 },
    { id: 2, name: '시원한 콜라', price: 2000 },
    { id: 3, name: '달콤한 케이크', price: 25000 },
    { id: 4, name: '따뜻한 커피', price: 4000 },
    { id: 5, name: '신선한 샐러드', price: 8000 },
    { id: 6, name: '고소한 치킨', price: 18000 }
  ];
  
  return (
    <CartProvider>
      <div style={{ padding: '20px', paddingRight: '300px' }}>
        <h1>🛍️ 맛있는 음식 쇼핑몰</h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        
        <CartSummary />
      </div>
    </CartProvider>
  );
}
```

### 🎵 음악 플레이어 만들기

Context로 음악 재생 상태를 관리하는 플레이어를 만들어보아요!

```javascript
// 음악 플레이어 Context
const MusicContext = createContext();

function MusicProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  
  const playlist = [
    { id: 1, title: '즐거운 노래', artist: '가수1', duration: '3:45' },
    { id: 2, title: '신나는 음악', artist: '가수2', duration: '4:12' },
    { id: 3, title: '감성적인 발라드', artist: '가수3', duration: '3:28' },
    { id: 4, title: '클래식 명곡', artist: '가수4', duration: '5:01' }
  ];
  
  const playMusic = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };
  
  const pauseMusic = () => {
    setIsPlaying(false);
  };
  
  const resumeMusic = () => {
    setIsPlaying(true);
  };
  
  const nextSong = () => {
    if (currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      playMusic(playlist[nextIndex]);
    }
  };
  
  const previousSong = () => {
    if (currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      playMusic(playlist[prevIndex]);
    }
  };
  
  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      volume,
      playlist,
      playMusic,
      pauseMusic,
      resumeMusic,
      nextSong,
      previousSong,
      setVolume
    }}>
      {children}
    </MusicContext.Provider>
  );
}

function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic은 MusicProvider 안에서만 사용 가능해요!');
  }
  return context;
}

// 음악 목록 컴포넌트
function Playlist() {
  const { playlist, currentSong, playMusic } = useMusic();
  
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>🎵 재생 목록</h3>
      {playlist.map(song => (
        <div
          key={song.id}
          onClick={() => playMusic(song)}
          style={{
            padding: '10px',
            margin: '5px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: currentSong?.id === song.id ? '#e3f2fd' : 'white',
            borderColor: currentSong?.id === song.id ? '#2196f3' : '#ddd'
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{song.title}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {song.artist} - {song.duration}
          </div>
        </div>
      ))}
    </div>
  );
}

// 플레이어 컨트롤 컴포넌트
function PlayerControls() {
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    playMusic, 
    pauseMusic, 
    resumeMusic, 
    nextSong, 
    previousSong, 
    setVolume 
  } = useMusic();
  
  if (!currentSong) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        재생할 음악을 선택해주세요
      </div>
    );
  }
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'white',
      border: '2px solid #2196f3',
      borderRadius: '15px',
      padding: '20px',
      minWidth: '400px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      {/* 현재 재생 중인 곡 정보 */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
          {currentSong.title}
        </div>
        <div style={{ color: '#666', fontSize: '14px' }}>
          {currentSong.artist}
        </div>
      </div>
      
      {/* 재생 컨트롤 버튼 */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={previousSong}
          style={{
            padding: '10px 15px',
            margin: '0 5px',
            background: '#f0f0f0',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ⏮️ 이전
        </button>
        
        <button
          onClick={isPlaying ? pauseMusic : resumeMusic}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {isPlaying ? '⏸️ 일시정지' : '▶️ 재생'}
        </button>
        
        <button
          onClick={nextSong}
          style={{
            padding: '10px 15px',
            margin: '0 5px',
            background: '#f0f0f0',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          다음 ⏭️
        </button>
      </div>
      
      {/* 볼륨 컨트롤 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ marginRight: '10px' }}>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ width: '150px' }}
        />
        <span style={{ marginLeft: '10px', minWidth: '40px' }}>{volume}%</span>
      </div>
    </div>
  );
}

// 음악 플레이어 메인 앱
function MusicApp() {
  return (
    <MusicProvider>
      <div style={{ padding: '20px', paddingBottom: '200px' }}>
        <h1>🎵 나만의 음악 플레이어</h1>
        <Playlist />
        <PlayerControls />
      </div>
    </MusicProvider>
  );
}
```

---

## 5. 연습 문제

### 🏃‍♂️ 초급 연습문제

#### 연습 1: 카운터 Context 만들기
전역으로 관리되는 카운터를 만들어보세요.

**요구사항**:
- 여러 컴포넌트에서 같은 카운터 값 공유
- 증가, 감소, 리셋 기능
- 현재 값을 여러 곳에서 표시

```javascript
// 힌트: 이런 구조로 만들어보세요
function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  // Context Provider 반환
}

function CounterDisplay() {
  // 카운터 값만 표시
}

function CounterControls() {
  // 버튼들로 카운터 조작
}
```

#### 연습 2: 색깔 팔레트 Context
사용자가 선택한 색깔을 앱 전체에서 사용하는 시스템을 만들어보세요.

**요구사항**:
- 여러 색깔 중에서 선택 가능
- 선택한 색깔이 여러 컴포넌트에 적용
- 색깔 미리보기 기능

#### 연습 3: 언어 설정 Context
다국어 지원을 위한 언어 Context를 만들어보세요.

**요구사항**:
- 한국어, 영어, 일본어 지원
- 언어 변경 시 모든 텍스트 변경
- localStorage에 설정 저장

### 🏃‍♀️ 중급 연습문제

#### 연습 4: 알림(Notification) 시스템
앱 전체에서 사용할 수 있는 알림 시스템을 만들어보세요.

**요구사항**:
- 성공, 경고, 에러 타입의 알림
- 자동으로 사라지는 기능
- 여러 개의 알림을 동시에 표시
- 수동으로 닫기 가능

```javascript
// 사용 예시
function SomeComponent() {
  const { showNotification } = useNotification();
  
  const handleClick = () => {
    showNotification('저장이 완료되었습니다!', 'success');
  };
  
  return <button onClick={handleClick}>저장</button>;
}
```

#### 연습 5: 게임 점수 관리 시스템
여러 미니게임의 점수를 중앙에서 관리하는 시스템을 만들어보세요.

**요구사항**:
- 여러 게임의 점수 저장
- 최고 점수 기록
- 랭킹 시스템
- 점수 초기화 기능

#### 연습 6: 채팅방 Context
간단한 채팅 시스템을 Context로 만들어보세요.

**요구사항**:
- 여러 사용자가 메시지 전송
- 실시간으로 메시지 표시
- 사용자별 색깔 구분
- 메시지 기록 저장

### 🏋️‍♂️ 고급 연습문제

#### 연습 7: 복합 Context 시스템
여러 Context를 조합한 복잡한 시스템을 만들어보세요.

**요구사항**:
- 사용자 + 테마 + 언어 Context 조합
- Context 간의 상호작용 구현
- 성능 최적화 적용

#### 연습 8: Context + localStorage 동기화
Context 상태를 localStorage와 자동으로 동기화하는 시스템을 만들어보세요.

**요구사항**:
- 상태 변경 시 자동 저장
- 페이지 새로고침 시 복원
- 여러 탭 간 동기화

#### 연습 9: Context 성능 최적화
큰 Context에서 불필요한 리렌더를 방지하는 최적화를 구현해보세요.

**요구사항**:
- Context 분리 패턴 적용
- 메모이제이션 사용
- 성능 측정 도구 구현

---

## 🎉 핵심 정리

### Context API 한 줄 요약

| 개념 | 한 줄 요약 | 언제 사용? |
|------|-----------|-----------|
| **createContext** | 방송국을 만드는 것 | Context를 만들 때 |
| **Provider** | 방송을 송출하는 것 | 정보를 공유할 때 |
| **useContext** | 방송을 듣는 것 | 정보를 받아서 사용할 때 |
| **커스텀 훅** | 안전한 수신기 | Context를 쉽게 사용하기 위해 |

### Context 사용 기본 원칙

1. **필요한 곳에만 사용**: 모든 상태를 Context에 넣을 필요 없어요
2. **작게 나누기**: 하나의 Context에는 관련된 것들만 넣어요
3. **에러 처리**: Provider 밖에서 사용하면 에러 메시지 보여주기
4. **성능 고려**: 너무 자주 바뀌는 상태는 Context에 안 넣는 게 좋아요

### 다음에 배울 것들

#### 쉬운 것부터
1. **React Router**: 페이지 이동 관리하기
2. **useReducer**: 복잡한 상태 로직 관리하기
3. **Error Boundary**: 에러가 나도 앱이 멈추지 않게 하기

#### 조금 더 어려운 것들
1. **React Query**: 서버 데이터 관리하기
2. **Zustand**: 더 간단한 전역 상태 관리
3. **Redux**: 복잡한 앱의 상태 관리

---

## 💪 마무리 응원

Context API는 처음에는 어려워 보이지만, 실제로는 **우리가 일상에서 하는 방송과 같은 개념**이에요!

- **방송국(Context)**: 정보를 만드는 곳
- **방송 송출(Provider)**: 정보를 전달하는 방법
- **라디오 수신(useContext)**: 정보를 받아서 사용하기

Context API를 잘 사용하면:
- Props 지옥에서 벗어날 수 있어요
- 코드가 훨씬 깔끔해져요
- 전역 상태 관리가 쉬워져요

처음에는 "언제 써야 하지?" 하는 고민이 들 수 있지만, 많이 연습해보다 보면 "아, 여기서 Context를 써야겠구나!" 하는 감이 생겨요.

하나씩 천천히 만들어보면서 익혀나가세요. 궁금한 것이 있으면 언제든 질문하세요! 🚀✨

---

## 🔗 추가 자료

### 실제 사용 사례들
1. **Netflix**: 사용자 설정 (언어, 화질, 자막)
2. **YouTube**: 다크모드, 재생 설정
3. **Instagram**: 테마, 알림 설정
4. **카카오톡**: 테마, 폰트 크기, 언어

### 더 공부하고 싶다면
1. React 공식 문서의 Context 부분 읽어보기
2. 작은 프로젝트에 Context 적용해보기
3. 다른 사람들의 Context 사용법 보면서 학습하기
4. 성능 최적화 방법들 찾아보기

### 주의할 점들
1. 너무 많은 것을 한 Context에 넣지 마세요
2. 자주 바뀌는 상태는 Context 말고 local state 사용하세요
3. Provider를 너무 깊게 중첩하지 마세요
4. Context 값이 바뀔 때마다 모든 Consumer가 리렌더된다는 것을 기억하세요