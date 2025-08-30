// src/components/common/ResponsiveGrid.tsx
'use client';

import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Favorite,
  Share,
  Visibility,
  Schedule,
} from '@mui/icons-material';

interface GridItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  views: number;
  likes: number;
}

const sampleData: GridItem[] = [
  {
    id: 1,
    title: 'Next.js 13 완전 정복하기',
    description: 'App Router와 Server Components를 활용한 최신 Next.js 개발 방법을 알아보세요.',
    image: 'https://picsum.photos/300/200?random=1',
    category: '개발',
    date: '2024-01-15',
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    title: 'TypeScript 고급 패턴',
    description: '실무에서 사용하는 TypeScript의 고급 타입 시스템과 패턴들을 소개합니다.',
    image: 'https://picsum.photos/300/200?random=2',
    category: '프로그래밍',
    date: '2024-01-12',
    views: 980,
    likes: 67,
  },
  {
    id: 3,
    title: 'Material-UI 디자인 시스템',
    description: '일관성 있는 UI/UX를 위한 Material-UI 활용법과 커스터마이징 방법.',
    image: 'https://picsum.photos/300/200?random=3',
    category: '디자인',
    date: '2024-01-10',
    views: 750,
    likes: 45,
  },
  {
    id: 4,
    title: '반응형 웹 디자인 원칙',
    description: '모든 디바이스에서 완벽하게 작동하는 반응형 웹사이트 구축 가이드.',
    image: 'https://picsum.photos/300/200?random=4',
    category: '웹 디자인',
    date: '2024-01-08',
    views: 1100,
    likes: 72,
  },
  {
    id: 5,
    title: 'React 성능 최적화',
    description: '메모이제이션과 코드 분할을 통한 React 애플리케이션 성능 향상 기법.',
    image: 'https://picsum.photos/300/200?random=5',
    category: '개발',
    date: '2024-01-05',
    views: 1350,
    likes: 95,
  },
  {
    id: 6,
    title: 'CSS-in-JS vs CSS Modules',
    description: '다양한 스타일링 방법론의 장단점과 적절한 선택 기준을 알아보세요.',
    image: 'https://picsum.photos/300/200?random=6',
    category: '스타일링',
    date: '2024-01-03',
    views: 820,
    likes: 58,
  },
];

export default function ResponsiveGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getGridColumns = () => {
    if (isMobile) return 12;
    if (isTablet) return 6;
    return 4;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        반응형 콘텐츠 그리드
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        paragraph 
        align="center"
        sx={{ mb: 4 }}
      >
        다양한 화면 크기에 맞춰 자동으로 조정되는 카드 레이아웃입니다.
      </Typography>

      <Grid container spacing={3}>
        {sampleData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Chip
                    label={item.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontSize: isMobile ? '1.1rem' : '1.25rem',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.title}
                </Typography>
                
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  {item.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Schedule fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(item.date)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Visibility fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {formatNumber(item.views)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Favorite fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {formatNumber(item.likes)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth={isMobile}
                  sx={{ mr: 1 }}
                >
                  자세히 보기
                </Button>
                <Button
                  size="small"
                  startIcon={<Share />}
                  fullWidth={isMobile}
                >
                  공유
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}