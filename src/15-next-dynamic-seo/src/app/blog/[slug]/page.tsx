import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAll, getBySlug } from '@/lib/posts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

// (선택) ISR: 60초
export const revalidate = 60;

// 정적 경로 생성 (SSG)
export async function generateStaticParams() {
  return getAll().map(p => ({ slug: p.slug }));
}

// // 동적 Metadata (SEO)
// export async function generateMetadata(
//   { params }: { params: { slug: string } }
// ): Promise<Metadata> {
//   const post = getBySlug(params.slug);
//   if (!post) return { title: 'Post Not Found' };

//   const url = `https://example.com/blog/${post.slug}`; // 실제 배포 도메인으로 교체
//   return {
//     title: post.title,
//     description: post.excerpt,
//     alternates: { canonical: url },               // 정규 URL
//     openGraph: {                                  // OG 메타
//       title: post.title,
//       description: post.excerpt,
//       type: 'article',
//       url,
//       tags: post.tags,
//     },
//     twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
//   };
// }
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const url = `https://example.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url,
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  };
}

// export default async function BlogPostPage({ params }: { params: { slug: string } }) {
//   const post = getBySlug(params.slug);
//   if (!post) notFound();

//   // 간단한 JSON-LD(본문에 스크립트로 삽입)
//   const jsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'BlogPosting',
//     headline: post.title,
//     datePublished: post.date,
//     description: post.excerpt,
//     url: `https://example.com/blog/${post.slug}`,
//     keywords: post.tags.join(','),
//   };
// 페이지 컴포넌트는 그대로(여기는 params가 동기 객체)
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    url: `https://example.com/blog/${post.slug}`,
    keywords: post.tags.join(','),
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <Button component={Link} href="/blog" size="small" sx={{ mb: 1 }}>
        ← 목록으로
      </Button>

      <Typography variant="h4" fontWeight={800}>{post.title}</Typography>
      <Typography variant="caption" color="text.secondary">
        {new Date(post.date).toLocaleString()}
      </Typography>

      <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap" sx={{ mt: 1 }}>
        {post.tags.map(t => <Chip key={t} label={t} size="small" />)}
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Typography>{post.body}</Typography>
    </Container>
  );
}
