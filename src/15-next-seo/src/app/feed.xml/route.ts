// app/feed.xml/route.ts
import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://myblog.com';
  const { posts } = await getBlogPosts(1, 50);
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>My Blog</title>
        <description>개발과 기술에 대한 인사이트를 공유하는 블로그</description>
        <link>${baseUrl}</link>
        <language>ko-KR</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
        ${posts
          .map(
            (post) => `
            <item>
              <title><![CDATA[${post.title}]]></title>
              <description><![CDATA[${post.excerpt}]]></description>
              <link>${baseUrl}/blog/${post.slug}</link>
              <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
              <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
              <author>${post.author.name}</author>
              <category>${post.category}</category>
            </item>
          `
          )
          .join('')}
      </channel>
    </rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}