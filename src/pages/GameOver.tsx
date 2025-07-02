import Button from "../components/ui/button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../components/ui/layout/Container";

export default function GameOver() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Container justify="center" align="center" gap="1.5rem">
        <div className="shake">💀</div>
        <h1 className="text-title">Game Over</h1>
        <p className="text-subtitle text-center">
          You’ve run out of attempts. Better luck next time!
        </p>
        <Button onClick={() => navigate("/")}>Try again</Button>
      </Container>
    </div>
  );
}
