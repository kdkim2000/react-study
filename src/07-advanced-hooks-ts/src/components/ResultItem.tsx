import { memo, useRef } from 'react';
import type { Item } from '../data';
import { highlight } from '../utils/highlight';

type Props = {
  item: Item;
  query: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

function ResultItemBase({ item, query, isFavorite, onToggleFavorite }: Props) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <li
      style={{
        border: '1px solid #eee', borderRadius: 12, padding: 12,
        display: 'grid', gap: 6, alignItems: 'start'
      }}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <strong>{highlight(item.name, query)}</strong>
        <span style={{ fontSize: 12, color: '#666' }}>#{item.category}</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#999' }}>
          renders: {renderCount.current}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onToggleFavorite(item.id)}
          aria-label="즐겨찾기 토글"
          style={{
            padding: '6px 10px', borderRadius: 8,
            border: '1px solid #ddd', background: isFavorite ? '#111' : '#fff',
            color: isFavorite ? '#fff' : '#111'
          }}
        >
          {isFavorite ? '★ 즐겨찾기' : '☆ 즐겨찾기'}
        </button>
      </div>
    </li>
  );
}

const ResultItem = memo(ResultItemBase);
export default ResultItem;