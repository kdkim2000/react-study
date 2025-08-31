// components/BlogHeader.tsx
'use client';

import {
  Box,
  Typography,
  Avatar,
  Chip,
  Stack,
  Divider,
  useTheme,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { BlogPost } from '@/types/blog';

interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  const theme = useTheme();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* 카테고리 */}
      <Chip
        label={post.category}
        color="primary"
        size="small"
        sx={{ mb: 2 }}
      />
      
      {/* 제목 */}
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold',
          lineHeight: 1.2,
          mb: 2,
        }}
      >
        {post.title}
      </Typography>
      
      {/* 부제목/요약 */}
      <Typography
        variant="h2"
        component="p"
        sx={{
          fontSize: '1.2rem',
          fontWeight: 400,
          color: theme.palette.text.secondary,
          mb: 3,
          lineHeight: 1.5,
        }}
      >
        {post.excerpt}
      </Typography>
      
      {/* 메타 정보 */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ mb: 3 }}
      >
        {/* 작성자 정보 */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            sx={{ width: 32, height: 32 }}
          >
            <PersonIcon />
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {post.author.name}
          </Typography>
        </Stack>
        
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
        
        {/* 발행일 */}
        <Stack direction="row" spacing={0.5} alignItems="center">
          <CalendarIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {formatDate(post.publishedAt)}
          </Typography>
        </Stack>
        
        {/* 읽기 시간 */}
        <Stack direction="row" spacing={0.5} alignItems="center">
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {post.readTime}분 읽기
          </Typography>
        </Stack>
      </Stack>
      
      {/* 태그 */}
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {post.tags.map((tag) => (
          <Chip
            key={tag}
            label={`#${tag}`}
            variant="outlined"
            size="small"
            sx={{ fontSize: '0.75rem' }}
          />
        ))}
      </Stack>
      
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}