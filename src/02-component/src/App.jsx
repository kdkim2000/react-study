import Hello from './components/Hello';
import UserBadge from './components/UserBadge';
import Card from './components/Card';
import Panel from './components/Panel';

export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1>JSX & 컴포넌트 기초</h1>
      <Hello />
      <hr/>
      <h1>props 기본</h1>
      <UserBadge name="김경덕" role="Software Engineer" />
      <UserBadge name="홍길동" /> {/* role 기본값: Member */}

      <hr/>
      <Card title="공지">
        <p>리액트 스터디는 매주 화/목 19:00에 진행합니다.</p>
      </Card>

      <Card
        title="업무 가이드"
        footer={<small>마지막 업데이트: 2025-08-27</small>}
      >
        <ul>
          <li>PR은 최소 1명 리뷰 후 머지</li>
          <li>Lint 에러 0 유지</li>
          <li>커밋 메시지 규칙: feat/fix/chore 등 prefix</li>
        </ul>
      </Card>
      <hr/>
      <h1>Compound Components</h1>
      <Panel>
        <Panel.Header>프로젝트 알림</Panel.Header>
        <Panel.Body>이번 스프린트 목표는 성능 30% 개선입니다.</Panel.Body>
        <Panel.Footer>담당: FE Chapter</Panel.Footer>
      </Panel>
    </main>
  );
}