import * as React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Next.js 15 — 동적 라우팅 & SEO (MUI)
      </Typography>
      <Button component={Link} href="/blog" variant="contained">
        블로그로 이동
      </Button>
    </Container>
  );
}
