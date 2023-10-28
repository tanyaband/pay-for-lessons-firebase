import styles from "./styles.module.css";

export const Button = ({ children, onClick, disabled, title }) => {
  return (
    <button
      disabled={disabled}
      className={styles.root}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};
