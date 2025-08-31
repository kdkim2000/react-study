import { NextResponse } from 'next/server';
import { deletePost, getPost, updatePost } from '@/lib/store';

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const post = getPost(params.id);
  if (!post) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(post, { headers: { 'cache-control': 'no-store' } });
}

export async function PUT(req: Request, { params }: Ctx) {
  const patch = await req.json().catch(() => null);
  if (!patch) return NextResponse.json({ error: 'invalid JSON' }, { status: 400 });
  const next = updatePost(params.id, {
    title: typeof patch.title === 'string' ? patch.title : undefined,
    content: typeof patch.content === 'string' ? patch.content : undefined,
  });
  if (!next) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(next, { headers: { 'cache-control': 'no-store' } });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const ok = deletePost(params.id);
  if (!ok) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json({ ok: true }, { headers: { 'cache-control': 'no-store' } });
}
