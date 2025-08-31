// src/components/ClientApp.tsx
'use client'

import React from 'react'
import UserManager from '@/components/UserManager'
import { AppBar, Toolbar, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export default function ClientApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Next.js API Routes 실습
          </Typography>
        </Toolbar>
      </AppBar>
      <UserManager />
    </ThemeProvider>
  )
}