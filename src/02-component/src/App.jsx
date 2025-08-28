// src/App.jsx
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Hello from './components/Hello';
import UserBadge from './components/UserBadge';
import Card from './components/Card';
import Panel from './components/Panel';

export default function App() {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        JSX & 컴포넌트 기초
      </Typography>
      <Hello />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h4" fontWeight={800} gutterBottom>
        props 기본
      </Typography>
      <Box sx={{ display: 'grid', gap: 1.5 }}>
        <UserBadge name="김경덕" role="Software Engineer" />
        <UserBadge name="홍길동" /> {/* role 기본값: Member */}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Card title="공지">
        <Typography>
          리액트 스터디는 매주 화/목 19:00에 진행합니다.
        </Typography>
      </Card>

      <Card
        title="업무 가이드"
        footer={<Typography variant="caption">마지막 업데이트: 2025-08-27</Typography>}
      >
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>PR은 최소 1명 리뷰 후 머지</li>
          <li>Lint 에러 0 유지</li>
          <li>커밋 메시지 규칙: feat/fix/chore 등 prefix</li>
        </ul>
      </Card>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h4" fontWeight={800} gutterBottom>
        Compound Components
      </Typography>
      <Panel>
        <Panel.Header>프로젝트 알림</Panel.Header>
        <Panel.Body>이번 스프린트 목표는 성능 30% 개선입니다.</Panel.Body>
        <Panel.Footer>담당: FE Chapter</Panel.Footer>
      </Panel>
    </Container>
  );
}
