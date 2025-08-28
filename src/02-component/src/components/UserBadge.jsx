// src/components/UserBadge.jsx
export default function UserBadge({ name, role = 'Member' }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <strong>{name}</strong>
      <span style={{ marginLeft: 8, color: '#555' }}>({role})</span>
    </div>
  );
}