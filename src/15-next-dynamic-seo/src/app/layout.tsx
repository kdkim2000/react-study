import type { Metadata, Viewport } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: { default: 'Next15 Dynamic SEO', template: '%s | Next15 Dynamic SEO' },
  description: 'Next.js 15 App Router: Dynamic Routes & SEO with MUI',
};
export const viewport: Viewport = { themeColor: '#1976d2' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
