// src/components/Card.jsx
import * as React from 'react';
import MuiCard from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';

export default function Card({ title, children, footer }) {
  return (
    <MuiCard variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
      {title && (
        <CardHeader
          title={title}
          sx={{ backgroundColor: 'primary.main', 
                color: 'primary.contrastText',
                '& .MuiCardHeader-title': { fontWeight: 700 } }}
        />
      )}
      <CardContent>{children}</CardContent>
      {footer && (
        <>
          <Divider />
          <CardActions sx={{ px: 2, py: 1.5 }}>{footer}</CardActions>
        </>
      )}
    </MuiCard>
  );
}
