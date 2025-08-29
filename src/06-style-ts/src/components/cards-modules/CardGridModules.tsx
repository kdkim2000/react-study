import styles from './Card.module.css';
import type { CardItem } from '../../data';

type Props = { items: CardItem[] };

export default function CardGridModules({ items }: Props) {
  return (
    <section>
      <h2>CSS Modules</h2>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.id} className={styles.card}>
            {item.image ? (
              <img className={styles.thumb} src={item.image} alt={item.title} />
            ) : (
              <div className={styles.thumb} aria-hidden="true" />
            )}
            <div className={styles.body}>
              <div className={styles.titleRow}>
                <strong>{item.title}</strong>
                {item.tag && <span className={styles.tag}>{item.tag}</span>}
              </div>
              <p className={styles.desc}>{item.description}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.button}>자세히</button>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>바로가기</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}