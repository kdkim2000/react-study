type Props = {
  categories: Array<'all' | 'Framework' | 'Library' | 'Tool'>;
  value: 'all' | 'Framework' | 'Library' | 'Tool';
  onChange: (next: Props['value']) => void;
};

export default function CategorySelect({ categories, value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Props['value'])}
      style={{ padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
      aria-label="카테고리 선택"
    >
      {categories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}