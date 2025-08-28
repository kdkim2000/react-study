import * as React from 'react';
import { useState, useMemo } from 'react';

// MUI Theme & Layout
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Fonts (Roboto)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Components
import UserBadge from './components/UserBadge';
import UserCard from './components/UserCard';

export default function App() {
  const [count, setCount] = useState(0);

  // 팀에서 다크/라이트 모드 정책이 있다면 여기서 제어
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
        },
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
        shape: { borderRadius: 12 },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box component="header" sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            안녕하세요, React!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            버튼을 클릭해 카운트를 증가시켜 보세요.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setCount(prev => prev + 1)}
          >
            count: {count}
          </Button>
          <Typography variant="body2" color="text.secondary">
            (Vue의 <code>ref</code>와 비슷하게 상태를 보유합니다)
          </Typography>
        </Stack>

        <UserCard name="김경덕" />

        <Box sx={{ mt: 3, display: 'grid', gap: 1.5 }}>
          <UserBadge name="김경덕" role="Software Engineer" />
          <UserBadge name="홍길동" /> {/* role 기본값: Member */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
