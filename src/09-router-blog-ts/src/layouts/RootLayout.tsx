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
    <Box sx={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 800 }}>
            React Router Blog
          </Typography>
          <Tabs
            value={current}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ ml: 'auto' }}
          >
            <Tab label="Home" value="/" to="/" component={RouterLink} />
            <Tab label="Blog" value="/blog" to="/blog" component={RouterLink} />
            <Tab label="About" value="/about" to="/about" component={RouterLink} />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary' }}>
        © 2025 FE Chapter
      </Box>
    </Box>
  );
}
