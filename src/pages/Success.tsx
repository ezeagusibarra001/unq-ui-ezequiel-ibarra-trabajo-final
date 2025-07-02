import Button from "../components/ui/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../components/ui/layout/Container";

export default function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const word = state?.word;

  return (
    <div className="container">
      <Container justify="center" align="center" gap="1.5rem">
        <div className="bounce">🎉</div>
        <h1 className="text-title">You did it!</h1>
        <p className="text-subtitle text-center">
          You guessed the word <strong>{word}</strong> correctly. Great job!
        </p>
        <Button onClick={() => navigate("/")}>Play again</Button>
      </Container>
    </div>
  );
}
