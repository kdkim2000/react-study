// src/App.tsx
import * as React from 'react';
import UsersPage from './pages/UsersPage';
import ResizeWatcher from './components/ResizeWatcher';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Roboto 폰트(선택)
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
      <UsersPage />
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <ResizeWatcher />
      </Box>
    </ThemeProvider>
  );
}
