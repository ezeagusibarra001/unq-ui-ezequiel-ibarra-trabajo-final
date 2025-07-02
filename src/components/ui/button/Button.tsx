import React from "react";
import styles from "./Button.module.scss";
import Spinner from "../layout/Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  loading?: boolean;
};

export default function Button({
  variant = "default",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const VARIANTS_MAP = {
    default: styles["button--default"],
    outline: styles["button--outline"],
  };

  return (
    <button
      className={`${styles.button} ${VARIANTS_MAP[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
