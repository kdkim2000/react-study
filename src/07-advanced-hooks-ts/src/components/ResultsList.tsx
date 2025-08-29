import type { Item } from '../data';
import ResultItem from './ResultItem';

type Props = {
  items: Item[];
  query: string;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
};

export default function ResultsList({ items, query, favorites, onToggleFavorite }: Props) {
  if (items.length === 0) return <p style={{ color: '#777' }}>검색 결과가 없습니다.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10 }}>
      {items.map((it) => (
        <ResultItem
          key={it.id}
          item={it}
          query={query}
          isFavorite={favorites.has(it.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}