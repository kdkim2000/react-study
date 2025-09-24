import { useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import EmptyState from './EmptyState';

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
    id: crypto.randomUUID(),
    text,
    done: false,
    createdAt: Date.now(),
  };
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const actions: TodoActions = {
    add: (text: string) => setTodos((prev) => [createTodo(text), ...prev]),
    toggle: (id: string) =>
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))),
    remove: (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id)),
    clearCompleted: () => setTodos((prev) => prev.filter((t) => !t.done)),
  };

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.done);
      case 'completed':
        return todos.filter((t) => t.done);
      default:
        return todos;
    }
  }, [todos, filter]);

  const completedCount = todos.filter((t) => t.done).length;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardHeader
        title="ToDo List"
        subheader="할 일을 추가하고 필터링/완료/삭제해 보세요."
        sx={{ '& .MuiCardHeader-title': { fontWeight: 800 } }}
      />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'grid', gap: 2 }}>
          {/* 입력 */}
          <TodoForm onAdd={actions.add} />

          {/* 필터 */}
          <TodoFilters
            current={filter}
            onChange={setFilter}
            onClearCompleted={actions.clearCompleted}
            completedCount={completedCount}
          />

          {/* 목록 */}
          {filtered.length > 0 ? (
            <TodoList todos={filtered} actions={actions} />
          ) : (
            <EmptyState />
          )}

          {/* 상태 요약 */}
          <Typography variant="caption" color="text.secondary">
            총 {todos.length}개 / 완료 {completedCount}개
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
