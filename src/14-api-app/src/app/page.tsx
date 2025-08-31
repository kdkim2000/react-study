// src/app/page.tsx
import { AppBar, Toolbar, Typography } from '@mui/material'
import UserManager from '@/components/UserManager'

export default function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Next.js API Routes 실습
          </Typography>
        </Toolbar>
      </AppBar>
      <UserManager />
    </>
  )
}