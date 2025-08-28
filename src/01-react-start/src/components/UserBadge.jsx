import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';

function getInitials(name = '') {
  // 한글 이름은 첫 글자만, 영문은 이니셜 2글자
  const trimmed = name.trim();
  if (!trimmed) return '';
  const hasSpace = trimmed.includes(' ');
  if (!hasSpace) return trimmed[0];
  return trimmed
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function UserBadge({ name, role = 'Member' }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 520 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip
          avatar={<Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>{getInitials(name)}</Avatar>}
          label={name}
          color="primary"
          sx={{ fontWeight: 600 }}
        />
        <Chip
          icon={<VerifiedIcon fontSize="small" />}
          label={role}
          variant="outlined"
          color="default"
        />
      </Stack>
    </Box>
  );
}
