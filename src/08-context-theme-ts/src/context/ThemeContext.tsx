// src/context/ThemeContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';

export type ThemeOption = 'light' | 'dark' | 'system';
export type EffectiveTheme = 'light' | 'dark';

type ThemeState = {
  option: ThemeOption;        // 사용자가 고른 옵션
  effective: EffectiveTheme;  // 실제 적용 테마 (system → light/dark로 해석)
};

type Action =
  | { type: 'SET_OPTION'; option: ThemeOption }
  | { type: 'SYSTEM_CHANGED'; system: EffectiveTheme };

const THEME_KEY = 'app.theme.option';

function getSystemTheme(): EffectiveTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialOption(): ThemeOption {
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemeOption | null;
    return saved ?? 'system';
  } catch {
    return 'system';
  }
}

function computeEffective(option: ThemeOption): EffectiveTheme {
  return option === 'system' ? getSystemTheme() : option;
}

function reducer(state: ThemeState, action: Action): ThemeState {
  switch (action.type) {
    case 'SET_OPTION': {
      const nextEff = computeEffective(action.option);
      return { option: action.option, effective: nextEff };
    }
    case 'SYSTEM_CHANGED': {
      if (state.option !== 'system') return state;
      return { ...state, effective: action.system };
    }
    default:
      return state;
  }
}

/** Contexts (상태/메서드 분리) */
const ThemeStateContext = createContext<ThemeState | null>(null);
const ThemeMethodsContext = createContext<{ setOption: (o: ThemeOption) => void; toggle: () => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const initialOption = getInitialOption();

  const [state, dispatch] = useReducer(reducer, {
    option: initialOption,
    effective: computeEffective(initialOption),
  });

  /** DOM에 data-theme 반영 */
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', state.effective);
    }
  }, [state.effective]);

  /** 옵션 영속화 */
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, state.option);
    } catch { /* empty */ }
  }, [state.option]);

  /** 시스템 테마 변화 감지 (option === 'system'일 때만) */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mql) return;

    const applyFromSystem = () =>
      dispatch({ type: 'SYSTEM_CHANGED', system: mql.matches ? 'dark' : 'light' });

    if (state.option === 'system') {
      // 최신 브라우저
      if ('addEventListener' in mql) {
        mql.addEventListener('change', applyFromSystem);
        return () => mql.removeEventListener('change', applyFromSystem);
      }
      // 구형 브라우저
      // @ts-expect-error legacy API
      mql.addListener?.(applyFromSystem);
      return () => {
        // @ts-expect-error legacy API
        mql.removeListener?.(applyFromSystem);
      };
    }
  }, [state.option]);

  /** 편의 메서드 */
  const setOption = useCallback((option: ThemeOption) => {
    dispatch({ type: 'SET_OPTION', option });
  }, []);

  const toggle = useCallback(() => {
    const next: EffectiveTheme = state.effective === 'dark' ? 'light' : 'dark';
    dispatch({ type: 'SET_OPTION', option: next });
  }, [state.effective]);

  /** value 메모이제이션 */
  const stateValue = useMemo(() => state, [state]);
  const methodsValue = useMemo(() => ({ setOption, toggle }), [setOption, toggle]);

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeMethodsContext.Provider value={methodsValue}>
        {children}
      </ThemeMethodsContext.Provider>
    </ThemeStateContext.Provider>
  );
}

/** 읽기 전용 상태 */
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeState(): ThemeState {
  const ctx = useContext(ThemeStateContext);
  if (!ctx) throw new Error('useThemeState must be used within ThemeProvider');
  return ctx;
}

/** 액션 메서드 훅 */
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeActions() {
  const ctx = useContext(ThemeMethodsContext);
  if (!ctx) throw new Error('useThemeActions must be used within ThemeProvider');
  return ctx;
}

/** 합쳐서 쓰기 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return { ...useThemeState(), ...useThemeActions() };
}
