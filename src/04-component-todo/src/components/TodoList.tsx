import * as React from 'react';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import TodoItem from './TodoItem';
import type { Todo, TodoActions } from './TodoApp';

type Props = {
  todos: Todo[];
  actions: Pick<TodoActions, 'toggle' | 'remove'>;
};

export default function TodoList({ todos, actions }: Props) {
  return (
    <List disablePadding>
      <Stack spacing={1}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} actions={actions} />
        ))}
      </Stack>
    </List>
  );
}
