// src/components/common/ThemeToggle.tsx
'use client';

import React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  SettingsBrightness,
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '@/components/providers/ThemeProvider';

export default function ThemeToggle() {
  const theme = useTheme();
  const { mode, setThemeMode } = useCustomTheme();

  const handleThemeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: string | null,
  ) => {
    if (newMode !== null) {
      setThemeMode(newMode as 'light' | 'dark' | 'system');
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        테마 설정
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        원하는 테마를 선택하거나 시스템 설정을 따를 수 있습니다.
      </Typography>
      
      <Box sx={{ mt: 2 }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleThemeChange}
          aria-label="theme selection"
          fullWidth
        >
          <ToggleButton value="light" aria-label="light theme">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Brightness7 />
              <Typography variant="body2">라이트</Typography>
            </Box>
          </ToggleButton>
          <ToggleButton value="dark" aria-label="dark theme">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Brightness4 />
              <Typography variant="body2">다크</Typography>
            </Box>
          </ToggleButton>
          <ToggleButton value="system" aria-label="system theme">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsBrightness />
              <Typography variant="body2">시스템</Typography>
            </Box>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.action.hover, borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          현재 테마: {theme.palette.mode === 'dark' ? '다크 모드' : '라이트 모드'}
        </Typography>
      </Box>
    </Paper>
  );
}