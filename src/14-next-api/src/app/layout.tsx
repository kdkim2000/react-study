import type { Metadata } from 'next';
import Providers from './providers';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const metadata: Metadata = { title: 'Next15 API Routes (App Router)' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko"><body>
      <Providers>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Button component={Link} href="/" variant="text">Home</Button>
            <Button component={Link} href="/api-demo" variant="text">API Demo</Button>
          </Stack>
          {children}
        </Container>
      </Providers>
    </body></html>
  );
}
