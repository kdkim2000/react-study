// components/BlogContent.tsx
'use client';

import {
  Box,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const ContentWrapper = styled(Box)(({ theme }) => ({
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  '& h1': {
    fontSize: '2rem',
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: theme.spacing(1),
  },
  '& h2': {
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
  },
  '& h3': {
    fontSize: '1.25rem',
  },
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.8,
    fontSize: '1rem',
  },
  '& pre': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
  '& code': {
    backgroundColor: theme.palette.grey[100],
    padding: '2px 4px',
    borderRadius: 4,
    fontSize: '0.875rem',
    fontFamily: 'Monaco, Consolas, monospace',
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    margin: theme.spacing(2, 0),
    fontStyle: 'italic',
    backgroundColor: theme.palette.grey[50],
    padding: theme.spacing(1, 2),
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        backgroundColor: 'transparent',
      }}
    >
      <ContentWrapper>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ContentWrapper>
    </Paper>
  );
}