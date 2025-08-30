//src/store/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = { value: number };
const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (s) => { s.value += 1; },
    decrement: (s) => { s.value = Math.max(0, s.value - 1); },
    addBy: (s, a: PayloadAction<number>) => { s.value += a.payload; },
    reset: () => initialState,
  }
});

export const { increment, decrement, addBy, reset } = counterSlice.actions;
export default counterSlice.reducer;