// src/components/UserBadge.jsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function UserBadge({ name, role = 'Member' }) {
  const initial = (name ?? 'U').trim().charAt(0);

  return (
    <Paper
      variant="outlined"
      sx={{ p: 1.5, borderRadius: 2, display: 'inline-block' }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ backgroundColor: 'primary.main' }}>{initial}</Avatar>
        <Typography fontWeight={700}>{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({role})
        </Typography>
      </Stack>
    </Paper>
  );
}
