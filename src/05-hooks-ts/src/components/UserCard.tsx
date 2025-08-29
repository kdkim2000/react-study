// src/components/UserCard.tsx
import * as React from 'react';
import type { User } from '../lib/api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';

type Props = { user: User };

export default function UserCard({ user }: Props) {
  const initial = user.name?.trim()?.charAt(0).toUpperCase() || 'U';
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar>
            {initial}
          </Avatar>
        }
        title={user.name}
        subheader={`@${user.username}`}
        sx={{ '& .MuiCardHeader-title': { fontWeight: 700 } }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon fontSize="small" />
          <Link href={`mailto:${user.email}`} underline="hover">
            {user.email}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
