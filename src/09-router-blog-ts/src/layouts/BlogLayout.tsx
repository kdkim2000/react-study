// src/layouts/BlogLayout.tsx
import { Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function BlogLayout() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={800}>블로그</Typography>
      <Outlet />
    </Stack>
  );
}
