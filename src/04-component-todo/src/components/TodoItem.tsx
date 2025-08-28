// src/components/TodoItem.tsx
import type { Todo, TodoActions } from './TodoApp';

type Props = {
  todo: Todo;
  actions: Pick<TodoActions, 'toggle' | 'remove'>;
};

export default function TodoItem({ todo, actions }: Props) {
  return (
    <li
      style={{
        border: '1px solid #eee',
        borderRadius: 8,
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => actions.toggle(todo.id)}
        aria-label={`${todo.text} 완료 토글`}
      />
      <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => actions.remove(todo.id)} aria-label="삭제">🗑️</button>
    </li>
  );
}