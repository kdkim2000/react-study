// src/components/TodoList.tsx
import type { Todo, TodoActions } from './TodoApp';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];
  actions: Pick<TodoActions, 'toggle' | 'remove'>; // 필요한 액션만 내려도 OK
};

export default function TodoList({ todos, actions }: Props) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} actions={actions} />
      ))}
    </ul>
  );
}