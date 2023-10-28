import styles from "./styles.module.css";

export const Info = ({ title, children }) => {
  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  );
};
