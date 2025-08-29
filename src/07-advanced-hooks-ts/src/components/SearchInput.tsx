import { forwardRef } from 'react';

type Props = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, placeholder }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? '검색어 입력'}
        style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
        aria-label="검색 입력"
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';
export default SearchInput;