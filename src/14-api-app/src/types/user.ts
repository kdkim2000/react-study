// src/types/user.ts
export interface User {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  name: string
  email: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}