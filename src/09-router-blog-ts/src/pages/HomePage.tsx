// src/pages/HomePage.tsx
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

export default function HomePage() {
  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Stack spacing={1.5} sx={{ maxWidth: '100%' }}>
        <Typography 
          variant="h5" 
          fontWeight={800}
          sx={{ 
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          홈
        </Typography>
        <Typography 
          color="text.secondary"
          sx={{ 
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%'
          }}
        >
          React Router로 만든 간단한 블로그 데모입니다.
        </Typography>
        <Box sx={{ pt: 0.5 }}>
          <Link 
            component={RouterLink} 
            to="/blog" 
            underline="hover"
            sx={{
              display: 'inline-block',
              wordBreak: 'keep-all'
            }}
          >
            블로그 바로가기 →
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}