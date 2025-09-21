'use client';
import * as React from 'react';
import useSWR from 'swr'; // 선택: 설치하려면 `npm i swr`
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

type Post = { id: string; title: string; content: string; createdAt: number };

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then(r => r.json());

export default function ApiDemoPage() {
  const { data: posts, mutate, isLoading } = useSWR<Post[]>('/api/posts', fetcher);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const create = async () => {
    if (!title.trim() || !content.trim()) return;
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    setTitle(''); setContent('');
    mutate(); // 최신 데이터로 갱신
  };

  const remove = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>API Demo (MUI)</Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
          <TextField label="제목" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
          <TextField label="내용" value={content} onChange={e => setContent(e.target.value)} fullWidth />
          <Button variant="contained" onClick={create}>추가</Button>
        </Stack>
      </Paper>

      {isLoading && <Typography>불러오는 중…</Typography>}
      <Stack spacing={1}>
        {(posts ?? []).map(p => (
          <Card key={p.id} variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight={700}>{p.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                {p.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(p.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button color="error" onClick={() => remove(p.id)}>삭제</Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
