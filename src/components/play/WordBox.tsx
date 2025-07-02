import React, { useState, useRef } from "react";
import styles from "./WordBox.module.scss";

interface WordBox {
  wordLength: number;
}

export default function WordBox({ wordLength }: WordBox) {
  const [values, setValues] = useState(Array(wordLength).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow one character
    const newValues = [...values];
    newValues[index] = value.toUpperCase();
    setValues(newValues);

    // Move to next input if value entered
    if (value && index < wordLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      // Move to previous input if backspace on empty
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={styles.containerWordBox}>
      {Array.from({ length: wordLength }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          value={values[i]}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          ref={el => {
            inputsRef.current[i] = el;
          }}
          className={styles.input}
        />
      ))}
    </div>
  );
}
