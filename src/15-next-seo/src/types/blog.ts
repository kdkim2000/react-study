// types/blog.ts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  readTime: number;
  featured: boolean;
  coverImage?: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  totalCount: number;
  hasMore: boolean;
}