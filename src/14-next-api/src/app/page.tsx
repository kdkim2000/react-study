import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>14. API Routes (Route Handlers)</Typography>
      <Typography sx={{ mb: 2 }}>
        App Router에서는 <b>app/api/*/route.ts</b> 파일에 메서드별 함수를 export하여 API를 만듭니다.
      </Typography>
      <Button component={Link} href="/api-demo" variant="contained">실습 페이지로 이동</Button>
    </Container>
  );
}
