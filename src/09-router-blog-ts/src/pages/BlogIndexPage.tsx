// src/pages/BlogIndexPage.tsx
import { Link as RouterLink, useLoaderData, useSearchParams } from 'react-router-dom';
import type { Post } from '../lib/blog';
import { fetchPosts } from '../lib/blog';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export async function blogIndexLoader(): Promise<Post[]> {
  try {
    const posts = await fetchPosts();
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export default function BlogIndexPage() {
  const posts = useLoaderData() as Post[];
  const [params, setParams] = useSearchParams();

  const q = (params.get('q') ?? '').toLowerCase();
  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setParams({ q: value });
    } else {
      // 검색어가 비어있으면 q 파라미터 제거
      setParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('q');
        return newParams;
      });
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        value={q}
        placeholder="검색어(제목/요약/태그)"
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {filtered.length === 0 && q && (
        <Typography color="text.secondary">
          "{q}"에 대한 검색 결과가 없습니다.
        </Typography>
      )}

      {filtered.length === 0 && !q && posts.length === 0 && (
        <Typography color="text.secondary">
          등록된 게시글이 없습니다.
        </Typography>
      )}

      <Grid container spacing={2}>
        {filtered.map((p) => (
          <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: 320, // 고정 높이 설정
                minHeight: 320,
                maxHeight: 320,
                display: 'flex', 
                flexDirection: 'column',
                width: '100%' // 폭 고정
              }}
            >
              <CardContent sx={{ flexGrow: 1, overflow: 'hidden', p: 2 }}>
                <Stack spacing={1.5} sx={{ height: '100%' }}>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{ minHeight: 56 }} // 제목 영역 최소 높이 고정
                  >
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 700,
                        flex: 1,
                        minWidth: 0,
                        wordBreak: 'break-word',
                        display: '-webkit-box',
                        WebkitLineClamp: 2, // 제목 최대 2줄로 제한
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.3
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        flexShrink: 0,
                        ml: 1,
                        whiteSpace: 'nowrap' // 날짜는 한 줄로 고정
                      }}
                    >
                      {new Date(p.date).toLocaleDateString('ko-KR')}
                    </Typography>
                  </Stack>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3, // 요약 3줄로 고정
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: 66, // 요약 영역 고정 높이
                      lineHeight: 1.5
                    }}
                  >
                    {p.excerpt}
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={0.5} 
                    flexWrap="wrap" 
                    useFlexGap
                    sx={{ 
                      mt: 1,
                      minHeight: 40, // 태그 영역 최소 높이 고정
                      maxHeight: 72, // 태그 영역 최대 높이 제한
                      overflow: 'hidden'
                    }}
                  >
                    {p.tags.slice(0, 4).map((t) => ( // 최대 4개 태그만 표시
                      <Chip 
                        key={t} 
                        label={t} 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          mb: 0.5,
                          maxWidth: 120, // 태그 최대 폭 제한
                          '& .MuiChip-label': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }
                        }}
                      />
                    ))}
                    {p.tags.length > 4 && (
                      <Chip 
                        label={`+${p.tags.length - 4}`}
                        size="small" 
                        variant="outlined"
                        color="primary"
                        sx={{ mb: 0.5 }}
                      />
                    )}
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2, minHeight: 52 }}>
                <Button 
                  component={RouterLink} 
                  to={`/blog/${p.slug}`} 
                  size="small"
                  variant="outlined"
                  fullWidth // 버튼을 전체 폭으로
                >
                  자세히 보기 →
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}