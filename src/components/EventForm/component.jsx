import styles from "./styles.module.css";
import { Button } from "../Button/component";
import { monthStore } from "../../stores/month-store";
import { studentStore } from "../../stores/student-store";
import { Fragment, useState } from "react";
import { EVENT_TYPES } from "../../constants/constants";

export const EventForm = ({ day, onCancel, onOk, events = [] }) => {
  const title = `Уроки ${day}.${monthStore.month}.${monthStore.year}`;
  const studentIds = studentStore.studentIds;

  const [newEvents, setNewEvents] = useState(events);
  console.log(newEvents);
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div>
          {studentIds.map((studentId) => {
            const student = studentStore.getStudentById(studentId);
            return (
              <Fragment key={studentId}>
                <p>{student.name}:</p>
                {[...Array(3)].map((_, typeIndex) => {
                  const isEvent = newEvents.some(
                    (event) =>
                      event.studentId === studentId && event.type === typeIndex
                  );
                  return (
                    <p key={typeIndex}>
                      <input
                        type="checkbox"
                        checked={isEvent}
                        onChange={(event) => {
                          if (event.target.checked) {
                            setNewEvents([
                              ...newEvents,
                              { studentId: studentId, type: typeIndex },
                            ]);
                          } else {
                            setNewEvents(
                              newEvents.filter(
                                (item) =>
                                  item.studentId != studentId ||
                                  item.type != typeIndex
                              )
                            );
                          }
                        }}
                      />
                      <span style={{ color: student.color }}>
                        <i className={EVENT_TYPES[typeIndex].icon}></i>
                      </span>
                      {EVENT_TYPES[typeIndex].name}
                    </p>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
        <div className={styles.actions}>
          <Button onClick={() => onOk(newEvents)}>Ok</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};
