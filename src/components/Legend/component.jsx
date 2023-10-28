import styles from "./styles.module.css";

export const Legend = () => {
  return (
    <>
      <p>
        <span className={styles.icon}>
          <i className="fa-regular fa-credit-card"></i>
        </span>
        Оплата картой
      </p>
      <p>
        <span className={styles.icon}>
          <i className="fa-solid fa-coins"></i>
        </span>
        Оплата наличными
      </p>
      <p>
        <span className={styles.icon}>
          <i className="fa-regular fa-circle-check"></i>
        </span>
        Урок
      </p>
    </>
  );
};
