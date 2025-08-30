//src/AppRedux.tsx
import React from 'react';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CounterRedux from './components/CounterRedux';
import AuthRedux from './components/AuthRedux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function AppRedux() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          전역 상태 — Redux Toolkit
        </Typography>
        
        <Box display="flex" flexDirection="column" gap={3}>
          <AuthRedux />
          <CounterRedux />
        </Box>
      </Container>
    </ThemeProvider>
  );
}