// src/layouts/BlogLayout.tsx
import { Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function BlogLayout() {
  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Stack spacing={2} sx={{ maxWidth: '100%' }}>
        <Typography 
          variant="h5" 
          fontWeight={800}
          sx={{ 
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          블로그
        </Typography>
        <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  );
}