import { useLocation, useParams } from "react-router-dom";
import WordBox from "../components/play/WordBox";
import { ATTEMPTS } from "../constants/play";
import Container from "../components/ui/layout/Container";
import Keyboard from "../components/play/Keyboard";

export default function PlayPage() {
  const location = useLocation();
  const { difficulty, wordLength } = location.state;
  const { sessionId } = useParams();

  return (
    <section className="container bg-black">
      <Container justify="center" align="center" gap="16px" className="pt-4">
        <Container gap="8px" align="center" justify="center">
          {Array.from({ length: ATTEMPTS }, (_, index) => (
            <WordBox wordLength={wordLength} key={index} />
          ))}
        </Container>
        <Keyboard />
      </Container>
    </section>
  );
}
