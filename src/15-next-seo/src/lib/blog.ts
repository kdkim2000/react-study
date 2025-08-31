// lib/blog.ts - 실제 구현
import { BlogPost, BlogPostsResponse } from '@/types/blog';
import { mockBlogPosts } from './mockData';

// Mock API 함수들 (실제 API로 교체 가능)
export async function getBlogPosts(
  page: number = 1,
  limit: number = 10
): Promise<BlogPostsResponse> {
  // 실제 환경에서는 여기에 API 호출 로직
  await new Promise(resolve => setTimeout(resolve, 100)); // 로딩 시뮬레이션
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = mockBlogPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalCount: mockBlogPosts.length,
    hasMore: endIndex < mockBlogPosts.length,
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // 실제 환경에서는 API 호출
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const post = mockBlogPosts.find(post => post.slug === slug);
  return post || null;
}

export async function getRelatedPosts(
  slug: string,
  category: string,
  limit: number = 3
): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const relatedPosts = mockBlogPosts
    .filter(post => post.slug !== slug && post.category === category)
    .slice(0, limit);
    
  return relatedPosts;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockBlogPosts.map(post => post.slug);
}