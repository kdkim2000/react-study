export type Post = { id: string; title: string; content: string; createdAt: number };
export type NewPost = Omit<Post, 'id' | 'createdAt'>;
