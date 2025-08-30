// src/app/page.tsx
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Paper,
} from '@mui/material';

import {
  Palette,
  Devices,
  Speed,
  Security,
  Code,
  Design,
} from '@mui/icons-material';
import MainLayout from '@/components/layout/MainLayout';
import ResponsiveGrid from '@/components/common/ResponsiveGrid';
import ThemeToggle from '@/components/common/ThemeToggle';
import Link from 'next/link';

const features = [
  {
    icon: Palette,
    title: '테마 시스템',
    description: '라이트/다크 모드를 지원하는 완전한 테마 시스템',
    color: '#e91e63' as const,
  },
  {
    icon: Devices,
    title: '반응형 디자인',
    description: '모든 디바이스에서 완벽하게 작동하는 반응형 레이아웃',
    color: '#2196f3' as const,
  },
  {
    icon: Speed,
    title: '빠른 성능',
    description: 'Turbopack을 활용한 초고속 개발 및 빌드 환경',
    color: '#ff9800' as const,
  },
  {
    icon: Security,
    title: '타입 안정성',
    description: 'TypeScript로 보장되는 완전한 타입 안정성',
    color: '#4caf50' as const,
  },
  {
    icon: Code,
    title: '최신 기술',
    description: 'Next.js 15 App Router와 최신 React 기능 활용',
    color: '#9c27b0' as const,
  },
  {
    icon: Design,
    title: 'Material Design',
    description: 'Google Material Design 3.0을 따르는 현대적 UI',
    color: '#f44336' as const,
  },
];

export default function HomePage() {
  return (
    <MainLayout>
      {/* 히어로 섹션 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Next.js 스타일링 & 레이아웃
              </Typography>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                }}
              >
                Material-UI와 함께 만드는 현대적이고 반응형인 웹 애플리케이션
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/examples"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  예제 보기
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/docs"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  문서 보기
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <ThemeToggle />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 특징 섹션 */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 2, fontWeight: 600 }}
        >
          주요 특징
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          현대적인 웹 개발을 위한 모든 도구와 컴포넌트를 제공합니다
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: `${feature.color}20`,
                        mb: 2,
                      }}
                    >
                      <IconComponent
                        sx={{ fontSize: 32, color: feature.color }}
                      />
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* 기술 스택 섹션 */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            사용된 기술
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {[
              'Next.js 15',
              'React 18',
              'TypeScript',
              'Material-UI v5',
              'Emotion',
              'Turbopack',
            ].map((tech) => (
              <Grid item key={tech}>
                <Chip
                  label={tech}
                  variant="outlined"
                  size="large"
                  sx={{
                    fontSize: '1rem',
                    height: 40,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 반응형 그리드 섹션 */}
      <ResponsiveGrid />

      {/* CTA 섹션 */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ color: 'white', fontWeight: 700 }}
          >
            지금 시작해보세요!
          </Typography>
          <Typography
            variant="h6"
            paragraph
            sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4 }}
          >
            완성도 높은 컴포넌트와 레이아웃으로 빠르게 프로젝트를 시작하세요
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/getting-started"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            시작하기
          </Button>
        </Container>
      </Paper>
    </MainLayout>
  );
}