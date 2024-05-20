import { forwardRef, InputHTMLAttributes, LegacyRef } from "react";
import styles from "./input.module.css";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
const Input = forwardRef(
  (
    { className, ...rest }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <input ref={ref} className={`${styles.input} ${className}`} {...rest} />
    );
  }
);
export default Input;
