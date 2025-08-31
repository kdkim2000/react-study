// app/api/og/route.tsx
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'My Blog';
  const author = searchParams.get('author') || 'Anonymous';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          fontSize: 60,
          fontWeight: 700,
        }}
      >
        <div style={{ color: 'white', marginBottom: 20 }}>{title}</div>
        <div style={{ color: '#888', fontSize: 30 }}>by {author}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}