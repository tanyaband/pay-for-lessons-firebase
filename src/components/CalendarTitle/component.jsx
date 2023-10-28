import styles from "./styles.module.css";
import { Button } from "../Button/component";

const MONTHS = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

export const CalendarTitle = ({
  year,
  month,
  nextMonth,
  prevMonth,
  onLogin,
  onLogout,
  userUid,
  userEmail,
}) => {
  console.log(userUid);
  return (
    <div className={styles.root}>
      {!userUid && (
        <Button onClick={onLogin} title="login">
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
          {/* <i class="fa-solid fa-arrow-right-from-bracket"></i> */}
        </Button>
      )}
      {userUid && (
        <div className={styles.actions}>
          <span
            style={{ color: "#CC6D3D", cursor: "pointer" }}
            title={userEmail}
          >
            <i className="fa-regular fa-user"></i>
          </span>
          <Button onClick={onLogout} title=" logout">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Button>
        </div>
      )}
      {/* <span>{year}</span> */}
      <span>
        {MONTHS[month]}, {year}
      </span>
      <div className={styles.actions}>
        <Button onClick={prevMonth}>
          <i className="fa-solid fa-arrow-left-long fa-xs"></i>
        </Button>
        <Button onClick={nextMonth}>
          <i className="fa-solid fa-arrow-right-long fa-xs"></i>
        </Button>
      </div>
    </div>
  );
};
