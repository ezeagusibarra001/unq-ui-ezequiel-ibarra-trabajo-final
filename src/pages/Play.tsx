import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WordBox from "../components/play/WordBox";
import { ATTEMPTS } from "../constants/play";
import Container from "../components/ui/layout/Container";
import Keyboard from "../components/play/Keyboard";
import { WordStatus, type LetterBox } from "../types/global";

export default function PlayPage() {
  const location = useLocation();
  const { difficulty, wordLength } = location.state;
  const { sessionId } = useParams();

  const [tries, setTries] = useState<LetterBox[][]>(
    Array.from({ length: ATTEMPTS }, () =>
      Array.from({ length: wordLength }, () => ({
        letter: "",
        solution: WordStatus.DEFAULT,
      }))
    )
  );

  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnPress = (key: string) => {
    if (currentAttempt >= ATTEMPTS) return;

    if (key === "⌫") {
      if (currentIndex > 0) {
        setTries((prev) => {
          const updated = [...prev];
          updated[currentAttempt][currentIndex - 1] = {
            letter: "",
            solution: WordStatus.DEFAULT,
          };
          return updated;
        });
        setCurrentIndex(currentIndex - 1);
      }
      return;
    }

    if (key === "ENTER") {
      if (currentIndex === wordLength) {
        // Validar intento
        validateAttempt();
      }
      return;
    }

    if (!/^[a-zA-Z]$/.test(key)) return;

    if (currentIndex < wordLength) {
      setTries((prev) => {
        const updated = [...prev];
        updated[currentAttempt][currentIndex] = {
          letter: key.toUpperCase(),
          solution: WordStatus.DEFAULT,
        };
        return updated;
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const secretWord = "PLANE"; // debería venir del backend

  const validateAttempt = () => {
    setTries((prev) => {
      const updated = [...prev];
      const attempt = updated[currentAttempt];

      const secretLetters = secretWord.split("");

      const newAttempt = attempt.map((box, i) => {
        if (box.letter === secretLetters[i]) {
          return { ...box, solution: WordStatus.CORRECT };
        } else if (secretLetters.includes(box.letter)) {
          return { ...box, solution: WordStatus.ELSEWHERE };
        } else {
          return { ...box, solution: WordStatus.ABSENT };
        }
      });

      updated[currentAttempt] = newAttempt;
      return updated;
    });

    setCurrentAttempt((prev) => prev + 1);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (key === "Backspace") {
        handleOnPress("⌫");
      } else if (key === "Enter") {
        handleOnPress("ENTER");
      } else if (/^[a-zA-Z]$/.test(key)) {
        handleOnPress(key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleOnPress]);

  return (
    <section className="container bg-black">
      <Container justify="center" align="center" gap="16px" className="pt-4">
        <Container gap="8px" align="center" justify="center">
          {tries.map((word, index) => (
            <WordBox key={index} word={word} />
          ))}
        </Container>
        <Keyboard onKeyPress={handleOnPress} />
      </Container>
    </section>
  );
}
