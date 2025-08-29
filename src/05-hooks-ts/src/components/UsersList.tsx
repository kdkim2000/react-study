// src/components/UsersList.tsx
import Grid from '@mui/material/Grid'; // MUI v6 Grid2
import Typography from '@mui/material/Typography';
import type { User } from '../lib/api';
import UserCard from './UserCard';

type Props = { users: User[] };

export default function UsersList({ users }: Props) {
  if (users.length === 0) {
    return <Typography color="text.secondary">결과가 없습니다.</Typography>;
  }
  return (
    <Grid container spacing={1.5}>
      {users.map((u) => (
        <Grid key={u.id} size={{ xs: 12, sm: 6 }}>
          <UserCard user={u} />
        </Grid>
      ))}
    </Grid>
  );
}
