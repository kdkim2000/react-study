//src/store/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, logoutApi, type User, type LoginInput } from '../lib/auth';

type Status = 'idle' | 'loading' | 'error';
type AuthState = {
  token: string | null;
  user: User | null;
  status: Status;
  error?: string;
};

const initialState: AuthState = { token: null, user: null, status: 'idle' };

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (input: LoginInput, { rejectWithValue }) => {
    try { 
      return await loginApi(input); 
    }
    catch (e: unknown) { 
      const errorMessage = e instanceof Error ? e.message : '로그인 실패';
      return rejectWithValue(errorMessage); 
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrate(state, { payload }: { payload: { token: string; user: User } }) {
      state.token = payload.token;
      state.user = payload.user;
      state.status = 'idle';
      state.error = undefined;
    },
    clear(state) {
      state.token = null; 
      state.user = null; 
      state.status = 'idle'; 
      state.error = undefined;
    }
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => { s.status = 'loading'; s.error = undefined; });
    b.addCase(loginThunk.fulfilled, (s, a) => {
      s.status = 'idle'; s.token = a.payload.token; s.user = a.payload.user;
    });
    b.addCase(loginThunk.rejected, (s, a) => {
      s.status = 'error'; s.error = String(a.payload ?? a.error?.message ?? '오류');
    });
    b.addCase(logoutThunk.fulfilled, (s) => {
      s.token = null; s.user = null; s.status = 'idle'; s.error = undefined;
    });
  }
});

export const { hydrate, clear } = authSlice.actions;
export default authSlice.reducer;