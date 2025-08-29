import { createRoot } from 'react-dom/client';
import App from './App';

// Roboto 폰트(권장)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// (선택) 글로벌 CSS가 필요하면 유지
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
