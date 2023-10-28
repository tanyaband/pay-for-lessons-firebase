import { Day } from "./component";
import { studentStore } from "../../stores/student-store";
import { observer } from "mobx-react";
import { eventStore } from "../../stores/event-store";
import { useState } from "react";
import { EventForm } from "../EventForm/component";
import { createPortal } from "react-dom";
import style from "./styles.module.css";
import { EVENT_TYPES } from "../../constants/constants";

export const DayContainer = observer(({ day }) => {
  const events = eventStore.monthEvents[day];
  const [showModal, setShowModal] = useState();

  return (
    <>
      <Day day={day} onClick={() => setShowModal(true)}>
        <div className={style.events}>
          {events &&
            events.map((item, index) => (
              <span
                key={index}
                style={{
                  color: studentStore.getStudentById(item.studentId).color,
                }}
              >
                <i className={EVENT_TYPES[item.type].icon}></i>
              </span>
            ))}
        </div>
      </Day>
      {showModal &&
        createPortal(
          <EventForm
            day={day}
            onCancel={() => setShowModal(false)}
            onOk={(newEvents) => {
              eventStore.updateEvents(newEvents, day);
              setShowModal(false);
            }}
            events={events}
          />,
          document.getElementById("modal-container")
        )}
    </>
  );
});
