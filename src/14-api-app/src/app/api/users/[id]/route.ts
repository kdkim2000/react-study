// src/app/api/users/[id]/route.ts
import { NextRequest } from 'next/server'
import { dataStore } from '@/lib/data-store'
import { 
  createSuccessResponse, 
  createErrorResponse, 
  validateRequestBody,
  validateEmail 
} from '@/lib/api-utils'
import { UpdateUserRequest } from '@/types/user'

interface RouteParams {
  params: {
    id: string
  }
}

// GET /api/users/[id] - 특정 사용자 조회
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return createErrorResponse('유효하지 않은 사용자 ID입니다.')
    }

    const user = dataStore.getUserById(id)
    
    if (!user) {
      return createErrorResponse('사용자를 찾을 수 없습니다.', 404)
    }

    return createSuccessResponse(user, '사용자 정보를 조회했습니다.')
  } catch (error) {
    return createErrorResponse('사용자 조회 중 오류가 발생했습니다.', 500)
  }
}

// PUT /api/users/[id] - 사용자 정보 수정
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return createErrorResponse('유효하지 않은 사용자 ID입니다.')
    }

    const body: UpdateUserRequest = await validateRequestBody(request)

    // 이메일 유효성 검사
    if (body.email && !validateEmail(body.email)) {
      return createErrorResponse('유효하지 않은 이메일 형식입니다.')
    }

    // 이메일 중복 확인 (자신 제외)
    if (body.email) {
      const existingUsers = dataStore.getAllUsers()
      if (existingUsers.some(user => user.email === body.email && user.id !== id)) {
        return createErrorResponse('이미 존재하는 이메일입니다.')
      }
    }

    const updatedUser = dataStore.updateUser(id, body)
    
    if (!updatedUser) {
      return createErrorResponse('사용자를 찾을 수 없습니다.', 404)
    }

    return createSuccessResponse(updatedUser, '사용자 정보가 성공적으로 수정되었습니다.')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '사용자 수정 중 오류가 발생했습니다.'
    return createErrorResponse(errorMessage, 500)
  }
}

// DELETE /api/users/[id] - 사용자 삭제
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return createErrorResponse('유효하지 않은 사용자 ID입니다.')
    }

    const deleted = dataStore.deleteUser(id)
    
    if (!deleted) {
      return createErrorResponse('사용자를 찾을 수 없습니다.', 404)
    }

    return createSuccessResponse(null, '사용자가 성공적으로 삭제되었습니다.')
  } catch (error) {
    return createErrorResponse('사용자 삭제 중 오류가 발생했습니다.', 500)
  }
}