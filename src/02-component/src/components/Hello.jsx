// src/components/Hello.jsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Hello() {
  const now = new Date().toLocaleTimeString();
  return (
    <Stack spacing={1}>
      <Typography variant="h5" component="h2" fontWeight={700}>
        안녕하세요 👋
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <AccessTimeIcon fontSize="small" />
        지금 시각: {now}
      </Typography>
    </Stack>
  );
}
