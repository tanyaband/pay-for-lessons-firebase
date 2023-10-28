import styles from "./styles.module.css";
import { DayContainer } from "../Day/container";

const DAYS = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export const Month = ({ weeksNumber, getDate }) => {
  return (
    <table className={styles.root}>
      <thead className={styles.head}>
        <tr>
          {DAYS.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(weeksNumber)].map((_, weekIndex) => (
          <tr key={weekIndex}>
            {DAYS.map((_, dayIndex) => (
              <DayContainer
                key={dayIndex}
                day={getDate(weekIndex, dayIndex)}
              ></DayContainer>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
