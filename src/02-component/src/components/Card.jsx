// src/components/Card.jsx
export default function Card({ title, children, footer }) {
  return (
    <section style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, marginTop: 16 }}>
      {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
      <div>{children}</div>
      {footer && <div style={{ marginTop: 12, borderTop: '1px solid #f0f0f0', paddingTop: 8 }}>{footer}</div>}
    </section>
  );
}