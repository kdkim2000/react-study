// src/lib/api-utils.ts
import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse } from '@/types/user'

export function createSuccessResponse<T>(data: T, message?: string): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message
  }
  return NextResponse.json(response)
}

export function createErrorResponse(error: string, status: number = 400): NextResponse {
  const response: ApiResponse<never> = {
    success: false,
    error
  }
  return NextResponse.json(response, { status })
}

export async function validateRequestBody(request: NextRequest) {
  try {
    return await request.json()
  } catch {
    throw new Error('Invalid JSON in request body')
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}