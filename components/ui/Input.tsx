import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          {...props}
          className={`${styles.input} ${error ? styles.error : ""}`}
        />
        {error && <p className={styles.errorMsg}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
