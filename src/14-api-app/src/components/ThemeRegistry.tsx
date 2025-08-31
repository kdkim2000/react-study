// src/components/ThemeRegistry.tsx
'use client'

import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import StyledJsxRegistry from '@/lib/registry'

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

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <StyledJsxRegistry>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledJsxRegistry>
  )
}