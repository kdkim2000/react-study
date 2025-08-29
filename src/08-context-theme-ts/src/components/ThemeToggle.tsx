// src/components/ThemeToggle.tsx
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { option, effective, setOption, toggle } = useTheme();
  return (
    <div className="card" style={{ display: 'grid', gap: 8 }}>
      <strong>Theme</strong>
      <div className="small">
        option: <code>{option}</code> / effective: <code>{effective}</code>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => setOption('light')}>Light</button>
        <button onClick={() => setOption('dark')}>Dark</button>
        <button onClick={() => setOption('system')}>System</button>
        <button onClick={toggle} style={{ marginLeft: 'auto' }}>Toggle</button>
      </div>
    </div>
  );
}
