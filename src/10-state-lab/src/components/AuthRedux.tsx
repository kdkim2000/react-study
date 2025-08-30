//src/components/AuthRedux.tsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Chip,
  CircularProgress
} from '@mui/material';
import { Login, Logout, Person } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginThunk, logoutThunk } from '../store/authSlice';

export default function AuthRedux() {
  const { token, user, status, error } = useAppSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('pass');

  const login = () => dispatch(loginThunk({ username, password }));
  const logout = () => dispatch(logoutThunk());

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Redux Auth
        </Typography>
        
        {token ? (
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Person color="primary" />
              <Typography>
                안녕하세요, <strong>{user?.name}</strong> 님!
              </Typography>
            </Box>
            
            <Chip 
              label={`Token: ${token.slice(0, 16)}...`}
              variant="outlined"
              size="small"
              sx={{ mb: 2, fontFamily: 'monospace' }}
            />
            
            <Box>
              <Button 
                variant="contained" 
                color="error"
                onClick={logout}
                startIcon={<Logout />}
              >
                로그아웃
              </Button>
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={(e) => { e.preventDefault(); login(); }}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            
            <Box mt={2}>
              <Button 
                fullWidth
                variant="contained"
                onClick={login}
                disabled={status === 'loading'}
                startIcon={status === 'loading' ? <CircularProgress size={20} /> : <Login />}
              >
                {status === 'loading' ? '로그인 중…' : '로그인'}
              </Button>
            </Box>
            
            {status === 'error' && (
              <Box mt={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

