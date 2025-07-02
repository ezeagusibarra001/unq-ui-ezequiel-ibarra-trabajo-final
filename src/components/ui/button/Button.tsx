import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export default function Button({
  variant = "default",
  className = "",
  ...props
}: ButtonProps) {
  const VARIANTS_MAP = {
    default: styles["button--default"],
    outline: styles["button--outline"],
  };

  return (
    <button
      className={`${styles.button} ${VARIANTS_MAP[variant]} ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
