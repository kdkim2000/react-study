// src/components/EmptyState.tsx
type Props = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = '할 일이 없습니다',
  description = '상단 입력창에 새 할 일을 추가하세요.'
}: Props) {
  return (
    <div
      style={{
        border: '1px dashed #ccc',
        borderRadius: 12,
        padding: 24,
        textAlign: 'center',
        color: '#666',
        marginTop: 16
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: '8px 0 0' }}>{description}</p>
    </div>
  );
}