import styled from 'styled-components';
import type { CardItem } from '../../data';

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

const Card = styled.article`
  border: 1px solid #eee;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  transition: transform .15s ease, box-shadow .15s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  }
`;

const Thumb = styled.img`
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
`;

const Body = styled.div`
  padding: 12px 14px;
  display: grid;
  gap: 6px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Tag = styled.span<{ tone?: 'New'|'Hot'|'Beta' }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: ${({ tone }) =>
    tone === 'Hot' ? '#fee2e2' : tone === 'Beta' ? '#ecfeff' : '#eef2ff'};
  color: ${({ tone }) =>
    tone === 'Hot' ? '#991b1b' : tone === 'Beta' ? '#155e75' : '#3730a3'};
`;

const Desc = styled.p`
  color: #555;
  font-size: 14px;
`;

const Actions = styled.div`
  padding: 0 14px 14px;
  display: flex;
  gap: 8px;
`;

const Button = styled.button<{ primary?: boolean }>`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 8px 10px;
  background: #fff;
  cursor: pointer;

  ${({ primary }) =>
    primary &&
    `
      border: none;
      background: #111827;
      color: #fff;
    `}
`;

type Props = { items: CardItem[] };

export default function CardGridStyled({ items }: Props) {
  return (
    <section>
      <h2>styled-components</h2>
      <Grid>
        {items.map((item) => (
          <Card key={item.id}>
            {item.image ? (
              <Thumb src={item.image} alt={item.title} />
            ) : (
              <Thumb as="div" aria-hidden="true" />
            )}
            <Body>
              <TitleRow>
                <strong>{item.title}</strong>
                {item.tag && <Tag tone={item.tag}>{item.tag}</Tag>}
              </TitleRow>
              <Desc>{item.description}</Desc>
            </Body>
            <Actions>
              <Button>자세히</Button>
              <Button primary>바로가기</Button>
            </Actions>
          </Card>
        ))}
      </Grid>
    </section>
  );
}