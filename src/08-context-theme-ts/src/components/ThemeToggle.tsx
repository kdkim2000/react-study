import * as React from 'react';
import { useTheme } from '../context/ThemeContext';

import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function ThemeToggle() {
  const { option, effective, setOption, toggle } = useTheme();

  const handleChange = (_: React.MouseEvent<HTMLElement>, value: 'light' | 'dark' | 'system' | null) => {
    if (value) setOption(value);
  };

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label={`option: ${option}`} size="small" variant="outlined" />
        <Chip label={`effective: ${effective}`} size="small" />
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <ToggleButtonGroup value={option} exclusive onChange={handleChange} size="small" aria-label="theme options">
          <ToggleButton value="light" aria-label="light">
            <LightModeIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="dark">
            <DarkModeIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="system" aria-label="system">
            <SettingsSuggestIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Button onClick={toggle} startIcon={<SwapHorizIcon />} sx={{ ml: 'auto' }}>
          Toggle
        </Button>
      </Stack>
    </Stack>
  );
}
