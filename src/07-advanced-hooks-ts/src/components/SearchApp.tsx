import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { items as RAW } from '../data';
import SearchInput from './SearchInput';
import CategorySelect from './CategorySelect';
import ResultsList from './ResultsList';

type Category = 'all' | 'Framework' | 'Library' | 'Tool' | 'Database' | 'Language' | 'Cloud' | 'Testing' | 'DevOps' ;

export default function SearchApp() {
  // 1) 검색/카테고리/즐겨찾기 상태
  const [rawQuery, setRawQuery] = useState('');  // 즉각 입력 반영
  const [query, setQuery] = useState('');        // 디바운스된 쿼리
  const [category, setCategory] = useState<Category>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 2) 입력 포커스(ref) + 디바운스 타이머(ref)
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    inputRef.current?.focus(); // 마운트 시 1회 포커스
  }, []);

  const handleQueryChange = useCallback((next: string) => {
    setRawQuery(next);
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => setQuery(next), 200);
  }, []);

  // 3) 고정 데이터/카테고리 목록 메모(의존 없음)
  const items = RAW; // 실제 앱에선 서버/캐시에서 fetch
  const categories = useMemo<Category[]>(
    () => ['all', 'Framework', 'Library', 'Tool'],
    []
  );

  // 4) 비싼 계산(검색/필터) 메모
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      const qOk =
        !q ||
        it.name.toLowerCase().includes(q);
      const cOk = category === 'all' || it.category === category;
      return qOk && cOk;
    });
  }, [items, query, category]);

  // 5) 안정적인 핸들러(참조 동일성) - memoized child와 궁합
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: 24, display: 'grid', gap: 16 }}>
      <h1>고급 훅 — 검색 필터링 데모</h1>

      <div style={{ display: 'flex', gap: 8 }}>
        <SearchInput
          ref={inputRef}
          value={rawQuery}
          onChange={handleQueryChange}
          placeholder="예: react / next / vite"
        />
        <CategorySelect
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>

      <ResultsList
        items={filtered}
        query={query}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </section>
  );
}