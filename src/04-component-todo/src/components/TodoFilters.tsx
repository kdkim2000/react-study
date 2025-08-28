// src/components/TodoFilters.tsx
import type { Filter } from './TodoApp'; // 혹은 별도 types import

type Props = {
  current: Filter;
  onChange: (f: Filter) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const filters: Filter[] = ['all', 'active', 'completed'];

export default function TodoFilters({
  current, onChange, onClearCompleted, completedCount
}: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '12px 0' }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => onChange(f)}
            aria-pressed={current === f}
            style={{
              padding: '4px 8px',
              border: current === f ? '2px solid #333' : '1px solid #ccc',
              borderRadius: 8
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <span style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
        완료: {completedCount}
      </span>
      <button onClick={onClearCompleted}>완료 삭제</button>
    </div>
  );
}