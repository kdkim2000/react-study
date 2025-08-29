import type { CardItem } from '../../data';

type Props = { items: CardItem[] };

const badgeTone: Record<NonNullable<CardItem['tag']>, string> = {
  New: 'bg-indigo-100 text-indigo-800',
  Hot: 'bg-red-100 text-red-800',
  Beta: 'bg-cyan-100 text-cyan-800',
};

export default function CardGridTw({ items }: Props) {
  return (
    <section>
      <h2 className="mb-2">Tailwind CSS</h2>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {items.map((item) => (
          <article
            key={item.id}
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white transition
                       hover:-translate-y-0.5 hover:shadow-lg"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[16/9] object-cover bg-gradient-to-br from-gray-50 to-indigo-50"
              />
            ) : (
              <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-50 to-indigo-50" />
            )}

            <div className="grid gap-1 px-4 py-3">
              <div className="flex items-center gap-2">
                <strong>{item.title}</strong>
                {item.tag && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${badgeTone[item.tag]}`}>
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>

            <div className="flex gap-2 px-4 pb-4">
              <button className="border border-gray-200 rounded-xl px-3 py-2">자세히</button>
              <button className="rounded-xl px-3 py-2 bg-gray-900 text-white">바로가기</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}