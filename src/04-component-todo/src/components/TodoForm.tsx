// src/components/TodoForm.tsx
import { useState } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력 후 Enter"
        aria-label="새 할 일"
        style={{ flex: 1 }}
      />
      <button type="submit">추가</button>
    </form>
  );
}