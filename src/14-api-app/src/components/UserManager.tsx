// src/components/UserManager.tsx
'use client'

import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material'
import { Add, Edit, Delete, Refresh } from '@mui/icons-material'

// 타입 정의를 인라인으로 포함 (실제로는 별도 파일에서 import)
interface User {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface CreateUserRequest {
  name: string
  email: string
}

interface UpdateUserRequest {
  name?: string
  email?: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // 대화상자 상태
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })

  // 사용자 목록 조회
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/users')
      const result: ApiResponse<User[]> = await response.json()
      
      if (result.success && result.data) {
        setUsers(result.data)
        setSuccess(result.message || '사용자 목록을 조회했습니다.')
      } else {
        setError(result.error || '사용자 목록 조회에 실패했습니다.')
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 사용자 생성
  const createUser = async (userData: CreateUserRequest) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      const result: ApiResponse<User> = await response.json()
      
      if (result.success) {
        setSuccess(result.message || '사용자가 생성되었습니다.')
        fetchUsers()
        return true
      } else {
        setError(result.error || '사용자 생성에 실패했습니다.')
        return false
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.')
      return false
    }
  }

  // 사용자 수정
  const updateUser = async (id: number, userData: UpdateUserRequest) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      
      const result: ApiResponse<User> = await response.json()
      
      if (result.success) {
        setSuccess(result.message || '사용자가 수정되었습니다.')
        fetchUsers()
        return true
      } else {
        setError(result.error || '사용자 수정에 실패했습니다.')
        return false
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.')
      return false
    }
  }

  // 사용자 삭제
  const deleteUser = async (id: number) => {
    if (!window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      return
    }
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      
      const result: ApiResponse<null> = await response.json()
      
      if (result.success) {
        setSuccess(result.message || '사용자가 삭제되었습니다.')
        fetchUsers()
      } else {
        setError(result.error || '사용자 삭제에 실패했습니다.')
      }
    } catch (error) {
      setError('네트워크 오류가 발생했습니다.')
    }
  }

  // 대화상자 열기
  const openCreateDialog = () => {
    setDialogMode('create')
    setFormData({ name: '', email: '' })
    setOpenDialog(true)
  }

  const openEditDialog = (user: User) => {
    setDialogMode('edit')
    setSelectedUser(user)
    setFormData({ name: user.name, email: user.email })
    setOpenDialog(true)
  }

  // 폼 제출
  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('이름과 이메일을 입력해주세요.')
      return
    }

    let success = false
    
    if (dialogMode === 'create') {
      success = await createUser(formData)
    } else if (selectedUser) {
      success = await updateUser(selectedUser.id, formData)
    }

    if (success) {
      setOpenDialog(false)
    }
  }

  // 초기 데이터 로드
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          사용자 관리
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchUsers}
            disabled={loading}
            sx={{ mr: 2 }}
          >
            새로고침
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openCreateDialog}
          >
            사용자 추가
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>이메일</TableCell>
                    <TableCell>생성일</TableCell>
                    <TableCell>수정일</TableCell>
                    <TableCell align="center">작업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        등록된 사용자가 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                        </TableCell>
                        <TableCell>
                          {new Date(user.updatedAt).toLocaleDateString('ko-KR')}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => openEditDialog(user)}
                            size="small"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => deleteUser(user.id)}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* 사용자 추가/수정 대화상자 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? '사용자 추가' : '사용자 수정'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="이름"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="이메일"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleSubmit} variant="contained">
            {dialogMode === 'create' ? '추가' : '수정'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 알림 스낵바 */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  )
}
