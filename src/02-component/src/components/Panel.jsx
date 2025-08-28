// src/components/Panel.jsx
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function Panel({ children }) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {children}
    </Paper>
  );
}

function PanelHeader({ children }) {
  return (
    <Box
      sx={{
        px: 1.5,
        py: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        fontWeight: 700,
      }}
    >
      {children}
    </Box>
  );
}

function PanelBody({ children }) {
  return <Box sx={{ px: 1.5, py: 1.5 }}>{children}</Box>;
}

function PanelFooter({ children }) {
  return (
    <Box sx={{ px: 1.5, py: 1.5, borderTop: 1, borderColor: 'divider' }}>
      {children}
    </Box>
  );
}

Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

export default Panel;
