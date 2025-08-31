// app/blog/page.tsx
import { Metadata } from 'next';
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | My Website',
  description: '최신 기술 트렌드와 개발 노하우를 공유하는 블로그',
  keywords: ['Next.js', 'React', 'TypeScript', '웹개발', '블로그'],
  openGraph: {
    title: 'Blog | My Website',
    description: '최신 기술 트렌드와 개발 노하우를 공유하는 블로그',
    type: 'website',
    url: 'https://myblog.com/blog',
  },
};

interface BlogPageProps {
  searchParams: {
    page?: string;
    category?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const category = searchParams.category;
  
  const { posts, totalCount, hasMore } = await getBlogPosts(page, 12);
  
  // 카테고리별 필터링
  const filteredPosts = category 
    ? posts.filter(post => post.category === category)
    : posts;
  
  // 모든 카테고리 추출
  const allCategories = Array.from(
    new Set(posts.map(post => post.category))
  );
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 페이지 헤더 */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          블로그
        </Typography>
        <Typography
          variant="h2"
          component="p"
          sx={{
            fontSize: '1.2rem',
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          개발과 기술에 대한 인사이트를 공유합니다
        </Typography>
      </Box>
      
      {/* 카테고리 필터 */}
      <Box mb={4}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label="전체"
            color={!category ? "primary" : "default"}
            component="a"
            href="/blog"
            clickable
          />
          {allCategories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              color={category === cat ? "primary" : "default"}
              component="a"
              href={`/blog?category=${encodeURIComponent(cat)}`}
              clickable
            />
          ))}
        </Stack>
      </Box>
      
      {/* 블로그 포스트 그리드 */}
      <Grid container spacing={3}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <BlogCard post={post} />
          </Grid>
        ))}
      </Grid>
      
      {/* 빈 상태 */}
      {filteredPosts.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            {category 
              ? `'${category}' 카테고리에 포스트가 없습니다.`
              : '포스트가 없습니다.'
            }
          </Typography>
        </Box>
      )}
      
      {/* 페이지네이션 정보 */}
      {hasMore && (
        <Box textAlign="center" mt={6}>
          <Typography variant="body2" color="text.secondary">
            총 {totalCount}개의 포스트 중 {filteredPosts.length}개를 표시하고 있습니다.
          </Typography>
        </Box>
      )}
    </Container>
  );
}