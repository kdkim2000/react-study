// src/components/common/ErrorBoundary.tsx
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Container,
} from '@mui/material';
import { Refresh, Home } from '@mui/icons-material';
import Link from 'next/link';

interface ErrorBoundaryProps {
  error?: Error;
  reset?: () => void;
  title?: string;
  message?: string;
}

export default function ErrorBoundary({
  error,
  reset,
  title = '오류가 발생했습니다',
  message = '페이지를 불러오는 중 문제가 발생했습니다.',
}: ErrorBoundaryProps) {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          <AlertTitle>{title}</AlertTitle>
          {message}
          {error && (
            <Typography
              variant="body2"
              sx={{ mt: 2, fontFamily: 'monospace', fontSize: '0.8rem' }}
            >
              {error.message}
            </Typography>
          )}
        </Alert>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {reset && (
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={reset}
            >
              다시 시도
            </Button>
          )}
          <Button
            variant="outlined"
            component={Link}
            href="/"
            startIcon={<Home />}
          >
            홈으로 이동
          </Button>
        </Box>
      </Box>
    </Container>
  );
}