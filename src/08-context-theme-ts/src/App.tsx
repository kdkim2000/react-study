// src/App.tsx
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import DemoCard from './components/DemoCard';

export default function App() {
  return (
    <ThemeProvider>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: 24, display: 'grid', gap: 16 }}>
        <h1>08. Context API — 다크모드 전환</h1>
        <ThemeToggle />
        <div style={{ display: 'grid', gap: 12 }}>
          <DemoCard />
          <DemoCard />
        </div>
      </main>
    </ThemeProvider>
  );
}
