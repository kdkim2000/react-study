// src/app/about/page.tsx
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Paper,
} from '@mui/material';
import { Code, Brush, Speed } from '@mui/icons-material';
import MainLayout from '@/components/layout/MainLayout';

const skills = [
  { name: 'React/Next.js', level: 95, color: '#61dafb' },
  { name: 'TypeScript', level: 90, color: '#3178c6' },
  { name: 'Material-UI', level: 88, color: '#0081cb' },
  { name: 'Node.js', level: 85, color: '#339933' },
  { name: 'Python', level: 80, color: '#3776ab' },
  { name: 'AWS', level: 75, color: '#ff9900' },
];

const teamMembers = [
  {
    name: '김개발',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    skills: ['React', 'TypeScript', 'Next.js'],
  },
  {
    name: '이디자인',
    role: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    skills: ['Figma', 'Sketch', 'Adobe XD'],
  },
  {
    name: '박백엔드',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    skills: ['Node.js', 'Python', 'AWS'],
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* 헤더 섹션 */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            우리에 대해
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: '800px', mx: 'auto' }}
          >
            혁신적인 웹 기술로 더 나은 디지털 경험을 만들어가는 개발팀입니다.
            사용자 중심의 사고와 최신 기술을 바탕으로 가치 있는 서비스를 제공합니다.
          </Typography>
        </Box>

        {/* 미션 비전 섹션 */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Code sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                혁신
              </Typography>
              <Typography variant="body1" color="text.secondary">
                최신 기술과 트렌드를 적극 도입하여 혁신적인 솔루션을 제공합니다.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Brush sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                사용자 중심
              </Typography>
              <Typography variant="body1" color="text.secondary">
                사용자의 니즈를 깊이 이해하고 최고의 경험을 제공하기 위해 노력합니다.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Speed sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" component="h3" gutterBottom>
                품질
              </Typography>
              <Typography variant="body1" color="text.secondary">
                코드 품질과 성능을 최우선으로 하여 안정적인 서비스를 구축합니다.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* 팀 소개 */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            팀 소개
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                  />
                  <Typography variant="h5" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                  >
                    {member.role}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    {member.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 기술 스킬 */}
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ mb: 4, fontWeight: 600 }}
          >
            기술 스킬
          </Typography>
          <Grid container spacing={3}>
            {skills.map((skill) => (
              <Grid item xs={12} md={6} key={skill.name}>
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      {skill.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: skill.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </MainLayout>
  );
}