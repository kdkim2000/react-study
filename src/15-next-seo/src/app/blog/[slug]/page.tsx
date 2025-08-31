// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Grid,
  Divider,
  Stack,
  Paper,
} from '@mui/material';
import BlogHeader from '@/components/BlogHeader';
import BlogContent from '@/components/BlogContent';
import BlogCard from '@/components/BlogCard';
import StructuredData from '@/components/StructuredData';
import { getBlogPost, getRelatedPosts, getAllBlogSlugs } from '@/lib/blog';
import { BlogPost } from '@/types/blog';

interface BlogPostPageProps {
  params: { slug: string };
}

// 메타데이터 생성
export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 블로그 포스트를 찾을 수 없습니다.',
      robots: { index: false, follow: false },
    };
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://myblog.com';
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&author=${encodeURIComponent(post.author.name)}`;
  
  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    
    openGraph: {
      type: 'article',
      locale: 'ko_KR',
      siteName: 'My Blog',
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage || ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      section: post.category,
    },
    
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || ogImageUrl],
    },
    
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
    
    other: {
      'article:published_time': post.publishedAt,
      'article:modified_time': post.updatedAt,
      'article:author': post.author.name,
      'article:section': post.category,
      'article:tag': post.tags.join(', '),
    },
  };
}

// 정적 경로 생성 (ISG)
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // 관련 포스트 가져오기
  const relatedPosts = await getRelatedPosts(post.slug, post.category, 3);
  
  return (
    <>
      {/* 구조화된 데이터 */}
      <StructuredData post={post} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* 메인 콘텐츠 */}
          <Grid item xs={12} md={8}>
            <Box component="article">
              {/* 블로그 헤더 */}
              <BlogHeader post={post} />
              
              {/* 커버 이미지 */}
              {post.coverImage && (
                <Box sx={{ mb: 4 }}>
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              )}
              
              {/* 블로그 내용 */}
              <BlogContent content={post.content} />
              
              {/* 작성자 정보 */}
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  mt: 4,
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                    }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {post.author.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.author.bio}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
          
          {/* 사이드바 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* 관련 포스트 */}
              {relatedPosts.length > 0 && (
                <Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    관련 포스트
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Stack spacing={2}>
                    {relatedPosts.map((relatedPost) => (
                      <BlogCard
                        key={relatedPost.id}
                        post={relatedPost}
                        compact
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}