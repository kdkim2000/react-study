import { NextResponse } from 'next/server';
import { allPosts, createPost } from '@/lib/store';

export async function GET() {
  // 즉시 최신화가 필요한 API → 캐싱 비활성화
  return NextResponse.json(allPosts(), { headers: { 'cache-control': 'no-store' } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = String(body?.title ?? '').trim();
    const content = String(body?.content ?? '').trim();
    if (!title || !content) {
      return NextResponse.json({ error: 'title/content required' }, { status: 400 });
    }
    const created = createPost({ title, content });
    // 생성 응답(201) + Location 헤더
    return NextResponse.json(created, {
      status: 201,
      headers: { Location: `/api/posts/${created.id}`, 'cache-control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  }
}
