import styles from "./styles.module.css";

export const Day = ({ day, children, onClick }) => {
  return (
    <td className={day ? styles.root : ""} onClick={onClick}>
      {day}
      {children}
    </td>
  );
};
