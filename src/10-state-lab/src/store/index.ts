//src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counter from './counterSlice';
import auth, { hydrate } from './authSlice';

const KEY = 'state.auth';

function loadAuth() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.token && parsed?.user) return parsed;
  } catch {/*no-empty*/}
  return null;
}

export const store = configureStore({
  reducer: { counter, auth },
});

const restored = loadAuth();
if (restored) store.dispatch(hydrate(restored));

store.subscribe(() => {
  const s = store.getState();
  try {
    if (s.auth.token && s.auth.user) {
      localStorage.setItem(KEY, JSON.stringify({ token: s.auth.token, user: s.auth.user }));
    } else {
      localStorage.removeItem(KEY);
    }
  } catch {/*localStorage 접근 실패 시 무시 (의도적으로 빈 처리)*/}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
