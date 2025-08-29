// src/pages/AboutPage.tsx
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function AboutPage() {
  return (
    <Stack spacing={1}>
      <Typography variant="h5" fontWeight={800}>About</Typography>
      <Typography color="text.secondary">
        부서 교육용 React Router 데모. 목록/상세/동적 라우트를 포함합니다.
      </Typography>
    </Stack>
  );
}
