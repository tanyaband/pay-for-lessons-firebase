import { observer } from "mobx-react";
import { CalendarTitle } from "./component";
import { monthStore } from "../../stores/month-store";
import { LoginForm } from "../LoginForm/component";
import { useState } from "react";
import { database } from "../../stores/database";
import { createPortal } from "react-dom";
import { userStore } from "../../stores/user-store";

export const CalendarTitleContainer = observer(() => {
  const [showModal, setShowModal] = useState();
  return (
    <>
      <CalendarTitle
        year={monthStore.year}
        month={monthStore.month}
        nextMonth={() => monthStore.nextMonth()}
        prevMonth={() => monthStore.prevMonth()}
        onLogin={() => setShowModal(true)}
        onLogout={() => database.logout()}
        userUid={userStore.userUid}
        userEmail={userStore.userEmail}
      />
      {showModal &&
        createPortal(
          <LoginForm
            onCancel={() => setShowModal(false)}
            onOk={(form) => {
              database
                .login(form)
                .then((data) => {
                  console.log("data: " + data);
                  setShowModal(false);
                })
                .catch((error) => alert(error.message));
            }}
          />,
          document.getElementById("modal-container")
        )}
    </>
  );
});
