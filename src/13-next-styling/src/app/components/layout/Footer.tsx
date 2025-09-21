// src/components/layout/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  GitHub,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: LinkedIn, href: 'https://linkedin.com' },
  { name: 'GitHub', icon: GitHub, href: 'https://github.com' },
];

const footerSections = [
  {
    title: '서비스',
    links: [
      { name: '웹 개발', href: '/services/web' },
      { name: '모바일 앱', href: '/services/mobile' },
      { name: 'UI/UX 디자인', href: '/services/design' },
      { name: '컨설팅', href: '/services/consulting' },
    ],
  },
  {
    title: '회사',
    links: [
      { name: '소개', href: '/about' },
      { name: '팀', href: '/team' },
      { name: '채용', href: '/careers' },
      { name: '뉴스', href: '/news' },
    ],
  },
  {
    title: '고객지원',
    links: [
      { name: 'FAQ', href: '/faq' },
      { name: '문의하기', href: '/contact' },
      { name: '기술지원', href: '/support' },
      { name: '문서', href: '/docs' },
    ],
  },
];

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[900] 
          : theme.palette.grey[100],
        mt: 'auto',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* 회사 정보 */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              MyApp
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              혁신적인 웹 솔루션을 제공하는 기술 회사입니다. 
              고객의 비즈니스 성장을 위한 최적의 디지털 경험을 만들어갑니다.
            </Typography>
            
            {/* 연락처 정보 */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="text.secondary">
                  contact@myapp.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="text.secondary">
                  +82 2-1234-5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1, fontSize: '1rem' }} />
                <Typography variant="body2" color="text.secondary">
                  서울특별시 강남구 테헤란로 123
                </Typography>
              </Box>
            </Box>

            {/* 소셜 미디어 링크 */}
            <Box>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <IconButton
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    <IconComponent fontSize="small" />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>

          {/* 링크 섹션들 */}
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={2.67} key={section.title}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {section.title}
              </Typography>
              <Box>
                {section.links.map((link) => (
                  <Typography
                    key={link.name}
                    variant="body2"
                    component={Link}
                    href={link.href}
                    sx={{
                      display: 'block',
                      color: 'text.secondary',
                      textDecoration: 'none',
                      py: 0.5,
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.name}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* 저작권 정보 */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} MyApp. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="body2"
              component={Link}
              href="/privacy"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              개인정보처리방침
            </Typography>
            <Typography
              variant="body2"
              component={Link}
              href="/terms"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              이용약관
            </Typography>
            <Typography
              variant="body2"
              component={Link}
              href="/cookies"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              쿠키 정책
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}