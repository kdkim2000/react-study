import * as React from 'react';
import { ThemeProvider as AppThemeProvider, useTheme } from './context/ThemeContext';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ThemeToggle from './components/ThemeToggle';
import DemoCard from './components/DemoCard';

function ThemeBridge({ children }: { children: React.ReactNode }) {
  const { effective } = useTheme();
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: { mode: effective }, // 'light' | 'dark'
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
      }),
    [effective]
  );

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}

export default function App() {
  return (
    <AppThemeProvider>
      <ThemeBridge>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: 4, display: 'grid', gap: 2 }}>
          <Typography variant="h4" fontWeight={800}>
            08. Context API — 다크모드 전환 (MUI)
          </Typography>

          <ThemeToggle />

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'grid', gap: 2 }}>
            <DemoCard />
            <DemoCard />
          </Box>
        </Container>
      </ThemeBridge>
    </AppThemeProvider>
  );
}
