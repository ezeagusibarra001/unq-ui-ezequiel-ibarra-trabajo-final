import { WordStatus, type LetterBox } from "../../types/global";
import styles from "./Keyboard.module.scss";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

interface Keyboard {
  onKeyPress?: (key: string) => void;
  tries: LetterBox[][];
}

export default function Keyboard({ onKeyPress, tries }: Keyboard) {
  const statusPriority: Record<WordStatus, number> = {
    [WordStatus.CORRECT]: 3,
    [WordStatus.ELSEWHERE]: 2,
    [WordStatus.ABSENT]: 1,
    [WordStatus.DEFAULT]: 0,
  };
  
  const getStrongestStatus = (letter: string): WordStatus => {
    const letterStatuses = tries.map(
      (attempt) =>
        attempt.find((box) => box.letter.toLowerCase() === letter.toLowerCase())
          ?.solution || WordStatus.DEFAULT
    );

    return letterStatuses.reduce((strongest, current) => {
      return statusPriority[current] > statusPriority[strongest]
        ? current
        : strongest;
    }, WordStatus.DEFAULT);
  };

  return (
    <div className={styles.keyboard}>
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => {
            const isSpecial = key === "ENTER" || key === "⌫";
            const status = isSpecial
              ? WordStatus.DEFAULT
              : getStrongestStatus(key);
            const statusClass = status ? styles[`key--${status}`] : "";
            return (
              <button
                key={key}
                className={`${styles.key} ${
                  isSpecial ? styles.wideKey : ""
                } ${statusClass}`}
                onClick={() => onKeyPress?.(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
