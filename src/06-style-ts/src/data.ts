export type CardItem = {
  id: string;
  title: string;
  description: string;
  tag?: 'New' | 'Hot' | 'Beta';
  image?: string; // 데모용 외부 이미지 또는 빈 값
};

export const items: CardItem[] = [
  { id: '1', title: '프로젝트 알파', description: 'React + TS 기반 서비스', tag: 'New', image: 'https://picsum.photos/seed/a/640/360' },
  { id: '2', title: '데이터 포털', description: '차트/대시보드 모듈', tag: 'Hot', image: 'https://picsum.photos/seed/b/640/360' },
  { id: '3', title: '모바일 앱', description: 'PWA with Offline', tag: 'Beta', image: 'https://picsum.photos/seed/c/640/360' },
  { id: '4', title: '사내 위키', description: '문서 검색/권한 관리', image: 'https://picsum.photos/seed/d/640/360' },
];