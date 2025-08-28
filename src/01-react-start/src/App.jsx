import { useState } from 'react';
import Button from '@mui/material/Button';

import UserBadge from './components/UserBadge';
import UserCard from './components/UserCard';
export default function App() {
  const [count, setCount] = useState(0);   // Vue의 ref와 비슷한 역할

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>안녕하세요, React!</h1>
      <p>버튼을 클릭해 카운트를 증가시켜 보세요.</p>

      <Button variant="contained" onClick={() => setCount(prev => prev + 1)}>
        count: {count}
      </Button>
      <UserCard name="김경덕" />

      <UserBadge name="김경덕" role="Software Engineer" />
      
      <UserBadge name="홍길동" /> {/* role 기본값: Member */}
    </main>
  );
}

