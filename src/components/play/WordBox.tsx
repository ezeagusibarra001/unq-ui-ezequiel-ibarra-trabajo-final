import { useEffect, useState, useRef } from "react";
import type { LetterBox } from "../../types/global";
import styles from "./WordBox.module.scss";
import { FLIP_DURATION } from "../../constants/play";

interface WordBoxProps {
  word: LetterBox[];
  loading: boolean;
  oneMoreRound: boolean;
}

export default function WordBox({ word, loading, oneMoreRound }: WordBoxProps) {
  const [flippingStates, setFlippingStates] = useState<boolean[]>(
    Array(word.length).fill(false)
  );

  const isActiveRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  };

  useEffect(() => {
    if (!loading && !oneMoreRound) return;

    isActiveRef.current = true;
    let i = 0;

    const sequence = async () => {
      for (i = 0; i < word.length; i++) {
        if (!isActiveRef.current) return;

        setFlippingStates((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });

        await new Promise((res) =>
          timeoutRef.current.push(setTimeout(res, FLIP_DURATION))
        );

        if (!isActiveRef.current) return;

        setFlippingStates((prev) => {
          const updated = [...prev];
          updated[i] = false;
          return updated;
        });

        await new Promise((res) =>
          timeoutRef.current.push(setTimeout(res, FLIP_DURATION * 0.05))
        );
      }
    };

    sequence()

    return () => {
      isActiveRef.current = false;
      clearAllTimeouts();
      setFlippingStates(Array(word.length).fill(false));
    };
  }, [loading, oneMoreRound, word.length]);

  return (
    <div className={styles.containerWordBox}>
      {word.map((box, i) => {
        const statusClass = styles[`word--${box.solution}`];
        const flipping = flippingStates[i] ? styles.flipping : "";
        const className = `${styles.word} ${statusClass} ${flipping}`;
        return (
          <div key={i} className={className}>
            {box.letter}
          </div>
        );
      })}
    </div>
  );
}
