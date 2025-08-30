import Link from 'next/link';
import type { Post } from '../../../lib/posts';
import { getAll, getBySlug } from '../../../lib/posts';
import { notFound } from 'next/navigation';

// 정적 경로(SSG) 생성
export async function generateStaticParams() {
  return getAll().map((p) => ({ slug: p.slug }));
}

// (선택적) 메타데이터 생성
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBySlug(params.slug);
  return { title: post ? post.title : 'Post' };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBySlug(params.slug) as Post | null;
  if (!post) notFound();

  return (
    <article style={{ display: 'grid', gap: 10 }}>
      <Link href="/blog">← 목록으로</Link>
      <h2 style={{ marginBottom: 0 }}>{post.title}</h2>
      <small style={{ color: '#6b7280' }}>
        {new Date(post.date).toLocaleString()} • {post.tags.join(', ')}
      </small>
      <p style={{ marginTop: 8 }}>{post.body}</p>
      <hr />
      <p style={{ color: '#6b7280' }}>
        slug: <code>{params.slug}</code>
      </p>
    </article>
  );
}
