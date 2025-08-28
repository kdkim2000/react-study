// src/components/Hello.jsx
export default function Hello() {
  const now = new Date().toLocaleTimeString();
  return (
    <>
      <h2>안녕하세요 👋</h2>
      <p>지금 시각: {now}</p>
    </>
  );
}