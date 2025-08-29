export type Item = {
  id: string;
  name: string;
  category: 'Framework' | 'Library' | 'Tool';
  price: number;
};

export const items: Item[] = [
  { id: '1', name: 'React', category: 'Library', price: 0 },
  { id: '2', name: 'Vue', category: 'Framework', price: 0 },
  { id: '3', name: 'Next.js', category: 'Framework', price: 0 },
  { id: '4', name: 'Vite', category: 'Tool', price: 0 },
  { id: '5', name: 'Redux Toolkit', category: 'Library', price: 0 },
  { id: '6', name: 'Zustand', category: 'Library', price: 0 },
  { id: '7', name: 'Tailwind CSS', category: 'Tool', price: 0 },
  { id: '8', name: 'TanStack Query', category: 'Library', price: 0 },
  { id: '9', name: 'Vitest', category: 'Tool', price: 0 },
  { id: '10', name: 'SWR', category: 'Library', price: 0 },
];