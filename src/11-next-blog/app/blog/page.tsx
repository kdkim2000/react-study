import Link from 'next/link';
import { getAll } from '../../lib/posts';

export const metadata = { title: 'Blog | Next Turbo Blog' };

export default async function BlogIndexPage() {
  const posts = getAll(); // 데모: 동기 조회(실무에선 fetch/DB)
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2>블로그</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
        {posts.map((p) => (
          <li key={p.slug} style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <h3 style={{ margin: 0 }}>{p.title}</h3>
              <small style={{ color: '#6b7280' }}>{new Date(p.date).toLocaleDateString()}</small>
            </div>
            <p style={{ margin: '6px 0', color: '#4b5563' }}>{p.excerpt}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tags.map((t) => (
                <span key={t} style={{ fontSize: 12, background: '#eef2ff', color: '#3730a3', padding: '2px 8px', borderRadius: 999 }}>
                  {t}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              <Link href={`/blog/${p.slug}`}>자세히 보기 →</Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
