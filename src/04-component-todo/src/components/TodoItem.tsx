import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import type { Todo, TodoActions } from './TodoApp';

type Props = {
  todo: Todo;
  actions: Pick<TodoActions, 'toggle' | 'remove'>;
};

export default function TodoItem({ todo, actions }: Props) {
  return (
    <ListItem
      disableGutters
      secondaryAction={
        <IconButton edge="end" aria-label="삭제" onClick={() => actions.remove(todo.id)}>
          <DeleteOutlineIcon />
        </IconButton>
      }
      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, px: 1, py: 0.5 }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Checkbox
          edge="start"
          checked={todo.done}
          onChange={() => actions.toggle(todo.id)}
          inputProps={{ 'aria-label': `${todo.text} 완료 토글` }}
        />
      </ListItemIcon>
      <ListItemText
        primary={todo.text}
        primaryTypographyProps={{
          sx: { textDecoration: todo.done ? 'line-through' : 'none' },
        }}
      />
    </ListItem>
  );
}
