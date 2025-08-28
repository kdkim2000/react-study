import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ControlledInput() {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'grid', gap: 1.5, maxWidth: 420 }}
    >
      <TextField
        label="메모"
        placeholder="메모를 입력하세요"
        value={text}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      <Typography variant="subtitle2" color="text.secondary">
        글자 수: {text.length}
      </Typography>
    </Box>
  );
}
