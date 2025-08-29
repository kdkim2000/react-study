// src/components/ResizeWatcher.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MonitorRoundedIcon from '@mui/icons-material/MonitorRounded';

export default function ResizeWatcher() {
  const [w, setW] = useState<number>(() => (typeof window !== 'undefined' ? window.innerWidth : 0));

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        icon={<MonitorRoundedIcon />}
        label={`윈도우 너비: ${w}px`}
        variant="outlined"
        size="small"
      />
    </Stack>
  );
}
