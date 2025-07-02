// components/Keyboard.tsx
import styles from './Keyboard.module.scss';

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function Keyboard({ onKeyPress }: { onKeyPress?: (key: string) => void }) {
  return (
    <div className={styles.keyboard}>
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((key) => (
            <button
              key={key}
              className={styles.key}
              onClick={() => onKeyPress?.(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
