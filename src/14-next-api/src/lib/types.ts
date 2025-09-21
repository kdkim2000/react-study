// src/lib/types.ts
export type Post = { id: string; title: string; content: string; createdAt: number };

// src/lib/store.ts
import { Post } from './types';

declare global {
  // eslint-disable-next-line no-var
  var __POSTS__: Map<string, Post> | undefined;
}
const store = globalThis.__POSTS__ ?? new Map<string, Post>();
if (!globalThis.__POSTS__) globalThis.__POSTS__ = store;

export function allPosts(): Post[] {
  return Array.from(store.values()).sort((a, b) => b.createdAt - a.createdAt);
}
export function getPost(id: string) { return store.get(id) ?? null; }
export function createPost(input: { title: string; content: string }): Post {
  const id = crypto.randomUUID();
  const post = { id, title: input.title, content: input.content, createdAt: Date.now() };
  store.set(id, post);
  return post;
}
export function updatePost(id: string, patch: Partial<Omit<Post, 'id' | 'createdAt'>>): Post | null {
  const cur = store.get(id);
  if (!cur) return null;
  const next = { ...cur, ...patch };
  store.set(id, next);
  return next;
}
export function deletePost(id: string) { return store.delete(id); }
