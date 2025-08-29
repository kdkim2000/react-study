// src/pages/UsersPage.tsx
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { fetchUsers, type User } from '../lib/api';
import UsersList from '../components/UsersList';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function UsersPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      try {
        setStatus('loading');
        const data = await fetchUsers(controller.signal);
        if (cancelled) return;
        setUsers(data);
        setStatus('success');
      } catch (err) {
        // fetch 취소는 DOMException('AbortError') 또는 Error('AbortError')로 들어올 수 있음
        if (
          (err instanceof DOMException && err.name === 'AbortError') ||
          (err instanceof Error && err.name === 'AbortError')
        ) {
          return; // 취소는 무시
        }
        console.error(err);
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [users, query]);

  return (
    <Container maxWidth="md" sx={{ py: 4, display: 'grid', gap: 2 }}>
      <Typography variant="h4" fontWeight={800}>
        사용자 목록
      </Typography>

      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="이름/아이디/이메일 검색"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end">
              <IconButton aria-label="검색 초기화" onClick={() => setQuery('')} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      {status === 'idle' && <Alert severity="info">대기 중…</Alert>}
      {status === 'loading' && (
        <Stack spacing={1}>
          <LinearProgress />
          <Typography variant="body2" color="text.secondary">
            불러오는 중…
          </Typography>
        </Stack>
      )}
      {status === 'error' && (
        <Alert severity="error" role="alert">
          데이터를 불러오지 못했습니다. 잠시 후 다시 시도하세요.
        </Alert>
      )}
      {status === 'success' && <UsersList users={filtered} />}
    </Container>
  );
}
