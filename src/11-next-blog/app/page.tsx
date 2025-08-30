import Link from 'next/link';

export default function HomePage() {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h1>Next.js App Router + Turbopack</h1>
      <p>App Router 구조와 Turbopack 개발 서버로 동작하는 학습용 블로그입니다.</p>
      <Link href="/blog">블로그로 이동 →</Link>
    </section>
  );
}
