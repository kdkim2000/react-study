import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

type Props = { onAdd: (text: string) => void };

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
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={1}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력 후 Enter"
          aria-label="새 할 일"
          fullWidth
          size="small"
        />
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>
          추가
        </Button>
      </Stack>
    </form>
  );
}
