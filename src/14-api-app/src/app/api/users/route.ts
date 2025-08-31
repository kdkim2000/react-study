// src/app/api/users/route.ts
import { NextRequest } from 'next/server'
import { dataStore } from '@/lib/data-store'
import { 
  createSuccessResponse, 
  createErrorResponse, 
  validateRequestBody,
  validateEmail 
} from '@/lib/api-utils'
import { CreateUserRequest } from '@/types/user'

// GET /api/users - 모든 사용자 조회
export async function GET() {
  try {
    const users = dataStore.getAllUsers()
    return createSuccessResponse(users, `${users.length}명의 사용자를 조회했습니다.`)
  } catch (error) {
    return createErrorResponse('사용자 조회 중 오류가 발생했습니다.', 500)
  }
}

// POST /api/users - 새 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await validateRequestBody(request)
    
    // 유효성 검사
    if (!body.name || !body.email) {
      return createErrorResponse('이름과 이메일은 필수 항목입니다.')
    }

    if (!validateEmail(body.email)) {
      return createErrorResponse('유효하지 않은 이메일 형식입니다.')
    }

    // 이메일 중복 확인
    const existingUsers = dataStore.getAllUsers()
    if (existingUsers.some(user => user.email === body.email)) {
      return createErrorResponse('이미 존재하는 이메일입니다.')
    }

    const newUser = dataStore.createUser(body.name, body.email)
    return createSuccessResponse(newUser, '사용자가 성공적으로 생성되었습니다.')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '사용자 생성 중 오류가 발생했습니다.'
    return createErrorResponse(errorMessage, 500)
  }
}