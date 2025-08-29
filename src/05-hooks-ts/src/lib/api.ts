// src/lib/api.ts
export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
  if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
  return (await res.json()) as User[];
}
