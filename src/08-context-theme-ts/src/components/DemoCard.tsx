import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function DemoCard() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          카드 컴포넌트
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          전역 테마(라이트/다크)에 따라 배경/텍스트/보더 색상이 자동으로 바뀝니다.
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained">확인</Button>
        <Button variant="text">취소</Button>
      </CardActions>
    </Card>
  );
}
