import { items } from './data';
import CardGridModules from './components/cards-modules/CardGridModules';
import CardGridStyled from './components/cards-styled/CardGridStyled';
import CardGridTw from './components/cards-tailwind/CardGridTw';

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui', lineHeight: 1.5, padding: 24, display: 'grid', gap: 28 }}>
      <h1>06. 스타일링 — 카드 레이아웃 3가지 방식</h1>
      <CardGridModules items={items} />
      <CardGridStyled items={items} />
      <CardGridTw items={items} />
    </main>
  );
}