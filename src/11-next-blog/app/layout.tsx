import Link from 'next/link';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: 'Next Turbo Blog',
  description: 'App Router + Turbopack demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, sans-serif' }}>
        <header style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16, borderBottom: '1px solid #e5e7eb' }}>
          <strong>Next Turbo Blog</strong>
          <nav style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            <Link href="/" passHref legacyBehavior>
              <Typography component="a" sx={{ textDecoration: 'none' }}>
                Home
              </Typography>
            </Link>
            <a href="/blog" style={{ textDecoration: 'none' }}>Blog</a>
          </nav>
        </header>
        <main style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>{children}</main>
        <footer style={{ padding: 16, color: '#6b7280', borderTop: '1px solid #e5e7eb' }}>
          © 2025 FE Chapter
        </footer>
      </body>
    </html>
  );
}
