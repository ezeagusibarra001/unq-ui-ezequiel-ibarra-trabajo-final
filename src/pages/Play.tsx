import { useLocation, useParams } from "react-router-dom";

export default function PlayPage() {
  const location = useLocation();
  const { difficulty, wordLength } = location.state;
  const { sessionId } = useParams();

  return (
    <div>
      <h1>Play Page</h1>
      <p>Difficulty: {difficulty?.name}</p>
      <p>Word length: {wordLength}</p>
      <p>Session ID: {sessionId}</p>
    </div>
  );
}
