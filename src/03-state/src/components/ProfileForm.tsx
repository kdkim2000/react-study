// src/components/ProfileForm.tsx
import { useState } from 'react';

type Role = 'admin' | 'user' | 'guest';

type FormState = {
  name: string;
  age: number | '';     // 빈 문자열 허용 (입력 지울 때)
  role: Role;
  agree: boolean;
};

const initialForm: FormState = {
  name: '',
  age: '',
  role: 'user',
  agree: false,
};

export default function ProfileForm() {
  const [form, setForm] = useState<FormState>(initialForm);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'age'
            ? (value === '' ? '' : Number(value))
            : value,
    }));
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as Role;
    setForm((prev) => ({ ...prev, role: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 실제 환경에서는 여기서 서버로 제출
    alert(`제출 데이터\n${JSON.stringify(form, null, 2)}`);
  }

  const canSubmit =
    form.name.trim() !== '' &&
    typeof form.age === 'number' &&
    form.age > 0 &&
    form.agree;

  const reset = () => setForm(initialForm);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <label>
        이름
        <input
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="홍길동"
        />
      </label>

      <label>
        나이
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleInputChange}
          placeholder="0"
          min={0}
        />
      </label>

      <label>
        역할(Role)
        <select name="role" value={form.role} onChange={handleSelectChange}>
          <option value="user">user</option>
          <option value="admin">admin</option>
          <option value="guest">guest</option>
        </select>
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          name="agree"
          type="checkbox"
          checked={form.agree}
          onChange={handleInputChange}
        />
        개인정보 처리에 동의합니다.
      </label>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={!canSubmit}>제출</button>
        <button type="button" onClick={reset}>초기화</button>
      </div>

      <pre style={{ background: '#f7f7f7', padding: 12, borderRadius: 8 }}>
{JSON.stringify(form, null, 2)}
      </pre>
    </form>
  );
}