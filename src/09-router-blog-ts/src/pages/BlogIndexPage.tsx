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
          <Grid item xs={12} sm={6} key={p.id}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column' 
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    alignItems="baseline"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 700,
                        flex: 1,
                        minWidth: 0, // 텍스트 줄바꿈 허용
                        wordBreak: 'break-word'
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ flexShrink: 0 }}
                    >
                      {new Date(p.date).toLocaleDateString('ko-KR')}
                    </Typography>
                  </Stack>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {p.excerpt}
                  </Typography>
                  {p.tags.length > 0 && (
                    <Stack 
                      direction="row" 
                      spacing={0.5} 
                      flexWrap="wrap" 
                      useFlexGap
                      sx={{ mt: 1 }}
                    >
                      {p.tags.map((t) => (
                        <Chip 
                          key={t} 
                          label={t} 
                          size="small" 
                          variant="outlined"
                          sx={{ mb: 0.5 }}
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button 
                  component={RouterLink} 
                  to={`/blog/${p.slug}`} 
                  size="small"
                  variant="outlined"
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