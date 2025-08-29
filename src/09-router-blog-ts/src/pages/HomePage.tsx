// src/pages/HomePage.tsx
import { Link as RouterLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function HomePage() {
  return (
    <Stack spacing={1.5}>
      <Typography variant="h5" fontWeight={800}>홈</Typography>
      <Typography color="text.secondary">
        React Router로 만든 간단한 블로그 데모입니다.
      </Typography>
      <Link component={RouterLink} to="/blog" underline="hover">
        블로그 바로가기 →
      </Link>
    </Stack>
  );
}
