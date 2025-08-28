import ControlledInput from './components/ControlledInput';
import ProfileForm from './components/ProfileForm';

export default function App() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 24 }}>
      <h1>03. 상태관리와 이벤트 처리 (TS)</h1>
      <section>
        <h2>onChange로 제어되는 입력</h2>
        <ControlledInput />
      </section>

      <section>
        <h2>양방향 바인딩: 폼</h2>
        <ProfileForm />
      </section>
    </main>
  );
}