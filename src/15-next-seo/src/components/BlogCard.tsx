// components/BlogCard.tsx
'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Box,
  Avatar,
  CardActionArea,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPost;
  compact?: boolean;
}

export default function BlogCard({ post, compact = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea component={Link} href={`/blog/${post.slug}`} sx={{ flexGrow: 1 }}>
        {/* 커버 이미지 */}
        {post.coverImage && (
          <CardMedia
            component="img"
            height={compact ? 120 : 200}
            image={post.coverImage}
            alt={post.title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 카테고리 */}
          <Chip
            label={post.category}
            size="small"
            color="primary"
            sx={{ alignSelf: 'flex-start', mb: 1 }}
          />
          
          {/* 제목 */}
          <Typography
            variant={compact ? "h6" : "h5"}
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </Typography>
          
          {/* 요약 */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: compact ? 2 : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {post.excerpt}
          </Typography>
          
          {/* 메타 정보 */}
          <Stack spacing={1}>
            {/* 작성자 */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="caption" fontWeight={500}>
                {post.author.name}
              </Typography>
            </Stack>
            
            {/* 날짜와 읽기 시간 */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CalendarIcon fontSize="small" sx={{ fontSize: '0.8rem' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(post.publishedAt)}
                </Typography>
              </Stack>
              
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon fontSize="small" sx={{ fontSize: '0.8rem' }} />
                <Typography variant="caption" color="text.secondary">
                  {post.readTime}분
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}