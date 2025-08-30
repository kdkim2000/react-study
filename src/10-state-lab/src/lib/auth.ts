//src/lib/auth.ts (추가된 파일 - 누락된 auth API)
export type User = {
  id: number;
  name: string;
  username: string;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: User;
};

// Mock API functions
export const loginApi = async (input: LoginInput): Promise<LoginResult> => {
  // 간단한 mock 로그인
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연
  
  if (input.username === 'admin' && input.password === 'pass') {
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: 1,
        name: '관리자',
        username: input.username
      }
    };
  } else {
    throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
  }
};

export const logoutApi = async (): Promise<void> => {
  // Mock logout
  await new Promise(resolve => setTimeout(resolve, 500));
};
