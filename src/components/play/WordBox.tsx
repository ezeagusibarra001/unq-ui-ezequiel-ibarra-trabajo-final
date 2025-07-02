import type { LetterBox } from "../../types/global";
import styles from "./WordBox.module.scss";

interface WordBoxProps {
  word: LetterBox[];
  active?: boolean;
}

export default function WordBox({ word }: WordBoxProps) {
  return (
    <div className={styles.containerWordBox}>
      {word.map((box, i) => {
        const statusClass = styles[`word--${box.solution}`];
        const className = `${styles.word} ${statusClass}`;
        return (
          <div key={i} className={className}>
            {box.letter}
          </div>
        );
      })}
    </div>
  );
}
