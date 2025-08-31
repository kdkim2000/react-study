// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { allPosts, createPost } from '@/lib/store';

// 목록
export async function GET() {
  // 최신 데이터가 필요하면 no-store
  return NextResponse.json(allPosts(), {
    headers: { 'cache-control': 'no-store' },
  });
}

// 생성
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = String(body?.title ?? '').trim();
    const content = String(body?.content ?? '').trim();
    if (!title || !content) {
      return NextResponse.json({ error: 'title/content required' }, { status: 400 });
    }
    const created = createPost({ title, content });
    return NextResponse.json(created, {
      status: 201,
      headers: {
        Location: `/api/posts/${created.id}`,
        'cache-control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }
}
