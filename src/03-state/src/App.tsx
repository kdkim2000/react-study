// src/App.tsx
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CounterButton from './components/CounterButton';
import ControlledInput from './components/ControlledInput';
import ProfileForm from './components/ProfileForm';

// Roboto 폰트 적용(선택)
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
      <Container maxWidth="md" sx={{ py: 4, display: 'grid', gap: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          03. 상태관리와 이벤트 처리 (TS)
        </Typography>

        <Box component="section">
          <Typography variant="h5" fontWeight={700} gutterBottom>
            useState 기본
          </Typography>
          <CounterButton />
        </Box>

        <Divider />

        <Box component="section">
          <Typography variant="h5" fontWeight={700} gutterBottom>
            onChange로 제어되는 입력
          </Typography>
          <ControlledInput />
        </Box>

        <Divider />

        <Box component="section">
          <Typography variant="h5" fontWeight={700} gutterBottom>
            양방향 바인딩: 폼
          </Typography>
          <ProfileForm />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
