// src/pages/AboutPage.tsx
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AboutPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      <Stack spacing={1} sx={{ maxWidth: '100%' }}>
        <Typography 
          variant="h5" 
          fontWeight={800}
          sx={{ 
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}
        >
          About
        </Typography>
        <Typography 
          color="text.secondary"
          sx={{ 
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%',
            lineHeight: 1.6
          }}
        >
          부서 교육용 React Router 데모. 목록/상세/동적 라우트를 포함합니다.
        </Typography>
      </Stack>
    </Box>
  );
}