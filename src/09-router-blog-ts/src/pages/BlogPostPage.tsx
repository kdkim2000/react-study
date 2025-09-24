// src/pages/BlogPostPage.tsx
import { Link as RouterLink, LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import type { Post } from '../lib/blog';
import { fetchPostBySlug } from '../lib/blog';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export async function blogPostLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug!;
  const post = await fetchPostBySlug(slug);
  if (!post) {
    throw new Response('Post not found', { status: 404, statusText: 'Not Found' });
  }
  return post;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = useLoaderData() as Post;

  return (
    <Stack spacing={2} sx={{ maxWidth: '100%', width: '100%' }}>
      <Link component={RouterLink} to="/blog" underline="hover">
        ← 목록으로
      </Link>

      <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
        <Typography 
          variant="h4" 
          fontWeight={800} 
          sx={{ 
            mb: 1,
            wordBreak: 'break-word',
            hyphens: 'auto',
            overflowWrap: 'break-word'
          }}
        >
          {post.title}
        </Typography>
      </Box>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={1} 
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ flexWrap: 'wrap', gap: 1 }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
          {new Date(post.date).toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {post.tags.map((t) => (
            <Chip 
              key={t} 
              label={t} 
              size="small" 
              sx={{ 
                maxWidth: 120,
                '& .MuiChip-label': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }
              }} 
            />
          ))}
        </Box>
      </Stack>

      <Typography 
        sx={{ 
          mt: 2,
          wordBreak: 'break-word',
          hyphens: 'auto',
          overflowWrap: 'break-word',
          maxWidth: '100%'
        }}
      >
        {post.body}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography color="text.secondary" variant="caption">
        slug: <code style={{ wordBreak: 'break-all' }}>{slug}</code>
      </Typography>
    </Stack>
  );
}