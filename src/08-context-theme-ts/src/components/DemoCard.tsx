// src/components/DemoCard.tsx
export default function DemoCard() {
  return (
    <div className="card" style={{ display: 'grid', gap: 6 }}>
      <strong>카드 컴포넌트</strong>
      <p className="small">전역 테마 변수로 배경/텍스트/보더 색상이 바뀝니다.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button>확인</button>
        <button>취소</button>
      </div>
    </div>
  );
}
