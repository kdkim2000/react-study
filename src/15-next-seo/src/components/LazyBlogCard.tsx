// components/LazyBlogCard.tsx
'use client';

import dynamic from 'next/dynamic';
import { Skeleton, Card, CardContent } from '@mui/material';

// 동적 import로 컴포넌트 지연 로딩
const BlogCard = dynamic(() => import('./BlogCard'), {
  loading: () => (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="60%" />
      </CardContent>
    </Card>
  ),
});

export default BlogCard;