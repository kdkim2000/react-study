// src/components/layout/Header.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Home,
  Info,
  Work,
  ContactMail,
  Close,
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../providers/ThemeProvider';

const navigationItems = [
  { label: '홈', href: '/', icon: Home },
  { label: '소개', href: '/about', icon: Info },
  { label: '서비스', href: '/services', icon: Work },
  { label: '연락처', href: '/contact', icon: ContactMail },
];

export default function Header() {
  const theme = useTheme();
  const { toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 모바일 드로어 컨텐츠
  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Typography variant="h6" component="div">
          메뉴
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <ListItem key={item.label} component={Link} href={item.href}>
              <ListItemIcon>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <ListItem>
        <ListItemIcon>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </ListItemIcon>
        <ListItemText primary="테마 변경" />
        <IconButton onClick={toggleTheme}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </ListItem>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          {/* 로고 */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 0,
              mr: 4,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            MyApp
          </Typography>

          {/* 데스크톱 네비게이션 */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* 테마 토글 버튼 */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* 사용자 메뉴 */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>프로필</MenuItem>
            <MenuItem onClick={handleClose}>설정</MenuItem>
            <MenuItem onClick={handleClose}>로그아웃</MenuItem>
          </Menu>

          {/* 모바일 햄버거 메뉴 */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* 모바일 드로어 */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // 성능상 이점을 위해
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}