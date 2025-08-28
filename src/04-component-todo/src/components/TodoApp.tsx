// src/components/TodoApp.tsx
import { useMemo, useState } from 'react';
import { Todo, Filter, TodoActions } from './TodoApp.types'; // 위 타입을 분리했다면 사용
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import EmptyState from './EmptyState';

// src/components/TodoApp.tsx (상단에 함께 선언하거나 별도 types.ts로 분리 가능)
export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

export type Filter = 'all' | 'active' | 'completed';

export type TodoActions = {
  add: (text: string) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clearCompleted: () => void;
};


function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),   // 브라우저 지원. (구버전은 uuid 패키지 사용)
    text,
    done: false,
    createdAt: Date.now(),
  };
}
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const actions: TodoActions = {
    add: (text: string) =>
      setTodos(prev => [createTodo(text), ...prev]),
    toggle: (id: string) =>
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
      ),
    remove: (id: string) =>
      setTodos(prev => prev.filter(t => t.id !== id)),
    clearCompleted: () =>
      setTodos(prev => prev.filter(t => !t.done)),
  };

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.done);
      case 'completed':
        return todos.filter(t => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  const completedCount = todos.filter(t => t.done).length;

  return (
    <section style={{ maxWidth: 520, margin: '0 auto', padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>ToDo List</h1>

      {/* 입력(자식) ← 부모 액션 중 add만 전달 */}
      <TodoForm onAdd={actions.add} />

      {/* 필터(자식) ← 현재 필터와 변경 콜백 전달 */}
      <TodoFilters
        current={filter}
        onChange={setFilter}
        onClearCompleted={actions.clearCompleted}
        completedCount={completedCount}
      />

      {/* 목록(자식) ← 데이터와 toggle/remove 액션 번들 전달 */}
      {filtered.length > 0 ? (
        <TodoList todos={filtered} actions={actions} />
      ) : (
        <EmptyState />
      )}
    </section>
  );
}