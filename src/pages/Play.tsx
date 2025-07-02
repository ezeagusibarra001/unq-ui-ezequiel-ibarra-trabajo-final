import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import Container from "../components/ui/layout/Container";
import Keyboard from "../components/play/Keyboard";
import WordBox from "../components/play/WordBox";

import { ATTEMPTS, FLIP_DURATION } from "../constants/play";
import { WordStatus, type LetterBox } from "../types/global";
import { toast } from "react-toastify";
import { checkWord } from "../services/play.service";

export default function PlayPage() {
  const { state } = useLocation();
  const { sessionId } = useParams();
  const wordLength = state?.wordLength;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<number | null>(null);
  const [oneMoreRoundIndex, setOneMoreRoundIndex] = useState<number | null>(
    null
  );

  const [tries, setTries] = useState<LetterBox[][]>(() =>
    Array.from({ length: ATTEMPTS }, () =>
      Array.from({ length: wordLength }, () => ({
        letter: "",
        solution: WordStatus.DEFAULT,
      }))
    )
  );

  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateLetter = (index: number, value: LetterBox) => {
    setTries((prev) => {
      const updated = [...prev];
      updated[currentAttempt][index] = value;
      return updated;
    });
  };

  const handleBackspace = () => {
    if (currentIndex === 0) return;
    updateLetter(currentIndex - 1, {
      letter: "",
      solution: WordStatus.DEFAULT,
    });
    setCurrentIndex(currentIndex - 1);
  };

  const handleLetter = (key: string) => {
    if (currentIndex >= wordLength) return;
    updateLetter(currentIndex, {
      letter: key.toUpperCase(),
      solution: WordStatus.DEFAULT,
    });
    setCurrentIndex(currentIndex + 1);
  };

  const handleEnter = async () => {
    if (currentIndex !== wordLength) return;
    await validateAttempt();
  };

  const handleOnPress = useCallback(
    (key: string) => {
      if (currentAttempt >= ATTEMPTS) return;

      if (key === "⌫") return handleBackspace();
      if (key === "ENTER") return handleEnter();
      if (/^[a-zA-Z]$/.test(key)) return handleLetter(key);
    },
    [currentAttempt, currentIndex]
  );

  const validateAttempt = async () => {
    try {
      if (!sessionId) {
        navigate("/");
        return;
      }
      setLoading(currentAttempt);
      const wordValidation = await checkWord(
        sessionId,
        tries[currentAttempt].map((box) => box.letter.toLowerCase()).join("")
      );
      setTries((prev) => {
        const updated = [...prev];
        const validatedAttempt = wordValidation;
        updated[currentAttempt] = validatedAttempt;
        return updated;
      });
      setCurrentAttempt((prev) => prev + 1);
      setCurrentIndex(0);
      const HAS_WON = wordValidation.every(
        (box) => box.solution === WordStatus.CORRECT
      );
      const HAS_LOST = currentAttempt + 1 >= ATTEMPTS && !HAS_WON;
      if (HAS_WON) {
        toast.success("Congratulations! You've guessed the word!");
        navigate("/success", {
          state: {
            word: tries[currentAttempt].map((box) => box.letter).join(""),
          },
          replace: true,
        });
      }
      if (HAS_LOST) {
        toast.error("Game over! You've used all attempts.");
        navigate("/game-over");
      }
    } catch (error) {
      console.error("Error validating attempt:", error);
      toast.error("Error validating attempt. Please try again.");
    } finally {
      setOneMoreRoundIndex(currentAttempt);
      setTimeout(() => {
        setOneMoreRoundIndex(null);
        setLoading(null);
      }, wordLength * FLIP_DURATION + FLIP_DURATION);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "Backspace") return handleOnPress("⌫");
      if (key === "Enter") return handleOnPress("ENTER");
      if (/^[a-zA-Z]$/.test(key)) return handleOnPress(key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleOnPress]);

  return (
    <section className="container bg-black">
      <Container justify="center" align="center" gap="16px" className="pt-4">
        <Container gap="8px" align="center" justify="center">
          {tries.map((word, index) => (
            <WordBox
              key={index}
              word={word}
              loading={loading === index}
              oneMoreRound={oneMoreRoundIndex === index}
            />
          ))}
        </Container>
        <Keyboard onKeyPress={handleOnPress} tries={tries} />
      </Container>
    </section>
  );
}
