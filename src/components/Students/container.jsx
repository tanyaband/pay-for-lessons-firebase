import { createPortal } from "react-dom";
import { StudentForm } from "../StudentForm/component";
import { useState } from "react";
import { observer } from "mobx-react";
import { StudentContainer } from "../Student/container";
import { studentStore } from "../../stores/student-store";
import styles from "./styles.module.css";
import { Button } from "../Button/component";
import { userStore } from "../../stores/user-store";
import { database } from "../../stores/database";

export const StudentsContainer = observer(() => {
  const studentIds = studentStore.studentIds;
  const [showModal, setShowModal] = useState();

  return (
    <>
      {studentIds.map((studentId) => (
        <StudentContainer
          key={studentId}
          studentId={studentId}
        ></StudentContainer>
      ))}
      <div className={styles.actions}>
        <Button
          disabled={!userStore.userUid}
          onClick={() => setShowModal(true)}
          title="Добавить ученика"
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      {showModal &&
        createPortal(
          <StudentForm
            title="Новый ученик"
            onCancel={() => setShowModal(false)}
            onOk={(newStudent) => {
              database.addStudent(newStudent);
              setShowModal(false);
            }}
          />,
          document.getElementById("modal-container")
        )}
    </>
  );
});
