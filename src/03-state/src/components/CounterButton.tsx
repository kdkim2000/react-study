import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function CounterButton() {
  const [count, setCount] = useState<number>(0);

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setCount((c) => c + 1)}
      >
        count: {count}
      </Button>

      <Button
        variant="text"
        startIcon={<RestartAltIcon />}
        onClick={() => setCount(0)}
      >
        Reset
      </Button>

      <Typography variant="body2" color="text.secondary">
        (클릭 이벤트로 상태 변경)
      </Typography>
    </Stack>
  );
}
