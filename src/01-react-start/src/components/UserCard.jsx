import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';

export default function UserCard({ name }) {
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{(name ?? 'U')[0]}</Avatar>}
        title="사용자"
        subheader="환영합니다!"
        sx={{ '& .MuiCardHeader-title': { fontWeight: 700 } }}
      />
      <Divider />
      <CardContent>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WavingHandRoundedIcon color="warning" />
          {name} 님 반갑습니다 🙌
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          이 카드 컴포넌트는 Material UI의 Card/Avatar/Typography를 사용해 구성했습니다.
        </Typography>
      </CardContent>
    </Card>
  );
}
