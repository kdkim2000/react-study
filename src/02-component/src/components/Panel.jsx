// src/components/Panel.jsx
function Panel({ children }) {
  return <div style={{ border: '1px solid #ddd', borderRadius: 8 }}>{children}</div>;
}
function PanelHeader({ children }) {
  return <div style={{ padding: 12, borderBottom: '1px solid #eee', fontWeight: 700 }}>{children}</div>;
}
function PanelBody({ children }) {
  return <div style={{ padding: 12 }}>{children}</div>;
}
function PanelFooter({ children }) {
  return <div style={{ padding: 12, borderTop: '1px solid #eee' }}>{children}</div>;
}

Panel.Header = PanelHeader;
Panel.Body = PanelBody;
Panel.Footer = PanelFooter;

export default Panel;