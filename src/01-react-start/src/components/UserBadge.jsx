// src/components/UserBadge.jsx
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
export default function UserBadge({ name, role = 'Member' }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Stack direction="row" spacing={1}>
        <Chip label={name} />
        <Chip label={role} variant="outlined" />
      </Stack>
    </Box>
  );
}