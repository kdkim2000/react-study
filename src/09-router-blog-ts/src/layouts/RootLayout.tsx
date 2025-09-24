// src/layouts/RootLayout.tsx
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function RootLayout() {
  const { pathname } = useLocation();
  const current = pathname.startsWith('/blog')
    ? '/blog'
    : pathname === '/about'
    ? '/about'
    : '/';

  return (
    <Box sx={{ 
      minHeight: '100dvh', 
      display: 'grid', 
      gridTemplateRows: 'auto 1fr auto',
      overflow: 'hidden' // 전체 레이아웃이 화면을 벗어나지 않도록
    }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ gap: 2, minHeight: 64 }}> {/* 헤더 높이 고정 */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 800,
              flexShrink: 0, // 로고는 줄어들지 않도록
              maxWidth: { xs: '120px', sm: 'none' }, // 모바일에서 로고 최대 폭 제한
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            React Router Blog
          </Typography>
          <Tabs
            value={current}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ 
              ml: 'auto',
              minHeight: 48, // 탭 높이 고정
              '& .MuiTab-root': {
                minWidth: { xs: 60, sm: 80 }, // 탭 최소 폭 설정
                minHeight: 48
              }
            }}
            variant="scrollable" // 필요시 스크롤 가능하도록
            scrollButtons="auto"
          >
            <Tab label="Home" value="/" to="/" component={RouterLink} />
            <Tab label="Blog" value="/blog" to="/blog" component={RouterLink} />
            <Tab label="About" value="/about" to="/about" component={RouterLink} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="md" 
        sx={{ 
          py: 3,
          overflow: 'hidden', // 컨테이너가 화면을 벗어나지 않도록
          width: '100%',
          maxWidth: '100%'
        }}
      >
        <Box sx={{ 
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden' // 내용이 컨테이너를 벗어나지 않도록
        }}>
          <Outlet />
        </Box>
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          textAlign: 'center', 
          color: 'text.secondary',
          minHeight: 56, // 푸터 높이 고정
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        © 2025 FE Chapter
      </Box>
    </Box>
  );
}