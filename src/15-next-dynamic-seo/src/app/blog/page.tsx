import * as React from 'react';
import Link from 'next/link';
import { getAll } from '@/lib/posts';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const metadata = { title: '블로그' };

export default async function BlogIndexPage() {
  const posts = getAll(); // 데모: 동기. (실무는 fetch/DB)
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>블로그</Typography>
      <Grid container spacing={2}>
        {posts.map(p => (
          <Grid item xs={12} sm={6} key={p.slug}>
            <Card variant="outlined" sx={{ height: '100%', display: 'grid' }}>
              <CardContent>
                <Typography variant="h6" component="h3" fontWeight={700}>
                  {p.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(p.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {p.excerpt}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                  {p.tags.map(t => <Chip key={t} label={t} size="small" variant="outlined" />)}
                </Stack>
              </CardContent>
              <Button component={Link} href={`/blog/${p.slug}`} sx={{ m: 2, mt: 'auto' }}>
                자세히 보기 →
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
