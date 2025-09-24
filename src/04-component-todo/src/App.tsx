import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TodoApp from './components/TodoApp';

// Roboto 폰트 (선택)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: { mode: 'light', primary: { main: '#1976d2' } },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: [
      'Roboto',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'system-ui',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" fontWeight={1000}>
            ToDo List (MUI)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            컴포넌트 구조화 + 상태/이벤트 처리
          </Typography>
        </Box>
        <TodoApp />
      </Container>
    </ThemeProvider>
  );
}
