import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import type { Filter } from './TodoApp';

type Props = {
  current: Filter;
  onChange: (f: Filter) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const filters: Filter[] = ['all', 'active', 'completed'];

export default function TodoFilters({
  current,
  onChange,
  onClearCompleted,
  completedCount,
}: Props) {
  const handleChange = (_: React.MouseEvent<HTMLElement>, value: Filter | null) => {
    if (value) onChange(value);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <ToggleButtonGroup
        value={current}
        exclusive
        onChange={handleChange}
        size="small"
        aria-label="todo filters"
      >
        {filters.map((f) => (
          <ToggleButton key={f} value={f} aria-label={f}>
            {f}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Chip label={`완료: ${completedCount}`} size="small" variant="outlined" sx={{ ml: 'auto' }} />

      <Button
        onClick={onClearCompleted}
        size="small"
        startIcon={<ClearAllIcon />}
        color="secondary"
      >
        완료 삭제
      </Button>
    </Stack>
  );
}
