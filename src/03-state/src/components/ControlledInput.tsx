// src/components/ControlledInput.tsx
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
export default function ControlledInput() {
  const [text, setText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" 
        onChange={handleChange}
        placeholder="메모를 입력하세요"
      />
      <Typography variant="subtitle1" gutterBottom>
        글자 수: {text.length}
      </Typography>
    </Box>
  );
}